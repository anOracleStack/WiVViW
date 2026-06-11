"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ENGINE_REGISTRY } from "@/lib/engines/engine-contract";

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`block rounded-lg border px-3 py-2 text-sm transition ${
        active
          ? "border-white/10 bg-white/8 text-white"
          : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Sidebar() {
  const engines = Object.values(ENGINE_REGISTRY).filter(
    (e) => e.id !== "v4ult"
  );

  return (
    <aside className="w-[260px] shrink-0 p-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="text-sm tracking-[0.28em] text-white/80">WiVViW</div>
        <div className="mt-1 text-xs text-white/50">Calm Tech · Glass Box</div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] tracking-widest text-white/40">PROJECT</div>
          <NavItem href="/dashboard" label="Projects" />
          <NavItem href="/dashboard/galaxy" label="Constellation" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] tracking-widest text-white/40">ENGINES</div>
          {engines.map((e) => (
            <NavItem key={e.id} href={e.route} label={e.label} />
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] tracking-widest text-white/40">VAULT</div>
          <NavItem href="/dashboard/vault/evidence" label="Evidence Vault" />
          <NavItem href="/dashboard/vault/v4ult" label="V4ULT Timeline" />
          <NavItem href="/dashboard/receipts" label="Receipts" />
          <NavItem href="/dashboard/exports" label="Exports" />
        </div>
      </div>
    </aside>
  );
}
