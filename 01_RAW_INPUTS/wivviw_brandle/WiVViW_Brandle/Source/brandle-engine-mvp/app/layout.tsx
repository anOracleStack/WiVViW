import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Brandle Engine MVP", description: "Voice-first engine workspace (MVP)." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
