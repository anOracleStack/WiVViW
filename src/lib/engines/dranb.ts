import { callProvider, TaskComplexity } from "@/lib/providers";
import { createEngineSession } from "@/lib/engines/engine-runner";

export interface DranbBrief {
  business_description: string;
  target_audience: string;
  industry: string;
  tone_keywords: string[];
  avoid_keywords: string[];
  competitive_context?: string;
  notes?: string;
}

/** Serialize brief for prompt_registry {{brief}} placeholder */
export function briefToPromptString(brief: DranbBrief): string {
  return [
    `Business: ${brief.business_description}`,
    `Target audience: ${brief.target_audience}`,
    `Industry: ${brief.industry}`,
    `Tone: ${brief.tone_keywords.join(", ")}`,
    `Avoid: ${brief.avoid_keywords.join(", ")}`,
    brief.competitive_context ? `Competitive context: ${brief.competitive_context}` : "",
    brief.notes ? `Notes: ${brief.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Create odyssey_session and dispatch MOIRAI pipeline via Inngest.
 * Returns session_id for polling and Realtime subscription.
 */
export async function createSessionAndDispatch(
  userId: string,
  brief: DranbBrief,
  projectId?: string
): Promise<{ session_id: string }> {
  const briefStr = briefToPromptString(brief);
  return createEngineSession({
    userId,
    engineId: "dranb",
    projectId,
    state: { brief: briefStr, raw: brief },
    inngestEvent: "dranb/brief.submitted",
    inngestData: { brief: briefStr },
  });
}

export async function runDranbOnce(brief: DranbBrief) {
  const system = "You are dRANb, a brand naming engine. Respond with JSON only.";
  const prompt = JSON.stringify(brief);

  const res = await callProvider("openai", {
    system,
    prompt,
    maxTokens: 2048,
    temperature: 0.8,
  });

  return {
    raw: res.content,
    meta: {
      provider: res.provider,
      model: res.model,
      tokens_used: res.tokens_used,
      latency_ms: res.latency_ms,
      cost_estimate: res.cost_estimate,
    },
  };
}

export const DRANB_COMPLEXITY: TaskComplexity = "medium";

