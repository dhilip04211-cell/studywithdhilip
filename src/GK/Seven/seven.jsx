import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  {
    route: "/gk/seven/sevenindianhistory/sevenindianhistory",
    label: "Indian History",
    icon: "🏛️",
    color: "#E74C3C",
  },
  {
    route: "/gk/seven/seventamilnaduhistory/seventamilnaduhistory",
    label: "Tamilnadu History",
    icon: "🌺",
    color: "#E67E22",
  },
  {
    route: "/gk/seven/sevengeography/sevengeography",
    label: "Geography",
    icon: "🌍",
    color: "#27AE60",
  },
  {
    route: "/gk/seven/sevenpolity/sevenpolity",
    label: "Polity",
    icon: "⚖️",
    color: "#2980B9",
  },
  {
    route: "/gk/seven/seveneconomics/seveneconomics",
    label: "Economics",
    icon: "📈",
    color: "#8E44AD",
  },
  {
    route: "/gk/seven/sevenphysics/sevenphysics",
    label: "Physics",
    icon: "⚛️",
    color: "#16A085",
  },
  {
    route: "/gk/seven/sevenchemistry/sevenchemistry",
    label: "Chemistry",
    icon: "🧪",
    color: "#D35400",
  },
  {
    route: "/gk/seven/sevenbiology/sevenbiology",
    label: "Biology",
    icon: "🧬",
    color: "#C0392B",
  },
];

export default function Seven() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />
      <div style={styles.container}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/gk/gk_1")}
        >
          ← Back to Classes
        </button>

        <div style={styles.header}>
          <div
            style={{
              ...styles.classBadge,
              background: "#E8A83822",
              border: "1px solid #E8A83855",
              color: "#E8A838",
            }}
          >
            CLASS VII
          </div>
          <h1 style={styles.title}>Choose Your Subject</h1>
          <p style={styles.subtitle}>Select a subject to start learning</p>
        </div>

        <div style={styles.grid}>
          {subjects.map((sub, i) => (
            <button
              key={sub.route}
              style={{
                ...styles.card,
                animationDelay: `${i * 0.07}s`,
                borderColor:
                  hovered === i
                    ? sub.color
                    : "rgba(255,255,255,0.07)",
                boxShadow:
                  hovered === i
                    ? `0 0 28px ${sub.color}44, 0 8px 24px rgba(0,0,0,0.4)`
                    : "0 4px 16px rgba(0,0,0,0.25)",
                transform:
                  hovered === i
                    ? "translateY(-5px) scale(1.02)"
                    : "scale(1)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(sub.route)}
            >
              <div
                style={{
                  ...styles.topBar,
                  background: sub.color,
                }}
              />
              <div style={styles.icon}>{sub.icon}</div>
              <div style={styles.subjectName}>{sub.label}</div>
              <div
                style={{
                  ...styles.explore,
                  color: sub.color,
                  opacity: hovered === i ? 1 : 0,
                }}
              >
                Start →
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
