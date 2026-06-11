"use client";

import { createContext, useContext, type ReactNode } from "react";
import Link from "next/link";

type DashboardAuthContextValue = {
  /** Signed in with an allowed account — can run engines and APIs. */
  canRun: boolean;
  email: string | null;
};

const DashboardAuthContext = createContext<DashboardAuthContextValue>({
  canRun: false,
  email: null,
});

export function useDashboardAuth() {
  return useContext(DashboardAuthContext);
}

export function DashboardAuthProvider({
  canRun,
  email,
  children,
}: DashboardAuthContextValue & { children: ReactNode }) {
  return (
    <DashboardAuthContext.Provider value={{ canRun, email }}>
      {children}
    </DashboardAuthContext.Provider>
  );
}

export function GuestBrowseBanner() {
  const { canRun } = useDashboardAuth();
  if (canRun) return null;

  return (
    <div
      className="mb-6 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-center text-sm text-indigo-100"
      role="status"
    >
      <p className="leading-relaxed">
        You&apos;re browsing in preview mode.
        <br />
        Explore the app — sign up to run engines and get results.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/signup"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-500"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
