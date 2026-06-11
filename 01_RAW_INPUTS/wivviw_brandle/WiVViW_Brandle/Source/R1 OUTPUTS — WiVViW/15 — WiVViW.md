BRANDLE OS v2.5 MASTER CONSOLIDATION DOCUMENT  
Date: 2026-02-04 Consolidation Status: Complete System: Oracle Vision WIVVIW Platform

\--------------------------------------------------------------------------------

SECTION 1: DEPLOYMENT & INPUT ORDER  
Canonical Source: BRANDLE\_OS\_Input\_Order\_v2.5.txt  
WORKFLOW A — CLEAN REBUILD (RECOMMENDED)  
1\. Create a NEW Lovable project (under the account you want to own it).  
2\. Paste this ONE file:  
BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt  
WORKFLOW B — PATCH AN EXISTING PROJECT (ONLY IF YOU CAN ACCESS IT)  
1\. Apply tiered access / security patch:  
BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt  
2\. Apply dRANb master architecture patch:  
BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt  
ARCHIVES  
• Outputs only: BRANDLE\_OS\_OutputsOnly\_v2.5.zip

\--------------------------------------------------------------------------------

SECTION 2: SYSTEM ARCHITECTURE & ONE-PASTE SPECIFICATION  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt Note: This document serves as the primary system definition. Detailed specifications for specific modules (Security, dRANb) found in separate update files are appended in Section 3 and 4 to ensure zero data loss of granular details.  
GOAL  
Build (or regenerate) a full-stack web app called “BRANDLE OS / THE BRANDLE METAVERSE”.  
A calm, procedural brand-optimization platform that turns inputs into versioned decision artifacts with receipts, stability snapshots, and export bundles. This build must include the core BRANDLE OS engines (dRANb, brandL, 4IELD, 4TRESS) and the METAVERSE expansion modules (3XEC, 5ITE, 6ROXY) as functional MVP pages.  
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
TOP NAV  
Projects | dRANb | brandL | 3XEC | 4IELD | 4TRESS | 5ITE | 6ROXY | V4ULT | Evidence Vault | Governance | Settings/Billing  
DESIGN  
Dark, calm, procedural UI. Minimal accents. No hype. No emojis. Every score shows: 3 “why” bullets \+ 1 “watch out” bullet. Confidence badge everywhere (Low/Med/High or 0–1).  
DATABASE (Postgres) MODELS (minimum)

```
User, Workspace, WorkspaceMember, Project, BrandBrief,

EngineRun, NameSet, NameCandidate, NameScore, ShortlistItem,

IdentityPlan, FieldSnapshot, ReadinessPack,

EvidenceItem, ExportArtifact,

StabilitySnapshot, ReceiptPack, MediaAsset, TwinSettings,

ShareReview, Vote, Comment,

PermissionEnvelope, AuditLog,

PulseSchedule,

ScenarioRun, PostMortem,

SiteBlueprint, WidgetTemplate,

UsageMeter.
```

CROSS‑CUTTING MODULES (MUST WORK IN MVP)  
1\) MODEL HEALTH GAUGE (8‑track “Signal Flow Board”) Tracks: Coherence, Constraint Fit, Evidence Coverage, Consensus, Novelty vs Clarity, Risk Surface, Policy/Safety, Actionability. Top meter: Stable/Caution/Unstable \+ Stability Index 0–100. Store StabilitySnapshot per EngineRun. Show warnings with ONE best correction.  
2\) RECEIPTS DRAWER (per EngineRun) Run Ledger, Prompt Pack (sanitized), Assumptions Ledger, Delta Report, Evidence Pins, Outcome Summary. Sharing: receipts visible, prompts hidden by default.  
3\) MEDIA KIT (placeholders) Per key screen: 6–12s clip slots (16:9 & 9:16) with captions. Milestone recap slot (30–60s). Store MediaAsset records.  
4\) TWIN MODE (Consent) Guide (default), Mirror (opt‑in), Avatar (opt‑in, synthetic labeled, user media only), Humor toggle (recaps only; never on 4TRESS). Store TwinSettings.  
5\) GOVERNANCE PANEL Permission Envelopes: any outreach/agent action must generate an approval card; store immutable AuditLog. Kill Switch: “Right to Oblivion” placeholder workflow \+ audit log. Data Stratification labels: Ephemeral (raw), Persistent (weights), Immutable (audit). Evidence Vault chooses stratum.  
6\) OPS CADENCE (“THE PULSE”) Pulse Scheduler stores report prompts (no auto-email): Morning Brief, Daily Recap, Week in Review, Look Ahead, Quarterly War Room.  
7\) V4ULT (Archive \+ Versioning) Universal timeline across all EngineRuns; Lock/Branch; Diffs; Artifact bundles; Share controls.  
ENGINE SPECIFICATIONS (OnePaste Versions)  
ENGINE: dRANb (Naming) — Calm Tech \+ Glass Box Flow: Intake → Processing (“Wait” log) → Dashboard (5–10 cards) → Deep Dive Drawer → Workbench Compare → Shortlist → Decide → Export → brandL handoff. Intake: Mad-libs brief \+ sliders (Speed/Weight/Structure) \+ digital constraints \+ Soundalikes preference. Processing: cascading log; mirrored in receipts. Dashboard: cards show Name \+ phonetic/IPA \+ score \+ 3 signal dots (Domain/Social/Risk). Deep Dive tabs: Rationale, Linguistics, Digital (ladders \+ confidence), Risk (proxy, non‑legal). Workbench: pin 3; compare; previews; “Test with Humans” export. Validation Labs: Pronounce (TTS+votes), Spell (dictation mismatch), Recall (timed recall). Filters: profanity/slurs (hard), duplicates, unreadable strings, length outliers. Scoring: memorability, pronunciation clarity, spelling friction, distinctiveness, alignment, scalability, collision proxy \+ confidence.  
ENGINE: brandL (Identity) — GATED Gate: only run when shortlist size is 3–7. Outputs: domain ladder, handle ladder, compromise cost, tier handle families \+ “Do Not Use”, reclaimability friction \+ confidence, voluntary outreach templates (no TM claims unless verified). Export: Identity Plan bundle.  
ENGINE: 4IELD (Field Intel) Inputs: competitor list (CSV), category tags, optional user exports. Outputs: clustering \+ saturation \+ conceptual 2D field map \+ risk zones \+ whitespace \+ expansion-safe recs. Snapshots: FieldSnapshot(map\_json, metrics\_json, assumptions, confidence). Drift index delta on new snapshots. Export: Field Pack.  
ENGINE: 4TRESS (Protection) — NON‑LEGAL Banner: Not legal advice. Hard blocks: no C\&D, no threats, no guarantees. Outputs: readiness score \+ confidence, best‑effort class signals (confirm-with-counsel reminders), copy/paste fields, evidence checklist, submission checklist, platform-tool viability score, monitoring reminders export. Export: Readiness Pack.  
EXPANSION MODULES (FUNCTIONAL MVP)  
3XEC: Dojo (scenario training) \+ Black Box (post‑mortems). Procedural coaching only. 5ITE: Website builder brief \+ widget library placeholders \+ starter code export \+ handoff prompt. 6ROXY: Twin Mode layer \+ A2A protocol drafts only (permission‑enveloped) \+ Culture Pack captions.  
SUBSCRIPTION GATING (placeholder)  
Free: limited projects/runs; exports off. Pro: exports \+ brandL. Premium: 4IELD \+ 4TRESS \+ monitoring. Team: workspaces \+ reviewer voting \+ governance. Add Settings/Billing with billing portal placeholder \+ UsageMeter.  
DELIVERABLE  
A working, authenticated web app with migrations, seeded demo project, the core engines, V4ULT versioning, Evidence Vault, Governance, Pulse scheduler, and export bundles (TXT/PDF/JSON) stored per run.

\--------------------------------------------------------------------------------

SECTION 3: DETAILED SPECIFICATION \- SECURITY & TIERED ACCESS  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt Draft Variation Note: This content appears in summary form in the OnePaste document. The text below is the specific update patch and contains granular database schema details and routing logic.  
Update the existing BRANDLE OS Lovable project to add Tiered Access (Investor Portal \+ Inner Circle Vault) with code-minted invites and device lock.  
Do NOT delete existing modules. Keep engines, V4ULT, Evidence Vault, Health Gauge, Receipts Drawer, Twin Mode, Governance.  
1\) Roles & Routing  
Roles: public, user, investor, inner\_circle, admin. Guard routes \+ enforce DB RLS.  
2\) Admin Panel  
Add /admin/invites:  
• Create invite: name, email, phone, role (investor/inner\_circle), expires\_at, notes.  
• Generate single-use code; store only code\_hash.  
• Actions: revoke, reset device lock (clear device\_hash \+ rotate code), extend expiry.  
Models:

```
Invite(id, name, email, phone, role, code_hash, expires_at, used_at, device_hash, max_devices=1, notes, created_by, created_at)

AccessEvent(id, actor_id or invite_id, role, resource, action, timestamp, device_hash, ip_hash)
```

3\) Redeem Flow  
Add /redeem page: user enters code. If valid \+ unused \+ not expired:  
• bind device\_hash on first redemption (best-effort fingerprint hash)  
• attach role to user  
• mark used\_at If device mismatch: deny \+ “Contact Admin to reset.”  
4\) Investor Portal (/investor/\*)  
Create pages: Overview, Projections, Roadmap, Deck Viewer (no download), Diligence. Require NDA acceptance before any investor view; store NDA\_Acceptance(version, accepted\_at).  
5\) Inner Circle Vault (/vault/\*)  
View-only pages: Engine Specs, Prompt Vault, Schemas/Manifests. No exports; no share links by default; disable selection/copy best-effort.  
6\) Deterrence (Truthful)  
Watermark overlay on investor/vault: email \+ timestamp \+ leak token. Blur-on-unfocus on investor/vault. Log all views/exports to AccessEvent. UI copy must state: web cannot fully prevent screenshots; watermarks provide traceability.  
7\) Share Links  
Investor-only view tokens with TTL \+ revoke. Prompts hidden by default; receipts visible.

\--------------------------------------------------------------------------------

SECTION 4: DETAILED SPECIFICATION \- dRANb MASTER ARCHITECTURE  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt Draft Variation Note: This content appears in summary form in the OnePaste document. The text below is the specific update patch and contains exact penalty ranges and field definitions required for compliance with Master Architecture v1.1.  
Update BRANDLE OS so dRANb exactly matches Master Architecture v1.1 \+ Section 4 spec. Do NOT delete existing modules.  
A) Intake (BrandBrief)  
Ensure model \+ UI capture:  
• business\_description (1–3 paragraphs)  
• industry\_category (select \+ custom)  
• target\_audience (who/where/why \+ psychographics)  
• value\_proposition (1 sentence)  
• future\_expansion (5–10 year vision)  
• competitor\_set (5–50 optional)  
• constraints: forbidden\_terms\[\], syllable\_range, style\_notes  
• risk\_tolerance: conservative/balanced/adventurous  
• personality sliders (7 axes, 0–100)  
B) Generation Modes  
Support NameSet.type: semantic, phonetic, abstract\_coined, modified\_real, symbolic, ownable\_nearmiss. Each EngineRun may generate multiple NameSets tagged by mode \+ parameters.  
C) Anti-Generic (default ON)  
• system \+ user blocklists  
• reject “two keyword SEO” patterns (BestX, MyX, XHub)  
• penalize suffixes app/pro/hub/ai/ly unless explicitly allowed  
• penalize category stuffing  
D) Scoring (7 dimensions 0–100)  
Persist NameScore per candidate: memorability, pronunciation\_clarity, spelling\_ease (inverse), distinctiveness, brand\_alignment, scalability, collision\_risk\_proxy (inverse; non‑legal).  
OverallScore: weighted mean \+ caps \+ penalties.  
Penalties (store as score\_adjustments\[\]):  
• ambiguous spelling: \-10 to \-35  
• competitor resemblance: \-15 to \-50  
• generic keyword presence: \-10 to \-40  
• awkward sub-brand expansion: \-10 to \-25  
E) Confidence  
Store confidence 0–1 and label High/Medium/Low.  
F) Validation Labs (MVP)  
Add Pronounce/Spell/Recall Labs and store results tied to EngineRun.  
G) Candidate Output Schema

```
name normalized, pronunciation (IPA best-effort), rationale, generationMode,

scores(7), overallScore, confidence, viability{domain, handles[], linguistic},

strengths[], risks[].
```

H) Digital Viability (heuristic)  
DomainLikelihood \+ confidence; HandleLikelihood per platform \+ confidence; LinguisticConflicts best-effort.  
I) Exports  
Name Decision Report export PDF/TXT/JSON with chosen name, pronunciation, rationale bullets, score summary, risks+mitigations, viability signals+confidence, next steps, copy blocks. Tone: calm, procedural, non-hype. Always label heuristics as estimates.

\--------------------------------------------------------------------------------

Variation Check:  
• BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5 XXXX.txt vs BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.5.txt: Identical content.  
• BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5 XXXX.txt vs BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.5.txt: Identical content.  
• BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5 XXXX.txt vs BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.5.txt: Identical content.  
\[END OF CONSOLIDATION \- ALL DOCUMENTS PROCESSED\]  
