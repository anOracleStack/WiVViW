# WiVViW — saved status (resume here)

Last context: private preview lockdown, build fixes, Next.js 16 proxy migration, ESLint wired.

## Run the app

```bash
cd "/Users/oraclevision/Developer/applications/WiVViW"
npm run dev
```

Open **http://localhost:3000** (port 3000).

- Production-style: `npm run build` then `npm run start`
- Lint: `npm run lint` (see below — do not use `next lint` alone)

## Private preview (staging/production)

When **`SITE_ACCESS_PASSWORD`** is set (non-empty), the site requires **HTTP Basic Auth** and sends **noindex** / restrictive **robots.txt**.

- Optional: **`SITE_ACCESS_USER`** (default `preview`)
- **`/api/inngest`** stays open for Inngest webhooks
- Leave password **unset** for normal local dev (no browser login)

See `.env.example` for placeholders.

## Important files

| Area | Location |
|------|-----------|
| Request gate (Basic Auth + headers) | `src/proxy.ts` |
| Lock detection | `src/lib/site-access-locked.ts` |
| Robots | `src/app/robots.ts` |
| Metadata when locked | `src/app/layout.tsx` (`generateMetadata`) |
| Turbopack root (fixes wrong lockfile parent) | `next.config.ts` |
| ESLint flat config | `eslint.config.mjs` |
| Supabase admin + `requireSupabaseAdmin()` | `src/lib/supabase/admin.ts` |

## Build / TypeScript

- **`docs/PROVIDERS.ts`** — guards for `supabaseAdmin` possibly null
- API / Inngest / prompts use **`requireSupabaseAdmin()`** or early returns where appropriate

## Lint note

`next lint` can error with a bogus path (`.../WiVViW/lint`). Use:

```bash
npm run lint
```

which runs ESLint on `src`, `docs`, and root `*.ts` configs.

## Next.js 16

- **`middleware.ts` removed** — use **`src/proxy.ts`** with `export function proxy`
- Deprecation warning for middleware should be gone after this migration

## Task list (at a glance)

### Code / CI — done (last verified)

- `npm run lint` — clean
- `npm run build` — green (Next.js 16.1.6, Turbopack)
- `.cursorignore` — present (secrets + build noise)

### Fill out (env + database — required for full runtime)

Copy `.env.example` → `.env.local` and set real values:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin (API routes, Inngest) |
| `SUPABASE_DB_URL` | Local Supabase CLI / migrations (optional if you use hosted only) |
| At least one of `OPENAI_API_KEY`, `GOOGLE_AI_KEY`, `ANTHROPIC_API_KEY` | MOIRAI / providers |
| `INNGEST_EVENT_KEY` | Async pipelines (Inngest) |

Then apply schema + seed:

- `supabase/migrations/001_foundation.sql`
- `supabase/seed/001_dranb_defaults.sql`  
  (via Supabase CLI or paste into SQL editor — see Supabase docs for your workflow)

Optional staging lock: `SITE_ACCESS_PASSWORD` (+ optional `SITE_ACCESS_USER`).

### Product / roadmap (optional next steps)

- Supabase Auth + email allowlist (stronger than Basic Auth alone)
- Confirm RLS on Supabase tables if anon key is in the client
- Remove stray **`package-lock.json`** in home folder if you want to avoid future monorepo/root confusion (project already sets `turbopack.root`)
- Drop launch / truth-kernel / UI shell artifacts into `06_BUILD/` (see `06_BUILD/README.md`)
