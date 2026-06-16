import LegalPageShell from "@/components/layout/LegalPageShell";

export default function ContactPage() {
  return (
    <LegalPageShell title="Contact">
      <p>
        Questions, feedback, or support — reach us at{" "}
        <a href="mailto:hello@wivviw.com" className="text-[hsl(var(--text-primary))] underline">
          hello@wivviw.com
        </a>
        .
      </p>
      <p className="mt-4">
        We typically respond within two business days. Empire-tier customers receive priority
        routing when billing is active.
      </p>
    </LegalPageShell>
  );
}
