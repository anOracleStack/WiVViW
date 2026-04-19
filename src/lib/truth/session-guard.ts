import { requireSupabaseAdmin } from "@/lib/supabase/admin";

export async function assertUserOwnsSession(sessionId: string, userId: string): Promise<void> {
  const admin = requireSupabaseAdmin();
  const { data, error } = await admin
    .from("odyssey_sessions")
    .select("id")
    .eq("id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data?.id) {
    throw new Error("You do not have access to this session");
  }
}
