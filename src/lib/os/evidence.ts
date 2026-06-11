import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import { hashEvidenceJson } from "@/lib/truth/content-hash";

export interface EvidenceItem {
  id: string;
  projectId: string;
  userId: string;
  type: "screenshot" | "pdf" | "link" | "other";
  title: string;
  url?: string;
  fileName?: string;
  contentHash?: string;
  claimIds: string[];
  createdAt: string;
}

export async function createEvidence(params: {
  projectId: string;
  userId: string;
  type: EvidenceItem["type"];
  title: string;
  url?: string;
  fileName?: string;
  claimIds?: string[];
}): Promise<EvidenceItem> {
  const hash = hashEvidenceJson({
    title: params.title,
    url: params.url,
    file: params.fileName,
  });
  const { data, error } = await requireSupabaseAdmin()
    .from("evidence_items")
    .insert({
      project_id: params.projectId,
      user_id: params.userId,
      type: params.type,
      title: params.title,
      url: params.url ?? null,
      file_name: params.fileName ?? null,
      content_hash: hash,
      claim_ids: params.claimIds ?? [],
    })
    .select("*")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Evidence create failed");
  return mapEvidence(data);
}

export async function listEvidence(projectId: string, userId: string) {
  const { data, error } = await requireSupabaseAdmin()
    .from("evidence_items")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapEvidence);
}

function mapEvidence(row: Record<string, unknown>): EvidenceItem {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    userId: String(row.user_id),
    type: row.type as EvidenceItem["type"],
    title: String(row.title),
    url: row.url ? String(row.url) : undefined,
    fileName: row.file_name ? String(row.file_name) : undefined,
    contentHash: row.content_hash ? String(row.content_hash) : undefined,
    claimIds: (row.claim_ids as string[]) ?? [],
    createdAt: String(row.created_at),
  };
}
