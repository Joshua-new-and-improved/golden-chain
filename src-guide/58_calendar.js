// ---------- Liturgical calendar ----------
// Month grid with the season's colour, every celebration and its rank, the days of obligation in South Africa,
// and a day panel (readings, obligation, Rosary). Feasts come from lect.json (Oct 2026 – Dec 2028) and lect-YYYY.json (2029–2035); outside that
// range the seasons are still calculated, and Sundays and Christmas are still marked.
VIEWS.push("calendar");
const CAL_COL={PURPLE:"#6f42a8",WHITE:"#d9cfae",GREEN:"#2f8a45",RED:"#c3302c",ROSE:"#e48ab0",GOLD:"#c9952f"};
const CAL_RANK={SOLEMNITY:["Solemnity","★"],FEAST:["Feast","◆"],MEMORIAL:["Memorial","●"],OPT_MEMORIAL:["Optional memorial","○"],SUNDAY:["Sunday",""],TRIDUUM:["Paschal Triduum","✝"],HOLY_WEEK:["Holy Week",""],COMMEMORATION:["Commemoration",""],FERIA:["Weekday",""]};
let CAL={y:null,m:null,sel:null};
const calISO=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
function calSeason(d){const y=d.getFullYear(),t=new Date(y,d.getMonth(),d.getDate());
  const E=easterDate(y),ash=addDays(E,-46),pent=addDays(E,49),adv=adventStart(y);
  const bap=(()=>{const j=new Date(y,0,7);while(j.getDay()!==0)j.setDate(j.getDate()+1);return j;})();
  if(t<=bap)return ["Christmastide","WHITE"];if(t>=adv&&t<new Date(y,11,25))return ["Advent","PURPLE"];if(t>=new Date(y,11,25))return ["Christmastide","WHITE"];
  if(t>=ash&&t<addDays(E,-7))return ["Lent","PURPLE"];if(t>=addDays(E,-7)&&t<E)return ["Holy Week","RED"];if(t>=E&&t<=pent)return ["Easter","WHITE"];return ["Ordinary Time","GREEN"];}
function calDay(L,d){const iso=calISO(d);const e=L[iso];const [sn,sc]=calSeason(d);
  return {iso,d,e,season:e?e.s.replace(/^(Early|Later) /,""):sn,col:e?e.c:(d.getDay()===0||!e?sc:"GREEN"),ob:typeof obligationFor==="function"?obligationFor(iso,L):null};}
async function renderCalendar(arg){
  const v=$("#v-calendar");const L=await loadLect().catch(()=>({}));const now=new Date();
  if(arg&&/^\d{4}-\d{2}$/.test(arg)){CAL.y=+arg.slice(0,4);CAL.m=+arg.slice(5)-1;}
  if(CAL.y==null){CAL.y=now.getFullYear();CAL.m=now.getMonth();}
  if(!CAL.sel||new Date(CAL.sel).getMonth()!==CAL.m||new Date(CAL.sel).getFullYear()!==CAL.y)CAL.sel=(now.getFullYear()===CAL.y&&now.getMonth()===CAL.m)?calISO(now):calISO(new Date(CAL.y,CAL.m,1));
  await loadLect(CAL.y);const first=new Date(CAL.y,CAL.m,1),days=new Date(CAL.y,CAL.m+1,0).getDate();const lead=first.getDay();
  const cells=[];for(let i=0;i<lead;i++)cells.push(null);for(let i=1;i<=days;i++)cells.push(calDay(L,new Date(CAL.y,CAL.m,i)));while(cells.length%7)cells.push(null);
  const today=calISO(now);const loaded=cells.some(c=>c&&c.e);
  const seasons=[...new Set(cells.filter(Boolean).map(c=>c.season))];
  const mName=first.toLocaleDateString("en-ZA",{month:"long",year:"numeric"});
  const big=cells.filter(c=>c&&c.e&&["SOLEMNITY","FEAST","TRIDUUM"].includes(c.e.t));
  const obl=cells.filter(c=>c&&c.ob&&c.ob.lvl==="must");
  v.innerHTML=`<div class="cal">
   <div class="cal-head"><button class="cal-nav" data-calm="-1" aria-label="Previous month">‹</button><div class="cal-title"><h1>${esc(mName)}</h1><div class="cal-seasons">${seasons.map(s=>`<span class="cal-sp" style="--c:${CAL_COL[calSeasonCol(s)]}">${esc(s)}</span>`).join("")}</div></div><button class="cal-nav" data-calm="1" aria-label="Next month">›</button></div>
   <div class="cal-tools"><button class="chip" data-caltoday>Today</button><select id="cal-jump" aria-label="Jump to month">${calMonthOptions()}</select><button class="chip" data-calics>⤓ Add holy days to my calendar</button></div>
   ${loaded?"":`<p class="muted ui cal-note">Feasts for this month aren't loaded yet; seasons, Sundays and Christmas are shown.</p>`}
   <div class="cal-grid" role="grid" aria-label="${esc(mName)}">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=>`<div class="cal-dow${x==="Sun"?" sun":""}" role="columnheader">${x}</div>`).join("")}
    ${cells.map(c=>c?calCellHTML(c,today):`<div class="cal-c empty" aria-hidden="true"></div>`).join("")}</div>
   <div class="cal-legend"><span><i class="lg" style="background:${CAL_COL.PURPLE}"></i>Advent / Lent</span><span><i class="lg" style="background:${CAL_COL.WHITE}"></i>Christmas / Easter / feasts</span><span><i class="lg" style="background:${CAL_COL.GREEN}"></i>Ordinary Time</span><span><i class="lg" style="background:${CAL_COL.RED}"></i>Martyrs, Passion, Spirit</span><span><i class="lg" style="background:${CAL_COL.ROSE}"></i>Gaudete / Laetare</span><span><b class="cal-ob-k">✠</b> Day of obligation</span><span>★ Solemnity</span><span>◆ Feast</span><span>● Memorial</span></div>
   <div class="cal-split"><section class="card cal-detail" id="cal-detail"></section>
    <section class="card cal-month"><h2>This month</h2>
     <div class="label">Days of obligation</div><ul class="cal-list">${obl.map(c=>`<li><button data-calday="${c.iso}"><b>${c.d.toLocaleDateString("en-ZA",{weekday:"short",day:"numeric"})}</b> ${esc(c.d.getDay()===0?(c.e?c.e.n:"Sunday"):c.e?c.e.n:"Holy day")}</button></li>`).join("")}</ul>
     ${big.length?`<div class="label" style="margin-top:10px">Solemnities and feasts</div><ul class="cal-list">${big.map(c=>`<li><button data-calday="${c.iso}"><b>${c.d.toLocaleDateString("en-ZA",{weekday:"short",day:"numeric"})}</b> ${CAL_RANK[c.e.t]?CAL_RANK[c.e.t][1]+" ":""}${esc(c.e.n)}</button></li>`).join("")}</ul>`:""}
     <p class="muted ui" style="font-size:.74rem;margin-top:10px">South Africa: every Sunday and Christmas are days of obligation; Epiphany, Ascension and Corpus Christi are kept on Sundays, and the Assumption moves to the nearest Sunday when 15 August is a weekday. Your diocese's Ordo and parish bulletin are the final word.</p></section></div></div>`;
  calDetail(L,CAL.sel);
  v.querySelectorAll("[data-calm]").forEach(b=>b.onclick=()=>calMove(+b.dataset.calm));
  v.querySelector("[data-caltoday]").onclick=()=>{CAL.y=now.getFullYear();CAL.m=now.getMonth();CAL.sel=calISO(now);calGo();};
  v.querySelector("#cal-jump").onchange=e=>{const [y,m]=e.target.value.split("-").map(Number);CAL.y=y;CAL.m=m-1;CAL.sel=null;calGo();};
  v.querySelector("[data-calics]").onclick=()=>calICS(L);
  v.querySelectorAll("[data-calday]").forEach(b=>b.onclick=()=>{CAL.sel=b.dataset.calday;v.querySelectorAll(".cal-c.sel").forEach(x=>x.classList.remove("sel"));v.querySelector(`.cal-c[data-calday="${CAL.sel}"]`)?.classList.add("sel");calDetail(L,CAL.sel);if(window.innerWidth<900||!b.classList.contains("cal-c"))$("#cal-detail").scrollIntoView({behavior:"smooth",block:"nearest"});});
  // swipe between months on phones
  const g=v.querySelector(".cal-grid");let sx=null,sy=0;g.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;},{passive:true});
  g.addEventListener("touchend",e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)calMove(dx<0?1:-1);});
}
function calSeasonCol(s){return {Advent:"PURPLE",Lent:"PURPLE","Holy Week":"RED",Christmastide:"WHITE",Easter:"WHITE"}[s]||"GREEN";}
function calCellHTML(c,today){const e=c.e;const r=e&&CAL_RANK[e.t]?CAL_RANK[e.t][1]:"";const must=c.ob&&c.ob.lvl==="must";const holy=must&&c.d.getDay()!==0;
  const label=`${c.d.toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"})}${e?": "+e.n:""}${must?", day of obligation":""}`;
  return `<button class="cal-c${c.iso===today?" today":""}${c.iso===CAL.sel?" sel":""}${c.d.getDay()===0?" sun":""}${e&&["SOLEMNITY","TRIDUUM"].includes(e.t)?" sol":""}" data-calday="${c.iso}" style="--c:${CAL_COL[c.col]||CAL_COL.GREEN}" aria-label="${esc(label)}">
   <span class="cal-n">${c.d.getDate()}</span>${must?`<span class="cal-ob${holy?" holy":""}" aria-hidden="true">✠</span>`:""}${r?`<span class="cal-r" aria-hidden="true">${r}</span>`:""}
   ${e&&e.t!=="FERIA"?`<span class="cal-name">${esc(calShort(e.n))}</span>`:""}<span class="cal-bar" aria-hidden="true"></span></button>`;}
function calShort(n){return n.replace(/^Saint(s)? /,"St$1 ").replace(/, (Bishop|Priest|Virgin|Martyr|Abbot|Religious|Doctor|Pope)(.*)$/,"").replace(/^The /,"").replace(/ of the Lord$/,"").slice(0,34);}
function calDetail(L,iso){const box=$("#cal-detail");if(!box)return;const d=new Date(iso+"T12:00:00");const c=calDay(L,d);const e=c.e;
  const rank=e&&CAL_RANK[e.t]?CAL_RANK[e.t][0]:"";
  box.innerHTML=`<div class="cal-dh" style="--c:${CAL_COL[c.col]||CAL_COL.GREEN}"><div class="label">${esc(d.toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long",year:"numeric"}))}</div>
   <h2>${esc(e?e.n:(d.getDay()===0?"Sunday":"Weekday"))}</h2><div class="cal-meta">${rank?`<span class="chip">${esc(rank)}</span>`:""}<span class="chip">${esc(c.season)}${e&&e.w&&/Ordinary/.test(e.s)?"":""}</span><span class="chip"><i class="lg" style="background:${CAL_COL[c.col]}"></i>${esc((c.col||"").toLowerCase())}</span>${e&&e.y?`<span class="chip">Year ${esc(e.y)}</span>`:""}</div></div>
   ${e&&e.mem&&e.mem!==e.n?`<p class="muted" style="margin:8px 0 0">Also: ${esc(e.mem)}</p>`:""}
   ${c.ob&&typeof obligHTML==="function"?obligHTML(c.ob,false):""}
   ${e&&e.r?`<div class="label" style="margin-top:12px">Readings</div><ul class="cal-reads">${e.r.map(r=>`<li><span class="muted">${esc(r.k)}</span> ${esc(r.ref)}</li>`).join("")}</ul><a class="btn primary" href="#mass-${iso}">Read the Mass of the day</a>`:`<p class="muted ui" style="font-size:.8rem;margin-top:10px">The readings for this day aren't in the site yet.</p>`}
   <p style="margin:12px 0 0">Rosary: <b>${esc(MYSTERY_BY_DOW[d.getDay()])} Mysteries</b>${d.getDay()===5?` · <span class="muted">Friday: a day of penance (CIC c. 1250)</span>`:""}</p>
   <div class="row" style="gap:8px;margin-top:10px"><a class="btn" href="#hours">Liturgy of the Hours</a>${iso===calISO(new Date())?`<a class="btn" href="#challenges">This month's challenge</a>`:""}</div>`;}
function calMonthOptions(){const out=[];const now=new Date();for(let y=now.getFullYear()-1;y<=LECT_MAX;y++)for(let m=0;m<12;m++){const v=`${y}-${String(m+1).padStart(2,"0")}`;out.push(`<option value="${v}"${y===CAL.y&&m===CAL.m?" selected":""}>${new Date(y,m,1).toLocaleDateString("en-ZA",{month:"long",year:"numeric"})}</option>`);}return out.join("");}
function calMove(n){let m=CAL.m+n,y=CAL.y;while(m<0){m+=12;y--;}while(m>11){m-=12;y++;}CAL.y=y;CAL.m=m;CAL.sel=null;calGo();}
function calGo(){const h=`#calendar-${CAL.y}-${String(CAL.m+1).padStart(2,"0")}`;if(location.hash!==h)history.replaceState(null,"",h);renderCalendar();}
document.addEventListener("keydown",e=>{if(document.body.dataset.view!=="calendar"||e.target.closest("input,select,textarea"))return;if(e.key==="ArrowLeft")calMove(-1);if(e.key==="ArrowRight")calMove(1);});
// .ics of days of obligation and solemnities, for a phone's own calendar
function calICS(L){const esc2=s=>String(s).replace(/[\\;,]/g,m=>"\\"+m).replace(/\n/g,"\\n");const lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Golden Chain//Liturgical calendar//EN","CALSCALE:GREGORIAN","X-WR-CALNAME:Golden Chain: holy days"];
  const st=new Date();st.setDate(1);const end=new Date(st.getFullYear()+1,11,31);let n=0;
  for(let d=new Date(st);d<=end;d.setDate(d.getDate()+1)){const iso=calISO(d);const e=L[iso];const ob=obligationFor(iso,L);const sol=e&&e.t==="SOLEMNITY";const must=ob&&ob.lvl==="must"&&d.getDay()!==0;
    const sunSol=ob&&ob.lvl==="must"&&d.getDay()===0&&e&&/Epiphany|Ascension|Corpus|Assumption|Pentecost|Easter|Palm|Trinity|King/.test(e.n);
    if(!(sol||must||sunSol))continue;const ds=iso.replace(/-/g,"");const nx=calISO(addDays(new Date(d),1)).replace(/-/g,"");
    lines.push("BEGIN:VEVENT",`UID:gc-${ds}@golden-chain`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").slice(0,15)}Z`,`DTSTART;VALUE=DATE:${ds}`,`DTEND;VALUE=DATE:${nx}`,`SUMMARY:${esc2((ob&&ob.lvl==="must"?"✠ ":"")+(e?e.n:"Christmas"))}`,`DESCRIPTION:${esc2((ob&&ob.lvl==="must"?"Day of obligation (South Africa). ":"")+(e&&e.r?"Readings: "+e.r.map(r=>r.ref).join("; "):""))}`,"TRANSP:TRANSPARENT","END:VEVENT");n++;}
  lines.push("END:VCALENDAR");const blob=new Blob([lines.join("\r\n")],{type:"text/calendar"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="golden-chain-holy-days.ics";document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);toast(`${n} holy days and solemnities saved. Open the file to add them to your calendar.`);}
MORE_LINKS.unshift(["#calendar","Calendar","The Church's year"]);
