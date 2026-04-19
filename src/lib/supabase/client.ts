import { createBrowserClient } from "@supabase/ssr";

/** Call from the browser only (e.g. inside useEffect). Do not export a module-level singleton — it breaks SSG/CI builds without env. */
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required to create the browser client"
    );
  }
  return createBrowserClient(url, key);
}
