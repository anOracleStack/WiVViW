import { ENGINE_REGISTRY, type EngineId } from "./engine-contract";

export const ENGINE_PAGE_CONFIG: Record<
  Exclude<EngineId, "v4ult">,
  { description: string; fields: { key: string; label: string; type?: "text" | "textarea" }[] }
> = {
  dranb: {
    description: "Generate, score, and shortlist brand naming candidates.",
    fields: [],
  },
  brandl: {
    description: "Claim territory — domain and handle ladders from your shortlist.",
    fields: [
      { key: "preferred_domain", label: "Preferred domain" },
      { key: "brand_name", label: "Brand name from shortlist" },
    ],
  },
  "4ield": {
    description: "Map the competitive field and white-space opportunities.",
    fields: [
      { key: "industry", label: "Industry" },
      { key: "region", label: "Region (optional)" },
    ],
  },
  "4tress": {
    description: "Protection readiness — flags and evidence (not legal advice).",
    fields: [{ key: "jurisdiction", label: "Jurisdiction" }],
  },
  "3xec": {
    description: "Operations engine — mission, plan outlines, formation templates.",
    fields: [
      { key: "business_name", label: "Business name" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  "5ite": {
    description: "Inject identity into a deployable digital product preview.",
    fields: [{ key: "site_slug", label: "Site slug" }],
  },
  "6roxy": {
    description: "Calibrate your digital twin and pulse cadence.",
    fields: [{ key: "voice_notes", label: "Voice & tone notes", type: "textarea" }],
  },
};

export function getEngineMeta(id: Exclude<EngineId, "v4ult">) {
  return ENGINE_REGISTRY[id];
}
