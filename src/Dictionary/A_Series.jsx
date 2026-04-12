import React from "react";
import { Link } from "react-router-dom";

const parts = [1, 2, 3, 4, 5];

export default function A_Series() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>A Series</h1>
        <p style={styles.subtitle}>Select a part to study</p>
        <div style={styles.btnGroup}>
          {parts.map((part) => (
            <Link
              key={part}
              to={`/dictionary/a-series/a_part_${part}`}
              style={styles.btn}
            >
              Part {part}
            </Link>
          ))}
        </div>
        <Link to="/dictionary/dictionary" style={styles.backLink}>← Back to Dictionary</Link>
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
