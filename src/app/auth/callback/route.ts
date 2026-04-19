import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Matches GoTrue / @supabase/auth-js EmailOtpType for token_hash verification. */
const EMAIL_OTP_TYPES = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
] as const;

type EmailOtpType = (typeof EMAIL_OTP_TYPES)[number];

function isEmailOtpType(t: string): t is EmailOtpType {
  return (EMAIL_OTP_TYPES as readonly string[]).includes(t);
}

function loginAuthError(url: URL, reason: string) {
  const u = new URL("/login", url);
  u.searchParams.set("error", "auth_callback");
  u.searchParams.set("reason", reason);
  return NextResponse.redirect(u);
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const typeParam = url.searchParams.get("type");
  const nextParam = url.searchParams.get("next") ?? "/dashboard";
  const safeNext = nextParam.startsWith("/") ? nextParam : `/${nextParam}`;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return loginAuthError(url, "missing_env");
  }

  const hasTokenFlow = Boolean(tokenHash && typeParam && isEmailOtpType(typeParam));
  const hasCodeFlow = Boolean(code);

  if (!hasTokenFlow && !hasCodeFlow) {
    return loginAuthError(url, "missing_params");
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        response = NextResponse.next({
          request: { headers: request.headers },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    if (hasTokenFlow) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash!,
        type: typeParam as EmailOtpType,
      });
      if (error) {
        return loginAuthError(url, "verify_failed");
      }
    } else {
      const { error } = await supabase.auth.exchangeCodeForSession(code!);
      if (error) {
        return loginAuthError(url, "exchange_failed");
      }
    }
  } catch {
    return loginAuthError(url, "exception");
  }

  const redirect = NextResponse.redirect(new URL(safeNext, url));
  response.cookies.getAll().forEach((c) => {
    redirect.cookies.set(c.name, c.value, c);
  });
  return redirect;
}
