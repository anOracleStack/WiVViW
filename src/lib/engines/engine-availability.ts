import type { EngineId } from "./engine-contract";

export type EngineAvailability = "live" | "beta" | "coming_soon";

/** Product-facing availability — nav and galaxy respect this. */
export const ENGINE_AVAILABILITY: Record<EngineId, EngineAvailability> = {
  dranb: "live",
  brandl: "coming_soon",
  "4ield": "coming_soon",
  "4tress": "coming_soon",
  "3xec": "coming_soon",
  "5ite": "coming_soon",
  "6roxy": "coming_soon",
  v4ult: "live",
};

export function isEngineNavigable(id: EngineId): boolean {
  const status = ENGINE_AVAILABILITY[id];
  return status === "live" || status === "beta";
}
