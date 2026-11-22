// ---------- Saints (deep profiles) ----------
// Content lives in the "deep" pack (66a_saints_lib.js). Images: img/saints/<k>.webp (1600px), -s (640px), -xl (2600px).
VIEWS.push("saints");
MORE_LINKS.splice(1,0,["#saints","Saints","Lives in depth"]);
const saImg=(k,sz)=>`img/saints/${k}${sz?"-"+sz:""}.webp`;
function saZoom(k,cap){let o=document.getElementById("sa-zoom");if(!o){o=document.createElement("div");o.id="sa-zoom";document.body.appendChild(o);}
  o.innerHTML=`<button class="sa-zx" aria-label="Close">✕</button><div class="sa-zs"><img src="${saImg(k,"xl")}" alt=""></div><p>${esc(cap||"")} <span class="muted">Tap the picture to see it at full size.</span></p>`;o.hidden=false;
  const s=o.querySelector(".sa-zs"),im=s.querySelector("img");im.onclick=()=>{s.classList.toggle("full");if(s.classList.contains("full")){s.scrollLeft=(im.scrollWidth-s.clientWidth)/2;s.scrollTop=(im.scrollHeight-s.clientHeight)/3;}};
  o.querySelector(".sa-zx").onclick=()=>o.hidden=true;o.onclick=e=>{if(e.target===o)o.hidden=true;};}
document.addEventListener("keydown",e=>{const o=document.getElementById("sa-zoom");if(e.key==="Escape"&&o&&!o.hidden)o.hidden=true;});
function saBind(v){v.querySelectorAll("[data-sz]").forEach(el=>el.onclick=()=>saZoom(el.dataset.sz,el.dataset.cap));}

async function renderSaints(id){
  const v=$("#v-saints");
  if(typeof SAINT_LIB==="undefined"){v.innerHTML='<p class="muted">Loading…</p>';await packLoad("deep");}
  if(id){const s=SAINT_LIB.find(x=>x.id===id);if(s)return saintPage(v,s);}
  v.innerHTML=`<div class="sa-hero" style="--img:url(${saImg("zurbaran")})"><div class="sa-hero-in"><div class="label">Saints</div><h1>The cloud of witnesses</h1><p>Real lives, told in depth: where they came from, what they did, what they actually said, and which famous stories are history and which are legend. Illustrated with museum masterpieces you can zoom into.</p></div></div>
   <div class="sa-grid">${SAINT_LIB.map(s=>`<a class="sa-card" href="#saints-${s.id}"><img src="${saImg(s.img[0].k,"s")}" alt="" loading="lazy" style="object-position:${s.pos||"center"}"><div class="sa-cap"><div class="sa-d">${esc(s.d)}</div><h3>${esc(s.n)}</h3><p>${esc(s.t)}</p></div></a>`).join("")}</div>
   <p class="ui muted sa-credit">Paintings, prints and drawings from the National Gallery of Art, Washington, and The Metropolitan Museum of Art, released as Open Access (CC0). Every quotation is sourced; where a famous line is only attributed, we say so. For the saint of the day, see the <a href="#calendar">Calendar</a>.</p>`;
}
function saintPage(v,s){
  const i=SAINT_LIB.indexOf(s),prev=SAINT_LIB[(i+SAINT_LIB.length-1)%SAINT_LIB.length],next=SAINT_LIB[(i+1)%SAINT_LIB.length];
  const h=s.img[0];
  v.innerHTML=`<article class="sa-page">
   <a class="sa-back ui" href="#saints">‹ All saints</a>
   <header class="sa-top"><button class="sa-art" data-sz="${h.k}" data-cap="${esc(h.c)}" aria-label="Enlarge the picture"><img src="${saImg(h.k)}" alt="${esc(s.n)}" style="object-position:${s.pos||"center"}"></button>
    <div class="sa-head"><div class="label">${esc(s.d)} · Feast ${esc(s.feast)}</div><h1>${esc(s.n)}</h1><div class="sa-sub">${esc(s.t)}</div><p class="sa-tag">${esc(s.tag)}</p></div></header>
   <p class="sa-cred ui muted">${esc(h.c)}</p>
   <dl class="sa-facts">${s.facts.map(([k,x])=>`<div><dt>${esc(k)}</dt><dd>${esc(x)}</dd></div>`).join("")}</dl>
   ${s.life.map((c,n)=>`<section class="sa-ch"><div class="sa-no">${["I","II","III","IV","V","VI"][n]||n+1}</div><h2>${esc(c.h)}</h2>${c.p.map(p=>`<p>${esc(p)}</p>`).join("")}</section>
     ${n===1&&s.img[1]?`<figure class="sa-fig"><button data-sz="${s.img[1].k}" data-cap="${esc(s.img[1].c)}"><img src="${saImg(s.img[1].k)}" alt="" loading="lazy"></button><figcaption>${esc(s.img[1].c)}</figcaption></figure>`:""}
     ${n===2&&s.img[2]?`<figure class="sa-fig"><button data-sz="${s.img[2].k}" data-cap="${esc(s.img[2].c)}"><img src="${saImg(s.img[2].k)}" alt="" loading="lazy"></button><figcaption>${esc(s.img[2].c)}</figcaption></figure>`:""}`).join("")}
   ${s.words.length?`<section class="sa-words"><div class="label">In their own words</div>${s.words.map(w=>`<blockquote><p>“${esc(w.q)}”</p><cite>${esc(w.s)}</cite></blockquote>`).join("")}</section>`:""}
   <section class="sa-myth"><div class="label">History or legend?</div>${s.myth.map(m=>`<div class="sa-m"><div class="sa-mc">${esc(m.c)}</div><div class="sa-mv">${esc(m.v)}</div></div>`).join("")}</section>
   <section class="sa-why"><div class="label">Why they matter now</div><p>${esc(s.why)}</p>${(s.go||[]).length?`<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px">${s.go.map(([t,u])=>`<a class="btn-link" href="${u}">${esc(t)} ›</a>`).join("")}</div>`:""}</section>
   <nav class="sa-nav"><a href="#saints-${prev.id}"><span class="muted ui">Previous</span>${esc(prev.n)}</a><a href="#saints-${next.id}" style="text-align:right"><span class="muted ui">Next</span>${esc(next.n)}</a></nav>
  </article>`;
  saBind(v);window.scrollTo(0,0);
}


// Fade images in as they load (CSS hides lazy images until data-in is set)
(function(){const mark=i=>i.setAttribute("data-in","");const see=i=>{if(i.complete&&i.naturalWidth)mark(i);else{i.addEventListener("load",()=>mark(i),{once:true});i.addEventListener("error",()=>mark(i),{once:true});}};
 const scan=r=>r.querySelectorAll&&r.querySelectorAll('img[loading="lazy"]:not([data-in])').forEach(see);
 new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches&&n.matches('img[loading="lazy"]'))see(n);scan(n);}}))).observe(document.documentElement,{childList:true,subtree:true});
 scan(document);})();
