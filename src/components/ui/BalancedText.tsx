import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BalancedTextProps {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}

/** Center-aligned copy with balanced line lengths for marketing blocks. */
export default function BalancedText({
  children,
  className,
  as: Tag = "p",
}: BalancedTextProps) {
  return (
    <Tag className={cn("mx-auto max-w-md text-center text-pretty leading-relaxed", className)}>
      {children}
    </Tag>
  );
}
