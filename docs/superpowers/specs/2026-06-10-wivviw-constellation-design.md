# WiVViW Constellation Design Spec

Date: 2026-06-10

## Strategy

Foundation-first: every engine works (API, session, receipts, genome) before galaxy polish.

## Architecture

- Layer 0: Brand Genome, Receipts, Evidence, V4ULT, Export, Confidence, Governance
- Layer 1: Seven engines as standalone apps sharing `engine-contract.ts`
- Layer 2: Galaxy map + DNA ritual (presentation last)

## Agent matrix

Wave 0: contract, events, genome, entitlements, CLAUDE.md, OS UI primitives  
Wave 1: seven OS services in parallel  
Wave 2: engines (dRANb full MOIRAI + stubs for others)  
Wave 3: handoffs + tier gates  
Wave 4: ConstellationMap + per-engine HSL themes  
Wave 5: MOIRAI evals + E2E smoke tests

## Tier map

- Twin: dRANb limited, brandL check, 6ROXY basic, watermarked exports
- Squad: dRANb + brandL + 3XEC + 6ROXY clone + exports
- Empire: all engines + 5ITE + full 6ROXY

Pricing locked in `PRICING_CANON.json` / `src/lib/entitlements/pricing-canon.json`.
