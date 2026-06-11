import pricingCanon from "./pricing-canon.json";
import type { EngineId } from "@/lib/engines/engine-contract";

export type TierId = "twin" | "squad" | "empire";

const TIER_RANK: Record<TierId, number> = {
  twin: 0,
  squad: 1,
  empire: 2,
};

/** Engine access by tier — from Operational Bible v4 */
export const ENGINE_ACCESS: Record<TierId, EngineId[]> = {
  twin: ["dranb", "brandl", "6roxy", "v4ult"],
  squad: ["dranb", "brandl", "3xec", "6roxy", "v4ult"],
  empire: [
    "dranb",
    "brandl",
    "4ield",
    "4tress",
    "3xec",
    "5ite",
    "6roxy",
    "v4ult",
  ],
};

export const ENGINE_LIMITS: Record<
  TierId,
  Partial<Record<EngineId, { maxRunsPerMonth?: number; exports?: boolean; watermark?: boolean }>>
> = {
  twin: {
    dranb: { maxRunsPerMonth: 3, exports: false, watermark: true },
    brandl: { maxRunsPerMonth: 1 },
    "6roxy": { maxRunsPerMonth: 10 },
  },
  squad: {
    dranb: { exports: true, watermark: false },
    brandl: { exports: true },
    "3xec": { exports: true },
    "6roxy": { exports: true },
  },
  empire: {
    dranb: { exports: true },
    brandl: { exports: true },
    "4ield": { exports: true },
    "4tress": { exports: true },
    "3xec": { exports: true },
    "5ite": { exports: true },
    "6roxy": { exports: true },
  },
};

export function getPricing() {
  return pricingCanon;
}

export function tierMeetsMinimum(
  userTier: TierId,
  required: TierId
): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[required];
}

export function canAccessEngine(
  userTier: TierId,
  engineId: EngineId
): boolean {
  return ENGINE_ACCESS[userTier].includes(engineId);
}

export function getDefaultTier(): TierId {
  return "twin";
}

export async function resolveUserTier(
  userId: string
): Promise<TierId> {
  try {
    const { requireSupabaseAdmin } = await import("@/lib/supabase/admin");
    const { data } = await requireSupabaseAdmin()
      .from("user_entitlements")
      .select("tier")
      .eq("user_id", userId)
      .maybeSingle();
    const tier = data?.tier as TierId | undefined;
    if (tier && tier in TIER_RANK) return tier;
  } catch {
    /* table may not exist in dev */
  }
  return getDefaultTier();
}
