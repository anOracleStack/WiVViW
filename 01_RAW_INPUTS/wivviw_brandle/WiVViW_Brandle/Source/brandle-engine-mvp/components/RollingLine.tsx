"use client";
import React from "react";
export default function RollingLine({ label, text }: { label: string; text: string }) {
  const WINDOW = 110;
  const slice = text.length > WINDOW ? text.slice(text.length - WINDOW) : text;
  return (
    <div className="flex items-center gap-3">
      <div className="text-[11px] tracking-[0.25em] text-black/40 w-16">{label}</div>
      <div className="w-[320px] overflow-hidden whitespace-nowrap font-mono text-sm text-black/70">{slice}</div>
    </div>
  );
}
