# Engine Specs Index

Canon extraction matrix for WiVViW Constellation. Source: `01_RAW_INPUTS/brandle_os_v2.5/`, `00_CANON/`, BuildPack.

| Engine | Route | Tier | Gate | Canon source |
|--------|-------|------|------|--------------|
| dRANb | `/dashboard/engines/dranb` | Twin (limited) / Squad+ | Shortlist 3–7 names | Part 1 Implementation Pack, MOIRAI ThreadVault |
| brandL | `/dashboard/engines/brandl` | Squad+ | Primary domain confirmed | Part 4 handoff packs |
| 4IELD | `/dashboard/engines/4ield` | Empire | Crowding &lt; 67 | Engramaestro 4IELD design (God Mode gap) |
| 4TRESS | `/dashboard/engines/4tress` | Empire | Readiness &gt; 40 | 4TRESS pack (truncated — stub flags) |
| 3XEC | `/dashboard/engines/3xec` | Squad+ | Plan QC rubric | Master Release Pack v2.5 |
| 5ITE | `/dashboard/engines/5ite` | Empire | Lighthouse &gt; 90 | Metaverse expansion modules |
| 6ROXY | `/dashboard/engines/6roxy` | Twin basic / Squad clone / Empire | Calibration | Twin Mode Health Gauge v1.7 |
| V4ULT | `/dashboard/vault/v4ult` | Twin+ | — | Part 3 Timeline implementation |

## Layer 0 OS

| Service | Route / API | Canon |
|---------|-------------|-------|
| Brand Genome | `/api/os/projects` | BuildPack ARCHITECTURE Layer 0 |
| Receipts | `/api/os/receipts` | Truth kernel, receipts drawer |
| Evidence Vault | `/dashboard/vault/evidence` | Evidence Vault implementation pack |
| V4ULT Timeline | `/api/os/v4ult` | Part 3 ThreadVault |
| Export Chamber | `/api/os/exports` | Export bundles, watermark by tier |
| Confidence | `ConfidenceBadge` component | Estimate / Likely / Verified |
| Governance | `audit_log` table | Tiered access security v2.5 |

## User journey order

`dRANb → brandL → 4IELD → 4TRESS → 3XEC → 5ITE → 6ROXY` (ongoing: V4ULT)

## Known gaps

See `docs/CANONICAL_SOURCES.md` — 4IELD God Mode, A11–A25 bodies, truncated 4TRESS.
