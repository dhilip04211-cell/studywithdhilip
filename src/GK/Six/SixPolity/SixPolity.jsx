import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjectInfo = {
  label: "Polity",
  icon: "⚖️",
  color: "#2980B9",
  classRoman: "VI",
  classColor: "#FF6B35",
  backRoute: "/gk/six",
  subjectRoute: "/gk/six/sixpolity",
};

const chapters = [
  {
    title: "பன்முகத் தன்மையிலே அறிவோம்",
    topics: ["பன்முகத்தன்மை", "சமூகம்", "மக்கள்", "வேறுபாடு"],
  },
  {
    title: "சமத்துவம் பெறுதல்",
    topics: ["சமத்துவம்", "உரிமைகள்", "சமூக நீதி", "ஒற்றுமை"],
  },
  {
    title: "தேசிய சின்னங்கள்",
    topics: ["தேசிய கொடி", "தேசிய கீதம்", "தேசிய விலங்கு", "தேசிய பறவை"],
  },
  {
    title: "இந்திய அரசியலமைப்புச் சட்டம்",
    topics: ["அரசியலமைப்பு", "முகவுரை", "அடிப்படை உரிமைகள்", "கடமைகள்"],
  },
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
        <button
          style={styles.backBtn}
          onClick={() => navigate(subjectInfo.backRoute)}
        >
          ← Back to Class VI Subjects
        </button>

        <div style={styles.hero}>
          <span style={styles.heroIcon}>{subjectInfo.icon}</span>
          <div
            style={{
              ...styles.classPill,
              background: `${subjectInfo.classColor}22`,
              border: `1px solid ${subjectInfo.classColor}55`,
              color: subjectInfo.classColor,
            }}
          >
            CLASS {subjectInfo.classRoman}
          </div>
          <h1 style={styles.heroTitle}>{subjectInfo.label}</h1>
          <p style={styles.heroSub}>
            {chapters.length} Chapters · Tamil Nadu State Board
          </p>
        </div>

        <div style={styles.chapterList}>
          {chapters.map((ch, i) => (
            <div
              key={i}
              style={{
                ...styles.chapterBlock,
                borderColor:
                  expanded === i
                    ? subjectInfo.color
                    : "rgba(255,255,255,0.07)",
              }}
            >
              <button
                style={{
                  ...styles.chapterHeader,
                  background:
                    expanded === i
                      ? `${subjectInfo.color}15`
                      : "transparent",
                }}
                onClick={() =>
                  setExpanded(expanded === i ? null : i)
                }
              >
                <span
                  style={{
                    ...styles.chNum,
                    color: subjectInfo.color,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span style={styles.chTitle}>{ch.title}</span>

                <span
                  style={{
                    ...styles.chToggle,
                    color: subjectInfo.color,
                    transform:
                      expanded === i
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>

              {expanded === i && (
                <div style={styles.chContent}>
                  <div style={styles.topicsGrid}>
                    {ch.topics.map((topic, j) => (
                      <div
                        key={j}
                        style={{
                          ...styles.topicChip,
                          borderColor: `${subjectInfo.color}44`,
                        }}
                      >
                        <span
                          style={{
                            color: subjectInfo.color,
                            marginRight: 6,
                          }}
                        >
                          ◆
                        </span>
                        {topic}
                      </div>
                    ))}
                  </div>

                  <div style={styles.studyRow}>
                    <button
                      style={{
                        ...styles.studyBtn,
                        background: subjectInfo.color,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `${subjectInfo.subjectRoute}/Chapter${i + 1}`
                        );
                      }}
                    >
                      📖 Study Now
                    </button>

                    <button
                      style={{
                        ...styles.practiceBtn,
                        borderColor: subjectInfo.color,
                        color: subjectInfo.color,
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
