import { requireSupabaseAdmin } from "@/lib/supabase/admin";
import type { ConfidenceLevel } from "@/lib/engines/engine-contract";

export interface BrandGenome {
  projectId: string;
  toneKeywords: string[];
  competitors: string[];
  constraints: string[];
  values: string[];
  riskTolerance: "low" | "medium" | "high";
  copyTone: "approachable" | "neutral" | "severe";
  shortlist?: string[];
  primaryDomain?: string;
  handles?: Record<string, string>;
  crowdingScore?: number;
  readinessScore?: number;
  phaseCompleted?: string[];
  claims?: GenomeClaim[];
  updatedAt?: string;
}

export interface GenomeClaim {
  id: string;
  label: string;
  confidence: ConfidenceLevel;
  rationale: string;
  evidenceIds: string[];
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  industry?: string;
  brandGenome: BrandGenome;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_GENOME = (projectId: string): BrandGenome => ({
  projectId,
  toneKeywords: [],
  competitors: [],
  constraints: [],
  values: [],
  riskTolerance: "medium",
  copyTone: "neutral",
  phaseCompleted: [],
  claims: [],
});

export async function createProject(
  userId: string,
  name: string,
  industry?: string
): Promise<Project> {
  const admin = requireSupabaseAdmin();
  const genome = DEFAULT_GENOME("pending");
  const { data, error } = await admin
    .from("projects")
    .insert({
      user_id: userId,
      name,
      industry: industry ?? null,
      brand_genome: genome,
    })
    .select("id, user_id, name, industry, brand_genome, created_at, updated_at")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Failed to create project");

  const genomeWithId = { ...DEFAULT_GENOME(data.id), ...(data.brand_genome as object) };
  await admin
    .from("projects")
    .update({ brand_genome: genomeWithId })
    .eq("id", data.id);

  return mapProject({ ...data, brand_genome: genomeWithId });
}

export async function getProject(
  projectId: string,
  userId: string
): Promise<Project | null> {
  const { data, error } = await requireSupabaseAdmin()
    .from("projects")
    .select("id, user_id, name, industry, brand_genome, created_at, updated_at")
    .eq("id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return mapProject(data);
}

export async function listProjects(userId: string): Promise<Project[]> {
  const { data, error } = await requireSupabaseAdmin()
    .from("projects")
    .select("id, user_id, name, industry, brand_genome, created_at, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapProject);
}

export async function patchBrandGenome(
  projectId: string,
  userId: string,
  patch: Partial<BrandGenome>
): Promise<BrandGenome> {
  const project = await getProject(projectId, userId);
  if (!project) throw new Error("Project not found");

  const merged: BrandGenome = {
    ...project.brandGenome,
    ...patch,
    projectId,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await requireSupabaseAdmin()
    .from("projects")
    .update({ brand_genome: merged, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return merged;
}

function mapProject(row: Record<string, unknown>): Project {
  const genome = (row.brand_genome as BrandGenome) ?? DEFAULT_GENOME(String(row.id));
  return {
    id: String(row.id),
    userId: String(row.user_id),
    name: String(row.name),
    industry: row.industry ? String(row.industry) : undefined,
    brandGenome: { ...DEFAULT_GENOME(String(row.id)), ...genome, projectId: String(row.id) },
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
