import { inngest } from "@/lib/inngest/client";
import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import { emitEngineEvent } from "@/lib/events/event-bus";
import { logEngineReceipt } from "@/lib/os/receipts";
import { auditLog } from "@/lib/os/governance";
import {
  canAccessEngine,
  resolveUserTier,
  ENGINE_LIMITS,
} from "@/lib/entitlements";
import { ENGINE_REGISTRY, type EngineId } from "./engine-contract";

export async function assertEngineAccess(
  userId: string,
  engineId: EngineId
): Promise<{ tier: Awaited<ReturnType<typeof resolveUserTier>> }> {
  const tier = await resolveUserTier(userId);
  const meta = ENGINE_REGISTRY[engineId];
  if (!canAccessEngine(tier, engineId)) {
    throw new Error(
      `Engine ${meta.label} requires a higher subscription tier`
    );
  }
  return { tier };
}

export async function createEngineSession(params: {
  userId: string;
  engineId: EngineId;
  projectId?: string;
  state: Record<string, unknown>;
  inngestEvent?: string;
  inngestData?: Record<string, unknown>;
}): Promise<{ session_id: string }> {
  await assertEngineAccess(params.userId, params.engineId);

  const { data: session, error } = await requireSupabaseAdmin()
    .from("odyssey_sessions")
    .insert({
      user_id: params.userId,
      engine_key: params.engineId,
      project_id: params.projectId ?? null,
      state: params.state,
    })
    .select("id")
    .single();

  if (error || !session?.id) {
    throw new Error(error?.message ?? "Failed to create session");
  }

  await emitEngineEvent(session.id, {
    type: "ENGINE_RUN_STARTED",
    engine: params.engineId,
    runId: session.id,
    projectId: params.projectId ?? null,
    userId: params.userId,
    timestamp: new Date().toISOString(),
  });

  await logEngineReceipt({
    sessionId: session.id,
    engine: params.engineId,
    step: "intake",
    claimId: `${params.engineId}:intake`,
    source: "engine-runner",
    evidence: { state: params.state },
    confidence: 0.5,
  });

  await auditLog({
    userId: params.userId,
    action: "engine.run.started",
    entityType: "odyssey_session",
    entityId: session.id,
    metadata: { engine: params.engineId },
  });

  if (params.inngestEvent) {
    await inngest.send({
      name: params.inngestEvent,
      data: {
        session_id: session.id,
        user_id: params.userId,
        project_id: params.projectId,
        ...params.inngestData,
      },
    });
  }

  return { session_id: session.id };
}

export function checkRunLimit(
  tier: Awaited<ReturnType<typeof resolveUserTier>>,
  engineId: EngineId,
  runsThisMonth: number
): boolean {
  const limits = ENGINE_LIMITS[tier][engineId];
  if (!limits?.maxRunsPerMonth) return true;
  return runsThisMonth < limits.maxRunsPerMonth;
}
