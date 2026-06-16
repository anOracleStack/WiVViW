"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ENGINE_REGISTRY, type EngineId } from "@/lib/engines/engine-contract";

interface EngineConstellationProps {
  engineIds: EngineId[];
}

function spineX(index: number, total: number) {
  const pad = 7;
  const span = 100 - pad * 2;
  return pad + (span * index) / Math.max(total - 1, 1);
}

export default function EngineConstellation({ engineIds }: EngineConstellationProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const pairs = engineIds.slice(0, -1).map((_, i) => ({
    from: { x: spineX(i, engineIds.length), y: 42 },
    to: { x: spineX(i + 1, engineIds.length), y: 42 },
  }));

  return (
    <div className="relative mx-auto w-full max-w-4xl px-2">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="constellation-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--genesis-gold) / 0.08)" />
            <stop offset="50%" stopColor="hsl(var(--genesis-gold) / 0.28)" />
            <stop offset="100%" stopColor="hsl(var(--genesis-lavender) / 0.12)" />
          </linearGradient>
        </defs>
        {pairs.map((pair, i) => (
          <line
            key={i}
            x1={pair.from.x}
            y1={pair.from.y}
            x2={pair.to.x}
            y2={pair.to.y}
            stroke="url(#constellation-line)"
            strokeWidth="0.35"
            strokeDasharray="1.5 1.2"
            className={`constellation-line transition-opacity duration-700 ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${200 + i * 80}ms` }}
          />
        ))}
      </svg>

      <div className="engine-constellation-grid relative grid grid-cols-4 gap-x-3 gap-y-10 sm:grid-cols-7 sm:gap-x-2 sm:gap-y-6">
        {engineIds.map((id, i) => {
          const engine = ENGINE_REGISTRY[id];
          return (
            <Link
              key={id}
              href={engine.route}
              className={`engine-node group relative flex h-[152px] w-full flex-col items-center justify-center text-center transition-all duration-500 sm:h-[148px] ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${280 + i * 90}ms` }}
            >
              <span
                className="engine-node-orbit absolute -inset-3 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, hsl(${engine.colorHsl} / 0.18), transparent 70%)`,
                }}
                aria-hidden
              />
              <span
                className="engine-node-shell relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border px-2.5 py-4 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{
                  borderColor: `hsl(${engine.colorHsl} / 0.28)`,
                  background: `linear-gradient(145deg, hsl(${engine.colorHsl} / 0.14), hsl(250 35% 10% / 0.72))`,
                  boxShadow: `
                    0 0 0 1px hsl(${engine.colorHsl} / 0.12),
                    0 0 28px hsl(${engine.colorHsl} / 0.16),
                    0 12px 32px hsl(240 40% 4% / 0.35)
                  `,
                }}
              >
                <span
                  className="engine-node-dot h-3.5 w-3.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: `hsl(${engine.colorHsl})`,
                    boxShadow: `0 0 16px hsl(${engine.colorHsl} / 0.65), 0 0 4px hsl(${engine.colorHsl} / 0.9)`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
                <span className="shrink-0 text-sm font-semibold tracking-tight text-[hsl(var(--text-primary))]">
                  {engine.label}
                </span>
                <span className="engine-node-hint line-clamp-3 min-h-[2.75rem] max-w-full text-[0.68rem] leading-snug text-[hsl(var(--text-muted)/0.92)] sm:text-xs">
                  {engine.outcomeHint}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
