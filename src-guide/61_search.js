// ---------- One search for everything: Bible (traditional and modern), Catechism, theology, lessons, questions, prayers, glossary ----------
const SRCH_KINDS=[["all","All"],["bible","Bible"],["ccc","Catechism"],["dq","Theology"],["lesson","Lessons"],["life","Questions & prayers"],["term","Glossary"]];
let SRCH={k:"all",q:""};
function srchPacks(k){return k==="bible"||k==="life"||k==="term"?[]:k==="ccc"?["ccc"]:k==="dq"?["dq"]:k==="lesson"?["lessons"]:["ccc","dq","lessons"];}
function renderSearch(arg){
  if(arg)SRCH.q=decodeURIComponent(arg);
  $("#v-search").innerHTML=`<div class="srch"><h1>Search</h1>
   <div class="srch-box"><input type="search" id="q" placeholder="Search the Bible, Catechism, lessons…" aria-label="Search" value="${esc(SRCH.q)}" autocomplete="off" enterkeyhint="search"></div>
   <div class="chips-row srch-k" role="group" aria-label="What to search">${SRCH_KINDS.map(([k,l])=>`<button class="chip" data-sk="${k}" aria-pressed="${SRCH.k===k}">${l}</button>`).join("")}</div>
   <label class="ui srch-all"><input type="checkbox" id="qall" ${ALL_LOADED?"checked":""}> Search every book of the Bible <span class="muted">(downloads all 73 books once, about 5 MB; otherwise only books you have opened)</span></label>
   <div class="srch-try muted ui">Try: <button class="chip" data-sq="purgatory">purgatory</button><button class="chip" data-sq="grace">grace</button><button class="chip" data-sq="Mary">Mary</button><button class="chip" data-sq="forgive">forgive</button><button class="chip" data-sq="conscience">conscience</button></div>
   <div id="results" style="margin-top:14px"></div></div>`;
  const v=$("#v-search");let tmr,runId=0;
  const run=async()=>{const my=++runId;const q=$("#q").value.trim();SRCH.q=q;const ql=q.toLowerCase();const R=$("#results");
    if(q.length<2){R.innerHTML=`<p class="muted">Type at least two letters.</p>`;return;}
    const need=srchPacks(SRCH.k).filter(n=>!PACK_OK[n]);
    if(need.length){R.innerHTML=`<p class="muted">Getting the library ready to search…</p>`;try{await packLoad(need);}catch(e){}}
    if($("#qall").checked&&!ALL_LOADED&&(SRCH.k==="all"||SRCH.k==="bible")){R.innerHTML=`<p class="muted">Loading the whole Bible…</p>`;await loadAll();}
    if(useWeb()&&(SRCH.k==="all"||SRCH.k==="bible"))await Promise.all(Object.keys(BOOKS).map(loadWeb));
    if(my!==runId)return;
    const hit=s=>s&&String(s).toLowerCase().includes(ql);
    const strip=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
    const snip=s=>{s=strip(s);const i=s.toLowerCase().indexOf(ql);if(i<0)return esc(s.slice(0,150))+(s.length>150?"…":"");const a=Math.max(0,i-60);return (a?"…":"")+esc(s.slice(a,i))+"<mark>"+esc(s.slice(i,i+q.length))+"</mark>"+esc(s.slice(i+q.length,i+q.length+90))+"…";};
    const G={};const add=(g,t,s,h,rank)=>{(G[g]=G[g]||[]).push({t,s,h,r:rank??(String(t).toLowerCase().includes(ql)?0:1)});};
    const want=k=>SRCH.k==="all"||SRCH.k===k;
    if(want("ccc")&&typeof CCC_NOTES!=="undefined")CCC_NOTES.forEach(n=>{const D=(typeof CCC_DEEP!=="undefined"&&CCC_DEEP[n.id])||{};
      const all=[n.t,CCC_GIST[n.id],n.sum,n.key.flat().join(" "),n.th.flat().join(" "),(D.paras||[]).map(x=>x[1]).join(" "),(D.mis||[]).flat().join(" ")].join(" ");
      if(hit(all))add("Catechism",`${n.t} (§§ ${n.p})`,hit(n.t)||hit(CCC_GIST[n.id])?esc(CCC_GIST[n.id]||""):snip(all),"#catechism-"+n.id,hit(n.t)?0:hit(CCC_GIST[n.id])?1:2);});
    if(want("dq")&&typeof DQ!=="undefined")DQ.forEach(d=>{const all=strip(JSON.stringify(d));if(hit(all))add("Theology",d.q,hit(d.q)?"":snip(all),"#dq-"+d.id,hit(d.q)?0:2);});
    if(want("lesson")){Object.values(LESSONS).forEach(L=>{if(hit(L.title))add("Lessons",`${L.code} · ${L.title}`,esc((L.outcomes||[])[0]||""),"#lesson-"+L.id,0);
      (L.sections||[]).forEach(s=>{const txt=strip(s.html);if(hit(s.h)||hit(txt))add("Lessons",`${L.code} · ${s.h}`,snip(txt),"#lesson-"+L.id,hit(s.h)?1:2);});});}
    if(want("life")){if(typeof QAS!=="undefined")QAS.forEach(x=>{const all=[x.q,x.short,...(x.steps||[]),...(x.cases||[]).map(c=>c.join(" "))].join(" ");if(hit(all))add("Questions",x.q,snip(all),"#q-"+x.id,hit(x.q)?0:2);});
      if(typeof PRAYERS!=="undefined")PRAYERS.forEach(p=>{const all=[p.name,p.when,...(p.text||[]),p.meaning].join(" ");if(hit(all))add("Prayers",p.name,snip(all),"#prayers",hit(p.name)?0:2);});}
    if(want("term"))TERMS.forEach(t=>{const all=[t.t,t.la,t.b,t.p,...(t.alias||[])].join(" · ");if(hit(all))add("Glossary",t.t,snip(t.b||all),null,hit(t.t)?0:2);});
    let sc=0;if(want("bible")){const books=($("#qall").checked?BIBLE_INDEX.map(b=>b.slug):Object.keys(BOOKS)).map(k=>BOOKS[k]).filter(Boolean);
      for(const B of books)for(const c of B.chapters)for(const [n,t] of c.verses){const w=useWeb()?webV(B.slug,c.n,n):null;const tx=w||t;if(hit(tx)||(w&&hit(t))){if(sc++<400)add("Bible",`${nameOf(B.slug)} ${c.n}:${n}`,snip(hit(tx)?tx:t),`#read-${B.slug}-${c.n}-${n}`,3);}}}
    const order=["Catechism","Theology","Bible","Questions","Prayers","Lessons","Glossary"];const ks=order.filter(k=>G[k]);
    const tot=ks.reduce((a,k)=>a+G[k].length,0);
    R.innerHTML=tot?`<p class="muted ui" style="font-size:.85rem">${tot} results${sc>400?` (first 400 of ${sc} verses)`:""}${!$("#qall").checked&&want("bible")?` · Bible: only books you've opened (tick the box to search them all)`:""}</p>`+
     ks.map(k=>{const L=G[k].sort((a,b)=>a.r-b.r);return `<section class="srch-g"><h2>${k} <span class="muted">${L.length}</span></h2>${L.map((x,i)=>`<div class="result"${i>=8?" hidden data-more":""}>${x.h?`<a href="${x.h}"><strong>${esc(x.t)}</strong></a>`:`<strong>${esc(x.t)}</strong>`}${x.s?`<p>${x.s}</p>`:""}</div>`).join("")}${L.length>8?`<button class="chip" data-smore>Show all ${L.length}</button>`:""}</section>`;}).join("")
     :`<p class="muted">Nothing found for “${esc(q)}”. ${SRCH.k!=="all"?`<button class="chip" data-sk="all">Search everything</button>`:want("bible")&&!$("#qall").checked?"Try ticking “Search every book of the Bible”.":""}</p>`;
    try{history.replaceState(null,"","#search-"+encodeURIComponent(q));}catch(e){}};
  $("#q").oninput=()=>{clearTimeout(tmr);tmr=setTimeout(run,250);};$("#qall").onchange=run;
  v.onclick=e=>{let b;if(b=e.target.closest("[data-sk]")){SRCH.k=b.dataset.sk;v.querySelectorAll("[data-sk]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.sk===SRCH.k));run();}
    else if(b=e.target.closest("[data-sq]")){$("#q").value=b.dataset.sq;run();}
    else if(b=e.target.closest("[data-smore]")){b.parentElement.querySelectorAll("[data-more]").forEach(x=>x.hidden=false);b.remove();}};
  if(!arg)$("#q").focus();run();
}
// header search button and a search box on Home
(()=>{const br=document.querySelector("header.top .brand");if(br&&!document.querySelector(".top-search")){br.insertAdjacentHTML("afterend",`<a class="top-search" href="#search" aria-label="Search">🔍</a>`);}})();
renderHome=(orig=>function(){const r=orig.apply(this,arguments);try{const v=$("#v-home");if(v&&!v.querySelector(".home-srch")){const t=v.querySelector("#home-today");(t||v.firstElementChild).insertAdjacentHTML("beforebegin",`<form class="home-srch" role="search"><input type="search" placeholder="Search the Bible, Catechism, lessons…" aria-label="Search" enterkeyhint="search"><button class="btn" aria-label="Search">🔍</button></form>`);
  v.querySelector(".home-srch").onsubmit=e=>{e.preventDefault();const q=e.target.querySelector("input").value.trim();location.hash=q?"#search-"+encodeURIComponent(q):"#search";};}}catch(e){}return r;})(renderHome);
