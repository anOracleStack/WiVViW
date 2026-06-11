import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { createSessionAndDispatch } from "@/lib/engines/dranb";
import { assertEngineAccess, checkRunLimit } from "@/lib/engines/engine-runner";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { log } from "@/lib/log";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";

const briefSchema = {
  business_description: (v: unknown) => typeof v === "string" && v.length > 0,
  target_audience: (v: unknown) => typeof v === "string",
  industry: (v: unknown) => typeof v === "string",
  tone_keywords: (v: unknown) => Array.isArray(v) && v.every((x) => typeof x === "string"),
  avoid_keywords: (v: unknown) => Array.isArray(v) && v.every((x) => typeof x === "string"),
  competitive_context: (v: unknown) => v == null || typeof v === "string",
  notes: (v: unknown) => v == null || typeof v === "string",
};

function validateBrief(body: unknown): body is {
  business_description: string;
  target_audience: string;
  industry: string;
  tone_keywords: string[];
  avoid_keywords: string[];
  competitive_context?: string;
  notes?: string;
} {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    briefSchema.business_description(b.business_description) &&
    briefSchema.target_audience(b.target_audience) &&
    briefSchema.industry(b.industry) &&
    briefSchema.tone_keywords(b.tone_keywords) &&
    briefSchema.avoid_keywords(b.avoid_keywords) &&
    briefSchema.competitive_context(b.competitive_context) &&
    briefSchema.notes(b.notes)
  );
}

/** Get or create a dev user when no auth (for local/dev). */
async function getDevUserId(): Promise<string | null> {
  if (!supabaseAdmin) return null;
  const { data: existing } = await supabaseAdmin
    .from("wivviw_users")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (existing?.id) return existing.id;
  const { data: created, error } = await supabaseAdmin
    .from("wivviw_users")
    .insert({
      email: "dev@wivviw.local",
      display_name: "Dev User",
      status: "accepted",
    })
    .select("id")
    .single();
  if (error || !created?.id) return null;
  return created.id;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`dranb:start:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Rate limited. Try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))),
        },
      }
    );
  }

  try {
    const body = await req.json();
    if (!validateBrief(body)) {
      return NextResponse.json(
        { error: "Invalid brief: need business_description, target_audience, industry, tone_keywords, avoid_keywords" },
        { status: 400 }
      );
    }

    let userId: string | null = null;
    let userEmail: string | null = null;

    if (isSupabaseAuthConfigured()) {
      const supabase = await createServerSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) {
        return NextResponse.json({ error: "Sign in required" }, { status: 401 });
      }
      if (!isEmailAllowed(user.email)) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
      userId = user.id;
      userEmail = user.email ?? null;
    } else {
      userId =
        (body as { user_id?: string }).user_id ??
        (req.headers.get("x-user-id") ?? null) ??
        (await getDevUserId());
      if (!userId) {
        return NextResponse.json(
          { error: "No user_id. Sign in or add user_id to request body / X-User-Id header." },
          { status: 400 }
        );
      }
    }

    const { tier } = await assertEngineAccess(userId, "dranb");
    const projectId = (body as { project_id?: string }).project_id;
    if (!checkRunLimit(tier, "dranb", 0)) {
      return NextResponse.json(
        { error: "Monthly dRANb run limit reached for your tier" },
        { status: 403 }
      );
    }
    const { session_id } = await createSessionAndDispatch(userId, body, projectId);
    log("info", "dranb.session_created", {
      session_id,
      user_id: userId,
      user_email: userEmail,
      ip,
    });
    return NextResponse.json({ session_id });
  } catch (e) {
    log("error", "dranb.start_error", {
      ip,
      message: e instanceof Error ? e.message : "unknown_error",
    });
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to start dRANb" },
      { status: 500 }
    );
  }
}
