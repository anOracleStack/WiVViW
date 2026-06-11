import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import type { EngineId } from "@/lib/engines/engine-contract";
import type { TierId } from "@/lib/entitlements";

export interface ExportBundle {
  id: string;
  projectId: string;
  userId: string;
  format: "json" | "txt" | "pdf";
  engines: EngineId[];
  payload: Record<string, unknown>;
  watermarked: boolean;
  createdAt: string;
}

export function buildExportPayload(
  projectName: string,
  genome: Record<string, unknown>,
  sessions: { engine: string; state: unknown }[]
): Record<string, unknown> {
  return {
    project: projectName,
    exportedAt: new Date().toISOString(),
    brandGenome: genome,
    engineRuns: sessions,
    version: "1.0",
  };
}

export async function createExportBundle(params: {
  projectId: string;
  userId: string;
  format: "json" | "txt" | "pdf";
  engines: EngineId[];
  payload: Record<string, unknown>;
  tier: TierId;
}): Promise<ExportBundle> {
  const watermarked = params.tier === "twin";
  const { data, error } = await requireSupabaseAdmin()
    .from("export_bundles")
    .insert({
      project_id: params.projectId,
      user_id: params.userId,
      format: params.format,
      engines: params.engines,
      payload: params.payload,
      watermarked,
    })
    .select("*")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Export failed");

  return {
    id: data.id,
    projectId: data.project_id,
    userId: data.user_id,
    format: data.format,
    engines: data.engines,
    payload: data.payload,
    watermarked: data.watermarked,
    createdAt: data.created_at,
  };
}

export function serializeBundle(bundle: ExportBundle): string {
  if (bundle.format === "json") {
    return JSON.stringify(bundle.payload, null, 2);
  }
  const p = bundle.payload;
  return [
    `WiVViW Export — ${bundle.projectId}`,
    bundle.watermarked ? "[WATERMARKED — TWIN TIER]" : "",
    `Exported: ${bundle.createdAt}`,
    "",
    JSON.stringify(p, null, 2),
  ]
    .filter(Boolean)
    .join("\n");
}
