# WiVViW — status, tasks & work log

**Updated:** 2026-05-24 | **Agents:** Do pending tasks top→bottom; log each in **Work log**; commit this file when done.

## Safe to restart?

| Check | Status |
|-------|--------|
| Git `main` on GitHub | Yes — synced with `origin/main` |
| Working tree | Clean (run `git status`) |
| Public app | https://wivviw.com — `/api/health` ok, Supabase env on prod |
| CI on `main` | Green (last push: inngest bump) |
| Local `.env.local` | Gitignored — stays on disk; back up before wipe |
| Fully optimized | No — see pending tasks |

**Disk:** ~5 GB free (99% full). Free space before big installs; Vercel CLI hit `ENOSPC` on 2026-05-24.

**Links:** [GitHub](https://github.com/anOracleStack/WiVViW) · [Prod](https://wivviw.com) · [Vercel](https://vercel.com/anoraclestacks-projects/wivviw)

```bash
cd "/Users/oraclevision/Developer/applications/WiVViW" && npm run dev
```

## Task list (pending)

1. **[Human] Free disk space** — several GB; fixes `ENOSPC` / Vercel CLI.
2. **Confirm prod deploy = `main` HEAD** — Vercel dashboard SHA vs GitHub; `curl https://wivviw.com/api/health`.
3. **Dependabot PRs** — Do not merge inngest 4.x until CI + migration pass. Test Next 16.2.4 branch. Consider merging postcss, @types/node, anthropic-sdk after build+e2e.
4. **Supabase email template** — `token_hash` confirm link per `.env.example`.
5. **Vercel env audit** — Supabase, LLM keys, `INNGEST_EVENT_KEY`, optional `AUTH_ALLOWED_EMAILS`, `NEXT_PUBLIC_APP_URL`.
6. **Inngest prod sync** — `https://wivviw.com/api/inngest` healthy in Inngest UI.
7. **Supabase RLS audit** — tables used by client + APIs.
8. **E2E auth smoke** — Playwright with test user; document CI secrets if needed.
9. **Shared rate limits** — Upstash/Redis for multi-instance Vercel.
10. **`npm audit`** — fix moderate/high without breaking pins.
11. **wivviw.app alias** — DNS + Supabase redirect URLs if used.
12. **Observability** — Vercel Analytics / Speed Insights.
13. **Product** — dRANb + truth on prod with real keys; `06_BUILD/` per `06_BUILD/README.md`.

## Work log

| Date | Item | Outcome |
|------|------|---------|
| 2026-04-19 | GitHub + CI + Dependabot | Repo live, workflows green |
| 2026-04-19 | Auth/API hardening | Callback, proxy, rate limits, health, truth GET ownership |
| 2026-05-21 | Vercel prod | inngest≥3.54; **wivviw.com** live; GitHub auto-deploy connected |
| 2026-05-24 | Pre-restart check | main pushed; prod health OK; task list refreshed for agents |

## Reference

`src/proxy.ts` · `src/app/auth/callback/route.ts` · `.github/workflows/ci.yml` · `.env.example` · `npm run lint` (not `next lint`)
