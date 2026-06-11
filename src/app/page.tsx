import Link from "next/link";
import { SupabaseStatus } from "@/components/SupabaseStatus";
import { getOptionalAuthUser } from "@/lib/auth/session";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

export default async function HomePage() {
  const user = await getOptionalAuthUser();
  const signedIn = !!user;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(99,102,241,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(16,185,129,0.06),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10 max-w-md space-y-5 px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white">WiVViW</h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          Multi-model orchestration (MOIRAI) with the dRANb naming engine.
          <br />
          Browse the dashboard free — sign up to run briefs and get output.
        </p>
        <SupabaseStatus />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {signedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Explore app
              </Link>
              {isSupabaseAuthConfigured() && (
                <>
                  <Link
                    href="/login"
                    className="inline-flex rounded-lg border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex rounded-lg border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
