import "./globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { isSiteAccessLocked } from "@/lib/site-access-locked";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

/** Primary production host; override with NEXT_PUBLIC_APP_URL (e.g. preview deploy). */
function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "https://wivviw.com";
}

export async function generateMetadata(): Promise<Metadata> {
  const base = siteUrl();
  if (isSiteAccessLocked()) {
    return {
      metadataBase: new URL(base),
      title: "Private preview",
      description: "Private preview.",
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    };
  }
  return {
    metadataBase: new URL(base),
    title: "WiVViW",
    description: "WiVViW — premium multi-LLM OS",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: "WiVViW",
      url: base,
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-black text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}

