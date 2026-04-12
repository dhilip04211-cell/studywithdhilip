import React, { useState } from "react";
import { Link } from "react-router-dom";

const months = [
  {
    title: "January 2026",
    subtitle: "Monthly CA Updates",
    route: "/current_affairs/jan_2026",
    color: "#27AE60",
    icon: "📰",
  },
];

export default function CurrentAffairs() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>CURRENT AFFAIRS</div>
          <h1 style={styles.title}>Current Affairs 2026</h1>
          <p style={styles.subtitle}>
            Monthly important events, schemes, economy and world updates
          </p>
        </div>

        <div style={styles.grid}>
          {months.map((item, i) => (
            <Link
              key={item.route}
              to={item.route}
              style={{
                ...styles.card,
                boxShadow:
                  hovered === i
                    ? `0 0 30px ${item.color}44`
                    : "0 8px 24px rgba(0,0,0,0.25)",
                transform:
                  hovered === i
                    ? "translateY(-5px) scale(1.02)"
                    : "scale(1)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ ...styles.topBar, background: item.color }} />
              <div style={styles.icon}>{item.icon}</div>
              <div style={styles.cardTitle}>{item.title}</div>
              <div style={styles.cardSub}>{item.subtitle}</div>
              <div style={{ ...styles.openBtn, color: item.color }}>
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
      "radial-gradient(circle at 20% 20%, #27AE6018 0%, transparent 40%), radial-gradient(circle at 80% 80%, #16A08518 0%, transparent 40%)",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 18px",
    borderRadius: "100px",
    background: "rgba(39,174,96,0.15)",
    border: "1px solid rgba(39,174,96,0.35)",
    color: "#27AE60",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "3px",
    marginBottom: "18px",
  },
  title: {
    fontSize: "clamp(32px,5vw,58px)",
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
    gap: "20px",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "none",
    borderRadius: "18px",
    padding: "28px 22px",
    textDecoration: "none",
    textAlign: "center",
    transition: "all 0.28s ease",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
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
    fontSize: "18px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "6px",
  },
  cardSub: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "10px",
  },
  openBtn: {
    fontSize: "13px",
    fontWeight: 700,
  },
};
