import React, { useState } from "react";
import { Link } from "react-router-dom";

const books = [
  {
    title: "6th Book",
    subtitle: "தமிழ் பாடநூல்",
    route: "/TamilBook/sixth-book",
    color: "#E74C3C",
    icon: "📘",
  },
  {
    title: "7th Book",
    subtitle: "தமிழ் பாடநூல்",
    route: "/tamilbook/seven/seven",
    color: "#E67E22",
    icon: "📗",
  },
];

export default function T_NewBook() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>TAMIL BOOKS</div>
          <h1 style={styles.title}>தமிழ் பாடநூல்கள்</h1>
          <p style={styles.subtitle}>
            உங்கள் வகுப்பிற்கான புத்தகத்தை தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <div style={styles.grid}>
          {books.map((book, i) => (
            <Link
              key={book.route}
              to={book.route}
              style={{
                ...styles.card,
                borderColor:
                  hovered === i
                    ? book.color
                    : "rgba(255,255,255,0.08)",
                boxShadow:
                  hovered === i
                    ? `0 0 30px ${book.color}44`
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
                  background: book.color,
                }}
              />

              <div style={styles.icon}>{book.icon}</div>
              <div style={styles.bookTitle}>{book.title}</div>
              <div style={styles.bookSub}>{book.subtitle}</div>

              <div
                style={{
                  ...styles.explore,
                  color: book.color,
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
      "radial-gradient(circle at 20% 20%, #E74C3C18 0%, transparent 45%), radial-gradient(circle at 80% 80%, #E67E2215 0%, transparent 45%)",
  },
  container: {
    width: "100%",
    maxWidth: "850px",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "28px 22px",
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
    fontSize: "40px",
    marginBottom: "14px",
  },
  bookTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "6px",
  },
  bookSub: {
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
