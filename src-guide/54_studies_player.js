// ---------- Week-long mini-study player ----------
// Response value: {d:{"0":{done:true,a:...},...}, done:true when all 7 days are finished}
function wsDayIndex(m){const s=new Date(m.created_at);const a=new Date(s.getFullYear(),s.getMonth(),s.getDate());const t=new Date();const b=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.max(0,Math.round((b-a)/864e5));}
function wsUnlocked(m,ST){return Math.min(ST.days.length,wsDayIndex(m)+1);}
function wsMine(mid){const v=(G.resp.get(mid)||new Map()).get(GC_USER.id);return v&&v.d?JSON.parse(JSON.stringify(v)):{d:{},done:false};}
function wsDoneCount(v){return v&&v.d?Object.values(v.d).filter(x=>x&&x.done).length:0;}
function wsEx(D){if(D.ex)return D.ex;const Q=typeof QAS!=="undefined"&&QAS.find(x=>x.id===D.q);return Q?Q.short:"";}
function wsRefLabel(r){const B=BIBLE_INDEX.find(b=>b.slug===r[0]);return `${B?B.name:r[0]} ${r[1]}:${r[2]}${r[3]>r[2]?"–"+r[3]:""}`;}
function wsCardHTML(m){
  const ST=GC_STUDIES.find(s=>s.id===m.data.id);
  if(!ST)return `<div class="gcard gstudy"><div class="gc-k">🧭 Mini-study</div><p class="muted">This study is from an older version. Start a new 7-day study from 📎.</p></div>`;
  const R=G.resp.get(m.id)||new Map();const un=wsUnlocked(m,ST);const today=Math.min(un,ST.days.length)-1;const my=wsMine(m.id);const n=wsDoneCount(my);
  const todayDone=[...R.entries()].filter(([u,v])=>v&&v.d&&v.d[today]&&v.d[today].done).map(([u])=>u);
  const finished=wsDayIndex(m)>=ST.days.length;
  return `<div class="gcard gstudy"><div class="gc-k">🧭 7-day study · ${finished?"week complete":"day "+(today+1)+" of 7"}</div><h4>${esc(ST.e)} ${esc(ST.t)}</h4>
   <p class="muted" style="margin:.2em 0 .5em">${esc(ST.d)}</p>
   ${finished?"":`<div class="ws-today"><span class="ws-tl">Today</span><b>${esc(ST.days[today].t)}</b><span class="muted">${esc(wsRefLabel(ST.days[today].r))}</span></div>`}
   <div class="ws-dots">${ST.days.map((x,i)=>`<i class="${my.d[i]&&my.d[i].done?"on":i<un?"open":""}${i===today&&!finished?" td":""}" title="Day ${i+1}: ${esc(x.t)}"></i>`).join("")}</div>
   <div class="gc-avs">${todayDone.map(u=>gcAv(u,"xs")).join("")}</div>
   <button class="btn primary" data-gstudy="${m.id}">${n===0?"Start day 1":n>=ST.days.length?"Review the week":my.d[today]&&my.d[today].done?"See today's answers":"Open day "+(today+1)}</button>
   <div class="gc-foot">You: ${n}/7 days${todayDone.length?` · ${todayDone.length} of ${G.members.size} did today's day`:""}</div></div>`;
}
async function gcStudy(mid){
  const m=G.msgs.find(x=>x.id===mid);const ST=GC_STUDIES.find(s=>s.id===(m&&m.data.id));if(!ST)return;
  const my=wsMine(mid);let view="list",day=0;
  const un=()=>wsUnlocked(m,ST);
  const ov=document.createElement("div");ov.className="gstudy-ov";ov.setAttribute("role","dialog");ov.setAttribute("aria-label",ST.t);document.body.append(ov);document.body.classList.add("sheet-open");
  const close=()=>{ov.remove();document.body.classList.remove("sheet-open");gcRerender(mid);};
  const save=async()=>{my.done=wsDoneCount(my)>=ST.days.length;const {error}=await GC.from("responses").upsert({message_id:mid,user_id:GC_USER.id,group_id:G.id,value:my});if(error)gcErr(error);if(!G.resp.has(mid))G.resp.set(mid,new Map());G.resp.get(mid).set(GC_USER.id,JSON.parse(JSON.stringify(my)));};
  const others=i=>[...(G.resp.get(mid)||new Map()).entries()].filter(([u,v])=>v&&v.d&&v.d[i]&&v.d[i].done);
  const results=(D,i)=>{const all=others(i);const a=D.act;
    if(a.k==="quiz"){const ok=all.filter(([u,v])=>v.d[i].a===a.a).length;return `<div class="gs-res"><strong>How the group did</strong><div class="gs-row"><span class="gs-bar"><i style="width:${all.length?ok/all.length*100:0}%"></i></span><span>${ok}/${all.length} correct</span></div></div>`;}
    if(a.k==="poll")return `<div class="gs-res"><strong>The group's answers</strong>${a.o.map((o,k)=>{const n=all.filter(([u,v])=>v.d[i].a===k).length;return `<div class="gs-row"><span class="gs-l">${esc(o)}</span><span class="gs-bar"><i style="width:${all.length?n/all.length*100:0}%"></i></span><span>${n}</span></div>`;}).join("")}</div>`;
    return `<div class="gs-res"><strong>What the group wrote</strong>${all.filter(([u,v])=>typeof v.d[i].a==="string").map(([u,v])=>`<div class="gqa-a">${gcAv(u,"xs")}<div><b>${u===GC_USER.id?"You":esc(gcName(u))}</b><p>${esc(v.d[i].a)}</p></div></div>`).join("")||`<p class="muted">No reflections yet. Be the first!</p>`}</div>`;};
  const draw=async()=>{
    const U=un();let body="",foot="";
    if(view==="list"){
      body=`<p class="muted" style="margin-top:0">${esc(ST.d)} A new day opens each morning; you can catch up on missed days at any time.</p><div class="ws-list">${ST.days.map((D,i)=>{const dn=my.d[i]&&my.d[i].done;const lock=i>=U;const c=others(i).length;
        return `<button class="ws-day${dn?" done":""}${lock?" lock":""}" ${lock?"disabled":`data-wsd="${i}"`}><span class="ws-n">${dn?"✓":lock?"🔒":i+1}</span><span class="ws-m"><b>Day ${i+1} · ${esc(D.t)}</b><span class="muted">${esc(wsRefLabel(D.r))}${lock?` · opens ${i-U+1===1?"tomorrow":"in "+(i-U+1)+" days"}`:c?` · ${c} done`:""}</span></span></button>`;}).join("")}</div>`;
      foot=`<span></span><button class="btn primary" data-sx>Close</button>`;}
    else{
      const D=ST.days[day];const st=my.d[day]||{};const txt=await gcVerseText({slug:D.r[0],ch:D.r[1],v:D.r[2],v2:D.r[3]}).catch(()=>null);const a=D.act;
      let act="";
      if(a.k==="quiz"){const ans=st.a;act=`<div class="gs-k">Quiz</div><h4>${esc(a.q)}</h4>${a.o.map((o,k)=>`<button class="gpo ${ans!=null?(k===a.a?"ok":ans===k?"no":""):""}" ${ans!=null?"disabled":`data-wsa="${k}"`}><span class="gpo-t">${ans!=null&&k===a.a?"✓ ":ans===k&&ans!==a.a?"✗ ":""}${esc(o)}</span></button>`).join("")}${ans!=null?`<p class="gc-why">${ans===a.a?"<strong>Correct!</strong> ":"<strong>Not quite.</strong> "}${esc(a.why||"")}</p>`:""}`;}
      else if(a.k==="poll"){act=`<div class="gs-k">Poll</div><h4>${esc(a.q)}</h4>${a.o.map((o,k)=>`<button class="gpo${st.a===k?" sel":""}" data-wsa="${k}"><span class="gpo-t">${esc(o)}</span></button>`).join("")}`;}
      else act=`<div class="gs-k">Reflect</div><h4>${esc(a.q)}</h4><textarea id="ws-t" rows="4" maxlength="800" placeholder="Your reflection (shared with the group)">${esc(typeof st.a==="string"?st.a:"")}</textarea>`;
      body=`<div class="gs-k">Day ${day+1} of 7</div><h3 style="margin:.15em 0 .5em">${esc(D.t)}</h3>
       <div class="ws-pass"><div class="ws-ref">📖 ${esc(wsRefLabel(D.r))}</div><div class="gs-read">${esc(txt||"")}</div><div class="muted ui" style="font-size:.72rem;margin-top:6px">Douay-Rheims · <a href="#read-${D.r[0]}-${D.r[1]}-${D.r[2]}" data-wsopen>Open in the Bible</a></div></div>
       <div class="ws-ex"><div class="gs-k">Today's thought</div><p>${esc(wsEx(D))}</p>${D.q?`<a class="ws-more" href="#q-${D.q}" data-wsopen>Read the full answer in Life's questions →</a>`:""}</div>
       <div class="ws-act">${act}</div>${st.done?results(D,day):""}`;
      const canDone=a.k==="reflect"||st.a!=null;
      foot=`<button class="btn" data-wsback>← All days</button>${st.done?(day+1<U?`<button class="btn primary" data-wsd="${day+1}">Day ${day+2} →</button>`:`<button class="btn primary" data-wsback>Done</button>`):`<button class="btn primary" data-wsdone ${canDone?"":"disabled"}>${day===ST.days.length-1?"Finish the week 🎉":"Mark day done ✓"}</button>`}`;
    }
    const n=wsDoneCount(my);
    ov.innerHTML=`<div class="gs-card"><div class="gs-head"><button class="gs-x" aria-label="Close">✕</button><div class="gs-t">${esc(ST.e)} ${esc(ST.t)}</div><div class="gs-dots">${ST.days.map((_,i)=>`<i class="${my.d[i]&&my.d[i].done?"on":view==="day"&&i===day?"cur":""}"></i>`).join("")}</div><div class="muted ui" style="font-size:.72rem;margin-top:6px">${n}/7 days done</div></div><div class="gs-body">${body}</div><div class="gs-foot">${foot}</div></div>`;
    ov.querySelector(".gs-x").onclick=close;const sx=ov.querySelector("[data-sx]");sx&&(sx.onclick=close);
    ov.querySelectorAll("[data-wsd]").forEach(b=>b.onclick=()=>{day=+b.dataset.wsd;view="day";draw();});
    ov.querySelectorAll("[data-wsback]").forEach(b=>b.onclick=()=>{view="list";draw();});
    const op=ov.querySelector("[data-wsopen]");op&&(op.onclick=()=>close());
    ov.querySelectorAll("[data-wsa]").forEach(b=>b.onclick=async()=>{my.d[day]=Object.assign(my.d[day]||{},{a:+b.dataset.wsa});await save();draw();});
    const dn=ov.querySelector("[data-wsdone]");dn&&(dn.onclick=async()=>{const ta=ov.querySelector("#ws-t");if(ta){const v=ta.value.trim();if(!v){toast("Write a few words first");return;}my.d[day]=Object.assign(my.d[day]||{},{a:v});}
      my.d[day].done=true;my.d[day].at=Date.now();await save();try{logReading(ST.days[day].r.join("|"));}catch(e){}
      if(wsDoneCount(my)>=ST.days.length){const cv=document.createElement("canvas");cv.className="confetti-cv";document.body.append(cv);confetti(cv);setTimeout(()=>cv.remove(),3500);toast("You finished the week! 🎉");}else toast(`Day ${day+1} done ✓`);
      draw();});
  };
  // open on today's day if it isn't done yet
  const t=Math.min(un(),ST.days.length)-1;if(!(my.d[t]&&my.d[t].done)&&t>=0&&wsDoneCount(my)>0){view="day";day=t;}else if(wsDoneCount(my)===0){view="day";day=0;}
  draw();
}
function gcStudySheet(){
  const now=new Date();const inS=gcStudiesInSeason(now);const yr=GC_STUDIES.filter(x=>!x.when&&!x.all);const ev=GC_STUDIES.filter(x=>x.all);const later=GC_STUDIES.filter(x=>x.when&&!inS.includes(x));
  const item=s=>`<button data-gss="${s.id}"><strong>${esc(s.e)} ${esc(s.t)}</strong><span class="muted">${esc(s.d)}</span></button>`;
  openSheet(`<h2 class="sheet-t">Start a 7-day study</h2><p class="muted" style="margin-top:0">One passage, a short explanation and one thing to do each day for a week. Everyone does it on their own phone; answers and reflections are shared with the group.</p>
   ${inS.length?`<div class="label" style="margin-top:6px">✨ In season now</div><div class="pick-list ws-season">${inS.map(item).join("")}</div>`:""}
   <div class="label" style="margin-top:10px">🤝 For every Christian</div><p class="muted" style="margin:2px 0 6px;font-size:.8rem">Bible studies to do with friends from any church: Catholic, evangelical or non-denominational.</p><div class="pick-list">${ev.map(item).join("")}</div>
   <div class="label" style="margin-top:10px">Catholic life and Life's questions</div><div class="pick-list">${yr.map(item).join("")}</div>
   <details style="margin-top:10px"><summary class="label" style="cursor:pointer">Through the Church's year (${later.length})</summary><div class="pick-list">${later.map(s=>`<button data-gss="${s.id}"><strong>${esc(s.e)} ${esc(s.t)}</strong><span class="muted">${esc(s.season||"")} · ${esc(s.d)}</span></button>`).join("")}</div></details>
   <div class="sheet-acts"><button data-sheetx>Close</button></div>`,r=>{
   r.querySelectorAll("[data-gss]").forEach(b=>b.onclick=()=>{closeSheet();gcSend("study","",{id:b.dataset.gss});});},"Mini-study");
}

