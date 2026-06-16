"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
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
    <AuthShell
      title="Sign in"
      subtitle={
        <>
          Use your WiVViW account.
          <br />
          New here?{" "}
          <Link href="/signup" className="text-[hsl(var(--primary-amber))] hover:underline">
            Create one
          </Link>
          .
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" aria-busy={loading}>
        {error && (
          <div className="rounded-lg border border-[hsl(var(--primary-amber)/0.35)] bg-[hsl(var(--primary-amber)/0.1)] px-3 py-2 text-sm text-[hsl(var(--text-primary))]">
            {error}
          </div>
        )}
        {errorParam === "auth_callback" && (
          <p className="text-xs text-[hsl(var(--text-muted))]">
            If you have a 6-digit email code, you can{" "}
            <Link
              href={`/auth/confirm?next=${encodeURIComponent(nextPath)}`}
              className="text-[hsl(var(--primary-amber))] hover:underline"
            >
              confirm manually
            </Link>
            .
          </p>
        )}
        <div>
          <label htmlFor="email" className="block text-left text-sm font-medium text-[hsl(var(--text-primary))]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mt-1"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-left text-sm font-medium text-[hsl(var(--text-primary))]">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-1"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-center text-sm text-[hsl(var(--text-muted))]">Loading…</p>}>
      <LoginForm />
    </Suspense>
  );
}
