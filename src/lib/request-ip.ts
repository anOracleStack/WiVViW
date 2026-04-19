import type { NextRequest } from "next/server";

/** Best-effort client IP for rate limiting (Vercel forwards x-forwarded-for). */
export function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
