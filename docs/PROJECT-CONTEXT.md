# WiVViW — Complete Project Context
## For Claude Code Reference

---

## 1. WHAT IS WiVViW

WiVViW (pronounced "WeView") is a premium, selective, high-trust AI operating system. Users are evaluated before acceptance. The platform helps accepted users think, build, brand, communicate, and execute better using a multi-LLM orchestration system called METHOD MOIRAI.

WiVViW exists to eliminate: repetition, context loss, hallucination, wasted back-and-forth, premature completion, and the burden of users managing their own AI quality control.

## 2. TECH STACK

- Next.js 15+ (App Router) + TypeScript
- Supabase (PostgreSQL + Auth + Realtime + Row Level Security)
- Inngest (async orchestration for multi-model pipelines)
- OpenAI GPT-5.2 (Clotho — generation)
- Google Gemini 2.5 Pro (Lachesis — audit)
- Anthropic Claude Sonnet 4.6 (Eunoia — refinement)
- DeepSeek V3.2 (utility layer — classification, routing, bulk ops)
- Tailwind CSS (dark theme)
- Zod (validation)
- Deployment: Vercel

## 3. METHOD MOIRAI — Multi-LLM Orchestration

### Simple Workflow (3-pass sequential)
1. Clotho (OpenAI) generates initial output
2. Lachesis (Gemini) audits, scores, reality-checks
3. Eunoia (Claude) synthesizes, refines, produces final result

### Task Complexity Tiers

| Tier | Clotho Model | Lachesis Model | Eunoia Model |
|---|---|---|---|
| simple | GPT-4.1-mini | SKIP | SKIP |
| medium | GPT-5.2 | Gemini 2.5 Flash | Claude Sonnet 4.6 |
| complex | GPT-5.2 | Gemini 2.5 Pro | Claude Sonnet 4.6 |
| critical | GPT-5.2 | Gemini 2.5 Pro | Claude Opus 4.6 |

### Package Types
Each MOIRAI stage produces typed packages:
- deliverable: The output itself
- audit: What changed, score deltas, improvements
- thought: Reasoning, assumptions, blind spots

All packages stored in moirai_packages table with idempotency key (session_id, step_number, package_type).

## 4. ENGINES

### Phase 1 Engines (Build Now)
- dRANb: Brand naming and decision engine. Generates, scores, and verifies naming candidates.
- drandL: Digital presence engine. Checks domains, handles, identity consistency. (After dRANb)

### Phase 2+ Engines (Build Later)
- 4IELD: Field/market/competitor intelligence
- 4TRESS: Protection/trademark screening
- 6ROXY: Identity access, voice clone, onboarding
- 5ITE: Web deployment
- 3XEC: Execution/operations

### dRANb Specifics

Input: A DranbBrief containing business description, target audience, industry, tone keywords, avoid keywords, competitive context, and notes.

Output: A ranked list of brand name finalists with per-category scores (8 categories: uniqueness, memorability, commercial viability, phonetic strength, visual potential, domain plausibility, cultural safety, strategic alignment), eliminated candidates with reasons, dark horse candidate if applicable, and synthesis notes.

Flow: User submits brief → API creates odyssey_session → Inngest dispatches MOIRAI simple pipeline → 3 stages execute asynchronously → results stored → UI polls/subscribes for completion → results displayed.

## 5. TRUTH KERNEL

Every important claim in WiVViW passes through verification:

States: Verified, Unverified, Conflicted, Queued, Error

Logic:
- 3+ sources agree → Verified
- 2 agree, 1 conflicts → Conflicted (flagged for review)
- <2 sources → Unverified
- Evidence stored with SHA-256 content hash for deduplication

Table: receipts_ledger (claim_id, source, evidence JSONB, confidence 0-1, truth_state, content_hash)

## 6. SCORING

8-category scoring for dRANb brand naming:
1. Uniqueness & Distinctiveness (20% weight)
2. Memorability & Recall (15%)
3. Commercial Viability (15%)
4. Phonetic Strength (10%)
5. Visual & Typographic Potential (10%)
6. Domain & Handle Plausibility (10%)
7. Cultural & Linguistic Safety (10%)
8. Strategic Alignment with Brief (10%)

Pass threshold: 72/100
Scale: 0-100 per category

## 7. DATABASE SCHEMA SUMMARY

### Core Tables
- wivviw_users: id, email, status, standing, standing_history, onboarding_completed
- odyssey_sessions: id, user_id, engine_key, state JSONB, parent_session_id, fork_point_step
- receipts_ledger: id, claim_id, source, evidence, confidence, truth_state, content_hash, session_id
- moirai_packages: id, session_id, step_number, provider, package_type, status, content, score, pass_threshold, passed, tokens_used, cost_estimate, latency_ms

### Infrastructure Tables
- prompt_registry: id, engine_key, moirai_stage, task_type, version, prompt_text, is_active, performance_score
- scoring_templates: id, task_type, categories JSONB, pass_threshold
- scoring_results: id, session_id, package_id, template_id, scores JSONB, overall_score, passed
- provider_health: provider_key, status, latency_ms, error_rate, last_checked_at
- event_log: id, session_id, event_type, payload JSONB, created_at (Realtime enabled)
- audit_log: id, user_id, action, entity_type, entity_id, metadata, ip_address, created_at
- model_registry: id, provider_key, model_key, model_string, tier, costs, context_window, notes

All tables have Row Level Security enabled. See docs/SCHEMA.sql for full DDL.

## 8. FILE STRUCTURE

```
wivviw-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── apply/page.tsx
│   │   │   └── waiting/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── engines/
│   │   │       ├── dranb/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [session]/page.tsx
│   │   │       └── drandl/
│   │   │           ├── page.tsx
│   │   │           └── [session]/page.tsx
│   │   └── api/
│   │       ├── inngest/route.ts
│   │       ├── moirai/
│   │       │   ├── dispatch/route.ts
│   │       │   └── status/route.ts
│   │       ├── truth/
│   │       │   ├── verify/route.ts
│   │       │   └── receipts/route.ts
│   │       ├── outbound/route.ts
│   │       └── engines/
│   │           ├── dranb/route.ts
│   │           └── drandl/route.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── admin.ts
│   │   ├── inngest/
│   │   │   ├── client.ts
│   │   │   └── moirai-simple.ts
│   │   ├── truth/
│   │   │   └── kernel.ts
│   │   ├── events/
│   │   │   └── bus.ts
│   │   ├── prompts/
│   │   │   └── registry.ts
│   │   ├── engines/
│   │   │   ├── dranb.ts
│   │   │   └── shared.ts
│   │   ├── scoring/
│   │   │   ├── engine.ts
│   │   │   └── templates.ts
│   │   └── providers/
│   │       └── index.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── engines/
│   │   └── health/
│   └── middleware.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_foundation.sql
│   └── seed/
│       └── 001_dranb_defaults.sql
├── docs/
│   ├── PROJECT-CONTEXT.md
│   ├── SCHEMA.sql
│   ├── PROMPTS-SEED.sql
│   └── PROVIDERS.ts
├── .cursorrules
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 9. PROVIDER MODULE DETAILS

Located at src/lib/providers/index.ts. Key exports:

- MODELS: Pinned model strings for all 4 providers (10 model variants)
- TASK_TIERS: Maps complexity to specific models per MOIRAI stage
- callProvider(provider, opts, retries): Unified call with retry + fallback + health check
- callUtility(prompt, system): DeepSeek shortcut for cheap internal tasks
- estimateMoiraiCost(complexity, inputTokens, outputTokens): Pre-run cost estimate
- ProviderKey: "openai" | "gemini" | "anthropic" | "deepseek"
- ProviderResponse: { content, provider, model, tokens_used, latency_ms, cost_estimate, cached_tokens }

Provider health is tracked in provider_health table. Before calling, the system checks health status. If "down", skips directly to fallback chain. Fallback order includes all 4 providers.

March 2026 pricing is embedded in the COST_PER_1M object with prompt cache awareness.

## 10. EVENT SYSTEM

The event_log table has Supabase Realtime enabled. Frontend subscribes to INSERT events filtered by session_id. This gives live step-by-step visibility into MOIRAI execution.

Event types:
- moirai.step.started (with step number, stage name, provider)
- moirai.step.completed (with tokens, cost, latency)
- moirai.step.failed (with error details)
- truth.verified / truth.conflicted
- scoring.passed / scoring.failed
- dranb.candidates.generated / audited / finalized

## 11. AUTH FLOW

1. User visits / (landing page)
2. Clicks "Enter" → /login (email/password via Supabase Auth)
3. Clicks "Apply" → /apply (future intake interview)
4. Middleware checks: no session → /login, session but not accepted → /waiting, accepted → dashboard
5. Status check queries wivviw_users table for the authenticated user's status field

## 12. PHASE 1 BUILD SEQUENCE

1. Initialize Next.js + install deps
2. Supabase project + env config
3. Database migration (001_foundation.sql)
4. Seed data (dRANb prompts + scoring template)
5. Supabase client libraries (client.ts, server.ts, admin.ts)
6. Auth middleware
7. Provider module (providers/index.ts)
8. Inngest setup (client + serve endpoint)
9. Event bus
10. Prompt registry
11. Truth Kernel
12. MOIRAI simple pipeline (Inngest function)
13. dRANb engine logic
14. dRANb API route
15. Dashboard layout
16. dRANb frontend page
17. Landing + auth pages
18. Build verification + testing
