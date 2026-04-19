import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase/admin";

// ═══════════════════════════════════════════════════
// Model Configuration (pinned versions, not "latest")
// Change here to upgrade. Never chase auto-updates.
// ═══════════════════════════════════════════════════

export const MODELS = {
  openai: {
    flagship: "gpt-5.2",
    fast: "gpt-4.1-mini",
    reasoning: "o3",
  },
  gemini: {
    flagship: "gemini-2.5-pro",
    fast: "gemini-2.5-flash",
    lite: "gemini-2.0-flash-lite",
  },
  anthropic: {
    flagship: "claude-sonnet-4-6-20250514",
    premium: "claude-opus-4-6-20250514",
    fast: "claude-haiku-4-5-20251001",
  },
  deepseek: {
    flagship: "deepseek-chat",       // V3.2 unified
    reasoning: "deepseek-reasoner",  // R1
  },
} as const;

// ═══════════════════════════════════════════════════
// Task Complexity → Model Tier Routing
// ═══════════════════════════════════════════════════

export type TaskComplexity = "simple" | "medium" | "complex" | "critical";

interface ModelTier {
  clotho: { provider: ProviderKey; model: string };
  lachesis: { provider: ProviderKey; model: string } | null; // null = skip
  eunoia: { provider: ProviderKey; model: string } | null;
}

export const TASK_TIERS: Record<TaskComplexity, ModelTier> = {
  simple: {
    clotho: { provider: "openai", model: MODELS.openai.fast },
    lachesis: null,
    eunoia: null,
  },
  medium: {
    clotho: { provider: "openai", model: MODELS.openai.flagship },
    lachesis: { provider: "gemini", model: MODELS.gemini.fast },
    eunoia: { provider: "anthropic", model: MODELS.anthropic.flagship },
  },
  complex: {
    clotho: { provider: "openai", model: MODELS.openai.flagship },
    lachesis: { provider: "gemini", model: MODELS.gemini.flagship },
    eunoia: { provider: "anthropic", model: MODELS.anthropic.flagship },
  },
  critical: {
    clotho: { provider: "openai", model: MODELS.openai.flagship },
    lachesis: { provider: "gemini", model: MODELS.gemini.flagship },
    eunoia: { provider: "anthropic", model: MODELS.anthropic.premium },
  },
};

// ═══════════════════════════════════════════════════
// Provider instances (lazy — avoids build failures when env is unset on CI/Vercel)
// ═══════════════════════════════════════════════════

let openaiClient: OpenAI | null = null;
function getOpenAIClient(): OpenAI {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) throw new Error("OPENAI_API_KEY is not configured");
  openaiClient ??= new OpenAI({ apiKey: key });
  return openaiClient;
}

let deepseekClient: OpenAI | null = null;
function getDeepSeekClient(): OpenAI {
  const key = process.env.DEEPSEEK_API_KEY?.trim();
  if (!key) throw new Error("DEEPSEEK_API_KEY is not configured");
  deepseekClient ??= new OpenAI({
    apiKey: key,
    baseURL: "https://api.deepseek.com",
  });
  return deepseekClient;
}

let genaiClient: GoogleGenerativeAI | null = null;
function getGenAIClient(): GoogleGenerativeAI {
  const key = process.env.GOOGLE_AI_KEY?.trim();
  if (!key) throw new Error("GOOGLE_AI_KEY is not configured");
  genaiClient ??= new GoogleGenerativeAI(key);
  return genaiClient;
}

let anthropicClient: Anthropic | null = null;
function getAnthropicClient(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  if (!key) throw new Error("ANTHROPIC_API_KEY is not configured");
  anthropicClient ??= new Anthropic({ apiKey: key });
  return anthropicClient;
}

// ═══════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════

export type ProviderKey = "openai" | "gemini" | "anthropic" | "deepseek";

export interface ProviderResponse {
  content: string;
  provider: ProviderKey;
  model: string;
  tokens_used: number;
  latency_ms: number;
  cost_estimate: number;
  cached_tokens?: number;
}

interface ProviderCallOptions {
  system: string;
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

// ═══════════════════════════════════════════════════
// Cost Estimates — March 2026 Pricing (per 1M tokens)
// Update this block when pricing changes. Single source of truth.
// ═══════════════════════════════════════════════════

const COST_PER_1M: Record<string, { input: number; output: number; cached_input?: number }> = {
  // OpenAI
  "gpt-5.2":           { input: 1.75, output: 14.00, cached_input: 0.875 },
  "gpt-4.1-mini":      { input: 0.40, output: 1.60,  cached_input: 0.10 },
  "o3":                { input: 2.00, output: 16.00 },
  // Gemini
  "gemini-2.5-pro":    { input: 1.25, output: 10.00, cached_input: 0.3125 },
  "gemini-2.5-flash":  { input: 0.15, output: 0.60,  cached_input: 0.0375 },
  "gemini-2.0-flash-lite": { input: 0.075, output: 0.30 },
  // Anthropic
  "claude-sonnet-4-6-20250514": { input: 3.00, output: 15.00, cached_input: 0.30 },
  "claude-opus-4-6-20250514":   { input: 5.00, output: 25.00, cached_input: 0.50 },
  "claude-haiku-4-5-20251001":  { input: 0.80, output: 4.00,  cached_input: 0.08 },
  // DeepSeek
  "deepseek-chat":     { input: 0.28, output: 0.42,  cached_input: 0.028 },
  "deepseek-reasoner": { input: 0.55, output: 2.19 },
};

function estimateCost(model: string, inputTokens: number, outputTokens: number, cachedTokens = 0): number {
  const rates = COST_PER_1M[model] || { input: 5.0, output: 25.0 };
  const uncachedInput = inputTokens - cachedTokens;
  const cachedRate = rates.cached_input || rates.input;
  return (
    (uncachedInput * rates.input + cachedTokens * cachedRate + outputTokens * rates.output) /
    1_000_000
  );
}

// ═══════════════════════════════════════════════════
// Health Tracking
// ═══════════════════════════════════════════════════

async function reportHealth(provider: ProviderKey, latency: number, failed: boolean) {
  if (!supabaseAdmin) return;
  const status = failed ? "degraded" : latency > 30000 ? "degraded" : "healthy";
  await supabaseAdmin.from("provider_health").upsert({
    provider_key: provider,
    status,
    latency_ms: Math.round(latency),
    error_rate: failed ? 1 : 0,
    last_checked_at: new Date().toISOString(),
  });
}

export async function getProviderStatus(provider: ProviderKey): Promise<string> {
  if (!supabaseAdmin) return "unknown";
  const { data } = await supabaseAdmin
    .from("provider_health")
    .select("status")
    .eq("provider_key", provider)
    .single();
  return data?.status || "unknown";
}

// ═══════════════════════════════════════════════════
// Provider Call Functions
// ═══════════════════════════════════════════════════

async function callOpenAI(opts: ProviderCallOptions): Promise<ProviderResponse> {
  const model = opts.model || MODELS.openai.flagship;
  const start = Date.now();
  const res = await getOpenAIClient().chat.completions.create({
    model,
    max_tokens: opts.maxTokens || 4096,
    temperature: opts.temperature || 0.7,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.prompt },
    ],
  });
  const latency = Date.now() - start;
  const inputTokens = res.usage?.prompt_tokens || 0;
  const outputTokens = res.usage?.completion_tokens || 0;
  const cachedTokens =
    ((res.usage as unknown as { prompt_tokens_details?: { cached_tokens?: number } }).prompt_tokens_details
      ?.cached_tokens as number | undefined) || 0;

  await reportHealth("openai", latency, false);

  return {
    content: res.choices[0]?.message?.content || "",
    provider: "openai",
    model,
    tokens_used: inputTokens + outputTokens,
    latency_ms: latency,
    cost_estimate: estimateCost(model, inputTokens, outputTokens, cachedTokens),
    cached_tokens: cachedTokens,
  };
}

async function callDeepSeek(opts: ProviderCallOptions): Promise<ProviderResponse> {
  const model = opts.model || MODELS.deepseek.flagship;
  const start = Date.now();
  const res = await getDeepSeekClient().chat.completions.create({
    model,
    max_tokens: opts.maxTokens || 4096,
    temperature: opts.temperature || 0.7,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.prompt },
    ],
  });
  const latency = Date.now() - start;
  const inputTokens = res.usage?.prompt_tokens || 0;
  const outputTokens = res.usage?.completion_tokens || 0;
  const cachedTokens =
    ((res.usage as unknown as { prompt_cache_hit_tokens?: number }).prompt_cache_hit_tokens as
      | number
      | undefined) || 0;

  await reportHealth("deepseek", latency, false);

  return {
    content: res.choices[0]?.message?.content || "",
    provider: "deepseek",
    model,
    tokens_used: inputTokens + outputTokens,
    latency_ms: latency,
    cost_estimate: estimateCost(model, inputTokens, outputTokens, cachedTokens),
    cached_tokens: cachedTokens,
  };
}

async function callGemini(opts: ProviderCallOptions): Promise<ProviderResponse> {
  const modelName = opts.model || MODELS.gemini.flagship;
  const start = Date.now();
  const model = getGenAIClient().getGenerativeModel({
    model: modelName,
    systemInstruction: opts.system,
  });
  const res = await model.generateContent(opts.prompt);
  const latency = Date.now() - start;
  const usage = res.response.usageMetadata;
  const inputTokens = usage?.promptTokenCount || 0;
  const outputTokens = usage?.candidatesTokenCount || 0;
  const cachedTokens = usage?.cachedContentTokenCount || 0;

  await reportHealth("gemini", latency, false);

  return {
    content: res.response.text(),
    provider: "gemini",
    model: modelName,
    tokens_used: inputTokens + outputTokens,
    latency_ms: latency,
    cost_estimate: estimateCost(modelName, inputTokens, outputTokens, cachedTokens),
    cached_tokens: cachedTokens,
  };
}

async function callAnthropic(opts: ProviderCallOptions): Promise<ProviderResponse> {
  const model = opts.model || MODELS.anthropic.flagship;
  const start = Date.now();
  const res = await getAnthropicClient().messages.create({
    model,
    max_tokens: opts.maxTokens || 4096,
    temperature: opts.temperature || 0.7,
    system: opts.system,
    messages: [{ role: "user", content: opts.prompt }],
  });
  const latency = Date.now() - start;
  const inputTokens = res.usage.input_tokens;
  const outputTokens = res.usage.output_tokens;
  const cachedTokens =
    ((res.usage as unknown as { cache_read_input_tokens?: number }).cache_read_input_tokens as
      | number
      | undefined) || 0;

  await reportHealth("anthropic", latency, false);

  return {
    content: res.content[0].type === "text" ? res.content[0].text : "",
    provider: "anthropic",
    model,
    tokens_used: inputTokens + outputTokens,
    latency_ms: latency,
    cost_estimate: estimateCost(model, inputTokens, outputTokens, cachedTokens),
    cached_tokens: cachedTokens,
  };
}

// ═══════════════════════════════════════════════════
// Unified Call with Retry, Fallback, & Model Override
// ═══════════════════════════════════════════════════

const PROVIDER_FNS: Record<ProviderKey, (opts: ProviderCallOptions) => Promise<ProviderResponse>> = {
  openai: callOpenAI,
  gemini: callGemini,
  anthropic: callAnthropic,
  deepseek: callDeepSeek,
};

const FALLBACK_ORDER: Record<ProviderKey, ProviderKey[]> = {
  openai: ["deepseek", "gemini", "anthropic"],
  gemini: ["openai", "deepseek", "anthropic"],
  anthropic: ["openai", "deepseek", "gemini"],
  deepseek: ["openai", "gemini", "anthropic"],
};

export async function callProvider(
  provider: ProviderKey,
  opts: ProviderCallOptions,
  retries = 2
): Promise<ProviderResponse> {
  // Check provider health before attempting
  const status = await getProviderStatus(provider);
  if (status === "down") {
    console.warn(`[MOIRAI] ${provider} is down. Skipping to fallback.`);
  } else {
    const fn = PROVIDER_FNS[provider];
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn(opts);
      } catch (err) {
        console.error(`[${provider}] attempt ${attempt + 1} failed:`, err);
        await reportHealth(provider, 0, true);
        if (attempt === retries) break;
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  // Fallback chain
  for (const fallback of FALLBACK_ORDER[provider]) {
    const fallbackStatus = await getProviderStatus(fallback);
    if (fallbackStatus === "down") continue;

    try {
      console.warn(`[MOIRAI] Falling back from ${provider} to ${fallback}`);
      return await PROVIDER_FNS[fallback](opts);
    } catch {
      await reportHealth(fallback, 0, true);
    }
  }

  throw new Error(`All providers failed for call intended for ${provider}`);
}

// ═══════════════════════════════════════════════════
// Utility: DeepSeek for lightweight internal tasks
// ═══════════════════════════════════════════════════

export async function callUtility(
  prompt: string,
  system = "You are a utility AI. Respond with JSON only. No markdown."
): Promise<string> {
  const res = await callProvider("deepseek", { system, prompt, maxTokens: 2048, temperature: 0.3 });
  return res.content;
}

// ═══════════════════════════════════════════════════
// Pre-run Cost Estimator
// ═══════════════════════════════════════════════════

export function estimateMoiraiCost(
  complexity: TaskComplexity,
  estimatedInputTokens: number,
  estimatedOutputTokens: number
): { total_estimate: number; breakdown: { stage: string; model: string; estimate: number }[] } {
  const tier = TASK_TIERS[complexity];
  const breakdown: { stage: string; model: string; estimate: number }[] = [];

  const stages = [
    { key: "clotho", config: tier.clotho },
    { key: "lachesis", config: tier.lachesis },
    { key: "eunoia", config: tier.eunoia },
  ];

  for (const { key, config } of stages) {
    if (!config) continue;
    const est = estimateCost(config.model, estimatedInputTokens, estimatedOutputTokens);
    breakdown.push({ stage: key, model: config.model, estimate: est });
  }

  return {
    total_estimate: breakdown.reduce((s, b) => s + b.estimate, 0),
    breakdown,
  };
}

