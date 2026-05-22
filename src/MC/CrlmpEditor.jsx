import { useState, useEffect, useCallback, useRef } from "react";

/* ─── GOOGLE CONFIG ──────────────────────────────────────────────────────── */
const SHEET_ID  = "1yAwnadKSbr4A3MJCQJVYVNnoiGazEV5t";
const API_KEY   = "AIzaSyAm8cnPYK9-2L7bl81osszkW_UfldW356g";
const CLIENT_ID = "879226759032-dp5gjt6cemobr34kcmi1lg638e37f36q.apps.googleusercontent.com";
const SCOPES    = "https://www.googleapis.com/auth/spreadsheets";

/* ─── COLUMN MAP (0-based) ───────────────────────────────────────────────── */
const COL = { SR:0, CASE:1, ADDR:2, FIR_DATE:3, NEXT_DATE:4, ACT:5, PS:6, FIR_NO:7 };
const HEADERS   = ["Sr.No","Case No.","Address","FIR Date","Next Date","Act Section","Police Station","FIR No."];
const DATE_COLS = new Set([COL.FIR_DATE, COL.NEXT_DATE]);
const READONLY  = new Set([COL.SR, COL.CASE]);

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const toA1    = (row,col) => `${String.fromCharCode(65+col)}${row}`;
const normStr = (s="")   => s.toString().trim().toLowerCase().replace(/\s+/g,"");

/* Format raw value → dd-mm-yyyy display */
function fmtDate(raw=""){
  if(!raw) return "";
  // already dd-mm-yyyy
  if(/^\d{2}-\d{2}-\d{4}$/.test(raw.trim())) return raw.trim();
  // dd/mm/yyyy or dd.mm.yyyy
  const m = raw.trim().match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})$/);
  if(m) return `${m[1].padStart(2,"0")}-${m[2].padStart(2,"0")}-${m[3].padStart(4,"0")}`;
  return raw;
}

/* Inject global CSS once */
const INJECTED = { done: false };
function injectGlobalCSS(){
  if(INJECTED.done) return;
  INJECTED.done = true;
  const s = document.createElement("style");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#ffffff;font-family:'JetBrains Mono',monospace}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 #C9A84C44}50%{box-shadow:0 0 0 6px #C9A84C00}}
    .tab-btn:hover{background:#f5f0e8!important;color:#8B5E0A!important}
    .mod-btn:hover{background:#fff8ec!important;border-color:#C9A84C!important;color:#8B5E0A!important}
    .save-btn:hover{opacity:.88}
    .sign-btn:hover{background:#fff8ec!important}
    input[type="text"]:focus,input[type="number"]:focus,textarea:focus{
      outline:none;border-color:#C9A84C!important;box-shadow:0 0 0 3px #C9A84C22!important
    }
    .field-card{animation:fadeIn .25s ease both}
    .cam-btn:hover{background:#e8f4ff!important;border-color:#3B6BF5!important}
    .ocr-overlay{position:fixed;inset:0;background:#000000cc;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function CrlmpEditor(){
  injectGlobalCSS();

  const [sheets,setSheets]         = useState([]);
  const [activeSheet,setActiveSheet] = useState(()=>{
    try{return localStorage.getItem("crlmp_sheet")||"";}catch{return "";}
  });

  const [caseNum,setCaseNum]   = useState("");
  const [caseYear,setCaseYear] = useState(()=>{
    try{return localStorage.getItem("crlmp_year")||new Date().getFullYear().toString();}catch{return "";}
  });
  const [searching,setSearching] = useState(false);
  const [result,setResult]       = useState(null);
  const [editData,setEditData]   = useState({});
  const [modCols,setModCols]     = useState(new Set());
  const [saving,setSaving]       = useState(false);
  const [saveMsg,setSaveMsg]     = useState("");
  const [error,setError]         = useState("");
  const [token,setToken]         = useState("");

  /* Camera / OCR state */
  const [ocrOpen,setOcrOpen]     = useState(false);
  const [ocrSrc,setOcrSrc]       = useState("camera"); // "camera"|"file"
  const [ocrProcessing,setOcrProcessing] = useState(false);
  const [ocrError,setOcrError]   = useState("");
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const streamRef  = useRef(null);
  const fileRef    = useRef(null);

  /* Focus refs */
  const caseNumRef  = useRef(null);
  const caseYearRef = useRef(null);
  const tokenRef    = useRef("");

  /* ── Load gapi ─────────────────────────────────────────────────────────── */
  useEffect(()=>{
    const s = document.createElement("script");
    s.src   = "https://apis.google.com/js/api.js";
    s.onload= ()=>{
      window.gapi.load("client:auth2",async()=>{
        try{
          await window.gapi.client.init({
            apiKey:API_KEY, clientId:CLIENT_ID, scope:SCOPES,
            discoveryDocs:["https://sheets.googleapis.com/$discovery/rest?version=v4"]
          });
        }catch(e){}
        fetchSheetNames();
      });
    };
    document.head.appendChild(s);
  },[]);

  /* ── Fetch sheet tabs ──────────────────────────────────────────────────── */
  const fetchSheetNames = useCallback(async()=>{
    try{
      const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title&key=${API_KEY}`);
      const j = await r.json();
      const names = j.sheets?.map(s=>s.properties.title)||[];
      setSheets(names);
      setActiveSheet(prev=>{
        const saved = localStorage.getItem("crlmp_sheet");
        return (saved&&names.includes(saved))?saved:(names[0]||"");
      });
    }catch(e){ setError("Cannot load sheet tabs – check Sheet ID & API Key."); }
  },[]);

  const selectSheet=(name)=>{
    setActiveSheet(name);
    localStorage.setItem("crlmp_sheet",name);
    setResult(null); setEditData({}); setModCols(new Set()); setError(""); setSaveMsg("");
  };

  /* ── Sign-in ───────────────────────────────────────────────────────────── */
  const signIn=async()=>{
    try{
      const user = await window.gapi.auth2.getAuthInstance().signIn();
      const t    = user.getAuthResponse().access_token;
      tokenRef.current=t; setToken(t);
    }catch(e){ setError("Google sign-in failed."); }
  };

  /* ── Search ────────────────────────────────────────────────────────────── */
  const search=async()=>{
    const q=`${caseNum.trim()}/${caseYear.trim()}`;
    if(!caseNum||!caseYear){setError("Enter case number and year.");return;}
    if(!activeSheet){setError("Select a sheet tab first.");return;}
    setSearching(true); setError(""); setResult(null); setEditData({}); setModCols(new Set()); setSaveMsg("");
    try{
      const range=encodeURIComponent(`${activeSheet}!A:H`);
      const res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`);
      const json=await res.json();
      const rows=json.values||[];
      let found=null;
      for(let i=1;i<rows.length;i++){
        if(normStr(rows[i][COL.CASE]||"")=== normStr(q)){found={rowIndex:i+1,data:rows[i]};break;}
      }
      if(!found){ setError(`"${q}" not found in sheet "${activeSheet}".`); }
      else{
        setResult(found);
        const init={};
        HEADERS.forEach((_,ci)=>{ init[ci]=DATE_COLS.has(ci)?fmtDate(found.data[ci]||""):(found.data[ci]||""); });
        setEditData(init);
      }
    }catch(e){ setError("Network error. Check API Key."); }
    finally{ setSearching(false); }
  };

  /* ── Save ──────────────────────────────────────────────────────────────── */
  const save=async()=>{
    if(!result) return;
    if(!tokenRef.current){ setError("Sign in with Google to save."); return; }
    setSaving(true); setSaveMsg(""); setError("");
    try{
      const data=[];
      // address always
      data.push({range:`${activeSheet}!${toA1(result.rowIndex,COL.ADDR)}`,values:[[editData[COL.ADDR]]]});
      modCols.forEach(ci=>{
        if(ci!==COL.ADDR) data.push({range:`${activeSheet}!${toA1(result.rowIndex,ci)}`,values:[[editData[ci]]]});
      });
      if(!data.length){setSaveMsg("Nothing changed.");setSaving(false);return;}
      const res=await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
        {method:"POST",
         headers:{"Authorization":`Bearer ${tokenRef.current}`,"Content-Type":"application/json"},
         body:JSON.stringify({valueInputOption:"USER_ENTERED",data})}
      );
      if(!res.ok) throw new Error(await res.text());
      setSaveMsg(`✓ Saved ${data.length} field${data.length>1?"s":""} to "${activeSheet}"!`);
      setModCols(new Set());
      // auto-focus caseNum after save
      setTimeout(()=>caseNumRef.current?.focus(),200);
    }catch(e){ setError("Save failed: "+e.message); }
    finally{ setSaving(false); }
  };

  const markMod=(ci,val)=>{
    setEditData(p=>({...p,[ci]:val}));
    setModCols(p=>new Set([...p,ci]));
  };

  /* ── Year persistence ──────────────────────────────────────────────────── */
  useEffect(()=>{
    if(caseYear) localStorage.setItem("crlmp_year",caseYear);
  },[caseYear]);

  /* ── Camera / OCR helpers ──────────────────────────────────────────────── */
  const openCamera=async()=>{
    setOcrSrc("camera"); setOcrOpen(true); setOcrError("");
    try{
      const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
      streamRef.current=s;
      setTimeout(()=>{ if(videoRef.current){ videoRef.current.srcObject=s; videoRef.current.play(); }},100);
    }catch(e){ setOcrError("Camera access denied. Use file upload instead."); }
  };

  const capturePhoto=()=>{
    const v=videoRef.current; const c=canvasRef.current;
    if(!v||!c) return;
    c.width=v.videoWidth; c.height=v.videoHeight;
    c.getContext("2d").drawImage(v,0,0);
    c.toBlob(blob=>runOCR(blob),"image/jpeg",0.95);
    stopStream();
  };

  const stopStream=()=>{
    streamRef.current?.getTracks().forEach(t=>t.stop());
    streamRef.current=null;
  };

  const pickFile=(e)=>{
    const f=e.target.files[0];
    if(!f) return;
    setOcrSrc("file"); setOcrError("");
    runOCR(f);
  };

  const runOCR=async(blob)=>{
    setOcrProcessing(true); setOcrError("");
    try{
      /* Use Anthropic Claude vision via claude.ai artifact API */
      const reader=new FileReader();
      reader.onload=async(ev)=>{
        const b64=ev.target.result.split(",")[1];
        try{
          const res=await fetch("https://api.anthropic.com/v1/messages",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              model:"claude-sonnet-4-20250514",
              max_tokens:500,
              messages:[{
                role:"user",
                content:[
                  {type:"image",source:{type:"base64",media_type:"image/jpeg",data:b64}},
                  {type:"text",text:"Extract ALL text from this image. Return ONLY the raw text, no explanation, no formatting, exactly as it appears. This is an address or document field."}
                ]
              }]
            })
          });
          const j=await res.json();
          const txt=j.content?.[0]?.text||"";
          if(txt){
            setEditData(p=>({...p,[COL.ADDR]:txt.trim()}));
            setModCols(p=>new Set([...p,COL.ADDR]));
            setOcrOpen(false);
          } else { setOcrError("No text detected. Try again with clearer image."); }
        }catch(e){ setOcrError("OCR failed: "+e.message); }
        finally{ setOcrProcessing(false); }
      };
      reader.readAsDataURL(blob);
    }catch(e){ setOcrProcessing(false); setOcrError("Error reading file."); }
  };

  const closeOcr=()=>{ stopStream(); setOcrOpen(false); setOcrError(""); setOcrProcessing(false); };

  /* ═══════════════ RENDER ═══════════════════════════════════════════════ */
  return(
    <div style={S.root}>

      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={S.headerStripe}/>
        <div style={S.headerInner}>
          <div>
            <h1 style={S.title}>⚖ CRLMP Case Editor</h1>
            <p style={S.sub}>Court Record &amp; Legal Management Portal · {activeSheet||"—"}</p>
          </div>
          <div>
            {token
              ? <span style={S.signedIn}>● Signed In</span>
              : <button className="sign-btn" style={S.signBtn} onClick={signIn}>🔐 Sign In with Google</button>}
          </div>
        </div>
      </header>

      <div style={S.body}>

        {/* ── SHEET TABS ── */}
        <section style={S.section}>
          <p style={S.sectionLabel}>SELECT SHEET TAB</p>
          <div style={S.tabBar}>
            {sheets.length===0 && <span style={S.muted}>Loading tabs…</span>}
            {sheets.map(s=>(
              <button key={s} className="tab-btn"
                style={{...S.tab,...(activeSheet===s?S.tabActive:{})}}
                onClick={()=>selectSheet(s)}>
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* ── SEARCH ── */}
        <section style={S.section}>
          <p style={S.sectionLabel}>SEARCH CASE</p>
          <div style={S.searchCard}>
            <div style={S.searchRow}>

              <div style={S.fGroup}>
                <label style={S.lbl}>CRLMP No.</label>
                <input ref={caseNumRef} style={S.inp}
                  inputMode="numeric" pattern="[0-9]*"
                  placeholder="e.g. 2956"
                  value={caseNum}
                  onChange={e=>setCaseNum(e.target.value.replace(/\D/g,""))}
                  onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Next") caseYearRef.current?.focus(); }}
                />
              </div>

              <div style={S.slash}>/</div>

              <div style={S.fGroup}>
                <label style={S.lbl}>Year</label>
                <input ref={caseYearRef} style={{...S.inp,width:90}}
                  inputMode="numeric" pattern="[0-9]*"
                  placeholder="2024" maxLength={4}
                  value={caseYear}
                  onChange={e=>setCaseYear(e.target.value.replace(/\D/g,""))}
                  onKeyDown={e=>{ if(e.key==="Enter") search(); }}
                />
              </div>

              {caseNum&&caseYear&&(
                <div style={S.preview}>{caseNum}/{caseYear}</div>
              )}
            </div>

            <button style={S.searchBtn} onClick={search} disabled={searching}>
              {searching&&<span style={S.spin}/>}
              {searching?"Searching…":"🔍 Search"}
            </button>
          </div>
        </section>

        {/* ── MESSAGES ── */}
        {error   && <div style={S.errBox}>{error}</div>}
        {saveMsg && <div style={S.okBox}>{saveMsg}</div>}

        {/* ── RESULT ── */}
        {result&&(
          <section style={{...S.section,padding:0,overflow:"hidden",border:`1.5px solid #C9A84C`}}>

            {/* result header */}
            <div style={S.resHead}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <span style={S.foundBadge}>CASE FOUND</span>
                <span style={S.foundCase}>{editData[COL.CASE]}</span>
              </div>
              <span style={S.resMeta}>Sheet: <b>{activeSheet}</b> · Row <b>{result.rowIndex}</b></span>
            </div>

            {/* fields */}
            <div style={S.fieldsGrid}>
              {HEADERS.map((hdr,ci)=>{
                const isMod  = modCols.has(ci);
                const isDate = DATE_COLS.has(ci);
                const isAddr = ci===COL.ADDR;
                const isRO   = READONLY.has(ci);
                return(
                  <div key={ci} className="field-card"
                    style={{...S.fCard,...(isMod?S.fCardMod:{}),animationDelay:`${ci*30}ms`}}>
                    <div style={S.fTop}>
                      <span style={S.fLbl}>{hdr}</span>
                      {isMod&&<span style={S.modBadge}>MODIFIED</span>}
                    </div>

                    {isAddr ? (
                      <AddressField
                        value={editData[ci]||""}
                        onChange={v=>markMod(ci,v)}
                        onCameraClick={openCamera}
                        onFileClick={()=>fileRef.current?.click()}
                      />
                    ) : isDate ? (
                      <DateField
                        value={editData[ci]||""}
                        isMod={isMod}
                        onChange={v=>markMod(ci,v)}
                      />
                    ) : isRO ? (
                      <div style={S.roVal}>{editData[ci]||"—"}</div>
                    ) : (
                      <EditField
                        value={editData[ci]||""}
                        isMod={isMod}
                        onChange={v=>markMod(ci,v)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* save bar */}
            <div style={S.saveBar}>
              {modCols.size>0&&(
                <span style={S.pendingNote}>{modCols.size} field{modCols.size>1?"s":""} pending</span>
              )}
              <button style={{...S.saveBtn,...(saving?{opacity:.6}:{})}} className="save-btn"
                onClick={save} disabled={saving}>
                {saving?"Saving…":"💾 Save to Sheet"}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* ── OCR OVERLAY ── */}
      {ocrOpen&&(
        <div className="ocr-overlay">
          <div style={S.ocrCard}>
            <div style={S.ocrHead}>
              <span style={S.ocrTitle}>📷 Scan Address</span>
              <button style={S.ocrClose} onClick={closeOcr}>✕</button>
            </div>

            {ocrProcessing?(
              <div style={S.ocrCenter}>
                <div style={S.bigSpin}/>
                <p style={S.ocrMsg}>Extracting text…</p>
              </div>
            ):(
              <>
                <video ref={videoRef} style={S.video} autoPlay playsInline muted/>
                <canvas ref={canvasRef} style={{display:"none"}}/>
                {ocrError&&<p style={S.ocrErr}>{ocrError}</p>}
                <div style={S.ocrBtns}>
                  <button style={S.capBtn} onClick={capturePhoto}>📸 Capture</button>
                  <button style={S.fileBtn} onClick={()=>fileRef.current?.click()}>🖼 Gallery</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* hidden file input */}
      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
        onChange={e=>{ setOcrOpen(true); pickFile(e); e.target.value=""; }}/>

    </div>
  );
}

/* ─── ADDRESS FIELD ──────────────────────────────────────────────────────── */
function AddressField({value,onChange,onCameraClick,onFileClick}){
  return(
    <div>
      <textarea
        style={S.addrArea}
        value={value}
        onChange={e=>onChange(e.target.value)}
        rows={3}
        placeholder="Type or scan address…"
      />
      <div style={{display:"flex",gap:8,marginTop:6}}>
        <button className="cam-btn" style={S.camBtn} onClick={onCameraClick}>📷 Camera</button>
        <button className="cam-btn" style={S.camBtn} onClick={onFileClick}>🖼 Image</button>
      </div>
    </div>
  );
}

/* ─── DATE FIELD ─────────────────────────────────────────────────────────── */
function DateField({value,isMod,onChange}){
  const [editing,setEditing] = useState(false);
  const [draft,setDraft]     = useState(value);
  const ref = useRef();

  useEffect(()=>setDraft(value),[value]);
  useEffect(()=>{ if(editing) ref.current?.focus(); },[editing]);

  /* Format as user types: auto-insert dashes */
  const handleChange=(e)=>{
    let v = e.target.value.replace(/[^\d]/g,"");
    if(v.length>2)  v = v.slice(0,2)+"-"+v.slice(2);
    if(v.length>5)  v = v.slice(0,5)+"-"+v.slice(5);
    if(v.length>10) v = v.slice(0,10);
    setDraft(v);
  };

  const commit=()=>{ onChange(draft); setEditing(false); };
  const cancel=()=>{ setDraft(value); setEditing(false); };

  return editing?(
    <div style={{display:"flex",gap:6,alignItems:"center"}}>
      <input ref={ref}
        style={{...S.inpInline,...(isMod?{borderColor:"#C9A84C"}:{})}}
        value={draft}
        onChange={handleChange}
        inputMode="numeric"
        pattern="[0-9\-]*"
        placeholder="dd-mm-yyyy"
        maxLength={10}
        onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Next") commit(); if(e.key==="Escape") cancel(); }}
      />
      <button style={S.ok} onClick={commit}>✓</button>
      <button style={S.cancel} onClick={cancel}>✕</button>
    </div>
  ):(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <span style={{...S.dispVal,...(isMod?{color:"#C9A84C",fontWeight:700}:{})}}>
        {value||<em style={{opacity:.4}}>—</em>}
      </span>
      <button className="mod-btn" style={S.modBtn} onClick={()=>setEditing(true)}>Modify</button>
    </div>
  );
}

/* ─── GENERIC EDIT FIELD ─────────────────────────────────────────────────── */
function EditField({value,isMod,onChange}){
  const [editing,setEditing] = useState(false);
  const [draft,setDraft]     = useState(value);
  const ref = useRef();

  useEffect(()=>setDraft(value),[value]);
  useEffect(()=>{ if(editing) ref.current?.focus(); },[editing]);

  const commit=()=>{ onChange(draft); setEditing(false); };
  const cancel=()=>{ setDraft(value); setEditing(false); };

  return editing?(
    <div style={{display:"flex",gap:6,alignItems:"center"}}>
      <input ref={ref}
        style={{...S.inpInline,...(isMod?{borderColor:"#C9A84C"}:{})}}
        value={draft}
        onChange={e=>setDraft(e.target.value)}
        onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Next") commit(); if(e.key==="Escape") cancel(); }}
      />
      <button style={S.ok} onClick={commit}>✓</button>
      <button style={S.cancel} onClick={cancel}>✕</button>
    </div>
  ):(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <span style={{...S.dispVal,...(isMod?{color:"#C9A84C",fontWeight:700}:{})}}>
        {value||<em style={{opacity:.4}}>—</em>}
      </span>
      <button className="mod-btn" style={S.modBtn} onClick={()=>setEditing(true)}>Modify</button>
    </div>
  );
}

/* ─── STYLES (white background theme) ───────────────────────────────────── */
const G = "#C9A84C";
const S = {
  root:{minHeight:"100vh",background:"#f8f6f1",fontFamily:"'JetBrains Mono',monospace",color:"#1a1a2e"},

  header:{background:"#1a1a2e",color:"#fff",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px #0004"},
  headerStripe:{height:4,background:`linear-gradient(90deg,${G},#8B5E0A,${G})`},
  headerInner:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",gap:12,flexWrap:"wrap"},
  title:{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:G,letterSpacing:"0.06em"},
  sub:{fontSize:11,color:"#8899aa",letterSpacing:"0.1em",marginTop:2},
  signedIn:{color:"#4ade80",fontSize:13},
  signBtn:{padding:"8px 16px",background:"transparent",border:`1px solid ${G}`,color:G,borderRadius:6,cursor:"pointer",fontSize:12,fontFamily:"inherit"},

  body:{maxWidth:960,margin:"0 auto",padding:"20px 16px",display:"flex",flexDirection:"column",gap:16},

  section:{background:"#fff",borderRadius:10,border:"1px solid #e8e0d0",padding:"18px 20px",boxShadow:"0 1px 4px #0001"},
  sectionLabel:{fontSize:10,color:"#999",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:10},
  muted:{color:"#aaa",fontSize:13},

  tabBar:{display:"flex",gap:8,flexWrap:"wrap"},
  tab:{padding:"7px 18px",borderRadius:20,border:"1.5px solid #e0d8cc",background:"#faf7f2",color:"#666",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,transition:"all .15s"},
  tabActive:{background:`linear-gradient(135deg,#fff8e8,#fff3d0)`,border:`1.5px solid ${G}`,color:"#8B5E0A"},

  searchCard:{display:"flex",flexWrap:"wrap",gap:14,alignItems:"flex-end"},
  searchRow:{display:"flex",alignItems:"flex-end",gap:10,flexWrap:"wrap",flex:1},
  fGroup:{display:"flex",flexDirection:"column",gap:5},
  lbl:{fontSize:10,color:"#888",letterSpacing:"0.12em",textTransform:"uppercase"},
  inp:{padding:"10px 14px",background:"#fff",border:"1.5px solid #ddd",borderRadius:8,color:"#1a1a2e",fontSize:15,fontFamily:"inherit",width:140,transition:"border .2s"},
  slash:{fontSize:26,color:G,marginBottom:4,fontWeight:700},
  preview:{padding:"10px 16px",background:"#fff8e8",border:`1.5px solid ${G}`,borderRadius:8,color:"#8B5E0A",fontSize:16,fontWeight:700,alignSelf:"flex-end"},
  searchBtn:{padding:"10px 26px",background:`linear-gradient(135deg,${G},#8B5E0A)`,border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"inherit",whiteSpace:"nowrap"},
  spin:{width:14,height:14,border:"2px solid #ffffff44",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"},

  errBox:{padding:"12px 18px",background:"#fff0f0",border:"1.5px solid #ffaaaa",borderRadius:8,color:"#c0392b",fontSize:13},
  okBox :{padding:"12px 18px",background:"#f0fff4",border:"1.5px solid #6bcf8a",borderRadius:8,color:"#1a7a3a",fontSize:13},

  resHead:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",padding:"14px 20px",borderBottom:"1px solid #f0e8d8",background:"linear-gradient(90deg,#fffdf5,#fff)",gap:8},
  foundBadge:{padding:"3px 9px",background:"#fff8e8",border:`1px solid ${G}`,borderRadius:4,fontSize:10,color:"#8B5E0A",letterSpacing:"0.1em"},
  foundCase:{fontSize:18,fontWeight:700,color:"#1a1a2e",marginLeft:4},
  resMeta:{fontSize:11,color:"#999"},

  fieldsGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:0},
  fCard:{padding:"16px 20px",background:"#fff",borderRight:"1px solid #f0e8d8",borderBottom:"1px solid #f0e8d8",transition:"background .2s"},
  fCardMod:{background:"#fffbf0"},
  fTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},
  fLbl:{fontSize:10,color:"#aaa",letterSpacing:"0.12em",textTransform:"uppercase"},
  modBadge:{fontSize:9,padding:"2px 6px",background:"#fff8e8",border:`1px solid ${G}`,color:"#8B5E0A",borderRadius:3},
  roVal:{fontSize:14,color:"#aaa"},
  dispVal:{flex:1,fontSize:14,color:"#1a1a2e",wordBreak:"break-word"},
  modBtn:{padding:"4px 12px",background:"#faf7f2",border:"1.5px solid #e0d8cc",borderRadius:5,color:"#888",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",whiteSpace:"nowrap"},

  addrArea:{width:"100%",background:"#fff",border:`1.5px solid #ddd`,borderRadius:8,color:"#1a1a2e",fontSize:13,padding:"8px 12px",fontFamily:"inherit",resize:"vertical",lineHeight:1.6,boxSizing:"border-box"},
  camBtn:{padding:"6px 12px",background:"#f0f6ff",border:"1.5px solid #c0d8ff",borderRadius:6,color:"#3B6BF5",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .15s"},

  inpInline:{flex:1,padding:"7px 10px",background:"#fff",border:`1.5px solid #ddd`,borderRadius:6,color:"#1a1a2e",fontSize:14,fontFamily:"inherit"},
  ok:{padding:"6px 10px",background:"#e8f8ec",border:"1.5px solid #6bcf8a",color:"#1a7a3a",borderRadius:5,cursor:"pointer",fontSize:14,fontFamily:"inherit"},
  cancel:{padding:"6px 10px",background:"#fff0f0",border:"1.5px solid #ffaaaa",color:"#c0392b",borderRadius:5,cursor:"pointer",fontSize:14,fontFamily:"inherit"},

  saveBar:{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:16,padding:"14px 20px",borderTop:"1px solid #f0e8d8",background:"#fafaf8"},
  pendingNote:{fontSize:12,color:"#8B5E0A"},
  saveBtn:{padding:"11px 32px",background:`linear-gradient(135deg,${G},#8B5E0A)`,border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit",transition:"opacity .2s"},

  /* OCR overlay */
  ocrCard:{background:"#fff",borderRadius:16,width:"min(92vw,420px)",overflow:"hidden",boxShadow:"0 20px 60px #000a"},
  ocrHead:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",background:"#1a1a2e"},
  ocrTitle:{color:G,fontWeight:700,fontSize:16,fontFamily:"'Rajdhani',sans-serif"},
  ocrClose:{background:"transparent",border:"none",color:"#fff",fontSize:18,cursor:"pointer"},
  ocrCenter:{display:"flex",flexDirection:"column",alignItems:"center",padding:40,gap:16},
  ocrMsg:{color:"#666",fontSize:13},
  bigSpin:{width:40,height:40,border:`3px solid #e0d8cc`,borderTopColor:G,borderRadius:"50%",animation:"spin .8s linear infinite"},
  video:{width:"100%",maxHeight:280,objectFit:"cover",display:"block"},
  ocrErr:{color:"#c0392b",fontSize:12,padding:"8px 16px",background:"#fff0f0"},
  ocrBtns:{display:"flex",gap:12,padding:"14px 18px"},
  capBtn:{flex:1,padding:"11px",background:`linear-gradient(135deg,${G},#8B5E0A)`,border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"},
  fileBtn:{flex:1,padding:"11px",background:"#f0f6ff",border:"1.5px solid #c0d8ff",borderRadius:8,color:"#3B6BF5",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"},
};
