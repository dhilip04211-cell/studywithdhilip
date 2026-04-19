import { useState } from "react";
import { useNavigate } from "react-router-dom";

const info = {
  label: "History",
  icon: "🏛️",
  color: "#E74C3C",
  classRoman: "VII",
  classColor: "#E8A838",
  backRoute: "/gk/seven",
  subjectRoute: "/gk/seven/sevenindianhistory", // ✅ navigation fix
};

const chapters = [
  // Term 1
  {
    title: "இடைக்கால இந்திய வரலாறு ஆதாரங்கள்",
    topics: ["ஆதாரங்கள்", "வரலாறு", "ஆய்வு", "மூலங்கள்"],
  },
  {
    title: "வடஇந்தியப் புதிய அரசுகளின் தோற்றம்",
    topics: ["வடஇந்தியா", "அரசுகள்", "தோற்றம்", "வரலாறு"],
  },
  {
    title: "தென்னிந்தியப் புதிய அரசுகள்",
    topics: ["சோழர்கள்", "பாண்டியர்கள்", "அரசுகள்", "வரலாறு"],
  },
  {
    title: "டெல்லி சுல்தானியம்",
    topics: ["டெல்லி", "சுல்தானியம்", "அரசாட்சி", "வரலாறு"],
  },

  // Term 2
  {
    title: "விஜயநகர், பாமினி அரசுகள்",
    topics: ["விஜயநகர்", "பாமினி", "அரசுகள்", "வரலாறு"],
  },
  {
    title: "முகலாயப் பேரரசு",
    topics: ["முகலாயர்கள்", "அக்பர்", "அரசாட்சி", "வரலாறு"],
  },
  {
    title: "மராத்தியர்கள் மற்றும் பேஷ்வாக்களின் எழுச்சி",
    topics: ["மராத்தியர்கள்", "பேஷ்வாக்கள்", "எழுச்சி", "வரலாறு"],
  },

  // Term 3
  {
    title: "புதிய சமயக் கருத்துக்களும் இயக்கங்களும்",
    topics: ["சமயம்", "இயக்கங்கள்", "சமூக மாற்றம்", "கருத்துகள்"],
  },
  {
    title: "தமிழ்நாட்டில் கலைவும் கட்டடக் கலைவும்",
    topics: ["கலை", "கட்டிடம்", "பண்பாடு", "வரலாறு"],
  },
  {
    title: "தமிழகத்தில் சமணம், பௌத்தம், ஆழ்வார், நாயன்மார்",
    topics: ["சமணம்", "பௌத்தம்", "ஆழ்வார்", "நாயன்மார்"],
  },
];

export default function SevenIndianHistory() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.heroBg,
          background: `radial-gradient(ellipse at 50% 0%,${info.color}18 0%,transparent 60%)`,
        }}
      />
      <div style={styles.container}>

        {/* Back Button */}
        <button
          style={styles.backBtn}
          onClick={() => navigate(info.backRoute)}
        >
          ← Back to Class VII Subjects
        </button>

        {/* Hero Section */}
        <div style={styles.hero}>
          <span style={styles.heroIcon}>{info.icon}</span>

          <div
            style={{
              ...styles.pill,
              background: `${info.classColor}22`,
              border: `1px solid ${info.classColor}55`,
              color: info.classColor,
            }}
          >
            CLASS {info.classRoman}
          </div>

          <h1 style={styles.heroTitle}>{info.label}</h1>
          <p style={styles.heroSub}>
            {chapters.length} Chapters · Tamil Nadu State Board
          </p>
        </div>

        {/* Chapter List */}
        <div style={styles.chapterList}>
          {chapters.map((ch, i) => (
            <div
              key={i}
              style={{
                ...styles.chBlock,
                borderColor:
                  expanded === i
                    ? info.color
                    : "rgba(255,255,255,0.07)",
              }}
            >
              {/* Header */}
              <button
                style={{
                  ...styles.chHeader,
                  background:
                    expanded === i
                      ? `${info.color}15`
                      : "transparent",
                }}
                onClick={() =>
                  setExpanded(expanded === i ? null : i)
                }
              >
                <span
                  style={{
                    ...styles.chNum,
                    color: info.color,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span style={styles.chTitle}>
                  {ch.title}
                </span>

                <span
                  style={{
                    ...styles.chArrow,
                    color: info.color,
                    transform:
                      expanded === i
                        ? "rotate(180deg)"
                        : "rotate(0)",
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Body */}
              {expanded === i && (
                <div style={styles.chBody}>
                  <div style={styles.topicsWrap}>
                    {ch.topics.map((t, j) => (
                      <div
                        key={j}
                        style={{
                          ...styles.chip,
                          borderColor: `${info.color}44`,
                        }}
                      >
                        <span
                          style={{
                            color: info.color,
                            marginRight: 6,
                          }}
                        >
                          ◆
                        </span>
                        {t}
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div style={styles.btnRow}>
                    <button
                      style={{
                        ...styles.btnStudy,
                        background: info.color,
                      }}
                      onClick={() =>
                        navigate(
                          `${info.subjectRoute}/Chapter${i + 1}`
                        )
                      }
                    >
                      📖 Study Now
                    </button>

                    <button
                      style={{
                        ...styles.btnPractice,
                        borderColor: info.color,
                        color: info.color,
                      }}
                    >
                      ✏️ Practice MCQ
                    </button>
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
  page: {
    minHeight: "100vh",
    background: "#080c18",
    padding: "36px 20px 60px",
    position: "relative",
    overflow: "hidden",
  },
  heroBg: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    maxWidth: "720px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  backBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.5)",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    marginBottom: "32px",
  },
  hero: { textAlign: "center", marginBottom: "36px" },
  heroIcon: {
    fontSize: "60px",
    display: "block",
    marginBottom: "14px",
  },
  pill: {
    display: "inline-block",
    padding: "4px 16px",
    borderRadius: "100px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "3px",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "clamp(26px,5vw,40px)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 8px",
  },
  heroSub: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "13px",
  },
  chapterList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  chBlock: {
    border: "1px solid",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "0.25s",
  },
  chHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "15px 18px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
  chNum: {
    fontSize: "18px",
    fontWeight: 800,
    minWidth: "28px",
  },
  chTitle: {
    flex: 1,
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    textAlign: "left",
  },
  chArrow: {
    fontSize: "11px",
    transition: "0.25s",
  },
  chBody: {
    padding: "4px 18px 18px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  topicsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
    paddingTop: "14px",
  },
  chip: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.7)",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btnStudy: {
    padding: "9px 20px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  },
  btnPractice: {
    padding: "9px 20px",
    borderRadius: "8px",
    border: "2px solid",
    background: "transparent",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  },
};