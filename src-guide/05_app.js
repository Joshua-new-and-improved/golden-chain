// ---------- State (browser only; export/import on the Progress page) ----------
const KEY="golden-chain-v1";
const S = Object.assign({looked:{},cards:{},quiz:{},checks:{},done:{},complete:{},notes:{},hl:{},bm:null,resume:null,view:"interwoven",depth:2,sensesSeen:false,construct:{}}, load());
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(t._t);t._t=setTimeout(()=>t.hidden=true,1800);}

// ---------- Term auto-tagging ----------
const ALIAS = []; TERMS.forEach(t=>[t.t,...(t.alias||[])].forEach(a=>ALIAS.push([a,t.id])));
ALIAS.sort((a,b)=>b[0].length-a[0].length);
const ALIAS_MAP = Object.fromEntries(ALIAS.map(([a,id])=>[a.toLowerCase(),id]));
const TERM_ALT=ALIAS.map(a=>a[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
let TERM_RE;try{TERM_RE=new RegExp("(?<![\\w-])("+TERM_ALT+")(?![\\w-])","gi");}catch(e){TERM_RE=new RegExp("\\b("+TERM_ALT+")(?![\\w-])","gi");}
// common lower-case words are not tagged as glossary terms (capitalised or multi-word uses still are)
const TERM_SKIP=new Set(["good","act","acts","end","ends","being","form","nature","cause","order","power","matter","object","person","life","love","law","reason","mind","word","light","image","knowledge","goods","truth"]);
function tagTerms(root){
  const seen=new Set();
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
    const p=n.parentElement; if(!p) return 2;
    if(p.closest(".term,a,button,th,strong,b,h1,h2,h3,h4,.label,.chip,.voice,.src,.no-tag,label,option,textarea,.latin-word,.co-h,.bh,summary,.ref")) return 2;
    return n.nodeValue.trim()?1:2;}});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const n of nodes){
    const txt=n.nodeValue; TERM_RE.lastIndex=0; let m, last=0, frag=null;
    while((m=TERM_RE.exec(txt))){
      const id=ALIAS_MAP[m[1].toLowerCase()]; if(!id||seen.has(id)) continue;
      if(TERM_SKIP.has(m[1])) continue;
      if(m[1]==="will"&&!/\b(the|free|his|her|our|my|human|divine|God's)\s+$/i.test(txt.slice(Math.max(0,m.index-10),m.index))) continue;
      seen.add(id); frag=frag||document.createDocumentFragment();
      frag.append(txt.slice(last,m.index));
      const s=document.createElement("span"); s.className="term"; s.tabIndex=0; s.dataset.term=id; s.setAttribute("role","button"); s.textContent=m[1]; frag.append(s); last=m.index+m[1].length;
    }
    if(frag){frag.append(txt.slice(last)); n.replaceWith(frag);}
  }
}
function openTerm(id,anchor){
  const t=TERM_BY_ID[id]; if(!t) return;
  S.looked[id]=(S.looked[id]||0)+1; if(!S.cards[id]) S.cards[id]={ef:2.5,int:0,reps:0,due:Date.now(),lapses:0}; save();
  const c=$("#termcard");
  const rel=(t.rel||[]).filter(r=>TERM_BY_ID[r]).map(r=>`<span class="term" tabindex="0" role="button" data-term="${r}">${esc(TERM_BY_ID[r].t)}</span>`).join(", ");
  const les=LESSONS[t.lesson]?`<a href="#lesson-${t.lesson}" data-close>${esc(LESSONS[t.lesson].code)}</a>`:esc(lessonName(t.lesson));
  c.innerHTML=`<button class="ghost x" data-close aria-label="Close">✕</button>
   <div class="label">${esc(t.d)}</div><h3 id="tc-title">${esc(t.t)}</h3><div class="lat">${esc(t.la)}</div>
   <dl><div><dt>In plain words</dt><dd>${esc(t.b)}</dd></div>
   <div><dt>Precise definition</dt><dd>${esc(t.p)}</dd></div>
   <div><dt>Example</dt><dd>${esc(t.ex)}</dd></div>
   <div><dt>Where Thomas treats it</dt><dd>${esc(t.where)}</dd></div>
   ${t.ccc?`<div><dt>Catechism</dt><dd>CCC ${esc(t.ccc)}</dd></div>`:""}
   ${t.conf?`<div><dt>Often confused with</dt><dd>${esc(t.conf)}</dd></div>`:""}
   ${rel?`<div><dt>Related</dt><dd>${rel}</dd></div>`:""}
   <div><dt>Taught in</dt><dd>${les}</dd></div></dl>
   <p class="ui muted" style="font-size:.74rem;margin:10px 0 0">Added to your flashcards.</p>`;
  c.hidden=false;
  if(anchor&&innerWidth>600){const r=anchor.getBoundingClientRect();const w=c.offsetWidth,h=c.offsetHeight;
    let x=Math.min(Math.max(16,r.left),innerWidth-w-16), y=r.bottom+8; if(y+h>innerHeight-16) y=Math.max(16,r.top-h-8);
    c.style.left=x+"px"; c.style.top=y+"px";}
  c.querySelector(".x").focus();
}
document.addEventListener("click",e=>{
  const tm=e.target.closest(".term"); if(tm){e.preventDefault();openTerm(tm.dataset.term,tm);return;}
  if(e.target.closest("[data-close]")||(!e.target.closest("#termcard")&&!$("#termcard").hidden)) $("#termcard").hidden=true;
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") $("#termcard").hidden=true;
  if((e.key==="Enter"||e.key===" ")&&e.target.classList?.contains("term")){e.preventDefault();openTerm(e.target.dataset.term,e.target);}
});

// ---------- Router ----------
const VIEWS=["home","reader","academy","lesson","glossary","cards","search","progress"];
addEventListener("hashchange",route);

function seedCount(){return Object.values(SEED).reduce((n,s)=>n+s.split(";").filter(x=>x.trim()).length,0);}

// ---------- Reader ----------
let BIBLE_INDEX=[], BOOKS={}, CATENA={}, VG={};
async function loadCatena(ch){if(!CATENA[ch]){try{CATENA[ch]=await fetchJSON("catena/john-"+ch+".json");}catch(e){CATENA[ch]=[];}}return CATENA[ch];}
function vtext(ch,n){const c=BOOKS.john?.chapters[ch-1];const v=c&&c.verses.find(x=>x[0]===n);return v||[n,"",null];}
const fetchJSON=u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u);return r.json();});
async function loadBook(slug){if(!BOOKS[slug]) BOOKS[slug]=await fetchJSON("bible/"+slug+".json");return BOOKS[slug];}
function slugOf(name){return (BIBLE_INDEX.find(b=>b.name===name)||{}).slug;}
function nameOf(slug){return (BIBLE_INDEX.find(b=>b.slug===slug)||{}).name||slug;}
if(!S.book){S.book="john";S.ch=1;}
async function renderReader(){
  const v=$("#v-reader");
  const book=S.book||"john", ch=S.ch||1, bname=nameOf(book), c=cover(bname);
  let B; try{B=await loadBook(book);}catch(e){v.innerHTML=`<p>Could not load ${esc(bname)}. Check your connection and reload the page.</p>`;return;}
  const chap=B.chapters.find(x=>x.n===ch)||B.chapters[0];
  const isJ1=!!(COMMENTED[book]&&COMMENTED[book].includes(chap.n)), hasLatin=true, hasGreek=typeof NT_SLUGS!=="undefined"&&NT_SLUGS.has(book);
  if(S.view==="greek"&&!hasGreek)S.view="latin";
  if((S.view==="latin"&&book!=="john")||S.view==="greek") await loadAlt(book,S.view);
  if(useWeb()||S.view==="modern") await loadWeb(book);
  const CU=UNITS.filter(u=>u.ch===chap.n);
  if(isJ1) await loadCatena(chap.n);
  const rail=CANON.map(([grp,books])=>`<details ${books.includes(bname)?"open":""}><summary>${esc(grp)}</summary><ul>${books.map(bk=>{const cv=cover(bk);return `<li class="${bk===bname?"active":""}" title="${esc(cv[1])}"><button data-book="${esc(bk)}">${esc(bk)}</button><span class="dot ${cv[0]}"></span></li>`}).join("")}</ul></details>`).join("");
  v.innerHTML=`<div class="reader"><aside class="rail" aria-label="Books"><details class="railwrap" ${innerWidth>900?"open":""}><summary>Books &amp; commentary coverage</summary>
   <div class="row" style="gap:8px;margin:8px 0"><span class="chip thomas">Thomas</span><span class="chip catena">Golden Chain</span><span class="chip none">Haydock + Fathers</span></div>${rail}</details></aside>
   <div style="min-width:0"><div class="row" style="justify-content:space-between;align-items:center"><div class="seg" role="group" aria-label="Reader mode"><button aria-pressed="true">Books</button><a class="segl" href="#timeline">Timeline</a></div></div>${B.drName!==bname?`<div class="label" style="margin-top:10px">Douay-Rheims: ${esc(B.drName)}</div>`:""}
   <h1>${esc(bname)} ${chap.n}</h1>${B.slug==="psalms"?`<div class="ui muted" style="font-size:.85rem;margin:-4px 0 8px">Vulgate numbering · in most modern Bibles this is Psalm ${hebPs(chap.n)}</div>`:""}
   <div class="row" style="margin-top:8px;align-items:center;gap:8px;flex-wrap:wrap">${trSegHTML()}<span class="chip ${c[0]}">${esc(c[1])}</span></div><p class="ui muted" style="font-size:.82rem;margin:6px 0 0">Haydock${["matthew","mark","luke","john"].includes(book)?", the Golden Chain":""} and the Fathers on this chapter: read it through, then open a Commentary box or tap a verse.</p>
   <nav class="chapters ui" aria-label="Chapters">${B.chapters.map(x=>`<button data-ch="${x.n}" aria-pressed="${x.n===chap.n}">${x.n}</button>`).join("")}</nav>
   ${chap.summary?`<p class="muted" style="font-style:italic;margin:.6em 0 0">${esc(chap.summary)}</p>`:""}
   ${typeof bookIntroHTML==="function"?bookIntroHTML(B.slug||book,bname,chap.n):""}<div id="comm-head"></div>
   <div class="toolbar" role="toolbar" aria-label="Reading options">
    <div class="seg" role="group" aria-label="View">${["interwoven","scripture","parallel","latin","greek","modern"].map(m=>`<button data-view="${m}" aria-pressed="${S.view===m}" ${m==="greek"&&!hasGreek?"disabled title=\"Greek is given for the New Testament\"":""}>${{interwoven:"With commentary",scripture:"Text only",parallel:"Parallel",latin:"Latin–English",greek:"Greek–English",modern:"Old & modern"}[m]}</button>`).join("")}</div>
    ${S.view!=="scripture"?`<button id="comm-all" aria-pressed="${!!S.commAll}">${S.commAll?"Close all commentary":"Open all commentary"}</button>`:""}${S.bm?`<button id="go-bm">Go to bookmark</button>`:""}<a class="btn" href="#highlights">My highlights</a>
   </div>
   ${(useWeb()||S.view==="modern")&&WEB_OWN.has(book)?`<p class="ui muted tr-note">The modern text of ${esc(bname)} follows the Greek, which differs a good deal from the Latin behind the Douay-Rheims, so it is shown below the chapter in its own verse numbers.</p>`:""}<div id="units" class="${S.view==="parallel"?"parallel":S.view==="latin"||S.view==="greek"||S.view==="modern"?"latin":""}">${isJ1?CU.map(unitHTML).join(""):plainChapterHTML(B,chap)}</div>
   ${(useWeb()||S.view==="modern")&&WEB_OWN.has(book)?webOwnHTML(book,chap.n):""}<div class="row" style="justify-content:space-between;margin-top:18px">${prevNext(B,chap)}</div>
   <div class="lost" style="margin-top:20px">Texts: World English Bible, British Edition (modern English; public domain, ebible.org), aligned to the Douay-Rheims verses; Douay-Rheims (Challoner revision) with Challoner's notes, Project Gutenberg #1581; Clementine Vulgate (all books); Greek New Testament: Nestle 1904 (public domain; CC0 digital edition, biblicalhumanities.org); Catena aurea in Newman's translation (1841–45); Haydock's Catholic Bible Commentary (1859); the Fathers and Doctors from public-domain translations collected by the Historical Christian Faith Commentaries Database, limited to Catholic writers (Fathers in communion with the Church, and Catholic Doctors and authors; heretics, schismatics, post-1054 Eastern writers and Protestants are left out). All public domain. ${isJ1?`Thomas's exposition appears as AI-written summaries, because modern translations of the <em>Lectura super Ioannem</em> are copyrighted; read it in full at <a href="https://aquinas.cc/" target="_blank" rel="noopener">aquinas.cc</a>. Lecture numbers marked "verify" have not been checked against the Marietti paragraph map.`:""}</div>
   </div></div>`;
  $$("#v-reader [data-view]").forEach(b=>b.onclick=()=>{S.view=b.dataset.view;save();renderReader();});
  $("#senses-ok")&&($("#senses-ok").onclick=()=>{S.sensesSeen=true;save();$("#senses-intro").remove();});
  $("#go-bm")&&($("#go-bm").onclick=()=>goBookmark());
  $$("#v-reader [data-book]").forEach(b=>b.onclick=()=>{S.book=slugOf(b.dataset.book);S.ch=1;save();renderReader().then(()=>scrollTo(0,0));});
  $$("#v-reader [data-ch]").forEach(b=>b.onclick=()=>{S.ch=+b.dataset.ch;save();renderReader().then(()=>scrollTo(0,0));});
  wireUnits(isJ1);
  $("#comm-all")&&($("#comm-all").onclick=()=>{S.commAll=!S.commAll;save();renderReader();});
  if(typeof attachChapterComm==="function"){isJ1?attachUnitComm(B,chap):attachChapterComm(B,chap);}
  if(isJ1&&S.resume&&S.resume!==CU[0].id&&CU.some(u=>u.id===S.resume)&&!renderReader._jumped){renderReader._jumped=1;setTimeout(()=>document.getElementById(S.resume)?.scrollIntoView(),50);}
}
function goBookmark(){const [bk,ch,id]=(S.bm||"").split("|");if(id&&(bk!==S.book||+ch!==S.ch)){S.book=bk;S.ch=+ch;save();renderReader().then(()=>document.getElementById(id)?.scrollIntoView());}else document.getElementById(id||S.bm)?.scrollIntoView({behavior:"smooth"});}
function prevNext(B,chap){const i=B.chapters.indexOf(chap);return `<span>${i>0?`<button data-ch="${B.chapters[i-1].n}">← Chapter ${B.chapters[i-1].n}</button>`:""}</span><span>${i<B.chapters.length-1?`<button data-ch="${B.chapters[i+1].n}">Chapter ${B.chapters[i+1].n} →</button>`:""}</span>`;}
function plainChapterHTML(B,chap){
  const mod=S.view==="modern";const lat=S.view==="latin"||S.view==="greek"||mod, vg=(mod?(WEB_OWN.has(B.slug)?{}:webCh(B.slug,chap.n)):S.view==="greek"?altText(B.slug,"greek",chap.n):B.slug==="john"?VG[chap.n]:altText(B.slug,"latin",chap.n))||{};
  const TX=(n,t)=>{if(!useWeb()||mod)return t;const w=webV(B.slug,chap.n,n);return w===null?t:(w||"(joined with the previous verse)");};
  return `<div class="unit text-col" id="${B.slug}-${chap.n}"><div class="verses">${chap.verses.map(([n,t,note],k)=>{
    const id=`${B.slug}-${chap.n}-${n}`, nt=note?`<details class="cnote"><summary>Challoner's note</summary>${note.split("\n").map(p=>`<p>${esc(p)}</p>`).join("")}</details>`:"";
    const ref=`${B.slug}|${chap.n}|${n}`;
    return lat?`<div class="latrow" id="${id}" data-ref="${ref}"><p class="v" data-ref="${ref}"><sup>${n}</sup>${esc(TX(n,t))}</p><p class="v lat no-tag${mod?" mod":""}" ${S.view==="greek"?'lang="grc"':mod?'lang="en"':'lang="la"'}><sup>${n}</sup>${esc(vg[n]||(mod&&vg[n]===""?"(joined with the previous verse)":"—"))}</p></div>${nt}`
      :`<p class="v ${k===0&&S.view!=="parallel"?"dropcap":""}" id="${id}" data-ref="${ref}"><sup>${n}</sup>${esc(TX(n,t))}</p>${S.view==="scripture"||useWeb()?"":nt}`;}).join("")}</div></div>`;
}
function catenaFor(u){return (CATENA[u.ch||1]||[]).filter(c=>c.from>=u.v[0]&&c.from<=u.v[u.v.length-1]).flatMap(c=>c.items);}
function wireUnits(isJ1){
  $$("#units .gloss .body, #units .verses .v, #units .cat-en").forEach(tagTerms);
  $$("[data-father]").forEach(b=>b.onclick=()=>{const f=FATHERS[b.dataset.father];if(f)toast(`${f.name} (${f.dates}). ${f.bio}`);});
  $$("[data-showall]").forEach(b=>b.onclick=()=>{b.parentElement.querySelectorAll("[data-more]").forEach(x=>x.hidden=false);b.remove();});
  $$("[data-bm]").forEach(b=>b.onclick=()=>{S.bm=`${S.book}|${S.ch}|${b.dataset.bm}`;save();$$("[data-bm]").forEach(x=>x.textContent=S.bm.endsWith(x.dataset.bm)?"Bookmarked":"Bookmark");toast("Bookmark set");});
  $$("[data-hl]").forEach(b=>b.onclick=()=>{const id=b.dataset.hl;S.hl[id]=!S.hl[id];save();document.getElementById(id).classList.toggle("hl",S.hl[id]);b.textContent=S.hl[id]?"Highlighted":"Highlight";b.setAttribute("aria-pressed",S.hl[id]);});
  $$("[data-note]").forEach(b=>b.onclick=()=>{const box=b.closest(".gloss").querySelector(".note-box");box.hidden=!box.hidden;if(!box.hidden)box.querySelector("textarea").focus();});
  $$("[data-notefield]").forEach(t=>t.oninput=()=>{S.notes[t.dataset.notefield]=t.value;save();});
  if(isJ1&&"IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){S.resume=e.target.id;save();}}),{rootMargin:"-40% 0px -55% 0px"});$$("#units .unit").forEach(u=>io.observe(u));}
}

// ---------- Academy ----------

function mcqHTML(q,name,idx){
  return `<div class="opts" data-q="${name}">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o[0])}</button>`).join("")}</div><div class="expl" hidden></div>`;
}
function wireMCQ(scope,q,name,onAnswer){
  const box=$(`[data-q="${name}"]`,scope), ex=box.nextElementSibling;
  $$(".opt",box).forEach(b=>b.onclick=()=>{
    if(box.dataset.done) return; box.dataset.done=1; const i=+b.dataset.i;
    $$(".opt",box).forEach((x,k)=>{x.disabled=true;if(k===q.ans)x.classList.add("right");});
    if(i!==q.ans) b.classList.add("wrong");
    ex.hidden=false; ex.innerHTML=`<strong>${i===q.ans?"Correct.":"Not quite."}</strong> ${esc(q.opts[i][1])}${i!==q.ans?` <br><strong>Answer:</strong> ${esc(q.opts[q.ans][0].replace(/\.$/,""))}. ${esc(q.opts[q.ans][1].replace(/^Correct[.:]?\s*/,""))}`:""}${q.why?` <span class="chip" style="margin-left:4px">${esc(q.why)}</span>`:""}`;
    onAnswer&&onAnswer(i===q.ans);
  });
}

function renderQuiz(L){
  const box=$("#quizbox"); let answered=0, right=0;
  const order=L.quiz.map((q,i)=>i);
  box.innerHTML=order.map((i,n)=>{const q=L.quiz[i];return `<div class="quiz-q"><p style="margin:0"><strong>${n+1}.</strong> ${esc(q.prompt)}</p><div class="qmeta"><span class="chip">${esc(q.meta.bloom)}</span><span class="chip">Difficulty ${q.meta.diff}</span>${q.meta.terms.map(t=>`<span class="chip">${esc(TERM_BY_ID[t]?.t||t)}</span>`).join("")}</div>${mcqHTML(q,L.id+"-q"+i)}</div>`}).join("")+`<div id="qscore" class="panel" hidden></div>`;
  order.forEach(i=>wireMCQ(box,L.quiz[i],L.id+"-q"+i,ok=>{answered++;if(ok)right++;
    if(!ok) L.quiz[i].meta.terms.forEach(t=>{if(S.cards[t]){S.cards[t].due=Date.now();S.cards[t].ef=Math.max(1.3,S.cards[t].ef-.2);}else S.cards[t]={ef:2.3,int:0,reps:0,due:Date.now(),lapses:1};});
    if(answered===L.quiz.length){const p=right/answered;S.quiz[L.id]=Math.max(S.quiz[L.id]||0,p);save();
      const sc=$("#qscore");sc.hidden=false;sc.innerHTML=`<div class="row"><div class="score tabular">${right}/${answered}</div><div><strong>${p>=.8?"Mastered.":"Not yet at 80%."}</strong><div class="muted">${p>=.8?nextMsg(L.id):"Terms from questions you missed were added to your flashcards. Review them and retry."}</div></div><button id="qretry">Retry quiz</button></div>`;
      $("#qretry").onclick=()=>renderQuiz(L);}
  }));
}
function renderConstruct(L){
  const C=L.construct, saved=S.construct[L.id]||{};
  const f=[["obj","Objection (videtur quod…)"],["sc","Sed contra"],["resp","Respondeo"],["rep","Reply to the objection"]];
  $("#cbox").innerHTML=f.map(([k,l])=>`<label for="cx-${L.id}-${k}">${l}</label><textarea id="cx-${L.id}-${k}" data-cx="${k}">${esc(saved[k]||"")}</textarea><div class="model" id="m-${k}"><span class="label">Model (summary of ${esc(C.ref)})</span><br>${esc(C.model[k])}</div>`).join("")+
   `<div class="row" style="margin-top:12px"><button class="primary" id="cx-show">Compare with the model</button></div><div id="cx-rub" hidden><h3 style="margin-top:14px">Self-check rubric</h3>${C.rubric.map((r,i)=>`<label style="font-weight:400;font-family:var(--f-body);font-size:1rem"><input type="checkbox" id="rub-${L.id}-${i}"> ${esc(r)}</label>`).join("")}</div>`;
  $$("[data-cx]").forEach(t=>t.oninput=()=>{S.construct[L.id]=S.construct[L.id]||{};S.construct[L.id][t.dataset.cx]=t.value;save();});
  $("#cx-show").onclick=()=>{$$("#cbox .model").forEach(m=>m.classList.add("show"));$("#cx-rub").hidden=false;};
}
function renderDrill(L){
  const parts=L.drill.parts.map((p,i)=>({p,i}));
  let cur=parts.slice(); // deterministic shuffle so the first view is stable
  cur=[cur[2],cur[4],cur[0],cur[3],cur[1]].filter(Boolean);
  const draw=(checked)=>{$("#drillbox").innerHTML=`<div class="drill">${cur.map((x,k)=>`<div class="blk ${checked?(x.i===k?"good":"badp"):""}"><span>${esc(x.p)}</span><button aria-label="Move up" data-up="${k}" ${k===0?"disabled":""}>↑</button><button aria-label="Move down" data-dn="${k}" ${k===cur.length-1?"disabled":""}>↓</button></div>`).join("")}</div><div class="row"><button class="primary" id="dr-check">Check order</button>${checked?`<span>${cur.every((x,k)=>x.i===k)?"Correct order.":"Green parts are in place; red ones still need moving."}</span>`:""}</div>`;
    $$("[data-up]").forEach(b=>b.onclick=()=>{const k=+b.dataset.up;[cur[k-1],cur[k]]=[cur[k],cur[k-1]];draw(false);});
    $$("[data-dn]").forEach(b=>b.onclick=()=>{const k=+b.dataset.dn;[cur[k+1],cur[k]]=[cur[k],cur[k+1]];draw(false);});
    $("#dr-check").onclick=()=>draw(true);};
  draw(false);
}

// ---------- Glossary ----------
let gFilter={letter:null,disc:"All"};
function renderGlossary(){
  const discs=["All",...new Set(TERMS.map(t=>t.d))];
  const letters=[...new Set(TERMS.map(t=>t.t[0].toUpperCase()))].sort();
  const list=TERMS.filter(t=>(gFilter.disc==="All"||t.d===gFilter.disc)&&(!gFilter.letter||t.t[0].toUpperCase()===gFilter.letter)).sort((a,b)=>a.t.localeCompare(b.t));
  const full=new Set(TERMS.flatMap(t=>[t.t.toLowerCase(),...(t.alias||[]).map(a=>a.toLowerCase())]));
  $("#v-glossary").innerHTML=`<div class="label">Glossary</div><h1>Terms</h1><p style="max-width:44em">${TERMS.length} full term cards now; ${seedCount()} terms planned across all disciplines (list below, full cards in red). Open any card to add it to your flashcards.</p>
   <div class="row"><label class="label" for="gdisc">Discipline</label><select id="gdisc" style="width:auto">${discs.map(d=>`<option ${d===gFilter.disc?"selected":""}>${esc(d)}</option>`).join("")}</select></div>
   <div class="az" role="group" aria-label="Letter"><button data-l="" aria-pressed="${!gFilter.letter}">All</button>${letters.map(l=>`<button data-l="${l}" aria-pressed="${gFilter.letter===l}">${l}</button>`).join("")}</div>
   <div class="terms">${list.map(t=>`<div class="tcard"><div class="label">${esc(t.d)}</div><h3><span class="term" tabindex="0" role="button" data-term="${t.id}">${esc(t.t)}</span></h3><div class="lat">${esc(t.la)}</div><p style="margin:.3em 0 0">${esc(t.b)}</p>${S.looked[t.id]?`<span class="chip ok" style="margin-top:6px">Looked up ${S.looked[t.id]}×</span>`:""}</div>`).join("")||"<p>No terms match.</p>"}</div>
   <h2 style="margin-top:34px">Seed list by discipline</h2><p class="muted">Names only; cards are written module by module.</p>
   ${Object.entries(SEED).map(([k,s])=>`<h3 style="margin-top:16px">${esc(k)}</h3><div class="seedlist">${s.split(";").map(x=>x.trim()).filter(Boolean).map(x=>`<div class="${full.has(x.toLowerCase())?"has":""}">${esc(x)}</div>`).join("")}</div>`).join("")}`;
  $("#gdisc").onchange=e=>{gFilter.disc=e.target.value;renderGlossary();};
  $$("#v-glossary [data-l]").forEach(b=>b.onclick=()=>{gFilter.letter=b.dataset.l||null;renderGlossary();});
}

// ---------- Flashcards (SM-2) ----------
function renderCards(){
  const ids=Object.keys(S.cards).filter(id=>TERM_BY_ID[id]);
  const due=ids.filter(id=>S.cards[id].due<=Date.now()).sort((a,b)=>S.cards[a].due-S.cards[b].due);
  const v=$("#v-cards");
  if(!ids.length){v.innerHTML=`<div class="label">Flashcards</div><h1>Your review deck is empty</h1><p>Tap any underlined term in the Reader or the Academy and it joins the deck. Or start with a set:</p><div class="row"><button class="primary" id="seed-f1">Add the F1 terms</button><button id="seed-t3">Add the T3 terms</button></div>`;
    $("#seed-f1").onclick=()=>addSet("f1"); $("#seed-t3").onclick=()=>addSet("t3"); return;}
  if(!due.length){const next=Math.min(...ids.map(id=>S.cards[id].due));v.innerHTML=`<div class="label">Flashcards</div><h1>All caught up</h1><p>${ids.length} cards in your deck. Next review ${new Date(next).toLocaleString()}.</p><div class="row"><button id="seed-f1">Add the F1 terms</button><button id="seed-t3">Add the T3 terms</button></div>`;
    $("#seed-f1").onclick=()=>addSet("f1"); $("#seed-t3").onclick=()=>addSet("t3"); return;}
  const id=due[0], t=TERM_BY_ID[id];
  v.innerHTML=`<div class="label">Flashcards · spaced repetition</div><h1>${due.length} due</h1>
   <div class="fc"><div class="face" id="fc-face"><div class="label">${esc(t.d)}</div><h2>${esc(t.t)}</h2><div class="lat muted" style="font-style:italic">${esc(t.la)}</div><p class="muted ui" style="font-size:.85rem">Say the definition aloud, then reveal.</p></div>
   <div class="row" style="justify-content:center;margin-top:12px"><button class="primary" id="fc-show">Reveal</button></div>
   <div class="grades" id="fc-grades" hidden><button data-g="1">Again</button><button data-g="3">Hard</button><button data-g="4">Good</button><button data-g="5">Easy</button></div></div>`;
  $("#fc-show").onclick=()=>{$("#fc-face").innerHTML=`<div class="label">${esc(t.t)} · ${esc(t.la)}</div><p style="margin:0">${esc(t.b)}</p><p class="muted" style="margin:0;font-size:.95rem">${esc(t.p)}</p><p class="ui muted" style="font-size:.76rem;margin:0">${esc(t.where)}</p>`;$("#fc-show").hidden=true;$("#fc-grades").hidden=false;};
  $$("#fc-grades [data-g]").forEach(b=>b.onclick=()=>{grade(id,+b.dataset.g);renderCards();});
}
function addSet(k){TERMS.filter(t=>t.lesson===k).forEach(t=>{if(!S.cards[t.id])S.cards[t.id]={ef:2.5,int:0,reps:0,due:Date.now(),lapses:0};});save();renderCards();toast("Terms added");}
function grade(id,q){
  const c=S.cards[id];
  if(q<3){c.reps=0;c.int=0;c.lapses=(c.lapses||0)+1;c.due=Date.now()+10*60*1000;}
  else{c.reps++;c.int=c.reps===1?1:c.reps===2?6:Math.round(c.int*c.ef);c.due=Date.now()+c.int*86400000;}
  c.ef=Math.max(1.3,c.ef+(0.1-(5-q)*(0.08+(5-q)*0.02))); save();
}

// ---------- Search ----------
let ALL_LOADED=false;
async function loadAll(){if(ALL_LOADED)return;await Promise.all(BIBLE_INDEX.map(b=>loadBook(b.slug).catch(()=>null)));ALL_LOADED=true;}
function renderSearch(){
  $("#v-search").innerHTML=`<div class="label">Search</div><h1>Search scripture, commentary, glossary and lessons</h1>
   <input type="search" id="q" placeholder="Try: Word, grace, motion, Arius, Lamb of God" aria-label="Search">
   <div class="row" style="margin-top:8px"><label class="ui" style="font-size:.85rem"><input type="checkbox" id="qall" ${ALL_LOADED?"checked":""}> Search the whole Bible (loads all 73 books, about 5 MB)</label></div>
   <div id="results" style="margin-top:14px"></div>`;
  const run=async()=>{await Promise.all((COMMENTED.john||[]).map(loadCatena));const q=$("#q").value.trim().toLowerCase();const out=[];if(q.length<2){$("#results").innerHTML=`<p class="muted">Type at least two letters.</p>`;return;}
    if($("#qall").checked&&!ALL_LOADED){$("#results").innerHTML=`<p class="muted">Loading the whole Bible…</p>`;await loadAll();}
    const hit=(s)=>s&&s.toLowerCase().includes(q);
    const snip=s=>{const i=s.toLowerCase().indexOf(q);const a=Math.max(0,i-60);return (a?"…":"")+esc(s.slice(a,i))+"<mark>"+esc(s.slice(i,i+q.length))+"</mark>"+esc(s.slice(i+q.length,i+q.length+90))+"…";};
    UNITS.forEach(u=>{const all=[u.beginner,u.divisio,...u.literal,...u.spiritual,u.scholar].join(" ");if(hit(all))out.push(["Thomas (summary)",`John ${u.ch}:${u.v[0]}–${u.v[u.v.length-1]}`,snip(all),"john",u.ch,u.id]);
      catenaFor(u).forEach(it=>{if(hit(it.en))out.push(["Catena · "+(FATHERS[it.f]?.name||it.src),`John ${u.ch}:${u.v[0]}–${u.v[u.v.length-1]}`,snip(it.en),"john",u.ch,u.id]);});});
    TERMS.forEach(t=>{const all=[t.t,t.la,t.b,t.p,...(t.alias||[])].join(" · ");if(hit(all))out.push(["Glossary",t.t,snip(all),null,null,t.id]);});
    Object.values(LESSONS).forEach(L=>{if(hit(L.title))out.push(["Lesson",L.code+" · "+L.title,esc(L.outcomes[0]||""),"lesson",L.id,null]);});
    Object.values(LESSONS).forEach(L=>L.sections.forEach(s=>{const txt=s.html.replace(/<[^>]+>/g," ").replace(/\s+/g," ");if(hit(txt)||hit(s.h))out.push(["Lesson",L.code+" · "+s.h,snip(txt),"lesson",L.id,null]);}));
    if(typeof QAS!=="undefined")QAS.forEach(x=>{const all=[x.q,x.short,...x.steps,...x.cases.map(c=>c.join(" "))].join(" ").replace(/<[^>]+>/g," ");if(hit(all))out.push(["Question",x.q,snip(all),"href","#q-"+x.id,null]);});
    if(typeof PRAYERS!=="undefined")PRAYERS.forEach(p=>{const all=[p.name,p.when,...(p.text||[]),p.meaning.replace(/<[^>]+>/g," ")].join(" ");if(hit(all))out.push(["Prayer",p.name,snip(all),"href","#prayers",null]);});
    const books=($("#qall").checked?BIBLE_INDEX.map(b=>b.slug):Object.keys(BOOKS)).map(k=>BOOKS[k]).filter(Boolean);
    let sc=0;for(const B of books)for(const c of B.chapters)for(const [n,t] of c.verses){if(hit(t)){if(sc++<300)out.push(["Scripture",`${B.name} ${c.n}:${n}`,snip(t),B.slug,c.n,null]);}}
    {const rank=r=>{const t=String(r[1]).toLowerCase().replace(/^.*· /,"");return t===q?0:t.startsWith(q)?1:t.includes(q)?2:r[0]==="Scripture"?4:3;};const idx=out.map((r,i)=>[rank(r),i]);idx.sort((x,y)=>x[0]-y[0]||x[1]-y[1]);const o2=idx.map(x=>out[x[1]]);out.length=0;out.push(...o2);}
    if(VG)for(const c in VG)for(const n in VG[c])if(hit(VG[c][n]))out.push(["Vulgate",`John ${c}:${n}`,snip(VG[c][n]),"john",+c,null]);
    $("#results").innerHTML=out.length?`<p class="muted ui" style="font-size:.85rem">${out.length} results${sc>300?` (first 300 of ${sc} verses shown)`:""}</p>`+out.map(([k,t,s,bk,ch,ref],i)=>`<div class="result"><div class="kind">${esc(k)}</div>${bk==="href"?`<a href="${ch}"><strong>${esc(t)}</strong></a>`:bk==="lesson"?`<a href="#lesson-${ch}"><strong>${esc(t)}</strong></a>`:bk?`<a href="#reader" data-r="${i}"><strong>${esc(t)}</strong></a>`:`<span class="term" tabindex="0" role="button" data-term="${ref}"><strong>${esc(t)}</strong></span>`}<div>${s}</div></div>`).join(""):`<p>No results for "${esc(q)}".</p>`;
    $$("[data-r]").forEach(a=>a.onclick=()=>{const [,,, bk,ch,ref]=out[+a.dataset.r];S.book=bk;S.ch=ch;if(ref)S.resume=ref;renderReader._jumped=0;save();});};
  let tmr;$("#q").oninput=()=>{clearTimeout(tmr);tmr=setTimeout(run,200);}; $("#qall").onchange=run; $("#q").focus(); run();
}

// ---------- Progress ----------
function renderProgress(){
  const ids=Object.keys(S.cards).filter(id=>TERM_BY_ID[id]);
  const weak=ids.filter(id=>S.cards[id].lapses>0||S.cards[id].ef<2.3).sort((a,b)=>(S.cards[b].lapses||0)-(S.cards[a].lapses||0));
  const rows=YEARS.flatMap(y=>y.mods.map(([c,t,e,k])=>({c,t,e,k,s:k?modScore(k):null})));
  const ects=rows.filter(r=>r.s>=.8).reduce((n,r)=>n+r.e,0), tot=rows.reduce((n,r)=>n+r.e,0);
  const checks=Object.values(S.checks);
  $("#v-progress").innerHTML=`<div class="label">Progress</div><h1>Transcript</h1>
   <div class="grid3 grid4" style="margin:16px 0 24px">
    <div class="panel"><div class="label">Modules mastered</div><div class="score tabular">${ects}<span class="muted" style="font-size:1.1rem"> / ${tot} ECTS-eq.</span></div><div class="bar"><i style="width:${tot?ects/tot*100:0}%"></i></div></div>
    <div class="panel"><div class="label">Lessons completed</div><div class="score tabular">${Object.keys(LESSONS).filter(isDone).length}<span class="muted" style="font-size:1.1rem"> / ${Object.keys(LESSONS).length}</span></div><div class="bar"><i style="width:${Object.keys(LESSONS).filter(isDone).length/Object.keys(LESSONS).length*100}%"></i></div></div>
    <div class="panel"><div class="label">Inline checks</div><div class="score tabular">${checks.filter(Boolean).length}<span class="muted" style="font-size:1.1rem"> / ${checks.length} right</span></div></div>
    <div class="panel"><div class="label">Terms looked up</div><div class="score tabular">${Object.keys(S.looked).length}</div><div class="muted ui" style="font-size:.8rem">${ids.length} in flashcards</div></div></div>
   <div class="tablewrap"><table class="t tabular"><thead><tr><th>Code</th><th>Module</th><th>ECTS-eq.</th><th>Best quiz</th><th>Status</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td>${r.c}</td><td>${esc(r.t)}</td><td>${r.e}</td><td>${r.s!=null?Math.round(r.s*100)+"%":"—"}</td><td>${r.k&&LESSONS[r.k]?(()=>{const [st,cl]=modStatus(r.k);return cl?`<span class="chip ${cl}">${esc(st)}</span>`:esc(st)})():`<span class="muted">In preparation</span>`}</td></tr>`).join("")}</tbody></table></div>
   <h2 style="margin-top:28px">Completed lessons</h2>${(()=>{const done=Object.keys(LESSONS).filter(isDone).sort((x,y)=>S.complete[y]-S.complete[x]);return done.length?`<ol class="syl" style="max-width:52em">${done.map(x=>`<li class="done">${doneTick(x)}<a href="#lesson-${x}">${esc(LESSONS[x].code||"")} · ${esc(LESSONS[x].title)}</a><span class="muted ui" style="font-size:.75rem;margin-left:auto;white-space:nowrap">${new Date(S.complete[x]).toLocaleDateString("en-ZA",{day:"numeric",month:"short"})}</span></li>`).join("")}</ol>`:`<p class="muted">No lessons ticked yet. Finish a lesson and tick <em>Mark complete</em> at its end, or tick it in the Academy syllabus.</p>`;})()}
   <h2 style="margin-top:28px">Weak terms</h2>${weak.length?`<p>${weak.map(id=>`<span class="term" tabindex="0" role="button" data-term="${id}">${esc(TERM_BY_ID[id].t)}</span> <span class="muted ui" style="font-size:.75rem">(${S.cards[id].lapses||0} lapses)</span>`).join(" · ")}</p><a class="btn primary" href="#cards">Review now</a>`:`<p class="muted">None yet. Terms you miss in quizzes or mark "Again" appear here.</p>`}
   <h2 style="margin-top:28px">Back up or move your progress</h2><p>Progress is stored in this browser only. Copy the text below to keep a backup, or paste a backup to restore it.</p>
   <label class="label" for="exp">Your progress data</label><textarea id="exp" style="font-family:var(--f-ui);font-size:.78rem;min-height:120px">${esc(JSON.stringify(S))}</textarea>
   <div class="row" style="margin-top:8px"><button id="copy">Copy</button><button id="imp">Restore from the text above</button><button class="ghost" id="reset-ask">Reset all progress</button></div>
   <div id="reset-confirm" class="box warn" hidden><p>This erases notes, scores and flashcards in this browser.</p><div class="row"><button class="primary" id="reset-yes">Erase everything</button><button id="reset-no">Keep my progress</button></div></div>`;
  $("#copy").onclick=()=>{const t=$("#exp");navigator.clipboard?.writeText(t.value).then(()=>toast("Copied"),()=>{t.select();toast("Select-all done: press copy");})||(t.select());};
  $("#imp").onclick=()=>{try{const o=JSON.parse($("#exp").value);Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{looked:{},cards:{},quiz:{},checks:{},done:{},complete:{},notes:{},hl:{},construct:{},view:"interwoven",depth:2},o);save();toast("Progress restored");renderProgress();}catch(e){toast("That text is not valid progress data. Paste the whole backup and try again.");}};
  $("#reset-ask").onclick=()=>$("#reset-confirm").hidden=false;
  $("#reset-no").onclick=()=>$("#reset-confirm").hidden=true;
  $("#reset-yes").onclick=()=>{try{localStorage.removeItem(KEY)}catch(e){};location.hash="#home";location.reload();};
}

async function boot(){
  try{
    const [idx,john,vg]=await Promise.all([fetchJSON("bible/index.json"),loadBook("john"),fetchJSON("bible/john.vulgate.json"),loadCatena(1)]);
    BIBLE_INDEX=idx; VG=Object.fromEntries(Object.entries(vg).map(([c,o])=>[+c,o]));
  }catch(e){toast("Some texts failed to load. Reload the page to try again.");}
  route();
}
boot();

function nextMsg(id){const ls=modLessons(modOf(id)),i=ls.indexOf(id);if(ls[i+1])return `Next in this module: <a href="#lesson-${ls[i+1]}">${esc(LESSONS[ls[i+1]].title)}</a>`;const m=modOf(id);return ls.every(x=>(S.quiz[x]||0)>=.8)?"Every lesson in this module is mastered.":"Master the remaining lessons in this module to complete it.";}

function hebPs(n){if(n<=8||n>=148)return String(n);if(n===9)return "9–10";if(n<=112)return String(n+1);if(n===113)return "114–115";if(n===114||n===115)return "116";if(n<=145)return String(n+1);if(n===146||n===147)return "147";return String(n);}

function webOwnHTML(slug,ch){const c=webCh(slug,ch);if(!c)return `<p class="ui muted tr-note">The Greek text has no chapter ${ch} here.</p>`;
  const ks=Object.keys(c).filter(k=>k!=="_t"&&k!=="_own");
  return `<section class="web-own"><div class="label">Modern English (from the Greek) · ${esc(nameOf(slug))} ${ch}</div>${ks.map(k=>`<p class="v"><sup>${esc(k)}</sup>${esc(c[k])}</p>`).join("")}</section>`;}
