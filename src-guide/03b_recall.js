// ---------- Recall: every lesson calls on what came before ----------
// RC(id, html): an inline "Recall" box inside a section, linking back to the earlier lesson where the idea was taught.
// L.recall: [[lessonId, question, answer], ...] retrieval warm-up shown before the lesson.
// L.builds: extra lesson ids this lesson depends on.
// Builds-on / leads-to links and interleaved review questions are derived automatically.
function RC(id,html){return `<div class="co recall" data-rl="${id}"><div class="co-h">Recall · <a href="#lesson-${id}" class="rl-t">${id.toUpperCase()}</a></div>${html}</div>`;}
let _LGRAPH=null;
function lessonGraph(){
 if(_LGRAPH) return _LGRAPH;
 const up={},down={};
 Object.values(LESSONS).forEach(L=>{
  const s=new Set();
  (L.recall||[]).forEach(r=>s.add(r[0]));
  (L.builds||[]).forEach(x=>s.add(x));
  L.sections.forEach(sec=>{(sec.html.match(/data-rl="([a-z0-9]+)"/g)||[]).forEach(m=>s.add(m.slice(9,-1)));});
  (L.prereq||[]).forEach(p=>{const t=TERM_BY_ID[p];if(t&&t.lesson)s.add(t.lesson);});
  s.delete(L.id);
  up[L.id]=[...s].filter(x=>LESSONS[x]);
 });
 Object.keys(up).forEach(a=>up[a].forEach(b=>{(down[b]=down[b]||[]).push(a);}));
 return _LGRAPH={up,down};
}
function lessonChip(x){const L=LESSONS[x];if(!L)return "";const m=(S.quiz[x]||0)>=.8;return `<a class="chip ${m?"ok":""}" href="#lesson-${x}" title="${esc(L.title)}">${m?"✓ ":""}${esc(L.code.replace(" · Lesson "," L"))}: ${esc(shortT(L.title))}</a>`;}
function buildsOnHTML(id){const g=lessonGraph(),u=g.up[id]||[];if(!u.length)return "";
 return `<div class="co recall"><div class="co-h">Builds on</div><p style="margin:.2em 0 .5em">This lesson uses ideas taught in these earlier lessons. A ✓ means you have mastered it; if a chip has no tick, skim that lesson first.</p><div class="row" style="gap:6px;flex-wrap:wrap">${u.map(lessonChip).join("")}</div></div>`;}
function leadsToHTML(id){const g=lessonGraph(),d=(g.down[id]||[]);if(!d.length)return "";
 return `<p style="margin-top:1em"><strong>Leads to.</strong> These later lessons call on this one:</p><div class="row" style="gap:6px;flex-wrap:wrap">${d.map(lessonChip).join("")}</div>`;}
function recallWarmHTML(L){
 const items=(L.recall||[]).map(([lid,q,a])=>({lid,q,a}));
 const seen=new Set(items.map(i=>i.q));
 (L.prereq||[]).forEach(p=>{const t=TERM_BY_ID[p];if(!t||t.lesson===L.id||!LESSONS[t.lesson])return;if(items.length>=7)return;
  const q=`What is meant by “${t.t}”?`;if(seen.has(q))return;items.push({lid:t.lesson,q,a:`${t.p||t.b}${t.where?` (${t.where})`:""}`});});
 if(!items.length) return "";
 return `<div class="co recall warm"><div class="co-h">Recall first · ${items.length} question${items.length>1?"s":""} from earlier lessons</div>
 <p class="ui" style="font-size:.85rem;margin:.2em 0 .6em">Answer each from memory, aloud or on paper, then tap to check. Trying to recall strengthens learning more than rereading (Roediger &amp; Karpicke, 2006).</p>
 ${items.map(i=>`<details class="rq"><summary>${esc(i.q)}</summary><div class="ra">${i.a}${LESSONS[i.lid]?` <a class="chip" href="#lesson-${i.lid}">Revisit ${esc(LESSONS[i.lid].code.replace(" · Lesson "," L"))}</a>`:""}</div></details>`).join("")}</div>`;
}
function reviewPool(id){const g=lessonGraph();const seen=new Set([id]);let frontier=[...(g.up[id]||[])],all=[];
 // nearest ancestors first, then their ancestors
 for(let depth=0;depth<3&&frontier.length;depth++){const next=[];frontier.forEach(x=>{if(seen.has(x))return;seen.add(x);all.push([x,depth]);(g.up[x]||[]).forEach(y=>next.push(y));});frontier=next;}
 return all;}
function reviewQs(id,n){
 const pool=reviewPool(id);if(!pool.length)return [];
 const day=Math.floor(Date.now()/864e5);let h=0;for(const c of id)h=(h*31+c.charCodeAt(0))>>>0;
 const out=[];
 for(let k=0;out.length<n&&k<n*4;k++){const [lid]=pool[(h+k+day)%pool.length];const Q=LESSONS[lid].quiz;if(!Q||!Q.length)continue;const q=Q[(h+day*7+k*3)%Q.length];if(!out.some(o=>o.q===q))out.push({lid,q});}
 return out;}
function reviewHTML(id){const R=reviewQs(id,4);if(!R.length)return "";
 return `<section id="review"><h2>Interleaved review</h2><p>Four questions drawn from the lessons this one builds on. They change each day. Mixing old material with new (interleaving) and spacing it out improve long-term retention (Dunlosky et al., 2013; Cepeda et al., 2006). They do not count toward this lesson's mastery.</p>
 ${R.map((r,k)=>`<div class="check"><div class="label">From ${esc(LESSONS[r.lid].code)} · <a href="#lesson-${r.lid}">${esc(shortT(LESSONS[r.lid].title))}</a></div><p style="margin:.3em 0">${esc(r.q.prompt)}</p>${mcqHTML(r.q,`rv-${id}-${k}`)}</div>`).join("")}</section>`;}
function wireReview(v,id){reviewQs(id,4).forEach((r,k)=>{if($(`[data-q="rv-${id}-${k}"]`,v))wireMCQ(v,r.q,`rv-${id}-${k}`,ok=>{S.rv=S.rv||{};S.rv[r.lid]=(S.rv[r.lid]||0)+(ok?1:0);save();});});
 $$(".recall[data-rl]",v).forEach(b=>{const L=LESSONS[b.dataset.rl];const a=b.querySelector(".rl-t");if(L&&a)a.textContent=L.code+" · "+shortT(L.title);else if(a&&!L)a.replaceWith(document.createTextNode(b.dataset.rl.toUpperCase()));});}
