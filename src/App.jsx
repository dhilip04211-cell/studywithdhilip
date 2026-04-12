import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// ✅ AUTO IMPORT EVERYTHING INSIDE SRC
const autoPages = import.meta.glob("./**/*.jsx", {
  eager: true,
});
const BASE = import.meta.env.BASE_URL;

function Home() {
  const sections = [
    {
      title: "Tamil",
      route: `${BASE}Tamil/Tamil.html`,
      icon: "📚",
      color: "#E67E22",
      subtitle: "Tamil Learning",
      external: true,
    },
    {
      title: "General Knowledge",
      route: "/gk/gk",
      icon: "🌍",
      color: "#2980B9",
      subtitle: "State Board GK",
    },
        {
      title: "Assistant Engineer",
      route: `${BASE}AE/YCT-1/YCT-1.html`,
      icon: "⚡",
      color: "#8E44AD",
      subtitle: "AE Electrical",
      external: true,
    },
       {
      title: "Current Affairs",
      route: "/current_affairs/current_affairs",
      icon: "📰",
      color: "#27AE60",
      subtitle: "Daily Updates",
    },
   
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>STUDY PORTAL</div>
          <h1 style={styles.title}>StudyWithDhilip</h1>
          <p style={styles.subtitle}>
            TNPSC • Tamil Books • Previous Year Questions • AE • Smart Learning Hub
          </p>
        </div>

        <div style={styles.grid}>
          {sections.map((item) =>
            item.external ? (
              <a key={item.route} href={item.route} style={styles.card}>
                <div style={{ ...styles.topBar, background: item.color }} />
                <div style={styles.icon}>{item.icon}</div>
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.cardSub}>{item.subtitle}</div>
                <div style={{ ...styles.openBtn, color: item.color }}>
                  Open →
                </div>
              </a>
            ) : (
              <Link key={item.route} to={item.route} style={styles.card}>
                <div style={{ ...styles.topBar, background: item.color }} />
                <div style={styles.icon}>{item.icon}</div>
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.cardSub}>{item.subtitle}</div>
                <div style={{ ...styles.openBtn, color: item.color }}>
                  Open →
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function generateAutoRoutes() {
  const usedRoutes = new Set();

  return Object.entries(autoPages)
    .filter(([path]) => !path.includes("main.jsx") && !path.includes("App.jsx"))
    .map(([path, module]) => {
      let routePath = path
        .replace("./", "/")
        .replace(/\.jsx$/, "")
        .toLowerCase();

      // ✅ cleaner index support
      if (routePath.endsWith("/index")) {
        routePath = routePath.replace("/index", "");
      }

      // ✅ remove duplicate routes
      if (usedRoutes.has(routePath)) return null;
      usedRoutes.add(routePath);

      const Component = module.default;
      if (!Component) return null;

      return (
        <Route
          key={routePath}
          path={routePath}
          element={<Component />}
        />
      );
    })
    .filter(Boolean);
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* ✅ FULL AUTO ROUTES */}
        {generateAutoRoutes()}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
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
      "radial-gradient(circle at 20% 20%, #E74C3C18 0%, transparent 40%), radial-gradient(circle at 80% 80%, #2980B918 0%, transparent 40%)",
  },
  container: {
    width: "100%",
    maxWidth: "950px",
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
    background: "rgba(231,76,60,0.15)",
    border: "1px solid rgba(231,76,60,0.35)",
    color: "#E74C3C",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "3px",
    marginBottom: "18px",
  },
  title: {
    fontSize: "clamp(34px,5vw,64px)",
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
