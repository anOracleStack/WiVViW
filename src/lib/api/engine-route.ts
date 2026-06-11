import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { log } from "@/lib/log";
import type { EngineId } from "@/lib/engines/engine-contract";

export async function resolveEngineUserId(
  req: NextRequest,
  body: Record<string, unknown>
): Promise<{ userId: string; email: string | null } | NextResponse> {
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
    return { userId: user.id, email: user.email ?? null };
  }
  const userId =
    (body.user_id as string) ??
    req.headers.get("x-user-id") ??
    null;
  if (!userId) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }
  return { userId, email: null };
}

export function engineRateLimit(req: NextRequest, engineId: EngineId) {
  const ip = getClientIp(req);
  return rateLimit(`${engineId}:start:${ip}`, { limit: 30, windowMs: 60_000 });
}

export function engineError(
  engineId: EngineId,
  req: NextRequest,
  e: unknown,
  context: string
) {
  log("error", `${engineId}.${context}`, {
    ip: getClientIp(req),
    message: e instanceof Error ? e.message : "unknown",
  });
  return NextResponse.json(
    { error: e instanceof Error ? e.message : `Failed to run ${engineId}` },
    { status: 500 }
  );
}
