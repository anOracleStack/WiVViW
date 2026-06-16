import { create } from "zustand";
import { Candidate, ChapterReport, Quote, TrendItem, Vitals } from "./types";
import { id } from "./utils";
import { domainSignal, handleSignal, trademarkSignal } from "./signals";

type State = {
  quote?: Quote;
  trends: TrendItem[];
  vitals: Vitals;
  aiAutonomy: boolean;
  rollingUser: string;
  rollingAI: string;
  candidates: Candidate[];
  activeCandidateId?: string;
  report: ChapterReport;
  lastEventAt: number;

  actions: {
    setQuoteTrends: (quote: Quote, trends: TrendItem[]) => void;
    setRollingUser: (t: string) => void;
    setRollingAI: (t: string) => void;
    addCandidate: (name: string, source: Candidate["source"]) => void;
    setActiveCandidate: (id: string) => void;
    setCandidateStatus: (id: string, status: Candidate["status"], note?: string) => void;
    toggleAutonomy: () => void;
    tickVitals: () => void;
  };
};

function freshReport(): ChapterReport {
  return {
    chapterId: id("chapter"),
    engineName: "dRANb",
    startedAt: new Date().toISOString(),
    confirmedContext: {},
    goals: ["Workshop identity decisions with live signals."],
    constraints: [],
    namesExplored: { promising: [], shortlisted: [] },
    decisionsLocked: [],
    nextActions: [],
    openQuestions: [],
    updatedAt: new Date().toISOString(),
  };
}

export const useEngineStore = create<State>((set, get) => ({
  trends: [],
  vitals: { pulse: 55, stability: 55, clarity: 55 },
  aiAutonomy: false,
  rollingUser: "",
  rollingAI: "",
  candidates: [],
  report: freshReport(),
  lastEventAt: Date.now(),

  actions: {
    setQuoteTrends: (quote, trends) => set({ quote, trends }),
    setRollingUser: (t) => set({ rollingUser: t }),
    setRollingAI: (t) => set({ rollingAI: t }),

    addCandidate: (name, source) => {
      const candidates = get().candidates;
      if (candidates.some(c => c.name.toLowerCase() === name.toLowerCase())) return;
      const clean = name.trim().replace(/\s+/g, " ");
      const c: Candidate = {
        id: id("cand"),
        name: clean,
        source,
        status: "new",
        notes: [],
        signals: {
          domain: domainSignal(clean),
          handles: ["Instagram","TikTok","X","YouTube","LinkedIn","Facebook"].map(p => ({ platform: p, signal: handleSignal(clean) })),
          trademark: trademarkSignal(clean),
        },
        updatedAt: new Date().toISOString(),
      };
      set({ candidates: [c, ...candidates], activeCandidateId: c.id, lastEventAt: Date.now() });
    },

    setActiveCandidate: (id) => set({ activeCandidateId: id }),

    setCandidateStatus: (id, status, note) => {
      const candidates = get().candidates.map(c => c.id === id ? ({ ...c, status, notes: note ? [note, ...c.notes].slice(0,5) : c.notes }) : c);
      set({ candidates, lastEventAt: Date.now() });
    },

    toggleAutonomy: () => set({ aiAutonomy: !get().aiAutonomy }),

    tickVitals: () => {
      const now = Date.now();
      const secondsSince = (now - get().lastEventAt) / 1000;
      const pulse = Math.max(20, Math.min(95, 90 - secondsSince * 4));
      const shortlistedCount = get().candidates.filter(c => c.status === "shortlisted" || c.status === "selected").length;
      const stability = Math.max(20, Math.min(95, 55 + shortlistedCount * 6));
      const clarity = Math.max(25, Math.min(95, 55 + shortlistedCount * 4));
      set({ vitals: { pulse: Math.round(pulse), stability: Math.round(stability), clarity: Math.round(clarity) } });
    },
  },
}));
