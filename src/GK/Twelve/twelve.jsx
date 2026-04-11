import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  { route: "/gk/twelve/indian-history", label: "Indian History", icon: "🏛️", color: "#E74C3C" },
  { route: "/gk/twelve/tamilnadu-history", label: "Tamilnadu History", icon: "🌺", color: "#E67E22" },
  { route: "/gk/twelve/geography", label: "Geography", icon: "🌍", color: "#27AE60" },
  { route: "/gk/twelve/polity", label: "Polity", icon: "⚖️", color: "#2980B9" },
  { route: "/gk/twelve/economics", label: "Economics", icon: "📈", color: "#8E44AD" },
  { route: "/gk/twelve/physics", label: "Physics", icon: "⚛️", color: "#16A085" },
  { route: "/gk/twelve/chemistry", label: "Chemistry", icon: "🧪", color: "#D35400" },
  { route: "/gk/twelve/biology", label: "Biology", icon: "🧬", color: "#C0392B" },
];

export default function Twelve() {
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
              background: "#9B59B622",
              border: `1px solid #9B59B655`,
              color: "#9B59B6",
            }}
          >
            CLASS XII
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
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#080c18",
    fontFamily: "'Sora', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at 30% 20%, #9B59B618 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, #9B59B60e 0%, transparent 55%)",
    pointerEvents: "none",
  },
  container: {
    width: "100%",
    maxWidth: "860px",
    position: "relative",
    zIndex: 1,
  },
  backBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.5)",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    marginBottom: "36px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  classBadge: {
    display: "inline-block",
    padding: "5px 18px",
    borderRadius: "100px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "3px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "clamp(26px, 5vw, 42px)",
    fontWeight: 800,
    color: "#ffffff",
    margin: "0 0 10px",
  },
  subtitle: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "14px",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "14px",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "24px 16px 20px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    borderRadius: "14px 14px 0 0",
  },
  icon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  subjectName: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "8px",
  },
  explore: {
    fontSize: "12px",
    fontWeight: 600,
    transition: "opacity 0.2s ease",
  },
};