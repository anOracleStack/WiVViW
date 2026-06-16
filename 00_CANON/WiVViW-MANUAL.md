# WiVViW Build Manual
## Your Step-by-Step Guide for Cursor + Claude Code

---

## BEFORE YOU START

### What you need installed
1. Node.js 20+ (run `node --version` to check)
2. Cursor IDE (download from cursor.com if you don't have it)
3. Claude Code extension enabled in Cursor (Settings > Extensions > search "Claude Code")
4. Git (run `git --version` to check)
5. A Supabase account (supabase.com — free tier works for Phase 1)
6. API keys for: OpenAI, Google AI, Anthropic, DeepSeek (optional but recommended)

### What you'll receive in this package
- This manual (MANUAL.md) — your human guide, follow it step by step
- .cursorrules — drop this in your project root. Claude Code reads it automatically.
- PROJECT-CONTEXT.md — the full architecture. Feed this to Claude Code at the start.
- SCHEMA.sql — the complete database migration. Claude Code will use this.
- PROMPTS-SEED.sql — the seed data for dRANb prompts and scoring templates.
- PROVIDERS.ts — the upgraded provider module with March 2026 models.

---

## PHASE 0: PROJECT SETUP (You do this manually)

### Step 0.1 — Create the project

Open your terminal (not Cursor yet). Run these commands:

```
npx create-next-app@latest wivviw-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When prompted:
- Would you like to use TypeScript? YES
- Would you like to use ESLint? YES
- Would you like to use Tailwind CSS? YES
- Would you like your code inside a `src/` directory? YES
- Would you like to use App Router? YES
- Would you like to use Turbopack? YES
- Would you like to customize the import alias? YES (use @/*)

### Step 0.2 — Open in Cursor

```
cd wivviw-app
cursor .
```

This opens Cursor in your project directory.

### Step 0.3 — Drop in the .cursorrules file

Copy the `.cursorrules` file from this package into the ROOT of `wivviw-app/`. This is the file that tells Claude Code who it is, what it's building, and how to behave. Claude Code reads this automatically on every interaction.

### Step 0.4 — Create the docs folder

In Cursor's file explorer, create a folder called `docs/` in the project root. Copy these files into it:
- PROJECT-CONTEXT.md
- SCHEMA.sql
- PROMPTS-SEED.sql
- PROVIDERS.ts

These are your reference documents. You'll tell Claude Code to read them.

### Step 0.5 — Create .env.local

In the project root, create `.env.local` with your keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

OPENAI_API_KEY=sk-...
GOOGLE_AI_KEY=AI...
ANTHROPIC_API_KEY=sk-ant-...
DEEPSEEK_API_KEY=sk-...

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

To get Supabase keys:
1. Go to supabase.com > your project > Settings > API
2. Copy the Project URL, anon public key, and service_role key

### Step 0.6 — Install dependencies

In Cursor's terminal (Ctrl+` to open), run:

```
npm install @supabase/supabase-js @supabase/ssr inngest openai @google/generative-ai @anthropic-ai/sdk zod uuid
npm install -D @types/uuid
```

### Step 0.7 — Initialize Supabase

```
npx supabase init
npx supabase link --project-ref YOUR_PROJECT_REF
```

Your project ref is the string after `https://` and before `.supabase.co` in your project URL.

---

## PHASE 0.5: FOUNDATION (Claude Code builds this)

From here forward, you're talking to Claude Code inside Cursor. Open the Claude Code panel (Cmd+Shift+P > "Claude Code" or use the sidebar icon).

### Prompt 1 — Load context

Copy and paste this EXACTLY into Claude Code:

```
Read the file docs/PROJECT-CONTEXT.md. This is the full architecture for WiVViW, a premium AI operating system. You are the lead execution architect. Confirm you understand the system by listing: (1) the tech stack, (2) the 4 LLM providers, (3) the MOIRAI pipeline stages, and (4) the Phase 1 build sequence.
```

Wait for Claude Code to respond. Verify it understood correctly before continuing.

### Prompt 2 — Database migration

```
Read docs/SCHEMA.sql. Create the file supabase/migrations/001_foundation.sql with this exact content. Then run: npx supabase db push
```

If it errors on the push (usually because Supabase isn't linked), fix that first, then re-run.

### Prompt 3 — Seed data

```
Read docs/PROMPTS-SEED.sql. Create the file supabase/seed/001_dranb_defaults.sql with this content. Then run: npx supabase db push
```

Note: Supabase seed files may need to be run separately. If the push doesn't include seeds, tell Claude Code:

```
Run this SQL directly against the database: [paste the seed SQL]
```

Or run it manually in Supabase's SQL Editor (Dashboard > SQL Editor > paste > Run).

### Prompt 4 — Supabase client libraries

```
Create the Supabase client files:
- src/lib/supabase/client.ts (browser client using createBrowserClient)
- src/lib/supabase/server.ts (server client using createServerClient with cookies)
- src/lib/supabase/admin.ts (service role client for backend operations)

Use @supabase/ssr for client and server. Use @supabase/supabase-js for admin. Read env vars from process.env.
```

### Prompt 5 — Auth middleware

```
Create src/middleware.ts that:
1. Creates a Supabase server client
2. Checks for authenticated user session
3. Public routes (/, /login, /apply, /waiting, /api/inngest) pass through
4. No session → redirect to /login
5. Session exists → query wivviw_users table for status
6. Status !== 'accepted' → redirect to /waiting
7. Status === 'accepted' → allow through

Use the Next.js middleware matcher to exclude static files and images.
```

### Prompt 6 — Provider module

```
Read docs/PROVIDERS.ts. Create src/lib/providers/index.ts with this content. This is the unified LLM provider module with:
- 4 providers (OpenAI GPT-5.2, Google Gemini 2.5 Pro, Anthropic Claude Sonnet 4.6, DeepSeek V3.2)
- Tiered model routing (simple/medium/complex/critical)
- Retry with exponential backoff (2 retries)
- Fallback chain with pre-flight health check
- March 2026 pricing with prompt cache awareness
- Cost estimation per MOIRAI run
```

### Prompt 7 — Inngest setup

```
Create these files:
1. src/lib/inngest/client.ts — Initialize Inngest client with id "wivviw"
2. src/app/api/inngest/route.ts — Inngest serve endpoint (GET, POST, PUT handlers)

Install inngest if not already: npm install inngest
```

---

## PHASE 1: CORE SYSTEMS (Claude Code builds this)

### Prompt 8 — Event bus

```
Create src/lib/events/bus.ts:
- Export function emitEvent(sessionId, eventType, payload)
- Inserts into the event_log table via supabaseAdmin
- Event types: moirai.step.started, moirai.step.completed, moirai.step.failed, truth.verified, truth.conflicted, scoring.passed, scoring.failed, dranb.candidates.generated, dranb.candidates.audited, dranb.candidates.finalized
- The event_log table has Supabase Realtime enabled so the frontend gets live updates
```

### Prompt 9 — Prompt registry

```
Create src/lib/prompts/registry.ts with two functions:
1. getActivePrompt(engineKey, moiraiStage, taskType) — queries prompt_registry table for the active prompt matching those params, returns the prompt_text string
2. interpolatePrompt(template, vars) — replaces all {{key}} placeholders in the template with values from the vars object

These are used by MOIRAI to load versioned prompts before each LLM call.
```

### Prompt 10 — Truth Kernel

```
Create src/lib/truth/kernel.ts with:

Types:
- TruthState: "verified" | "unverified" | "conflicted" | "queued" | "error"
- Receipt: { id, claim_id, source, evidence, confidence, truth_state, content_hash }
- QuorumResult: { verdict: TruthState, confidence, agreeing_sources, conflicting_sources, details }

Functions:
1. storeReceipt(claimId, source, evidence, confidence, sessionId?) — stores in receipts_ledger with SHA-256 content hash. Deduplicates by hash.
2. getReceipts(claimId) — retrieves all receipts for a claim
3. evaluateQuorum(receipts[]) — 3+ agree = verified, 2 agree + 1 conflict = conflicted, <2 = unverified
4. verify(claimId) — runs getReceipts + evaluateQuorum, updates all receipts with resolved state, returns QuorumResult
```

### Prompt 11 — MOIRAI simple pipeline

```
Create src/lib/inngest/moirai-simple.ts:

This is an Inngest function called "moirai-simple-pipeline" triggered by event "moirai/simple.run".

Input: { session_id, engine_key, task_type, brief, complexity }

The pipeline has 3 stages run sequentially via step.run():

Stage 1 (Clotho): 
- Load active prompt from prompt_registry (engine_key, "clotho", task_type)
- Interpolate the brief into the prompt
- Call the provider for Clotho based on TASK_TIERS[complexity]
- Store result in moirai_packages (step_number: 1, package_type: "deliverable")
- Emit "moirai.step.completed" event

Stage 2 (Lachesis):
- Load prompt for "lachesis" stage
- Interpolate brief + previous_output (from stage 1)
- Call Lachesis provider
- Store in moirai_packages (step_number: 2)
- Emit event

Stage 3 (Eunoia):
- Load prompt for "eunoia" stage
- Interpolate brief + clotho_output + lachesis_output
- Call Eunoia provider
- Store in moirai_packages (step_number: 3)
- Emit event

After all 3: update odyssey_sessions state to moirai_status: "completed"

Use the TASK_TIERS from providers/index.ts to select the correct model per stage based on complexity.
For "simple" complexity, skip lachesis and eunoia (single pass only).

Important: Use upsert with onConflict on (session_id, step_number, package_type) for idempotency.
```

### Prompt 12 — Register MOIRAI in Inngest serve

```
Update src/app/api/inngest/route.ts to import moiraiSimple from src/lib/inngest/moirai-simple.ts and add it to the functions array in the serve() call.
```

### Prompt 13 — dRANb engine logic

```
Create src/lib/engines/dranb.ts:

Types:
- DranbBrief: { business_description, target_audience, tone_keywords[], avoid_keywords[], industry, competitive_context?, additional_notes? }

Functions:
1. startDranb(userId, brief, complexity = "complex") — creates odyssey_session, formats brief text, sends "moirai/simple.run" event to Inngest, returns sessionId
2. getDranbSession(sessionId, userId) — gets session + all moirai_packages, parses final output JSON, returns structured session data
3. listDranbSessions(userId) — returns all dRANb sessions for user ordered by newest first

The formatBrief function should create a clean text block from the brief fields. 
The parseFinalOutput function should try JSON.parse on the stage 3 deliverable content, with fallback to raw content if parsing fails.
```

### Prompt 14 — dRANb API route

```
Create src/app/api/engines/dranb/route.ts:

POST handler:
- Auth check via createClient server
- Validate body with zod schema matching DranbBrief
- Call startDranb(user.id, brief)
- Return { session_id, status: "running" }

GET handler:
- Auth check
- If ?session_id param, return that specific session via getDranbSession
- Otherwise, return list via listDranbSessions
```

### Prompt 15 — Dashboard layout

```
Create src/app/(dashboard)/layout.tsx:
- Top nav bar with WiVViW logo/text (left), engine links (dRANb, drandL — center/right), Settings link
- Dark theme: bg-black, text-white, border-zinc-800 borders
- Renders children below nav

Create src/app/(dashboard)/page.tsx:
- Simple odyssey home page with WiVViW heading and description
- Links to available engines
```

### Prompt 16 — dRANb frontend page

```
Create src/app/(dashboard)/engines/dranb/page.tsx as a client component:

Three states: "brief" | "running" | "results"

Brief state:
- Form with fields: business_description (textarea), target_audience (input), industry (input), tone_keywords (comma-separated input), avoid_keywords (comma-separated input), competitive_context (textarea, optional), additional_notes (textarea, optional)
- Submit button that POSTs to /api/engines/dranb
- On success, transition to "running" state

Running state:
- Show 3 MOIRAI stages with status indicators (Clotho, Lachesis, Eunoia)
- Poll GET /api/engines/dranb?session_id=X every 5 seconds
- Subscribe to Supabase Realtime on event_log table filtered by session_id for live updates
- When status === "completed" or "failed", transition to "results"
- Show message: "This typically takes 30-90 seconds. Pipeline continues server-side if you close this page."

Results state:
- Display finalists as cards with: name, pronunciation, rationale, per-category score bars (8 categories), risk note, confidence percentage
- Display dark horse candidate if present (highlighted differently)
- Display eliminated candidates with reasons
- Display synthesis notes
- "New Session" button to reset to brief state
- Fallback: if JSON parsing failed, show raw MOIRAI output in a pre block

Dark theme throughout. Use Tailwind utility classes. No external UI libraries needed.
```

### Prompt 17 — Landing page and auth pages

```
Create src/app/page.tsx:
- Centered WiVViW title, subtitle "Premium AI Operating System"
- Two buttons: "Enter" (links to /login) and "Apply" (links to /apply)
- Full-screen dark background

Create src/app/(auth)/login/page.tsx:
- Simple email/password login form using Supabase Auth signInWithPassword
- Link to /apply for new users
- Redirect to / on success

Create src/app/(auth)/apply/page.tsx:
- Placeholder intake page with message: "Applications are currently by invitation only. Contact us for access."
- This will be expanded in a later phase

Create src/app/(auth)/waiting/page.tsx:
- Message: "Your application is under review. You will be notified when access is granted."
- Clean, minimal design

Create src/app/layout.tsx:
- HTML with dark class, black background, white text, antialiased
- Import globals.css with Tailwind directives
```

### Prompt 18 — Verify and test

```
Run npm run build to check for TypeScript errors. Fix any errors found. Then run npm run dev and verify:
1. The landing page renders at localhost:3000
2. The middleware redirects unauthenticated users from /engines/dranb to /login
3. The API route at /api/inngest responds (needed for Inngest dev server)
4. No console errors in the browser
```

---

## PHASE 1 COMPLETE CHECKLIST

After all 18 prompts, verify you have these files:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── apply/page.tsx
│   │   └── waiting/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── engines/
│   │       └── dranb/
│   │           └── page.tsx
│   └── api/
│       ├── inngest/route.ts
│       └── engines/
│           └── dranb/route.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── inngest/
│   │   ├── client.ts
│   │   └── moirai-simple.ts
│   ├── truth/
│   │   └── kernel.ts
│   ├── events/
│   │   └── bus.ts
│   ├── prompts/
│   │   └── registry.ts
│   ├── engines/
│   │   └── dranb.ts
│   └── providers/
│       └── index.ts
├── middleware.ts
supabase/
├── migrations/
│   └── 001_foundation.sql
└── seed/
    └── 001_dranb_defaults.sql
docs/
├── PROJECT-CONTEXT.md
├── SCHEMA.sql
├── PROMPTS-SEED.sql
└── PROVIDERS.ts
.cursorrules
.env.local
```

---

## TESTING dRANb END-TO-END

### Step 1: Create a test user

Go to Supabase Dashboard > Authentication > Users > Add User.
Create a user with email/password. Note the user's UUID.

Then go to SQL Editor and run:
```sql
INSERT INTO wivviw_users (id, email, status)
VALUES ('THE-UUID-FROM-AUTH', 'your@email.com', 'accepted');
```

### Step 2: Start Inngest dev server

In a separate terminal:
```
npx inngest-cli@latest dev
```

This opens a dashboard at localhost:8288.

### Step 3: Start Next.js

```
npm run dev
```

### Step 4: Test the flow

1. Go to localhost:3000/login
2. Log in with your test user
3. Navigate to /engines/dranb
4. Fill in the brief form and submit
5. Watch the MOIRAI pipeline execute in the Inngest dashboard
6. See results appear in the dRANb UI

If a provider fails (missing API key etc.), the fallback chain should route to the next available provider.

---

## TROUBLESHOOTING

**"Module not found" errors**: Run `npm install` again. Check that all packages are in package.json.

**Supabase connection fails**: Verify .env.local has the correct URL and keys. Make sure the Supabase project is not paused (free tier projects pause after inactivity).

**Inngest functions don't trigger**: Make sure the Inngest dev server is running AND the Next.js dev server is running. Inngest discovers functions by hitting your /api/inngest endpoint.

**MOIRAI runs timeout**: This is expected if all providers fail. Check your API keys. Check the provider_health table in Supabase for status.

**RLS blocks queries**: Service role client (admin.ts) bypasses RLS. Browser/server clients respect RLS. If data isn't appearing, check that RLS policies match the authenticated user's ID.

---

## WHAT COMES NEXT (Phase 2+)

After Phase 1 is solid:
- drandL engine (domain/handle verification)
- Visual Identity engine (logo/color/typography)
- Quality scoring engine with evolving frameworks
- React Three Fiber Ethereal Cosmos (3D environment)
- Theatre.js genesis animation sequence
- ElevenLabs voice cloning (6ROXY)
- Connected Stack Layer
- Outbound Approval Queue

Each of these follows the same pattern: tell Claude Code what to build, reference the architecture docs, and execute step by step.
