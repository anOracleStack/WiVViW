type LogLevel = "info" | "warn" | "error";

function redactValue(key: string, value: unknown): unknown {
  const k = key.toLowerCase();
  if (
    k.includes("password") ||
    k.includes("secret") ||
    k.includes("token") ||
    k.includes("apikey") ||
    k.includes("api_key") ||
    k.includes("authorization") ||
    k.includes("cookie")
  ) {
    return "[REDACTED]";
  }
  return value;
}

function redactObject(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = redactObject(v as Record<string, unknown>);
    } else {
      out[k] = redactValue(k, v);
    }
  }
  return out;
}

export function log(level: LogLevel, event: string, fields?: Record<string, unknown>) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    ...(fields ? redactObject(fields) : {}),
  };
  if (level === "error") console.error(JSON.stringify(payload));
  else if (level === "warn") console.warn(JSON.stringify(payload));
  else console.log(JSON.stringify(payload));
}

