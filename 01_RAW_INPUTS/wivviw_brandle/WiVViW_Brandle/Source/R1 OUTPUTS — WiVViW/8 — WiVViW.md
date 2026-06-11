MASTER CONSOLIDATION DOCUMENT: BRANDLE OS (WIVVIW Platform)  
Date: 2026-02-03 System Version: BRANDLE OS v1.6 (Master Build) Consolidation Status: Complete Source Documents:  
1\. BRANDLE\_OS\_Lovable\_MasterBuildPrompt\_v1.6.txt (Canonical Master)  
2\. BRANDLE\_OS\_Engramaestro\_ThreadVaultV\_ImplementationPack\_v1.5.txt (dRANb Engine Spec)  
3\. BRANDLE\_OS\_Engramaestro\_ThreadVaultIV\_ImplementationPack\_v1.4.txt (Optimizations)  
4\. BRANDLE\_OS\_Engramaestro\_ThreadVaultIII\_ImplementationPack\_v1.3.txt (System Designs)  
5\. BRANDLE\_OS\_Engramaestro\_AddendumII\_ImplementationPack\_v1.2.txt (Business Logic)  
6\. BRANDLE\_OS\_Engramaestro\_ThreadVault\_ImplementationPack\_v1.1.txt (Vault Spec)

\--------------------------------------------------------------------------------

SAFETY & PROCESSING REPORT  
Status: All provided source documents were fully analyzed. Corrupted Files: None. Incomplete Code: No raw code files provided; technical specifications are text-based schema sketches and API definitions. These have been preserved verbatim.

\--------------------------------------------------------------------------------

1\. GLOBAL SYSTEM ARCHITECTURE & RULES  
Canonical Source: BRANDLE\_OS\_Lovable\_MasterBuildPrompt\_v1.6.txt  
1.1 Core Concept  
Product Goal: Give founders/teams a decision pipeline: brief → generate names → score → shortlist → digital identity plan → field intelligence map → non-legal readiness pack → export bundles. Everything is saved as a versioned run with diffs, evidence references, and shareable review links.  
1.2 UX Language Rules (Global)  
From v1.5 & v1.6  
• Tone: Calm, procedural, precise. No hype words (revolutionary / guaranteed / perfect). No emojis. No dark patterns.  
• Precision: Always say: best-effort, estimate, confidence level.  
• Explanations: Show the 'why' behind scores in plain language (3 bullets) \+ “watch out” (1 bullet).  
• Safety: Warnings as guidance, not fear or enforcement.  
• Interaction Rhythm: Batch → Evaluate → Save → Compare → Export (only after choosing a finalist).  
1.3 Executive Lock (Canon Order)  
From v1.4 & v1.6  
1\. dRANb (Naming Engine): Built first. Primary workflow.  
2\. brandL (Identity): Activates AFTER shortlist (3–7 names).  
3\. 4IELD (Field Intelligence): Maps naming environment.  
4\. 4TRESS (Protection): Non-legal readiness artifacts.  
Cross-cutting: V4ULT (Archive) \+ Evidence Vault \+ Lock/Branch versioning across ALL engines.  
1.4 Non-Negotiable Safety  
From v1.6  
• Use “best-effort / estimate / confidence” language everywhere.  
• No scraping in MVP (no live handle/domain checks). Use heuristic likelihood signals \+ confidence labels.  
• Never generate cease-and-desist letters. No threats. No guarantees. No legal conclusions.  
• Never claim trademark registration unless user explicitly confirms and attaches proof in Evidence Vault.

\--------------------------------------------------------------------------------

2\. dRANb: NAMING ENGINE (Thread Vault V)  
Canonical Source: BRANDLE\_OS\_Engramaestro\_ThreadVaultV\_ImplementationPack\_v1.5.txt Draft/Conflict Note: v1.3 contains UI flows; v1.5 contains the technical build spec. Both are included below.  
2.1 Engine Overview  
• Layer A: LLM-powered creation \+ reasoning.  
• Layer B: Deterministic heuristics for consistency (constraints, friction detection, collision risk).  
2.2 Data Model: Brand Brief  
From v1.5

```
Fields:
- Business description (1–3 paragraphs)
- Industry/category (selected + custom)
- Target audience (demographics + psychographics)
- Personality sliders (Calm↔Bold, Modern↔Classic, etc.)
- Risk tolerance (Safe / Balanced / Bold)
- Long-term vision (5–10 years; scale, regions, exits)
```

2.3 Generation Engine  
Name Sets per Project (Tagged by Mode \+ Params):  
• Semantic (meaning-driven, non-generic)  
• Phonetic (sound-first, easy to say)  
• Abstract/Coined (new words, high ownability)  
• Modified Real Words (controlled distortion, near-miss)  
• Symbolic/Metaphoric (evocative, story-first)  
• Ownable Near-Miss (pronounceable spelling variants)  
Filters (Deterministic):  
• Pre-score filters remove/flag:  
    ◦ Profanity/slurs/hate terms (multi-language lexicons)  
    ◦ Reserved terms (bank/university/medical claims) in sensitive categories  
    ◦ Extreme similarity to famous marks (heuristic pattern match only)  
    ◦ Unreadable strings (too many consonants, punctuation outliers)  
    ◦ Length outliers (default 4–14 chars unless user changes)  
    ◦ Duplicates across batch \+ project history  
2.4 Evaluation System (Scoring)  
Dimensions (0-100):  
1\. Memorability  
2\. Pronunciation clarity  
3\. Spelling friction (type-it-right likelihood)  
4\. Distinctiveness (not easily confused)  
5\. Brand alignment (matches brief \+ sliders)  
6\. Scalability (expand offerings/regions)  
7\. Collision risk (high-level proxy; non-legal)  
Implementable Scoring Logic (Heuristics) \- Verbatim from v1.5:

```
- Normalize name (lowercase, strip punctuation, collapse spaces)
- Compute features: length, syllable estimate, vowel/consonant balance
- Bigram frequency (LM-lite), edit distance to common words
- Phonetic code (Double Metaphone) similarity clusters
- Keyboard distance for typos (QWERTY adjacency)
- Risk tolerance adjusts weights (Safe penalizes friction/collision; Bold rewards distinctiveness/metaphor)
- Confidence from feature certainty (strength of heuristics)
```

2.5 Labs (MVP+ / Phase 2\)  
From v1.3  
• Pronounce Lab: TTS \+ clarity rating.  
• Spell Lab: Dictation test → spelling friction score.  
• Recall Lab: Timed recall → memorability signal.

\--------------------------------------------------------------------------------

3\. brandL: DIGITAL IDENTITY ENGINE  
Canonical Source: BRANDLE\_OS\_Engramaestro\_ThreadVaultIV\_ImplementationPack\_v1.4.txt (Upgrades) & v1.3 (Base)  
3.1 Overview  
Activates AFTER dRANb produces a shortlist. Evaluates digital viability without scraping.  
3.2 Required Upgrades (v1.4)  
• Identity Bundle: name+variants \+ handle ladder \+ domain ladder.  
• Input Mode Switch: heuristic-only vs user-verified inputs.  
• Reclaimability: friction estimate \+ policy-first steps.  
• Safe Outreach: non-threatening; no legal claims; proof-gated.  
• Export Pack: identity plan \+ templates \+ evidence checklist.  
3.3 Outputs (No Scraping Rule)  
From v1.6  
• Domain likelihood tiers: Available / Premium / Likely Taken \+ confidence.  
• Handle likelihood tiers: (clean/acceptable/compromised) for IG/X/TikTok/YouTube.  
• Fallback ladder generator: 20–60 handle candidates across lanes (clean, minimal-mod, contextual, geo, founder).  
• Acquisition framework: Platform review / Voluntary outreach / Do not pursue.  
3.4 Fallback Handle Logic  
From v1.3  
• Systematic families ranked by clarity \+ minimal compromise.  
• Reserve tier-1 options (closest match) & tier-2 options (still coherent).

\--------------------------------------------------------------------------------

4\. 4IELD: FIELD INTELLIGENCE  
Canonical Source: BRANDLE\_OS\_Engramaestro\_ThreadVaultIV\_ImplementationPack\_v1.4.txt & v1.3  
4.1 Features  
• Field Map: Clusters \+ saturation \+ semantic crowding (UMAP-style projection).  
• Whitespace Corridors: Safe corridors for expansion naming.  
• Identity Drift Index: Watchlist changes over time; retention hooks.  
• Confidence Scores: Every output includes 0.0–1.0 confidence.  
4.2 Scoring Models (Best-Effort)  
From v1.3  
• Semantic Crowding Score (0-100): Measures how tightly packed candidate is in meaning-space.  
    ◦ 0-33: Roomy  
    ◦ 34-66: Contested  
    ◦ 67-100: Crowded  
• Naming Saturation Index (0-100): Measures overuse of structural patterns (prefix/suffix, stems).  
• Trademark Density Signal (0-100): Derived only from user-provided data.

\--------------------------------------------------------------------------------

5\. 4TRESS: NON-LEGAL PROTECTION  
Canonical Source: BRANDLE\_OS\_Engramaestro\_ThreadVaultIV\_ImplementationPack\_v1.4.txt (Upgrades) & v1.2 (Safety)  
5.1 Hard Safety Rules  
From v1.2  
• Always display: “Not legal advice” banner.  
• Never draft: Cease-and-desist letters.  
• Never threaten; never guarantee outcomes.  
• Provide: Step-by-step flow, templates, risk framing, safety language.  
5.2 Required Upgrades (v1.4)  
• Readiness Tiers: Strong / Moderate / Early \+ action list.  
• Class Suggestion: Best-effort clusters \+ keywords to research.  
• Filing Path Explainer: Informational choices; decision prompts.  
• Copy/Paste Generator: Common form fields \+ submission checklist.  
• Enforcement Viability: Usability score of platform tools (not outcomes).  
5.3 Template Library (Must Ship)  
From v1.4 A. Offering Description (Plain Language) B. Goods/Services Draft Builder (Non-Legal) C. Owner/Entity Block D. Evidence Log (Internal) E. Submission Checklist F. Monitoring Reminder Text G. Platform Report Message (Non-Threatening)

\--------------------------------------------------------------------------------

6\. V4ULT & ENGRAMAESTRO INTEGRATION  
Canonical Source: BRANDLE\_OS\_Engramaestro\_ThreadVault\_ImplementationPack\_v1.1.txt & v1.4 (Evidence Vault)  
6.1 Thread Vault Spec  
• Structure: Message Index \+ Vault (Verbatim).  
• Artifacts: Immutable metadata (Type/Speaker/Status/Source/SHA256).  
• Rule: “Preserve exactly” \+ explicit truncation markers (“...”).  
6.2 Implementation Logic

```
- Import: upload/paste transcript or Engramaestro doc
- Parse: artifacts + message index
- Hash: SHA256 per artifact content (stored as receipt)
- View: filter by Speaker / Type / Status / Date
- Export: Engramaestro v1.0 (TXT/PDF) + JSON export
- Lock: immutable versions (new imports create new vault versions)
```

6.3 Prompt Vault Seeding  
From v1.1 Seed 3 canonical prompts as read-only PromptVaultArtifact entries.  
6.4 Evidence Vault (v1.4 Addition)  
• Function: Every signal cites a user-provided source/input.  
• Requirement: User-verified runs must cite at least 1 EvidenceItem.

\--------------------------------------------------------------------------------

7\. BUSINESS LOGIC (Addendum II)  
Canonical Source: BRANDLE\_OS\_Engramaestro\_AddendumII\_ImplementationPack\_v1.2.txt  
7.1 Pricing (Locked Config)  
Free — Scout  
• dRANb: 1 project/month; limited name generation; basic top-line scoring.  
• Output: Watermarked decision report; no exports.  
Pro — Founder ($39/mo or $360/yr)  
• Unlimited projects; full scoring \+ explanations.  
• Shortlisting \+ comparisons; exports: PDF/DOCX/MD/JSON.  
• brandL: Domain \+ handle likelihood signals; guided next steps.  
Premium — Company ($99/mo or $900/yr)  
• Everything in Pro.  
• brandL: Identity consistency \+ reclaimability assessment.  
• 4IELD: Landscape \+ saturation intelligence.  
• 4TRESS: Readiness \+ copy-paste filing guidance.  
• Monitoring alerts (quarterly); priority processing.  
Enterprise / Agency — Platform  
• Multi-brand workspaces; team roles; white-label reports; API access.  
7.2 Pitch Deck Generator (3XEC Module)  
Generates 12-slide deck from project inputs:  
• Problem / Stakes / Market  
• Why now / Differentiation / Moat  
• Product (dRANb → brandL → 4IELD → 4TRESS → Brandle wrap)  
• Traction plan / Pricing / Ask  
7.3 System Health (Model Health Meter)  
• Visual: OK / Working / Confused / Risk.  
• Thresholds: Warn at 75%; stop & request clarification at 85%.  
• Logs: Any warning emits Tier C audit event (anonymized).

\--------------------------------------------------------------------------------

8\. TECHNICAL SPECIFICATIONS  
Canonical Source: BRANDLE\_OS\_Lovable\_MasterBuildPrompt\_v1.6.txt (Schema) & ThreadVaultV\_v1.5.txt (API/Stack)  
8.1 Data Models (Postgres)  
Verbatim from v1.6 Master Build Prompt

```
User(id, email, name, role, created_at)

Project(id, user_id, name, status, created_at)

BrandBrief(id, project_id, business_description, category, audience, region_language, sliders_json, risk_tolerance, long_term_vision, created_at)

EngineRun(id, project_id, engine, mode, inputs_json, created_at, locked_from_run_id nullable)

EvidenceItem(id, project_id, type, title, description, source_kind='user_provided', url_or_file_ref, sha256, tags_json, created_at)

NameSet(id, project_id, engine_run_id, mode, params_json, created_at)

NameCandidate(id, project_id, name_set_id, name, pronunciation_hint, rationale, tags_json, created_at)

NameScore(id, candidate_id, scores_json, overall, confidence, why_json, watchout, created_at)

ShortlistItem(id, project_id, candidate_id, bucket, rank, notes, created_at)

IdentityPlan(id, project_id, engine_run_id, primary_name, variants_json, domain_ladder_json, handle_ladder_json, consistency_score, compromise_cost, reclaimability_score, confidence, created_at)

FieldMap(id, project_id, engine_run_id, competitors_json, clusters_json, heat_zones_json, whitespace_json, expansion_corridors_json, confidence, created_at)

ReadinessPack(id, project_id, engine_run_id, readiness_score, confidence, class_suggestions_json, templates_json, evidence_checklist_json, submission_checklist_json, enforcement_viability_score, created_at)

Comment(id, project_id, engine_run_id, user_id, body, created_at)

Vote(id, project_id, engine_run_id, user_id, target_type, target_id, value, created_at)

ExportArtifact(id, project_id, engine_run_id, type, format, file_ref, sha256, created_at)

UsageMeter(id, user_id, period_start, gens_used, exports_used)
```

Additional Models (from v1.1 Thread Vault):

```
ThreadVault(id, title, source_name, version_tag, created_at)
ThreadVaultMessageIndexRow(vault_id, msg_number, speaker, role, type, subject)
ThreadVaultArtifact(vault_id, artifact_id, artifact_type, speaker, content_types, subject, status, source, date, sha256_declared, sha256_computed, content_body_raw)
```

8.2 API Surface (MVP)  
Verbatim from v1.5

```
POST /auth/signup, /auth/login
GET/POST /projects
POST /projects/{id}/brief
POST /projects/{id}/generate
GET /projects/{id}/candidates
POST /candidates/{id}/score (re-score on weight change)
POST /projects/{id}/compare
POST /projects/{id}/shortlist
POST /projects/{id}/decide
POST /projects/{id}/export (pdf|txt|json) [paid]
GET /billing/portal
```

8.3 High-Level Architecture  
From v1.5  
• Clients: Web (Lovable prototype → Next.js) \+ Mobile (AI Studio → RN/Expo)  
• Services: Auth+Billing, Naming Engine (LLM+heuristics), Reports (PDF/TXT/JSON)  
• Storage: Postgres \+ object storage for exports  
• Observability: Audit logs (gen/export) \+ usage metering for tiers

\--------------------------------------------------------------------------------

9\. RECEIPTS & BENEDICTIONS  
Collected from Sources:  
• v1.5: "Benediction: Names are chosen with receipts, not vibes."  
• v1.4: "Benediction: A fortress is not a threat. It is structure that prevents regret."  
• v1.3: "Benediction: The field is never empty. The advantage is seeing it clearly."  
• v1.3 (Part VIII): "Benediction: Ship the engine. Guard the engine. Let the engine decide."  
• v1.2: "Benediction: A name is not chosen. It is defended."  
• v1.1: "Benediction: If it isn’t preserved, it isn’t real."  
• Document Index: "benediction: everything named is findable. everything findable is repeatable."  
End of Master Consolidation Document  
