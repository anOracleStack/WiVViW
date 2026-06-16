// WiVViW — Next-Galaxy Consolidated Dashboard
// Drop into Cursor as: src/pages/Dashboard.jsx (or .tsx with minor typing)
// Fonts loaded via <link> in index.html — add these:
//   Syne (700,800) · JetBrains Mono (400,500) · DM Sans (300,400,500)

import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  gold:    "#E8B923",
  goldDim: "rgba(232,185,35,0.12)",
  goldGlow:"rgba(232,185,35,0.35)",
  bg:      "#030308",
  surface: "rgba(255,255,255,0.032)",
  border:  "rgba(255,255,255,0.06)",
  borderHover: "rgba(232,185,35,0.3)",
  text:    "#F0EDE8",
  textDim: "rgba(240,237,232,0.45)",
  textFaint:"rgba(240,237,232,0.22)",
};

// ─── ENGINE CONSTELLATION DATA ────────────────────────────────────────────────
const ENGINES = [
  {
    id: "dRANb",
    label: "dRANb",
    sub: "Naming · Glass Box",
    metaphor: "The Workbench",
    color: "#2ECFB0",
    glow: "rgba(46,207,176,0.4)",
    status: "live",
    pulse: 94,
    x: 50, y: 28,
    desc: "Generate, score & shortlist brand name candidates across 6 linguistic families.",
    runs: 3,
    route: "/dranb",
  },
  {
    id: "brandL",
    label: "brandL",
    sub: "Identity Consolidation",
    metaphor: "The Ladder",
    color: "#3B9EE8",
    glow: "rgba(59,158,232,0.4)",
    status: "locked",
    pulse: 0,
    x: 78, y: 48,
    desc: "Domain ladders, handle strategy, compromise-cost modeling & reclaimability.",
    runs: 0,
    route: "/brandl",
  },
  {
    id: "4IELD",
    label: "4IELD",
    sub: "Field Intelligence",
    metaphor: "The Map",
    color: "#9B6EE8",
    glow: "rgba(155,110,232,0.4)",
    status: "premium",
    pulse: 0,
    x: 72, y: 76,
    desc: "Competitor clusters, whitespace zones, heat maps, drift index & expansion paths.",
    runs: 0,
    route: "/4ield",
  },
  {
    id: "4TRESS",
    label: "4TRESS",
    sub: "Protection · Non-Legal",
    metaphor: "The Checklist Vault",
    color: "#E8922E",
    glow: "rgba(232,146,46,0.4)",
    status: "premium",
    pulse: 0,
    x: 28, y: 76,
    desc: "Trademark readiness, class suggestions, filing prep & evidence checklists.",
    runs: 0,
    route: "/4tress",
  },
  {
    id: "V4ULT",
    label: "V4ULT",
    sub: "Archive · Timeline",
    metaphor: "The Time Spine",
    color: "#4A8FC4",
    glow: "rgba(74,143,196,0.4)",
    status: "live",
    pulse: 71,
    x: 22, y: 48,
    desc: "Branching decision timeline — lock, branch, diff. Every output leaves a trail.",
    runs: 1,
    route: "/vault",
  },
  {
    id: "6ROXY",
    label: "6ROXY",
    sub: "Digital Twin · Avatar",
    metaphor: "The Proxy",
    color: "#E84B6E",
    glow: "rgba(232,75,110,0.4)",
    status: "coming",
    pulse: 0,
    x: 18, y: 24,
    desc: "Biometric voice & video clone that runs your business — calls, meetings, content.",
    runs: 0,
    route: null,
  },
  {
    id: "3XEC",
    label: "3XEC",
    sub: "Operations · Automation",
    metaphor: "The Engine Room",
    color: "#E8B923",
    glow: "rgba(232,185,35,0.4)",
    status: "coming",
    pulse: 0,
    x: 82, y: 24,
    desc: "Full business automation — scheduling, emails, content, decisions, execution.",
    runs: 0,
    route: null,
  },
];

const CONNECTIONS = [
  ["dRANb", "brandL"],
  ["dRANb", "4IELD"],
  ["dRANb", "V4ULT"],
  ["brandL", "4IELD"],
  ["brandL", "4TRESS"],
  ["V4ULT", "4TRESS"],
  ["dRANb", "6ROXY"],
  ["3XEC", "dRANb"],
  ["3XEC", "brandL"],
];

const RITUAL = ["Intake", "Generate", "Evaluate", "Shortlist", "Decide", "Export", "Handoff"];

const RECEIPTS = [
  { time: "14:32:01", action: "dRANb — Generation complete", detail: "45 candidates · 6 families · 5 filtered", confidence: "high", engine: "dRANb" },
  { time: "14:30:15", action: "Brief parsed", detail: "Innovation · Simplicity · Reliability extracted", confidence: "medium", engine: "dRANb" },
  { time: "14:28:00", action: "V4ULT — Snapshot locked", detail: "TechFlow v0.3 sealed at 14:28:00", confidence: "high", engine: "V4ULT" },
];

// ─── PARTICLE FIELD ────────────────────────────────────────────────────────────
function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      a: Math.random() * 0.55 + 0.1,
      sp: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame;
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.sp * 1000 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,237,232,${alpha})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5 }}
    />
  );
}

// ─── CONSTELLATION SVG ─────────────────────────────────────────────────────────
function Constellation({ engines, connections, active, onHover }) {
  const getEngine = (id) => engines.find(e => e.id === id);
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        {engines.map(e => (
          <radialGradient key={e.id} id={`glow-${e.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={e.color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={e.color} stopOpacity="0" />
          </radialGradient>
        ))}
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Connection lines */}
      {connections.map(([a, b], i) => {
        const ea = getEngine(a), eb = getEngine(b);
        if (!ea || !eb) return null;
        const isActive = active === a || active === b;
        return (
          <line
            key={i}
            x1={ea.x} y1={ea.y} x2={eb.x} y2={eb.y}
            stroke={isActive ? T.gold : "rgba(240,237,232,0.06)"}
            strokeWidth={isActive ? "0.4" : "0.2"}
            style={{ transition: "all 0.4s ease" }}
          />
        );
      })}

      {/* Nodes */}
      {engines.map(e => {
        const isActive = active === e.id;
        const isLive = e.status === "live";
        return (
          <g key={e.id}
            transform={`translate(${e.x},${e.y})`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onHover(e.id)}
            onMouseLeave={() => onHover(null)}
          >
            {/* Glow halo */}
            {(isActive || isLive) && (
              <circle r="5" fill={`url(#glow-${e.id})`} filter="url(#blur-sm)"
                style={{ animation: isLive ? "pulse 2.5s ease-in-out infinite" : "none" }}
              />
            )}
            {/* Outer ring */}
            <circle r="2.8"
              fill="rgba(3,3,8,0.85)"
              stroke={isActive ? e.color : e.status === "live" ? e.color + "88" : "rgba(240,237,232,0.15)"}
              strokeWidth={isActive ? "0.5" : "0.3"}
              style={{ transition: "all 0.3s ease" }}
            />
            {/* Inner fill */}
            <circle r="1.6"
              fill={isActive ? e.color : e.status === "live" ? e.color + "55" : "rgba(240,237,232,0.08)"}
              style={{ transition: "all 0.3s ease" }}
            />
            {/* Status pip */}
            {e.status === "live" && (
              <circle cx="2.2" cy="-2.2" r="0.6" fill={e.color}
                style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
              />
            )}
            {/* Label */}
            <text
              y="4.8"
              textAnchor="middle"
              fontSize="2.2"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="500"
              fill={isActive ? e.color : T.textDim}
              style={{ transition: "fill 0.3s ease", letterSpacing: "0.02em" }}
            >
              {e.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── ENGINE CARD ────────────────────────────────────────────────────────────────
function EngineCard({ engine, active }) {
  const statusMap = {
    live:    { label: "LIVE",    bg: "rgba(46,207,176,0.12)",  border: "rgba(46,207,176,0.3)",  text: "#2ECFB0" },
    locked:  { label: "LOCKED", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", text: T.textFaint },
    premium: { label: "PREMIUM",bg: "rgba(232,185,35,0.08)",  border: "rgba(232,185,35,0.2)",  text: T.gold },
    coming:  { label: "SOON",   bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.05)", text: T.textFaint },
  };
  const st = statusMap[engine.status];
  const isActive = active === engine.id;

  return (
    <div style={{
      background: isActive ? `${engine.glow.replace("0.4","0.06")}` : T.surface,
      border: `1px solid ${isActive ? engine.color + "44" : T.border}`,
      borderRadius: 12,
      padding: "16px 18px",
      transition: "all 0.35s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top glow line */}
      {isActive && (
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: `linear-gradient(90deg, transparent, ${engine.color}88, transparent)`,
        }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.18em", marginBottom: 4 }}>
            {engine.metaphor.toUpperCase()}
          </div>
          <div style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: isActive ? engine.color : T.text, letterSpacing: "-0.01em", lineHeight: 1 }}>
            {engine.label}
          </div>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: T.textDim, marginTop: 3 }}>
            {engine.sub}
          </div>
        </div>
        <div style={{
          fontSize: 8, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
          color: st.text, background: st.bg, border: `1px solid ${st.border}`,
          borderRadius: 4, padding: "3px 7px", letterSpacing: "0.12em", whiteSpace: "nowrap",
        }}>
          {st.label}
        </div>
      </div>

      <div style={{ fontSize: 11.5, color: T.textDim, lineHeight: 1.55, marginBottom: 12 }}>
        {engine.desc}
      </div>

      {engine.status === "live" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1, overflow: "hidden" }}>
            <div style={{
              width: `${engine.pulse}%`, height: "100%",
              background: `linear-gradient(90deg, ${engine.color}66, ${engine.color})`,
              borderRadius: 1,
            }} />
          </div>
          <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: engine.color }}>
            {engine.pulse}%
          </span>
        </div>
      )}

      {engine.runs > 0 && (
        <div style={{ marginTop: 8, fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint }}>
          {engine.runs} run{engine.runs !== 1 ? "s" : ""} this session
        </div>
      )}
    </div>
  );
}

// ─── VITALS BAR ─────────────────────────────────────────────────────────────────
function VitalBar({ label, value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, width: 64, letterSpacing: "0.12em" }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%",
          background: `linear-gradient(90deg, ${color}55, ${color})`,
          borderRadius: 2, transition: "width 1.2s cubic-bezier(.16,1,.3,1)"
        }} />
      </div>
      <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color, width: 28, textAlign: "right" }}>
        {value}
      </div>
    </div>
  );
}

// ─── RECEIPT ITEM ──────────────────────────────────────────────────────────────
function ReceiptItem({ item }) {
  const engineColor = ENGINES.find(e => e.id === item.engine)?.color || T.textDim;
  return (
    <div style={{ display: "flex", gap: 10, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ width: 3, flexShrink: 0, background: engineColor, borderRadius: 2, opacity: 0.7 }} />
      <div>
        <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: engineColor, marginBottom: 2 }}>
          {item.time} · {item.engine}
        </div>
        <div style={{ fontSize: 11, color: T.text, marginBottom: 2, fontWeight: 500 }}>{item.action}</div>
        <div style={{ fontSize: 10, color: T.textDim }}>{item.detail}</div>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ─────────────────────────────────────────────────────────────
export default function WiVViWDashboard() {
  const [activeEngine, setActiveEngine] = useState(null);
  const [ritualStep, setRitualStep] = useState(0);
  const [tick, setTick] = useState(0);
  const [showReceipts, setShowReceipts] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRitualStep(s => (s + 1) % RITUAL.length), 3200);
    return () => clearInterval(id);
  }, []);

  const activeEng = ENGINES.find(e => e.id === activeEngine);

  return (
    <div style={{
      minHeight: "100vh", background: T.bg, fontFamily: "'DM Sans', sans-serif",
      color: T.text, position: "relative", overflow: "hidden",
    }}>
      {/* Load fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes ping  { 75%,100%{transform:scale(2);opacity:0} }
        @keyframes sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes fadein{ from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(232,185,35,0.2);border-radius:2px}
      `}</style>

      <StarField />

      {/* Ambient gold nebula */}
      <div style={{
        position: "fixed", top: "15%", left: "35%", width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(232,185,35,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "20%", right: "10%", width: 400, height: 400,
        background: "radial-gradient(ellipse, rgba(46,207,176,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: "relative", zIndex: 10,
        borderBottom: `1px solid ${T.border}`,
        background: "rgba(3,3,8,0.7)", backdropFilter: "blur(20px)",
        padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="9" fill="rgba(232,185,35,0.08)" stroke="rgba(232,185,35,0.2)" strokeWidth="1"/>
            <path d="M6 14L10.5 14L14 28L18 18L22 28L24 20L26 28L30 18L34 28L37.5 14L42 14L36 36L32 36L28 24L24 36L20 24L16 36L12 36Z"
              fill={T.gold} fillRule="evenodd"/>
            <line x1="24" y1="10" x2="24" y2="38" stroke={T.gold} strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.4"/>
          </svg>
          <div>
            <div style={{ fontSize: 20, fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: "-0.02em", color: T.text }}>
              WiVViW
            </div>
            <div style={{ fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.22em" }}>
              BUSINESS METAVERSE OS
            </div>
          </div>
        </div>

        {/* Ritual Flow indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {RITUAL.map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace",
                padding: "4px 10px", borderRadius: 5,
                background: i === ritualStep ? T.goldDim : "transparent",
                color: i === ritualStep ? T.gold : i < ritualStep ? T.textDim + "88" : T.textFaint,
                border: `1px solid ${i === ritualStep ? "rgba(232,185,35,0.3)" : "transparent"}`,
                transition: "all 0.5s ease", letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}>
                {step}
              </div>
              {i < RITUAL.length - 1 && (
                <div style={{ width: 10, height: 1, background: i < ritualStep ? T.gold + "55" : T.border }} />
              )}
            </div>
          ))}
        </div>

        {/* System pulse */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 8, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.15em" }}>
              SYSTEM
            </div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#2ECFB0" }}>
              NOMINAL
            </div>
          </div>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: "#2ECFB0",
            boxShadow: "0 0 10px rgba(46,207,176,0.8)",
            animation: "pulse 2.5s ease-in-out infinite",
          }} />
        </div>
      </header>

      {/* ── MAIN GRID ───────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "grid", gridTemplateColumns: "1fr 420px",
        gap: 0, height: "calc(100vh - 62px)",
        animation: "fadein 0.6s ease forwards",
      }}>

        {/* LEFT — Constellation */}
        <div style={{ display: "flex", flexDirection: "column", borderRight: `1px solid ${T.border}` }}>

          {/* Constellation map */}
          <div style={{ flex: 1, position: "relative", padding: "24px 32px" }}>
            <div style={{ position: "absolute", top: 24, left: 32 }}>
              <div style={{ fontSize: 8, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.2em" }}>
                ENGINE CONSTELLATION · {ENGINES.filter(e => e.status === "live").length} ACTIVE
              </div>
            </div>

            <div style={{ width: "100%", height: "100%", paddingTop: 20 }}>
              <Constellation
                engines={ENGINES}
                connections={CONNECTIONS}
                active={activeEngine}
                onHover={setActiveEngine}
              />
            </div>

            {/* Active engine tooltip */}
            {activeEng && (
              <div style={{
                position: "absolute", bottom: 28, left: 32,
                background: "rgba(3,3,8,0.92)", backdropFilter: "blur(16px)",
                border: `1px solid ${activeEng.color}44`,
                borderRadius: 10, padding: "12px 16px", maxWidth: 280,
                animation: "fadein 0.2s ease forwards",
              }}>
                <div style={{ fontSize: 8, fontFamily: "'JetBrains Mono', monospace", color: activeEng.color, marginBottom: 4, letterSpacing: "0.15em" }}>
                  {activeEng.metaphor.toUpperCase()}
                </div>
                <div style={{ fontSize: 15, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: activeEng.color, marginBottom: 4 }}>
                  {activeEng.label}
                </div>
                <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.5 }}>{activeEng.desc}</div>
              </div>
            )}
          </div>

          {/* Engine grid */}
          <div style={{
            borderTop: `1px solid ${T.border}`,
            padding: "20px 28px",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10,
            maxHeight: 300, overflowY: "auto",
          }}>
            {ENGINES.map(e => (
              <EngineCard key={e.id} engine={e} active={activeEngine}
                onMouseEnter={() => setActiveEngine(e.id)}
                onMouseLeave={() => setActiveEngine(null)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Vitals + Activity */}
        <div style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>

          {/* System Vitals */}
          <div style={{ padding: "24px 24px 20px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.2em", marginBottom: 16 }}>
              SYSTEM VITALS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <VitalBar label="PULSE"    value={72 + (tick % 3) * 2} color="#2ECFB0" />
              <VitalBar label="CLARITY"  value={68} color={T.gold} />
              <VitalBar label="VELOCITY" value={85} color="#9B6EE8" />
              <VitalBar label="SIGNAL"   value={91} color="#3B9EE8" />
            </div>
          </div>

          {/* Project */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.2em", marginBottom: 14 }}>
              ACTIVE PROJECT
            </div>
            <div style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>TechFlow Rebrand</div>
                <div style={{
                  fontSize: 8, fontFamily: "'JetBrains Mono', monospace", color: "#2ECFB0",
                  background: "rgba(46,207,176,0.1)", border: "1px solid rgba(46,207,176,0.25)",
                  borderRadius: 4, padding: "3px 8px", letterSpacing: "0.1em",
                }}>ACTIVE</div>
              </div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 12 }}>B2B SaaS productivity platform</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: "Runs", val: "3 / 5" },
                  { label: "Shortlisted", val: "5 names" },
                  { label: "Updated", val: "2h ago" },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: T.gold }}>{stat.val}</div>
                    <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Receipts */}
          <div style={{ padding: "20px 24px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.2em" }}>
                RECEIPTS · GLASS BOX LOG
              </div>
              <div style={{
                width: 6, height: 6, borderRadius: "50%", background: T.gold,
                boxShadow: `0 0 8px ${T.goldGlow}`,
                animation: "pulse 2s ease-in-out infinite",
              }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {RECEIPTS.map((r, i) => <ReceiptItem key={i} item={r} />)}
            </div>
          </div>

          {/* 5-Pillar footer */}
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 8, fontFamily: "'JetBrains Mono', monospace", color: T.textFaint, letterSpacing: "0.2em", marginBottom: 10 }}>
              THE 5-PILLAR MOAT
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Glass Box Scoring", "Evidence Vault", "V4ULT Timeline", "Ritual Workflows", "Modular Engines"].map(p => (
                <div key={p} style={{
                  fontSize: 9, fontFamily: "'JetBrains Mono', monospace",
                  color: T.textFaint, background: "rgba(232,185,35,0.05)",
                  border: `1px solid rgba(232,185,35,0.1)`,
                  borderRadius: 4, padding: "4px 8px",
                }}>{p}</div>
              ))}
            </div>
          </div>

          {/* Doctrine quote */}
          <div style={{
            padding: "14px 24px",
            borderTop: `1px solid ${T.border}`,
            background: T.goldDim,
          }}>
            <div style={{
              fontSize: 11, fontStyle: "italic", color: T.gold,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              letterSpacing: "0.01em", lineHeight: 1.6,
            }}>
              "No hype. No guarantees. Just decisions."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
