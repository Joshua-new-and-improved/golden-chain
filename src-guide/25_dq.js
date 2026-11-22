// ---------- Disputed questions: dense, article-by-article theology ----------
// Each entry: a plain answer, an analogy, the scholastic article (objections, sed contra, respondeo, replies),
// deeper exposition with verified texts, the schools, what Wagner / Feser / Garrigou-Lagrange add, errors, Scripture, self-test.
const DQ_TRACTS=[
 ["god","God, one in nature","What reason and faith say about God's simplicity, eternity, knowledge, will, providence and predestination (ST I qq.2–26)."],
 ["trinity","God, three in persons","Processions, relations, persons, the names Word, Image, Love and Gift, appropriation and the Filioque (ST I qq.27–43)."],
 ["angels","Angels and demons","Pure spirits: what they are, how they know, love, move, appear in bodies, fell, tempt and guard us (ST I qq.50–64, 106–114)."],
 ["man","The human soul","Spirit and body, the soul's subsistence, its creation, the separated soul (ST I qq.75–102)."],
 ["grace","Grace and justification","Nature and grace, kinds of grace, premotion, justification, merit, predestination in practice (ST I-II qq.109–114)."],
 ["christ","Christ and redemption","The hypostatic union, Christ's one being, his knowledge, why God became man, how the Passion saves (ST III qq.1–59)."],
 ["mary","Our Lady","Thomas and the Immaculate Conception, Mary's sinlessness, her mediation."],
 ["sacraments","The sacraments","Validity, intention, character, causality, the Eucharist's accidents, contrition and confession (ST III qq.60–90)."],
 ["moral","Moral theology","Mortal and venial sin, probabilism, concupiscence, the natural law in hard cases."],
 ["church","The Church: what it is and how it works","Structure, magisterium and its levels, infallibility, canonizations, councils, doctrinal development, salvation outside the visible Church."],
 ["last","The last things","Limbo, the number of the saved, hell, purgatory, the resurrected body."],
 ["scripture","Hard texts of Scripture","The passages people struggle with most, read with Thomas and the Fathers."],
 ["controversy","East, West and the Reformation","Essence and energies, created grace, imputation, sola scriptura, the canon, the papacy from Scripture."]
];
const DQ=[]; // filled by 25a–25m files
const DQ_LEVELS={1:"Foundation",2:"Intermediate",3:"Advanced"};
function dqById(id){return DQ.find(d=>d.id===id);}
function renderTheology(id){
  const v=$("#v-theology");
  if(!id){
    const n=DQ.length;
    v.innerHTML=`<div class="label">Theology in depth</div><h1>Disputed questions</h1>
    <p style="max-width:46em;color:var(--muted);font-size:1.05rem">${n} questions worked through the way Thomas teaches: a plain answer first, an analogy, then the full article with objections and replies, the deeper reasons, the debates between the schools, and what Christian B. Wagner, Edward Feser and Réginald Garrigou-Lagrange add. Every quotation from the Summa is checked against the text.</p>
    <div class="dq-legend ui"><span class="chip">Foundation</span> start here <span class="chip">Intermediate</span> needs the Academy basics <span class="chip">Advanced</span> scholastic detail</div>
    <div class="dq-tracts">${DQ_TRACTS.map(([t,n2,d])=>{const ls=DQ.filter(x=>x.tract===t);return ls.length?`<section class="dq-tract" id="tr-${t}"><h2>${esc(n2)}</h2><p class="muted">${esc(d)}</p><ol class="dq-list">${ls.map(x=>`<li><a href="#dq-${x.id}">${esc(x.q)}</a> <span class="chip">${DQ_LEVELS[x.level]||""}</span></li>`).join("")}</ol></section>`:""}).join("")}</div>`;
    return;
  }
  const D=dqById(id); if(!D){v.innerHTML=`<p>Not found. <a href="#theology">All questions</a></p>`;return;}
  const sib=DQ.filter(x=>x.tract===D.tract), i=sib.indexOf(D), tr=DQ_TRACTS.find(t=>t[0]===D.tract)||["","",""];
  const A=D.art||{};
  v.innerHTML=`<div class="dq">
   <a href="#theology" class="ui">← All questions</a> · <a href="#theology" data-tr="${D.tract}" class="ui">${esc(tr[1])}</a>
   <div class="label" style="margin-top:12px">${esc(tr[1])} · question ${i+1} of ${sib.length}</div>
   <h1 class="dq-q">${esc(D.q)}</h1>
   <div class="row" style="gap:6px;flex-wrap:wrap"><span class="chip">${DQ_LEVELS[D.level]||""}</span>${D.note?`<span class="chip ok" title="Theological note: how certain this teaching is">${esc(D.note)}</span>`:""}${D.st?`<span class="chip">${esc(D.st)}</span>`:""}</div>
   <div class="dq-one"><div class="co-h">In one sentence</div><p>${D.one}</p></div>
   ${D.plain?`<section><h2>Plainly explained</h2>${D.plain}</section>`:""}
   ${D.analogy?`<div class="co analogy"><div class="co-h">Analogy · ${esc(D.analogy[0])}</div><p>${D.analogy[1]}</p></div>`:""}
   ${A.resp?`<section class="dq-art"><h2>The article</h2>
    ${(A.obj||[]).map((o,k)=>`<p><strong>Objection ${k+1}.</strong> ${o}</p>`).join("")}
    ${A.sc?`<p><strong>On the contrary,</strong> ${A.sc}</p>`:""}
    <p><strong>I answer that,</strong> ${A.resp}</p>
    ${(A.rep||[]).map((r,k)=>`<p><strong>Reply to Objection ${k+1}.</strong> ${r}</p>`).join("")}
    <p class="ui muted" style="font-size:.8rem">The article is reconstructed in Thomas's form; wording outside quotation marks is a faithful summary, not his text.</p></section>`:""}
   ${D.deeper?`<section><h2>Going deeper</h2>${D.deeper}</section>`:""}
   ${D.schools?`<section><h2>Where theologians disagree</h2>${D.schools}</section>`:""}
   ${D.authors?`<section><h2>Wagner, Feser and Garrigou-Lagrange</h2><div class="dq-auth">${D.authors.map(a=>`<div class="bi-p"><div class="bi-pn">${esc(a[0])}</div><div class="ui muted" style="font-size:.8rem;margin-bottom:4px">${esc(a[1])}</div><div>${a[2]}</div></div>`).join("")}</div></section>`:""}
   ${D.errors?`<section><h2>Errors to avoid</h2><div class="co warn"><div class="co-h">[Warn] Common mistakes</div><ul>${D.errors.map(e=>`<li><strong>${esc(e[0])}</strong> ${e[1]}</li>`).join("")}</ul></div></section>`:""}
   ${D.scripture?`<section><h2>Scripture</h2><ul class="bi-keys">${D.scripture.map(s=>`<li><strong>${esc(s[0])}</strong>: ${s[1]}</li>`).join("")}</ul></section>`:""}
   ${D.tests?`<section><h2>Test yourself</h2>${D.tests.map(t=>`<details class="bi-hard"><summary>${esc(t[0])}</summary><p>${t[1]}</p></details>`).join("")}</section>`:""}
   ${D.read?`<section><h2>Read next</h2><ul>${D.read.map(r=>`<li>${r}</li>`).join("")}</ul></section>`:""}
   <nav class="row" style="justify-content:space-between;margin-top:22px">${i>0?`<a class="btn" href="#dq-${sib[i-1].id}">← ${esc(sib[i-1].q.slice(0,48))}${sib[i-1].q.length>48?"…":""}</a>`:"<span></span>"}${i<sib.length-1?`<a class="btn primary" href="#dq-${sib[i+1].id}">${esc(sib[i+1].q.slice(0,48))}${sib[i+1].q.length>48?"…":""} →</a>`:""}</nav>
  </div>`;
  $$("[data-tr]",v).forEach(a=>a.onclick=()=>{renderTheology._tr=a.dataset.tr;});
  $$(".dq section, .dq .dq-one",v).forEach(tagTerms);
}
document.addEventListener("click",e=>{const a=e.target.closest("[data-tr]");if(a)renderTheology._tr=a.dataset.tr;});
