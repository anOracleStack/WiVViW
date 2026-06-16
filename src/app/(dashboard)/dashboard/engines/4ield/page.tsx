import EngineWorkbench from "@/components/os/EngineWorkbench";
import { ENGINE_PAGE_CONFIG } from "@/lib/engines/engine-pages";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default function IeldPage() {
  return (
    <EngineWorkbench
      engine={ENGINE_REGISTRY["4ield"]}
      fields={ENGINE_PAGE_CONFIG["4ield"].fields}
      apiPath="/api/engines/4ield"
    />
  );
}
