import { cache } from "react";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/** One Supabase getUser per request when multiple RSCs need auth state. */
export const getOptionalAuthUser = cache(async () => {
  if (!isSupabaseAuthConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Convenience wrapper for protected server components. */
export const requireAuthUser = cache(async () => {
  const user = await getOptionalAuthUser();
  if (!user) throw new Error("AUTH_REQUIRED");
  return user;
});
