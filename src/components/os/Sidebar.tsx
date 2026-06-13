"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WivviwLogo } from "@/components/ui/WivviwLogo";
import { ENGINE_REGISTRY, JOURNEY_ORDER, type EngineId } from "@/lib/engines/engine-contract";
import {
  ENGINE_AVAILABILITY,
  isEngineNavigable,
  type EngineAvailability,
} from "@/lib/engines/engine-availability";

function statusLabel(status: EngineAvailability): string | null {
  if (status === "coming_soon") return "Soon";
  if (status === "beta") return "Beta";
  return null;
}

function NavItem({
  href,
  label,
  active,
  badge,
  accentHsl,
}: {
  href: string;
  label: string;
  active: boolean;
  badge?: string | null;
  accentHsl?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
        active
          ? "border-[hsl(var(--primary-amber)/0.35)] bg-[hsl(var(--primary-amber)/0.08)] text-[hsl(var(--text-primary))]"
          : "border-transparent text-[hsl(var(--text-muted))] hover:border-[hsl(var(--glass-border))] hover:bg-white/[0.03] hover:text-[hsl(var(--text-primary))]"
      }`}
    >
      <span className="flex items-center gap-2">
        {accentHsl && (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: `hsl(${accentHsl})` }}
          />
        )}
        {label}
      </span>
      {badge && (
        <span className="font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--text-muted))]">
          {badge}
        </span>
      )}
    </Link>
  );
}

function NavSoon({ label, accentHsl }: { label: string; accentHsl?: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm text-[hsl(var(--text-muted)/0.55)]">
      <span className="flex items-center gap-2">
        {accentHsl && (
          <span
            className="h-1.5 w-1.5 rounded-full opacity-40"
            style={{ backgroundColor: `hsl(${accentHsl})` }}
          />
        )}
        {label}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-widest">Soon</span>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [opsOpen, setOpsOpen] = useState(
    pathname.startsWith("/dashboard/ops")
  );

  const engines = JOURNEY_ORDER.map((id) => ENGINE_REGISTRY[id]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="w-[280px] shrink-0 p-5">
      <div className="glass-panel rounded-2xl p-5">
        <Link href="/dashboard" className="flex flex-col items-center text-center">
          <WivviwLogo size="md" showText />
          <p className="mt-2 font-mono text-[10px] tracking-[0.28em] text-[hsl(var(--accent-teal))]">
            CALM TECH · GLASS BOX
          </p>
        </Link>

        <div className="mt-6 space-y-1.5">
          <p className="text-center font-mono text-[10px] font-medium tracking-[0.35em] text-[hsl(var(--text-muted))]">
            PROJECT
          </p>
          <NavItem href="/dashboard" label="Projects" active={isActive("/dashboard") && pathname === "/dashboard"} />
          <NavItem href="/dashboard/galaxy" label="Constellation" active={isActive("/dashboard/galaxy")} />
        </div>

        <div className="mt-6 space-y-1.5">
          <p className="text-center font-mono text-[10px] font-medium tracking-[0.35em] text-[hsl(var(--text-muted))]">
            ENGINES
          </p>
          {engines.map((engine) => {
            const status = ENGINE_AVAILABILITY[engine.id as EngineId];
            const badge = statusLabel(status);
            if (isEngineNavigable(engine.id as EngineId)) {
              return (
                <NavItem
                  key={engine.id}
                  href={engine.route}
                  label={engine.label}
                  active={isActive(engine.route)}
                  badge={badge}
                  accentHsl={engine.colorHsl}
                />
              );
            }
            return (
              <NavSoon key={engine.id} label={engine.label} accentHsl={engine.colorHsl} />
            );
          })}
        </div>

        <div className="mt-6 space-y-1.5">
          <p className="text-center font-mono text-[10px] font-medium tracking-[0.35em] text-[hsl(var(--text-muted))]">
            VAULT
          </p>
          <NavItem
            href="/dashboard/vault/evidence"
            label="Evidence Vault"
            active={isActive("/dashboard/vault/evidence")}
          />
          <NavItem
            href="/dashboard/vault/v4ult"
            label="V4ULT Timeline"
            active={isActive("/dashboard/vault/v4ult")}
          />
          <NavItem href="/dashboard/receipts" label="Receipts" active={isActive("/dashboard/receipts")} />
          <NavItem href="/dashboard/exports" label="Exports" active={isActive("/dashboard/exports")} />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setOpsOpen((o) => !o)}
            className="w-full text-center font-mono text-[10px] font-medium tracking-[0.35em] text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
          >
            OPS {opsOpen ? "▾" : "▸"}
          </button>
          {opsOpen && (
            <div className="mt-1.5 space-y-1.5">
              <NavItem
                href="/dashboard/ops/truth"
                label="Truth receipts"
                active={isActive("/dashboard/ops/truth")}
              />
              <NavItem
                href="/dashboard/ops/providers"
                label="Providers"
                active={isActive("/dashboard/ops/providers")}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
