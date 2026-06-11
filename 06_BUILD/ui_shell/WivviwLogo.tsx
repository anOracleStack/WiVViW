import { cn } from "@/lib/utils";

interface WivviwLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

/**
 * WivviW logo mark — a mirrored W glyph emphasizing palindrome symmetry.
 * The mark is two W shapes reflected across a central vertical axis,
 * forming a diamond-like negative space in the center.
 */
export function WivviwLogo({ size = "md", showText = false, className }: WivviwLogoProps) {
  const dims = {
    sm: { box: 28, text: "text-sm" },
    md: { box: 32, text: "text-lg" },
    lg: { box: 48, text: "text-2xl" },
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={dims.box}
        height={dims.box}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="WivviW logo"
      >
        {/* Background rounded square */}
        <rect
          width="48"
          height="48"
          rx="8"
          fill="hsl(222 47% 8%)"
        />

        {/* Left W — mirrored to form right W */}
        {/* The mark: two W glyphs share the center stroke, creating
            a symmetrical diamond void at the axis of reflection. */}
        <path
          d="M6 14 L10.5 14 L14 28 L18 18 L22 28 L24 20
             L26 28 L30 18 L34 28 L37.5 14 L42 14 L36 36 L32 36 L28 24 L24 36 L20 24 L16 36 L12 36 Z"
          fill="hsl(175 40% 45%)"
          fillRule="evenodd"
        />

        {/* Center axis line — subtle reflection indicator */}
        <line
          x1="24"
          y1="10"
          x2="24"
          y2="38"
          stroke="hsl(175 40% 45%)"
          strokeWidth="0.5"
          strokeDasharray="1.5 1.5"
          opacity="0.35"
        />
      </svg>

      {showText && (
        <span className={cn("font-display text-foreground tracking-tight", dims.text)}>
          WivviW
        </span>
      )}
    </span>
  );
}
