// ---------- Groups: messenger-style interface (chat list, full-screen chat, bubbles, ticks, replies, typing, info) ----------
// Overrides the plainer views in 52_groups.js; the data layer there is unchanged.
const WA_I={
 back:'<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8z"/></svg>',
 dots:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>',
 search:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 9.5 16a6.5 6.5 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>',
 clip:'<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6z"/></svg>',
 cam:'<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM9 2 7.2 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.2L15 2zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/></svg>',
 smile:'<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3.5-9A1.5 1.5 0 1 0 8.5 8a1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 17.5a5.5 5.5 0 0 0 5.1-3.5H6.9a5.5 5.5 0 0 0 5.1 3.5z"/></svg>',
 send:'<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2 21 23 12 2 3v7l15 2-15 2z"/></svg>',
 down:'<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>',
 close:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>',
 plus:'<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>',
 tick1:'<svg viewBox="0 0 16 11" width="16" height="11"><path fill="currentColor" d="M11.1.6 4.8 7 2 4.2.9 5.3 4.8 9.2 12.2 1.7z"/></svg>',
 tick2:'<svg viewBox="0 0 16 11" width="16" height="11"><path fill="currentColor" d="M11.1.6 4.8 7 2 4.2.9 5.3l3.9 3.9L12.2 1.7zm3.2 0L8 7l-.6-.6-1.1 1.1 1.7 1.7 7.4-7.5z"/></svg>'
};
const WA_NAMECOL=["#e542a3","#1f7aec","#d97a00","#7f66ff","#029d00","#c4532d","#0f8a8a","#a62c71","#5e7d00","#b3006b"];
const WA_EMOJI="😀 😂 🥹 😊 😇 🙂 😉 😍 🥰 😘 😋 😎 🤓 🤔 🤗 🙃 😅 😬 😮 😢 😭 😤 😴 🥳 🙏 🙌 👏 👍 👎 👌 ✌️ 🤝 💪 🫶 ❤️ 🧡 💛 💚 💙 💜 🤍 💔 🔥 ⭐ ✨ 🎉 🎶 📖 ✝️ ⛪ 🕊️ 🕯️ 🍞 🍷 🌹 🌿 ☀️ 🌙 ☕ 📚 ✍️ ⏰ ✅ ❌ ❓ ❗ 💯".split(" ");
const waIsWide=()=>matchMedia("(min-width:900px)").matches;
function waCol(uid){return WA_NAMECOL[gcHash(uid)%WA_NAMECOL.length];}
function waEmojiOnly(s){const t=String(s).trim();if(!t||t.length>24)return 0;try{const seg=[...new Intl.Segmenter("en",{granularity:"grapheme"}).segment(t)].map(x=>x.segment).filter(x=>x.trim());if(seg.length>3)return 0;return seg.every(x=>/\p{Extended_Pictographic}/u.test(x))?seg.length:0;}catch(e){return 0;}}
function waPreview(m,mine){if(!m)return "No messages yet";const who=m.kind==="system"?"":mine?"You: ":"";const map={verse:"📖 Verse",lesson:"🎓 Course",sticker:m.data&&m.data.photo?"📷 Photo":"Sticker",poll:"📊 Poll: "+(m.data&&m.data.q||""),qa:"❓ "+(m.data&&m.data.q||"Question"),study:"🧭 7-day study",stats:"📈 Stats",challenge:"🏆 Weekly challenge"};return who+(m.kind==="text"||m.kind==="system"?m.body:map[m.kind]||"Message");}
function waListTime(t){const d=new Date(t),n=new Date();if(ymd(d)===ymd(n))return gcTime(t);const y=new Date(n);y.setDate(n.getDate()-1);if(ymd(d)===ymd(y))return "Yesterday";if(n-d<6*864e5)return d.toLocaleDateString("en-ZA",{weekday:"long"});return d.toLocaleDateString("en-ZA",{day:"2-digit",month:"2-digit",year:"2-digit"});}

// ---------- chat list ----------
async function gcFetchList(){
  const {data:mem}=await GC.from("group_members").select("group_id,role,last_read").eq("user_id",GC_USER.id);
  const ids=(mem||[]).map(m=>m.group_id);
  const {data:groups}=ids.length?await GC.from("groups").select("*").in("id",ids):{data:[]};
  const memBy=Object.fromEntries((mem||[]).map(m=>[m.group_id,m]));const last={},unread={},names={};
  await Promise.all(ids.map(async id=>{
    const [{data},{count}]=await Promise.all([GC.from("messages").select("body,kind,data,created_at,user_id").eq("group_id",id).order("created_at",{ascending:false}).limit(1),
      GC.from("messages").select("id",{count:"exact",head:true}).eq("group_id",id).gt("created_at",memBy[id].last_read).neq("user_id",GC_USER.id)]);
    last[id]=data&&data[0];unread[id]=count||0;}));
  const senders=[...new Set(Object.values(last).filter(Boolean).map(m=>m.user_id).filter(u=>u!==GC_USER.id))];
  if(senders.length){const {data:p}=await GC.from("profiles").select("id,display_name").in("id",senders);(p||[]).forEach(x=>names[x.id]=x.display_name);}
  const list=(groups||[]).sort((a,b)=>((last[b.id]||{}).created_at||b.created_at).localeCompare((last[a.id]||{}).created_at||a.created_at));
  const total=Object.values(unread).reduce((a,b)=>a+b,0);
  document.querySelectorAll('[data-tab="groups"], nav.main a[href="#groups"]').forEach(a=>a.classList.toggle("has-dot",total>0));
  return {list,last,unread,names};
}
function waListHTML(L,activeId){
  const i=streakInfo();
  return `<div class="wa-list">
   <div class="wa-lhead"><h1>Groups</h1><button class="wa-ib" data-wasearch aria-label="Search">${WA_I.search}</button><button class="wa-ib" data-walmenu aria-label="Menu">${WA_I.dots}</button></div>
   <div class="wa-lsearch"><input type="search" placeholder="Search groups" aria-label="Search groups" data-wafilter></div>
   <button class="wa-streak${i.todayDone?" lit":""}" data-streak><span class="ws-f">${i.todayDone?"🔥":"🕯️"}</span><span class="ws-t"><b>${i.streak}-day reading streak</b><span>${i.todayDone?"Today's reading is in":"Read today to keep it going"}</span></span><span class="ws-c">›</span></button>
   ${(()=>{const n=L.list.filter(g=>waArchived(g.id)).length;return n?`<button class="wa-archrow" data-waarchview><span class="wa-av sm">🗄️</span><span class="wa-rm"><strong>Archived</strong></span><span class="wa-rt">${n}</span></button>`:"";})()}
   <div class="wa-rows">${L.list.length?L.list.map(g=>{const l=L.last[g.id];const mine=l&&l.user_id===GC_USER.id;const u=L.unread[g.id];
     const who=l&&!mine&&l.kind!=="system"&&L.names[l.user_id]?esc(L.names[l.user_id].split(" ")[0])+": ":"";
     return `<a class="wa-row${g.id===activeId?" on":""}${waArchived(g.id)?" arch":""}" href="#group-${g.id}" data-name="${esc(g.name.toLowerCase())}" data-owner="${g.owner===GC_USER.id?1:0}"><span class="wa-av">${esc(g.emoji)}</span><span class="wa-rm"><span class="wa-r1"><strong>${esc(g.name)}</strong><span class="wa-rt${u?" un":""}">${l?esc(waListTime(l.created_at)):""}</span></span><span class="wa-r2"><span class="wa-pv">${mine?`<span class="wa-tk">${WA_I.tick2}</span>`:""}${who}${esc(waPreview(l,mine)).slice(0,90)}</span>${u?`<span class="wa-badge">${u>99?"99+":u}</span>`:""}<button class="wa-rchev" data-wrmenu="${g.id}" aria-label="Chat options">${WA_I.down}</button></span></span></a>`;}).join("")
     :`<div class="wa-empty"><div style="font-size:2.6rem">🕊️</div><h3>Start your first group</h3><p>Create a group for friends, family or a study circle and share the invite link. Each week brings a new challenge, and you can chat, share verses and courses, and run polls, quizzes and mini-studies together.</p><div class="row" style="justify-content:center;gap:8px"><button class="btn primary" data-gnew>New group</button><button class="btn" data-gjoin>Join with a code</button></div></div>`}</div>
   <button class="wa-fab" data-gnew aria-label="New group">${WA_I.plus}</button></div>`;
}
document.addEventListener("input",e=>{const f=e.target.closest("[data-wafilter]");if(!f)return;const q=f.value.trim().toLowerCase();document.querySelectorAll(".wa-row").forEach(r=>r.hidden=!!q&&!r.dataset.name.includes(q));});
document.addEventListener("click",async e=>{
  if(e.target.closest("[data-wasearch]")){const s=document.querySelector(".wa-lsearch");s.classList.toggle("open");s.querySelector("input").focus();return;}
  if(e.target.closest("[data-walmenu]")){openSheet(`<div class="wa-menu"><button data-gnew data-sheetx>New group</button><button data-gjoin>Join with a code</button><button data-gprofile>Profile</button><button data-streak>Reading streak</button><button data-gout data-sheetx>Sign out</button></div>`,null,"Menu");return;}
});

async function renderGroups(joinCode){
  const v=$("#v-groups");gcLeave();
  const cfg=gcConfig();
  if(!cfg){v.innerHTML=`<div class="label">Groups</div><h1>Groups</h1>${streakCardHTML().replace('id="home-streak"','')}<div class="co extra"><div class="co-h">Almost ready</div><p>Groups need the site's online database, which is being switched on.</p></div>`;return;}
  v.innerHTML=`<div class="wa-app"><div class="wa-loading">Loading…</div></div>`;
  try{await gc();}catch(err){v.innerHTML=`<h1>Groups</h1><p>Could not connect (${esc(err.message)}). Check your internet connection and try again.</p>`;return;}
  if(joinCode){if(GC_USER){await gcJoin(joinCode);return;}sessionStorage.setItem("gc-join",joinCode);}
  if(!GC_USER){renderGcAuth(v,streakCardHTML().replace('id="home-streak"',''),joinCode);v.classList.add("wa-auth");return;}
  v.classList.remove("wa-auth");
  await gcProfile();gcSyncAllReading().catch(()=>{});
  const L=await gcFetchList();
  v.innerHTML=`<div class="wa-app">${waListHTML(L)}<div class="wa-side"><div class="wa-intro"><div class="wi-art">✝️🕊️📖</div><h2>Golden Chain Groups</h2><p>Read, pray and learn together. Pick a group on the left, or start a new one.</p></div></div></div>`;
}

// ---------- chat screen ----------
async function renderGroup(gid){
  const v=$("#v-group");gcLeave();
  if(!gcConfig()){location.hash="#groups";return;}
  if(!v.querySelector(".wa-app"))v.innerHTML=`<div class="wa-app"><div class="wa-loading">Loading…</div></div>`;
  await gc();if(!GC_USER){location.hash="#groups";return;}
  const {data:group,error}=await GC.from("groups").select("*").eq("id",gid).maybeSingle();
  if(error||!group){v.innerHTML=`<p>That group could not be opened. <a href="#groups">Back to Groups</a></p>`;return;}
  const {data:mem}=await GC.from("group_members").select("user_id,role,joined_at,last_read").eq("group_id",gid);
  const uids=(mem||[]).map(m=>m.user_id);
  const {data:profs}=await GC.from("profiles").select("id,display_name,avatar,stats").in("id",uids);
  const members=new Map();(mem||[]).forEach(m=>{const p=(profs||[]).find(x=>x.id===m.user_id)||{};members.set(m.user_id,{...m,display_name:p.display_name||"Friend",avatar:p.avatar||"🙂",stats:p.stats||{}});});
  G={id:gid,group,members,msgs:[],resp:new Map(),reacts:new Map(),checkins:[],logs:new Map(),week:gcWeek(),tab:"chat",challenge:null,hasMore:false,replyTo:null,typing:new Map()};
  await Promise.all([gcLoadMessages(),gcLoadWeek(),gcLoadLogs()]);
  const listHTML=waIsWide()?waListHTML(await gcFetchList(),gid):"";
  v.innerHTML=`<div class="wa-app">${listHTML}<div class="wa-chat" id="wa-chat">
   <header class="wa-head"><a href="#groups" class="wa-ib wa-back" aria-label="Back">${WA_I.back}</a><button class="wa-hinfo" data-wainfo><span class="wa-av sm">${esc(group.emoji)}</span><span class="wa-hm"><strong>${esc(group.name)}</strong><span class="wa-sub" id="wa-sub">${waSubtitle()}</span></span></button>
    <button class="wa-ib" data-wachal aria-label="Weekly challenge" title="Weekly challenge">🏆</button><button class="wa-ib" data-wamenu-h aria-label="Menu">${WA_I.dots}</button></header>
   <div class="wa-msgs" id="gchat">${G.hasMore?`<button class="wa-more" data-gmore>Load earlier messages</button>`:""}<div class="wa-enc">🔒 Messages are visible only to members of this group.</div>${gcMsgsHTML(G.msgs)}${waStarterHTML()}</div>
   <button class="wa-jump" id="wa-jump" hidden aria-label="Scroll to latest">${WA_I.down}</button>
   <div class="wa-replybar" id="wa-replybar" hidden></div>
   <form class="wa-comp" id="gcomp"><div class="wa-pill"><button type="button" class="wa-ib" data-waemoji aria-label="Emoji and stickers">${WA_I.smile}</button><textarea id="gc-in" rows="1" maxlength="4000" placeholder="Message" aria-label="Message"></textarea><button type="button" class="wa-ib" data-gattach aria-label="Share">${WA_I.clip}</button><label class="wa-ib" aria-label="Send a photo">${WA_I.cam}<input type="file" accept="image/*" hidden data-waphoto></label></div><button class="wa-send" aria-label="Send">${WA_I.send}</button></form>
  </div></div>`;
  waWireChat();
  waScrollEnd(true);waMarkRead();
  gcSubscribe();
  clearInterval(G._poll);G._poll=setInterval(waRefreshReads,15000);
}
function waSubtitle(){
  if(!G)return "";const t=[...G.typing.entries()].filter(([u,ts])=>Date.now()-ts<4000&&u!==GC_USER.id).map(([u])=>gcName(u).split(" ")[0]);
  if(t.length)return `<span class="wa-typing">${esc(t.join(", "))} ${t.length>1?"are":"is"} typing…</span>`;
  const names=[...G.members.values()].sort((a,b)=>(a.user_id===GC_USER.id)-(b.user_id===GC_USER.id)).map(m=>m.user_id===GC_USER.id?"You":m.display_name.split(" ")[0]);
  return esc(names.join(", "));
}
function waUpdateSub(){const s=$("#wa-sub");if(s)s.innerHTML=waSubtitle();}
function waWireChat(){
  const ta=$("#gc-in"),f=$("#gcomp"),box=$("#gchat");
  const grow=()=>{ta.style.height="auto";ta.style.height=Math.min(120,ta.scrollHeight)+"px";};
  let lastTyping=0;
  ta.oninput=()=>{grow();if(GC_CH&&Date.now()-lastTyping>2000){lastTyping=Date.now();GC_CH.send({type:"broadcast",event:"typing",payload:{u:GC_USER.id}});}};
  ta.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey&&waIsWide()){e.preventDefault();f.requestSubmit();}if(e.key==="Escape")waSetReply(null);};
  f.onsubmit=async e=>{e.preventDefault();const t=ta.value.trim();if(!t)return;ta.value="";grow();ta.focus();await gcSend("text",t);};
  box.addEventListener("scroll",()=>{const far=box.scrollHeight-box.scrollTop-box.clientHeight>300;$("#wa-jump").hidden=!far;},{passive:true});
  $("#wa-jump").onclick=()=>waScrollEnd();
  // long-press (phones) and swipe-to-reply. The bubble is highlighted while its menu is open,
  // and the browser's own text selection / callout is suppressed so nothing else turns blue.
  let tm=null,sx=0,sy=0,el=null,dx=0,lastTouch=0,fired=false;
  box.addEventListener("touchstart",e=>{lastTouch=Date.now();fired=false;const b=e.target.closest(".wa-b");if(!b||e.target.closest("textarea,input"))return;el=b;sx=e.touches[0].clientX;sy=e.touches[0].clientY;dx=0;
    tm=setTimeout(()=>{tm=null;fired=true;const row=b.closest("[data-mid]");const id=+row.dataset.mid;try{window.getSelection().removeAllRanges();}catch(_){}try{navigator.vibrate&&navigator.vibrate(15);}catch(_){}row.classList.add("sel");waMsgMenu(id);},450);},{passive:true});
  box.addEventListener("touchmove",e=>{if(!el)return;const x=e.touches[0].clientX-sx,y=e.touches[0].clientY-sy;if(Math.abs(y)>10||Math.abs(x)>10){clearTimeout(tm);tm=null;}if(x>0&&Math.abs(y)<30&&!fired){dx=Math.min(x,80);el.style.transform=`translateX(${dx}px)`;}},{passive:true});
  const end=()=>{clearTimeout(tm);tm=null;if(el){if(dx>60){const id=+el.closest("[data-mid]").dataset.mid;waSetReply(id);try{navigator.vibrate&&navigator.vibrate(10);}catch(_){}}el.style.transform="";}el=null;dx=0;};
  box.addEventListener("touchend",e=>{if(fired&&e.cancelable)e.preventDefault();end();});box.addEventListener("touchcancel",end);
  // a long-press must not also "click" whatever was under the finger (a poll option, a link…)
  box.addEventListener("click",e=>{if(fired){e.preventDefault();e.stopPropagation();fired=false;}},true);
  box.addEventListener("selectstart",e=>{if(!e.target.closest||!e.target.closest("textarea,input"))e.preventDefault();});
  box.addEventListener("contextmenu",e=>{if(e.target.closest("textarea,input"))return;e.preventDefault();if(Date.now()-lastTouch<1200)return;const b=e.target.closest(".wa-b");if(!b)return;const row=b.closest("[data-mid]");row.classList.add("sel");waMsgMenu(+row.dataset.mid);});
  if(!S.waTip&&!waIsWide()){S.waTip=1;save();setTimeout(()=>toast("Tip: press and hold a message to react or reply · swipe right to reply"),900);}
}
// clear the highlighted bubble whenever a sheet closes
(function(){const sh=document.getElementById("sheet");if(!sh)return;new MutationObserver(()=>{if(sh.hidden)document.querySelectorAll(".wa-m.sel").forEach(x=>x.classList.remove("sel"));}).observe(sh,{attributes:true,attributeFilter:["hidden"]});})();
function waScrollEnd(instant){requestAnimationFrame(()=>{const c=$("#gchat");if(!c)return;c.scrollTo({top:c.scrollHeight,behavior:instant?"auto":"smooth"});});}
function gcScrollEnd(i){waScrollEnd(i);}
function gcTab(t){
  if(t==="challenge"){waPanel("challenge");return;}
  if(t==="members"){waPanel("info");return;}
  document.querySelectorAll(".wa-panel").forEach(p=>p.remove());
}
async function waMarkRead(){if(!G)return;const now=new Date().toISOString();G._lr=now;await GC.from("group_members").update({last_read:now}).eq("group_id",G.id).eq("user_id",GC_USER.id);const me=G.members.get(GC_USER.id);if(me)me.last_read=now;}
async function waRefreshReads(){if(!G||!$("#gchat"))return clearInterval(G&&G._poll);const {data}=await GC.from("group_members").select("user_id,last_read").eq("group_id",G.id);(data||[]).forEach(r=>{const m=G.members.get(r.user_id);if(m)m.last_read=r.last_read;});document.querySelectorAll(".wa-m.out [data-tk]").forEach(t=>{const m=G.msgs.find(x=>x.id===+t.dataset.tk);if(m)t.outerHTML=waTicks(m);});}
function waTicks(m){const others=[...G.members.values()].filter(x=>x.user_id!==GC_USER.id);const read=others.filter(x=>x.last_read&&x.last_read>=m.created_at).length;
  const cls=!others.length||read===others.length?"rd":read?"dl":"";return `<span class="wa-tk ${cls}" data-tk="${m.id}" title="${read} of ${others.length} read">${read?WA_I.tick2:WA_I.tick1}</span>`;}

// ---------- sending (with replies) ----------
async function gcSend(kind,body,data){
  const row={group_id:G.id,user_id:GC_USER.id,kind,body:body||"",data:data||{}};if(G.replyTo)row.reply_to=G.replyTo;
  const {data:m,error}=await GC.from("messages").insert(row).select().single();
  if(error){gcErr(error);return null;}
  waSetReply(null);document.querySelectorAll(".wa-panel").forEach(p=>p.remove());
  if(!G.msgs.some(x=>x.id===m.id)){G.msgs.push(m);gcAppendMsg(m);}
  return m;
}
function waSetReply(id){G.replyTo=id||null;const bar=$("#wa-replybar");if(!bar)return;if(!id){bar.hidden=true;bar.innerHTML="";return;}
  const m=G.msgs.find(x=>x.id===id);bar.innerHTML=`<div class="wa-q" style="--qc:${waCol(m.user_id)}"><b>${m.user_id===GC_USER.id?"You":esc(gcName(m.user_id))}</b><span>${esc(waPreview(m,false)).slice(0,120)}</span></div><button class="wa-ib" data-wanoreply aria-label="Cancel reply">${WA_I.close}</button>`;bar.hidden=false;$("#gc-in").focus();}
function gcAppendMsg(m){if(m.kind!=="system")document.querySelector(".wa-start")?.remove();const c=$("#gchat");if(!c)return;const i=G.msgs.indexOf(m);const atEnd=c.scrollHeight-c.scrollTop-c.clientHeight<200;
  const prevEl=i>0&&document.querySelector(`[data-mid="${G.msgs[i-1].id}"]`);c.insertAdjacentHTML("beforeend",gcMsgHTML(m,G.msgs[i-1]));
  if(m.user_id===GC_USER.id||atEnd)waScrollEnd();else{$("#wa-jump").hidden=false;}
  if(m.user_id!==GC_USER.id&&document.visibilityState==="visible")waMarkRead();}
function gcRerender(id){const el=document.querySelector(`[data-mid="${id}"]`);if(!el)return;const i=G.msgs.findIndex(m=>m.id===id);if(i<0)return;const day=el.previousElementSibling&&el.previousElementSibling.classList.contains("wa-day");el.outerHTML=gcMsgHTML(G.msgs[i],G.msgs[i-1]).replace(/^<div class="wa-day">.*?<\/div>/,"");}
function gcMsgsHTML(list){return list.map((m,i)=>gcMsgHTML(m,list[i-1])).join("");}

// ---------- bubbles ----------
function gcMsgHTML(m,prev){
  const mine=m.user_id===GC_USER.id;const newDay=!prev||gcDay(prev.created_at)!==gcDay(m.created_at);
  const head=newDay?`<div class="wa-day"><span>${esc(gcDay(m.created_at))}</span></div>`:"";
  if(m.kind==="system")return head+`<div class="wa-sys" data-mid="${m.id}"><span>${esc(m.user_id===GC_USER.id?"You":gcName(m.user_id))} ${esc(m.body==="joined the group"?"joined using this group's invite code":m.body)}</span></div>`;
  const first=newDay||!prev||prev.user_id!==m.user_id||prev.kind==="system";
  const d=m.data||{};const big=m.kind==="text"?waEmojiOnly(m.body):0;
  const bare=(m.kind==="sticker"&&!d.photo)||big;
  const card=["verse","lesson","poll","qa","study","stats","challenge"].includes(m.kind);
  const rx=G.reacts.get(m.id)||[];const rc={};rx.forEach(r=>{(rc[r.emoji]=rc[r.emoji]||[]).push(r.user_id);});
  const rxHTML=Object.keys(rc).length?`<button class="wa-rx" data-wareacts="${m.id}">${Object.keys(rc).slice(0,3).join("")}${rx.length>1?`<span>${rx.length}</span>`:""}</button>`:"";
  const q=m.reply_to?G.msgs.find(x=>x.id===m.reply_to):null;
  const quote=m.reply_to?`<button class="wa-q" data-wagoto="${m.reply_to}" style="--qc:${q?waCol(q.user_id):"#888"}"><b>${q?(q.user_id===GC_USER.id?"You":esc(gcName(q.user_id))):"Message"}</b><span>${q?esc(waPreview(q,false)).slice(0,120):"Original message not loaded"}</span></button>`:"";
  const name=!mine&&first?`<div class="wa-nm" style="color:${waCol(m.user_id)}">${esc(gcName(m.user_id))}</div>`:"";
  const meta=`<span class="wa-meta">${gcTime(m.created_at)}${mine?waTicks(m):""}</span>`;
  let inner;
  if(m.kind==="text")inner=big?`<div class="wa-big n${big}">${esc(m.body)}</div>`:`<div class="wa-tx">${gcText(m.body)}<span class="wa-sp"></span></div>`;
  else if(m.kind==="sticker")inner=d.photo?`<img class="wa-photo" src="${esc(gcStickerUrl(d.path))}" alt="Photo" loading="lazy" data-waview="${esc(gcStickerUrl(d.path))}">${m.body?`<div class="wa-tx">${gcText(m.body)}<span class="wa-sp"></span></div>`:""}`:d.emoji?`<div class="wa-big n1">${esc(d.emoji)}</div>`:`<img class="wa-stk" src="${esc(gcStickerUrl(d.path))}" alt="Sticker" loading="lazy">`;
  else inner=gcBodyHTML(m);
  return head+`<div class="wa-m ${mine?"out":"in"}${rxHTML?" has-rx":""}${first?" first":""}${bare?" bare":""}${card?" card":""}" data-mid="${m.id}">
   ${!mine&&first?`<span class="wa-mav" style="background:${waCol(m.user_id)}22">${esc((G.members.get(m.user_id)||{}).avatar||"🙂")}</span>`:""}
   <div class="wa-b">${name}${quote}${inner}${meta}<button class="wa-chev" data-wamenu="${m.id}" aria-label="Message options">${WA_I.down}</button>${rxHTML}</div></div>`;
}

// ---------- message menu, reactions, info ----------
function waMsgMenu(id){const m=G.msgs.find(x=>x.id===id);if(!m)return;const mine=m.user_id===GC_USER.id;const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);
  const myR=(G.reacts.get(id)||[]).filter(r=>r.user_id===GC_USER.id).map(r=>r.emoji);
  openSheet(`<div class="wa-react-row">${GC_REACTS.map(x=>`<button data-gr="${x}" class="${myR.includes(x)?"on":""}">${x}</button>`).join("")}<button data-wamore-r aria-label="More reactions">＋</button></div>
   <div class="wa-menu"><button data-wa-act="reply">↩︎ Reply</button>${m.kind==="text"?`<button data-wa-act="copy">⧉ Copy</button>`:""}<button data-wa-act="fwd">↪︎ Forward</button>${mine?`<button data-wa-act="info">ⓘ Info</button>`:""}${mine||admin?`<button data-wa-act="del" class="danger">🗑 Delete for everyone</button>`:""}</div>`,r=>{
   r.querySelectorAll("[data-gr]").forEach(b=>b.onclick=()=>{closeSheet();gcReact(id,b.dataset.gr);});
   r.querySelector("[data-wamore-r]").onclick=()=>{r.querySelector(".wa-react-row").outerHTML=`<div class="wa-emo-grid">${WA_EMOJI.map(x=>`<button data-gr2="${x}">${x}</button>`).join("")}</div>`;r.querySelectorAll("[data-gr2]").forEach(b=>b.onclick=()=>{closeSheet();gcReact(id,b.dataset.gr2);});};
   r.querySelectorAll("[data-wa-act]").forEach(b=>b.onclick=async()=>{const a=b.dataset.waAct;closeSheet();
     if(a==="reply")waSetReply(id);
     else if(a==="copy")navigator.clipboard?.writeText(m.body).then(()=>toast("Message copied"));
     else if(a==="fwd")gcPickGroup(gid=>gcSendTo(gid,m.kind,m.body,m.data));
     else if(a==="info"){const others=[...G.members.values()].filter(x=>x.user_id!==GC_USER.id);const read=others.filter(x=>x.last_read>=m.created_at),un=others.filter(x=>!(x.last_read>=m.created_at));
       openSheet(`<h2 class="sheet-t">Message info</h2><div class="wa-ilist"><div class="label"><span class="wa-tk rd">${WA_I.tick2}</span> Read by</div>${read.map(x=>`<div class="wa-irow"><span class="wa-av sm">${esc(x.avatar)}</span>${esc(x.display_name)}</div>`).join("")||`<p class="muted">No one yet</p>`}<div class="label" style="margin-top:12px"><span class="wa-tk">${WA_I.tick1}</span> Not read yet</div>${un.map(x=>`<div class="wa-irow"><span class="wa-av sm">${esc(x.avatar)}</span>${esc(x.display_name)}</div>`).join("")||`<p class="muted">Everyone has read it</p>`}</div><div class="sheet-acts"><button data-sheetx>Close</button></div>`,null,"Message info");}
     else if(a==="del"){const {error}=await GC.from("messages").delete().eq("id",id);if(error)return gcErr(error);G.msgs=G.msgs.filter(x=>x.id!==id);document.querySelector(`[data-mid="${id}"]`)?.remove();toast("Message deleted");}
   });},"Message");}
document.addEventListener("click",e=>{
  if(!G)return;let b;
  if(b=e.target.closest("[data-wamenu]")){waMsgMenu(+b.dataset.wamenu);return;}
  if(b=e.target.closest("[data-wareacts]")){const id=+b.dataset.wareacts;const rx=G.reacts.get(id)||[];openSheet(`<h2 class="sheet-t">${rx.length} reaction${rx.length>1?"s":""}</h2><div class="wa-ilist">${rx.map(r=>`<div class="wa-irow"><span class="wa-av sm">${esc((G.members.get(r.user_id)||{}).avatar||"🙂")}</span><span style="flex:1">${r.user_id===GC_USER.id?"You (tap to remove)":esc(gcName(r.user_id))}</span><span style="font-size:1.4rem" ${r.user_id===GC_USER.id?`data-gr-rm="${r.emoji}"`:""}>${r.emoji}</span></div>`).join("")}</div><div class="sheet-acts"><button data-sheetx>Close</button></div>`,r=>{r.querySelectorAll("[data-gr-rm]").forEach(x=>x.closest(".wa-irow").onclick=()=>{closeSheet();gcReact(id,x.dataset.grRm);});},"Reactions");return;}
  if(b=e.target.closest("[data-wagoto]")){const t=document.querySelector(`[data-mid="${b.dataset.wagoto}"]`);if(t){t.scrollIntoView({behavior:"smooth",block:"center"});t.classList.add("wa-flash");setTimeout(()=>t.classList.remove("wa-flash"),1500);}return;}
  if(e.target.closest("[data-wanoreply]")){waSetReply(null);return;}
  if(e.target.closest("[data-wainfo]")){waPanel("info");return;}
  if(e.target.closest("[data-wachal]")){waPanel("challenge");return;}
  if(e.target.closest("[data-wapanelx]")){e.target.closest(".wa-panel").remove();return;}
  if(e.target.closest("[data-wamenu-h]")){openSheet(`<div class="wa-menu"><button data-wainfo data-sheetx>ⓘ Group info</button><button data-ginvite>👤 Invite people</button><button data-wachal data-sheetx>🏆 Weekly challenge</button><button data-gstudy-new>🧭 Start a 7-day study</button><button data-wamute data-sheetx>${waArchived(G.id)?"📤 Unarchive chat":"🗄️ Archive chat"}</button><button data-gleave class="danger">⎋ Exit group</button></div>`,r=>{r.querySelector("[data-gstudy-new]").onclick=()=>gcStudySheet();},"Group menu");return;}
  if(b=e.target.closest("[data-waview]")){const ov=document.createElement("div");ov.className="wa-viewer";ov.innerHTML=`<button class="wa-ib" aria-label="Close">${WA_I.close}</button><img src="${esc(b.dataset.waview)}" alt="Photo">`;ov.onclick=()=>ov.remove();document.body.append(ov);return;}
  if(e.target.closest("[data-waemoji]")){waEmojiSheet();return;}
});
document.addEventListener("change",async e=>{const f=e.target.closest("[data-waphoto]");if(!f||!G)return;const file=f.files[0];f.value="";if(!file)return;
  const url=URL.createObjectURL(file);openSheet(`<h2 class="sheet-t">Send photo</h2><img src="${url}" alt="" style="max-width:100%;max-height:50vh;border-radius:12px;display:block;margin:0 auto 10px"><input id="wa-cap" maxlength="1000" placeholder="Add a caption"><div class="sheet-acts"><button class="primary" data-wasendphoto>Send</button><button data-sheetx>Cancel</button></div>`,r=>{
   r.querySelector("[data-wasendphoto]").onclick=async()=>{const cap=r.querySelector("#wa-cap").value.trim();closeSheet();toast("Sending photo…");try{const path=await waUploadPhoto(file);await gcSend("sticker",cap,{path,photo:true});}catch(err){gcErr(err);}};},"Photo");});
async function waUploadPhoto(file){
  const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error("That image could not be read"));i.src=URL.createObjectURL(file);});
  let max=1280,blob=null,ext="webp";
  for(let k=0;k<3;k++){const sc=Math.min(1,max/Math.max(img.width,img.height));const cv=document.createElement("canvas");cv.width=Math.round(img.width*sc);cv.height=Math.round(img.height*sc);cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);
    blob=await new Promise(r=>cv.toBlob(r,"image/webp",.8));if(!blob||blob.type!=="image/webp"){blob=await new Promise(r=>cv.toBlob(r,"image/jpeg",.8));ext="jpg";}else ext="webp";if(blob.size<=1000000)break;max=Math.round(max*.7);}
  if(blob.size>1048576)throw new Error("That photo is too large");
  const path=`${GC_USER.id}/p-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}.${ext}`;
  const {error}=await GC.storage.from("stickers").upload(path,blob,{contentType:blob.type});if(error)throw error;return path;
}
async function waEmojiSheet(){
  const {data:mine}=await GC.from("stickers").select("id,path").eq("user_id",GC_USER.id).order("created_at",{ascending:false});
  openSheet(`<div class="seg wa-etabs" role="tablist"><button data-et="e" aria-pressed="true">😊 Emoji</button><button data-et="s" aria-pressed="false">🏷️ Stickers</button></div>
   <div data-ep="e"><div class="wa-emo-grid">${WA_EMOJI.map(x=>`<button data-ins="${x}">${x}</button>`).join("")}</div></div>
   <div data-ep="s" hidden><div class="stk-grid">${GC_STICKERS.map(x=>`<button data-gse="${x}">${x}</button>`).join("")}</div><div class="label" style="margin-top:10px">My stickers</div><div class="stk-grid img">${(mine||[]).map(s=>`<button data-gsi="${esc(s.path)}" data-gsid="${s.id}"><img src="${esc(gcStickerUrl(s.path))}" alt="Sticker" loading="lazy"></button>`).join("")}<label class="stk-add"><input type="file" accept="image/png,image/webp,image/gif,image/jpeg" hidden data-gsup><span>＋</span><small>Add from phone</small></label></div></div>`,r=>{
   r.querySelectorAll("[data-et]").forEach(b=>b.onclick=()=>{r.querySelectorAll("[data-et]").forEach(x=>x.setAttribute("aria-pressed",x===b));r.querySelectorAll("[data-ep]").forEach(p=>p.hidden=p.dataset.ep!==b.dataset.et);});
   r.querySelectorAll("[data-ins]").forEach(b=>b.onclick=()=>{const ta=$("#gc-in");const s=ta.selectionStart??ta.value.length;ta.value=ta.value.slice(0,s)+b.dataset.ins+ta.value.slice(ta.selectionEnd??s);ta.dispatchEvent(new Event("input"));});
   r.querySelectorAll("[data-gse]").forEach(b=>b.onclick=()=>{closeSheet();gcSend("sticker","",{emoji:b.dataset.gse});});
   r.querySelectorAll("[data-gsi]").forEach(b=>{b.onclick=()=>{closeSheet();gcSend("sticker","",{path:b.dataset.gsi});};b.oncontextmenu=async ev=>{ev.preventDefault();await GC.storage.from("stickers").remove([b.dataset.gsi]);await GC.from("stickers").delete().eq("id",b.dataset.gsid);b.remove();toast("Sticker removed");};});
   r.querySelector("[data-gsup]").onchange=async ev=>{const f=ev.target.files[0];if(!f)return;try{toast("Adding sticker…");const path=await gcUploadSticker(f);closeSheet();await gcSend("sticker","",{path});}catch(err){gcErr(err);}};},"Emoji and stickers");
}
function gcStickerSheet(){waEmojiSheet().then(()=>{const b=document.querySelector('#sheet [data-et="s"]');b&&b.click();});}
function gcAttachSheet(){
  const it=[["verse","📖","Verse","#7f66ff"],["lesson","🎓","Course","#007bfc"],["poll","📊","Poll","#02a698"],["quiz","❓","Quiz","#ff2e74"],["qa","💬","Q&A","#00a5f4"],["study","🧭","Mini-study","#ffbc38"],["photo","🖼️","Photo","#c861f9"],["sticker","🏷️","Sticker","#fd6d38"],["challenge","🏆","Challenge","#a8730d"]];
  openSheet(`<div class="wa-att">${it.map(([k,i,l,c])=>`<button data-at="${k}"><span style="background:${c}">${i}</span>${l}</button>`).join("")}</div>`,r=>{
   r.querySelectorAll("[data-at]").forEach(b=>b.onclick=()=>{const k=b.dataset.at;
     if(k==="verse")gcVerseSheet();else if(k==="lesson")gcLessonSheet();else if(k==="poll")gcPollSheet();else if(k==="quiz")gcQuizSheet(true);else if(k==="qa")gcQuizSheet(false);else if(k==="study")gcStudySheet();else if(k==="sticker")gcStickerSheet();
     else if(k==="photo"){closeSheet();document.querySelector("[data-waphoto]").click();}
     else if(k==="challenge"){closeSheet();gcMakeChallenge();}});},"Share");
}

// ---------- group info and challenge panels ----------
function waPanel(kind){
  document.querySelectorAll(".wa-panel").forEach(p=>p.remove());
  const chat=$("#wa-chat");if(!chat)return;
  const p=document.createElement("section");p.className="wa-panel";p.dataset.kind=kind;
  const draw=()=>{const me=G.members.get(GC_USER.id)||{};const admin=["owner","admin"].includes(me.role);
    if(kind==="challenge")p.innerHTML=`<header class="wa-phead"><button class="wa-ib" data-wapanelx aria-label="Close">${WA_I.back}</button><strong>Weekly challenge</strong></header><div class="wa-pbody">${gcChallengeHTML()}</div>`;
    else{const st=gcGroupStats();const list=[...G.members.values()].sort((a,b)=>(b.user_id===GC_USER.id)-(a.user_id===GC_USER.id)||gcStreakOf(b.user_id)-gcStreakOf(a.user_id));
      p.innerHTML=`<header class="wa-phead"><button class="wa-ib" data-wapanelx aria-label="Close">${WA_I.back}</button><strong>Group info</strong></header><div class="wa-pbody">
       <div class="wa-ihero"><div class="wa-av xl">${esc(G.group.emoji)}</div><h2>${esc(G.group.name)}</h2><p class="muted">Group · ${G.members.size} member${G.members.size>1?"s":""}</p>
        <div class="wa-iacts"><button data-ginvite><span>👤＋</span>Invite</button><button data-wachal><span>🏆</span>Challenge</button><button data-wamute><span>${waArchived(G.id)?"📤":"🗄️"}</span>${waArchived(G.id)?"Unarchive":"Archive"}</button></div></div>
       ${G.group.description?`<div class="wa-isec"><p style="margin:0">${esc(G.group.description)}</p></div>`:""}
       <div class="wa-isec"><div class="label">This week</div><div class="gs-big"><div><b>${st.readings}</b><span>days of reading</span></div><div><b>${st.complete}%</b><span>challenge done</span></div><div><b>${st.top}</b><span>longest streak</span></div></div></div>
       <div class="wa-isec"><div class="label">${G.members.size} members</div><button class="wa-irow link" data-ginvite><span class="wa-av sm" style="background:var(--wa-green);color:#fff">🔗</span>Invite via link or code: <b style="letter-spacing:.12em">${esc(G.group.invite_code)}</b></button>
        ${list.map(m=>{const s=gcStreakOf(m.user_id);const today=(G.logs.get(m.user_id)||new Set()).has(isoDay(new Date()));return `<div class="wa-irow"><span class="wa-av sm">${esc(m.avatar)}</span><span class="wa-im"><strong>${m.user_id===GC_USER.id?"You":esc(m.display_name)}${G.sup&&G.sup.has(m.user_id)?` <span title="Golden Chain supporter" aria-label="Supporter">💛</span>`:""}</strong><span class="muted">${today?"🔥":"🕯️"} ${s}-day streak · ${(m.stats&&m.stats.lessons)||0} lessons completed</span></span>${m.role!=="member"?`<span class="wa-admin">Group ${m.role==="owner"?"admin":"admin"}</span>`:""}${admin&&m.user_id!==GC_USER.id&&m.role!=="owner"?`<button class="wa-ib" data-gkick="${m.user_id}" aria-label="Remove ${esc(m.display_name)}">✕</button>`:""}</div>`;}).join("")}</div>
       <div class="wa-isec danger">${me.role==="owner"?`<button class="wa-irow" data-gedit>✏️ Edit group</button><button class="wa-irow red" data-gdel>🗑 Delete group</button>`:`<button class="wa-irow red" data-gleave>⎋ Exit group</button>`}</div></div>`;}
  };
  draw();p._draw=draw;chat.append(p);
  if(kind!=="challenge"||true){Promise.all([gcLoadLogs(),typeof gcLoadSupporters==="function"?gcLoadSupporters():null]).then(()=>{if(p.isConnected)draw();});}
}
// keep panels current when data changes (old code calls gcTab)
const _gcTabWA=gcTab;
function waRedrawPanel(){const p=document.querySelector(".wa-panel");if(p&&p._draw)p._draw();}

// ---------- realtime: messages + typing ----------
function gcSubscribe(){
  const f=`group_id=eq.${G.id}`;const gid=G.id;
  GC_CH=GC.channel("g-"+gid+"-"+Date.now().toString(36),{config:{broadcast:{self:false}}})
   .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:f},async p=>{if(!G||G.id!==gid||G.msgs.some(m=>m.id===p.new.id))return;if(p.new.kind==="system"||!G.members.has(p.new.user_id))await gcRefreshMembers();G.typing.delete(p.new.user_id);waUpdateSub();G.msgs.push(p.new);gcAppendMsg(p.new);if(p.new.kind==="challenge")gcLoadWeek().then(()=>{waRedrawPanel();G.msgs.filter(x=>x.kind==="challenge").forEach(x=>gcRerender(x.id));});})
   .on("postgres_changes",{event:"DELETE",schema:"public",table:"messages"},p=>{if(!G)return;const id=p.old.id;G.msgs=G.msgs.filter(m=>m.id!==id);document.querySelector(`[data-mid="${id}"]`)?.remove();})
   .on("postgres_changes",{event:"*",schema:"public",table:"responses",filter:f},p=>{const r=p.new&&p.new.message_id?p.new:p.old;if(!G.resp.has(r.message_id))G.resp.set(r.message_id,new Map());if(p.eventType==="DELETE")G.resp.get(r.message_id).delete(r.user_id);else G.resp.get(r.message_id).set(r.user_id,p.new.value);gcRerender(r.message_id);})
   .on("postgres_changes",{event:"*",schema:"public",table:"reactions",filter:f},p=>{const r=p.eventType==="DELETE"?p.old:p.new;let a=G.reacts.get(r.message_id)||[];a=a.filter(x=>!(x.user_id===r.user_id&&x.emoji===r.emoji));if(p.eventType!=="DELETE")a.push(r);G.reacts.set(r.message_id,a);gcRerender(r.message_id);})
   .on("postgres_changes",{event:"*",schema:"public",table:"checkins",filter:f},p=>{const r=p.eventType==="DELETE"?p.old:p.new;if(r.week!==gcWkey())return;G.checkins=G.checkins.filter(x=>!(x.user_id===r.user_id&&x.task===r.task));if(p.eventType!=="DELETE")G.checkins.push(r);waRedrawPanel();})
   .on("broadcast",{event:"typing"},({payload})=>{if(!G||!payload)return;G.typing.set(payload.u,Date.now());waUpdateSub();setTimeout(waUpdateSub,4200);})
   .subscribe();
}
// old helpers redirect to the panels
function gcMembersHTML(){return "";}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&G&&$("#gchat"))waMarkRead();});
// override the old tab function so challenge ticks, kicks and edits refresh the open panel
gcTab=function(t){if(t==="challenge"||t==="members"){const open=document.querySelector(".wa-panel");const want=t==="challenge"?"challenge":"info";if(open&&open.dataset.kind===want){open._draw();return;}waPanel(want);return;}document.querySelectorAll(".wa-panel").forEach(p=>p.remove());};

// ---------- archive, exit and delete from the chat list ----------
S.gcArchived=S.gcArchived||[];
function waArchived(id){return (S.gcArchived||[]).includes(id);}
function waSetArchived(id,v){S.gcArchived=(S.gcArchived||[]).filter(x=>x!==id);if(v)S.gcArchived.push(id);save();try{gcPushStats();}catch(e){}}
async function waExit(gid,del){
  const {data:g}=await GC.from("groups").select("owner,name").eq("id",gid).maybeSingle();
  if(g&&g.owner===GC_USER.id){if(!del){toast("You're the group admin: delete the group instead, or make sure you want to end it for everyone");return false;}const {error}=await GC.from("groups").delete().eq("id",gid);if(error){gcErr(error);return false;}toast("Group deleted");}
  else{await GC.from("messages").insert({group_id:gid,user_id:GC_USER.id,kind:"text",body:"👋 left the group"}).then(()=>{});const {error}=await GC.from("group_members").delete().eq("group_id",gid).eq("user_id",GC_USER.id);if(error){gcErr(error);return false;}toast(del?"Chat deleted":"You left the group");}
  waSetArchived(gid,false);return true;
}
function waRowMenu(gid){
  const row=document.querySelector(`.wa-row[href="#group-${gid}"]`);const name=row?row.querySelector("strong").textContent:"this group";const arch=waArchived(gid);
  openSheet(`<h2 class="sheet-t">${esc(name)}</h2><div class="wa-menu"><button data-wr="arch">${arch?"📤 Unarchive chat":"🗄️ Archive chat"}</button><button data-wr="read">✓ Mark as read</button><button data-wr="exit" class="danger">⎋ Exit group</button><button data-wr="del" class="danger">🗑 Delete chat</button></div>`,r=>{
   r.querySelectorAll("[data-wr]").forEach(b=>b.onclick=async()=>{const a=b.dataset.wr;
     if(a==="arch"){closeSheet();waSetArchived(gid,!arch);toast(arch?"Chat unarchived":"Chat archived");route();}
     else if(a==="read"){closeSheet();await GC.from("group_members").update({last_read:new Date().toISOString()}).eq("group_id",gid).eq("user_id",GC_USER.id);route();}
     else if(a==="exit"||a==="del"){if(!confirmInline(b,a==="del"?"Tap again: delete chat"+(row&&row.dataset.owner==="1"?" for everyone":""):"Tap again to exit"))return;closeSheet();if(await waExit(gid,a==="del")){if(location.hash==="#group-"+gid)location.hash="#groups";else route();}}});},"Chat options");
}
// long-press / right-click on a chat in the list
(function(){let t=null;document.addEventListener("touchstart",e=>{const r=e.target.closest(".wa-row");if(!r)return;t=setTimeout(()=>{t=null;r.dataset.lp="1";try{navigator.vibrate&&navigator.vibrate(15);}catch(_){}waRowMenu(r.getAttribute("href").slice(7));},500);},{passive:true});
 ["touchend","touchmove"].forEach(ev=>document.addEventListener(ev,()=>{clearTimeout(t);t=null;},{passive:true}));
 document.addEventListener("click",e=>{const r=e.target.closest(".wa-row");if(r&&r.dataset.lp){e.preventDefault();delete r.dataset.lp;return;}const c=e.target.closest("[data-wrmenu]");if(c){e.preventDefault();e.stopPropagation();waRowMenu(c.dataset.wrmenu);return;}
  if(e.target.closest("[data-waarchview]")){const l=document.querySelector(".wa-list");l.classList.toggle("show-arch");return;}
  if(e.target.closest("[data-wamute]")&&G){const v=!waArchived(G.id);waSetArchived(G.id,v);toast(v?"Chat archived":"Chat unarchived");const p=document.querySelector(".wa-panel");p&&p._draw&&p._draw();}},true);
 document.addEventListener("contextmenu",e=>{const r=e.target.closest(".wa-row");if(!r)return;e.preventDefault();waRowMenu(r.getAttribute("href").slice(7));});})();
// exit from inside a chat goes through the same path
document.addEventListener("click",async e=>{const b=e.target.closest("[data-gleave]");if(!b||!G)return;e.stopImmediatePropagation();if(!confirmInline(b,"Tap again to exit"))return;closeSheet();const gid=G.id;if(await waExit(gid,false)){G=null;location.hash="#groups";}},true);
