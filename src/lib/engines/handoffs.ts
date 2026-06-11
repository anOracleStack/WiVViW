import type { EngineId } from "./engine-contract";
import { JOURNEY_ORDER } from "./engine-contract";
import { patchBrandGenome } from "@/lib/os/brand-genome";
import { emitEngineEvent } from "@/lib/events/event-bus";

export interface HandoffPayload {
  fromEngine: EngineId;
  toEngine: EngineId;
  projectId: string;
  data: Record<string, unknown>;
}

const HANDOFF_MAP: Partial<Record<EngineId, EngineId>> = {
  dranb: "brandl",
  brandl: "4ield",
  "4ield": "4tress",
  "4tress": "3xec",
  "3xec": "5ite",
  "5ite": "6roxy",
};

export function nextEngineInJourney(current: EngineId): EngineId | null {
  const idx = JOURNEY_ORDER.indexOf(current);
  if (idx < 0 || idx >= JOURNEY_ORDER.length - 1) return null;
  return JOURNEY_ORDER[idx + 1];
}

export async function executeHandoff(
  userId: string,
  payload: HandoffPayload,
  sessionId: string
): Promise<void> {
  const patch: Record<string, unknown> = {};

  if (payload.fromEngine === "dranb" && Array.isArray(payload.data.shortlist)) {
    patch.shortlist = payload.data.shortlist as string[];
    patch.phaseCompleted = ["dranb"];
  }

  if (payload.fromEngine === "brandl" && payload.data.primaryDomain) {
    patch.primaryDomain = payload.data.primaryDomain;
    patch.handles = payload.data.handles;
  }

  if (payload.fromEngine === "4ield" && typeof payload.data.crowdingScore === "number") {
    patch.crowdingScore = payload.data.crowdingScore;
  }

  if (payload.fromEngine === "4tress" && typeof payload.data.readinessScore === "number") {
    patch.readinessScore = payload.data.readinessScore;
  }

  if (Object.keys(patch).length > 0) {
    await patchBrandGenome(payload.projectId, userId, patch);
  }

  const toEngine = HANDOFF_MAP[payload.fromEngine] ?? nextEngineInJourney(payload.fromEngine);
  if (toEngine) {
    await emitEngineEvent(sessionId, {
      type: "HANDOFF_READY",
      fromEngine: payload.fromEngine,
      toEngine,
      projectId: payload.projectId,
      payload: payload.data,
      timestamp: new Date().toISOString(),
    });
  }
}
