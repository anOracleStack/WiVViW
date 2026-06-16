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
      className="glass-panel mb-6 border-[hsl(var(--primary-amber)/0.25)] px-4 py-3 text-center text-sm text-[hsl(var(--text-primary))]"
      role="status"
    >
      <p className="leading-relaxed text-[hsl(var(--text-muted))]">
        You&apos;re browsing in preview mode.
        <br />
        Explore the shell — sign up to run dRANb and get results.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <Link href="/signup" className="btn-primary px-4 py-2">
          Sign up
        </Link>
        <Link href="/login" className="btn-secondary px-4 py-2">
          Sign in
        </Link>
      </div>
    </div>
  );
}
