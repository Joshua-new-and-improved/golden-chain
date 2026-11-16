// ---------- Verse apologetics: popular proof-texts answered at the verse (vapol/index.json, built by tools/vapol.py) ----------
let VAPOL=null;
async function vapolLoad(){if(!VAPOL){try{VAPOL=await fetchJSON("vapol/index.json");}catch(e){VAPOL={};}}return VAPOL;}
function vapolHTML(e,open){
  return `<details class="vap"${open?" open":""} data-vap="${e.v}"><summary><span class="vap-k">Answering an objection</span><span class="vap-t">${esc(e.ref)} · ${esc(e.t)}</span></summary><div class="vap-b">
   <div class="vap-claim"><div class="label">The claim</div><p>${esc(e.claim)}</p></div>
   <div class="label">Why it does not follow</div><ol>${e.why.map(w=>`<li>${esc(w)}</li>`).join("")}</ol>
   <div class="vap-cath"><div class="label">The Catholic reading</div><p>${esc(e.cath)}</p></div>
   ${vapolDeep(e.deep)}
   <p class="ui muted vap-src">${esc(e.src)}${e.disp?` · <a href="#ap-${e.disp}">Full disputation ›</a>`:""}</p></div></details>`;
}
function vpP(t){return String(t||"").split(/\n\n+/).map(x=>`<p>${esc(x)}</p>`).join("");}
function vapolDeep(d){
  if(!d)return "";const sec=(h,body)=>body?`<section class="vd-s"><h4>${h}</h4>${body}</section>`:"";
  return `<details class="vap-deep"><summary>Full study: context, the original words, step-by-step answer, Fathers, comebacks</summary><div class="vd">
   ${sec("1 · The verse in its context",vpP(d.ctx))}
   ${sec("2 · The argument at its strongest",vpP(d.who))}
   ${sec("3 · The original words",vpP(d.lang))}
   ${sec("4 · The answer, step by step",d.steps?`<ol class="vd-steps">${d.steps.map(([h,t])=>`<li><strong>${esc(h)}.</strong> ${vpP(t)}</li>`).join("")}</ol>`:"")}
   ${sec("5 · Witnesses: Fathers, Doctors and the Church",d.fathers?`<ul class="vd-f">${d.fathers.map(([w,t])=>`<li><span class="vd-w">${esc(w)}</span>${esc(t)}</li>`).join("")}</ul>`:"")}
   ${sec("6 · “But what about…?” Comebacks and replies",d.obj?d.obj.map(([o,r])=>`<div class="vd-o"><p class="vd-q">${esc(o)}</p>${vpP(r)}</div>`).join(""):"")}
   ${sec("7 · Saying it in two minutes",d.talk?`<div class="vd-talk">${vpP(d.talk)}</div>`:"")}
   ${sec("8 · Arguments to avoid",vpP(d.avoid))}
   ${sec("9 · Further reading",d.read?`<ul>${d.read.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>`:"")}
  </div></details>`;
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
    body.innerHTML=`<p style="max-width:46em">${all.length} verses often quoted against Catholic teaching. Each note gives the short answer (the claim, why it does not follow, the Catholic reading); open <strong>Full study</strong> for the context, the Greek or Hebrew, a step-by-step refutation, the Fathers, the usual comebacks with replies, and a two-minute version for conversation. The same notes appear in the Bible at the verse itself.</p><input type="search" class="vap-find" placeholder="Search verses, e.g. faith alone, Peter, Mary, purgatory" aria-label="Search the verse notes">`+
     groups.map(g=>{const es=all.filter(e=>!used.has(e.ref)&&e.tags.some(t=>g.tags.includes(t)));es.forEach(e=>used.add(e.ref));
       return es.length?`<h2 class="vap-gh">${esc(g.h)}</h2>${es.map(e=>{const s=Object.keys(V).find(k=>V[k].includes(e));const [bk,ch]=s.split("|");return `<div class="vap-row">${vapolHTML(e,false)}<a class="btn-link vap-go" href="#read-${bk}-${ch}-${e.v}">Read it in context ›</a></div>`;}).join("")}`:"";}).join("");
    const f=body.querySelector(".vap-find");if(f)f.oninput=()=>{const q=f.value.trim().toLowerCase();body.querySelectorAll(".vap-row").forEach(r=>{r.hidden=q&&!r.textContent.toLowerCase().includes(q);});body.querySelectorAll(".vap-gh").forEach(h=>{let n=h.nextElementSibling,any=false;while(n&&!n.classList.contains("vap-gh")){if(n.classList.contains("vap-row")&&!n.hidden)any=true;n=n.nextElementSibling;}h.hidden=!any;});};
    vapolWire(body);});
};}
