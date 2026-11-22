// ---------- Groups: simpler sharing ----------
// Replaces the 📎 sheet and the composer sheets with easier versions: quick picks, no typing where a tap will do,
// answer rows that grow by themselves, and a search box for the long lists.

// Psalm numbering: the Douay-Rheims follows the Greek/Latin count, usually one lower than most modern Bibles.
function psHeb(ch){if(ch<=8)return ch;if(ch===9)return "9–10";if(ch<=112)return ch+1;if(ch===113)return "114–115";if(ch<=115)return 116;if(ch<=145)return ch+1;if(ch===146||ch===147)return 147;return ch;}
function psDR(heb){heb=+heb;if(heb<=8)return heb;if(heb<=10)return 9;if(heb<=113)return heb-1;if(heb<=115)return 113;if(heb===116)return 114;if(heb<=146)return heb-1;if(heb===147)return 146;return heb;}
function gcRefLabel(r){const base=`${r.name} ${r.ch}:${r.v}${r.v2>r.v?"–"+r.v2:""}`;if(r.slug!=="psalms")return base;const h=psHeb(r.ch);return String(h)===String(r.ch)?base:`${base} (Ps ${h} in most Bibles)`;}
// "John 3:16", "1 Cor 13:4-7", or a whole chapter: "Psalm 22"
function gcParseRef2(s){const r=gcParseRef(s);if(r)return r;const m=String(s).trim().match(/^((?:[1-4]\s*)?[A-Za-z][A-Za-z .]*?)\s*(\d+)$/);if(!m)return null;const t=gcParseRef(`${m[1]} ${m[2]}:1-21`);if(t)t.whole=true;return t;}

function waAttItems(){return [
 ["photo","🖼️","Photo","#c861f9","From your phone"],
 ["verse","📖","Verse","#7f66ff","Look one up"],
 ["poll","📊","Poll","#02a698","Everyone votes"],
 ["quiz","❓","Quiz","#ff2e74","Has a right answer"],
 ["qa","💬","Question","#00a5f4","Everyone answers"],
 ["study","🧭","7-day study","#ffbc38","Read a week together"],
 ["lesson","🎓","Lesson","#007bfc","From the Academy"],
 ["sticker","🏷️","Sticker","#fd6d38","Emoji or your own"],
 ["challenge","🏆","Challenge","#a8730d","This week's goal"]];}
function gcAttachSheet(){
  openSheet(`<h2 class="sheet-t" style="margin-bottom:2px">Share with the group</h2><div class="wa-att">${waAttItems().map(([k,i,l,c,d])=>`<button data-at="${k}"><span style="background:${c}">${i}</span><b>${l}</b><small>${d}</small></button>`).join("")}</div>`,r=>{
   r.querySelectorAll("[data-at]").forEach(b=>b.onclick=()=>{const k=b.dataset.at;
     if(k==="verse")gcVerseSheet();else if(k==="lesson")gcLessonSheet();else if(k==="poll")gcPollSheet();else if(k==="quiz")gcQuizSheet(true);else if(k==="qa")gcQuizSheet(false);else if(k==="study")gcStudySheet();else if(k==="sticker")gcStickerSheet();
     else if(k==="photo"){closeSheet();document.querySelector("[data-waphoto]").click();}
     else if(k==="challenge")waChallengeSheet();});},"Share");
}

// ---------- verse ----------
const GC_POPULAR_VERSES=[["John 3:16","John 3:16"],["Phil 4:13","Philippians 4:13"],["Rom 8:28","Romans 8:28"],["Psalm 23","Psalms 22:1-6"],["Prov 3:5-6","Proverbs 3:5-6"],["Isa 41:10","Isaiah 41:10"],["Matt 11:28-30","Matthew 11:28-30"],["Jer 29:11","Jeremiah 29:11"],["Josh 1:9","Joshua 1:9"],["1 Cor 13:4-7","1 Corinthians 13:4-7"]];
function gcVerseSheet(pre){
  const opt=(n,sel)=>Array.from({length:n},(_,i)=>`<option${i+1===sel?" selected":""}>${i+1}</option>`).join("");
  openSheet(`<h2 class="sheet-t">Share a verse</h2>
   <div class="label">Popular</div><div class="chips-row gv-pop">${GC_POPULAR_VERSES.map(([l,r])=>`<button class="chip" data-gvq="${esc(r)}">${esc(l)}</button>`).join("")}</div>
   <label class="label" for="gv-r">Type a reference</label><input id="gv-r" placeholder="e.g. John 3:16 or 1 Cor 13:4-7" value="${esc(pre||"")}" autocomplete="off" enterkeyhint="done">
   <div class="label" style="margin-top:8px">…or choose it</div>
   <div class="gv-pick"><select id="gv-b" aria-label="Book">${BIBLE_INDEX.map(b=>`<option value="${b.slug}">${esc(b.name)}</option>`).join("")}</select><select id="gv-c" aria-label="Chapter"></select><select id="gv-v1" aria-label="From verse"></select><span>to</span><select id="gv-v2" aria-label="To verse"></select></div>
   <p class="muted ui gv-ps" hidden style="font-size:.75rem;margin:6px 0 0">Psalms here follow the older Catholic numbering, usually one lower than most Bibles (Psalm 23 is Psalm 22). Typing "Psalm 23" finds the one most Bibles call 23.</p>
   <div id="gv-p" class="gv-prev muted">Pick a verse to see it here.</div>
   <label class="label" for="gv-n">Add a thought (optional)</label><textarea id="gv-n" rows="2" maxlength="1000" placeholder="Why this verse?"></textarea>
   <div class="sheet-acts"><button class="primary" data-gvsend disabled>Send verse</button><button data-sheetx>Cancel</button></div>`,r=>{
   const inp=r.querySelector("#gv-r"),pv=r.querySelector("#gv-p"),sb=r.querySelector("[data-gvsend]"),bs=r.querySelector("#gv-b"),cs=r.querySelector("#gv-c"),v1=r.querySelector("#gv-v1"),v2=r.querySelector("#gv-v2"),ps=r.querySelector(".gv-ps");let cur=null,txt="",seq=0;
   const book=slug=>BIBLE_INDEX.find(x=>x.slug===slug);
   const fillVerses=async(slug,ch,a,b)=>{const B=await loadBook(slug).catch(()=>null);const c=B&&B.chapters.find(x=>x.n===ch);const n=c?c.verses.length:1;v1.innerHTML=opt(n,a);v2.innerHTML=opt(n,b);return n;};
   const syncSelects=async c=>{bs.value=c.slug;cs.innerHTML=opt(book(c.slug).chapters,c.ch);await fillVerses(c.slug,c.ch,c.v,c.v2);};
   const show=async(c,fromSelect)=>{const my=++seq;cur=c;ps.hidden=!(c&&c.slug==="psalms");
     if(!c){pv.textContent="Type a reference like John 3:16, or choose one below.";sb.disabled=true;return;}
     if(!fromSelect)await syncSelects(c);
     const Bk=await loadBook(c.slug).catch(()=>null);const chp=Bk&&Bk.chapters.find(x=>x.n===c.ch);if(chp){const n=chp.verses.length;if(c.v2>n)c.v2=n;if(c.v>n){c.v=n;}}
     txt=await gcVerseText(c).catch(()=>null);if(my!==seq)return;
     if(!txt){pv.textContent="That verse was not found.";sb.disabled=true;return;}
     pv.innerHTML=`<strong>${esc(gcRefLabel(c))}</strong> ${esc(txt.length>600?txt.slice(0,600)+"…":txt)}`;sb.disabled=false;};
   const fromText=()=>{let s=inp.value;
     // "Psalm 23" typed with the modern number → the Douay-Rheims number
     const dr=/\(dr\)/i.test(s);s=s.replace(/\(dr\)/ig,"").trim();const pm=s.match(/^ps(?:a|alm|alms)?\.?\s*(\d+)(.*)$/i);if(pm&&!dr)s=`Psalms ${psDR(pm[1])}${pm[2]}`;
     show(gcParseRef2(s));};
   let tm;inp.oninput=()=>{clearTimeout(tm);tm=setTimeout(fromText,250);};
   r.querySelectorAll("[data-gvq]").forEach(b=>b.onclick=()=>{inp.value=b.textContent;r.querySelectorAll("[data-gvq]").forEach(x=>x.setAttribute("aria-pressed",x===b));show(gcParseRef(b.dataset.gvq));});
   const fromSelects=async(changed)=>{const B=book(bs.value);let ch=+cs.value||1;if(changed==="b"){cs.innerHTML=opt(B.chapters,1);ch=1;}
     if(changed==="b"||changed==="c")await fillVerses(B.slug,ch,1,1);
     let a=+v1.value||1,b=+v2.value||a;if(b<a){b=a;v2.value=a;}if(b>a+20){b=a+20;v2.value=b;}
     const c={slug:B.slug,name:B.name,ch,v:a,v2:b};inp.value=`${B.name} ${ch}:${a}${b>a?"-"+b:""}${B.slug==="psalms"?" (DR)":""}`;show(c,true);};
   bs.onchange=()=>fromSelects("b");cs.onchange=()=>fromSelects("c");v1.onchange=()=>{if(+v2.value<+v1.value)v2.value=v1.value;fromSelects("v");};v2.onchange=()=>fromSelects("v");
   if(pre)fromText();else{bs.value="john";cs.innerHTML=opt(21,3);fillVerses("john",3,16,16);}
   sb.onclick=async()=>{if(!cur||!txt)return;closeSheet();await gcSend("verse",r.querySelector("#gv-n").value.trim(),{slug:cur.slug,ch:cur.ch,v:cur.v,ref:gcRefLabel(cur),text:txt});};},"Verse");
}

// ---------- answer rows that grow by themselves ----------
function waRows(wrap,cls,ph,min,max,extra){
  const row=i=>`<div class="wa-orow">${extra?extra(i):""}<input class="${cls}" maxlength="120" placeholder="${ph} ${i+1}"><button type="button" class="wa-orx" aria-label="Remove">✕</button></div>`;
  const tidy=()=>{const rows=[...wrap.children];rows.forEach((x,i)=>{x.querySelector("input."+cls).placeholder=`${ph} ${i+1}`;x.querySelector(".wa-orx").hidden=rows.length<=min;});
    const last=rows[rows.length-1];if(rows.length<max&&last&&last.querySelector("input."+cls).value.trim())wrap.insertAdjacentHTML("beforeend",row(rows.length));
    [...wrap.children].forEach(x=>{const b=x.querySelector(".wa-orx");b.hidden=wrap.children.length<=min;});};
  wrap.innerHTML=Array.from({length:min},(_,i)=>row(i)).join("");
  wrap.addEventListener("input",tidy);
  wrap.addEventListener("click",e=>{const x=e.target.closest(".wa-orx");if(!x)return;if(wrap.children.length>min){x.closest(".wa-orow").remove();tidy();}});
  tidy();
  return {set(vals){wrap.innerHTML=vals.map((_,i)=>row(i)).join("");[...wrap.querySelectorAll("input."+cls)].forEach((x,i)=>x.value=vals[i]);tidy();},values(){return [...wrap.querySelectorAll("input."+cls)].map(x=>x.value.trim());}};
}

// ---------- poll ----------
const GC_POLL_IDEAS=[["Which day?",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]],["Yes / No",["Yes","No","Maybe"]],["What time?",["Morning","Lunchtime","Afternoon","Evening"]],["How was this week?",["Great","Good","Hard","Really hard"]]];
function gcPollSheet(){
  openSheet(`<h2 class="sheet-t">Create a poll</h2><label class="label" for="gp-q">Question</label><input id="gp-q" maxlength="200" placeholder="e.g. Which night suits us for Bible study?">
   <div class="label" style="margin-top:8px">Quick options</div><div class="chips-row">${GC_POLL_IDEAS.map(([l],i)=>`<button class="chip" data-gpi="${i}">${esc(l)}</button>`).join("")}</div>
   <label class="label">Options <span class="muted" style="font-weight:400;text-transform:none;letter-spacing:0">(a new line appears as you type)</span></label><div id="gp-o"></div>
   <div class="sheet-acts"><button class="primary" data-gpsend>Send poll</button><button data-sheetx>Cancel</button></div>`,r=>{
   const rows=waRows(r.querySelector("#gp-o"),"gp-o","Option",2,10);
   r.querySelectorAll("[data-gpi]").forEach(b=>b.onclick=()=>{const [l,o]=GC_POLL_IDEAS[+b.dataset.gpi];rows.set(o);const q=r.querySelector("#gp-q");if(!q.value.trim()&&l.endsWith("?"))q.value=l;});
   r.querySelector("[data-gpsend]").onclick=()=>{const q=r.querySelector("#gp-q").value.trim();const o=rows.values().filter(Boolean);if(!q){toast("Write the question first");r.querySelector("#gp-q").focus();return;}if(o.length<2){toast("Add at least two options");return;}closeSheet();gcSend("poll","",{q,o});};},"Poll");
}

// ---------- quiz and open question ----------
const GC_QA_IDEAS=["How can we pray for you this week?","What verse has helped you most lately?","What are you thankful for today?","What did today's reading teach you?","Which Christian (past or present) inspires you, and why?","What's one thing God has been teaching you?"];
function gcQuizSheet(quiz){
  openSheet(`<h2 class="sheet-t">${quiz?"Quiz question":"Ask the group"}</h2>
   ${quiz?"":`<p class="muted" style="margin-top:0">Everyone types an answer. You see the others' answers once you've given yours.</p><div class="chips-row gqa-ideas">${GC_QA_IDEAS.map(x=>`<button class="chip" data-gqi>${esc(x)}</button>`).join("")}</div>`}
   <label class="label" for="gq-q">Question</label><textarea id="gq-q" rows="2" maxlength="300" placeholder="${quiz?"e.g. Who carried the cross for Jesus?":"Type your question"}"></textarea>
   ${quiz?`<label class="label">Answers <span class="muted" style="font-weight:400;text-transform:none;letter-spacing:0">(tap ✓ next to the right one)</span></label><div id="gq-o"></div>
   <label class="label" for="gq-w">Explanation shown after answering (optional)</label><textarea id="gq-w" rows="2" maxlength="500" placeholder="e.g. Simon of Cyrene (Luke 23:26)"></textarea>`:""}
   <div class="sheet-acts"><button class="primary" data-gqsend>Send</button><button data-sheetx>Cancel</button></div>`,r=>{
   r.querySelectorAll("[data-gqi]").forEach(b=>b.onclick=()=>{r.querySelector("#gq-q").value=b.textContent;r.querySelectorAll("[data-gqi]").forEach(x=>x.setAttribute("aria-pressed",x===b));});
   let rows=null,correct=0;
   if(quiz){const w=r.querySelector("#gq-o");rows=waRows(w,"gq-o","Answer",2,6,i=>`<button type="button" class="gq-c" aria-label="Mark as the right answer" aria-pressed="false">✓</button>`);
     const mark=()=>[...w.children].forEach((x,i)=>{const b=x.querySelector(".gq-c");b.setAttribute("aria-pressed",i===correct);x.classList.toggle("ok",i===correct);});
     w.addEventListener("click",e=>{const b=e.target.closest(".gq-c");if(!b)return;correct=[...w.children].indexOf(b.closest(".wa-orow"));mark();});
     w.addEventListener("input",mark);w.addEventListener("click",e=>{if(e.target.closest(".wa-orx")){correct=Math.min(correct,w.children.length-1);setTimeout(mark);}});mark();}
   r.querySelector("[data-gqsend]").onclick=()=>{const q=r.querySelector("#gq-q").value.trim();if(!q){toast("Write the question first");r.querySelector("#gq-q").focus();return;}
     if(!quiz){closeSheet();gcSend("qa","",{q});return;}
     const vals=rows.values();const list=vals.map((t,i)=>({t,c:i===correct})).filter(x=>x.t);
     if(list.length<2){toast("Add at least two answers");return;}if(!list.some(x=>x.c)){toast("Tap ✓ next to the right answer");return;}
     closeSheet();gcSend("qa","",{q,o:list.map(x=>x.t),a:list.findIndex(x=>x.c),why:r.querySelector("#gq-w").value.trim()});};},quiz?"Quiz":"Question");
}

// ---------- lesson or course ----------
function gcLessonSheet(){
  const mods=YEARS.flatMap(y=>y.mods).filter(m=>m[3]&&LESSONS[m[3]]);
  const recent=Object.entries(S.complete||{}).filter(([k])=>LESSONS[k]).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k])=>k);
  const last=S.lastLesson&&LESSONS[S.lastLesson]?S.lastLesson:null;
  const lBtn=(L,tag)=>`<button data-gll="${L.id}"><strong>${tag?tag+" ":""}${esc(L.title)}</strong><span class="muted">${esc(L.code||"Lesson")}</span></button>`;
  openSheet(`<h2 class="sheet-t">Share a lesson</h2><input id="gl-q" type="search" placeholder="Search lessons and courses" aria-label="Search" autocomplete="off"><div class="pick-list" id="gl-l"></div><div class="sheet-acts"><button data-sheetx>Close</button></div>`,r=>{
   const q=r.querySelector("#gl-q"),l=r.querySelector("#gl-l");
   const draw=()=>{const s=q.value.trim().toLowerCase();
     if(!s){const mine=[...(last?[last]:[]),...recent.filter(x=>x!==last)].slice(0,5);
       l.innerHTML=`${mine.length?`<div class="label">Your lessons</div>${mine.map(k=>lBtn(LESSONS[k],k===last&&!isDone(k)?"▶":"✓")).join("")}`:""}<div class="label" style="margin-top:6px">Whole courses</div>${mods.map(m=>`<button data-glm="${m[3]}" data-c="${esc(m[0])}" data-t="${esc(m[1])}"><strong>🎓 ${esc(m[1])}</strong><span class="muted">${esc(m[0])} · ${modLessons(m[3]).length} lessons</span></button>`).join("")}`;}
     else{const mm=mods.filter(m=>(m[0]+" "+m[1]).toLowerCase().includes(s)).slice(0,8);const ll=Object.values(LESSONS).filter(L=>(L.title+" "+(L.code||"")).toLowerCase().includes(s)).slice(0,25);
       l.innerHTML=(mm.length||ll.length)?`${mm.map(m=>`<button data-glm="${m[3]}" data-c="${esc(m[0])}" data-t="${esc(m[1])}"><strong>🎓 ${esc(m[1])}</strong><span class="muted">Course · ${modLessons(m[3]).length} lessons</span></button>`).join("")}${ll.map(L=>lBtn(L)).join("")}`:`<p class="muted">Nothing found for “${esc(q.value)}”.</p>`;}
     l.querySelectorAll("[data-glm]").forEach(b=>b.onclick=()=>{closeSheet();gcSend("lesson","",{mod:b.dataset.glm,code:b.dataset.c,title:b.dataset.t});});
     l.querySelectorAll("[data-gll]").forEach(b=>b.onclick=()=>{const L=LESSONS[b.dataset.gll];closeSheet();gcSend("lesson","",{id:L.id,code:L.code||"",title:L.title});});};
   q.oninput=draw;draw();},"Lesson");
}

// ---------- 7-day study: add a search box to the long list ----------
gcStudySheet=(orig=>function(){orig();const body=document.querySelector("#sheet .sheet-body");if(!body)return;
  const box=document.createElement("input");box.type="search";box.placeholder="Search studies (e.g. anxiety, David, Christmas)";box.setAttribute("aria-label","Search studies");box.className="ws-search";
  body.querySelector("p")?.after(box);
  box.oninput=()=>{const s=box.value.trim().toLowerCase();const det=body.querySelector("details");if(s&&det)det.open=true;
    body.querySelectorAll("[data-gss]").forEach(b=>b.hidden=!!s&&!b.textContent.toLowerCase().includes(s));
    body.querySelectorAll(".pick-list").forEach(l=>{const any=[...l.children].some(x=>!x.hidden);l.hidden=!any;const lab=l.previousElementSibling;if(lab&&lab.tagName!=="SUMMARY"&&lab.classList.contains("label"))lab.hidden=!any;if(lab&&lab.tagName==="P"){lab.hidden=!any;const l2=lab.previousElementSibling;if(l2&&l2.classList.contains("label"))l2.hidden=!any;}});};
})(gcStudySheet);

// ---------- challenge ----------
function waChallengeSheet(){
  const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);const C=gcChal();
  openSheet(`<h2 class="sheet-t">Weekly challenge</h2><div class="wa-menu">
    <button data-wachal data-sheetx><b>🏆 See this week's challenge</b><small class="muted">${esc(C.t)}</small></button>
    ${admin?`<button data-gpickchal><b>🔄 Choose a different one</b><small class="muted">${GC_CHALLENGES.length} ready-made challenges</small></button>`:""}
    <button data-gmakechal><b>✏️ Create your own</b><small class="muted">${admin?"It becomes this week's challenge":"Suggest it to the group"}</small></button></div>
    <div class="sheet-acts"><button data-sheetx>Close</button></div>`,null,"Challenge");
}

// ---------- empty chat: show the easiest first steps ----------
function waStarterHTML(){if(!G||G.msgs.some(m=>m.kind!=="system"))return "";
  return `<div class="wa-start"><div class="wa-start-t">Get the group going</div><p class="muted">A few easy ways to start:</p><div class="wa-start-g">
   <button data-wst="verse"><span>📖</span>Share a verse</button><button data-wst="study"><span>🧭</span>Start a 7-day study</button><button data-wst="poll"><span>📊</span>Ask with a poll</button><button data-ginvite><span>👤</span>Invite friends</button></div></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-wst]");if(!b||!G)return;const k=b.dataset.wst;if(k==="verse")gcVerseSheet();else if(k==="study")gcStudySheet();else if(k==="poll")gcPollSheet();});

// ---------- create your own challenge (task rows grow as you type, with ideas to tap) ----------
const GC_TASK_IDEAS=["Read the Gospel of the day","Pray for 10 minutes","Go to Mass or a church service","Text an encouraging verse to a friend","No phone for the first hour of the day","Do one secret act of kindness","Memorise a verse","Pray for someone by name","Thank God for 3 things before bed","Fast from social media for a day"];
function gcMakeChallenge(){
  const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);
  openSheet(`<h2 class="sheet-t">Create a challenge</h2><label class="label" for="mc-t">Name</label><input id="mc-t" maxlength="60" placeholder="e.g. Exam-week faithfulness">
   <label class="label" for="mc-v">Verse or motto (optional)</label><input id="mc-v" maxlength="160" placeholder="e.g. I can do all things in him who strengtheneth me (Phil 4:13)">
   <label class="label">Tasks <span class="muted" style="font-weight:400;text-transform:none;letter-spacing:0">(2 to 8 · 10 points each)</span></label><div id="mc-l"></div>
   <div class="label" style="margin-top:8px">Tap an idea to add it</div><div class="chips-row">${GC_TASK_IDEAS.map(x=>`<button class="chip" data-mci>${esc(x)}</button>`).join("")}</div>
   <p class="muted ui" style="font-size:.78rem">${admin?"It becomes this week's challenge for the whole group.":"It's posted in the chat as a suggestion; a group admin can make it this week's challenge."}</p>
   <div class="sheet-acts"><button class="primary" data-mcgo>${admin?"Start this challenge":"Suggest it"}</button><button data-sheetx>Cancel</button></div>`,r=>{
   const rows=waRows(r.querySelector("#mc-l"),"mc-i","Task",2,8);
   r.querySelectorAll("[data-mci]").forEach(b=>b.onclick=()=>{const v=rows.values().filter(Boolean);if(v.includes(b.textContent))return;if(v.length>=8){toast("Eight tasks is the most");return;}rows.set([...v,b.textContent]);b.setAttribute("aria-pressed","true");});
   r.querySelector("[data-mcgo]").onclick=async()=>{const t=r.querySelector("#mc-t").value.trim();const tasks=rows.values().filter(Boolean).map(x=>[x,null]);if(!t){toast("Give the challenge a name");r.querySelector("#mc-t").focus();return;}if(tasks.length<2){toast("Add at least two tasks");return;}
     const raw=r.querySelector("#mc-v").value.trim();const mm=raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);const custom={t,v:raw?(mm?[mm[1],mm[2]]:[raw,""]):["",""],tasks,c:"Custom"};closeSheet();
     const m=await gcSend("challenge","",{custom});if(!m)return;
     if(admin){const {error}=await GC.from("group_weeks").upsert({group_id:G.id,week:G.week,challenge:-m.id});if(error)return gcErr(error);G.challenge=-m.id;G.custom=custom;await gcLoadCheckins();gcRerender(m.id);gcTab("challenge");toast("Challenge started 🏆");}};},"Create a challenge");
}
