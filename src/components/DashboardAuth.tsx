"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import SignupGateModal, { type SignupGateReason } from "@/components/auth/SignupGateModal";

type DashboardAuthContextValue = {
  /** Signed in with an allowed account — can run engines and APIs. */
  canRun: boolean;
  email: string | null;
  requestSignup: (reason?: SignupGateReason, engineName?: string) => void;
};

const DashboardAuthContext = createContext<DashboardAuthContextValue>({
  canRun: false,
  email: null,
  requestSignup: () => {},
});

export function useDashboardAuth() {
  return useContext(DashboardAuthContext);
}

export function DashboardAuthProvider({
  canRun,
  email,
  children,
}: Omit<DashboardAuthContextValue, "requestSignup"> & { children: ReactNode }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [gateReason, setGateReason] = useState<SignupGateReason>("run");
  const [gateEngine, setGateEngine] = useState<string | undefined>();

  const requestSignup = useCallback(
    (reason: SignupGateReason = "run", engineName?: string) => {
      setGateReason(reason);
      setGateEngine(engineName);
      setGateOpen(true);
    },
    []
  );

  return (
    <DashboardAuthContext.Provider value={{ canRun, email, requestSignup }}>
      {children}
      <SignupGateModal
        open={gateOpen}
        reason={gateReason}
        engineName={gateEngine}
        onClose={() => setGateOpen(false)}
      />
    </DashboardAuthContext.Provider>
  );
}

export function GuestBrowseBanner() {
  const { canRun } = useDashboardAuth();
  if (canRun) return null;

  return (
    <div
      className="mb-6 rounded-xl border border-[hsl(var(--glass-border))] px-4 py-2.5 text-center text-xs text-[hsl(var(--text-muted))]"
      role="status"
    >
      Exploring — sign in when you save or run.
    </div>
  );
}
