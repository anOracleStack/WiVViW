"use client";
import React, { useMemo } from "react";
import { useEngineStore } from "@/lib/store";
export default function CandidateDetail() {
  const candidates = useEngineStore((s) => s.candidates);
  const activeId = useEngineStore((s) => s.activeCandidateId);
  const setStatus = useEngineStore((s) => s.actions.setCandidateStatus);
  const c = useMemo(() => candidates.find((x) => x.id === activeId), [candidates, activeId]);
  if (!c) return (
    <div className="rounded-2xl bg-white/40 backdrop-blur border border-black/5 shadow-sm p-4">
      <div className="text-xs tracking-[0.25em] text-black/45">DETAIL</div>
      <div className="mt-4 text-sm text-black/55">Pick a candidate to inspect signals.</div>
    </div>
  );
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur border border-black/5 shadow-sm p-4">
      <div className="text-xs tracking-[0.25em] text-black/45">ACTIVE CANDIDATE</div>
      <div className="mt-2 text-2xl font-semibold text-black/80">{c.name}</div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-black/70">
        <div className="rounded-xl bg-white/70 border border-black/10 p-3">Domain: {c.signals.domain.status}</div>
        <div className="rounded-xl bg-white/70 border border-black/10 p-3">Handles: signal</div>
        <div className="rounded-xl bg-white/70 border border-black/10 p-3">Trademark: {c.signals.trademark.status}</div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setStatus(c.id, "promising", "Marked promising.")} className="px-4 py-2 rounded-xl bg-white/80 border border-black/10 hover:bg-white transition text-sm">Promising</button>
        <button onClick={() => setStatus(c.id, "shortlisted", "Added to shortlist.")} className="px-4 py-2 rounded-xl bg-black/90 text-white hover:bg-black transition text-sm">Shortlist</button>
        <button onClick={() => setStatus(c.id, "selected", "Final selection locked.")} className="px-4 py-2 rounded-xl bg-black text-white hover:bg-black transition text-sm">Select</button>
      </div>
    </div>
  );
}
