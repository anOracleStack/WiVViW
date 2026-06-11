import { NextRequest, NextResponse } from "next/server";
import { runStubEngine } from "@/lib/engines/stub-engine";
import { engineError, engineRateLimit, resolveEngineUserId } from "@/lib/api/engine-route";

export async function POST(req: NextRequest) {
  const rl = engineRateLimit(req, "brandl");
  if (!rl.ok) return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  try {
    const body = await req.json();
    const user = await resolveEngineUserId(req, body);
    if (user instanceof NextResponse) return user;
    const result = await runStubEngine(user.userId, "brandl", body, body.project_id);
    return NextResponse.json(result);
  } catch (e) {
    return engineError("brandl", req, e, "start_error");
  }
}
