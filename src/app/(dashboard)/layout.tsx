import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { requireAuthUser } from "@/lib/auth/session";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  let email: string | null = null;
  if (isSupabaseAuthConfigured()) {
    let user;
    try {
      user = await requireAuthUser();
    } catch {
      redirect("/login?next=/dashboard");
    }
    if (!isEmailAllowed(user.email)) redirect("/login?error=access_denied");
    email = user.email ?? null;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight text-white">
              WiVViW
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/engines/dranb"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              dRANb
            </Link>
            <Link
              href="/dashboard/ops/providers"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Ops
            </Link>
            <Link
              href="/dashboard/ops/truth"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Truth
            </Link>
          </div>
          {isSupabaseAuthConfigured() && (
            <div className="flex items-center gap-3">
              {email && (
                <span className="hidden max-w-[200px] truncate text-xs text-zinc-500 sm:inline">
                  {email}
                </span>
              )}
              <form action="/auth/sign-out" method="post">
                <button
                  type="submit"
                  className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </div>
          )}
        </nav>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
