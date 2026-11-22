// ---------- Multi-lesson modules ----------
// A module is identified by the key of its first lesson (as stored in YEARS); further lessons declare mod:"<first key>".
(function(){const y=YEARS.find(y=>/^Integration track/.test(y.y));
 if(y) y.mods=[["P1","Foundations of integration",8,"p1"],["P2","The domains of psychology, read theologically",12,"p5"],["P3","Clinical conditions: where they come from and how to care",16,"p12"],["P4","Persons in relationship and the work of care",10,"p20"]];})();
const MODULE_LESSONS={};
Object.values(LESSONS).forEach((L,ix)=>{const m=L.mod||L.id;(MODULE_LESSONS[m]=MODULE_LESSONS[m]||[]).push([L.id,L.id===m?-1:(L.ord!=null?L.ord:1000+ix)]);});
Object.keys(MODULE_LESSONS).forEach(m=>{MODULE_LESSONS[m]=MODULE_LESSONS[m].sort((a,b)=>a[1]-b[1]).map(x=>x[0]);});
function modLessons(k){return (MODULE_LESSONS[k]||[k]).filter(x=>LESSONS[x]);}
function modOf(id){const L=LESSONS[id];return (L&&L.mod)||id;}
function modScore(k){const ls=modLessons(k);const sc=ls.map(x=>S.quiz[x]);if(sc.every(v=>v==null))return null;if(sc.every(v=>v!=null))return Math.min(...sc);return sc.reduce((a,v)=>a+(v||0),0)/ls.length;}
// ---------- Lesson completion (ticked by the student) ----------
function isDone(x){return !!(S.complete&&S.complete[x]);}
function isMastered(x){return (S.quiz[x]||0)>=.8;}
function setDone(x,v){S.complete=S.complete||{};if(v)S.complete[x]=Date.now();else delete S.complete[x];save();}
function modDone(k){const ls=modLessons(k);return [ls.filter(isDone).length,ls.length];}
function doneTick(x,label){const d=isDone(x);return `<label class="done-tick${d?" on":""}" title="${d?"Completed: tap to undo":"Mark as completed"}"><input type="checkbox" data-done="${x}" ${d?"checked":""}><span class="dt-box" aria-hidden="true"></span>${label?`<span class="dt-l">${d?"Completed":"Mark complete"}</span>`:`<span class="sr">Completed</span>`}</label>`;}
function modStatus(key){if(!key||!LESSONS[key]) return ["In preparation",""];const [d,n]=modDone(key);
 if(d===n) return ["Completed","ok"];if(d>0) return [`${d}/${n} completed`,"prog"];
 const b=modScore(key);if(b!=null) return ["In progress","prog"];return ["Not started",""];}
function nextLesson(k){const ls=modLessons(k);return ls.find(x=>!isDone(x))||ls[0];}
function moduleBar(id){const m=modOf(id),ls=modLessons(m);if(ls.length<2)return "";const i=ls.indexOf(id);
 const code=(YEARS.flatMap(y=>y.mods).find(x=>x[3]===m)||[""])[0];
 return `<nav class="co extra" aria-label="Module lessons" style="margin-top:0"><div class="co-h">Module ${esc(code)} · lesson ${i+1} of ${ls.length}</div><div class="row" style="gap:6px;flex-wrap:wrap">${ls.map((x,n)=>`<a class="chip ${x===id?"cur":isDone(x)?"ok":""}" href="#lesson-${x}" title="${esc(LESSONS[x].title)}">${isDone(x)?"✓ ":""}${n+1}. ${esc(shortT(LESSONS[x].title))}</a>`).join("")}</div>
  <div class="row" style="justify-content:space-between;margin-top:8px">${i>0?`<a class="btn " href="#lesson-${ls[i-1]}">← Previous lesson</a>`:"<span></span>"}${i<ls.length-1?`<a class="btn primary" href="#lesson-${ls[i+1]}">Next lesson →</a>`:""}</div></nav>`;}

function shortT(t){t=t.split(/[:(]/)[0].trim();return t.length>42?t.slice(0,40).replace(/\s+\S*$/,"")+"…":t;}

// keep every tick for the same lesson in sync, wherever it appears
document.addEventListener("change",e=>{const c=e.target.closest("input[data-done]");if(!c)return;const x=c.dataset.done,v=c.checked;setDone(x,v);
 document.querySelectorAll(`input[data-done="${x}"]`).forEach(i=>{i.checked=v;const l=i.closest(".done-tick");if(l){l.classList.toggle("on",v);const t=l.querySelector(".dt-l");if(t)t.textContent=v?"Completed":"Mark complete";}const li=i.closest("li");if(li)li.classList.toggle("done",v);});
 document.querySelectorAll(`[data-lessonmark="${x}"]`).forEach(el=>el.hidden=!v);
 const m=modOf(x);document.querySelectorAll(`[data-modprog="${m}"]`).forEach(el=>{const [d,n]=modDone(m);el.querySelector("i").style.width=(d/n*100)+"%";const t=el.querySelector(".mp-t");if(t)t.textContent=`${d} of ${n} completed`;});
 document.querySelectorAll("[data-pathcount]").forEach(el=>{el.textContent=Object.keys(LESSONS).filter(isDone).length;});
 const cc=document.getElementById("complete-card");if(cc&&cc.dataset.lesson===x)cc.classList.toggle("is-done",v);
 toast(v?`Marked complete: ${shortT(LESSONS[x].title)}`:"Marked as not completed");});
