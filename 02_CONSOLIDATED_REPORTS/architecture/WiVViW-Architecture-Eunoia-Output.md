# WiVViW — Definitive Architecture & Phase 1 Roadmap
## Eunoia Synthesis — METHOD MOIRAI Stage III

---

## PART I — RECONCILIATION

### What Gemini's Schema Covers

- wivviw_users — Selective access gates
- odyssey_sessions — State continuity
- moirai_packages — Multi-model output capture
- receipts_ledger — 3-source verification engine

### What the Schema Missed

Ten experiential & operational systems from Clotho's vision have no database representation in Gemini's architecture. All ten are load-bearing.

**1. Worthiness Scoring**
The onboarding intake generates an internal seriousness & alignment score per applicant. Gemini's wivviw_users has a status field but no structured scoring model or progression audit trail.
- Required table: worthiness_scores
- Columns: user_id, dimension, score, evaluator_notes, created_at

**2. Auto-Advance Permissions**
Three execution modes per engine, per user: full_auto, single_approval, manual_precision. No table exists for storing per-engine permission states.
- Required table: advance_permissions
- Columns: user_id, engine_key, mode, updated_at

**3. Quality Scoring Engine**
Per-task evaluation with evolving category frameworks. The "above-threshold" logic means WiVViW's standards must self-upgrade when new dimensions of excellence appear.
- Required tables: scoring_templates (category sets per task type), scoring_results (per-task scores), scoring_evolution (framework upgrade audit trail)

**4. Outbound Approval Queue**
Nothing leaves WiVViW ungoverned. Emails, posts, brand statements, assets — all gated.
- Required table: outbound_queue
- Columns: id, user_id, content_type, payload, status, optimization_notes, approved_at, sent_at

**5. Connected Stack Registry**
Discover, connect, observe, & eventually replace external tools the user depends on.
- Required tables: connected_apps (user_id, app_name, connection_status, config), stack_usage_log (app_id, action, frequency, replacement_candidate)

**6. Budget Envelopes**
Token/cost estimation before execution. Hard caps, refill alerts, BYOK key storage.
- Required table: budget_envelopes
- Columns: user_id, hard_cap, current_spend, alert_threshold, byok_keys (encrypted), model_preferences

**7. Engine Health Snapshots**
Context Pressure, Verification Coverage, Conflict Rate, Stability, Cost Burn, Extraction Fidelity, Continuity Risk.
- Required table: engine_health_snapshots
- Columns: session_id, engine_key, metrics_json, captured_at

**8. Moral Universe States**
Accepted Cosmos → Limbo / Review → Inferno / Banished. Future system, not Phase 1, but the schema must anticipate it.
- Required: Add standing_state ENUM (accepted, limbo, banished) & standing_history JSONB to wivviw_users

**9. MOIRAI Package Typing**
Gemini's moirai_packages captures output but doesn't differentiate Clotho's three package types: Deliverable, Audit, Thought.
- Required: Add package_type ENUM (deliverable, audit, thought), score NUMERIC, pass_threshold NUMERIC, passed BOOLEAN to moirai_packages

**10. Proactive Optimization Queue**
The anti-back-and-forth engine's structured inference system.
- Required table: optimization_queue
- Columns: session_id, proposed_actions JSONB, confidence_score NUMERIC, status, user_decision (auto/approved/rejected), executed_at

### Eunoia Additions (New Systems Not in Either Prior Pass)

**11. Prompt Registry**
Every engine, every MOIRAI stage, every task type uses prompts. These prompts evolve. Without versioning, you lose the ability to audit why output quality changed, roll back regressions, or A/B test improvements.
- Required table: prompt_registry
- Columns: id, engine_key, moirai_stage, task_type, version INT, prompt_text, is_active BOOLEAN, performance_score NUMERIC, created_at
- Logic: Only one active version per (engine_key, moirai_stage, task_type). Previous versions retained for rollback.

**12. Session Forking**
Users will hit decision points mid-odyssey where they want to explore an alternative path without destroying the current one. Without forking, they restart from scratch.
- Required: Add parent_session_id (nullable FK to self) & fork_point_step INT to odyssey_sessions
- Logic: Fork creates a new session cloning state up to fork_point_step. Both branches persist independently.

**13. Context Compression Layer**
MOIRAI runs across long sessions will exceed token limits. Without compression, later passes receive truncated or missing context, degrading output quality silently.
- Required table: context_snapshots
- Columns: session_id, step_number, compressed_summary TEXT, full_hash TEXT (SHA-256 of original), token_count INT, created_at
- Logic: When cumulative context exceeds 80% of model context window, compress prior steps into summaries. Store hash of original for integrity verification.

**14. Event Bus & Webhook System**
The UI needs real-time updates as MOIRAI runs execute server-side via Inngest. Without an event system, the frontend polls blindly.
- Implementation: Supabase Realtime channels per session_id
- Events: moirai.step.started, moirai.step.completed, truth.verified, truth.conflicted, scoring.passed, scoring.failed, optimization.proposed
- Required table: event_log
- Columns: id, session_id, event_type, payload JSONB, created_at

**15. Export Pipeline**
Every session produces artifacts the user needs outside WiVViW: finalist names, domain reports, protection checklists, scoring summaries. Without structured export, users screenshot or copy-paste.
- Required table: export_manifests
- Columns: id, session_id, format (pdf/csv/json/docx), content_keys JSONB, generated_url TEXT, expires_at TIMESTAMPTZ
- Logic: On-demand generation. Cached for 24 hours. Formats driven by engine type.

**16. Rollback System**
If a MOIRAI pass produces worse output than the prior pass (detected by scoring), the system must be able to revert without re-running the entire pipeline.
- Implementation: moirai_packages already stores per-step output. Rollback = set the previous step's deliverable as active & mark the regressed step as rolled_back.
- Required: Add status ENUM (active, superseded, rolled_back) to moirai_packages

**17. Provider Health Monitor**
If OpenAI, Gemini, or Claude APIs degrade or go down, MOIRAI must detect this before dispatching work, not after a timeout.
- Required table: provider_health
- Columns: provider_key, status (healthy/degraded/down), latency_ms INT, last_checked_at, error_rate NUMERIC
- Logic: Heartbeat check every 60 seconds. If degraded, MOIRAI routing shifts to fallback provider. Log in engine_health_snapshots.

---

## PART II — FILE STRUCTURE

### Repository A — wivviw-docs (Knowledge Base, not deployed)

```
wivviw-docs/
├── canon/
│   ├── platform-identity.md
│   ├── mythology.md
│   ├── moral-universe.md
│   ├── brand-voice.md
│   └── laws.md
├── engines/
│   ├── dranb.md
│   ├── drandl.md
│   ├── 4ield.md
│   ├── 4tress.md
│   ├── 6roxy.md
│   ├── 5ite.md
│   └── 3xec.md
├── moirai/
│   ├── protocol.md
│   ├── package-types.md
│   ├── routing-logic.md
│   └── scoring-law.md
├── schemas/
│   ├── database-schema.sql
│   ├── api-contracts.md
│   └── enums.md
├── onboarding/
│   ├── intake-script.md
│   ├── worthiness-criteria.md
│   └── rejection-language.md
├── governance/
│   ├── outbound-rules.md
│   ├── budget-policy.md
│   └── connected-stack-policy.md
└── README.md
```

### Repository B — wivviw-app (Next.js codebase, deployed)

```
wivviw-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # genesis / landing
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── apply/page.tsx                # intake interview
│   │   │   └── waiting/page.tsx              # review state
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                    # cosmos shell, nav, health bar
│   │   │   ├── page.tsx                      # odyssey home
│   │   │   ├── settings/page.tsx             # permissions, budget, stack
│   │   │   └── engines/
│   │   │       ├── dranb/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [session]/page.tsx
│   │   │       ├── drandl/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [session]/page.tsx
│   │   │       ├── 4ield/page.tsx
│   │   │       ├── 4tress/page.tsx
│   │   │       ├── 6roxy/page.tsx
│   │   │       ├── 5ite/page.tsx
│   │   │       └── 3xec/page.tsx
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
│   │   │   ├── admin.ts
│   │   │   └── types.ts
│   │   ├── inngest/
│   │   │   ├── client.ts
│   │   │   ├── moirai-simple.ts
│   │   │   ├── moirai-complex.ts
│   │   │   └── verification.ts
│   │   ├── truth/
│   │   │   ├── kernel.ts
│   │   │   ├── receipts.ts
│   │   │   ├── quorum.ts
│   │   │   └── states.ts
│   │   ├── scoring/
│   │   │   ├── engine.ts
│   │   │   ├── templates.ts
│   │   │   └── evolution.ts
│   │   ├── moirai/
│   │   │   ├── orchestrator.ts
│   │   │   ├── packages.ts
│   │   │   ├── estimator.ts
│   │   │   └── router.ts                    # provider fallback logic
│   │   ├── engines/
│   │   │   ├── dranb.ts
│   │   │   ├── drandl.ts
│   │   │   └── shared.ts
│   │   ├── governance/
│   │   │   ├── outbound.ts
│   │   │   ├── permissions.ts
│   │   │   └── budget.ts
│   │   ├── context/
│   │   │   ├── compression.ts               # context window management
│   │   │   └── snapshots.ts
│   │   ├── events/
│   │   │   ├── bus.ts                        # Supabase Realtime channels
│   │   │   └── types.ts
│   │   ├── prompts/
│   │   │   ├── registry.ts                   # prompt versioning
│   │   │   └── loader.ts
│   │   ├── export/
│   │   │   └── pipeline.ts
│   │   └── providers/
│   │       ├── openai.ts
│   │       ├── gemini.ts
│   │       ├── anthropic.ts
│   │       ├── elevenlabs.ts
│   │       └── health.ts                    # provider health monitor
│   └── components/
│       ├── ui/
│       ├── cosmos/
│       ├── engines/
│       ├── health/
│       └── governance/
├── supabase/
│   ├── migrations/
│   │   ├── 001_core_tables.sql
│   │   ├── 002_moirai_tables.sql
│   │   ├── 003_governance_tables.sql
│   │   ├── 004_engine_tables.sql
│   │   ├── 005_connected_stack.sql
│   │   ├── 006_prompt_registry.sql
│   │   ├── 007_context_compression.sql
│   │   └── 008_events_export.sql
│   ├── seed/
│   │   ├── scoring_templates.sql
│   │   └── default_prompts.sql
│   └── config.toml
├── inngest.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local
└── README.md
```

.env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, GOOGLE_AI_KEY, ANTHROPIC_API_KEY, ELEVENLABS_API_KEY, INNGEST_EVENT_KEY, INNGEST_SIGNING_KEY

---

## PART III — AMENDED DATABASE SCHEMA

### Full Table Inventory

| Table | Origin | Purpose |
|---|---|---|
| wivviw_users | Gemini + Amended | Add standing_state, standing_history JSONB |
| odyssey_sessions | Gemini + Amended | Add parent_session_id, fork_point_step for forking |
| moirai_packages | Gemini + Amended | Add package_type, score, pass_threshold, passed, status ENUM |
| receipts_ledger | Gemini | Unchanged |
| worthiness_scores | New (Eunoia) | Onboarding intake scoring per dimension |
| advance_permissions | New (Eunoia) | Per-user, per-engine execution mode |
| scoring_templates | New (Eunoia) | Quality category frameworks per task type |
| scoring_results | New (Eunoia) | Per-task evaluation scores |
| scoring_evolution | New (Eunoia) | Framework upgrade audit trail |
| outbound_queue | New (Eunoia) | Output governance before external dispatch |
| connected_apps | New (Eunoia) | External tool registry per user |
| stack_usage_log | New (Eunoia) | Usage observation for replacement roadmap |
| budget_envelopes | New (Eunoia) | Cost caps, spend tracking, BYOK keys |
| engine_health_snapshots | New (Eunoia) | Operational signal capture per session |
| optimization_queue | New (Eunoia) | Anti-back-and-forth proposed actions |
| prompt_registry | New (Eunoia) | Versioned prompt templates per engine/stage |
| context_snapshots | New (Eunoia) | Compressed session context for token management |
| event_log | New (Eunoia) | Real-time event bus for UI updates |
| export_manifests | New (Eunoia) | Structured artifact export pipeline |
| provider_health | New (Eunoia) | LLM provider status & fallback routing |

Full DDL lives in wivviw-docs/schemas/database-schema.sql and is executed via migrations in wivviw-app/supabase/migrations/.

---

## PART IV — PHASE 1 EXECUTION PLAN

### Step 1: Initialize Repositories

Create wivviw-docs (private GitHub, knowledge only, never deployed) and wivviw-app (Cursor workspace).

```
mkdir wivviw-docs && cd wivviw-docs && git init
npx create-next-app@latest wivviw-app --typescript --tailwind --eslint --app --src-dir
```

### Step 2: Supabase Project & Environment

Create Supabase project. Retrieve URL, anon key, service role key. Populate .env.local. Never commit this file.

```
npm install @supabase/supabase-js @supabase/ssr
npx supabase init
npx supabase link --project-ref YOUR_PROJECT_REF
```

### Step 3: Migration 001 — Core Tables

Foundation: users with worthiness scoring, sessions with continuity & forking, receipts ledger. Enable Row Level Security on every table from day one.

```
npx supabase migration new core_tables
# CREATE TABLE wivviw_users (id, email, status, standing_state, standing_history, onboarding_completed, created_at)
# CREATE TABLE worthiness_scores (id, user_id, dimension, score, evaluator_notes, created_at)
# CREATE TABLE odyssey_sessions (id, user_id, engine_key, state JSONB, parent_session_id, fork_point_step, created_at, updated_at)
# CREATE TABLE receipts_ledger (id, claim_id, source, evidence, confidence, truth_state, created_at)
# RLS on all tables
npx supabase db push
```

### Step 4: Supabase Auth & Middleware

Configure Supabase Auth. Build Next.js middleware that gates every route behind authentication & checks user status. Unapproved users see only the waiting page.

Create: src/lib/supabase/client.ts, server.ts, admin.ts, src/middleware.ts

Middleware logic: Check session → no session redirects to /login → session but status !== 'accepted' redirects to /waiting → accepted users pass through to dashboard routes.

### Step 5: Intake Interview (The Gate)

Build /apply. Multi-step guided intake, not a form. Each answer feeds worthiness_scores & maps user intent. Completion sets status to 'pending_review'. Manual admin approval flips to 'accepted'.

Questions: how heard, expectations, skepticism, what solving, seriousness signals.

Build a minimal admin view (internal only) to view pending applicants, scores, approve/deny.

### Step 6: Inngest Setup

Install Inngest for async orchestration. Prevents serverless timeouts during heavy MOIRAI multi-model loops.

```
npm install inngest
# Create: src/lib/inngest/client.ts, src/app/api/inngest/route.ts
npx inngest-cli@latest dev
```

### Step 7: Provider Health Monitor

Before building MOIRAI, establish provider health checks so the orchestrator has fallback intelligence from the start.

Create: src/lib/providers/health.ts — heartbeat check per provider every 60s, write to provider_health table. If degraded: flag for MOIRAI routing fallback.

Create: src/lib/providers/openai.ts, gemini.ts, anthropic.ts — API wrappers with built-in retry (2x) & fallback escalation.

### Step 8: Prompt Registry

Before MOIRAI runs prompts, those prompts need to be versioned & retrievable.

Create: src/lib/prompts/registry.ts — getActivePrompt(engine_key, moirai_stage, task_type), createVersion(), rollbackVersion()

Seed: supabase/seed/default_prompts.sql — initial prompt templates for dRANb naming generation, dRANb audit, dRANb refinement.

### Step 9: Truth Kernel

The spine. Build the receipts ledger, 3-source quorum logic, & verification state machine.

Create src/lib/truth/:
- kernel.ts — verify(claim, sources[]) → TruthState (Verified, Unverified, Conflicted, Queued, Error)
- receipts.ts — store(claim_id, source, evidence, confidence) with SHA-256 content hash for deduplication
- quorum.ts — evaluate(receipts[]) → verdict. 3 agree = Verified, 2/1 = Conflicted, <2 = Unverified
- states.ts — TruthState enum & transition rules

Wire Inngest function: src/lib/inngest/verification.ts — async 3-source check, write to receipts_ledger.

### Step 10: Event Bus

Set up Supabase Realtime channels per session_id so the UI receives live updates as MOIRAI runs execute server-side.

Create: src/lib/events/bus.ts — emit(session_id, event_type, payload), subscribe(session_id, callback)

Event types: moirai.step.started, moirai.step.completed, truth.verified, truth.conflicted, scoring.passed, scoring.failed

### Step 11: MOIRAI Pipeline — Simple Workflow

Build the simple 3-pass pipeline as an Inngest function. ChatGPT → Gemini → Claude. Each pass produces typed packages (deliverable + audit + thought). Store all in moirai_packages with scoring.

Create src/lib/inngest/moirai-simple.ts:
- Step 1: Load active prompts from prompt_registry. ChatGPT generates (deliverable + audit + thought).
- Step 2: Gemini receives Step 1 output, audits & improves.
- Step 3: Claude receives all prior, refines & completes.
- Each step: INSERT moirai_packages with package_type. Emit events via bus.
- Final step: scoring engine evaluates. If below threshold, flag for retry or rollback.

Create src/lib/moirai/packages.ts, orchestrator.ts, estimator.ts.

Estimator: estimate(task) → { approx_cost, approx_time, model_path, confidence }. Present to user before execution unless auto-advance is enabled.

### Step 12: Context Compression

Build the compression layer so long sessions don't silently degrade.

Create src/lib/context/compression.ts — when cumulative tokens exceed 80% of model context window, compress prior steps into summaries. Store hash of original in context_snapshots for integrity.

### Step 13: Quality Scoring Engine

Build per-task evaluation with evolving frameworks.

Create src/lib/scoring/:
- engine.ts — score(task, output, template) → category scores, overall score, pass/fail
- templates.ts — load scoring categories per task type from scoring_templates
- evolution.ts — if output introduces a new dimension of excellence above current framework, propose framework upgrade, log in scoring_evolution

### Step 14: dRANb Engine

The first wedge. User provides brief. dRANb generates candidates via MOIRAI pipeline. Each candidate scored, ranked, & verified through Truth Kernel.

Create src/lib/engines/dranb.ts:
- generateCandidates(brief) → triggers MOIRAI simple
- scoreCandidates(candidates[]) → ranked list with per-category scores
- verifyCandidates(candidates[]) → Truth Kernel checks (uniqueness, domain availability, trademark signals)

Create src/app/(dashboard)/engines/dranb/page.tsx — brief input, candidate board, scoring display, truth states. Session persistence via odyssey_sessions.

### Step 15: drandL Engine

Digital presence verification. Takes winning candidate from dRANb & checks domain availability, handle availability across platforms, identity consistency. All results through Truth Kernel with receipts.

Create src/lib/engines/drandl.ts:
- checkDomains(name, extensions[]) → Truth Kernel verified
- checkHandles(name, platforms[]) → Truth Kernel verified
- assessConsistency(name) → cross-platform identity score

Flow: dRANb winner → drandL verification → 4TRESS protection (Phase 2).

### Step 16: Export Pipeline

Build on-demand artifact export so users can extract session results.

Create src/lib/export/pipeline.ts — generate(session_id, format) → PDF/CSV/JSON/DOCX. Cache for 24 hours. Store manifest in export_manifests.

---

## PART V — BLIND SPOTS CAUGHT

### From Neither Prior Pass

1. **Rate Limiting** — A selective platform allowing heavy multi-model runs is a token-drain target. Per-user rate limiting at the API route level before Inngest dispatch, not after. Use Upstash Redis or Supabase-native.

2. **Secrets Management for BYOK** — Storing user API keys as encrypted JSONB is insufficient long-term. Phase 1: encrypted columns with pgcrypto. Phase 2: Supabase Vault.

3. **Idempotency in MOIRAI Runs** — Inngest handles retries. Partial completion must not create duplicate packages. Composite unique constraint: (session_id, step_number, package_type).

4. **Session Reconnection** — Odyssey sessions span hours. If browser closes mid-run, Inngest continues server-side. UI must reconnect via Supabase Realtime subscription on session_id. User reopens → immediately sees current state.

5. **Prompt Drift** — Without versioned prompts, quality regressions are invisible. The prompt registry solves this. Every prompt change is a new version. Performance tracked per version.

6. **Token Ceiling Silence** — Long sessions will hit context limits. Without compression, later MOIRAI passes receive truncated input & degrade silently. The context compression layer prevents this.

7. **No Rollback Path** — If MOIRAI Pass 3 is worse than Pass 2 (detected by scoring), there was no mechanism to revert. The rollback status on moirai_packages solves this.

8. **No Export** — Users produce valuable artifacts inside WiVViW but had no structured way to extract them. The export pipeline closes this gap.

---

## PART VI — EXECUTION SUMMARY

| Step | Action | Dependency |
|---|---|---|
| 01 | Initialize both repositories | None |
| 02 | Supabase project & env config | Step 01 |
| 03 | Migration 001 — core tables with RLS | Step 02 |
| 04 | Supabase Auth & route middleware | Step 03 |
| 05 | Intake interview (the gate) | Step 04 |
| 06 | Inngest async orchestration setup | Step 02 |
| 07 | Provider health monitor | Step 06 |
| 08 | Prompt registry & seed prompts | Step 03 |
| 09 | Truth Kernel | Step 03, 06 |
| 10 | Event bus (Supabase Realtime) | Step 03 |
| 11 | MOIRAI simple pipeline | Step 07, 08, 09, 10 |
| 12 | Context compression layer | Step 11 |
| 13 | Quality scoring engine | Step 03 |
| 14 | dRANb engine | Step 11, 13 |
| 15 | drandL engine | Step 14, 09 |
| 16 | Export pipeline | Step 14 |

When Step 16 is complete, WiVViW has:
- A selective, gated entry system
- A persistent truth engine with receipts & content hashing
- Versioned prompt management
- A working multi-model orchestration pipeline with provider fallback
- Real-time UI updates via event bus
- Context compression for long sessions
- Quality scoring with self-evolving frameworks
- Rollback capability on any MOIRAI pass
- The complete dRANb → drandL brand path
- Session continuity with forking
- Structured artifact export
- Pre-execution cost estimation

That is proof of value. That is the private beta.
