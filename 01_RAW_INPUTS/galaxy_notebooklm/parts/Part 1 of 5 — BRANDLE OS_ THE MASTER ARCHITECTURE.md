# BRANDLE OS: THE MASTER ARCHITECTURE

Version: 1.1 (Production-Grade / "Next-Galaxy Edition")  
Date: 2026-02-02  
Core Philosophy: "Decisions are the real product." / "If it’s not visible, it’s not trustworthy."

## 1\. FOUNDATION & VISION

### 1.1 The Brandle Ecosystem

Brandle is not just a naming tool; it is decision infrastructure for identity in a scarce digital world. It operates where legal, social, and linguistic constraints intersect—without crossing compliance lines.  
The Stack (Execution Order):

1. dRANb: The Naming Engine. Generates, evaluates, and de-risks brand names.  
2. brandL: The Identity Consolidation Engine. Activates after shortlist. Handles domains, social handles, and digital footprint.  
3. 4IELD: The Intelligence Layer. Maps the competitive landscape, saturation, and risk zones.  
4. 4TRESS: The Protection Assistant. Guides trademark readiness and filing preparation (Non-Legal).  
5. V4ULT: The Universal Archive. A shared, immutable history of every run, decision, and artifact.

### 1.2 Core Principles (Non-Negotiables)

* Trust-First: No hype. No "guaranteed" availability. Always "best-effort estimates" and "confidence levels."  
* No Scraping Assumptions: The system relies on heuristics and user-provided data/APIs. It does not claim to scrape platforms in violation of TOS.  
* No Legal Advice: The system provides informational guidance, readiness scores, and risk signals. It never provides legal conclusions or guarantees registration.  
* Procedural Intelligence: We do not just generate ideas; we generate proof (receipts, scores, trade-offs).

### 1.3 The Benediction

"Choose a name like an architect: with intention, constraints, and receipts. dRANb gives you the receipts. A fortress is not a threat. It is a structure that prevents regret. Make it visible. Make it calm. Make it decisive."  
---

## 2\. ENGINE I: dRANb (AI BRAND NAMING)

Role: Procedural Brand-Naming Intelligence.  
Pronunciation: "dranb" (Brand, reflected/inverted).  
Tone: Calm, intelligent, procedural, non-hype.

### 2.1 Core Workflow

The UI keeps a single decision thread: Intake → Generate → Evaluate → Compare → Shortlist → Decide → Export.

### 2.2 Brand Intake (Data Model)

Inputs are stored as a structured BrandBrief.  
Fields:

* Business Description: 1–3 paragraphs.  
* Industry/Category: Selected \+ custom.  
* Target Audience: Demographics \+ psychographics (Who / Where / Why).  
* Value Proposition: One sentence.  
* Future Expansion: 5–10 years vision (scale, offerings, regions, exits).  
* Competitor Set: Optional list (5–50 names) to avoid resembling.  
* Constraints: Forbidden words, syllable range, style notes.

Brand Personality Sliders (0–100):

* Classic ↔ Modern  
* Minimal ↔ Expressive  
* Serious ↔ Playful  
* Technical ↔ Human  
* Luxury ↔ Accessible  
* Bold ↔ Calm  
* Abstract ↔ Literal

Risk Tolerance:

* Conservative: Low invention, low spelling friction.  
* Balanced: Default.  
* Adventurous: More coined, higher weirdness comfort.

### 2.3 Name Generation Engine

Generation produces multiple NameSets per project. Each NameSet is tagged by mode \+ parameters.  
Generation Families (Modes):

1. Semantic: Meaning-driven, non-generic. Meaning-forward without generic category keywords.  
2. Phonetic: Sound-first, easy to say. Smooth mouthfeel, low spelling ambiguity.  
3. Abstract/Coined: New words, high ownability. Invented but pronounceable.  
4. Modified Real Words: Controlled distortion, near-miss. Subtle mutation; avoid obvious SEO phrases.  
5. Symbolic/Metaphorical: Story-first, evocative. Indirect metaphor; not literal descriptors.  
6. Ownable Near-Miss: Spellings that remain pronounceable. Controlled distortion; keep clarity high.

Anti-Generic Filters:

* System blocklist of category staples (user \+ system).  
* Reject "two keyword SEO" patterns by default (e.g., BestX, MyX, XHub).  
* Penalize "app/pro/hub/ai/ly" endings unless explicitly desired.  
* Avoid category stuffing (TravelToursNow).

Prompting Logic:

* Core System Style: Tone is calm, procedural, precise. Output is JSON only. No commentary.  
* Wildcard Prompt: One per batch, tuned to the user's risk tolerance.

### 2.4 Name Evaluation System (Scoring)

Scores are not truth; they are decision aids. Scores reflect tradeoffs.  
Scale: 0–100 per dimension. Overall is weighted sum with caps & penalties.  
Scoring Categories:

1. Memorability: Stickiness after one read. Short, distinctive, rhythmic, recall performance.  
2. Pronunciation Clarity: Say-it-right likelihood. Phoneme simplicity, ambiguity.  
3. Spelling Friction: Type-it-right likelihood. Likely misspell rate, dictation mismatch signal.  
4. Distinctiveness: Not easily confused. Distance from competitor set \+ category saturation.  
5. Brand Alignment: Matches brief \+ sliders \+ stated values.  
6. Scalability: Can expand offerings/regions. Works as umbrella, product lines, future markets.  
7. Collision Risk: High-level only (non-legal). Best-effort similarity \+ crowdedness \+ genericness penalty.

Penalties (Examples):

* High ambiguity spelling: \-10 to \-35  
* Competitor resemblance: \-15 to \-50 (based on similarity)  
* Generic keyword presence: \-10 to \-40  
* Awkward sub-brand expansions: \-10 to \-25

Validation Labs (Optional/Moat Features):

* Pronounce Lab: TTS playback \+ "heard correctly?" check.  
* Spell Lab (Dictation): Hear name → type what you think it is (friction score).  
* Recall Lab: 5-second exposure → type from memory (memorability score).

### 2.5 Comparison & Shortlisting

Comparison Matrix:

* Shows category scores.  
* Top strengths (3) \+ Top risks (3).  
* Digital viability signals.  
* "What it enables" narrative.

Shortlist Categories:

* Strong \+ Safe: High clarity, low friction, lower collision proxy.  
* Strong \+ Bold: Distinctive, scalable, manageable friction.  
* Creative Risk: High novelty, higher friction or ambiguity.

### 2.6 Digital Viability Signals (Best-Effort)

MVP uses heuristics only. Phase 2 adds optional external lookups.

* Domain Likelihood: Available / Premium / Likely Taken \+ Confidence.  
  * Likely Taken (High): Common dictionary word, short 3-5 letters with simple phonetics, obvious industry keyword.  
  * More Available (Higher): Coined 6-10 letters, pronounceable, uncommon phoneme sequences.  
  * Premium-Prone: Short, clean, high brand appeal (4-6 letters), English-like but not common.  
*   
* Handle Likelihood: Per platform (IG, X, TikTok, YouTube) \+ Confidence.  
* Linguistic Conflicts: Unintended meanings, profanity proximity, homographs.  
* Category Saturation: Similarity to common naming patterns in category.

### 2.7 Export: Name Decision Report

The paid artifact. Designed to be copy/paste-ready for teams, investors, designers, and developers.  
Report Content:

* Chosen Name: Final selection.  
* Pronunciation: Simple phonetic.  
* Rationale: 3–7 bullets (1-line rationale).  
* Score Summary: Category scores \+ overall.  
* Risk Notes: What could go wrong \+ mitigations.  
* Digital Viability Signals: Estimates \+ confidence labels.  
* Next Steps: Domain/handle checks, trademark counsel prompt.  
* Copy Blocks: Tagline seed, elevator line, naming rules.  
* Formats: PDF \+ TXT \+ JSON (structured).