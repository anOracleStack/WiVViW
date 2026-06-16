# WiVViW Ethereal Genesis — Design Spec

**Date:** 2026-06-10 (updated 2026-06-14)  
**Status:** Owner decisions incorporated — Phase 1 implementation in progress
**Scope:** Design + Phase 1 `src/` (ethereal genesis shell, browse-first, balanced obscurity voice)

**Sources read:**

- `05_BUSINESS/platform/WiVViW — BUSINESS PLATFORM/WiVViW ethereal PART 3.md` (Genesis / galaxy / Brand Genome canon)
- `docs/CANONICAL_SOURCES.md`
- `01_RAW_INPUTS/domain-branding/Oracle-Vision_Extension-Menu_Domain-Branding-Reference.md` (domain fusion, TLD bank, scoring rubric)
- Current production shell: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/(dashboard)/layout.tsx`, `src/components/landing/LandingHero.tsx`, `src/app/globals.css`
- Existing genome model: `src/lib/os/brand-genome.ts`
- Prior constellation strategy: `docs/superpowers/specs/2026-06-10-wivviw-constellation-design.md`
- Entitlements: `src/lib/entitlements/index.ts`, `PRICING_CANON.json`

**Locked user direction:**

- Aesthetic: **Ethereal Genesis** (cosmic universe that evolves) — **not** cyberpunk
- Adaptive UI: per-user personalization (color, typography, workflow) as the system learns business identity; **platform accumulates data over time and gets tighter** (Brand Genome + maturity phase)
- UX: legible, business-identity aesthetic, **say less do more**, collaboration not spoon-feeding
- **Browse-first / gate-on-submit:** anonymous users browse the **entire** site — all engines, forms, galaxy preview — signup only when they **submit** or request a **deliverable**; tier gates apply to premium outputs and engine depth
- Product story: seed → sale, concept → concrete, business DNA, twin/assistant while you sleep
- New surfaces: AI chatbot popup (bottom-right); footer with Privacy, Legal, Contact, FAQ
- Domain & branding intelligence: fused-TLD naming, handle consistency, TM headroom — wired into **dRANb → brandL → 4IELD → 4TRESS** pipeline per Oracle Vision reference

---

## Balanced Obscurity

**Owner mandate:** User-friendly **and** obscure/cool — not one or the other. The visual carries vibe; short labels carry function. People must understand what something **is** and **does**, without paragraph explanations or generic SaaS tone.

**The balance:**

- Comprehensive clarity — never leave users guessing what an engine does  
- Own aesthetic — ethereal, distinctive, not basic-ass corporate  
- Not too much copy; not too little clarity  
- Layer of cool on top of sense-making  

| Do | Don't |
|----|-------|
| Let galaxy map, genesis backdrop, and star nodes carry mood | Headline "CONSTELLATION" or "GALAXY" over a map that already shows it |
| **dRANb**, **4IELD**, etc. + one quiet outcome line on engine cards | Friendly renames (Name, Field, Fortress) as primary labels |
| Branded engine names in nav; optional mono pronunciation as secondary badge | Pronunciation guides as hero headlines, glass-box lecture copy |
| Landing: 2–3 balanced lines that promise seed → sale | Tech jargon, feature lists, marketing essays |
| Gate on run/save/export with "Save your progress" | Punitive login walls at browse time |
| Tooltips / chatbot for depth when user asks | Spoon-feeding tours that explain what's already visible |
| Collaboration voice ("Run dRANb", "Open brandL") | Empty UI with no outcome hint — user can't tell what engines do |

**Pattern:** Visual = vibe. Label = branded name + outcome hint. Example: star map needs no "CONSTELLATION" headline, but an engine card should say **4IELD** plus a single outcome line.

Branded spellings (dRANb, 4IELD, MOIRAI) are primary UI headlines. Pronunciation sublabels (`friendlyLabel`) stay mono and subtle — API routes, receipts detail, and backend use `id` / `label` as canonical.

---

## 1. Three approaches for adaptive per-user UI

### Approach A — CSS token override from Brand Genome (recommended for v1)

**How it works:** Extend `BrandGenome` with a `uiTheme` object (primary/accent HSL, display/body font keys, density). On session load, a server component or layout wrapper injects CSS variables on `:root` or a `[data-genesis-phase]` container. Engine accent colors still come from `ENGINE_REGISTRY` but are **tinted** toward genome primaries.

| Pros | Cons |
|------|------|
| Fits existing `--void-*` / glass token pattern in `globals.css` | Personalization is mostly cosmetic until workflow hooks land |
| Deterministic, testable, no client ML | Requires explicit genome fields — nothing "magically" adapts |
| Works with ScaleWrapper proportional layout (RULE 17) | Font switching needs curated allowlist (3–5 pairs max) |
| Per-user difference visible on day one after first engine run | |

### Approach B — Maturity-driven phase shell (Genesis → Galaxy)

**How it works:** A `brand_maturity_score` (0–100) drives **global shell phase**, not just background art. Score bands from ethereal PART 3: 0–20 Genesis (white light), 20–50 Molecular, 50–80 Proto-Galaxy, 80–100 Full Galaxy. Same components; different backdrop, motion intensity, and nav density.

| Pros | Cons |
|------|------|
| Matches canon narrative ("galaxy is earned") | Two axes of variation (genome colors + phase) can confuse if not explained |
| Strong retention metaphor — return visits feel different | Phase transitions need careful performance budgeting |
| Reuses existing `ConstellationMap` / galaxy work as terminal state | New users always start Genesis even if they want "pro" dark mode early |

### Approach C — Full adaptive layout engine (workflow + chrome)

**How it works:** Usage signals (time-in-engine, skip patterns, export frequency) reorder sidebar, default landing route, and stepper depth. Typography and color follow genome; **navigation order** and **default CTAs** follow behavior models.

| Pros | Cons |
|------|------|
| True "every user different experience over time" | Highest complexity; easy to feel unpredictable or loss of control |
| Aligns with "twin learns while you sleep" story | Needs opt-out / "reset my workspace" and audit trail |
| Best long-term moat | Wrong for Phase 1 — violates foundation-first from constellation spec |

### Recommendation

**Ship A + B together in Phase 1**, defer C to v2.

- **A** delivers immediate per-brand differentiation (colors, copy tone, font pair) from data you already collect in engines.
- **B** delivers the Ethereal Genesis story without blocking engine reliability.
- **C** remains the north star but requires explicit consent, reversibility, and telemetry — not a landing-page retrofit.

---

## 2. Design Section A — Visual & motion (Ethereal Genesis)

### Core metaphor

User is not filling forms — they are **sequencing identity**, encoding DNA, igniting engines (stars), expanding a galaxy. Cosmic layer is **backdrop**; decisions stay **foreground** (clean, form-first, decision-focused).

### Stage 0 → Galaxy evolution

| Phase | Maturity | Visual tone | Motion |
|-------|----------|-------------|--------|
| **0 — Genesis** | 0–20 | Radiant white, pearl, soft gold, pale lavender. No black void. Atoms / soft orbs, haze, proto-helix barely visible | Very slow orbit; light bends, not hyperspace |
| **1 — Molecular** | 20–50 | White dims slightly; helix stabilizes; faint star particles at edge | Strand pulses on engine completion |
| **2 — Proto-Galaxy** | 50–80 | Gradient deepens toward pale indigo; engine nodes appear as distant stars | Gentle fold transitions between engines |
| **3 — Full Galaxy** | 80–100 | Earned spiral map; Brandle Galaxy; nodes = engines | Star-warp transitions; higher intensity |

**First visit rule (canon):** Landing is **birth**, not outer space. Black void is **evolution**, not onboarding.

### Engine-specific accents (canon palette — adapt, do not copy cyberpunk amber default)

| Engine | Branded label | Pronunciation (optional) | Accent (canon) | Feeling |
|--------|---------------|--------------------------|----------------|---------|
| dRANb | dRANb | Name | Icy blue + white | Precision |
| brandL | brandL | Brandle | Emerald + deep navy | Mapping identity |
| 4IELD | 4IELD | Field | Gold + amber | Strategic scan |
| 4TRESS | 4TRESS | Fortress | Crimson + charcoal | Defense |
| 3XEC | 3XEC | Exec | Steel / blue-gray | Operations |
| 5ITE | 5ITE | Site | Violet | Construction |
| 6ROXY | 6ROXY | Proxy | Silver + soft lavender | Twin / voice |

Each engine space: shared typography + layout grid; unique nebula tint, particle behavior, and accent only.

### Motion principles

- Transitions: fast light streak **only after** Proto-Galaxy; before that, soft white flash + fold.
- DNA helix: gains segments on name, handle, trademark prep, site deploy — becomes luminous sigil at completion.
- Performance: cap particles; GPU-friendly; **Performance mode** toggle; respect `prefers-reduced-motion`.
- Optional audio: deep ambient hum, single ignite tone on milestone — off by default.

### vs saved tag `ui-shell-v1-cyberpunk-corporate` (current `src/`)

| Dimension | Cyberpunk corporate (current) | Ethereal Genesis (target) |
|-----------|------------------------------|---------------------------|
| Background | `--void-bg` near-black `#030308`, void grid, grain, amber/teal glows | Phase 0 white/pearl; void arrives only at maturity |
| Typography | Syne display + JetBrains mono labels + DM Sans | Same families allowed early; mono de-emphasized on marketing; genome may swap display/body within allowlist |
| Copy tone | "THE CONSTELLATION", MOIRAI jargon, "cinematic command shell" | Minimal genesis copy; collaboration voice; branded engine names |
| Metadata | "Cyberpunk corporate clarity" in `layout.tsx` | "Brand intelligence that grows with you" (example — finalize in Section C) |
| Logo treatment | Amber on void | Logo readable on white **and** void — dual-theme asset or adaptive fill |
| UI chrome | Glass panels on dark, amber primary CTA | Glass on light mist first; amber becomes **one** genome default, not global brand |
| Galaxy | Static preview dots on landing | Interactive map **earned**; landing starts atoms not constellation grid |

**Non-negotiable carryover from cyberpunk shell:** glass-box receipts, legible forms, ScaleWrapper 1440px proportional scale, centered section titles (RULE 18), BalancedText (RULE 19).

---

## 3. Design Section B — Adaptive identity system

### What personalizes

1. **Color** — primary, accent, surface warmth derived from genome + industry heuristics  
2. **Typography** — display/body pair from allowlist keyed to `copyTone` + `toneKeywords`  
3. **Workflow** — v2: default engine entry, stepper verbosity, suggested next action  
4. **Motion** — particle density and transition speed tied to `brand_maturity_score`  
5. **Copy micro-variation** — CTA verbs and helper text match `copyTone` (approachable / neutral / severe)

### Data model sketch

**Existing** (`BrandGenome` in `src/lib/os/brand-genome.ts`):

```ts
toneKeywords, competitors, constraints, values,
riskTolerance, copyTone, shortlist, primaryDomain, handles,
crowdingScore, readinessScore, phaseCompleted, claims
```

**Proposed extensions (v1 schema — design only):**

```ts
interface BrandGenomeUi {
  maturityScore: number;          // 0–100, drives Genesis phase
  genesisPhase: 0 | 1 | 2 | 3;    // derived band for CSS
  theme: {
    primaryHsl: string;
    accentHsl: string;
    surfaceWarmth: "cool" | "neutral" | "warm";
    displayFontKey: string;         // e.g. "syne" | "fraunces" | "outfit"
    bodyFontKey: string;            // e.g. "dm-sans" | "source-sans"
  };
  enginesIgnited: EngineId[];     // for galaxy node brightness
  dnaSegmentCount: number;        // visual helix complexity
  lastActiveAt: string;
}

interface UsageSignals {
  // v2 — store aggregated, not raw clickstream
  engineSessions: Partial<Record<EngineId, number>>;
  preferredEntryEngine?: EngineId;
  skippedSteps: string[];
  exportCount: number;
}
```

**Write paths:** engine handoffs and session completion bump `maturityScore`, append `phaseCompleted`, merge claims. Interview/onboarding (future) seeds `toneKeywords`, `values`, voice/avatar flags for 6ROXY.

**Evolution principle (owner decision):** The platform is not static chrome — it **accumulates identity data** across sessions. Early visits feel open and exploratory (Genesis light); repeat visits and completed gates tighten recommendations, surface receipts, and advance galaxy phase. Adaptive UI (Approach A+B) reflects **what the system already knows**, not a demo skin. Anonymous browse uses **session-local draft state**; on signup, draft genome merges into the authenticated project.

**Domain & branding extensions (v1 schema — design only):**

```ts
interface FusedTldCandidate {
  label: string;              // e.g. "prax.is"
  baseWord: string;           // e.g. "praxis"
  tld: string;                // e.g. ".is"
  fusionPattern: string;      // ending key from reference §2, e.g. "-is"
  availability?: "available" | "taken" | "unknown" | "restricted";
  restrictedReason?: string;  // e.g. ".id local presence"
  avoidListFlag?: boolean;    // reference §7 high-abuse TLD
}

interface HandleConsistency {
  platform: "x" | "instagram" | "tiktok" | "youtube" | "linkedin" | "github" | "discord" | "reddit";
  handle: string;
  status: "available" | "taken" | "unknown";
  fallbackConvention?: "get_" | "try_" | "join_" | "_hq" | "_app" | "hey_";
}

interface NamingScorecard {
  memorability: number;       // 1–5
  pronounceability: number;
  spellability: number;
  distinctiveness: number;
  fusionQuality: number;
  meaningFit: number;
  handleConsistency: number;
  tmHeadroom: number;
  compositeRank: number;
  scoredAt: string;
}

// Extend BrandGenome claims / shortlist entries:
interface ShortlistEntry {
  name: string;
  fusedDomains: FusedTldCandidate[];
  handles: HandleConsistency[];
  scorecard?: NamingScorecard;
  tmRiskNotes?: string[];
  workhorseAlternatives?: string[];  // .com / .ai / .io / .co fallbacks
}
```

### v1 vs v2

| Capability | v1 (Phase 1 implementation) | v2 |
|------------|----------------------------|-----|
| CSS token theming from genome | Yes | Refine with contrast QA |
| Phase 0 Genesis landing + dashboard backdrop | Yes | Full WebGL optional |
| Maturity score from engine gates | Yes — deterministic formula | ML-assisted weighting |
| Per-engine friendly names in nav | Yes | Spoken aliases in chatbot |
| Typography allowlist (2–3 pairs) | Yes | User pick from curated set |
| Workflow reorder / adaptive nav | No | Yes, with reset |
| "Different every visit" particle seed | Yes — `hash(userId + date)` subtle | Session + genome blend |
| Avatar montage / grand entrance video | No — noted | Cinematic onboarding |
| Twin overnight actions visible in UI | Copy + badge only | Real job queue surface |

**Maturity formula (v1 proposal):**

- +15 dRANb shortlist gate passed  
- +15 brandL domain confirmed  
- +15 4IELD crowding gate  
- +15 4TRESS readiness gate  
- +10 3XEC session completed  
- +10 5ITE session completed  
- +10 6ROXY voice or avatar flag  
- +10 export bundle created  
- Cap 100; map to genesis phase bands above  

---

## 4. Design Section C — Copy & collaboration voice

### Principles

- **Say less, do more** — one line context, one primary action, receipts for depth.  
- **Collaboration, not spoon-feeding** — "we" language, invitations not commands.  
- **Business identity aesthetic** — calm, high-trust, non-legal; show signals not verdicts.  
- **Legible hierarchy** — ALL CAPS centered section labels (RULE 18); balanced line lengths (RULE 19).  
- **Hide internal codenames** in primary UI; keep stylized labels as secondary mono badge where useful for power users.

### Engine friendly names (primary nav / landing)

| ID | Primary label | Secondary (mono badge) | One-line purpose |
|----|---------------|------------------------|------------------|
| dranb | **Name** | dRANb | Find a name worth owning |
| brandl | **Brandle** | brandL | Secure your name across the web |
| 4ield | **Field** | 4IELD | See who else occupies your space |
| 4tress | **Fortress** | 4TRESS | Prepare protection — step by step |
| 3xec | **Exec** | 3XEC | Turn decisions into daily ops |
| 5ite | **Site** | 5ITE | Launch a home for your brand |
| 6roxy | **Proxy** | 6ROXY | Your voice and presence, extended |

Vault rows stay descriptive: Evidence Vault, V4ULT Timeline, Receipts, Exports.

### Landing rewrite (examples)

**Headline:** Identity begins in light.

**Subhead (BalancedText):**
We build your business DNA together —
from first name to first sale.

**Primary CTA:** Start exploring → `/dashboard` (no signup wall)
**Secondary:** Sign in

**Footer:** Privacy · Legal · Contact · FAQ (no instructional footer line — browse is implied)

### Dashboard / sidebar tone shift

| Current | Ethereal Genesis |
|---------|------------------|
| CALM TECH · GLASS BOX | (removed — no tagline under logo) |
| Explore the shell | Start exploring |
| THE CONSTELLATION / Constellation nav | Galaxy (visual only — no lecture) |
| Guest browse banner (instructional) | One line: "Exploring — sign in when you save or run." |

### Collaboration voice snippets (engine workbench)

- Intake empty state: "Tell us what you're building. We'll shape the first pass together."  
- Gate failed: "Not yet — here's what we need next." (link to receipt)  
- Handoff: "Name is set. Ready to claim Brandle territory?"  
- Export: "Your receipt bundle is ready — everything we decided, in one place."

---

## 5. Design Section D — Chatbot popup (bottom-right)

### Role

Dual mode by maturity and auth:

1. **Guide (default, guest + early genesis)** — onboarding help, engine glossary, "what should I do next?"; may **prefill** engine forms from chat context but does not bypass submit gates.  
2. **Twin preview (signed-in, Proxy progress)** — surfaces genome-aware suggestions, links to receipts, previews overnight-work narrative ("while you sleep" — v1 copy only unless job queue exists).

Not a replacement for engine UIs — **companion**, not second product surface.

### Behavior

| State | UI |
|-------|-----|
| Collapsed | Circular fab, soft glow matching genome primary; badge dot if unread suggestion |
| Expanded | 360×480px panel (scaled with ScaleWrapper), glass on genesis/light or void phase |
| Placement | Fixed bottom-right; 24px inset; z-index above backdrop, below modals |
| Entry | Single text field + suggested chips ("What is Name?", "What's next?", "Explain this receipt") |

### Scope boundaries

- **In scope v1:** FAQ-style answers from static knowledge + links to engines/legal; context = current route + auth + genome phase (read-only); guest may receive **draft suggestions** that land in session-local forms.  
- **Out of scope v1:** Legal advice, trademark opinions, autonomous engine runs, live handle scraping without user-initiated submit.  
- **Escalation:** "Open in Name engine" deep link with prefilled context when authenticated.

### Privacy

- Banner on first open: "Conversations help improve your workspace. Not stored for training third-party models." (exact policy TBD with Legal page.)  
- Guest: session-only memory (localStorage), cleared on tab close.  
- Authenticated: optional persist to project scoped table — **off by default** until privacy page defines retention.  
- Never send secrets, payment data, or raw voice samples through chat UI.

### When visible

- **Always** on marketing landing and dashboard (collapsed default).  
- **Hidden** on login/signup full-screen flows and engine focus mode (optional fullscreen toggle later).  
- **Reduced motion:** fab pulse disabled; instant open/close.

---

## 6. Design Section E — Footer & legal surface

### Global footer (marketing + dashboard)

Center-aligned link row (RULE 18):

**Privacy · Legal · Contact · FAQ**

Placement:

- **Marketing** (`/`): footer below hero CTAs, above fold on wide screens only if content short — otherwise sticky-minimal at page bottom.  
- **Dashboard**: replace auth-only mini-footer in `(dashboard)/layout.tsx` with full legal row **plus** sign-in/out on same line or secondary row.

### Routes

| Route | Phase 1 content |
|-------|-----------------|
| `/privacy` | Placeholder structured page: data collected (account, engine inputs, receipts), Supabase/Vercel processors, retention, contact email placeholder, last updated date |
| `/legal` | Terms of use + disclaimers (not legal advice, not trademark counsel); link to Privacy |
| `/contact` | Mailto or form stub + support expectations; empire tier note optional |
| `/faq` | Product FAQ: engines, tiers (Twin/Squad/Empire), guest browse, receipts — chatbot can deep-link anchors |

All pages share genesis/light or phase-aware shell — not raw unstyled markdown.

### Placeholder vs real

- **Phase 1:** Ship **real structure**, **placeholder legal prose** marked "Draft — counsel review required" visible to internal users only OR subtle banner. Do not imply compliance you don't have.  
- **Before public launch:** Replace with counsel-approved Privacy Policy + Terms; remove draft banner.  
- **FAQ:** Can be real product copy day one — sourced from canon and existing docs.

---

## 7. Design Section F — Scope for Phase 1 implementation (after approval)

### Ships first (P0)

1. **Genesis design tokens** — new CSS variables for light genesis phase; keep void tokens for phase 3.  
2. **Landing redesign** — Genesis backdrop component (CSS/SVG particles, no heavy WebGL); copy per Section C; friendly engine names on preview grid; **CTA routes to dashboard without auth**.  
3. **Browse-first shell** — remove genesis-only anonymous lock; session-local draft state; signup modal on submit/deliverable per Section G.  
4. **Metadata + themeColor** — remove cyberpunk positioning from `layout.tsx` SEO.  
5. **Global footer** — four legal routes with placeholder pages; wire marketing + dashboard layouts.  
6. **Chatbot shell** — fab + panel UI, static FAQ responses, route-aware deep links; no LLM required for v1 if timeboxed (optional: single guarded API route).  
7. **Genome UI extensions** — schema migration for `maturityScore` + `theme`; deterministic score updates on gate pass; draft merge on signup.  
8. **Engine nav labels** — friendly primary + mono secondary in Sidebar and landing.  
9. **BalancedText / centered sections** — audit pass on new copy blocks.

### Ships second (P1, same release train if capacity)

9. **Dashboard backdrop phase switch** — VoidBackdrop → GenesisBackdrop based on maturity.  
10. **Constellation map gating** — full interactive map only when `genesisPhase >= 2`.  
11. **Per-engine accent environments** — tint workbench headers per canon palette.  
12. **Performance / reduced-motion** toggles in user menu.

### Deferred (post Phase 1)

- Grand entrance video / avatar montage tunnel  
- Full 6ROXY voice/video onboarding flow  
- Adaptive nav reorder (Approach C)  
- WebGL galaxy / Three.js (unless performance budget wins)  
- Chatbot LLM with genome RAG  
- Seasonal brand variants (canon A19)  
- Sound design pack  

### Explicitly out of scope

- Rewriting engine business logic or MOIRAI pipelines  
- Bulk canon commits  
- Production deploy without separate "ship it" instruction  

### Verification (post-implementation)

- `npm run check`  
- Manual: `/` genesis light, footer links, chatbot open/close, dashboard phase 0 vs mock maturity 80, reduced-motion, 1440px scale wrapper  

---

## 8. Resolved — Browse-first galaxy (2026-06-14)

**Decision:** **Browse-first galaxy** — not genesis-only for anonymous users, and not a fixed demo maturity score.

| Rejected option | Why |
|-----------------|-----|
| Genesis-only until signup | Blocks "I can do this" landing story; contradicts collaboration voice |
| Demo maturity score on marketing | Fake progression; doesn't match real genome evolution |
| **Chosen: Browse-first galaxy** | Full site browse; forms and engine UIs explorable; galaxy map previewable; visuals still **default to Phase 0 Genesis** for first-time anonymous visitors, then reflect **session draft progress** (engines touched, form segments filled) without requiring auth |

Anonymous users see the **product**, not a brochure. Signup gates fire only on **submit / deliverable** (Section G). After auth, genome + maturity drive phase visuals per Sections 2–3.

---

## 9. Design Section G — Browse-first / gate-on-submit UX

### Philosophy

Draw users in: they think **"I can do this"** and start filling things in. **No signup wall at browse.** Gate at the moment value is **generated, persisted, or exported** — then account required. Some actions additionally require **subscription tier** (Twin / Squad / Empire per `PRICING_CANON.json`).

Three access layers:

| Layer | Who | Experience |
|-------|-----|------------|
| **Browse** | Anonymous | All routes visible; engine workbenches load; forms editable; chatbot guides; constellation/galaxy **preview** interactive |
| **Submit** | Authenticated (any tier) | Engine runs, save genome, receipts, handoffs — subject to tier engine access |
| **Deliver** | Tier-qualified | Exports, bulk checks, premium scans, watermark-free outputs |

### Route & surface matrix

| Surface | Anonymous browse | Signup gate (submit) | Tier gate (deliver) |
|---------|------------------|----------------------|---------------------|
| `/` landing | Full genesis hero + engine grid | — | — |
| `/dashboard` | Full shell, sidebar, stepper | — | — |
| `/dashboard/engines/{id}` | Workbench UI, intake forms, step preview | **Run / score / save session** | Engine not in tier → upgrade modal |
| `/dashboard/constellation` | Map preview, node tooltips, "try Name" deep links | Save layout / pin genome | Full warp transitions P1 |
| Engine API `POST /api/engines/{id}` | — | **401 → signup modal** | **403 → upgrade modal** |
| Export bundle | Preview disabled state + copy | **Signup** | **Squad+** for unwatermarked; Twin watermarked or blocked |
| Receipts drawer | Read sample / empty state with explainer | Persist receipt | — |
| Chatbot | FAQ + draft prefill to forms | Persist conversation | — |
| `/privacy`, `/legal`, `/contact`, `/faq` | Always open | — | — |

**Implementation note (design):** Today run APIs return 401 for guests (`CLAUDE.md` gotcha). Phase 1 changes **UI** to allow browse first; API layer keeps 401 on run but UI intercepts with signup modal **before** request when possible, and uses session-local draft until auth.

### Signup modal — trigger points

Show unified **"Save your progress"** modal (not punitive "you must login") at:

1. **Engine run** — user clicks Run / Score / MOIRAI start on any engine  
2. **Save draft** — explicit save or navigate-away with unsaved session-local draft  
3. **Export** — download receipt bundle, PDF, CSV shortlist  
4. **Handoff accept** — moving output to downstream engine with persistence  
5. **Genome write** — any action that writes to `projects` / Brand Genome  
6. **Chat persist** — opt-in "remember this conversation"  
7. **Proxy / 6ROXY** — voice sample upload, avatar config save  

**Do not** gate: scrolling, reading receipts help, opening engines, typing in forms, previewing galaxy, pricing page, FAQ, chat FAQ-only turns.

### Tier gate — trigger points (authenticated)

Use existing `ENGINE_ACCESS` and `ENGINE_LIMITS`; surface **upgrade** modals when:

| Action | Minimum tier | Example copy |
|--------|--------------|--------------|
| Run **Field** (4IELD) crowding scan | Empire | "Field scans need Empire — see who occupies your space" |
| Run **Fortress** (4TRESS) readiness | Empire | "Fortress prep is on Empire" |
| Run **Site** (5ITE) | Empire | — |
| Export without watermark | Squad | "Squad removes watermarks on exports" |
| **Brandle** bulk domain + handle batch | Squad | "Check all handles at once on Squad" |
| **Name** runs beyond monthly cap | Squad or Empire | Twin: 3 runs/mo; upgrade for more |
| **Exec** (3XEC) | Squad | — |

### Recommended naming — browse vs submit vs deliver

Use consistent verbs in UI and analytics:

| Verb | Meaning | Auth |
|------|---------|------|
| **Explore** | Navigate, read, preview | None |
| **Draft** | Fill forms, session-local only | None |
| **Run** | Execute engine pipeline | Signup + tier |
| **Save** | Persist genome / session | Signup |
| **Export** | Deliverable download | Signup + tier |

CTA examples:

- Browse: "Explore dRANb", "Open brandL", "Preview your galaxy"  
- Submit gate: "Run dRANb — sign in to continue", "Save progress"  
- Tier gate: "Export shortlist — upgrade to Squad"

### Session-local draft (anonymous)

- Store in `sessionStorage` keyed by `wivviw_draft_{engineId}` + `wivviw_genome_draft`  
- On successful signup/login: **merge** draft into user project (conflict: server wins on collision, show merge receipt)  
- Banner: subtle, dismissible — "You're exploring — sign in when you save or run"  
- Clear draft on explicit "Start over" or 7-day TTL  

---

## 10. Design Section H — Domain & branding intelligence

**Canonical reference:** `01_RAW_INPUTS/domain-branding/Oracle-Vision_Extension-Menu_Domain-Branding-Reference.md`  
**Product intent:** WiVViW owns steps **1, 2, 5** of the reference fish-finder loop (generate → fan-out fused TLDs → score); steps **3–4** use external APIs on user submit (Spaceship, Domainr/RDAP, Namechk-style) — not at browse time.

### Fish-finder loop → engine pipeline

```
MEANING (intake / genome)
  → 1. GENERATE candidates        [dRANb Name / MOIRAI]
  → 2. FAN OUT fused-TLD bank     [dRANb + brandL Brandle]
  → 3. CHECK availability         [brandL — on submit, batch API]
  → 4. CHECK handles              [brandL — on submit]
  → 5. SCORE survivors            [dRANb rank + 4IELD distinctiveness + 4TRESS TM headroom]
  → 6. RANK shortlist             [genome.shortlist + receipts]
OUTPUT: ranked, ownable names with evidence
```

### Engine requirements (actionable)

#### dRANb — **Name**

- Generate 15–20 on-brand candidates from meaning seed (coined / mythic / Latin + mirror-mark awareness per reference §2 note).  
- For each candidate, **fan out** fused-TLD splits using ending→TLD map (reference §2) plus workhorses (.com, .ai, .io, .co — §1).  
- Attach **avoid-list** flag (§7) on any suggestion using high-abuse TLDs — never recommend as primary.  
- Output **draft shortlist** for anonymous browse; **scored shortlist** only after authenticated run.  
- MOIRAI scoring gate incorporates **fusion quality** and **meaning fit** from rubric §6.

#### brandL — **Brandle**

- **Domain locking:** primary domain selection from scored fused candidates + workhorse fallbacks.  
- On submit: batch availability via Spaceship API / Domainr / RDAP (reference §5) — design for ≤20 parallel checks per run.  
- **Restricted TLD warnings** before user commits (§3): .us nexus, .id presence, .it/.eu, .ly caution — surface in receipt, not legal advice.  
- **Handle consistency pass** (§4): X, Instagram, TikTok, YouTube, LinkedIn, **GitHub org**, Discord, Reddit; one fallback convention per project (`get_`, `try_`, etc.).  
- Receipt records availability snapshot timestamp (domains go stale).

#### 4IELD — **Field**

- **Distinctiveness / SEO** dimension from rubric §6 — crowding gate uses SERP collision + big-brand proximity.  
- Map **fusion quality** to competitive clarity: does the readable brand string survive without the dot?  
- Field scan **browse:** show methodology + sample receipt; **run:** Empire tier.

#### 4TRESS — **Fortress**

- **TM headroom** quick search (§6) — flag Class 35–42 conflicts; not counsel.  
- Readiness checklist includes: restricted TLD eligibility, handle gaps, avoid-list domains rejected, trademark prep milestones.  
- Fortress **browse:** checklist template; **run:** Empire tier.

#### Cross-engine handoffs

| From | To | Payload |
|------|-----|---------|
| Name | Brandle | `ShortlistEntry[]` with fused domains |
| Brandle | Field | `primaryDomain`, handle matrix, crowding inputs |
| Field | Fortress | distinctiveness score, competitor claims |
| Fortress | genome | `claims`, `readinessScore`, TM notes |

### Data sources (design — no keys in repo)

| Source | Use | When |
|--------|-----|------|
| IANA TLD list | Curate §2 bank updates | Admin / periodic refresh |
| Spaceship API | Register-path availability | Submit |
| Domainr / RDAP | Cross-TLD status | Submit fallback |
| Namechk-style | Handle batch | Submit |
| `domain-mcp` | Agent/dev bulk check | Internal tooling optional |

**Moat (product copy):** Raw availability is commodity; **branding intelligence** (generate + fuse + score) is WiVViW/oibid.io layer.

### UI surfaces (browse vs submit)

| Surface | Browse | Submit |
|---------|--------|--------|
| Name candidate cards | Show fused domain **examples** (may be unchecked) | Live availability badges |
| Brandle domain picker | Select preferred fusion; show restricted ⚠ | Batch verify + lock |
| Handle grid | Manual self-report optional | Automated check results |
| Scorecard radar | Explainer + sample | Per-candidate §6 dimensions |
| Fortress TM panel | Educational checklist | Search results + receipts |

---

## 11. Design Section I — Evolution over time (platform tightening)

Aligns owner **evolution** decision with Brand Genome + adaptive UI:

1. **Session 1 (anonymous):** Genesis phase 0, default theme, empty helix — user drafts freely.  
2. **Post-signup:** Draft merges; first engine run adds DNA segments; theme seeds from intake.  
3. **Repeat visits:** Maturity score advances; sidebar suggests **next engine** from handoff graph; copy micro-variation from `copyTone`.  
4. **Longitudinal:** More claims → tighter Fortress checklist; fewer generic suggestions; galaxy nodes brighten per `enginesIgnited`.  
5. **v2 (Approach C):** Workflow reorder from `UsageSignals` — only after opt-in.

Evolution is **earned and data-backed**, not cosmetic randomness. Receipts are the audit trail for every tightening step.

---

*End of spec — owner browse-first + domain intelligence decisions locked 2026-06-14. Approve or revise, then invoke writing-plans for implementation.*
