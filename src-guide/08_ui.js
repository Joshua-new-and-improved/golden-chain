// ---------- UI layer (loaded last): image-led home and academy, study-guide lessons and readers, gallery, apologetics ----------
VIEWS.push("apologetics","gallery","questions","prayers","timeline","theology","mass","highlights","hours");
S.explain=S.explain||{}; S.sort=S.sort||{}; S.apol=S.apol||{}; S.plan=S.plan||{items:[],done:{}}; S.qread=S.qread||{};
function route(){
  {const need=packsFor(location.hash).filter(n=>!PACK_OK[n]);
   if(need.length){const t=setTimeout(()=>packLoading(true),150);packLoad(need).then(()=>{clearTimeout(t);packLoading(false);route();}).catch(()=>{clearTimeout(t);packLoading(false);toast("Couldn't load this page. Check your connection and try again.");});return;}}
  if(typeof closeSheet==="function")closeSheet();
  {const lb=$("#lightbox");if(lb)lb.hidden=true;const tc=$("#termcard");if(tc)tc.hidden=true;}
  let h=(location.hash||"#home").slice(1); let lesson=null;
  if(h.startsWith("lesson-")){lesson=h.slice(7);h="lesson";}
  let qid=null; if(h.startsWith("q-")){qid=h.slice(2);h="questions";}
  let dqid=null; if(h.startsWith("dq-")){dqid=h.slice(3);h="theology";}
  let sArg=null; if(h.startsWith("search-")){sArg=h.slice(7);h="search";}
  let mdate=null; if(h.startsWith("mass-")){mdate=h.slice(5);h="mass";}
  let hkey=null; if(h.startsWith("hours-")){hkey=h.slice(6);h="hours";}
  let gid=null; if(h.startsWith("group-")){gid=h.slice(6);h="group";}
  let jcode=null; if(h.startsWith("join-")){jcode=h.slice(5);h="groups";} let cccArg=null; if(h.startsWith("catechism-")){cccArg=h.slice(10);h="catechism";} let stArg=null; if(h.startsWith("saints-")){stArg=h.slice(7);h="saints";} let calArg=null; if(h.startsWith("calendar-")){calArg=h.slice(9);h="calendar";} let advArg=null; if(h==="advent"||h.startsWith("advent-")){advArg=h.slice(7)||null;h="advent";}
  if(h!=="group"&&typeof gcLeave==="function")gcLeave();
  let apJump=null; if(h.startsWith("ap-")){apJump=h.slice(3);apTab="disps";apFam="all";h="apologetics";}
  if(h.startsWith("read-")){const m=h.slice(5).match(/^(.+)-(\d+)-(\d+)$/);if(m){S.book=m[1];S.ch=+m[2];S.pos={b:m[1],c:+m[2],v:+m[3]};S.view=S.view==="scripture"?"interwoven":S.view;save();}h="reader";}
  if(h==="reader") renderReader._restore=true;
  if(["reader","mass","hours","theology","academy","lesson","questions","prayers","apologetics","highlights"].includes(h)){S.lastRoute=location.hash||"#"+h;save();}
  if(!VIEWS.includes(h)) h="home";
  VIEWS.forEach(v=>$("#v-"+v).hidden=v!==h);
  $$("nav.main a").forEach(a=>{if(a.getAttribute("href")==="#"+(h==="lesson"?"academy":h==="group"||h==="advent"?"groups":h==="timeline"||h==="highlights"?"reader":h))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  {const nm=$(".nav-more");if(nm){nm.open=false;nm.classList.toggle("cur",!!nm.querySelector("a[aria-current]"));}}
  try{const r=({home:renderHome,reader:renderReader,academy:renderAcademy,lesson:()=>renderLesson(lesson),apologetics:renderApologetics,gallery:renderGallery,questions:()=>renderQuestions(qid),prayers:renderPrayers,timeline:renderTimeline,theology:()=>renderTheology(dqid),mass:()=>renderMass(mdate),hours:()=>renderHours(hkey),groups:()=>renderGroups(jcode),group:()=>renderGroup(gid),highlights:renderHighlights,glossary:renderGlossary,cards:renderCards,search:()=>renderSearch(sArg),progress:renderProgress,support:renderSupport,challenges:renderChallenges,calendar:()=>renderCalendar(calArg),saints:()=>renderSaints(stArg),catechism:()=>renderCatechism(cccArg),"support-thanks":renderSupportThanks,advent:()=>renderAdvent(advArg)})[h]();if(r&&r.catch)r.catch(viewError);}catch(err){viewError(err);}
  const vis=VIEWS.map(v=>$("#v-"+v)).find(x=>x&&!x.hidden); if(vis) linkDOIs(vis);
  $$(".co-h").forEach(h=>{const t=h.firstChild;if(!t||t.nodeType!==3)return;const m=t.nodeValue.match(/^\[(Core|Warn|Apply|Stance|Extra)\]\s*/);if(!m)return;t.nodeValue=t.nodeValue.slice(m[0].length);const s=document.createElement("span");s.className="ktag";s.textContent=m[1]==="Warn"?"Caution":m[1];h.prepend(s);});
  const cur=$("nav.main a[aria-current]"); if(cur&&cur.scrollIntoView){const n=cur.closest("nav");if(n&&n.scrollWidth>n.clientWidth)n.scrollLeft=cur.offsetLeft-n.clientWidth/2+cur.offsetWidth/2;}
  window.scrollTo(0,0);
  if(apJump){const el=document.getElementById(apJump);if(el){el.scrollIntoView();el.classList.add("flash");}}
  document.body.dataset.view=h;
  if(typeof syncTabbar==="function")syncTabbar(h);
  if(typeof addShare==="function")try{addShare(h);}catch(e){}
}
function viewError(err){
  try{console.error(err);const v=VIEWS.map(x=>$("#v-"+x)).find(x=>x&&!x.hidden)||$("#v-home");
  v.insertAdjacentHTML("afterbegin",`<div class="co warn" role="alert" style="margin:12px 0"><div class="co-h">This page could not open</div><p>Something went wrong on this device (${esc(String(err&&err.message||err)).slice(0,160)}). Try reloading; if it keeps happening, send this message to the site's editor.</p><button onclick="location.reload()">Reload</button></div>`);}catch(e){}
}
window.addEventListener("error",e=>{if(e&&e.message&&!/ResizeObserver|Script error/.test(e.message))viewError(e.error||e.message);});
window.addEventListener("unhandledrejection",e=>viewError(e.reason));
function lessonName(k){return {a1:"Apologetics track",t4:"T4 De Deo Trino",t5:"T5 Creation",t6:"T6 Fundamental moral",t11:"T11 Christology",t15:"T15 Eschatology",f3:"F3 Philosophy of nature",f4:"F4 Metaphysics"}[k]||k;}
const imgSrc=(k,small)=>IMG_BY[k]?`img/${k}${small?"-s":""}.webp`:"";
const imgTag=(k,small,cls="")=>IMG_BY[k]?`<img src="${imgSrc(k,small)}" alt="${esc(IMG_BY[k].t)}" loading="lazy" ${cls?`class="${cls}"`:""}>`:"";

// Lightbox for any [data-zoom] image
document.addEventListener("click",e=>{
  const z=e.target.closest("[data-zoom]");
  if(z){const i=IMG_BY[z.dataset.zoom];if(!i)return;const lb=$("#lightbox");
    lb.innerHTML=`<button data-lbx aria-label="Close">✕ Close</button><img src="img/${i.k}.webp" alt="${esc(i.alt||i.t)}"><p><b>${esc(i.t)}</b><br>${esc(imgCredit(i))}</p>`;lb.hidden=false;lb.querySelector("button").focus();return;}
  if(e.target.closest("[data-lbx]")||e.target.id==="lightbox") $("#lightbox").hidden=true;
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#lightbox").hidden)$("#lightbox").hidden=true;});

// ---------- Home ----------
async function fillHomeToday(){
  const el=$("#home-today");if(!el||typeof loadLect!=="function")return;
  try{const L=await loadLect();const iso=todayISO();const e=L[iso];if(!e){el.querySelector("p").textContent="Today's readings are not in the calendar yet.";return;}
    const col=(COLOR[e.c]||["",""]);const note=(typeof MASS_NOTES!=="undefined")?MASS_NOTES[iso]:null;const g=e.r.find(r=>r.k==="Gospel");
    el.style.setProperty("--lc",col[1]);
    el.innerHTML=`<div class="label"><span class="lc-dot"></span>Today · ${esc(new Date(iso+"T12:00:00").toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"}))}</div>
     ${typeof obligationFor==="function"?obligHTML(obligationFor(iso,L),false):""}
     <h2 class="tc-day">${esc(e.n)}</h2>${note?`<p class="tc-theme">${esc(note.t)}</p>`:""}
     ${typeof saintsFor==="function"&&saintsFor(iso).length?`<p class="tc-saint">✠ ${esc(saintsFor(iso).map(x=>x.n).join(" · "))}</p>`:""}
     <p class="muted tc-refs">${e.r.filter(r=>!/Psalm|Canticle/.test(r.k)).map(r=>esc(r.ref)).join(" · ")}</p>
     <div class="row" style="margin-top:10px"><a class="btn primary" href="#mass">Read today's Mass</a>${g?`<a class="btn" href="#read-${g.p[0][0]}-${g.p[0][1]}-${g.p[0][2]}">Gospel in the Bible</a>`:""}</div>`;}catch(err){}
}
function renderHome(){
  const due=Object.values(S.cards).filter(c=>c.due<=Date.now()).length;
  const r=S.resume?UNITS.find(u=>u.id===S.resume):null;
  const nLessons=Object.keys(LESSONS).length;
  const tiles=[
   ["#reader","john-patmos","Bible","Scripture with the Fathers","All 73 books with the Fathers, St Thomas's Golden Chain and Haydock on almost every verse; Latin and Greek; highlights and notes."],
   ["#academy","thomas-trent","Academy","A first-cycle course",`The full course: ${nLessons} lessons from logic to the comprehensive exam, with an integration track on psychology.`],
   ["#hours","last-supper","Hours","The prayer of the Church","Morning, Daytime, Evening and Night Prayer and the Office of Readings, with psalms in the Douay-Rheims."],
   ["#theology","jacobs-ladder","Theology","The hardest questions, made clear",`${Math.max(DQ.length,typeof DQ_N!=="undefined"?DQ_N:0)} disputed questions in Summa form, from angels' bodies and grace to the Papacy, Palamism and hard texts of Scripture.`],
   ["#lesson-p1","doctors-temple","Integration","Psychology and theology","Four modules integrating the whole of psychology with Thomistic anthropology: causes, domains, clinical conditions and care."],
   ["#apologetics","augustine-heresy","Apologetics","Answer the objections",`${DISPS.length} disputations on contested verses, with Protestant, Orthodox, Muslim and non-Trinitarian readings.`],
   ["#gallery","notre-dame","Gallery","Saints and churches",`${IMAGES.length} public-domain works from the National Gallery of Art.`],
   ["#questions","madonna-giotto","Questions","Life's questions, answered deeply",`${QAS.length} questions on love, dating, marriage, the passions, conscience and prayer, with Thomas, real cases and analogies.`],
   ["#prayers","thomas-crucifix","Prayers","Prayers and your daily rule",`${PRAYERS.length} prayers and devotions explained, with a planner to build and tick off your day.`],
   ["#cards","four-doctors","Flashcards",`${due} card${due===1?"":"s"} due`,"Tap any underlined term to look it up; it joins your spaced-repetition deck."]];
  const cont=S.pos&&S.pos.b?{h:`#read-${S.pos.b}-${S.pos.c}-${S.pos.v}`,t:`${nameOf(S.pos.b)} ${S.pos.c}:${S.pos.v}`}:(S.book?{h:"#reader",t:`${nameOf(S.book)} ${S.ch||1}`}:null);
  const lessonKey=S.lastLesson&&LESSONS[S.lastLesson]?(isDone(S.lastLesson)?(()=>{const ls=modLessons(modOf(S.lastLesson)),i=ls.indexOf(S.lastLesson);return ls.slice(i+1).find(x=>!isDone(x))||ls.find(x=>!isDone(x))||S.lastLesson;})():S.lastLesson):null;
  const fresh=!S.homeSeen;
  const QI={bible:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M12 7v7M9.5 9.5h5"/>',mass:'<path d="M12 2v20M6.5 8h11"/>',hours:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',pray:'<path d="M12 3c1.6 2 2.2 3.4 2.2 4.6A2.2 2.2 0 0 1 12 9.8a2.2 2.2 0 0 1-2.2-2.2C9.8 6.4 10.4 5 12 3z"/><path d="M9.5 12h5v9h-5z"/><path d="M7 21h10"/>',ccc:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>',saints:'<ellipse cx="12" cy="4.5" rx="5" ry="1.8"/><circle cx="12" cy="10.5" r="3"/><path d="M5.5 21c.6-4 3.2-6 6.5-6s5.900 2 6.5 6"/>',ask:'<circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.3a2.8 2.8 0 1 1 3.900 2.600c-.8.4-1.2 1-1.2 1.900"/><path d="M12 17.2v.1"/>',learn:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.4 2.700 2.8 6 2.8s6-1.4 6-2.8v-4.5M22 9v6"/>'};
  const quick=[["#reader","bible","Bible"],["#mass","mass","Mass"],["#hours","hours","Hours"],["#prayers","pray","Prayers"],["#catechism","ccc","Catechism"],["#saints","saints","Saints"],["#questions","ask","Questions"],["#academy","learn","Learn"]];
  const tImg=k=>k.startsWith("saints/")?`<img src="img/${k}-s.webp" alt="" loading="lazy" decoding="async" style="object-position:center 18%">`:imgTag(k,true);
  tiles.splice(2,0,["#catechism","gregory","Catechism","The faith, one step at a time","96 short, plain-English sections on everything Catholics believe, with courses for the sacraments."],["#saints","saints/zurbaran","Saints","Lives told in depth","Sixteen saints: what they did, what they really said, and which famous stories are legend, with museum art you can zoom into."]);
  $("#v-home").innerHTML=`
  ${fresh?`<div class="hero">${imgTag("st-peters",false)}<div class="in"><div class="label">Scripture · Mass · Theology · Prayer</div>
   <h1>Read Scripture with St Thomas and the Fathers.</h1>
   <p>The whole Catholic Bible with the Church Fathers on almost every verse, each day's Mass explained, and the hard questions of the faith answered.</p></div>
   <span class="cap">${esc(IMG_BY["st-peters"]?.t||"")} · NGA, CC0</span></div>`:""}
  <div id="home-today" class="today-card"><div class="label">Today</div><h2 class="tc-day">${esc(new Date().toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"}))}</h2><p class="muted" style="margin:0">Loading today's Mass…</p></div>
  <nav class="qgrid" aria-label="Quick links">${quick.map(([h,i,t])=>`<a class="qa" href="${h}"><svg viewBox="0 0 24 24" aria-hidden="true">${QI[i]}</svg>${t}</a>`).join("")}</nav>
  ${cont||lessonKey?`<div class="cont-row">${cont?`<a class="cont" href="${cont.h}"><span class="label">Continue reading</span><strong>${esc(cont.t)}</strong></a>`:""}${lessonKey&&LESSONS[lessonKey]?`<a class="cont" href="#lesson-${lessonKey}"><span class="label">Continue learning · ${Object.keys(LESSONS).filter(isDone).length} of ${Object.keys(LESSONS).length} completed</span><strong>${esc(LESSONS[lessonKey].code||lessonKey.toUpperCase())}: ${esc(shortT(LESSONS[lessonKey].title))}</strong></a>`:""}</div>`:""}
  ${typeof streakCardHTML==="function"?streakCardHTML():""}
  ${fresh?`<div class="start-here"><div class="row" style="justify-content:space-between;align-items:center"><div class="label">New here? Start with these</div><button class="ghost" data-homeseen>Hide</button></div>
   <ol><li>Read today's Mass (the card above), then pray the <a href="#hours">Hour</a> of the day.</li><li><a href="#read-mark-1-1">Open the Gospel of Mark</a> and tap <em>Commentary</em> under any verse to hear the Fathers on it. Tap a verse to highlight it.</li><li>Browse <a href="#questions">Life's questions</a> (love, dating, prayer, doubt) or <a href="#theology">the hard questions</a> of the faith.</li><li>On your phone, use your browser's <em>Share → Add to Home Screen</em> to keep Golden Chain like an app.</li></ol></div>`:""}
  <div class="home-h"><h2>Explore</h2></div>
  <div class="tiles">${tiles.map(([h,k,lab,t,d])=>`<a class="tile" href="${h}">${tImg(k)}<div class="t"><div class="label">${lab}</div><h3>${esc(t)}</h3><p class="muted" style="margin:0;font-size:.92rem">${esc(d)}</p></div></a>`).join("")}</div>
  ${churchPanel()}
  <div class="grid2">
   <div class="panel"><div class="label">Reading paths</div>
    <div style="display:grid;gap:4px;margin-top:10px">${READING_PATHS.map(p=>`<a class="path" href="${p.h}" style="color:inherit;text-decoration:none"><div class="n">${p.n}</div><div><strong>${esc(p.title)}</strong><div class="muted" style="font-size:.92rem">${esc(p.pair)}</div><span class="chip ok">${esc(p.status)}</span></div></a>`).join("")}</div></div>
   <div class="panel"><div class="label">From the Prologue of St John</div>
    <p style="font-family:var(--f-read);font-size:1.35rem;line-height:1.45;margin:.5em 0">In the beginning was the Word, and the Word was with God, and the Word was God.</p>
    <p class="muted" style="font-family:var(--f-read);font-style:italic;margin:0">In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.</p>
    <p class="ui muted" style="font-size:.75rem">John 1:1 · Douay-Rheims · Clementine Vulgate</p>
    <div class="row" style="margin-top:14px"><a class="chip" href="#glossary">${TERMS.length} term cards</a><a class="chip" href="#progress">${Object.keys(LESSONS).filter(isDone).length} lessons completed</a></div></div></div>`;
  $("[data-homeseen]")&&($("[data-homeseen]").onclick=()=>{S.homeSeen=true;save();$(".start-here").remove();});
  fillHomeToday();
}

// ---------- Academy ----------
const FALLBACK_IMG=["rouen","salisbury","antwerp","notre-dame-apse","church-interior","easby","santa-maria-febbre","oude-kerk","hertogenbosch","pantheon"];
function renderAcademy(){
  let fb=0;
  $("#v-academy").innerHTML=`<div class="label">The Academy</div><h1>A first-cycle course in Thomistic theology</h1>
  <p style="max-width:44em;color:var(--muted);font-size:1.08rem">A year of philosophy, three years of theology, and an integration track on psychology. Each lesson is a study guide: plain-language opener, colour-keyed notes, checks, a sort game, flip cards, a quiz, and an article to construct. Tick each lesson off as you finish it; a ★ marks a lesson whose quiz you passed at 80%.</p>
  ${academyContinue()}
  ${YEARS.map(y=>`<div class="track"><h2>${esc(y.y)}</h2><div class="mods">${y.mods.map(([c,t,e,k0])=>{const k=k0&&LESSONS[k0]?k0:null;const [st,cl]=k?modStatus(k):["In preparation",""];const im=k&&LESSON_IMG[k]?LESSON_IMG[k]:FALLBACK_IMG[fb++%FALLBACK_IMG.length];
    const ls=k?modLessons(k):[];const [d,n]=k?modDone(k):[0,0];
    return `<div class="mod ${k?"open":""}">${imgTag(im,true)}<div class="mb"><div class="code">${c}</div><div class="title">${esc(t)}</div><div class="meta tabular">${e} ECTS-eq. · ${k?n+" lesson"+(n>1?"s":""):"In preparation"}${k&&d===n?` <span class="chip ok">Completed</span>`:""}</div>
     ${k&&n>1?`<div class="modprog" data-modprog="${k}"><div class="bar"><i style="width:${d/n*100}%"></i></div><span class="mp-t">${d} of ${n} completed</span></div>`:""}
     ${k?`<div class="row-acts"><a class="btn primary" href="#lesson-${nextLesson(k)}">${d===0?"Start":d===n?"Review":"Continue"}</a>${n===1?`<span class="mod-tick">${doneTick(k,true)}</span>`:""}</div>
     ${n>1?`<details class="msyl"><summary>Syllabus · ${n} lessons</summary><ol class="syl">${ls.map(x=>`<li class="${isDone(x)?"done":""}">${doneTick(x)}<a href="#lesson-${x}">${esc(LESSONS[x].title)}</a>${isMastered(x)?`<span class="mast" title="Quiz score 80% or more">★</span>`:""}</li>`).join("")}</ol></details>`:""}`:""}</div></div>`;}).join("")}</div></div>`).join("")}
  <div class="track"><h2>Apologetics track</h2><div class="mods"><div class="mod open">${imgTag("augustine-heresy",true)}<div class="mb"><div class="code">A1</div><div class="title">Answering objections to Catholic readings of Scripture</div><div class="meta">${DISPS.length} disputations · ${TRADS.length} tradition profiles</div><a class="btn primary" href="#apologetics">Open</a></div></div></div></div>`;
}

function academyContinue(){const n=Object.keys(LESSONS).length,d=Object.keys(LESSONS).filter(isDone).length,m=Object.keys(LESSONS).filter(isMastered).length;const last=S.lastLesson&&LESSONS[S.lastLesson]?S.lastLesson:null;
 const nxt=(()=>{for(const y of YEARS)for(const md of y.mods){const k=md[3];if(k&&LESSONS[k]){const x=modLessons(k).find(z=>!isDone(z));if(x)return x;}}return null;})();
 return `<div class="acad-cont"><div style="flex:1;min-width:220px"><div class="label">Your path</div><div class="ac-big"><strong data-pathcount>${d}</strong> <span class="muted">of ${n} lessons completed${m?` · ${m} mastered (quiz 80%+)`:""}</span></div><div class="bar" style="margin-top:8px"><i style="width:${n?d/n*100:0}%"></i></div><p class="muted ui" style="font-size:.82rem;margin:8px 0 0">Tick a lesson when you have finished it, here in the syllabus or at the end of the lesson. Lessons are written to be taken in order.</p></div><div class="ac-acts">${last?`<a class="btn" href="#lesson-${last}">Resume: ${esc(shortT(LESSONS[last].title))}</a>`:""}${nxt&&nxt!==last?`<a class="btn primary" href="#lesson-${nxt}">Next: ${esc(shortT(LESSONS[nxt].title))}</a>`:""}</div></div>`;}
// ---------- Lesson (study-guide layout) ----------
const SPINE_COLS=["var(--c-core)","var(--c-def)","var(--c-apply)","var(--c-stance)","var(--c-case)","var(--c-clinical)","var(--c-analogy)","var(--c-bridge)"];
function lessonProgress(L){
  const parts=L.sections.map((s,i)=>S.checks[L.id+"-c"+i]!==undefined);
  parts.push(S.quiz[L.id]!=null, !!S.sort[L.id], !!(S.construct[L.id]&&Object.values(S.construct[L.id]).some(v=>v&&v.trim())));
  return parts.filter(Boolean).length/parts.length;
}
function renderLesson(id){
  const L=LESSONS[id]; const v=$("#v-lesson");
  if(!L){v.innerHTML=`<p>That lesson is not available yet. <a href="#academy">Back to the Academy</a></p>`;return;}
  S.done[id]=true; save();
  const X=EXTRAS[id]||{}, img=LESSON_IMG[id], img2=LESSON_IMG2[id];
  const glossTerms=TERMS.filter(t=>t.lesson===id);
  const spine=L.sections.map((s,i)=>`<a href="#" class="sp" data-jump="${s.id}" style="--sc:${SPINE_COLS[i%SPINE_COLS.length]}"><span class="num">${i+1}</span><span class="bar">${esc(s.h.replace(/^\d+\.\s*/,""))}</span><span class="tick" data-tick="${i}">${S.checks[id+"-c"+i]!==undefined?"✓":""}</span></a>`).join("");
  v.innerHTML=`<div class="lesson"><nav class="toc" aria-label="Lesson contents"><a href="#academy" class="muted">← Academy</a><div class="label" style="margin-top:12px">${esc(L.code)}</div>
   <div class="lprog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(lessonProgress(L)*100)}" aria-label="Lesson progress"><i id="lprog" style="width:${Math.round(lessonProgress(L)*100)}%"></i></div><div class="ui muted" style="font-size:.72rem" id="lprog-t">${Math.round(lessonProgress(L)*100)}% of activities done</div><div style="margin:8px 0 2px">${doneTick(id,true)}</div>
   <details class="tocd" ${innerWidth>960?"open":""}><summary class="ui" style="cursor:pointer;font-weight:600">Contents</summary><ol><li><a href="#" data-jump="start">Before you start</a></li><li><a href="#" data-jump="outcomes">Outcomes &amp; reading</a></li>${L.sections.map((s,i)=>`<li class="${S.checks[id+"-c"+i]!==undefined?"done":""}" data-toc="${i}"><a href="#" data-jump="${s.id}">${esc(s.h.replace(/^\d+\.\s*/,""))}</a></li>`).join("")}
   ${DEPTH[id]?`<li><a href="#" data-jump="deeper">Go deeper</a></li>`:""}${X.sort?`<li><a href="#" data-jump="sort">Sort it out</a></li>`:""}<li><a href="#" data-jump="glossary">Flip-card glossary</a></li><li><a href="#" data-jump="quiz">Lesson quiz</a></li>${reviewQs(id,1).length?`<li><a href="#" data-jump="review">Interleaved review</a></li>`:""}<li><a href="#" data-jump="construct">Construct the article</a></li><li><a href="#" data-jump="drill">Ordering drill</a></li><li><a href="#" data-jump="conn">Connections</a></li><li><a href="#" data-jump="complete">Mark complete</a></li></ol></details>
   <p class="ui muted" style="font-size:.72rem">AI-written study notes. Check every claim against the primary text.</p></nav>
  <article class="notes">
   <div class="guide-band"><div><div class="k">${esc(L.code)}</div><h1>${esc(L.title)}</h1><div class="sub">${L.sections.length} sections · ${L.quiz.length}-question quiz · construct the article</div><button class="gb-group" data-gsend-lesson="${id}">Send to a group</button><div class="gb-done" data-lessonmark="${id}" ${isDone(id)?"":"hidden"}>✓ Completed</div></div>${img?`<img src="${imgSrc(img,true)}" alt="${esc(IMG_BY[img].t)}" data-zoom="${img}">`:""}</div>
   ${moduleBar(id)}
   <section id="start">
    ${X.plain?`<div class="before"><div class="bh">Before you start · plain version</div><div class="bb"><p>${esc(X.plain.version)}</p><p><strong>The question this lesson answers:</strong> ${esc(X.plain.question)}</p><p><strong>If you remember one thing:</strong> ${esc(X.plain.one)}</p></div></div>`:""}
    ${recallWarmHTML(L)}
    <h2>The shape of the lesson</h2><p class="muted ui" style="font-size:.85rem">Tap a bar to jump. A tick appears when you answer that section's check.</p><div class="spine">${spine}</div>
    ${X.hook?`<div class="co hook"><div class="co-h">Memory hook</div><p>${esc(X.hook)}</p></div>`:""}
   </section>
   <section id="outcomes"><h2>Learning outcomes</h2><p>By the end of this lesson you should be able to:</p><ol>${L.outcomes.map(o=>`<li>${esc(o)}</li>`).join("")}</ol>
    ${buildsOnHTML(id)}<p class="no-tag"><span class="label">Prerequisite terms</span><br>${L.prereq.filter(p=>TERM_BY_ID[p]).map(p=>`<span class="term" tabindex="0" role="button" data-term="${p}">${esc(TERM_BY_ID[p].t)}</span>`).join(" · ")}</p>
    <h3>Primary reading</h3><ul>${L.reading.primary.map(([t,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("")}</ul>
    <h3>Secondary reading (Harvard)</h3><ul>${L.reading.secondary.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
    <h3>Scripture tie-in</h3><ul>${L.scripture.map(([t,u])=>`<li>${u?`<a href="#reader" data-unit="${u}">${esc(t)}</a> (in the Reader)`:esc(t)}</li>`).join("")}</ul></section>
   ${L.sections.map((s,i)=>`<section id="${s.id}"><h2>${esc(s.h)}</h2>
     ${i===0&&img2?fig(img2,{side:true,small:true}):""}
     ${s.html}
     ${i===1&&X.analogy?`<div class="co analogy"><div class="co-h">Analogy · ${esc(X.analogy.title)}</div><p>${esc(X.analogy.text)}</p></div>`:""}
     <div class="check"><div class="label">Check your understanding</div><p style="margin:.3em 0">${esc(s.check.prompt)}</p>${mcqHTML(s.check,id+"-c"+i)}</div>
     <details class="explain"><summary>In your own words: explain this section in two sentences</summary><textarea data-explain="${id}-${s.id}" placeholder="Self-explanation has moderate evidence as a study strategy (Dunlosky et al., 2013).">${esc(S.explain[id+"-"+s.id]||"")}</textarea></details></section>`).join("")}
   ${DEPTH[id]?depthHTML(DEPTH[id]):""}
   ${X.sort?`<section id="sort"><h2>Sort it out</h2><p>${esc(/[?!.]$/.test(X.sort.title)?X.sort.title:X.sort.title+".")} Tap an item, then tap the box it belongs in. Check when all are placed.</p><div class="sortgame" id="sortbox"></div></section>`:""}
   <section id="glossary"><h2>Flip-card glossary</h2><p class="muted ui" style="font-size:.85rem">Say the meaning aloud, then tap to flip. Tap an underlined term for its full card.</p><div class="flips">${glossTerms.map(t=>`<div class="flip"><button aria-label="Flip card: ${esc(t.t)}"><div class="in"><div class="fa"><div class="label">${esc(t.d)}</div><h3>${esc(t.t)}</h3><div class="lat">${esc(t.la)}</div></div><div class="fb">${esc(t.b)}</div></div></button></div>`).join("")||`<p class="muted">The terms for this lesson are introduced in earlier modules.</p>`}</div>
    <p class="no-tag" style="margin-top:12px">${glossTerms.map(t=>`<span class="term" tabindex="0" role="button" data-term="${t.id}">${esc(t.t)}</span>`).join(" · ")}</p></section>
   <section id="quiz"><h2>Lesson quiz</h2><p>${L.quiz.length} questions. Each explanation names the text. You need 80% to master the lesson.</p><div id="quizbox"></div></section>
   ${reviewHTML(id)}
   <section id="construct"><h2>Construct the article</h2><p>Write the four parts for <strong>${esc(L.construct.q)}</strong> Then compare with the model and tick the rubric.</p><div class="construct" id="cbox"></div></section>
   <section id="drill"><h2>${esc(L.drill.title)}</h2><p>Use the arrows to put the parts in order, then check.</p><div id="drillbox"></div></section>
   ${L.extraHTML?L.extraHTML():""}
   <section id="conn"><h2>Connections</h2><div class="co bridge"><div class="co-h">Connections</div>${L.connections}${leadsToHTML(id)}</div></section>
   <section id="complete"><div class="complete-card${isDone(id)?" is-done":""}" id="complete-card" data-lesson="${id}">
    <div class="cc-l"><div class="label">Finished this lesson?</div><p class="cc-msg-off">Tick it off to record it in your Academy syllabus and transcript.</p><p class="cc-msg-on">Recorded as completed. You can untick it any time.</p></div>
    <div class="cc-r">${doneTick(id,true)}${(()=>{const ls=modLessons(modOf(id)),i=ls.indexOf(id);return ls[i+1]?`<a class="btn primary" href="#lesson-${ls[i+1]}">Next lesson →</a>`:`<a class="btn" href="#academy">Back to the Academy</a>`;})()}</div></div></section>
  </article></div>`;
  const upd=()=>{const p=Math.round(lessonProgress(L)*100);$("#lprog").style.width=p+"%";$("#lprog-t").textContent=p+"% complete";};
  L.sections.forEach((s,i)=>wireMCQ(v,s.check,id+"-c"+i,ok=>{S.checks[id+"-c"+i]=ok;save();const t=$(`[data-tick="${i}"]`,v);if(t)t.textContent="✓";$(`[data-toc="${i}"]`,v)?.classList.add("done");upd();}));
  $$("[data-jump]",v).forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.jump)?.scrollIntoView({behavior:"smooth"});});
  $$("[data-unit]",v).forEach(a=>a.onclick=()=>{S.resume=a.dataset.unit;const m=a.dataset.unit.match(/^j(\d+)-/);if(m){S.book="john";S.ch=+m[1];renderReader._jumped=0;}save();});
  $$("[data-explain]",v).forEach(t=>t.oninput=()=>{S.explain[t.dataset.explain]=t.value;save();});
  $$(".flip button",v).forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("on"));
  if(X.sort) renderSort(id,X.sort,upd);
  renderQuiz(L); renderConstruct(L); renderDrill(L);
  wireReview(v,id); S.lastLesson=id; save();
  if(L.afterRender) L.afterRender(v);
  const _q=$("#quizbox");_q.addEventListener("click",()=>setTimeout(upd,0));
  $$("#cbox textarea").forEach(t=>t.addEventListener("input",upd));
  $$(".notes section",v).forEach(s=>{if(s.id!=="glossary")tagTerms(s);});
}
function renderSort(id,G,onDone){
  const box=$("#sortbox"); let sel=null; const place={};
  const order=G.items.map((_,i)=>i).sort((a,b)=>((a*7+3)%G.items.length)-((b*7+3)%G.items.length));
  const draw=(checked)=>{
    box.innerHTML=`<div class="pool" aria-label="Items to sort">${order.filter(i=>place[i]==null).map(i=>`<button class="item" data-it="${i}" aria-pressed="${sel===i}">${esc(G.items[i][0])}</button>`).join("")||`<span class="muted ui" style="font-size:.85rem">All placed.</span>`}</div>
     <div class="bins">${G.cats.map((c,ci)=>`<div class="bin" data-bin="${ci}" role="button" tabindex="0" aria-label="Place in ${esc(c)}"><h4>${esc(c)}</h4>${order.filter(i=>place[i]===ci).map(i=>`<button class="item ${checked?(G.items[i][1]===ci?"ok":"no"):""}" data-back="${i}">${esc(G.items[i][0])}</button>`).join(" ")}</div>`).join("")}</div>
     <div class="row" style="margin-top:12px"><button class="primary" id="sort-check" ${Object.keys(place).length<G.items.length?"disabled":""}>Check</button><button class="ghost" id="sort-reset">Start again</button><span id="sort-res"></span></div>`;
    $$("[data-it]",box).forEach(b=>b.onclick=()=>{sel=+b.dataset.it;draw(false);});
    $$("[data-back]",box).forEach(b=>b.onclick=e=>{e.stopPropagation();delete place[+b.dataset.back];draw(false);});
    $$("[data-bin]",box).forEach(b=>{const go=()=>{if(sel==null)return;place[sel]=+b.dataset.bin;sel=null;draw(false);};b.onclick=go;b.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}};});
    $("#sort-reset").onclick=()=>{Object.keys(place).forEach(k=>delete place[k]);sel=null;draw(false);};
    $("#sort-check").onclick=()=>{const n=G.items.filter((it,i)=>place[i]===it[1]).length;draw(true);$("#sort-res").textContent=n===G.items.length?`All ${n} correct.`:`${n} of ${G.items.length} correct. Red items are in the wrong box; tap one to send it back.`;S.sort[id]=n/G.items.length;save();onDone&&onDone();};
  };
  draw(false);
}

// ---------- Reader unit in study-guide style ----------
function unitHTML(u,i){
  const vv=[];for(let n=u.v[0];n<=u.v[u.v.length-1];n++)vv.push(n);
  const lat=S.view==="latin";
  const ch=u.ch||1, vg=VG[ch]||{}, T=n=>{const d=vtext(ch,n)[1];if(!useWeb())return d;const w=webV("john",ch,n);return w===null?d:(w||"(joined with the previous verse)");}, N=n=>vtext(ch,n)[2];
  const vnote=n=>N(n)?`<details class="cnote"><summary>Challoner's note on v. ${n}</summary>${N(n).split("\n").map(p=>`<p>${esc(p)}</p>`).join("")}</details>`:"";
  const verses=`<div class="verses">${lat?`<div>${vv.map(n=>`<p class="v" data-ref="john|${ch}|${n}"><sup>${n}</sup>${esc(T(n))}</p>`).join("")}</div><div class="lat no-tag">${vv.map(n=>`<p class="v"><sup>${n}</sup>${esc(vg[n]||"—")}</p>`).join("")}</div>`:vv.map((n,k)=>`<p class="v ${i===0&&k===0&&S.view!=="parallel"?"dropcap":""}" data-ref="john|${ch}|${n}"><sup>${n}</sup>${esc(T(n))}</p>`).join("")}</div>`;
  const pic=UNIT_IMG[u.id]&&S.view!=="parallel"&&!lat?fig(UNIT_IMG[u.id],{side:true,small:true}):"";
  if(S.view==="scripture") return `<div class="unit${S.hl[u.id]?" hl":""}" id="${u.id}">${pic}${verses}</div>`;
  let body=`<div class="before"><div class="bh">In plain words · John ${ch}:${u.v[0]}${u.v[u.v.length-1]!==u.v[0]?"–"+u.v[u.v.length-1]:""}</div><div class="bb"><p>${esc(u.beginner)}</p></div></div>
   <div class="co core"><div class="co-h">How Thomas divides the text</div><p>${esc(u.divisio)}</p></div>
   <div class="co def"><div class="co-h">Literal sense</div><ol>${u.literal.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
   ${u.spiritual.length?`<div class="co stance"><div class="co-h">Spiritual sense</div>${u.spiritual.map(x=>`<p>${esc(x)}</p>`).join("")}</div>`:""}
   ${u.scholar?`<details class="co bridge"><summary class="co-h" style="cursor:pointer">Going further: the Summa and the Latin</summary><p>${esc(u.scholar)}</p>${u.latin&&u.latin.length?`<p class="no-tag"><strong>Latin key terms:</strong> ${u.latin.map(w=>`<em class="latin-word">${esc(w)}</em>`).join(" · ")}</p>`:""}</details>`:""}`;
  const cat=catenaFor(u), show=Math.min(3,cat.length);
  const av=f=>FATHER_IMG[f]?`<img class="av" src="img/${FATHER_IMG[f]}-s.webp" alt="" loading="lazy">`:`<div class="av" aria-hidden="true">${esc((FATHERS[f]?.name||"?").split(/\s+/).filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join(""))}</div>`;
  const fitem=(it,k)=>`<div class="father" ${k>=show?"data-more hidden":""}>${av(it.f)}<div class="who"><button data-father="${it.f||""}">${esc(FATHERS[it.f]?.name||it.src)}</button> <span class="src-l no-tag">${esc(it.src)}</span></div><div class="cat-en">${esc(it.en)}</div></div>`;
  const fathers=cat.length?`<details class="co case fathers"><summary class="co-h" style="cursor:pointer">The Fathers speak · Catena aurea (${cat.length})</summary>${cat.map(fitem).join("")}${cat.length>show?`<button class="ghost" data-showall>Show all ${cat.length}</button>`:""}<p class="ui muted" style="font-size:.72rem;margin:6px 0 0">Newman's translation (Oxford, 1841–45), public domain.</p></details>`:"";
  const links=`<div class="links"><span class="label" style="background:none;padding:2px 0">Where Thomas uses this</span>${u.summa.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("")}${u.ccc.map(c=>`<a href="https://www.vatican.va/archive/ENG0015/_INDEX.HTM" target="_blank" rel="noopener">CCC ${c}</a>`).join("")}${u.lessons.map(l=>{const m=l.match(/^(F\d|T\d+[a-z]?|P\d)\b/);const k=m&&LESSONS[m[1].toLowerCase()]?m[1].toLowerCase():null;return k?`<a href="#lesson-${k}">${esc(l)}</a>`:`<span>${esc(l)}</span>`}).join("")}</div>`;
  const note=S.notes[u.id]||"";
  const vr=u.v[0]===u.v[u.v.length-1]?`v. ${u.v[0]}`:`vv. ${u.v[0]}–${u.v[u.v.length-1]}`;
  const gloss=`<details class="gloss ucomm"${S.commAll?" open":""}><summary class="ucomm-s"><span>Commentary on ${vr}</span><span class="muted">St Thomas and the Fathers</span></summary>${i===0?`<details class="senses-key"><summary>The four senses: what the badges mean</summary><p style="margin:.4em 0">Thomas reads Scripture first for what the author meant, then for what the realities described point to (ST I q.1 a.10).</p><div class="senses-grid"><div><span class="chip sense lit">Literal</span> what the words mean</div><div><span class="chip sense all">Allegorical</span> Christ and the Church</div><div><span class="chip sense mor">Moral</span> what we should do</div><div><span class="chip sense ana">Anagogical</span> eternal glory</div></div></details>`:""}<div class="head">${u.senses.map(s=>`<span class="chip sense ${s}">${SENSE[s]}</span>`).join("")}<span class="attrib">Summary of Thomas · <em>Super Ioan.</em> ${esc(u.lect)}</span>${u.verified?`<a class="chip" href="https://isidore.co/aquinas/John${ch}.htm" target="_blank" rel="noopener" title="Latin text with paragraph numbers">Latin</a>`:`<span class="chip verify">verify lecture no.</span>`}</div>
   <div class="body">${body}</div>${fathers}${links}
   <div class="unit-tools"><button data-bm="${u.id}">${S.bm&&S.bm.endsWith(u.id)?"Bookmarked":"Bookmark"}</button><button data-hl="${u.id}" aria-pressed="${!!S.hl[u.id]}">${S.hl[u.id]?"Highlighted":"Highlight"}</button><button data-note="${u.id}">${note?"Edit note":"Add note"}</button></div>
   <div class="note-box" ${note?"":"hidden"}><label class="label" for="note-${u.id}">My note</label><textarea id="note-${u.id}" data-notefield="${u.id}">${esc(note)}</textarea></div></details>`;
  return `<div class="unit${S.hl[u.id]?" hl":""}" id="${u.id}">${pic}${verses}${vv.map(vnote).join("")}${gloss}</div>`;
}

// ---------- Gallery ----------
let galFilter="all";
function renderGallery(){
  const groups=["all",...Object.keys(IMG_GROUPS).filter(g=>IMAGES.some(i=>i.g===g))];
  const list=IMAGES.filter(i=>galFilter==="all"||i.g===galFilter);
  $("#v-gallery").innerHTML=`<div class="label">Gallery</div><h1>Saints, Scripture and churches</h1>
   <p style="max-width:44em;color:var(--muted)">${IMAGES.length} works from the National Gallery of Art, Washington, released as Open Access (CC0, public domain). Tap any picture to enlarge it. The same images illustrate the Reader and the lessons.</p>
   <div class="gal-filters filters" role="group" aria-label="Filter">${groups.map(g=>`<button data-g="${g}" aria-pressed="${galFilter===g}">${g==="all"?"All":esc(IMG_GROUPS[g])}</button>`).join("")}</div>
   <div class="gallery">${list.map(i=>`<figure><img src="img/${i.k}-s.webp" width="${i.w}" height="${i.h}" alt="${esc(i.alt||i.t)}" loading="lazy" data-zoom="${i.k}"><figcaption><b>${esc(i.t)}</b>${esc([i.a,i.d].filter(Boolean).join(", "))}<br>NGA ${esc(i.n)} · CC0</figcaption></figure>`).join("")}</div>`;
  $$("#v-gallery [data-g]").forEach(b=>b.onclick=()=>{galFilter=b.dataset.g;renderGallery();});
}

// ---------- Apologetics ----------
let apTab="trads", apFam="all", apTestIdx=null;
const TRAD_BY=Object.fromEntries(TRADS.map(t=>[t.id,t]));
const famOf=d=>{const t=TRAD_BY[d.trad];return t?t.fam:d.trad;};
async function verseHTML(src){
  const out=[];
  for(const [slug,c,a,z] of src){try{const B=await loadBook(slug);const ch=B.chapters.find(x=>x.n===c);const vs=(ch?.verses||[]).filter(v=>v[0]>=a&&v[0]<=z);
    out.push(`<p class="vtext"><span class="no-tag" style="font-style:normal;font-weight:600">${esc(nameOf(slug))} ${c}:${a}${z>a?"–"+z:""}</span> ${vs.map(v=>`<sup>${v[0]}</sup>${esc(v[1])}`).join(" ")}</p>`);}catch(e){}}
  return out.join("")+`<p class="ui muted" style="font-size:.7rem;margin:0">Douay-Rheims (public domain). Psalms and Kings follow the Vulgate numbering.</p>`;
}
function dispHTML(d,mode){
  const t=TRAD_BY[d.trad];
  const head=`<div class="row" style="justify-content:space-between"><div><div class="label">${esc(t?.name||APOL_FAM[d.trad]||d.trad)} objection</div><div class="ref">${esc(d.title)}</div><div class="ui muted" style="font-size:.85rem">${esc(d.ref)}${d.unit?` · <a href="#reader" data-unit="${d.unit}">open in the Reader</a>`:""}</div></div>${S.apol[d.id]?`<span class="chip ok">Practised</span>`:""}</div>
   <div data-verses="${d.id}"><p class="muted ui" style="font-size:.8rem">Loading the text…</p></div>
   ${d.qur?`<div class="co extra"><div class="co-h">Qur'an (paraphrase)</div><p>${esc(d.qur)}</p></div>`:""}
   <div class="co warn"><div class="co-h">The objection, in its strongest form</div><p>${esc(d.obj)}</p></div>`;
  if(mode==="test") return head+`<div class="co check"><div class="co-h">Your answer</div><p>Write a reply as if to a friend who holds this view: say why they read it so, then answer from the text, the Fathers and Thomas.</p><textarea data-ans="${d.id}" placeholder="Your reply…">${esc((S.apol[d.id]||{}).text||"")}</textarea><div class="row" style="margin-top:10px"><button class="primary" data-reveal="${d.id}">Reveal the key points</button></div></div><div data-after="${d.id}" hidden></div>`;
  return head+`<div class="co case"><div class="co-h">Why they read it this way</div><p>${esc(d.why)}</p></div>
   <div class="co core"><div class="co-h">The Catholic and Thomist reply</div>${d.reply}</div>
   <div class="co analogy"><div class="co-h">Rejoinder and answer</div><p><strong>They may reply:</strong> ${esc(d.rejoinder)}</p><p><strong>Answer:</strong> ${esc(d.answer)}</p></div>
   <div class="check"><div class="label">Check</div><p style="margin:.3em 0">${esc(d.q.prompt)}</p>${mcqHTML(d.q,"ap-"+d.id)}</div>
   <details class="explain"><summary>Model answer (a short written reply)</summary><p>${esc(d.model)}</p></details>
   <details class="explain"><summary>Sources</summary><ul>${d.sources.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></details>`;
}
function wireDisp(root){
  $$("[data-verses]",root).forEach(async el=>{const d=DISPS.find(x=>x.id===el.dataset.verses);el.innerHTML=await verseHTML(d.src);});
  $$("[data-unit]",root).forEach(a=>a.onclick=()=>{S.resume=a.dataset.unit;const m=a.dataset.unit.match(/^j(\d+)-/);if(m){S.book="john";S.ch=+m[1];renderReader._jumped=0;}save();});
  DISPS.forEach(d=>{if($(`[data-q="ap-${d.id}"]`,root))wireMCQ(root,d.q,"ap-"+d.id,ok=>{S.apol[d.id]=Object.assign(S.apol[d.id]||{},{mcq:ok});save();});});
  $$(".co.core, .co.case, .co.warn",root).forEach(tagTerms);
}
function renderApologetics(){
  const v=$("#v-apologetics");
  const fams=["all",...Object.keys(APOL_FAM)];
  const famBtns=`<div class="filters" role="group" aria-label="Tradition">${fams.map(f=>`<button data-fam="${f}" aria-pressed="${apFam===f}">${f==="all"?"All traditions":esc(APOL_FAM[f])}</button>`).join("")}</div>`;
  const practised=Object.keys(S.apol).filter(k=>DISPS.some(d=>d.id===k)).length;
  const list=DISPS.filter(d=>apFam==="all"||famOf(d)===apFam);
  let body="";
  if(apTab==="trads"){
    const ts=TRADS.filter(t=>apFam==="all"?true:t.fam===apFam||(t.fam==="base"));
    body=`<p style="max-width:46em">Who believes what, and how each tradition came about. Written to be fair: each profile states what the community itself holds, then where it differs from Catholic teaching. Read the profile before the disputations.</p>
     <div class="trad">${ts.map(t=>`<div class="tc">${t.img&&IMG_BY[t.img]?`<img src="img/${t.img}-s.webp" alt="" loading="lazy" style="width:calc(100% + 36px);margin:-18px -18px 12px;aspect-ratio:16/8;object-fit:cover;display:block;border-radius:var(--r-lg) var(--r-lg) 0 0" data-zoom="${t.img}">`:""}<div class="label">${esc(t.fam==="base"?"Baseline":APOL_FAM[t.fam])}</div><h3>${esc(t.name)}</h3><div class="when">${esc(t.when)}</div><p style="margin:.3em 0;font-size:.95rem">${esc(t.origin)}</p>
       <details open><summary>What they believe</summary><ul style="font-size:.93rem;padding-left:1.2em">${t.beliefs.map(b=>`<li>${esc(b)}</li>`).join("")}</ul></details>
       ${t.vs?`<details><summary>Relation to Catholic teaching</summary><p style="font-size:.93rem">${esc(t.vs)}</p></details>`:""}
       ${t.sa?`<details><summary>In South Africa</summary><p style="font-size:.93rem">${esc(t.sa)}</p></details>`:""}
       ${DISPS.some(d=>d.trad===t.id||(t.fam==="protestant"&&d.trad==="protestant"))?`<button class="ghost" data-go="${t.fam}" style="margin-top:8px">Disputations →</button>`:""}</div>`).join("")}</div>
     <div class="co extra" style="margin-top:18px"><div class="co-h">On charity and accuracy</div><p>The Church teaches that elements of truth and sanctification exist outside her visible bounds (Lumen Gentium 8; Unitatis Redintegratio 3) and regards Muslims with esteem (Nostra Aetate 3). Thomas advised arguing with Muslims from what both sides accept, and said the aim is not to prove the faith by necessary reasons, which would belittle it, but to show that what the faith holds is not false (De rationibus fidei, ch. 2, paraphrased). Use these notes to understand first, then to answer.</p></div>`;
  } else if(apTab==="disps"){
    body=`<p style="max-width:46em">${list.length} disputations. Each gives the verse, the objection in its strongest form, why its holders find it convincing, the Catholic and Thomist reply, a likely rejoinder, a check question and a model answer.</p>${list.map(d=>`<div class="disp" id="${d.id}">${dispHTML(d,"study")}</div>`).join("")}`;
  } else {
    if(apTestIdx==null||!list[apTestIdx]) apTestIdx=Math.floor(Math.random()*list.length);
    const d=list[apTestIdx];
    body=`<p style="max-width:46em">Test mode: you get one objection at a time. Write your reply, reveal the key points and tick the ones you made, then answer the check question. Your score is saved in this browser.</p>
     <div class="row"><span class="chip">${practised} of ${DISPS.length} practised</span><button data-next>Another objection</button></div>
     ${d?`<div class="disp">${dispHTML(d,"test")}</div>`:`<p>No disputations in this filter.</p>`}`;
  }
  v.innerHTML=`<div class="guide-band"><div><div class="k">Apologetics</div><h1>Answer the objections</h1><div class="sub">Contested readings of Scripture, answered with the Fathers and St Thomas</div></div>${imgTag("augustine-heresy",true)}</div>
   <div class="seg" role="group" aria-label="Section" style="margin-bottom:10px">${[["trads","Traditions"],["disps","Disputations"],["test","Test yourself"]].map(([k,l])=>`<button data-tab="${k}" aria-pressed="${apTab===k}">${l}</button>`).join("")}</div>
   ${famBtns}<div id="ap-body">${body}</div>
   <p class="lost" style="margin-top:22px">AI-written study material. Scripture from the Douay-Rheims (public domain); the Qur'an is paraphrased because modern translations are copyrighted, so check wording in a translation such as Abdel Haleem (2004). Items marked [verify] need checking against the source.</p>`;
  $$("[data-tab]",v).forEach(b=>b.onclick=()=>{apTab=b.dataset.tab;apTestIdx=null;renderApologetics();});
  $$("[data-fam]",v).forEach(b=>b.onclick=()=>{apFam=b.dataset.fam;apTestIdx=null;renderApologetics();});
  $$("[data-go]",v).forEach(b=>b.onclick=()=>{apFam=b.dataset.go;apTab="disps";renderApologetics();const f=$("#v-apologetics [data-fam]");(f||$("#v-apologetics")).scrollIntoView({behavior:"smooth",block:"center"});});
  $("[data-next]",v)&&($("[data-next]",v).onclick=()=>{const n=list.length;if(n>1){let k;do{k=Math.floor(Math.random()*n);}while(k===apTestIdx);apTestIdx=k;}renderApologetics();});
  $$("[data-ans]",v).forEach(t=>t.oninput=()=>{S.apol[t.dataset.ans]=Object.assign(S.apol[t.dataset.ans]||{},{text:t.value});save();});
  $$("[data-reveal]",v).forEach(b=>b.onclick=()=>{const d=DISPS.find(x=>x.id===b.dataset.reveal);const box=$(`[data-after="${d.id}"]`,v);
    box.innerHTML=`<div class="co apply"><div class="co-h">Key points: tick the ones you made</div>${d.keys.map((k,i)=>`<label style="display:block;font-weight:400"><input type="checkbox" data-key="${i}"> ${esc(k)}</label>`).join("")}<p class="ui" id="keyscore" style="font-size:.85rem;margin-top:8px"></p></div>
     <div class="co case"><div class="co-h">Why they read it this way</div><p>${esc(d.why)}</p></div>
     <div class="co core"><div class="co-h">The Catholic and Thomist reply</div>${d.reply}</div>
     <div class="co bridge"><div class="co-h">Model answer</div><p>${esc(d.model)}</p></div>
     <div class="check"><div class="label">Check</div><p style="margin:.3em 0">${esc(d.q.prompt)}</p>${mcqHTML(d.q,"ap-"+d.id)}</div>`;
    box.hidden=false; b.disabled=true;
    const ks=$$("[data-key]",box);ks.forEach(c=>c.onchange=()=>{const n=ks.filter(x=>x.checked).length;S.apol[d.id]=Object.assign(S.apol[d.id]||{},{self:n/ks.length});save();$("#keyscore").textContent=`${n} of ${ks.length} key points.`;});
    wireMCQ(box,d.q,"ap-"+d.id,ok=>{S.apol[d.id]=Object.assign(S.apol[d.id]||{},{mcq:ok});save();});
    tagTerms(box);});
  wireDisp(v);
}

function linkDOIs(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement&&!n.parentElement.closest("a,button,textarea,script")&&/doi:\s?10\./i.test(n.nodeValue)?1:2});const ns=[];while(w.nextNode())ns.push(w.currentNode);
 ns.forEach(n=>{const t=n.nodeValue,re=/doi:\s?(10\.\d{4,9}\/[^\s,;\]]+)/gi;let m,last=0;const f=document.createDocumentFragment();
  while((m=re.exec(t))){let d=m[1];for(;;){if(/[.]$/.test(d))d=d.slice(0,-1);else if(/\)$/.test(d)&&(d.split("(").length<d.split(")").length))d=d.slice(0,-1);else break;}f.append(t.slice(last,m.index));const a=document.createElement("a");a.href="https://doi.org/"+d;a.target="_blank";a.rel="noopener";a.textContent="doi:"+d;f.append(a);last=m.index+4+(m[0].length-4-m[1].length)+d.length;}
  f.append(t.slice(last));n.replaceWith(f);});}
