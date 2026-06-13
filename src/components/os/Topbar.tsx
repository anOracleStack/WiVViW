"use client";

import Link from "next/link";
import { useDashboardAuth } from "@/components/DashboardAuth";

export default function Topbar({ projectName }: { projectName?: string }) {
  const { canRun, email } = useDashboardAuth();

  return (
    <header className="flex items-center justify-between border-b border-[hsl(var(--glass-border))] px-8 py-4">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[10px] tracking-[0.35em] text-[hsl(var(--text-muted))]">
          ACTIVE PROJECT
        </p>
        <p className="mt-0.5 text-sm text-[hsl(var(--text-primary))]">
          {projectName ?? "No project selected"}
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs text-[hsl(var(--text-muted))]">
        {canRun && email && (
          <span className="hidden max-w-[200px] truncate sm:inline">{email}</span>
        )}
        <Link
          href="/dashboard/receipts"
          className="rounded-full border border-[hsl(var(--glass-border))] px-3 py-1 transition hover:border-[hsl(var(--primary-amber)/0.35)] hover:text-[hsl(var(--text-primary))]"
        >
          Receipts
        </Link>
        <Link
          href="/dashboard/exports"
          className="rounded-full border border-[hsl(var(--glass-border))] px-3 py-1 transition hover:border-[hsl(var(--primary-amber)/0.35)] hover:text-[hsl(var(--text-primary))]"
        >
          Export
        </Link>
      </div>
    </header>
  );
}
