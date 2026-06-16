import { cn } from "@/lib/utils";

interface WivviwLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  /** inline = icon beside wordmark; stacked = icon above wordmark (landing lockup) */
  layout?: "inline" | "stacked";
  className?: string;
}

export function WivviwLogo({
  size = "md",
  showText = false,
  layout = "inline",
  className,
}: WivviwLogoProps) {
  const dims = {
    sm: { box: 28, text: "text-sm" },
    md: { box: 36, text: "text-lg" },
    lg: { box: 52, text: "text-2xl" },
    xl: { box: 88, text: "text-4xl" },
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center",
        layout === "stacked" ? "flex-col gap-4" : "flex-row gap-2.5",
        className,
      )}
    >
      <svg
        width={dims.box}
        height={dims.box}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="48" height="48" rx="10" fill="hsl(var(--void-surface))" />
        <path
          d="M6 14 L10.5 14 L14 28 L18 18 L22 28 L24 20
             L26 28 L30 18 L34 28 L37.5 14 L42 14 L36 36 L32 36 L28 24 L24 36 L20 24 L16 36 L12 36 Z"
          fill="hsl(var(--accent-teal))"
          fillRule="evenodd"
        />
        <line
          x1="24"
          y1="10"
          x2="24"
          y2="38"
          stroke="hsl(var(--accent-teal))"
          strokeWidth="0.5"
          strokeDasharray="1.5 1.5"
          opacity="0.35"
        />
      </svg>
      {showText && (
        <span className={cn("font-display tracking-tight text-[hsl(var(--text-primary))]", dims.text)}>
          WiVViW
        </span>
      )}
    </span>
  );
}
