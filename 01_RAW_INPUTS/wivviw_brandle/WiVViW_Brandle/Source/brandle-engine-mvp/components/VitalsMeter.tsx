"use client";
import React from "react";
import { useEngineStore } from "@/lib/store";
export default function VitalsMeter() {
  const v = useEngineStore(s => s.vitals);
  const overall = Math.round((v.pulse + v.stability + v.clarity) / 3);
  const ringStyle: React.CSSProperties = { background: `conic-gradient(rgba(0,0,0,0.7) ${overall * 3.6}deg, rgba(0,0,0,0.1) 0deg)` };
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/45 backdrop-blur border border-black/5 shadow-sm">
      <div className="relative h-14 w-14 rounded-full" style={ringStyle}>
        <div className="absolute inset-[5px] rounded-full bg-white/80 flex items-center justify-center">
          <div className="text-sm font-semibold text-black/70 tabular-nums">{overall}</div>
        </div>
      </div>
      <div className="space-y-1 text-xs text-black/65">
        <div>PULSE {v.pulse}</div><div>STABILITY {v.stability}</div><div>CLARITY {v.clarity}</div>
      </div>
    </div>
  );
}
