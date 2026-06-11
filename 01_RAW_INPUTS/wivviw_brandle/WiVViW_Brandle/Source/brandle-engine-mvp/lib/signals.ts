import { Signal } from "./types";
export function domainSignal(name: string): Signal {
  const len = name.replace(/[^a-z0-9]/gi, "").length;
  if (len <= 5) return { status: "premium", confidence: 0.55, note: "Short names are often premium/taken." };
  if (len >= 12) return { status: "likely_free", confidence: 0.35, note: "Longer names can be more available, but add friction." };
  return { status: "unknown", confidence: 0.25 };
}
export function handleSignal(name: string): Signal {
  const conf = (name.includes("_") || /\d/.test(name) || name.includes(".")) ? 0.35 : 0.2;
  return { status: "unknown", confidence: conf, note: conf > 0.2 ? "Modified handles may be more available; check readability." : undefined };
}
export function trademarkSignal(_name: string): Signal {
  return { status: "queued", confidence: 0.1, note: "Deep scan queued (informational)." };
}
