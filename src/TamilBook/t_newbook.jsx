import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const BOOKS = [
  {
    num: "01",
    icon: "📘",
    label: "Tamil Textbook",
    title: "6th Book",
    tamil: "ஆறாம் வகுப்பு",
    desc: "தமிழ் பாடநூல்",
    descEn: "Sixth Standard · Tamil",
    to: "/TamilBook/sixth_book",
    color: "#C9A84C",
    accent: "#F0D07A",
  },
  {
    num: "02",
    icon: "📗",
    label: "Tamil Textbook",
    title: "7th Book",
    tamil: "ஏழாம் வகுப்பு",
    desc: "தமிழ் பாடநூல்",
    descEn: "Seventh Standard · Tamil",
    to: "/tamilbook/seven/seven",
    color: "#A07840",
    accent: "#D4A85A",
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

export default function T_NewBook() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

        .nb-page {
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
        .nb-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 12% 8%,  rgba(201,168,76,0.09) 0%, transparent 58%),
            radial-gradient(ellipse 45% 50% at 85% 85%, rgba(160,120,64,0.07)  0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 50%, #0b0d18 0%, #06080f 100%);
        }
        .nb-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 760px;
        }

        .nb-back {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.65;
          text-decoration: none;
          margin-bottom: 52px;
          transition: opacity 0.2s, gap 0.2s;
          animation: nbRise 0.5s ease both;
        }
        .nb-back:hover { opacity: 1; gap: 13px; }

        .nb-header {
          text-align: center; margin-bottom: 20px;
          animation: nbRise 0.65s 0.05s ease both;
        }
        .nb-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.7; margin-bottom: 18px;
        }
        .nb-eyebrow span {
          display: inline-block; width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .nb-eyebrow span:last-child { background: linear-gradient(90deg, #C9A84C, transparent); }

        .nb-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: clamp(32px, 5vw, 60px);
          font-weight: 700; line-height: 1;
          color: #e8dfc8; letter-spacing: -1px; margin-bottom: 8px;
        }
        .nb-en {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 17px;
          color: #C9A84C; opacity: 0.65; letter-spacing: 3px;
          margin-bottom: 28px;
        }

        .nb-orn {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin-bottom: 44px;
          animation: nbRise 0.6s 0.1s ease both;
        }
        .orn-l { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4)); }
        .orn-l:last-child { background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent); }
        .orn-d { width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg); opacity: 0.45; }
        .orn-s { width: 3px; height: 3px; background: #C9A84C; transform: rotate(45deg); opacity: 0.2; }

        .nb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
          width: 100%;
        }

        .nb-card {
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
          animation: nbRise 0.55s ease both;
        }
        .nb-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 32px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.06);
        }
        .nb-card:hover .bc-glow  { opacity: 1; }
        .nb-card:hover .bc-shine { opacity: 0.8; }
        .nb-card:hover .bc-arrow { transform: translateX(5px); opacity: 1; }

        .bc-glow {
          position: absolute; inset: 0; border-radius: 18px;
          opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .bc-shine {
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          opacity: 0.4; transition: opacity 0.3s;
        }
        .bc-num {
          position: absolute; top: 16px; right: 18px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px;
          color: rgba(201,168,76,0.15);
        }
        .bc-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.25);
          margin-bottom: 16px;
        }
        .bc-badge-dot { width: 4px; height: 4px; border-radius: 50%; opacity: 0.5; }

        .bc-icon { font-size: 30px; margin-bottom: 12px; }

        .bc-ta-desc {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 15px; font-weight: 700;
          line-height: 1.3; margin-bottom: 3px;
        }
        .bc-en-desc {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          opacity: 0.3; margin-bottom: 16px;
        }

        .bc-divider { width: 28px; height: 1px; margin-bottom: 14px; opacity: 0.3; }

        .bc-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.22); margin-bottom: 4px;
        }
        .bc-title-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 12px; opacity: 0.35; margin-bottom: 4px;
        }
        .bc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 600; line-height: 1.1;
        }
        .bc-arrow {
          margin-top: 22px; opacity: 0.35;
          transition: transform 0.25s, opacity 0.25s;
        }

        .nb-footer {
          margin-top: 64px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(201,168,76,0.14); text-transform: uppercase;
          animation: nbRise 0.7s 0.5s ease both;
        }

        @keyframes nbRise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .nb-page { padding: 36px 16px 60px; }
          .nb-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="nb-page">
        <div className="nb-mesh" />
        <ParticleCanvas />

        <div className="nb-inner">

          <Link to="/TamilBook" className="nb-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            தமிழ் நூலகம்
          </Link>

          <header className="nb-header">
            <div className="nb-eyebrow"><span />&nbsp;புதிய நூல்கள்&nbsp;<span /></div>
            <h1 className="nb-ta">பாடநூல்கள்</h1>
            <p className="nb-en">New Textbooks</p>
          </header>

          <div className="nb-orn">
            <div className="orn-l" /><div className="orn-s" /><div className="orn-d" /><div className="orn-s" /><div className="orn-l" />
          </div>

          <div className="nb-grid">
            {BOOKS.map((b, i) => (
              <Link
                key={b.num}
                to={b.to}
                className="nb-card"
                style={{ animationDelay: `${i * 0.08 + 0.18}s` }}
              >
                <div className="bc-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${b.color}22 0%, transparent 70%)` }} />
                <div className="bc-shine" style={{ background: `linear-gradient(90deg, transparent, ${b.color}, transparent)` }} />
                <span className="bc-num">{b.num}</span>

                <div className="bc-badge">
                  <div className="bc-badge-dot" style={{ background: b.color }} />
                  {b.label}
                </div>

                <div className="bc-icon">{b.icon}</div>

                <p className="bc-ta-desc" style={{ color: b.accent }}>{b.desc}</p>
                <p className="bc-en-desc" style={{ color: b.color }}>{b.descEn}</p>

                <div className="bc-divider" style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }} />

                <p className="bc-label">வகுப்பு / Standard</p>
                <p className="bc-title-ta">{b.tamil}</p>
                <h2 className="bc-title" style={{ color: b.accent }}>{b.title}</h2>

                <div className="bc-arrow" style={{ color: b.color }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <footer className="nb-footer">© 2025 &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; Tamil Excellence</footer>

        </div>
      </div>
    </>
  );
}
