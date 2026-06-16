import type { EngineId } from "./engine-contract";

export type EngineAvailability = "live" | "beta" | "coming_soon";

/** Product-facing availability — nav and galaxy respect this. */
export const ENGINE_AVAILABILITY: Record<EngineId, EngineAvailability> = {
  dranb: "live",
  brandl: "beta",
  "4ield": "beta",
  "4tress": "beta",
  "3xec": "beta",
  "5ite": "beta",
  "6roxy": "beta",
  v4ult: "live",
};

export function isEngineNavigable(id: EngineId): boolean {
  const status = ENGINE_AVAILABILITY[id];
  return status === "live" || status === "beta";
}
