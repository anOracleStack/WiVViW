"use client";

import Link from "next/link";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

const NODES = [
  { id: "dranb", x: 50, y: 52, status: "live" as const },
  { id: "brandl", x: 68, y: 38, status: "live" as const },
  { id: "4ield", x: 78, y: 58, status: "live" as const },
  { id: "4tress", x: 62, y: 72, status: "live" as const },
  { id: "v4ult", x: 22, y: 48, status: "live" as const },
  { id: "6roxy", x: 18, y: 24, status: "live" as const },
  { id: "3xec", x: 82, y: 24, status: "live" as const },
  { id: "5ite", x: 35, y: 18, status: "beta" as const },
];

const RITUAL = ["Intake", "Generate", "Evaluate", "Shortlist", "Decide", "Export", "Handoff"];

export default function ConstellationMap({ completedPhases = 2 }: { completedPhases?: number }) {
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#030308]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(232,185,35,0.12), transparent 70%)",
        }}
      />

      {NODES.map((node) => {
        const engine = ENGINE_REGISTRY[node.id as keyof typeof ENGINE_REGISTRY];
        if (!engine) return null;
        const href = engine.route;
        return (
          <Link
            key={node.id}
            href={href}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span
              className="block h-4 w-4 rounded-full shadow-lg transition group-hover:scale-125"
              style={{
                backgroundColor: `hsl(${engine.colorHsl})`,
                boxShadow: `0 0 20px hsl(${engine.colorHsl} / 0.5)`,
              }}
            />
            <span className="absolute left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-widest text-white/70 group-hover:text-white">
              {engine.label}
            </span>
          </Link>
        );
      })}

      <div className="absolute bottom-4 left-0 right-0 px-6">
        <p className="text-center text-[10px] tracking-[0.35em] text-white/35">DNA RITUAL</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {RITUAL.map((step, i) => (
            <span
              key={step}
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                i < completedPhases ? "bg-white/15 text-white" : "text-white/25"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
