import { useState, useRef, useEffect } from "react";

const VIDEOS = [
  {
    id: "5kRGCLNReQQ",
    title: "திருக்குறள் பாடம் - 12",
    subtitle: "Playlist Index 12",
    kural: "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு",
    chapter: "அறத்துப்பால்",
    index: 12,
    color: "#C8860A",
  },
  {
    id: "ldu_C31UzgQ",
    title: "திருக்குறள் பாடம் - 8",
    subtitle: "Playlist Index 8",
    kural: "இருள்சேர் இரண்டிடத்தும் கொல்லாமை முதலா",
    chapter: "இன்பத்துப்பால்",
    index: 8,
    color: "#6B3A8A",
  },
];

const PLAYLIST_ID = "PLBItlc8_OPPId3tfvVWU8vyAWDohlKg4S";

function KollamPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", opacity: 0.07, position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <pattern id="kolam" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="8" fill="none" stroke="#C8860A" strokeWidth="1" />
          <circle cx="20" cy="20" r="14" fill="none" stroke="#C8860A" strokeWidth="0.5" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="#C8860A" strokeWidth="0.3" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="#C8860A" strokeWidth="0.3" />
          <circle cx="0" cy="0" r="2" fill="#C8860A" />
          <circle cx="40" cy="0" r="2" fill="#C8860A" />
          <circle cx="0" cy="40" r="2" fill="#C8860A" />
          <circle cx="40" cy="40" r="2" fill="#C8860A" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#kolam)" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #C8860A80, #C8860A, #C8860A80, transparent)" }} />
      <span style={{ color: "#C8860A", fontSize: 18 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #C8860A80, #C8860A, #C8860A80, transparent)" }} />
    </div>
  );
}

function VideoCard({ video, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderRadius: 12,
        background: isActive
          ? "linear-gradient(135deg, #1A0F00 0%, #2C1800 100%)"
          : "rgba(255,255,255,0.03)",
        border: isActive ? "1px solid #C8860A" : "1px solid rgba(200,134,10,0.2)",
        transition: "all 0.3s ease",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isActive && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(200,134,10,0.08), transparent)",
          pointerEvents: "none"
        }} />
      )}

      <div style={{
        width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
        background: isActive ? "#C8860A" : "rgba(200,134,10,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "2px solid",
        borderColor: isActive ? "#F0C040" : "rgba(200,134,10,0.3)",
        transition: "all 0.3s ease"
      }}>
        {isActive ? (
          <span style={{ fontSize: 16, color: "#1A0A00" }}>▶</span>
        ) : (
          <span style={{ fontSize: 14, color: "#C8860A", fontWeight: "bold" }}>{video.index}</span>
        )}
      </div>

      <div style={{ flex: 1, textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? "#F0C040" : "#C8860A", marginBottom: 3 }}>
          {video.title}
        </div>
        <div style={{ fontSize: 11, color: isActive ? "rgba(240,192,64,0.7)" : "rgba(200,134,10,0.5)", fontFamily: "'Noto Serif Tamil', Georgia, serif" }}>
          {video.chapter} · பாடம் {video.index}
        </div>
      </div>

      {isActive && (
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              width: 3, height: 12,
              background: "#C8860A",
              borderRadius: 2,
              animation: `pulse${i} 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
            }} />
          ))}
        </div>
      )}
    </button>
  );
}

function KuralBanner({ video }) {
  return (
    <div style={{
      padding: "18px 24px",
      background: "linear-gradient(135deg, rgba(200,134,10,0.12), rgba(200,134,10,0.04))",
      border: "1px solid rgba(200,134,10,0.3)",
      borderRadius: 12,
      margin: "0 0 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C8860A, #F0C040, #C8860A, transparent)" }} />
      <div style={{ fontSize: 11, letterSpacing: 3, color: "#C8860A", textTransform: "uppercase", marginBottom: 8, opacity: 0.7 }}>
        திருக்குறள் · {video.chapter}
      </div>
      <div style={{
        fontSize: 16,
        color: "#F0C040",
        fontFamily: "'Noto Serif Tamil', 'Lohit Tamil', Georgia, serif",
        lineHeight: 1.7,
        fontStyle: "italic",
        marginBottom: 4,
      }}>
        "{video.kural}"
      </div>
    </div>
  );
}

export default function ThirukkuralVideoTest2() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [pip, setPip] = useState(false);
  const iframeRef = useRef(null);

  const current = VIDEOS[activeIdx];

  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, [activeIdx]);

  const embedUrl = `https://www.youtube.com/embed/${current.id}?list=${PLAYLIST_ID}&autoplay=1&rel=0&modestbranding=1&color=white&enablejsapi=1`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0D0700 0%, #1A0C00 40%, #0F0800 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#E8D5B0",
      position: "relative",
      overflow: "hidden",
    }}>
      <KollamPattern />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;600&display=swap');

        @keyframes pulse1 { from { height: 8px } to { height: 18px } }
        @keyframes pulse2 { from { height: 12px } to { height: 22px } }
        @keyframes pulse3 { from { height: 6px } to { height: 16px } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes shimmer {
          0% { background-position: -200% center }
          100% { background-position: 200% center }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(200,134,10,0.4) }
          50% { border-color: rgba(240,192,64,0.8) }
        }

        .video-card-btn:hover {
          border-color: rgba(200,134,10,0.6) !important;
          background: rgba(200,134,10,0.06) !important;
        }

        .ctrl-btn {
          background: rgba(200,134,10,0.12);
          border: 1px solid rgba(200,134,10,0.3);
          color: #C8860A;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .ctrl-btn:hover {
          background: rgba(200,134,10,0.22);
          border-color: #C8860A;
          color: #F0C040;
        }
        .ctrl-btn.active {
          background: linear-gradient(135deg, #C8860A, #8B5E00);
          border-color: #F0C040;
          color: #1A0A00;
          font-weight: 600;
        }

        .iframe-wrap {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "24px 32px 20px",
        borderBottom: "1px solid rgba(200,134,10,0.2)",
        position: "relative",
      }}>
        <div style={{ position: "absolute", bottom: 0, left: 32, right: 32, height: 1, background: "linear-gradient(90deg, transparent, #C8860A40, #C8860A, #C8860A40, transparent)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #C8860A, #6B3A00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  📜
                </div>
                <div>
                  <div style={{
                    fontSize: 22,
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #F0C040, #C8860A, #F0C040)",
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 4s linear infinite",
                    fontFamily: "'Noto Serif Tamil', Georgia, serif",
                  }}>
                    திருக்குறள் வீடியோ
                  </div>
                  <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(200,134,10,0.6)", textTransform: "uppercase" }}>
                    Thirukkural Video Player
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="ctrl-btn" onClick={() => setActiveIdx(0)}>
                பாடம் 12
              </button>
              <button className="ctrl-btn" onClick={() => setActiveIdx(1)}>
                பாடம் 8
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }}>

        {/* Left: Video Player */}
        <div>
          <KuralBanner video={current} />

          {/* Video Frame */}
          <div style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "2px solid rgba(200,134,10,0.3)",
            position: "relative",
            background: "#000",
            animation: "borderGlow 3s ease-in-out infinite",
            boxShadow: "0 0 60px rgba(200,134,10,0.15), inset 0 0 30px rgba(0,0,0,0.5)",
          }}>
            {/* Corner Decorations */}
            {["topleft", "topright", "bottomleft", "bottomright"].map(pos => (
              <div key={pos} style={{
                position: "absolute",
                width: 20, height: 20,
                borderColor: "#C8860A",
                borderStyle: "solid",
                borderWidth: pos.includes("top") ? "2px 0 0" : "0 0 2px",
                borderLeftWidth: pos.includes("left") ? "2px" : "0",
                borderRightWidth: pos.includes("right") ? "2px" : "0",
                [pos.includes("top") ? "top" : "bottom"]: 8,
                [pos.includes("left") ? "left" : "right"]: 8,
                zIndex: 5,
                pointerEvents: "none",
              }} />
            ))}

            {loaded ? (
              <div className="iframe-wrap" style={{ aspectRatio: "16/9" }}>
                <iframe
                  ref={iframeRef}
                  src={embedUrl}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                  }}
                />
              </div>
            ) : (
              <div style={{
                aspectRatio: "16/9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
                background: "linear-gradient(135deg, #0D0700, #1A0A00)",
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  border: "3px solid #C8860A",
                  borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                }} />
                <div style={{ color: "#C8860A", fontSize: 14, fontFamily: "'Noto Serif Tamil', serif" }}>
                  ஏற்றுகிறது...
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            )}
          </div>

          {/* Video Meta */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#F0C040", fontFamily: "'Noto Serif Tamil', Georgia, serif" }}>
                {current.title}
              </div>
              <div style={{ fontSize: 12, color: "rgba(200,134,10,0.6)", marginTop: 3 }}>
                {current.chapter} · YouTube Playlist Index {current.index}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <a
                href={`https://www.youtube.com/watch?v=${current.id}&list=${PLAYLIST_ID}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #C8860A, #8B5E00)",
                  color: "#1A0A00",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ▶ YouTube-ல் திற
              </a>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Playlist */}
          <div style={{
            borderRadius: 14,
            border: "1px solid rgba(200,134,10,0.25)",
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 18px",
              borderBottom: "1px solid rgba(200,134,10,0.15)",
              background: "linear-gradient(135deg, rgba(200,134,10,0.1), transparent)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ color: "#C8860A", fontSize: 16 }}>📺</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#C8860A", letterSpacing: 1 }}>
                PLAYLIST
              </span>
              <span style={{ marginLeft: "auto", fontSize: 11, background: "rgba(200,134,10,0.2)", color: "#C8860A", padding: "2px 8px", borderRadius: 20 }}>
                {VIDEOS.length} பாடங்கள்
              </span>
            </div>

            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {VIDEOS.map((v, i) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  isActive={i === activeIdx}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div style={{
            borderRadius: 14,
            border: "1px solid rgba(200,134,10,0.25)",
            padding: "18px",
            background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "rgba(200,134,10,0.6)", textTransform: "uppercase", marginBottom: 14 }}>
              பாட விவரம்
            </div>

            <GoldDivider />

            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "நூல்", value: "திருக்குறள்" },
                { label: "ஆசிரியர்", value: "திருவள்ளுவர்" },
                { label: "பால்", value: current.chapter },
                { label: "பாடம்", value: `#${current.index}` },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 12, color: "rgba(200,134,10,0.5)", fontFamily: "'Noto Serif Tamil', serif" }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: "#E8D5B0", fontWeight: 500, fontFamily: "'Noto Serif Tamil', serif" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <GoldDivider />

            <div style={{ marginTop: 12, fontSize: 11, color: "rgba(200,134,10,0.4)", textAlign: "center", lineHeight: 1.7, fontFamily: "'Noto Serif Tamil', serif" }}>
              "வாழ்க வளமுடன்"
            </div>
          </div>

          {/* Navigate */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="ctrl-btn"
              style={{ flex: 1 }}
              onClick={() => setActiveIdx(p => Math.max(0, p - 1))}
              disabled={activeIdx === 0}
            >
              ← முந்தையது
            </button>
            <button
              className="ctrl-btn"
              style={{ flex: 1 }}
              onClick={() => setActiveIdx(p => Math.min(VIDEOS.length - 1, p + 1))}
              disabled={activeIdx === VIDEOS.length - 1}
            >
              அடுத்தது →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(200,134,10,0.15)",
        padding: "16px 32px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}>
        <span style={{ fontSize: 11, color: "rgba(200,134,10,0.35)", letterSpacing: 2 }}>
          ✦ திருக்குறள் — TNPSC STUDY APP ✦
        </span>
      </div>
    </div>
  );
}
