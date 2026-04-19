import { requireSupabaseAdmin } from "@/lib/supabase/admin";

export type MoiraiStage = "clotho" | "lachesis" | "eunoia";

/**
 * Load active prompt from prompt_registry and fill {{placeholders}} with vars.
 */
export async function getPrompt(
  engineKey: string,
  moiraiStage: MoiraiStage,
  taskType: string,
  vars: Record<string, string> = {}
): Promise<string> {
  const db = requireSupabaseAdmin();
  async function fetchOne(tt: string) {
    return await db
      .from("prompt_registry")
      .select("prompt_text")
      .eq("engine_key", engineKey)
      .eq("moirai_stage", moiraiStage)
      .eq("task_type", tt)
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1);
  }

  const first = await fetchOne(taskType);
  const firstRow = Array.isArray(first.data) ? first.data[0] : null;

  // Fallback: allow task_type = 'default' if caller asked for a more specific type
  const second =
    !firstRow?.prompt_text && taskType !== "default" ? await fetchOne("default") : null;
  const row = firstRow?.prompt_text
    ? firstRow
    : Array.isArray(second?.data)
      ? second?.data[0]
      : null;

  const errMsg = first.error?.message ?? second?.error?.message ?? "no row";
  if (!row?.prompt_text) {
    throw new Error(`Prompt not found: ${engineKey}/${moiraiStage}/${taskType} — ${errMsg}`);
  }

  let text = row.prompt_text;
  for (const [key, value] of Object.entries(vars)) {
    text = text.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value ?? "");
  }
  return text;
}
