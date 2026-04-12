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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.3 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        d.x += d.dx;
        d.y += d.dy;

        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${d.o})`;
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.055 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

export default function PYQ() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Mono:wght@400;500&family=Noto+Serif+Tamil:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

        .pyq-page {
          min-height: 100vh;
          background: #06080f;
          color: #e8dfc8;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow-x: hidden;
          padding: 60px 24px 80px;
        }
        .pyq-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(circle at 10% 10%, rgba(201,168,76,0.08), transparent 35%),
            radial-gradient(circle at 90% 85%, rgba(201,168,76,0.05), transparent 30%),
            linear-gradient(180deg, #0a0d16 0%, #06080f 100%);
        }
        .pyq-inner {
          position: relative; z-index: 1; max-width: 1100px; margin: 0 auto;
        }
        .pyq-back {
          display: inline-flex; align-items: center; gap: 10px;
          color: #c9a84c; text-decoration: none; letter-spacing: 3px;
          font: 500 10px 'DM Mono', monospace; text-transform: uppercase;
          margin-bottom: 50px; opacity: .8;
        }
        .pyq-header { text-align: center; margin-bottom: 40px; }
        .pyq-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: clamp(30px, 5vw, 56px); margin: 0;
        }
        .pyq-en {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; letter-spacing: 2px; color: #c9a84c;
          opacity: .75; margin-top: 10px;
        }
        .pyq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .pyq-card {
          position: relative;
          display: block;
          padding: 24px;
          border-radius: 22px;
          text-decoration: none;
          color: #e8dfc8;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.14);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0,0,0,.35);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }
        .pyq-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(201,168,76,0.35);
          box-shadow: 0 30px 60px rgba(0,0,0,.5);
        }
        .qc-glow {
          position: absolute; inset: 0; border-radius: 22px;
          background: radial-gradient(circle at top, rgba(201,168,76,0.12), transparent 65%);
          pointer-events: none;
        }
        .qc-shine {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          opacity: .5;
        }
        .qc-num {
          font: 500 11px 'DM Mono', monospace;
          letter-spacing: 2px; color: rgba(201,168,76,.5);
        }
        .qc-title {
          font-size: 16px; font-weight: 600; line-height: 1.5;
          margin: 14px 0 8px;
        }
        .qc-ta {
          font-family: 'Noto Serif Tamil', serif;
          font-size: 12px; opacity: .55; margin: 0 0 20px;
        }
        .qc-footer-row { display: flex; justify-content: flex-end; }
        .qc-tag {
          font: 500 9px 'DM Mono', monospace;
          letter-spacing: 2px; color: #c9a84c;
          border: 1px solid rgba(201,168,76,.25);
          padding: 6px 10px; border-radius: 999px;
          background: rgba(201,168,76,.06);
        }
        .pyq-footer {
          text-align: center; margin-top: 60px;
          font: 500 10px 'DM Mono', monospace;
          letter-spacing: 3px; color: rgba(201,168,76,.35);
        }
      `}</style>

      <div className="pyq-page">
        <div className="pyq-mesh" />
        <ParticleCanvas />

        <div className="pyq-inner">
          <a href={`${BASE}index.html`} className="pyq-back">
            ← Back to Home
          </a>

          <header className="pyq-header">
            <h1 className="pyq-ta">கடந்த ஆண்டு வினாக்கள்</h1>
            <p className="pyq-en">Previous Year Questions</p>
          </header>

          <div className="pyq-grid">
            {PYQ_ITEMS.map((q, i) => (
              <a
                key={q.num}
                href={`${BASE}PYQ/${q.href}`}
                className="pyq-card"
                style={{ animationDelay: `${i * 0.05 + 0.15}s` }}
              >
                <div className="qc-glow" />
                <div className="qc-shine" />
                <span className="qc-num">{q.num}</span>
                <p className="qc-title">{q.title}</p>
                <p className="qc-ta">{q.tamil}</p>
                <div className="qc-footer-row">
                  <span className="qc-tag">OPEN HTML ↗</span>
                </div>
              </a>
            ))}
          </div>

          <footer className="pyq-footer">
            © 2025 · StudyWithDhilip · Premium PYQ Archive
          </footer>
        </div>
      </div>
    </>
  );
}
