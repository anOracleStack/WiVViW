"use client";
import React, { useEffect, useMemo, useState } from "react";
export default function Waveform({ active }: { active: boolean }) {
  const bars = useMemo(() => Array.from({ length: 18 }).map((_, i) => i), []);
  const [tick, setTick] = useState(0);
  useEffect(() => { if (!active) return; const id = setInterval(() => setTick((t) => t + 1), 120); return () => clearInterval(id); }, [active]);
  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((b) => {
        const h = active ? 6 + ((Math.sin((tick + b) * 0.8) + 1) / 2) * 18 : 6;
        return <div key={b} className="w-[3px] rounded-full bg-black/50" style={{ height: `${h}px`, opacity: active ? 0.85 : 0.35 }} />;
      })}
    </div>
  );
}
