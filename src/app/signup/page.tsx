"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: signErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (signErr) {
        setError(signErr.message);
        return;
      }
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      setNotice(
        "Check your email to confirm your account, then sign in. Tip: open the link in this same browser, or configure the Supabase “Confirm sign up” template to use token_hash (see .env.example)."
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign up failed";
      if (msg.includes("Failed to fetch")) {
        setError(
          "Could not reach Supabase. Check that the project is active and wivviw.com is listed under Supabase → Auth → URL configuration."
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create account"
      subtitle={
        <>
          Already have one?{" "}
          <Link href="/login" className="text-[hsl(var(--primary-amber))] hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" aria-busy={loading}>
        {error && (
          <div className="rounded-lg border border-[hsl(var(--primary-amber)/0.35)] bg-[hsl(var(--primary-amber)/0.1)] px-3 py-2 text-sm text-[hsl(var(--text-primary))]">
            {error}
          </div>
        )}
        {notice && (
          <div className="rounded-lg border border-[hsl(var(--accent-teal)/0.35)] bg-[hsl(var(--accent-teal)/0.1)] px-3 py-2 text-sm text-[hsl(var(--text-primary))]">
            {notice}
          </div>
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
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-1"
          />
          <p className="mt-1 text-left text-xs text-[hsl(var(--text-muted))]">At least 8 characters.</p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating…" : "Sign up"}
        </button>
      </form>
    </AuthShell>
  );
}
