# Rizzuals+ — Part 2 of 3 — Navigation, modals, gamification (no visual design)

> Continuation of the same spec. Part **2 of 3**. Same rules: you choose all visual design; mock data/APIs OK.  
> **Canon:** **`FUNCTIONAL_SPEC_FOR_EXTERNAL_TOOLS.md`** + **`CONSISTENCY_AND_FACTCHECK.md`** (**METHOD MOIRAI**). Treat those as authoritative if this part ever drifts.

---

## Primary navigation (main app views)

The app switches single-page views (no URL router requirement for prototype).

| View ID        | Priority | Purpose (functional) |
|----------------|----------|----------------------|
| **HUB**        | **P0**   | Dashboard: relationship health/snapshot, shortcuts into key modules, tagline area. |
| **CHAT**       | **P0**   | Main 3-way thread (both partners + AI); send text; reactions; drafts; ritual-tagged messages; deep-slide behavior. |
| **SYNC**       | **P0**   | Pairing / sync / alignment; QR/code join; check-ins summary. |
| **ARCHIVE**    | **P1**   | Memories vault: milestones, memory reel, optional media analysis, exports. |
| **MIND_MELD**  | **P2**   | Deeper joint reflection / prompts (implementation open). |
| **QUESTS**     | **P2**   | Challenges / XP — prefer consistency rewards, not “points for vulnerability.” |
| **CELESTIAL**  | **P2**   | Optional oracle / reflective module (content open). |
| **PROTOCOL**   | **P2**   | **Blueprint** hub (calendar, goals, finance, growth, evaluations). Minimal calendar/goals may appear in Hub at **P1**. |
| **COUNCIL**    | **P1**   | Issues; mediation; conflict repair. |
| **FORGE**      | **P2**   | Creation / crafting (implementation open). |
| **SOCIAL**     | **P2**   | Friends, events. |
| **SUBSCRIPTION** | **P0** | Plans; per-couple pricing intent. |
| **WISHLIST**   | **P2**   | Partner wish lists. |
| **PERKS**      | **P1**   | Discounts by tier. |
| **PROFILE**    | **P0**   | Avatar, XP/level, plan, theme, toggles, **Nuclear Breakup Protocol**, privacy copy, tutorial, logout. |

**Agreements:** defer past MVP; see main spec.

---

## Modals & overlays

| Overlay           | Priority | Notes |
|-------------------|----------|--------|
| **Tutorial**      | **P0**   | First-run walkthrough; optional voice per step. |
| **DailyPulse**    | **P0**   | Mood + note + daily question; per couple/day. |
| **ConnectionSession** | **P1** | Repair entry; may open LiveMediation. |
| **LiveMediation** | **P1**   | AI-guided session; wellness framing. |
| **Level-up**      | **P1**   | Keep copy non-cringe. |
| **MemoryReel**    | **P1**   | Milestone reel. |
| **MediaAnalysis** | **P2**   | AI on media (stub OK). |

---

## Gamification & economy

- **XP / level** — reward **cadence**, not emotional performance; avoid gacha-for-marriage.
- **Romance cards** — **P2** emphasis if used heavily.
- **Challenges / exercises** — **P2**.
- **Connection health** — informational, not judgmental scoring.

---

## Notifications

- Browser notifications: enable, test, rituals, anniversaries, deep-slide prompts (prototype may mock).

---

*End Part 2. Continue with Part 3 in the next message.*
