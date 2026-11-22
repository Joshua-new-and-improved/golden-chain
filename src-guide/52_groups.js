// ---------- Groups: accounts, group chat, weekly challenges, polls, Q&A, mini-studies, stickers ----------
// Backend: Supabase (Postgres with row-level security, realtime and storage). Schema: supabase_schema.sql.
const GC_SB={url:"https://fbybxhpzxppdihtchvqw.supabase.co",key:"sb_publishable_qJzxs337rY81WaeNpYxieQ_SMTmul4V"}; // the project URL and public (anon) key go here once the project exists
const SB_JS="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
VIEWS.push("groups","group");
let GC=null, GC_USER=null, GC_PROFILE=null, GC_CH=null, G=null;

function gcConfig(){try{const o=JSON.parse(localStorage.getItem("gc-sb")||"null");if(o&&o.url&&o.key)return o;}catch(e){}return GC_SB.url&&GC_SB.key?GC_SB:null;}
function loadScript(src){return new Promise((res,rej)=>{if([...document.scripts].some(s=>s.src===src))return res();const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=()=>rej(new Error("Could not load "+src));document.head.append(s);});}
async function gc(){
  if(GC)return GC;const c=gcConfig();if(!c)return null;
  await loadScript(SB_JS);
  GC=window.supabase.createClient(c.url,c.key,{auth:{persistSession:true,storageKey:"gc-auth",autoRefreshToken:true,detectSessionInUrl:true}});
  const {data}=await GC.auth.getSession();GC_USER=data.session?data.session.user:null;
  GC.auth.onAuthStateChange((ev,sess)=>{const was=GC_USER&&GC_USER.id;GC_USER=sess?sess.user:null;if((GC_USER&&GC_USER.id)!==was){GC_PROFILE=null;setTimeout(()=>{if(GC_USER)gcAfterSignIn();const h=location.hash||"";if(/^#(groups|group-|join-)/.test(h))route();},0);}});
  if(GC_USER)gcAfterSignIn();
  return GC;
}
async function gcAfterSignIn(){
  try{await gcProfile();await gcSyncAllReading();await gcPushStats();gcUnreadBadge();}catch(e){console.warn(e);}
  const pend=sessionStorage.getItem("gc-join");if(pend){sessionStorage.removeItem("gc-join");gcJoin(pend);}
}
async function gcProfile(force){
  if(GC_PROFILE&&!force)return GC_PROFILE;if(!GC_USER)return null;
  let {data}=await GC.from("profiles").select("*").eq("id",GC_USER.id).maybeSingle();
  if(!data){const nm=(GC_USER.user_metadata&&GC_USER.user_metadata.display_name)||"Friend";await GC.from("profiles").insert({id:GC_USER.id,display_name:nm});({data}=await GC.from("profiles").select("*").eq("id",GC_USER.id).maybeSingle());}
  GC_PROFILE=data;if(data&&data.stats&&Array.isArray(data.stats.archived)&&!(S.gcArchived||[]).length){S.gcArchived=data.stats.archived;save();}return data;
}
async function gcSyncAllReading(){
  if(!GC_USER)return;
  const rows=Object.entries(S.rlog||{}).map(([day,ref])=>({user_id:GC_USER.id,day,ref:String(ref).slice(0,60)}));
  if(rows.length)await GC.from("reading_log").upsert(rows,{onConflict:"user_id,day",ignoreDuplicates:true});
  const {data}=await GC.from("reading_log").select("day,ref").eq("user_id",GC_USER.id);
  let added=0;(data||[]).forEach(r=>{if(!S.rlog[r.day]){S.rlog[r.day]=r.ref||"read";added++;}});
  if(added){save();updateStreakPills();}
}
function gcSyncReading(day,ref){if(!GC||!GC_USER){if(gcConfig()&&localStorage.getItem("gc-auth"))gc().then(()=>gcSyncAllReading()).catch(()=>{});return;}GC.from("reading_log").upsert({user_id:GC_USER.id,day,ref:String(ref).slice(0,60)},{onConflict:"user_id,day",ignoreDuplicates:true}).then(()=>gcPushStats());}
async function gcPushStats(){if(!GC||!GC_USER)return;const i=streakInfo();const stats={streak:i.streak,best:i.best,today:i.todayDone,lessons:Object.keys(LESSONS).filter(isDone).length,archived:S.gcArchived||[],at:Date.now()};await GC.from("profiles").update({stats}).eq("id",GC_USER.id);if(GC_PROFILE)GC_PROFILE.stats=stats;}
// keep lesson counts current for the group
(function(){const _sd=setDone;setDone=function(x,v){_sd(x,v);try{gcPushStats();}catch(e){}};})();

// ---------- helpers ----------
const gcErr=e=>toast((e&&(e.message||e.error_description))||"Something went wrong");
function gcWeek(d){d=d||new Date();const t=new Date(d.getFullYear(),d.getMonth(),d.getDate());const dow=(t.getDay()+6)%7;t.setDate(t.getDate()-dow+3);const y=t.getFullYear();const w1=new Date(y,0,4);const wk=1+Math.round(((t-w1)/864e5-3+((w1.getDay()+6)%7))/7);return `${y}-W${String(wk).padStart(2,"0")}`;}
function gcWeekBounds(){const t=new Date();const dow=(t.getDay()+6)%7;const mon=new Date(t.getFullYear(),t.getMonth(),t.getDate()-dow);const sun=new Date(mon);sun.setDate(mon.getDate()+6);return [ymd(mon),ymd(sun),mon];}
function gcHash(s){let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return Math.abs(h);}
function gcTime(t){const d=new Date(t);return d.toLocaleTimeString("en-ZA",{hour:"2-digit",minute:"2-digit"});}
function gcDay(t){const d=new Date(t),n=new Date();const k=ymd(d);if(k===ymd(n))return "Today";const y=new Date(n);y.setDate(n.getDate()-1);if(k===ymd(y))return "Yesterday";return d.toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"});}
function gcText(s){return esc(s).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\n/g,"<br>");}
function gcStickerUrl(path){const c=gcConfig();return `${c.url}/storage/v1/object/public/stickers/${path}`;}
function gcName(uid){const m=G&&G.members.get(uid);return m?m.display_name:"Someone";}
function gcAv(uid,cls){const m=G&&G.members.get(uid);return `<span class="gav ${cls||""}" title="${esc(m?m.display_name:"")}">${esc(m?m.avatar:"🙂")}</span>`;}
function gcStreakOf(uid){const set=G&&G.logs.get(uid);if(!set)return 0;const log={};set.forEach(d=>log[d]=1);return streakInfo(log).streak;}

// ---------- unread badge on the Groups tab ----------
async function gcUnreadBadge(){
  if(!GC||!GC_USER)return;
  const {data:mem}=await GC.from("group_members").select("group_id,last_read").eq("user_id",GC_USER.id);
  let n=0;for(const m of mem||[]){const {data}=await GC.from("messages").select("created_at,user_id").eq("group_id",m.group_id).order("created_at",{ascending:false}).limit(1);if(data&&data[0]&&data[0].user_id!==GC_USER.id&&data[0].created_at>m.last_read)n++;}
  document.querySelectorAll('[data-tab="groups"], nav.main a[href="#groups"]').forEach(a=>a.classList.toggle("has-dot",n>0));
}

// ---------- Groups home ----------
async function renderGroups(joinCode){
  const v=$("#v-groups");gcLeave();
  const cfg=gcConfig();
  const streakBox=streakCardHTML().replace('id="home-streak"','');
  if(!cfg){v.innerHTML=`<div class="label">Groups</div><h1>Groups</h1>${streakBox}
   <div class="co extra"><div class="co-h">Almost ready</div><p>Groups (chat, weekly challenges, shared verses and courses, stickers, polls, Q&amp;As and mini-studies) need the site's online database, which is being switched on. Your reading streak already works and will carry over.</p></div>`;return;}
  v.innerHTML=`<div class="label">Groups</div><h1>Groups</h1><p class="muted">Loading…</p>`;
  try{await gc();}catch(e){v.innerHTML=`<h1>Groups</h1><p>Could not connect (${esc(e.message)}). Check your internet connection and try again.</p>`;return;}
  if(joinCode){if(GC_USER){await gcJoin(joinCode);return;}sessionStorage.setItem("gc-join",joinCode);}
  if(!GC_USER){renderGcAuth(v,streakBox,joinCode);return;}
  const prof=await gcProfile();gcSyncAllReading().catch(()=>{});
  const {data:mem,error}=await GC.from("group_members").select("group_id,role,last_read").eq("user_id",GC_USER.id);
  if(error){v.innerHTML=`<h1>Groups</h1><p>${esc(error.message)}</p>`;return;}
  const ids=(mem||[]).map(m=>m.group_id);
  const {data:groups}=ids.length?await GC.from("groups").select("*").in("id",ids):{data:[]};
  const last={};await Promise.all(ids.map(async id=>{const {data}=await GC.from("messages").select("body,kind,created_at,user_id").eq("group_id",id).order("created_at",{ascending:false}).limit(1);last[id]=data&&data[0];}));
  const memBy=Object.fromEntries((mem||[]).map(m=>[m.group_id,m]));
  const list=(groups||[]).sort((a,b)=>((last[b.id]||{}).created_at||b.created_at).localeCompare((last[a.id]||{}).created_at||a.created_at));
  const prev=m=>!m?"No messages yet":m.kind==="text"?m.body:m.kind==="system"?m.body:{verse:"📖 Verse",lesson:"🎓 Course",sticker:"Sticker",poll:"📊 Poll",qa:"❓ Q&A",study:"🧭 Mini-study",stats:"📈 Stats",challenge:"🏆 Challenge"}[m.kind]||"Message";
  v.innerHTML=`<div class="gh-top"><div><div class="label">Groups</div><h1 style="margin:.1em 0 0">Your groups</h1></div>
    <button class="gme" data-gprofile>${esc(prof.avatar)} <span>${esc(prof.display_name)}</span></button></div>
   ${streakBox}
   <div class="row" style="gap:8px;margin:14px 0"><button class="btn primary" data-gnew>＋ Create a group</button><button class="btn" data-gjoin>Join with a code</button></div>
   ${list.length?`<div class="glist">${list.map(g=>{const l=last[g.id];const unread=l&&l.user_id!==GC_USER.id&&l.created_at>memBy[g.id].last_read;return `<a class="gitem" href="#group-${g.id}"><span class="gi-e">${esc(g.emoji)}</span><span class="gi-m"><strong>${esc(g.name)}</strong><span class="muted">${esc(prev(l)).slice(0,70)}</span></span><span class="gi-r">${l?`<span class="muted">${esc(gcDay(l.created_at)==="Today"?gcTime(l.created_at):gcDay(l.created_at))}</span>`:""}${unread?`<i class="gdot" aria-label="New messages"></i>`:""}</span></a>`;}).join("")}</div>`
   :`<div class="gempty"><div style="font-size:2.4rem">🕊️</div><h3>No groups yet</h3><p class="muted">Create a group for your friends, family, parish youth or study circle, then share the invite code. Each week brings a new challenge; chat, share verses and courses, run polls, Q&amp;As and mini-studies together.</p></div>`}
   <p class="muted ui" style="font-size:.78rem;margin-top:22px">Signed in as ${esc(GC_USER.email||"")} · <button class="linklike" data-gout>Sign out</button></p>`;
  gcUnreadBadge();
}
function renderGcAuth(v,streakBox,joinCode){
  v.innerHTML=`<div class="label">Groups</div><h1>Read, pray and learn together</h1>
   <p class="muted" style="max-width:40em">Create a group with friends, take on a fun challenge each week, keep each other's Scripture streaks alive, share verses, courses and stickers, and run polls, Q&amp;As and mini-studies in the chat.</p>
   ${joinCode?`<div class="co apply"><div class="co-h">You've been invited</div><p>Sign in or create an account and you'll join the group with code <strong>${esc(joinCode)}</strong>.</p></div>`:""}
   <div class="gauth"><div class="seg" role="tablist"><button data-am="up" aria-pressed="true">Create account</button><button data-am="in" aria-pressed="false">Sign in</button></div>
    <form id="gauth-f"><label class="label" for="ga-n">Your name (shown to your groups)</label><input id="ga-n" autocomplete="nickname" maxlength="40" placeholder="e.g. Joshua">
     <label class="label" for="ga-e">Email</label><input id="ga-e" type="email" autocomplete="email" required>
     <label class="label" for="ga-p">Password</label><input id="ga-p" type="password" autocomplete="new-password" minlength="6" required>
     <button class="btn primary" type="submit" style="margin-top:12px;width:100%">Create account</button>
     <p class="muted ui" style="font-size:.78rem"><button type="button" class="linklike" data-gforgot>Forgot password?</button></p></form></div>
   ${streakBox}`;
  let mode="up";const f=v.querySelector("#gauth-f");
  v.querySelectorAll("[data-am]").forEach(b=>b.onclick=()=>{mode=b.dataset.am;v.querySelectorAll("[data-am]").forEach(x=>x.setAttribute("aria-pressed",x===b));f.querySelector("#ga-n").parentElement;v.querySelector('label[for="ga-n"]').hidden=v.querySelector("#ga-n").hidden=mode==="in";f.querySelector('button[type="submit"]').textContent=mode==="up"?"Create account":"Sign in";v.querySelector("#ga-p").autocomplete=mode==="up"?"new-password":"current-password";});
  f.onsubmit=async e=>{e.preventDefault();const em=v.querySelector("#ga-e").value.trim(),pw=v.querySelector("#ga-p").value,nm=v.querySelector("#ga-n").value.trim()||"Friend";const btn=f.querySelector('button[type="submit"]');btn.disabled=true;
    try{if(mode==="up"){const {data,error}=await GC.auth.signUp({email:em,password:pw,options:{data:{display_name:nm},emailRedirectTo:publicUrl("#groups")}});if(error)throw error;if(!data.session){v.querySelector(".gauth").innerHTML=`<h3>Check your email</h3><p>We sent a confirmation link to <strong>${esc(em)}</strong>. Open it on this device, then come back here and sign in.</p>`;return;}}
      else{const {error}=await GC.auth.signInWithPassword({email:em,password:pw});if(error)throw error;}
      toast("Welcome!");}catch(err){gcErr(err);}finally{btn.disabled=false;}};
  v.querySelector("[data-gforgot]").onclick=async()=>{const em=v.querySelector("#ga-e").value.trim();if(!em){toast("Type your email first");return;}const {error}=await GC.auth.resetPasswordForEmail(em,{redirectTo:publicUrl("#groups")});error?gcErr(error):toast("Password reset email sent");};
}
async function gcJoin(code){
  try{const {data,error}=await GC.rpc("join_group",{code});if(error)throw error;toast("Joined! 🎉");location.hash="#group-"+data;}catch(e){gcErr(e);location.hash="#groups";}
}

// group-list actions
document.addEventListener("click",async e=>{
  if(e.target.closest("[data-gout]")){await GC.auth.signOut();location.hash="#groups";route();return;}
  if(e.target.closest("[data-gjoin]")){openSheet(`<h2 class="sheet-t">Join a group</h2><label class="label" for="gj-c">Invite code</label><input id="gj-c" maxlength="10" autocapitalize="characters" placeholder="e.g. 7F3A9C" style="text-transform:uppercase;letter-spacing:.15em;font-size:1.3rem;text-align:center"><div class="sheet-acts"><button class="primary" data-gjgo>Join</button><button data-sheetx>Cancel</button></div>`,r=>{r.querySelector("[data-gjgo]").onclick=()=>{const c=r.querySelector("#gj-c").value.trim();if(c){closeSheet();gcJoin(c);}};},"Join a group");return;}
  if(e.target.closest("[data-gnew]")){let em=GC_EMOJI[0];openSheet(`<h2 class="sheet-t">Create a group</h2><label class="label" for="gn-n">Name</label><input id="gn-n" maxlength="60" placeholder="e.g. Tuks Thomists">
     <label class="label">Icon</label><div class="emo-grid">${GC_EMOJI.map((x,i)=>`<button data-ge="${x}" aria-pressed="${i===0}">${x}</button>`).join("")}</div>
     <label class="label" for="gn-d">What is it for? (optional)</label><textarea id="gn-d" rows="2" maxlength="300" placeholder="e.g. Reading the Gospels together this semester"></textarea>
     <div class="sheet-acts"><button class="primary" data-gncreate>Create</button><button data-sheetx>Cancel</button></div>`,r=>{
     r.querySelectorAll("[data-ge]").forEach(b=>b.onclick=()=>{em=b.dataset.ge;r.querySelectorAll("[data-ge]").forEach(x=>x.setAttribute("aria-pressed",x===b));});
     r.querySelector("[data-gncreate]").onclick=async()=>{const name=r.querySelector("#gn-n").value.trim();if(!name){toast("Give the group a name");return;}
       const {data,error}=await GC.from("groups").insert({name,emoji:em,description:r.querySelector("#gn-d").value.trim(),owner:GC_USER.id}).select().single();if(error)return gcErr(error);
       closeSheet();toast("Group created 🎉");location.hash="#group-"+data.id;setTimeout(()=>gcInviteSheet(data),900);};},"Create a group");return;}
  if(e.target.closest("[data-gprofile]")){const p=await gcProfile();let av=p.avatar;openSheet(`<h2 class="sheet-t">Your profile</h2><label class="label" for="gp-n">Name</label><input id="gp-n" maxlength="40" value="${esc(p.display_name)}">
     <label class="label">Avatar</label><div class="emo-grid">${GC_AVATARS.map(x=>`<button data-gav="${x}" aria-pressed="${x===p.avatar}">${x}</button>`).join("")}</div>
     <div class="sheet-acts"><button class="primary" data-gpsave>Save</button><button data-sheetx>Cancel</button></div>`,r=>{
     r.querySelectorAll("[data-gav]").forEach(b=>b.onclick=()=>{av=b.dataset.gav;r.querySelectorAll("[data-gav]").forEach(x=>x.setAttribute("aria-pressed",x===b));});
     r.querySelector("[data-gpsave]").onclick=async()=>{const {error}=await GC.from("profiles").update({display_name:r.querySelector("#gp-n").value.trim()||"Friend",avatar:av}).eq("id",GC_USER.id);if(error)return gcErr(error);await gcProfile(true);closeSheet();route();};},"Profile");return;}
});
function gcInviteSheet(g){
  const link=publicUrl("#join-"+g.invite_code);
  openSheet(`<h2 class="sheet-t">Invite people to ${esc(g.name)}</h2><p class="muted">Share this code or link. Anyone with it can join.</p>
   <div class="invite-code">${esc(g.invite_code)}</div>
   <div class="sheet-acts"><a class="btn primary" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`Join my group "${g.name}" on Golden Chain: ${link}`)}">WhatsApp</a><button data-gicopy>Copy link</button><button data-sheetx>Done</button></div>`,r=>{
   r.querySelector("[data-gicopy]").onclick=()=>{navigator.clipboard?.writeText(link).then(()=>toast("Invite link copied"),()=>toast(link));};},"Invite");
}

// ---------- A group ----------
function gcLeave(){if(GC_CH&&GC){GC.removeChannel(GC_CH);GC_CH=null;}}
async function renderGroup(gid){
  const v=$("#v-group");gcLeave();
  if(!gcConfig()){location.hash="#groups";return;}
  v.innerHTML=`<p class="muted">Loading…</p>`;
  await gc();if(!GC_USER){location.hash="#groups";return;}
  const {data:group,error}=await GC.from("groups").select("*").eq("id",gid).maybeSingle();
  if(error||!group){v.innerHTML=`<p>That group could not be opened. <a href="#groups">Back to Groups</a></p>`;return;}
  const {data:mem}=await GC.from("group_members").select("user_id,role,joined_at").eq("group_id",gid);
  const uids=(mem||[]).map(m=>m.user_id);
  const {data:profs}=await GC.from("profiles").select("id,display_name,avatar,stats").in("id",uids);
  const members=new Map();(mem||[]).forEach(m=>{const p=(profs||[]).find(x=>x.id===m.user_id)||{};members.set(m.user_id,{...m,display_name:p.display_name||"Friend",avatar:p.avatar||"🙂",stats:p.stats||{}});});
  const week=gcWeek();
  G={id:gid,group,members,msgs:[],resp:new Map(),reacts:new Map(),checkins:[],logs:new Map(),week,tab:G&&G.id===gid?G.tab:"chat",challenge:null,hasMore:false};
  await Promise.all([gcLoadMessages(),gcLoadWeek(),gcLoadLogs()]);
  v.innerHTML=`<div class="gtop"><a href="#groups" class="gback" aria-label="Back to groups">‹</a><span class="gt-e">${esc(group.emoji)}</span><div class="gt-m"><strong>${esc(group.name)}</strong><span class="muted">${members.size} member${members.size>1?"s":""}</span></div><button class="gt-i" data-ginvite aria-label="Invite">＋👤</button></div>
   <div class="gtabs seg" role="tablist"><button data-gtab="chat">💬 Chat</button><button data-gtab="challenge">🏆 Challenge</button><button data-gtab="members">👥 Members</button></div>
   <div id="gpane"></div>`;
  gcTab(G.tab);
  GC.from("group_members").update({last_read:new Date().toISOString()}).eq("group_id",gid).eq("user_id",GC_USER.id).then(()=>gcUnreadBadge());
  gcSubscribe();
}
async function gcLoadMessages(before){
  let q=GC.from("messages").select("*").eq("group_id",G.id).order("created_at",{ascending:false}).limit(60);
  if(before)q=q.lt("created_at",before);
  const {data}=await q;const rows=(data||[]).reverse();G.hasMore=(data||[]).length===60;
  G.msgs=before?[...rows,...G.msgs]:rows;
  const ids=rows.map(m=>m.id);if(!ids.length)return;
  const [{data:rs},{data:rx}]=await Promise.all([GC.from("responses").select("message_id,user_id,value").in("message_id",ids),GC.from("reactions").select("message_id,user_id,emoji").in("message_id",ids)]);
  (rs||[]).forEach(r=>{if(!G.resp.has(r.message_id))G.resp.set(r.message_id,new Map());G.resp.get(r.message_id).set(r.user_id,r.value);});
  (rx||[]).forEach(r=>{if(!G.reacts.has(r.message_id))G.reacts.set(r.message_id,[]);G.reacts.get(r.message_id).push(r);});
}
async function gcLoadWeek(){
  const {data:wk}=await GC.from("group_weeks").select("challenge").eq("group_id",G.id).eq("week",G.week).maybeSingle();
  G.challenge=wk?wk.challenge:gcHash(G.id+G.week)%GC_CHALLENGES.length;G.custom=null;
  if(G.challenge<0){const {data:m}=await GC.from("messages").select("data").eq("id",-G.challenge).maybeSingle();G.custom=m&&m.data&&m.data.custom||null;if(!G.custom)G.challenge=gcHash(G.id+G.week)%GC_CHALLENGES.length;}
  await gcLoadCheckins();
}
// check-ins are keyed by week and challenge, so changing the challenge starts everyone afresh
function gcWkey(){return `${G.week}:${G.challenge}`;}
async function gcLoadCheckins(){const {data:ch}=await GC.from("checkins").select("user_id,task").eq("group_id",G.id).eq("week",gcWkey());G.checkins=ch||[];}
function gcChal(){return G.challenge<0&&G.custom?G.custom:GC_CHALLENGES[G.challenge]||GC_CHALLENGES[0];}
async function gcLoadLogs(){
  const since=dayAdd(isoDay(new Date()),-120);
  const {data}=await GC.from("reading_log").select("user_id,day").in("user_id",[...G.members.keys()]).gte("day",since);
  G.logs=new Map();(data||[]).forEach(r=>{if(!G.logs.has(r.user_id))G.logs.set(r.user_id,new Set());G.logs.get(r.user_id).add(r.day);});
}
function gcSubscribe(){
  const f=`group_id=eq.${G.id}`;const gid=G.id;
  GC_CH=GC.channel("g-"+gid+"-"+Date.now().toString(36))
   .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:f},async p=>{if(!G||G.id!==gid||G.msgs.some(m=>m.id===p.new.id))return;if(p.new.kind==="system"||!G.members.has(p.new.user_id))await gcRefreshMembers();G.msgs.push(p.new);gcAppendMsg(p.new);if(p.new.user_id!==GC_USER.id){GC.from("group_members").update({last_read:new Date().toISOString()}).eq("group_id",gid).eq("user_id",GC_USER.id);}})
   .on("postgres_changes",{event:"DELETE",schema:"public",table:"messages"},p=>{if(!G)return;const id=p.old.id;G.msgs=G.msgs.filter(m=>m.id!==id);const el=document.querySelector(`[data-mid="${id}"]`);el&&el.remove();})
   .on("postgres_changes",{event:"*",schema:"public",table:"responses",filter:f},p=>{const r=p.new&&p.new.message_id?p.new:p.old;if(!G.resp.has(r.message_id))G.resp.set(r.message_id,new Map());if(p.eventType==="DELETE")G.resp.get(r.message_id).delete(r.user_id);else G.resp.get(r.message_id).set(r.user_id,p.new.value);gcRerender(r.message_id);})
   .on("postgres_changes",{event:"*",schema:"public",table:"reactions",filter:f},p=>{const r=p.eventType==="DELETE"?p.old:p.new;let a=G.reacts.get(r.message_id)||[];a=a.filter(x=>!(x.user_id===r.user_id&&x.emoji===r.emoji));if(p.eventType!=="DELETE")a.push(r);G.reacts.set(r.message_id,a);gcRerender(r.message_id);})
   .on("postgres_changes",{event:"*",schema:"public",table:"checkins",filter:f},p=>{const r=p.eventType==="DELETE"?p.old:p.new;if(r.week!==G.week)return;G.checkins=G.checkins.filter(x=>!(x.user_id===r.user_id&&x.task===r.task));if(p.eventType!=="DELETE")G.checkins.push(r);if(G.tab!=="chat")gcTab(G.tab);})
   .subscribe();
}
async function gcRefreshMembers(){const {data:mem}=await GC.from("group_members").select("user_id,role,joined_at").eq("group_id",G.id);const ids=(mem||[]).map(m=>m.user_id).filter(id=>!G.members.has(id));if(!ids.length)return;const {data:profs}=await GC.from("profiles").select("id,display_name,avatar,stats").in("id",ids);(mem||[]).filter(m=>ids.includes(m.user_id)).forEach(m=>{const p=(profs||[]).find(x=>x.id===m.user_id)||{};G.members.set(m.user_id,{...m,display_name:p.display_name||"Friend",avatar:p.avatar||"🙂",stats:p.stats||{}});});const c=document.querySelector(".gt-m .muted");if(c)c.textContent=`${G.members.size} member${G.members.size>1?"s":""}`;}

function gcTab(t){
  G.tab=t;document.querySelectorAll("[data-gtab]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.gtab===t));
  const p=$("#gpane");if(!p)return;
  if(t==="chat"){p.innerHTML=`<div class="gchat" id="gchat">${G.hasMore?`<button class="ghost gmore" data-gmore>Load earlier messages</button>`:""}${gcMsgsHTML(G.msgs)}</div>
    <form class="gcomp" id="gcomp"><button type="button" class="gc-plus" data-gattach aria-label="Share something">＋</button><button type="button" class="gc-stk" data-gsticker aria-label="Stickers">🙂</button><textarea id="gc-in" rows="1" maxlength="4000" placeholder="Message" aria-label="Message"></textarea><button class="gc-send" aria-label="Send">➤</button></form>`;
    const ta=$("#gc-in"),f=$("#gcomp");
    ta.oninput=()=>{ta.style.height="auto";ta.style.height=Math.min(140,ta.scrollHeight)+"px";};
    ta.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey&&innerWidth>700){e.preventDefault();f.requestSubmit();}};
    f.onsubmit=async e=>{e.preventDefault();const t=ta.value.trim();if(!t)return;ta.value="";ta.style.height="auto";await gcSend("text",t);};
    gcScrollEnd(true);}
  else{const draw=()=>{if(G.tab!==t)return;p.innerHTML=t==="challenge"?gcChallengeHTML():gcMembersHTML();};draw();
    const now=Date.now();if(!G._logsAt||now-G._logsAt>3000){G._logsAt=now;gcLoadLogs().then(draw);}}
}
function gcScrollEnd(instant){requestAnimationFrame(()=>{const c=$("#gchat");if(!c)return;const last=c.lastElementChild;if(last)last.scrollIntoView({block:"end",behavior:instant?"auto":"smooth"});});}
async function gcSend(kind,body,data){
  const row={group_id:G.id,user_id:GC_USER.id,kind,body:body||"",data:data||{}};
  const {data:m,error}=await GC.from("messages").insert(row).select().single();
  if(error){gcErr(error);return null;}
  if(!G.msgs.some(x=>x.id===m.id)){G.msgs.push(m);gcAppendMsg(m);}
  if(G.tab!=="chat")gcTab("chat");
  return m;
}
function gcAppendMsg(m){const c=$("#gchat");if(!c)return;const prev=G.msgs[G.msgs.indexOf(m)-1];c.insertAdjacentHTML("beforeend",gcMsgHTML(m,prev));const atEnd=c.getBoundingClientRect().bottom<innerHeight+400;if(m.user_id===GC_USER.id||atEnd)gcScrollEnd();}
function gcRerender(id){const el=document.querySelector(`[data-mid="${id}"]`);if(!el)return;const i=G.msgs.findIndex(m=>m.id===id);if(i<0)return;el.outerHTML=gcMsgHTML(G.msgs[i],G.msgs[i-1]);}
function gcMsgsHTML(list){return list.map((m,i)=>gcMsgHTML(m,list[i-1])).join("");}

// ---------- message rendering ----------
function gcMsgHTML(m,prev){
  const mine=m.user_id===GC_USER.id;const newDay=!prev||gcDay(prev.created_at)!==gcDay(m.created_at);
  const head=newDay?`<div class="gday"><span>${esc(gcDay(m.created_at))}</span></div>`:"";
  if(m.kind==="system")return head+`<div class="gsys" data-mid="${m.id}">${esc(gcName(m.user_id))} ${esc(m.body)}</div>`;
  const cont=!newDay&&prev&&prev.user_id===m.user_id&&prev.kind!=="system"&&(new Date(m.created_at)-new Date(prev.created_at))<5*60e3;
  const card=["verse","lesson","poll","qa","study","stats","challenge"].includes(m.kind);
  const inner=gcBodyHTML(m);
  const rx=G.reacts.get(m.id)||[];const rc={};rx.forEach(r=>{(rc[r.emoji]=rc[r.emoji]||[]).push(r.user_id);});
  const rxHTML=Object.keys(rc).length?`<div class="grx">${Object.entries(rc).map(([e,u])=>`<button data-grx="${m.id}" data-e="${e}" class="${u.includes(GC_USER.id)?"me":""}" title="${esc(u.map(gcName).join(", "))}">${e} ${u.length}</button>`).join("")}</div>`:"";
  return head+`<div class="gmsg${mine?" mine":""}${cont?" gcont":""}${m.kind==="sticker"?" gstkm":""}${card?" gcm":""}" data-mid="${m.id}">
   ${mine||cont?"":`<div class="gm-av">${gcAv(m.user_id)}</div>`}
   <div class="gm-b">${mine||cont?"":`<div class="gm-n">${esc(gcName(m.user_id))}</div>`}<div class="gm-c">${inner}</div>${rxHTML}
   <div class="gm-meta"><span>${gcTime(m.created_at)}</span><button data-gmenu="${m.id}" aria-label="React or more">☺︎＋</button></div></div></div>`;
}
function gcBodyHTML(m){
  const d=m.data||{};const R=G.resp.get(m.id)||new Map();const n=G.members.size;
  switch(m.kind){
  case "text":return `<div class="gm-t">${gcText(m.body)}</div>`;
  case "sticker":return d.emoji?`<div class="gstk-e">${esc(d.emoji)}</div>`:`<img class="gstk-i" src="${esc(gcStickerUrl(d.path))}" alt="Sticker" loading="lazy">`;
  case "verse":return `<div class="gcard gverse"><div class="gc-k">📖 ${esc(d.ref||"")}</div><blockquote>${esc(d.text||"")}</blockquote>${m.body?`<p class="gc-note">${gcText(m.body)}</p>`:""}<a class="btn" href="#read-${esc(d.slug)}-${d.ch}-${d.v}">Open in the Bible</a></div>`;
  case "lesson":{const L=LESSONS[d.id];const isMod=!!d.mod;const ls=isMod?modLessons(d.mod):[];return `<div class="gcard glesson"><div class="gc-k">🎓 ${isMod?"Course":"Lesson"} · ${esc(d.code||"")}</div><h4>${esc(d.title||(L&&L.title)||"")}</h4>${isMod?`<p class="muted">${ls.length} lessons · you've completed ${ls.filter(isDone).length}</p>`:L?`<p class="muted">${isDone(d.id)?"✓ You've completed this":"Not completed yet"}</p>`:""}${m.body?`<p class="gc-note">${gcText(m.body)}</p>`:""}<a class="btn primary" href="#lesson-${esc(isMod?nextLesson(d.mod):d.id)}">${isMod?"Open course":"Open lesson"}</a></div>`;}
  case "poll":{const counts=d.o.map((_,i)=>[...R.values()].filter(x=>x.o===i).length);const tot=R.size;const my=R.get(GC_USER.id);
    return `<div class="gcard gpoll"><div class="gc-k">📊 Poll</div><h4>${esc(d.q)}</h4>${d.o.map((o,i)=>{const p=tot?Math.round(counts[i]/tot*100):0;const voters=[...R.entries()].filter(([u,x])=>x.o===i).map(([u])=>u);return `<button class="gpo${my&&my.o===i?" sel":""}" data-gvote="${m.id}" data-o="${i}"><span class="gpo-bar" style="width:${p}%"></span><span class="gpo-t">${esc(o)}</span><span class="gpo-v">${voters.slice(0,4).map(u=>gcAv(u,"xs")).join("")}<b>${tot?p+"%":""}</b></span></button>`;}).join("")}<div class="gc-foot">${tot} of ${n} voted${my?" · tap to change":""}</div></div>`;}
  case "qa":{const my=R.get(GC_USER.id);const quiz=Array.isArray(d.o)&&d.o.length>1;
    if(quiz){const counts=d.o.map((_,i)=>[...R.values()].filter(x=>x.o===i).length);const tot=R.size;const right=counts[d.a]||0;
      return `<div class="gcard gqa"><div class="gc-k">❓ Quiz question</div><h4>${esc(d.q)}</h4>${d.o.map((o,i)=>{const cls=my?(i===d.a?"ok":my.o===i?"no":""):"";const p=tot?Math.round(counts[i]/tot*100):0;return `<button class="gpo ${cls}" ${my?"disabled":`data-gqa="${m.id}" data-o="${i}"`}>${my?`<span class="gpo-bar" style="width:${p}%"></span>`:""}<span class="gpo-t">${my&&i===d.a?"✓ ":my&&my.o===i?"✗ ":""}${esc(o)}</span>${my?`<span class="gpo-v"><b>${p}%</b></span>`:""}</button>`;}).join("")}
       ${my?`${d.why?`<p class="gc-why">${gcText(d.why)}</p>`:""}<div class="gc-foot">${right} of ${tot} answered correctly${my.o===d.a?" · you got it 🎉":""}</div>`:`<div class="gc-foot">${tot} answered · answer to see results</div>`}</div>`;}
    const answers=[...R.entries()];
    return `<div class="gcard gqa"><div class="gc-k">💬 Q&amp;A</div><h4>${esc(d.q)}</h4>${my?`<div class="gqa-ans">${answers.map(([u,x])=>`<div class="gqa-a">${gcAv(u,"xs")}<div><b>${esc(gcName(u))}</b><p>${gcText(x.t||"")}</p></div></div>`).join("")}</div>`:`<div class="gqa-in"><textarea rows="2" maxlength="600" placeholder="Your answer (shared with the group)" data-gqat="${m.id}"></textarea><button class="btn primary" data-gqasend="${m.id}">Answer</button></div><div class="gc-foot">${answers.length} answered · answer to see everyone's</div>`}</div>`;}
  case "study":return wsCardHTML(m);
  case "stats":{if(d.type==="streak")return `<div class="gcard gstreak"><div class="gc-k">🔥 Milestone</div><h4>${esc(gcName(m.user_id))} reached a ${d.n}-day reading streak!</h4><p class="muted">${esc(STREAK_TITLES[d.n]||"")}</p></div>`;
    const rows=(d.rows||[]);const mx=Math.max(1,...rows.map(r=>r.pts||0));
    return `<div class="gcard gstats"><div class="gc-k">📈 Group stats · ${esc(d.week||"")}</div><div class="gs-big"><div><b>${d.readings||0}</b><span>days of reading this week</span></div><div><b>${d.complete||0}%</b><span>challenge done</span></div><div><b>${d.top||0}</b><span>longest streak</span></div></div>${rows.map(r=>`<div class="gs-row"><span>${esc(r.a)} ${esc(r.n)}</span><span class="gs-bar"><i style="width:${(r.pts||0)/mx*100}%"></i></span><span>${r.pts} pts · 🔥${r.s}</span></div>`).join("")}</div>`;}
  case "challenge":{const C=d.custom||GC_CHALLENGES[d.idx]||GC_CHALLENGES[0];const isNow=d.custom?G.challenge===-m.id:G.challenge===d.idx;const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);return `<div class="gcard gchal"><div class="gc-k">🏆 ${d.custom?(isNow?"This week's challenge · made by "+esc(gcName(m.user_id)):"Challenge idea from "+esc(gcName(m.user_id))):"This week's challenge"}</div><h4>${esc(C.t)}</h4>${C.v&&C.v[0]?`<p class="gc-why">“${esc(C.v[0])}”${C.v[1]?` (${esc(C.v[1])})`:""}</p>`:""}<ol>${C.tasks.map(t=>`<li>${esc(t[0])}</li>`).join("")}</ol>${isNow?`<button class="btn primary" data-gtab="challenge">Open the challenge</button>`:admin&&d.custom?`<button class="btn primary" data-gusechal="${m.id}">Use as this week's challenge</button>`:""}</div>`;}
  }
  return `<div class="gm-t">${gcText(m.body)}</div>`;
}

// ---------- challenge & members ----------
function gcPoints(uid){const C=gcChal();const mine=G.checkins.filter(c=>c.user_id===uid);return mine.length*10+(mine.length===C.tasks.length?20:0);}
function gcChallengeHTML(){
  const C=gcChal();const [mon,sun]=gcWeekBounds();const end=new Date(sun+"T23:59:59");const left=Math.max(0,Math.ceil((end-new Date())/864e5));
  const mine=new Set(G.checkins.filter(c=>c.user_id===GC_USER.id).map(c=>c.task));
  const board=[...G.members.values()].map(m=>({u:m.user_id,p:gcPoints(m.user_id),s:gcStreakOf(m.user_id)})).sort((a,b)=>b.p-a.p||b.s-a.s);
  const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);
  const medal=i=>["🥇","🥈","🥉"][i]||`${i+1}.`;
  return `<div class="gchal-h"><div class="gc-k">Week ${esc(G.week.split("-W")[1])} · ${left} day${left===1?"":"s"} left</div><h2>${esc(C.t)}</h2>${C.v&&C.v[0]?`<p class="gc-why">“${esc(C.v[0])}”${C.v[1]?` <span>(${esc(C.v[1])})</span>`:""}</p>`:""}${C.c?`<span class="gc-cat">${esc(C.c)}</span>`:""}</div>
   <div class="gtasks">${C.tasks.map((t,i)=>{const who=G.checkins.filter(c=>c.task===i).map(c=>c.user_id);return `<div class="gtask${mine.has(i)?" on":""}"><label class="done-tick${mine.has(i)?" on":""}"><input type="checkbox" data-gtask="${i}" ${mine.has(i)?"checked":""}><span class="dt-box" aria-hidden="true"></span><span class="sr">Done</span></label><div class="gt-t">${esc(t[0])}${t[1]?` <a href="${t[1]}">Go →</a>`:""}<div class="gc-avs">${who.map(u=>gcAv(u,"xs")).join("")}</div></div><span class="gt-p">+10</span></div>`;}).join("")}
    <p class="muted ui" style="font-size:.78rem;margin:8px 2px 0">Tick what you've done (honour system). Finish all ${C.tasks.length} for a +20 bonus. A new challenge starts every Monday.</p></div>
   <h3 style="margin-top:22px">Leaderboard</h3><div class="gboard">${board.map((b,i)=>`<div class="gb-row${b.u===GC_USER.id?" me":""}"><span class="gb-m">${medal(i)}</span>${gcAv(b.u)}<span class="gb-n">${esc(gcName(b.u))}</span><span class="gb-s">🔥${b.s}</span><b>${b.p}</b></div>`).join("")}</div>
   <div class="row" style="gap:8px;margin-top:16px">${admin?`<button class="btn primary" data-gpickchal>Change this week's challenge</button>`:""}<button class="btn" data-gmakechal>Create your own challenge</button></div>`;
}
function gcGroupStats(){
  const [mon,sun]=gcWeekBounds();const C=gcChal();
  let readings=0;G.logs.forEach(set=>set.forEach(d=>{if(d>=mon&&d<=sun)readings++;}));
  const rows=[...G.members.values()].map(m=>({n:m.display_name,a:m.avatar,pts:gcPoints(m.user_id),s:gcStreakOf(m.user_id)})).sort((a,b)=>b.pts-a.pts);
  const complete=Math.round(G.checkins.length/Math.max(1,G.members.size*C.tasks.length)*100);
  return {type:"week",week:"Week "+G.week.split("-W")[1],readings,complete,top:Math.max(0,...rows.map(r=>r.s)),rows};
}
function gcMembersHTML(){
  const st=gcGroupStats();const me=G.members.get(GC_USER.id)||{};const admin=["owner","admin"].includes(me.role);
  const list=[...G.members.values()].sort((a,b)=>gcStreakOf(b.user_id)-gcStreakOf(a.user_id));
  return `<div class="gs-big gs-panel"><div><b>${st.readings}</b><span>days of reading this week</span></div><div><b>${st.complete}%</b><span>of the challenge done</span></div><div><b>${st.top}</b><span>longest streak</span></div></div>
   <div class="gmembers">${list.map(m=>{const s=gcStreakOf(m.user_id);const today=(G.logs.get(m.user_id)||new Set()).has(isoDay(new Date()));return `<div class="gmem">${gcAv(m.user_id)}<div class="gm-i"><strong>${esc(m.display_name)}${m.user_id===GC_USER.id?" (you)":""}</strong><span class="muted">${m.role!=="member"?esc(m.role)+" · ":""}${(m.stats&&m.stats.lessons)||0} lessons completed</span></div><span class="gm-s${today?" lit":""}" title="${today?"Read today":"Not yet today"}">${today?"🔥":"🕯️"} ${s}</span>${admin&&m.user_id!==GC_USER.id&&m.role!=="owner"?`<button class="ghost" data-gkick="${m.user_id}" aria-label="Remove ${esc(m.display_name)}">✕</button>`:""}</div>`;}).join("")}</div>
   ${G.group.description?`<p class="muted" style="margin-top:16px">${esc(G.group.description)}</p>`:""}
   <div class="invite-box"><div><div class="label">Invite code</div><div class="invite-code sm">${esc(G.group.invite_code)}</div></div><button class="btn primary" data-ginvite>Invite</button></div>
   <div class="row" style="gap:8px;margin-top:18px">${me.role==="owner"?`<button class="btn" data-gedit>Edit group</button><button class="ghost" data-gdel>Delete group</button>`:`<button class="ghost" data-gleave>Leave group</button>`}</div>`;
}

// ---------- group interactions ----------
document.addEventListener("click",async e=>{
  if(!G||$("#v-group").hidden&&!e.target.closest("#sheet"))return;
  const t=e.target;let b;
  if(b=t.closest("[data-gtab]")){gcTab(b.dataset.gtab);return;}
  if(t.closest("[data-ginvite]")){gcInviteSheet(G.group);return;}
  if(t.closest("[data-gmore]")){const c=$("#gchat");const h=c.scrollHeight;await gcLoadMessages(G.msgs[0]&&G.msgs[0].created_at);gcTab("chat");return;}
  if(b=t.closest("[data-gtask]")){return;}
  if(b=t.closest("[data-gvote]")){const id=+b.dataset.gvote,o=+b.dataset.o;const cur=(G.resp.get(id)||new Map()).get(GC_USER.id);
    if(cur&&cur.o===o){await GC.from("responses").delete().eq("message_id",id).eq("user_id",GC_USER.id);G.resp.get(id).delete(GC_USER.id);}
    else{const {error}=await GC.from("responses").upsert({message_id:id,user_id:GC_USER.id,group_id:G.id,value:{o}});if(error)return gcErr(error);if(!G.resp.has(id))G.resp.set(id,new Map());G.resp.get(id).set(GC_USER.id,{o});}
    gcRerender(id);return;}
  if(b=t.closest("[data-gqa]")){const id=+b.dataset.gqa,o=+b.dataset.o;const {error}=await GC.from("responses").upsert({message_id:id,user_id:GC_USER.id,group_id:G.id,value:{o}});if(error)return gcErr(error);if(!G.resp.has(id))G.resp.set(id,new Map());G.resp.get(id).set(GC_USER.id,{o});gcRerender(id);const m=G.msgs.find(x=>x.id===id);if(m&&m.data.a===o){toast("Correct! 🎉");}return;}
  if(b=t.closest("[data-gqasend]")){const id=+b.dataset.gqasend;const ta=document.querySelector(`[data-gqat="${id}"]`);const v=ta.value.trim();if(!v)return;const {error}=await GC.from("responses").upsert({message_id:id,user_id:GC_USER.id,group_id:G.id,value:{t:v}});if(error)return gcErr(error);if(!G.resp.has(id))G.resp.set(id,new Map());G.resp.get(id).set(GC_USER.id,{t:v});gcRerender(id);return;}
  if(b=t.closest("[data-gstudy]")){gcStudy(+b.dataset.gstudy);return;}
  if(b=t.closest("[data-grx]")){gcReact(+b.dataset.grx,b.dataset.e);return;}
  if(b=t.closest("[data-gmenu]")){const id=+b.dataset.gmenu;const m=G.msgs.find(x=>x.id===id);const mine=m&&m.user_id===GC_USER.id;const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);
    openSheet(`<div class="react-row">${GC_REACTS.map(x=>`<button data-gr="${x}">${x}</button>`).join("")}</div><div class="sheet-acts">${m&&m.kind==="text"?`<button data-gcopy>Copy</button>`:""}${mine||admin?`<button data-gdelm>Delete</button>`:""}<button data-sheetx>Close</button></div>`,r=>{
      r.querySelectorAll("[data-gr]").forEach(x=>x.onclick=()=>{closeSheet();gcReact(id,x.dataset.gr);});
      const c=r.querySelector("[data-gcopy]");c&&(c.onclick=()=>{navigator.clipboard?.writeText(m.body).then(()=>toast("Copied"));closeSheet();});
      const d=r.querySelector("[data-gdelm]");d&&(d.onclick=async()=>{closeSheet();const {error}=await GC.from("messages").delete().eq("id",id);if(error)return gcErr(error);G.msgs=G.msgs.filter(x=>x.id!==id);document.querySelector(`[data-mid="${id}"]`)?.remove();});},"Message");return;}
  if(t.closest("[data-gattach]")){gcAttachSheet();return;}
  if(t.closest("[data-gsticker]")){gcStickerSheet();return;}
  if(t.closest("[data-gpostchal]")){gcSend("challenge","",{idx:G.challenge});return;}
  if(t.closest("[data-gpoststats]")){gcSend("stats","",gcGroupStats());return;}
  if(t.closest("[data-gpickchal]")){let cat="All";const draw=r=>{const list=GC_CHALLENGES.map((c,i)=>[c,i]).filter(([c])=>cat==="All"||c.c===cat);r.querySelector(".pick-list").innerHTML=list.map(([c,i])=>`<button data-gpc="${i}" aria-pressed="${i===G.challenge}"><strong>${esc(c.t)}</strong><span class="muted">${esc(c.c)} · ${c.tasks.length} tasks</span></button>`).join("");
      r.querySelectorAll("[data-gpc]").forEach(x=>x.onclick=async()=>{const idx=+x.dataset.gpc;const {error}=await GC.from("group_weeks").upsert({group_id:G.id,week:G.week,challenge:idx});if(error)return gcErr(error);G.challenge=idx;G.custom=null;closeSheet();await gcLoadCheckins();gcTab("challenge");gcSend("challenge","",{idx});});};
    openSheet(`<h2 class="sheet-t">This week's challenge</h2><div class="chips-row">${["All",...GC_CHAL_CATS].map(c=>`<button class="chip" data-gcat="${c}" aria-pressed="${c==="All"}">${c}</button>`).join("")}</div><div class="pick-list"></div><div class="sheet-acts"><button class="primary" data-gmakechal>＋ Create your own</button><button data-gshufchal>🎲 Surprise me</button><button data-sheetx>Close</button></div>`,r=>{
      draw(r);r.querySelectorAll("[data-gcat]").forEach(x=>x.onclick=()=>{cat=x.dataset.gcat;r.querySelectorAll("[data-gcat]").forEach(y=>y.setAttribute("aria-pressed",y===x));draw(r);});
      r.querySelector("[data-gshufchal]").onclick=()=>{const opts=[...r.querySelectorAll("[data-gpc]")].filter(x=>+x.dataset.gpc!==G.challenge);if(opts.length)opts[Math.random()*opts.length|0].click();};},"Challenges");return;}
  if(t.closest("[data-gmakechal]")){gcMakeChallenge();return;}
  if(b=t.closest("[data-gusechal]")){const id=+b.dataset.gusechal;const m=G.msgs.find(x=>x.id===id);const {error}=await GC.from("group_weeks").upsert({group_id:G.id,week:G.week,challenge:-id});if(error)return gcErr(error);G.challenge=-id;G.custom=m.data.custom;await gcLoadCheckins();toast("This week's challenge is set 🏆");gcRerender(id);gcTab("challenge");return;}
  if(b=t.closest("[data-gkick]")){if(!confirmInline(b,"Remove?"))return;const {error}=await GC.from("group_members").delete().eq("group_id",G.id).eq("user_id",b.dataset.gkick);if(error)return gcErr(error);G.members.delete(b.dataset.gkick);gcTab("members");return;}
  if(b=t.closest("[data-gleave]")){if(!confirmInline(b,"Tap again to leave"))return;await GC.from("group_members").delete().eq("group_id",G.id).eq("user_id",GC_USER.id);G=null;location.hash="#groups";return;}
  if(b=t.closest("[data-gdel]")){if(!confirmInline(b,"Tap again to delete for everyone"))return;const {error}=await GC.from("groups").delete().eq("id",G.id);if(error)return gcErr(error);G=null;location.hash="#groups";return;}
  if(t.closest("[data-gedit]")){let em=G.group.emoji;openSheet(`<h2 class="sheet-t">Edit group</h2><label class="label" for="ge-n">Name</label><input id="ge-n" maxlength="60" value="${esc(G.group.name)}"><label class="label">Icon</label><div class="emo-grid">${GC_EMOJI.map(x=>`<button data-ge="${x}" aria-pressed="${x===em}">${x}</button>`).join("")}</div><label class="label" for="ge-d">Description</label><textarea id="ge-d" rows="2" maxlength="300">${esc(G.group.description)}</textarea><div class="sheet-acts"><button class="primary" data-gesave>Save</button><button data-sheetx>Cancel</button></div>`,r=>{
      r.querySelectorAll("[data-ge]").forEach(x=>x.onclick=()=>{em=x.dataset.ge;r.querySelectorAll("[data-ge]").forEach(y=>y.setAttribute("aria-pressed",y===x));});
      r.querySelector("[data-gesave]").onclick=async()=>{const up={name:r.querySelector("#ge-n").value.trim()||G.group.name,emoji:em,description:r.querySelector("#ge-d").value.trim()};const {error}=await GC.from("groups").update(up).eq("id",G.id);if(error)return gcErr(error);Object.assign(G.group,up);closeSheet();renderGroup(G.id);};},"Edit group");return;}
});
document.addEventListener("change",async e=>{const c=e.target.closest("input[data-gtask]");if(!c||!G)return;const task=+c.dataset.gtask;
  if(c.checked){const {error}=await GC.from("checkins").insert({group_id:G.id,week:gcWkey(),user_id:GC_USER.id,task});if(error&&!/duplicate/i.test(error.message)){c.checked=false;return gcErr(error);}if(!G.checkins.some(x=>x.user_id===GC_USER.id&&x.task===task))G.checkins.push({user_id:GC_USER.id,task});
    const C=gcChal();const n=G.checkins.filter(x=>x.user_id===GC_USER.id).length;if(n===C.tasks.length){toast("Challenge complete! +20 bonus 🏆");const cv=document.createElement("canvas");cv.className="confetti-cv";document.body.append(cv);confetti(cv);setTimeout(()=>cv.remove(),3500);gcSend("text",`🏆 I finished this week's challenge: ${C.t}!`);}else toast("+10 points");}
  else{await GC.from("checkins").delete().eq("group_id",G.id).eq("week",gcWkey()).eq("user_id",GC_USER.id).eq("task",task);G.checkins=G.checkins.filter(x=>!(x.user_id===GC_USER.id&&x.task===task));}
  gcTab("challenge");});
function gcMakeChallenge(){
  const admin=["owner","admin"].includes((G.members.get(GC_USER.id)||{}).role);
  openSheet(`<h2 class="sheet-t">Create a challenge</h2><label class="label" for="mc-t">Name</label><input id="mc-t" maxlength="60" placeholder="e.g. Exam-week faithfulness">
   <label class="label" for="mc-v">Verse or motto (optional)</label><input id="mc-v" maxlength="160" placeholder="e.g. I can do all things in him who strengtheneth me (Phil 4:13)">
   <label class="label">Tasks (2 to 8, each worth 10 points)</label><div id="mc-l">${[1,2,3].map(i=>`<input class="mc-i" maxlength="120" placeholder="Task ${i}">`).join("")}</div><button class="linklike" data-mcadd>＋ Add task</button>
   <p class="muted ui" style="font-size:.78rem">${admin?"It becomes this week's challenge for the whole group.":"It's posted in the chat as a suggestion; a group admin can make it this week's challenge."}</p>
   <div class="sheet-acts"><button class="primary" data-mcgo>${admin?"Start this challenge":"Suggest it"}</button><button data-sheetx>Cancel</button></div>`,r=>{
   r.querySelector("[data-mcadd]").onclick=()=>{const l=r.querySelector("#mc-l");if(l.children.length<8)l.insertAdjacentHTML("beforeend",`<input class="mc-i" maxlength="120" placeholder="Task ${l.children.length+1}">`);};
   r.querySelector("[data-mcgo]").onclick=async()=>{const t=r.querySelector("#mc-t").value.trim();const tasks=[...r.querySelectorAll(".mc-i")].map(x=>x.value.trim()).filter(Boolean).map(x=>[x,null]);if(!t||tasks.length<2){toast("Give it a name and at least two tasks");return;}
     const raw=r.querySelector("#mc-v").value.trim();const mm=raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);const custom={t,v:raw?(mm?[mm[1],mm[2]]:[raw,""]):["",""],tasks,c:"Custom"};closeSheet();
     const m=await gcSend("challenge","",{custom});if(!m)return;
     if(admin){const {error}=await GC.from("group_weeks").upsert({group_id:G.id,week:G.week,challenge:-m.id});if(error)return gcErr(error);G.challenge=-m.id;G.custom=custom;await gcLoadCheckins();gcRerender(m.id);gcTab("challenge");toast("Challenge started 🏆");}};},"Create a challenge");
}
function confirmInline(b,msg){if(b.dataset.armed){return true;}b.dataset.armed=1;const o=b.textContent;b.textContent=msg;setTimeout(()=>{delete b.dataset.armed;b.textContent=o;},3000);return false;}
async function gcReact(id,emo){const mine=(G.reacts.get(id)||[]).some(r=>r.user_id===GC_USER.id&&r.emoji===emo);
  if(mine){await GC.from("reactions").delete().eq("message_id",id).eq("user_id",GC_USER.id).eq("emoji",emo);G.reacts.set(id,(G.reacts.get(id)||[]).filter(r=>!(r.user_id===GC_USER.id&&r.emoji===emo)));}
  else{const {error}=await GC.from("reactions").insert({message_id:id,user_id:GC_USER.id,group_id:G.id,emoji:emo});if(error&&!/duplicate/i.test(error.message))return gcErr(error);const a=G.reacts.get(id)||[];a.push({message_id:id,user_id:GC_USER.id,emoji:emo});G.reacts.set(id,a);}
  gcRerender(id);}

// ---------- composer sheets ----------
function gcAttachSheet(){
  openSheet(`<h2 class="sheet-t">Share in the group</h2><div class="att-grid">
   <button data-at="verse"><span>📖</span>Verse</button><button data-at="lesson"><span>🎓</span>Course or lesson</button><button data-at="poll"><span>📊</span>Poll</button>
   <button data-at="quiz"><span>❓</span>Quiz question</button><button data-at="qa"><span>💬</span>Open Q&amp;A</button><button data-at="study"><span>🧭</span>Mini-study</button>
   <button data-at="sticker"><span>🙂</span>Sticker</button><button data-at="stats"><span>📈</span>Group stats</button><button data-at="challenge"><span>🏆</span>Challenge</button></div>`,r=>{
   r.querySelectorAll("[data-at]").forEach(b=>b.onclick=()=>{const k=b.dataset.at;
     if(k==="verse")gcVerseSheet();else if(k==="lesson")gcLessonSheet();else if(k==="poll")gcPollSheet();else if(k==="quiz")gcQuizSheet(true);else if(k==="qa")gcQuizSheet(false);else if(k==="study")gcStudySheet();else if(k==="sticker")gcStickerSheet();
     else if(k==="stats"){closeSheet();gcSend("stats","",gcGroupStats());}else if(k==="challenge"){closeSheet();gcSend("challenge","",{idx:G.challenge});}});},"Share");
}
// verse reference parser: "John 3:16", "1 Cor 13:4-7", "Ps 22:1"
function gcParseRef(s){
  const m=String(s).trim().match(/^((?:[1-4]\s*)?[A-Za-z][A-Za-z .]*?)\s*(\d+)\s*[:.]\s*(\d+)(?:\s*[-–]\s*(\d+))?$/);if(!m)return null;
  const q=m[1].toLowerCase().replace(/[^a-z0-9]/g,"");
  const b=BIBLE_INDEX.find(x=>{const n=x.name.toLowerCase().replace(/[^a-z0-9]/g,""),d=(x.dr||"").toLowerCase().replace(/[^a-z0-9]/g,"");return n===q||d===q||(q.length>=2&&(n.startsWith(q)||d.startsWith(q)));});
  if(!b)return null;const v1=+m[3],v2=+(m[4]||m[3]);return {slug:b.slug,name:b.name,ch:+m[2],v:v1,v2:Math.max(v1,Math.min(v2,v1+20))};
}
async function gcVerseText(r){const B=await loadBook(r.slug);const c=B.chapters.find(x=>x.n===r.ch);if(!c)return null;const vs=c.verses.filter(x=>x[0]>=r.v&&x[0]<=r.v2);if(!vs.length)return null;return vs.map(x=>x[1]).join(" ");}
function gcVerseSheet(pre){
  openSheet(`<h2 class="sheet-t">Share a verse</h2><label class="label" for="gv-r">Reference</label><input id="gv-r" placeholder="e.g. John 3:16 or Ps 22:1-4" value="${esc(pre||"")}"><div id="gv-p" class="gv-prev muted">Type a reference to see the text.</div>
   <label class="label" for="gv-n">Add a thought (optional)</label><textarea id="gv-n" rows="2" maxlength="1000"></textarea><div class="sheet-acts"><button class="primary" data-gvsend disabled>Send</button><button data-sheetx>Cancel</button></div>`,r=>{
   const inp=r.querySelector("#gv-r"),pv=r.querySelector("#gv-p"),sb=r.querySelector("[data-gvsend]");let cur=null,txt="";
   const look=async()=>{cur=gcParseRef(inp.value);if(!cur){pv.textContent="Type a reference like John 3:16";sb.disabled=true;return;}txt=await gcVerseText(cur).catch(()=>null);if(!txt){pv.textContent="That verse was not found.";sb.disabled=true;return;}pv.innerHTML=`<strong>${esc(cur.name)} ${cur.ch}:${cur.v}${cur.v2>cur.v?"–"+cur.v2:""}</strong> ${esc(txt)}`;sb.disabled=false;};
   let tm;inp.oninput=()=>{clearTimeout(tm);tm=setTimeout(look,250);};if(pre)look();
   sb.onclick=async()=>{closeSheet();await gcSend("verse",r.querySelector("#gv-n").value.trim(),{slug:cur.slug,ch:cur.ch,v:cur.v,ref:`${cur.name} ${cur.ch}:${cur.v}${cur.v2>cur.v?"–"+cur.v2:""}`,text:txt});};},"Verse");
}
function gcLessonSheet(){
  const mods=YEARS.flatMap(y=>y.mods).filter(m=>m[3]&&LESSONS[m[3]]);
  openSheet(`<h2 class="sheet-t">Share a course or lesson</h2><input id="gl-q" placeholder="Search lessons and courses" aria-label="Search"><div class="pick-list" id="gl-l"></div><div class="sheet-acts"><button data-sheetx>Close</button></div>`,r=>{
   const q=r.querySelector("#gl-q"),l=r.querySelector("#gl-l");
   const draw=()=>{const s=q.value.trim().toLowerCase();const mm=mods.filter(m=>!s||(m[0]+" "+m[1]).toLowerCase().includes(s)).slice(0,12);const ll=Object.values(LESSONS).filter(L=>s&&(L.title+" "+(L.code||"")).toLowerCase().includes(s)).slice(0,25);
     l.innerHTML=`${mm.map(m=>`<button data-glm="${m[3]}" data-c="${esc(m[0])}" data-t="${esc(m[1])}"><strong>🎓 ${esc(m[0])} · ${esc(m[1])}</strong><span class="muted">Course · ${modLessons(m[3]).length} lessons</span></button>`).join("")}${ll.map(L=>`<button data-gll="${L.id}"><strong>${esc(L.code||"")}</strong><span>${esc(L.title)}</span></button>`).join("")}`;
     l.querySelectorAll("[data-glm]").forEach(b=>b.onclick=()=>{closeSheet();gcSend("lesson","",{mod:b.dataset.glm,code:b.dataset.c,title:b.dataset.t});});
     l.querySelectorAll("[data-gll]").forEach(b=>b.onclick=()=>{const L=LESSONS[b.dataset.gll];closeSheet();gcSend("lesson","",{id:L.id,code:L.code||"",title:L.title});});};
   q.oninput=draw;draw();},"Course");
}
function gcPollSheet(){
  openSheet(`<h2 class="sheet-t">Create a poll</h2><label class="label" for="gp-q">Question</label><input id="gp-q" maxlength="200" placeholder="e.g. Which day suits us for a study call?"><label class="label">Options</label><div id="gp-o">${[1,2,3].map(i=>`<input class="gp-o" maxlength="80" placeholder="Option ${i}">`).join("")}</div><button class="linklike" data-gpadd>＋ Add option</button>
   <div class="sheet-acts"><button class="primary" data-gpsend>Send poll</button><button data-sheetx>Cancel</button></div>`,r=>{
   r.querySelector("[data-gpadd]").onclick=()=>{const w=r.querySelector("#gp-o");if(w.children.length<8)w.insertAdjacentHTML("beforeend",`<input class="gp-o" maxlength="80" placeholder="Option ${w.children.length+1}">`);};
   r.querySelector("[data-gpsend]").onclick=()=>{const q=r.querySelector("#gp-q").value.trim();const o=[...r.querySelectorAll(".gp-o")].map(x=>x.value.trim()).filter(Boolean);if(!q||o.length<2){toast("Add a question and at least two options");return;}closeSheet();gcSend("poll","",{q,o});};},"Poll");
}
function gcQuizSheet(quiz){
  openSheet(`<h2 class="sheet-t">${quiz?"Quiz question":"Open Q&amp;A"}</h2><label class="label" for="gq-q">Question</label><textarea id="gq-q" rows="2" maxlength="300" placeholder="${quiz?"e.g. Who wrote the Golden Chain (Catena aurea)?":"e.g. What verse has helped you most this year?"}"></textarea>
   ${quiz?`<label class="label">Answers (tick the right one)</label><div id="gq-o">${[0,1,2,3].map(i=>`<div class="gq-row"><input type="radio" name="gq-a" value="${i}" ${i===0?"checked":""} aria-label="Correct answer"><input class="gq-o" maxlength="120" placeholder="Answer ${i+1}"></div>`).join("")}</div><label class="label" for="gq-w">Explanation shown after answering (optional)</label><textarea id="gq-w" rows="2" maxlength="500"></textarea>`:`<p class="muted">Everyone's answers are revealed to each person once they have answered.</p>`}
   <div class="sheet-acts"><button class="primary" data-gqsend>Send</button><button data-sheetx>Cancel</button></div>`,r=>{
   r.querySelector("[data-gqsend]").onclick=()=>{const q=r.querySelector("#gq-q").value.trim();if(!q){toast("Write the question");return;}
     if(!quiz){closeSheet();gcSend("qa","",{q});return;}
     const rows=[...r.querySelectorAll(".gq-row")].map(x=>({t:x.querySelector(".gq-o").value.trim(),c:x.querySelector("input[type=radio]").checked})).filter(x=>x.t);if(rows.length<2||!rows.some(x=>x.c)){toast("Add at least two answers and tick the right one (it must have text)");return;}
     closeSheet();gcSend("qa","",{q,o:rows.map(x=>x.t),a:rows.findIndex(x=>x.c),why:r.querySelector("#gq-w").value.trim()});};},"Quiz");
}
function gcStudySheet(){
  openSheet(`<h2 class="sheet-t">Start a mini-study</h2><p class="muted" style="margin-top:0">Everyone works through the steps on their own phone; answers, polls and reflections are pooled for the group.</p><div class="pick-list">${GC_STUDIES.map(s=>`<button data-gss="${s.id}"><strong>${esc(s.e)} ${esc(s.t)}</strong><span class="muted">${esc(s.d)} · ${s.steps.length} steps</span></button>`).join("")}</div><div class="sheet-acts"><button data-sheetx>Close</button></div>`,r=>{
   r.querySelectorAll("[data-gss]").forEach(b=>b.onclick=()=>{closeSheet();gcSend("study","",{id:b.dataset.gss});});},"Mini-study");
}
// stickers: built-in emoji + your own images
async function gcStickerSheet(){
  const {data:mine}=await GC.from("stickers").select("id,path").eq("user_id",GC_USER.id).order("created_at",{ascending:false});
  openSheet(`<h2 class="sheet-t">Stickers</h2><div class="stk-grid">${GC_STICKERS.map(x=>`<button data-gse="${x}">${x}</button>`).join("")}</div>
   <div class="label" style="margin-top:14px">My stickers</div><div class="stk-grid img">${(mine||[]).map(s=>`<button data-gsi="${esc(s.path)}" data-gsid="${s.id}"><img src="${esc(gcStickerUrl(s.path))}" alt="Sticker" loading="lazy"></button>`).join("")}<label class="stk-add" title="Add a sticker from your phone"><input type="file" accept="image/png,image/webp,image/gif,image/jpeg" hidden data-gsup><span>＋</span><small>Add from phone</small></label></div>
   <p class="muted ui" style="font-size:.75rem">Add stickers or images saved on your phone (PNG, WebP, GIF or JPEG). They're resized and kept in your sticker tray. Long-press a sticker of yours to remove it.</p>
   <div class="sheet-acts"><button data-sheetx>Close</button></div>`,r=>{
   r.querySelectorAll("[data-gse]").forEach(b=>b.onclick=()=>{closeSheet();gcSend("sticker","",{emoji:b.dataset.gse});});
   r.querySelectorAll("[data-gsi]").forEach(b=>{b.onclick=()=>{closeSheet();gcSend("sticker","",{path:b.dataset.gsi});};b.oncontextmenu=async ev=>{ev.preventDefault();await GC.storage.from("stickers").remove([b.dataset.gsi]);await GC.from("stickers").delete().eq("id",b.dataset.gsid);b.remove();toast("Sticker removed");};});
   r.querySelector("[data-gsup]").onchange=async ev=>{const f=ev.target.files[0];if(!f)return;try{toast("Adding sticker…");const path=await gcUploadSticker(f);closeSheet();await gcSend("sticker","",{path});}catch(err){gcErr(err);}};},"Stickers");
}
async function gcUploadSticker(file){
  let blob=file,ext=(file.type.split("/")[1]||"png").replace("jpeg","jpg");
  if(file.type!=="image/gif"){
    const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error("That image could not be read"));i.src=URL.createObjectURL(file);});
    const sc=Math.min(1,512/Math.max(img.width,img.height));const cv=document.createElement("canvas");cv.width=Math.round(img.width*sc);cv.height=Math.round(img.height*sc);cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);
    blob=await new Promise(res=>cv.toBlob(res,"image/webp",.85));if(!blob||blob.type!=="image/webp"){blob=await new Promise(res=>cv.toBlob(res,"image/png"));ext="png";}else ext="webp";
  }
  if(blob.size>1048576)throw new Error("That image is too large (max 1 MB)");
  const path=`${GC_USER.id}/${crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random().toString(36).slice(2)}.${ext}`;
  const {error}=await GC.storage.from("stickers").upload(path,blob,{contentType:blob.type||"image/"+ext,upsert:false});if(error)throw error;
  await GC.from("stickers").insert({user_id:GC_USER.id,path});return path;
}

// ---------- mini-study player ----------
async function gcStudy(mid){
  const m=G.msgs.find(x=>x.id===mid);const ST=GC_STUDIES.find(s=>s.id===m.data.id);if(!ST)return;
  const R=G.resp.get(mid)||new Map();const my=JSON.parse(JSON.stringify(R.get(GC_USER.id)||{a:{},done:false}));my.a=my.a||{};
  let i=my.done?ST.steps.length:Math.min(Object.keys(my.a).length,ST.steps.length-1);
  const ov=document.createElement("div");ov.className="gstudy-ov";ov.setAttribute("role","dialog");ov.setAttribute("aria-label",ST.t);document.body.append(ov);document.body.classList.add("sheet-open");
  const close=()=>{ov.remove();document.body.classList.remove("sheet-open");gcRerender(mid);};
  const save=async(done)=>{my.done=!!done||my.done;const {error}=await GC.from("responses").upsert({message_id:mid,user_id:GC_USER.id,group_id:G.id,value:my});if(error)gcErr(error);if(!G.resp.has(mid))G.resp.set(mid,new Map());G.resp.get(mid).set(GC_USER.id,JSON.parse(JSON.stringify(my)));};
  const draw=async()=>{
    const dots=ST.steps.map((_,k)=>`<i class="${k<i?"on":k===i?"cur":""}"></i>`).join("");
    let body="";const s=ST.steps[i];
    if(i>=ST.steps.length){body=gcStudyResults(ST,mid);}
    else if(s.k==="read"){const txt=await gcVerseText({slug:s.book,ch:s.ch,v:s.from,v2:s.to}).catch(()=>null);const B=BIBLE_INDEX.find(b=>b.slug===s.book);body=`<div class="gs-k">Read</div><h3>${esc(B?B.name:s.book)} ${s.ch}:${s.from}–${s.to}</h3><div class="gs-read">${esc(txt||"")}</div><p class="muted ui" style="font-size:.75rem">Douay-Rheims</p>`;}
    else if(s.k==="quiz"){const a=my.a[i];body=`<div class="gs-k">Quiz</div><h3>${esc(s.q)}</h3>${s.o.map((o,k)=>`<button class="gpo ${a!=null?(k===s.a?"ok":a===k?"no":""):""}" ${a!=null?"disabled":`data-sa="${k}"`}><span class="gpo-t">${a!=null&&k===s.a?"✓ ":a===k&&a!==s.a?"✗ ":""}${esc(o)}</span></button>`).join("")}${a!=null?`<p class="gc-why">${a===s.a?"<strong>Correct!</strong> ":"<strong>Not quite.</strong> "}${esc(s.why||"")}</p>`:""}`;}
    else if(s.k==="poll"){const a=my.a[i];body=`<div class="gs-k">Poll</div><h3>${esc(s.q)}</h3>${s.o.map((o,k)=>`<button class="gpo${a===k?" sel":""}" data-sa="${k}"><span class="gpo-t">${esc(o)}</span></button>`).join("")}`;}
    else if(s.k==="reflect"){body=`<div class="gs-k">Reflect</div><h3>${esc(s.q)}</h3><textarea id="gs-t" rows="4" maxlength="800" placeholder="Your reflection (shared with the group)">${esc(my.a[i]||"")}</textarea>`;}
    const canNext=i>=ST.steps.length||!s||s.k==="read"||(s.k==="reflect")||my.a[i]!=null;
    ov.innerHTML=`<div class="gs-card"><div class="gs-head"><button class="gs-x" aria-label="Close">✕</button><div class="gs-t">${esc(ST.e)} ${esc(ST.t)}</div><div class="gs-dots">${dots}<i class="${i>=ST.steps.length?"cur":""}"></i></div></div><div class="gs-body">${body}</div>
     <div class="gs-foot">${i>0?`<button class="btn" data-sp>← Back</button>`:"<span></span>"}${i<ST.steps.length?`<button class="btn primary" data-sn ${canNext?"":"disabled"}>${i===ST.steps.length-1?"Finish":"Next →"}</button>`:`<button class="btn primary" data-sx>Done</button>`}</div></div>`;
    ov.querySelector(".gs-x").onclick=close;const dx=ov.querySelector("[data-sx]");dx&&(dx.onclick=close);
    ov.querySelectorAll("[data-sa]").forEach(b=>b.onclick=async()=>{my.a[i]=+b.dataset.sa;await save();draw();});
    const pb=ov.querySelector("[data-sp]");pb&&(pb.onclick=()=>{i--;draw();});
    const nb=ov.querySelector("[data-sn]");nb&&(nb.onclick=async()=>{const ta=ov.querySelector("#gs-t");if(ta){if(!ta.value.trim()){toast("Write a few words first");return;}my.a[i]=ta.value.trim();}if(s&&s.k==="read")my.a[i]=1;i++;await save(i>=ST.steps.length);if(i>=ST.steps.length){const cv=document.createElement("canvas");cv.className="confetti-cv";document.body.append(cv);confetti(cv);setTimeout(()=>cv.remove(),3500);}draw();});
  };
  draw();
}
function gcStudyResults(ST,mid){
  const R=G.resp.get(mid)||new Map();const all=[...R.entries()];
  return `<div class="gs-k">Group results</div><h3>${all.filter(([u,x])=>x.done).length} of ${G.members.size} finished</h3>${ST.steps.map((s,i)=>{
    if(s.k==="quiz"){const ans=all.filter(([u,x])=>x.a&&x.a[i]!=null);const ok=ans.filter(([u,x])=>x.a[i]===s.a).length;return `<div class="gs-res"><strong>${esc(s.q)}</strong><div class="gs-row"><span class="gs-bar"><i style="width:${ans.length?ok/ans.length*100:0}%"></i></span><span>${ok}/${ans.length} correct</span></div></div>`;}
    if(s.k==="poll"){const ans=all.filter(([u,x])=>x.a&&x.a[i]!=null);return `<div class="gs-res"><strong>${esc(s.q)}</strong>${s.o.map((o,k)=>{const n=ans.filter(([u,x])=>x.a[i]===k).length;return `<div class="gs-row"><span class="gs-l">${esc(o)}</span><span class="gs-bar"><i style="width:${ans.length?n/ans.length*100:0}%"></i></span><span>${n}</span></div>`;}).join("")}</div>`;}
    if(s.k==="reflect"){const ans=all.filter(([u,x])=>x.a&&typeof x.a[i]==="string");return `<div class="gs-res"><strong>${esc(s.q)}</strong>${ans.map(([u,x])=>`<div class="gqa-a">${gcAv(u,"xs")}<div><b>${esc(gcName(u))}</b><p>${esc(x.a[i])}</p></div></div>`).join("")||`<p class="muted">No reflections yet.</p>`}</div>`;}
    return "";}).join("")}`;
}

// ---------- send to a group from anywhere (verses, lessons, streaks) ----------
async function gcPickGroup(cb){
  if(!gcConfig()){toast("Groups are not switched on yet");return;}
  await gc();if(!GC_USER){location.hash="#groups";toast("Sign in to share with a group");return;}
  const {data:mem}=await GC.from("group_members").select("group_id").eq("user_id",GC_USER.id);const ids=(mem||[]).map(m=>m.group_id);
  if(!ids.length){toast("Create or join a group first");location.hash="#groups";return;}
  const {data:groups}=await GC.from("groups").select("id,name,emoji,invite_code,description").in("id",ids);
  openSheet(`<h2 class="sheet-t">Send to a group</h2><div class="pick-list">${groups.map(g=>`<button data-gpg="${g.id}"><strong>${esc(g.emoji)} ${esc(g.name)}</strong></button>`).join("")}</div><div class="sheet-acts"><button data-sheetx>Cancel</button></div>`,r=>{
   r.querySelectorAll("[data-gpg]").forEach(b=>b.onclick=async()=>{closeSheet();await cb(b.dataset.gpg);});},"Send to a group");
}
async function gcSendTo(gid,kind,body,data){const {error}=await GC.from("messages").insert({group_id:gid,user_id:GC_USER.id,kind,body:body||"",data:data||{}});if(error)return gcErr(error);toast("Sent to your group ✓");}
function gcShareStreak(info){gcPickGroup(gid=>gcSendTo(gid,"stats","",{type:"streak",n:info.streak}));}
function gcShareVerse(k,txt){const [s,c,v]=k.split("|");gcPickGroup(gid=>gcSendTo(gid,"verse","",{slug:s,ch:+c,v:+v,ref:refLabel(k),text:txt}));}
function gcShareLesson(id){const L=LESSONS[id];gcPickGroup(gid=>gcSendTo(gid,"lesson","",{id,code:L.code||"",title:L.title}));}
document.addEventListener("click",e=>{const b=e.target.closest("[data-gsend-lesson]");if(b){gcShareLesson(b.dataset.gsendLesson);}});

// signed-in users get their streak synced and the unread dot on load
if(gcConfig()&&localStorage.getItem("gc-auth"))gc().catch(()=>{});
