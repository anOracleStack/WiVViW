"use client";

import { useState } from "react";
import Link from "next/link";

interface ReceiptRow {
  id: string;
  claim_id: string;
  source: string;
  evidence: unknown;
  confidence: number | null;
  truth_state: string;
  content_hash: string | null;
  created_at: string;
}

export default function TruthOpsPage() {
  const [sessionId, setSessionId] = useState("");
  const [claimId, setClaimId] = useState("");
  const [source, setSource] = useState("manual_ops");
  const [evidenceJson, setEvidenceJson] = useState('{"note":"example"}');
  const [confidence, setConfidence] = useState("");
  const [receipts, setReceipts] = useState<ReceiptRow[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadReceipts() {
    if (!sessionId.trim()) {
      setMessage("Paste a session UUID first.");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const r = await fetch(
        `/api/truth/receipts?session_id=${encodeURIComponent(sessionId.trim())}`,
        { cache: "no-store", credentials: "same-origin" }
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "Failed to load");
      setReceipts(d.receipts ?? []);
      setMessage(`Loaded ${(d.receipts ?? []).length} receipt(s).`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error");
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  }

  async function submitReceipt(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId.trim()) {
      setMessage("Session ID required.");
      return;
    }
    let evidence: unknown;
    try {
      evidence = JSON.parse(evidenceJson) as unknown;
    } catch {
      setMessage("Evidence must be valid JSON.");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const body: Record<string, unknown> = {
        session_id: sessionId.trim(),
        claim_id: claimId.trim() || "unspecified",
        source: source.trim() || "manual_ops",
        evidence,
      };
      if (confidence.trim() !== "") {
        body.confidence = Number(confidence);
      }
      const r = await fetch("/api/truth/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "same-origin",
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "Failed");
      setMessage(d.deduped ? "Deduped (same evidence hash already stored)." : `Saved receipt ${d.id}`);
      await loadReceipts();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Link href="/dashboard/ops/providers" className="text-sm text-zinc-400 hover:text-white">
          ← Ops
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Truth kernel · receipts</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Attach evidence to an odyssey session. Rows dedupe on SHA-256 of evidence JSON.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <label className="block text-sm font-medium text-zinc-300">Session ID</label>
        <input
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="UUID from a dRANb run"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs text-white"
        />
        <button
          type="button"
          onClick={() => void loadReceipts()}
          disabled={loading}
          className="rounded-lg border border-zinc-600 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
        >
          Load receipts
        </button>
      </div>

      <form onSubmit={submitReceipt} className="space-y-4 rounded-lg border border-zinc-800 p-4">
        <h2 className="text-sm font-medium text-zinc-300">New receipt</h2>
        <div>
          <label className="text-xs text-zinc-500">Claim ID</label>
          <input
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm text-white"
            placeholder="e.g. brand_name_uniqueness"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Source</label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Evidence (JSON)</label>
          <textarea
            value={evidenceJson}
            onChange={(e) => setEvidenceJson(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1.5 font-mono text-xs text-white"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Confidence 0–1 (optional)</label>
          <input
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm text-white"
            placeholder="0.85"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Working…" : "Submit receipt"}
        </button>
      </form>

      {message && <p className="text-sm text-zinc-400">{message}</p>}

      {receipts.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-zinc-400">Ledger</h2>
          <ul className="space-y-2 text-xs">
            {receipts.map((r) => (
              <li
                key={r.id}
                className="rounded border border-zinc-800 bg-zinc-950/80 p-3 font-mono text-zinc-300"
              >
                <div className="flex flex-wrap justify-between gap-2 text-zinc-500">
                  <span>{r.truth_state}</span>
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                </div>
                <div className="mt-1 text-zinc-200">{r.claim_id}</div>
                <div className="text-zinc-500">{r.source}</div>
                {r.content_hash && (
                  <div className="mt-1 truncate text-[10px] text-zinc-600">{r.content_hash}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
