import { useState } from "react";
import { useNavigate } from "react-router-dom";

const info = {
  label: "Polity",
  icon: "⚖️",
  color: "#2980B9",
  classRoman: "VII",
  classColor: "#E8A838",
  backRoute: "/gk/seven",
  subjectRoute: "/gk/seven/sevenpolity/sevenpolity",
};

const chapters = [
  // Term 1
  {
    title: "சமத்துவம்",
    topics: ["சமத்துவம்", "உரிமைகள்", "சமூக நீதி", "ஒற்றுமை"],
  },
  {
    title: "அரசாங்கத்தின் வகைகள்",
    topics: ["மக்களாட்சி", "மன்னராட்சி", "குடியரசு", "அரசு"],
  },

  // Term 2
  {
    title: "மாநில அரசு",
    topics: ["முதல்வர்", "அமைச்சரவை", "சட்டமன்றம்", "ஆளுநர்"],
  },
  {
    title: "உள்ளாட்சி",
    topics: ["பஞ்சாயத்து", "நகராட்சி", "மாவட்டம்", "உள்ளாட்சி அமைப்பு"],
  },

  // Term 3
  {
    title: "பெண்களின் நிலை",
    topics: ["பெண்கள் உரிமை", "சமத்துவம்", "கல்வி", "சமூக நிலை"],
  },
  {
    title: "சந்தை மற்றும் நுகர்வோர் பாதுகாப்பு",
    topics: ["சந்தை", "நுகர்வோர் உரிமைகள்", "பாதுகாப்பு", "சட்டம்"],
  },
];
export default function SevenPolity() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={styles.page}>
      <div style={{ ...styles.heroBg, background: `radial-gradient(ellipse at 50% 0%,${info.color}18 0%,transparent 60%)` }} />
      <div style={styles.container}>

        <button style={styles.backBtn} onClick={() => navigate(info.backRoute)}>
          ← Back to Class VII Subjects
        </button>

        <div style={styles.hero}>
          <span style={styles.heroIcon}>{info.icon}</span>
          <div style={{ ...styles.pill, background: `${info.classColor}22`, border: `1px solid ${info.classColor}55`, color: info.classColor }}>
            CLASS {info.classRoman}
          </div>
          <h1 style={styles.heroTitle}>{info.label}</h1>
          <p style={styles.heroSub}>{chapters.length} Chapters · Tamil Nadu State Board</p>
        </div>

        <div style={styles.chapterList}>
          {chapters.map((ch, i) => (
            <div
              key={i}
              style={{
                ...styles.chBlock,
                borderColor: expanded === i ? info.color : "rgba(255,255,255,0.07)",
              }}
            >
              <button
                style={{ ...styles.chHeader, background: expanded === i ? `${info.color}15` : "transparent" }}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span style={{ ...styles.chNum, color: info.color }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={styles.chTitle}>{ch.title}</span>
                <span style={{ ...styles.chArrow, color: info.color, transform: expanded === i ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
              </button>

              {expanded === i && (
                <div style={styles.chBody}>
                  <div style={styles.topicsWrap}>
                    {ch.topics.map((t, j) => (
                      <div key={j} style={{ ...styles.chip, borderColor: `${info.color}44` }}>
                        <span style={{ color: info.color, marginRight: 6 }}>◆</span>{t}
                      </div>
                    ))}
                  </div>
                  <div style={styles.btnRow}>
                   <button
  style={{ ...styles.btnStudy, background: info.color }}
  onClick={() =>
    navigate(`${info.subjectRoute}/Chapter${i + 1}`)
  }
>
  📖 Study Now
</button>
                    <button style={{ ...styles.btnPractice, borderColor: info.color, color: info.color }}>✏️ Practice MCQ</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:        { minHeight: "100vh", background: "#080c18", padding: "36px 20px 60px", position: "relative", overflow: "hidden" },
  heroBg:      { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 },
  container:   { maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 },
  backBtn:     { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", marginBottom: "32px" },
  hero:        { textAlign: "center", marginBottom: "36px" },
  heroIcon:    { fontSize: "60px", display: "block", marginBottom: "14px" },
  pill:        { display: "inline-block", padding: "4px 16px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", marginBottom: "12px" },
  heroTitle:   { fontSize: "clamp(26px,5vw,40px)", fontWeight: 800, color: "#fff", margin: "0 0 8px" },
  heroSub:     { color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: 0 },
  chapterList: { display: "flex", flexDirection: "column", gap: "10px" },
  chBlock:     { border: "1px solid", borderRadius: "12px", overflow: "hidden", transition: "border-color 0.25s ease" },
  chHeader:    { width: "100%", display: "flex", alignItems: "center", gap: "14px", padding: "15px 18px", cursor: "pointer", border: "none", background: "transparent", transition: "background 0.2s ease" },
  chNum:       { fontSize: "18px", fontWeight: 800, minWidth: "28px", letterSpacing: "-0.5px" },
  chTitle:     { flex: 1, fontSize: "14px", fontWeight: 600, color: "#fff", textAlign: "left" },
  chArrow:     { fontSize: "11px", transition: "transform 0.25s ease" },
  chBody:      { padding: "4px 18px 18px", borderTop: "1px solid rgba(255,255,255,0.05)" },
  topicsWrap:  { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px", paddingTop: "14px" },
  chip:        { background: "rgba(255,255,255,0.04)", border: "1px solid", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 500, display: "flex", alignItems: "center" },
  btnRow:      { display: "flex", gap: "10px", flexWrap: "wrap" },
  btnStudy:    { padding: "9px 20px", borderRadius: "8px", border: "none", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
  btnPractice: { padding: "9px 20px", borderRadius: "8px", border: "2px solid", background: "transparent", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
};
