import { inngest } from "./client";
import { getPrompt } from "@/lib/prompts/registry";
import { parseJsonFromLlm } from "@/lib/parse-json-llm";
import { callProvider, TASK_TIERS, type TaskComplexity } from "@/lib/providers";
import { requireSupabaseAdmin } from "@/lib/supabase/admin";

const DRANB_COMPLEXITY: TaskComplexity = "medium";
const ENGINE_KEY = "dranb";
const TASK_TYPE = "brand_naming";

async function emitEvent(
  sessionId: string,
  eventType: string,
  payload: Record<string, unknown>
) {
  await requireSupabaseAdmin().from("event_log").insert({
    session_id: sessionId,
    event_type: eventType,
    payload,
  });
}

async function savePackage(
  sessionId: string,
  stepNumber: number,
  provider: string,
  packageType: "deliverable" | "audit" | "thought",
  content: unknown,
  meta: { tokens_used?: number; cost_estimate?: number; latency_ms?: number }
) {
  const { error } = await requireSupabaseAdmin().from("moirai_packages").upsert(
    {
      session_id: sessionId,
      step_number: stepNumber,
      provider,
      package_type: packageType,
      content: content as object,
      tokens_used: meta.tokens_used ?? null,
      cost_estimate: meta.cost_estimate ?? null,
      latency_ms: meta.latency_ms ?? null,
    },
    { onConflict: "session_id,step_number,package_type" }
  );
  if (error) throw new Error(`Failed to save package: ${error.message}`);
}

export const dranbPipeline = inngest.createFunction(
  { id: "dranb-moirai-simple", retries: 1 },
  { event: "dranb/brief.submitted" },
  async ({ event, step }) => {
    const { session_id: sessionId, brief } = event.data as {
      session_id: string;
      user_id?: string;
      brief: string | Record<string, unknown>;
    };
    if (!sessionId || brief == null) {
      throw new Error("Missing session_id or brief in event data");
    }

    const tier = TASK_TIERS[DRANB_COMPLEXITY];
    const briefStr = typeof brief === "string" ? brief : JSON.stringify(brief, null, 2);

    // ─── Stage 1: Clotho (OpenAI) ─────────────────────────────────────────
    await step.run("clotho", async () => {
      await emitEvent(sessionId, "moirai.step.started", {
        step: 1,
        stage: "clotho",
        provider: tier.clotho.provider,
      });

      try {
        const promptText = await getPrompt(ENGINE_KEY, "clotho", TASK_TYPE, {
          brief: briefStr,
        });
        const res = await callProvider(tier.clotho.provider, {
          system: "You are dRANb. Respond with valid JSON only. No markdown code blocks.",
          prompt: promptText,
          model: tier.clotho.model,
          maxTokens: 4096,
          temperature: 0.8,
        });

        const content = parseJsonFromLlm(res.content);
        await savePackage(sessionId, 1, res.provider, "deliverable", content, {
          tokens_used: res.tokens_used,
          cost_estimate: res.cost_estimate,
          latency_ms: res.latency_ms,
        });

        await emitEvent(sessionId, "moirai.step.completed", {
          step: 1,
          stage: "clotho",
          provider: res.provider,
          tokens_used: res.tokens_used,
          latency_ms: res.latency_ms,
        });
        return { content, meta: res };
      } catch (err) {
        await emitEvent(sessionId, "moirai.step.failed", {
          step: 1,
          stage: "clotho",
          error: err instanceof Error ? err.message : String(err),
        });
        throw err;
      }
    });

    // ─── Stage 2: Lachesis (Gemini) ───────────────────────────────────────
    await step.run("lachesis", async () => {
      if (!tier.lachesis) return null;

      await emitEvent(sessionId, "moirai.step.started", {
        step: 2,
        stage: "lachesis",
        provider: tier.lachesis.provider,
      });

      const clothoPkg = await step.run("get-clotho-package", async () => {
        const { data } = await requireSupabaseAdmin()
          .from("moirai_packages")
          .select("content")
          .eq("session_id", sessionId)
          .eq("step_number", 1)
          .eq("package_type", "deliverable")
          .single();
        return data?.content ?? null;
      });
      const previousOutputStr =
        typeof clothoPkg === "string" ? clothoPkg : JSON.stringify(clothoPkg ?? {}, null, 2);

      const promptText = await getPrompt(ENGINE_KEY, "lachesis", TASK_TYPE, {
        brief: briefStr,
        previous_output: previousOutputStr,
      });
      const res = await callProvider(tier.lachesis.provider, {
        system: "You are the audit layer for dRANb. Respond with valid JSON only. No markdown.",
        prompt: promptText,
        model: tier.lachesis.model,
        maxTokens: 4096,
        temperature: 0.4,
      });

      const content = parseJsonFromLlm(res.content);
      await savePackage(
        sessionId,
        2,
        res.provider,
        "audit",
        content,
        {
          tokens_used: res.tokens_used,
          cost_estimate: res.cost_estimate,
          latency_ms: res.latency_ms,
        }
      );

      await emitEvent(sessionId, "moirai.step.completed", {
        step: 2,
        stage: "lachesis",
        provider: res.provider,
        tokens_used: res.tokens_used,
        latency_ms: res.latency_ms,
      });
      return content;
    });

    // ─── Stage 3: Eunoia (Claude) ─────────────────────────────────────────
    await step.run("eunoia", async () => {
      if (!tier.eunoia) return { status: "done" };

      await emitEvent(sessionId, "moirai.step.started", {
        step: 3,
        stage: "eunoia",
        provider: tier.eunoia.provider,
      });

      const { clothoContent, lachesisContent } = await step.run("get-packages-for-eunoia", async () => {
        const [clotho, lachesis] = await Promise.all([
          requireSupabaseAdmin()
            .from("moirai_packages")
            .select("content")
            .eq("session_id", sessionId)
            .eq("step_number", 1)
            .eq("package_type", "deliverable")
            .single(),
          requireSupabaseAdmin()
            .from("moirai_packages")
            .select("content")
            .eq("session_id", sessionId)
            .eq("step_number", 2)
            .eq("package_type", "audit")
            .single(),
        ]);
        return {
          clothoContent: clotho.data?.content ?? null,
          lachesisContent: lachesis.data?.content ?? null,
        };
      });
      const clothoOutputStr =
        typeof clothoContent === "string"
          ? clothoContent
          : JSON.stringify(clothoContent ?? {}, null, 2);
      const lachesisOutputStr =
        typeof lachesisContent === "string"
          ? lachesisContent
          : JSON.stringify(lachesisContent ?? {}, null, 2);

      const promptText = await getPrompt(ENGINE_KEY, "eunoia", TASK_TYPE, {
        brief: briefStr,
        clotho_output: clothoOutputStr,
        lachesis_output: lachesisOutputStr,
      });
      const res = await callProvider(tier.eunoia.provider, {
        system:
          "You are the refinement layer for dRANb. Respond with valid JSON only. No markdown.",
        prompt: promptText,
        model: tier.eunoia.model,
        maxTokens: 4096,
        temperature: 0.5,
      });

      const content = parseJsonFromLlm(res.content);
      await savePackage(
        sessionId,
        3,
        res.provider,
        "deliverable",
        content,
        {
          tokens_used: res.tokens_used,
          cost_estimate: res.cost_estimate,
          latency_ms: res.latency_ms,
        }
      );

      await emitEvent(sessionId, "moirai.step.completed", {
        step: 3,
        stage: "eunoia",
        provider: res.provider,
        tokens_used: res.tokens_used,
        latency_ms: res.latency_ms,
      });
      await emitEvent(sessionId, "dranb.candidates.finalized", { session_id: sessionId });
      return { content, meta: res };
    });

    return { status: "completed", session_id: sessionId };
  }
);
