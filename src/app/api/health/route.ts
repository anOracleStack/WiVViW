import { NextResponse } from "next/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

export const runtime = "nodejs";

export async function GET() {
  const supabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabaseService = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return NextResponse.json(
    {
      ok: true,
      ts: new Date().toISOString(),
      supabase: {
        auth_configured: isSupabaseAuthConfigured(),
        url: supabaseUrl,
        anon_key: supabaseAnon,
        service_role_key: supabaseService,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

