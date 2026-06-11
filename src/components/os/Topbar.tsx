"use client";

import { useDashboardAuth } from "@/components/DashboardAuth";

export default function Topbar({ projectName }: { projectName?: string }) {
  const { canRun, email } = useDashboardAuth();

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <div>
        <div className="text-xs tracking-widest text-white/40">ACTIVE PROJECT</div>
        <div className="text-sm text-white">{projectName ?? "No project selected"}</div>
      </div>
      <div className="flex items-center gap-3 text-xs text-white/50">
        {canRun && email && <span className="hidden max-w-[180px] truncate sm:inline">{email}</span>}
        <span className="rounded-full border border-white/10 px-2 py-1">Receipts · Export</span>
      </div>
    </header>
  );
}
