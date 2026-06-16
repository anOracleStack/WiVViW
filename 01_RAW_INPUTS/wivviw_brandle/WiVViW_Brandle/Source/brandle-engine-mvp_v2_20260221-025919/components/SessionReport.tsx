"use client";
import React from "react";
import { useEngineStore } from "@/lib/store";
export default function SessionReport() {
  const r = useEngineStore((s) => s.report);
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur border border-black/5 shadow-sm p-3">
      <div className="text-xs tracking-[0.25em] text-black/45">SESSION REPORT</div>
      <div className="mt-3 text-sm text-black/65">
        <div><span className="text-black/45">Chapter:</span> {r.chapterId.slice(0,10)}…</div>
        <div className="mt-2"><span className="text-black/45">Goals:</span> {r.goals.join(" ")}</div>
        <div className="mt-2"><span className="text-black/45">Updated:</span> {new Date(r.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
}
