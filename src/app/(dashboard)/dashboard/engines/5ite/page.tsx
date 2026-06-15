import EngineWorkbench from "@/components/os/EngineWorkbench";
import { ENGINE_PAGE_CONFIG } from "@/lib/engines/engine-pages";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default function SitePage() {
  return (
    <EngineWorkbench
      engine={ENGINE_REGISTRY["5ite"]}
      fields={ENGINE_PAGE_CONFIG["5ite"].fields}
      apiPath="/api/engines/5ite"
    />
  );
}
