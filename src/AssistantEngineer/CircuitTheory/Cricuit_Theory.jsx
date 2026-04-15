import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const sections = [
  {
    title: "Basic Circuit 1",
    route: `${BASE}AssistantEngineer/CircuitTheory/Basic_Circuits1`,
    icon: "🔌",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Ohm's Law · KCL · KVL",
    num: "01",
  },
  {
    title: "Basic Circuit 2",
    route: `${BASE}AssistantEngineer/CircuitTheory/Basic_Circuits2`,
    icon: "⚡",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Series · Parallel",
    num: "02",
  },
  {
    title: "Basic Circuit 3",
    route: `${BASE}AssistantEngineer/CircuitTheory/Basic_Circuits3`,
    icon: "🔋",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Network Theorems",
    num: "03",
  },
  {
    title: "Basic Circuit 4",
    route: `${BASE}AssistantEngineer/CircuitTheory/Basic_Circuits4`,
    icon: "🧲",
    color: "#C9A84C",
    accent: "#F5D07A",
    subtitle: "Circuit Analysis",
    num: "04",
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

function CardItem({ item }) {
  return (
    <Link to={item.route} className="premium-card">
      <span className="card-num">{item.num}</span>

      <div className="card-icon">{item.icon}</div>

      <div className="card-body">
        <p className="card-sub">{item.subtitle}</p>
        <h3 className="card-title">{item.title}</h3>
      </div>
    </Link>
  );
}

export default function Cricuit_Theory() {
  return (
    <>
      <style>{`
        body {
          background: #06080f;
          color: #f0e8d0;
          font-family: sans-serif;
        }

        .page-root {
          min-height: 100vh;
          padding: 60px 40px;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .main-title {
          font-size: 48px;
          color: #f5d07a;
          margin-bottom: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .premium-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 18px;
          padding: 30px;
          text-decoration: none;
          color: white;
          transition: 0.3s;
        }

        .premium-card:hover {
          transform: translateY(-5px);
          border-color: #C9A84C;
        }

        .card-icon {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .card-sub {
          font-size: 12px;
          color: #aaa;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 24px;
          color: #f5d07a;
        }

        .card-num {
          float: right;
          opacity: 0.4;
        }
      `}</style>

      <ParticleCanvas />

      <div className="page-root">
        <header className="header">
          <h1 className="main-title">Circuit Theory</h1>
          <p>Assistant Engineer • Basic Circuits</p>
        </header>

        <div className="grid">
          {sections.map((item) => (
            <CardItem key={item.num} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
