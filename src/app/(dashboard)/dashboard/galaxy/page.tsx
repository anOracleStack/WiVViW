import ConstellationMap from "@/components/galaxy/ConstellationMap";
import SectionTitle from "@/components/ui/SectionTitle";
import BalancedText from "@/components/ui/BalancedText";

export default function GalaxyPage() {
  return (
    <div className="text-center">
      <SectionTitle eyebrow="The constellation" title="WiVViW Galaxy" />
      <BalancedText className="mt-4 text-sm text-[hsl(var(--text-muted))]">
        Each engine is its own planet —
        <br />
        same universe, unique color and role.
      </BalancedText>
      <div className="mt-10">
        <ConstellationMap completedPhases={3} />
      </div>
    </div>
  );
}
