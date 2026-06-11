import type { ConfidenceLevel } from "@/lib/engines/engine-contract";

export type { ConfidenceLevel as Confidence };

export function confidenceFromScore(score: number): ConfidenceLevel {
  if (score >= 0.85) return "verified";
  if (score >= 0.6) return "likely";
  return "estimate";
}

export function confidenceFromSources(agreeing: number, total: number): ConfidenceLevel {
  if (total < 2) return "estimate";
  if (agreeing >= 3) return "verified";
  if (agreeing >= 2) return "likely";
  return "estimate";
}

export const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  estimate: "Estimate",
  likely: "Likely",
  verified: "Verified",
};
