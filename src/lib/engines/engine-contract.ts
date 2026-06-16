/**
 * Shared engine contract — every standalone app implements this surface.
 */

export const ENGINE_IDS = [
  "dranb",
  "brandl",
  "4ield",
  "4tress",
  "3xec",
  "5ite",
  "6roxy",
  "v4ult",
] as const;

export type EngineId = (typeof ENGINE_IDS)[number];

export type EnginePhase =
  | "intake"
  | "generate"
  | "evaluate"
  | "shortlist"
  | "decide"
  | "export"
  | "handoff";

export type EngineRunStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "gated";

export type ConfidenceLevel = "estimate" | "likely" | "verified";

export interface ArtifactRef {
  id: string;
  type: string;
  path?: string;
  engine: EngineId;
  sessionId: string;
  createdAt: string;
}

export interface GateResult {
  gateId: string;
  passed: boolean;
  message: string;
  value?: number | string;
  threshold?: number | string;
}

export interface EngineRun {
  sessionId: string;
  engineId: EngineId;
  projectId: string | null;
  userId: string;
  status: EngineRunStatus;
  phase: EnginePhase;
  gates: GateResult[];
  artifacts: ArtifactRef[];
  handoffPayload?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface MoiraiStageHook {
  stage: "clotho" | "lachesis" | "eunoia";
  engineKey: EngineId;
  taskType: string;
}

export interface EngineMeta {
  id: EngineId;
  /** Internal codename — mono badge only */
  label: string;
  /** Primary UI label */
  friendlyLabel: string;
  /** One quiet outcome line — cards, workbench header */
  outcomeHint: string;
  sub: string;
  metaphor: string;
  colorHsl: string;
  route: string;
  tierMinimum: "twin" | "squad" | "empire";
  standaloneSku: boolean;
}

export const ENGINE_REGISTRY: Record<EngineId, EngineMeta> = {
  dranb: {
    id: "dranb",
    label: "dRANb",
    friendlyLabel: "Name",
    outcomeHint: "Find a name worth owning",
    sub: "Naming · Decision",
    metaphor: "The Workbench",
    colorHsl: "200 80% 52%",
    route: "/dashboard/engines/dranb",
    tierMinimum: "twin",
    standaloneSku: true,
  },
  brandl: {
    id: "brandl",
    label: "brandL",
    friendlyLabel: "Brandle",
    outcomeHint: "Secure your name across the web",
    sub: "Territory · Domains",
    metaphor: "The Ladder",
    colorHsl: "160 50% 40%",
    route: "/dashboard/engines/brandl",
    tierMinimum: "twin",
    standaloneSku: true,
  },
  "4ield": {
    id: "4ield",
    label: "4IELD",
    friendlyLabel: "Field",
    outcomeHint: "See who else occupies your space",
    sub: "Intelligence · Field Map",
    metaphor: "The Map",
    colorHsl: "42 87% 55%",
    route: "/dashboard/engines/4ield",
    tierMinimum: "empire",
    standaloneSku: true,
  },
  "4tress": {
    id: "4tress",
    label: "4TRESS",
    friendlyLabel: "Fortress",
    outcomeHint: "Prepare protection — step by step",
    sub: "Protection · Readiness",
    metaphor: "The Citadel",
    colorHsl: "350 80% 45%",
    route: "/dashboard/engines/4tress",
    tierMinimum: "empire",
    standaloneSku: true,
  },
  "3xec": {
    id: "3xec",
    label: "3XEC",
    friendlyLabel: "Exec",
    outcomeHint: "Turn decisions into daily ops",
    sub: "Operations · Automation",
    metaphor: "The Dojo",
    colorHsl: "215 25% 55%",
    route: "/dashboard/engines/3xec",
    tierMinimum: "squad",
    standaloneSku: true,
  },
  "5ite": {
    id: "5ite",
    label: "5ITE",
    friendlyLabel: "Site",
    outcomeHint: "Launch a home for your brand",
    sub: "Product · Deploy",
    metaphor: "The Construct",
    colorHsl: "270 60% 55%",
    route: "/dashboard/engines/5ite",
    tierMinimum: "empire",
    standaloneSku: true,
  },
  "6roxy": {
    id: "6roxy",
    label: "6ROXY",
    friendlyLabel: "Proxy",
    outcomeHint: "Your voice and presence, extended",
    sub: "Digital Twin · Avatar",
    metaphor: "The Mask",
    colorHsl: "270 30% 72%",
    route: "/dashboard/engines/6roxy",
    tierMinimum: "twin",
    standaloneSku: true,
  },
  v4ult: {
    id: "v4ult",
    label: "V4ULT",
    friendlyLabel: "Vault",
    outcomeHint: "Your brand story over time",
    sub: "Archive · Timeline",
    metaphor: "The Time Spine",
    colorHsl: "220 70% 55%",
    route: "/dashboard/vault/v4ult",
    tierMinimum: "twin",
    standaloneSku: false,
  },
};

/** Canonical user journey order for phase gates */
export const JOURNEY_ORDER: EngineId[] = [
  "dranb",
  "brandl",
  "4ield",
  "4tress",
  "3xec",
  "5ite",
  "6roxy",
];

export const PHASE_GATES: Record<string, GateResult & { engine: EngineId }> = {
  dranb_shortlist: {
    gateId: "dranb_shortlist",
    engine: "dranb",
    passed: false,
    message: "Shortlist must contain 3–7 names",
    threshold: "3-7",
  },
  brandl_domain: {
    gateId: "brandl_domain",
    engine: "brandl",
    passed: false,
    message: "Primary domain must be confirmed",
  },
  "4ield_crowding": {
    gateId: "4ield_crowding",
    engine: "4ield",
    passed: false,
    message: "Semantic crowding score must be below 67",
    threshold: 67,
  },
  "4tress_readiness": {
    gateId: "4tress_readiness",
    engine: "4tress",
    passed: false,
    message: "Readiness score must exceed 40",
    threshold: 40,
  },
};
