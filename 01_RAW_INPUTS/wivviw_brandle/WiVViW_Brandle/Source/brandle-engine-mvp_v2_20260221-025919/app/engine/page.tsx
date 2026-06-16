"use client";
import React, { useEffect, useRef, useState } from "react";
import QuoteStrip from "@/components/QuoteStrip";
import TrendsPanel from "@/components/TrendsPanel";
import RollingLine from "@/components/RollingLine";
import Waveform from "@/components/Waveform";
import VitalsMeter from "@/components/VitalsMeter";
import CandidateBoard from "@/components/CandidateBoard";
import CandidateDetail from "@/components/CandidateDetail";
import IdentityPreview from "@/components/IdentityPreview";
import SessionReport from "@/components/SessionReport";
import { useEngineStore } from "@/lib/store";
import { extractCandidatesFromText } from "@/lib/candidateExtract";

type SpeechRec = any;

function useSpeechRecognition() {
  const [supported, setSupported] = useState(false);
  const recRef = useRef<SpeechRec | null>(null);
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = true;
    recRef.current = rec;
  }, []);
  return { supported, recRef };
}

function speak(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {}
}

export default function EnginePage() {
  const aiAutonomy = useEngineStore((s) => s.aiAutonomy);
  const rollingUser = useEngineStore((s) => s.rollingUser);
  const rollingAI = useEngineStore((s) => s.rollingAI);
  const actions = useEngineStore((s) => s.actions);

  const [listening, setListening] = useState(false);
  const [speakingNow, setSpeakingNow] = useState(false);

  const { supported, recRef } = useSpeechRecognition();

  useEffect(() => {
    const seed = Date.now();
    fetch(`/api/engine/bootstrap?engine=dRANb&seed=${seed}`)
      .then((r) => r.json())
      .then(({ quote, trends }) => actions.setQuoteTrends(quote, trends))
      .catch(() => {});
  }, [actions]);

  useEffect(() => {
    const id = setInterval(() => actions.tickVitals(), 600);
    return () => clearInterval(id);
  }, [actions]);

  useEffect(() => {
    if (!supported || !recRef.current) return;
    const rec = recRef.current;

    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      const combined = (final + " " + interim).trim();
      if (combined) actions.setRollingUser(combined);

      if (final.trim()) {
        const names = extractCandidatesFromText(final);
        for (const n of names) actions.addCandidate(n, "user_spoken");
      }
    };

    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
  }, [supported, recRef, actions]);

  const startListening = () => { try { recRef.current?.start(); setListening(true); } catch {} };
  const stopListening = () => { try { recRef.current?.stop(); setListening(false); } catch {} };

  useEffect(() => {
    if (!aiAutonomy) return;
    const script = [
      "Welcome to the engine. We'll work by signals, not guesses.",
      "Option one: NovaMint.",
      "Option two: Arcora.",
      "Option three: LumenFold.",
    ];
    let i = 0;
    setSpeakingNow(true);
    const id = setInterval(() => {
      if (i >= script.length) { setSpeakingNow(false); clearInterval(id); return; }
      const line = script[i++];
      actions.setRollingAI(line);
      speak(line);
      const m = line.match(/Option\s+\w+\s*:\s*(.+)\.?$/i);
      if (m?.[1]) actions.addCandidate(m[1].trim(), "ai_suggested");
    }, 2200);
    return () => { clearInterval(id); setSpeakingNow(false); };
  }, [aiAutonomy, actions]);

  return (
    <main className="min-h-screen bg-genesis">
      <div className="sticky top-0 z-10 border-b border-black/10 bg-white/30 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-[0.28em] text-black/50">BRANDLE</div>
            <div className="text-lg font-semibold text-black/80">dRANb</div>
            <div className="text-xs text-black/50">Voice-first Engine Workspace</div>
          </div>

          <div className="flex items-center gap-3">
            <TrendsPanel />
            <VitalsMeter />
            <button
              onClick={() => actions.toggleAutonomy()}
              className={`px-4 py-2 rounded-xl border shadow-sm text-sm transition ${aiAutonomy ? "bg-black text-white border-black" : "bg-white/45 border-black/10 hover:bg-white/60"}`}
            >
              {aiAutonomy ? "AI Running" : "Let AI Run"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <QuoteStrip />
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white/40 backdrop-blur border border-black/5 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.25em] text-black/45">VOICE WORKSHOP</div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-black/45">{supported ? "Speech OK" : "Speech not supported (Chrome recommended)"}</span>
                {!listening ? (
                  <button onClick={startListening} className="px-3 py-2 rounded-xl bg-black/90 text-white hover:bg-black transition text-sm">
                    Start Listening
                  </button>
                ) : (
                  <button onClick={stopListening} className="px-3 py-2 rounded-xl bg-white/70 border border-black/10 hover:bg-white transition text-sm">
                    Stop
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/70 border border-black/10 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] tracking-[0.2em] text-black/45">USER</div>
                  <Waveform active={listening} />
                </div>
                <div className="mt-2">
                  <RollingLine label="SIGNAL" text={rollingUser || "—"} />
                </div>
                <div className="mt-2 text-[11px] text-black/45">Say: <span className="font-mono">Add candidate: NovaMint</span></div>
              </div>

              <div className="rounded-xl bg-white/70 border border-black/10 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] tracking-[0.2em] text-black/45">AI</div>
                  <Waveform active={speakingNow || aiAutonomy} />
                </div>
                <div className="mt-2">
                  <RollingLine label="OUTPUT" text={rollingAI || (aiAutonomy ? "Autonomy running…" : "—")} />
                </div>
                <div className="mt-2 text-[11px] text-black/45">Waveform shows AI speaking even if muted.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-3"><CandidateBoard /></div>
          <div className="xl:col-span-6 space-y-4"><CandidateDetail /><IdentityPreview /></div>
          <div className="xl:col-span-3"><SessionReport /></div>
        </div>
      </div>
    </main>
  );
}
