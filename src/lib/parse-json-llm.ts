/**
 * Parse JSON from model output that may include markdown fences or leading prose.
 */
export function parseJsonFromLlm(raw: string): unknown {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const inner = fence ? fence[1].trim() : trimmed;

  const tryParse = (s: string): unknown => JSON.parse(s);

  try {
    return tryParse(inner);
  } catch {
    const start = inner.indexOf("{");
    const end = inner.lastIndexOf("}");
    if (start < 0 || end <= start) {
      throw new Error("Model output was not valid JSON (no object found)");
    }
    const slice = inner.slice(start, end + 1);
    try {
      return tryParse(slice);
    } catch {
      const relaxed = slice.replace(/,\s*([}\]])/g, "$1");
      return tryParse(relaxed);
    }
  }
}
