import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasEnv =
  typeof supabaseUrl === "string" &&
  typeof serviceRoleKey === "string" &&
  supabaseUrl.length > 0 &&
  !serviceRoleKey.includes("YOUR_");

export const supabaseAdmin: SupabaseClient | null = hasEnv
  ? createClient(supabaseUrl!, serviceRoleKey!, {
      auth: { persistSession: false },
    })
  : null;

export function requireSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase is not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)."
    );
  }
  return supabaseAdmin;
}

