import { useState } from "react";
import { useNavigate } from "react-router-dom";

const info = {
  label: "Ethics",
  icon: "🕉️",
  color: "#8E44AD",
  classRoman: "XII",
  classColor: "#9B59B6",
  backRoute: "/gk/twelve",
  subjectRoute: "/gk/twelve/twelveethics",
};

const chapters = [
  {
    title: "இந்தியப் பண்பாட்டின் இயல்புகள்",
    topics: ["அறிமுகம்", "பண்பாட்டு கூறுகள்", "மதிப்புகள்", "சமூகம்"],
  },
  {
    title: "வேற்றுமையில் ஒற்றுமை",
    topics: ["இந்திய பல்வகைமை", "ஒற்றுமை", "மொழிகள்", "மரபுகள்"],
  },
  {
    title: "வேதாகாலப் பண்பாடு",
    topics: ["வேதங்கள்", "சமூகம்", "கல்வி", "மதம்"],
  },
  {
    title: "இந்தியப் பண்பாடும் சமயங்களும்",
    topics: ["இந்துமதம்", "புத்தம்", "ஜைனம்", "இஸ்லாம்"],
  },
  {
    title: "இந்தியப் பண்பாட்டுப் போக்குகளின் கொடை",
    topics: ["கலை", "இலக்கியம்", "அறிவியல்", "தத்துவம்"],
  },
  {
    title: "பக்தி இயக்கம்",
    topics: ["ஆழ்வார்", "நாயன்மார்", "சமூக தாக்கம்", "மத ஒற்றுமை"],
  },
  {
    title: "சமூக - சமய சீர்திருத்த இயக்கங்கள்",
    topics: ["ராஜா ராம் மோகன் ராய்", "விவேகானந்தர்", "பெரியார்", "சீர்திருத்தம்"],
  },
  {
    title: "யோகம் உணர்ந்தும் வாழ்வியல் நெறிகள்",
    topics: ["யோகம்", "நெறிமுறைகள்", "தியானம்", "வாழ்வியல்"],
  },
  {
    title: "இந்தியப் பண்பாடும் சுற்றுச்சூழலும்",
    topics: ["சுற்றுச்சூழல்", "பசுமை", "இயற்கை", "மனிதன்"],
  },
  {
    title: "உலகிற்கு இந்தியப் பண்பாட்டின் கொடை",
    topics: ["யோகம்", "ஆயுர்வேதம்", "தத்துவம்", "உலகளாவிய தாக்கம்"],
  },
];

export default function TwelveEthics() {
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
  hero: {
    textAlign: "center",
    marginBottom: "36px",
  },
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
    margin: 0,
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
    transition: "transform 0.25s ease",
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
    display: "flex",
    alignItems: "center",
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
