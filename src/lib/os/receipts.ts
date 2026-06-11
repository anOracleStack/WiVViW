import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import type { EngineId } from "@/lib/engines/engine-contract";
import { hashEvidenceJson } from "@/lib/truth/content-hash";

export interface ReceiptInput {
  sessionId: string;
  engine: EngineId;
  step: string;
  claimId: string;
  source: string;
  evidence: Record<string, unknown>;
  confidence?: number;
}

export async function logEngineReceipt(input: ReceiptInput): Promise<string> {
  const hash = hashEvidenceJson(input.evidence);
  const { data, error } = await requireSupabaseAdmin()
    .from("receipts_ledger")
    .insert({
      session_id: input.sessionId,
      claim_id: input.claimId,
      source: input.source,
      evidence: {
        engine: input.engine,
        step: input.step,
        ...input.evidence,
      },
      confidence: input.confidence ?? 0.5,
      truth_state: "queued",
      content_hash: hash,
    })
    .select("id")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Receipt insert failed");
  return data.id as string;
}

export async function listReceiptsForSession(sessionId: string) {
  const { data, error } = await requireSupabaseAdmin()
    .from("receipts_ledger")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listReceiptsForUser(userId: string, limit = 50) {
  const admin = requireSupabaseAdmin();
  const { data: sessions } = await admin
    .from("odyssey_sessions")
    .select("id")
    .eq("user_id", userId);

  const sessionIds = (sessions ?? []).map((s) => s.id);
  if (sessionIds.length === 0) return [];

  const { data, error } = await admin
    .from("receipts_ledger")
    .select("*")
    .in("session_id", sessionIds)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}
