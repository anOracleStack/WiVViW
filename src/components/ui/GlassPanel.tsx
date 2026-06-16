import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GlassPanel({
  children,
  className,
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "amber" | "teal" | "none";
}) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-[hsl(var(--glass-border))] p-6",
        glow === "amber" && "glass-glow-amber",
        glow === "teal" && "glass-glow-teal",
        className
      )}
    >
      {children}
    </div>
  );
}
