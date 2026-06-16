export type EngineName = "dRANb" | "brandL" | "4IELD" | "4TRESS";
export type Quote = { id: string; text: string; author?: string };
export type TrendItem = { id: string; title: string; bullet: string; whyItMatters: string; source?: string; updatedAt: string };
export type Signal = { status: "unknown" | "likely_free" | "likely_taken" | "premium" | "queued"; confidence: number; note?: string };
export type CandidateStatus = "new" | "promising" | "risky" | "blocked" | "shortlisted" | "selected";
export type Candidate = {
  id: string; name: string; source: "user_spoken" | "ai_suggested" | "user_typed"; status: CandidateStatus; notes: string[];
  signals: { domain: Signal; handles: { platform: string; signal: Signal }[]; trademark: Signal; }; updatedAt: string;
};
export type ChapterReport = {
  chapterId: string; engineName: EngineName; startedAt: string; confirmedContext: Record<string, any>;
  goals: string[]; constraints: string[];
  namesExplored: { promising: string[]; shortlisted: string[]; selected?: string };
  decisionsLocked: string[]; nextActions: string[]; openQuestions: string[]; updatedAt: string;
};
export type Vitals = { pulse: number; stability: number; clarity: number };
