import "./globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono, Syne } from "next/font/google";
import type { ReactNode } from "react";
import GuideChatbot from "@/components/guide/GuideChatbot";
import ScaleWrapper from "@/components/ui/ScaleWrapper";
import { isSiteAccessLocked } from "@/lib/site-access-locked";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#faf9f7",
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
    title: "WiVViW — Brand Intelligence OS",
    description: "Brand intelligence that grows with you — from first name to first sale.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: "WiVViW",
      url: base,
      title: "WiVViW — Brand Intelligence OS",
      description: "Build your business DNA together — explore free, sign in when you run or save.",
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${fraunces.variable} ${jetbrains.variable} ${dmSans.variable}`}
    >
      <body className="font-body bg-[hsl(var(--shell-bg))] text-[hsl(var(--text-primary))] antialiased">
        <ScaleWrapper>
          {children}
          <GuideChatbot />
        </ScaleWrapper>
      </body>
    </html>
  );
}
