import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PARTS = [
  { num: 1, color: "#C9A84C", accent: "#F0D07A" },
  { num: 2, color: "#5B9BD5", accent: "#A8CFEE" },
  { num: 3, color: "#4CAF89", accent: "#80D4B1" },
  { num: 4, color: "#E05C4A", accent: "#F0907A" },
  { num: 5, color: "#9B7FD4", accent: "#C4AAEE" },
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

export default function A_Series() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

        .as-page {
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
        .as-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 10% 10%, rgba(201,168,76,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 55% at 88% 85%, rgba(91,155,213,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 50%, #0b0d18 0%, #06080f 100%);
        }
        .as-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center; width: 100%;
        }

        /* back */
        .as-back {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.65;
          text-decoration: none;
          margin-bottom: 52px;
          transition: opacity 0.2s, gap 0.2s;
          animation: asRise 0.5s ease both;
        }
        .as-back:hover { opacity: 1; gap: 13px; }

        /* header */
        .as-header {
          text-align: center; margin-bottom: 44px;
          animation: asRise 0.65s 0.05s ease both;
        }
        .as-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.7; margin-bottom: 18px;
        }
        .as-eyebrow span {
          display: inline-block; width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .as-eyebrow span:last-child { background: linear-gradient(90deg, #C9A84C, transparent); }

        .as-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 700; line-height: 1;
          color: #e8dfc8; letter-spacing: -1px; margin-bottom: 8px;
        }
        .as-title em {
          font-style: italic;
          background: linear-gradient(135deg, #C9A84C, #F0D07A, #C9A84C);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .as-sub {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(232,223,200,0.32);
        }

        /* ornament */
        .as-orn {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin-bottom: 44px;
          animation: asRise 0.6s 0.1s ease both;
        }
        .orn-l { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4)); }
        .orn-l:last-child { background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent); }
        .orn-d { width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg); opacity: 0.45; }
        .orn-s { width: 3px; height: 3px; background: #C9A84C; transform: rotate(45deg); opacity: 0.2; }

        /* grid */
        .as-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          width: min(780px, 100%);
        }

        /* card */
        .as-card {
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
          animation: asRise 0.55s ease both;
        }
        .as-card:hover {
          transform: translateY(-7px) scale(1.02);
          border-color: rgba(201,168,76,0.32);
          box-shadow: 0 28px 55px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.07);
        }
        .as-card:hover .ac-glow  { opacity: 1; }
        .as-card:hover .ac-shine { opacity: 0.75; }
        .as-card:hover .ac-arrow { transform: translateX(5px); opacity: 1; }

        .ac-glow {
          position: absolute; inset: 0; border-radius: 16px;
          opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .ac-shine {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          opacity: 0.45; transition: opacity 0.3s;
        }
        .ac-num {
          position: absolute; top: 14px; right: 16px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px;
          color: rgba(201,168,76,0.18);
        }
        .ac-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.28); margin-bottom: 8px;
        }
        .ac-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 700; line-height: 1;
          margin-bottom: 4px;
        }
        .ac-desc {
          font-size: 12px; color: rgba(232,223,200,0.35);
          font-family: 'DM Mono', monospace; letter-spacing: 1px;
        }
        .ac-arrow {
          margin-top: 20px; opacity: 0.38;
          transition: transform 0.25s, opacity 0.25s;
        }

        /* footer */
        .as-footer {
          margin-top: 64px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(201,168,76,0.16); text-transform: uppercase;
          animation: asRise 0.7s 0.55s ease both;
        }

        @keyframes asRise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .as-page { padding: 36px 16px 60px; }
          .as-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="as-page">
        <div className="as-mesh" />
        <ParticleCanvas />

        <div className="as-inner">
          <Link to="/dictionary/dictionary" className="as-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Dictionary
          </Link>

          <header className="as-header">
            <div className="as-eyebrow"><span />&nbsp;Dictionary&nbsp;<span /></div>
            <h1 className="as-title"><em>A</em> Series</h1>
            <p className="as-sub">Select a part to study</p>
          </header>

          <div className="as-orn">
            <div className="orn-l" /><div className="orn-s" /><div className="orn-d" /><div className="orn-s" /><div className="orn-l" />
          </div>

          <div className="as-grid">
            {PARTS.map((p, i) => (
              <Link
                key={p.num}
                to={`/dictionary/a_series/part${p.num}`}
                className="as-card"
                style={{ animationDelay: `${i * 0.07 + 0.18}s` }}
              >
                <div className="ac-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}1e 0%, transparent 70%)` }} />
                <div className="ac-shine" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <span className="ac-num">0{p.num}</span>
                <p className="ac-label">Part</p>
                <h2 className="ac-title" style={{ color: p.accent }}>{p.num}</h2>
                <p className="ac-desc">A · Part {p.num}</p>
                <div className="ac-arrow" style={{ color: p.color }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <footer className="as-footer">© 2025 &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; Tamil Excellence</footer>
        </div>
      </div>
    </>
  );
}
