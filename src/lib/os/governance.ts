import { requireSupabaseAdmin } from "@/lib/supabase/admin";

export async function auditLog(params: {
  userId: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}): Promise<void> {
  await requireSupabaseAdmin().from("audit_log").insert({
    user_id: params.userId,
    action: params.action,
    entity_type: params.entityType ?? null,
    entity_id: params.entityId ?? null,
    metadata: params.metadata ?? {},
    ip_address: params.ipAddress ?? null,
  });
}

export async function listAuditForUser(userId: string, limit = 100) {
  const { data, error } = await requireSupabaseAdmin()
    .from("audit_log")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}
