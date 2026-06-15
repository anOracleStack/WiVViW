"use client";

import Link from "next/link";
import { ENGINE_REGISTRY, type EngineId } from "@/lib/engines/engine-contract";
import { isEngineNavigable } from "@/lib/engines/engine-availability";

const NODES = [
  { id: "dranb" as const, x: 50, y: 52 },
  { id: "brandl" as const, x: 68, y: 38 },
  { id: "4ield" as const, x: 78, y: 58 },
  { id: "4tress" as const, x: 62, y: 72 },
  { id: "v4ult" as const, x: 22, y: 48 },
  { id: "6roxy" as const, x: 18, y: 24 },
  { id: "3xec" as const, x: 82, y: 24 },
  { id: "5ite" as const, x: 35, y: 18 },
];

const RITUAL = ["Intake", "Generate", "Evaluate", "Shortlist", "Decide", "Export", "Handoff"];

function EngineNode({
  id,
  x,
  y,
}: {
  id: EngineId;
  x: number;
  y: number;
}) {
  const engine = ENGINE_REGISTRY[id];
  const live = isEngineNavigable(id);
  const href = engine.route;

  const dot = (
    <>
      <span
        className={`block h-4 w-4 rounded-full transition ${live ? "group-hover:scale-125" : "opacity-40"}`}
        style={{
          backgroundColor: `hsl(${engine.colorHsl})`,
          boxShadow: live ? `0 0 20px hsl(${engine.colorHsl} / 0.5)` : undefined,
        }}
      />
      <span
        className={`absolute left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium ${
          live
            ? "text-[hsl(var(--text-muted))] group-hover:text-[hsl(var(--text-primary))]"
            : "text-[hsl(var(--text-muted)/0.5)]"
        }`}
      >
        {engine.label}
      </span>
    </>
  );

  const className = "group absolute -translate-x-1/2 -translate-y-1/2";
  const style = { left: `${x}%`, top: `${y}%` };

  if (live) {
    return (
      <Link href={href} className={className} style={style}>
        {dot}
      </Link>
    );
  }

  return (
    <div className={className} style={style} title={engine.label}>
      {dot}
    </div>
  );
}

export default function ConstellationMap({ completedPhases = 2 }: { completedPhases?: number }) {
  return (
    <div className="glass-panel relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, hsl(var(--primary-amber) / 0.12), transparent 70%)",
        }}
      />

      {NODES.map((node) => (
        <EngineNode key={node.id} id={node.id} x={node.x} y={node.y} />
      ))}

      <div className="absolute bottom-4 left-0 right-0 px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {RITUAL.map((step, i) => (
            <span
              key={step}
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                i < completedPhases
                  ? "bg-[hsl(var(--primary-amber)/0.15)] text-[hsl(var(--text-primary))]"
                  : "text-[hsl(var(--text-muted)/0.45)]"
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
