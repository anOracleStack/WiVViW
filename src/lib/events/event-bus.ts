import { inngest } from "@/lib/inngest/client";
import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import type { EngineId } from "@/lib/engines/engine-contract";

export type WivviwEvent =
  | {
      type: "ENGINE_RUN_STARTED";
      engine: EngineId;
      runId: string;
      projectId: string | null;
      userId: string;
      timestamp: string;
    }
  | {
      type: "ENGINE_RUN_COMPLETED";
      engine: EngineId;
      runId: string;
      artifacts: { id: string; type: string }[];
      timestamp: string;
    }
  | {
      type: "ENGINE_RUN_FAILED";
      engine: EngineId;
      runId: string;
      error: string;
      timestamp: string;
    }
  | {
      type: "SCORE_COMPUTED";
      engine: EngineId;
      entityId: string;
      score: number;
      confidence: number;
      dimensions: Record<string, number>;
      timestamp: string;
    }
  | {
      type: "GATE_EVALUATED";
      engine: EngineId;
      gateId: string;
      passed: boolean;
      projectId: string | null;
      timestamp: string;
    }
  | {
      type: "ARTIFACT_CREATED";
      artifactType: string;
      path: string;
      engine: EngineId;
      runId: string;
      timestamp: string;
    }
  | {
      type: "HANDOFF_READY";
      fromEngine: EngineId;
      toEngine: EngineId;
      projectId: string;
      payload: Record<string, unknown>;
      timestamp: string;
    }
  | {
      type: "USER_DECISION";
      projectId: string;
      engine: EngineId;
      decision: string;
      alternatives: string[];
      timestamp: string;
    };

export async function persistEvent(
  sessionId: string | null,
  event: WivviwEvent
): Promise<void> {
  await requireSupabaseAdmin().from("event_log").insert({
    session_id: sessionId,
    event_type: event.type,
    payload: event as unknown as Record<string, unknown>,
  });
}

export async function emitEngineEvent(
  sessionId: string,
  event: WivviwEvent
): Promise<void> {
  await persistEvent(sessionId, event);
  await inngest.send({
    name: "wivviw/event",
    data: { session_id: sessionId, ...event },
  });
}
