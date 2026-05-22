import { useState, useEffect, useCallback, useRef } from "react";

/* ─── GOOGLE CONFIG ──────────────────────────────────────────────────────── */
const SHEET_ID  = "1eIwrFpP9nRa8o2kl7eeBtiffUs2CU5-xWcAGKtHSgjw";
const API_KEY   = "AIzaSyAm8cnPYK9-2L7bl81osszkW_UfldW356g";
const CLIENT_ID = "879226759032-dp5gjt6cemobr34kcmi1lg638e37f36q.apps.googleusercontent.com";
const SCOPES    = "https://www.googleapis.com/auth/spreadsheets";

/* Token stored in localStorage — key names */
const LS_TOKEN      = "crlmp_token";
const LS_TOKEN_EXP  = "crlmp_token_exp";
const LS_SHEET      = "crlmp_sheet";
const LS_YEAR       = "crlmp_year";
const LS_APIKEY     = "crlmp_apikey";

/* ─── COLUMN MAP (0-based) ───────────────────────────────────────────────── */
const COL       = { SR:0, CASE:1, ADDR:2, FIR_DATE:3, NEXT_DATE:4, ACT:5, PS:6, FIR_NO:7 };
const HEADERS   = ["Sr.No","Case No.","Address","FIR Date","Next Date","Act Section","Police Station","FIR No."];
const DATE_COLS = new Set([COL.FIR_DATE, COL.NEXT_DATE]);
const READONLY  = new Set([COL.SR, COL.CASE]);

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const toA1    = (row, col) => `${String.fromCharCode(65 + col)}${row}`;
const normStr = (s = "") => s.toString().replace(/\D/g, "");
const ls      = { get: k => { try { return localStorage.getItem(k); } catch { return null; } },
                  set: (k,v) => { try { localStorage.setItem(k,v); } catch {} },
                  del: k => { try { localStorage.removeItem(k); } catch {} } };

function fmtDate(raw = "") {
  if (!raw) return "";
  if (/^\d{2}-\d{2}-\d{4}$/.test(raw.trim())) return raw.trim();
  const m = raw.trim().match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})$/);
  if (m) return `${m[1].padStart(2,"0")}-${m[2].padStart(2,"0")}-${m[3].padStart(4,"0")}`;
  return raw;
}

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────── */
const INJECTED = { done: false };
function injectCSS() {
  if (INJECTED.done) return;
  INJECTED.done = true;
  const s = document.createElement("style");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#f8f6f1;font-family:'JetBrains Mono',monospace}
    @keyframes spin   {to{transform:rotate(360deg)}}
    @keyframes fadeUp {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse  {0%,100%{opacity:1}50%{opacity:0.5}}
    .tab-btn:hover  {background:#fff8e8!important;border-color:#C9A84C!important;color:#8B5E0A!important}
    .mod-btn:hover  {background:#fff8ec!important;border-color:#C9A84C!important;color:#8B5E0A!important}
    .save-btn:hover {opacity:.88!important}
    .cam-btn:hover  {background:#e8f4ff!important;border-color:#3B6BF5!important}
    input:focus,textarea:focus{outline:none!important;border-color:#C9A84C!important;box-shadow:0 0 0 3px #C9A84C22!important}
    .field-card{animation:fadeUp .22s ease both}
    .ocr-overlay{position:fixed;inset:0;background:#000c;z-index:9999;display:flex;align-items:center;justify-content:center}
    .ocr-progress-bar{height:4px;background:#e0d8cc;border-radius:2px;overflow:hidden;margin:8px 0}
    .ocr-progress-fill{height:100%;background:linear-gradient(90deg,#C9A84C,#8B5E0A);border-radius:2px;transition:width 0.3s ease}
    .tess-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#f0fff4;border:1px solid #6bcf8a;border-radius:3px;font-size:9px;color:#1a7a3a;letter-spacing:0.08em}
  `;
  document.head.appendChild(s);
}

/* ─── TESSERACT LOADER ───────────────────────────────────────────────────── */
let tesseractWorker = null;
let tesseractLoading = false;
let tesseractReady = false;

async function loadTesseract() {
  if (tesseractReady && tesseractWorker) return tesseractWorker;
  if (tesseractLoading) {
    // wait until ready
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (tesseractReady) { clearInterval(interval); resolve(); }
      }, 200);
    });
    return tesseractWorker;
  }
  tesseractLoading = true;
  // Dynamically load Tesseract.js from CDN
  if (!window.Tesseract) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  tesseractWorker = await window.Tesseract.createWorker(["eng", "tam"], 1, {
    workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js",
    corePath:   "https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core.wasm.js",
    langPath:   "https://tessdata.projectnaptha.com/4.0.0",
  });
  tesseractReady = true;
  tesseractLoading = false;
  return tesseractWorker;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function CRLMPEditor() {
  injectCSS();

  /* ── persistent sheet & year ── */
  const [sheets,      setSheets]      = useState([]);
  const [activeSheet, setActiveSheet] = useState(ls.get(LS_SHEET) || "");
  const [caseNum,     setCaseNum]     = useState("");
  const [caseYear,    setCaseYear]    = useState(ls.get(LS_YEAR) || new Date().getFullYear().toString());

  /* ── search / edit ── */
  const [searching,   setSearching]   = useState(false);
  const [result,      setResult]      = useState(null);
  const [editData,    setEditData]    = useState({});
  const [modCols,     setModCols]     = useState(new Set());
  const [saving,      setSaving]      = useState(false);
  const [saveMsg,     setSaveMsg]     = useState("");
  const [error,       setError]       = useState("");

  /* ── auth ── */
  const [token,       setToken]       = useState("");
  const [apiKey,      setApiKey]      = useState(ls.get(LS_APIKEY) || "");
  const [gisReady,    setGisReady]    = useState(false);
  const tokenRef      = useRef("");
  const tokenClient   = useRef(null);

  /* ── camera/OCR ── */
  const [ocrOpen,       setOcrOpen]       = useState(false);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrProgress,   setOcrProgress]   = useState(0);
  const [ocrStatus,     setOcrStatus]     = useState("");
  const [ocrError,      setOcrError]      = useState("");
  const [ocrMode,       setOcrMode]       = useState("camera");
  const [capturedBlob,  setCapturedBlob]  = useState(null);
  const [capturedUrl,   setCapturedUrl]   = useState("");
  const [cropStart,     setCropStart]     = useState(null);
  const [cropRect,      setCropRect]      = useState(null);
  const [isDragging,    setIsDragging]    = useState(false);
  const [focusRing,     setFocusRing]     = useState({ x:0, y:0, show:false });
  const cropImgRef    = useRef(null);
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileRef   = useRef(null);

  /* ── focus ── */
  const caseNumRef  = useRef(null);
  const caseYearRef = useRef(null);

  /* ── Preload Tesseract in background on mount ── */
  useEffect(() => {
    loadTesseract().catch(() => {}); // silent background load
  }, []);

  /* ══════════════════════════════════════════════════════════════
     RESTORE TOKEN FROM LOCALSTORAGE ON MOUNT
  ══════════════════════════════════════════════════════════════ */
  const restoreToken = useCallback(() => {
    const saved    = ls.get(LS_TOKEN);
    const expiry   = parseInt(ls.get(LS_TOKEN_EXP) || "0", 10);
    if (saved && Date.now() < expiry) {
      tokenRef.current = saved;
      setToken(saved);
      return true;
    }
    ls.del(LS_TOKEN); ls.del(LS_TOKEN_EXP);
    return false;
  }, []);

  /* ══════════════════════════════════════════════════════════════
     LOAD GIS + SHEETS DATA
  ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    restoreToken();
    fetchSheetNames();

    const gis = document.createElement("script");
    gis.src   = "https://accounts.google.com/gsi/client";
    gis.async = true;
    gis.defer = true;
    gis.onload = () => {
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        prompt: "",
        callback: (resp) => {
          if (resp.error) { setError("Sign-in failed: " + resp.error); return; }
          const t      = resp.access_token;
          const expMs  = Date.now() + (resp.expires_in - 60) * 1000;
          tokenRef.current = t;
          setToken(t);
          ls.set(LS_TOKEN, t);
          ls.set(LS_TOKEN_EXP, expMs.toString());
          setTimeout(() => silentRefresh(), (resp.expires_in - 70) * 1000);
        },
      });
      setGisReady(true);
      if (!restoreToken()) silentSignIn();
    };
    document.head.appendChild(gis);
  }, []);

  const silentSignIn  = () => { if (!tokenClient.current) return; tokenClient.current.requestAccessToken({ prompt: "" }); };
  const silentRefresh = () => { if (!tokenClient.current) return; tokenClient.current.requestAccessToken({ prompt: "" }); };

  const signIn = () => {
    if (!gisReady) { setError("Google Sign-In loading… try again."); return; }
    tokenClient.current.requestAccessToken({ prompt: "select_account" });
  };

  const signOut = () => {
    if (token) window.google?.accounts?.oauth2?.revoke(token, () => {});
    tokenRef.current = "";
    setToken("");
    ls.del(LS_TOKEN);
    ls.del(LS_TOKEN_EXP);
  };

  /* ── Fetch sheet tab names ── */
  const fetchSheetNames = useCallback(async () => {
    try {
      const r = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title&key=${API_KEY}`
      );
      const j = await r.json();
      if (j.error) { setError("Sheets API: " + j.error.message); return; }
      const names = j.sheets?.map(s => s.properties.title) || [];
      setSheets(names);
      const saved = ls.get(LS_SHEET);
      if (saved && names.includes(saved)) {
        setActiveSheet(saved);
      } else if (names.length) {
        setActiveSheet(names[0]);
        ls.set(LS_SHEET, names[0]);
      }
    } catch (e) {
      setError("Cannot load sheet tabs. Check API Key.");
    }
  }, []);

  /* ── Select sheet (persisted) ── */
  const selectSheet = (name) => {
    setActiveSheet(name);
    ls.set(LS_SHEET, name);
    setResult(null); setEditData({}); setModCols(new Set());
    setError(""); setSaveMsg("");
  };

  /* ── Search ── */
  const search = async () => {
    const q = `${caseNum.trim()}/${caseYear.trim()}`;
    if (!caseNum || !caseYear) { setError("Enter case number and year."); return; }
    if (!activeSheet)          { setError("Select a sheet tab first."); return; }
    setSearching(true); setError(""); setResult(null);
    setEditData({}); setModCols(new Set()); setSaveMsg("");
    try {
      const range = encodeURIComponent(`${activeSheet}!A:H`);
      const res   = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`
      );
      const json  = await res.json();
      if (json.error) throw new Error(json.error.message);
      const rows  = json.values || [];
      let found   = null;
      for (let i = 1; i < rows.length; i++) {
        const cellNorm  = normStr(rows[i][COL.CASE] || "");
        const queryNorm = normStr(q);
        if (cellNorm.includes(queryNorm) && queryNorm.length > 0) {
          found = { rowIndex: i + 1, data: rows[i] }; break;
        }
      }
      if (!found) {
        setError(`"${q}" not found in sheet "${activeSheet}".`);
      } else {
        setResult(found);
        const init = {};
        HEADERS.forEach((_, ci) => {
          init[ci] = DATE_COLS.has(ci) ? fmtDate(found.data[ci] || "") : (found.data[ci] || "");
        });
        setEditData(init);
      }
    } catch (e) {
      setError("Search error: " + e.message);
    } finally {
      setSearching(false);
    }
  };

  /* ── Save ── */
  const save = async () => {
    if (!result) return;
    if (!tokenRef.current) { setError("Not signed in. Click Sign In first."); return; }
    setSaving(true); setSaveMsg(""); setError("");
    try {
      const data = [];
      modCols.forEach(ci => {
        data.push({ range: `${activeSheet}!${toA1(result.rowIndex, ci)}`, values: [[editData[ci]]] });
      });
      if (!data.length) { setSaveMsg("Nothing changed."); setSaving(false); return; }
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
        {
          method: "POST",
          headers: { "Authorization": `Bearer ${tokenRef.current}`, "Content-Type": "application/json" },
          body: JSON.stringify({ valueInputOption: "USER_ENTERED", data })
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 401) {
          silentRefresh();
          setError("Session refreshed. Please save again.");
          setSaving(false); return;
        }
        throw new Error(err.error?.message || res.statusText);
      }
      setSaveMsg(`✓ Saved ${data.length} field${data.length > 1 ? "s" : ""} to "${activeSheet}"!`);
      setModCols(new Set());
      setTimeout(() => caseNumRef.current?.focus(), 150);
    } catch (e) {
      setError("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const markMod = (ci, val) => {
    setEditData(p => ({ ...p, [ci]: val }));
    setModCols(p => new Set([...p, ci]));
  };

  useEffect(() => { if (caseYear) ls.set(LS_YEAR, caseYear); }, [caseYear]);
  useEffect(() => { ls.set(LS_APIKEY, apiKey); }, [apiKey]);

  /* ── Camera / OCR ── */
  const openCamera = async () => {
    setOcrOpen(true); setOcrError(""); setOcrProcessing(false);
    setOcrMode("camera"); setCapturedBlob(null); setCapturedUrl(""); setCropRect(null);
    setOcrProgress(0); setOcrStatus("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      streamRef.current = s;
      setTimeout(() => {
        if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); }
      }, 100);
    } catch (e) {
      setOcrError("Camera access denied. Use the Image button to pick from gallery.");
    }
  };

  /* Tap-to-focus on video */
  const tapFocus = (e) => {
    const track = streamRef.current?.getVideoTracks?.()?.[0];
    if (!track) return;
    const caps = track.getCapabilities?.() || {};
    if (!caps.focusMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    track.applyConstraints({ advanced: [{ focusMode:"manual", pointsOfInterest:[{x,y}] }] }).catch(()=>{});
    setFocusRing({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
    setTimeout(() => setFocusRing(r => ({...r, show:false})), 900);
  };

  const capturePhoto = () => {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    stopStream();
    c.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      setCapturedBlob(blob); setCapturedUrl(url);
      setCropRect(null); setCropStart(null);
      setOcrMode("crop");
    }, "image/jpeg", 0.95);
  };

  /* ── Crop helpers ── */
  const getImgCoords = (e, el) => {
    const r = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - r.left, y: clientY - r.top, w: r.width, h: r.height };
  };
  const onCropStart = (e) => {
    e.preventDefault();
    const el = cropImgRef.current; if (!el) return;
    const { x, y } = getImgCoords(e, el);
    setCropStart({ x, y }); setCropRect(null); setIsDragging(true);
  };
  const onCropMove = (e) => {
    if (!isDragging || !cropStart) return;
    e.preventDefault();
    const el = cropImgRef.current; if (!el) return;
    const { x, y } = getImgCoords(e, el);
    setCropRect({
      x: Math.min(cropStart.x, x), y: Math.min(cropStart.y, y),
      w: Math.abs(x - cropStart.x), h: Math.abs(y - cropStart.y)
    });
  };
  const onCropEnd = () => setIsDragging(false);

  const applyCrop = () => {
    if (!capturedBlob) return;
    const img = cropImgRef.current; if (!img) return;
    const c = canvasRef.current; if (!c) return;
    const scaleX = img.naturalWidth  / img.getBoundingClientRect().width;
    const scaleY = img.naturalHeight / img.getBoundingClientRect().height;
    if (cropRect && cropRect.w > 10 && cropRect.h > 10) {
      c.width  = cropRect.w * scaleX;
      c.height = cropRect.h * scaleY;
      const imgEl = new Image();
      imgEl.onload = () => {
        c.getContext("2d").drawImage(imgEl,
          cropRect.x * scaleX, cropRect.y * scaleY, c.width, c.height,
          0, 0, c.width, c.height);
        c.toBlob(b => runOCR(b), "image/jpeg", 0.95);
      };
      imgEl.src = capturedUrl;
    } else {
      runOCR(capturedBlob);
    }
  };

  const stopStream = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; };

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    e.target.value = "";
    const url = URL.createObjectURL(f);
    setCapturedBlob(f); setCapturedUrl(url);
    setCropRect(null); setCropStart(null);
    setOcrOpen(true); setOcrError(""); setOcrProcessing(false);
    setOcrMode("crop");
  };

  /* ══════════════════════════════════════════════════════════════
     RUN OCR — Tesseract.js (free, in-browser, supports Tamil+English)
  ══════════════════════════════════════════════════════════════ */
  const runOCR = async (blob) => {
    setOcrMode("processing");
    setOcrProcessing(true);
    setOcrError("");
    setOcrProgress(0);
    setOcrStatus("Loading Tesseract engine…");

    try {
      /* Load / reuse Tesseract worker */
      const worker = await loadTesseract();

      setOcrStatus("Recognising text…");

      /* Convert blob to image URL for Tesseract */
      const imgUrl = URL.createObjectURL(blob);

      const { data } = await worker.recognize(imgUrl, {}, {
        text: true,
      });

      // Simulate progress updates since Tesseract v5 doesn't expose per-step callbacks easily
      setOcrProgress(100);
      URL.revokeObjectURL(imgUrl);

      const txt = data.text?.trim() || "";

      if (txt) {
        setEditData(p => ({ ...p, [COL.ADDR]: txt }));
        setModCols(p => new Set([...p, COL.ADDR]));
        setOcrOpen(false);
        if (capturedUrl) URL.revokeObjectURL(capturedUrl);
      } else {
        setOcrError("No text detected. Try cropping closer to the text.");
        setOcrMode("crop");
      }
    } catch (e) {
      setOcrError("OCR error: " + e.message);
      setOcrMode("crop");
    } finally {
      setOcrProcessing(false);
      setOcrProgress(0);
      setOcrStatus("");
    }
  };

  const closeOcr = () => {
    stopStream();
    setOcrOpen(false); setOcrError(""); setOcrProcessing(false);
    setOcrMode("camera"); setOcrProgress(0); setOcrStatus("");
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedUrl(""); setCapturedBlob(null);
  };

  /* ═══════════════ RENDER ═════════════════════════════════════════════════ */
  const caseQuery  = caseNum && caseYear ? `${caseNum}/${caseYear}` : null;
  const isLoggedIn = !!token;

  return (
    <div style={S.root}>

      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={S.stripe} />
        <div style={S.hInner}>
          <div>
            <h1 style={S.title}>⚖ CRLMP Case Editor</h1>
            <p style={S.sub}>
              Court Record &amp; Legal Management Portal
              {activeSheet ? ` · ${activeSheet}` : ""}
            </p>
          </div>

          <div style={S.authArea}>
            {isLoggedIn ? (
              <>
                <span style={S.signedIn}>● Signed In</span>
                <button style={S.signOutBtn} onClick={signOut}>Sign Out</button>
              </>
            ) : (
              <button style={S.signBtn} onClick={signIn} disabled={!gisReady}>
                {gisReady ? "🔐 Sign In with Google" : "⏳ Loading…"}
              </button>
            )}
          </div>
        </div>
      </header>

      <div style={S.body}>

        {/* ── SHEET TABS ── */}
        <section style={S.card}>
          <p style={S.secLabel}>SELECT SHEET TAB <span style={S.persisted}>(remembered)</span></p>
          <div style={S.tabBar}>
            {sheets.length === 0 && <span style={S.muted}>Loading tabs…</span>}
            {sheets.map(s => (
              <button key={s} className="tab-btn"
                style={{ ...S.tab, ...(activeSheet === s ? S.tabOn : {}) }}
                onClick={() => selectSheet(s)}>
                {activeSheet === s ? "✓ " : ""}{s}
              </button>
            ))}
          </div>
        </section>

        {/* ── SEARCH ── */}
        <section style={S.card}>
          <p style={S.secLabel}>SEARCH CASE</p>
          <div style={S.searchWrap}>
            <div style={S.searchRow}>
              <div style={S.fg}>
                <label style={S.lbl}>CRLMP No.</label>
                <input
                  ref={caseNumRef}
                  style={S.inp}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  enterKeyHint="next"
                  placeholder="e.g. 2956"
                  value={caseNum}
                  onChange={e => setCaseNum(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={e => { if (e.key === "Enter") caseYearRef.current?.focus(); }}
                />
              </div>
              <div style={S.slash}>/</div>
              <div style={S.fg}>
                <label style={S.lbl}>Year <span style={S.persisted}>(remembered)</span></label>
                <input
                  ref={caseYearRef}
                  style={{ ...S.inp, width: 92 }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  enterKeyHint="search"
                  placeholder="2024"
                  maxLength={4}
                  value={caseYear}
                  onChange={e => setCaseYear(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={e => { if (e.key === "Enter") search(); }}
                />
              </div>
              {caseQuery && <div style={S.preview}>{caseQuery}</div>}
            </div>
            <button style={S.searchBtn} onClick={search} disabled={searching}>
              {searching && <span style={S.spin} />}
              {searching ? "Searching…" : "🔍 Search"}
            </button>
          </div>
        </section>

        {/* ── MESSAGES ── */}
        {error   && <div style={S.errBox}>⚠ {error}</div>}
        {saveMsg && <div style={S.okBox}>{saveMsg}</div>}

        {/* ── RESULT ── */}
        {result && (
          <section style={{ ...S.card, padding:0, border:`1.5px solid #C9A84C` }}>
            <div style={S.resHead}>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <span style={S.foundBadge}>CASE FOUND</span>
                <span style={S.foundCase}>{editData[COL.CASE]}</span>
              </div>
              <span style={S.resMeta}>Sheet: <b>{activeSheet}</b> · Row <b>{result.rowIndex}</b></span>
            </div>

            <div style={S.grid}>
              {HEADERS.map((hdr, ci) => {
                const isMod  = modCols.has(ci);
                const isDate = DATE_COLS.has(ci);
                const isAddr = ci === COL.ADDR;
                const isRO   = READONLY.has(ci);
                return (
                  <div key={ci} className="field-card"
                    style={{ ...S.fCard, ...(isMod ? S.fCardMod : {}), animationDelay:`${ci*25}ms` }}>
                    <div style={S.fTop}>
                      <span style={S.fLbl}>{hdr}</span>
                      {isMod && <span style={S.modBadge}>MODIFIED</span>}
                    </div>

                    {isAddr ? (
                      <AddressField
                        value={editData[ci] || ""}
                        onChange={v => markMod(ci, v)}
                        onCamera={openCamera}
                        onFile={() => fileRef.current?.click()}
                      />
                    ) : isDate ? (
                      <DateField value={editData[ci] || ""} isMod={isMod} onChange={v => markMod(ci, v)} />
                    ) : isRO ? (
                      <div style={S.roVal}>{editData[ci] || "—"}</div>
                    ) : (
                      <EditField value={editData[ci] || ""} isMod={isMod} onChange={v => markMod(ci, v)} />
                    )}
                  </div>
                );
              })}
            </div>

            <div style={S.saveBar}>
              {modCols.size > 0 && (
                <span style={S.pending}>{modCols.size} field{modCols.size > 1 ? "s" : ""} pending</span>
              )}
              <button className="save-btn"
                style={{ ...S.saveBtn, ...(saving ? { opacity:.6 } : {}) }}
                onClick={save} disabled={saving}>
                {saving ? "Saving…" : "💾 Save to Sheet"}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* ── OCR OVERLAY ── */}
      {ocrOpen && (
        <div className="ocr-overlay">
          <div style={S.ocrCard}>

            {/* Header */}
            <div style={S.ocrHead}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={S.ocrTitle}>
                  {ocrMode==="crop" ? "✂️ Crop & Scan" : ocrMode==="processing" ? "🔍 Scanning…" : "📷 Scan Address"}
                </span>
                {/* FREE badge */}
                <span className="tess-badge">✦ FREE · Tesseract.js</span>
              </div>
              <button style={S.ocrClose} onClick={closeOcr}>✕</button>
            </div>

            {/* Processing */}
            {ocrMode === "processing" ? (
              <div style={S.ocrCenter}>
                <div style={S.bigSpin} />
                <p style={S.ocrStatusTxt}>{ocrStatus || "Processing…"}</p>
                {/* Progress bar */}
                <div style={{ width:"80%", marginTop:8 }}>
                  <div className="ocr-progress-bar">
                    <div className="ocr-progress-fill"
                      style={{ width: ocrProgress > 0 ? `${ocrProgress}%` : "60%",
                               animation: ocrProgress === 0 ? "pulse 1.5s ease-in-out infinite" : "none" }} />
                  </div>
                  <p style={{ fontSize:10, color:"#bbb", textAlign:"center", marginTop:4, letterSpacing:"0.08em" }}>
                    RUNNING IN BROWSER · NO DATA SENT TO SERVER
                  </p>
                </div>
              </div>

            /* Crop / Preview mode */
            ) : ocrMode==="crop" && capturedUrl ? (
              <div style={{ position:"relative", userSelect:"none" }}>
                <p style={{ fontSize:11, color:"#888", textAlign:"center", padding:"8px 0 4px",
                            background:"#f8f6f1", letterSpacing:"0.05em" }}>
                  DRAG to select area · leave empty for full image
                </p>
                <div style={{ position:"relative", lineHeight:0, touchAction:"none" }}
                  onMouseDown={onCropStart} onMouseMove={onCropMove} onMouseUp={onCropEnd}
                  onTouchStart={onCropStart} onTouchMove={onCropMove} onTouchEnd={onCropEnd}>
                  <img ref={cropImgRef} src={capturedUrl} alt="captured"
                    style={{ width:"100%", maxHeight:300, objectFit:"contain", display:"block",
                             cursor:"crosshair" }} draggable={false} />
                  {cropRect && cropRect.w > 4 && cropRect.h > 4 && (
                    <div style={{
                      position:"absolute",
                      left:cropRect.x, top:cropRect.y,
                      width:cropRect.w, height:cropRect.h,
                      border:"2px solid #C9A84C",
                      background:"rgba(201,168,76,0.15)",
                      pointerEvents:"none"
                    }} />
                  )}
                </div>
                {ocrError && (
                  <p style={{ color:"#c0392b", fontSize:12, padding:"6px 14px",
                               background:"#fff0f0", textAlign:"center" }}>{ocrError}</p>
                )}
                <div style={{ display:"flex", gap:8, padding:"10px 12px" }}>
                  <button style={S.galleryBtn} onClick={openCamera}>🔄 Retake</button>
                  <button style={S.galleryBtn} onClick={() => fileRef.current?.click()}>🖼 Gallery</button>
                  <button style={{ ...S.capBtn, flex:2 }} onClick={applyCrop}>
                    {cropRect && cropRect.w > 10 ? "✂️ Crop & Scan" : "🔍 Scan Full"}
                  </button>
                </div>
                <canvas ref={canvasRef} style={{ display:"none" }} />
              </div>

            /* Camera live view */
            ) : (
              <div style={{ position:"relative" }}>
                <div style={{ position:"relative", lineHeight:0 }} onClick={tapFocus}>
                  <video ref={videoRef} autoPlay playsInline muted style={S.video} />
                  {focusRing.show && (
                    <div style={{
                      position:"absolute",
                      left: focusRing.x - 22, top: focusRing.y - 22,
                      width:44, height:44,
                      border:`2px solid ${G}`, borderRadius:"50%",
                      pointerEvents:"none", animation:"fadeUp .2s ease"
                    }} />
                  )}
                  <p style={{ position:"absolute", bottom:6, left:0, right:0, textAlign:"center",
                               fontSize:10, color:"#fff9", letterSpacing:"0.1em" }}>
                    TAP TO FOCUS
                  </p>
                </div>
                <canvas ref={canvasRef} style={{ display:"none" }} />
                {ocrError && (
                  <p style={{ color:"#c0392b", fontSize:12, padding:"8px 14px",
                               background:"#fff0f0", textAlign:"center" }}>{ocrError}</p>
                )}
                <div style={S.ocrBtns}>
                  <button style={S.galleryBtn} onClick={() => fileRef.current?.click()}>🖼 Gallery</button>
                  <button style={{ ...S.capBtn, flex:2 }} onClick={capturePhoto}>📸 Capture</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={pickFile} />
    </div>
  );
}

/* ─── ADDRESS FIELD ──────────────────────────────────────────────────────── */
function AddressField({ value, onChange, onCamera, onFile }) {
  return (
    <div>
      <textarea style={S.addrArea} value={value} rows={3}
        placeholder="Type or scan address…"
        onChange={e => onChange(e.target.value)} />
      <div style={{ display:"flex", gap:8, marginTop:7 }}>
        <button className="cam-btn" style={S.camBtn} onClick={onCamera}>📷 Camera</button>
        <button className="cam-btn" style={S.camBtn} onClick={onFile}>🖼 Image</button>
      </div>
    </div>
  );
}

/* ─── DATE FIELD ─────────────────────────────────────────────────────────── */
function DateField({ value, isMod, onChange }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  const handleChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0,2) + "-" + v.slice(2);
    if (v.length > 5) v = v.slice(0,5) + "-" + v.slice(5);
    v = v.slice(0,10);
    setDraft(v);
    onChange(v);
  };

  return (
    <input
      style={{ ...S.inpInline, width:"100%", boxSizing:"border-box",
               ...(isMod ? { borderColor:"#C9A84C", background:"#fffbf0" } : {}) }}
      value={draft}
      onChange={handleChange}
      inputMode="numeric"
      enterKeyHint="done"
      placeholder="dd-mm-yyyy"
      maxLength={10}
    />
  );
}

/* ─── GENERIC EDIT FIELD ─────────────────────────────────────────────────── */
function EditField({ value, isMod, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);
  const ref = useRef();
  useEffect(() => setDraft(value), [value]);
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  const commit = () => { onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return editing ? (
    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
      <input ref={ref}
        style={{ ...S.inpInline, ...(isMod ? { borderColor:"#C9A84C" } : {}) }}
        value={draft} onChange={e => setDraft(e.target.value)}
        enterKeyHint="done"
        onKeyDown={e => { if (e.key==="Enter") commit(); if (e.key==="Escape") cancel(); }} />
      <button style={S.okBtn} onClick={commit}>✓</button>
      <button style={S.cancelBtn} onClick={cancel}>✕</button>
    </div>
  ) : (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <span style={{ ...S.dispVal, ...(isMod ? { color:"#C9A84C", fontWeight:700 } : {}) }}>
        {value || <em style={{ opacity:.35 }}>—</em>}
      </span>
      <button className="mod-btn" style={S.modBtn} onClick={() => setEditing(true)}>Modify</button>
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const G = "#C9A84C";
const S = {
  root:   { minHeight:"100vh", background:"#f8f6f1", fontFamily:"'JetBrains Mono',monospace", color:"#1a1a2e" },
  header: { background:"#1a1a2e", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 16px #0005" },
  stripe: { height:4, background:`linear-gradient(90deg,${G},#8B5E0A 50%,${G})` },
  hInner: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", gap:12, flexWrap:"wrap" },
  title:  { fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:G, letterSpacing:"0.06em" },
  sub:    { fontSize:11, color:"#8899aa", letterSpacing:"0.08em", marginTop:2 },

  authArea:   { display:"flex", alignItems:"center", gap:10 },
  signedIn:   { color:"#4ade80", fontSize:13 },
  signBtn:    { padding:"8px 18px", background:"transparent", border:`1.5px solid ${G}`, color:G, borderRadius:6, fontSize:12, fontFamily:"inherit", cursor:"pointer" },
  signOutBtn: { padding:"6px 12px", background:"transparent", border:"1.5px solid #ff6b6b", color:"#ff6b6b", borderRadius:6, fontSize:11, fontFamily:"inherit", cursor:"pointer" },

  body:    { maxWidth:960, margin:"0 auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:16 },
  card:    { background:"#fff", borderRadius:10, border:"1px solid #e8e0d0", padding:"18px 20px", boxShadow:"0 1px 4px #0001" },
  secLabel:{ fontSize:10, color:"#aaa", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10 },
  persisted:{ color:`${G}`, fontSize:9, letterSpacing:"0.1em" },
  muted:   { color:"#bbb", fontSize:13 },

  tabBar: { display:"flex", gap:8, flexWrap:"wrap" },
  tab:    { padding:"7px 18px", borderRadius:20, border:"1.5px solid #e0d8cc", background:"#faf7f2", color:"#666", cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600, transition:"all .15s" },
  tabOn:  { background:"#fff8e8", border:`1.5px solid ${G}`, color:"#8B5E0A" },

  searchWrap: { display:"flex", flexWrap:"wrap", gap:14, alignItems:"flex-end" },
  searchRow:  { display:"flex", alignItems:"flex-end", gap:10, flexWrap:"wrap", flex:1 },
  fg:    { display:"flex", flexDirection:"column", gap:5 },
  lbl:   { fontSize:10, color:"#999", letterSpacing:"0.12em", textTransform:"uppercase" },
  inp:   { padding:"10px 14px", background:"#fff", border:"1.5px solid #ddd", borderRadius:8, color:"#1a1a2e", fontSize:15, fontFamily:"inherit", width:145, transition:"border .2s" },
  slash: { fontSize:26, color:G, marginBottom:4, fontWeight:700 },
  preview: { padding:"10px 16px", background:"#fff8e8", border:`1.5px solid ${G}`, borderRadius:8, color:"#8B5E0A", fontSize:16, fontWeight:700, alignSelf:"flex-end" },
  searchBtn: { padding:"10px 28px", background:`linear-gradient(135deg,${G},#8B5E0A)`, border:"none", borderRadius:8, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit", whiteSpace:"nowrap" },
  spin: { width:14, height:14, border:"2px solid #ffffff44", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" },

  errBox: { padding:"12px 18px", background:"#fff0f0", border:"1.5px solid #ffaaaa", borderRadius:8, color:"#c0392b", fontSize:13 },
  okBox:  { padding:"12px 18px", background:"#f0fff4", border:"1.5px solid #6bcf8a", borderRadius:8, color:"#1a7a3a", fontSize:13 },

  resHead:    { display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", padding:"14px 20px", borderBottom:"1px solid #f0e8d8", background:"linear-gradient(90deg,#fffdf5,#fff)", gap:8 },
  foundBadge: { padding:"3px 9px", background:"#fff8e8", border:`1px solid ${G}`, borderRadius:4, fontSize:10, color:"#8B5E0A", letterSpacing:"0.1em" },
  foundCase:  { fontSize:18, fontWeight:700, color:"#1a1a2e", marginLeft:4 },
  resMeta:    { fontSize:11, color:"#aaa" },

  grid:     { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))" },
  fCard:    { padding:"16px 20px", background:"#fff", borderRight:"1px solid #f0e8d8", borderBottom:"1px solid #f0e8d8", transition:"background .2s" },
  fCardMod: { background:"#fffbf0" },
  fTop:     { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 },
  fLbl:     { fontSize:10, color:"#bbb", letterSpacing:"0.12em", textTransform:"uppercase" },
  modBadge: { fontSize:9, padding:"2px 6px", background:"#fff8e8", border:`1px solid ${G}`, color:"#8B5E0A", borderRadius:3 },
  roVal:    { fontSize:14, color:"#bbb" },
  dispVal:  { flex:1, fontSize:14, color:"#1a1a2e", wordBreak:"break-word" },
  modBtn:   { padding:"4px 12px", background:"#faf7f2", border:"1.5px solid #e0d8cc", borderRadius:5, color:"#888", fontSize:11, cursor:"pointer", fontFamily:"inherit", transition:"all .15s", whiteSpace:"nowrap" },

  addrArea: { width:"100%", background:"#fff", border:"1.5px solid #ddd", borderRadius:8, color:"#1a1a2e", fontSize:13, padding:"9px 12px", fontFamily:"inherit", resize:"vertical", lineHeight:1.6, boxSizing:"border-box" },
  camBtn:   { padding:"6px 14px", background:"#f0f6ff", border:"1.5px solid #c0d8ff", borderRadius:6, color:"#3B6BF5", fontSize:11, cursor:"pointer", fontFamily:"inherit", transition:"all .15s" },

  inpInline: { flex:1, padding:"7px 10px", background:"#fff", border:"1.5px solid #ddd", borderRadius:6, color:"#1a1a2e", fontSize:14, fontFamily:"inherit" },
  okBtn:     { padding:"6px 10px", background:"#e8f8ec", border:"1.5px solid #6bcf8a", color:"#1a7a3a", borderRadius:5, cursor:"pointer", fontSize:14 },
  cancelBtn: { padding:"6px 10px", background:"#fff0f0", border:"1.5px solid #ffaaaa", color:"#c0392b", borderRadius:5, cursor:"pointer", fontSize:14 },

  saveBar: { display:"flex", alignItems:"center", justifyContent:"flex-end", gap:16, padding:"14px 20px", borderTop:"1px solid #f0e8d8", background:"#fafaf8" },
  pending: { fontSize:12, color:"#8B5E0A" },
  saveBtn: { padding:"11px 32px", background:`linear-gradient(135deg,${G},#8B5E0A)`, border:"none", borderRadius:8, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"opacity .2s" },

  ocrCard:      { background:"#fff", borderRadius:16, width:"min(92vw,420px)", overflow:"hidden", boxShadow:"0 24px 64px #000c" },
  ocrHead:      { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"#1a1a2e" },
  ocrTitle:     { color:G, fontWeight:700, fontSize:16, fontFamily:"'Rajdhani',sans-serif" },
  ocrClose:     { background:"transparent", border:"none", color:"#fff", fontSize:20, cursor:"pointer" },
  ocrCenter:    { display:"flex", flexDirection:"column", alignItems:"center", padding:40, gap:12 },
  ocrMsg:       { color:"#888", fontSize:13 },
  ocrStatusTxt: { color:"#555", fontSize:13, letterSpacing:"0.05em", textAlign:"center" },
  bigSpin:      { width:44, height:44, border:`3px solid #e0d8cc`, borderTopColor:G, borderRadius:"50%", animation:"spin .8s linear infinite" },
  video:        { width:"100%", maxHeight:280, objectFit:"cover", display:"block" },
  ocrBtns:      { display:"flex", gap:12, padding:"14px 18px" },
  capBtn:       { flex:1, padding:11, background:`linear-gradient(135deg,${G},#8B5E0A)`, border:"none", borderRadius:8, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit" },
  galleryBtn:   { flex:1, padding:11, background:"#f0f6ff", border:"1.5px solid #c0d8ff", borderRadius:8, color:"#3B6BF5", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit" },
};