"use client";

import { useEffect, useState } from "react";
import { useDashboardAuth } from "@/components/DashboardAuth";
import ConfidenceBadge from "@/components/os/ConfidenceBadge";
import type { ConfidenceLevel } from "@/lib/engines/engine-contract";

export default function ReceiptsPage() {
  const { canRun } = useDashboardAuth();
  const [rows, setRows] = useState<
    { id: string; claim_id: string; source: string; confidence: number; created_at: string }[]
  >([]);

  useEffect(() => {
    if (!canRun) return;
    fetch("/api/os/receipts", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setRows(d.receipts ?? []))
      .catch(() => setRows([]));
  }, [canRun]);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl font-semibold text-white">Receipts</h1>
      <p className="mt-2 text-sm text-white/60">Global ledger of engine inputs, transforms, and outputs.</p>
      <ul className="mt-8 space-y-3 text-left">
        {rows.map((r) => (
          <li key={r.id} className="rounded-lg border border-white/10 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-white">{r.claim_id}</span>
              <ConfidenceBadge
                value={
                  (r.confidence >= 0.85 ? "verified" : r.confidence >= 0.6 ? "likely" : "estimate") as ConfidenceLevel
                }
              />
            </div>
            <p className="mt-1 text-xs text-white/50">{r.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
