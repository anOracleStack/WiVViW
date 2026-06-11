═══════════════════════════════════════════════════════════════════
                         W i V V i W
                  F O R E N S I C   C R O S S - A N A L Y S I S

              Deliverables vs. Knowledge Base Audit Report
                            v1.0

              Analyst.............. Claude (Eunoia)
              Date................ 2026-03-11
              Scope............... .cursorrules, PROJECT-CONTEXT.md,
                                  SCHEMA.sql, PROVIDERS.ts,
                                  PROMPTS-SEED.sql

═══════════════════════════════════════════════════════════════════


                          · · · · ·


───────────────────────────────────────────────────────────────────
              PART I — CONTRADICTIONS
───────────────────────────────────────────────────────────────────


                          · · · · ·


  1.  SCORING DIMENSIONS: 7 vs 8

      DELIVERABLE:  PROJECT-CONTEXT.md & PROMPTS-SEED.sql define
                    8 scoring categories for dRANb:
                    uniqueness, memorability, commercial_viability,
                    phonetic_strength, visual_potential,
                    domain_plausibility, cultural_safety,
                    strategic_alignment

      KNOWLEDGE BASE:  Operational Bible v4.0, Enhancement Report
                       v5.0, Data Collective Parts 2/7, Master
                       Final, & all Batching docs consistently
                       define 7 scoring metrics:
                       memorability, pronunciation_clarity,
                       spelling_friction, distinctiveness,
                       brand_alignment, scalability,
                       collision_risk_proxy

      SEVERITY:  CRITICAL — The deliverables invented 3 new
                 categories (visual_potential, domain_plausibility,
                 commercial_viability) & dropped 4 canonical ones
                 (pronunciation_clarity, spelling_friction,
                 distinctiveness, collision_risk_proxy). These are
                 not the same system. The Enhancement Report v5.0
                 even provides locked weights for the 7-metric
                 model with explicit formulas.


                          · · · · ·


  2.  PASS THRESHOLD: 72 vs 70

      DELIVERABLE:  PROJECT-CONTEXT.md states pass threshold = 72.
                    PROMPTS-SEED.sql seeds pass_threshold = 72.00.
                    But SCHEMA.sql sets moirai_packages default
                    pass_threshold = 70.00.

      KNOWLEDGE BASE:  No canonical threshold is locked in the
                       knowledge base. Both numbers appear
                       without resolution.

      SEVERITY:  MEDIUM — Internal inconsistency within the
                 deliverables themselves. Pick one & lock it.


                          · · · · ·


  3.  DESIGN SYSTEM: bg-black vs CYBERPUNK CORPORATE

      DELIVERABLE:  .cursorrules specifies:
                    "bg-black, text-white, border-zinc-800,
                    text-zinc-400 for secondary text"
                    & explicitly bans shadcn/ui:
                    "No external UI component libraries
                    (no shadcn, no MUI)"

      KNOWLEDGE BASE:  Every design system reference defines
                       the Cyberpunk Corporate palette:
                       Background = 222° 47% 6% (#0A0D14)
                       Surface = 222° 40% 10% (#12161F)
                       Primary = 42° 87% 55% (#E8B923)
                       Accent = 175° 60% 45% (#2DB8A8)
                       "Never hardcode colors" is a rule.
                       bg-black (#000000) is NOT the canonical
                       background. #0A0D14 (deep slate void) is.

                       Enhancement Report v5.0 explicitly
                       specifies shadcn/ui as part of the
                       component architecture. The system prompt
                       for this build also mandates shadcn/ui.

      SEVERITY:  HIGH — The deliverables strip the entire
                 design token system & ban a component library
                 the knowledge base requires.


                          · · · · ·


  4.  TECH STACK: Python/FastAPI vs Next.js

      DELIVERABLE:  Next.js 15+ (App Router) with TypeScript.

      KNOWLEDGE BASE:  Operational Bible v4.0 Part XII specifies:
                       "Runtime: Python (FastAPI)"
                       "Database: Supabase (Postgres)"

      SEVERITY:  LOW — This appears to be a deliberate migration
                 decision (Bible was written before the Cursor
                 pivot). The Enhancement Report v5.0 & Data
                 Collective entries reference Next.js/React.
                 However, the Bible has never been formally
                 updated to reflect this change.


                          · · · · ·


  5.  ENGINE NAMING: brandL vs drandL

      DELIVERABLE:  PROJECT-CONTEXT.md Section 4 references
                    "drandL" as the digital presence engine.

      KNOWLEDGE BASE:  Every single knowledge base document uses
                       "brandL" (capital L, no leading d).

      SEVERITY:  MEDIUM — A naming error that will propagate
                 into file paths, routes, & database values.


                          · · · · ·


  6.  LLM ARCHITECTURE: Single vs Multi-LLM

      DELIVERABLE:  METHOD MOIRAI uses 4 providers (OpenAI,
                    Gemini, Anthropic, DeepSeek) with Clotho/
                    Lachesis/Eunoia stage routing.

      KNOWLEDGE BASE:  Operational Bible v4.0 Part XII AI/ML
                       section specifies only:
                       "LLM: Claude (Anthropic)"
                       METHOD MOIRAI as a multi-LLM pipeline
                       is documented only in the Concierge
                       Cascade / prompt engineering context,
                       not as a production runtime architecture.

      SEVERITY:  LOW — The multi-LLM approach is an evolution.
                 But the Bible needs formal amendment to reflect
                 the shift from single-LLM to orchestrated
                 pipeline.


                          · · · · ·


  7.  SCORE COLOR THRESHOLDS

      DELIVERABLE:  .cursorrules defines:
                    emerald-500 for 80+
                    amber-500 for 60-79
                    red-500 for <60

      KNOWLEDGE BASE:  Addendum II (overriding v1.1) specifies:
                       Hard stop at 85% ("Risk")
                       Warn at 75% ("Confused")
                       These are Health Gauge thresholds but
                       no equivalent color mapping exists in
                       the deliverables.

      SEVERITY:  LOW — Different systems, but the deliverables
                 should document the distinction.


                          · · · · ·


  8.  FRAMER MOTION: Present vs Absent

      DELIVERABLE:  Not mentioned anywhere in .cursorrules,
                    PROJECT-CONTEXT.md, or package dependencies.

      KNOWLEDGE BASE:  Every design system entry mandates:
                       "Framer Motion for ALL animations"
                       "No CSS-only animations"
                       Listed as part of the locked tech stack.

      SEVERITY:  HIGH — Core animation library omitted entirely.


                          · · · · ·


───────────────────────────────────────────────────────────────────
              PART II — MISSING FROM DELIVERABLES
───────────────────────────────────────────────────────────────────


                          · · · · ·


  ENGINES & SYSTEMS

  1.   V4ULT engine — Append-only decision audit trail, lock/
       branch/diff, artifact bundles, share controls. Present
       in Bible, Enhancement Report, Master Final, all Batching
       docs. Completely absent from deliverables. No table, no
       route, no engine logic file.

  2.   Evidence Vault — User upload system that converts
       estimates into verified claims. Distinct from
       receipts_ledger. Referenced across knowledge base as
       a verification mode. Absent from deliverables.

  3.   Projects table — The Enhancement Report v5.0 uses a
       project-centric model (Project -> EngineRun -> Artifacts).
       The deliverables use odyssey_sessions with no project
       entity. This breaks the multi-engine workflow where
       engines share a project context.

  4.   Brand Genome / Brand Personality Vectors — 7-axis system
       (Classic-Modern, Minimal-Expressive, Serious-Playful,
       Technical-Human, Luxury-Accessible, Bold-Calm,
       Abstract-Literal). Used in brand_alignment scoring.
       Not in deliverables.

  5.   Shortlist categories — strong_safe, strong_bold,
       creative_risk. Core UX grouping for dRANb results.
       Not in deliverables.


                          · · · · ·


  dRANb FEATURES

  6.   Name generation modes/families — 6 types: semantic,
       phonetic, abstract_coined, modified_real, symbolic,
       ownable_nearmiss. The PROMPTS-SEED.sql just asks for
       "10 candidates" without specifying family distribution.

  7.   The Cynic Agent — Adversarial red team component that
       stress-tests names. Core feature per Bible Part II.

  8.   The Void Analysis — Whitespace detection in naming
       landscape. Core feature per Bible Part II.

  9.   Cultural Safety — 50+ language scan for meaning
       collision. Core feature per Bible Part II.

  10.  Microtrend Detector — Rejects names riding fading
       trends. Core feature per Bible Part II.

  11.  Validation Labs — Pronounce Lab (TTS + votes), Spell
       Lab (dictation mismatch), Recall Lab (timed exposure).
       These are MVP+ moat features per Enhancement Report.

  12.  The Mirror — Digital Twin visualization during market
       scan. Core UX feature per Bible Part II.

  13.  Audio Intake — Voice-to-Brand Personality analysis.
       Uses prosody analysis to set brand personality vectors.

  14.  Anti-generic filters — System + user blocklists.
       Reject "two keyword SEO" patterns (BestX, MyX, XHub).
       Penalize suffixes app/pro/hub/ai/ly. Documented in
       Data Collective Part 2.

  15.  Penalty system — Score adjustments array. Ambiguous
       spelling: -10 to -35. Competitor resemblance: -15
       to -50. Generic keyword: -10 to -40. Documented in
       Enhancement Report & Batching docs.


                          · · · · ·


  INFRASTRUCTURE

  16.  Rate limiting strategy — Enhancement Report v5.0
       defines per-tier limits (engine_runs_per_day,
       ai_calls_per_hour, export_per_day). No rate limiting
       exists in deliverables.

  17.  Caching layer — Enhancement Report v5.0 specifies
       Edge (Cloudflare) -> Redis -> Postgres cascade with
       event-driven invalidation. Absent.

  18.  Error boundary architecture — Enhancement Report
       flags this as a critical gap. Still missing.

  19.  API versioning — Enhancement Report specifies URL-based
       versioning (/api/v1/...). Absent from deliverables.

  20.  Backup & disaster recovery — Enhancement Report
       specifies Supabase PITR, S3 backup, V4ULT cold
       storage replication. Absent.

  21.  Internationalization — Enhancement Report specifies
       Phase 1 English, Phase 2 Spanish/Portuguese/French/
       Arabic, Phase 3 Mandarin/Japanese/Korean/Hindi with
       next-intl. Absent.

  22.  Event-driven architecture — Enhancement Report v5.0
       defines WiVViWEvent types (ENGINE_RUN_STARTED,
       SCORE_COMPUTED, GATE_PASSED, etc.) as a formal
       event bus. Deliverables have event_log table but
       no typed event contracts.


                          · · · · ·


  PLATFORM FEATURES

  23.  Pricing tiers — Scout (Free) / Squad ($49/mo) /
       Empire ($199/mo). No subscription gating exists.

  24.  The Foundry (Idea Equity) — Revenue Stream 1.
       Submit idea -> build -> revenue share. Not referenced.

  25.  6 revenue streams — Foundry, White-Label, Oracle Data
       Reports, Vertical Editions, Merch Store, Media
       Ecosystem. None present.

  26.  Merch Store integration — Printful, Vistaprint,
       Sticker Mule APIs. Not present.

  27.  Saturday Night Lounge — Community feature. Not present.

  28.  Export system — TXT/PDF/JSON artifact bundles per
       engine run. No export logic exists.

  29.  The "Superman UX" — Cinematic experience where
       filing an LLC shows your Digital Twin walking into
       a government office. This philosophy is absent.

  30.  Agent-to-Agent (A2A) protocol — 6ROXY communicates
       with other agents (AWS, Delta, Stripe). Not present.

  31.  Glass Box Scoring — "Every score has an explanation
       & confidence." The prompts ask for scores but don't
       enforce the 3 "because" bullets + 1 "watch out"
       note pattern documented in the knowledge base.

  32.  Confidence labels on all predictions — HIGH/MEDIUM/LOW
       enum exists in Enhancement Report Prisma schema but
       not in the SQL deliverables.

  33.  Decision moments — Shortlist/Finalist/Commit. Each
       creates a V4ULT receipt. Not in deliverables.

  34.  Workspace/team model — Knowledge base references
       multi-user workspaces with reviewer voting &
       governance. Not present.

  35.  Scoring formula weights — Enhancement Report v5.0
       locks explicit weights (memorability: 0.20,
       pronunciationClarity: 0.15, spellingEase: 0.10,
       distinctiveness: 0.20, brandAlignment: 0.15,
       scalability: 0.10, collisionRiskProxy: -0.10).
       Deliverables use a flat percentage weight system
       that doesn't match.


                          · · · · ·


───────────────────────────────────────────────────────────────────
              PART III — TECHNICAL ERRORS
───────────────────────────────────────────────────────────────────


                          · · · · ·


  1.   gemini-2.0-flash-lite MISSING FROM SEED

       PROVIDERS.ts defines MODELS.gemini.lite =
       "gemini-2.0-flash-lite" with pricing in COST_PER_1M.
       But the model_registry INSERT in SCHEMA.sql does NOT
       include this model. Only gemini-2.5-pro & gemini-2.5-
       flash are seeded.

       FIX: Add INSERT for gemini-2.0-flash-lite to
       model_registry seed.


                          · · · · ·


  2.   prompt_registry HAS NO RLS POLICIES

       SCHEMA.sql enables RLS on prompt_registry but defines
       zero policies. This means NO user can read prompts
       through the browser or server clients. Only admin
       (service role) can access them.

       FIX: Add a SELECT policy. Prompts are not user-
       specific, so: CREATE POLICY "Authenticated users
       can read prompts" ON prompt_registry FOR SELECT
       USING (auth.role() = 'authenticated');


                          · · · · ·


  3.   scoring_templates HAS NO RLS POLICIES

       Same issue. RLS is enabled implicitly (it's a
       Supabase default for new tables in some configs)
       but no explicit ENABLE + POLICY exists in the SQL.

       FIX: Add ENABLE ROW LEVEL SECURITY + a read policy.


                          · · · · ·


  4.   model_registry HAS NO RLS POLICIES

       Same issue. Seeded with data but no access policies.

       FIX: Add read policy for authenticated users.


                          · · · · ·


  5.   SCHEMA MISMATCH: 12 vs 11 TABLES

       PROJECT-CONTEXT.md Section 6 claims "12 tables" but
       lists only 11 (wivviw_users, odyssey_sessions,
       receipts_ledger, moirai_packages, prompt_registry,
       scoring_templates, scoring_results, provider_health,
       event_log, audit_log, model_registry). The count is
       wrong, or a table was dropped without updating the
       count.

       FIX: Update the count to 11 or identify the
       missing 12th table.


                          · · · · ·


  6.   PROVIDERS.ts: Anthropic cache_read_input_tokens TYPE

       Line: (res.usage as Record<string, number>)
       ?.cache_read_input_tokens

       The Anthropic SDK types already include
       cache_read_input_tokens on the usage object.
       Casting to Record<string, number> is unsafe &
       defeats TypeScript strict mode.

       FIX: Use the proper SDK type or extend the
       interface.


                          · · · · ·


  7.   PROVIDERS.ts: OpenAI cached_tokens ACCESS

       Line: (res.usage as Record<string, number>)
       ?.prompt_tokens_details?.cached_tokens

       This nested access on a Record<string, number>
       will not work. prompt_tokens_details is an object,
       not a number. The cast breaks the chain.

       FIX: Type the usage response properly or use
       optional chaining without the cast.


                          · · · · ·


  8.   advance_mode ENUM DEFINED BUT NEVER USED

       SCHEMA.sql creates advance_mode enum (full_auto,
       single_approval, manual_precision) but no table
       column references it.

       FIX: Either add a column to odyssey_sessions
       (advance_mode advance_mode DEFAULT 'single_approval')
       or remove the orphan enum.


                          · · · · ·


  9.   NO Inngest DEPENDENCY IN PACKAGE DOCS

       PROJECT-CONTEXT.md lists Inngest as core async
       orchestration but the MANUAL.md Step 0.6 install
       command does include it. However, the .cursorrules
       file references Inngest without ensuring the reader
       knows it's required. Minor but worth noting.

       FIX: N/A — MANUAL covers it.


                          · · · · ·


───────────────────────────────────────────────────────────────────
              PART IV — NAMING INCONSISTENCIES
───────────────────────────────────────────────────────────────────


                          · · · · ·


  DELIVERABLE TERM              KNOWLEDGE BASE TERM
  ─────────────────────────     ─────────────────────────
  drandL                        brandL
  "8 scoring categories"        "7 scoring dimensions"
  uniqueness                    distinctiveness
  commercial_viability          (no equivalent — new)
  phonetic_strength             pronunciation_clarity
  visual_potential              (no equivalent — new)
  domain_plausibility           (part of collision_risk_proxy)
  cultural_safety               (part of cultural scan feature,
                                 not a scoring dimension)
  strategic_alignment           brand_alignment
  "odyssey_sessions"            "EngineRun" (Enhancement Report)
                                / "projects" (project-centric)
  "simple" tier                 Concierge Cascade uses
                                "Consultation/Coordination/
                                Completion" naming
  bg-black                      222° 47% 6% (#0A0D14)
  border-zinc-800               222° 30% 18% (#232A38)
  text-zinc-400                 No canonical secondary text
                                color — knowledge base uses
                                semantic tokens only
  "No shadcn/ui"                shadcn/ui is specified in
                                Enhancement Report v5.0
                                component architecture


                          · · · · ·


───────────────────────────────────────────────────────────────────
              PART V — ENHANCEMENT OPPORTUNITIES
───────────────────────────────────────────────────────────────────


                          · · · · ·


  1.   RESTORE THE 7-DIMENSION SCORING MODEL

       The knowledge base's 7-metric system has explicit
       algorithms, formulas, & weights. The deliverables'
       8-category system is ungrounded. Restore the canonical
       model with the Enhancement Report v5.0 weights &
       the confidence calculation formula.


                          · · · · ·


  2.   ADD V4ULT AS A CORE TABLE

       V4ULT is not just an engine — it's the trust backbone.
       Every decision creates a receipt. Add:
       vault_entries (id, project_id, session_id, engine_key,
       action, snapshot JSONB, locked BOOLEAN, created_at).
       Make it append-only (INSERT only RLS, no UPDATE/DELETE).


                          · · · · ·


  3.   ADD PROJECTS TABLE

       The deliverables are session-only. The knowledge base
       is project-centric. A user creates a project, then
       runs engines within that project context. Add:
       projects (id, user_id, workspace_id, name,
       current_phase, brand_genome JSONB, created_at).
       Link odyssey_sessions to projects.


                          · · · · ·


  4.   INTEGRATE ORACLE LEXICON

       The project has 1,800 AI persona adjectives across
       18 clusters (Oracle_Lexicon_Definitions C01-C18.json).
       These could power 6ROXY voice calibration & brand
       personality vector generation. No deliverable
       references them.


                          · · · · ·


  5.   IMPLEMENT THE "100/10" QUALITY LOOP

       The knowledge base's Master Prompt v3 mandates
       iterative quality gates. The deliverables' MOIRAI
       pipeline is linear (3 passes). Add a quality loop:
       if Eunoia's output scores below pass_threshold,
       re-dispatch to Clotho with the audit notes. Cap at
       3 iterations to prevent infinite loops.


                          · · · · ·


  6.   ADD GLASS BOX SCORING TO PROMPTS

       Every score must have 3 "because" bullets & 1
       "watch out" note. The current PROMPTS-SEED.sql asks
       for scores but doesn't enforce this format. Update
       the output contracts in all 3 stage prompts.


                          · · · · ·


  7.   ADD CONFIDENCE LABELS

       The Enhancement Report defines ConfidenceLabel enum
       (HIGH/MEDIUM/LOW) & a confidence formula based on
       input completeness, data coverage, & signal agreement.
       Add this to scoring_results & expose it in the UI.


                          · · · · ·


  8.   IMPLEMENT NAME GENERATION FAMILIES

       Instead of "generate 10 names," structure the Clotho
       prompt to produce candidates across the 6 families:
       2 semantic, 2 phonetic, 2 abstract_coined,
       1 modified_real, 2 symbolic, 1 ownable_nearmiss.
       This ensures diversity & aligns with the knowledge
       base architecture.


                          · · · · ·


  9.   ADD THE PENALTY SYSTEM

       Score adjustments for: ambiguous spelling (-10 to -35),
       competitor resemblance (-15 to -50), generic keyword
       (-10 to -40), awkward sub-brand expansion (-10 to -25).
       Store in a penalties JSONB column on scoring_results.


                          · · · · ·


  10.  IMPLEMENT DESIGN TOKEN CSS VARIABLES

       Replace all Tailwind utility hardcodes with CSS
       custom properties matching the knowledge base:

       :root {
         --background: 222 47% 6%;
         --surface: 222 40% 10%;
         --border-subtle: 222 30% 18%;
         --border-active: 222 25% 30%;
         --primary: 42 87% 55%;
         --primary-glow: 42 90% 65%;
         --accent: 175 60% 45%;
         --success: 142 70% 45%;
         --warning: 38 92% 50%;
         --destructive: 0 72% 51%;
       }

       Map engine colors to tokens:
       --engine-dranb: var(--primary);
       --engine-brandl: 270 70% 60%;
       --engine-field: var(--accent);
       --engine-fortress: 350 80% 55%;
       --engine-vault: 220 70% 55%;


                          · · · · ·


  11.  ADD Framer Motion TO DEPENDENCIES & STANDARDS

       Install framer-motion. Define animation constants:
       Page transitions (fade + translateY, 0.5s ease-out),
       Card entrances (staggered 0.05s per item),
       Hover (scale 1.02 + elevated shadow),
       Score rings (animated fill on mount, 1s).
       Ban CSS-only animations per knowledge base rules.


                          · · · · ·


  12.  RESTORE shadcn/ui

       The Enhancement Report v5.0 explicitly defines a
       component architecture built on shadcn/ui extended
       with custom components (ScoreRing, ConfidenceBadge,
       EngineCard, GateIndicator, HealthMeter). Remove the
       ban from .cursorrules & integrate per the spec.


                          · · · · ·


───────────────────────────────────────────────────────────────────
              PART VI — CONFIRMED ALIGNMENTS
───────────────────────────────────────────────────────────────────


                          · · · · ·


  □  Supabase as database with RLS — matches knowledge base
  □  Vercel deployment target — matches Bible Part XII
  □  TypeScript strict, no any — matches quality gates
  □  Zod validation — matches quality gates
  □  Dark mode primary — matches aesthetic direction
  □  Truth Kernel concept with quorum logic — aligns with
     trust-first philosophy
  □  Event log with Realtime — aligns with Enhancement
     Report event-driven recommendation
  □  Provider health tracking — aligns with Enhancement
     Report stability monitoring
  □  Inngest for async orchestration — solves the serverless
     timeout problem identified in Enhancement Report
  □  Prompt registry in database — aligns with "never expose
     proprietary prompts to client" rule
  □  3-stage MOIRAI pipeline concept — aligns with Concierge
     Cascade / METHOD MOIRAI stage definitions
  □  Cost estimation with prompt cache awareness — novel &
     valuable addition not in knowledge base


                          · · · · ·


═══════════════════════════════════════════════════════════════════

              Signals clarified. Guardrails hardened.
                 Nothing foundational remains.

═══════════════════════════════════════════════════════════════════
