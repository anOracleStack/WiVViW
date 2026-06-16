"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionTitle from "@/components/ui/SectionTitle";
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
    pct >= 80
      ? "bg-[hsl(var(--accent-teal))]"
      : pct >= 60
        ? "bg-[hsl(var(--primary-amber))]"
        : "bg-red-500/80";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-[hsl(var(--text-muted))]">{label}</span>
        <span className="text-[hsl(var(--text-primary))]">{Math.round(pct)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[hsl(var(--void-surface))]">
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
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <Link
          href="/dashboard/engines/dranb"
          className="text-sm text-[hsl(var(--text-muted))] hover:text-[hsl(var(--primary-amber))]"
        >
          ← Back to dRANb
        </Link>
        <p className="text-[hsl(var(--primary-amber))]">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/engines/dranb"
          className="text-sm text-[hsl(var(--text-muted))] hover:text-[hsl(var(--primary-amber))]"
        >
          ← Back to dRANb
        </Link>
        <span className="font-mono text-xs text-[hsl(var(--text-muted))]">{sessionId}</span>
      </div>

      <SectionTitle eyebrow="MOIRAI pipeline" title="dRANb run" />
      <p className="text-center text-sm text-[hsl(var(--text-muted))]">
        {isComplete ? "Complete." : "Pipeline in progress…"}
        {live && (
          <span className="ml-2 inline-flex rounded border border-[hsl(var(--accent-teal)/0.35)] bg-[hsl(var(--accent-teal)/0.1)] px-2 py-0.5 font-mono text-xs tracking-wide text-[hsl(var(--accent-teal))]">
            Live
          </span>
        )}
      </p>

      {(runTotals.tokens > 0 || runTotals.cost > 0 || runTotals.avgLatencyMs != null) && (
        <div className="flex flex-wrap justify-center gap-4 font-mono text-xs text-[hsl(var(--text-muted))]">
          {runTotals.tokens > 0 && (
            <span>
              Tokens (sum): <span className="text-[hsl(var(--text-primary))]">{runTotals.tokens.toLocaleString()}</span>
            </span>
          )}
          {runTotals.cost > 0 && (
            <span>
              Est. cost:{" "}
              <span className="text-[hsl(var(--text-primary))]">
                ${runTotals.cost < 0.01 ? runTotals.cost.toFixed(4) : runTotals.cost.toFixed(2)}
              </span>
            </span>
          )}
          {runTotals.avgLatencyMs != null && (
            <span>
              Avg stage latency:{" "}
              <span className="text-[hsl(var(--text-primary))]">{runTotals.avgLatencyMs} ms</span>
            </span>
          )}
        </div>
      )}

      <GlassPanel glow="teal">
        <h2 className="mb-4 text-center font-mono text-xs tracking-[0.3em] text-[hsl(var(--text-muted))]">
          PIPELINE
        </h2>
        <ul className="space-y-3">
          {STAGES.map(({ step, name, label }) => (
            <li key={step} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                  completedSteps.has(step)
                    ? "bg-[hsl(var(--accent-teal)/0.2)] text-[hsl(var(--accent-teal))]"
                    : "bg-[hsl(var(--void-surface))] text-[hsl(var(--text-muted))]"
                }`}
              >
                {completedSteps.has(step) ? "✓" : step}
              </span>
              <span className="text-[hsl(var(--text-primary))]">
                {name} <span className="text-[hsl(var(--text-muted))]">— {label}</span>
              </span>
            </li>
          ))}
        </ul>
        {data?.events && data.events.length > 0 && (
          <div className="mt-4 max-h-40 overflow-y-auto rounded border border-[hsl(var(--glass-border))] p-3">
            <p className="mb-2 font-mono text-xs text-[hsl(var(--text-muted))]">Events</p>
            {data.events.map((ev, i) => (
              <div key={i} className="text-xs text-[hsl(var(--text-muted))]">
                <span className="text-[hsl(var(--text-primary))]">{ev.event_type}</span>{" "}
                {ev.payload?.step != null && `(step ${ev.payload.step})`}
                {typeof (ev.payload as { error?: unknown }).error === "string" && (
                  <div className="mt-1 whitespace-pre-wrap rounded border border-[hsl(var(--primary-amber)/0.3)] bg-[hsl(var(--primary-amber)/0.1)] px-2 py-1 text-[hsl(var(--text-primary))]">
                    {(ev.payload as { error: string }).error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </GlassPanel>

      {/* Results with score bars */}
      {finalContent?.finalists && finalContent.finalists.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-center font-display text-lg font-bold text-[hsl(var(--text-primary))]">
            FINALISTS
          </h2>
          <div className="space-y-8">
            {finalContent.finalists.map((f, i) => {
              const overall = weightedOverall(f.scores);
              return (
              <GlassPanel key={i} glow="amber">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-[hsl(var(--text-primary))]">
                    {f.name ?? `#${i + 1}`}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-[hsl(var(--text-muted))]">
                    {overall != null && (
                      <span className="rounded-md border border-[hsl(var(--glass-border))] bg-[hsl(var(--void-surface)/0.8)] px-2 py-0.5 text-[hsl(var(--text-primary))]">
                        Weighted score: {Math.round(overall)} / 100
                      </span>
                    )}
                    {f.confidence != null && (
                      <span>Confidence: {Math.round((f.confidence ?? 0) * 100)}%</span>
                    )}
                  </div>
                </div>
                {f.rationale && (
                  <p className="mb-4 text-sm text-[hsl(var(--text-muted))]">{f.rationale}</p>
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
                  <ul className="mt-4 list-inside list-disc text-xs text-[hsl(var(--text-muted))]">
                    {f.next_steps.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                )}
              </GlassPanel>
            );
            })}
          </div>

          {finalContent.eliminated && finalContent.eliminated.length > 0 && (
            <GlassPanel>
              <h3 className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-[hsl(var(--text-muted))]">
                WHY NOT
              </h3>
              <ul className="space-y-1 text-sm text-[hsl(var(--text-muted))]">
                {finalContent.eliminated.map((e, i) => (
                  <li key={i}>
                    <strong className="text-[hsl(var(--text-primary))]">{e.name}</strong>: {e.reason}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          )}

          {finalContent.dark_horse && (() => {
            const dh = finalContent.dark_horse!;
            const dhOverall = weightedOverall(dh.scores);
            return (
              <GlassPanel glow="amber">
                <h3 className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-[hsl(var(--primary-amber))]">
                  DARK HORSE
                </h3>
                <div className="flex flex-wrap items-baseline justify-center gap-3">
                  <p className="font-display font-bold text-[hsl(var(--text-primary))]">{dh.name}</p>
                  {dhOverall != null && (
                    <span className="text-xs text-[hsl(var(--primary-amber))]">
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
              </GlassPanel>
            );
          })()}

          {finalContent.synthesis_notes && (
            <GlassPanel>
              <h3 className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-[hsl(var(--text-muted))]">
                SYNTHESIS
              </h3>
              <p className="whitespace-pre-wrap text-sm text-[hsl(var(--text-muted))]">
                {finalContent.synthesis_notes}
              </p>
            </GlassPanel>
          )}
        </div>
      )}

      {isComplete && !finalContent?.finalists?.length && (
        <p className="text-center text-[hsl(var(--text-muted))]">
          Pipeline finished. Final package is still being written or format differs.
        </p>
      )}
    </div>
  );
}
