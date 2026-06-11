import EngineWorkbench from "@/components/os/EngineWorkbench";
import { ENGINE_PAGE_CONFIG } from "@/lib/engines/engine-pages";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default function RoxyPage() {
  return (
    <EngineWorkbench
      engine={ENGINE_REGISTRY["6roxy"]}
      description={ENGINE_PAGE_CONFIG["6roxy"].description}
      fields={ENGINE_PAGE_CONFIG["6roxy"].fields}
      apiPath="/api/engines/6roxy"
    />
  );
}
