"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDranbSessionLive } from "@/hooks/useDranbSessionLive";

const STAGES = [
  { step: 1, name: "Clotho", label: "Generate" },
  { step: 2, name: "Lachesis", label: "Audit" },
  { step: 3, name: "Eunoia", label: "Refine" },
];

const SCORE_CATEGORIES = [
  { key: "uniqueness", label: "Uniqueness & Distinctiveness", weight: 0.2 },
  { key: "memorability", label: "Memorability & Recall", weight: 0.15 },
  { key: "commercial_viability", label: "Commercial Viability", weight: 0.15 },
  { key: "phonetic_strength", label: "Phonetic Strength", weight: 0.1 },
  { key: "visual_potential", label: "Visual & Typographic", weight: 0.1 },
  { key: "domain_plausibility", label: "Domain & Handle", weight: 0.1 },
  { key: "cultural_safety", label: "Cultural & Linguistic Safety", weight: 0.1 },
  { key: "strategic_alignment", label: "Strategic Alignment", weight: 0.1 },
];

function weightedOverall(scores: Record<string, number> | undefined): number | null {
  if (!scores) return null;
  let sum = 0;
  let w = 0;
  for (const c of SCORE_CATEGORIES) {
    const v = scores[c.key];
    if (typeof v === "number" && !Number.isNaN(v)) {
      sum += v * c.weight;
      w += c.weight;
    }
  }
  if (w === 0) return null;
  return sum / w;
}

function ScoreBar({ value, label }: { value: number; label: string }) {
  const pct = Math.min(100, Math.max(0, value));
  const color =
    pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500/80";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="text-zinc-300">{Math.round(pct)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function DranbSessionPage() {
  const params = useParams();
  const sessionId = params.session as string;
  const { data, error, live } = useDranbSessionLive(sessionId);

  const finalPackage = data?.packages?.find(
    (p) => p.step_number === 3 && p.package_type === "deliverable"
  );
  const finalContent = finalPackage?.content as {
    finalists?: Array<{
      name?: string;
      rationale?: string;
      scores?: Record<string, number>;
      confidence?: number;
      next_steps?: string[];
    }>;
    eliminated?: Array<{ name?: string; reason?: string }>;
    dark_horse?: { name?: string; scores?: Record<string, number> } | null;
    synthesis_notes?: string;
  } | undefined;

  const completedSteps = new Set(
    data?.events
      ?.filter((e) => e.event_type === "moirai.step.completed")
      .map((e) => (e.payload?.step as number) ?? 0) ?? []
  );
  const isComplete = completedSteps.has(3);

  const runTotals = (() => {
    const pkgs = data?.packages ?? [];
    let tokens = 0;
    let cost = 0;
    let latencies = 0;
    let nLat = 0;
    for (const p of pkgs) {
      if (p.tokens_used != null) tokens += p.tokens_used;
      if (p.cost_estimate != null) cost += Number(p.cost_estimate);
      if (p.latency_ms != null) {
        latencies += p.latency_ms;
        nLat += 1;
      }
    }
    return {
      tokens,
      cost,
      avgLatencyMs: nLat > 0 ? Math.round(latencies / nLat) : null,
    };
  })();

  if (error && !data) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/engines/dranb" className="text-sm text-zinc-400 hover:text-white">
          ← Back to dRANb
        </Link>
        <p className="text-amber-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/engines/dranb" className="text-sm text-zinc-400 hover:text-white">
          ← Back to dRANb
        </Link>
        <span className="text-xs text-zinc-500">{sessionId}</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">dRANb run</h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
          <span>{isComplete ? "Complete." : "MOIRAI pipeline in progress…"}</span>
          {live && (
            <span className="rounded border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium tracking-wide text-emerald-400">
              Live
            </span>
          )}
        </p>
      </div>

      {(runTotals.tokens > 0 || runTotals.cost > 0 || runTotals.avgLatencyMs != null) && (
        <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
          {runTotals.tokens > 0 && (
            <span>
              Tokens (sum): <span className="text-zinc-300">{runTotals.tokens.toLocaleString()}</span>
            </span>
          )}
          {runTotals.cost > 0 && (
            <span>
              Est. cost:{" "}
              <span className="text-zinc-300">
                ${runTotals.cost < 0.01 ? runTotals.cost.toFixed(4) : runTotals.cost.toFixed(2)}
              </span>
            </span>
          )}
          {runTotals.avgLatencyMs != null && (
            <span>
              Avg stage latency:{" "}
              <span className="text-zinc-300">{runTotals.avgLatencyMs} ms</span>
            </span>
          )}
        </div>
      )}

      {/* Live progress */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-sm font-medium text-zinc-300">Pipeline</h2>
        <ul className="space-y-3">
          {STAGES.map(({ step, name, label }) => (
            <li key={step} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                  completedSteps.has(step)
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {completedSteps.has(step) ? "✓" : step}
              </span>
              <span className="text-zinc-300">
                {name} <span className="text-zinc-500">— {label}</span>
              </span>
            </li>
          ))}
        </ul>
        {data?.events && data.events.length > 0 && (
          <div className="mt-4 max-h-40 overflow-y-auto rounded border border-zinc-800 p-3">
            <p className="mb-2 text-xs font-medium text-zinc-500">Events</p>
            {data.events.map((ev, i) => (
              <div key={i} className="text-xs text-zinc-400">
                <span className="text-zinc-300">{ev.event_type}</span>{" "}
                {ev.payload?.step != null && `(step ${ev.payload.step})`}
                {typeof (ev.payload as { error?: unknown }).error === "string" && (
                  <div className="mt-1 whitespace-pre-wrap rounded border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-amber-200">
                    {(ev.payload as { error: string }).error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results with score bars */}
      {finalContent?.finalists && finalContent.finalists.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Finalists</h2>
          <div className="space-y-8">
            {finalContent.finalists.map((f, i) => {
              const overall = weightedOverall(f.scores);
              return (
              <div
                key={i}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {f.name ?? `#${i + 1}`}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                    {overall != null && (
                      <span className="rounded-md border border-zinc-700 bg-zinc-950/80 px-2 py-0.5 text-zinc-200">
                        Weighted score: {Math.round(overall)} / 100
                      </span>
                    )}
                    {f.confidence != null && (
                      <span>Confidence: {Math.round((f.confidence ?? 0) * 100)}%</span>
                    )}
                  </div>
                </div>
                {f.rationale && (
                  <p className="mb-4 text-sm text-zinc-400">{f.rationale}</p>
                )}
                {f.scores && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SCORE_CATEGORIES.map((cat) => {
                      const v = f.scores?.[cat.key] ?? 0;
                      return (
                        <ScoreBar
                          key={cat.key}
                          value={v}
                          label={cat.label}
                        />
                      );
                    })}
                  </div>
                )}
                {f.next_steps && f.next_steps.length > 0 && (
                  <ul className="mt-4 list-inside list-disc text-xs text-zinc-500">
                    {f.next_steps.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
            })}
          </div>

          {finalContent.eliminated && finalContent.eliminated.length > 0 && (
            <div className="rounded-lg border border-zinc-800 p-4">
              <h3 className="mb-2 text-sm font-medium text-zinc-400">Why not</h3>
              <ul className="space-y-1 text-sm text-zinc-500">
                {finalContent.eliminated.map((e, i) => (
                  <li key={i}>
                    <strong className="text-zinc-400">{e.name}</strong>: {e.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {finalContent.dark_horse && (() => {
            const dh = finalContent.dark_horse!;
            const dhOverall = weightedOverall(dh.scores);
            return (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <h3 className="mb-2 text-sm font-medium text-amber-200">Dark horse</h3>
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="font-medium text-white">{dh.name}</p>
                  {dhOverall != null && (
                    <span className="text-xs text-amber-200/90">
                      Weighted: {Math.round(dhOverall)} / 100
                    </span>
                  )}
                </div>
                {dh.scores && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {SCORE_CATEGORIES.map((cat) => (
                      <ScoreBar
                        key={cat.key}
                        value={dh.scores?.[cat.key] ?? 0}
                        label={cat.label}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {finalContent.synthesis_notes && (
            <div className="rounded-lg border border-zinc-800 p-4">
              <h3 className="mb-2 text-sm font-medium text-zinc-400">Synthesis</h3>
              <p className="text-sm text-zinc-400 whitespace-pre-wrap">
                {finalContent.synthesis_notes}
              </p>
            </div>
          )}
        </div>
      )}

      {isComplete && !finalContent?.finalists?.length && (
        <p className="text-zinc-500">
          Pipeline finished. Final package is still being written or format differs.
        </p>
      )}
    </div>
  );
}
