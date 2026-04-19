import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { isSiteAccessLocked } from "@/lib/site-access-locked";

const NO_INDEX =
  "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate";

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

function basicAuthOk(header: string | null, expectedUser: string, expectedPassword: string): boolean {
  if (!header?.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const colon = decoded.indexOf(":");
  if (colon === -1) return false;
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);
  return timingSafeEqualString(user, expectedUser) && timingSafeEqualString(pass, expectedPassword);
}

function applyPrivatePreviewHeaders(res: NextResponse) {
  res.headers.set("X-Robots-Tag", NO_INDEX);
  res.headers.set("Cache-Control", "private, no-store, max-age=0");
}

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((c) => {
    to.cookies.set(c.name, c.value, c);
  });
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/api/inngest" || pathname.startsWith("/api/inngest/")) {
    return NextResponse.next();
  }

  // Supabase may send users to Site URL (/) with ?code= (PKCE) or ?token_hash= (server verify).
  // Forward to /auth/callback before any getUser() / cookie refresh on the home page.
  if (pathname === "/") {
    const sp = request.nextUrl.searchParams;
    if (sp.has("code") || (sp.has("token_hash") && sp.has("type"))) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/callback";
      return NextResponse.redirect(url);
    }
  }

  if (isSiteAccessLocked()) {
    const user = process.env.SITE_ACCESS_USER ?? "preview";
    const password = process.env.SITE_ACCESS_PASSWORD ?? "";
    if (!basicAuthOk(request.headers.get("authorization"), user, password)) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="WiVViW"',
          "X-Robots-Tag": NO_INDEX,
          "Cache-Control": "no-store",
        },
      });
    }
  }

  if (!isSupabaseAuthConfigured()) {
    const res = NextResponse.next({
      request: { headers: request.headers },
    });
    if (isSiteAccessLocked()) applyPrivatePreviewHeaders(res);
    return res;
  }

  if (pathname === "/auth/callback") {
    const res = NextResponse.next({
      request: { headers: request.headers },
    });
    if (isSiteAccessLocked()) applyPrivatePreviewHeaders(res);
    return res;
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });
  if (isSiteAccessLocked()) applyPrivatePreviewHeaders(response);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // request.cookies is read-only in the Next.js 16 proxy; .set throws and yields a 500.
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          if (isSiteAccessLocked()) applyPrivatePreviewHeaders(response);
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && !isEmailAllowed(user.email) && pathname.startsWith("/dashboard")) {
    await supabase.auth.signOut();
    const denied = NextResponse.redirect(
      new URL("/login?error=access_denied", request.url)
    );
    copyCookies(response, denied);
    return denied;
  }

  if (pathname.startsWith("/dashboard") && !user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    const redirectRes = NextResponse.redirect(login);
    copyCookies(response, redirectRes);
    return redirectRes;
  }

  if (
    (pathname === "/login" || pathname === "/signup") &&
    user &&
    isEmailAllowed(user.email)
  ) {
    const redirectRes = NextResponse.redirect(new URL("/dashboard", request.url));
    copyCookies(response, redirectRes);
    return redirectRes;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and images.
     * /api/inngest is handled inside proxy without Supabase work.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
