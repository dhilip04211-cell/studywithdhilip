import { useState } from "react";
import { useNavigate } from "react-router-dom";
const subjectInfo = {
  label: "Polity",
  icon: "⚖️",
  color: "#2980B9",
  classRoman: "VI",
  classColor: "#FF6B35",
  backRoute: "/gk/six",
  subjectRoute: "/gk/six/sixpolity/sixpolity",
};
const chapters = [
  // Term 1
  {
    title: "பன்முகத் தன்மையிலே அறிவோம்",
    topics: ["பன்முகத்தன்மை", "சமூகம்", "மக்கள்", "வேறுபாடு"],
  },
  {
    title: "சமத்துவம் பெறுதல்",
    topics: ["சமத்துவம்", "உரிமைகள்", "சமூக நீதி", "ஒற்றுமை"],
  },

  // Term 2
  {
    title: "தேசிய சின்னங்கள்",
    topics: ["தேசிய கொடி", "தேசிய கீதம்", "தேசிய விலங்கு", "தேசிய பறவை"],
  },
  {
    title: "இந்திய அரசியலமைப்புச் சட்டம்",
    topics: ["அரசியலமைப்பு", "முகவுரை", "அடிப்படை உரிமைகள்", "கடமைகள்"],
  },

  // Term 3
  {
    title: "மக்களாட்சி",
    topics: ["மக்கள் ஆட்சி", "தேர்தல்", "வாக்குரிமை", "அரசு"],
  },
  {
    title: "உள்ளாட்சி அமைப்பு – ஊரகமும் நகர்ப்புறமும்",
    topics: ["கிராம பஞ்சாயத்து", "நகராட்சி", "மாவட்டம்", "உள்ளாட்சி"],
  },
  {
    title: "சாலை பாதுகாப்பு",
    topics: ["சாலை விதிகள்", "பாதுகாப்பு", "வாகன ஒழுங்கு", "அபராதம்"],
  },
];

export default function SixPolity() {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        {/* Back Button */}
     onClick={() => navigate(subjectInfo.backRoute)}
          ← Back to Class VI Subjects
        </button>

        {/* Hero Header */}
        <div style={styles.hero}>
          <span style={styles.heroIcon}>{subjectInfo.icon}</span>
          <div style={{
            ...styles.classPill,
            background: `${subjectInfo.classColor}22`,
            border: `1px solid ${subjectInfo.classColor}55`,
            color: subjectInfo.classColor,
          }}>
            CLASS {subjectInfo.classRoman}
          </div>
          <h1 style={styles.heroTitle}>{subjectInfo.label}</h1>
          <p style={styles.heroSub}>{chapters.length} Chapters &nbsp;·&nbsp; Tamil Nadu State Board</p>
        </div>

        {/* Chapter Accordion */}
        <div style={styles.chapterList}>
          {chapters.map((ch, i) => (
            <div
              key={i}
              style={{
                ...styles.chapterBlock,
                borderColor: expanded === i ? subjectInfo.color : "rgba(255,255,255,0.07)",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <button
                style={{
                  ...styles.chapterHeader,
                  background: expanded === i ? `${subjectInfo.color}15` : "transparent",
                }}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span style={{...styles.chNum, color: subjectInfo.color}}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={styles.chTitle}>{ch.title}</span>
                <span style={{
                  ...styles.chToggle,
                  color: subjectInfo.color,
                  transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)",
                }}>▼</span>
              </button>

              {expanded === i && (
                <div style={styles.chContent}>
                  <div style={styles.topicsGrid}>
                    {ch.topics.map((topic, j) => (
                      <div key={j} style={{
                        ...styles.topicChip,
                        borderColor: `${subjectInfo.color}44`,
                      }}>
                        <span style={{color: subjectInfo.color, marginRight: 6}}>◆</span>
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div style={styles.studyRow}>
                <button
  style={{ ...styles.studyBtn, background: subjectInfo.color }}
  onClick={() =>
    navigate(`${subjectInfo.subjectRoute}/Chapter${i + 1}`)
  }
>
  📖 Study Now
</button>
                    <button style={{...styles.practiceBtn, borderColor: subjectInfo.color, color: subjectInfo.color}}>
                      ✏️ Practice MCQ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#080c18",
    fontFamily: "'Sora', sans-serif",
    padding: "36px 20px 60px",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "fixed",
    inset: 0,
    background: "radial-gradient(ellipse at 50% 0%, #2980B91a 0%, transparent 55%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    width: "100%",
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
    fontFamily: "'Sora', sans-serif",
    marginBottom: "32px",
    transition: "all 0.2s",
  },
  hero: {
    textAlign: "center",
    marginBottom: "36px",
    animation: "fadeUp 0.5s ease both",
  },
  heroIcon: {
    fontSize: "60px",
    display: "block",
    marginBottom: "14px",
  },
  classPill: {
    display: "inline-block",
    padding: "4px 16px",
    borderRadius: "100px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "3px",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "clamp(26px, 5vw, 40px)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 8px",
  },
  heroSub: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "13px",
    margin: 0,
  },
  chapterList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  chapterBlock: {
    border: "1px solid",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "border-color 0.25s ease",
    animation: "fadeUp 0.4s ease both",
  },
  chapterHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "15px 18px",
    cursor: "pointer",
    border: "none",
    fontFamily: "'Sora', sans-serif",
    transition: "background 0.2s ease",
  },
  chNum: {
    fontSize: "18px",
    fontWeight: 800,
    minWidth: "28px",
    letterSpacing: "-0.5px",
  },
  chTitle: {
    flex: 1,
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    textAlign: "left",
  },
  chToggle: {
    fontSize: "11px",
    transition: "transform 0.25s ease",
  },
  chContent: {
    padding: "4px 18px 18px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  topicsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
    paddingTop: "14px",
  },
  topicChip: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  studyRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  studyBtn: {
    padding: "9px 20px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  },
  practiceBtn: {
    padding: "9px 20px",
    borderRadius: "8px",
    border: "2px solid",
    background: "transparent",
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  },
};
