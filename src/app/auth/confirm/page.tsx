"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AuthConfirmPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const nextPath = useMemo(() => {
    const nextParam = sp.get("next") ?? "/dashboard";
    return nextParam.startsWith("/") ? nextParam : `/${nextParam}`;
  }, [sp]);

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: token.trim(),
        type: "email",
      });
      if (error) {
        setMessage(error.message);
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Confirmation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Confirm your email</h1>
          <p className="mt-1 text-sm text-zinc-400">
            If the email link failed (prefetch, wrong browser, expired), paste the 6-digit code from the email.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" aria-busy={loading}>
          {message && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
              {message}
            </div>
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
            <label htmlFor="token" className="block text-sm font-medium text-zinc-300">
              Code
            </label>
            <input
              id="token"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none"
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Confirming…" : "Confirm"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          <Link href="/login" className="hover:text-zinc-400">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

