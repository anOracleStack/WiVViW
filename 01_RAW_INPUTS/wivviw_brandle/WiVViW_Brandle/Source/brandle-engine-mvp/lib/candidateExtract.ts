export function extractCandidatesFromText(text: string): string[] {
  const out = new Set<string>();
  const cmd = text.match(/add\s+candidate\s*:\s*([a-z0-9_\.\- ]{2,40})/i);
  if (cmd?.[1]) out.add(cmd[1].trim());
  for (const m of text.matchAll(/[“'"]([A-Za-z0-9][A-Za-z0-9 _\.\-]{1,40})[”'"]/g)) out.add(m[1].trim());
  const nameIs = text.match(/name\s+(is|could\s+be|might\s+be)\s+([A-Za-z0-9][A-Za-z0-9 _\-]{1,30})/i);
  if (nameIs?.[2]) out.add(nameIs[2].trim());
  return [...out].filter(s => s.length >= 2);
}
