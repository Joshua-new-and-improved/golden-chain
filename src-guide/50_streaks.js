// ---------- Daily Scripture streaks ----------
// A day counts when you spend about a minute reading in the Bible, the day's Mass readings or the Hours (or tap "I read today").
// Kept in this browser (S.rlog) and, when signed in to Groups, synced so your group can see it.
S.rlog=S.rlog||{}; S.streakCel=S.streakCel||{};
const STREAK_MILESTONES=[3,7,14,21,30,40,50,75,100,150,200,250,300,365,500,730,1000];
const STREAK_WORDS=[
 ["Thy word is a lamp to my feet, and a light to my paths.","Psalm 118:105"],
 ["How sweet are thy words to my palate! more than honey to my mouth.","Psalm 118:103"],
 ["Not in bread alone doth man live, but in every word that proceedeth from the mouth of God.","Matthew 4:4"],
 ["Blessed are they who hear the word of God and keep it.","Luke 11:28"],
 ["Thy words were found, and I did eat them, and thy word was to me a joy and gladness of my heart.","Jeremiah 15:16"],
 ["The word of our Lord endureth for ever.","Isaiah 40:8"],
 ["Let the word of Christ dwell in you abundantly.","Colossians 3:16"],
 ["Be ye doers of the word and not hearers only.","James 1:22"],
 ["Was not our heart burning within us, whilst he… opened to us the scriptures?","Luke 24:32"],
 ["Lord, to whom shall we go? Thou hast the words of eternal life.","John 6:69"],
 ["On his law he shall meditate day and night.","Psalm 1:2"],
 ["The word of God is living and effectual and more piercing than any two edged sword.","Hebrews 4:12"],
 ["Daily searching the scriptures.","Acts 17:11"],
 ["Through patience and the comfort of the scriptures, we might have hope.","Romans 15:4"],
 ["Every one therefore that heareth these my words, and doth them, shall be likened to a wise man that built his house upon a rock.","Matthew 7:24"]];
const STREAK_CHEERS=["Keep the flame alive","Faithful in little things","Another stone on the rock","One more day with the Word","Steady as the Psalmist","Rooted and growing","The lamp is lit","Grace upon grace"];
const STREAK_TITLES={3:"Three days in a row!",7:"A full week!",14:"Two weeks strong",21:"Three weeks: a habit is forming",30:"A month with the Word",40:"Forty days, like Lent",50:"Fifty days, like Pentecost",75:"Seventy-five days",100:"One hundred days!",150:"150 days, one for each Psalm",200:"Two hundred days",250:"250 days",300:"300 days",365:"A whole year in the Word!",500:"500 days",730:"Two years!",1000:"A thousand days"};

const isoDay=d=>ymd(d);
function dayAdd(iso,n){const d=new Date(iso+"T12:00:00");d.setDate(d.getDate()+n);return ymd(d);}
function streakInfo(log){
  log=log||S.rlog;const days=Object.keys(log).sort();const today=isoDay(new Date());
  const out={streak:0,best:0,freezes:0,todayDone:!!log[today],frozen:new Set(),total:days.length,start:null};
  if(!days.length) return out;
  let d=days[0],streak=0,freezes=0,best=0,start=d;
  while(d<=today){
    if(log[d]){if(streak===0)start=d;streak++;if(streak%7===0&&freezes<2)freezes++;best=Math.max(best,streak);}
    else if(d!==today){if(streak>0&&freezes>0){freezes--;out.frozen.add(d);}else{streak=0;}}
    d=dayAdd(d,1);
  }
  Object.assign(out,{streak,best,freezes,start});return out;
}
function streakWeek(){const t=new Date();const dow=(t.getDay()+6)%7;const mon=dayAdd(isoDay(t),-dow);const info=streakInfo();
  return [...Array(7)].map((_,i)=>{const d=dayAdd(mon,i);return {d,lab:"MTWTFSS"[i],done:!!S.rlog[d],frozen:info.frozen.has(d),today:d===isoDay(t),future:d>isoDay(t)};});}

function logReading(ref,manual){
  const d=isoDay(new Date());if(S.rlog[d])return false;
  const before=streakInfo().streak;S.rlog[d]=ref||"read";save();
  const info=streakInfo();
  try{if(typeof gcSyncReading==="function")gcSyncReading(d,ref||"read");}catch(e){}
  updateStreakPills();
  if(STREAK_MILESTONES.includes(info.streak)&&!S.streakCel[info.start+":"+info.streak]){S.streakCel[info.start+":"+info.streak]=1;save();celebrateStreak(info);}
  else{const w=STREAK_WORDS[(info.total+info.streak)%STREAK_WORDS.length];toast(`🔥 Day ${info.streak}${info.streak>before?"":""}! ${STREAK_CHEERS[info.total%STREAK_CHEERS.length]}. “${w[0].length>70?w[0].slice(0,68)+"…":w[0]}” (${w[1]})`);}
  if(typeof renderHome==="function"&&!$("#v-home").hidden){const h=$("#home-streak");if(h)h.outerHTML=streakCardHTML();}
  return true;
}

// time spent reading → automatic log
let _readSecs=0,_readKey="";
setInterval(()=>{
  if(document.visibilityState!=="visible")return;
  const h=location.hash||"#home";if(!/^#(reader|read-|mass|hours)/.test(h)){_readSecs=0;return;}
  const k=h.startsWith("#read")||h==="#reader"?`${S.book||"bible"}|${S.ch||1}`:h.slice(1).split("-")[0];
  if(k!==_readKey){_readKey=k;_readSecs=0;}
  _readSecs+=5;
  if(_readSecs>=45&&!S.rlog[isoDay(new Date())])logReading(k);
},5000);

function streakPillHTML(){const i=streakInfo();return `<button class="streak-pill${i.todayDone?" lit":""}" data-streak aria-label="Reading streak: ${i.streak} days${i.todayDone?", today done":", read today to keep it"}"><span class="fl">${i.todayDone?"🔥":"🕯️"}</span><b>${i.streak}</b></button>`;}
function updateStreakPills(){document.querySelectorAll(".streak-pill").forEach(p=>p.outerHTML=streakPillHTML());}
function streakCardHTML(){
  const i=streakInfo(),wk=streakWeek();
  const nextM=STREAK_MILESTONES.find(m=>m>i.streak)||i.streak+100;
  return `<div class="streak-card${i.todayDone?" done":""}" id="home-streak">
   <div class="sc-top"><div class="sc-flame" aria-hidden="true">${i.todayDone?"🔥":"🕯️"}</div><div class="sc-num"><b>${i.streak}</b><span>day${i.streak===1?"":"s"} in the Word</span></div>
    <div class="sc-side">${i.freezes?`<span class="sc-chip" title="A rest day is used automatically if you miss one day. You earn one every 7 days (max 2).">❄️ ${i.freezes} rest day${i.freezes>1?"s":""}</span>`:""}<span class="sc-chip">Best ${i.best}</span></div></div>
   <div class="sc-week">${wk.map(x=>`<div class="sc-d${x.done?" on":""}${x.frozen?" fz":""}${x.today?" td":""}${x.future?" fu":""}"><span>${x.lab}</span><i>${x.done?"✓":x.frozen?"❄":""}</i></div>`).join("")}</div>
   <div class="sc-bar"><div class="bar"><i style="width:${Math.min(100,i.streak/nextM*100)}%"></i></div><span>${nextM-i.streak} to ${nextM}</span></div>
   ${i.todayDone?`<p class="sc-msg">Today's reading is in. ${esc(STREAK_CHEERS[i.total%STREAK_CHEERS.length])}!</p>`:`<p class="sc-msg">${i.streak?"Read today to keep your streak going.":"Start a streak today."} About a minute in the Bible, today's Mass or the Hours counts automatically.</p>
   <div class="row" style="gap:8px"><a class="btn primary" href="#mass">Read today's Gospel</a><button class="btn" data-logread>I read today</button></div>`}
  </div>`;
}
function openStreakSheet(){
  const i=streakInfo();const today=isoDay(new Date());const dow=(new Date().getDay()+6)%7;
  const start=dayAdd(today,-dow-7*5);const cells=[...Array(42)].map((_,n)=>dayAdd(start,n));
  openSheet(`<h2 class="sheet-t">🔥 ${i.streak}-day streak</h2>
   <p class="muted" style="margin-top:0">Best ${i.best} · ${i.total} day${i.total===1?"":"s"} read in all${i.freezes?` · ❄️ ${i.freezes} rest day${i.freezes>1?"s":""} saved`:""}</p>
   <div class="sc-cal">${"MTWTFSS".split("").map(l=>`<b>${l}</b>`).join("")}${cells.map(d=>`<span class="${S.rlog[d]?"on":i.frozen.has(d)?"fz":""}${d===today?" td":""}${d>today?" fu":""}" title="${d}">${+d.slice(8)}</span>`).join("")}</div>
   <div class="co extra" style="margin-top:14px"><div class="co-h">How it works</div><ul style="margin:.3em 0 0 1.1em;padding:0"><li>Spend about a minute reading in the Bible, today's Mass readings or the Hours, and the day is logged for you; or tap <em>I read today</em>.</li><li>Every 7 days in a row earns a ❄️ rest day (up to 2). If you miss a single day, a rest day is used and your streak survives.</li><li>Milestones at 3, 7, 14, 21, 30, 40, 50 and 100 days and beyond come with a little celebration.</li><li>Sign in under Groups and your streak is shared with your groups.</li></ul></div>
   <div class="sheet-acts">${i.todayDone?"":`<button class="primary" data-logread>I read today</button>`}<a class="btn" href="#groups" data-sheetx>Groups</a><button data-sheetx>Close</button></div>`,null,"Reading streak");
}
function celebrateStreak(info){
  const w=STREAK_WORDS[info.streak%STREAK_WORDS.length];
  const ov=document.createElement("div");ov.className="celebrate";ov.setAttribute("role","dialog");ov.setAttribute("aria-label","Streak milestone");
  ov.innerHTML=`<canvas aria-hidden="true"></canvas><div class="cel-card"><div class="cel-flame">🔥</div><div class="cel-n">${info.streak}</div><h2>${esc(STREAK_TITLES[info.streak]||info.streak+" days!")}</h2>
   <p class="cel-v">“${esc(w[0])}”<span>${esc(w[1])}, Douay-Rheims</span></p>${info.freezes?`<p class="muted" style="margin:0 0 12px">You have ❄️ ${info.freezes} rest day${info.freezes>1?"s":""} saved.</p>`:""}
   <div class="row" style="justify-content:center;gap:8px">${typeof gcShareStreak==="function"?`<button class="btn" data-celshare>Share with my group</button>`:""}<button class="btn primary" data-celx>Deo gratias!</button></div></div>`;
  document.body.append(ov);confetti(ov.querySelector("canvas"));
  const close=()=>ov.remove();ov.querySelector("[data-celx]").onclick=close;ov.addEventListener("click",e=>{if(e.target===ov)close();});
  const sh=ov.querySelector("[data-celshare]");sh&&(sh.onclick=()=>{close();gcShareStreak(info);});
  try{navigator.vibrate&&navigator.vibrate([30,40,30]);}catch(e){}
}
function confetti(cv){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const ctx=cv.getContext("2d");const W=cv.width=innerWidth,H=cv.height=innerHeight;
  const cols=["#c9a227","#1f3a5f","#b23a48","#2e7d5b","#e9c46a","#ffffff"];
  const P=[...Array(140)].map(()=>({x:W/2+(Math.random()-.5)*80,y:H*0.45,vx:(Math.random()-.5)*13,vy:-Math.random()*14-4,r:Math.random()*6+3,c:cols[Math.random()*cols.length|0],a:Math.random()*6,s:(Math.random()-.5)*.3}));
  let t=0;(function f(){ctx.clearRect(0,0,W,H);P.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.s;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);ctx.restore();});if(++t<160&&cv.isConnected)requestAnimationFrame(f);else ctx.clearRect(0,0,W,H);})();
}
document.addEventListener("click",e=>{
  if(e.target.closest("[data-streak]")){openStreakSheet();return;}
  if(e.target.closest("[data-logread]")){if(!logReading("manual",true))toast("Today is already logged 🔥");closeSheet();}
});
// header pill
(function(){const w=document.querySelector("header.top .wrap");if(!w||w.querySelector(".streak-pill"))return;w.insertAdjacentHTML("beforeend",streakPillHTML());})();
