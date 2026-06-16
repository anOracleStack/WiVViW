"use client";

import { useEffect, useRef } from "react";

function StarField() {
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

    const count = 140;
    const stars = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.35 + Math.random() * 1.6,
      speed: 0.00004 + Math.random() * 0.0001,
      drift: (Math.random() - 0.5) * 0.00012,
      twinkleSpeed: 0.012 + Math.random() * 0.025,
      twinklePhase: Math.random() * Math.PI * 2,
      hue:
        i % 4 === 0
          ? "42 85% 72%"
          : i % 4 === 1
            ? "270 55% 82%"
            : i % 4 === 2
              ? "220 60% 78%"
              : "45 30% 92%",
      alpha: 0.18 + Math.random() * 0.55,
    }));

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        star.y -= star.speed;
        star.x += star.drift;
        if (star.y < -0.02) {
          star.y = 1.02;
          star.x = Math.random();
        }
        if (star.x < -0.02 || star.x > 1.02) star.drift *= -1;

        const twinkle =
          0.55 + Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.45;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue} / ${star.alpha * twinkle})`;
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
      className="cosmic-starfield pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

export default function GenesisBackdrop() {
  return (
    <>
      <div
        className="cosmic-base pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 90% at 50% -5%, hsl(250 45% 18% / 0.95), transparent 58%),
            radial-gradient(ellipse 85% 70% at 88% 72%, hsl(280 55% 28% / 0.55), transparent 52%),
            radial-gradient(ellipse 75% 60% at 8% 68%, hsl(220 50% 22% / 0.5), transparent 48%),
            radial-gradient(ellipse 55% 45% at 52% 105%, hsl(42 70% 38% / 0.22), transparent 55%),
            linear-gradient(180deg, hsl(250 42% 6%) 0%, hsl(260 38% 8%) 45%, hsl(240 35% 5%) 100%)
          `,
        }}
        aria-hidden
      />

      <div
        className="cosmic-nebula cosmic-nebula--a pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 28% 38%, hsl(var(--genesis-lavender) / 0.32), transparent 62%),
            radial-gradient(ellipse 48% 40% at 72% 28%, hsl(var(--genesis-gold) / 0.18), transparent 58%)
          `,
        }}
        aria-hidden
      />

      <div
        className="cosmic-nebula cosmic-nebula--b pointer-events-none absolute inset-0 opacity-55"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 62% 78%, hsl(270 50% 35% / 0.38), transparent 60%),
            radial-gradient(ellipse 40% 35% at 18% 82%, hsl(215 45% 30% / 0.28), transparent 55%)
          `,
        }}
        aria-hidden
      />

      <div
        className="genesis-mesh cosmic-mesh pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            conic-gradient(from 195deg at 48% 42%, hsl(var(--genesis-gold) / 0.1), transparent 32%, hsl(var(--genesis-lavender) / 0.14), transparent 68%, hsl(220 55% 55% / 0.08))
          `,
        }}
        aria-hidden
      />

      <StarField />

      <div
        className="genesis-orbit-ring pointer-events-none absolute left-1/2 top-[32%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--genesis-gold)/0.12)]"
        aria-hidden
      />
      <div
        className="genesis-orbit-ring genesis-orbit-ring--slow pointer-events-none absolute left-1/2 top-[38%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--genesis-lavender)/0.1)]"
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
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              animationDelay: `${i * 1.1}s`,
            }}
          />
        ))}
      </div>

      <div className="void-grain pointer-events-none absolute inset-0 opacity-30" aria-hidden />
    </>
  );
}
