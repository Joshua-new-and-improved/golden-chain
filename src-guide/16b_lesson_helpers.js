// ---------- Lesson helpers (also in 17_y1.js, which now loads with the lessons pack) ----------
function setKey(code,key){YEARS.forEach(y=>y.mods.forEach(m=>{if(m[0]===code)m[3]=key;}));}
function shuffleLesson(L){function h(str){let x=2166136261;for(const c of str){x^=c.charCodeAt(0);x=Math.imul(x,16777619);}return x>>>0;}
 const shuf=q=>{const idx=q.opts.map((_,i)=>i);let seed=h(q.prompt);for(let i=idx.length-1;i>0;i--){seed=Math.imul(seed^(seed>>>15),2246822507)>>>0;const j=seed%(i+1);[idx[i],idx[j]]=[idx[j],idx[i]];}q.opts=idx.map(i=>q.opts[i]);q.ans=idx.indexOf(q.ans);};
 L.quiz.forEach(shuf);L.sections.forEach(s=>shuf(s.check));}
function addTerms(arr){arr.forEach(t=>{if(!TERM_BY_ID[t.id]){TERMS.push(t);TERM_BY_ID[t.id]=t;}});}
