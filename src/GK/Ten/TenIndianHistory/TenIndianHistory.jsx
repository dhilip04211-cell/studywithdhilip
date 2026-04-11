import { useState } from "react";
import { useNavigate } from "react-router-dom";

const info = {
  label: "Indian History",
  icon: "🏛️",
  color: "#E74C3C",
  classRoman: "X",
  classColor: "#1A936F",
  backRoute: "/gk/ten",
  subjectRoute: "/gk/ten/tenindianhistory",
};

const chapters = [
  {
    title: "முதல் உலகப்போரின் வெடிப்பும் அதன் பின்விளைவுகளும்",
    topics: ["காரணங்கள்", "நடப்பு", "வெர்செய்ல்ஸ் ஒப்பந்தம்", "பின்விளைவுகள்"],
  },
  {
    title: "இரு உலகப்போர்களுக்கு இடையில் உலகம்",
    topics: ["பொருளாதார மந்தநிலை", "ஃபாசிசம்", "நாசிசம்", "சமூக மாற்றங்கள்"],
  },
  {
    title: "இரண்டாம் உலகப்போர்",
    topics: ["காரணங்கள்", "அச்சு நாடுகள்", "நேச நாடுகள்", "முடிவு"],
  },
  {
    title: "இரண்டாம் உலகப்போருக்குப் பிந்தைய உலகம்",
    topics: ["ஐ.நா", "குளிர்போர்", "காலனித்துவ ஒழிப்பு", "புதிய உலக ஒழுங்கு"],
  },
  {
    title: "19ஆம் நூற்றாண்டில் சமூக, சமய சீர்திருத்த இயக்கங்கள்",
    topics: ["ராஜா ராம் மோகன் ராய்", "பிரம்ம சமாஜம்", "ஆரிய சமாஜம்", "அலிகர் இயக்கம்"],
  },
  {
    title: "ஆங்கிலேய ஆட்சிக்கு எதிராக தமிழகத்தில் நிகழ்ந்த தொடக்ககால கிளர்ச்சிகள்",
    topics: ["பூலித்தேவர்", "வீரபாண்டிய கட்டபொம்மன்", "மருது சகோதரர்கள்", "வேலூர் கிளர்ச்சி"],
  },
  {
    title: "காணியத்துக்கு எதிரான இயக்கங்களும் தேசியத்தின் தோற்றமும்",
    topics: ["நீலப் புரட்சி", "சம்பரான்", "தேசிய உணர்வு", "காங்கிரஸ் தோற்றம்"],
  },
  {
    title: "தேசியம்: காந்திய காலகட்டம்",
    topics: ["அகில இந்திய இயக்கங்கள்", "ஒத்துழையாமை", "உப்புச்சத்தியாகிரகம்", "வெள்ளையனே வெளியேறு"],
  },
  {
    title: "தமிழ்நாட்டில் விடுதலைப் போராட்டம்",
    topics: ["வ.உ.சி", "சுப்பிரமணிய சிவா", "திருப்பூர் குமரன்", "மகளிர் பங்கு"],
  },
  {
    title: "தமிழ்நாட்டில் சமூக மாற்றங்கள்",
    topics: ["சுயமரியாதை இயக்கம்", "பெரியார்", "பெண்கள் கல்வி", "சமத்துவம்"],
  },
];

export default function TenIndianHistory() {
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
          ← Back to Class X Subjects
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

                  <div style={styles.btnRow}>
                    <button
                      style={{
                        ...styles.btnStudy,
                        background: info.color,
                      }}
                      onClick={() =>
                        navigate(
                          `${info.subjectRoute}/chapter${i + 1}`
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
  page: { minHeight: "100vh", background: "#080c18", padding: "36px 20px 60px", position: "relative", overflow: "hidden" },
  heroBg: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 },
  container: { maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 },
  backBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", marginBottom: "32px" },
  hero: { textAlign: "center", marginBottom: "36px" },
  heroIcon: { fontSize: "60px", display: "block", marginBottom: "14px" },
  pill: { display: "inline-block", padding: "4px 16px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", marginBottom: "12px" },
  heroTitle: { fontSize: "clamp(26px,5vw,40px)", fontWeight: 800, color: "#fff", margin: "0 0 8px" },
  heroSub: { color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: 0 },
  chapterList: { display: "flex", flexDirection: "column", gap: "10px" },
  chBlock: { border: "1px solid", borderRadius: "12px", overflow: "hidden" },
  chHeader: { width: "100%", display: "flex", alignItems: "center", gap: "14px", padding: "15px 18px", cursor: "pointer", border: "none", background: "transparent" },
  chNum: { fontSize: "18px", fontWeight: 800, minWidth: "28px" },
  chTitle: { flex: 1, fontSize: "14px", fontWeight: 600, color: "#fff", textAlign: "left" },
  chArrow: { fontSize: "11px", transition: "transform 0.25s ease" },
  chBody: { padding: "4px 18px 18px", borderTop: "1px solid rgba(255,255,255,0.05)" },
  topicsWrap: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px", paddingTop: "14px" },
  chip: { background: "rgba(255,255,255,0.04)", border: "1px solid", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center" },
  btnRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  btnStudy: { padding: "9px 20px", borderRadius: "8px", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" },
  btnPractice: { padding: "9px 20px", borderRadius: "8px", border: "2px solid", background: "transparent", fontWeight: 700, cursor: "pointer" },
};
