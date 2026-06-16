export default function VoidBackdrop() {
  return (
    <>
      <div className="void-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="void-grain pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% -10%, hsl(var(--primary-amber) / 0.14), transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 100% 60%, hsl(var(--accent-teal) / 0.08), transparent 50%)",
        }}
        aria-hidden
      />
    </>
  );
}
