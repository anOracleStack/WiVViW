# WiVViW Design Voice — Balanced Obscurity

Short cheat sheet for agents and builders. Full spec: `docs/superpowers/specs/2026-06-10-ethereal-genesis-design.md`.

## The balance

**Visual = vibe. Label = branded name + outcome hint.**

Users must know what something is and does. Cool aesthetic sits on top of sense-making — not instead of it.

- Branded **and** distinctive — not generic SaaS, not renamed friendly labels  
- Not too much copy; not too little clarity  
- Seed → sale promise on marketing; outcome hints on engines  
- Branded spellings (dRANb, 4IELD, brandL) are **primary headlines** everywhere user-facing  
- Optional pronunciation sublabels (`friendlyLabel`) — mono, tiny, secondary only  

## Copy tiers

| Tier | Where | Length | Job |
|------|-------|--------|-----|
| **Hero** | Landing `/` | 1 headline + 2 balanced lines | Promise: identity → first sale. No jargon. |
| **Engine card** | Landing grid, galaxy nodes | Branded name + **one outcome line** | What you get. Name = `label`. Hint = `outcomeHint`. |
| **Engine workbench** | `/dashboard/engines/{id}` | Branded title + outcome hint + optional collaboration line | Title = `label`. Hint = `outcomeHint`. Intake may add one "we" line (dRANb only). |
| **Tooltip / map** | Galaxy, node hover | Branded name only or name + hint on hover | Map needs no "GALAXY" headline over the map. |
| **Gate modal** | Signup on run/save/export | Title + 1–2 lines | "Save your progress" — collaborative, not punitive. |
| **Guide / chatbot** | Bottom-right | Short answers + deep links | FAQ depth on demand; chips for starters. |
| **Footer / legal** | SiteFooter | Link labels only | Privacy · Legal · Contact · FAQ |

## Outcome hints (canonical)

Defined on `EngineMeta.outcomeHint` in `src/lib/engines/engine-contract.ts`.  
Branded `label` is the hero name; hints provide clarity — not renamed labels.

| Engine | Branded label | Hint |
|--------|---------------|------|
| dRANb | dRANb | Find a name worth owning |
| brandL | brandL | Secure your name across the web |
| 4IELD | 4IELD | See who else occupies your space |
| 4TRESS | 4TRESS | Prepare protection — step by step |
| 3XEC | 3XEC | Turn decisions into daily ops |
| 5ITE | 5ITE | Launch a home for your brand |
| 6ROXY | 6ROXY | Your voice and presence, extended |
| V4ULT | V4ULT | Your brand story over time |

## Do / don't (quick)

| Do | Don't |
|----|-------|
| `4IELD` + quiet outcome under the dot | `Field` or `Forcefield` as the main label |
| `dRANb` in nav, cards, workbench titles | `Name` as primary display name |
| Galaxy visual without a redundant section title | "THE CONSTELLATION" over the star map |
| "Start exploring" / "Run dRANb" | "Explore the shell", MOIRAI eyebrow copy |
| Guest banner: one line about save/run gate | Instructional essays on every page |
| BalancedText line breaks (RULE 19) | One long sentence or three uneven lines |
| Tiny mono pronunciation under nav item (optional) | Pronunciation as hero headline |

## Layout rules (carryover)

- **RULE 17:** 1440px scale wrapper — whole UI scales together  
- **RULE 18:** Center-align marketing, headings, CTAs; section labels ALL CAPS when used  
- **RULE 19:** 2–3 lines of similar length for hero and helper copy  

## When adding new copy

1. Pick the tier (hero, card, workbench, modal, chat).  
2. Use `label` for branded display name; check `outcomeHint` before inventing new descriptions.  
3. Read it aloud: would a first-time founder know what to do?  
4. If the visual already communicates place/mood, skip the redundant label.  
5. If the visual is abstract (engine icon, dot on map), add the outcome hint.
