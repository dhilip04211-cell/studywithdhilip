import { useState } from "react";
import { useNavigate } from "react-router-dom";

const info = {
  label: "Indian History",
  icon: "🏛️",
  color: "#E74C3C",
  classRoman: "XI",
  classColor: "#C6384B",
  backRoute: "/gk/eleven",
  subjectRoute: "/gk/eleven/elevenindianhistory",
};

const chapters = [
  { title: "பண்டைய இந்தியா: தொடக்கம் முதல் சிந்து நாகரிகம் வரை", topics: ["Stone age", "Neolithic", "Chalcolithic", "Indus Valley"] },
  { title: "பண்டைய இந்தியா: செப்புக்கால, பெருங்கற்கால, இரும்புக்கால, வேதகாலப் பண்பாடுகள்", topics: ["Copper age", "Megalithic", "Iron age", "Vedic culture"] },
  { title: "பிற்கால முடியரசுகளின் தோற்றமும் புதிய மதப்பிரிவுகளின் உருவாக்கமும்", topics: ["Mahajanapadas", "Jainism", "Buddhism", "Rise of states"] },
  { title: "அரச மற்றும் பேரரசு உருவாக்கம்", topics: ["Mauryas", "Administration", "Empire expansion", "Ashoka"] },
  { title: "தென்னிந்தியாவில் சமூக உருவாக்கம்", topics: ["Sangam age", "Social groups", "Trade", "Culture"] },
  { title: "மெளரியருக்குப் பிந்தைய அரசியல் அமைப்பும் சமூகமும்", topics: ["Post Mauryas", "Kushanas", "Satavahanas", "Trade"] },
  { title: "குப்தர்", topics: ["Golden age", "Science", "Literature", "Art"] },
  { title: "ஹர்ஷர் மற்றும் பிற்கால முடியரசுகளின் எழுச்சி", topics: ["Harsha", "Regional kingdoms", "North India", "Administration"] },
  { title: "தென்னிந்தியாவில் பல்லாட்டு வளர்ச்சி", topics: ["Pallavas", "Temple art", "Administration", "Literature"] },
  { title: "அரபியர், துருக்கியரின் வருகை", topics: ["Arab invasion", "Turkish raids", "Cultural exchange", "Trade"] },
  { title: "பிற்கால சோழர்கள், பாண்டியர்கள்", topics: ["Later Cholas", "Pandyas", "Temple economy", "Naval trade"] },
  { title: "பாமினி மற்றும் விஜயநகர அரசுகள்", topics: ["Vijayanagara", "Bahmani", "Krishnadevaraya", "Administration"] },
  { title: "பண்பாட்டு ஒருமைப்பாடு: இந்தியாவில் பக்தி இயக்கம்", topics: ["Bhakti", "Alwars", "Nayanmars", "Religious harmony"] },
  { title: "முகலாயப் பேரரசு", topics: ["Babur", "Akbar", "Administration", "Mansabdari"] },
  { title: "மராத்தியர்", topics: ["Shivaji", "Ashtapradhan", "Guerrilla warfare", "Expansion"] },
  { title: "ஐரோப்பியரின் வருகை", topics: ["Portuguese", "Dutch", "French", "British"] },
  { title: "ஆங்கிலேயர் ஆட்சியின் விளைவுகள்", topics: ["Land revenue", "Education", "Transport", "Social changes"] },
  { title: "ஆங்கிலேய ஆட்சிக்குத் தொடக்ககால எதிர்ப்புகள்", topics: ["Polygar wars", "Vellore revolt", "Peasant revolts", "South India"] },
  { title: "நவீனத்தை நோக்கி", topics: ["Modern India", "Nationalism", "Social reforms", "Political awakening"] },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f1117",
    color: "#e8e8f0",
    fontFamily: "'Segoe UI', 'Noto Sans Tamil', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  heroBg: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: 800,
    margin: "0 auto",
    padding: "24px 16px 60px",
  },
  backBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#aaa",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 13,
    marginBottom: 28,
    transition: "all 0.2s",
  },
  hero: {
    textAlign: "center",
    marginBottom: 36,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  heroIcon: {
    fontSize: 52,
    lineHeight: 1,
  },
  pill: {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
    color: "#fff",
  },
  heroSub: {
    color: "#888",
    fontSize: 14,
    margin: 0,
  },
  chapterList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  chBlock: {
    border: "1px solid",
    borderRadius: 12,
    overflow: "hidden",
    transition: "border-color 0.2s",
    background: "rgba(255,255,255,0.03)",
  },
  chHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    transition: "background 0.2s",
    color: "#e8e8f0",
  },
  chNum: {
    fontWeight: 800,
    fontSize: 15,
    minWidth: 28,
    fontVariantNumeric: "tabular-nums",
  },
  chTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  chArrow: {
    fontSize: 11,
    transition: "transform 0.25s",
    flexShrink: 0,
  },
  chBody: {
    padding: "0 16px 16px 56px",
  },
  topicsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    display: "flex",
    alignItems: "center",
    border: "1px solid",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    color: "#ccc",
    background: "rgba(255,255,255,0.04)",
  },
  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  btnStudy: {
    padding: "9px 20px",
    borderRadius: 8,
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  btnPractice: {
    padding: "9px 20px",
    borderRadius: 8,
    border: "1px solid",
    background: "transparent",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
};

export default function ElevenIndianHistory() {
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
        <button
          style={styles.backBtn}
          onClick={() => navigate(info.backRoute)}
        >
          ← Back to Class XI Subjects
        </button>

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

        <div style={styles.chapterList}>
          {chapters.map((ch, i) => (
            <div
              key={i}
              style={{
                ...styles.chBlock,
                borderColor:
                  expanded === i ? info.color : "rgba(255,255,255,0.07)",
              }}
            >
              <button
                style={{
                  ...styles.chHeader,
                  background:
                    expanded === i ? `${info.color}15` : "transparent",
                }}
                onClick={() =>
                  setExpanded(expanded === i ? null : i)
                }
              >
                <span style={{ ...styles.chNum, color: info.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={styles.chTitle}>{ch.title}</span>
                <span
                  style={{
                    ...styles.chArrow,
                    color: info.color,
                    transform:
                      expanded === i ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  ▼
                </span>
              </button>

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
                        <span style={{ color: info.color, marginRight: 6 }}>
                          ◆
                        </span>
                        {t}
                      </div>
                    ))}
                  </div>

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