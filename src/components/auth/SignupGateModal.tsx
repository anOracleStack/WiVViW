"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import BalancedText from "@/components/ui/BalancedText";

export type SignupGateReason = "run" | "save" | "export" | "handoff" | "persist";

const REASON_COPY: Record<SignupGateReason, string> = {
  run: "Sign in to run this engine and keep your results.",
  save: "Sign in to save your progress.",
  export: "Sign in to download your deliverables.",
  handoff: "Sign in to carry this forward to the next step.",
  persist: "Sign in to keep this in your workspace.",
};

export default function SignupGateModal({
  open,
  reason = "run",
  engineName,
  onClose,
}: {
  open: boolean;
  reason?: SignupGateReason;
  engineName?: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const message = engineName
    ? REASON_COPY[reason].replace("this engine", engineName)
    : REASON_COPY[reason];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-[100] m-auto w-full max-w-md rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--shell-surface))] p-0 text-[hsl(var(--text-primary))] shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      <div className="glass-panel rounded-2xl p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Save your progress</p>
        <BalancedText className="mt-4 text-sm text-[hsl(var(--text-muted))]">
          {message}
        </BalancedText>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup" className="btn-primary">
            Create account
          </Link>
          <Link href="/login" className="btn-secondary">
            Sign in
          </Link>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 text-xs text-[hsl(var(--text-muted))] transition hover:text-[hsl(var(--text-primary))]"
        >
          Keep exploring
        </button>
      </div>
    </dialog>
  );
}
