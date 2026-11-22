// ---------- Go deeper, Questions, Prayers & planner ----------
function depthHTML(D){
  return `<section id="deeper"><h2>Go deeper</h2><p class="muted ui" style="font-size:.88rem">Real situations, a story, a slow reading of the hardest text, and where to read next.</p>
   <h3>In real life</h3>${D.cases.map(([t,x])=>`<div class="co apply"><div class="co-h">Case · ${esc(t)}</div><p>${esc(x)}</p></div>`).join("")}
   <div class="co analogy"><div class="co-h">A story to remember it by · ${esc(D.allegory[0])}</div><p>${esc(D.allegory[1])}</p></div>
   <h3>Reading slowly: ${esc(D.slow.title)}</h3><p class="muted ui" style="font-size:.82rem">Left: what the text says (paraphrased unless in quotation marks). Right: what it means.</p>
   <ol class="slow">${D.slow.steps.map(([a,b])=>`<li><div class="tx">${esc(a)}</div><div class="ex">${esc(b)}</div></li>`).join("")}</ol>
   ${D.confusions.length?`<h3>If this confused you</h3>${D.confusions.map(([q,a])=>`<div class="co confused"><div class="co-h">${esc(q)}</div><p>${esc(a)}</p></div>`).join("")}`:""}
   <h3>Read next</h3><ul>${D.further.map(([r,w])=>`<li><strong>${esc(r)}</strong><br><span class="muted">${esc(w)}</span></li>`).join("")}</ul></section>`;
}

// ---------- Questions ----------
let qFilter="all", qSearch="";
function renderQuestions(id){
  const v=$("#v-questions");
  const Q=id&&QAS.find(x=>x.id===id);
  if(Q){
    S.qread[Q.id]=true;save();
    const cat=QA_CATS.find(c=>c.id===Q.cat), sib=QAS.filter(x=>x.cat===Q.cat), i=sib.indexOf(Q);
    v.innerHTML=`<div class="qa"><a href="#questions" class="muted">← All questions</a>
     <div class="label" style="margin-top:14px">${esc(cat.name)}</div><h1 style="font-family:var(--f-read);color:var(--navy);font-size:clamp(1.8rem,4vw,2.5rem)">${esc(Q.q)}</h1>
     <div class="before"><div class="bh">The short answer</div><div class="bb"><p class="short" style="margin:0">${esc(Q.short)}</p></div></div>${(()=>{const st=typeof GC_STUDIES!=="undefined"&&GC_STUDIES.find(x=>x.days.some(d=>d.q===Q.id));return st?`<div class="qs-study"><p>👥 This question is part of the 7-day group study <strong>${esc(st.e)} ${esc(st.t)}</strong>.</p><button class="btn" data-qstudy="${st.id}">Start it in a group</button></div>`:"";})()}
     ${Q.terms.length?`<h2>Key terms</h2><dl>${Q.terms.map(([t,d])=>`<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl>`:""}
     <h2>The reasoning, step by step</h2><ol class="steps">${Q.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
     <h2>In real life</h2>${Q.cases.map(([t,x])=>`<div class="co apply"><div class="co-h">${esc(t)}</div><p>${esc(x)}</p></div>`).join("")}
     <div class="co analogy"><div class="co-h">Analogy · ${esc(Q.analogy[0])}</div><p>${esc(Q.analogy[1])}</p></div>
     ${Q.psych?`<div class="co clinical"><div class="co-h">What psychology adds</div>${Q.psych}</div>`:""}
     <h2>Common mistakes</h2><div class="co warn"><div class="co-h">Avoid</div><ul>${Q.mistakes.map(m=>`<li>${esc(m)}</li>`).join("")}</ul></div>
     <h2>What to do</h2><div class="co check"><div class="co-h">Practice</div><ul>${Q.practice.map(m=>`<li>${esc(m)}</li>`).join("")}</ul></div>
     ${Q.voices.length?`<h2>Other voices</h2>${Q.voices.map(([k,t])=>`<div class="co bridge"><div class="co-h">${esc(VOICES[k].split(/[,(]/)[0])}</div><p>${esc(t)}</p><p class="muted ui" style="font-size:.78rem">${esc(VOICES[k])}</p></div>`).join("")}`:""}
     <h2>Sources</h2><ul class="ui" style="font-size:.88rem">${Q.sources.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>
     <div class="row" style="justify-content:space-between;margin-top:20px">${i>0?`<a class="btn " href="#q-${sib[i-1].id}">← ${esc(sib[i-1].q)}</a>`:"<span></span>"}${i<sib.length-1?`<a class="btn " href="#q-${sib[i+1].id}">${esc(sib[i+1].q)} →</a>`:""}</div>
     <p class="lost" style="margin-top:22px">AI-written study answer. Moral questions about your own situation are best taken to a priest; health concerns to a doctor or psychologist.</p></div>`;
    $$(".qa .steps, .qa .co.apply, .qa .before",v).forEach(tagTerms);
    return;
  }
  const t=qSearch.toLowerCase();
  const list=QAS.filter(x=>(qFilter==="all"||x.cat===qFilter)&&(!t||(x.q+" "+x.short).toLowerCase().includes(t)));
  v.innerHTML=`<div class="guide-band"><div><div class="k">Questions</div><h1>Life's questions, answered deeply</h1><div class="sub">Love, dating, marriage, the passions, conscience and prayer, with St Thomas</div></div>${imgTag("madonna-giotto",true)}</div>
   ${typeof GC_STUDIES!=="undefined"?`<div class="qs-study"><p><strong>👥 Study these with your group.</strong> Each theme is also a 7-day group study: one question a day with a Bible passage, the short answer and something to discuss.</p><div class="row" style="gap:6px">${GC_STUDIES.filter(x=>x.qcat).map(x=>`<button class="btn" data-qstudy="${x.id}">${esc(x.e)} ${esc(x.t)}</button>`).join("")}</div></div>`:""}
   <div class="qcats">${QA_CATS.map(c=>`<button data-qc="${c.id}" style="all:unset;cursor:pointer;display:block" aria-pressed="${qFilter===c.id}"><div class="tile" style="height:100%">${imgTag(c.img,true)}<div class="t"><div class="label">${QAS.filter(x=>x.cat===c.id).length} questions</div><h3>${esc(c.name)}</h3><p class="muted" style="margin:0;font-size:.88rem">${esc(c.blurb)}</p></div></div></button>`).join("")}</div>
   <div class="row"><input type="search" id="qsearch" placeholder="Search questions, e.g. anger, kissing, confession" value="${esc(qSearch)}" aria-label="Search questions" style="flex:1;min-width:200px">${qFilter!=="all"?`<button data-qc="all">Show all</button>`:""}</div>
   <h2 id="qlist-h" class="qlist-h">${qFilter==="all"?(t?"Matching questions":"All questions"):esc(QA_CATS.find(c=>c.id===qFilter).name)} <span class="muted" style="font-size:.8em;font-weight:500">· ${list.length}</span></h2>
   <div class="qlist" style="margin-top:12px">${list.map(x=>`<a href="#q-${x.id}"><span>${S.qread[x.id]?"✓ ":""}${esc(x.q)}</span><span class="qc">${esc(QA_CATS.find(c=>c.id===x.cat).name)}</span></a>`).join("")||`<p>No questions match.</p>`}</div>
   <div class="co extra" style="margin-top:22px"><div class="co-h">How these answers are built</div><p>Each answer gives a short answer, key terms, Thomas's reasoning step by step, real cases, an analogy, relevant psychology, mistakes to avoid, and practical steps. Where good Catholic writers differ (for example on physical affection before marriage), both positions are set out. Further voices: ${["wagner","feser","garrigou","horn","heschmeyer","ca","jaw"].map(k=>esc(VOICES[k].split(/[,(]/)[0].trim())).join(", ")}.</p></div>`;
  $$("[data-qc]",v).forEach(b=>b.onclick=()=>{qFilter=(qFilter===b.dataset.qc&&b.dataset.qc!=="all")?"all":b.dataset.qc;renderQuestions();const h=$("#qlist-h");if(h){h.scrollIntoView({behavior:"smooth",block:"start"});h.classList.add("flash-h");}});
  const inp=$("#qsearch");inp.oninput=()=>{qSearch=inp.value;const pos=inp.selectionStart;renderQuestions();const n=$("#qsearch");n.focus();n.setSelectionRange(pos,pos);};
}

// ---------- Prayers & planner ----------
let prTab="today", prCat="all", prDay=new Date();
function planFor(d){const dow=d.getDay(),k=ymd(d);return S.plan.items.filter(it=>it.rep==="daily"||(it.rep==="weekdays"&&dow>0&&dow<6)||(it.rep==="dow"&&+it.dow===dow)||(it.rep==="once"&&it.date===k)).sort((a,b)=>a.time.localeCompare(b.time));}
function dayPct(d){const its=planFor(d);if(!its.length)return 0;const dn=S.plan.done[ymd(d)]||{};return its.filter(i=>dn[i.id]).length/its.length;}
function streak(){let n=0,d=new Date();if(dayPct(d)<1)d=addDays(d,-1);while(planFor(d).length&&dayPct(d)===1&&n<999){n++;d=addDays(d,-1);}return n;}
function prayerCard(p,full){
  return `<div class="prayer" id="pr-${p.id}"><div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="label">${esc(PR_CATS[p.cat])} · about ${p.dur} min</div><h3>${esc(p.name)}</h3></div><button class="primary" data-add="${p.id}">+ Add to my day</button></div>
   <p class="ui" style="font-size:.88rem;margin:.4em 0"><strong>When:</strong> ${esc(p.when)}</p>
   <details ${full?"open":""}><summary class="ui" style="cursor:pointer;font-weight:600;color:var(--accent)">Pray it</summary>
    <div class="ptext">${(p.text||[]).map(l=>`<p>${esc(l)}</p>`).join("")}</div>
    ${p.latin?`<details><summary class="ui" style="cursor:pointer;font-size:.85rem">Latin</summary><div class="plat no-tag">${p.latin.map(l=>`<p style="margin:.2em 0">${esc(l)}</p>`).join("")}</div></details>`:""}
    ${p.link?`<p><a href="${p.link}" target="_blank" rel="noopener">Full text →</a></p>`:""}</details>
   <details><summary class="ui" style="cursor:pointer;font-weight:600;color:var(--accent)">What it means</summary><div style="margin-top:8px">${p.meaning}</div><p class="muted ui" style="font-size:.8rem"><strong>Origin:</strong> ${esc(p.origin)}</p></details>
   <div data-addform="${p.id}" hidden></div></div>`;
}
function addForm(id){
  const box=$(`[data-addform="${id}"]`); if(!box)return; box.hidden=!box.hidden; if(box.hidden)return;
  const p=PRAYER_BY[id];
  box.innerHTML=`<div class="co check" style="margin-top:12px"><div class="co-h">Add ${esc(p.name)} to your schedule</div>
   <div class="row"><label class="ui" style="font-size:.85rem">Time <input type="time" data-f="time" value="${{angelus:"12:00","divine-mercy":"15:00",examen:"21:30","morning-offering":"06:30"}[id]||"07:00"}" style="width:auto"></label>
   <label class="ui" style="font-size:.85rem">Repeat <select data-f="rep" style="width:auto"><option value="daily">Every day</option><option value="weekdays">Weekdays</option><option value="dow">One day a week</option><option value="once">Only on the selected day</option></select></label>
   <select data-f="dow" style="width:auto" hidden>${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d,i)=>`<option value="${i}" ${i===prDay.getDay()?"selected":""}>${d}</option>`).join("")}</select>
   <button class="primary" data-save>Add</button></div></div>`;
  const rep=$('[data-f="rep"]',box),dow=$('[data-f="dow"]',box);rep.onchange=()=>dow.hidden=rep.value!=="dow";
  $("[data-save]",box).onclick=()=>{S.plan.items.push({id:"i"+Date.now().toString(36),pid:id,time:$('[data-f="time"]',box).value||"07:00",rep:rep.value,dow:+dow.value,date:ymd(prDay)});save();toast(p.name+" added to your day");box.hidden=true;};
}
function renderPrayers(){
  const v=$("#v-prayers");
  const tabs=`<div class="seg" role="group" aria-label="Section" style="margin-bottom:12px">${[["today","My day"],["prayers","Prayers & devotions"],["plan","Coming next"]].map(([k,l])=>`<button data-ptab="${k}" aria-pressed="${prTab===k}">${l}</button>`).join("")}</div>`;
  let body="";
  if(prTab==="today"){
    const d=prDay, ls=litSeason(d), fe=feastOf(d), its=planFor(d), dn=S.plan.done[ymd(d)]||{};
    const wk=[...Array(7)].map((_,i)=>addDays(d,i-d.getDay()));
    const colour={violet:"#6a4bb0",white:"#f5f5f7",green:"#2f8a4c",red:"#c0392b"}[ls.col];
    body=`<div class="day"><div>
      <div class="daynav"><button data-dnav="-1" aria-label="Previous day">←<span class="hide-s"> Previous</span></button><div style="text-align:center"><div class="label">${d.toLocaleDateString("en-ZA",{weekday:"long"})}</div><h2 style="font-family:var(--f-read);color:var(--navy)">${d.toLocaleDateString("en-ZA",{day:"numeric",month:"long",year:"numeric"})}</h2></div><button data-dnav="1" aria-label="Next day"><span class="hide-s">Next </span>→</button></div>
      ${notesHTML(d)}
      <div class="week">${wk.map(w=>`<button data-day="${ymd(w)}" aria-pressed="${ymd(w)===ymd(d)}"><span>${w.toLocaleDateString("en-ZA",{weekday:"short"})}</span><b>${w.getDate()}</b><span class="pc"><i style="width:${Math.round(dayPct(w)*100)}%"></i></span></button>`).join("")}</div>
      ${its.length?`<div class="tasks">${its.map(it=>{const sw=swapFor(it.pid,d),p=PRAYER_BY[sw],swapped=sw!==it.pid;return `<div class="task ${dn[it.id]?"done":""}"><input type="checkbox" data-tick="${it.id}" ${dn[it.id]?"checked":""} aria-label="Done: ${esc(p.name)}"><span class="tm">${esc(it.time)}</span><span class="nm"><a href="#" data-open="${p.id}">${esc(p.name)}</a><br>${swapped?`<span class="chip" style="margin:2px 0">replaces ${esc(PRAYER_BY[it.pid].name)} in this season</span><br>`:""}<span class="muted ui" style="font-size:.75rem">${{daily:"Every day",weekdays:"Weekdays",dow:"Every "+["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][it.dow],once:"This day only"}[it.rep]}</span></span><button class="ghost" data-del="${it.id}" aria-label="Remove ${esc(p.name)} from schedule">✕</button></div>`}).join("")}</div>
        <p class="ui muted" style="font-size:.85rem;margin-top:10px">${Object.keys(dn).filter(k=>dn[k]&&its.some(i=>i.id===k)).length} of ${its.length} done today.</p>`
       :`<div class="co extra"><div class="co-h">Nothing scheduled</div><p>Add prayers from the Prayers tab, or start with a ready-made rule:</p><div class="row">${PLAN_PRESETS.map((pp,i)=>`<button data-preset="${i}">${esc(pp.name)}</button>`).join("")}</div></div>`}
      <div id="opened"></div></div>
     <aside><div class="panel"><div class="label">Today in the Church's year</div>
      <p style="margin:.5em 0"><span class="litcol" style="background:${colour}"></span><strong>${esc(ls.name)}</strong></p>
      ${fe?`<p style="margin:.3em 0">Feast: <strong>${esc(fe)}</strong></p>`:""}
      <p style="margin:.3em 0">Rosary: <strong>${MYSTERY_BY_DOW[d.getDay()]} Mysteries</strong></p><p style="margin:.3em 0"><a href="#hours">Pray the Liturgy of the Hours →</a></p>
      ${d.getDay()===5?`<p class="muted" style="font-size:.88rem">Friday: a day of penance in memory of the Passion (CCC 1438; CIC c. 1250).</p>`:""}
      <p class="ui muted" style="font-size:.72rem">Seasons and feasts are calculated for the general Roman calendar; South Africa transfers some feasts (e.g. Epiphany, Ascension) to Sunday. Check your diocesan Ordo.</p></div>
      <div class="panel" style="margin-top:14px"><div class="label">Your faithfulness</div><div class="score tabular">${streak()}<span class="muted" style="font-size:1rem"> day streak</span></div><p class="muted ui" style="font-size:.78rem">Days on which every scheduled prayer was ticked. Saved in this browser; back it up on the Progress page.</p>
       ${S.plan.items.length?`<button class="ghost" id="clearplan" style="margin-top:6px">Clear my schedule</button><div id="clearconf" class="box warn" hidden><p>Remove all scheduled prayers? Ticked history is kept.</p><div class="row"><button class="primary" id="clearyes">Remove all</button><button id="clearno">Keep</button></div></div>`:""}</div></aside></div>`;
  } else if(prTab==="prayers"){
    const list=PRAYERS.filter(p=>prCat==="all"||p.cat===prCat);
    body=`<div class="filters" role="group" aria-label="Category">${["all",...Object.keys(PR_CATS)].map(c=>`<button data-pcat="${c}" aria-pressed="${prCat===c}">${c==="all"?"All":esc(PR_CATS[c])}</button>`).join("")}</div>${list.map(p=>prayerCard(p,false)).join("")}`;
  } else {
    body=`<div class="co core"><div class="co-h">Being built in stages</div><ol>
     <li><strong>Deeper Catechism notes.</strong> Every one of the 96 sections now has an in-depth layer (paragraph-by-paragraph notes, saints, misunderstandings and a catechist session plan). Next: review by a priest and catechists, and splitting the longest sections into smaller notes. <a href="#catechism">Open the notes →</a></li></ol>
     <p class="muted ui" style="font-size:.8rem;margin:.6em 0 0">Already added: <a href="#catechism">in-depth Catechism notes for the whole Catechism</a>, <a href="#mass">daily readings with commentary</a>, <a href="#hours">the Liturgy of the Hours</a> and <a href="#calendar">the full liturgical calendar</a> with the days of obligation.</p></div>`;
  }
  v.innerHTML=`<div class="guide-band"><div><div class="k">Prayers &amp; devotions</div><h1>Pray through the day</h1><div class="sub">What each prayer means, when to pray it, and a daily rule you can tick off</div></div>${imgTag("thomas-crucifix",true)}</div>${tabs}${body}`;
  $$("[data-ptab]",v).forEach(b=>b.onclick=()=>{prTab=b.dataset.ptab;renderPrayers();});
  $$("[data-pcat]",v).forEach(b=>b.onclick=()=>{prCat=b.dataset.pcat;renderPrayers();});
  $$("[data-add]",v).forEach(b=>b.onclick=()=>addForm(b.dataset.add));
  $$("[data-dnav]",v).forEach(b=>b.onclick=()=>{prDay=addDays(prDay,+b.dataset.dnav);renderPrayers();});
  $$("[data-day]",v).forEach(b=>b.onclick=()=>{const [y,m,dd]=b.dataset.day.split("-").map(Number);prDay=new Date(y,m-1,dd);renderPrayers();});
  $$("[data-tick]",v).forEach(c=>c.onchange=()=>{const k=ymd(prDay);S.plan.done[k]=S.plan.done[k]||{};S.plan.done[k][c.dataset.tick]=c.checked;save();renderPrayers();if(c.checked)toast("Done. Deo gratias.");});
  $$("[data-del]",v).forEach(b=>b.onclick=()=>{S.plan.items=S.plan.items.filter(i=>i.id!==b.dataset.del);save();renderPrayers();});
  $$("[data-preset]",v).forEach(b=>b.onclick=()=>{PLAN_PRESETS[+b.dataset.preset].items.forEach(([pid,time],n)=>S.plan.items.push({id:"i"+Date.now().toString(36)+n,pid,time,rep:"daily"}));save();renderPrayers();toast("Rule added");});
  $$("[data-quickadd]",v).forEach(b=>b.onclick=()=>{const pid=b.dataset.quickadd;S.plan.items.push({id:"i"+Date.now().toString(36),pid,time:{angelus:"12:00","regina-caeli":"12:00","divine-mercy":"15:00",alma:"21:45","ave-regina":"21:45","salve-regina":"21:45","regina-caeli":"12:00"}[pid]||"07:00",rep:"daily"});save();toast(PRAYER_BY[pid].name+" added");renderPrayers();});
  $$("[data-open]",v).forEach(a=>a.onclick=e=>{e.preventDefault();$("#opened").innerHTML=prayerCard(PRAYER_BY[a.dataset.open],true);$$("#opened [data-add]").forEach(b=>b.onclick=()=>addForm(b.dataset.add));$("#opened").scrollIntoView({behavior:"smooth"});});
  $("#clearplan")&&($("#clearplan").onclick=()=>$("#clearconf").hidden=false);
  $("#clearno")&&($("#clearno").onclick=()=>$("#clearconf").hidden=true);
  $("#clearyes")&&($("#clearyes").onclick=()=>{S.plan.items=[];save();renderPrayers();});
}

// ---------- Seasonal notices ----------
const NOTE_CO={swap:"stance",soon:"hook",antiphon:"def",fast:"warn",season:"core",novena:"case",month:"bridge",feast:"apply"};
function notesHTML(d){
  const N=seasonalNotes(d), today=ymd(d)===ymd(new Date());
  let changed="";
  if(today){const cur=litSeason(d).name;if(S.lastSeason&&S.lastSeason!==cur)changed=`<div class="co stance"><div class="co-h">The season has changed</div><p><strong>${esc(S.lastSeason)} → ${esc(cur)}.</strong> Your planner has been adjusted where prayers change with the season.</p></div>`;S.lastSeason=cur;save();}
  const card=n=>`<div class="co ${NOTE_CO[n.k]||"extra"}" style="margin:8px 0"><div class="co-h">${esc(n.t)}</div><p style="margin:.2em 0">${esc(n.x)}</p>${n.p&&PRAYER_BY[n.p]?`<div class="row" style="gap:6px;margin-top:6px"><button class="ghost" data-open="${n.p}">Open ${esc(PRAYER_BY[n.p].name)}</button>${S.plan.items.some(i=>swapFor(i.pid,d)===n.p)?`<span class="chip ok">In your day</span>`:`<button class="ghost" data-quickadd="${n.p}">+ Add to my day</button>`}</div>`:""}</div>`;
  const top=N.slice(0,3), rest=N.slice(3);
  return `<div style="margin:12px 0">${changed}${top.map(card).join("")}${rest.length?`<details><summary class="ui" style="cursor:pointer;font-weight:600;color:var(--accent);font-size:.88rem">${rest.length} more for this day</summary>${rest.map(card).join("")}</details>`:""}</div>`;
}
function churchPanel(){
  const d=new Date(),ls=litSeason(d),N=seasonalNotes(d).filter(n=>n.k!=="antiphon").slice(0,3);
  const colour={violet:"#6a4bb0",white:"#f5f5f7",green:"#2f8a4c",red:"#c0392b"}[ls.col];
  return `<a class="panel card-link" href="#prayers" style="display:block;margin-bottom:18px;color:inherit;text-decoration:none"><div class="row" style="justify-content:space-between"><div class="label">This week in the Church</div><span class="ui" style="font-size:.85rem"><span class="litcol" style="background:${colour}"></span>${esc(ls.name)} · Rosary: ${MYSTERY_BY_DOW[d.getDay()]} Mysteries</span></div>
   ${N.length?`<ul style="margin:.6em 0 0;padding-left:1.2em">${N.map(n=>`<li><strong>${esc(n.t)}.</strong> <span class="muted">${esc(n.x)}</span></li>`).join("")}</ul>`:`<p class="muted" style="margin:.5em 0 0">Ordinary Time: the steady growth of the Church's life. Open your daily rule.</p>`}</a>`;
}

document.addEventListener("click",e=>{const b=e.target.closest("[data-qstudy]");if(!b||typeof gcPickGroup!=="function")return;const id=b.dataset.qstudy;gcPickGroup(gid=>gcSendTo(gid,"study","",{id}));});
