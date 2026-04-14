import React, { useEffect, useRef } from "react";

const sections = [
  {
    title: "Power Plant",
    route: "Power_plant/YCT_Power_Plant.html",
    icon: "⚡",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Thermal · Hydro · Nuclear",
    external: true,
    num: "01",
  },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.4 + 0.1,
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
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function CardItem({ item, index }) {
  const delay = `${index * 0.08 + 0.1}s`;

  return (
    <a
      href={item.route}
      style={{ textDecoration: "none", animationDelay: delay }}
      className="premium-card"
    >
      <span className="card-num">{item.num}</span>
      <div
        className="card-glow"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${item.color}22 0%, transparent 70%)`,
        }}
      />
      <div
        className="card-top-line"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
        }}
      />

      <div className="card-icon" style={{ color: item.accent }}>
        {item.icon}
      </div>

      <div className="card-body">
        <p className="card-sub">{item.subtitle}</p>
        <h3 className="card-title">{item.title}</h3>
      </div>

      <div className="card-arrow" style={{ color: item.color }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

export default function AE1() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #06080f;
          font-family: 'Outfit', sans-serif;
          color: #e8dfc8;
          overflow-x: hidden;
        }

        .page-root {
          position: relative;
          min-height: 100vh;
          padding: 60px 40px 80px;
          z-index: 1;
        }

        .page-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 15% 10%, #C9A84C0d 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 85%, #9B7FD40a 0%, transparent 55%),
            radial-gradient(ellipse 40% 60% at 50% 50%, #0d0f1a 0%, #06080f 100%);
          z-index: -1;
        }

        /* ── BACK BUTTON ── */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          text-decoration: none;
          margin-bottom: 50px;
          transition: color 0.2s ease;
          animation: fadeUp 0.5s ease both;
        }
        .back-btn:hover { color: rgba(201,168,76,0.9); }
        .back-btn svg { transition: transform 0.2s ease; }
        .back-btn:hover svg { transform: translateX(-3px); }

        /* ── HEADER ── */
        .header {
          text-align: center;
          margin-bottom: 70px;
          animation: fadeUp 0.7s ease both;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          color: #C9A84C;
          text-transform: uppercase;
          margin-bottom: 22px;
          opacity: 0.8;
        }
        .eyebrow::before, .eyebrow::after {
          content: '';
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .eyebrow::after {
          background: linear-gradient(90deg, #C9A84C, transparent);
        }

        .main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 80px);
          font-weight: 700;
          line-height: 1.05;
          color: #f0e8d0;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .main-title em {
          font-style: italic;
          background: linear-gradient(135deg, #C9A84C, #F5D07A, #C9A84C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tagline {
          font-size: 13px;
          color: rgba(232,223,200,0.35);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 300;
        }

        /* ── DIVIDER ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 18px;
          justify-content: center;
          margin-bottom: 50px;
          animation: fadeUp 0.7s 0.15s ease both;
        }
        .divider-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3));
        }
        .divider-line:last-child {
          background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent);
        }
        .divider-diamond {
          width: 6px;
          height: 6px;
          background: #C9A84C;
          transform: rotate(45deg);
          opacity: 0.6;
        }

        /* ── GRID ── */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── CARD ── */
        .premium-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 16px;
          padding: 30px 26px 24px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          animation: fadeUp 0.55s ease both;
          min-height: 200px;
          backdrop-filter: blur(6px);
        }
        .premium-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(201,168,76,0.28);
          box-shadow: 0 24px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.08);
        }
        .premium-card:hover .card-glow { opacity: 1; }
        .premium-card:hover .card-arrow { transform: translateX(4px); }

        .card-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .card-top-line {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          opacity: 0.6;
        }

        .card-num {
          position: absolute;
          top: 18px; right: 22px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(201,168,76,0.25);
          letter-spacing: 2px;
        }

        .card-icon {
          font-size: 28px;
          margin-bottom: 20px;
          display: block;
          line-height: 1;
        }

        .card-body { flex: 1; }

        .card-sub {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(232,223,200,0.3);
          margin-bottom: 8px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 600;
          color: #f0e8d0;
          line-height: 1.1;
        }

        .card-arrow {
          margin-top: 20px;
          transition: transform 0.25s ease;
          opacity: 0.7;
        }

        /* ── FOOTER ── */
        .footer {
          text-align: center;
          margin-top: 70px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(201,168,76,0.2);
          letter-spacing: 3px;
          text-transform: uppercase;
          animation: fadeUp 0.7s 0.5s ease both;
        }

        /* ── ANIMATION ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .page-root { padding: 40px 20px 60px; }
          .grid { grid-template-columns: 1fr; }
          .main-title { font-size: 38px; }
        }
      `}</style>

      <ParticleCanvas />

      <div className="page-root">
        {/* Back button */}
        <a href="/" className="back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>

        <header className="header">
          <div className="eyebrow">Assistant Engineer</div>
          <h1 className="main-title">
            AE<em>–1</em>
          </h1>
          <p className="tagline">Electrical · YCT Series · Paper II</p>
        </header>

        <div className="divider">
          <div className="divider-line" />
          <div className="divider-diamond" />
          <div
            className="divider-diamond"
            style={{ opacity: 0.3, transform: "rotate(45deg) scale(0.6)" }}
          />
          <div className="divider-line" />
        </div>

        <div className="grid">
          {sections.map((item, i) => (
            <CardItem key={item.num} item={item} index={i} />
          ))}
        </div>

        <footer className="footer">
          © {new Date().getFullYear()} &nbsp;·&nbsp; StudyWithDhilip &nbsp;·&nbsp; All Rights Reserved
        </footer>
      </div>
    </>
  );
}
