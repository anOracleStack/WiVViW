import { NextRequest } from "next/server";
import { getEngineSessionResponse } from "@/lib/api/get-engine-session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ session: string }> }
) {
  const { session } = await params;
  return getEngineSessionResponse(session);
}
