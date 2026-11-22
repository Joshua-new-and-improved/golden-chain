// ---------- Full commentary on every book: Haydock, the Catena aurea, and the Fathers & Doctors ----------
const COMM={idx:null,chunks:{},open:{}};
const THOMAS_LINK={john:["Lectures on John","https://isidore.co/aquinas/english/SSJohn.htm"],matthew:["Lectures on Matthew","https://isidore.co/aquinas/SSMatthew.htm"],job:["Literal Exposition on Job","https://isidore.co/aquinas/english/SSJob.htm"],psalms:["Commentary on the Psalms (Pss 1–54)","https://isidore.co/aquinas/english/PsalmsAquinas"],isaiah:["Commentary on Isaiah","https://aquinas.cc/la/en/~Isaiah"],jeremiah:["Commentary on Jeremiah (chs 1–42)","https://aquinas.cc/la/en/~Jerem"],lamentations:["Commentary on Lamentations","https://isidore.co/aquinas/english/SSLamentations.htm"],romans:["Commentary on Romans","https://aquinas.cc/la/en/~Rom"],"1-corinthians":["Commentary on 1 Corinthians","https://isidore.co/aquinas/english/SS1Cor.htm"],"2-corinthians":["Commentary on 2 Corinthians","https://isidore.co/aquinas/english/SS2Cor.htm"],galatians:["Commentary on Galatians","https://isidore.co/aquinas/english/SSGalatians.htm"],ephesians:["Commentary on Ephesians","https://isidore.co/aquinas/english/SSEph.htm"],philippians:["Commentary on Philippians","https://isidore.co/aquinas/english/SSPhilippians.htm"],colossians:["Commentary on Colossians","https://isidore.co/aquinas/english/SSColossians.htm"],"1-thessalonians":["Commentary on 1 Thessalonians","https://isidore.co/aquinas/english/SS1Thes.htm"],"2-thessalonians":["Commentary on 2 Thessalonians","https://aquinas.cc/la/en/~2Thess"],"1-timothy":["Commentary on 1 Timothy","https://aquinas.cc/la/en/~1Tim"],"2-timothy":["Commentary on 2 Timothy","https://aquinas.cc/la/en/~2Tim"],titus:["Commentary on Titus","https://aquinas.cc/la/en/~Titus"],philemon:["Commentary on Philemon","https://isidore.co/aquinas/english/SSPhilemon.htm"],hebrews:["Commentary on Hebrews","https://isidore.co/aquinas/english/SSHebrews.htm"]};
const CATENA_NOTE={"Pseudo-Chrysostom":"The 'Unfinished Work on Matthew' (Opus imperfectum), which Thomas believed was Chrysostom's; its unknown 5th-century author held Arian views on some points. Thomas used only what agrees with the faith.","Theophylact":"Byzantine archbishop of Ohrid (d. c. 1107), writing after 1054; Thomas drew on his commentaries, which largely summarise Chrysostom.","Origen":"Not a saint; some of his speculations were later condemned. Thomas cites him where he agrees with the faith.","The Gloss":"The Glossa ordinaria, the standard medieval Latin compilation of the Fathers' notes on the Bible.","Greek Expositor":"An unnamed Greek commentator quoted from the catenae Thomas had translated for him.","Pseudo-Jerome":"A commentary once ascribed to St Jerome; its true author is unknown."};
async function loadCommIndex(){if(!COMM.idx){try{COMM.idx=await fetchJSON("comm/index.json");}catch(e){COMM.idx={books:{},authors:{}};}}return COMM.idx;}
async function loadComm(slug,ch){
  const I=await loadCommIndex(), b=I.books[slug]; if(!b) return null;
  const k=b.chunks.find(([a,z])=>ch>=a&&ch<=z); if(!k) return null;
  if(!COMM.chunks[k[2]]){try{COMM.chunks[k[2]]=await fetchJSON("comm/"+k[2]);}catch(e){COMM.chunks[k[2]]={ch:{}};}}
  const C=COMM.chunks[k[2]];
  return {d:C.ch[ch]||{},intro:C.intro||(b.chunks[0][2]===k[2]?null:undefined)};
}
async function commIntro(slug){const I=await loadCommIndex(),b=I.books[slug];if(!b)return "";const f=b.chunks[0][2];if(!COMM.chunks[f]){try{COMM.chunks[f]=await fetchJSON("comm/"+f);}catch(e){return "";}}return COMM.chunks[f].intro||"";}
const paraHTML=t=>String(t||"").split(/\n\s*\n|\n/).filter(x=>x.trim()).map(p=>`<p>${esc(p)}</p>`).join("");
const vlab=(a,z)=>a===z?`v. ${a}`:`vv. ${a}–${z}`;
function longText(t,cls=""){const L=String(t||"");if(L.length<900)return `<div class="ct ${cls}">${paraHTML(L)}</div>`;return `<div class="ct clamp ${cls}">${paraHTML(L)}</div><button class="ghost ct-more" data-ctmore>Read all (${Math.round(L.length/1000)}k characters)</button>`;}
// What commentary touches verse v (entries anchored at their first verse)
function commAt(d,v,slug,ch){
  const cov=(x,max)=>x[0]===v||(x[0]<v&&v<=x[1]&&x[1]-x[0]<=max);
  const h=(d.h?.n||[]).filter(x=>cov(x,4)), c=(d.c||[]).filter(x=>cov(x,8)), f=(d.f||[]).filter(x=>cov(x,5));
  const w=slug&&typeof wordFor==="function"?wordFor(slug,ch,v):null, x=slug&&typeof xrefsFor==="function"?xrefsFor(slug,ch,v):[];
  return {h,c,f,w,x,n:h.length+c.reduce((s,y)=>s+y[2].length,0)+f.length+(w?1:0)+x.length};
}
function commPanelHTML(slug,ch,d,v,opts={}){
  const A=COMM.idx?.authors||{};
  const {h,c,f,w,x}=commAt(d,v,slug,ch);
  const tabs=[];
  if(w) tabs.push(["word","Greek & Latin",1]);
  if(h.length) tabs.push(["hay","Haydock",h.length]);
  if(c.length&&!opts.noCatena) tabs.push(["cat","Golden Chain",c.reduce((s,x)=>s+x[2].length,0)]);
  if(f.length) tabs.push(["fat","Fathers & Doctors",f.length]);
  if(x.length&&!opts.noLinks) tabs.push(["lnk","In the course",x.length]);
  if(!tabs.length) return "";
  const pick=w?"word":tabs.find(t=>t[0]===S.commTab)?S.commTab:tabs[0][0];
  const hay=h.map(x=>`<div class="hay-n"><div class="vr">${vlab(x[0],x[1])}</div>${longText(x[2])}</div>`).join("");
  const cat=c.map(x=>`<div class="ca-sec"><div class="vr">${vlab(x[0],x[1])}</div>${x[2].map(([a,src,en])=>`<div class="cf"><div><button data-cauth="${esc(a)}">${esc(a)}</button>${src?`<div class="src-l no-tag">${esc(src)}</div>`:""}</div><div class="cat-en">${paraHTML(en)}</div></div>`).join("")}</div>`).join("");
  // group Fathers by author, keep chronological order of first appearance
  const groups=[];f.forEach(x=>{let g=groups.find(g=>g.a===x[2]);if(!g){g={a:x[2],items:[]};groups.push(g);}g.items.push(x);});
  const fat=groups.map(g=>{const au=A[g.a]||{n:"?"};return `<div class="fa-g"><div class="fa-h"><button data-fauth="${g.a}">${esc(au.n)}</button>${au.y?`<span class="muted">${au.y<0?(-au.y)+" BC":"d. c. "+au.y}</span>`:""}${au.note?`<span class="chip warn" title="${esc(au.note)}">note</span>`:""}</div>${g.items.map(x=>`<div class="fa-i"><div class="src-l no-tag">${esc(x[3]||"")}${x[1]>x[0]?` · on ${vlab(x[0],x[1])}`:""}</div>${longText(x[4])}</div>`).join("")}</div>`;}).join("");
  const body={word:w?wordHTML(w):"",lnk:x.length?`<p class="muted" style="font-size:.85rem;margin:.6em 0">Where this verse is discussed in the Academy, Theology, Apologetics or Questions.</p>${xrefHTML(x)}`:"",hay:`${hay}<p class="csrc">George Leo Haydock, <em>Catholic Bible Commentary</em> (1859), compiling Challoner, Calmet, Menochius, Witham, Worthington and the Fathers. Public domain.</p>`,cat:`${cat}<p class="csrc">St Thomas Aquinas, <em>Catena aurea</em>, Newman's translation (1841–45). Public domain.</p>`,fat:`${fat}<p class="csrc">From the Historical Christian Faith Commentaries Database (public-domain translations), limited to Catholic Fathers and Doctors.</p>`};
  return `<div class="cpanel" data-cp="${v}"><div class="ctabs" role="tablist">${tabs.map(([k,l,n])=>`<button role="tab" data-ctab="${k}" aria-selected="${k===pick}">${l} <span class="n">${n}</span></button>`).join("")}</div>
   ${tabs.map(([k])=>`<div class="cbody" data-cbody="${k}" ${k===pick?"":"hidden"}>${body[k]}</div>`).join("")}</div>`;
}
function commBtn(d,v,slug,ch){const {n,h,c,f,w,x}=commAt(d,v,slug,ch);if(!n)return "";const parts=[w?"Greek & Latin":"",h.length?"Haydock":"",c.length?"Golden Chain":"",f.length?`${f.length} Father${f.length>1?"s":""}`:"",x.length?"Course":""].filter(Boolean).join(" · ");return `<button class="vc-btn${w?" has-word":""}" data-vc="${v}" aria-expanded="false">${w?"Word study + commentary":"Commentary"} <span class="muted">${esc(parts)}</span></button>`;}
function wireComm(root,slug,ch,d,opts={}){
  root.querySelectorAll("[data-vc]").forEach(b=>b.onclick=()=>{
    const v=+b.dataset.vc, host=b.nextElementSibling&&b.nextElementSibling.classList.contains("vc-host")?b.nextElementSibling:null;if(!host)return;
    const open=b.getAttribute("aria-expanded")==="true";
    if(open){host.innerHTML="";b.setAttribute("aria-expanded","false");return;}
    host.innerHTML=commPanelHTML(slug,ch,d,v,opts);b.setAttribute("aria-expanded","true");wirePanel(host);
  });
}
function wirePanel(host){
  host.querySelectorAll("[data-ctab]").forEach(t=>t.onclick=()=>{S.commTab=t.dataset.ctab;save();const p=t.closest(".cpanel");p.querySelectorAll("[data-ctab]").forEach(x=>x.setAttribute("aria-selected",x===t));p.querySelectorAll("[data-cbody]").forEach(x=>x.hidden=x.dataset.cbody!==t.dataset.ctab);});
  host.querySelectorAll("[data-ctmore]").forEach(b=>b.onclick=()=>{b.previousElementSibling.classList.remove("clamp");b.remove();});
  host.querySelectorAll("[data-fauth]").forEach(b=>b.onclick=()=>{const a=COMM.idx.authors[b.dataset.fauth];if(a)toast(`${a.n}${a.y?` (${a.y<0?(-a.y)+" BC":"d. c. "+a.y})`:""}. ${a.note||""}`);});
  host.querySelectorAll("[data-cauth]").forEach(b=>b.onclick=()=>{const n=b.dataset.cauth;toast(CATENA_NOTE[n]?`${n}: ${CATENA_NOTE[n]}`:`${n}, quoted by St Thomas in the Catena aurea.`);});
  host.querySelectorAll(".ct, .cat-en").forEach(tagTerms);
}
// Chapter header: Haydock's introduction (chapter 1) and chapter note; link to Thomas
async function commChapterHead(slug,ch,d){
  const tl=THOMAS_LINK[slug];
  let out="";
  if(ch===1){const intro=await commIntro(slug);if(intro)out+=`<details class="hay-intro"><summary>Haydock's introduction to the book</summary>${paraHTML(intro)}</details>`;}
  if(d.h?.p)out+=`<details class="hay-intro" open><summary>Haydock on this chapter</summary>${paraHTML(d.h.p)}</details>`;
  if(tl)out+=`<p class="ui thomas-link">St Thomas: <a href="${tl[1]}" target="_blank" rel="noopener">${esc(tl[0])}, chapter ${ch} ↗</a> <span class="muted">(full text online; modern translation under copyright, so not reproduced here)</span></p>`;
  return out;
}
let COMM_CUR=null; // {slug,ch,d} for the chapter on screen
function commSummary(d,v,slug,ch){const {n,h,c,f,w,x}=commAt(d,v,slug,ch);if(!n)return "";return [c.length?"Golden Chain (St Thomas)":"",f.length?`${f.length} Father${f.length>1?"s":""} & Doctor${f.length>1?"s":""}`:"",h.length?"Haydock":"",w?"Greek & Latin":"",x.length?"In the course":""].filter(Boolean).join(" · ");}
function openCommSheet(slug,ch,d,v){const html=commPanelHTML(slug,ch,d,v);if(!html)return;
  openSheet(`<div class="label">Commentary · ${esc(nameOf(slug))} ${ch}:${v}</div><p class="vs-text">${esc((()=>{const el=document.querySelector(`p.v[data-ref="${slug}|${ch}|${v}"]`);if(!el)return "";const t=verseText(el);return t.length>260?t.slice(0,258)+"…":t;})())}</p><div class="cs-host">${html}</div><div class="sheet-acts"><button data-cs="prev">‹ Verse ${v-1>0?v-1:""}</button><button data-cs="next">Verse ${v+1} ›</button><button class="primary" data-cs="done">Done</button></div>`,root=>{
    wirePanel(root);
    const go=dv=>{let n=v+dv;const max=500;while(n>0&&n<max&&!commAt(d,n,slug,ch).n)n+=dv;if(n>0&&n<max&&commAt(d,n,slug,ch).n){openCommSheet(slug,ch,d,n);const el=document.querySelector(`p.v[data-ref="${slug}|${ch}|${n}"]`);el&&el.scrollIntoView({block:"center"});}else toast("No more commentary in this chapter");};
    root.querySelector('[data-cs="prev"]').onclick=()=>go(-1);root.querySelector('[data-cs="next"]').onclick=()=>go(1);root.querySelector('[data-cs="done"]').onclick=closeSheet;
  },"Commentary on verse "+v);}
async function attachChapterComm(B,chap){
  const host=document.getElementById("units");if(!host)return;
  const r=await loadComm(B.slug,chap.n);if(!r)return;const d=r.d;
  COMM_CUR={slug:B.slug,ch:chap.n,d};
  const head=document.getElementById("comm-head");if(head)head.innerHTML=await commChapterHead(B.slug,chap.n,d);
  if(S.view==="scripture")return;
  const vs=[];
  host.querySelectorAll("p.v[id], .latrow[id]").forEach(el=>{
    const v=+el.id.split("-").pop();const btn=commBtn(d,v,B.slug,chap.n);if(!btn)return;vs.push(v);
    if(S.commInline){let after=el; if(after.nextElementSibling&&after.nextElementSibling.classList.contains("cnote")) after=after.nextElementSibling;
      after.insertAdjacentHTML("afterend",btn+`<div class="vc-host"></div>`);}
    else{const pv=el.matches("p.v")?el:el.querySelector("p.v");if(pv&&!pv.querySelector(".cm-dot")){pv.classList.add("hasc");pv.insertAdjacentHTML("beforeend",`<button class="cm-dot" data-cv="${v}" aria-label="Commentary on verse ${v}" title="Commentary on verse ${v}"></button>`);}}
  });
  if(S.commInline){wireComm(host,B.slug,chap.n,d);if(S.commAll) host.querySelectorAll("[data-vc]").forEach(b=>b.click());return;}
  host.querySelectorAll("[data-cv]").forEach(b=>b.onclick=e=>{e.stopPropagation();openCommSheet(B.slug,chap.n,d,+b.dataset.cv);});
  if(!vs.length)return;
  const nm=nameOf(B.slug);
  host.insertAdjacentHTML("beforeend",`<section class="ccbox" id="ccbox"><div class="cc-h"><div><div class="label">After reading</div><h3>Commentary on ${esc(nm)} ${chap.n}</h3><p class="muted">The Fathers and Doctors, St Thomas's Golden Chain, Haydock, and the Greek and Latin, verse by verse. Open a verse, or tap a verse in the text.</p></div><button class="ghost" data-ccall>${S.commAll?"Close all":"Open all"}</button></div>
   <div class="cc-list">${vs.map(v=>`<details class="cc-v" data-ccv="${v}"${S.commAll?" open":""}><summary><span class="cc-n">${chap.n}:${v}</span> <span class="cc-t">${esc((()=>{const el=host.querySelector(`p.v[data-ref="${B.slug}|${chap.n}|${v}"]`);if(!el)return "";const t=verseText(el);return t.length>90?t.slice(0,88)+"…":t;})())}</span><span class="cc-s">${esc(commSummary(d,v,B.slug,chap.n))}</span></summary><div class="cc-b"></div></details>`).join("")}</div></section>`);
  const box=host.querySelector("#ccbox");
  const fill=det=>{if(det.dataset.done)return;det.dataset.done=1;const b=det.querySelector(".cc-b");b.innerHTML=commPanelHTML(B.slug,chap.n,d,+det.dataset.ccv);wirePanel(b);};
  box.querySelectorAll(".cc-v").forEach(det=>{det.addEventListener("toggle",()=>{if(det.open)fill(det);});if(det.open)fill(det);});
  box.querySelector("[data-ccall]").onclick=()=>{S.commAll=!S.commAll;save();box.querySelectorAll(".cc-v").forEach(x=>{x.open=S.commAll;});box.querySelector("[data-ccall]").textContent=S.commAll?"Close all":"Open all";};
}
// For the John 1–6 study units: Haydock and the other Fathers for the unit's verses (the Catena is already shown)
async function attachUnitComm(B,chap){
  const r=await loadComm(B.slug,chap.n);if(!r)return;const d=r.d;
  const head=document.getElementById("comm-head");if(head)head.innerHTML=await commChapterHead(B.slug,chap.n,d);
  document.querySelectorAll("#units .unit").forEach(u=>{
    const uu=(typeof UNITS!=="undefined"?UNITS:[]).find(x=>x.id===u.id);if(!uu)return;
    const vv=[];for(let n=uu.v[0];n<=uu.v[uu.v.length-1];n++)vv.push(n);
    const any=vv.some(v=>{const a=commAt(d,v,B.slug,chap.n);return a.h.length||a.f.length||a.w||a.x.length;});if(!any||S.view==="scripture")return;
    const g=u.querySelector(".gloss .unit-tools")||u.lastElementChild;
    g.insertAdjacentHTML("beforebegin",`<details class="fathers more-comm"><summary>Haydock and more Fathers on ${vlab(vv[0],vv[vv.length-1])}</summary><div class="mc-body"></div></details>`);
    const det=u.querySelector(".more-comm");det.addEventListener("toggle",()=>{if(det.open&&!det.dataset.done){det.dataset.done=1;const b=det.querySelector(".mc-body");b.innerHTML=vv.map(v=>{const p=commPanelHTML(B.slug,chap.n,d,v,{noCatena:true});return p?`<div class="vr" style="margin-top:8px">${vlab(v,v)}</div>${p}`:"";}).join("");wirePanel(b);}});
  });
}
