import EngineWorkbench from "@/components/os/EngineWorkbench";
import { ENGINE_PAGE_CONFIG } from "@/lib/engines/engine-pages";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default function XecPage() {
  return (
    <EngineWorkbench
      engine={ENGINE_REGISTRY["3xec"]}
      description={ENGINE_PAGE_CONFIG["3xec"].description}
      fields={ENGINE_PAGE_CONFIG["3xec"].fields}
      apiPath="/api/engines/3xec"
    />
  );
}
