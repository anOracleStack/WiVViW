"use client";

import { useEffect, useState } from "react";
import ConfidenceBadge from "./ConfidenceBadge";
import type { ConfidenceLevel } from "@/lib/engines/engine-contract";

interface ReceiptRow {
  id: string;
  claim_id: string;
  source: string;
  confidence: number;
  created_at: string;
  evidence?: { engine?: string; step?: string };
}

export default function ReceiptsDrawer({
  sessionId,
  open,
  onClose,
}: {
  sessionId?: string;
  open: boolean;
  onClose: () => void;
}) {
  const [rows, setRows] = useState<ReceiptRow[]>([]);

  useEffect(() => {
    if (!open || !sessionId) return;
    fetch(`/api/os/receipts?session_id=${sessionId}`, { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setRows(d.receipts ?? []))
      .catch(() => setRows([]));
  }, [open, sessionId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onClose}>
      <div
        className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-zinc-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-widest text-white">RECEIPTS</h2>
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white">
            Close
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          {rows.length === 0 && (
            <li className="text-sm text-white/40">No receipts for this session yet.</li>
          )}
          {rows.map((r) => (
            <li key={r.id} className="rounded-lg border border-white/10 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-white/60">{r.claim_id}</span>
                <ConfidenceBadge
                  value={
                    (r.confidence >= 0.85
                      ? "verified"
                      : r.confidence >= 0.6
                        ? "likely"
                        : "estimate") as ConfidenceLevel
                  }
                />
              </div>
              <p className="mt-2 text-sm text-white">{r.source}</p>
              <p className="mt-1 text-xs text-white/40">{r.created_at}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
