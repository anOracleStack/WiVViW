import Link from "next/link";
import type { ReactNode } from "react";
import GenesisBackdrop from "@/components/ui/GenesisBackdrop";
import SiteFooter from "@/components/ui/SiteFooter";
import SectionTitle from "@/components/ui/SectionTitle";
import { WivviwLogo } from "@/components/ui/WivviwLogo";

export default function LegalPageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main
      data-shell="genesis"
      className="relative flex min-h-screen flex-col items-center bg-[hsl(var(--shell-bg))] px-8 py-16 text-[hsl(var(--text-primary))]"
    >
      <GenesisBackdrop />
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <Link href="/">
          <WivviwLogo size="md" showText />
        </Link>
        <SectionTitle title={title} className="mt-10" />
        <div className="glass-panel mt-8 w-full rounded-2xl p-8 text-left text-sm leading-relaxed text-[hsl(var(--text-muted))]">
          {children}
        </div>
        <SiteFooter className="mt-12" />
      </div>
    </main>
  );
}
