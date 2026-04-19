import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ session: string }> }
) {
  const ip = getClientIp(req);
  const rl = rateLimit(`dranb:session:get:${ip}`, { limit: 120, windowMs: 60_000 });
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

  const { session: sessionId } = await params;
  if (!sessionId || sessionId.length > 120) {
    return NextResponse.json({ error: "Missing or invalid session id" }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const [sessionRes, eventsRes, packagesRes] = await Promise.all([
    supabaseAdmin
      .from("odyssey_sessions")
      .select("id, user_id, engine_key, state, created_at")
      .eq("id", sessionId)
      .single(),
    supabaseAdmin
      .from("event_log")
      .select("id, event_type, payload, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    supabaseAdmin
      .from("moirai_packages")
      .select(
        "id, step_number, provider, package_type, content, tokens_used, cost_estimate, latency_ms, created_at"
      )
      .eq("session_id", sessionId)
      .order("step_number", { ascending: true }),
  ]);

  const session = sessionRes.data ?? null;
  if (!session || sessionRes.error) {
    return NextResponse.json(
      { error: sessionRes.error?.message ?? "Session not found" },
      { status: 404 }
    );
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
    const row = session as { user_id: string };
    if (row.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const body = {
    session,
    events: eventsRes.data ?? [],
    packages: packagesRes.data ?? [],
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "private, no-store, must-revalidate",
    },
  });
}
