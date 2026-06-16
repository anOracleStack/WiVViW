"use client";
import React from "react";
import clsx from "clsx";
import { useEngineStore } from "@/lib/store";
export default function CandidateBoard() {
  const candidates = useEngineStore(s => s.candidates);
  const activeId = useEngineStore(s => s.activeCandidateId);
  const setActive = useEngineStore(s => s.actions.setActiveCandidate);
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur border border-black/5 shadow-sm p-3">
      <div className="text-xs tracking-[0.25em] text-black/45">CANDIDATES</div>
      <div className="mt-3 space-y-2">
        {candidates.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)} className={clsx("w-full text-left rounded-xl px-3 py-2 border transition", activeId===c.id ? "bg-white/80 border-black/20":"bg-white/55 border-black/10 hover:bg-white/70")}>
            <div className="font-medium text-black/80">{c.name}</div>
            <div className="text-xs text-black/50">{c.status}</div>
          </button>
        ))}
        {!candidates.length ? <div className="text-sm text-black/50 py-6 text-center">Speak a name idea (or say: <span className="font-mono">Add candidate: NovaMint</span>)</div> : null}
      </div>
    </div>
  );
}
