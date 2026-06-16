import Link from "next/link";
import EngineConstellation from "@/components/landing/EngineConstellation";
import GenesisBackdrop from "@/components/ui/GenesisBackdrop";
import SiteFooter from "@/components/ui/SiteFooter";
import { WivviwLogo } from "@/components/ui/WivviwLogo";
import { JOURNEY_ORDER } from "@/lib/engines/engine-contract";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

const PREVIEW_ENGINES = JOURNEY_ORDER.slice(0, 7);

export default function LandingHero({ signedIn }: { signedIn: boolean }) {
  return (
    <main
      data-shell="genesis"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(var(--shell-bg))] px-8 py-16"
    >
      <GenesisBackdrop />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <div className="landing-reveal landing-reveal--logo">
          <WivviwLogo size="xl" showText layout="stacked" className="mb-12" />
        </div>

        <h1 className="landing-reveal landing-reveal--headline font-display text-[2.75rem] font-bold uppercase leading-[1.05] tracking-[0.06em] text-[hsl(var(--text-primary))] sm:text-[3.5rem]">
          <span className="block">Business</span>
          <span className="block">Optimization</span>
        </h1>

        <p className="landing-reveal landing-reveal--promise mt-5 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-[hsl(var(--text-primary))] sm:text-[2.75rem]">
          Build Your Brand DNA
        </p>

        <p className="landing-reveal landing-reveal--subline mt-6 text-[1.2rem] text-[hsl(var(--text-muted))] sm:text-[1.35rem]">
          from seed to sale
        </p>

        <div className="landing-reveal landing-reveal--constellation mt-20 w-full">
          <EngineConstellation engineIds={PREVIEW_ENGINES} />
        </div>

        <div className="landing-reveal landing-reveal--cta mt-16 flex flex-wrap items-center justify-center gap-4">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary">
              Open workspace
            </Link>
          ) : (
            <>
              <Link href="/dashboard" className="btn-primary">
                Begin the sequence
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
