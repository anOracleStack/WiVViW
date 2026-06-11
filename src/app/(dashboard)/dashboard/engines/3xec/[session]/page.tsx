import SessionResult from "@/components/os/SessionResult";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default async function XecSessionPage({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const { session } = await params;
  return (
    <SessionResult
      engine={ENGINE_REGISTRY["3xec"]}
      sessionId={session}
      apiPath="/api/engines/3xec"
    />
  );
}
