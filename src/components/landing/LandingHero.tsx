import Link from "next/link";
import BalancedText from "@/components/ui/BalancedText";
import { WivviwLogo } from "@/components/ui/WivviwLogo";
import VoidBackdrop from "@/components/ui/VoidBackdrop";
import { ENGINE_REGISTRY, JOURNEY_ORDER } from "@/lib/engines/engine-contract";
import { ENGINE_AVAILABILITY } from "@/lib/engines/engine-availability";
import { isSupabaseAuthConfigured } from "@/lib/supabase/configured";

const PREVIEW_ENGINES = JOURNEY_ORDER.slice(0, 6);

export default function LandingHero({ signedIn }: { signedIn: boolean }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-16">
      <VoidBackdrop />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <WivviwLogo size="lg" showText className="mb-8" />

        <p className="font-mono text-[11px] font-medium tracking-[0.4em] text-[hsl(var(--accent-teal))]">
          BRAND INTELLIGENCE OS
        </p>

        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-[hsl(var(--text-primary))]">
          THE CONSTELLATION
        </h1>

        <BalancedText className="mt-5 text-base text-[hsl(var(--text-muted))]">
          Multi-model orchestration with MOIRAI —
          <br />
          dRANb naming, glass-box receipts,
          <br />
          and a cinematic command shell.
        </BalancedText>

        <div className="mt-12 grid w-full max-w-xl grid-cols-3 gap-3 sm:grid-cols-6">
          {PREVIEW_ENGINES.map((id) => {
            const engine = ENGINE_REGISTRY[id];
            const status = ENGINE_AVAILABILITY[id];
            const live = status === "live" || status === "beta";
            return (
              <div
                key={id}
                className="glass-panel flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center"
                style={{
                  boxShadow: live
                    ? `0 0 24px hsl(${engine.colorHsl} / 0.15), 0 0 0 1px hsl(var(--glass-border))`
                    : undefined,
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: `hsl(${engine.colorHsl})`,
                    boxShadow: live ? `0 0 12px hsl(${engine.colorHsl} / 0.6)` : undefined,
                    opacity: live ? 1 : 0.35,
                  }}
                />
                <span className="font-mono text-[10px] tracking-wider text-[hsl(var(--text-primary))]">
                  {engine.label}
                </span>
                {!live && (
                  <span className="text-[9px] uppercase tracking-widest text-[hsl(var(--text-muted))]">
                    Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary">
              Enter dashboard
            </Link>
          ) : (
            <>
              <Link href="/dashboard" className="btn-primary">
                Explore the shell
              </Link>
              {isSupabaseAuthConfigured() && (
                <>
                  <Link href="/login" className="btn-secondary">
                    Sign in
                  </Link>
                  <Link href="/signup" className="btn-secondary">
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <BalancedText className="mt-8 text-xs text-[hsl(var(--text-muted))]">
          Browse the constellation free —
          <br />
          create an account to run dRANb briefs.
        </BalancedText>
      </div>
    </main>
  );
}
