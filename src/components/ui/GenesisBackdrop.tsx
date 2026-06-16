"use client";

import { useEffect, useRef } from "react";

function DnaHelix() {
  return (
    <svg
      className="genesis-helix pointer-events-none absolute left-1/2 top-[18%] h-[420px] w-[120px] -translate-x-1/2 opacity-[0.14]"
      viewBox="0 0 120 420"
      aria-hidden
    >
      <defs>
        <linearGradient id="helix-strand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--genesis-gold) / 0.6)" />
          <stop offset="50%" stopColor="hsl(var(--genesis-lavender) / 0.5)" />
          <stop offset="100%" stopColor="hsl(var(--genesis-gold) / 0.3)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 18 }).map((_, i) => {
        const y = 12 + i * 22;
        const phase = i * 0.55;
        const leftX = 42 + Math.sin(phase) * 18;
        const rightX = 78 - Math.sin(phase) * 18;
        return (
          <g key={i}>
            <line
              x1={leftX}
              y1={y}
              x2={rightX}
              y2={y}
              stroke="url(#helix-strand)"
              strokeWidth="0.8"
              opacity={0.35 + (i % 3) * 0.1}
            />
            <circle cx={leftX} cy={y} r="2.2" fill="hsl(var(--genesis-gold) / 0.45)" />
            <circle cx={rightX} cy={y} r="2.2" fill="hsl(var(--genesis-lavender) / 0.5)" />
          </g>
        );
      })}
    </svg>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const count = 48;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      speed: 0.00008 + Math.random() * 0.00015,
      drift: (Math.random() - 0.5) * 0.0002,
      hue: i % 3 === 0 ? "42 75% 58%" : i % 3 === 1 ? "270 40% 75%" : "250 35% 82%",
      alpha: 0.12 + Math.random() * 0.28,
    }));

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < -0.02 || p.x > 1.02) p.drift *= -1;

        const twinkle = 0.65 + Math.sin(frame * 0.02 + p.x * 12) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue} / ${p.alpha * twinkle})`;
        ctx.fill();
      }

      frame += 1;
      raf = window.requestAnimationFrame(draw);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

export default function GenesisBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% -10%, hsl(var(--genesis-gold) / 0.22), transparent 55%),
            radial-gradient(ellipse 70% 55% at 85% 75%, hsl(var(--genesis-lavender) / 0.28), transparent 50%),
            radial-gradient(ellipse 55% 45% at 10% 65%, hsl(var(--genesis-pearl) / 0.55), transparent 48%),
            radial-gradient(ellipse 40% 35% at 50% 100%, hsl(var(--genesis-indigo) / 0.18), transparent 60%)
          `,
        }}
        aria-hidden
      />

      <div
        className="genesis-mesh pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            conic-gradient(from 210deg at 50% 40%, hsl(var(--genesis-gold) / 0.06), transparent 35%, hsl(var(--genesis-lavender) / 0.08), transparent 70%, hsl(var(--genesis-gold) / 0.05))
          `,
        }}
        aria-hidden
      />

      <ParticleField />
      <DnaHelix />

      <div
        className="genesis-orbit-ring pointer-events-none absolute left-1/2 top-[32%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--genesis-gold)/0.08)]"
        aria-hidden
      />
      <div
        className="genesis-orbit-ring genesis-orbit-ring--slow pointer-events-none absolute left-1/2 top-[38%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--genesis-lavender)/0.06)]"
        aria-hidden
      />

      <div className="genesis-orbs pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[8, 22, 38, 55, 72, 88, 94].map((left, i) => (
          <span
            key={left}
            className="genesis-orb absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${14 + (i % 4) * 18}%`,
              width: `${5 + (i % 4) * 4}px`,
              height: `${5 + (i % 4) * 4}px`,
              animationDelay: `${i * 1.1}s`,
            }}
          />
        ))}
      </div>

      <div className="void-grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
    </>
  );
}
