/**
 * Optional gate: set AUTH_ALLOWED_EMAILS=comma,separated,emails (lowercase ok).
 * Empty / unset = allow any authenticated user.
 */
export function isEmailAllowed(email: string | undefined): boolean {
  const raw = process.env.AUTH_ALLOWED_EMAILS?.trim();
  if (!raw) return true;
  if (!email) return false;
  const allowed = new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  return allowed.has(email.toLowerCase());
}
