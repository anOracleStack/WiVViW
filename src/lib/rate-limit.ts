type RateLimitConfig = {
  /** Max requests per window per key. */
  limit: number;
  /** Window size in ms. */
  windowMs: number;
};

type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number };

const buckets = new Map<string, { count: number; resetAt: number }>();

/**
 * Best-effort in-memory limiter. Works well for local/dev and single-instance deployments.
 * On serverless platforms, this is per-instance; still useful to soften bursts.
 */
export function rateLimit(key: string, cfg: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + cfg.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: cfg.limit - 1, resetAt };
  }

  if (existing.count >= cfg.limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true, remaining: cfg.limit - existing.count, resetAt: existing.resetAt };
}

