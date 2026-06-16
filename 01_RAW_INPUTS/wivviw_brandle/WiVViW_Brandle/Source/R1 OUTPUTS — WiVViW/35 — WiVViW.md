SAFETY CHECKS (MANDATORY)  
• Document name: All provided source documents (10 text/md excerpts).  
• What was extracted: 100% of the documents provided, including system architectures, database models, technical specifications, and research notes.  
• What was NOT extracted: Nothing. Zero data loss protocol executed.  
• Why: All files were within token limits, uncorrupted, and fully readable.  
• Code/JSON Integrity Check: No incomplete code or JSON files were found.  
MASTER CONSOLIDATION DOCUMENT: BRANDLE OS (WIVVIW Platform)  
1\. GLOBAL SYSTEM ARCHITECTURE & PLATFORM WORKFLOW  
Canonical Version: 1 — BRANDLE\_OS\_Input\_Order\_v2.5 — \[START HERE — NUMBERED STEP-BY-STEP ORDER\].txt (v2.5). DRAFT VARIATION \- Document: BRANDLE\_OS\_Input\_Order\_v2.5.txt. Differences: None (Exact duplicate). DRAFT VARIATION \- Document: x 8.1 — WiVViW.md. Differences: Details an older v1.5/v1.6 build order.  
WORKFLOW A — CLEAN REBUILD (RECOMMENDED)  
1\. Create a NEW Lovable project (under the account you want to own it).  
2\. Paste this ONE file: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt.  
WORKFLOW B — PATCH AN EXISTING PROJECT (ONLY IF YOU CAN ACCESS IT)  
1\. Apply tiered access / security patch: BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt.  
2\. Apply dRANb master architecture patch: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt.  
ARCHIVES  
• Outputs only: BRANDLE\_OS\_OutputsOnly\_v2.5.zip.  
Platform Goal & Non-Negotiable Safety  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt (v2.5). Build a full-stack web app called “BRANDLE OS / THE BRANDLE METAVERSE”. A calm, procedural brand-optimization platform that turns inputs into versioned decision artifacts with receipts, stability snapshots, and export bundles.  
Safety & Governance Constraints:  
• Use best‑effort / estimate / confidence language everywhere.  
• No scraping in MVP. All domain/handle/competitor “availability” is heuristic unless user provides evidence in Evidence Vault and explicitly marks it verified.  
• 4TRESS is NON‑LEGAL: always show “Not legal advice”; no cease‑and‑desist letters; no threats; no guarantees; no legal conclusions.  
• Any external/outreach/agent-to-agent actions MUST be permission‑enveloped \+ auditable; do not execute anything.  
• Twin/Avatar is consent-based, synthetic‑labeled, revocable; implement a Kill Switch workflow (with audit log).  
• Prompts are hidden by default when sharing; receipts \+ stability are visible.  
• Every score shows: 3 “why” bullets \+ 1 “watch out” bullet.  
• Confidence badge everywhere (Low/Med/High or 0–1).  
• UI copy must state: web cannot fully prevent screenshots; watermarks provide traceability.  
Canon Order (Locked):  
1\. dRANb (Naming) — primary workflow.  
2\. brandL (Identity) — gated after shortlist size 3–7.  
3\. 4IELD (Field Intel) — crowding/whitespace mapping (no scraping).  
4\. 4TRESS (Protection) — non‑legal readiness pack.  
Top Nav Structure: Projects | dRANb | brandL | 3XEC | 4IELD | 4TRESS | 5ITE | 6ROXY | V4ULT | Evidence Vault | Governance | Settings/Billing.

\--------------------------------------------------------------------------------

2\. POSTGRES DATA MODELS & SCHEMA CONFIGURATIONS  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt & 3 — BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt. DRAFT VARIATION \- Document: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt & BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt (Exact duplicates). DRAFT VARIATION \- Document: x 8.1 — WiVViW.md. Differences: References older v1.6 and v1.1 schemas including Thread Vault integrations.  
Minimum DB Additions (Verbatim Schemas):

```
Invite(id, name, email, phone, role, code_hash, expires_at, used_at, device_hash, max_devices=1, notes, created_by, created_at)
AccessEvent(id, actor_id or invite_id, role, resource, action, timestamp, device_hash, ip_hash)
NDA_Acceptance(id, user_id or invite_id, version, accepted_at)
ShareLink(id, resource, token, expires_at, created_by, revoked_at)
```

.  
Minimum Postgres Models: User, Workspace, WorkspaceMember, Project, BrandBrief, EngineRun, NameSet, NameCandidate, NameScore, ShortlistItem, IdentityPlan, FieldSnapshot, ReadinessPack, EvidenceItem, ExportArtifact, StabilitySnapshot, ReceiptPack, MediaAsset, TwinSettings, ShareReview, Vote, Comment, PermissionEnvelope, AuditLog, PulseSchedule, ScenarioRun, PostMortem, SiteBlueprint, WidgetTemplate, UsageMeter..

\--------------------------------------------------------------------------------

3\. SECURITY & TIERED ACCESS  
Canonical Version: 3 — BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt (v2.5). DRAFT VARIATION \- Document: BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt (Exact duplicate).  
Roles & Routing: public, user, investor, inner\_circle, admin. Guard routes \+ enforce DB RLS.  
Admin Panel (/admin/invites):  
• Create invite: name, email, phone, role (investor/inner\_circle), expires\_at, notes.  
• Generate single-use code; store only code\_hash.  
• Actions: revoke, reset device lock (clear device\_hash \+ rotate code), extend expiry.  
Redeem Flow (/redeem): If valid \+ unused \+ not expired: bind device\_hash on first redemption (best-effort fingerprint hash), attach role to user, mark used\_at. If device mismatch: deny \+ “Contact Admin to reset.”.  
Investor Portal (/investor/\*):  
• Pages: Overview, Projections, Roadmap, Deck Viewer (no download), Diligence.  
• Require NDA acceptance before any investor view; store NDA\_Acceptance(version, accepted\_at).  
Inner Circle Vault (/vault/\*):  
• View-only pages: Engine Specs, Prompt Vault, Schemas/Manifests.  
• No exports; no share links by default; disable selection/copy best-effort.  
Deterrence (Truthful):  
• Watermark overlay on investor/vault: “CONFIDENTIAL — {email} — {timestamp} — {leak\_token}”.  
• Blur-on-unfocus on investor/vault.  
• Log all views/exports to AccessEvent.  
• Share Links: Investor-only view tokens with TTL \+ revoke. Prompts hidden by default; receipts visible.

\--------------------------------------------------------------------------------

4\. MODULE: dRANb (NAMING ENGINE)  
Canonical Version: 4 — BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt. DRAFT VARIATION \- Document: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt (Exact Duplicate). DRAFT VARIATION \- Document: x 8.1 — WiVViW.md. Differences: References Layer A (LLM) vs Layer B (Heuristics) and detailed pre-score filters (4-14 character limits, double metaphone logic). DRAFT VARIATION \- Document: x RESEARCH.md. Differences: Outlines "next-galaxy" extensions: Voice-driven conversational intake, real-time predictive trend fitting, cross-cultural multi-language checks.  
Workflow: Intake → Processing (“Wait” log) → Dashboard (5–10 cards) → Deep Dive Drawer → Workbench Compare → Shortlist → Decide → Export → brandL handoff.  
A) Intake (BrandBrief):

```
{
  "business_description": "1–3 paragraphs",
  "industry_category": "select + custom",
  "target_audience": "who/where/why + psychographics",
  "value_proposition": "1 sentence",
  "future_expansion": "5–10 year vision",
  "competitor_set": "5–50 optional",
  "constraints": {
    "forbidden_terms": [],
    "syllable_range": "string",
    "style_notes": "string"
  },
  "risk_tolerance": "conservative/balanced/adventurous",
  "personality_sliders": {
    "Classic_Modern": "0-100",
    "Minimal_Expressive": "0-100",
    "Serious_Playful": "0-100",
    "Technical_Human": "0-100",
    "Luxury_Accessible": "0-100",
    "Bold_Calm": "0-100",
    "Abstract_Literal": "0-100"
  }
}
```

B) Generation Modes: Support NameSet.type: semantic, phonetic, abstract\_coined, modified\_real, symbolic, ownable\_nearmiss. Multiple NameSets per EngineRun.  
C) Anti-Generic (default ON):  
• system \+ user blocklists.  
• reject “two keyword SEO” patterns (BestX, MyX, XHub).  
• penalize suffixes app/pro/hub/ai/ly unless explicitly allowed.  
• penalize category stuffing.  
D) Scoring (7 dimensions 0–100): Persist NameScore per candidate: memorability, pronunciation\_clarity, spelling\_ease (inverse), distinctiveness, brand\_alignment, scalability, collision\_risk\_proxy (inverse; non‑legal). OverallScore \= weighted mean \+ caps \+ penalties.  
Penalties (store as score\_adjustments\[\]):  
• ambiguous spelling: \-10 to \-35.  
• competitor resemblance: \-15 to \-50.  
• generic keyword presence: \-10 to \-40.  
• awkward sub-brand expansion: \-10 to \-25.  
E) Confidence: Store confidence 0–1 and label High/Medium/Low.  
F) Validation Labs (MVP):  
• Pronounce Lab: TTS \+ “heard correctly?” votes.  
• Spell Lab: dictation mismatch proxy.  
• Recall Lab: timed exposure → recall attempts.  
G) Candidate Output Schema: name normalized, pronunciation (IPA best-effort), rationale, generationMode, scores(7), overallScore, confidence, viability{domain, handles\[\], linguistic}, strengths\[\], risks\[\]..  
H) Digital Viability (heuristic): DomainLikelihood \+ confidence; HandleLikelihood per platform \+ confidence; LinguisticConflicts best-effort.  
I) Exports: Name Decision Report export PDF/TXT/JSON with chosen name, pronunciation, rationale bullets, score summary, risks+mitigations, viability signals+confidence, next steps, copy blocks. Tone: calm, procedural, non-hype.

\--------------------------------------------------------------------------------

5\. MODULE: brandL (DIGITAL IDENTITY ENGINE)  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt. DRAFT VARIATION \- Document: x 8.1 — WiVViW.md. Differences: Details handle fallback logic (clean, minimal-mod, contextual, geo, founder lanes). DRAFT VARIATION \- Document: x RESEARCH.md. Differences: Adds slogan generation (taglines using rhyme/alliteration scored on memorability) and an analytics module (aided/unaided recall, NPS, conversion lift, CLV, market share).  
Gate: Only run when shortlist size is 3–7.  
Outputs: domain ladder, handle ladder, compromise cost, tier handle families \+ “Do Not Use”, reclaimability friction \+ confidence, voluntary outreach templates (no TM claims unless verified).  
Export: Identity Plan bundle.

\--------------------------------------------------------------------------------

6\. MODULE: 4IELD (NAMING FIELD INTELLIGENCE)  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt. DRAFT VARIATION \- Document: x 8.1 — WiVViW.md. Differences: Details integer boundaries for Semantic Crowding Score (0-33: Roomy, 34-66: Contested, 67-100: Crowded) and Naming Saturation Index. DRAFT VARIATION \- Document: x RESEARCH.md. Differences: Details microtrend tracking, morphological/phonetic similarity detection, sentiment analysis of competitor names, and interactive zoomable 3D "namescape".  
Inputs: competitor list (CSV), category tags, optional user exports.  
Outputs: clustering \+ saturation \+ conceptual 2D field map \+ risk zones \+ whitespace \+ expansion-safe recs.  
Snapshots DB schema: FieldSnapshot(map\_json, metrics\_json, assumptions, confidence). Drift index delta on new snapshots.  
Export: Field Pack.

\--------------------------------------------------------------------------------

7\. MODULE: 4TRESS (PROTECTION ASSISTANT \- NON-LEGAL)  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt. DRAFT VARIATION \- Document: x 8.1 — WiVViW.md. Differences: Explicit template library additions (Offering Description, Goods/Services Draft Builder, Owner/Entity Block, Evidence Log). DRAFT VARIATION \- Document: x RESEARCH.md. Differences: Upgrades enforcement viability scoring to include cross-cultural cultural risk, micro-trend volatility, and "always-on" dashboards for renewal deadlines.  
Banner: Not legal advice. Hard blocks: no C\&D, no threats, no guarantees.  
Outputs: readiness score \+ confidence, best‑effort class signals (confirm-with-counsel reminders), copy/paste fields, evidence checklist, submission checklist, platform-tool viability score, monitoring reminders export.  
Export: Readiness Pack.

\--------------------------------------------------------------------------------

8\. CROSS-CUTTING & EXPANSION MODULES  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt.  
1\) MODEL HEALTH GAUGE (8‑track “Signal Flow Board”) Tracks: Coherence, Constraint Fit, Evidence Coverage, Consensus, Novelty vs Clarity, Risk Surface, Policy/Safety, Actionability. Top meter: Stable/Caution/Unstable \+ Stability Index 0–100. Store StabilitySnapshot per EngineRun. Show warnings with ONE best correction.  
2\) RECEIPTS DRAWER (per EngineRun) Run Ledger, Prompt Pack (sanitized), Assumptions Ledger, Delta Report, Evidence Pins, Outcome Summary. Sharing: receipts visible, prompts hidden by default.  
3\) MEDIA KIT (placeholders) Per key screen: 6–12s clip slots (16:9 & 9:16) with captions. Milestone recap slot (30–60s). Store MediaAsset records.  
4\) TWIN MODE (Consent) Guide (default), Mirror (opt‑in), Avatar (opt‑in, synthetic labeled, user media only), Humor toggle (recaps only; never on 4TRESS). Store TwinSettings.  
5\) GOVERNANCE PANEL Permission Envelopes: any outreach/agent action must generate an approval card; store immutable AuditLog. Kill Switch: “Right to Oblivion” placeholder workflow \+ audit log. Data Stratification labels: Ephemeral (raw), Persistent (weights), Immutable (audit). Evidence Vault chooses stratum.  
6\) OPS CADENCE (“THE PULSE”) PulseScheduler stores report prompts (no auto-email): Morning Brief, Daily Recap, Week in Review, Look Ahead, Quarterly War Room.  
7\) V4ULT & EVIDENCE VAULT (Archive \+ Versioning) Universal timeline across all EngineRuns; Lock/Branch; Diffs; Artifact bundles; Share controls. From WiVViW.md Variation: Every generated artifact is logged immutably with SHA256 hashes. Prompt Vault must be seeded with three canon prompts (dRANb, brandL, 4IELD) to serve as read-only PromptVaultArtifact entries.  
EXPANSION MODULES (FUNCTIONAL MVP)  
• 3XEC: Dojo (scenario training) \+ Black Box (post‑mortems). Procedural coaching only.  
• 5ITE: Website builder brief \+ widget library placeholders \+ starter code export \+ handoff prompt.  
• 6ROXY: Twin Mode layer \+ A2A protocol drafts only (permission‑enveloped) \+ Culture Pack captions.

\--------------------------------------------------------------------------------

9\. BUSINESS LOGIC, PRICING & SYSTEM HEALTH  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt & x 8.1 — WiVViW.md.  
SUBSCRIPTION GATING (Placeholder / Pricing Config):  
• Free (Scout): limited projects/runs; exports off.  
• Pro (Founder): exports \+ brandL.  
• Premium (Company): 4IELD \+ 4TRESS \+ monitoring.  
• Team (Platform): workspaces \+ reviewer voting \+ governance. Add Settings/Billing with billing portal placeholder \+ UsageMeter.  
Onboarding Copy Library: Headline must read: "Name it once. Decide with confidence.". Trust framing must explicitly state: "No legal advice. No scraping. No threats. No guarantees.".  
Model Health Meter / Confusion Gauge: Visible indicators read: OK / Working / Confused / Risk. The system warns the user at 75% confusion, and executes a hard stop to request clarification at 85%. Any warning emits a Tier C anonymized audit event log.

\--------------------------------------------------------------------------------

10\. METHODOLOGY: "DIAMOND INGESTION" PROTOCOL  
Canonical Version: x RESEARCH.md. This section explicitly details the verified methodology utilized for scaling system memory and documentation fidelity. 1\. No‑loss ingestion: Index each chunk without summarizing, preventing accidental deletions or “creative” reinterpretations. 2\. Conflict resolution phase (Nomenclature Matrix): Separate step to reconcile alternate names or overlapping features before synthesis. 3\. Synthesis Prompt: Forces a comprehensive final build with explicit sections, including financial modelling and an appendix for outlier ideas. Use a large‑context model (e.g., Gemini 1.5 Pro or Claude 3.5 Sonnet) with temperature set to zero to emphasize strict logic. Fact‑check and log contradictions with source IDs.

\--------------------------------------------------------------------------------

11\. BENEDICTIONS  
Canonical Version: x 8.1 — WiVViW.md. The development philosophy mandates the inclusion of the following: • "Everything named is findable. Everything findable is repeatable.". • "A name is not chosen. It is defended.". • "The field is never empty. The advantage is seeing it clearly.". • "Ship the engine. Guard the engine. Let the engine decide.". • "A fortress is not a threat. It is structure that prevents regret.". • "Names are chosen with receipts, not vibes.". • "If it isn’t preserved, it isn’t real.".  
\[END OF CONSOLIDATION \- ALL DOCUMENTS PROCESSED\]

SAFETY CHECKS (MANDATORY)  
• Document name:  
    1\. 1 — BRANDLE\_OS\_Input\_Order\_v2.5 — \[START HERE — NUMBERED STEP-BY-STEP ORDER\].txt  
    2\. BRANDLE\_OS\_Input\_Order\_v2.5.txt  
    3\. 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt  
    4\. BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt  
    5\. 3 — BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5 — \[PATCH EXISTING BUILD — INVESTOR PORTAL \+ INNER CIRCLE \+ CODES \+ DEVICE LOCK\].txt  
    6\. BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt  
    7\. 4 — BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5 — \[PATCH EXISTING BUILD — dRANb MASTER ARCHITECTURE \+ SCORING \+ LABS\].txt  
    8\. BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt  
    9\. Personalization & Settings in Lovable.dev for App Builders.docx  
    10\. x RESEARCH.md  
• What was extracted: 100% of all document contents, specifications, prompts, schemas, configurations, guidelines, and methodologies.  
• What was NOT extracted: Nothing.  
• Why: All documents successfully processed within character limits and without corruption.  
• Code/JSON Flags: All code/JSON snippets extracted verbatim; no incomplete blocks found.

\--------------------------------------------------------------------------------

MASTER CONSOLIDATION DOCUMENT: BRANDLE OS (WIVVIW Platform)  
1\. GLOBAL SYSTEM ARCHITECTURE & PLATFORM WORKFLOW  
Canonical Version: 1 — BRANDLE\_OS\_Input\_Order\_v2.5 — \[START HERE — NUMBERED STEP-BY-STEP ORDER\].txt DRAFT VARIATION \- Document: BRANDLE\_OS\_Input\_Order\_v2.5.txt Differences: None (Exact duplicate).  
WORKFLOW A — CLEAN REBUILD (RECOMMENDED)  
1\. Create a NEW Lovable project (under the account you want to own it).  
2\. Paste this ONE file: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt  
WORKFLOW B — PATCH AN EXISTING PROJECT (ONLY IF YOU CAN ACCESS IT)  
1\. Apply tiered access / security patch: BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt  
2\. Apply dRANb master architecture patch: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt  
ARCHIVES  
• Outputs only: BRANDLE\_OS\_OutputsOnly\_v2.5.zip  
2\. PLATFORM GOALS, SAFETY, & GOVERNANCE  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt DRAFT VARIATION \- Document: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt Differences: None (Exact duplicate).  
GOAL Build (or regenerate) a full-stack web app called “BRANDLE OS / THE BRANDLE METAVERSE”. A calm, procedural brand-optimization platform that turns inputs into versioned decision artifacts with receipts, stability snapshots, and export bundles. This build must include the core BRANDLE OS engines (dRANb, brandL, 4IELD, 4TRESS) and the METAVERSE expansion modules (3XEC, 5ITE, 6ROXY) as functional MVP pages.  
NON‑NEGOTIABLE SAFETY & GOVERNANCE  
• Use best‑effort / estimate / confidence language everywhere.  
• No scraping in MVP. All domain/handle/competitor “availability” is heuristic unless user provides evidence in Evidence Vault and explicitly marks it verified.  
• 4TRESS is NON‑LEGAL: always show “Not legal advice”; no cease‑and‑desist letters; no threats; no guarantees; no legal conclusions.  
• Any external/outreach/agent-to-agent actions MUST be permission‑enveloped \+ auditable; do not execute anything.  
• Twin/Avatar is consent-based, synthetic‑labeled, revocable; implement a Kill Switch workflow (with audit log).  
• Prompts are hidden by default when sharing; receipts \+ stability are visible.  
CANON ORDER (LOCKED)  
1\. dRANb (Naming) — primary workflow  
2\. brandL (Identity) — gated after shortlist size 3–7  
3\. 4IELD (Field Intel) — crowding/whitespace mapping (no scraping)  
4\. 4TRESS (Protection) — non‑legal readiness pack  
TOP NAV Projects | dRANb | brandL | 3XEC | 4IELD | 4TRESS | 5ITE | 6ROXY | V4ULT | Evidence Vault | Governance | Settings/Billing  
DESIGN Dark, calm, procedural UI. Minimal accents. No hype. No emojis. Every score shows: 3 “why” bullets \+ 1 “watch out” bullet. Confidence badge everywhere (Low/Med/High or 0–1).  
3\. POSTGRES DATA MODELS & SCHEMA CONFIGURATIONS  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt DRAFT VARIATION \- Document: 3 — BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5 — \[PATCH EXISTING BUILD — INVESTOR PORTAL \+ INNER CIRCLE \+ CODES \+ DEVICE LOCK\].txt Differences: Identical schema requirements.  
Minimum DB additions (Verbatim):

```
Invite(id, name, email, phone, role, code_hash, expires_at, used_at, device_hash, max_devices=1, notes, created_by, created_at)
NDA_Acceptance(id, user_id or invite_id, version, accepted_at)
ShareLink(id, resource, token, expires_at, created_by, revoked_at)
AccessEvent(id, actor_id or invite_id, role, resource, action, timestamp, device_hash, ip_hash)
```

DATABASE (Postgres) MODELS (minimum): User, Workspace, WorkspaceMember, Project, BrandBrief, EngineRun, NameSet, NameCandidate, NameScore, ShortlistItem, IdentityPlan, FieldSnapshot, ReadinessPack, EvidenceItem, ExportArtifact, StabilitySnapshot, ReceiptPack, MediaAsset, TwinSettings, ShareReview, Vote, Comment, PermissionEnvelope, AuditLog, PulseSchedule, ScenarioRun, PostMortem, SiteBlueprint, WidgetTemplate, UsageMeter.  
4\. SECURITY & TIERED ACCESS  
Canonical Version: 3 — BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5 — \[PATCH EXISTING BUILD — INVESTOR PORTAL \+ INNER CIRCLE \+ CODES \+ DEVICE LOCK\].txt DRAFT VARIATION \- Document: BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt Differences: None (Exact duplicate).  
1\) Roles & Routing Roles: public, user, investor, inner\_circle, admin. Guard routes \+ enforce DB RLS.  
2\) Admin Panel (/admin/invites)  
• Create invite: name, email, phone, role (investor/inner\_circle), expires\_at, notes.  
• Generate single-use code; store only code\_hash.  
• Actions: revoke, reset device lock (clear device\_hash \+ rotate code), extend expiry.  
3\) Redeem Flow (/redeem) If valid \+ unused \+ not expired: bind device\_hash on first redemption (best-effort fingerprint hash), attach role to user, mark used\_at. If device mismatch: deny \+ “Contact Admin to reset.”  
4\) Investor Portal (/investor/\*) Create pages: Overview, Projections, Roadmap, Deck Viewer (no download), Diligence. Require NDA acceptance before any investor view; store NDA\_Acceptance.  
5\) Inner Circle Vault (/vault/\*) View-only pages: Engine Specs, Prompt Vault, Schemas/Manifests. No exports; no share links by default; disable selection/copy best-effort.  
6\) Deterrence (Truthful)  
• Watermark overlay on investor/vault: email \+ timestamp \+ leak token.  
• Blur-on-unfocus on investor/vault.  
• Log all views/exports to AccessEvent.  
• UI copy must state: "web cannot fully prevent screenshots; watermarks provide traceability."  
7\) Share Links Investor-only view tokens with TTL \+ revoke. Prompts hidden by default; receipts visible.  
5\. ENGINE 1: dRANb (NAMING ENGINE)  
Canonical Version: 4 — BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5 — \[PATCH EXISTING BUILD — dRANb MASTER ARCHITECTURE \+ SCORING \+ LABS\].txt DRAFT VARIATION \- Document: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt (Duplicate) DRAFT VARIATION \- Document: x RESEARCH.md Differences: Specifies integration of a voice-driven conversational intake (must require explicit opt-in biometric consent, right to delete, no collection of sensitive political/religious data, optional synthetic voice), multi-language generation support, cross-cultural translation checks (flagging offensive transliterations), and a predictive micro-trend analysis module to evaluate "Trend Fit" and "Future Relevance". Recommends a "Localization & Trend Insights" page and a "Settings & Integrations" page.  
Workflow: Intake → Processing (“Wait” log) → Dashboard (5–10 cards) → Deep Dive Drawer → Workbench Compare → Shortlist → Decide → Export → brandL handoff.  
A) Intake (BrandBrief UI \+ model):  
• business\_description (1–3 paragraphs)  
• industry\_category (select \+ custom)  
• target\_audience (who/where/why \+ psychographics)  
• value\_proposition (1 sentence)  
• future\_expansion (5–10 year vision)  
• competitor\_set (5–50 optional)  
• constraints: forbidden\_terms\[\], syllable\_range, style\_notes  
• risk\_tolerance: conservative/balanced/adventurous  
• personality sliders (7 axes, 0–100): Classic/Modern, Minimal/Expressive, Serious/Playful, Technical/Human, Luxury/Accessible, Bold/Calm, Abstract/Literal.  
B) Generation Modes: Support NameSet.type: semantic, phonetic, abstract\_coined, modified\_real, symbolic, ownable\_nearmiss. Multiple NameSets per EngineRun.  
C) Anti-Generic (default ON):  
• system \+ user blocklists  
• reject “two keyword SEO” patterns (BestX, MyX, XHub)  
• penalize suffixes app/pro/hub/ai/ly unless explicitly allowed  
• penalize category stuffing  
D) Scoring (7 dimensions 0–100): Persist NameScore per candidate: memorability, pronunciation\_clarity, spelling\_ease (inverse), distinctiveness, brand\_alignment, scalability, collision\_risk\_proxy (inverse; non‑legal). OverallScore: weighted mean \+ caps \+ penalties. Penalties (store as score\_adjustments\[\]):  
• ambiguous spelling: \-10 to \-35  
• competitor resemblance: \-15 to \-50  
• generic keyword presence: \-10 to \-40  
• awkward sub-brand expansion: \-10 to \-25  
E) Confidence: Store confidence 0–1 and label High/Medium/Low.  
F) Validation Labs (MVP): Pronounce (TTS+votes), Spell (dictation mismatch), Recall (timed recall).  
G) Candidate Output Schema: name normalized, pronunciation (IPA best-effort), rationale, generationMode, scores(7), overallScore, confidence, viability{domain, handles\[\], linguistic}, strengths\[\], risks\[\].  
H) Digital Viability (heuristic): DomainLikelihood \+ confidence; HandleLikelihood per platform \+ confidence; LinguisticConflicts best-effort.  
I) Exports: Name Decision Report export PDF/TXT/JSON with chosen name, pronunciation, rationale bullets, score summary, risks+mitigations, viability signals+confidence, next steps, copy blocks. Tone: calm, procedural, non-hype.  
6\. ENGINE 2: brandL (DIGITAL IDENTITY ENGINE)  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt DRAFT VARIATION \- Document: x RESEARCH.md Differences: Adds a "Slogan & Tagline Generator" (scores on memorability, clarity, uniqueness, emotional appeal) and an "Analytics module" (tracking reach & awareness, trust & health, business impact, and consistency metrics such as aided/unaided recall, NPS, CLV, conversion lift, share of search). Adds AI provenance labeling.  
Gate: Only run when shortlist size is 3–7. Outputs: domain ladder, handle ladder, compromise cost, tier handle families \+ “Do Not Use”, reclaimability friction \+ confidence, voluntary outreach templates (no TM claims unless verified). Export: Identity Plan bundle.  
7\. ENGINE 3: 4IELD (FIELD INTELLIGENCE)  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt DRAFT VARIATION \- Document: x RESEARCH.md Differences: Enhances clustering into semantic/morphological/phonetic similarity mapping. Adds sentiment analysis of competitor names, predictive trend/crowd forecasting, identity drift monitoring, real-time trademark/domain watch, and interactive zoomable 3D “namescape” visualization.  
Inputs: competitor list (CSV), category tags, optional user exports. Outputs: clustering \+ saturation \+ conceptual 2D field map \+ risk zones \+ whitespace \+ expansion-safe recs. Snapshots: FieldSnapshot(map\_json, metrics\_json, assumptions, confidence). Drift index delta on new snapshots. Export: Field Pack.  
8\. ENGINE 4: 4TRESS (PROTECTION ASSISTANT \- NON-LEGAL)  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt DRAFT VARIATION \- Document: x RESEARCH.md Differences: Upgraded with cross-cultural & multi-language analysis for international filings, micro-trend forecasting for class saturation, always-on monitoring dashboards for office actions and renewal deadlines, and a "Predictive Enforcement Viability Scoring" model factoring distinctiveness, class density, cultural risk, and trend volatility. Introduces a Cross-functional runbook coordinating legal/marketing/security teams.  
Banner: Not legal advice. Hard blocks: no C\&D, no threats, no guarantees. Outputs: readiness score \+ confidence, best‑effort class signals (confirm-with-counsel reminders), copy/paste fields, evidence checklist, submission checklist, platform-tool viability score, monitoring reminders export. Export: Readiness Pack.  
9\. CROSS‑CUTTING & EXPANSION MODULES  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt  
MUST WORK IN MVP:  
1\. MODEL HEALTH GAUGE (8‑track “Signal Flow Board”): Tracks Coherence, Constraint Fit, Evidence Coverage, Consensus, Novelty vs Clarity, Risk Surface, Policy/Safety, Actionability. Top meter: Stable/Caution/Unstable \+ Stability Index 0–100. Store StabilitySnapshot. Show warnings with ONE best correction.  
2\. RECEIPTS DRAWER (per EngineRun): Run Ledger, Prompt Pack (sanitized), Assumptions Ledger, Delta Report, Evidence Pins, Outcome Summary. Sharing: receipts visible, prompts hidden by default.  
3\. MEDIA KIT: Per key screen: 6–12s clip slots (16:9 & 9:16) with captions. Milestone recap slot (30–60s). Store MediaAsset records.  
4\. TWIN MODE (Consent): Guide (default), Mirror (opt‑in), Avatar (opt‑in, synthetic labeled, user media only), Humor toggle. Store TwinSettings.  
5\. GOVERNANCE PANEL: Permission Envelopes for outreach (generates approval card, stored in AuditLog). Kill Switch for “Right to Oblivion”. Data Stratification labels: Ephemeral, Persistent, Immutable.  
6\. OPS CADENCE (“THE PULSE”): PulseScheduler stores report prompts (Morning Brief, Daily Recap, Week in Review, Look Ahead, Quarterly War Room).  
7\. V4ULT (Archive \+ Versioning): Universal timeline across all EngineRuns; Lock/Branch; Diffs; Artifact bundles; Share controls.  
EXPANSION MODULES (FUNCTIONAL MVP):  
• 3XEC: Dojo (scenario training) \+ Black Box (post‑mortems). Procedural coaching only.  
• 5ITE: Website builder brief \+ widget library placeholders \+ starter code export \+ handoff prompt.  
• 6ROXY: Twin Mode layer \+ A2A protocol drafts only (permission‑enveloped) \+ Culture Pack captions.  
10\. BUSINESS LOGIC & PRICING  
Canonical Version: 2 — BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 — \[CLEAN NEW LOVABLE PROJECT — PASTE THIS ONE FILE\].txt  
SUBSCRIPTION GATING (Placeholder):  
• Free: limited projects/runs; exports off.  
• Pro: exports \+ brandL.  
• Premium: 4IELD \+ 4TRESS \+ monitoring.  
• Team: workspaces \+ reviewer voting \+ governance. Add Settings/Billing with billing portal placeholder \+ UsageMeter.  
DELIVERABLE: A working, authenticated web app with migrations, seeded demo project, V4ULT versioning, Evidence Vault, Governance, Pulse scheduler, and export bundles (TXT/PDF/JSON).  
11\. LOVABLE.DEV PLATFORM CAPABILITIES & SETTINGS (BUILDER CONTEXT)  
Canonical Version: Personalization & Settings in Lovable.dev for App Builders.docx  
Visual Customization:  
• Themes & Branding: Centralized Design View applying global CSS styles (colors, fonts, borders).  
• Visual Edits: On-the-fly UI adjustments without code, swapping assets or using AI image generation.  
• Templates & Design Systems: Project cloning via “Use a template”. Enterprise Design Systems utilize .lovable markdown files to define and enforce global React components and styling.  
Logic & Flow Control:  
• Plan vs Agent Mode: Plan mode brainstorms and outlines architecture; Agent mode executes autonomous code modification across frontend/backend.  
• Code Editor: Direct code manipulation with formatting and standard IDE functions.  
• Custom Knowledge: Project-specific persistent memory defining architecture, rules, and constraints.  
• Testing Tools: Built-in headless browser testing, unit test generation (Vitest, RTL), and backend Edge Function simulations.  
Workspace & Deployment:  
• Roles & Visibility: Restrict access (Restricted/Workspace/Public) and define member roles (Viewer, Editor, Admin, Owner).  
• Connectors: Shared Connectors (Stripe, Supabase, ElevenLabs, Firecrawl) integrate external APIs via auto-generated secure Edge functions storing keys. Personal Connectors (MCP) link Jira/Notion as build-time context.  
• GitHub Sync: Bi-directional repo sync, allowing standard CI/CD and experimental branch-switching.  
• Deployment: One-click publishing to Lovable Cloud (lovable.app or Custom Domain) with Beta Support for parallel Test and Live Environments preventing accidental production data deletion. Access to live apps can be restricted to "Workspace only".  
12\. METHODOLOGY: "DIAMOND INGESTION" PROTOCOL  
Canonical Version: x RESEARCH.md Operational instruction set for building the unified brand bible/system architecture:  
1\. No-loss Ingestion: Ingest all data chunks sequentially using a deterministic model (Temp: 0). Do not summarize during ingestion.  
2\. Conflict Resolution Phase: Produce a "Nomenclature Matrix" to reconcile naming conflicts or duplicates before finalizing text.  
3\. Synthesis Execution: Generate the master document strictly according to defined sections (incorporating Charisma/Accuracy balance) and explicitly log fact-check contradictions/source IDs. Provide revenue projections based on predefined pricing tiers.  
\[END OF CONSOLIDATION \- ALL DOCUMENTS PROCESSED\]