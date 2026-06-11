"use client";
import React from "react";
import { useEngineStore } from "@/lib/store";
export default function QuoteStrip() {
  const quote = useEngineStore(s => s.quote);
  if (!quote) return null;
  return (
    <div className="px-4 py-2 rounded-xl bg-white/45 backdrop-blur border border-black/5 shadow-sm">
      <div className="text-xs tracking-[0.2em] text-black/45">QUOTE</div>
      <div className="mt-1 text-sm text-black/70 italic">“{quote.text}”</div>
    </div>
  );
}
