import React, { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

const PYQ_ITEMS = [
  { num: "01", title: "Special Competitive Exam", tamil: "சிறப்பு போட்டித் தேர்வு", href: "1. Special Competetive exam/1. Special Competetive exam.html" },
  { num: "02", title: "TENTATIVE KEY G2 Tamil GS Mains 2025", tamil: "குரூப் 2 தமிழ் பொது அறிவு", href: "TENTATIVE_KEY_G2_TAMIL_GS_opt_1902/TENTATIVE_KEY_G2_TAMIL_GS_opt_1902.html" },
  { num: "03", title: "13_2024 APP GR II Question Paper", tamil: "குரூப் 2 வினாத்தாள்", href: "3. 13_2024_APP_GR_II_QUESTION_PAPER/3. 13_2024_APP_GR_II_QUESTION_PAPER.html" },
  { num: "04", title: "CCSE IA P25 15062025", tamil: "இணைந்த குடிமைப் பணி தேர்வு", href: "4. CCSE__IA_P25_15062025/4. CCSE__IA_P25_15062025.html" },
  { num: "05", title: "07_2025 General Tamil GS", tamil: "பொது தமிழ் பொது அறிவு", href: "5. 07_2025_GENEAL_TAMIL_GS/5. 07_2025_GENEAL_TAMIL_GS.html" },
  { num: "06", title: "08_2025 GS TET 503 — Combined Technical (Interview)", tamil: "தொழில்நுட்ப பணி தேர்வு", href: "6. 08_2025_GS_TET_503 Combined technical service exam interview post/6. 08_2025_GS_TET_503 Combined technical service exam interview post.html" },
  { num: "07", title: "503_09_2025 TET GS — Combined Technical (Non-Interview)", tamil: "தொழில்நுட்ப பணி — நேர்காணல் இல்லாத", href: "7. 503_09_2025_TET_GS combined technical service exam non interview/7. 503_09_2025_TET_GS combined technical service exam non interview.html" },
  { num: "08", title: "10_2025 TET GS — Diploma Level", tamil: "டிப்ளோமா நிலை தேர்வு", href: "8. 10_2025_TET_GS Diploma level/8. 10_2025_TET_GS Diploma level.html" },
  { num: "09", title: "11_2025 GT with GS — Group II/IIA Prelims", tamil: "குரூப் 2 / 2A முதல்நிலை", href: "9. 11_2025_GT_WITH_GS_GRP_II_IIA prelims/9. 11_2025_GT_WITH_GS_GRP_II_IIA prelims.html" },
  { num: "10", title: "Notn.No13_2025 SC-501 — ITI Level", tamil: "ஐடிஐ நிலை தேர்வு", href: "10. Notn.No13_2025_SC-501 ITI level/10. Notn.No13_2025_SC-501 ITI level.html" },
  { num: "12", title: "11_2025 GRP2A Paper II GS — Non-Interview Mains", tamil: "குரூப் 2A முக்கிய தேர்வு", href: "12. 11_2025_GRP2A_PAPERII_GS non interview mains/12. 11_2025_GRP2A_PAPERII_GS non interview mains.html" },
  { num: "13", title: "Tamil Eligibility Test GS Aptitude 503 — Interview Post", tamil: "தமிழ் தகுதித் தேர்வு", href: "13. Tamil_Eligibility_Test_General_Studies_Aptitude_and_Mental_Ability_503 interview post/13. Tamil_Eligibility_Test_General_Studies_Aptitude_and_Mental_Ability_503 interview post.html" },
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

export default function PYQ() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

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
          padding: 60px 24px 80px;
        }
        .pyq-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 12% 8%,  rgba(201,168,76,0.09) 0%, transparent 58%),
            radial-gradient(ellipse 45% 50% at 85% 85%, rgba(160,120,64,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 50%, #0b0d18 0%, #06080f 100%);
        }
        .pyq-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 860px;
        }

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

        .pyq-header {
          text-align: center; margin-bottom: 20px;
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
          font-size: clamp(26px, 5vw, 48px);
          font-weight: 700; line-height: 1;
          color: #e8dfc8; letter-spacing: -1px; margin-bottom: 8px;
        }
        .pyq-en {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 17px;
          color: #C9A84C; opacity: 0.65; letter-spacing: 3px;
          margin-bottom: 28px;
        }

        .pyq-orn {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin-bottom: 44px;
          animation: pyqRise 0.6s 0.1s ease both;
        }
        .orn-l { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4)); }
        .orn-l:last-child { background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent); }
        .orn-d { width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg); opacity: 0.45; }
        .orn-s { width: 3px; height: 3px; background: #C9A84C; transform: rotate(45deg); opacity: 0.2; }

        .pyq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .pyq-card {
          position: relative;
          display: flex; flex-direction: column;
          padding: 26px 24px 22px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.11);
          text-decoration: none;
          color: #e8dfc8;
          overflow: hidden;
          backdrop-filter: blur(8px);
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), border-color 0.3s, box-shadow 0.3s;
          animation: pyqRise 0.5s ease both;
        }
        .pyq-card:hover {
          transform: translateY(-7px) scale(1.02);
          border-color: rgba(201,168,76,0.28);
          box-shadow: 0 28px 55px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.07);
        }
        .pyq-card:hover .qc-glow  { opacity: 1; }
        .pyq-card:hover .qc-shine { opacity: 0.75; }
        .pyq-card:hover .qc-arrow { transform: translateX(4px); opacity: 1; }

        .qc-glow {
          position: absolute; inset: 0; border-radius: 16px;
          background: radial-gradient(circle at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%);
          opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .qc-shine {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          opacity: 0.35; transition: opacity 0.3s;
        }

        .qc-num {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 2px;
          color: rgba(201,168,76,0.25);
          margin-bottom: 14px;
        }

        .qc-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(232,223,200,0.22);
          margin-bottom: 10px;
        }
        .qc-badge-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #C9A84C; opacity: 0.4;
        }

        .qc-title {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 500;
          color: #e8dfc8; line-height: 1.5;
          flex: 1; margin-bottom: 10px;
        }
        .qc-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 11px; opacity: 0.32;
          margin-bottom: 16px;
        }

        .qc-divider {
          width: 24px; height: 1px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          opacity: 0.3; margin-bottom: 14px;
        }

        .qc-footer-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .qc-tag {
          font-family: 'DM Mono', monospace;
          font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.18);
          color: rgba(201,168,76,0.45);
          padding: 3px 8px; border-radius: 4px;
        }
        .qc-arrow {
          color: #C9A84C; opacity: 0.3;
          transition: transform 0.25s, opacity 0.25s;
        }

        .pyq-footer {
          margin-top: 64px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(201,168,76,0.14); text-transform: uppercase;
          animation: pyqRise 0.7s 0.5s ease both;
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

          <a href={`${BASE}index.html`} className="pyq-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>

          <header className="pyq-header">
            <div className="pyq-eyebrow"><span />&nbsp;TNPSC · போட்டித் தேர்வுகள்&nbsp;<span /></div>
            <h1 className="pyq-ta">கடந்த ஆண்டு வினாக்கள்</h1>
            <p className="pyq-en">Previous Year Questions</p>
          </header>

          <div className="pyq-orn">
            <div className="orn-l" /><div className="orn-s" /><div className="orn-d" /><div className="orn-s" /><div className="orn-l" />
          </div>

          <div className="pyq-grid">
            {PYQ_ITEMS.map((q, i) => (
              
                key={q.num}
                href={`${BASE}PYQ/${q.href}`}
                className="pyq-card"
                style={{ animationDelay: `${i * 0.05 + 0.15}s` }}
              >
                <div className="qc-glow" />
                <div className="qc-shine" />

                <span className="qc-num">{q.num}</span>

                <div className="qc-badge">
                  <div className="qc-badge-dot" />
                  Previous Year · TNPSC
                </div>

                <p className="qc-title">{q.title}</p>
                <p className="qc-ta">{q.tamil}</p>

                <div className="qc-divider" />

                <div className="qc-footer-row">
                  <span className="qc-tag">HTML ↗</span>
                  <div className="qc-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <footer className="pyq-footer">© 2025 &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; Tamil Excellence</footer>

        </div>
      </div>
    </>
  );
}
