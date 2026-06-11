# WiVViW — Agent Playbook

Brand Intelligence OS (Constellation). App repo: lean `src/` only. Canon/archive: `WiVViW-workspace` or local `00_CANON/`, `01_RAW_INPUTS/`.

## Commands

```bash
cd "/Users/oraclevision/Developer/applications/WiVViW"
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
npm run test:e2e
```

## Canon (read first)

- `docs/CANONICAL_SOURCES.md` — what to read
- `docs/ENGINE_SPECS_INDEX.md` — per-engine routes, gates, tiers
- `00_CANON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt`
- `06_BUILD/ui_shell/WiVViW_NextGalaxy_Dashboard.jsx` — galaxy reference (not production)

## Architecture

```
src/lib/engines/engine-contract.ts   # EngineId, registry, gates
src/lib/engines/engine-runner.ts     # Session create + entitlements
src/lib/os/                          # Brand Genome, receipts, export, v4ult
src/lib/entitlements/                # Tier → engine access
src/components/os/                   # Sidebar, stepper, receipts drawer
src/app/api/engines/{engine}/        # One API per standalone app
```

User journey: `dRANb → brandL → 4IELD → 4TRESS → 3XEC → 5ITE → 6ROXY`

## Database

```bash
npx supabase db push   # applies supabase/migrations/
```

Migration `004_constellation_foundation.sql`: projects, user_entitlements, evidence_items, export_bundles.

## Adding an engine

1. Register in `engine-contract.ts`
2. Add `src/lib/engines/{id}.ts` or stub via `stub-engine.ts`
3. Add `src/app/api/engines/{id}/route.ts` + `[session]/route.ts`
4. Add `src/app/(dashboard)/dashboard/engines/{id}/page.tsx`
5. Wire handoff in `handoffs.ts` if downstream consumes output

## Gotchas

- Guest browse: dashboard visible without auth; run APIs return 401
- dRANb MOIRAI: `src/lib/inngest/moirai-simple.ts` (3-stage + scoring gate)
- Do not bulk-commit `00_CANON/` or `01_RAW_INPUTS/` to app `main`
- Prod signup: verify Supabase Auth URLs include `wivviw.com` and `/auth/callback`

## Pricing

`PRICING_CANON.json` — Twin $0, Squad $49/mo, Empire $199/mo
