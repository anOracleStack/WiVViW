import ConstellationMap from "@/components/galaxy/ConstellationMap";

export default function GalaxyPage() {
  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.3em] text-white/40">THE CONSTELLATION</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">WiVViW Galaxy</h1>
      <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
        Each engine is its own planet —
        <br />
        same universe, unique color and role.
      </p>
      <div className="mt-10">
        <ConstellationMap completedPhases={3} />
      </div>
    </div>
  );
}
