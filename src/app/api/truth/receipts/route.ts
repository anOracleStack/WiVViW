import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { hashEvidenceJson } from "@/lib/truth/content-hash";
import { assertUserOwnsSession } from "@/lib/truth/session-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { log } from "@/lib/log";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";

function parseBody(body: unknown): {
  session_id: string;
  claim_id: string;
  source: string;
  evidence: unknown;
  confidence: number | null;
} | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const session_id = typeof b.session_id === "string" ? b.session_id : "";
  const claim_id = typeof b.claim_id === "string" ? b.claim_id : "";
  const source = typeof b.source === "string" ? b.source : "";
  const evidence = b.evidence;
  if (!session_id || !claim_id || !source || evidence === undefined) return null;
  let confidence: number | null = null;
  if (b.confidence != null) {
    const n = Number(b.confidence);
    if (!Number.isFinite(n) || n < 0 || n > 1) return null;
    confidence = n;
  }
  return { session_id, claim_id, source, evidence, confidence };
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`truth:receipt:get:${ip}`, { limit: 120, windowMs: 60_000 });
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

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId || sessionId.length > 120) {
    return NextResponse.json({ error: "Missing or invalid session_id query param" }, { status: 400 });
  }

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
    try {
      await assertUserOwnsSession(sessionId, user.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Forbidden";
      return NextResponse.json({ error: msg }, { status: 403 });
    }
    const { data, error } = await supabase
      .from("receipts_ledger")
      .select(
        "id, claim_id, source, evidence, confidence, truth_state, content_hash, session_id, created_at"
      )
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ receipts: data ?? [] });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabaseAdmin
    .from("receipts_ledger")
    .select(
      "id, claim_id, source, evidence, confidence, truth_state, content_hash, session_id, created_at"
    )
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ receipts: data ?? [] });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`truth:receipt:post:${ip}`, { limit: 60, windowMs: 60_000 });
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

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) {
    return NextResponse.json(
      { error: "Need session_id, claim_id, source, evidence; optional confidence 0–1" },
      { status: 400 }
    );
  }

  try {
    if (parsed.claim_id.length > 200 || parsed.source.length > 80) {
      return NextResponse.json({ error: "Fields too long" }, { status: 400 });
    }

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
      await assertUserOwnsSession(parsed.session_id, user.id);
    }

    const content_hash = hashEvidenceJson(parsed.evidence);

    const { data: existing } = await supabaseAdmin
      .from("receipts_ledger")
      .select("id")
      .eq("session_id", parsed.session_id)
      .eq("content_hash", content_hash)
      .maybeSingle();

    if (existing?.id) {
      log("info", "truth.receipt_deduped", {
        ip,
        session_id: parsed.session_id,
        receipt_id: existing.id,
      });
      return NextResponse.json({ id: existing.id, deduped: true });
    }

    const { data: row, error } = await supabaseAdmin
      .from("receipts_ledger")
      .insert({
        session_id: parsed.session_id,
        claim_id: parsed.claim_id,
        source: parsed.source,
        evidence: parsed.evidence as object,
        confidence: parsed.confidence,
        content_hash,
        truth_state: "queued",
      })
      .select("id")
      .single();

    if (error || !row?.id) {
      return NextResponse.json({ error: error?.message ?? "Insert failed" }, { status: 500 });
    }
    log("info", "truth.receipt_inserted", {
      ip,
      session_id: parsed.session_id,
      receipt_id: row.id,
      content_hash,
    });
    return NextResponse.json({ id: row.id, deduped: false });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Forbidden";
    const status = msg.includes("access") || msg.includes("Forbidden") ? 403 : 500;
    log("error", "truth.receipt_error", { ip, message: msg });
    return NextResponse.json({ error: msg }, { status });
  }
}
