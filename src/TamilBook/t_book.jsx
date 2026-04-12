import React, { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "New Book",
    subtitle: "புதிய பாடநூல் தொகுப்பு",
    route: "/TamilBook/t-newbook",
    color: "#E74C3C",
    icon: "📚",
  },
];

export default function T_Book() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>TAMIL LIBRARY</div>
          <h1 style={styles.title}>தமிழ் நூலகம்</h1>
          <p style={styles.subtitle}>
            உங்கள் தமிழ் புத்தகப் பிரிவை தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <div style={styles.grid}>
          {sections.map((item, i) => (
            <Link
              key={item.route}
              to={item.route}
              style={{
                ...styles.card,
                borderColor:
                  hovered === i
                    ? item.color
                    : "rgba(255,255,255,0.08)",
                boxShadow:
                  hovered === i
                    ? `0 0 28px ${item.color}44`
                    : "0 4px 18px rgba(0,0,0,0.25)",
                transform:
                  hovered === i
                    ? "translateY(-5px) scale(1.02)"
                    : "scale(1)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  ...styles.topBar,
                  background: item.color,
                }}
              />

              <div style={styles.icon}>{item.icon}</div>
              <div style={styles.cardTitle}>{item.title}</div>
              <div style={styles.cardSub}>{item.subtitle}</div>

              <div
                style={{
                  ...styles.explore,
                  color: item.color,
                  opacity: hovered === i ? 1 : 0,
                }}
              >
                Open →
              </div>
            </Link>
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
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 20% 20%, #E74C3C18 0%, transparent 45%), radial-gradient(circle at 80% 80%, #8E44AD18 0%, transparent 45%)",
  },
  container: {
    width: "100%",
    maxWidth: "820px",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 18px",
    borderRadius: "100px",
    background: "rgba(231,76,60,0.15)",
    border: "1px solid rgba(231,76,60,0.35)",
    color: "#E74C3C",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "3px",
    marginBottom: "18px",
  },
  title: {
    fontSize: "clamp(28px,5vw,48px)",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "10px",
  },
  subtitle: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "30px 22px",
    textDecoration: "none",
    transition: "all 0.28s ease",
    textAlign: "center",
    overflow: "hidden",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
  },
  icon: {
    fontSize: "42px",
    marginBottom: "14px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "6px",
  },
  cardSub: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "14px",
  },
  explore: {
    fontSize: "13px",
    fontWeight: 700,
    transition: "opacity 0.25s ease",
  },
};
