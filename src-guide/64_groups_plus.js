// ---------- Groups, upgraded: pinned messages, editing, @mentions, unread marker, chat search, starred,
// prayer requests, meetings with RSVP, and admin tools. Needs supabase_groups_v2.sql; without it these
// features stay hidden and the chat works as before.
const gpReady=()=>!!(G&&G.group&&G.group.pins!==undefined);
const gpMe=()=>G&&G.members.get(GC_USER.id)||{};
const gpAdmin=()=>["owner","admin"].includes(gpMe().role);
const gpSet=()=>(G&&G.group&&G.group.settings)||{};
const gpCanPin=()=>gpReady()&&(gpAdmin()||!!gpSet().pin_all);
const gpCanPost=()=>!gpReady()||!gpSet().admins_only||gpAdmin();
const gpFirst=n=>String(n||"").trim().split(/\s+/)[0]||"";
function gpPins(){const now=new Date().toISOString();return (G.group.pins||[]).filter(p=>!p.until||p.until>now);}
function gpPrev(m){if(!m)return "Message";const d=m.data||{};const t=m.kind==="text"||m.kind==="prayer"?m.body:m.kind==="event"?`${d.title||"Meeting"} · ${new Date(d.date+"T00:00").toLocaleDateString("en-ZA",{weekday:"short",day:"numeric",month:"short"})}${d.time?" "+d.time:""}`:waPreview(m,false);return String(t||"").replace(/\s+/g," ").slice(0,140);}
async function gpSetPins(arr){const {error}=await GC.rpc("gc_set_pins",{gid:G.id,p:arr});if(error){gcErr(error);return false;}G.group.pins=arr;gpDrawPinBar();waRedrawPanel();return true;}
async function gpPin(id,days){const m=G.msgs.find(x=>x.id===id);const until=days?new Date(Date.now()+days*864e5).toISOString():null;
  const arr=[{id,by:GC_USER.id,at:new Date().toISOString(),until,t:gpPrev(m),k:m?m.kind:"text"},...gpPins().filter(p=>p.id!==id)].slice(0,5);
  if(await gpSetPins(arr)){toast(days?`Pinned for ${days===1?"24 hours":days+" days"}`:"Pinned");try{navigator.vibrate&&navigator.vibrate(10);}catch(_){}}}
async function gpUnpin(id){if(await gpSetPins(gpPins().filter(p=>p.id!==id)))toast("Unpinned");}
function gpPinChooser(id,defDays){openSheet(`<h2 class="sheet-t">📌 Pin message</h2><p class="muted ui" style="margin-top:0;font-size:.85rem">Pinned messages stay at the top of the chat for everyone. Up to 5 at a time.</p>
  <div class="wa-menu">${[[1,"For 24 hours"],[7,"For 7 days"],[30,"For 30 days"],[0,"Until I unpin it"]].map(([d,l])=>`<button data-gppinfor="${d}"${d===defDays?' class="on"':""}>${l}${d===defDays?" · suggested":""}</button>`).join("")}</div>`,r=>{
  r.querySelectorAll("[data-gppinfor]").forEach(b=>b.onclick=()=>{closeSheet();gpPin(id,+b.dataset.gppinfor);});},"Pin");}
// ---------- pin bar ----------
let gpPinIdx=0;
function gpDrawPinBar(){const chat=$("#wa-chat");if(!chat||!gpReady())return;let bar=$("#wa-pinbar");const P=gpPins();
  if(!P.length){bar&&bar.remove();return;}
  if(!bar){chat.querySelector(".wa-head").insertAdjacentHTML("afterend",`<div class="wa-pinbar" id="wa-pinbar"></div>`);bar=$("#wa-pinbar");}
  gpPinIdx=gpPinIdx%P.length;const p=P[gpPinIdx];const m=G.msgs.find(x=>x.id===p.id);
  const icon={challenge:"🏆",event:"📅",prayer:"🙏",poll:"📊",verse:"📖",study:"🧭",lesson:"🎓"}[p.k]||"📌";
  bar.innerHTML=`${P.length>1?`<span class="wa-pin-ticks">${P.map((_,i)=>`<i class="${i===gpPinIdx?"on":""}"></i>`).join("")}</span>`:""}<button class="wa-pin-main" data-gppingo="${p.id}"><span class="wa-pin-ic">${icon}</span><span class="wa-pin-tx"><b>Pinned${P.length>1?` · ${gpPinIdx+1} of ${P.length}`:""}</b><span>${esc(m?gpPrev(m):p.t||"Message")}</span></span></button><button class="wa-ib wa-pin-list" data-gppinlist aria-label="All pinned messages">☰</button>`;}
async function gpEnsure(id){if(G.msgs.some(m=>m.id===id))return true;let n=0;
  while(G.hasMore&&n++<15&&!G.msgs.some(m=>m.id===id)){await gcLoadMessages(G.msgs[0].created_at);}
  const box=$("#gchat");if(box){box.innerHTML=`${G.hasMore?`<button class="wa-more" data-gmore>Load earlier messages</button>`:""}<div class="wa-enc">🔒 Messages are visible only to members of this group.</div>${gcMsgsHTML(G.msgs)}`;}
  return G.msgs.some(m=>m.id===id);}
async function gpGoto(id){if(!(await gpEnsure(id))){toast("That message is no longer in the chat");return;}
  const t=document.querySelector(`[data-mid="${id}"]`);if(t){t.scrollIntoView({behavior:"smooth",block:"center"});t.classList.add("wa-flash");setTimeout(()=>t.classList.remove("wa-flash"),1600);}}
function gpPinList(){const P=gpPins();openSheet(`<h2 class="sheet-t">📌 Pinned messages</h2>${P.length?`<div class="wa-ilist">${P.map(p=>{const m=G.msgs.find(x=>x.id===p.id);
  return `<div class="wa-irow gp-pinrow"><button class="gp-pinjump" data-gppingo="${p.id}" data-sheetx><b>${esc(m?gpPrev(m):p.t||"Message")}</b><span class="muted">Pinned by ${p.by===GC_USER.id?"you":esc(gcName(p.by))}${p.until?` · until ${new Date(p.until).toLocaleDateString("en-ZA",{day:"numeric",month:"short"})}`:""}</span></button>${gpCanPin()?`<button class="chip" data-gpunpin="${p.id}">Unpin</button>`:""}</div>`;}).join("")}</div>`:`<p class="muted">Nothing is pinned. Press and hold a message, then choose 📌 Pin.</p>`}`,null,"Pinned");}
// ---------- message menu: pin, edit, star ----------
const gpStars=()=>(S.gpStar=S.gpStar||{})[G.id]||[];
function gpToggleStar(id){S.gpStar=S.gpStar||{};const a=new Set(S.gpStar[G.id]||[]);a.has(id)?a.delete(id):a.add(id);S.gpStar[G.id]=[...a];save();gcRerender(id);toast(a.has(id)?"⭐ Starred: find it in group info":"Unstarred");}
waMsgMenu=(orig=>function(id){orig(id);const m=G.msgs.find(x=>x.id===id);const menu=document.querySelector("#sheet .wa-menu");if(!m||!menu)return;
  const mine=m.user_id===GC_USER.id;const pinned=gpReady()&&gpPins().some(p=>p.id===id);const ex=[];
  if(gpCanPin())ex.push(pinned?`<button data-gp-act="unpin">📌 Unpin</button>`:`<button data-gp-act="pin">📌 Pin</button>`);
  if(gpReady()&&mine&&(m.kind==="text"||m.kind==="prayer"||m.kind==="event")&&Date.now()-new Date(m.created_at)<7*864e5)ex.push(`<button data-gp-act="edit">✏️ Edit</button>`);
  ex.push(`<button data-gp-act="star">${gpStars().includes(id)?"☆ Unstar":"⭐ Star"}</button>`);
  menu.insertAdjacentHTML("afterbegin",ex.join(""));
  menu.querySelectorAll("[data-gp-act]").forEach(b=>b.onclick=()=>{const a=b.dataset.gpAct;closeSheet();
    if(a==="pin")gpPinChooser(id,m.kind==="challenge"?7:m.kind==="event"?0:7);else if(a==="unpin")gpUnpin(id);else if(a==="star")gpToggleStar(id);
    else if(a==="edit"){if(m.kind==="text")gpStartEdit(m);else if(m.kind==="prayer")gpPrayerSheet(m);else gpEventSheet(m);}});})(waMsgMenu);
function gpStartEdit(m){G.editing=m.id;const ta=$("#gc-in");const bar=$("#wa-replybar");if(!ta||!bar)return;
  bar.innerHTML=`<div class="wa-q" style="--qc:var(--wa-green)"><b>✏️ Editing message</b><span>${esc(m.body).slice(0,120)}</span></div><button class="wa-ib" data-gpnoedit aria-label="Cancel edit">${WA_I.close}</button>`;bar.hidden=false;
  ta.value=m.body;ta.dispatchEvent(new Event("input"));ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length);}
function gpStopEdit(){G.editing=null;const ta=$("#gc-in");if(ta){ta.value="";ta.dispatchEvent(new Event("input"));}const bar=$("#wa-replybar");if(bar){bar.hidden=true;bar.innerHTML="";}}
async function gpSaveEdit(t){const id=G.editing;const m=G.msgs.find(x=>x.id===id);gpStopEdit();if(!m||t===m.body)return;
  const data={...(m.data||{}),mentions:gpMentions(t)};const {data:row,error}=await GC.from("messages").update({body:t,data,edited_at:new Date().toISOString()}).eq("id",id).select().single();
  if(error)return gcErr(error);Object.assign(m,row);gcRerender(id);}
async function gpUpdateMsg(m,patch){const {data:row,error}=await GC.from("messages").update({...patch,edited_at:new Date().toISOString()}).eq("id",m.id).select().single();if(error){gcErr(error);return false;}Object.assign(m,row);gcRerender(m.id);return true;}
// ---------- @mentions ----------
function gpMentions(t){const out=[];G.members.forEach((x,u)=>{if(u===GC_USER.id)return;const f=gpFirst(x.display_name);if(f&&new RegExp("@"+f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(t))out.push(u);});return out;}
gcSend=(orig=>async function(kind,body,data){
  if(kind==="text"&&G&&G.editing){await gpSaveEdit(body);return null;}
  if(!gpCanPost()){toast("Only admins can send messages in this group");return null;}
  if(kind==="text"&&G){const mn=gpMentions(body||"");if(mn.length)data={...(data||{}),mentions:mn};}
  const m=await orig(kind,body,data);
  if(m&&gpCanPin()&&(kind==="challenge"||(kind==="event"&&data&&data.pin)||(kind==="prayer"&&data&&data.pin))){const days=kind==="challenge"?7:kind==="prayer"?7:Math.max(1,Math.ceil((new Date(data.date+"T23:59")-Date.now())/864e5)+1);await gpPin(m.id,days);}
  return m;})(gcSend);
gcText=(orig=>function(s){return orig(s).replace(/(^|[\s(])@([\p{L}][\p{L}'’-]*)/gu,(a,p,n)=>`${p}<span class="wa-at">@${n}</span>`);})(gcText);
function gpMentionPop(ta){const pos=ta.selectionStart;const before=ta.value.slice(0,pos);const mm=before.match(/(^|\s)@([\p{L}'’-]*)$/u);let pop=$("#wa-mpop");
  if(!mm){pop&&pop.remove();return;}const q=mm[2].toLowerCase();
  const L=[...G.members.values()].filter(x=>x.user_id!==GC_USER.id&&x.display_name.toLowerCase().includes(q)).slice(0,6);
  if(!L.length){pop&&pop.remove();return;}
  if(!pop){$("#gcomp").insertAdjacentHTML("beforebegin",`<div class="wa-mpop" id="wa-mpop" role="listbox"></div>`);pop=$("#wa-mpop");}
  pop.innerHTML=L.map(x=>`<button type="button" data-gpat="${esc(gpFirst(x.display_name))}"><span class="wa-av sm">${esc(x.avatar)}</span>${esc(x.display_name)}</button>`).join("");
  pop.querySelectorAll("[data-gpat]").forEach(b=>b.onmousedown=b.ontouchstart=e=>{e.preventDefault();const name=b.dataset.gpat;const start=pos-mm[2].length-1;
    ta.value=ta.value.slice(0,start)+"@"+name+" "+ta.value.slice(pos);const c=start+name.length+2;ta.focus();ta.setSelectionRange(c,c);pop.remove();ta.dispatchEvent(new Event("input"));});}
waWireChat=(orig=>function(){orig();const ta=$("#gc-in");if(!ta)return;ta.addEventListener("input",()=>gpMentionPop(ta));ta.addEventListener("blur",()=>setTimeout(()=>$("#wa-mpop")?.remove(),200));
  ta.addEventListener("keydown",e=>{if(e.key==="Escape"&&G&&G.editing)gpStopEdit();});})(waWireChat);
// ---------- message rendering: edited label, star, pinned marker, new card types ----------
gcMsgHTML=(orig=>function(m,prev){let h=orig(m,prev);if(m.kind==="system")return h;
  const tags=(m.edited_at?`<i class="wa-ed">edited</i> `:"")+(G&&gpStars().includes(m.id)?"⭐ ":"")+(G&&gpReady()&&gpPins().some(p=>p.id===m.id)?"📌 ":"");
  if(tags)h=h.replace('<span class="wa-meta">','<span class="wa-meta">'+tags);
  if((m.kind==="prayer"||m.kind==="event")&&!/class="wa-m [^"]*card/.test(h))h=h.replace(/class="wa-m (in|out)/,'class="wa-m $1 card');
  if(m.data&&(m.data.mentions||[]).includes(GC_USER.id)&&m.user_id!==GC_USER.id)h=h.replace(/class="wa-m (in|out)/,'class="wa-m $1 mentioned');
  return h;})(gcMsgHTML);
const GP_RSVP=[["y","Going","✅"],["m","Maybe","🤔"],["n","Can't","❌"]];
function gpEventWhen(d){const dt=new Date(d.date+"T"+(d.time||"00:00"));const today=new Date();today.setHours(0,0,0,0);const day=new Date(d.date+"T00:00");const diff=Math.round((day-today)/864e5);
  const rel=diff===0?"Today":diff===1?"Tomorrow":diff>1&&diff<7?"In "+diff+" days":diff<0?"Past":"";return {dt,rel,past:diff<0};}
gcBodyHTML=(orig=>function(m){const d=m.data||{};
  if(m.kind==="prayer"){const R=G.resp.get(m.id)||new Map();const pr=[...R.entries()].filter(([u,v])=>v&&v.p);const me=pr.some(([u])=>u===GC_USER.id);const mine=m.user_id===GC_USER.id;
    return `<div class="gcard gp-prayer${d.answered?" ans":""}"><div class="gc-k">🙏 Prayer request${d.answered?" · ✨ answered":""}</div><p class="gp-ptext">${gcText(m.body||d.text||"")}</p>
     ${d.answered&&d.note?`<p class="gp-pnote"><b>Update:</b> ${gcText(d.note)}</p>`:""}
     <div class="gp-prow">${pr.length?`<span class="gp-avs">${pr.slice(0,6).map(([u])=>gcAv(u,"xs")).join("")}</span><span class="muted">${pr.length} ${pr.length===1?"person has":"people have"} prayed</span>`:`<span class="muted">Be the first to pray</span>`}</div>
     <div class="gp-acts"><button class="btn${me?"":" primary"}" data-gppray="${m.id}">${me?"🙏 You prayed · pray again":"🙏 I prayed"}</button>${mine&&!d.answered?`<button class="chip" data-gpanswered="${m.id}">✨ Mark answered</button>`:""}</div></div>`;}
  if(m.kind==="event"){const R=G.resp.get(m.id)||new Map();const W=gpEventWhen(d);const my=(R.get(GC_USER.id)||{}).r;const cnt=k=>[...R.values()].filter(v=>v&&v.r===k).length;
    const going=[...R.entries()].filter(([u,v])=>v&&v.r==="y").map(([u])=>u);const isUrl=/^https?:\/\//.test(d.place||"");
    return `<div class="gcard gp-event${W.past?" past":""}"><div class="gp-ehead"><div class="gp-date"><span>${W.dt.toLocaleDateString("en-ZA",{month:"short"})}</span><b>${W.dt.getDate()}</b></div>
      <div><div class="gc-k">📅 ${W.rel?esc(W.rel)+" · ":""}${W.dt.toLocaleDateString("en-ZA",{weekday:"long"})}${d.time?" · "+esc(d.time):""}</div><h4>${esc(d.title||m.body||"Meeting")}</h4>
      ${d.place?`<div class="muted gp-place">${isUrl?`🔗 <a href="${esc(d.place)}" target="_blank" rel="noopener">Join online</a>`:`📍 <a href="https://maps.google.com/?q=${encodeURIComponent(d.place)}" target="_blank" rel="noopener">${esc(d.place)}</a>`}</div>`:""}</div></div>
      ${d.note?`<p class="gp-enote">${gcText(d.note)}</p>`:""}
      ${W.past?`<p class="muted ui" style="font-size:.8rem">This has happened. ${cnt("y")} went.</p>`:`<div class="gp-rsvp">${GP_RSVP.map(([k,l,e])=>`<button class="${my===k?"on":""}" data-gprsvp="${m.id}" data-r="${k}">${e} ${l}<b>${cnt(k)||""}</b></button>`).join("")}</div>`}
      ${going.length?`<div class="gp-prow"><span class="gp-avs">${going.slice(0,8).map(u=>gcAv(u,"xs")).join("")}</span><span class="muted">${going.length} going</span></div>`:""}
      ${W.past?"":`<button class="chip" data-gpics="${m.id}">🗓 Add to my calendar</button>`}</div>`;}
  return orig(m);})(gcBodyHTML);
waPreview=(orig=>function(m,mine){if(m&&m.kind==="prayer")return (mine?"You: ":"")+"🙏 Prayer request: "+String(m.body||"").slice(0,60);if(m&&m.kind==="event")return (mine?"You: ":"")+"📅 "+((m.data||{}).title||"Meeting");return orig(m,mine);})(waPreview);
async function gpRespond(id,value){const {error}=await GC.from("responses").upsert({message_id:id,user_id:GC_USER.id,group_id:G.id,value});if(error)return gcErr(error);if(!G.resp.has(id))G.resp.set(id,new Map());G.resp.get(id).set(GC_USER.id,value);gcRerender(id);}
function gpICS(m){const d=m.data||{};const p=x=>String(x).padStart(2,"0");const s=new Date(d.date+"T"+(d.time||"09:00"));const e=new Date(s.getTime()+90*60000);
  const f=x=>`${x.getFullYear()}${p(x.getMonth()+1)}${p(x.getDate())}T${p(x.getHours())}${p(x.getMinutes())}00`;const clean=t=>String(t||"").replace(/[\\,;]/g,m=>"\\"+m).replace(/\n/g,"\\n");
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Golden Chain//Groups//EN","BEGIN:VEVENT",`UID:gc-${m.id}@golden-chain`,`DTSTAMP:${f(new Date())}`,d.time?`DTSTART:${f(s)}`:`DTSTART;VALUE=DATE:${d.date.replace(/-/g,"")}`,d.time?`DTEND:${f(e)}`:"",`SUMMARY:${clean(d.title)}`,d.place?`LOCATION:${clean(d.place)}`:"",`DESCRIPTION:${clean((d.note||"")+"\\n"+G.group.name)}`,"END:VEVENT","END:VCALENDAR"].filter(Boolean).join("\r\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));a.download=(d.title||"meeting").replace(/[^\w ]+/g,"").slice(0,40)+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000);}
document.addEventListener("click",async e=>{if(!G)return;let b;
  if(b=e.target.closest("[data-gppingo]")){const id=+b.dataset.gppingo;const P=gpPins();if(b.closest("#wa-pinbar")&&P.length>1){gpPinIdx=(gpPinIdx+1)%P.length;gpDrawPinBar();}gpGoto(id);return;}
  if(e.target.closest("[data-gppinlist]")){gpPinList();return;}
  if(b=e.target.closest("[data-gpunpin]")){closeSheet();gpUnpin(+b.dataset.gpunpin);return;}
  if(e.target.closest("[data-gpnoedit]")){gpStopEdit();return;}
  if(b=e.target.closest("[data-gppray]")){gpRespond(+b.dataset.gppray,{p:1,at:new Date().toISOString()});try{navigator.vibrate&&navigator.vibrate(10);}catch(_){}toast("🙏 Thank you for praying");return;}
  if(b=e.target.closest("[data-gpanswered]")){const m=G.msgs.find(x=>x.id===+b.dataset.gpanswered);if(!m)return;
    openSheet(`<h2 class="sheet-t">✨ Prayer answered</h2><p class="muted ui" style="margin-top:0">Share what happened (optional), so the group can give thanks with you.</p><textarea id="gp-note" rows="3" maxlength="600" placeholder="e.g. My exam went well, thank you all!"></textarea><div class="sheet-acts"><button class="btn primary" data-gpansok>Mark as answered</button></div>`,r=>{
      r.querySelector("[data-gpansok]").onclick=async()=>{const note=r.querySelector("#gp-note").value.trim();closeSheet();if(await gpUpdateMsg(m,{data:{...m.data,answered:true,note}}))toast("✨ Thanks be to God!");};},"Answered");return;}
  if(b=e.target.closest("[data-gprsvp]")){const id=+b.dataset.gprsvp,r=b.dataset.r;const cur=((G.resp.get(id)||new Map()).get(GC_USER.id)||{}).r;
    if(cur===r){await GC.from("responses").delete().eq("message_id",id).eq("user_id",GC_USER.id);G.resp.get(id).delete(GC_USER.id);gcRerender(id);}else gpRespond(id,{r});return;}
  if(b=e.target.closest("[data-gpics]")){const m=G.msgs.find(x=>x.id===+b.dataset.gpics);m&&gpICS(m);return;}
  if(e.target.closest("[data-gpsearch]")){gpSearch();return;}
});
// ---------- composer sheets: prayer request and meeting ----------
function gpPrayerSheet(edit){const d=(edit&&edit.data)||{};
  openSheet(`<h2 class="sheet-t">🙏 ${edit?"Edit prayer request":"Prayer request"}</h2><p class="muted ui" style="margin-top:0;font-size:.85rem">Members can tap "I prayed", so you'll know who is praying with you.</p>
   <textarea id="gp-ptext" rows="4" maxlength="1000" placeholder="e.g. Please pray for my gran, who is in hospital">${esc(edit?edit.body:"")}</textarea>
   ${!edit&&gpCanPin()?`<label class="ui gp-chk"><input type="checkbox" id="gp-ppin"> Pin it at the top for a week</label>`:""}
   <div class="sheet-acts"><button class="btn primary" data-gpok>${edit?"Save":"Send"}</button></div>`,r=>{
   const ta=r.querySelector("#gp-ptext");setTimeout(()=>ta.focus(),100);
   r.querySelector("[data-gpok]").onclick=async()=>{const t=ta.value.trim();if(!t)return ta.focus();closeSheet();
     if(edit)gpUpdateMsg(edit,{body:t,data:{...d,text:t}});else gcSend("prayer",t,{text:t,pin:!!(r.querySelector("#gp-ppin")||{}).checked});};},"Prayer");}
function gpNextDow(dow){const d=new Date();d.setDate(d.getDate()+((dow-d.getDay()+7)%7||7));return isoDay(d);}
function gpEventSheet(edit){const d=(edit&&edit.data)||{};const today=isoDay(new Date());const tom=dayAdd(today,1);
  const quick=[["Tonight",today,"19:00"],["Tomorrow evening",tom,"19:00"],["Sunday after Mass",gpNextDow(0),"10:30"],["Saturday morning",gpNextDow(6),"09:00"]];
  openSheet(`<h2 class="sheet-t">📅 ${edit?"Edit meeting":"Plan a meeting"}</h2>
   <label>What</label><input id="gp-et" maxlength="80" placeholder="e.g. Bible study, Rosary, braai after Mass" value="${esc(d.title||"")}">
   <label>When</label><div class="chips-row gp-q">${quick.map(([l,dt,t])=>`<button type="button" class="chip" data-gpq="${dt}|${t}">${l}</button>`).join("")}</div>
   <div class="gp-dt"><input type="date" id="gp-ed" value="${esc(d.date||gpNextDow(0))}" min="${today}"><input type="time" id="gp-etm" value="${esc(d.time||"19:00")}"></div>
   <label>Where</label><input id="gp-ep" maxlength="160" placeholder="An address, the parish hall, or a meeting link" value="${esc(d.place||"")}">
   <label>Note <span class="muted">(optional)</span></label><textarea id="gp-en" rows="2" maxlength="500" placeholder="e.g. Bring a Bible and a friend">${esc(d.note||"")}</textarea>
   ${!edit&&gpCanPin()?`<label class="ui gp-chk"><input type="checkbox" id="gp-epin" checked> Pin it at the top until the day</label>`:""}
   <div class="sheet-acts"><button class="btn primary" data-gpok>${edit?"Save":"Send"}</button></div>`,r=>{
   r.querySelectorAll("[data-gpq]").forEach(b=>b.onclick=()=>{const [dt,t]=b.dataset.gpq.split("|");r.querySelector("#gp-ed").value=dt;r.querySelector("#gp-etm").value=t;r.querySelectorAll("[data-gpq]").forEach(x=>x.classList.toggle("on",x===b));});
   r.querySelector("[data-gpok]").onclick=async()=>{const title=r.querySelector("#gp-et").value.trim();const date=r.querySelector("#gp-ed").value;if(!title){r.querySelector("#gp-et").focus();return;}if(!date)return;
     const nd={...d,title,date,time:r.querySelector("#gp-etm").value,place:r.querySelector("#gp-ep").value.trim(),note:r.querySelector("#gp-en").value.trim()};closeSheet();
     if(edit)gpUpdateMsg(edit,{body:title,data:nd});else gcSend("event",title,{...nd,pin:!!(r.querySelector("#gp-epin")||{}).checked});};},"Meeting");}
waAttItems=(orig=>function(){const a=orig();if(gpReady())a.splice(1,0,["prayer","🙏","Prayer request","#c2185b","Ask the group to pray"],["event","📅","Meeting","#1565c0","Date, place and RSVP"]);return a;})(waAttItems);
gcAttachSheet=(orig=>function(){orig();const p=document.querySelector('#sheet [data-at="prayer"]');if(p)p.onclick=()=>{closeSheet();gpPrayerSheet();};const ev=document.querySelector('#sheet [data-at="event"]');if(ev)ev.onclick=()=>{closeSheet();gpEventSheet();};})(gcAttachSheet);
// ---------- search inside the chat ----------
function gpSearch(){openSheet(`<h2 class="sheet-t">🔍 Search this chat</h2><input type="search" id="gp-sq" placeholder="Search messages" autocomplete="off"><div id="gp-sr" class="wa-ilist" style="margin-top:10px"></div>`,r=>{
  const inp=r.querySelector("#gp-sq"),out=r.querySelector("#gp-sr");let t;setTimeout(()=>inp.focus(),100);
  inp.oninput=()=>{clearTimeout(t);t=setTimeout(async()=>{const q=inp.value.trim();if(q.length<2){out.innerHTML="";return;}
    const {data,error}=await GC.from("messages").select("id,user_id,body,kind,created_at").eq("group_id",G.id).neq("kind","system").ilike("body",`%${q.replace(/[%_]/g,"")}%`).order("created_at",{ascending:false}).limit(40);
    if(error){out.innerHTML=`<p class="muted">Search isn't available right now.</p>`;return;}
    const hi=s=>{const i=s.toLowerCase().indexOf(q.toLowerCase());if(i<0)return esc(s.slice(0,120));const a=Math.max(0,i-40);return (a?"…":"")+esc(s.slice(a,i))+"<mark>"+esc(s.slice(i,i+q.length))+"</mark>"+esc(s.slice(i+q.length,i+q.length+80));};
    out.innerHTML=(data||[]).length?data.map(m=>`<button class="wa-irow gp-sres" data-gppingo="${m.id}" data-sheetx><span class="wa-av sm">${esc((G.members.get(m.user_id)||{}).avatar||"🙂")}</span><span class="wa-im"><strong>${m.user_id===GC_USER.id?"You":esc(gcName(m.user_id))} <span class="muted" style="font-weight:400">· ${esc(waListTime(m.created_at))}</span></strong><span>${hi(m.body)}</span></span></button>`).join(""):`<p class="muted">No messages found.</p>`;},250);};},"Search");}
// ---------- render hooks: pin bar, unread marker, announcement mode, header buttons ----------
renderGroup=(orig=>async function(gid){await orig(gid);if(!G||G.id!==gid)return;
  gpDrawPinBar();
  if(gpReady()&&!S.gpTip){S.gpTip=1;save();setTimeout(()=>toast("New: press and hold a message to 📌 pin, ✏️ edit or ⭐ star it. Tap 📎 for prayer requests and meetings."),1200);}
  const comp=$("#gcomp");if(comp&&!gpCanPost())comp.outerHTML=`<div class="wa-locked">📢 Only group admins can send messages here. You can still react, vote and pray.</div>`;
  const mh=document.querySelector(".wa-head [data-wamenu-h]");if(mh&&!document.querySelector(".wa-head [data-gpsearch]"))mh.insertAdjacentHTML("beforebegin",`<button class="wa-ib" data-gpsearch aria-label="Search messages">${WA_I.search}</button>`);
})(renderGroup);
waMarkRead=(orig=>async function(){if(G&&!G._gpMarked){G._gpMarked=1;const lr=(gpMe().last_read)||null;
    const first=lr&&G.msgs.find(m=>m.created_at>lr&&m.user_id!==GC_USER.id&&m.kind!=="system");
    if(first){const n=G.msgs.filter(m=>m.created_at>lr&&m.user_id!==GC_USER.id&&m.kind!=="system").length;const el=document.querySelector(`[data-mid="${first.id}"]`);
      if(el&&n>=3){el.insertAdjacentHTML("beforebegin",`<div class="wa-unread" id="wa-unread"><span>${n} unread message${n>1?"s":""}</span></div>`);requestAnimationFrame(()=>$("#wa-unread")?.scrollIntoView({block:"start"}));}}}
  return orig.apply(this,arguments);})(waMarkRead);
// mentions of me arriving while I'm elsewhere in the chat
gcAppendMsg=(orig=>function(m){orig(m);if(m.user_id!==GC_USER.id&&m.data&&(m.data.mentions||[]).includes(GC_USER.id))toast(`${gcFirstName(m.user_id)} mentioned you`);})(gcAppendMsg);
function gcFirstName(u){return gpFirst(gcName(u));}
// ---------- live updates for pins, settings, edits and roles ----------
let GC_CH2=null;
gcSubscribe=(orig=>function(){orig();if(!gpReady())return;const gid=G.id;if(GC_CH2){GC.removeChannel(GC_CH2);GC_CH2=null;}
  GC_CH2=GC.channel("gp-"+gid+"-"+Date.now().toString(36))
   .on("postgres_changes",{event:"UPDATE",schema:"public",table:"groups",filter:`id=eq.${gid}`},p=>{if(!G||G.id!==gid)return;const was=!!gpSet().admins_only;Object.assign(G.group,p.new);gpDrawPinBar();waRedrawPanel();G.msgs.forEach(m=>{});if(!!gpSet().admins_only!==was)renderGroup(gid);})
   .on("postgres_changes",{event:"UPDATE",schema:"public",table:"messages",filter:`group_id=eq.${gid}`},p=>{if(!G||G.id!==gid)return;const m=G.msgs.find(x=>x.id===p.new.id);if(m){Object.assign(m,p.new);gcRerender(m.id);}})
   .on("postgres_changes",{event:"UPDATE",schema:"public",table:"group_members",filter:`group_id=eq.${gid}`},p=>{if(!G||G.id!==gid)return;const x=G.members.get(p.new.user_id);if(!x)return;const was=x.role;Object.assign(x,{role:p.new.role,last_read:p.new.last_read});if(was!==p.new.role){waRedrawPanel();if(p.new.user_id===GC_USER.id){toast(p.new.role==="admin"?"You're now a group admin":"You're no longer a group admin");renderGroup(gid);}}})
   .subscribe();})(gcSubscribe);
gcLeave=(orig=>function(){orig();if(GC_CH2&&GC){GC.removeChannel(GC_CH2);GC_CH2=null;}})(gcLeave);
// ---------- group info: pinned, starred, photos, admin settings ----------
function gpInfoExtras(){const P=gpReady()?gpPins():[];const St=gpStars().map(id=>G.msgs.find(m=>m.id===id)).filter(Boolean);
  const photos=G.msgs.filter(m=>m.kind==="sticker"&&m.data&&m.data.photo).slice(-12).reverse();const s=gpSet();
  let h="";
  if(P.length)h+=`<div class="wa-isec"><div class="label">📌 Pinned</div>${P.map(p=>{const m=G.msgs.find(x=>x.id===p.id);return `<div class="wa-irow gp-pinrow"><button class="gp-pinjump" data-gppingo="${p.id}" data-wapanelx><b>${esc(m?gpPrev(m):p.t)}</b></button>${gpCanPin()?`<button class="chip" data-gpunpin="${p.id}">Unpin</button>`:""}</div>`;}).join("")}</div>`;
  if(St.length)h+=`<div class="wa-isec"><div class="label">⭐ Starred (on this device)</div>${St.map(m=>`<button class="wa-irow gp-pinjump" data-gppingo="${m.id}" data-wapanelx><b>${esc(gpPrev(m))}</b><span class="muted">${m.user_id===GC_USER.id?"You":esc(gcName(m.user_id))} · ${esc(waListTime(m.created_at))}</span></button>`).join("")}</div>`;
  if(photos.length)h+=`<div class="wa-isec"><div class="label">🖼 Photos</div><div class="gp-photos">${photos.map(m=>`<img src="${esc(gcStickerUrl(m.data.path))}" alt="" loading="lazy" data-waview="${esc(gcStickerUrl(m.data.path))}">`).join("")}</div></div>`;
  if(gpReady()&&gpAdmin())h+=`<div class="wa-isec"><div class="label">⚙️ Group settings (admins)</div>
    <label class="gp-tog"><input type="checkbox" data-gpset="pin_all" ${s.pin_all?"checked":""}><span><b>Everyone can pin messages</b><span class="muted">Otherwise only admins can</span></span></label>
    <label class="gp-tog"><input type="checkbox" data-gpset="admins_only" ${s.admins_only?"checked":""}><span><b>Only admins can send messages</b><span class="muted">For announcement groups. Everyone can still react, vote, RSVP and pray.</span></span></label>
    <div class="label" style="margin-top:12px">Admins</div>${[...G.members.values()].filter(m=>m.user_id!==GC_USER.id&&m.role!=="owner").map(m=>`<div class="wa-irow"><span class="wa-av sm">${esc(m.avatar)}</span><span style="flex:1">${esc(m.display_name)}${m.role==="admin"?' <span class="wa-admin">admin</span>':""}</span><button class="chip" data-gprole="${m.user_id}" data-r="${m.role==="admin"?"member":"admin"}">${m.role==="admin"?"Remove admin":"Make admin"}</button></div>`).join("")||`<p class="muted" style="margin:0">Invite people first, then you can make them admins.</p>`}
    <button class="wa-irow link" data-gpnewcode>🔄 Reset invite code <span class="muted">(old links stop working)</span></button></div>`;
  return h;}
waPanel=(orig=>function(kind){orig(kind);if(kind==="challenge")return;const p=document.querySelector('.wa-panel[data-kind="info"]');if(!p||!p._draw)return;const d0=p._draw;
  const add=()=>{if(p.querySelector(".gp-extras"))return;const hero=p.querySelector(".wa-ihero");if(hero)hero.insertAdjacentHTML("afterend",`<div class="gp-extras">${gpInfoExtras()}</div>`);
    const acts=p.querySelector(".wa-iacts");if(acts&&!acts.querySelector("[data-gpsearch]"))acts.insertAdjacentHTML("beforeend",`<button data-gpsearch><span>🔍</span>Search</button>`);};
  p._draw=function(){d0();add();};add();
  // the panel also redraws itself once members' streaks load; put the extras back each time
  new MutationObserver(()=>add()).observe(p,{childList:true,subtree:false});})(waPanel);
document.addEventListener("change",async e=>{const c=e.target.closest("[data-gpset]");if(!c||!G)return;const k=c.dataset.gpset;const settings={...gpSet(),[k]:c.checked};
  const {error}=await GC.from("groups").update({settings}).eq("id",G.id);if(error){c.checked=!c.checked;return gcErr(error);}G.group.settings=settings;
  toast(k==="admins_only"?(c.checked?"📢 Only admins can send messages now":"Everyone can send messages again"):(c.checked?"Everyone can pin messages now":"Only admins can pin now"));});
document.addEventListener("click",async e=>{if(!G)return;let b;
  if(b=e.target.closest("[data-gprole]")){const {error}=await GC.rpc("gc_set_role",{gid:G.id,uid:b.dataset.gprole,r:b.dataset.r});if(error)return gcErr(error);const x=G.members.get(b.dataset.gprole);if(x)x.role=b.dataset.r;waRedrawPanel();toast(b.dataset.r==="admin"?`${esc(gpFirst(x&&x.display_name))} is now an admin`:"Admin removed");return;}
  if(b=e.target.closest("[data-gpnewcode]")){if(!confirmInline(b,"Tap again to reset the code"))return;const code=Math.random().toString(36).slice(2,8).toUpperCase();const {error}=await GC.from("groups").update({invite_code:code}).eq("id",G.id);if(error)return gcErr(error);G.group.invite_code=code;waRedrawPanel();toast("New invite code: "+code);return;}
});
