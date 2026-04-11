import { useState } from "react";
import { useNavigate } from "react-router-dom";

const classes = [
  { label: "Class VI", route: "/gk/six", color: "#FF6B35" },
  { label: "Class VII", route: "/gk/seven", color: "#F7C59F" },
  { label: "Class VIII", route: "/gk/eight", color: "#EFEFD0" },
  { label: "Class IX", route: "/gk/nine", color: "#004E89" },
  { label: "Class X", route: "/gk/ten", color: "#1A936F" },
  { label: "Class XI", route: "/gk/eleven", color: "#C6384B" },
  { label: "Class XII", route: "/gk/twelve", color: "#7B2D8B" },
];

export default function GK() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
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
              key={cls.label}
              style={{
                ...styles.card,
                borderColor:
                  hovered === i ? cls.color : "rgba(255,255,255,0.08)",
                boxShadow:
                  hovered === i
                    ? `0 0 32px ${cls.color}55, 0 8px 32px rgba(0,0,0,0.4)`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                transform:
                  hovered === i
                    ? "translateY(-6px) scale(1.03)"
                    : "translateY(0) scale(1)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(cls.route)}
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
                }}
              >
                Explore →
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
    background: "#0a0e1a",
    padding: "40px 20px",
  },
  bgPattern: {
    position: "absolute",
    inset: 0,
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  headerBlock: {
    textAlign: "center",
    marginBottom: "48px",
  },
  badge: {
    color: "#FF6B35",
    marginBottom: "20px",
  },
  title: {
    color: "white",
    fontSize: "48px",
  },
  titleAccent: {
    color: "#FF6B35",
  },
  subtitle: {
    color: "rgba(255,255,255,0.45)",
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
    color: "white",
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
  },
  classNumber: {
    fontSize: "42px",
    fontWeight: 800,
  },
  cardLabel: {
    fontSize: "18px",
    fontWeight: 700,
  },
  cardSub: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
  },
  arrow: {
    marginTop: "10px",
  },
};