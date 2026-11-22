// ---------- Daily Mass readings with exegesis ----------
let LECT=null;
const RANK={SOLEMNITY:"Solemnity",FEAST:"Feast",MEMORIAL:"Memorial",OPT_MEMORIAL:"Optional memorial",SUNDAY:"Sunday",FERIA:"Weekday",HOLY_WEEK:"Holy Week",TRIDUUM:"Easter Triduum",COMMEMORATION:"Commemoration"};
const COLOR={GREEN:["Green","#2e7d32"],PURPLE:["Violet","#6a3d9a"],WHITE:["White","#e9e4d8"],RED:["Red","#c62828"],ROSE:["Rose","#e58fa8"],BLACK:["Black","#222"],GOLD:["White/gold","#d8b25a"]};
const todayISO=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;};
const addIsoDays=(iso,n)=>{const d=new Date(iso+"T12:00:00");d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;};
const fmtDate=iso=>new Date(iso+"T12:00:00").toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
// lect.json covers Oct 2026 – Dec 2028; later years are in lect-YYYY.json, loaded on demand.
const LECT_MAX=2035;const LECT_YRS={};
async function loadLect(y){if(!LECT){try{LECT=await fetchJSON("lect.json");}catch(e){LECT={};}}
  const now=new Date().getFullYear();const want=[now,now+1].concat(y?[+y]:[]).filter(v=>v>=2029&&v<=LECT_MAX);
  await Promise.all(want.map(v=>LECT_YRS[v]||(LECT_YRS[v]=fetchJSON(`lect-${v}.json`).then(d=>{Object.assign(LECT,d);}).catch(()=>{delete LECT_YRS[v];}))));
  return LECT;}
async function readingText(parts){
  const out=[];
  for(const [s,c,a,z] of parts){const B=await loadBook(s);const ch=B.chapters.find(x=>x.n===c);if(!ch)continue;
    out.push({s,c,vv:ch.verses.filter(([n])=>n>=a&&n<=z)});}
  return out;
}
const READ_LABEL={"First Reading":"First reading","Responsorial Psalm":"Responsorial psalm","Second Reading":"Second reading","Gospel":"Gospel"};
async function renderMass(iso){
  const v=$("#v-mass");
  const L=await loadLect(iso?+iso.slice(0,4):0);
  const keys=Object.keys(L).sort();
  if(!iso||!L[iso]) iso=L[todayISO()]?todayISO():(iso&&iso<keys[0]?keys[0]:keys[keys.length-1]);
  S.massDate=iso;save();
  const e=L[iso];
  const col=COLOR[e.c]||["",""];
  const note=MASS_NOTES[iso];
  const isToday=iso===todayISO();
  v.innerHTML=`<div class="mass">
   <div class="mass-head" style="--lc:${col[1]}">
    <div class="mass-nav"><button data-md="-1" aria-label="Previous day">‹</button><div class="mass-date"><div class="label">${isToday?"Today · ":""}${esc(fmtDate(iso))}</div><label class="date-pick"><span class="visually-hidden">Choose a date</span><input type="date" id="mass-date" value="${iso}" min="${keys[0]}" max="${LECT_MAX}-12-31"></label></div><button data-md="1" aria-label="Next day">›</button></div>
    <h1>${esc(e.n)}</h1>
    <div class="row mass-meta"><span class="chip"><span class="lc-dot"></span>${esc(col[0])}</span><span class="chip">${esc(RANK[e.t]||e.t)}</span><span class="chip">${esc(e.s||"")}</span>${["SUNDAY","SOLEMNITY"].includes(e.t)?`<span class="chip">Sunday cycle ${e.y}</span>`:""}${e.s&&/Ordinary/.test(e.s)&&e.t!=="SUNDAY"?`<span class="chip">Weekday cycle ${e.w===1?"I":"II"}</span>`:""}${!isToday?`<button class="ghost" data-mtoday>Today</button>`:""}<button class="ghost" data-mshare>Share</button></div>
    ${e.mem?`<p class="muted" style="margin:.4em 0 0">${esc(RANK[e.t]||"")} of ${esc(e.mem)}. The readings below are those of the weekday; proper readings for the saint may be used instead.</p>`:""}
    ${e.note?`<p class="muted" style="margin:.4em 0 0">${esc(e.note)}</p>`:""}
    ${typeof saintsHTML==="function"?saintsHTML(iso):""}
   </div>
   ${typeof obligationFor==="function"?obligHTML(obligationFor(iso,L),true):""}
   <nav class="mass-jump" aria-label="Jump to">${note?`<a href="#" data-mj="exeg">Exegesis</a>`:""}<a href="#" data-mj="deep">Deeper</a>${e.r.map((r,i)=>`<a href="#" data-mj="reading-${i}">${esc((READ_LABEL[r.k]||r.k).replace(/ reading$/,"").replace("Responsorial psalm","Psalm"))}</a>`).join("")}<a href="#" data-mj="prayers">Prayers</a><a href="#" data-mj="mj-indulg">Indulgences</a></nav>
   ${note?`<section class="exeg" id="mj-exeg"><div class="label">Exegesis</div><h2>${esc(note.t)}</h2><p class="lead-p">${esc(note.o)}</p>
     ${note.n.map(([r,t])=>`<div class="ex-n"><div class="vr">${esc(r)}</div><p>${esc(t)}</p></div>`).join("")}
     ${note.k?.length?`<div class="kw"><div class="label">Key words in the original</div><table class="kwt"><thead><tr><th>Word</th><th>Greek / Hebrew</th><th>Latin (Vulgate)</th><th>Sense</th></tr></thead><tbody>${note.k.map(([a,b,c,d])=>`<tr><td>${esc(a)}</td><td lang="grc">${esc(b)}</td><td lang="la"><em>${esc(c)}</em></td><td>${esc(d)}</td></tr>`).join("")}</tbody></table></div>`:""}
     ${note.ln?.length?`<div class="links" style="margin-top:12px"><span class="label" style="border:0;background:none;padding:2px 0">In the course</span>${note.ln.map(([l,h])=>`<a href="${h}">${esc(l)}</a>`).join("")}</div>`:""}
   </section>`:""}
   <div id="mj-deep-host"></div>
   <div class="tr-bar ui"><span class="muted">Bible text:</span>${trSegHTML()}</div>
   <div id="mass-readings">${e.r.length?`<p class="muted">Loading the readings…</p>`:`<p>No readings for this day.</p>`}</div>
   ${typeof dailyPrayerHTML==="function"?dailyPrayerHTML(iso):""}
   ${typeof indulgenceHTML==="function"?indulgenceHTML(iso):""}
   <p class="lost" style="margin-top:20px">Readings follow the Lectionary for Mass (references from Felix Just, S.J., <em>catholic-resources.org</em>), on the General Roman Calendar with Epiphany, Ascension and Corpus Christi kept on Sundays, as in South Africa. Diocesan and national memorials may differ, so check your parish's Ordo. The text shown is the Douay-Rheims; at Mass in South Africa you will hear a modern translation, and a few verse numbers differ, especially in the Psalms (Douay-Rheims follows the Vulgate numbering). ${note?"The exegesis is AI-written study material; check citations against the sources.":"Written exegesis, with context and the four senses, is provided for every day from late October 2026 to 16 October 2027; on other days the notes come from Haydock, the Fathers and St Thomas's Golden Chain, and the book context is shown every day."}</p>
  </div>`;
  $("[data-mshare]",v)&&($("[data-mshare]",v).onclick=()=>shareThing(`${e.n}: Mass readings`,`${fmtDate(iso)} · ${e.n}${note?": "+note.t:""}. The readings explained, with the Fathers on every verse.`,"#mass-"+iso));
  $$("[data-mj]",v).forEach(a=>a.onclick=ev=>{ev.preventDefault();const t=a.dataset.mj==="exeg"?$("#mj-exeg"):a.dataset.mj==="deep"?$("#mj-deep"):a.dataset.mj==="prayers"?$("#mj-prayers"):$("#"+a.dataset.mj);t&&t.scrollIntoView({behavior:"smooth",block:"start"});});
  $$("[data-md]",v).forEach(b=>b.onclick=()=>{location.hash="#mass-"+addIsoDays(iso,+b.dataset.md);});
  $("[data-mtoday]",v)&&($("[data-mtoday]",v).onclick=()=>{location.hash="#mass-"+todayISO();});
  $("#mass-date").onchange=ev=>{if(ev.target.value)location.hash="#mass-"+ev.target.value;};
  // swipe left/right to change day on touch screens
  let x0=null;v.ontouchstart=ev=>{x0=ev.touches[0].clientX;};v.ontouchend=ev=>{if(x0==null)return;const dx=ev.changedTouches[0].clientX-x0;if(Math.abs(dx)>90&&!ev.target.closest(".cpanel,table,input"))location.hash="#mass-"+addIsoDays(iso,dx<0?1:-1);x0=null;};
  // readings
  await loadCommIndex();
  const host=$("#mass-readings");let html="";
  const blocks=[];
  if(useWeb())await Promise.all([...new Set(e.r.flatMap(r=>r.p.map(x=>x[0])))].map(loadWeb));
  for(const [i,r] of e.r.entries()){
    const segs=await readingText(r.p);
    const first=r.p[0];
    const body=segs.map(sg=>sg.vv.map(([n,t])=>{const w=useWeb()?webV(sg.s,sg.c,n):null;if(w==="")return "";const tt=w||t;return `<p class="v" id="m${i}-${sg.s}-${sg.c}-${n}" data-ref="${sg.s}|${sg.c}|${n}"><sup>${sg.c!==segs[0].c||segs.length>1?sg.c+":":""}${n}</sup>${esc(tt)}</p><div class="vc-slot" data-slot="${sg.s}|${sg.c}|${n}"></div>`;}).join("")).join(`<p class="muted ellip">…</p>`);
    blocks.push({i,r,segs});
    html+=`<section class="reading" id="reading-${i}"><div class="rd-h"><div><div class="label">${esc(READ_LABEL[r.k]||r.k)}</div><h2>${esc(r.ref)}${first[0]==="psalms"?` <span class="muted rd-ps">(Douay-Rheims Ps ${first[1]})</span>`:""}</h2></div><a class="btn ghost rd-open" href="#read-${first[0]}-${first[1]}-${first[2]}">Open in Bible</a></div>
     <div class="rd-text">${body}</div><div class="rd-notes" data-notes="${i}"></div></section>`;
  }
  host.innerHTML=html;
  if(typeof deeperHTML==="function"){try{$("#mj-deep-host").innerHTML=deeperHTML(e,note);}catch(err){console.warn(err);}}
  // attach per-verse commentary and the per-reading digest
  const seenL=new Set((note&&note.ln||[]).map(x=>x[1]));
  for(const {i,r,segs} of blocks){
    const sec=$("#reading-"+i);const digest=[];const links=new Map();
    for(const sg of segs){
      const cm=await loadComm(sg.s,sg.c);const d=cm?cm.d:{};
      sg.vv.forEach(([n])=>{
        const slot=sec.querySelector(`[data-slot="${sg.s}|${sg.c}|${n}"]`);const btn=commBtn(d,n,sg.s,sg.c);
        if(slot&&btn){slot.innerHTML=btn+`<div class="vc-host"></div>`;}
        const a=commAt(d,n,sg.s,sg.c);
        a.h.filter(x=>x[0]===n).forEach(x=>digest.push([sg.c,x]));
        a.x.forEach(x=>{if(!seenL.has(x.h))links.set(x.h,x);});
      });
      wireComm(sec,sg.s,sg.c,d);
    }
    links.forEach((x,h)=>seenL.add(h));
    const nb=sec.querySelector(`[data-notes="${i}"]`);
    if(digest.length||links.size) nb.innerHTML=`${digest.length?`<details class="hay-intro"${note?"":" open"}><summary>Haydock's notes on this reading (${digest.length})</summary>${digest.map(([c,x])=>`<div class="hay-n"><div class="vr">${c}:${x[0]===x[1]?x[0]:x[0]+"–"+x[1]}</div>${longText(x[2])}</div>`).join("")}</details>`:""}${links.size?`<div class="links" style="margin-top:10px"><span class="label" style="border:0;background:none;padding:2px 0">This reading in the course</span>${[...links.values()].slice(0,10).map(x=>`<a href="${x.h}">${esc(x.t)}: ${esc(x.l.length>60?x.l.slice(0,58)+"…":x.l)}</a>`).join("")}</div>`:""}`;
    nb.querySelectorAll("[data-ctmore]").forEach(b=>b.onclick=()=>{b.previousElementSibling.classList.remove("clamp");b.remove();});
    sec.querySelectorAll(".v").forEach(tagTerms);
  }
  if(typeof applyVerseMarks==="function")applyVerseMarks(host);
}
