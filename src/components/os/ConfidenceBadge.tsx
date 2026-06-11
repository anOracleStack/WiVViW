import type { ConfidenceLevel } from "@/lib/engines/engine-contract";

const STYLES: Record<ConfidenceLevel, string> = {
  verified: "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
  likely: "bg-sky-500/15 text-sky-200 border-sky-500/20",
  estimate: "bg-amber-500/15 text-amber-200 border-amber-500/20",
};

export default function ConfidenceBadge({ value }: { value: ConfidenceLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] tracking-wide ${STYLES[value]}`}
      title="Confidence level"
    >
      {value.toUpperCase()}
    </span>
  );
}
