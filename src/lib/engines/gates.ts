import type { GateResult } from "./engine-contract";
import type { BrandGenome } from "@/lib/os/brand-genome";

export function evaluateDranbGate(shortlist: unknown): GateResult {
  const list = Array.isArray(shortlist) ? shortlist : [];
  const count = list.length;
  const passed = count >= 3 && count <= 7;
  return {
    gateId: "dranb_shortlist",
    passed,
    message: passed
      ? `Shortlist has ${count} names — ready for brandL`
      : `Shortlist needs 3–7 names (currently ${count})`,
    value: count,
    threshold: "3-7",
  };
}

export function evaluateBrandlGate(genome: BrandGenome): GateResult {
  const passed = Boolean(genome.primaryDomain);
  return {
    gateId: "brandl_domain",
    passed,
    message: passed
      ? `Domain confirmed: ${genome.primaryDomain}`
      : "Primary domain must be confirmed before 4IELD",
    value: genome.primaryDomain,
  };
}

export function evaluate4ieldGate(genome: BrandGenome): GateResult {
  const score = genome.crowdingScore ?? 100;
  const passed = score < 67;
  return {
    gateId: "4ield_crowding",
    passed,
    message: passed
      ? `Crowding score ${score} — field is open`
      : `Crowding score ${score} exceeds 67 — crowded field`,
    value: score,
    threshold: 67,
  };
}

export function evaluate4tressGate(genome: BrandGenome): GateResult {
  const score = genome.readinessScore ?? 0;
  const passed = score > 40;
  return {
    gateId: "4tress_readiness",
    passed,
    message: passed
      ? `Readiness ${score} — protection layer unlocked`
      : `Readiness ${score} — minimum 40 required`,
    value: score,
    threshold: 40,
  };
}

export function scoreDranbCandidates(
  candidates: { name: string; scores?: Record<string, number> }[]
): { overall: number; passed: boolean; dimensions: Record<string, number> }[] {
  return candidates.map((c) => {
    const s = c.scores ?? {};
    const dimensions: Record<string, number> = {
      uniqueness: s.uniqueness ?? 70,
      memorability: s.memorability ?? 70,
      commercial: s.commercial ?? 70,
      phonetic: s.phonetic ?? 70,
      visual: s.visual ?? 70,
      domain: s.domain ?? 70,
      cultural: s.cultural ?? 70,
      alignment: s.alignment ?? 70,
    };
    const overall =
      dimensions.uniqueness * 0.2 +
      dimensions.memorability * 0.15 +
      dimensions.commercial * 0.15 +
      dimensions.phonetic * 0.1 +
      dimensions.visual * 0.1 +
      dimensions.domain * 0.1 +
      dimensions.cultural * 0.1 +
      dimensions.alignment * 0.1;
    return { overall: Math.round(overall * 100) / 100, passed: overall >= 72, dimensions };
  });
}
