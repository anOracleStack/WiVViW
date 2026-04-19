/** True when real Supabase env is present (enables auth + dashboard protection). */
export function isSupabaseAuthConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return (
    url.length > 0 &&
    anon.length > 0 &&
    !url.includes("your-project") &&
    !anon.toLowerCase().includes("your_anon")
  );
}
