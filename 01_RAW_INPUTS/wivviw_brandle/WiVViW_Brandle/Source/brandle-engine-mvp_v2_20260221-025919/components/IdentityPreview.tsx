"use client";
import React, { useMemo } from "react";
import { useEngineStore } from "@/lib/store";
function fmt(name: string) { return name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9_\.]/g, ""); }
export default function IdentityPreview() {
  const candidates = useEngineStore((s) => s.candidates);
  const activeId = useEngineStore((s) => s.activeCandidateId);
  const c = useMemo(() => candidates.find((x) => x.id === activeId), [candidates, activeId]);
  const base = c ? fmt(c.name) : "yourname";
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur border border-black/5 shadow-sm p-4">
      <div className="text-xs tracking-[0.25em] text-black/45">IDENTITY PREVIEW</div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-black/70">
        <div className="rounded-xl bg-white/70 border border-black/10 p-3">https://{base}.com</div>
        <div className="rounded-xl bg-white/70 border border-black/10 p-3">instagram.com/{base}</div>
      </div>
      {!c ? <div className="mt-3 text-sm text-black/50">Select a candidate to populate previews.</div> : null}
    </div>
  );
}
