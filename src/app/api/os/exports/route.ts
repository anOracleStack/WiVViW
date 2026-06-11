import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { resolveUserTier } from "@/lib/entitlements";
import { getProject } from "@/lib/os/brand-genome";
import { buildExportPayload, createExportBundle, serializeBundle } from "@/lib/os/export";
import type { EngineId } from "@/lib/engines/engine-contract";

export async function POST(req: NextRequest) {
  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const body = await req.json();
  const projectId = body.project_id as string;
  const format = (body.format as "json" | "txt") ?? "json";
  if (!projectId) {
    return NextResponse.json({ error: "project_id required" }, { status: 400 });
  }

  const project = await getProject(projectId, user.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const tier = await resolveUserTier(user.id);
  const payload = buildExportPayload(project.name, project.brandGenome as unknown as Record<string, unknown>, []);
  const bundle = await createExportBundle({
    projectId,
    userId: user.id,
    format,
    engines: (body.engines as EngineId[]) ?? ["dranb"],
    payload,
    tier,
  });

  return NextResponse.json({
    bundle,
    content: serializeBundle(bundle),
  });
}
