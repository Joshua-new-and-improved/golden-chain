// ---------- Verse apologetics: popular proof-texts answered at the verse (vapol/index.json, built by tools/vapol.py) ----------
let VAPOL=null;
async function vapolLoad(){if(!VAPOL){try{VAPOL=await fetchJSON("vapol/index.json");}catch(e){VAPOL={};}}return VAPOL;}
function vapolHTML(e,open){
  return `<details class="vap"${open?" open":""} data-vap="${e.v}"><summary><span class="vap-k">Answering an objection</span><span class="vap-t">${esc(e.ref)} · ${esc(e.t)}</span></summary><div class="vap-b">
   <div class="vap-claim"><div class="label">The claim</div><p>${esc(e.claim)}</p></div>
   <div class="label">Why it does not follow</div><ol>${e.why.map(w=>`<li>${esc(w)}</li>`).join("")}</ol>
   <div class="vap-cath"><div class="label">The Catholic reading</div><p>${esc(e.cath)}</p></div>
   <p class="ui muted vap-src">${esc(e.src)}${e.disp?` · <a href="#ap-${e.disp}">Full disputation ›</a>`:""}</p></div></details>`;
}
function vapolWire(root){}
async function vapolAttach(){
  const host=document.getElementById("units");if(!host)return;const V=await vapolLoad();
  const list=V[`${S.book}|${S.ch}`];if(!list)return;
  list.forEach(e=>{if(host.querySelector(`.vap[data-vap="${e.v}"]`))return;
    const pv=host.querySelector(`p.v[data-ref="${S.book}|${S.ch}|${e.v}"]`);if(!pv)return;
    let el=pv.closest(".latrow")||pv; if(el.nextElementSibling&&el.nextElementSibling.classList.contains("cnote"))el=el.nextElementSibling;
    el.insertAdjacentHTML("afterend",vapolHTML(e,false));});
  vapolWire(host);
}
{const _rr=renderReader;renderReader=async function(...a){const r=await _rr.apply(this,a);try{await vapolAttach();}catch(e){}return r;};}
// Apologetics: a "Verses" tab listing them all
{const _ra=renderApologetics;renderApologetics=function(){
  _ra();const v=$("#v-apologetics");const seg=v.querySelector(".seg");if(!seg)return;
  seg.insertAdjacentHTML("beforeend",`<button data-tab="verses" aria-pressed="${apTab==="verses"}">Verses people quote</button>`);
  seg.querySelectorAll("[data-tab]").forEach(b=>{b.setAttribute("aria-pressed",b.dataset.tab===apTab);b.onclick=()=>{apTab=b.dataset.tab;apTestIdx=null;renderApologetics();};});
  if(apTab!=="verses")return;
  const fil=v.querySelector(".filters");if(fil)fil.hidden=true;
  const body=v.querySelector("#ap-body");body.innerHTML=`<p class="muted ui">Loading…</p>`;
  vapolLoad().then(V=>{const all=Object.values(V).flat();
    const TG=[["salvation","Faith, works and salvation"],["justification",null],["grace",null],["assurance",null],["scripture","Scripture and Tradition"],["tradition",null],["eucharist","The Eucharist and the Mass"],["mass",null],["priesthood",null],["church","Peter, the Church and confession"],["confession",null],["baptism","Baptism"],["mary","Mary"],["saints","The saints, images and prayer"],["images",null],["prayer",null],["purgatory","After death"]];
    const groups=[];let cur=null;TG.forEach(([t,h])=>{if(h){cur={h,tags:[t]};groups.push(cur);}else cur.tags.push(t);});
    const used=new Set();
    body.innerHTML=`<p style="max-width:46em">Verses often quoted against Catholic teaching. Each note says what the verse is taken to mean, why that does not follow, and how the Church reads it. The same notes appear in the Bible at the verse itself.</p>`+
     groups.map(g=>{const es=all.filter(e=>!used.has(e.ref)&&e.tags.some(t=>g.tags.includes(t)));es.forEach(e=>used.add(e.ref));
       return es.length?`<h2 class="vap-gh">${esc(g.h)}</h2>${es.map(e=>{const s=Object.keys(V).find(k=>V[k].includes(e));const [bk,ch]=s.split("|");return `<div class="vap-row">${vapolHTML(e,false)}<a class="btn-link vap-go" href="#read-${bk}-${ch}-${e.v}">Read it in context ›</a></div>`;}).join("")}`:"";}).join("");
    vapolWire(body);});
};}
