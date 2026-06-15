import Link from "next/link";
import LegalPageShell from "@/components/layout/LegalPageShell";

export default function LegalPage() {
  return (
    <LegalPageShell title="Legal">
      <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--text-muted))]">
        Draft — counsel review required
      </p>
      <p className="mt-4">
        WiVViW provides brand intelligence tools. Nothing on this platform is legal advice,
        trademark counsel, or a guarantee of availability for domains or handles.
      </p>
      <p className="mt-4">
        By using WiVViW you agree to use outputs as decision support only and to verify critical
        decisions with qualified professionals.
      </p>
      <p className="mt-4">
        See also{" "}
        <Link href="/privacy" className="text-[hsl(var(--text-primary))] underline">
          Privacy
        </Link>
        .
      </p>
      <p className="mt-6 text-xs">Last updated: June 14, 2026</p>
    </LegalPageShell>
  );
}
