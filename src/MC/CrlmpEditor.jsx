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

/* ─── THEME ──────────────────────────────────────────────────────────────── */
const T = {
  bg:       "#0a0b0f",
  bgPanel:  "#0f1118",
  bgCard:   "#13151f",
  bgCardHov:"#171a27",
  bgInput:  "#0c0e16",
  border:   "#1e2235",
  borderGlow:"#2a3060",
  gold:     "#d4a843",
  goldDim:  "#8a6920",
  goldGlow: "rgba(212,168,67,.15)",
  crimson:  "#c0392b",
  crimsonDim:"#7a1f15",
  crimsonGlow:"rgba(192,57,43,.18)",
  green:    "#27ae60",
  greenGlow:"rgba(39,174,96,.15)",
  text:     "#e8eaf0",
  textDim:  "#7a8099",
  textMuted:"#3d4260",
  white:    "#ffffff",
};

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

/* ─── TAMIL ADDRESS QUICK MAP (offline / instant) ────────────────────────── */
const TAMIL_ADDR_MAP = {
  /* cities & districts */
  "chennai":"சென்னை","madurai":"மதுரை","coimbatore":"கோயம்புத்தூர்",
  "trichy":"திருச்சிராப்பள்ளி","tiruchirappalli":"திருச்சிராப்பள்ளி",
  "salem":"சேலம்","tirunelveli":"திருநெல்வேலி","vellore":"வேலூர்",
  "erode":"ஈரோடு","thoothukudi":"தூத்துக்குடி","tuticorin":"தூத்துக்குடி",
  "thanjavur":"தஞ்சாவூர்","tanjore":"தஞ்சாவூர்","dindigul":"திண்டுக்கல்",
  "cuddalore":"கடலூர்","nagapattinam":"நாகப்பட்டினம்","kanchipuram":"காஞ்சிபுரம்",
  "tiruppur":"திருப்பூர்","namakkal":"நாமக்கல்","dharmapuri":"தர்மபுரி",
  "krishnagiri":"கிருஷ்ணகிரி","villupuram":"விழுப்புரம்","ariyalur":"அரியலூர்",
  "perambalur":"பெரம்பலூர்","pudukottai":"புதுக்கோட்டை","ramanathapuram":"ராமநாதபுரம்",
  "sivaganga":"சிவகங்கை","theni":"தேனி","virudhunagar":"விருதுநகர்",
  "karur":"கரூர்","nilgiris":"நீலகிரி","ooty":"உதகமண்டலம்",
  "hosur":"ஹோசூர்","ambattur":"அம்பத்தூர்","avadi":"ஆவடி",
  "tambaram":"தாம்பரம்","pallavaram":"பல்லாவரம்","thiruvallur":"திருவள்ளூர்",
  /* address words */
  "veedu":"வீடு","theru":"தெரு","nagar":"நகர்","salai":"சாலை",
  "road":"சாலை","street":"தெரு","main":"மெயின்","new":"புதிய",
  "old":"பழைய","big":"பெரிய","small":"சிறிய","north":"வடக்கு",
  "south":"தெற்கு","east":"கிழக்கு","west":"மேற்கு","kovil":"கோவில்",
  "puram":"புரம்","patti":"பட்டி","palayam":"பாளையம்","kuppam":"குப்பம்",
  "colony":"காலனி","layout":"லேஅவுட்","avenue":"அவென்யூ","cross":"கிராஸ்",
  "near":"அருகில்","opposite":"எதிரில்","behind":"பின்னால்","flat":"பிளாட்",
  "door":"கதவு","plot":"பிளாட்","house":"வீடு","building":"கட்டிடம்",
};

/* ─── VARNAM + GOOGLE TAMIL ENGINE (100% FREE) ───────────────────────────── */
const pendingRequests = {};

async function fetchTamilSuggestions(word) {
  if (!word || word.length < 2 || !/^[a-zA-Z]+$/.test(word)) return [];
  const lw = word.toLowerCase().trim();

  /* 1. localStorage cache */
  const cache = ls.getJSON(LS_TA_CACHE);
  if (cache[lw] && Array.isArray(cache[lw]) && cache[lw].length > 0) return cache[lw];

  /* 2. Instant local map */
  if (TAMIL_ADDR_MAP[lw]) return [TAMIL_ADDR_MAP[lw]];

  /* 3. Deduplicate in-flight requests */
  if (pendingRequests[lw]) return pendingRequests[lw];

  pendingRequests[lw] = (async () => {
    let sugs = [];

    /* 4. Varnam API (primary — open source, free, Tamil-optimised) */
    try {
      const resp = await fetch(
        `https://api.varnamproject.com/tl/ta/${encodeURIComponent(lw)}`,
        { signal: AbortSignal.timeout(4000) }
      );
      if (resp.ok) {
        const data = await resp.json();
        sugs = (data?.result || [])
          .filter(s => typeof s === "string" && /[\u0B80-\u0BFF]/.test(s))
          .slice(0, 6);
      }
    } catch { /* Varnam down or timeout — fall through */ }

    /* 5. Google Input Tools fallback (free, unofficial) */
    if (!sugs.length) {
      try {
        const resp = await fetch(
          `https://inputtools.google.com/request?text=${encodeURIComponent(lw)}&itc=ta-t-i0-und&num=6&cp=0&cs=1&ie=utf-8&oe=utf-8`,
          { signal: AbortSignal.timeout(4000) }
        );
        if (resp.ok) {
          const data = await resp.json();
          sugs = (data?.[1]?.[0]?.[1] || [])
            .filter(s => typeof s === "string" && /[\u0B80-\u0BFF]/.test(s))
            .slice(0, 6);
        }
      } catch { /* both failed */ }
    }

    /* 6. Save to cache */
    if (sugs.length) {
      const uc = ls.getJSON(LS_TA_CACHE);
      const keys = Object.keys(uc);
      if (keys.length > 500) delete uc[keys[0]];
      uc[lw] = sugs;
      ls.setJSON(LS_TA_CACHE, uc);
    }

    delete pendingRequests[lw];
    return sugs;
  })();

  return pendingRequests[lw];
}

/* ─── IMAGE PRE-PROCESSING ───────────────────────────────────────────────── */
function preprocessImageForOCR(blob) {
  return new Promise((resolve) => {
    const img = new Image(); const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const scale = Math.max(1, 1200 / img.width);
      canvas.width = img.width * scale; canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) { const g = 0.299*data[i]+0.587*data[i+1]+0.114*data[i+2]; data[i]=data[i+1]=data[i+2]=g; }
      let mn=255,mx=0; for (let i=0;i<data.length;i+=4){if(data[i]<mn)mn=data[i];if(data[i]>mx)mx=data[i];}
      const rng=mx-mn||1; for(let i=0;i<data.length;i+=4){const v=Math.round(((data[i]-mn)/rng)*255);data[i]=data[i+1]=data[i+2]=v;}
      for(let i=0;i<data.length;i+=4){const v=data[i]/255;const b=Math.round(255*(v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2));data[i]=data[i+1]=data[i+2]=Math.min(255,Math.max(0,b));}
      const copy=new Uint8ClampedArray(data),w=canvas.width,h=canvas.height;
      for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const idx=(y*w+x)*4;const lap=-copy[idx-w*4]-copy[idx+w*4]-copy[idx-4]-copy[idx+4]+4*copy[idx];const sh=Math.min(255,Math.max(0,copy[idx]-.6*lap));data[idx]=data[idx+1]=data[idx+2]=Math.round(sh);}
      ctx.putImageData(imageData,0,0); canvas.toBlob(resolve,"image/png");
    };
    img.onerror=()=>{URL.revokeObjectURL(url);resolve(blob);}; img.src=url;
  });
}

/* ─── TESSERACT LOADER ───────────────────────────────────────────────────── */
let tesseractWorker=null,tesseractLoading=false,tesseractReady=false;
async function loadTesseract() {
  if(tesseractReady&&tesseractWorker)return tesseractWorker;
  if(tesseractLoading){await new Promise(r=>{const iv=setInterval(()=>{if(tesseractReady){clearInterval(iv);r();}},200);});return tesseractWorker;}
  tesseractLoading=true;
  if(!window.Tesseract){await new Promise((res,rej)=>{const sc=document.createElement("script");sc.src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";sc.onload=res;sc.onerror=rej;document.head.appendChild(sc);});}
  tesseractWorker=await window.Tesseract.createWorker(["eng","tam"],1,{workerPath:"https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js",corePath:"https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core.wasm.js",langPath:"https://tessdata.projectnaptha.com/4.0.0"});
  await tesseractWorker.setParameters({tessedit_pageseg_mode:"6",preserve_interword_spaces:"1",tessedit_char_whitelist:""});
  tesseractReady=true;tesseractLoading=false;return tesseractWorker;
}

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────── */
const INJECTED={done:false};
function injectCSS(){
  if(INJECTED.done)return; INJECTED.done=true;
  const s=document.createElement("style");
  s.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{background:${T.bg};font-family:'IBM Plex Mono',monospace;color:${T.text}}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:${T.bg}}
    ::-webkit-scrollbar-thumb{background:${T.borderGlow};border-radius:2px}
    ::selection{background:${T.goldGlow};color:${T.gold}}
    @keyframes spin      {to{transform:rotate(360deg)}}
    @keyframes fadeUp    {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn    {from{opacity:0}to{opacity:1}}
    @keyframes slideDown {from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse     {0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes scanline  {0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
    @keyframes glowPulse {0%,100%{box-shadow:0 0 0 0 transparent}50%{box-shadow:0 0 16px 2px ${T.goldGlow}}}
    @keyframes borderFlow{0%{background-position:0% 50%}100%{background-position:200% 50%}}
    @keyframes blink     {0%,100%{opacity:1}49%{opacity:1}50%{opacity:0}99%{opacity:0}}

    .tab-btn{transition:all .2s!important}
    .tab-btn:hover{background:${T.bgCardHov}!important;border-color:${T.gold}!important;color:${T.gold}!important;box-shadow:0 0 12px ${T.goldGlow}!important}
    .tab-btn.active{background:linear-gradient(135deg,${T.goldDim}22,${T.goldGlow})!important;border-color:${T.gold}!important;color:${T.gold}!important}

    .field-card{animation:fadeUp .28s cubic-bezier(.22,.68,0,1.2) both;transition:background .2s,border-color .2s,box-shadow .2s}
    .field-card:hover{background:${T.bgCardHov}!important;border-color:${T.borderGlow}!important}
    .field-card.modified{border-color:${T.gold}!important;box-shadow:inset 3px 0 0 ${T.gold},0 0 20px ${T.goldGlow}!important}
    .field-card.empty{border-color:${T.crimsonDim}!important;box-shadow:inset 3px 0 0 ${T.crimson}!important}

    .mod-btn{transition:all .15s!important}
    .mod-btn:hover{background:${T.goldGlow}!important;border-color:${T.gold}!important;color:${T.gold}!important}

    .save-btn{transition:all .2s!important}
    .save-btn:hover:not(:disabled){transform:translateY(-1px)!important;box-shadow:0 6px 24px rgba(212,168,67,.4)!important}
    .save-btn:active{transform:translateY(0)!important}

    .cam-btn{transition:all .15s!important}
    .cam-btn:hover{background:#0a1535!important;border-color:#4a7aff!important;color:#7aabff!important;box-shadow:0 0 10px rgba(74,122,255,.2)!important}

    .sug-item{transition:all .12s!important}
    .sug-item:hover,.sug-item.sel{background:${T.goldGlow}!important;border-color:${T.gold}!important;color:${T.gold}!important}

    .ac-item{transition:background .12s!important}
    .ac-item:hover{background:${T.bgCardHov}!important}

    input,textarea{transition:border-color .2s,box-shadow .2s!important}
    input:focus,textarea:focus{outline:none!important;border-color:${T.gold}!important;box-shadow:0 0 0 2px ${T.goldGlow},0 0 20px ${T.goldGlow}!important}

    .search-btn:hover{box-shadow:0 0 24px rgba(212,168,67,.5)!important;transform:translateY(-1px)!important}
    .sign-btn:hover{background:${T.goldGlow}!important;box-shadow:0 0 16px ${T.goldGlow}!important}

    .warn-pop{animation:slideDown .2s ease both}
    .ok-box{animation:fadeIn .3s ease both}

    .miss-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:${T.crimson};margin-right:6px;animation:pulse 1.2s ease-in-out infinite}
    .tess-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:rgba(39,174,96,.1);border:1px solid rgba(39,174,96,.3);border-radius:3px;font-size:9px;color:${T.green};letter-spacing:.1em;font-family:'IBM Plex Mono',monospace}

    .ocr-progress-bar{height:2px;background:${T.border};border-radius:1px;overflow:hidden;margin:10px 0}
    .ocr-progress-fill{height:100%;background:linear-gradient(90deg,${T.gold},${T.crimson});border-radius:1px;transition:width .4s ease}

    @media(max-width:640px){
      .h-inner{flex-direction:column!important;gap:12px!important}
      .auth-area{width:100%!important}
      .search-row{flex-direction:column!important;align-items:stretch!important}
      .inp-case,.inp-year{width:100%!important}
      .search-btn-wrap{width:100%!important}
      .grid{grid-template-columns:1fr!important}
      .save-bar{flex-direction:column!important;align-items:stretch!important}
      .save-btn{width:100%!important;justify-content:center!important}
      .tab-bar{gap:6px!important}
    }
  `;
  document.head.appendChild(s);
}

/* ─── PORTAL DROPDOWN RECT HOOK ──────────────────────────────────────────── */
function useDropdownRect(anchorRef, isOpen) {
  const [rect,setRect]=useState(null);
  useEffect(()=>{
    if(!isOpen){setRect(null);return;}
    const update=()=>{const el=anchorRef.current;if(!el)return;const r=el.getBoundingClientRect();setRect({top:r.bottom+window.scrollY+4,left:r.left+window.scrollX,width:r.width});};
    update();
    window.addEventListener("scroll",update,true);window.addEventListener("resize",update);
    return()=>{window.removeEventListener("scroll",update,true);window.removeEventListener("resize",update);};
  },[isOpen,anchorRef]);
  return rect;
}

/* ─── MISSING FIELD BANNER ───────────────────────────────────────────────── */
function MissingFieldBanner({editData,onDismiss}) {
  const missing=[];REQUIRED_COLS.forEach(ci=>{if(!(editData[ci]||"").toString().trim())missing.push(HEADERS[ci]);});
  if(!missing.length)return null;
  return(
    <div className="warn-pop" style={{background:`linear-gradient(135deg,${T.bgCard},#1a0f0a)`,border:`1px solid ${T.crimsonDim}`,borderLeft:`3px solid ${T.crimson}`,borderRadius:8,padding:"14px 18px",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,boxShadow:`0 4px 24px ${T.crimsonGlow}`}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        <span style={{fontSize:18,lineHeight:1,flexShrink:0}}>⚠</span>
        <div>
          <p style={{fontSize:11,fontWeight:600,color:T.crimson,marginBottom:8,letterSpacing:"0.1em",textTransform:"uppercase"}}>Missing Required Fields</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {missing.map(f=>(
              <span key={f} style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",background:T.crimsonGlow,border:`1px solid ${T.crimsonDim}`,borderRadius:3,fontSize:10,color:"#ff8070",fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.05em"}}>
                <span className="miss-dot"/>{f}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button onClick={onDismiss} style={{background:"transparent",border:"none",color:T.textDim,fontSize:16,cursor:"pointer",padding:"0 4px",flexShrink:0,lineHeight:1}}>✕</button>
    </div>
  );
}

/* ─── ADDRESS FIELD ──────────────────────────────────────────────────────── */
function AddressField({value,onChange,onCamera,onFile,sheetAddresses}) {
  const [sugList,setSugList]=useState([]);
  const [sugLoading,setSugLoading]=useState(false);
  const [sugOpen,setSugOpen]=useState(false);
  const [activeIdx,setActiveIdx]=useState(0);
  const [acList,setAcList]=useState([]);
  const [acOpen,setAcOpen]=useState(false);
  const [currentWord,setCurrentWord]=useState("");
  const [wordStart,setWordStart]=useState(0);
  const [wordEnd,setWordEnd]=useState(0);
  const textareaRef=useRef(null);
  const debounceRef=useRef(null);
  const lastWordRef=useRef("");
  const sugRect=useDropdownRect(textareaRef,sugOpen&&(sugLoading||sugList.length>0));
  const acRect=useDropdownRect(textareaRef,acOpen&&acList.length>0);

  const handleChange=(e)=>{
    const newVal=e.target.value; onChange(newVal);
    const pos=e.target.selectionStart,before=newVal.slice(0,pos),words=before.split(/\s/),word=words[words.length-1],wStart=pos-word.length;
    if(word.length>=2&&/^[a-zA-Z]+$/.test(word)){
      setWordStart(wStart);setWordEnd(pos);setCurrentWord(word);setAcOpen(false);setAcList([]);
      clearTimeout(debounceRef.current);
      debounceRef.current=setTimeout(async()=>{
        const lw=word.toLowerCase();if(lw===lastWordRef.current&&sugList.length>0)return;
        lastWordRef.current=lw;setSugLoading(true);setSugOpen(true);setSugList([]);setActiveIdx(0);
        const sugs=await fetchTamilSuggestions(word);setSugList(sugs);setSugLoading(false);if(!sugs.length)setSugOpen(false);
      },280);
    } else {
      clearTimeout(debounceRef.current);lastWordRef.current="";setSugOpen(false);setSugLoading(false);
      const q=newVal.trim().toLowerCase();
      if(q.length>=3){
        const hist=ls.getArr(LS_ADDR_HIST);const combined=[...new Set([...hist,...sheetAddresses])].filter(Boolean);
        const hits=combined.filter(a=>a.toLowerCase().includes(q)&&a.trim()!==newVal.trim()).slice(0,8);
        if(hits.length){setAcList(hits);setAcOpen(true);return;}
      }
      setAcOpen(false);
    }
  };
  const insertSug=(tamil)=>{
    onChange(value.slice(0,wordStart)+tamil+" "+value.slice(wordEnd));
    setSugOpen(false);setSugList([]);lastWordRef.current="";setCurrentWord("");
    setTimeout(()=>{const ta=textareaRef.current;if(ta){const p=wordStart+tamil.length+1;ta.setSelectionRange(p,p);ta.focus();}},0);
  };
  const selectAC=(addr)=>{onChange(addr);setAcOpen(false);setAcList([]);const hist=ls.getArr(LS_ADDR_HIST);ls.setArr(LS_ADDR_HIST,[addr,...hist.filter(a=>a!==addr)].slice(0,20));};
  const handleKeyDown=(e)=>{
    if(sugOpen){
      if(e.key==="ArrowRight"||e.key==="Tab"){if(sugList.length){e.preventDefault();insertSug(sugList[activeIdx]);}}
      else if(e.key==="ArrowDown"){e.preventDefault();setActiveIdx(i=>Math.min(i+1,sugList.length-1));}
      else if(e.key==="ArrowUp"){e.preventDefault();setActiveIdx(i=>Math.max(i-1,0));}
      else if(e.key==="Escape"){setSugOpen(false);setSugList([]);}
      else if(e.key==="Enter"){if(sugList.length){e.preventDefault();insertSug(sugList[activeIdx]);}}
    } else if(acOpen&&e.key==="Escape"){setAcOpen(false);setAcList([]);}
  };
  const handleBlur=()=>{
    const v=value.trim();if(v.length>8){const h=ls.getArr(LS_ADDR_HIST);ls.setArr(LS_ADDR_HIST,[v,...h.filter(a=>a!==v)].slice(0,20));}
    setTimeout(()=>{setSugOpen(false);setAcOpen(false);},200);
  };

  return(
    <div style={{position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
        <span style={{fontSize:9,padding:"2px 9px",background:`linear-gradient(90deg,${T.goldGlow},transparent)`,border:`1px solid ${T.goldDim}`,borderRadius:2,color:T.gold,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase"}}>✦ Varnam Tamil</span>
        <span style={{fontSize:9,color:T.textMuted,letterSpacing:"0.05em"}}>type English → Tamil · 100% free</span>
      </div>
      <textarea
        ref={textareaRef}
        style={{width:"100%",background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:6,color:T.text,fontSize:13,padding:"10px 12px",fontFamily:"'IBM Plex Mono',monospace",resize:"vertical",lineHeight:1.7,boxSizing:"border-box",minHeight:72}}
        value={value} rows={3}
        placeholder="வீடு எண், தெரு, நகர்… or type English for Tamil"
        onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur}
      />
      {/* Suggestion portal */}
      {sugOpen&&(sugLoading||sugList.length>0)&&sugRect&&createPortal(
        <div style={{position:"absolute",top:sugRect.top,left:sugRect.left,width:sugRect.width,zIndex:99999,background:T.bgPanel,border:`1px solid ${T.gold}`,borderRadius:8,boxShadow:`0 16px 48px rgba(0,0,0,.8),0 0 40px ${T.goldGlow}`,overflow:"hidden",animation:"slideDown .15s ease both"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 12px",background:`linear-gradient(90deg,${T.goldGlow},transparent)`,borderBottom:`1px solid ${T.border}`}}>
            <span style={{fontSize:10,color:T.gold,fontWeight:600,display:"flex",alignItems:"center",gap:6,fontFamily:"'IBM Plex Mono',monospace"}}>
              {sugLoading&&sugList.length===0?<><span style={{display:"inline-block",width:10,height:10,border:`1.5px solid ${T.goldDim}`,borderTopColor:T.gold,borderRadius:"50%",animation:"spin .7s linear infinite"}}/> transliterating "{currentWord}"…</>:`Tamil for "${currentWord}"`}
            </span>
            <span style={{fontSize:9,color:T.goldDim,letterSpacing:"0.06em"}}>Tab/→ · ↑↓ · Esc</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"10px 12px"}}>
            {sugLoading&&sugList.length===0&&[1,2,3].map(i=><div key={i} style={{width:70,height:32,borderRadius:4,background:T.border,animation:"pulse 1.2s ease-in-out infinite"}}/>)}
            {sugList.map((s,i)=>(
              <button key={i} className={"sug-item"+(i===activeIdx?" sel":"")}
                style={{padding:"6px 16px",background:i===activeIdx?T.goldGlow:T.bgCard,border:`1px solid ${i===activeIdx?T.gold:T.border}`,borderRadius:4,fontSize:15,cursor:"pointer",color:i===activeIdx?T.gold:T.text,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}
                onMouseEnter={()=>setActiveIdx(i)} onMouseDown={e=>{e.preventDefault();insertSug(s);}}>
                {s}{i===0&&<span style={{fontSize:8,padding:"1px 4px",background:T.goldDim,borderRadius:2,color:T.bg,fontWeight:700,letterSpacing:"0.08em",fontFamily:"'IBM Plex Mono',monospace"}}>BEST</span>}
              </button>
            ))}
          </div>
          {!sugLoading&&sugList.length===0&&<div style={{fontSize:11,color:T.textDim,padding:"8px 14px",textAlign:"center"}}>No suggestions — type more or enter Tamil directly</div>}
        </div>,
        document.body
      )}
      {/* Autocomplete portal */}
      {acOpen&&acList.length>0&&acRect&&createPortal(
        <div style={{position:"absolute",top:acRect.top,left:acRect.left,width:acRect.width,zIndex:99998,background:T.bgPanel,border:`1px solid ${T.gold}`,borderRadius:"0 0 8px 8px",boxShadow:`0 12px 32px rgba(0,0,0,.7)`,maxHeight:220,overflowY:"auto",animation:"slideDown .15s ease both"}}>
          <div style={{padding:"5px 12px",background:T.goldGlow,borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:9,color:T.gold,letterSpacing:"0.1em",textTransform:"uppercase"}}>📋 Sheet / History</span></div>
          {acList.map((addr,i)=>(
            <button key={i} className="ac-item" style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 12px",background:"none",border:"none",borderBottom:`1px solid ${T.border}`,width:"100%",textAlign:"left",cursor:"pointer",fontFamily:"inherit"}} onMouseDown={()=>selectAC(addr)}>
              <span style={{fontSize:11,flexShrink:0,marginTop:1,color:T.textDim}}>⟳</span>
              <span style={{fontSize:12,color:T.text,lineHeight:1.5,wordBreak:"break-word"}}>{addr}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button className="cam-btn" style={{flex:1,padding:"7px 10px",background:"#070d20",border:"1px solid #1a3060",borderRadius:5,color:"#5a8aff",fontSize:11,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.05em"}} onClick={onCamera}>📷 Camera OCR</button>
        <button className="cam-btn" style={{flex:1,padding:"7px 10px",background:"#070d20",border:"1px solid #1a3060",borderRadius:5,color:"#5a8aff",fontSize:11,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.05em"}} onClick={onFile}>🖼 Image OCR</button>
      </div>
    </div>
  );
}

/* ─── DATE FIELD ─────────────────────────────────────────────────────────── */
function DateField({value,isMod,onChange}) {
  const [draft,setDraft]=useState(value);
  useEffect(()=>setDraft(value),[value]);
  const handleChange=(e)=>{let v=e.target.value.replace(/\D/g,"");if(v.length>2)v=v.slice(0,2)+"-"+v.slice(2);if(v.length>5)v=v.slice(0,5)+"-"+v.slice(5);v=v.slice(0,10);setDraft(v);onChange(v);};
  return(
    <input
      style={{width:"100%",boxSizing:"border-box",padding:"8px 11px",background:T.bgInput,border:`1px solid ${isMod?T.gold:T.border}`,borderRadius:5,color:isMod?T.gold:T.text,fontSize:14,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.08em",...(isMod?{boxShadow:`0 0 10px ${T.goldGlow}`}:{})}}
      value={draft} onChange={handleChange} inputMode="numeric" enterKeyHint="done" placeholder="dd-mm-yyyy" maxLength={10}
    />
  );
}

/* ─── GENERIC EDIT FIELD ─────────────────────────────────────────────────── */
function EditField({value,isMod,onChange,isEmpty}) {
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(value);
  const ref=useRef();
  useEffect(()=>setDraft(value),[value]);
  useEffect(()=>{if(editing)ref.current?.focus();},[editing]);
  const commit=()=>{onChange(draft);setEditing(false);};
  const cancel=()=>{setDraft(value);setEditing(false);};
  return editing?(
    <div style={{display:"flex",gap:6,alignItems:"center"}}>
      <input ref={ref}
        style={{flex:1,padding:"7px 10px",background:T.bgInput,border:`1px solid ${T.gold}`,borderRadius:5,color:T.text,fontSize:13,fontFamily:"'IBM Plex Mono',monospace",boxShadow:`0 0 10px ${T.goldGlow}`}}
        value={draft} onChange={e=>setDraft(e.target.value)} enterKeyHint="done"
        onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")cancel();}}/>
      <button onClick={commit} style={{padding:"6px 10px",background:"rgba(39,174,96,.15)",border:"1px solid rgba(39,174,96,.4)",color:T.green,borderRadius:4,cursor:"pointer",fontSize:13,lineHeight:1}}>✓</button>
      <button onClick={cancel} style={{padding:"6px 10px",background:T.crimsonGlow,border:`1px solid ${T.crimsonDim}`,color:"#ff8070",borderRadius:4,cursor:"pointer",fontSize:13,lineHeight:1}}>✕</button>
    </div>
  ):(
    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
      <span style={{flex:1,fontSize:13,color:isMod?T.gold:isEmpty?"#ff6050":T.text,wordBreak:"break-word",fontFamily:"'IBM Plex Mono',monospace",...(isMod?{fontWeight:500}:{})}}>
        {value||<em style={{color:T.textMuted,fontStyle:"normal"}}>— empty —</em>}
      </span>
      <button className="mod-btn" onClick={()=>setEditing(true)}
        style={{padding:"4px 11px",background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:4,color:T.textDim,fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap"}}>
        Edit
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function CRLMPEditor() {
  useEffect(()=>{injectCSS();},[]);

  const [sheets,setSheets]=useState([]);
  const [activeSheet,setActiveSheet]=useState(ls.get(LS_SHEET)||"");
  const [caseNum,setCaseNum]=useState("");
  const [caseYear,setCaseYear]=useState(ls.get(LS_YEAR)||new Date().getFullYear().toString());
  const [searching,setSearching]=useState(false);
  const [result,setResult]=useState(null);
  const [editData,setEditData]=useState({});
  const [modCols,setModCols]=useState(new Set());
  const [saving,setSaving]=useState(false);
  const [saveMsg,setSaveMsg]=useState("");
  const [error,setError]=useState("");
  const [showWarn,setShowWarn]=useState(false);
  const [warnDismissed,setWarnDismissed]=useState(false);
  const [sheetAddresses,setSheetAddresses]=useState([]);
  const [token,setToken]=useState("");
  const [gisReady,setGisReady]=useState(false);
  const tokenRef=useRef("");
  const tokenClient=useRef(null);

  const [ocrOpen,setOcrOpen]=useState(false);
  const [ocrProcessing,setOcrProcessing]=useState(false);
  const [ocrProgress,setOcrProgress]=useState(0);
  const [ocrStatus,setOcrStatus]=useState("");
  const [ocrError,setOcrError]=useState("");
  const [ocrMode,setOcrMode]=useState("camera");
  const [capturedBlob,setCapturedBlob]=useState(null);
  const [capturedUrl,setCapturedUrl]=useState("");
  const [cropStart,setCropStart]=useState(null);
  const [cropRect,setCropRect]=useState(null);
  const [isDragging,setIsDragging]=useState(false);
  const [focusRing,setFocusRing]=useState({x:0,y:0,show:false});
  const cropImgRef=useRef(null);const videoRef=useRef(null);const canvasRef=useRef(null);
  const streamRef=useRef(null);const fileRef=useRef(null);const caseNumRef=useRef(null);const caseYearRef=useRef(null);

  useEffect(()=>{loadTesseract().catch(()=>{});},[]);

  const restoreToken=useCallback(()=>{
    const saved=ls.get(LS_TOKEN),expiry=parseInt(ls.get(LS_TOKEN_EXP)||"0",10);
    if(saved&&Date.now()<expiry){tokenRef.current=saved;setToken(saved);return true;}
    ls.del(LS_TOKEN);ls.del(LS_TOKEN_EXP);return false;
  },[]);

  useEffect(()=>{
    restoreToken();fetchSheetNames();
    const gis=document.createElement("script");gis.src="https://accounts.google.com/gsi/client";gis.async=true;gis.defer=true;
    gis.onload=()=>{
      tokenClient.current=window.google.accounts.oauth2.initTokenClient({client_id:CLIENT_ID,scope:SCOPES,prompt:"",
        callback:(resp)=>{if(resp.error){setError("Sign-in failed: "+resp.error);return;}
          const t=resp.access_token,expMs=Date.now()+(resp.expires_in-60)*1000;
          tokenRef.current=t;setToken(t);ls.set(LS_TOKEN,t);ls.set(LS_TOKEN_EXP,expMs.toString());
          setTimeout(()=>silentRefresh(),(resp.expires_in-70)*1000);},});
      setGisReady(true);if(!restoreToken())silentSignIn();
    };document.head.appendChild(gis);
  },[]);

  const silentSignIn=()=>{if(tokenClient.current)tokenClient.current.requestAccessToken({prompt:""});};
  const silentRefresh=()=>{if(tokenClient.current)tokenClient.current.requestAccessToken({prompt:""});};
  const signIn=()=>{if(!gisReady){setError("Loading…");return;}tokenClient.current.requestAccessToken({prompt:"select_account"});};
  const signOut=()=>{if(token)window.google?.accounts?.oauth2?.revoke(token,()=>{});tokenRef.current="";setToken("");ls.del(LS_TOKEN);ls.del(LS_TOKEN_EXP);};

  const fetchSheetNames=useCallback(async()=>{
    try{const r=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title&key=${API_KEY}`);
      const j=await r.json();if(j.error){setError("Sheets API: "+j.error.message);return;}
      const names=j.sheets?.map(s=>s.properties.title)||[];setSheets(names);
      const saved=ls.get(LS_SHEET);if(saved&&names.includes(saved))setActiveSheet(saved);
      else if(names.length){setActiveSheet(names[0]);ls.set(LS_SHEET,names[0]);}
    }catch{setError("Cannot load sheet tabs.");}
  },[]);

  const fetchSheetAddresses=useCallback(async(sheetName)=>{
    if(!sheetName)return;
    try{const range=encodeURIComponent(`${sheetName}!C2:C500`);
      const r=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`);
      const j=await r.json();if(j.error)return;
      const addrs=(j.values||[]).flat().filter(v=>v&&v.trim().length>4);setSheetAddresses([...new Set(addrs)]);
    }catch{}
  },[]);

  useEffect(()=>{if(activeSheet)fetchSheetAddresses(activeSheet);},[activeSheet]);

  const selectSheet=(name)=>{setActiveSheet(name);ls.set(LS_SHEET,name);setResult(null);setEditData({});setModCols(new Set());setError("");setSaveMsg("");setShowWarn(false);setWarnDismissed(false);};

  const search=async()=>{
    const q=`${caseNum.trim()}/${caseYear.trim()}`;
    if(!caseNum||!caseYear){setError("Enter case number and year.");return;}
    if(!activeSheet){setError("Select a sheet tab first.");return;}
    setSearching(true);setError("");setResult(null);setEditData({});setModCols(new Set());setSaveMsg("");setShowWarn(false);setWarnDismissed(false);
    try{const range=encodeURIComponent(`${activeSheet}!A:H`);
      const res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`);
      const json=await res.json();if(json.error)throw new Error(json.error.message);
      const rows=json.values||[];let found=null;
      for(let i=1;i<rows.length;i++){const cn=normStr(rows[i][COL.CASE]||""),qn=normStr(q);if(cn===qn&&qn.length>0){found={rowIndex:i+1,data:rows[i]};break;}}
      if(!found){setError(`"${q}" not found in sheet "${activeSheet}".`);}
      else{setResult(found);const init={};HEADERS.forEach((_,ci)=>{init[ci]=DATE_COLS.has(ci)?fmtDate(found.data[ci]||""):(found.data[ci]||"");});setEditData(init);
        if([...REQUIRED_COLS].some(ci=>!(found.data[ci]||"").toString().trim()))setShowWarn(true);}
    }catch(e){setError("Search error: "+e.message);}finally{setSearching(false);}
  };

  const save=async()=>{
    if(!result)return;
    const missing=[...REQUIRED_COLS].filter(ci=>!(editData[ci]||"").toString().trim());
    if(missing.length&&!warnDismissed){setShowWarn(true);return;}
    if(!tokenRef.current){setError("Not signed in. Click Sign In first.");return;}
    setSaving(true);setSaveMsg("");setError("");
    try{const data=[];modCols.forEach(ci=>data.push({range:`${activeSheet}!${toA1(result.rowIndex,ci)}`,values:[[editData[ci]]]}));
      if(!data.length){setSaveMsg("Nothing changed.");setSaving(false);return;}
      const res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
        {method:"POST",headers:{"Authorization":`Bearer ${tokenRef.current}`,"Content-Type":"application/json"},body:JSON.stringify({valueInputOption:"USER_ENTERED",data})});
      if(!res.ok){const err=await res.json().catch(()=>({}));if(res.status===401){silentRefresh();setError("Session refreshed. Please save again.");setSaving(false);return;}throw new Error(err.error?.message||res.statusText);}
      setSaveMsg(`✓ Saved ${data.length} field${data.length>1?"s":""} to "${activeSheet}"!`);
      setModCols(new Set());setShowWarn(false);setWarnDismissed(false);
      const addrVal=(editData[COL.ADDR]||"").trim();if(addrVal.length>8){const h=ls.getArr(LS_ADDR_HIST);ls.setArr(LS_ADDR_HIST,[addrVal,...h.filter(a=>a!==addrVal)].slice(0,20));}
      setTimeout(()=>caseNumRef.current?.focus(),150);
    }catch(e){setError("Save failed: "+e.message);}finally{setSaving(false);}
  };

  const markMod=(ci,val)=>{
    setEditData(prev=>{const updated={...prev,[ci]:val};
      const hasMissing=[...REQUIRED_COLS].some(c=>!(updated[c]||"").toString().trim());
      if(!hasMissing){setShowWarn(false);setWarnDismissed(false);}return updated;});
    setModCols(prev=>new Set([...prev,ci]));
  };

  useEffect(()=>{if(caseYear)ls.set(LS_YEAR,caseYear);},[caseYear]);

  const openCamera=async()=>{
    setOcrOpen(true);setOcrError("");setOcrProcessing(false);setOcrMode("camera");setCapturedBlob(null);setCapturedUrl("");setCropRect(null);setOcrProgress(0);setOcrStatus("");
    try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1080}}});
      streamRef.current=s;setTimeout(()=>{if(videoRef.current){videoRef.current.srcObject=s;videoRef.current.play();}},100);
    }catch{setOcrError("Camera access denied. Use Image to pick from gallery.");}
  };
  const tapFocus=(e)=>{const track=streamRef.current?.getVideoTracks?.()?.[0];if(!track)return;const caps=track.getCapabilities?.()??{};if(!caps.focusMode)return;const rect=e.currentTarget.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width,y=(e.clientY-rect.top)/rect.height;track.applyConstraints({advanced:[{focusMode:"manual",pointsOfInterest:[{x,y}]}]}).catch(()=>{});setFocusRing({x:e.clientX-rect.left,y:e.clientY-rect.top,show:true});setTimeout(()=>setFocusRing(r=>({...r,show:false})),900);};
  const capturePhoto=()=>{const v=videoRef.current,c=canvasRef.current;if(!v||!c)return;c.width=v.videoWidth;c.height=v.videoHeight;c.getContext("2d").drawImage(v,0,0);stopStream();c.toBlob(blob=>{const url=URL.createObjectURL(blob);setCapturedBlob(blob);setCapturedUrl(url);setCropRect(null);setCropStart(null);setOcrMode("crop");},"image/jpeg",.95);};
  const getImgCoords=(e,el)=>{const r=el.getBoundingClientRect();const cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;return{x:cx-r.left,y:cy-r.top};};
  const onCropStart=(e)=>{e.preventDefault();const el=cropImgRef.current;if(!el)return;const{x,y}=getImgCoords(e,el);setCropStart({x,y});setCropRect(null);setIsDragging(true);};
  const onCropMove=(e)=>{if(!isDragging||!cropStart)return;e.preventDefault();const el=cropImgRef.current;if(!el)return;const{x,y}=getImgCoords(e,el);setCropRect({x:Math.min(cropStart.x,x),y:Math.min(cropStart.y,y),w:Math.abs(x-cropStart.x),h:Math.abs(y-cropStart.y)});};
  const onCropEnd=()=>setIsDragging(false);
  const applyCrop=()=>{if(!capturedBlob)return;const img=cropImgRef.current;if(!img)return;const c=canvasRef.current;if(!c)return;const sx=img.naturalWidth/img.getBoundingClientRect().width,sy=img.naturalHeight/img.getBoundingClientRect().height;if(cropRect&&cropRect.w>10&&cropRect.h>10){c.width=cropRect.w*sx;c.height=cropRect.h*sy;const imgEl=new Image();imgEl.onload=()=>{c.getContext("2d").drawImage(imgEl,cropRect.x*sx,cropRect.y*sy,c.width,c.height,0,0,c.width,c.height);c.toBlob(b=>runOCR(b),"image/jpeg",.95);};imgEl.src=capturedUrl;}else{runOCR(capturedBlob);}};
  const stopStream=()=>{streamRef.current?.getTracks().forEach(t=>t.stop());streamRef.current=null;};
  const pickFile=(e)=>{const f=e.target.files[0];if(!f)return;e.target.value="";const url=URL.createObjectURL(f);setCapturedBlob(f);setCapturedUrl(url);setCropRect(null);setCropStart(null);setOcrOpen(true);setOcrError("");setOcrProcessing(false);setOcrMode("crop");};
  const runOCR=async(blob)=>{
    setOcrMode("processing");setOcrProcessing(true);setOcrError("");setOcrProgress(0);setOcrStatus("Pre-processing image…");
    try{setOcrStatus("Enhancing contrast & sharpness…");setOcrProgress(15);const enhanced=await preprocessImageForOCR(blob);
      setOcrStatus("Loading OCR engine…");setOcrProgress(30);const worker=await loadTesseract();
      setOcrStatus("Recognising text (English + Tamil)…");setOcrProgress(55);
      const imgUrl=URL.createObjectURL(enhanced);const{data}=await worker.recognize(imgUrl,{},{text:true});setOcrProgress(92);URL.revokeObjectURL(imgUrl);
      const cleaned=(data.text?.trim()||"").split("\n").map(l=>l.trim()).filter(l=>l.length>1).join("\n");setOcrProgress(100);
      if(cleaned){setEditData(p=>({...p,[COL.ADDR]:cleaned}));setModCols(p=>new Set([...p,COL.ADDR]));setOcrOpen(false);if(capturedUrl)URL.revokeObjectURL(capturedUrl);}
      else{setOcrError("No text detected. Crop tighter or ensure good lighting.");setOcrMode("crop");}
    }catch(e){setOcrError("OCR error: "+e.message);setOcrMode("crop");}finally{setOcrProcessing(false);setOcrProgress(0);setOcrStatus("");}
  };
  const closeOcr=()=>{stopStream();setOcrOpen(false);setOcrError("");setOcrProcessing(false);setOcrMode("camera");setOcrProgress(0);setOcrStatus("");if(capturedUrl)URL.revokeObjectURL(capturedUrl);setCapturedUrl("");setCapturedBlob(null);};

  /* ── derived ── */
  const caseQuery=caseNum&&caseYear?`${caseNum}/${caseYear}`:null;
  const isLoggedIn=!!token;
  const missingCount=result?[...REQUIRED_COLS].filter(ci=>!(editData[ci]||"").toString().trim()).length:0;

  /* ── FIELD ICONS ── */
  const fieldIcons=["#","⚖","📍","📅","📅","§","🏛","📋"];

  return(
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'IBM Plex Mono',monospace",color:T.text}}>

      {/* ── HEADER ── */}
      <header style={{background:T.bgPanel,borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:100,boxShadow:`0 4px 32px rgba(0,0,0,.6)`}}>
        <div style={{height:2,background:`linear-gradient(90deg,transparent,${T.gold},${T.crimson},${T.gold},transparent)`}}/>
        <div className="h-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 24px",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:40,height:40,borderRadius:4,background:`linear-gradient(135deg,${T.bgCard},${T.bgCardHov})`,border:`1px solid ${T.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:`0 0 16px ${T.goldGlow}`}}>⚖</div>
            <div>
              <h1 style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:T.gold,letterSpacing:"0.1em",lineHeight:1}}>CRLMP CASE EDITOR</h1>
              <p style={{fontSize:9,color:T.textDim,letterSpacing:"0.2em",marginTop:4,textTransform:"uppercase"}}>Court Record &amp; Legal Management Portal{activeSheet?` · ${activeSheet}`:""}</p>
            </div>
          </div>
          <div className="auth-area" style={{display:"flex",alignItems:"center",gap:10}}>
            {isLoggedIn?(
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",background:"rgba(39,174,96,.1)",border:"1px solid rgba(39,174,96,.25)",borderRadius:4}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:T.green,display:"inline-block",boxShadow:`0 0 6px ${T.green}`}}/>
                  <span style={{fontSize:10,color:T.green,letterSpacing:"0.1em"}}>AUTHENTICATED</span>
                </div>
                <button onClick={signOut} style={{padding:"5px 14px",background:"transparent",border:`1px solid ${T.crimsonDim}`,color:"#ff8070",borderRadius:4,fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.08em"}}>SIGN OUT</button>
              </div>
            ):(
              <button className="sign-btn" onClick={signIn} disabled={!gisReady}
                style={{padding:"8px 20px",background:"transparent",border:`1px solid ${T.goldDim}`,color:T.gold,borderRadius:4,fontSize:11,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.1em",transition:"all .2s"}}>
                {gisReady?"🔐 SIGN IN WITH GOOGLE":"⏳ LOADING…"}
              </button>
            )}
          </div>
        </div>
      </header>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"24px 20px",display:"flex",flexDirection:"column",gap:20}}>

        {/* ── SHEET TABS ── */}
        <section style={{background:T.bgPanel,border:`1px solid ${T.border}`,borderRadius:8,padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{width:3,height:14,background:T.gold,borderRadius:1}}/>
            <span style={{fontSize:9,color:T.textDim,letterSpacing:"0.2em",textTransform:"uppercase"}}>Sheet Tab</span>
          </div>
          <div className="tab-bar" style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {sheets.length===0&&<span style={{fontSize:12,color:T.textMuted}}>Loading tabs…</span>}
            {sheets.map(s=>(
              <button key={s} className={"tab-btn"+(activeSheet===s?" active":"")}
                style={{padding:"7px 18px",borderRadius:4,border:`1px solid ${activeSheet===s?T.gold:T.border}`,background:activeSheet===s?T.goldGlow:T.bgCard,color:activeSheet===s?T.gold:T.textDim,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:activeSheet===s?600:400,letterSpacing:"0.08em"}}
                onClick={()=>selectSheet(s)}>
                {activeSheet===s&&<span style={{marginRight:6,color:T.gold}}>✓</span>}{s}
              </button>
            ))}
          </div>
        </section>

        {/* ── SEARCH ── */}
        <section style={{background:T.bgPanel,border:`1px solid ${T.border}`,borderRadius:8,padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:3,height:14,background:T.gold,borderRadius:1}}/>
            <span style={{fontSize:9,color:T.textDim,letterSpacing:"0.2em",textTransform:"uppercase"}}>Search Case</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:14,alignItems:"flex-end"}}>
            <div className="search-row" style={{display:"flex",alignItems:"flex-end",gap:10,flex:1,flexWrap:"wrap"}}>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{fontSize:9,color:T.textDim,letterSpacing:"0.15em",textTransform:"uppercase"}}>CRLMP No.</label>
                <input ref={caseNumRef} className="inp-case"
                  style={{padding:"10px 14px",background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,fontSize:16,fontFamily:"'IBM Plex Mono',monospace",width:150}}
                  inputMode="numeric" pattern="[0-9]*" enterKeyHint="next"
                  placeholder="2956" value={caseNum}
                  onChange={e=>setCaseNum(e.target.value.replace(/\D/g,""))}
                  onKeyDown={e=>{if(e.key==="Enter")caseYearRef.current?.focus();}}/>
              </div>
              <div style={{fontSize:22,color:T.goldDim,marginBottom:6,fontWeight:300}}>/</div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{fontSize:9,color:T.textDim,letterSpacing:"0.15em",textTransform:"uppercase"}}>Year <span style={{color:T.goldDim}}>(saved)</span></label>
                <input ref={caseYearRef} className="inp-year"
                  style={{padding:"10px 14px",background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:5,color:T.text,fontSize:16,fontFamily:"'IBM Plex Mono',monospace",width:96}}
                  inputMode="numeric" pattern="[0-9]*" enterKeyHint="search"
                  placeholder="2024" maxLength={4} value={caseYear}
                  onChange={e=>setCaseYear(e.target.value.replace(/\D/g,""))}
                  onKeyDown={e=>{if(e.key==="Enter")search();}}/>
              </div>
              {caseQuery&&<div style={{padding:"10px 16px",background:T.goldGlow,border:`1px solid ${T.goldDim}`,borderRadius:5,color:T.gold,fontSize:17,fontWeight:600,fontFamily:"'Cinzel',serif",alignSelf:"flex-end",letterSpacing:"0.1em"}}>{caseQuery}</div>}
            </div>
            <div className="search-btn-wrap">
              <button className="search-btn" onClick={search} disabled={searching}
                style={{padding:"11px 32px",background:`linear-gradient(135deg,${T.gold},${T.goldDim})`,border:"none",borderRadius:5,color:T.bg,fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.1em",whiteSpace:"nowrap",transition:"all .2s",opacity:searching?.7:1}}>
                {searching&&<span style={{width:13,height:13,border:"2px solid rgba(0,0,0,.3)",borderTopColor:T.bg,borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"}}/>}
                {searching?"SEARCHING…":"🔍 SEARCH"}
              </button>
            </div>
          </div>
        </section>

        {error&&<div style={{padding:"12px 18px",background:T.crimsonGlow,border:`1px solid ${T.crimsonDim}`,borderLeft:`3px solid ${T.crimson}`,borderRadius:6,color:"#ff8070",fontSize:12,fontFamily:"'IBM Plex Mono',monospace"}}>⚠ {error}</div>}
        {saveMsg&&<div className="ok-box" style={{padding:"12px 18px",background:"rgba(39,174,96,.1)",border:"1px solid rgba(39,174,96,.3)",borderLeft:`3px solid ${T.green}`,borderRadius:6,color:"#6eff9a",fontSize:12,fontFamily:"'IBM Plex Mono',monospace"}}>{saveMsg}</div>}

        {result&&showWarn&&!warnDismissed&&<MissingFieldBanner editData={editData} onDismiss={()=>{setWarnDismissed(true);setShowWarn(false);}}/>}

        {result&&(
          <section style={{background:T.bgPanel,border:`1px solid ${T.gold}`,borderRadius:8,overflow:"hidden",boxShadow:`0 0 40px ${T.goldGlow}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",padding:"14px 20px",borderBottom:`1px solid ${T.border}`,background:`linear-gradient(90deg,${T.goldGlow},transparent)`,gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <span style={{padding:"3px 10px",background:T.goldGlow,border:`1px solid ${T.gold}`,borderRadius:3,fontSize:9,color:T.gold,letterSpacing:"0.15em",fontWeight:600}}>CASE FOUND</span>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:T.text,letterSpacing:"0.08em"}}>{editData[COL.CASE]}</span>
                {missingCount>0&&<span style={{display:"flex",alignItems:"center",padding:"3px 10px",background:T.crimsonGlow,border:`1px solid ${T.crimsonDim}`,borderRadius:3,fontSize:9,color:"#ff8070"}}><span className="miss-dot"/>{missingCount} empty</span>}
              </div>
              <span style={{fontSize:10,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace"}}>
                <span style={{color:T.textMuted}}>SHEET</span> {activeSheet} <span style={{color:T.textMuted,marginLeft:8}}>ROW</span> {result.rowIndex}
              </span>
            </div>

            <div className="grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))"}}>
              {HEADERS.map((hdr,ci)=>{
                const isMod=modCols.has(ci),isDate=DATE_COLS.has(ci),isAddr=ci===COL.ADDR,isRO=READONLY.has(ci);
                const isEmpty=REQUIRED_COLS.has(ci)&&!(editData[ci]||"").toString().trim();
                return(
                  <div key={ci} className={`field-card${isMod?" modified":""}${isEmpty?" empty":""}`}
                    style={{padding:"16px 18px",background:T.bgCard,borderRight:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,animationDelay:`${ci*30}ms`,position:"relative"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:isEmpty?`linear-gradient(90deg,${T.crimson},transparent)`:isMod?`linear-gradient(90deg,${T.gold},transparent)`:"transparent",transition:"background .3s"}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <span style={{fontSize:12,opacity:.5}}>{fieldIcons[ci]}</span>
                        <span style={{fontSize:9,color:isEmpty?T.crimson:isMod?T.gold:T.textDim,letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"'IBM Plex Mono',monospace",display:"flex",alignItems:"center"}}>
                          {isEmpty&&<span className="miss-dot"/>}{hdr}
                        </span>
                      </div>
                      <div style={{display:"flex",gap:4}}>
                        {isMod&&<span style={{fontSize:8,padding:"2px 6px",background:T.goldGlow,border:`1px solid ${T.goldDim}`,color:T.gold,borderRadius:2,letterSpacing:"0.1em"}}>MOD</span>}
                        {isEmpty&&<span style={{fontSize:8,padding:"2px 6px",background:T.crimsonGlow,border:`1px solid ${T.crimsonDim}`,color:"#ff8070",borderRadius:2,letterSpacing:"0.1em"}}>EMPTY</span>}
                      </div>
                    </div>
                    {isAddr?(<AddressField value={editData[ci]||""} onChange={v=>markMod(ci,v)} onCamera={openCamera} onFile={()=>fileRef.current?.click()} sheetAddresses={sheetAddresses}/>)
                      :isDate?(<DateField value={editData[ci]||""} isMod={isMod} onChange={v=>markMod(ci,v)}/>)
                      :isRO?(<div style={{fontSize:14,color:T.textDim,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.05em"}}>{editData[ci]||"—"}</div>)
                      :(<EditField value={editData[ci]||""} isMod={isMod} isEmpty={isEmpty} onChange={v=>markMod(ci,v)}/>)}
                  </div>
                );
              })}
            </div>

            <div className="save-bar" style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:16,padding:"14px 20px",borderTop:`1px solid ${T.border}`,background:`linear-gradient(90deg,transparent,${T.bgCard})`,flexWrap:"wrap"}}>
              {modCols.size>0&&<span style={{fontSize:11,color:T.gold,fontFamily:"'IBM Plex Mono',monospace"}}>{modCols.size} field{modCols.size>1?"s":""} modified</span>}
              {missingCount>0&&!warnDismissed&&<span style={{fontSize:11,color:"#ff8070"}}>⚠ {missingCount} empty</span>}
              <button className="save-btn" onClick={save} disabled={saving||modCols.size===0}
                style={{padding:"11px 36px",background:saving||modCols.size===0?T.bgCard:`linear-gradient(135deg,${T.gold},${T.goldDim})`,border:`1px solid ${saving||modCols.size===0?T.border:T.gold}`,borderRadius:5,color:saving||modCols.size===0?T.textDim:T.bg,fontWeight:700,fontSize:13,cursor:saving||modCols.size===0?"not-allowed":"pointer",fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.1em",display:"flex",alignItems:"center",gap:8,transition:"all .2s"}}>
                {saving&&<span style={{width:13,height:13,border:"2px solid rgba(0,0,0,.3)",borderTopColor:T.bg,borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"}}/>}
                {saving?"SAVING…":"💾 SAVE TO SHEET"}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* ── OCR OVERLAY ── */}
      {ocrOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:T.bgPanel,borderRadius:12,width:"min(92vw,440px)",overflow:"hidden",border:`1px solid ${T.border}`,boxShadow:`0 32px 80px rgba(0,0,0,.9),0 0 40px ${T.goldGlow}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",background:`linear-gradient(90deg,${T.goldGlow},transparent)`,borderBottom:`1px solid ${T.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,color:T.gold,letterSpacing:"0.08em"}}>
                  {ocrMode==="crop"?"✂ CROP & SCAN":ocrMode==="processing"?"◉ SCANNING":"📷 SCAN ADDRESS"}
                </span>
                <span className="tess-badge">FREE · TESSERACT</span>
              </div>
              <button onClick={closeOcr} style={{background:"transparent",border:"none",color:T.textDim,fontSize:18,cursor:"pointer",lineHeight:1,padding:"0 4px"}}>✕</button>
            </div>

            {ocrMode==="processing"?(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 32px",gap:14}}>
                <div style={{width:48,height:48,border:`3px solid ${T.border}`,borderTopColor:T.gold,borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
                <p style={{fontSize:12,color:T.textDim,letterSpacing:"0.1em",textAlign:"center",fontFamily:"'IBM Plex Mono',monospace"}}>{ocrStatus||"Processing…"}</p>
                <div style={{width:"85%"}}>
                  <div className="ocr-progress-bar"><div className="ocr-progress-fill" style={{width:ocrProgress>0?`${ocrProgress}%`:"20%",animation:ocrProgress<5?"pulse 1.5s ease-in-out infinite":"none"}}/></div>
                  <p style={{fontSize:9,color:T.textMuted,textAlign:"center",marginTop:6,letterSpacing:"0.1em"}}>CONTRAST BOOST · SHARPEN · OCR · IN-BROWSER</p>
                </div>
              </div>
            ):ocrMode==="crop"&&capturedUrl?(
              <div style={{position:"relative",userSelect:"none"}}>
                <p style={{fontSize:10,color:T.textDim,textAlign:"center",padding:"8px 0 4px",background:T.bgCard,letterSpacing:"0.08em",borderBottom:`1px solid ${T.border}`}}>DRAG TO SELECT REGION · LEAVE EMPTY FOR FULL</p>
                <div style={{position:"relative",lineHeight:0,touchAction:"none"}} onMouseDown={onCropStart} onMouseMove={onCropMove} onMouseUp={onCropEnd} onTouchStart={onCropStart} onTouchMove={onCropMove} onTouchEnd={onCropEnd}>
                  <img ref={cropImgRef} src={capturedUrl} alt="captured" style={{width:"100%",maxHeight:300,objectFit:"contain",display:"block",cursor:"crosshair"}} draggable={false}/>
                  {cropRect&&cropRect.w>4&&cropRect.h>4&&<div style={{position:"absolute",left:cropRect.x,top:cropRect.y,width:cropRect.w,height:cropRect.h,border:`1.5px solid ${T.gold}`,background:T.goldGlow,pointerEvents:"none"}}/>}
                </div>
                {ocrError&&<p style={{color:"#ff8070",fontSize:11,padding:"7px 14px",background:T.crimsonGlow,textAlign:"center"}}>{ocrError}</p>}
                <div style={{display:"flex",gap:8,padding:"12px 14px",background:T.bgCard,borderTop:`1px solid ${T.border}`}}>
                  <button onClick={openCamera} style={{flex:1,padding:10,background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:5,color:T.textDim,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>🔄 Retake</button>
                  <button onClick={()=>fileRef.current?.click()} style={{flex:1,padding:10,background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:5,color:T.textDim,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>🖼 Gallery</button>
                  <button onClick={applyCrop} style={{flex:2,padding:10,background:`linear-gradient(135deg,${T.gold},${T.goldDim})`,border:"none",borderRadius:5,color:T.bg,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
                    {cropRect&&cropRect.w>10?"✂ CROP & SCAN":"◉ SCAN FULL"}
                  </button>
                </div>
                <canvas ref={canvasRef} style={{display:"none"}}/>
              </div>
            ):(
              <div style={{position:"relative"}}>
                <div style={{position:"relative",lineHeight:0}} onClick={tapFocus}>
                  <video ref={videoRef} autoPlay playsInline muted style={{width:"100%",maxHeight:280,objectFit:"cover",display:"block"}}/>
                  {focusRing.show&&<div style={{position:"absolute",left:focusRing.x-22,top:focusRing.y-22,width:44,height:44,border:`1.5px solid ${T.gold}`,borderRadius:"50%",pointerEvents:"none"}}/>}
                  <p style={{position:"absolute",bottom:8,left:0,right:0,textAlign:"center",fontSize:9,color:"rgba(255,255,255,.5)",letterSpacing:"0.15em"}}>TAP TO FOCUS · HOLD STEADY</p>
                </div>
                <canvas ref={canvasRef} style={{display:"none"}}/>
                {ocrError&&<p style={{color:"#ff8070",fontSize:11,padding:"7px 14px",background:T.crimsonGlow,textAlign:"center"}}>{ocrError}</p>}
                <div style={{display:"flex",gap:10,padding:"12px 14px",background:T.bgCard,borderTop:`1px solid ${T.border}`}}>
                  <button onClick={()=>fileRef.current?.click()} style={{flex:1,padding:11,background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:5,color:T.textDim,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>🖼 Gallery</button>
                  <button onClick={capturePhoto} style={{flex:2,padding:11,background:`linear-gradient(135deg,${T.gold},${T.goldDim})`,border:"none",borderRadius:5,color:T.bg,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.06em"}}>📸 CAPTURE</button>
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
