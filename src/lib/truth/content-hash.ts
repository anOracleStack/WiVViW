import { createHash } from "node:crypto";

/** Deterministic SHA-256 hex for evidence deduplication. */
export function hashEvidenceJson(evidence: unknown): string {
  const payload =
    typeof evidence === "string" ? evidence : JSON.stringify(evidence ?? null);
  return createHash("sha256").update(payload, "utf8").digest("hex");
}
