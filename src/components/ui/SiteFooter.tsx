import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/legal", label: "Legal" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

export default function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-8 py-6 text-center text-xs text-[hsl(var(--text-muted))] ${className}`}
    >
      {FOOTER_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="transition hover:text-[hsl(var(--text-primary))]"
        >
          {label}
        </Link>
      ))}
    </footer>
  );
}
