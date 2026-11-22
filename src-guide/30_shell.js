// ---------- App shell: mobile tab bar, sheets, reading memory, verse highlights and notes ----------
const NT_SLUGS=new Set(["matthew","mark","luke","john","acts","romans","1-corinthians","2-corinthians","galatians","ephesians","philippians","colossians","1-thessalonians","2-thessalonians","1-timothy","2-timothy","titus","philemon","hebrews","james","1-peter","2-peter","1-john","2-john","3-john","jude","revelation"]);
S.vhl=S.vhl||{}; S.vnote=S.vnote||{}; S.fs=S.fs||1;
const ALT={};
async function loadAlt(slug,kind){const k=slug+"."+(kind==="greek"?"greek":"vulgate");if(!ALT[k]){try{ALT[k]=await fetchJSON(`bible/${k}.json`);}catch(e){ALT[k]={};}}return ALT[k];}
// Modern English: World English Bible (British Edition, public domain), aligned to Douay-Rheims numbering
const WEB_OWN=new Set(["tobit","judith","esther"]);
async function loadWeb(slug){const k=slug+".web";if(!ALT[k]){try{ALT[k]=await fetchJSON(`bible/${k}.json`);}catch(e){ALT[k]={};}}return ALT[k];}
function webCh(slug,ch){return (ALT[slug+".web"]||{})[ch]||null;}
function webV(slug,ch,n){if(WEB_OWN.has(slug))return null;const c=webCh(slug,ch);if(!c)return null;const t=c[n];return t===undefined?null:t;}
const useWeb=()=>S.tr==="web";
function trSegHTML(){return `<div class="seg tr-seg" role="group" aria-label="Translation"><button data-tr="dr" aria-pressed="${!useWeb()}">Traditional</button><button data-tr="web" aria-pressed="${useWeb()}">Modern English</button></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-tr]");if(!b)return;S.tr=b.dataset.tr;save();
  if(S.tr==="web"&&!S.trTip){S.trTip=1;save();toast("Modern English: the World English Bible. Commentary, notes and highlights still follow the Douay-Rheims verse numbers.");}
  const h=location.hash||"";if(h.startsWith("#mass"))renderMass(h.slice(6)||undefined);else if(document.body.dataset.view==="reader"||h.startsWith("#reader")||h.startsWith("#read-"))renderReader();else{closeSheet&&closeSheet();renderReader();}});
function altText(slug,kind,ch){const k=slug+"."+(kind==="greek"?"greek":"vulgate");return ALT[k]?.[ch]||null;}
// Return to where you left off: restore the last view on a fresh visit
try{if(!location.hash&&S.lastRoute&&S.lastRoute!=="#home")history.replaceState(null,"",S.lastRoute);}catch(e){}
document.documentElement.style.setProperty("--read-scale",S.fs);

// ---------- Sheets (bottom sheet on phones, centred card on desktop) ----------
function openSheet(html,wire,label){const sh=$("#sheet");sh.querySelector(".sheet-body").innerHTML=html;sh.querySelector(".sheet-panel").setAttribute("aria-label",label||"Options");sh.hidden=false;document.body.classList.add("sheet-open");if(wire)wire(sh.querySelector(".sheet-body"));const f=sh.querySelector(".sheet-body button, .sheet-body input, .sheet-body a");f&&f.focus({preventScroll:true});}
function closeSheet(){const sh=$("#sheet");if(sh.hidden)return;sh.hidden=true;document.body.classList.remove("sheet-open");}
document.addEventListener("click",e=>{if(e.target.closest("[data-sheetx]"))closeSheet();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet();});
// drag the grab handle down to close
(()=>{let y0=null;document.addEventListener("touchstart",e=>{if(e.target.closest(".sheet-grab"))y0=e.touches[0].clientY;},{passive:true});document.addEventListener("touchend",e=>{if(y0!=null&&e.changedTouches[0].clientY-y0>60)closeSheet();y0=null;});})();

// ---------- Tab bar ----------
const MORE_LINKS=[["#theology","Theology","Disputed questions"],["#questions","Questions","Life's questions"],["#prayers","Prayers","Prayers and daily rule"],["#hours","Hours","Liturgy of the Hours"],["#apologetics","Apologetics","Answer the objections"],["#highlights","My highlights","Highlights and notes"],["#timeline","Timeline","The story of salvation"],["#gallery","Gallery","Saints and churches"],["#glossary","Glossary","Terms"],["#cards","Flashcards","Review"],["#search","Search","Find anything"],["#progress","Progress","Scores and backup"],["about.html","About & policies","Terms, privacy, donations"]];
function syncTabbar(h){const map={reader:"reader",timeline:"reader",highlights:"more",mass:"mass",academy:"academy",lesson:"academy",home:"home",groups:"groups",group:"groups",advent:"groups"};const cur=map[h]||"more";$$(".tabbar [data-tab]").forEach(a=>{if(a.dataset.tab===cur)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});}
document.addEventListener("click",e=>{const b=e.target.closest('.tabbar [data-tab="more"]');if(!b)return;
  openSheet(`<h2 class="sheet-t">More</h2><div class="more-grid">${MORE_LINKS.map(([h,t,d])=>`<a href="${h}" data-sheetx><strong>${esc(t)}</strong><span>${esc(d)}</span></a>`).join("")}</div>`,null,"More");});
document.addEventListener("click",e=>{const a=e.target.closest('.tabbar a[data-tab="reader"]');if(a&&location.hash==="#reader"){e.preventDefault();openBookPicker();}});

// ---------- Book and chapter picker ----------
function openBookPicker(step){
  const cur=S.book||"john";
  const grid=()=>`<h2 class="sheet-t">Choose a book</h2><input type="search" class="bp-q" placeholder="Search books" aria-label="Search books">
   <div class="seg bp-seg" role="group" aria-label="Testament"><button data-bpt="ot" aria-pressed="${!NT_SLUGS.has(cur)}">Old Testament</button><button data-bpt="nt" aria-pressed="${NT_SLUGS.has(cur)}">New Testament</button></div>
   <div class="bp-list">${CANON.map(([grp,books])=>`<div class="bp-grp" data-t="${/New Testament/.test(grp)?"nt":"ot"}"><div class="label">${esc(grp.replace(/^(Old|New) Testament — /,""))}</div><div class="bp-books">${books.map(b=>{const s=slugOf(b);return `<button data-bpb="${s}" class="${s===cur?"cur":""}">${esc(b)}</button>`;}).join("")}</div></div>`).join("")}</div>`;
  const chapters=s=>{const b=BIBLE_INDEX.find(x=>x.slug===s);const n=b?.chapters||1;return `<div class="row" style="justify-content:space-between;align-items:center"><button class="ghost" data-bpback>‹ Books</button><span class="label">${esc(nameOf(s))}</span></div><h2 class="sheet-t">${esc(nameOf(s))}</h2><div class="bp-ch">${Array.from({length:n},(_,i)=>`<button data-bpc="${i+1}" class="${s===cur&&i+1===S.ch?"cur":""}">${i+1}</button>`).join("")}</div>`;};
  const wire=root=>{
    const show=t=>root.querySelectorAll(".bp-grp").forEach(g=>g.hidden=g.dataset.t!==t);
    root.querySelectorAll("[data-bpt]").forEach(b=>b.onclick=()=>{root.querySelectorAll("[data-bpt]").forEach(x=>x.setAttribute("aria-pressed",x===b));show(b.dataset.bpt);});
    if(root.querySelector(".bp-grp"))show(NT_SLUGS.has(cur)?"nt":"ot");
    const q=root.querySelector(".bp-q");q&&(q.oninput=()=>{const v=q.value.trim().toLowerCase();root.querySelectorAll(".bp-grp").forEach(g=>{g.hidden=false;let any=0;g.querySelectorAll("[data-bpb]").forEach(b=>{const m=!v||b.textContent.toLowerCase().includes(v);b.hidden=!m;any+=m;});g.hidden=!any||(!v&&g.dataset.t!==(root.querySelector('[data-bpt][aria-pressed="true"]')?.dataset.bpt));});});
    root.querySelectorAll("[data-bpb]").forEach(b=>b.onclick=()=>{const s=b.dataset.bpb;root.innerHTML=chapters(s);wireCh(root,s);});
  };
  const wireCh=(root,s)=>{root.querySelector("[data-bpback]").onclick=()=>{root.innerHTML=grid();wire(root);};
    root.querySelectorAll("[data-bpc]").forEach(b=>b.onclick=()=>{S.book=s;S.ch=+b.dataset.bpc;S.pos=null;save();closeSheet();if(location.hash!=="#reader")location.hash="#reader";else renderReader().then(()=>scrollTo(0,0));});};
  if(step==="chapters")openSheet(chapters(cur),root=>wireCh(root,cur),"Choose a chapter");else openSheet(grid(),wire,"Choose a book");
}

// ---------- Reader settings sheet ----------
function openReaderSettings(){
  const nt=NT_SLUGS.has(S.book);
  openSheet(`<h2 class="sheet-t">Reading options</h2>
   <div class="label">View</div><div class="seg wrapseg" role="group" aria-label="View">${[["interwoven","With commentary"],["scripture","Text only"],["parallel","Parallel"],["latin","Latin"],["greek","Greek"],["modern","Compare"]].map(([k,l])=>`<button data-sv="${k}" aria-pressed="${S.view===k}" ${k==="greek"&&!nt?"disabled":""}>${l}</button>`).join("")}</div>
   <div class="label" style="margin-top:14px">Translation</div>${trSegHTML()}<p class="muted ui" style="font-size:.78rem;margin:6px 0 0">Traditional: Douay-Rheims (1750), the classic Catholic English Bible. Modern English: the World English Bible, a free, plain-English translation.</p>
   <div class="label" style="margin-top:14px">Text size</div><div class="row fs-row"><button data-fs="-1" aria-label="Smaller text">A−</button><input type="range" min="0.85" max="1.4" step="0.05" value="${S.fs}" id="fs-r" aria-label="Text size"><button data-fs="1" aria-label="Larger text">A+</button></div>
   <div class="sheet-acts"><button data-sa="inline">${S.commInline?"Commentary after the chapter":"Commentary between verses"}</button><button data-sa="all">${S.commAll?"Close all commentary":"Open all commentary"}</button><a class="btn" href="#highlights" data-sheetx>My highlights</a><a class="btn" href="#timeline" data-sheetx>Timeline</a>${S.bm?`<button data-sa="bm">Go to bookmark</button>`:""}</div>`,root=>{
    root.querySelectorAll("[data-sv]").forEach(b=>b.onclick=()=>{S.view=b.dataset.sv;save();closeSheet();renderReader();});
    const r=root.querySelector("#fs-r");const setFs=v=>{S.fs=Math.max(.85,Math.min(1.4,Math.round(v*100)/100));save();document.documentElement.style.setProperty("--read-scale",S.fs);r.value=S.fs;};
    r.oninput=()=>setFs(+r.value);root.querySelectorAll("[data-fs]").forEach(b=>b.onclick=()=>setFs(S.fs+(+b.dataset.fs)*.05));
    root.querySelector('[data-sa="all"]').onclick=()=>{S.commAll=!S.commAll;save();closeSheet();renderReader();};
    const ci=root.querySelector('[data-sa="inline"]');ci&&(ci.onclick=()=>{S.commInline=!S.commInline;save();closeSheet();renderReader();});
    root.querySelector('[data-sa="bm"]')&&(root.querySelector('[data-sa="bm"]').onclick=()=>{closeSheet();goBookmark();});
  },"Reading options");
}

// ---------- Verse highlights, notes and actions ----------
const HL_COLORS=[["yellow","Yellow"],["green","Green"],["blue","Blue"],["pink","Pink"],["violet","Violet"]];
function refLabel(ref){const [s,c,v]=ref.split("|");return `${nameOf(s)} ${s==="psalms"?c:c}:${v}`;}
function applyVerseMarks(root){
  (root||document).querySelectorAll("p.v[data-ref]").forEach(p=>{const k=p.dataset.ref;
    HL_COLORS.forEach(([c])=>p.classList.remove("hl-"+c));if(S.vhl[k])p.classList.add("hl-"+S.vhl[k]);
    let n=p.nextElementSibling&&p.nextElementSibling.classList.contains("vnote")?p.nextElementSibling:null;
    if(S.vnote[k]){if(!n){n=document.createElement("div");n.className="vnote";p.after(n);}n.innerHTML=`<span class="label">My note</span> ${esc(S.vnote[k])}`;}else if(n)n.remove();
  });
}
function verseText(p){const c=p.cloneNode(true);c.querySelectorAll("sup").forEach(x=>x.remove());return c.textContent.trim();}
function openVerseSheet(p){
  const k=p.dataset.ref, txt=verseText(p);
  const [ks,kc,kv]=k.split("|");const cur=(typeof COMM_CUR!=="undefined"&&COMM_CUR&&COMM_CUR.slug===ks&&COMM_CUR.ch===+kc)?COMM_CUR:null;
  const vcBtn=(()=>{let n=p.nextElementSibling;for(let i=0;i<4&&n;i++,n=n.nextElementSibling){const b=n.matches?.(".vc-btn")?n:n.querySelector?.(".vc-btn");if(b)return b;if(n.matches?.("p.v"))break;}return null;})();
  const hasC=!!vcBtn||(cur&&commAt(cur.d,+kv,ks,+kc).n);
  openSheet(`<div class="label">${esc(refLabel(k))}</div><p class="vs-text">${esc(txt.length>220?txt.slice(0,218)+"…":txt)}</p>
   <div class="label">Highlight</div><div class="hl-row">${HL_COLORS.map(([c,l])=>`<button class="sw sw-${c}" data-hlc="${c}" aria-label="${l}" aria-pressed="${S.vhl[k]===c}"></button>`).join("")}<button class="sw sw-none" data-hlc="" aria-label="Remove highlight">✕</button></div>
   <label class="label" for="vnote-t" style="display:block;margin-top:14px">Note</label><textarea id="vnote-t" rows="3" placeholder="Write a note on this verse">${esc(S.vnote[k]||"")}</textarea>
   <div class="sheet-acts">${hasC?`<button data-va="comm" class="primary">Commentary</button>`:""}<button data-va="share">Share</button>${typeof gcShareVerse==="function"?`<button data-va="group">Send to group</button>`:""}<button data-va="copy">Copy</button><button data-va="bm">${S.bm===k?"Bookmarked":"Bookmark"}</button><a class="btn" href="#read-${k.replace(/\|/g,"-")}" data-va="open" data-sheetx>${$("#v-reader").hidden?"Open in Bible":"Link"}</a><button class="primary" data-va="done">Done</button></div>`,root=>{
    root.querySelectorAll("[data-hlc]").forEach(b=>b.onclick=()=>{const c=b.dataset.hlc;if(c)S.vhl[k]=c;else delete S.vhl[k];save();root.querySelectorAll("[data-hlc]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.hlc===c&&!!c));applyVerseMarks();});
    const ta=root.querySelector("#vnote-t");ta.oninput=()=>{const v=ta.value.trim();if(v)S.vnote[k]=ta.value;else delete S.vnote[k];save();};
    root.querySelector('[data-va="share"]').onclick=()=>{closeSheet();const [b,c,n]=k.split("|");shareThing(refLabel(k),`“${txt}” (${refLabel(k)}, Douay-Rheims)`,`#read-${b}-${c}-${n}`);};
    {const gb=root.querySelector('[data-va="group"]');gb&&(gb.onclick=()=>{closeSheet();gcShareVerse(k,txt);});}
    root.querySelector('[data-va="copy"]').onclick=()=>{const t=`${txt} (${refLabel(k)}, Douay-Rheims)`;navigator.clipboard?.writeText(t).then(()=>toast("Verse copied"),()=>toast("Copy is not available here"));};
    root.querySelector('[data-va="bm"]').onclick=e=>{S.bm=k;save();e.target.textContent="Bookmarked";toast("Bookmark set");};
    root.querySelector('[data-va="done"]').onclick=()=>{closeSheet();applyVerseMarks();};
    const cb=root.querySelector('[data-va="comm"]');cb&&(cb.onclick=()=>{if(vcBtn){closeSheet();if(vcBtn.getAttribute("aria-expanded")!=="true")vcBtn.click();vcBtn.scrollIntoView({behavior:"smooth",block:"start"});}else{openCommSheet(ks,+kc,cur.d,+kv);}});
  },"Verse "+refLabel(k));
}
document.addEventListener("click",e=>{
  const p=e.target.closest("p.v[data-ref]");if(!p)return;
  if(e.target.closest("a,button,.term,[data-term],input,textarea"))return;
  if(window.getSelection&&String(window.getSelection()).length>2)return;
  openVerseSheet(p);
});
// Old bookmark format "book|ch|unit" from the John units still works through goBookmark; verse bookmarks use "book|ch|v"
const _goBookmark=goBookmark;
goBookmark=function(){const parts=(S.bm||"").split("|");if(parts.length===3&&/^\d+$/.test(parts[2])){location.hash=`#read-${parts[0]}-${parts[1]}-${parts[2]}`;return;}_goBookmark();};

// ---------- Reading memory: remember the verse at the top of the screen ----------
let posIO=null,posT=null;
function watchPosition(){
  posIO&&posIO.disconnect();
  if(!("IntersectionObserver" in window))return;
  posIO=new IntersectionObserver(es=>{const vis=es.filter(e=>e.isIntersecting).map(e=>e.target);if(!vis.length)return;const p=vis[0];const [b,c,v]=p.dataset.ref.split("|");
    clearTimeout(posT);posT=setTimeout(()=>{S.pos={b,c:+c,v:+v};save();},250);},{rootMargin:"-110px 0px -70% 0px"});
  $$("#units p.v[data-ref]").forEach(p=>posIO.observe(p));
}
function restorePosition(){
  const P=S.pos;if(!P||P.b!==S.book||P.c!==S.ch||P.v<=1)return;
  const el=document.querySelector(`#units p.v[data-ref="${P.b}|${P.c}|${P.v}"]`);
  if(el){const top=el.getBoundingClientRect().top+scrollY-(innerWidth<=760?120:90);scrollTo({top,behavior:"instant"});el.classList.add("flash");}
}
// ---------- Wrap the reader: add the mobile bar, marks, memory ----------
const _renderReader=renderReader;
renderReader=async function(){
  const restore=renderReader._restore;renderReader._restore=false;
  await _renderReader.apply(this,arguments);
  const v=$("#v-reader");if(!v||!v.querySelector(".reader"))return;
  const B=BOOKS[S.book]; if(!B)return;
  const chap=B.chapters.find(x=>x.n===S.ch)||B.chapters[0];
  const i=B.chapters.indexOf(chap);
  // mobile reader bar (hidden on wide screens by CSS)
  v.insertAdjacentHTML("afterbegin",`<div class="rbar" role="toolbar" aria-label="Reader"><button class="rbar-book" data-rb="book" aria-label="Choose book">${esc(nameOf(S.book))}<span class="caret">▾</span></button><button class="rbar-ch" data-rb="ch" aria-label="Choose chapter">${chap.n}<span class="caret">▾</span></button><span class="sp"></span><a class="rbar-ic" href="#mass" aria-label="Today's Mass readings">Mass</a><button class="rbar-ic" data-rb="opts" aria-label="Reading options">Aa</button></div>`);
  v.insertAdjacentHTML("beforeend",`<div class="chnav" aria-label="Chapter navigation">${i>0?`<button data-chg="${B.chapters[i-1].n}" aria-label="Previous chapter">‹</button>`:"<span></span>"}${i<B.chapters.length-1?`<button data-chg="${B.chapters[i+1].n}" aria-label="Next chapter">›</button>`:"<span></span>"}</div>`);
  v.querySelector('[data-rb="book"]').onclick=()=>openBookPicker();
  v.querySelector('[data-rb="ch"]').onclick=()=>openBookPicker("chapters");
  v.querySelector('[data-rb="opts"]').onclick=openReaderSettings;
  v.querySelectorAll("[data-chg]").forEach(b=>b.onclick=()=>{S.ch=+b.dataset.chg;S.pos=null;save();renderReader().then(()=>scrollTo(0,0));});
  // swipe between chapters (horizontal swipe on the text)
  let x0=null,y0=null;const u=$("#units");
  if(u){u.ontouchstart=e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY;};u.ontouchend=e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>110&&Math.abs(dy)<40&&!e.target.closest(".cpanel,.latrow")){const n=B.chapters[i+(dx<0?1:-1)];if(n){S.ch=n.n;S.pos=null;save();renderReader().then(()=>scrollTo(0,0));}}};}
  applyVerseMarks($("#units"));
  watchPosition();
  if(restore) setTimeout(restorePosition,60);
};

// ---------- My highlights ----------
let hlFilter="";
async function renderHighlights(){
  const v=$("#v-highlights");
  const keys=[...new Set([...Object.keys(S.vhl),...Object.keys(S.vnote)])];
  const order=s=>BIBLE_INDEX.findIndex(b=>b.slug===s);
  keys.sort((a,b)=>{const [s1,c1,v1]=a.split("|"),[s2,c2,v2]=b.split("|");return order(s1)-order(s2)||c1-c2||v1-v2;});
  const list=keys.filter(k=>!hlFilter||S.vhl[k]===hlFilter||(hlFilter==="note"&&S.vnote[k]));
  v.innerHTML=`<div class="label">Bible</div><h1>My highlights and notes</h1>
   <div class="filters" role="group" aria-label="Filter"><button data-hf="" aria-pressed="${!hlFilter}">All (${keys.length})</button>${HL_COLORS.map(([c,l])=>`<button data-hf="${c}" aria-pressed="${hlFilter===c}"><span class="dotc sw-${c}"></span>${l}</button>`).join("")}<button data-hf="note" aria-pressed="${hlFilter==="note"}">With notes</button></div>
   ${keys.length?"":`<p class="muted">Nothing yet. In the Bible or the Mass readings, tap any verse to highlight it or add a note.</p>`}
   <div id="hl-list">${list.map(k=>`<div class="hl-item ${S.vhl[k]?"hl-"+S.vhl[k]:""}"><div class="row" style="justify-content:space-between"><a href="#read-${k.replace(/\|/g,"-")}"><strong>${esc(refLabel(k))}</strong></a><button class="ghost" data-hdel="${k}" aria-label="Remove">Remove</button></div><p class="hl-t" data-hlt="${k}">…</p>${S.vnote[k]?`<p class="vnote"><span class="label">My note</span> ${esc(S.vnote[k])}</p>`:""}</div>`).join("")}</div>`;
  v.querySelectorAll("[data-hf]").forEach(b=>b.onclick=()=>{hlFilter=b.dataset.hf;renderHighlights();});
  v.querySelectorAll("[data-hdel]").forEach(b=>b.onclick=()=>{delete S.vhl[b.dataset.hdel];delete S.vnote[b.dataset.hdel];save();renderHighlights();});
  for(const k of list){const [s,c,n]=k.split("|");try{const B=await loadBook(s);const t=B.chapters.find(x=>x.n===+c)?.verses.find(x=>x[0]===+n);const el=v.querySelector(`[data-hlt="${k}"]`);if(el)el.textContent=t?t[1]:"";}catch(e){}}
}

// ---------- Sharing (WhatsApp and the phone's share sheet) ----------
const PUBLIC_BASE="https://joshua-new-and-improved.github.io/golden-chain/";
function publicUrl(hash){return PUBLIC_BASE+(hash||"");}
async function shareThing(title,text,hash){
  const url=publicUrl(hash);
  if(navigator.share){try{await navigator.share({title,text,url});return;}catch(e){if(e&&e.name==="AbortError")return;}}
  openSheet(`<h2 class="sheet-t">Share</h2><p class="vs-text">${esc(text)}</p>
   <div class="sheet-acts"><a class="btn primary" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(text+"\n"+url)}">WhatsApp</a><button data-sh="copy">Copy link</button><button data-sheetx>Close</button></div>`,root=>{
    root.querySelector('[data-sh="copy"]').onclick=()=>{navigator.clipboard?.writeText(text+"\n"+url).then(()=>toast("Link copied"),()=>toast("Copy is not available here"));};
  },"Share");
}
function addShare(h){
  const v=$("#v-"+h);if(!v||v.querySelector(".share-btn"))return;
  const title=(v.querySelector("h1")?.textContent||"Golden Chain").trim();
  const hash=location.hash||"#"+h;
  if(!/^#(q-|dq-|lesson-|ap-)/.test(hash))return;
  const b=document.createElement("button");b.className="share-btn";b.type="button";b.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l4 4h-3v7h-2V7H8zM5 12h2v7h10v-7h2v9H5z"/></svg>Share`;
  b.onclick=()=>shareThing(title,`${title} · Golden Chain`,hash);
  const h1=v.querySelector("h1");(h1||v.firstElementChild||v).insertAdjacentElement(h1?"afterend":"beforebegin",b);
}

// ---------- Offline: register the service worker (only on the public site) ----------
if("serviceWorker" in navigator&&location.protocol==="https:"&&/github\.io$/.test(location.hostname)){
  addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{});});
}
async function saveBibleOffline(btn){
  if(!("caches" in window)){toast("Offline saving is not available in this browser");return;}
  const idx=await fetchJSON("bible/index.json");let n=0;btn.disabled=true;
  for(const b of idx){try{await fetch("bible/"+b.slug+".json");}catch(e){}n++;btn.textContent=`Saving… ${n}/${idx.length}`;}
  btn.textContent="Whole Bible saved for offline reading";S.offlineBible=true;save();
}

const _renderProgress=renderProgress;
renderProgress=function(){_renderProgress.apply(this,arguments);const v=$("#v-progress");if(!v)return;
  v.insertAdjacentHTML("beforeend",`<div class="panel" style="margin-top:16px"><div class="label">Offline and data</div><p style="margin:.4em 0">Chapters, commentary and pictures you open are kept on this phone, so they open again without using data. You can also save the whole Bible text now (about 5 MB).</p><button id="save-offline" ${S.offlineBible?"disabled":""}>${S.offlineBible?"Whole Bible saved for offline reading":"Save the whole Bible for offline"}</button></div>`);
  const b=$("#save-offline");b&&(b.onclick=()=>saveBibleOffline(b));};

(function(){const n=document.getElementById("ai-notice");if(!n)return;if(S.noticeHidden){n.hidden=true;return;}const x=document.getElementById("ai-notice-x");if(x)x.onclick=()=>{S.noticeHidden=true;save();n.hidden=true;};})();

// chapter arrows: hide while scrolling down through the text, show on scroll up or at the end of the chapter
(function(){let y=scrollY;addEventListener("scroll",()=>{const n=document.querySelector("#v-reader:not([hidden]) .chnav");if(!n){y=scrollY;return;}const d=scrollY-y;if(Math.abs(d)<8)return;const end=innerHeight+scrollY>=document.documentElement.scrollHeight-200;n.classList.toggle("off",d>0&&!end&&scrollY>200);y=scrollY;},{passive:true});})();

// close the desktop "More" menu when clicking elsewhere
document.addEventListener("click",e=>{const nm=document.querySelector(".nav-more[open]");if(nm&&!nm.contains(e.target))nm.open=false;});
