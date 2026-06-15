import ConstellationMap from "@/components/galaxy/ConstellationMap";

export default function GalaxyPage() {
  return (
    <div className="text-center">
      <div className="mt-10">
        <ConstellationMap completedPhases={3} />
      </div>
    </div>
  );
}
