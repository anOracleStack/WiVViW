import { evaluateDranbGate, scoreDranbCandidates } from "@/lib/engines/gates";

/** MOIRAI eval: failure-mode checks for dRANb gates (not generic quality). */
function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

export function runDranbGateEvals(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const cases = [
    { shortlist: ["A", "B"], expectPass: false },
    { shortlist: ["A", "B", "C"], expectPass: true },
    { shortlist: ["A", "B", "C", "D", "E", "F", "G"], expectPass: true },
    { shortlist: ["A", "B", "C", "D", "E", "F", "G", "H"], expectPass: false },
  ];

  for (const c of cases) {
    const gate = evaluateDranbGate(c.shortlist);
    if (gate.passed === c.expectPass) passed++;
    else failed++;
  }

  const scored = scoreDranbCandidates([
    { name: "TestCo", scores: { uniqueness: 90, memorability: 85 } },
  ]);
  assert(scored[0].overall >= 72, "high scores should pass threshold");
  passed++;

  return { passed, failed };
}

// Executed via: npm run test:evals
const result = runDranbGateEvals();
if (result.failed > 0) {
  throw new Error(`dRANb gate evals failed: ${result.failed} cases`);
}
