import Link from "next/link";
import BalancedText from "@/components/ui/BalancedText";
import GenesisBackdrop from "@/components/ui/GenesisBackdrop";
import SiteFooter from "@/components/ui/SiteFooter";
import { WivviwLogo } from "@/components/ui/WivviwLogo";
import { ENGINE_REGISTRY, JOURNEY_ORDER } from "@/lib/engines/engine-contract";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

const PREVIEW_ENGINES = JOURNEY_ORDER.slice(0, 7);

export default function LandingHero({ signedIn }: { signedIn: boolean }) {
  return (
    <main
      data-shell="genesis"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(var(--shell-bg))] px-8 py-16"
    >
      <GenesisBackdrop />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <WivviwLogo size="lg" showText className="mb-10" />

        <h1 className="font-display text-5xl font-semibold tracking-tight text-[hsl(var(--text-primary))]">
          Identity begins in light.
        </h1>

        <BalancedText className="mt-6 text-base text-[hsl(var(--text-muted))]">
          We build your business DNA together —
          <br />
          from first name to first sale.
        </BalancedText>

        <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {PREVIEW_ENGINES.map((id) => {
            const engine = ENGINE_REGISTRY[id];
            return (
              <Link
                key={id}
                href={engine.route}
                className="glass-panel group flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center transition hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 20px hsl(${engine.colorHsl} / 0.12), 0 0 0 1px hsl(var(--glass-border))`,
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full transition group-hover:scale-110"
                  style={{
                    backgroundColor: `hsl(${engine.colorHsl})`,
                    boxShadow: `0 0 12px hsl(${engine.colorHsl} / 0.5)`,
                  }}
                />
                <span className="text-xs font-medium text-[hsl(var(--text-primary))]">
                  {engine.label}
                </span>
                <span className="text-[10px] leading-snug text-[hsl(var(--text-muted)/0.85)]">
                  {engine.outcomeHint}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary">
              Open workspace
            </Link>
          ) : (
            <>
              <Link href="/dashboard" className="btn-primary">
                Start exploring
              </Link>
              {isSupabaseAuthConfigured() && (
                <Link href="/login" className="btn-secondary">
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <SiteFooter className="relative z-10 mt-auto" />
    </main>
  );
}
