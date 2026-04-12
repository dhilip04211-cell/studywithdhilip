import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE = import.meta.env.BASE_URL;
const classes = [
  const classes = [
  { label: "Class VI",    file: "/gk/six/six",       color: "#FF6B35" },
  { label: "Class VII",   file: "/gk/seven/seven",   color: "#F7C59F" },
  { label: "Class VIII",  file: "/gk/eight/eight",   color: "#EFEFD0" },
  { label: "Class IX",    file: "/gk/nine/nine",     color: "#004E89" },
  { label: "Class X",     file: "/gk/ten/ten",       color: "#1A936F" },
  { label: "Class XI",    file: "/gk/eleven/eleven", color: "#C6384B" },
  { label: "Class XII",   file: "/gk/twelve/twelve", color: "#7B2D8B" },
  { label: "Previous Year Questions", file: `${BASE}PYQ/previous_years.html`, color: "#7B2F8B", external: true },
];
  
];

export default function GK() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Background pattern */}
      <div style={styles.bgPattern} />

      <div style={styles.container}>
        <div style={styles.headerBlock}>
          <div style={styles.badge}>GENERAL KNOWLEDGE</div>
          <h1 style={styles.title}>
            <span style={styles.titleAccent}>தமிழ்நாடு</span>
            <br />
            GK Study Portal
          </h1>
          <p style={styles.subtitle}>Select your class to begin your journey</p>
        </div>

        <div style={styles.grid}>
          {classes.map((cls, i) => (
            <button
              key={cls.file}
              style={{
                ...styles.card,
                animationDelay: `${i * 0.08}s`,
                borderColor: hovered === i ? cls.color : "rgba(255,255,255,0.08)",
                boxShadow:
                  hovered === i
                    ? `0 0 32px ${cls.color}55, 0 8px 32px rgba(0,0,0,0.4)`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                transform: hovered === i ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                cls.external
                  ? window.location.href = cls.file
                  : navigate(cls.file)
              }
            >
              <div
                style={{
                  ...styles.cardAccent,
                  background: `linear-gradient(135deg, ${cls.color}, ${cls.color}88)`,
                }}
              />
              <div style={styles.classNumber}>{cls.label.split(" ")[1]}</div>
              <div style={styles.cardLabel}>{cls.label}</div>
              <div style={styles.cardSub}>8 Subjects Available</div>
              <div
                style={{
                  ...styles.arrow,
                  color: cls.color,
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "translateX(4px)" : "translateX(0)",
                }}
              >
                Explore →
              </div>
            </button>
          ))}
        </div>

        <div style={styles.footer}>
          <span style={styles.footerDot} />
          Tamil Nadu State Board Curriculum
          <span style={styles.footerDot} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Noto+Serif+Tamil:wght@400;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:0.5; } 50% { opacity:1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0e1a",
    fontFamily: "'Sora', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
  },
  bgPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 20%, #FF6B3522 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, #7B2D8B22 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, #004E8911 0%, transparent 70%)
    `,
    pointerEvents: "none",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    position: "relative",
    zIndex: 1,
  },
  headerBlock: {
    textAlign: "center",
    marginBottom: "48px",
    animation: "fadeUp 0.6s ease both",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,107,53,0.15)",
    border: "1px solid rgba(255,107,53,0.4)",
    color: "#FF6B35",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "3px",
    padding: "6px 20px",
    borderRadius: "100px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "clamp(32px, 6vw, 56px)",
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.15,
    margin: "0 0 16px",
  },
  titleAccent: {
    fontFamily: "'Noto Serif Tamil', serif",
    color: "#FF6B35",
    fontSize: "0.85em",
  },
  subtitle: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "15px",
    fontWeight: 300,
    letterSpacing: "0.5px",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "28px 24px 24px",
    cursor: "pointer",
    textAlign: "left",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    animation: "fadeUp 0.5s ease both",
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    borderRadius: "16px 16px 0 0",
  },
  classNumber: {
    fontSize: "42px",
    fontWeight: 800,
    color: "rgba(255,255,255,0.08)",
    lineHeight: 1,
    marginBottom: "12px",
    letterSpacing: "-2px",
  },
  cardLabel: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "6px",
  },
  cardSub: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 400,
    letterSpacing: "0.3px",
    marginBottom: "12px",
  },
  arrow: {
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.25s ease",
    letterSpacing: "0.5px",
  },
  footer: {
    textAlign: "center",
    marginTop: "48px",
    color: "rgba(255,255,255,0.2)",
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    animation: "fadeUp 0.8s ease both",
  },
  footerDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "inline-block",
  },
};
