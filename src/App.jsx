import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import PPPartOne from "./PPPpart-1";
import PartFourFive from "./PartFourFive";

// Dictionary
import Dictionary from "./Dictionary/Dictionary";
import A_Series from "./Dictionary/A_Series";
import A_Part_1 from "./Dictionary/A_Part_1";
import A_Part_2 from "./Dictionary/A_Part_2";

// Current Affairs
import CurrentAffairs from "./Current_Affairs/Current_Affairs";
import Jan_2026 from "./Current_Affairs/Jan_2026";

// PYQ Tamil
import PYQTAMIL from "./PYQTAMIL/PYQ_TAMIL";
import Special_Examination_2025 from "./PYQTAMIL/Special_Examination_2025";
import Gr_2_Mains_2025 from "./PYQTAMIL/Gr_2_Mains_2025";
import Gr_4_2025 from "./PYQTAMIL/Gr_4_2025";

// Thirukkural
import Thirukkural from "./Thirukkural/Thirukkural_home";
import ThirukkuralOld from "./Thirukkural/thirukkural_old";
import ThirukkuralOldPart1 from "./Thirukkural/thirukkural_old_part1";
import ThirukkuralOldPart1Quiz from "./Thirukkural/thirukkural_old_part1_quiz";
import ThirukkuralOldPart2 from "./Thirukkural/thirukkural_old_part2";

// Tamil Notes
import SanthiPizai from "./TamilNotes/SanthiPizai";
import Mayankoli from "./TamilNotes/Mayankoli";

// ✅ AUTO IMPORT GK + TamilBook
const autoPages = import.meta.glob(
  [
    "./GK/**/*.jsx",
    "./TamilBook/**/*.jsx",
  ],
  { eager: true }
);

function Home() {
  const sections = [
    { title: "Previous Year Questions", route: "/PYQTAMIL", icon: "📘", color: "#E74C3C" },
    { title: "Tamil Books", route: "/tamilbook/t-book", icon: "📚", color: "#E67E22" },
    { title: "Assistant Engineer", route: "/part1", icon: "⚡", color: "#8E44AD" },
    { title: "Current Affairs", route: "/current-affairs", icon: "📰", color: "#27AE60" },
    { title: "General Knowledge", route: "/gk/gk", icon: "🌍", color: "#2980B9" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>STUDY PORTAL</div>
          <h1 style={styles.title}>StudyWithDhilip</h1>
          <p style={styles.subtitle}>
            TNPSC • Tamil Books • GK • AE • PYQ • Current Affairs
          </p>
        </div>

        <div style={styles.grid}>
          {sections.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              style={{
                ...styles.card,
                borderColor: `${item.color}55`,
              }}
            >
              <div style={{ ...styles.topBar, background: item.color }} />
              <div style={styles.icon}>{item.icon}</div>
              <div style={styles.cardTitle}>{item.title}</div>
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

function generateAutoRoutes() {
  const usedRoutes = new Set();

  return Object.entries(autoPages)
    .map(([path, module]) => {
      let routePath = path
        .replace("./GK", "/gk")
        .replace("./TamilBook", "/tamilbook")
        .replace(/\.jsx$/, "")
        .toLowerCase();

      if (routePath.endsWith("/index")) {
        routePath = routePath.replace("/index", "");
      }

      if (usedRoutes.has(routePath)) return null;
      usedRoutes.add(routePath);

      const Component = module.default;
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

        {/* AE */}
        <Route path="/part1" element={<PPPartOne />} />
        <Route path="/parts" element={<PartFourFive />} />
        <Route path="/part4" element={<PartFourFive defaultPart={4} />} />
        <Route path="/part5" element={<PartFourFive defaultPart={5} />} />

        {/* Dictionary */}
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/dictionary/a-series" element={<A_Series />} />
        <Route path="/dictionary/a-series/part1" element={<A_Part_1 />} />
        <Route path="/dictionary/a-series/part2" element={<A_Part_2 />} />

        {/* Current Affairs */}
        <Route path="/current-affairs" element={<CurrentAffairs />} />
        <Route path="/current-affairs/jan-2026" element={<Jan_2026 />} />

        {/* PYQ */}
        <Route path="/PYQTAMIL" element={<PYQTAMIL />} />
        <Route path="/PYQTAMIL/special-examination-2025" element={<Special_Examination_2025 />} />
        <Route path="/PYQTAMIL/gr-2-mains-2025" element={<Gr_2_Mains_2025 />} />
        <Route path="/PYQTAMIL/gr-4-2025" element={<Gr_4_2025 />} />

        {/* Thirukkural */}
        <Route path="/Thirukkural" element={<Thirukkural />} />
        <Route path="/Thirukkural/thirukkural-old" element={<ThirukkuralOld />} />
        <Route path="/Thirukkural/thirukkural-old-part1" element={<ThirukkuralOldPart1 />} />
        <Route path="/Thirukkural/thirukkural-old-part1-quiz" element={<ThirukkuralOldPart1Quiz />} />
        <Route path="/Thirukkural/thirukkural-old-part2" element={<ThirukkuralOldPart2 />} />

        {/* Tamil Notes */}
        <Route path="/santhi-pizai" element={<SanthiPizai />} />
        <Route path="/mayan-koli" element={<Mayankoli />} />

        {/* ✅ AUTO ROUTES */}
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
    maxWidth: "900px",
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
    fontSize: "clamp(34px,5vw,60px)",
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
    border: "1px solid",
    borderRadius: "16px",
    padding: "28px 22px",
    textDecoration: "none",
    textAlign: "center",
    transition: "all 0.28s ease",
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
  cardTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "10px",
  },
  openBtn: {
    fontSize: "13px",
    fontWeight: 700,
  },
};
