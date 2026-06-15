import Link from "next/link";
import LegalPageShell from "@/components/layout/LegalPageShell";

export default function FaqPage() {
  return (
    <LegalPageShell title="FAQ">
      <div className="space-y-6">
        <section>
          <h3 className="font-display text-sm font-bold text-[hsl(var(--text-primary))]">
            Can I explore without signing up?
          </h3>
          <p className="mt-2">
            Yes. Browse every engine, fill forms, and preview your galaxy. Sign in when you run,
            save, or export.
          </p>
        </section>
        <section>
          <h3 className="font-display text-sm font-bold text-[hsl(var(--text-primary))]">
            What are the engines?
          </h3>
          <p className="mt-2">
            Name, Brandle, Field, Fortress, Exec, Site, and Proxy — each step in building and
            protecting your brand. Open any from the{" "}
            <Link href="/dashboard" className="underline">
              workspace
            </Link>
            .
          </p>
        </section>
        <section>
          <h3 className="font-display text-sm font-bold text-[hsl(var(--text-primary))]">
            What are Twin, Squad, and Empire?
          </h3>
          <p className="mt-2">
            Twin is free for core exploration. Squad unlocks exports and more runs. Empire adds
            Field, Fortress, and Site depth.
          </p>
        </section>
        <section>
          <h3 className="font-display text-sm font-bold text-[hsl(var(--text-primary))]">
            What are receipts?
          </h3>
          <p className="mt-2">
            A record of what was decided and why — attached to each engine run so you can audit
            and hand off to the next step.
          </p>
        </section>
      </div>
    </LegalPageShell>
  );
}
