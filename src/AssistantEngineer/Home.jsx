import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const sections = [
  {
    title: "Power Plant",
    route: `${BASE}AE/YCT-1/Power_plant/YCT_Power_Plant.html`,
    icon: "⚡",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Thermal · Hydro · Nuclear",
    num: "01",
    isExternal: true,
  },
  {
    title: "Circuit Theory",
    route: "/assistantengineer/circuittheory/circuit_theory",
    icon: "🔌",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Basic Circuits · Analysis · Series",
    num: "02",
    isExternal: false,
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
          const dist = Math.hypot(
            dots[i].x - dots[j].x,
            dots[i].y - dots[j].y
          );

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${
              0.07 * (1 - dist / 120)
            })`;
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

  const cardContent = (
    <>
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
    </>
  );

  if (item.isExternal) {
    return (
      <a
        href={item.route}
        style={{ textDecoration: "none", animationDelay: delay }}
        className="premium-card"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={item.route}
      style={{ textDecoration: "none", animationDelay: delay }}
      className="premium-card"
    >
      {cardContent}
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

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

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }

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
          transition: 0.3s;
          min-height: 200px;
          text-decoration: none;
          color: inherit;
        }

        .premium-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,168,76,0.28);
        }

        .card-num {
          position: absolute;
          top: 18px;
          right: 22px;
          font-size: 10px;
          opacity: 0.4;
        }

        .card-icon {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .card-sub {
          font-size: 10px;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 26px;
        }

        .card-arrow {
          margin-top: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 70px;
        }

        .main-title {
          font-size: 64px;
          color: #f5d07a;
        }

        .tagline {
          font-size: 14px;
          opacity: 0.7;
        }

        .back-btn {
          display: inline-block;
          margin-bottom: 40px;
          color: #C9A84C;
          text-decoration: none;
        }
      `}</style>

      <ParticleCanvas />

      <div className="page-root">
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>

        <header className="header">
          <h1 className="main-title">AE–1</h1>
          <p className="tagline">Electrical · YCT Series · Paper II</p>
        </header>

        <div className="grid">
          {sections.map((item, i) => (
            <CardItem key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
