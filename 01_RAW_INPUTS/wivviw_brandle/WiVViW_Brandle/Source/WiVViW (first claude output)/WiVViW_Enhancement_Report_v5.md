# WiVViW PLATFORM — ENHANCEMENT REPORT v5.0
## Architecture Review, Production Hardening & Feature Expansion
### Prepared for Oracle Vision | Cursor + Claude Build Pipeline

---

## TABLE OF CONTENTS

1. [CRITICAL INCONSISTENCIES & RESOLUTIONS](#1-critical-inconsistencies--resolutions)
2. [STRUCTURAL OPTIMIZATIONS](#2-structural-optimizations)
3. [ARCHITECTURE STRENGTHENING](#3-architecture-strengthening)
4. [NEW ENGINES & APPS](#4-new-engines--apps)
5. [CODING IMPROVEMENTS & PRODUCTION HARDENING](#5-coding-improvements--production-hardening)
6. [GAP ANALYSIS & FILLS](#6-gap-analysis--fills)
7. [ENHANCED TECHNICAL SCHEMAS](#7-enhanced-technical-schemas)

---

## 1. CRITICAL INCONSISTENCIES & RESOLUTIONS

### 1.1 UNRESOLVED — Engine Numbering vs. Naming Convention

**Issue:** The spec references a "7-App Galaxy" but the actual engine count doesn't align with the naming convention. The prefix numbers in engine names (3XEC, 4IELD, 4TRESS, 5ITE, 6ROXY) create a broken sequence:

| Engine | Prefix | Canonical Position |
|--------|--------|--------------------|
| dRANb | 1 (implied) | Engine 01 |
| brandL | 2 (implied) | Engine 02 |
| 3XEC | 3 | Engine 03 |
| 4IELD | 4 | Engine 04 |
| 4TRESS | 4 | Engine 05 — **CONFLICT: shares prefix "4" with 4IELD** |
| 5ITE | 5 | Engine 06 |
| 6ROXY | 6 | Engine 07 |

**Resolution:** The "4" prefix collision between 4IELD and 4TRESS is a branding liability. Two options:
- **Option A (Recommended):** Rebrand 4TRESS → F0RTRESS or FORTR3SS (preserves fortress metaphor, eliminates collision).
- **Option B:** Accept the collision and differentiate purely through color identity (teal vs. red). Document this as intentional — "4" represents the "Fourth Wall" of business protection (both intelligence and legal).
- **Action Required:** Oracle must lock one option before Cursor build begins.

### 1.2 UNRESOLVED — V4ULT Position in the Galaxy

**Issue:** V4ULT is described as a "Shared OS Service" (MODULE 8) but also appears in the Top Nav as a standalone destination alongside engines. It has its own color identity (Blue, HSL 220 70% 55%) and its own metaphor ("The Time Spine"). This is functionally an 8th engine masquerading as infrastructure.

**Resolution:** Promote V4ULT to Engine 08 officially. This makes the "7-App Galaxy" → "8-Engine Constellation." The Evidence Vault remains a sub-module within V4ULT. Update all marketing copy from "7-App Galaxy" to "The Constellation" (no fixed number — allows future expansion without rebrand).

### 1.3 UNRESOLVED — Orchestrator (GPT 0) vs. WiVViW's Own AI

**Issue:** Module 9.2 describes an "Orchestrator Architecture" using GPT-branded nomenclature (GPT_0, GPT_A, GPT_B, etc.). This creates vendor lock-in at the conceptual level and implies the system is a ChatGPT wrapper rather than a sovereign platform.

**Resolution:** Rename:
- GPT_0 → `NEXUS` (The Router / Front Door)
- GPT_A → `LEXIS` (Naming Specialist)
- GPT_B → `AURA` (Experience Specialist)
- GPT_C → `AEGIS` (Security/IP Specialist)
- GPT_D → `ATLAS` (Monetization/Growth Specialist)
- This preserves model-agnosticism — NEXUS can route to Claude, GPT, Gemini, or local models.

### 1.4 RESOLVED BUT UNDERDOCUMENTED — Pricing Tiers

**Issue:** Legacy docs reference $39/$99; canonical v4.0 locks $49/$199. The Conflict Resolution Log notes this but the spec still contains both figures in different sections.

**Resolution:** Hard-lock pricing in a single `PRICING_CANON.json` file. All other references must import from this file. No inline pricing figures anywhere else in the spec.

```json
{
  "pricing_version": "5.0",
  "effective_date": "2026-04-01",
  "tiers": {
    "twin": { "monthly": 0, "annual": 0, "label": "THE TWIN", "tagline": "Scout" },
    "squad": { "monthly": 49, "annual": 360, "label": "THE SQUAD", "tagline": "Founder" },
    "empire": { "monthly": 199, "annual": 900, "label": "THE EMPIRE", "tagline": "Company" }
  },
  "verticals": {
    "real_estate": 29,
    "restaurants": 49,
    "coaches": 39,
    "creators": 29
  }
}
```

### 1.5 INCONSISTENCY — 6ROXY Mandatory Clone vs. Accessibility

**Issue:** 6ROXY requires "360° video capture + 5 minutes of voice audio" and states "You cannot use WiVViW without becoming WiVViW." This is a hard barrier that will kill conversion rates. Users with disabilities, privacy concerns, or low-quality devices cannot comply.

**Resolution:** Implement tiered onboarding:
- **Tier 0 (Text-Only Twin):** Avatar generated from uploaded photos + text preferences. No video/voice required. Access to all engines except Ghost Protocol and A2A voice.
- **Tier 1 (Voice Twin):** Voice audio only. Enables voice-based features.
- **Tier 2 (Full Twin):** Full video + voice capture. Unlocks all 6ROXY capabilities.
- Remove the "mandatory" language. Replace with progressive disclosure: "Unlock more features by enhancing your Digital Twin."

### 1.6 INCONSISTENCY — 3XEC "No Legal Advice" vs. Operating Agreement Drafts

**Issue:** 3XEC generates "Operating Agreements" and "Articles of Organization" while the platform's non-negotiable rule is "No Legal Advice." Drafting legal documents IS legal practice in most jurisdictions.

**Resolution:** Reframe all 3XEC legal outputs as:
- "Formation Templates" (not "Drafts")
- Every template output must include: `⚠️ TEMPLATE ONLY — Not reviewed by an attorney. Must be customized and reviewed by qualified legal counsel before execution.`
- Add a mandatory "I understand this is not legal advice" checkbox before any template export.
- Remove the word "Draft" from all legal-adjacent features.

### 1.7 INCONSISTENCY — Design System Color Tokens

**Issue:** The spec mandates "HSL tokens only; never hardcode hex" but the Nika Zamanian case study and Coastal Chronicle specs use hardcoded hex values (#DAA520, #FAF8F2, #1A1A1A, #D4AF37, etc.).

**Resolution:** Client/vertical configs can use hex for branding, but the WiVViW platform UI must use HSL tokens exclusively. Create a clear separation:
- `platform.tokens.css` — HSL only, platform chrome
- `client.brand.css` — Hex allowed, user-facing brand assets
- Document this dual-system in the style guide.

### 1.8 INCONSISTENCY — NoK Radio Placement

**Issue:** NoK Radio appears under "Media Ecosystem" (9.4) as a satellite holding but also appears in pricing tiers as a feature ("NoK Radio ad-free" in Squad tier). It's unclear whether NoK is an internal platform feature or a standalone product.

**Resolution:** NoK Radio is BOTH — an embedded feature AND a standalone brand:
- **Internal:** Embedded music player in all WiVViW workspaces (ambient productivity music). Free tier gets ads; Squad+ gets ad-free.
- **External:** Standalone Pirate Radio brand with its own audience, content, and revenue stream.
- Document this dual nature explicitly. Create a `NoK_Integration_Spec.md` file.

---

## 2. STRUCTURAL OPTIMIZATIONS

### 2.1 Document Architecture (For Cursor Consumption)

The current spec is a monolithic blob. Cursor works best with modular, file-scoped context. Restructure as:

```
wivviw/
├── docs/
│   ├── CANON.md                    # Non-negotiable rules, philosophy, glossary
│   ├── ARCHITECTURE.md             # System architecture, data flow, orchestrator
│   ├── DESIGN_SYSTEM.md            # Colors, typography, animations, components
│   ├── PRICING_CANON.json          # Single source of truth for all pricing
│   ├── engines/
│   │   ├── 01_dRANb.md             # Naming engine spec
│   │   ├── 02_brandL.md            # Territory engine spec
│   │   ├── 03_3XEC.md              # Operations engine spec
│   │   ├── 04_4IELD.md             # Intelligence engine spec
│   │   ├── 05_4TRESS.md            # Protection engine spec
│   │   ├── 06_5ITE.md              # Product engine spec
│   │   ├── 07_6ROXY.md             # Avatar engine spec
│   │   └── 08_V4ULT.md             # Archive engine spec
│   ├── shared/
│   │   ├── GOVERNANCE.md           # Kill switch, permissions, data tiers
│   │   ├── MODEL_HEALTH.md         # Hallucination gauge spec
│   │   ├── PULSE.md                # Ops cadence spec
│   │   └── MEDIA_KIT.md            # Twin modes, teaching assets
│   ├── apps/
│   │   ├── STATICFLOW.md
│   │   ├── DOUBLE_CAMMY.md
│   │   ├── CLIPSMITH.md
│   │   └── ... (one file per app)
│   └── oracle_lexicon/
│       ├── LEXICON_INDEX.md
│       ├── cluster_01_mythic.json
│       ├── cluster_02_omniscient.json
│       └── ... (one JSON per cluster)
├── schemas/
│   ├── database.prisma             # Prisma schema (replaces raw SQL)
│   ├── api.openapi.yaml            # OpenAPI 3.1 spec
│   └── events.schema.json          # Event bus contracts
├── prompts/
│   ├── orchestrator.md             # NEXUS routing prompt
│   ├── dranb_scoring.md            # dRANb evaluation prompt
│   └── ... (one file per agent)
└── .cursorrules                    # Cursor-specific config
```

### 2.2 Canonical Workflow — Tightened & Production-Locked

Current spec lists workflow as: `Intake → dRANb → brandL → 4IELD → 4TRESS`

This is incomplete. Full production workflow:

```
PHASE 0: ONBOARDING
  └─ Account creation → 6ROXY Twin setup (Tier 0 minimum) → Workspace config

PHASE 1: IDENTITY FORGE
  └─ Intake Wizard → dRANb (Generate → Evaluate → Compare → Shortlist → Decide)
     Gate: Shortlist must reach 3-7 names to proceed

PHASE 2: TERRITORY CLAIM
  └─ brandL (Domain ladder → Handle ladder → Consistency scoring)
     Gate: Primary domain must be confirmed (purchased or verified available)

PHASE 3: INTELLIGENCE SCAN
  └─ 4IELD (Competitor clustering → Crowding analysis → White space mapping)
     Gate: Semantic Crowding Score must be < 67 (not "Crowded")

PHASE 4: PROTECTION LAYER
  └─ 4TRESS (Readiness assessment → Class suggestions → Evidence log)
     Gate: Readiness score must be > 40 ("Early Stage" minimum)

PHASE 5: OPERATIONS BUILD
  └─ 3XEC (Mission/Vision → Business Plan → Formation Templates → Pitch Deck)
     Gate: Business Plan must pass internal QC rubric

PHASE 6: DIGITAL PRODUCT
  └─ 5ITE (Identity injection → Functional widgets → SEO → Legal injection)
     Gate: Lighthouse score > 90, mobile responsive verified

PHASE 7: ACTIVATION
  └─ 6ROXY full calibration → Pulse cadence set → V4ULT initial snapshot

ONGOING: V4ULT continuously archives. 4IELD drift monitoring. Pulse cadence executes.
```

### 2.3 Nomenclature Matrix — Locked & Cleaned

| Term | Canon Name | Pronunciation | Role | Color (HSL) | Metaphor |
|------|-----------|---------------|------|-------------|----------|
| Platform | WiVViW | "wiv-view" | The Business Metaverse | — | The Constellation |
| Engine 01 | dRANb | "dranb" | Identity Engine | 42 87% 55% (Gold) | The Workbench |
| Engine 02 | brandL | "brand-L" | Territory Engine | 270 60% 55% (Purple) | The Ladder |
| Engine 03 | 3XEC | "exec" | Operations Engine | 220 70% 50% (Steel Blue) | The Dojo |
| Engine 04 | 4IELD | "field" | Intelligence Engine | 175 60% 45% (Teal) | The Map |
| Engine 05 | 4TRESS | "fortress" | Protection Engine | 350 80% 55% (Red) | The Citadel |
| Engine 06 | 5ITE | "site" | Product Engine | 270 80% 60% (Violet) | The Construct |
| Engine 07 | 6ROXY | "proxy" | Avatar Engine | 30 90% 55% (Orange) | The Mask |
| Engine 08 | V4ULT | "vault" | Archive Engine | 220 70% 55% (Blue) | The Time Spine |
| Router | NEXUS | "nexus" | Orchestrator | 0 0% 100% (White) | The Front Door |
| Framework | method mnemosyne | — | Umbrella System | — | — |
| Extraction | ENGRAMAESTRO | — | Consolidation Engine | — | — |

---

## 3. ARCHITECTURE STRENGTHENING

### 3.1 Missing: Event-Driven Architecture (CRITICAL)

The current spec describes engines as isolated modules with shared DB access. This creates tight coupling and makes scaling impossible. Add an event bus:

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  Engine   │────▶│  Event Bus   │────▶│  Engine   │
│  (dRANb)  │     │  (Redis/NATS)│     │  (brandL) │
└──────────┘     └──────────────┘     └──────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │   V4ULT      │
                 │  (Subscriber)│
                 └──────────────┘
```

**Event Contracts:**

```typescript
// Core event types — every engine emits and subscribes
type WiVViWEvent =
  | { type: "ENGINE_RUN_STARTED"; engine: EngineId; runId: string; projectId: string; timestamp: string }
  | { type: "ENGINE_RUN_COMPLETED"; engine: EngineId; runId: string; artifacts: ArtifactRef[]; timestamp: string }
  | { type: "ENGINE_RUN_FAILED"; engine: EngineId; runId: string; error: ErrorPayload; timestamp: string }
  | { type: "SCORE_COMPUTED"; engine: EngineId; entityId: string; score: number; confidence: number; dimensions: Record<string, number> }
  | { type: "GATE_PASSED"; phase: WorkflowPhase; projectId: string; timestamp: string }
  | { type: "GATE_BLOCKED"; phase: WorkflowPhase; projectId: string; reason: string; timestamp: string }
  | { type: "ARTIFACT_CREATED"; type: ArtifactType; path: string; engine: EngineId; runId: string }
  | { type: "CONFLICT_DETECTED"; source: string; field: string; valueA: unknown; valueB: unknown }
  | { type: "USER_DECISION"; projectId: string; engine: EngineId; decision: string; alternatives: string[] }
  | { type: "HEALTH_DEGRADED"; engine: EngineId; stabilityIndex: number; triggers: string[] }
```

### 3.2 Missing: Caching Layer

No caching strategy exists. Add:

```
Request → Edge Cache (Cloudflare) → API Cache (Redis) → DB (Postgres)
```

- **Edge:** Static assets, media kit clips, avatar thumbnails (TTL: 24h)
- **Redis:** Engine run results, scoring computations, competitor clusters (TTL: 1h for active projects)
- **Invalidation:** Event-driven. `ENGINE_RUN_COMPLETED` invalidates related cache keys.

### 3.3 Missing: Rate Limiting Strategy

No rate limits defined. Critical for AI-heavy operations:

```typescript
const RATE_LIMITS = {
  free: {
    engine_runs_per_day: 5,
    ai_calls_per_hour: 20,
    export_per_day: 1,
    avatar_generations: 3,
  },
  squad: {
    engine_runs_per_day: 50,
    ai_calls_per_hour: 200,
    export_per_day: 25,
    avatar_generations: 20,
  },
  empire: {
    engine_runs_per_day: -1, // unlimited
    ai_calls_per_hour: 1000,
    export_per_day: -1,
    avatar_generations: -1,
  },
} as const;
```

### 3.4 Missing: Error Boundary Architecture

No error handling strategy exists. Add:

```typescript
// Global error taxonomy
enum ErrorDomain {
  VALIDATION = "VALIDATION",       // Bad input
  AI_SERVICE = "AI_SERVICE",       // LLM failures, hallucination detected
  INTEGRATION = "INTEGRATION",     // Third-party API failures
  AUTHORIZATION = "AUTHORIZATION", // Permission violations
  RATE_LIMIT = "RATE_LIMIT",       // Throttle hits
  DATA_INTEGRITY = "DATA_INTEGRITY", // Schema violations, corruption
  SYSTEM = "SYSTEM",               // Infrastructure failures
}

// Every error produces a structured receipt
interface ErrorReceipt {
  id: string;                      // UUID
  domain: ErrorDomain;
  engine: EngineId | null;
  message: string;                 // User-facing (calm, procedural)
  detail: string;                  // Internal (technical)
  severity: "info" | "warning" | "error" | "critical";
  recoverable: boolean;
  suggested_action: string;        // What the user should do
  timestamp: string;
  run_id: string | null;
}
```

### 3.5 Missing: Real-Time Architecture (WebSockets)

6ROXY's Ghost Protocol, A2A communication, and live avatar interactions all require WebSocket infrastructure. Not mentioned anywhere:

```
Client ←→ Supabase Realtime ←→ Presence Channel (avatar state)
                              ←→ Engine Channel (run progress)
                              ←→ A2A Channel (agent-to-agent negotiation)
```

**Channels:**
- `project:{id}` — Engine run progress, gate status updates
- `avatar:{userId}` — 6ROXY state, emotion updates, meeting status
- `a2a:{sessionId}` — Agent-to-agent negotiation transcripts
- `pulse:{workspaceId}` — Morning brief, sunset report delivery

### 3.6 Missing: Mobile Strategy

No mobile architecture exists. The spec says "Mobile First" but provides no native strategy:

**Recommendation:** Progressive Web App (PWA) for v1, React Native for v2.
- PWA handles: All engine interfaces, scoring dashboards, V4ULT browsing
- React Native adds: 6ROXY camera capture (360°), voice recording, push notifications, biometric auth
- Shared: Design system tokens, API contracts, event subscriptions

### 3.7 Missing: Testing Strategy

No testing framework defined. Add:

```
Unit Tests:     Vitest (scoring algorithms, validation logic)
Integration:    Playwright (engine workflows, gate transitions)
E2E:            Cypress (full onboarding → export flows)
AI Quality:     Custom eval harness (scoring consistency, hallucination detection)
Load:           k6 (concurrent engine runs, avatar rendering)
```

### 3.8 Missing: CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
pipeline:
  lint → type-check → unit-test → build → integration-test → deploy-preview → e2e → deploy-production
  
branch strategy:
  main         → production (Vercel)
  staging      → preview (Vercel preview)
  feature/*    → PR preview (Vercel)
  
quality gates:
  - TypeScript strict (no `any`)
  - Test coverage > 80%
  - Lighthouse > 90 (performance, accessibility)
  - Bundle size budget (< 250KB initial JS)
  - Zero critical/high Snyk vulnerabilities
```

---

## 4. NEW ENGINES & APPS

### 4.1 NEW ENGINE: 8IGHT (The Analytics Engine)

**Canon Name:** 8IGHT (Pronunciation: "Insight")
**Role:** Business Intelligence & Analytics Dashboard
**Color:** HSL 45 85% 55% (Warm Gold)
**Metaphor:** The Telescope
**Trigger:** Always-on. Activates passively once any engine produces data.

**Core Modules:**
- **Revenue Telescope:** Real-time revenue tracking with predictive modeling. Integrates with 3XEC's CFO Module and Stripe.
- **Engagement Heatmaps:** Track which engines users spend time in, which features drive retention.
- **Competitor Pulse:** Rolling dashboard of 4IELD intelligence updates — market shifts, new entrants, naming trends.
- **Brand Health Score (BHS):** Unified KPI combining dRANb distinctiveness, brandL consistency, 4IELD crowding, and 4TRESS readiness. Single number (0-100) that tells you how strong your brand is at any moment.
- **Export Studio:** One-click generation of investor-ready reports, board decks, and monthly summaries pulling from V4ULT data.
- **Anomaly Detection:** ML-driven alerts when metrics deviate from baselines (sudden traffic drop, competitor launch, brand mention spike).

### 4.2 NEW ENGINE: 9RAPH (The Relationship Engine)

**Canon Name:** 9RAPH (Pronunciation: "Graph")
**Role:** Network Intelligence & Relationship Mapping
**Color:** HSL 160 55% 45% (Emerald)
**Metaphor:** The Web
**Trigger:** Activates when 3XEC identifies stakeholders or 6ROXY initiates A2A sessions.

**Core Modules:**
- **Stakeholder Map:** Visual graph of every entity the brand interacts with (investors, partners, competitors, vendors, customers). Auto-populated from 3XEC and 6ROXY data.
- **Influence Scoring:** Rank stakeholders by impact potential. "Investor A has 3x more portfolio overlap than Investor B."
- **Introduction Engine:** AI-suggested warm introductions based on network proximity. "You know X, who knows Y, who can connect you to Z."
- **Deal Room:** Secure collaboration spaces for negotiations with external parties. V4ULT-backed audit trail.
- **Partnership Matcher:** Cross-references your brand profile against a database of complementary brands. "Your fitness app + this nutrition brand = high synergy score."

### 4.3 NEW APP: SPECTR (AI Content Quality Analyzer)

**Niche:** Creators, agencies, marketing teams
**Core:** Upload any content (video, image, copy, audio) → AI analyzes quality across 12 dimensions (clarity, brand consistency, emotional resonance, accessibility, SEO fitness, cultural safety, platform optimization, hook strength, CTA effectiveness, visual hierarchy, audio quality, pacing). Returns a "Content Grade" (A-F) with specific improvement recommendations.
**Moat:** No tool currently scores content across ALL dimensions simultaneously. Most tools score one thing (SEO OR readability OR sentiment). SPECTR does everything.
**Monetization:** Freemium (5 scans/month free) → Pro ($19/month unlimited).

### 4.4 NEW APP: VAULTCHAIN (Decentralized Proof of Creation)

**Niche:** Creators, inventors, writers, designers
**Core:** Hash any digital asset (document, image, code, design, music) to a public blockchain timestamp. Generates a "Proof of Creation Certificate" with cryptographic verification. Integrates directly into V4ULT and 4TRESS Evidence Locker.
**Moat:** Prior art weaponization — proves you created something on a specific date, legally defensible.
**Monetization:** First 3 certificates free → $2/certificate → Enterprise unlimited at Empire tier.

### 4.5 NEW APP: RADAR (Market Signal Aggregator)

**Niche:** Founders, investors, analysts
**Core:** Configurable dashboard that aggregates signals from SEC filings, patent databases, Product Hunt launches, App Store rankings, social sentiment, and news feeds. Users set "Watch Zones" (industries, competitors, keywords) and get real-time alerts.
**Moat:** The intelligence layer that 4IELD uses internally, exposed as a standalone product.
**Monetization:** $29/month standalone. Free for Empire tier users.

### 4.6 NEW APP: FORGE (Rapid Prototype Builder)

**Niche:** Non-technical founders, product managers
**Core:** Describe your app idea in natural language → FORGE generates a clickable prototype (Figma-compatible) with: navigation flows, component library, responsive layouts, and placeholder content. Export to Figma, Framer, or HTML.
**Moat:** Goes beyond wireframing — produces functional, clickable prototypes from a single paragraph.
**Monetization:** 3 prototypes free → $39/month unlimited.

### 4.7 NEW APP: GHOSTWRITER (AI-Powered Legal Document Templates)

**Niche:** Small businesses, freelancers, solopreneurs
**Core:** Plain-language contract generator. "I'm hiring a freelance designer for a 3-month project" → generates NDA, SOW, MSA templates with all variables filled. Templates only — always includes "Not Legal Advice" disclaimers.
**Moat:** Combines 3XEC's formation intelligence with 4TRESS's readiness framework. Templates are brand-aware (auto-inserts company info from 3XEC).
**Monetization:** Included in Squad tier. Standalone: $15/month.

### 4.8 NEW APP: DECODE (AI Meeting Intelligence)

**Niche:** Remote teams, consultants, agencies
**Core:** Real-time meeting transcription + AI analysis. Generates: action items, decision log, sentiment analysis per speaker, "tension score" (detects unresolved conflicts), follow-up draft emails. Integrates with 6ROXY's Ghost Protocol for automated meeting attendance.
**Moat:** Goes beyond transcription — actively analyzes meeting dynamics and relationship health.
**Monetization:** Included in Empire tier. Standalone: $25/month.

### 4.9 NEW FEATURE: THE SANDBOX (Cross-Engine Simulation)

**Location:** Accessible from any engine
**Core:** Before making any irreversible decision (locking a name, purchasing a domain, filing paperwork), users can enter "Sandbox Mode." The system simulates the downstream effects across all engines:
- "If you choose Name X, here's how it scores in brandL, 4IELD, and 4TRESS"
- "If you buy this domain, here's the 5ITE preview, the SEO projection, and the handle availability"
- "If you file in Class 9, here's the crowding analysis and renewal cost projection"

**Moat:** No competitor offers cross-engine simulation. Most tools are siloed.

### 4.10 NEW FEATURE: NERVE CENTER (Unified Notification Hub)

**Location:** Top-level navigation (replaces fragmented notification patterns)
**Core:** Single feed for ALL platform activity:
- Engine run completions and gate status changes
- Pulse cadence messages (morning brief, sunset report)
- 6ROXY meeting summaries and A2A negotiation results
- 4IELD drift alerts and 4TRESS renewal reminders
- Workspace member activity and collaboration updates

**Priority Tiers:**
- 🔴 Critical: Gate blocked, health degraded, security event
- 🟡 Action: Engine complete, decision needed, deadline approaching
- 🟢 Info: Run progress, teammate activity, pulse delivery
- ⚫ Archive: Historical events (auto-archived after 7 days)

### 4.11 NEW FEATURE: GENESIS MODE (One-Click Business Launch)

**Location:** Dashboard main CTA
**Core:** For users who want the full WiVViW experience compressed into a single guided session. GENESIS walks through all 7 phases sequentially with AI pre-filling as much as possible:
1. Answer 20 intake questions (5 minutes)
2. AI generates name candidates, scores them, presents top 3
3. AI checks domains and handles for all 3
4. AI runs competitive intelligence scan
5. AI generates trademark readiness assessment
6. AI builds business plan, mission/vision, formation templates
7. AI scaffolds website with brand identity injected
8. 6ROXY Twin calibration

**Time Target:** 45 minutes from zero to a fully scaffolded business with website, brand identity, legal templates, and competitive intelligence — all backed by V4ULT receipts.

---

## 5. CODING IMPROVEMENTS & PRODUCTION HARDENING

### 5.1 Prisma Schema (Replaces Raw SQL Fragments)

The spec lists 30+ database models as a flat list. Replace with a typed Prisma schema:

```prisma
// schema.prisma — Source of truth for all data models

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── CORE ENTITIES ──────────────────────────────────

model User {
  id              String            @id @default(uuid())
  email           String            @unique
  displayName     String
  avatarUrl       String?
  twinTier        TwinTier          @default(TEXT_ONLY)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  workspaces      WorkspaceMember[]
  projects        Project[]
  engineRuns      EngineRun[]
  twinSettings    TwinSettings?
  auditLogs       AuditLog[]
  usageMeters     UsageMeter[]
  ndaAcceptances  NDAAcceptance[]
}

enum TwinTier {
  TEXT_ONLY    // Tier 0: No video/voice
  VOICE        // Tier 1: Voice only
  FULL         // Tier 2: Full video + voice
}

model Workspace {
  id          String            @id @default(uuid())
  name        String
  slug        String            @unique
  plan        PricingTier       @default(TWIN)
  members     WorkspaceMember[]
  projects    Project[]
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

enum PricingTier {
  TWIN
  SQUAD
  EMPIRE
}

model Project {
  id            String          @id @default(uuid())
  name          String
  status        ProjectStatus   @default(INTAKE)
  currentPhase  WorkflowPhase   @default(ONBOARDING)
  workspace     Workspace       @relation(fields: [workspaceId], references: [id])
  workspaceId   String
  owner         User            @relation(fields: [ownerId], references: [id])
  ownerId       String
  brandBrief    BrandBrief?
  engineRuns    EngineRun[]
  nameSets      NameSet[]
  shortlist     ShortlistItem[]
  artifacts     ExportArtifact[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

enum ProjectStatus {
  INTAKE
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

enum WorkflowPhase {
  ONBOARDING
  IDENTITY_FORGE    // dRANb
  TERRITORY_CLAIM   // brandL
  INTELLIGENCE_SCAN // 4IELD
  PROTECTION_LAYER  // 4TRESS
  OPERATIONS_BUILD  // 3XEC
  DIGITAL_PRODUCT   // 5ITE
  ACTIVATION        // 6ROXY + V4ULT
  ONGOING
}

// ─── ENGINE SYSTEM ──────────────────────────────────

model EngineRun {
  id            String        @id @default(uuid())
  engine        EngineId
  status        RunStatus     @default(PENDING)
  project       Project       @relation(fields: [projectId], references: [id])
  projectId     String
  user          User          @relation(fields: [userId], references: [id])
  userId        String
  settings      Json          // Engine-specific config
  promptPack    Json?         // Sanitized prompts used
  assumptions   Json?         // Assumed vs verified flags
  result        Json?         // Engine-specific output
  stabilityIndex Float?       // 0-100 health score
  duration      Int?          // Milliseconds
  artifacts     ExportArtifact[]
  scores        NameScore[]
  createdAt     DateTime      @default(now())
  completedAt   DateTime?
}

enum EngineId {
  DRANB
  BRANDL
  EXEC
  FIELD
  FORTRESS
  SITE
  PROXY
  VAULT
  INSIGHT     // 8IGHT
  GRAPH       // 9RAPH
}

enum RunStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

// ─── dRANb MODELS ──────────────────────────────────

model NameSet {
  id          String          @id @default(uuid())
  type        NameSetType
  project     Project         @relation(fields: [projectId], references: [id])
  projectId   String
  candidates  NameCandidate[]
  createdAt   DateTime        @default(now())
}

enum NameSetType {
  SEMANTIC
  PHONETIC
  ABSTRACT_COINED
  MODIFIED_REAL
  SYMBOLIC
  OWNABLE_NEARMISS
}

model NameCandidate {
  id            String        @id @default(uuid())
  name          String
  nameSet       NameSet       @relation(fields: [nameSetId], references: [id])
  nameSetId     String
  scores        NameScore[]
  shortlistItem ShortlistItem?
  createdAt     DateTime      @default(now())
}

model NameScore {
  id                    String        @id @default(uuid())
  candidate             NameCandidate @relation(fields: [candidateId], references: [id])
  candidateId           String
  engineRun             EngineRun     @relation(fields: [engineRunId], references: [id])
  engineRunId           String
  memorability          Float         // 0-100
  pronunciationClarity  Float         // 0-100
  spellingEase          Float         // 0-100 (inverse)
  distinctiveness       Float         // 0-100
  brandAlignment        Float         // 0-100
  scalability           Float         // 0-100
  collisionRiskProxy    Float         // 0-100 (inverse)
  trendFit              Float?        // 0-100 (v1.1+)
  overallScore          Float         // Weighted mean
  confidence            Float         // 0-1
  confidenceLabel       ConfidenceLabel
  scoreAdjustments      Json?         // Penalty array
  createdAt             DateTime      @default(now())
}

enum ConfidenceLabel {
  HIGH
  MEDIUM
  LOW
}
```

### 5.2 Zod Validation Schemas (Type-Safe Input Contracts)

Every engine input must be validated. Currently no validation layer exists:

```typescript
// lib/schemas/intake.schema.ts
import { z } from "zod";

export const BrandBriefSchema = z.object({
  businessDefinition: z.string().min(10).max(500),
  persona: z.string().min(5).max(200),
  origin: z.string().max(500).optional(),
  industry: z.string().min(2).max(100),
  competitors: z.array(z.string().max(100)).min(0).max(5000),
  targetAudience: z.string().min(10).max(500),
  whatUsersHate: z.string().max(500).optional(),
  whatUsersLove: z.string().max(500).optional(),
  unfairWedge: z.string().max(500).optional(),
  regions: z.array(z.string()).min(1),
  dataRetention: z.enum(["minimal", "standard", "extended"]),
  brandVoice: z.string().max(500).optional(),
  visualPreferences: z.string().max(500).optional(),
});

export const EngineRunConfigSchema = z.object({
  engine: z.nativeEnum(EngineId),
  projectId: z.string().uuid(),
  settings: z.record(z.unknown()),
  dryRun: z.boolean().default(false),
});

export const dRANbGenerateSchema = z.object({
  projectId: z.string().uuid(),
  modes: z.array(z.nativeEnum(NameSetType)).min(1),
  constraints: z.object({
    maxLength: z.number().int().min(2).max(30).default(12),
    minLength: z.number().int().min(2).max(10).default(3),
    mustInclude: z.array(z.string()).optional(),
    mustExclude: z.array(z.string()).optional(),
    allowSuffixes: z.array(z.string()).optional(), // Override anti-generic filter
    languageTargets: z.array(z.string()).default(["en"]),
  }),
  antiGenericFilters: z.boolean().default(true),
  candidateCount: z.number().int().min(5).max(100).default(25),
});
```

### 5.3 Component Architecture Standards

The spec says "Components < 200 lines" but provides no component taxonomy. Define:

```
components/
├── ui/                    # Atomic design tokens (shadcn/ui extended)
│   ├── ScoreRing.tsx      # Conic gradient score display
│   ├── ConfidenceBadge.tsx # High/Medium/Low confidence label
│   ├── EngineCard.tsx     # Standard engine output card
│   ├── GateIndicator.tsx  # Pass/block status display
│   └── HealthMeter.tsx    # 8-track stability gauge
├── engines/               # Engine-specific composites
│   ├── dranb/
│   │   ├── NameWorkbench.tsx       # Three-pin compare rail
│   │   ├── ScoreConstellation.tsx  # 7-dimension radar chart
│   │   ├── ValidationLab.tsx       # Pronounce/Spell/Recall labs
│   │   └── GenerationControls.tsx  # Mode selection + constraints
│   ├── brandl/
│   │   ├── DomainLadder.tsx
│   │   ├── HandleLadder.tsx
│   │   └── ConsistencyMeter.tsx
│   └── ... (one folder per engine)
├── layout/                # Page-level layouts
│   ├── EngineShell.tsx    # Shared engine chrome (nav, breadcrumb, health)
│   ├── DashboardShell.tsx
│   └── OnboardingShell.tsx
└── shared/                # Cross-cutting concerns
    ├── ReceiptDrawer.tsx  # V4ULT receipt panel (slides in from right)
    ├── GateBanner.tsx     # Phase transition notification
    └── PulseWidget.tsx    # Morning brief / sunset report inline
```

### 5.4 API Route Standards

```typescript
// app/api/engines/dranb/generate/route.ts
// Pattern: every API route follows this structure

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { dRANbGenerateSchema } from "@/lib/schemas/dranb.schema";
import { rateLimit } from "@/lib/rate-limit";
import { emitEvent } from "@/lib/events";
import { ApiError, handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new ApiError("AUTHORIZATION", "Unauthorized", 401);

    // 2. Rate limit
    await rateLimit(user.id, "engine_runs_per_day");

    // 3. Validate input
    const body = await req.json();
    const input = dRANbGenerateSchema.parse(body);

    // 4. Verify project access (RLS handles this, but explicit check for clarity)
    const { data: project } = await supabase
      .from("projects")
      .select("id, workspace_id, current_phase")
      .eq("id", input.projectId)
      .single();
    if (!project) throw new ApiError("AUTHORIZATION", "Project not found", 404);

    // 5. Gate check
    if (project.current_phase !== "IDENTITY_FORGE") {
      throw new ApiError("VALIDATION", "dRANb requires Identity Forge phase", 400);
    }

    // 6. Execute engine logic
    const runId = crypto.randomUUID();
    await emitEvent({ type: "ENGINE_RUN_STARTED", engine: "DRANB", runId, projectId: input.projectId, timestamp: new Date().toISOString() });

    // ... engine execution logic ...

    // 7. Return structured response
    return NextResponse.json({ runId, status: "RUNNING" }, { status: 202 });

  } catch (error) {
    return handleApiError(error);
  }
}
```

### 5.5 .cursorrules File (Cursor-Specific Config)

```markdown
# WiVViW Platform — Cursor Rules

## Stack
- Next.js 14 (App Router)
- TypeScript strict (no `any` types, ever)
- Tailwind CSS with semantic HSL tokens
- shadcn/ui components
- Supabase (Postgres, Auth, Storage, Realtime)
- Framer Motion for animations
- Recharts for data visualization

## Code Standards
- Components must be < 200 lines. Split if larger.
- All forms validated with Zod schemas.
- All API routes follow the 7-step pattern (auth → rate limit → validate → access check → gate check → execute → respond).
- Error boundaries on every page route.
- Mobile responsive: 375 / 768 / 1280 breakpoints.
- RLS enabled on all Supabase tables.
- No proprietary prompts exposed to client-side code.
- All AI calls go through edge functions, never direct from client.

## Design System
- Dark mode primary. Background: hsl(222, 47%, 6%).
- Primary action color: hsl(42, 87%, 55%) (golden amber).
- Typography: JetBrains Mono (headers/code), Inter (body).
- Animations: Framer Motion only. Fade + translateY for page transitions. Staggered 0.05s for card entrances.
- Loading: Skeleton + pulse. Never spinners.
- Glass morphism for elevated surfaces (backdrop-blur, subtle borders).
- Score rings use conic gradients.

## Naming Conventions
- Files: kebab-case (score-ring.tsx)
- Components: PascalCase (ScoreRing)
- Functions: camelCase (calculateOverallScore)
- Constants: SCREAMING_SNAKE (ENGINE_COLORS)
- Database: snake_case (engine_run, name_score)
- Events: SCREAMING_SNAKE (ENGINE_RUN_COMPLETED)

## Engine Colors (use everywhere consistently)
- dRANb: hsl(42, 87%, 55%) — Gold
- brandL: hsl(270, 60%, 55%) — Purple
- 3XEC: hsl(220, 70%, 50%) — Steel Blue
- 4IELD: hsl(175, 60%, 45%) — Teal
- 4TRESS: hsl(350, 80%, 55%) — Red
- 5ITE: hsl(270, 80%, 60%) — Violet
- 6ROXY: hsl(30, 90%, 55%) — Orange
- V4ULT: hsl(220, 70%, 55%) — Blue
- 8IGHT: hsl(45, 85%, 55%) — Warm Gold
- 9RAPH: hsl(160, 55%, 45%) — Emerald

## Safety Rules
- Never generate cease-and-desist letters.
- Never provide legal advice or guarantee outcomes.
- Always include confidence levels with scores.
- All AI-generated content must be tagged with provenance metadata.
- Kill Switch (DELETE MY TWIN) must work within 24 hours.
```

---

## 6. GAP ANALYSIS & FILLS

### 6.1 Missing: Onboarding UX Flow

The spec describes intake fields but no actual UX flow. Define:

**Step 1: Welcome** (30 seconds)
- "Welcome to WiVViW. Let's build something legendary."
- Choose: "Start Fresh" or "I Have a Business Already"

**Step 2: Quick Profile** (60 seconds)
- Name, email, timezone
- Industry (dropdown with "Other" option)
- Business stage: Idea / Side Project / Launched / Scaling

**Step 3: Brand Brief** (3-5 minutes)
- Guided conversational intake (AI asks questions, user responds naturally)
- AI extracts: business definition, persona, competitors, audience, differentiator
- User confirms extracted data

**Step 4: Twin Setup** (1-3 minutes)
- Upload profile photo (minimum)
- Optional: Voice sample, video capture
- Twin tier auto-assigned based on what they provide

**Step 5: Workspace Config** (30 seconds)
- Workspace name
- Invite team members (optional)
- Choose plan (or stay free)

**Step 6: First Engine** (automatic)
- System auto-routes to dRANb if new business
- Auto-routes to brandL if business name already exists
- Dashboard opens with Pulse widget active

### 6.2 Missing: Accessibility Spec

The spec mentions "WCAG AA baseline" in one line but provides no implementation detail:

```
Accessibility Requirements:
├── Color contrast: 4.5:1 minimum for body text, 3:1 for large text
├── Focus states: 2px solid hsl(42, 87%, 55%) on all interactive elements
├── Keyboard navigation: Full tab order on all engine interfaces
├── Screen reader: ARIA labels on all score rings, charts, and dynamic content
├── Reduced motion: @media (prefers-reduced-motion: reduce) disables all Framer Motion
├── Text scaling: UI must not break at 200% zoom
├── Alternative text: All avatar images, generated logos, and chart outputs
└── Skip links: "Skip to main content" on every page
```

### 6.3 Missing: Internationalization (i18n)

The spec mentions "50+ languages/dialects" for cultural safety checks but no i18n strategy for the platform itself:

**Phase 1 (MVP):** English only. All strings in `messages/en.json`.
**Phase 2:** Spanish, Portuguese, French, Arabic (RTL support required).
**Phase 3:** Mandarin, Japanese, Korean, Hindi.

Use `next-intl` for routing and string management. All date/time formatting through `Intl.DateTimeFormat`.

### 6.4 Missing: Backup & Disaster Recovery

No backup strategy exists:

```
Database:     Supabase automated daily backups + PITR (point-in-time recovery)
Storage:      Supabase Storage with S3-compatible backup to separate region
V4ULT data:   Append-only with immutable locks — additionally replicated to cold storage (Glacier)
User media:   Encrypted at rest (AES-256), replicated across 2 regions
RTO target:   < 4 hours
RPO target:   < 1 hour
```

### 6.5 Missing: API Versioning

No API versioning strategy:

```
Pattern:    URL-based versioning (/api/v1/engines/dranb/generate)
Current:    v1 (MVP)
Deprecation: Minimum 6-month notice before version sunset
Headers:    X-WiVViW-API-Version: 2026-03-01 (date-based for minor versions)
```

### 6.6 Gap: Scoring Formula Documentation

The dRANb formula `S_final = (w1·M) + (w2·P) + (w3·D) − (w4·F)` is referenced but weights are never defined. Lock them:

```typescript
// lib/engines/dranb/weights.ts
export const DRANB_WEIGHTS = {
  memorability: 0.20,
  pronunciationClarity: 0.15,
  spellingEase: 0.10,
  distinctiveness: 0.20,
  brandAlignment: 0.15,
  scalability: 0.10,
  collisionRiskProxy: -0.10, // Negative weight (penalty)
} as const;

// Confidence formula (documented)
export function calculateConfidence(
  inputCompleteness: number,  // 0-1: How much of the intake form was filled
  dataCoverage: number,       // 0-1: How many data sources were available
  signalAgreement: number     // 0-1: How much the scoring dimensions agree
): number {
  return Math.max(0, Math.min(1,
    0.2 + (0.4 * inputCompleteness) + (0.3 * dataCoverage) + (0.1 * signalAgreement)
  ));
}
```

---

## 7. ENHANCED TECHNICAL SCHEMAS

### 7.1 OpenAPI Route Summary

```yaml
# Partial — key routes only
paths:
  /api/v1/projects:
    post: Create project
    get: List user projects
  
  /api/v1/projects/{id}:
    get: Get project detail
    patch: Update project
  
  /api/v1/engines/dranb/generate:
    post: Generate name candidates
  
  /api/v1/engines/dranb/score:
    post: Score a name candidate
  
  /api/v1/engines/dranb/shortlist:
    post: Add to shortlist
    get: Get current shortlist
  
  /api/v1/engines/brandl/scan:
    post: Run domain/handle scan
  
  /api/v1/engines/field/cluster:
    post: Run competitor clustering
  
  /api/v1/engines/fortress/readiness:
    post: Run trademark readiness assessment
  
  /api/v1/engines/exec/business-plan:
    post: Generate living business plan
  
  /api/v1/engines/site/scaffold:
    post: Generate website scaffold
  
  /api/v1/engines/proxy/twin:
    post: Initialize/update digital twin
    get: Get twin status
  
  /api/v1/vault/timeline:
    get: Get universal timeline
  
  /api/v1/vault/artifacts:
    get: List artifacts
    post: Lock artifact version
  
  /api/v1/insight/bhs:
    get: Get Brand Health Score
  
  /api/v1/pulse/schedule:
    get: Get pulse schedule
    patch: Update pulse cadence
  
  /api/v1/governance/kill-switch:
    post: Trigger data deletion (DELETE MY TWIN)
```

### 7.2 Environment Variables Template

```env
# .env.local — Never commit this file

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Services
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
COHERE_API_KEY=

# Avatar Services
ELEVENLABS_API_KEY=
HEYGEN_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Infrastructure
REDIS_URL=
RESEND_API_KEY=
POSTHOG_API_KEY=

# Feature Flags
ENABLE_A2A_PROTOCOL=false
ENABLE_GHOST_PROTOCOL=false
ENABLE_GENESIS_MODE=false
ENABLE_SANDBOX=false
```

---

## END OF ENHANCEMENT REPORT — PART 1

**Part 2 (Oracle Lexicon with Definitions & Symbols) will be delivered as a separate structured JSON file.**
