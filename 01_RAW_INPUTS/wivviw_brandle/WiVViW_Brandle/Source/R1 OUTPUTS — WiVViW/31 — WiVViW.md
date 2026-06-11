ORACLE VISION WIVVIW PLATFORM: MASTER CONSOLIDATED DOCUMENT  
CONSOLIDATION STATUS: COMPLETE DATE: October 26, 2023 SYSTEM: BRANDLE OS / THE BRANDLE METAVERSE CANONICAL VERSION BASE: v2.4 (OnePaste) & v2.4 (dRANb Master Architecture)

\--------------------------------------------------------------------------------

1\. SYSTEM OVERVIEW & ARCHITECTURE  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt  
GOAL  
Calm, procedural brand-optimization platform that turns inputs into versioned decision artifacts with receipts, stability snapshots, and export bundles.  
CANON STACK (EXECUTION ORDER)  
dRANb → brandL → 4IELD → 4TRESS → V4ULT  
NON‑NEGOTIABLES  
• Trust-first: No hype, best-effort estimates \+ confidence labels everywhere.  
• No scraping assumptions in MVP: Availability is heuristic unless user provides verified evidence.  
• 4TRESS is NON‑LEGAL: Not legal advice; no threats; no guarantees; no legal conclusions.  
• Governance: Permission Envelopes \+ immutable AuditLog \+ Kill Switch.  
• Prompts: Hidden by default when sharing; receipts \+ stability visible.  
TOP NAV

```
Projects | dRANb | brandL | 3XEC | 4IELD | 4TRESS | 5ITE | 6ROXY | Investor | Vault | V4ULT | Evidence Vault | Governance | Admin | Settings/Billing
```

DRAFT VARIATION \- Document: BRANDLE\_OS\_LovableUpdatePrompt\_MasterBible\_v2.0.txt  
• Version Note: v2.0 lists the Nav slightly differently, omitting "Investor" and "Vault" which were added in later security updates.  
• Additions: Mentions "Global: keep calm procedural copy. Best-effort, confidence, and receipts remain mandatory everywhere."

\--------------------------------------------------------------------------------

2\. DATABASE SCHEMA & MODELS  
Consolidated from multiple sources to ensure ZERO DATA LOSS.  
Core Models  
Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt

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
UsageMeter,
Invite, NDA_Acceptance, ShareLink, AccessEvent.
```

Detailed Field Definitions (Governance & Ops)  
Source: BRANDLE\_OS\_LovableUpdatePrompt\_MasterBible\_v2.0.txt  
PermissionEnvelope

```
{
  "id": "UUID",
  "user_id": "UUID",
  "scope": "legal/finance/outreach/agent_action",
  "summary": "String",
  "payload_json": "JSON",
  "status": "draft/pending/approved/denied",
  "approved_at": "Timestamp",
  "created_at": "Timestamp"
}
```

PulseSchedule

```
{
  "id": "UUID",
  "user_id": "UUID",
  "type": "String",
  "schedule_json": "JSON",
  "prompt_template": "String",
  "enabled": "Boolean",
  "created_at": "Timestamp"
}
```

ScenarioRun (3XEC)

```
{
  "id": "UUID",
  "project_id": "UUID",
  "inputs_json": "JSON",
  "outputs_json": "JSON",
  "created_at": "Timestamp"
}
```

PostMortem (3XEC)

```
{
  "id": "UUID",
  "project_id": "UUID",
  "intake_json": "JSON",
  "learnings_json": "JSON",
  "created_at": "Timestamp"
}
```

SiteBlueprint (5ITE)

```
{
  "id": "UUID",
  "project_id": "UUID",
  "sections_json": "JSON",
  "widgets_json": "JSON",
  "created_at": "Timestamp"
}
```

Detailed Field Definitions (Security & Access)  
Source: BRANDLE\_OS\_LovableUpdatePrompt\_TieredAccess\_Security\_v2.3.txt  
Invite

```
{
  "id": "UUID",
  "name": "String",
  "email": "String",
  "phone": "String",
  "role": "investor/inner_circle",
  "code_hash": "String",
  "expires_at": "Timestamp",
  "used_at": "Timestamp",
  "device_hash": "String",
  "max_devices": 1,
  "notes": "String",
  "created_by": "UUID",
  "created_at": "Timestamp"
}
```

AccessEvent

```
{
  "id": "UUID",
  "actor_id": "UUID (or invite_id)",
  "role": "String",
  "resource": "String",
  "action": "view/export",
  "timestamp": "Timestamp",
  "device_hash": "String",
  "ip_hash": "String"
}
```

NDA\_Acceptance

```
version, accepted_at
```

\--------------------------------------------------------------------------------

3\. ENGINE: dRANb (NAMING)  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_MasterArchitecture\_v2.4.txt- Supporting Source: BRANDLE\_OS\_dRANb\_MasterArchitecture\_IntegrationPack\_v2.4.txt-  
Workflow  
Intake → Generate → Evaluate → Compare → Shortlist → Decide → Export.  
Intake (BrandBrief UI \+ Model)  
• business\_description: 1–3 paragraphs  
• industry/category: select \+ custom  
• target\_audience: who/where/why \+ psychographics  
• value\_proposition: 1 sentence  
• future\_expansion: 5–10 year vision  
• competitor\_set: 5–50 optional  
• constraints: forbidden\_terms\[\], syllable\_range, style\_notes  
• risk\_tolerance: conservative/balanced/adventurous  
• 7 personality sliders (0–100):  
    ◦ Classic/Modern  
    ◦ Minimal/Expressive  
    ◦ Serious/Playful  
    ◦ Technical/Human  
    ◦ Luxury/Accessible  
    ◦ Bold/Calm  
    ◦ Abstract/Literal  
Generation Modes  
• semantic: meaning-driven, non-generic  
• phonetic: sound-first, easy mouthfeel  
• abstract\_coined: invented but pronounceable  
• modified\_real: controlled distortion  
• symbolic: story-first, evocative  
• ownable\_nearmiss: distorted yet clear  
Anti-Generic Filters (Default ON)  
• System \+ user blocklists  
• Reject "two keyword SEO" patterns (BestX, MyX, XHub)  
• Penalize suffixes: app/pro/hub/ai/ly unless explicitly allowed  
• Penalize category stuffing (e.g., TravelToursNow)  
Scoring (7 Dimensions, 0-100)  
1\. memorability  
2\. pronunciation\_clarity  
3\. spelling\_ease (inverse of friction)  
4\. distinctiveness  
5\. brand\_alignment (vector distance)  
6\. scalability  
7\. collision\_risk\_proxy (inverse; non-legal)  
Overall Score: Weighted mean with caps & penalties. Confidence: 0–1 labeled High/Medium/Low.  
Penalties  
Stored as score\_adjustments\[\]:  
• ambiguous spelling: \-10 to \-35  
• competitor resemblance: \-15 to \-50  
• generic keyword presence: \-10 to \-40  
• awkward sub-brand expansion: \-10 to \-25  
Validation Labs (MVP)  
• Pronounce Lab: TTS playback \+ “heard correctly?” votes  
• Spell Lab: user hears name, types it; mismatch rate proxy  
• Recall Lab: timed exposure → recall attempts  
• Storage: Store results tied to EngineRun for later weighting.  
Candidate Output Schema

```
{
  "name": "normalized string",
  "pronunciation": "IPA-style best-effort",
  "rationale": "2-3 sentences",
  "generationMode": "String",
  "scores": {
    "memorability": 0-100,
    "pronunciation_clarity": 0-100,
    "spelling_ease": 0-100,
    "distinctiveness": 0-100,
    "brand_alignment": 0-100,
    "scalability": 0-100,
    "collision_risk_proxy": 0-100
  },
  "overallScore": 0-100,
  "confidence": 0-1,
  "viability": {
    "domain": "String",
    "handles": ["Array"],
    "linguistic": "String"
  },
  "strengths": ["Array"],
  "risks": ["Array"]
}
```

Digital Viability Signals (MVP Heuristic)  
• DomainLikelihood: Available / Premium / LikelyTaken \+ confidence.  
• HandleLikelihood: per platform \+ confidence.  
• LinguisticConflicts: profanity proximity / homographs (best-effort).  
Exports (Name Decision Report)  
Formats: PDF / TXT / JSON Content: Chosen name, pronunciation, rationale bullets, score summary, risks+mitigations, viability signals \+ confidence, next steps, copy blocks.  
DRAFT VARIATION \- Document: BRANDLE\_OS\_LovableUpdatePrompt\_dRANb\_CalmTech\_v2.1.txt  
Conflict/Detail Note: This document provides specific UI/UX implementation details not present in the Master Architecture v2.4. These should be treated as the UX Specification.  
Specific UX Requirements:  
1\. Intake: "Mad‑Libs style brief: 'I am building a \[Industry/Category\] brand that delivers \[Core Value\] to \[Audience\].'"  
2\. Soundalikes: User selects 2–5 brands they like the sound of; store as preferences (no scraping).  
3\. Processing State ("The Wait"): Cascading system log (purely UI trust theater). Messages:  
    ◦ "Generating phonotactic structures…"  
    ◦ "Cross‑referencing semantic roots…"  
    ◦ "Filtering profanity & cultural collisions…"  
    ◦ "Scoring candidates…"  
    ◦ "Packaging results…"  
4\. Dashboard: Display only 5–10 result cards per run (no infinite scroll). Clicking a card opens an in-place "Deep Dive Drawer".  
5\. Deep Dive Drawer Tabs:  
    ◦ Tab 1: Rationale  
    ◦ Tab 2: Linguistics  
    ◦ Tab 3: Digital  
    ◦ Tab 4: Risk  
6\. Workbench: Pin up to 3 names. Contextual previews: website header, app icon, business card.

\--------------------------------------------------------------------------------

4\. ENGINE: brandL (IDENTITY \- GATED)  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt  
• Gate: Only run when shortlist size is 3–7.  
• Outputs:  
    ◦ Domain ladder  
    ◦ Handle ladder  
    ◦ Compromise cost  
    ◦ Tier handle families \+ “Do Not Use”  
    ◦ Reclaimability friction \+ confidence  
    ◦ Voluntary outreach templates (no TM claims unless verified).  
• Export: Identity Plan bundle.

\--------------------------------------------------------------------------------

5\. ENGINE: 4IELD (FIELD INTEL)  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt  
• Inputs: Competitor CSV input.  
• Outputs: Clustering, saturation, conceptual field map, risk zones, whitespace, expansion-safe recs.  
• Snapshots:  
• Drift index delta on new snapshots.  
• No Scraping: MVP No Scraping assumptions.

\--------------------------------------------------------------------------------

6\. ENGINE: 4TRESS (PROTECTION \- NON-LEGAL)  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt  
• Legal Disclaimer: Banner: "Not legal advice". Hard blocks: no C\&D, no threats, no guarantees.  
• Outputs:  
    ◦ Readiness score \+ confidence  
    ◦ Best-effort class signals (confirm-with-counsel reminders)  
    ◦ Copy/paste fields  
    ◦ Evidence checklist  
    ◦ Submission checklist  
    ◦ Platform-tool viability score  
    ◦ Monitoring reminders export.  
• Export: Readiness Pack.

\--------------------------------------------------------------------------------

7\. EXPANSION MODULES  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_MasterBible\_v2.0.txt  
3XEC (Operations) \- MVP Placeholder  
• The Dojo: Scenario simulator setup (role, stakes, objectives) \+ generated “practice script” output.  
• The Black Box: Post-mortem intake (what happened, terms, outcomes) \+ extracted learnings \+ next-time anchors.  
• Safety: No legal advice; label as procedural negotiation coaching. No guarantees.  
5ITE (Product) \- MVP Template Injection  
• Pages:  
    ◦ Website Builder Brief: choose business type → suggested site sections.  
    ◦ Functional Injection Library: ROI calculator, quiz, booking request form (placeholders).  
    ◦ Export: generate starter code snippets and a “handoff prompt” for Lovable (meta) or dev.  
6ROXY (Avatar) \- Consent-first Twin Mode Expansion  
• UI Layer: 6ROXY is a UI layer over Twin Mode.  
• Modes: Guide/Mirror/Avatar modes must remain opt-in; Avatar always labeled synthetic.  
• A2A Protocol Page: Placeholder. Must ONLY output structured action plans and draft messages. Requirement: Any external execution requires Permission Envelope approval (no direct execution).  
• Culture Pack: Placeholder. Generates meme concepts and captions; no image generation in MVP.

\--------------------------------------------------------------------------------

8\. SECURITY, GOVERNANCE & TIERED ACCESS  
Tiered Access (MVP)  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt & TieredAccess\_Security\_v2.3.txt-  
• Roles: public, user, investor, inner\_circle, admin.  
• Admin: /admin/invites to mint/revoke/reset codes.  
• Redeem Flow:  
    ◦ /redeem: input code.  
    ◦ If valid \+ unused \+ not expired: bind device\_hash on first redemption, attach role, mark used.  
    ◦ Device Lock: max\_devices=1. If device mismatch: deny \+ "Contact Admin to reset."  
• Investor Portal: /investor/\* (Overview, Projections, Roadmap, Deck Viewer, Diligence). Gate: NDA gate required before any investor view.  
• Inner Circle Vault: /vault/\* (Engine Specs, Prompt Vault, Schemas/Manifests). View-only. No exports.  
Deterrence (Truthful)  
• Watermark: Overlay on investor/vault pages: email \+ timestamp \+ leak token.  
• Blur: On tab unfocus for investor/vault.  
• Copy: UI must state "web cannot fully prevent screenshots; watermarks provide traceability."  
Governance Layer  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_MasterBible\_v2.0.txt  
1\. Permission Envelopes (Human-in-the-Loop):  
    ◦ Any action interpretable as legal/financial/external execution MUST require an approval step.  
    ◦ UI: "Action Request" UI card: shows summary, risk label, requires explicit approve/deny.  
    ◦ Audit: Store immutable audit logs.  
2\. Kill Switch ("Right to Oblivion"):  
    ◦ Settings control: "Delete my likeness/model data".  
    ◦ MVP: Placeholder workflow \+ audit log.  
    ◦ Label what is deleted (voice, face, embeddings) vs what is not (immutable audit logs).  
3\. Data Stratification Labels:  
    ◦ UI Labels: Ephemeral (raw), Persistent (model weights), Immutable (audit).  
    ◦ Evidence Vault items must let user choose stratum.

\--------------------------------------------------------------------------------

9\. CROSS-CUTTING SYSTEMS  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.2.txt- Note: Using v2.2 for granular detail on Health Gauge and Receipts as v2.4 summarizes these.  
Model Health Gauge (8-track "Signal Flow Board")  
Tracks:  
1\. Coherence  
2\. Constraint Fit  
3\. Evidence Coverage  
4\. Consensus  
5\. Novelty vs Clarity  
6\. Risk Surface  
7\. Policy/Safety  
8\. Actionability  
Top Meter: Stable / Caution / Unstable \+ Stability Index 0–100. Storage: StabilitySnapshot per EngineRun.  
Receipts Drawer  
Contents (per EngineRun):  
• Run Ledger  
• Prompt Pack (sanitized)  
• Assumptions Ledger  
• Delta Report  
• Evidence Pins  
• Outcome Summary  
Sharing: Receipts visible, prompts hidden by default.  
Ops Cadence ("The Pulse")  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_MasterBible\_v2.0.txt  
• Pulse Scheduler Page: Morning Brief, Daily Recap, Week in Review, Look Ahead, Quarterly War Room.  
• Function: MVP generates "report prompts" and stores them; NO automatic emails.  
V4ULT  
Canonical Source: BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt  
• Universal timeline across all EngineRuns.  
• Lock / Branch / Diffs.  
• Artifact bundles.  
• Share controls.

\--------------------------------------------------------------------------------

10\. VISUALS / CINEMATIC LAYER (OPTIONAL)  
Canonical Source: BRANDLE\_OS\_LovableUpdatePrompt\_MasterBible\_v2.0.txt  
• Cinematic Mode: Toggle (purely cosmetic).  
• Visual Panels: Placeholders for "The Mirror", "The Land Grab", "The Citadel".

\--------------------------------------------------------------------------------

11\. USAGE & META-PROTOCOLS  
Canonical Source: BRANDLE\_OS\_OnePaste\_RebuildPack\_v2.2.txt-  
Rebuild Protocol  
1\. Open Lovable while logged in as desired owner email.  
2\. Create New Project.  
3\. Paste the full contents of the prompt file (BRANDLE\_OS\_Lovable\_OnePaste\_RebuildPrompt\_v2.4.txt) into Lovable.  
4\. Generate \+ Build.  
Benediction  
"The platform is portable because the canon is text."

\--------------------------------------------------------------------------------

\[END OF CONSOLIDATION \- ALL DOCUMENTS PROCESSED\]  
