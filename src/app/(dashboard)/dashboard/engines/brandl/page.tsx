import EngineWorkbench from "@/components/os/EngineWorkbench";
import { ENGINE_PAGE_CONFIG } from "@/lib/engines/engine-pages";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

export default function BrandlPage() {
  const engine = ENGINE_REGISTRY.brandl;
  const config = ENGINE_PAGE_CONFIG.brandl;
  return (
    <EngineWorkbench
      engine={engine}
      description={config.description}
      fields={config.fields}
      apiPath="/api/engines/brandl"
    />
  );
}
