import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import type { EngineId } from "@/lib/engines/engine-contract";

export interface TimelineEntry {
  sessionId: string;
  engineKey: EngineId | string;
  state: Record<string, unknown>;
  parentSessionId: string | null;
  forkPointStep: number | null;
  createdAt: string;
  updatedAt: string;
}

export async function listTimelineForProject(
  projectId: string,
  userId: string
): Promise<TimelineEntry[]> {
  const { data, error } = await requireSupabaseAdmin()
    .from("odyssey_sessions")
    .select("id, engine_key, state, parent_session_id, fork_point_step, created_at, updated_at")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    sessionId: row.id,
    engineKey: row.engine_key,
    state: (row.state as Record<string, unknown>) ?? {},
    parentSessionId: row.parent_session_id,
    forkPointStep: row.fork_point_step,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function forkSession(
  parentSessionId: string,
  userId: string,
  forkPointStep: number
): Promise<string> {
  const admin = requireSupabaseAdmin();
  const { data: parent, error: pErr } = await admin
    .from("odyssey_sessions")
    .select("*")
    .eq("id", parentSessionId)
    .eq("user_id", userId)
    .single();

  if (pErr || !parent) throw new Error("Parent session not found");

  const { data: child, error: cErr } = await admin
    .from("odyssey_sessions")
    .insert({
      user_id: userId,
      engine_key: parent.engine_key,
      project_id: parent.project_id,
      state: parent.state,
      parent_session_id: parentSessionId,
      fork_point_step: forkPointStep,
    })
    .select("id")
    .single();

  if (cErr || !child) throw new Error(cErr?.message ?? "Fork failed");
  return child.id;
}
