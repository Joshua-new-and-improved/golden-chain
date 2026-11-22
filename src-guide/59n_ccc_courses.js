// ---------- Catechist mode: ready-made courses, printable handouts, group assignments ----------
const CCC_COURSES=[
 {id:"ocia",e:"🕊️",t:"Becoming Catholic (OCIA / RCIA)",who:"Adults preparing for Baptism, Confirmation or full communion, and anyone who wants the whole faith in one year",
  note:"One session a week takes about seven months; with breaks for Christmas and the Easter sacraments it fits a parish year. Sessions follow the order of the Catechism: the Creed, the sacraments, life in Christ, prayer.",
  s:[["Our desire for God",["c1","c7","c8"]],["God reveals himself",["c12","c13","c14"]],["Scripture and Tradition",["c15","c16","c17","c18"]],["What faith is",["c20","c21","c22"]],["The Creed and the Holy Trinity",["c23","c24","c25"]],["Creation, providence and the angels",["c27","c28"]],["The human person and the Fall",["c29","c30"]],["Jesus Christ, true God and true man",["c31","c32","c33"]],["The life of Christ",["c34","c35"]],["The Cross and the Resurrection",["c36","c37","c38"]],["The Holy Spirit and the Church",["c39","c40","c41"]],["One, holy, catholic and apostolic",["c42","c43"]],["Mary and the communion of saints",["c44","c45"]],["Forgiveness and the last things",["c46","c47","c48","c49"]],["Liturgy and the sacraments",["c50","c51","c52"]],["Baptism and Confirmation",["c53","c54"]],["The Eucharist",["c55","c56"]],["Confession and the Anointing of the Sick",["c57","c58","c59"]],["Holy Orders and Marriage",["c60","c61","c62"]],["Life in Christ: dignity, happiness, freedom",["c63","c64","c65"]],["Conscience, virtue and sin",["c66","c68","c69","c70"]],["Law, grace and the Church",["c74","c75","c76"]],["Loving God: Commandments 1–3",["c77","c78","c79","c80"]],["Family and life: Commandments 4–5",["c81","c82","c83"]],["Love, chastity and marriage: Commandments 6 and 9",["c84","c85","c88"]],["Justice and truth: Commandments 7, 8 and 10",["c86","c87","c89"]],["Christian prayer",["c90","c91","c93","c94"]],["The Our Father",["c95","c96"]]]},
 {id:"confirm",e:"🔥",t:"Confirmation preparation",who:"Teenagers (and adults) preparing for Confirmation, with their sponsors",
  note:"Twelve sessions. Each one is short enough for a youth evening; use the activity in the session plan, and bring sponsors into sessions 5, 8 and 12.",
  s:[["Made for God",["c1","c7","c64"]],["God speaks to us",["c14","c17"]],["Who is Jesus?",["c31","c32"]],["Cross and Resurrection",["c36","c37"]],["The Holy Spirit",["c39"]],["The Church",["c40","c42"]],["Sacraments and Baptism",["c51","c53"]],["Confirmation: sealed with the Spirit",["c54"]],["The Eucharist and the Mass",["c55","c56"]],["Confession",["c57"]],["Living as a disciple: conscience, virtue, sin",["c68","c69","c70"]],["Learning to pray",["c90","c93","c95"]]]},
 {id:"fhc",e:"🍞",t:"First Communion (for parents and catechists)",who:"Parents and catechists of children preparing for First Confession and First Holy Communion",
  note:"Eight sessions for the adults. Each handout gives the catechist enough background to explain the topic simply to children, and gives parents something to talk about at home.",
  s:[["God loves us and made us",["c1","c24","c29"]],["Jesus, God with us",["c32","c36"]],["Baptism: God's children",["c53"]],["Sin and God's forgiveness",["c70","c57"]],["The Mass and the Eucharist",["c55","c56"]],["The commandments and Sunday",["c77","c80"]],["Prayer and the Our Father",["c90","c95"]],["Mary and the saints",["c44","c45"]]]},
 {id:"marriage",e:"💍",t:"Marriage preparation",who:"Engaged couples and the couples or priests who accompany them",
  note:"Eight sessions. Couples can work through them together at home between meetings with their marriage-preparation couple or priest.",
  s:[["Made in God's image",["c29","c63"]],["Love, freedom and the virtues",["c65","c67","c69"]],["The sacrament of marriage",["c61"]],["Sexuality and chastity",["c84"]],["Fidelity and openness to life",["c85"]],["The family, a domestic church",["c81"]],["Forgiveness and praying together",["c57","c93","c96"]],["Money, work and the common good",["c86","c72"]]]}
];
const cccC=id=>CCC_COURSES.find(c=>c.id===id);
const cccN0=id=>CCC_NOTES.find(x=>x.id===id);
const cccSesDone=ids=>ids.every(cccDone);
function cccCourseProg(c){const d=c.s.filter(x=>cccSesDone(x[1])).length;return {d,n:c.s.length,next:c.s.findIndex(x=>!cccSesDone(x[1]))};}
function cccCoursesHTML(){return `<section class="ccc-courses"><h2>Courses for parish groups</h2><p class="muted" style="margin-top:0">Ready-made paths through the notes, in weekly sessions. Each session has a printable handout and can be set for a group.</p>
  <div class="ccc-cl">${CCC_COURSES.map(c=>{const p=cccCourseProg(c);return `<a class="ccc-cc" href="#catechism-course-${c.id}"><span class="ccc-ce">${c.e}</span><span><b>${esc(c.t)}</b><span class="muted">${c.s.length} sessions${p.d?` · ${p.d} done`:""}</span></span><span class="ccc-arr">›</span></a>`;}).join("")}</div></section>`;}
renderCatechism=(orig=>function(arg){
  if(arg&&arg.startsWith("course-"))return cccCourse(arg.slice(7));
  const r=orig.apply(this,arguments);
  try{const v=$("#v-catechism");
    if(!arg||!CCC_NOTES.some(x=>x.id===arg)){const cat=v.querySelector(".ccc-cat");if(cat&&!v.querySelector(".ccc-courses"))cat.insertAdjacentHTML("afterend",cccCoursesHTML());}
    else{const c=cccC(S.cccCourse);const art=v.querySelector(".ccc-where");if(c&&art){const si=c.s.findIndex(x=>x[1].includes(arg));if(si>=0)art.insertAdjacentHTML("beforebegin",`<a class="ccc-cbar" href="#catechism-course-${c.id}"><span>${c.e}</span><span><b>${esc(c.t)}</b><span class="muted">Session ${si+1} of ${c.s.length}: ${esc(c.s[si][0])}</span></span><span>›</span></a>`);}
      const pn=v.querySelector(".ccc-donebox");if(pn&&!v.querySelector("[data-cccprint]"))pn.insertAdjacentHTML("afterend",`<div class="ccc-tools"><button class="btn" data-cccprint="${arg}">🖨 Print handout</button><button class="btn" data-cccassign='${JSON.stringify({ids:[arg]})}'>👥 Set for my group</button></div>`);}
  }catch(e){console.warn(e);}
  return r;})(renderCatechism);
function cccCourse(id){const c=cccC(id);const v=$("#v-catechism");if(!c){location.hash="#catechism";return;}
  if(S.cccCourse!==id){S.cccCourse=id;save();}
  const p=cccCourseProg(c);
  v.innerHTML=`<div class="ccc ccc-course">
   <nav class="ccc-crumb"><a href="#catechism">← Catechism notes</a></nav>
   <header class="ccc-hero"><div class="k">${c.e} Course · ${c.s.length} sessions</div><h1>${esc(c.t)}</h1><p>${esc(c.who)}.</p>
    <div class="ccc-cta">${p.next>=0?`<a class="btn primary big" href="#catechism-${c.s[p.next][1].find(x=>!cccDone(x))}">${p.d?"Continue":"Start"}: session ${p.next+1}, ${esc(c.s[p.next][0])} →</a>`:`<span class="chip ok">Course complete 🎉</span>`}
     <div class="ccc-pr"><div class="bar"><i style="width:${p.d/p.n*100}%"></i></div><span>${p.d} of ${p.n} sessions done</span></div></div></header>
   <section class="ccc-cat"><b>🧑‍🏫 How to run it</b><p>${esc(c.note)} Before each meeting, print the handout (it has the notes for participants and a leader's page with the session plan and answers), or set the session for your group in the app so everyone can read ahead and you can see who has.</p></section>
   <ol class="ccc-ses">${c.s.map(([t,ids],i)=>{const d=cccSesDone(ids);return `<li class="${d?"done":""}"><div class="ccc-sh"><span class="ccc-sn">${d?"✓":i+1}</span><b>${esc(t)}</b></div>
     <ul>${ids.map(x=>{const n=cccN0(x);return `<li><a href="#catechism-${x}" class="${cccDone(x)?"done":""}">${cccDone(x)?"✓ ":""}${esc(n.t)} <span class="muted">§§ ${n.p}</span></a></li>`;}).join("")}</ul>
     <div class="ccc-sb"><button class="chip" data-cccprint="${ids.join(",")}" data-ccctitle="${esc(c.t)}: session ${i+1}, ${esc(t)}">🖨 Handout</button><button class="chip" data-cccassign='${JSON.stringify({c:c.id,s:i})}'>👥 Set for group</button></div></li>`;}).join("")}</ol>
   <p class="muted ui ccc-copy">The notes are teaching aids written in our own words; the Catechism itself is always the primary text. Please ask your parish priest or catechetical coordinator to look over anything you teach.</p></div>`;
  window.scrollTo(0,0);
}
// ---------- printable handouts ----------
function cccPrintHTML(ids,title){const L="ABCDEFGH";const parts=ids.map(cccN0).filter(Boolean);
  const qsOf=n=>{const D=(typeof CCC_DEEP!=="undefined"&&CCC_DEEP[n.id])||{};return [n.q,...(D.more||[])];};
  const one=n=>{const D=(typeof CCC_DEEP!=="undefined"&&CCC_DEEP[n.id])||{};return `<section class="pr-sec">
    <div class="pr-k">Catechism §§ ${esc(n.p)}</div><h2>${esc(n.t)}</h2>
    <p class="pr-gist"><b>In one sentence:</b> ${esc(CCC_GIST[n.id]||"")}</p>
    <div class="pr-sum">${n.sum}</div>
    ${D.paras?`<h3>Paragraph by paragraph</h3>${D.paras.map(([r,t])=>`<p class="pr-para"><b>§ ${esc(r)}</b> ${esc(t)}</p>`).join("")}`:""}
    <h3>Words to know</h3><dl>${n.key.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("")}</dl>
    <h3>In the Bible</h3><ul>${n.r.map(([l])=>`<li>${esc(l)}</li>`).join("")}</ul>
    <h3>With St Thomas Aquinas</h3><ul>${n.th.map(([a,b])=>`<li><b>${esc(a)}:</b> ${esc(b)}</li>`).join("")}</ul>
    ${D.saints?`<h3>From the Fathers and saints</h3><ul>${D.saints.map(([w,t])=>`<li>“${esc(t)}” <i>(${esc(w)})</i></li>`).join("")}</ul>`:""}
    ${D.mis?`<h3>Common misunderstandings</h3><ul>${D.mis.map(([w,r])=>`<li><b>Not quite:</b> ${esc(w)}<br><b>The Church teaches:</b> ${esc(r)}</li>`).join("")}</ul>`:""}
    <h3>To think about</h3><p>${esc(n.ask)}</p>
    <h3>Check yourself</h3><ol>${qsOf(n).map(q=>`<li>${esc(q.q)}<ol class="pr-opts">${q.o.map((o,k)=>`<li>${L[k]}. ${esc(o)}</li>`).join("")}</ol></li>`).join("")}</ol></section>`;};
  const leader=`<section class="pr-sec pr-leader"><h2>Leader's page</h2>${parts.map(n=>{const D=(typeof CCC_DEEP!=="undefined"&&CCC_DEEP[n.id])||{};return `<h3>${esc(n.t)}</h3>
    ${D.teach?`<p><b>Aim:</b> ${esc(D.teach.aim)}</p><p><b>Discussion questions</b></p><ol>${D.teach.discuss.map(q=>`<li>${esc(q)}</li>`).join("")}</ol><p><b>Activity:</b> ${esc(D.teach.act)}</p>`:""}
    ${(n.psy||D.psyNote)?`<p><b>Psychology connection:</b> ${esc([n.psy,D.psyNote].filter(Boolean).join(" "))}</p>`:""}
    <p><b>Answers:</b> ${qsOf(n).map((q,i)=>`${i+1}. ${L[q.a]} (${esc(q.o[q.a])})${q.why?` ${esc(q.why)}`:""}`).join("; ")}</p>`;}).join("")}</section>`;
  return `<header class="pr-h"><div>Golden Chain · Catechism study notes</div><h1>${esc(title||parts[0].t)}</h1><p>Read alongside the Catechism of the Catholic Church (vatican.va). Notes written for Golden Chain; please have your parish priest or catechetical coordinator check what you teach.</p></header>${parts.map(one).join("")}${leader}`;}
function cccPrint(ids,title){let el=document.getElementById("ccc-print");if(!el){el=document.createElement("div");el.id="ccc-print";document.body.appendChild(el);}
  el.innerHTML=cccPrintHTML(ids,title);document.body.classList.add("ccc-printing");
  const done=()=>{document.body.classList.remove("ccc-printing");window.removeEventListener("afterprint",done);};
  window.addEventListener("afterprint",done);setTimeout(()=>window.print(),50);}
// ---------- groups: set a session, see who has read it ----------
function cccAssignData(d){if(d.c){const c=cccC(d.c);const s=c&&c.s[d.s];if(!s)return null;return {ccc:{c:d.c,s:d.s,ids:s[1],t:s[0],course:c.t}};}
  const n=cccN0(d.ids[0]);return n?{ccc:{ids:d.ids,t:n.t}}:null;}
function cccGroupCardHTML(m){const d=m.data.ccc;const ids=(d.ids||[]).filter(cccN0);if(!ids.length)return `<div class="gm-t">Catechism session</div>`;
  const doneBy=uid=>{const st=uid===GC_USER.id?{ccc:Object.keys(S.ccc||{})}:((G.members.get(uid)||{}).stats||{});const have=new Set(st.ccc||[]);return ids.filter(x=>have.has(x)).length;};
  const rows=[...G.members.values()].map(x=>({u:x.user_id,k:doneBy(x.user_id)})).filter(x=>x.k>0).sort((a,b)=>b.k-a.k);
  const me=doneBy(GC_USER.id);const nx=ids.find(x=>!cccDone(x))||ids[0];
  return `<div class="gcard gccc"><div class="gc-k">📖 ${d.course?esc(d.course)+" · session "+(d.s+1):"Catechism"} · set by ${esc(gcName(m.user_id))}</div><h4>${esc(d.t)}</h4>
   <ul>${ids.map(x=>{const n=cccN0(x);return `<li>${cccDone(x)?"✓ ":""}${esc(n.t)} <span class="muted">§§ ${n.p}</span></li>`;}).join("")}</ul>
   ${rows.length?`<div class="gmc-rows">${rows.map(r=>`<div class="gmc-row">${gcAv(r.u,"xs")}<span>${r.u===GC_USER.id?"You":esc(gcName(r.u))}</span><span class="bar"><i style="width:${r.k/ids.length*100}%"></i></span><b>${r.k}/${ids.length}</b></div>`).join("")}</div>`:`<p class="muted ui" style="font-size:.8rem">No one has read it yet.</p>`}
   <a class="btn primary" href="#catechism-${nx}">${me===ids.length?"Read again":me?"Carry on reading":"Read it"}</a></div>`;}
gcBodyHTML=(orig=>function(m){if(m.kind==="study"&&m.data&&m.data.ccc)return cccGroupCardHTML(m);return orig(m);})(gcBodyHTML);
waPreview=(orig=>function(m,mine){if(m&&m.kind==="study"&&m.data&&m.data.ccc)return (mine?"You: ":"")+"📖 "+m.data.ccc.t;return orig(m,mine);})(waPreview);
// stats now carry the sections each member has studied, so group cards can show progress
async function gcPushStats(){if(!GC||!GC_USER)return;const i=streakInfo();const mc={};mcCurrent().forEach(x=>mc[x.key]=mcPct(x));
  const stats={streak:i.streak,best:i.best,today:i.todayDone,lessons:Object.keys(LESSONS).filter(isDone).length,archived:S.gcArchived||[],mc,ccc:Object.keys(S.ccc||{}),at:Date.now()};
  await GC.from("profiles").update({stats}).eq("id",GC_USER.id);if(GC_PROFILE)GC_PROFILE.stats=stats;
  if(G&&G.members&&G.members.get(GC_USER.id))G.members.get(GC_USER.id).stats=stats;}
let cccPushT=null;
cccSet=(orig=>function(id,v){orig(id,v);clearTimeout(cccPushT);cccPushT=setTimeout(()=>{try{if(typeof GC!=="undefined"&&GC&&GC_USER)gcPushStats();}catch(e){}},1500);})(cccSet);
// the 📎 sheet gains "Catechism"
waAttItems=(orig=>function(){const a=orig();a.splice(Math.min(3,a.length),0,["ccc","📜","Catechism","#b8860b","Set a session"]);return a;})(waAttItems);
gcAttachSheet=(orig=>function(){orig();const b=document.querySelector('#sheet [data-at="ccc"]');if(b)b.onclick=()=>cccAssignSheet(d=>gcSend("study","",d));})(gcAttachSheet);
function cccAssignSheet(send){
  openSheet(`<h2 class="sheet-t">Set a Catechism session</h2><p class="muted ui" style="margin-top:0;font-size:.85rem">Everyone in the group gets a card with the reading, and you'll see who has studied it.</p>
   ${CCC_COURSES.map(c=>`<details class="ccc-as"><summary>${c.e} <b>${esc(c.t)}</b></summary><div class="ccc-al">${c.s.map(([t,ids],i)=>`<button class="chip" data-cccas='${JSON.stringify({c:c.id,s:i})}'>${i+1}. ${esc(t)}</button>`).join("")}</div></details>`).join("")}
   <details class="ccc-as"><summary>📜 <b>One section</b></summary><div class="ccc-al">${CCC_NOTES.map(n=>`<button class="chip" data-cccas='${JSON.stringify({ids:[n.id]})}'>${esc(n.t)}</button>`).join("")}</div></details>`,r=>{
   r.querySelectorAll("[data-cccas]").forEach(b=>b.onclick=()=>{const d=cccAssignData(JSON.parse(b.dataset.cccas));if(!d)return;closeSheet();send(d);});},"Catechism");}
document.addEventListener("click",e=>{let b;
  if(b=e.target.closest("[data-cccprint]")){cccPrint(b.dataset.cccprint.split(","),b.dataset.ccctitle||"");return;}
  if(b=e.target.closest("[data-cccassign]")){const d=cccAssignData(JSON.parse(b.dataset.cccassign));if(!d)return;
    if(typeof gcPickGroup!=="function"){toast("Join or create a group first (Groups tab).");return;}
    gcPickGroup(gid=>gcSendTo(gid,"study","",d));return;}
});
