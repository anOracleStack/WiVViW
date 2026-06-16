import { NextResponse } from "next/server";

const QUOTES = [
  { id: "q1", text: "No hype. No guarantees. Just decisions.", author: "", tags: ["dRANb","general"] },
  { id: "q2", text: "Clarity is a form of courage.", author: "", tags: ["dRANb","general"] },
  { id: "q3", text: "A name is a promise you’ll be judged against.", author: "", tags: ["dRANb"] },
  { id: "q4", text: "If you can’t say it, you can’t scale it.", author: "", tags: ["dRANb"] },
  { id: "q5", text: "Ownability beats cleverness when money is on the line.", author: "", tags: ["brandL"] },
];

const TRENDS = [
  {
    id: "t1",
    engineTags: ["dRANb","brandL"],
    title: ".com still dominates recognition",
    bullet: "For many audiences, .com remains the default expectation; alternatives can add friction depending on category.",
    whyItMatters: "If your brand relies on trust-first conversion, .com preference can affect memorability and click confidence.",
    source: "https://www.wix.com/blog/domain-name-statistics",
    updatedAt: "2026-02-20"
  },
  {
    id: "t2",
    engineTags: ["dRANb","brandL","4TRESS"],
    title: "More custom TLDs may arrive soon",
    bullet: "ICANN’s next new gTLD application round is expected to open April 2026, expanding possible TLD options.",
    whyItMatters: "New TLDs can create fresh naming options, but also introduce brand protection and confusion risks.",
    source: "https://newgtldprogram.icann.org/en/application-rounds/round2",
    updatedAt: "2026-02-20"
  }
];

function pick<T>(arr: T[], seed: number) { return arr[seed % arr.length]; }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const engine = searchParams.get("engine") || "dRANb";
  const seed = Number(searchParams.get("seed") || Date.now());
  const engineQuotes = QUOTES.filter(q => q.tags.includes(engine) || q.tags.includes("general"));
  const quote = pick(engineQuotes.length ? engineQuotes : QUOTES, seed);
  const trends = TRENDS.filter(t => t.engineTags.includes(engine)).slice(0, 5);
  return NextResponse.json({ engine, quote, trends });
}
