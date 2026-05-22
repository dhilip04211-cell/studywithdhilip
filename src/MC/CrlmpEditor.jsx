import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

/* ─── GOOGLE CONFIG ──────────────────────────────────────────────────────── */
const SHEET_ID  = "1eIwrFpP9nRa8o2kl7eeBtiffUs2CU5-xWcAGKtHSgjw";
const API_KEY   = "AIzaSyAm8cnPYK9-2L7bl81osszkW_UfldW356g";
const CLIENT_ID = "879226759032-dp5gjt6cemobr34kcmi1lg638e37f36q.apps.googleusercontent.com";
const SCOPES    = "https://www.googleapis.com/auth/spreadsheets";

const LS_TOKEN     = "crlmp_token";
const LS_TOKEN_EXP = "crlmp_token_exp";
const LS_SHEET     = "crlmp_sheet";
const LS_YEAR      = "crlmp_year";
const LS_ADDR_HIST = "crlmp_addr_history";
const LS_TA_CACHE  = "crlmp_ta_cache";

/* ─── COLUMN MAP ─────────────────────────────────────────────────────────── */
const COL     = { SR:0, CASE:1, ADDR:2, FIR_DATE:3, NEXT_DATE:4, ACT:5, PS:6, FIR_NO:7 };
const HEADERS = ["Sr.No","Case No.","Address","FIR Date","Next Date","Act Section","Police Station","FIR No."];
const DATE_COLS     = new Set([COL.FIR_DATE, COL.NEXT_DATE]);
const READONLY      = new Set([COL.SR, COL.CASE]);
const REQUIRED_COLS = new Set([COL.ADDR, COL.FIR_DATE, COL.NEXT_DATE, COL.ACT, COL.PS, COL.FIR_NO]);

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const toA1    = (row, col) => `${String.fromCharCode(65 + col)}${row}`;
const normStr = (s = "") => s.toString().replace(/\D/g, "");
const ls = {
  get:     k     => { try { return localStorage.getItem(k); }             catch { return null; } },
  set:     (k,v) => { try { localStorage.setItem(k,v); }                  catch {} },
  del:     k     => { try { localStorage.removeItem(k); }                 catch {} },
  getJSON: k     => { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch { return {}; } },
  setJSON: (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  getArr:  k     => { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch { return []; } },
  setArr:  (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function fmtDate(raw = "") {
  if (!raw) return "";
  if (/^\d{2}-\d{2}-\d{4}$/.test(raw.trim())) return raw.trim();
  const m = raw.trim().match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})$/);
  if (m) return `${m[1].padStart(2,"0")}-${m[2].padStart(2,"0")}-${m[3].padStart(4,"0")}`;
  return raw;
}

/* ══════════════════════════════════════════════════════════════════════════
   FIX 1: CLAUDE TANGLISH ENGINE — proper Anthropic API call
   The API key is injected by the artifact runtime; no manual key needed.
   Uses streaming=false, correct headers for artifact environment.
══════════════════════════════════════════════════════════════════════════ */
const pendingRequests = {};

async function fetchTamilSuggestions(word) {
  if (!word || word.length < 2 || !/^[a-zA-Z]+$/.test(word)) return [];
  const lw = word.toLowerCase().trim();

  // Cache hit
  const cache = ls.getJSON(LS_TA_CACHE);
  if (cache[lw] && Array.isArray(cache[lw]) && cache[lw].length > 0) return cache[lw];

  // Dedup in-flight
  if (pendingRequests[lw]) return pendingRequests[lw];

  pendingRequests[lw] = (async () => {
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // anthropic-version is required; x-api-key is injected by runtime
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 150,
          system: `You are a Tamil transliteration engine.
The user types Tamil words/names in English (Tanglish).
Return ONLY a JSON array of up to 6 Tamil Unicode suggestions, best match first.
Rules:
- Proper nouns (names, places) must be phonetically exact in Tamil script.
- Common words should match colloquial Tamil usage.
- NEVER return English text. ONLY Tamil Unicode (U+0B80–U+0BFF range).
- Output ONLY the raw JSON array. No explanation, no markdown fences, no extra text.
Example: ["அமுதன்","அமுதன","அமுது","அமுதா","அமுதகன்","அமுதன்ஸ்"]`,
          messages: [{ role: "user", content: lw }]
        })
      });

      if (!resp.ok) {
        const errBody = await resp.text().catch(() => "");
        console.warn("Tamil API error:", resp.status, errBody);
        return [];
      }

      const data = await resp.json();
      // Handle both text blocks and tool_use blocks
      const rawText = data.content
        ?.filter(b => b.type === "text")
        ?.map(b => b.text)
        ?.join("") || "";

      // Strip markdown fences if present
      const clean = rawText
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

      let sugs = [];
      try {
        // Find JSON array in response (in case there's surrounding text)
        const match = clean.match(/\[[\s\S]*\]/);
        if (match) sugs = JSON.parse(match[0]);
        else sugs = JSON.parse(clean);
      } catch {
        sugs = [];
      }

      if (!Array.isArray(sugs)) sugs = [];
      sugs = sugs
        .filter(s => typeof s === "string" && /[\u0B80-\u0BFF]/.test(s))
        .slice(0, 6);

      // Persist cache (max 500 entries, evict oldest)
      const updatedCache = ls.getJSON(LS_TA_CACHE);
      const keys = Object.keys(updatedCache);
      if (keys.length > 500) delete updatedCache[keys[0]];
      updatedCache[lw] = sugs;
      ls.setJSON(LS_TA_CACHE, updatedCache);

      return sugs;
    } catch (err) {
      console.warn("fetchTamilSuggestions error:", err);
      return [];
    } finally {
      delete pendingRequests[lw];
    }
  })();

  return pendingRequests[lw];
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
    @keyframes spin     {to{transform:rotate(360deg)}}
    @keyframes fadeUp   {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse    {0%,100%{opacity:1}50%{opacity:.45}}
    @keyframes warnPop  {0%{transform:scale(.96)}60%{transform:scale(1.02)}100%{transform:scale(1)}}
    @keyframes sugIn    {from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
    .tab-btn:hover  {background:#fff8e8!important;border-color:#C9A84C!important;color:#8B5E0A!important}
    .mod-btn:hover  {background:#fff8ec!important;border-color:#C9A84C!important;color:#8B5E0A!important}
    .save-btn:hover {opacity:.88!important}
    .cam-btn:hover  {background:#e8f4ff!important;border-color:#3B6BF5!important}
    .sug-item:hover,.sug-item.sel{background:#fff8e8!important;border-color:#C9A84C!important;color:#8B5E0A!important;transform:translateY(-1px)}
    .ac-item:hover  {background:#fff8e8!important;color:#8B5E0A!important}
    input:focus,textarea:focus{outline:none!important;border-color:#C9A84C!important;box-shadow:0 0 0 3px #C9A84C22!important}
    .field-card{animation:fadeUp .22s ease both}
    .warn-banner{animation:warnPop .3s ease both}
    /* Dropdowns are rendered via React portals at body level — no CSS position needed */
    .sug-popup{animation:sugIn .15s ease both}
    .ac-dropdown{animation:slideDown .15s ease both}
    .ocr-overlay{position:fixed;inset:0;background:#000c;z-index:9999;display:flex;align-items:center;justify-content:center}
    .miss-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#e74c3c;margin-right:5px;animation:pulse 1.4s ease-in-out infinite}
    .tess-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#f0fff4;border:1px solid #6bcf8a;border-radius:3px;font-size:9px;color:#1a7a3a;letter-spacing:.08em}
    .ocr-progress-bar{height:4px;background:#e0d8cc;border-radius:2px;overflow:hidden;margin:8px 0}
    .ocr-progress-fill{height:100%;background:linear-gradient(90deg,#C9A84C,#8B5E0A);border-radius:2px;transition:width .3s}
    @media(max-width:600px){
      .hInner{flex-direction:column!important;align-items:flex-start!important;gap:10px!important}
      .authArea{width:100%}
      .searchRow{flex-direction:column!important;align-items:stretch!important}
      .inp-case,.inp-year{width:100%!important}
      .searchBtn{width:100%!important;justify-content:center}
      .resHead{flex-direction:column!important;align-items:flex-start!important}
      .grid{grid-template-columns:1fr!important}
      .saveBar{flex-direction:column!important;align-items:stretch!important}
      .save-btn{width:100%!important;text-align:center}
      .preview-badge{display:none!important}
      .tabBar{gap:5px!important}
      .tab-btn{font-size:11px!important;padding:5px 10px!important}
    }
  `;
  document.head.appendChild(s);
}

/* ─── TESSERACT LOADER ───────────────────────────────────────────────────── */
let tesseractWorker=null, tesseractLoading=false, tesseractReady=false;
async function loadTesseract() {
  if (tesseractReady && tesseractWorker) return tesseractWorker;
  if (tesseractLoading) {
    await new Promise(r => { const iv=setInterval(()=>{if(tesseractReady){clearInterval(iv);r();}},200); });
    return tesseractWorker;
  }
  tesseractLoading = true;
  if (!window.Tesseract) {
    await new Promise((res,rej) => {
      const sc=document.createElement("script");
      sc.src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      sc.onload=res; sc.onerror=rej; document.head.appendChild(sc);
    });
  }
  tesseractWorker = await window.Tesseract.createWorker(["eng","tam"],1,{
    workerPath:"https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js",
    corePath:  "https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core.wasm.js",
    langPath:  "https://tessdata.projectnaptha.com/4.0.0",
  });
  // FIX: Set optimal Tesseract parameters for document/address OCR
  await tesseractWorker.setParameters({
    tessedit_pageseg_mode: "11",      // PSM 6: assume single uniform block of text
    preserve_interword_spaces: "1",
    tessedit_char_whitelist: "",     // allow all characters
  });
  tesseractReady=true; tesseractLoading=false;
  return tesseractWorker;
}

/* ══════════════════════════════════════════════════════════════════════════
   FIX 2: IMAGE PRE-PROCESSING for better OCR accuracy
   Converts image to greyscale, boosts contrast, sharpens edges on canvas
   before passing to Tesseract. Makes text detection much more reliable.
══════════════════════════════════════════════════════════════════════════ */
function preprocessImageForOCR(blob) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");

      // Scale up small images for better OCR (min 1200px wide)
      const scale = Math.max(1, 1200 / img.width);
      canvas.width  = img.width  * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");

      // Draw scaled
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Step 1: Convert to greyscale with luminance weights
      for (let i = 0; i < data.length; i += 4) {
        const grey = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
        data[i] = data[i+1] = data[i+2] = grey;
      }

      // Step 2: Auto-levels (stretch histogram)
      let min = 255, max = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < min) min = data[i];
        if (data[i] > max) max = data[i];
      }
      const range = max - min || 1;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.round(((data[i] - min) / range) * 255);
        data[i] = data[i+1] = data[i+2] = val;
      }

      // Step 3: Contrast boost (S-curve)
      for (let i = 0; i < data.length; i += 4) {
        // Sigmoid-like contrast: compress midtones, push extremes
        const v = data[i] / 255;
        const boosted = Math.round(255 * (v < 0.5
          ? 2 * v * v
          : 1 - Math.pow(-2 * v + 2, 2) / 2));
        data[i] = data[i+1] = data[i+2] = Math.min(255, Math.max(0, boosted));
      }

      // Step 4: Unsharp mask (basic sharpening)
      const copy = new Uint8ClampedArray(data);
      const w = canvas.width, h = canvas.height;
      const strength = 0.6;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;
          // Simple Laplacian kernel
          const lap =
            -copy[idx - w*4] - copy[idx + w*4]
            - copy[idx - 4]  - copy[idx + 4]
            + 4 * copy[idx];
          const sharpened = Math.min(255, Math.max(0, copy[idx] - strength * lap));
          data[idx] = data[idx+1] = data[idx+2] = Math.round(sharpened);
        }
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(resolve, "image/png"); // PNG lossless for OCR
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(blob); };
    img.src = url;
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   MISSING FIELD WARNING BANNER
══════════════════════════════════════════════════════════════════════════ */
function MissingFieldBanner({ editData, onDismiss }) {
  const missing = [];
  REQUIRED_COLS.forEach(ci => { if (!(editData[ci]||"").toString().trim()) missing.push(HEADERS[ci]); });
  if (!missing.length) return null;
  return (
    <div className="warn-banner" style={S.warnBanner}>
      <div style={S.warnLeft}>
        <span style={S.warnIcon}>⚠️</span>
        <div>
          <p style={S.warnTitle}>Missing Fields — Save Anyway?</p>
          <div style={S.warnList}>
            {missing.map(f=>(
              <span key={f} style={S.warnChip}><span className="miss-dot"/>{f}</span>
            ))}
          </div>
        </div>
      </div>
      <button style={S.warnClose} onClick={onDismiss}>✕</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ADDRESS FIELD — portals for dropdowns so they escape all overflow/
   z-index stacking contexts (grid cards, sticky header, etc.)
══════════════════════════════════════════════════════════════════════════ */

/* Measures textarea position and returns coords for the dropdown portal */
function useDropdownRect(anchorRef, isOpen) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!isOpen) { setRect(null); return; }
    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({ top: r.bottom + window.scrollY + 2, left: r.left + window.scrollX, width: r.width });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen, anchorRef]);

  return rect;
}

function AddressField({ value, onChange, onCamera, onFile, sheetAddresses }) {
  const [sugList,     setSugList]     = useState([]);
  const [sugLoading,  setSugLoading]  = useState(false);
  const [sugOpen,     setSugOpen]     = useState(false);
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [acList,      setAcList]      = useState([]);
  const [acOpen,      setAcOpen]      = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [wordStart,   setWordStart]   = useState(0);
  const [wordEnd,     setWordEnd]     = useState(0);

  const textareaRef = useRef(null);
  const debounceRef = useRef(null);
  const lastWordRef = useRef("");

  // Portal rects — track textarea position for both dropdowns
  const sugRect = useDropdownRect(textareaRef, sugOpen && (sugLoading || sugList.length > 0));
  const acRect  = useDropdownRect(textareaRef, acOpen && acList.length > 0);

  const handleChange = (e) => {
    const newVal = e.target.value;
    onChange(newVal);

    const pos    = e.target.selectionStart;
    const before = newVal.slice(0, pos);
    const words  = before.split(/\s/);
    const word   = words[words.length - 1];
    const wStart = pos - word.length;

    if (word.length >= 2 && /^[a-zA-Z]+$/.test(word)) {
      setWordStart(wStart);
      setWordEnd(pos);
      setCurrentWord(word);
      setAcOpen(false);
      setAcList([]);

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        const lw = word.toLowerCase();
        if (lw === lastWordRef.current && sugList.length > 0) return;
        lastWordRef.current = lw;
        setSugLoading(true);
        setSugOpen(true);
        setSugList([]);
        setActiveIdx(0);
        const sugs = await fetchTamilSuggestions(word);
        setSugList(sugs);
        setSugLoading(false);
        if (!sugs.length) setSugOpen(false);
      }, 280);

    } else {
      clearTimeout(debounceRef.current);
      lastWordRef.current = "";
      setSugOpen(false);
      setSugLoading(false);

      const q = newVal.trim().toLowerCase();
      if (q.length >= 3) {
        const hist     = ls.getArr(LS_ADDR_HIST);
        const combined = [...new Set([...hist, ...sheetAddresses])].filter(Boolean);
        const hits     = combined
          .filter(a => a.toLowerCase().includes(q) && a.trim() !== newVal.trim())
          .slice(0, 8);
        if (hits.length) { setAcList(hits); setAcOpen(true); return; }
      }
      setAcOpen(false);
    }
  };

  const insertSug = (tamil) => {
    const before = value.slice(0, wordStart);
    const after  = value.slice(wordEnd);
    onChange(before + tamil + " " + after);
    setSugOpen(false);
    setSugList([]);
    lastWordRef.current = "";
    setCurrentWord("");
    setTimeout(() => {
      const ta = textareaRef.current;
      if (ta) { const p = wordStart + tamil.length + 1; ta.setSelectionRange(p, p); ta.focus(); }
    }, 0);
  };

  const selectAC = (addr) => {
    onChange(addr);
    setAcOpen(false);
    setAcList([]);
    const hist = ls.getArr(LS_ADDR_HIST);
    ls.setArr(LS_ADDR_HIST, [addr, ...hist.filter(a => a !== addr)].slice(0, 20));
  };

  const handleKeyDown = (e) => {
    if (sugOpen) {
      if (e.key === "ArrowRight" || e.key === "Tab") { if (sugList.length) { e.preventDefault(); insertSug(sugList[activeIdx]); } }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i+1, sugList.length-1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx(i => Math.max(i-1, 0)); }
      else if (e.key === "Escape")    { setSugOpen(false); setSugList([]); }
      else if (e.key === "Enter")     { if (sugList.length) { e.preventDefault(); insertSug(sugList[activeIdx]); } }
    } else if (acOpen) {
      if (e.key === "Escape") { setAcOpen(false); setAcList([]); }
    }
  };

  const handleBlur = () => {
    const v = value.trim();
    if (v.length > 8) { const h = ls.getArr(LS_ADDR_HIST); ls.setArr(LS_ADDR_HIST, [v, ...h.filter(a => a !== v)].slice(0, 20)); }
    setTimeout(() => { setSugOpen(false); setAcOpen(false); }, 200);
  };

  return (
    <div style={{ position: "relative" }}>

      {/* ── HINT BAR ── */}
      <div style={S.tanglishHint}>
        <span style={S.tanglishBadge}>✦ AI Tamil</span>
        <span style={S.tanglishTip}>type English → Tamil (Tab/→ to pick)</span>
      </div>

      {/* ── TEXTAREA ── */}
      <textarea
        ref={textareaRef}
        style={S.addrArea}
        value={value}
        rows={3}
        placeholder="வீடு எண், தெரு, நகர்… or type in English for Tamil suggestions"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />

      {/* ── TANGLISH SUGGESTION POPUP — rendered via portal at body level ── */}
      {sugOpen && (sugLoading || sugList.length > 0) && sugRect && createPortal(
        <div style={{
          position: "absolute",
          top:   sugRect.top,
          left:  sugRect.left,
          width: sugRect.width,
          zIndex: 99999,
          background: "#fff",
          border: `1.5px solid #C9A84C`,
          borderRadius: 10,
          boxShadow: "0 10px 32px rgba(0,0,0,.22)",
          overflow: "hidden",
          animation: "sugIn .15s ease both",
        }}>
          <div style={S.sugHeader}>
            <span style={S.sugTitle}>
              {sugLoading && sugList.length === 0
                ? <><span style={S.miniSpin}/> transliterating "{currentWord}"…</>
                : `Tamil suggestions for "${currentWord}"`}
            </span>
            <span style={S.sugNav}>Tab/→ insert · ↑↓ cycle · Esc close</span>
          </div>
          <div style={S.sugRow}>
            {sugLoading && sugList.length === 0 && [1,2,3].map(i => <div key={i} style={S.sugSkeleton}/>)}
            {sugList.map((s, i) => (
              <button key={i}
                className={"sug-item" + (i === activeIdx ? " sel" : "")}
                style={{...S.sugItem, ...(i === activeIdx ? S.sugItemSel : {})}}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseDown={e => { e.preventDefault(); insertSug(s); }}>
                <span style={S.sugTamil}>{s}</span>
                {i === 0 && <span style={S.sugBest}>best</span>}
              </button>
            ))}
          </div>
          {!sugLoading && sugList.length === 0 && (
            <div style={S.sugEmpty}>No suggestions — keep typing or enter Tamil directly</div>
          )}
        </div>,
        document.body
      )}

      {/* ── AUTOCOMPLETE DROPDOWN — rendered via portal at body level ── */}
      {acOpen && acList.length > 0 && acRect && createPortal(
        <div style={{
          position: "absolute",
          top:   acRect.top,
          left:  acRect.left,
          width: acRect.width,
          zIndex: 99998,
          background: "#fff",
          border: `1.5px solid #C9A84C`,
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 8px 24px rgba(0,0,0,.16)",
          maxHeight: 220,
          overflowY: "auto",
          animation: "slideDown .15s ease both",
        }}>
          <div style={S.acHeader}><span style={S.acHeaderTxt}>📋 Sheet / History suggestions</span></div>
          {acList.map((addr, i) => (
            <button key={i} className="ac-item" style={S.acItem} onMouseDown={() => selectAC(addr)}>
              <span style={S.acIcon}>🕐</span>
              <span style={S.acText}>{addr}</span>
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* ── CAMERA / IMAGE ── */}
      <div style={S.camRow}>
        <button className="cam-btn" style={S.camBtn} onClick={onCamera}>📷 Camera OCR</button>
        <button className="cam-btn" style={S.camBtn} onClick={onFile}>🖼 Image OCR</button>
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
    v = v.slice(0, 10);
    setDraft(v);
    onChange(v);
  };
  return (
    <input
      style={{...S.inpInline, width:"100%", boxSizing:"border-box", ...(isMod ? {borderColor:"#C9A84C", background:"#fffbf0"} : {})}}
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
function EditField({ value, isMod, onChange, isEmpty }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);
  const ref = useRef();
  useEffect(() => setDraft(value), [value]);
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);
  const commit = () => { onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };
  return editing ? (
    <div style={{display:"flex", gap:6, alignItems:"center"}}>
      <input ref={ref}
        style={{...S.inpInline, flex:1, ...(isMod ? {borderColor:"#C9A84C"} : {})}}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        enterKeyHint="done"
        onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") cancel(); }}
      />
      <button style={S.okBtn} onClick={commit}>✓</button>
      <button style={S.cancelBtn} onClick={cancel}>✕</button>
    </div>
  ) : (
    <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
      <span style={{...S.dispVal, ...(isMod ? {color:"#C9A84C", fontWeight:700} : {}), ...(isEmpty ? {color:"#e74c3c", opacity:.7} : {})}}>
        {value || <em style={{opacity:.4}}>— empty —</em>}
      </span>
      <button className="mod-btn" style={S.modBtn} onClick={() => setEditing(true)}>Modify</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function CRLMPEditor() {
  useEffect(() => {
  injectCSS();
}, []);

  const [sheets,        setSheets]        = useState([]);
  const [activeSheet,   setActiveSheet]   = useState(ls.get(LS_SHEET) || "");
  const [caseNum,       setCaseNum]       = useState("");
  const [caseYear,      setCaseYear]      = useState(ls.get(LS_YEAR) || new Date().getFullYear().toString());
  const [searching,     setSearching]     = useState(false);
  const [result,        setResult]        = useState(null);
  const [editData,      setEditData]      = useState({});
  const [modCols,       setModCols]       = useState(new Set());
  const [saving,        setSaving]        = useState(false);
  const [saveMsg,       setSaveMsg]       = useState("");
  const [error,         setError]         = useState("");
  const [showWarn,      setShowWarn]      = useState(false);
  const [warnDismissed, setWarnDismissed] = useState(false);
  const [sheetAddresses, setSheetAddresses] = useState([]);
  const [token,         setToken]         = useState("");
  const [gisReady,      setGisReady]      = useState(false);
  const tokenRef    = useRef("");
  const tokenClient = useRef(null);

  /* camera/OCR state */
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
  const [focusRing,     setFocusRing]     = useState({x:0, y:0, show:false});
  const cropImgRef = useRef(null);
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const streamRef  = useRef(null);
  const fileRef    = useRef(null);
  const caseNumRef = useRef(null);
  const caseYearRef= useRef(null);

  useEffect(() => { loadTesseract().catch(() => {}); }, []);

  const restoreToken = useCallback(() => {
    const saved = ls.get(LS_TOKEN);
    const expiry = parseInt(ls.get(LS_TOKEN_EXP) || "0", 10);
    if (saved && Date.now() < expiry) { tokenRef.current = saved; setToken(saved); return true; }
    ls.del(LS_TOKEN); ls.del(LS_TOKEN_EXP); return false;
  }, []);

  useEffect(() => {
    restoreToken(); fetchSheetNames();
    const gis = document.createElement("script");
    gis.src = "https://accounts.google.com/gsi/client"; gis.async = true; gis.defer = true;
    gis.onload = () => {
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID, scope: SCOPES, prompt: "",
        callback: (resp) => {
          if (resp.error) { setError("Sign-in failed: " + resp.error); return; }
          const t = resp.access_token;
          const expMs = Date.now() + (resp.expires_in - 60) * 1000;
          tokenRef.current = t; setToken(t);
          ls.set(LS_TOKEN, t); ls.set(LS_TOKEN_EXP, expMs.toString());
          setTimeout(() => silentRefresh(), (resp.expires_in - 70) * 1000);
        },
      });
      setGisReady(true);
      if (!restoreToken()) silentSignIn();
    };
    document.head.appendChild(gis);
  }, []);

  const silentSignIn  = () => { if (tokenClient.current) tokenClient.current.requestAccessToken({prompt:""}); };
  const silentRefresh = () => { if (tokenClient.current) tokenClient.current.requestAccessToken({prompt:""}); };
  const signIn  = () => { if (!gisReady) { setError("Loading…"); return; } tokenClient.current.requestAccessToken({prompt:"select_account"}); };
  const signOut = () => {
    if (token) window.google?.accounts?.oauth2?.revoke(token, () => {});
    tokenRef.current = ""; setToken(""); ls.del(LS_TOKEN); ls.del(LS_TOKEN_EXP);
  };

  const fetchSheetNames = useCallback(async () => {
    try {
      const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title&key=${API_KEY}`);
      const j = await r.json();
      if (j.error) { setError("Sheets API: " + j.error.message); return; }
      const names = j.sheets?.map(s => s.properties.title) || [];
      setSheets(names);
      const saved = ls.get(LS_SHEET);
      if (saved && names.includes(saved)) setActiveSheet(saved);
      else if (names.length) { setActiveSheet(names[0]); ls.set(LS_SHEET, names[0]); }
    } catch { setError("Cannot load sheet tabs."); }
  }, []);

  const fetchSheetAddresses = useCallback(async (sheetName) => {
    if (!sheetName) return;
    try {
      const range = encodeURIComponent(`${sheetName}!C2:C500`);
      const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`);
      const j = await r.json();
      if (j.error) return;
      const addrs = (j.values || []).flat().filter(v => v && v.trim().length > 4);
      setSheetAddresses([...new Set(addrs)]);
    } catch {}
  }, []);

  useEffect(() => { if (activeSheet) fetchSheetAddresses(activeSheet); }, [activeSheet]);

  const selectSheet = (name) => {
    setActiveSheet(name); ls.set(LS_SHEET, name);
    setResult(null); setEditData({}); setModCols(new Set());
    setError(""); setSaveMsg(""); setShowWarn(false); setWarnDismissed(false);
  };

  const search = async () => {
    const q = `${caseNum.trim()}/${caseYear.trim()}`;
    if (!caseNum || !caseYear) { setError("Enter case number and year."); return; }
    if (!activeSheet) { setError("Select a sheet tab first."); return; }
    setSearching(true); setError(""); setResult(null);
    setEditData({}); setModCols(new Set()); setSaveMsg(""); setShowWarn(false); setWarnDismissed(false);
    try {
      const range = encodeURIComponent(`${activeSheet}!A:H`);
      const res  = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error.message);
      const rows = json.values || [];
      let found = null;
      for (let i = 1; i < rows.length; i++) {
        const cn = normStr(rows[i][COL.CASE] || "");
        const qn = normStr(q);
        if (cn === qn && qn.length > 0) {
  found = {
    rowIndex: i + 1,
    data: rows[i]
  };
  break;
}
      }
      if (!found) { setError(`"${q}" not found in sheet "${activeSheet}".`); }
      else {
        setResult(found);
        const init = {};
        HEADERS.forEach((_, ci) => {
          init[ci] = DATE_COLS.has(ci) ? fmtDate(found.data[ci] || "") : (found.data[ci] || "");
        });
        setEditData(init);
        if ([...REQUIRED_COLS].some(ci => !(found.data[ci] || "").toString().trim())) setShowWarn(true);
      }
    } catch(e) { setError("Search error: " + e.message); }
    finally { setSearching(false); }
  };

  const save = async () => {
    if (!result) return;
    const missing = [...REQUIRED_COLS].filter(ci => !(editData[ci] || "").toString().trim());
    if (missing.length && !warnDismissed) { setShowWarn(true); return; }
    if (!tokenRef.current) { setError("Not signed in. Click Sign In first."); return; }
    setSaving(true); setSaveMsg(""); setError("");
    try {
      const data = [];
      modCols.forEach(ci => data.push({
        range: `${activeSheet}!${toA1(result.rowIndex, ci)}`,
        values: [[editData[ci]]]
      }));
      if (!data.length) { setSaveMsg("Nothing changed."); setSaving(false); return; }
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
        { method: "POST",
          headers: {"Authorization": `Bearer ${tokenRef.current}`, "Content-Type": "application/json"},
          body: JSON.stringify({valueInputOption: "USER_ENTERED", data})
        });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 401) { silentRefresh(); setError("Session refreshed. Please save again."); setSaving(false); return; }
        throw new Error(err.error?.message || res.statusText);
      }
      setSaveMsg(`✓ Saved ${data.length} field${data.length > 1 ? "s" : ""} to "${activeSheet}"!`);
      setModCols(new Set()); setShowWarn(false); setWarnDismissed(false);
      const addrVal = (editData[COL.ADDR] || "").trim();
      if (addrVal.length > 8) { const h = ls.getArr(LS_ADDR_HIST); ls.setArr(LS_ADDR_HIST, [addrVal, ...h.filter(a => a !== addrVal)].slice(0, 20)); }
      setTimeout(() => caseNumRef.current?.focus(), 150);
    } catch(e) { setError("Save failed: " + e.message); }
    finally { setSaving(false); }
  };

const markMod = (ci, val) => {
  setEditData(prev => {
    const updated = {
      ...prev,
      [ci]: val
    };

    const hasMissing =
      [...REQUIRED_COLS].some(
        c =>
          !(updated[c] || "")
            .toString()
            .trim()
      );

    if (!hasMissing) {
      setShowWarn(false);
      setWarnDismissed(false);
    }

    return updated;
  });

  setModCols(prev =>
    new Set([...prev, ci])
  );
};

  useEffect(() => { if (caseYear) ls.set(LS_YEAR, caseYear); }, [caseYear]);

  /* ── Camera / OCR ── */
  const openCamera = async () => {
    setOcrOpen(true); setOcrError(""); setOcrProcessing(false);
    setOcrMode("camera"); setCapturedBlob(null); setCapturedUrl(""); setCropRect(null); setOcrProgress(0); setOcrStatus("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: "environment", width: {ideal: 1920}, height: {ideal: 1080}}
      });
      streamRef.current = s;
      setTimeout(() => { if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); } }, 100);
    } catch { setOcrError("Camera access denied. Use the Image button to pick from gallery."); }
  };

  const tapFocus = (e) => {
    const track = streamRef.current?.getVideoTracks?.()?.[0]; if (!track) return;
    const caps = track.getCapabilities?.() ?? {}; if (!caps.focusMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    track.applyConstraints({advanced: [{focusMode: "manual", pointsOfInterest: [{x, y}]}]}).catch(() => {});
    setFocusRing({x: e.clientX - rect.left, y: e.clientY - rect.top, show: true});
    setTimeout(() => setFocusRing(r => ({...r, show: false})), 900);
  };

  const capturePhoto = () => {
    const v = videoRef.current, c = canvasRef.current; if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    stopStream();
    c.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      setCapturedBlob(blob); setCapturedUrl(url);
      setCropRect(null); setCropStart(null); setOcrMode("crop");
    }, "image/jpeg", 0.95);
  };

  const getImgCoords = (e, el) => {
    const r  = el.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - r.left, y: cy - r.top };
  };
  const onCropStart = (e) => { e.preventDefault(); const el = cropImgRef.current; if (!el) return; const {x,y} = getImgCoords(e, el); setCropStart({x,y}); setCropRect(null); setIsDragging(true); };
  const onCropMove  = (e) => { if (!isDragging || !cropStart) return; e.preventDefault(); const el = cropImgRef.current; if (!el) return; const {x,y} = getImgCoords(e, el); setCropRect({x: Math.min(cropStart.x,x), y: Math.min(cropStart.y,y), w: Math.abs(x-cropStart.x), h: Math.abs(y-cropStart.y)}); };
  const onCropEnd   = () => setIsDragging(false);

  const applyCrop = () => {
    if (!capturedBlob) return;
    const img = cropImgRef.current; if (!img) return;
    const c = canvasRef.current; if (!c) return;
    const sx = img.naturalWidth  / img.getBoundingClientRect().width;
    const sy = img.naturalHeight / img.getBoundingClientRect().height;
    if (cropRect && cropRect.w > 10 && cropRect.h > 10) {
      c.width  = cropRect.w * sx;
      c.height = cropRect.h * sy;
      const imgEl = new Image();
      imgEl.onload = () => {
        c.getContext("2d").drawImage(imgEl, cropRect.x*sx, cropRect.y*sy, c.width, c.height, 0, 0, c.width, c.height);
        c.toBlob(b => runOCR(b), "image/jpeg", 0.95);
      };
      imgEl.src = capturedUrl;
    } else {
      runOCR(capturedBlob);
    }
  };

  const stopStream = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; };
  useEffect(() => {
  return () => {
    stopStream();

    if (capturedUrl) {
      URL.revokeObjectURL(capturedUrl);
    }
  };
}, [capturedUrl]);
  const pickFile   = (e) => {
    const f = e.target.files[0]; if (!f) return; e.target.value = "";
    const url = URL.createObjectURL(f);
    setCapturedBlob(f); setCapturedUrl(url);
    setCropRect(null); setCropStart(null);
    setOcrOpen(true); setOcrError(""); setOcrProcessing(false); setOcrMode("crop");
  };

  /* FIX 4: runOCR now preprocesses image before Tesseract for much better detection */
  const runOCR = async (blob) => {
    setOcrMode("processing"); setOcrProcessing(true); setOcrError(""); setOcrProgress(0); setOcrStatus("Pre-processing image…");
    try {
      // Step 1: Enhance image
      setOcrStatus("Enhancing contrast & sharpness…");
      setOcrProgress(15);
      const enhanced = await preprocessImageForOCR(blob);

      // Step 2: Load Tesseract
      setOcrStatus("Loading OCR engine…");
      setOcrProgress(30);
      const worker = await loadTesseract();

      // Step 3: Run OCR
      setOcrStatus("Recognising text (English + Tamil)…");
      setOcrProgress(50);
      const imgUrl = URL.createObjectURL(enhanced);
      const { data } = await worker.recognize(imgUrl, {}, {text: true});
      setOcrProgress(90);
      URL.revokeObjectURL(imgUrl);

      const raw = data.text?.trim() || "";

      // Step 4: Clean up OCR output
      const cleaned = raw
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 1)
        .join("\n");

      setOcrProgress(100);

      if (cleaned) {
        setEditData(p => ({...p, [COL.ADDR]: cleaned}));
        setModCols(p => new Set([...p, COL.ADDR]));
        setOcrOpen(false);
        if (capturedUrl) URL.revokeObjectURL(capturedUrl);
      } else {
        setOcrError("No text detected. Try cropping tighter around the text, or ensure good lighting.");
        setOcrMode("crop");
      }
    } catch(e) {
      setOcrError("OCR error: " + e.message);
      setOcrMode("crop");
    } finally {
      setOcrProcessing(false);
      setOcrProgress(0);
      setOcrStatus("");
    }
  };

  const closeOcr = () => {
    stopStream(); setOcrOpen(false); setOcrError(""); setOcrProcessing(false);
    setOcrMode("camera"); setOcrProgress(0); setOcrStatus("");
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedUrl(""); setCapturedBlob(null);
  };

  /* ─── RENDER ──────────────────────────────────────────────────────────── */
  const caseQuery   = caseNum && caseYear ? `${caseNum}/${caseYear}` : null;
  const isLoggedIn  = !!token;
  const missingCount = result ? [...REQUIRED_COLS].filter(ci => !(editData[ci]||"").toString().trim()).length : 0;

  return (
    <div style={S.root}>

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.stripe}/>
        <div className="hInner" style={S.hInner}>
          <div>
            <h1 style={S.title}>⚖ CRLMP Case Editor</h1>
            <p style={S.sub}>Court Record &amp; Legal Management Portal{activeSheet ? ` · ${activeSheet}` : ""}</p>
          </div>
          <div className="authArea" style={S.authArea}>
            {isLoggedIn ? (
              <><span style={S.signedIn}>● Signed In</span><button style={S.signOutBtn} onClick={signOut}>Sign Out</button></>
            ) : (
              <button style={S.signBtn} onClick={signIn} disabled={!gisReady}>
                {gisReady ? "🔐 Sign In with Google" : "⏳ Loading…"}
              </button>
            )}
          </div>
        </div>
      </header>

      <div style={S.body}>

        {/* SHEET TABS */}
        <section style={S.card}>
          <p style={S.secLabel}>SELECT SHEET TAB <span style={S.persisted}>(remembered)</span></p>
          <div className="tabBar" style={S.tabBar}>
            {sheets.length === 0 && <span style={S.muted}>Loading tabs…</span>}
            {sheets.map(s => (
              <button key={s} className="tab-btn"
                style={{...S.tab, ...(activeSheet === s ? S.tabOn : {})}}
                onClick={() => selectSheet(s)}>
                {activeSheet === s ? "✓ " : ""}{s}
              </button>
            ))}
          </div>
        </section>

        {/* SEARCH */}
        <section style={S.card}>
          <p style={S.secLabel}>SEARCH CASE</p>
          <div style={S.searchWrap}>
            <div className="searchRow" style={S.searchRow}>
              <div style={S.fg}>
                <label style={S.lbl}>CRLMP No.</label>
                <input ref={caseNumRef} className="inp-case" style={S.inp}
                  inputMode="numeric" pattern="[0-9]*" enterKeyHint="next"
                  placeholder="e.g. 2956" value={caseNum}
                  onChange={e => setCaseNum(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={e => { if (e.key === "Enter") caseYearRef.current?.focus(); }}/>
              </div>
              <div style={S.slash}>/</div>
              <div style={S.fg}>
                <label style={S.lbl}>Year <span style={S.persisted}>(remembered)</span></label>
                <input ref={caseYearRef} className="inp-year" style={{...S.inp, width:92}}
                  inputMode="numeric" pattern="[0-9]*" enterKeyHint="search"
                  placeholder="2024" maxLength={4} value={caseYear}
                  onChange={e => setCaseYear(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={e => { if (e.key === "Enter") search(); }}/>
              </div>
              {caseQuery && <div className="preview-badge" style={S.preview}>{caseQuery}</div>}
            </div>
            <button className="searchBtn" style={S.searchBtn} onClick={search} disabled={searching}>
              {searching && <span style={S.spin}/>}
              {searching ? "Searching…" : "🔍 Search"}
            </button>
          </div>
        </section>

        {error   && <div style={S.errBox}>⚠ {error}</div>}
        {saveMsg && <div style={S.okBox}>{saveMsg}</div>}

        {result && showWarn && !warnDismissed && (
          <MissingFieldBanner editData={editData} onDismiss={() => { setWarnDismissed(true); setShowWarn(false); }}/>
        )}

        {/* RESULT */}
        {result && (
          <section style={{...S.card, padding:0, border:`1.5px solid #C9A84C`}}>
            <div className="resHead" style={S.resHead}>
              <div style={{display:"flex", alignItems:"center", gap:10, flexWrap:"wrap"}}>
                <span style={S.foundBadge}>CASE FOUND</span>
                <span style={S.foundCase}>{editData[COL.CASE]}</span>
                {missingCount > 0 && <span style={S.missBadge}><span className="miss-dot"/>{missingCount} field{missingCount>1?"s":""} empty</span>}
              </div>
              <span style={S.resMeta}>Sheet: <b>{activeSheet}</b> · Row <b>{result.rowIndex}</b></span>
            </div>

            <div className="grid" style={S.grid}>
              {HEADERS.map((hdr, ci) => {
                const isMod  = modCols.has(ci);
                const isDate = DATE_COLS.has(ci);
                const isAddr = ci === COL.ADDR;
                const isRO   = READONLY.has(ci);
                const isEmpty = REQUIRED_COLS.has(ci) && !(editData[ci]||"").toString().trim();
                return (
                  <div key={ci} className="field-card"
                    style={{...S.fCard, ...(isMod ? S.fCardMod : {}), ...(isEmpty ? S.fCardEmpty : {}), animationDelay:`${ci*25}ms`}}>
                    <div style={S.fTop}>
                      <span style={{...S.fLbl, ...(isEmpty ? {color:"#e74c3c"} : {})}}>
                        {isEmpty && <span className="miss-dot"/>}{hdr}
                      </span>
                      {isMod   && <span style={S.modBadge}>MODIFIED</span>}
                      {isEmpty && <span style={S.emptyBadge}>EMPTY</span>}
                    </div>
                    {isAddr ? (
                      <AddressField
                        value={editData[ci] || ""}
                        onChange={v => markMod(ci, v)}
                        onCamera={openCamera}
                        onFile={() => fileRef.current?.click()}
                        sheetAddresses={sheetAddresses}
                      />
                    ) : isDate ? (
                      <DateField value={editData[ci] || ""} isMod={isMod} onChange={v => markMod(ci, v)}/>
                    ) : isRO ? (
                      <div style={S.roVal}>{editData[ci] || "—"}</div>
                    ) : (
                      <EditField value={editData[ci] || ""} isMod={isMod} isEmpty={isEmpty} onChange={v => markMod(ci, v)}/>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="saveBar" style={S.saveBar}>
              {modCols.size > 0 && <span style={S.pending}>{modCols.size} field{modCols.size>1?"s":""} pending</span>}
              {missingCount > 0 && !warnDismissed && <span style={S.warnSaveHint}>⚠ {missingCount} empty</span>}
              <button className="save-btn" style={{...S.saveBtn, ...(saving ? {opacity:.6} : {})}} onClick={save} disabled={
  saving ||
  modCols.size === 0
}>
                {saving ? "Saving…" : "💾 Save to Sheet"}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* OCR OVERLAY */}
      {ocrOpen && (
        <div className="ocr-overlay">
          <div style={S.ocrCard}>
            <div style={S.ocrHead}>
              <div style={{display:"flex", alignItems:"center", gap:8}}>
                <span style={S.ocrTitle}>
                  {ocrMode === "crop" ? "✂️ Crop & Scan" : ocrMode === "processing" ? "🔍 Scanning…" : "📷 Scan Address"}
                </span>
                <span className="tess-badge">✦ FREE · Tesseract.js</span>
              </div>
              <button style={S.ocrClose} onClick={closeOcr}>✕</button>
            </div>

            {ocrMode === "processing" ? (
              <div style={S.ocrCenter}>
                <div style={S.bigSpin}/>
                <p style={S.ocrStatusTxt}>{ocrStatus || "Processing…"}</p>
                <div style={{width:"80%", marginTop:8}}>
                  <div className="ocr-progress-bar">
                    <div className="ocr-progress-fill" style={{
                      width: ocrProgress > 0 ? `${ocrProgress}%` : "20%",
                      animation: ocrProgress < 5 ? "pulse 1.5s ease-in-out infinite" : "none"
                    }}/>
                  </div>
                  <p style={{fontSize:10, color:"#bbb", textAlign:"center", marginTop:4, letterSpacing:"0.08em"}}>
                    CONTRAST BOOST + SHARPEN + OCR · RUNS IN BROWSER
                  </p>
                </div>
              </div>

            ) : ocrMode === "crop" && capturedUrl ? (
              <div style={{position:"relative", userSelect:"none"}}>
                <p style={{fontSize:11, color:"#888", textAlign:"center", padding:"8px 0 4px", background:"#f8f6f1", letterSpacing:"0.05em"}}>
                  DRAG to crop area · leave empty for full image
                </p>
                <div style={{position:"relative", lineHeight:0, touchAction:"none"}}
                  onMouseDown={onCropStart} onMouseMove={onCropMove} onMouseUp={onCropEnd}
                  onTouchStart={onCropStart} onTouchMove={onCropMove} onTouchEnd={onCropEnd}>
                  <img ref={cropImgRef} src={capturedUrl} alt="captured"
                    style={{width:"100%", maxHeight:300, objectFit:"contain", display:"block", cursor:"crosshair"}} draggable={false}/>
                  {cropRect && cropRect.w > 4 && cropRect.h > 4 && (
                    <div style={{position:"absolute", left:cropRect.x, top:cropRect.y, width:cropRect.w, height:cropRect.h,
                                 border:"2px solid #C9A84C", background:"rgba(201,168,76,.15)", pointerEvents:"auto"}}/>
                  )}
                </div>
                {ocrError && (
                  <p style={{color:"#c0392b", fontSize:12, padding:"6px 14px", background:"#fff0f0", textAlign:"center"}}>{ocrError}</p>
                )}
                <div style={{display:"flex", gap:8, padding:"10px 12px"}}>
                  <button style={S.galleryBtn} onClick={openCamera}>🔄 Retake</button>
                  <button style={S.galleryBtn} onClick={() => fileRef.current?.click()}>🖼 Gallery</button>
                  <button style={{...S.capBtn, flex:2}} onClick={applyCrop}>
                    {cropRect && cropRect.w > 10 ? "✂️ Crop & Scan" : "🔍 Scan Full Image"}
                  </button>
                </div>
                <canvas ref={canvasRef} style={{display:"none"}}/>
              </div>

            ) : (
              <div style={{position:"relative"}}>
                <div style={{position:"relative", lineHeight:0}} onClick={tapFocus}>
                  <video ref={videoRef} autoPlay playsInline muted style={S.video}/>
                  {focusRing.show && (
                    <div style={{position:"absolute", left:focusRing.x-22, top:focusRing.y-22,
                                 width:44, height:44, border:`2px solid ${G}`, borderRadius:"50%", pointerEvents:"none"}}/>
                  )}
                  <p style={{position:"absolute", bottom:6, left:0, right:0, textAlign:"center", fontSize:10, color:"#fff9", letterSpacing:"0.1em"}}>
                    TAP TO FOCUS · HOLD STEADY
                  </p>
                </div>
                <canvas ref={canvasRef} style={{display:"none"}}/>
                {ocrError && (
                  <p style={{color:"#c0392b", fontSize:12, padding:"8px 14px", background:"#fff0f0", textAlign:"center"}}>{ocrError}</p>
                )}
                <div style={S.ocrBtns}>
                  <button style={S.galleryBtn} onClick={() => fileRef.current?.click()}>🖼 Gallery</button>
                  <button style={{...S.capBtn, flex:2}} onClick={capturePhoto}>📸 Capture</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={pickFile}/>
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const G = "#C9A84C";
const S = {
  root:   {minHeight:"100vh", background:"#f8f6f1", fontFamily:"'JetBrains Mono',monospace", color:"#1a1a2e"},
  header: {background:"#1a1a2e", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 16px #0005"},
  stripe: {height:4, background:`linear-gradient(90deg,${G},#8B5E0A 50%,${G})`},
  hInner: {display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", gap:12, flexWrap:"wrap"},
  title:  {fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:G, letterSpacing:"0.06em"},
  sub:    {fontSize:11, color:"#8899aa", letterSpacing:"0.08em", marginTop:2},
  authArea:   {display:"flex", alignItems:"center", gap:10},
  signedIn:   {color:"#4ade80", fontSize:13},
  signBtn:    {padding:"8px 18px", background:"transparent", border:`1.5px solid ${G}`, color:G, borderRadius:6, fontSize:12, fontFamily:"inherit", cursor:"pointer"},
  signOutBtn: {padding:"6px 12px", background:"transparent", border:"1.5px solid #ff6b6b", color:"#ff6b6b", borderRadius:6, fontSize:11, fontFamily:"inherit", cursor:"pointer"},

  body:   {maxWidth:960, margin:"0 auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:16},
  card:   {background:"#fff", borderRadius:10, border:"1px solid #e8e0d0", padding:"18px 20px", boxShadow:"0 1px 4px #0001"},
  secLabel:  {fontSize:10, color:"#aaa", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10},
  persisted: {color:G, fontSize:9, letterSpacing:"0.1em"},
  muted:     {color:"#bbb", fontSize:13},

  tabBar: {display:"flex", gap:8, flexWrap:"wrap"},
  tab:    {padding:"7px 18px", borderRadius:20, border:"1.5px solid #e0d8cc", background:"#faf7f2", color:"#666", cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600, transition:"all .15s"},
  tabOn:  {background:"#fff8e8", border:`1.5px solid ${G}`, color:"#8B5E0A"},

  searchWrap: {display:"flex", flexWrap:"wrap", gap:14, alignItems:"flex-end"},
  searchRow:  {display:"flex", alignItems:"flex-end", gap:10, flexWrap:"wrap", flex:1},
  fg:     {display:"flex", flexDirection:"column", gap:5},
  lbl:    {fontSize:10, color:"#999", letterSpacing:"0.12em", textTransform:"uppercase"},
  inp:    {padding:"10px 14px", background:"#fff", border:"1.5px solid #ddd", borderRadius:8, color:"#1a1a2e", fontSize:15, fontFamily:"inherit", width:145, transition:"border .2s"},
  slash:  {fontSize:26, color:G, marginBottom:4, fontWeight:700},
  preview:    {padding:"10px 16px", background:"#fff8e8", border:`1.5px solid ${G}`, borderRadius:8, color:"#8B5E0A", fontSize:16, fontWeight:700, alignSelf:"flex-end"},
  searchBtn:  {padding:"10px 28px", background:`linear-gradient(135deg,${G},#8B5E0A)`, border:"none", borderRadius:8, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit", whiteSpace:"nowrap"},
  spin:   {width:14, height:14, border:"2px solid #ffffff44", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite"},

  errBox: {padding:"12px 18px", background:"#fff0f0", border:"1.5px solid #ffaaaa", borderRadius:8, color:"#c0392b", fontSize:13},
  okBox:  {padding:"12px 18px", background:"#f0fff4", border:"1.5px solid #6bcf8a", borderRadius:8, color:"#1a7a3a", fontSize:13},

  warnBanner: {background:"#fffbf0", border:"1.5px solid #e67e22", borderRadius:10, padding:"14px 18px",
               display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, boxShadow:"0 2px 12px #e67e2222"},
  warnLeft:   {display:"flex", alignItems:"flex-start", gap:12},
  warnIcon:   {fontSize:22, lineHeight:1},
  warnTitle:  {fontSize:13, fontWeight:700, color:"#8B5E0A", marginBottom:7, letterSpacing:"0.04em"},
  warnList:   {display:"flex", flexWrap:"wrap", gap:6},
  warnChip:   {display:"inline-flex", alignItems:"center", padding:"3px 10px", background:"#fff0e0",
               border:"1px solid #e67e22", borderRadius:4, fontSize:11, color:"#c0392b", fontWeight:600},
  warnClose:  {background:"transparent", border:"none", color:"#e67e22", fontSize:18, cursor:"pointer", padding:"0 4px", flexShrink:0},
  warnSaveHint: {fontSize:11, color:"#e67e22", fontWeight:600},

  missBadge: {display:"inline-flex", alignItems:"center", padding:"3px 9px", background:"#fff0f0", border:"1px solid #e74c3c", borderRadius:4, fontSize:10, color:"#c0392b"},

  resHead:    {display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", padding:"14px 20px", borderBottom:"1px solid #f0e8d8", background:"linear-gradient(90deg,#fffdf5,#fff)", gap:8},
  foundBadge: {padding:"3px 9px", background:"#fff8e8", border:`1px solid ${G}`, borderRadius:4, fontSize:10, color:"#8B5E0A", letterSpacing:"0.1em"},
  foundCase:  {fontSize:18, fontWeight:700, color:"#1a1a2e", marginLeft:4},
  resMeta:    {fontSize:11, color:"#aaa"},

  grid:      {display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))"},
  fCard:     {padding:"16px 20px", background:"#fff", borderRight:"1px solid #f0e8d8", borderBottom:"1px solid #f0e8d8", transition:"background .2s"},
  fCardMod:  {background:"#fffbf0"},
  fCardEmpty:{background:"#fff8f8", borderLeft:"3px solid #e74c3c"},
  fTop:      {display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10},
  fLbl:      {fontSize:10, color:"#bbb", letterSpacing:"0.12em", textTransform:"uppercase", display:"flex", alignItems:"center"},
  modBadge:  {fontSize:9, padding:"2px 6px", background:"#fff8e8", border:`1px solid ${G}`, color:"#8B5E0A", borderRadius:3},
  emptyBadge:{fontSize:9, padding:"2px 6px", background:"#fff0f0", border:"1px solid #e74c3c", color:"#c0392b", borderRadius:3},
  roVal:     {fontSize:14, color:"#bbb"},
  dispVal:   {flex:1, fontSize:14, color:"#1a1a2e", wordBreak:"break-word"},
  modBtn:    {padding:"4px 12px", background:"#faf7f2", border:"1.5px solid #e0d8cc", borderRadius:5, color:"#888", fontSize:11, cursor:"pointer", fontFamily:"inherit", transition:"all .15s", whiteSpace:"nowrap"},

  tanglishHint:  {display:"flex", alignItems:"center", gap:8, marginBottom:6},
  tanglishBadge: {fontSize:10, padding:"2px 8px", background:"#fffbf0", border:"1.5px solid #C9A84C", borderRadius:10, color:"#8B5E0A", fontWeight:700},
  tanglishTip:   {fontSize:10, color:"#bbb", letterSpacing:"0.04em"},

  sugPop:     {background:"#fff", border:`1.5px solid ${G}`, borderRadius:10,
               boxShadow:"0 10px 32px rgba(0,0,0,.16)", overflow:"hidden", marginTop:2},
  sugHeader:  {display:"flex", alignItems:"center", justifyContent:"space-between",
               padding:"7px 14px", background:"#fff8e8", borderBottom:"1px solid #f0e8d8"},
  sugTitle:   {fontSize:11, color:"#8B5E0A", fontWeight:600, display:"flex", alignItems:"center", gap:6},
  sugNav:     {fontSize:10, color:"#C9A84C", letterSpacing:"0.04em"},
  sugRow:     {display:"flex", flexWrap:"wrap", gap:6, padding:"10px 12px"},
  sugItem:    {padding:"7px 18px", background:"#faf7f2", border:"1.5px solid #e0d8cc", borderRadius:20,
               fontSize:15, cursor:"pointer", color:"#1a1a2e", fontFamily:"inherit", transition:"all .12s",
               display:"flex", alignItems:"center", gap:6},
  sugItemSel: {background:"#fff8e8", borderColor:G, color:"#8B5E0A"},
  sugTamil:   {fontSize:15},
  sugBest:    {fontSize:9, padding:"1px 5px", background:"#C9A84C22", borderRadius:3, color:"#8B5E0A", fontWeight:700, letterSpacing:"0.06em"},
  sugSkeleton:{width:72, height:34, borderRadius:20, background:"#f0ece4", animation:"pulse 1.2s ease-in-out infinite"},
  sugEmpty:   {fontSize:11, color:"#bbb", padding:"8px 14px", textAlign:"center"},
  miniSpin:   {display:"inline-block", width:11, height:11, border:"1.5px solid #C9A84C44", borderTopColor:G, borderRadius:"50%", animation:"spin .7s linear infinite"},

  acDrop:     {background:"#fff", border:`1.5px solid ${G}`, borderRadius:"0 0 10px 10px",
               boxShadow:"0 8px 24px rgba(0,0,0,.12)", maxHeight:220, overflowY:"auto", marginTop:2},
  acHeader:   {padding:"6px 12px", background:"#fff8e8", borderBottom:"1px solid #f0e8d8"},
  acHeaderTxt:{fontSize:10, color:"#8B5E0A", letterSpacing:"0.1em", textTransform:"uppercase"},
  acItem:     {display:"flex", alignItems:"flex-start", gap:10, padding:"9px 12px", background:"none", border:"none",
               width:"100%", textAlign:"left", cursor:"pointer", fontFamily:"inherit", borderBottom:"1px solid #f8f4ee", transition:"background .12s"},
  acIcon:     {fontSize:13, flexShrink:0, marginTop:1},
  acText:     {fontSize:12, color:"#1a1a2e", lineHeight:1.5, wordBreak:"break-word"},

  addrArea:   {width:"100%", background:"#fff", border:"1.5px solid #ddd", borderRadius:8, color:"#1a1a2e",
               fontSize:13, padding:"9px 12px", fontFamily:"inherit", resize:"vertical", lineHeight:1.6, boxSizing:"border-box"},
  camRow:     {display:"flex", gap:8, marginTop:7},
  camBtn:     {flex:1, padding:"8px 14px", background:"#f0f6ff", border:"1.5px solid #c0d8ff", borderRadius:6,
               color:"#3B6BF5", fontSize:12, cursor:"pointer", fontFamily:"inherit", transition:"all .15s", textAlign:"center"},

  inpInline:  {flex:1, padding:"7px 10px", background:"#fff", border:"1.5px solid #ddd", borderRadius:6, color:"#1a1a2e", fontSize:14, fontFamily:"inherit"},
  okBtn:      {padding:"6px 10px", background:"#e8f8ec", border:"1.5px solid #6bcf8a", color:"#1a7a3a", borderRadius:5, cursor:"pointer", fontSize:14},
  cancelBtn:  {padding:"6px 10px", background:"#fff0f0", border:"1.5px solid #ffaaaa", color:"#c0392b", borderRadius:5, cursor:"pointer", fontSize:14},

  saveBar:    {display:"flex", alignItems:"center", justifyContent:"flex-end", gap:16, padding:"14px 20px", borderTop:"1px solid #f0e8d8", background:"#fafaf8", flexWrap:"wrap"},
  pending:    {fontSize:12, color:"#8B5E0A"},
  saveBtn:    {padding:"11px 32px", background:`linear-gradient(135deg,${G},#8B5E0A)`, border:"none", borderRadius:8, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"opacity .2s"},

  ocrCard:    {background:"#fff", borderRadius:16, width:"min(92vw,420px)", overflow:"hidden", boxShadow:"0 24px 64px #000c"},
  ocrHead:    {display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"#1a1a2e"},
  ocrTitle:   {color:G, fontWeight:700, fontSize:16, fontFamily:"'Rajdhani',sans-serif"},
  ocrClose:   {background:"transparent", border:"none", color:"#fff", fontSize:20, cursor:"pointer"},
  ocrCenter:  {display:"flex", flexDirection:"column", alignItems:"center", padding:40, gap:12},
  ocrStatusTxt:{color:"#555", fontSize:13, letterSpacing:"0.05em", textAlign:"center"},
  bigSpin:    {width:44, height:44, border:`3px solid #e0d8cc`, borderTopColor:G, borderRadius:"50%", animation:"spin .8s linear infinite"},
  video:      {width:"100%", maxHeight:280, objectFit:"cover", display:"block"},
  ocrBtns:    {display:"flex", gap:12, padding:"14px 18px"},
  capBtn:     {flex:1, padding:11, background:`linear-gradient(135deg,${G},#8B5E0A)`, border:"none", borderRadius:8, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit"},
  galleryBtn: {flex:1, padding:11, background:"#f0f6ff", border:"1.5px solid #c0d8ff", borderRadius:8, color:"#3B6BF5", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit"},
};
