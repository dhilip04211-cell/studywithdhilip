import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  { key: "IndianHistory", label: "Indian History", icon: "🏛️", color: "#E74C3C" },
  { key: "TamilnaduHistory", label: "Tamilnadu History", icon: "🌺", color: "#E67E22" },
  { key: "Geography", label: "Geography", icon: "🌍", color: "#27AE60" },
  { key: "Polity", label: "Polity", icon: "⚖️", color: "#2980B9" },
  { key: "Economics", label: "Economics", icon: "📈", color: "#8E44AD" },
  { key: "Physics", label: "Physics", icon: "⚛️", color: "#16A085" },
  { key: "Chemistry", label: "Chemistry", icon: "🧪", color: "#D35400" },
  { key: "Biology", label: "Biology", icon: "🧬", color: "#C0392B" },
];

export default function Eight() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />
      <div style={styles.container}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/gk/gk")}
        >
          ← Back to Classes
        </button>

        <div style={styles.header}>
          <div
            style={{
              ...styles.classBadge,
              background: "#3DBFA822",
              border: `1px solid #3DBFA855`,
              color: "#3DBFA8",
            }}
          >
            CLASS VIII
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
              onClick={() => navigate(`/gk/eight/eight${sub.key.toLowerCase()}/eight${sub.key.toLowerCase()}`)}
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
      "radial-gradient(ellipse at 30% 20%, #3DBFA818 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, #3DBFA80e 0%, transparent 55%)",
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
    animation: "fadeUp 0.5s ease both",
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
    overflow: "hidden",
    transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
    animation: "fadeUp 0.45s ease both",
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
    display: "block",
  },
  subjectName: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.3,
    marginBottom: "8px",
  },
  explore: {
    fontSize: "12px",
    fontWeight: 600,
    transition: "opacity 0.2s ease",
    letterSpacing: "0.4px",
  },
};
