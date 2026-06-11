"use client";
import React, { useState } from "react";
import { useEngineStore } from "@/lib/store";
export default function TrendsPanel() {
  const [open, setOpen] = useState(false);
  const trends = useEngineStore(s => s.trends);
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/45 backdrop-blur border border-black/5 shadow-sm text-xs text-black/60 hover:bg-white/60 transition">
        <span className="text-base">✦</span><span>State of the Union</span>
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-[420px] max-w-[90vw] rounded-2xl bg-white/85 backdrop-blur border border-black/10 shadow-lg p-4 z-20">
          <div className="text-xs tracking-[0.2em] text-black/45">TRENDS</div>
          <div className="mt-2 space-y-3">
            {trends.map(t => (
              <div key={t.id} className="rounded-xl border border-black/10 bg-white/70 p-3">
                <div className="text-sm font-medium text-black/80">{t.title}</div>
                <div className="mt-1 text-xs text-black/60">{t.bullet}</div>
                <div className="mt-2 text-xs text-black/55"><span className="font-medium text-black/70">Why it matters:</span> {t.whyItMatters}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
