// ---------- Welcome: "What brings you here?", then a home page that starts with the right shortcuts ----------
const WEL_INTENTS=[
 ["bible","📖","Read the Bible","Scripture with the Church Fathers, in traditional or modern English"],
 ["pray","🙏","Pray every day","Today's Mass readings, prayers and the Liturgy of the Hours"],
 ["sacrament","🕊️","Prepare for a sacrament","Confirmation, First Communion, becoming Catholic, or marriage"],
 ["group","👥","Lead a group or teach","Courses, handouts, challenges and studies for groups"],
 ["study","🎓","Go deeper in the faith","Theology, the Catechism and St Thomas Aquinas"],
 ["explore","🧭","Explore the Catholic faith","New to it, or from another church? Start here"]];
const WEL_SACR=[["confirm","🔥","Confirmation"],["fhc","🍞","First Communion (for parents)"],["ocia","🕊️","Becoming Catholic (OCIA / RCIA)"],["marriage","💍","Marriage preparation"]];
function welShortcuts(){const i=S.intent,c=S.intentCourse;const L=[];
  const add=(h,e,t,d)=>L.push([h,e,t,d]);
  if(i==="bible"){add("#reader","📖","Continue reading",S.book?`${nameOf(S.book)} ${S.ch||1}`:"Start with John's Gospel");add("#mass","✝️","Today's Gospel","With the Fathers on every verse");add("#timeline","🗺️","The story of the Bible","Twelve periods, in order");add("#search","🔍","Search the Bible","Any word or phrase");}
  else if(i==="pray"){add("#mass","✝️","Today's Mass","The readings, explained");add("#prayers","🙏","Prayers","Morning, evening, the Rosary");add("#hours","🕰️","Pray the Hours","The Church's daily prayer");add("#calendar","📅","Church calendar","Feasts and days of obligation");}
  else if(i==="sacrament"){const C=CCC_COURSES.find(x=>x.id===c)||CCC_COURSES[0];add("#catechism-course-"+C.id,C.e,C.t,`${C.s.length} sessions`);add("#catechism-c57","🕯️","Going to Confession","What it is and how to go");add("#catechism-c56","🍞","The Mass explained","Sacrifice, presence, communion");add("#prayers","🙏","Prayers to learn","The basics, with their meaning");}
  else if(i==="group"){add("#groups","👥","Your groups","Chat, challenges and studies");add("#catechism","📜","Catechism courses","Printable handouts, set sessions");add("#challenges","🏆","Monthly challenges","Follow the Church's year together");add("#questions","💬","Life's questions","Great starters for discussion");}
  else if(i==="study"){add("#academy","🎓","The Academy","A course in Thomistic theology");add("#theology","🪜","Disputed questions","The hardest questions, in Summa form");add("#catechism","📜","The Catechism","All 96 sections, in depth");add("#apologetics","🛡️","Apologetics","Answer the objections");}
  else if(i==="explore"){add("#catechism-c1","✨","Why are we here?","The Catechism's first answer");add("#questions","💬","Big questions","Love, suffering, conscience, God");add("#apologetics","🛡️","Catholic beliefs, explained","Mary, the Pope, the saints and more");add("#reader","📖","Read the Gospels","In plain modern English");}
  return L;}
function welRowHTML(){if(!S.intent)return `<div class="wel-cta"><span>👋 Make this page yours: tell us what brings you here.</span><button class="chip" data-welopen>Personalise</button></div>`;
  const it=WEL_INTENTS.find(x=>x[0]===S.intent);
  return `<section class="wel-row"><div class="wel-h"><span class="label">${it?it[1]+" "+esc(it[2]):"For you"}</span><button class="ghost wel-ch" data-welopen>Change</button></div><div class="wel-grid">${welShortcuts().map(([h,e,t,d])=>`<a href="${h}"><span class="wel-e">${e}</span><b>${esc(t)}</b><span class="muted">${esc(d)}</span></a>`).join("")}</div></section>`;}
function welOpen(step){
  const s1=()=>`<h2 class="sheet-t">Welcome to Golden Chain</h2><p class="muted" style="margin-top:0">The Bible, the Mass, the Catechism and prayer, with the saints as your guides. Free, no adverts. What brings you here?</p>
    <div class="wel-opts">${WEL_INTENTS.map(([k,e,t,d])=>`<button data-wi="${k}"><span class="wel-e">${e}</span><span><b>${esc(t)}</b><span class="muted">${esc(d)}</span></span></button>`).join("")}</div>
    <button class="ghost wel-skip" data-welskip>Skip for now</button>`;
  const s2=()=>`<h2 class="sheet-t">Which sacrament?</h2><div class="wel-opts">${WEL_SACR.map(([k,e,t])=>`<button data-ws="${k}"><span class="wel-e">${e}</span><span><b>${esc(t)}</b></span></button>`).join("")}</div><button class="ghost" data-welback>‹ Back</button>`;
  const s3=()=>`<h2 class="sheet-t">How would you like the Bible?</h2><p class="muted" style="margin-top:0">You can switch any time, on any chapter.</p>
    <div class="wel-opts"><button data-wt="web"><span class="wel-e">💬</span><span><b>Modern English</b><span class="muted">Plain, easy to read (World English Bible)</span></span></button><button data-wt="dr"><span class="wel-e">📜</span><span><b>Traditional</b><span class="muted">Douay-Rheims, the classic Catholic English Bible</span></span></button></div>`;
  const s4=()=>`<h2 class="sheet-t">You're all set</h2><p>Your home page now starts with shortcuts for you. A few tips:</p>
    <ul class="wel-tips"><li><b>🔍 Search</b> at the top finds anything: a verse, a Catechism topic, a prayer.</li><li><b>Add to home screen</b> (your browser's menu, then "Add to Home screen") to use Golden Chain like an app, even offline.</li><li><b>Groups</b> let you read and pray with friends or your parish group.</li></ul>
    <button class="btn primary" data-sheetx>Start</button>`;
  const show=(fn,wire)=>openSheet(fn(),root=>{wire&&wire(root);},"Welcome");
  const w1=root=>{root.querySelectorAll("[data-wi]").forEach(b=>b.onclick=()=>{S.intent=b.dataset.wi;save();if(S.intent==="sacrament")show(s2,w2);else show(s3,w3);});
    const sk=root.querySelector("[data-welskip]");sk&&(sk.onclick=()=>{S.welDone=1;save();closeSheet();});};
  const w2=root=>{root.querySelectorAll("[data-ws]").forEach(b=>b.onclick=()=>{S.intentCourse=b.dataset.ws;save();show(s3,w3);});root.querySelector("[data-welback]").onclick=()=>show(s1,w1);};
  const w3=root=>{root.querySelectorAll("[data-wt]").forEach(b=>b.onclick=()=>{S.tr=b.dataset.wt;S.welDone=1;save();show(s4);if(document.body.dataset.view==="home")renderHome();});};
  if(step==="tr")show(s3,w3);else show(s1,w1);
}
document.addEventListener("click",e=>{if(e.target.closest("[data-welopen]"))welOpen();});
renderHome=(orig=>function(){const r=orig.apply(this,arguments);try{const v=$("#v-home");if(v&&!v.querySelector(".wel-row,.wel-cta")){const anchor=v.querySelector(".home-srch")||v.querySelector("#home-today");(anchor||v.firstElementChild).insertAdjacentHTML("afterend",welRowHTML());}
  const fresh=!S.welDone&&!S.intent&&!S.lastRoute&&!Object.keys(S.complete||{}).length&&!Object.keys(S.ccc||{}).length&&!Object.keys(S.hl||{}).length;
  if(fresh&&!welOpen._shown&&(location.hash===""||location.hash==="#home")){welOpen._shown=1;setTimeout(()=>welOpen(),600);}
 }catch(e){console.warn(e);}return r;})(renderHome);
