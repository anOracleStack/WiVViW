# Data Model (MVP)

The key: one canonical **BrandGenome** shared across engines.

## Entities
- Project
- BrandGenome
- EngineRun
- ReceiptEvent
- EvidenceItem
- Claim
- ExportBundle

## Confidence scale
- estimate | likely | verified

## Claims
A claim is any statement the system makes (e.g., "handle likely available").
Evidence items can upgrade a claim to VERIFIED.
