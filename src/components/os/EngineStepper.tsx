import type { EnginePhase } from "@/lib/engines/engine-contract";

const PHASES: EnginePhase[] = [
  "intake",
  "generate",
  "evaluate",
  "shortlist",
  "decide",
  "export",
  "handoff",
];

const LABELS: Record<EnginePhase, string> = {
  intake: "Intake",
  generate: "Generate",
  evaluate: "Evaluate",
  shortlist: "Shortlist",
  decide: "Decide",
  export: "Export",
  handoff: "Handoff",
};

export default function EngineStepper({
  current,
  accentHsl,
}: {
  current: EnginePhase;
  accentHsl?: string;
}) {
  const idx = PHASES.indexOf(current);
  const accent = accentHsl ?? "42 87% 55%";

  return (
    <ol className="flex flex-wrap justify-center gap-2">
      {PHASES.map((phase, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li
            key={phase}
            className={`rounded-full px-3 py-1 text-xs tracking-wide ${
              active
                ? "font-medium text-white"
                : done
                  ? "text-white/70"
                  : "text-white/35"
            }`}
            style={
              active
                ? { backgroundColor: `hsl(${accent} / 0.25)`, border: `1px solid hsl(${accent} / 0.5)` }
                : undefined
            }
          >
            {LABELS[phase]}
          </li>
        );
      })}
    </ol>
  );
}
