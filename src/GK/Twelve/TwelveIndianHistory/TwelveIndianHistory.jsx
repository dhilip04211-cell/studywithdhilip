import { useState } from "react";
import { useNavigate } from "react-router-dom";

const info = {
  label: "Indian History",
  icon: "🏛️",
  color: "#E74C3C",
  classRoman: "XII",
  classColor: "#9B59B6",
  backRoute: "/gk/twelve",
  subjectRoute: "/gk/twelve/indian-history",
};

const chapters = [
  { title: "இந்தியாவில் தேசியத்தின் எழுச்சி", topics: ["தேசிய உணர்வு", "காங்கிரஸ்", "ஆரம்ப தேசியவாதிகள்", "போராட்டங்கள்"] },
  { title: "தீவிர தேசியவாதத்தின் எழுச்சியும் சுதேசி இயக்கமும்", topics: ["சுதேசி இயக்கம்", "திலகர்", "வங்கப் பிரிவு", "புறக்கணிப்பு"] },
  { title: "இந்திய விடுதலைப்போரில் முதல் உலகப்போரின் தாக்கம்", topics: ["முதல் உலகப்போர்", "தேசிய இயக்கம்", "பிரிட்டிஷ் கொள்கை", "அதிர்வுகள்"] },
  { title: "காந்தியடிகள் தேசியத் தலைவராக உருவெடுத்து மக்களை ஒன்றிணைத்தல்", topics: ["காந்தி", "ஒத்துழையாமை", "சத்தியாகிரகம்", "மக்கள் இயக்கம்"] },
  { title: "ஏகாதிபத்தியத்திற்கு எதிரான போராட்டங்களில் புரட்சிகர தேசியவாதத்தின் காலம்", topics: ["புரட்சியாளர்கள்", "பகத்சிங்", "சந்திரசேகர் ஆசாத்", "INA"] },
  { title: "தேசியவாத அரசியலில் வகுப்புவாதம்", topics: ["சமூகப் பிரிவுகள்", "மத அரசியல்", "குடியரசு", "கட்சிகள்"] },
  { title: "இந்திய தேசிய இயக்கத்தின் இறுதிக்கட்டம்", topics: ["வெள்ளையனே வெளியேறு", "கிரிப்ஸ்", "கேபினெட் மிஷன்", "பிரிவு"] },
  { title: "காணியத்துக்குப் பிந்தைய இந்தியாவின் மறுகட்டமைப்பு", topics: ["பிரிவினை", "அகதிகள்", "மாநில ஒருங்கிணைப்பு", "நேரு"] },
  { title: "ஓர் புதிய சமூக - பொருளாதார ஒழுங்கமைவை எதிர் நோக்குதல்", topics: ["திட்ட ஆணையம்", "ஐந்தாண்டுத் திட்டம்", "சமூகவியல்", "சீர்திருத்தங்கள்"] },
  { title: "நவீன உலகம்: பகுத்தறிவின் காலம்", topics: ["மறுமலர்ச்சி", "பகுத்தறிவு", "அறிவியல்", "மனிதநேயம்"] },
  { title: "புரட்சிகளின் காலம்", topics: ["அமெரிக்கப் புரட்சி", "பிரெஞ்சுப் புரட்சி", "தொழில்புரட்சி", "சமூக மாற்றம்"] },
  { title: "ஐரோப்பாவில் அமைதியின்மை", topics: ["உலகப்போர் காரணங்கள்", "தேசியவாதம்", "அரசியல் மோதல்கள்", "போருக்கு முன்"] },
  { title: "ஏகாதிபத்தியமும் அதன் தாக்கமும்", topics: ["காலனித்துவம்", "ஆப்பிரிக்கா", "ஆசியா", "பொருளாதார தாக்கம்"] },
  { title: "இரண்டாம் உலகப்போரும் காலனிய நாடுகளில் அதன் தாக்கமும்", topics: ["இரண்டாம் உலகப்போர்", "ஐ.நா", "குளிர்போர்", "காலனித்துவ முடிவு"] },
  { title: "இரண்டாம் உலகப்போருக்குப் பிந்தைய உலகம்", topics: ["குளிர்போர்", "UNO", "அமெரிக்கா vs சோவியத்", "உலக அரசியல்"] },
];

export default function TwelveIndianHistory() {
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
          ← Back to Class XII Subjects
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