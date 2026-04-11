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