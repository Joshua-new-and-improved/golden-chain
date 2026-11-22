// ---------- Shared prayers: send a prayer to a group (from the library or your own words);
// members can pray it there and add it to their daily prayers ("My day") with one tap.
PR_CATS.mine="My prayers";
function spLoadMine(){Object.values(S.myPrayers||{}).forEach(p=>{if(!PRAYER_BY[p.id]){PRAYER_BY[p.id]=p;PRAYERS.push(p);}});}
spLoadMine();
function spPrayerOf(d){if(!d||!d.pr)return null;const x=d.pr;if(x.id&&PRAYER_BY[x.id])return PRAYER_BY[x.id];
  if(x.text)return {id:x.uid,cat:"mine",name:x.name||"A prayer",text:x.text,when:x.when||"",dur:Math.max(1,Math.round(x.text.join(" ").split(/\s+/).length/130)),meaning:"",origin:x.origin||""};return null;}
function spSaveMine(p,from){S.myPrayers=S.myPrayers||{};const id=p.id&&p.id.startsWith("u-")?p.id:"u-"+Date.now().toString(36);
  const o={id,cat:"mine",name:p.name,text:p.text,when:p.when||"When you choose",dur:p.dur||1,meaning:"<p>A prayer you saved"+(from?" from "+esc(from):"")+".</p>",origin:from?"Shared by "+from:"Your own prayer"};
  S.myPrayers[id]=o;if(!PRAYER_BY[id]){PRAYER_BY[id]=o;PRAYERS.push(o);}save();return id;}
// ---------- add to my day ----------
const SP_TIMES=[["06:30","Morning"],["12:00","Midday"],["18:00","Evening"],["21:30","Before bed"]];
function spAddSheet(p,from,onAdded){const has=(S.plan.items||[]).filter(i=>i.pid===p.id);
  openSheet(`<h2 class="sheet-t">➕ Add to my daily prayers</h2><p style="margin-top:0"><b>${esc(p.name)}</b>${has.length?`<br><span class="muted ui" style="font-size:.85rem">Already in your day at ${has.map(i=>esc(i.time)).join(", ")}</span>`:""}</p>
   <label>When</label><div class="chips-row sp-times">${SP_TIMES.map(([t,l],i)=>`<button type="button" class="chip${i===0?" on":""}" data-spt="${t}">${l} <span class="muted">${t}</span></button>`).join("")}</div>
   <input type="time" id="sp-time" value="06:30" style="width:auto;margin-top:6px">
   <label style="margin-top:10px">How often</label><div class="chips-row sp-rep">${[["daily","Every day"],["weekdays","Weekdays"],["dow","Once a week"]].map(([k,l],i)=>`<button type="button" class="chip${i===0?" on":""}" data-spr="${k}">${l}</button>`).join("")}</div>
   <select id="sp-dow" hidden style="width:auto;margin-top:6px">${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d,i)=>`<option value="${i}" ${i===new Date().getDay()?"selected":""}>${d}</option>`).join("")}</select>
   <div class="sheet-acts"><button class="btn primary" data-spadd>Add to my day</button></div>`,r=>{
   let rep="daily";const tm=r.querySelector("#sp-time"),dw=r.querySelector("#sp-dow");
   r.querySelectorAll("[data-spt]").forEach(b=>b.onclick=()=>{tm.value=b.dataset.spt;r.querySelectorAll("[data-spt]").forEach(x=>x.classList.toggle("on",x===b));});
   r.querySelectorAll("[data-spr]").forEach(b=>b.onclick=()=>{rep=b.dataset.spr;dw.hidden=rep!=="dow";r.querySelectorAll("[data-spr]").forEach(x=>x.classList.toggle("on",x===b));});
   r.querySelector("[data-spadd]").onclick=()=>{let pid=p.id;if(!PRAYER_BY[pid]||String(pid).startsWith("u-")&&!(S.myPrayers||{})[pid])pid=spSaveMine(p,from);
     S.plan=S.plan||{items:[],done:{}};S.plan.items.push({id:"i"+Date.now().toString(36),pid,time:tm.value||"06:30",rep,dow:+dw.value,date:ymd(new Date())});save();closeSheet();
     toast(`🙏 ${p.name} is in your day at ${tm.value}. Find it under Prayers → My day.`);onAdded&&onAdded();};},"Add prayer");}
// ---------- the card in the chat ----------
gcBodyHTML=(orig=>function(m){const d=m.data||{};if(m.kind!=="prayer"||!d.pr)return orig(m);const p=spPrayerOf(d);
  if(!p)return `<div class="gcard"><div class="gc-k">🙏 Prayer</div><p class="muted">This prayer isn't available on this device.</p></div>`;
  const R=G.resp.get(m.id)||new Map();const prayed=[...R.entries()].filter(([u,v])=>v&&v.p);const added=[...R.values()].filter(v=>v&&v.add).length;const me=R.get(GC_USER.id)||{};
  const inDay=(S.plan&&S.plan.items||[]).some(i=>i.pid===p.id||(d.pr.uid&&i.pid===((S.myPrayers||{})[d.pr.uid]||{}).id));
  return `<div class="gcard sp-card"><div class="gc-k">🙏 ${d.pr.text?"A prayer from "+esc(gcFirstName?gcFirstName(m.user_id):gcName(m.user_id)):"Prayer"}${p.when&&!d.pr.text?" · "+esc(PR_CATS[p.cat]||""):""}</div><h4>${esc(p.name)}</h4>
   ${d.note?`<p class="sp-note">${gcText(d.note)}</p>`:""}
   <details class="sp-text"${(p.text||[]).join(" ").length<260?" open":""}><summary>Pray it</summary><div>${(p.text||[]).map(l=>`<p>${esc(l)}</p>`).join("")}${p.link?`<p><a href="${p.link}" target="_blank" rel="noopener">Full text →</a></p>`:""}</div></details>
   ${prayed.length||added?`<div class="gp-prow">${prayed.length?`<span class="gp-avs">${prayed.slice(0,6).map(([u])=>gcAv(u,"xs")).join("")}</span><span class="muted">${prayed.length} prayed</span>`:""}${added?`<span class="muted">${prayed.length?"· ":""}${added} added it to their day</span>`:""}</div>`:""}
   <div class="gp-acts"><button class="btn${me.p?"":" primary"}" data-sppray="${m.id}">${me.p?"🙏 Prayed · again":"🙏 I prayed it"}</button><button class="btn" data-spadd="${m.id}">${inDay?"✓ In my day":"➕ Add to my daily prayers"}</button></div></div>`;})(gcBodyHTML);
waPreview=(orig=>function(m,mine){if(m&&m.kind==="prayer"&&m.data&&m.data.pr)return (mine?"You: ":"")+"🙏 Prayer: "+((m.data.pr.name)||"");return orig(m,mine);})(waPreview);
async function spRespond(id,patch){const cur=((G.resp.get(id)||new Map()).get(GC_USER.id))||{};const value={...cur,...patch};
  const {error}=await GC.from("responses").upsert({message_id:id,user_id:GC_USER.id,group_id:G.id,value});if(error)return gcErr(error);
  if(!G.resp.has(id))G.resp.set(id,new Map());G.resp.get(id).set(GC_USER.id,value);gcRerender(id);}
document.addEventListener("click",e=>{let b;if(!G)return;
  if(b=e.target.closest("[data-sppray]")){spRespond(+b.dataset.sppray,{p:1,at:new Date().toISOString()});toast("🙏 Amen");return;}
  if(b=e.target.closest("[data-spadd]")){const m=G.msgs.find(x=>x.id===+b.dataset.spadd);if(!m)return;const p=spPrayerOf(m.data);if(!p)return;
    spAddSheet(p,`${gcName(m.user_id)} in ${G.group.name}`,()=>{spRespond(m.id,{add:1});});return;}
});
// ---------- composing: share a prayer (library or your own words) ----------
function spShareSheet(send){const canPin=typeof gpCanPin==="function"&&gpCanPin();
  const pick=["before-study","our-father","morning-offering","st-michael","memorare","anima-christi","act-contrition","grace-meals","angelus","concede-mihi"];
  const rows=L=>L.map(p=>`<button class="sp-row" data-spp="${p.id}"><b>${esc(p.name)}</b><span class="muted">${esc(PR_CATS[p.cat]||"")}</span></button>`).join("");
  openSheet(`<h2 class="sheet-t">🙏 Share a prayer</h2><p class="muted ui" style="margin-top:0;font-size:.85rem">Everyone can pray it in the chat and add it to their daily prayers.</p>
   <button class="sp-own" data-spown>✍️ <b>Write your own prayer</b><span class="muted">e.g. your group's prayer before meetings</span></button>
   <input type="search" id="sp-q" placeholder="Search prayers" autocomplete="off">
   <div class="label" style="margin-top:10px" id="sp-lab">Popular for groups</div><div id="sp-list">${rows(pick.map(id=>PRAYER_BY[id]).filter(Boolean))}</div>`,r=>{
   const q=r.querySelector("#sp-q"),list=r.querySelector("#sp-list");
   const wire=()=>list.querySelectorAll("[data-spp]").forEach(b=>b.onclick=()=>spConfirm(PRAYER_BY[b.dataset.spp]));
   q.oninput=()=>{const s=q.value.trim().toLowerCase();r.querySelector("#sp-lab").textContent=s?"Results":"Popular for groups";
     list.innerHTML=rows(s?PRAYERS.filter(p=>(p.name+" "+(p.when||"")+" "+(p.text||[]).join(" ")).toLowerCase().includes(s)).slice(0,25):pick.map(id=>PRAYER_BY[id]).filter(Boolean))||`<p class="muted">No prayers found.</p>`;wire();};
   wire();r.querySelector("[data-spown]").onclick=()=>spOwn();},"Share a prayer");
  function spConfirm(p){openSheet(`<h2 class="sheet-t">🙏 ${esc(p.name)}</h2><div class="sp-prev">${(p.text||[]).slice(0,4).map(l=>`<p>${esc(l)}</p>`).join("")}${(p.text||[]).length>4?"<p>…</p>":""}</div>
     <label>Add a note <span class="muted">(optional)</span></label><input id="sp-note" maxlength="200" placeholder="${p.id==="before-study"?"e.g. Let's pray this before each study":"e.g. Let's pray this every morning this week"}">
     ${canPin?`<label class="ui gp-chk"><input type="checkbox" id="sp-pin"> Pin it at the top for a week</label>`:""}
     <div class="sheet-acts"><button class="btn primary" data-spsend>Send to the group</button></div>`,r=>{r.querySelector("[data-spsend]").onclick=()=>{const note=r.querySelector("#sp-note").value.trim();const pin=!!(r.querySelector("#sp-pin")||{}).checked;closeSheet();
       send(p.name,{pr:{id:p.id,name:p.name},note,pin});};},"Share");}
  function spOwn(){openSheet(`<h2 class="sheet-t">✍️ Your prayer</h2><label>Title</label><input id="sp-tt" maxlength="60" placeholder="e.g. Our group prayer">
     <label>The prayer</label><textarea id="sp-tx" rows="7" maxlength="2500" placeholder="Lord Jesus, as we gather…&#10;&#10;(Start a new line for each part.)"></textarea>
     <label>Note <span class="muted">(optional)</span></label><input id="sp-note" maxlength="200" placeholder="e.g. We'll pray this at the start of every meeting">
     ${canPin?`<label class="ui gp-chk"><input type="checkbox" id="sp-pin" checked> Pin it at the top for a week</label>`:""}
     <label class="ui gp-chk"><input type="checkbox" id="sp-keep" checked> Also save it to my prayers</label>
     <div class="sheet-acts"><button class="btn primary" data-spsend>Send to the group</button></div>`,r=>{setTimeout(()=>r.querySelector("#sp-tt").focus(),100);
     r.querySelector("[data-spsend]").onclick=()=>{const name=r.querySelector("#sp-tt").value.trim()||"Our prayer";const text=r.querySelector("#sp-tx").value.split(/\n+/).map(s=>s.trim()).filter(Boolean);if(!text.length)return r.querySelector("#sp-tx").focus();
       const uid="u-"+Date.now().toString(36);const pr={uid,name,text,when:"",origin:""};if(r.querySelector("#sp-keep").checked){S.myPrayers=S.myPrayers||{};spSaveMine({id:uid,name,text},"you");}
       const note=r.querySelector("#sp-note").value.trim();const pin=!!(r.querySelector("#sp-pin")||{}).checked;closeSheet();send(name,{pr,note,pin});};},"Your prayer");}
}
waAttItems=(orig=>function(){const a=orig();const i=a.findIndex(x=>x[0]==="prayer");a.splice(i>=0?i+1:1,0,["sprayer","📿","Share a prayer","#6a1b9a","Pray it together"]);return a;})(waAttItems);
gcAttachSheet=(orig=>function(){orig();const b=document.querySelector('#sheet [data-at="sprayer"]');if(b)b.onclick=()=>{closeSheet();spShareSheet((body,data)=>gcSend("prayer",body,data));};})(gcAttachSheet);
// pin shared prayers when asked (the request pinning in 64 handles data.pin for kind "prayer")
// ---------- the Prayers page: share any prayer with a group; show "My prayers" ----------
prayerCard=(orig=>function(p,full){let h=orig(p,full);
  const share=`<button class="ghost sp-sharebtn" data-spshare="${esc(p.id)}">👥 Share with a group</button>`;
  const del=p.cat==="mine"?`<button class="ghost" data-spdel="${esc(p.id)}">Remove</button>`:"";
  return h.replace(`<div data-addform="${p.id}" hidden></div>`,`<div class="row sp-prow2">${share}${del}</div><div data-addform="${p.id}" hidden></div>`);})(prayerCard);
document.addEventListener("click",e=>{let b;
  if(b=e.target.closest("[data-spshare]")){const p=PRAYER_BY[b.dataset.spshare];if(!p)return;
    const data=p.cat==="mine"?{pr:{uid:p.id,name:p.name,text:p.text}}:{pr:{id:p.id,name:p.name}};
    if(typeof gcPickGroup!=="function"){toast("Join a group first (Groups tab)");return;}
    gcPickGroup(gid=>gcSendTo(gid,"prayer",p.name,data).then(()=>toast("Shared with your group 🙏")));return;}
  if(b=e.target.closest("[data-spdel]")){const id=b.dataset.spdel;if(!confirmInline(b,"Tap again to remove"))return;
    delete (S.myPrayers||{})[id];S.plan.items=(S.plan.items||[]).filter(i=>i.pid!==id);const i=PRAYERS.findIndex(p=>p.id===id);if(i>=0)PRAYERS.splice(i,1);delete PRAYER_BY[id];save();renderPrayers();toast("Removed");}
});
// ---------- make it easy to find ----------
// Prayers page: a "pray together" band on My day, and a 👥 share button on every scheduled prayer
function spGroupShare(){if(typeof gcPickGroup!=="function"){toast("Join a group first (Groups tab)");return;}
  spShareSheet((body,data)=>gcPickGroup(gid=>gcSendTo(gid,"prayer",body,data).then(()=>toast("Shared with your group 🙏"))));}
renderPrayers=(orig=>function(){const r=orig.apply(this,arguments);try{const v=$("#v-prayers");
  if(prTab==="today"&&!v.querySelector(".sp-band")){const anchor=v.querySelector("[data-ptab]")&&v.querySelector("[data-ptab]").parentElement;
    anchor&&anchor.insertAdjacentHTML("afterend",`<div class="sp-band"><span>👥 <b>Pray together.</b> Share any prayer with your group, or a prayer of your own. They can add it to their day too.</span><button class="btn primary" data-spgroup>📿 Share a prayer</button></div>`);
    v.querySelectorAll(".tasks .task").forEach(t=>{const a=t.querySelector("[data-open]");if(a&&!t.querySelector("[data-spshare]"))a.insertAdjacentHTML("afterend",` <button class="sp-mini" data-spshare="${esc(a.dataset.open)}" aria-label="Share with a group" title="Share with a group">👥</button>`);});}
  if(prTab==="prayers"&&!v.querySelector(".sp-band"))v.querySelector("[data-ptab]")?.parentElement.insertAdjacentHTML("afterend",`<div class="sp-band"><span>👥 Every prayer below has a <b>Share with a group</b> button. You can also write your own.</span><button class="btn" data-spgroup>📿 Share a prayer</button></div>`);
 }catch(e){console.warn(e);}return r;})(renderPrayers);
document.addEventListener("click",e=>{if(e.target.closest("[data-spgroup]")){e.preventDefault();spGroupShare();}});
// Group chat: a 🙏 button in the composer, and "Share a prayer" in the ⋮ menu
renderGroup=(orig=>async function(gid){await orig(gid);const clip=document.querySelector("#gcomp [data-gattach]");
  if(clip&&!document.querySelector("#gcomp [data-sppick]"))clip.insertAdjacentHTML("beforebegin",`<button type="button" class="wa-ib sp-pick" data-sppick aria-label="Prayers">🙏</button>`);})(renderGroup);
document.addEventListener("click",e=>{if(!e.target.closest("[data-sppick]")||!G)return;
  openSheet(`<h2 class="sheet-t">🙏 Prayer</h2><div class="wa-menu">
    <button data-sppk="share">📿 Share a prayer <span class="muted">Prayer before Study, Our Father, your own…</span></button>
    ${typeof gpReady==="function"&&gpReady()?`<button data-sppk="req">🙏 Ask for prayer <span class="muted">A prayer request; members tap "I prayed"</span></button>`:""}</div>`,r=>{
    r.querySelector('[data-sppk="share"]').onclick=()=>{closeSheet();spShareSheet((body,data)=>gcSend("prayer",body,data));};
    const q=r.querySelector('[data-sppk="req"]');q&&(q.onclick=()=>{closeSheet();gpPrayerSheet();});},"Prayer");});
