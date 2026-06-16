# WiVViW — Stack Elevation Audit
## Eunoia Assessment — March 2026
## Every component evaluated against best-in-class. No compromises.

---

## 1. LLM PROVIDERS — UPGRADE REQUIRED

### Current State
The codebase uses GPT-4o, Gemini 1.5 Pro, and Claude Sonnet. These are now 1-2 generations behind.

### Upgraded Stack (March 2026 Current)

| MOIRAI Role | Current | Upgrade To | Why |
|---|---|---|---|
| Clotho (Generation) | GPT-4o | GPT-5.2 | 400K context, $1.75/$14 per 1M tokens. Strongest general generation. |
| Lachesis (Audit) | Gemini 1.5 Pro | Gemini 2.5 Pro | 1M token context window. Strongest reasoning benchmark scores. Free tier for prototyping. |
| Eunoia (Refinement) | Claude Sonnet | Claude Sonnet 4.6 | $3/$15 per 1M tokens. SWE-bench leader. Best instruction-following and nuanced output. |

### New Addition: Tiered Model Routing

WiVViW should not use the same model tier for every task. The MOIRAI orchestrator needs a cost-intelligence layer:

| Task Complexity | Clotho | Lachesis | Eunoia |
|---|---|---|---|
| Simple (single lookup, basic generation) | GPT-4.1-mini ($0.40/$1.60) | Skip | Skip |
| Medium (standard dRANb run) | GPT-5.2 ($1.75/$14) | Gemini 2.5 Flash ($0.15/$0.60) | Claude Sonnet 4.6 ($3/$15) |
| Complex (full MOIRAI triple-pass) | GPT-5.2 ($1.75/$14) | Gemini 2.5 Pro ($1.25/$10) | Claude Opus 4.6 ($5/$25) |
| Critical (high-stakes brand decisions) | GPT-5.2 Pro ($21/$168) | Gemini 2.5 Pro ($2/$12) | Claude Opus 4.6 ($5/$25) |

This alone can cut costs 60-80% on routine tasks while reserving max firepower for critical decisions.

### New Addition: DeepSeek as 4th Provider

DeepSeek V3.2 at $0.28/$0.42 per 1M tokens is absurdly cheap with strong reasoning. Use it for:
- Pre-screening and classification (route task complexity before MOIRAI fires)
- Bulk scoring and evaluation passes
- Connected Stack analysis (low-stakes, high-volume)
- Internal system tasks (compression summaries, metadata extraction)

This is not a replacement for the MOIRAI triad. It's the utility layer underneath it.

### Code Changes Required

In `src/lib/providers/index.ts`:
- Update model strings: `gpt-5.2`, `gemini-2.5-pro`, `claude-sonnet-4-6-20250514`
- Add DeepSeek provider wrapper (OpenAI-compatible API at `api.deepseek.com`)
- Update COST_PER_1M to current March 2026 pricing
- Add model tier selection to callProvider() based on task complexity parameter

---

## 2. ASYNC ORCHESTRATION — INNGEST CONFIRMED, WITH ENHANCEMENT

### Assessment

Inngest remains the correct choice for WiVViW. Here's why the alternatives don't fit:

- **Temporal**: More powerful but requires a dedicated stateful service, steep learning curve, and operational overhead. Overkill for Phase 1. WiVViW is serverless-first on Vercel.
- **Trigger.dev**: Open-source and self-hostable, simpler API. But Inngest has superior step functions (sleep, fan-out, debounce, priority queues) that MOIRAI needs.
- **AWS Step Functions**: Vendor lock-in. WiVViW should remain cloud-agnostic.

### Enhancement: Inngest Pro Features to Enable

- **Concurrency controls**: Limit simultaneous MOIRAI runs per user (prevent token drain)
- **Priority queues**: Premium users' MOIRAI runs execute first
- **Debounce**: If user updates brief mid-run, cancel and restart rather than duplicate
- **Batch processing**: For future bulk operations (scoring template evolution, stack analysis)

### Future Consideration (Phase 3+)

If WiVViW scales beyond Inngest's cloud capacity or needs self-hosting for enterprise clients, migrate to **Trigger.dev** (Apache 2.0, self-hostable, TypeScript-native). The Inngest function signatures translate almost 1:1.

---

## 3. 3D EXPERIENCE LAYER — R3F + GSAP CONFIRMED, WITH ADDITIONS

### Assessment

React Three Fiber is confirmed best-in-class for React + 3D in 2026. No viable competitor for this use case. R3F's ecosystem (drei helpers, rapier physics, postprocessing) is unmatched.

GSAP remains the gold standard for timeline-based animation and complex transition choreography.

### Additions for the Ethereal Cosmos (Phase 2)

| Tool | Purpose | Why |
|---|---|---|
| @react-three/drei | R3F helper components (shaders, controls, effects) | Eliminates boilerplate for common 3D patterns |
| @react-three/postprocessing | Bloom, depth of field, chromatic aberration | "White Light" genesis effect. Ethereal atmospheric glow. |
| leva | Real-time 3D parameter tuning panel | Dev-mode tweaking of cosmos variables during build |
| @react-three/rapier | Physics engine for R3F | If cosmos elements need physics-based interaction |
| Theatre.js | Visual animation timeline editor for R3F | Choreograph complex genesis sequence visually, export as code |

### Theatre.js is the sleeper pick.

It lets you design R3F animations in a visual timeline (like After Effects for 3D web), then export deterministic animation data. For the Ethereal Cosmos genesis sequence, "White Light" birth, and cosmic evolution — Theatre.js means you design it visually rather than guessing at GSAP tween values in code. Premium feel requires premium tooling.

---

## 4. DATABASE — SUPABASE CONFIRMED, WITH OPTIMIZATION

### Assessment

Supabase (PostgreSQL) is correct for WiVViW. It provides:
- Row Level Security (critical for multi-tenant premium platform)
- Realtime subscriptions (event bus)
- Edge Functions (future serverless compute)
- Auth (handles onboarding gates)
- Storage (future asset management)

### Enhancements

| Feature | Action |
|---|---|
| **Supabase Vault** | Enable for BYOK key storage in Phase 2. Currently using pgcrypto — Vault is the production-grade path. |
| **pg_cron** | Schedule provider health checks (every 60s heartbeat) natively in Postgres. Eliminates external cron dependency. |
| **pgvector** | Add now, use in Phase 2. Enables semantic search across MOIRAI outputs, briefs, and scoring data. Future: "find sessions similar to this brief." |
| **Supabase Branching** | Database branching for preview environments. Each PR gets its own database state. |
| **Connection Pooling** | Enable Supavisor (Supabase's built-in pooler) for production. Prevents connection exhaustion under MOIRAI load. |

### New Table: Audit Log

Neither prior pass included a system-wide audit log. For a premium, trust-first platform, every significant action must be traceable.

```
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES wivviw_users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Actions: session.created, moirai.dispatched, moirai.completed, scoring.passed, scoring.failed, outbound.approved, outbound.sent, user.status_changed, etc.

---

## 5. DEPLOYMENT & INFRASTRUCTURE — CURRENTLY UNSPECIFIED

Neither Clotho, Gemini, nor the current codebase specifies deployment. This must be locked.

### Recommended Stack

| Layer | Tool | Why |
|---|---|---|
| **Hosting** | Vercel | First-class Next.js support. Edge functions. Preview deployments. Inngest has native Vercel integration. |
| **CDN** | Vercel Edge Network | Automatic. Global edge caching for static assets and ISR pages. |
| **Domain** | Cloudflare (DNS + protection) | DDoS protection, DNS management, future Workers for edge logic. |
| **Monitoring** | Sentry | Error tracking, performance monitoring, session replay. Free tier covers Phase 1. |
| **Analytics** | PostHog | Product analytics, feature flags, session recording. Self-hostable. Privacy-first (critical for premium trust platform). |
| **Logging** | Axiom | Integrated with Vercel. Structured logging for MOIRAI runs, provider calls, scoring results. |
| **CI/CD** | GitHub Actions | Auto-deploy on push to main. Preview deploys on PRs. Run type checks and lint on every commit. |
| **Secrets** | Vercel Environment Variables + Supabase Vault (Phase 2) | Vercel handles deploy-time secrets. Vault handles user BYOK runtime secrets. |

---

## 6. VOICE & IDENTITY — ELEVENLABS CONFIRMED, WITH ADDITIONS

### Phase 3 Stack for 6ROXY

| Tool | Purpose |
|---|---|
| **ElevenLabs** | Voice cloning (primary). Industry-leading quality. API supports instant voice cloning from audio samples. |
| **Hume AI** | Emotion detection in voice. Can assess applicant tone during intake interview for worthiness scoring. |
| **Replicate** | Image/likeness processing. Run open-source face models (for avatar generation) without managing GPU infrastructure. |

### Hume AI is the elevation play.

During the intake interview (Gate 1), if the user speaks, Hume can analyze vocal tone for emotional signals — enthusiasm, seriousness, hesitation. This feeds directly into worthiness scoring without the user knowing the specifics of what's being evaluated. It makes WiVViW's selectivity genuinely intelligent rather than purely form-based.

---

## 7. WHAT'S NOT IN THE STACK BUT SHOULD BE

### A. Rate Limiting: Upstash Redis

Serverless-native Redis. Pay-per-request. Use for:
- Per-user API rate limiting (before Inngest dispatch)
- MOIRAI run throttling
- Session-based temporary caches
- Prevents token-drain abuse

```
npm install @upstash/ratelimit @upstash/redis
```

### B. Email Transactional: Resend

For outbound approval layer notifications, intake confirmations, and status updates.
- Built for developers. React Email templates.
- Better DX than SendGrid/Mailgun.

```
npm install resend
```

### C. Testing Framework

No testing strategy exists. For a premium platform handling real business decisions:

| Layer | Tool |
|---|---|
| Unit tests | Vitest (fast, Vite-native, TypeScript-first) |
| Integration tests | Vitest + Supabase test containers |
| E2E tests | Playwright (browser automation for full user flows) |
| API tests | Vitest + supertest for route handlers |
| MOIRAI prompt testing | Custom eval harness using scoring engine against known-good outputs |

### D. Feature Flags: PostHog or LaunchDarkly

For Phase 1 private beta:
- Gate new engines behind flags
- A/B test prompt versions without code deploys
- Gradual rollout to accepted users
- Kill switch for any MOIRAI stage if a provider goes down

### E. Search: Typesense or Meilisearch

When users accumulate sessions, candidates, and scoring data, they need to search across it. Supabase full-text search works for small scale. For premium search UX:
- Typesense: Fast, typo-tolerant, self-hostable
- Deploy on Railway or Render alongside Vercel

### F. Documentation: Mintlify

For the wivviw-docs knowledge base, if it ever becomes user-facing or developer-facing:
- Mintlify produces premium-tier documentation sites
- Integrates with GitHub for auto-deploy from markdown
- Matches the aesthetic standard WiVViW demands

---

## 8. COST OPTIMIZATION STRATEGIES

### Prompt Caching

All three major providers now offer prompt caching. System prompts for MOIRAI stages are identical across runs. Caching saves 90% on input tokens for repeated system context.

| Provider | Caching | Savings |
|---|---|---|
| OpenAI | Automatic for prompts >1024 tokens | 50% on cached input |
| Anthropic | Explicit cache control headers | 90% on cached input |
| Google | Context caching API | 75% on cached input |

### Batch API

For non-time-sensitive operations (scoring evolution, prompt performance tracking, stack usage analysis):
- OpenAI Batch API: 50% off, results within 24 hours
- Anthropic Batch API: 50% off

### Implementation

Add to `src/lib/providers/index.ts`:
- Cache-aware system prompt handling (hash system prompt, reuse cached prefix)
- Batch dispatch mode for scoring and analytics operations

---

## 9. SECURITY ADDITIONS

| Concern | Solution |
|---|---|
| API route protection | Middleware already handles auth. Add Upstash rate limiting per-route. |
| CSRF | Next.js App Router handles this natively with Server Actions. |
| Input sanitization | Zod validation already in dRANb route. Enforce on all routes. |
| Secrets rotation | Vercel supports secret rotation. Document rotation schedule. |
| Dependency scanning | GitHub Dependabot (free, automatic). |
| Content Security Policy | Add CSP headers in next.config.ts for XSS protection. |
| Supabase RLS | Already enabled. Add RLS tests to CI pipeline. |

---

## 10. SUMMARY: DEFINITIVE ELEVATED STACK

### Phase 1 (Now)
- Next.js (App Router) + TypeScript
- Supabase (PostgreSQL + Auth + Realtime + RLS)
- Inngest (async orchestration with concurrency controls)
- GPT-5.2 / Gemini 2.5 Pro / Claude Sonnet 4.6 (MOIRAI triad)
- DeepSeek V3.2 (utility layer: classification, routing, bulk ops)
- Vercel (deployment)
- Upstash Redis (rate limiting)
- Sentry (error tracking)
- Axiom (structured logging)
- Vitest + Playwright (testing)
- Resend (transactional email)
- GitHub Actions (CI/CD)

### Phase 2 (Ethereal Cosmos)
- React Three Fiber + drei + postprocessing (3D environment)
- Theatre.js (visual animation choreography)
- GSAP (transition animations)
- pgvector (semantic search across sessions)
- PostHog (analytics + feature flags)
- Supabase Vault (BYOK key management)
- Typesense (full-text search across user data)

### Phase 3 (Ethereal Gates)
- ElevenLabs (voice cloning)
- Hume AI (emotion/tone analysis for worthiness scoring)
- Replicate (likeness/avatar processing)
- Mintlify (documentation if needed)

### Code Changes Required Now

1. Update model strings in providers/index.ts to GPT-5.2, Gemini 2.5 Pro, Claude Sonnet 4.6
2. Add DeepSeek provider wrapper
3. Add tiered model routing to MOIRAI orchestrator
4. Add Upstash rate limiting middleware
5. Add prompt caching headers to all provider calls
6. Add audit_log table to migration
7. Add Sentry SDK and Axiom integration
8. Set up Vitest config and first test suite
9. Configure Vercel deployment with environment variables
10. Enable Supabase connection pooling

---

These are not aspirational additions. Every item listed solves a specific operational gap or elevates a component from functional to best-in-class. The stack is now top-tier across every layer.
