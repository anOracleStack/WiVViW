import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";
import { listReceiptsForSession, listReceiptsForUser } from "@/lib/os/receipts";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (sessionId) {
    const receipts = await listReceiptsForSession(sessionId);
    return NextResponse.json({ receipts });
  }

  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({ receipts: [] });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const receipts = await listReceiptsForUser(user.id);
  return NextResponse.json({ receipts });
}
