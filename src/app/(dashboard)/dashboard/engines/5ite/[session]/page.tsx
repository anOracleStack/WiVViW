import SessionResult from "@/components/os/SessionResult";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default async function SiteSessionPage({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const { session } = await params;
  return (
    <SessionResult
      engine={ENGINE_REGISTRY["5ite"]}
      sessionId={session}
      apiPath="/api/engines/5ite"
    />
  );
}
