import { cn } from "@/lib/utils";

export default function SectionTitle({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-[11px] font-medium tracking-[0.35em] text-[hsl(var(--text-muted))]">
          {eyebrow.toUpperCase()}
        </p>
      )}
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[hsl(var(--text-primary))]">
        {title.toUpperCase()}
      </h2>
    </div>
  );
}
