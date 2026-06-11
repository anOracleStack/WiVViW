import { createEngineSession } from "./engine-runner";
import type { EngineId } from "./engine-contract";

/**
 * MVP stub pipeline for engines without full MOIRAI yet.
 * Creates session, runs deterministic mock output, marks completed.
 */
export async function runStubEngine(
  userId: string,
  engineId: EngineId,
  input: Record<string, unknown>,
  projectId?: string
): Promise<{ session_id: string; output: Record<string, unknown> }> {
  const { session_id } = await createEngineSession({
    userId,
    engineId,
    projectId,
    state: { input, status: "running" },
  });

  const output = buildStubOutput(engineId, input);

  const { requireSupabaseAdmin } = await import("@/lib/supabase/admin");
  await requireSupabaseAdmin()
    .from("odyssey_sessions")
    .update({ state: { input, output, status: "completed" } })
    .eq("id", session_id);

  const { emitEngineEvent } = await import("@/lib/events/event-bus");
  await emitEngineEvent(session_id, {
    type: "ENGINE_RUN_COMPLETED",
    engine: engineId,
    runId: session_id,
    artifacts: [{ id: session_id, type: "deliverable" }],
    timestamp: new Date().toISOString(),
  });

  if (projectId) {
    const { executeHandoff } = await import("@/lib/engines/handoffs");
    await executeHandoff(
      userId,
      { fromEngine: engineId, toEngine: engineId, projectId, data: output },
      session_id
    );
  }

  return { session_id, output };
}

function buildStubOutput(
  engineId: EngineId,
  input: Record<string, unknown>
): Record<string, unknown> {
  switch (engineId) {
    case "brandl":
      return {
        domainLadder: ["example-brand.com", "getexample.com", "example.io"],
        handleLadder: { twitter: "@example", instagram: "@example" },
        primaryDomain: input.preferred_domain ?? "example-brand.com",
        consistencyScore: 78,
      };
    case "4ield":
      return {
        competitors: ["Competitor A", "Competitor B"],
        crowdingScore: 54,
        whiteSpace: ["niche positioning", "vertical focus"],
      };
    case "4tress":
      return {
        readinessScore: 62,
        flags: ["trademark-screen-recommended", "domain-locked"],
        disclaimer: "Not legal advice — readiness assessment only",
      };
    case "3xec":
      return {
        mission: "Deliver calm, procedural brand optimization",
        planOutline: ["Phase 1: Identity", "Phase 2: Territory", "Phase 3: Launch"],
        templates: ["business-plan-v1", "pitch-deck-v1"],
      };
    case "5ite":
      return {
        previewUrl: "/dashboard/engines/5ite/preview",
        lighthouseScore: 92,
        seoReady: true,
      };
    case "6roxy":
      return {
        twinMode: input.full_autonomy ? "empire" : "squad",
        pulseCadence: "weekly",
        calibrated: true,
      };
    default:
      return { status: "stub_complete" };
  }
}
