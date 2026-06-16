# Rizzuals+ — Part 1 of 3 — Product & data (no visual design)

> **Canon (Mar 2026):** **`FUNCTIONAL_SPEC_FOR_EXTERNAL_TOOLS.md`** + **`CONSISTENCY_AND_FACTCHECK.md`** (fact-check / **METHOD MOIRAI**). This part summarizes structure for Lovable; use the main spec if anything conflicts.

**Opening instruction (this block must stay at the top):**

> Build a navigable web app from this spec only. You have full freedom on visual design (layout, color, typography, motion, branding). Do not ask for style references. Do not copy any existing product’s look. Implement behavior and information architecture; mock data and APIs are fine unless we specify real backends. This is Part **1 of 3** (product + data model); Parts 2 and 3 will follow with navigation and AI.

**Optional phase note (append if you want a smaller first build):**

> Phase 1 scope: implement onboarding stub, Hub, Chat, Profile, and placeholder routes to other sections with empty states. Full feature depth can come in a second pass.

---

## Product definition

- **Name:** Rizzuals+ — **private relationship OS** (not therapy; not dating). See main spec for full positioning.
- **Tagline (copy only, not design):** `Connection + Commitment` and `Communication + Compassion` (no middot separators).
- **Users:** Two people (Partner A / Partner B) in one **couple** space. Optional third “participant” in chat: **AI companion** (scaffolding-first; no therapist cosplay).
- **Eligibility:** **18+** at onboarding.
- **Auth:** Google sign-in; each person has their own account; create couple or join partner’s space (**velvet-rope** pairing, e.g. QR).
- **Onboarding (high level):** Sign in → profile (username, photo; optional likeness) → gender / feel preset → optional voice guide → create/join couple.
- **Backend (current reference stack):** Firebase Auth + Firestore (couple-scoped collections). **For rebuild experiments:** any stack or mocked API is OK.
- **AI layer (reference):** Google Gemini (or equivalent). **MVP:** ship **gentle rewrite**, **vibe check**, **daily insight** first; rest stub — see Part 3 and main spec.

---

## Core concepts & data (behavioral)

- **User:** id, name, username, avatar, optional avatarLikeness, xp, level, coupleId, bio, love_language, humor_style, birthDate, gender, themePreference (user-chosen look preset: e.g. two named presets), voiceSettings (enabled, voice name, speed), auditSettings (message audit mode), subscriptionTier, friends[], publicCalendarEnabled, tutorialCompleted, likenessEmojis optional.
- **Couple:** id, partnerA_id, partnerB_id, anniversary, vibe_tags[], location, love_notes[].
- **Message:** shared thread per couple; text, senderId, timestamp, optional ritual flag, reactions map, draft flag, optional metadata.
- **Roles:** PARTNER_A, PARTNER_B, AI (for attribution in chat).
- **RitualCheckIn:** weekly (or cadence) structured answers for each partner; completion flag.
- **RitualSettings:** per-couple toggles for which weekdays have rituals.
- **DeepSlideDraft:** “cool-off” draft message; states draft | rewritten | sent | discarded; AI can rewrite gently.
- **RomanceCard:** title, description, rarity, redeemed flag (reward / vault economy).
- **Milestone:** title, date, type (anniversary, first date, moving in, travel, other), optional description/icon/tags.
- **Issue (“Council” / harmony):** raised by one partner toward the other; title, description, feelings, desired outcome, status, repair action, resolution, optional AI advice.
- **TimeCapsule:** creator, title, content, unlock date, locked state.
- **Agreement:** title, terms[], status draft/active/archived, both partners sign, optional renewal date.
- **DailyPulse:** per day, daily question; each partner mood (great→bad), optional note, optional answer to question.
- **Blueprint (shared life plan):** toggles for calendar, goals, finance, growth, agreements modules. Sub-entities: **BlueprintEvent** (individual/shared/date night), **BlueprintGoal** (steps, cost, status), **BlueprintFinancial** (income/expense/saving), **BlueprintEvaluation** (strengths, weaknesses, growth areas).
- **Challenge:** categories (expression, exploration, restoration, resonance); XP reward; completion.
- **CommunicationExercise:** steps, individual vs partner, category, XP, completion.
- **CommunicationReport:** daily/weekly/monthly; insights, vocabulary hints, tips.
- **FriendRequest** + **SocialEvent:** friend graph; events (duo / group-ish types), RSVP, host, participants.
- **SubscriptionTier:** free → bronze/silver/gold/platinum style ladder; gates features.
- **Perk:** partner discounts (food, travel, therapy, retail, experience) tied to tier.
- **NovelChapter / FutureGlimpse:** optional “novel of your relationship” chapter + optional “future glimpse” image generation features.
- **TriviaQuestion** (where used): in-app trivia gameplay.
- **NuclearBreakupProtocol:** end-of-relationship flow — cooldown, optional export, scorched delete; **legal review** required (see main spec for suggested fields).

---

*End Part 1. Continue with Part 2 in the next message.*
