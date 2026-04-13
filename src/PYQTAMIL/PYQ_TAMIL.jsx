import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const EXAMS = [
  {
    num: "01",
    icon: "📋",
    label: "Special Examination",
    title: "Special Exam — 2025",
    to: "/PYQTAMIL/special_examination_2025",
    color: "#C9A84C",
    accent: "#F0D07A",
  },
  {
    num: "02",
    icon: "📘",
    label: "Gr 2 Eligibility",
    title: "Gr 2 Eligibility — 2025",
    to: "/PYQTAMIL/gr2_mains_eligibility_2025",
    color: "#5B9BD5",
    accent: "#A8CFEE",
  },
  {
    num: "03",
    icon: "📘",
    label: "Gr 2 Prelims",
    title: "Gr 2 Prelims — 2025",
    to: "/PYQTAMIL/gr2_prelims_2025",
    color: "#4CAF89",
    accent: "#80D4B1",
  },
  {
    num: "04",
    icon: "📙",
    label: "Gr 2 Mains",
    title: "Gr 2 Mains — 2025",
    to: "/PYQTAMIL/gr_2_mains_2025",
    color: "#E05C4A",
    accent: "#F0907A",
  },
  {
    num: "05",
    icon: "📗",
    label: "Gr 4",
    title: "Gr 4 — 2025",
    to: "/PYQTAMIL/gr_4_2025",
    color: "#9B7FD4",
    accent: "#C4AAEE",
  },
  {
    num: "06",
    icon: "📝",
    label: "Special Examination",
    title: "Special Examination — 2025",
    to: "/PYQTAMIL/special_examination_2025",
    color: "#F39C12",
    accent: "#FFD27A",
  },
  {
    num: "07",
    icon: "🛠️",
    label: "Technical Diploma",
    title: "Technical Diploma — 2025",
    to: "/PYQTAMIL/technical_exam_diploma_2025",
    color: "#E91E63",
    accent: "#F48FB1",
  },
  {
    num: "08",
    icon: "⚙️",
    label: "Technical ITI",
    title: "Technical ITI — 2025",
    to: "/PYQTAMIL/technical_exam_iti_2025",
    color: "#3F51B5",
    accent: "#9FA8DA",
  },
  {
    num: "09",
    icon: "🎯",
    label: "Technical Non Interview",
    title: "Technical Non Interview — 2025",
    to: "/PYQTAMIL/technical_exam_non_interview_2025",
    color: "#009688",
    accent: "#80CBC4",
  },
  {
    num: "10",
    icon: "🎤",
    label: "Technical Interview",
    title: "Technical Interview — 2025",
    to: "/PYQTAMIL/technical_exam_interview_2025",
    color: "#795548",
    accent: "#BCAAA4",
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

export default function PYQ_TAMIL() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

        .pyq-page {
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
        .pyq-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 10% 10%, rgba(201,168,76,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 55% at 88% 85%, rgba(76,175,137,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 50%, #0b0d18 0%, #06080f 100%);
        }
        .pyq-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          width: 100%;
        }

        /* back */
        .pyq-back {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.65;
          text-decoration: none;
          margin-bottom: 52px;
          transition: opacity 0.2s, gap 0.2s;
          animation: pyqRise 0.5s ease both;
        }
        .pyq-back:hover { opacity: 1; gap: 13px; }

        /* header */
        .pyq-header {
          text-align: center; margin-bottom: 44px;
          animation: pyqRise 0.65s 0.05s ease both;
        }
        .pyq-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: #C9A84C; opacity: 0.7; margin-bottom: 18px;
        }
        .pyq-eyebrow span {
          display: inline-block; width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .pyq-eyebrow span:last-child { background: linear-gradient(90deg, #C9A84C, transparent); }

        .pyq-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 700; line-height: 1.1;
          color: #e8dfc8; letter-spacing: -1px; margin-bottom: 8px;
        }
        .pyq-en {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 17px;
          color: #C9A84C; opacity: 0.65; letter-spacing: 3px;
        }

        /* ornament */
        .pyq-orn {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin-bottom: 44px;
          animation: pyqRise 0.6s 0.1s ease both;
        }
        .orn-l { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4)); }
        .orn-l:last-child { background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent); }
        .orn-d { width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg); opacity: 0.45; }
        .orn-s { width: 3px; height: 3px; background: #C9A84C; transform: rotate(45deg); opacity: 0.2; }

        /* grid */
        .pyq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          width: min(820px, 100%);
        }

        /* card */
        .pyq-card {
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
          animation: pyqRise 0.55s ease both;
        }
        .pyq-card:hover {
          transform: translateY(-7px) scale(1.02);
          border-color: rgba(201,168,76,0.32);
          box-shadow: 0 28px 55px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.07);
        }
        .pyq-card:hover .pc-glow  { opacity: 1; }
        .pyq-card:hover .pc-shine { opacity: 0.75; }
        .pyq-card:hover .pc-arrow { transform: translateX(5px); opacity: 1; }

        .pc-glow {
          position: absolute; inset: 0; border-radius: 16px;
          opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .pc-shine {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          opacity: 0.45; transition: opacity 0.3s;
        }
        .pc-num {
          position: absolute; top: 14px; right: 16px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px;
          color: rgba(201,168,76,0.18);
        }
        .pc-icon { font-size: 26px; margin-bottom: 14px; }
        .pc-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.3); margin-bottom: 6px;
        }
        .pc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; line-height: 1.2;
          flex: 1;
        }
        .pc-arrow {
          margin-top: 20px; opacity: 0.38;
          transition: transform 0.25s, opacity 0.25s;
        }

        /* footer */
        .pyq-footer {
          margin-top: 64px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(201,168,76,0.16); text-transform: uppercase;
          animation: pyqRise 0.7s 0.55s ease both;
        }

        @keyframes pyqRise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .pyq-page { padding: 36px 16px 60px; }
          .pyq-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pyq-page">
        <div className="pyq-mesh" />
        <ParticleCanvas />

        <div className="pyq-inner">

          <a href={`${BASE}Tamil/Tamil.html`} className="pyq-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Tamil Hub
          </a>

          <header className="pyq-header">
            <div className="pyq-eyebrow"><span />&nbsp;Previous Year Questions&nbsp;<span /></div>
            <h1 className="pyq-ta">முந்தைய ஆண்டு வினாக்கள்</h1>
            <p className="pyq-en">Tamil · PYQ</p>
          </header>

          <div className="pyq-orn">
            <div className="orn-l" /><div className="orn-s" /><div className="orn-d" /><div className="orn-s" /><div className="orn-l" />
          </div>

          <div className="pyq-grid">
            {EXAMS.map((e, i) => (
              <Link
                key={e.num}
                to={e.to}
                className="pyq-card"
                style={{ animationDelay: `${i * 0.07 + 0.18}s` }}
              >
                <div className="pc-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${e.color}1e 0%, transparent 70%)` }} />
                <div className="pc-shine" style={{ background: `linear-gradient(90deg, transparent, ${e.color}, transparent)` }} />
                <span className="pc-num">{e.num}</span>
                <div className="pc-icon">{e.icon}</div>
                <p className="pc-label">{e.label}</p>
                <h2 className="pc-title" style={{ color: e.accent }}>{e.title}</h2>
                <div className="pc-arrow" style={{ color: e.color }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <footer className="pyq-footer">© 2025 &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; Tamil Excellence</footer>

        </div>
      </div>
    </>
  );
}
