export default function GenesisBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, hsl(var(--genesis-gold) / 0.18), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 80%, hsl(var(--genesis-lavender) / 0.35), transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 15% 60%, hsl(var(--genesis-pearl) / 0.5), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="genesis-orbs pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[12, 28, 45, 62, 78, 88].map((left, i) => (
          <span
            key={left}
            className="genesis-orb absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${18 + (i % 3) * 22}%`,
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
