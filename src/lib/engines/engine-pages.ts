import { ENGINE_REGISTRY, type EngineId } from "./engine-contract";

export const ENGINE_PAGE_CONFIG: Record<
  Exclude<EngineId, "v4ult">,
  { fields: { key: string; label: string; type?: "text" | "textarea" }[] }
> = {
  dranb: {
    fields: [],
  },
  brandl: {
    fields: [
      { key: "preferred_domain", label: "Preferred domain" },
      { key: "brand_name", label: "Brand name from shortlist" },
    ],
  },
  "4ield": {
    fields: [
      { key: "industry", label: "Industry" },
      { key: "region", label: "Region (optional)" },
    ],
  },
  "4tress": {
    fields: [{ key: "jurisdiction", label: "Jurisdiction" }],
  },
  "3xec": {
    fields: [
      { key: "business_name", label: "Business name" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  "5ite": {
    fields: [{ key: "site_slug", label: "Site slug" }],
  },
  "6roxy": {
    fields: [{ key: "voice_notes", label: "Voice & tone notes", type: "textarea" }],
  },
};

export function getEngineMeta(id: Exclude<EngineId, "v4ult">) {
  return ENGINE_REGISTRY[id];
}
