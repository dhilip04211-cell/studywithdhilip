import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const BASE = import.meta.env.BASE_URL;
const SERIES = [
  { id: "a_series", label: "A Series", tamil: "அ தொடர்", num: "01", color: "#C9A84C", accent: "#F0D07A" },
];

function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.2, dy: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.3 + 0.08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.dx; d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width)  d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${d.o})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++)
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.055 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

export default function Dictionary() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

        .dict-page {
          min-height: 100vh;
          background: #06080f;
          font-family: 'Outfit', sans-serif;
          color: #e8dfc8;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 80px;
        }
        .dict-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 10% 10%, rgba(201,168,76,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 55% at 88% 85%, rgba(91,155,213,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 50%, #0b0d18 0%, #06080f 100%);
        }
        .dict-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          width: 100%;
        }
        .dict-back {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.65;
          text-decoration: none;
          margin-bottom: 52px;
          transition: opacity 0.2s, gap 0.2s;
          animation: dictRise 0.5s ease both;
        }
        .dict-back:hover { opacity: 1; gap: 13px; }
        .dict-header {
          text-align: center; margin-bottom: 44px;
          animation: dictRise 0.65s 0.05s ease both;
        }
        .dict-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.7; margin-bottom: 18px;
        }
        .dict-eyebrow span {
          display: inline-block; width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .dict-eyebrow span:last-child { background: linear-gradient(90deg, #C9A84C, transparent); }
        .dict-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: clamp(38px, 6vw, 68px);
          font-weight: 700; line-height: 1;
          color: #e8dfc8; letter-spacing: -1px; margin-bottom: 8px;
        }
        .dict-en {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 17px;
          color: #C9A84C; opacity: 0.65; letter-spacing: 3px;
        }
        .dict-orn {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin-bottom: 44px;
          animation: dictRise 0.6s 0.1s ease both;
        }
        .orn-l { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4)); }
        .orn-l:last-child { background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent); }
        .orn-d { width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg); opacity: 0.45; }
        .orn-s { width: 3px; height: 3px; background: #C9A84C; transform: rotate(45deg); opacity: 0.2; }
        .dict-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 16px;
          width: min(700px, 100%);
        }
        .dict-card {
          position: relative;
          display: flex; flex-direction: column;
          padding: 26px 22px 22px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.13);
          text-decoration: none;
          color: #e8dfc8;
          overflow: hidden;
          backdrop-filter: blur(8px);
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), border-color 0.3s, box-shadow 0.3s;
          animation: dictRise 0.55s ease both;
        }
        .dict-card:hover {
          transform: translateY(-7px) scale(1.02);
          border-color: rgba(201,168,76,0.32);
          box-shadow: 0 28px 55px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.07);
        }
        .dict-card:hover .dc-glow  { opacity: 1; }
        .dict-card:hover .dc-shine { opacity: 0.75; }
        .dict-card:hover .dc-arrow { transform: translateX(5px); opacity: 1; }
        .dc-glow {
          position: absolute; inset: 0; border-radius: 16px;
          opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .dc-shine {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          opacity: 0.45; transition: opacity 0.3s;
        }
        .dc-num {
          position: absolute; top: 14px; right: 16px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px;
          color: rgba(201,168,76,0.18);
        }
        .dc-icon { font-size: 26px; margin-bottom: 14px; }
        .dc-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.3); margin-bottom: 5px;
        }
        .dc-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 14px; opacity: 0.5; margin-bottom: 4px;
        }
        .dc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; line-height: 1.1;
        }
        .dc-arrow {
          margin-top: 18px; opacity: 0.38;
          transition: transform 0.25s, opacity 0.25s;
        }
        .dict-footer {
          margin-top: 64px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(201,168,76,0.16);
          text-transform: uppercase;
          animation: dictRise 0.7s 0.5s ease both;
        }
        @keyframes dictRise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          .dict-page { padding: 36px 16px 60px; }
          .dict-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dict-page">
        <div className="dict-mesh" />
        <ParticleCanvas />

        <div className="dict-inner">

          {/* ✅ FIX 1: <a> tag for external HTML page, not <Link> */}
          <a href={`${BASE}Tamil/Tamil.html`} className="dict-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Tamil Hub
          </a>

          {/* ✅ FIX 2: header, ornament, grid, footer all inside dict-inner */}
          <header className="dict-header">
            <div className="dict-eyebrow"><span />&nbsp;Reference Tool&nbsp;<span /></div>
            <h1 className="dict-ta">அகராதி</h1>
            <p className="dict-en">Dictionary</p>
          </header>

          <div className="dict-orn">
            <div className="orn-l" /><div className="orn-s" /><div className="orn-d" /><div className="orn-s" /><div className="orn-l" />
          </div>

          <div className="dict-grid">
            {SERIES.map((s, i) => (
              <Link
                key={s.id}
                to={`/dictionary/${s.id}`}
                className="dict-card"
                style={{ animationDelay: `${i * 0.08 + 0.18}s` }}
              >
                <div className="dc-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}1e 0%, transparent 70%)` }} />
                <div className="dc-shine" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                <span className="dc-num">{s.num}</span>
                <div className="dc-icon">📖</div>
                <p className="dc-label">Series</p>
                <p className="dc-ta">{s.tamil}</p>
                <h2 className="dc-title" style={{ color: s.accent }}>{s.label}</h2>
                <div className="dc-arrow" style={{ color: s.color }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <footer className="dict-footer">© 2025 &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; Tamil Excellence</footer>

        </div>{/* ✅ end dict-inner */}
      </div>{/* ✅ end dict-page */}
    </>
  );
}
