"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/dashboard";
  const errorParam = searchParams.get("error");
  const reasonParam = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    if (errorParam === "access_denied") {
      return "This account is not on the allowlist for this environment.";
    }
    if (errorParam !== "auth_callback") return null;
    switch (reasonParam) {
      case "exchange_failed":
        return "That confirmation link can fail if it was opened in a different browser/app than signup (PKCE) or was prefetched. Use the 6-digit email code instead.";
      case "verify_failed":
        return "That confirmation link is invalid or expired. Request a new confirmation email.";
      case "missing_params":
      case "missing_env":
        return "Sign-in could not be completed. Check Supabase env vars and redirect URL configuration.";
      default:
        return "Could not complete sign-in from the email link. Try signing in with your password.";
    }
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signErr) {
        setError(signErr.message);
        return;
      }
      router.push(nextPath.startsWith("/") ? nextPath : `/${nextPath}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Use your Supabase Auth account. New here?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
            Create one
          </Link>
          .
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4" aria-busy={loading}>
        {error && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            {error}
          </div>
        )}
        {errorParam === "auth_callback" && (
          <p className="text-xs text-zinc-500">
            If you have a 6-digit email code, you can{" "}
            <Link href={`/auth/confirm?next=${encodeURIComponent(nextPath)}`} className="text-indigo-400 hover:text-indigo-300">
              confirm manually
            </Link>
            .
          </p>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-400">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
