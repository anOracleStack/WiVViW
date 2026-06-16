# WiVViW Design Voice — Balanced Obscurity

Short cheat sheet for agents and builders. Full spec: `docs/superpowers/specs/2026-06-10-ethereal-genesis-design.md`.

## The balance

**Visual = vibe. Label = function.**

Users must know what something is and does. Cool aesthetic sits on top of sense-making — not instead of it.

- Friendly **and** distinctive — not generic SaaS, not cryptic insider UI  
- Not too much copy; not too little clarity  
- Seed → sale promise on marketing; outcome hints on engines  
- Internal codenames (dRANb, MOIRAI, 4IELD) → mono badges, API, receipts — never primary headlines  

## Copy tiers

| Tier | Where | Length | Job |
|------|-------|--------|-----|
| **Hero** | Landing `/` | 1 headline + 2 balanced lines | Promise: identity → first sale. No jargon. |
| **Engine card** | Landing grid, galaxy nodes | Name + **one outcome line** | What you get. Source: `ENGINE_REGISTRY[id].outcomeHint`. |
| **Engine workbench** | `/dashboard/engines/{id}` | Friendly title + outcome hint + optional collaboration line | Title = `friendlyLabel`. Hint = `outcomeHint`. Intake may add one "we" line (Name only). |
| **Tooltip / map** | Galaxy, node hover | Name only or name + hint on hover | Map needs no "GALAXY" headline over the map. |
| **Gate modal** | Signup on run/save/export | Title + 1–2 lines | "Save your progress" — collaborative, not punitive. |
| **Guide / chatbot** | Bottom-right | Short answers + deep links | FAQ depth on demand; chips for starters. |
| **Footer / legal** | SiteFooter | Link labels only | Privacy · Legal · Contact · FAQ |

## Outcome hints (canonical)

Defined on `EngineMeta.outcomeHint` in `src/lib/engines/engine-contract.ts`:

| Engine | Hint |
|--------|------|
| Name | Find a name worth owning |
| Brandle | Secure your name across the web |
| Field | See who else occupies your space |
| Fortress | Prepare protection — step by step |
| Exec | Turn decisions into daily ops |
| Site | Launch a home for your brand |
| Proxy | Your voice and presence, extended |

## Do / don't (quick)

| Do | Don't |
|----|-------|
| `Name` + quiet outcome under the dot | `dRANb` as the main label |
| Galaxy visual without a redundant section title | "THE CONSTELLATION" over the star map |
| "Start exploring" / "Run Name" | "Explore the shell", MOIRAI eyebrow copy |
| Guest banner: one line about save/run gate | Instructional essays on every page |
| BalancedText line breaks (RULE 19) | One long sentence or three uneven lines |

## Layout rules (carryover)

- **RULE 17:** 1440px scale wrapper — whole UI scales together  
- **RULE 18:** Center-align marketing, headings, CTAs; section labels ALL CAPS when used  
- **RULE 19:** 2–3 lines of similar length for hero and helper copy  

## When adding new copy

1. Pick the tier (hero, card, workbench, modal, chat).  
2. Check `outcomeHint` before inventing new engine descriptions.  
3. Read it aloud: would a first-time founder know what to do?  
4. If the visual already communicates place/mood, skip the redundant label.  
5. If the visual is abstract (engine icon, dot on map), add the outcome hint.
