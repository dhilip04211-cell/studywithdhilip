import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const PARTS = [
  {
    num: "01",
    icon: "᪁",
    label: "First Section",
    title: "Part 1",
    tamil: "முதல் பகுதி",
    to: "/Thirukkural/thirukkural_old_part1",
    color: "#C9A84C",
    accent: "#F0D07A",
    desc: "அறத்துப்பால்",
    descEn: "Aram · Virtue",
  },
  {
    num: "02",
    icon: "᪂",
    label: "Second Section",
    title: "Part 2",
    tamil: "இரண்டாம் பகுதி",
    to: "/Thirukkural/thirukkural_old_part2",
    color: "#A07840",
    accent: "#D4A85A",
    desc: "பொருட்பால்",
    descEn: "Porul · Wealth",
  },
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
        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
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

export default function Thirukkural_old() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

        .ob-page {
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
        .ob-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 12% 8%,  rgba(201,168,76,0.09) 0%, transparent 58%),
            radial-gradient(ellipse 45% 50% at 85% 85%, rgba(176,64,64,0.07)  0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 50%, #0b0d18 0%, #06080f 100%);
        }
        .ob-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 760px;
        }

        /* breadcrumb */
        .ob-breadcrumb {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.55;
          text-decoration: none;
          margin-bottom: 48px;
          transition: opacity 0.2s;
          animation: obRise 0.5s ease both;
        }
        .ob-breadcrumb:hover { opacity: 0.9; }
        .ob-breadcrumb-sep { opacity: 0.3; margin: 0 2px; }

        /* header */
        .ob-header {
          text-align: center; margin-bottom: 18px;
          animation: obRise 0.6s 0.05s ease both;
        }
        .ob-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.6; margin-bottom: 16px;
        }
        .ob-eyebrow span {
          display: inline-block; width: 24px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .ob-eyebrow span:last-child { background: linear-gradient(90deg, #C9A84C, transparent); }

        .ob-title-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700; line-height: 1;
          color: #e8dfc8; margin-bottom: 6px;
        }
        .ob-title-en {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 15px;
          color: #C9A84C; opacity: 0.6; letter-spacing: 3px;
          margin-bottom: 24px;
        }

        /* ornament */
        .ob-orn {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin-bottom: 40px;
          animation: obRise 0.6s 0.1s ease both;
        }
        .orn-l  { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35)); }
        .orn-l:last-child { background: linear-gradient(90deg, rgba(201,168,76,0.35), transparent); }
        .orn-d  { width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg); opacity: 0.4; }
        .orn-s  { width: 3px; height: 3px; background: #C9A84C; transform: rotate(45deg); opacity: 0.18; }

        /* grid */
        .ob-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
          width: 100%;
        }

        /* card */
        .ob-card {
          position: relative;
          display: flex; flex-direction: column;
          padding: 32px 28px 26px;
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.12);
          text-decoration: none;
          color: #e8dfc8;
          overflow: hidden;
          backdrop-filter: blur(8px);
          transition: transform 0.32s cubic-bezier(.22,.68,0,1.2), border-color 0.3s, box-shadow 0.3s;
          animation: obRise 0.55s ease both;
        }
        .ob-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 32px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.06);
        }
        .ob-card:hover .pc-glow  { opacity: 1; }
        .ob-card:hover .pc-shine { opacity: 0.8; }
        .ob-card:hover .pc-arrow { transform: translateX(5px); opacity: 1; }

        .pc-glow {
          position: absolute; inset: 0; border-radius: 18px;
          opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .pc-shine {
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          opacity: 0.4; transition: opacity 0.3s;
        }
        .pc-num {
          position: absolute; top: 16px; right: 18px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px;
          color: rgba(201,168,76,0.15);
        }

        /* card badge */
        .pc-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.25);
          margin-bottom: 18px;
        }
        .pc-badge-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #C9A84C; opacity: 0.4;
        }

        .pc-ta-desc {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 22px; font-weight: 700;
          line-height: 1.2; margin-bottom: 4px;
        }
        .pc-en-desc {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          opacity: 0.3; margin-bottom: 18px;
        }

        .pc-divider {
          width: 28px; height: 1px;
          margin-bottom: 14px;
          opacity: 0.3;
        }

        .pc-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.22); margin-bottom: 4px;
        }
        .pc-title-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 12px; opacity: 0.35; margin-bottom: 4px;
        }
        .pc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 600; line-height: 1.1;
        }
        .pc-arrow {
          margin-top: 22px; opacity: 0.35;
          transition: transform 0.25s, opacity 0.25s;
        }

        /* footer */
        .ob-footer {
          margin-top: 64px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(201,168,76,0.14); text-transform: uppercase;
          animation: obRise 0.7s 0.5s ease both;
        }

        @keyframes obRise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .ob-page { padding: 36px 16px 60px; }
          .ob-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ob-page">
        <div className="ob-mesh" />
        <ParticleCanvas />

        <div className="ob-inner">

          {/* Breadcrumb back nav */}
          <Link to="/Thirukkural" className="ob-breadcrumb">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            திருக்குறள்
            <span className="ob-breadcrumb-sep">·</span>
            Old Book
          </Link>

          <header className="ob-header">
            <div className="ob-eyebrow"><span />&nbsp;பழைய நூல்&nbsp;<span /></div>
            <h1 className="ob-title-ta">பகுதிகள்</h1>
            <p className="ob-title-en">Select a Part</p>
          </header>

          <div className="ob-orn">
            <div className="orn-l" /><div className="orn-s" /><div className="orn-d" /><div className="orn-s" /><div className="orn-l" />
          </div>

          <div className="ob-grid">
            {PARTS.map((p, i) => (
              <Link
                key={p.num}
                to={p.to}
                className="ob-card"
                style={{ animationDelay: `${i * 0.08 + 0.18}s` }}
              >
                <div className="pc-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}22 0%, transparent 70%)` }} />
                <div className="pc-shine" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <span className="pc-num">{p.num}</span>

                <div className="pc-badge">
                  <div className="pc-badge-dot" style={{ background: p.color }} />
                  {p.label}
                </div>

                <p className="pc-ta-desc" style={{ color: p.accent }}>{p.desc}</p>
                <p className="pc-en-desc" style={{ color: p.color }}>{p.descEn}</p>

                <div className="pc-divider" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

                <p className="pc-label">பகுதி / Part</p>
                <p className="pc-title-ta">{p.tamil}</p>
                <h2 className="pc-title" style={{ color: p.accent }}>{p.title}</h2>

                <div className="pc-arrow" style={{ color: p.color }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <footer className="ob-footer">© 2025 &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; Tamil Excellence</footer>

        </div>
      </div>
    </>
  );
}
