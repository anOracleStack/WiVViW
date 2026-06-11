# BRANDLE OS — Cursor Build Pack (v0.1) — 2026-02-19

This pack adapts the BRANDLE OS canon for building in **Cursor** (code-first), not Lovable.

## What to do (fast path)
1) Open `02_APP_SCAFFOLD/brandle-os-ui/` in Cursor
2) In a terminal:
   - `npm install`
   - `npm run dev`
3) Use the pages/routes as placeholders while you implement real engine logic.
4) Keep the canon locked: `00_CANON/*.txt` is your source-of-truth.

## How to use the canon inside Cursor
- Treat the canon as a **requirements document**, not UI copy.
- Implement the OS “skeleton” first:
  - Stepper flow (Intake → Generate → Evaluate → Shortlist → Decide → Export → Archive)
  - Confidence badges (Estimate / Likely / Verified)
  - Receipts Drawer (inputs → transforms → outputs)
  - V4ULT Timeline (versioned runs; lock/branch/diff)
  - Evidence Vault (upload proof; upgrade claim confidence)

## Architecture summary
- Frontend: React + Vite + TypeScript + Tailwind
- Routing: react-router
- State: Zustand (lightweight)
- Validation: Zod
- Persistence (MVP): localStorage
- Backend (optional): add later. The UI is ready for it.

## Guardrails (don’t drift into “corporate template”)
- Motion: restrained, purposeful, no gimmick.
- Contrast: always readable over backgrounds; respect `prefers-reduced-motion`.
- Glass Box: every score must show the why, assumptions, and confidence.
