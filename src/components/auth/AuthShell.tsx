import type { ReactNode } from "react";
import Link from "next/link";
import GlassPanel from "@/components/ui/GlassPanel";
import { WivviwLogo } from "@/components/ui/WivviwLogo";
import VoidBackdrop from "@/components/ui/VoidBackdrop";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-8 py-16">
      <VoidBackdrop />
      <div className="relative z-10 w-full max-w-md text-center">
        <Link href="/" className="inline-flex justify-center">
          <WivviwLogo size="md" showText />
        </Link>

        <GlassPanel className="mt-8 text-left" glow="amber">
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.35em] text-[hsl(var(--text-muted))]">
              SECURE ACCESS
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold text-[hsl(var(--text-primary))]">
              {title.toUpperCase()}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--text-muted))]">
                {subtitle}
              </p>
            )}
          </div>
          <div className="mt-6">{children}</div>
        </GlassPanel>

        <p className="mt-6 text-center text-xs text-[hsl(var(--text-muted))]">
          <Link href="/" className="hover:text-[hsl(var(--primary-amber))]">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
