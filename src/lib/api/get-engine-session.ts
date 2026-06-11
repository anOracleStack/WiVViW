import { NextResponse } from "next/server";
import { requireSupabaseAdmin } from "@/lib/supabase/admin";

export async function getEngineSessionResponse(sessionId: string) {
  const { data, error } = await requireSupabaseAdmin()
    .from("odyssey_sessions")
    .select("id, engine_key, state, created_at, updated_at")
    .eq("id", sessionId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const state = (data.state as Record<string, unknown>) ?? {};
  return NextResponse.json({
    session: data,
    state,
    status: state.status ?? "completed",
  });
}
