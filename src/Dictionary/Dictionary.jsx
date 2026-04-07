import React from "react";
import { Link } from "react-router-dom";

export default function Dictionary() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>அகராதி (Dictionary)</h1>
        <p style={styles.subtitle}>Choose a series to begin</p>
        <div style={styles.btnGroup}>
          <Link to="/dictionary/a-series" style={styles.btn}>A Series</Link>
        </div>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "20px",
    padding: "3rem 4rem",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    color: "white",
  },
  title: { fontSize: "2.2rem", marginBottom: "0.5rem" },
  subtitle: { fontSize: "1rem", opacity: 0.8, marginBottom: "2rem" },
  btnGroup: { display: "flex", flexDirection: "column", gap: "15px", marginBottom: "2rem" },
  btn: {
    padding: "14px 50px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    borderRadius: "50px",
    background: "#fff",
    color: "#764ba2",
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "inline-block",
  },
  backLink: { color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.95rem" },
};
