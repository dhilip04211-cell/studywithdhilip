import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  {
    route: "/tamilbook/seven/ilakkanam/ilakkanam",
    label: "இலக்கணம்",
    icon: "📘",
    color: "#E74C3C",
  },
  {
    route: "/tamilbook/seven/urainadai",
    label: "உரைநடை",
    icon: "📖",
    color: "#E67E22",
  },
  {
    route: "/tamilbook/seven/seyyul",
    label: "செய்யுள்",
    icon: "📝",
    color: "#27AE60",
  },
  {
    route: "/tamilbook/seven/thunaipadam",
    label: "துணைப்பாடம்",
    icon: "📚",
    color: "#2980B9",
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
          onClick={() => navigate("/")}
        >
          ← Back to Home
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
            CLASS VII TAMIL
          </div>

          <h1 style={styles.title}>தமிழ் புத்தகம்</h1>
          <p style={styles.subtitle}>
            பாடப்பகுதியை தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <div style={styles.grid}>
          {subjects.map((sub, i) => (
            <button
              key={sub.route}
              style={{
                ...styles.card,
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
      "radial-gradient(ellipse at 30% 20%, #E8A83818 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, #E8A8380e 0%, transparent 55%)",
  },
  container: {
    width: "100%",
    maxWidth: "860px",
    zIndex: 1,
  },
  backBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.5)",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
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
    fontSize: "42px",
    fontWeight: 800,
    color: "#fff",
  },
  subtitle: {
    color: "rgba(255,255,255,0.35)",
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
    transition: "all 0.28s",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
  },
  icon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  subjectName: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#fff",
  },
  explore: {
    fontSize: "12px",
    fontWeight: 600,
  },
};
