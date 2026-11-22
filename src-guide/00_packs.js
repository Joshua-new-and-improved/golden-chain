// ---------- Content packs: the core app is small; big content loads when a page needs it, then stays cached ----------
const PACK_FILES=/*PACK_FILES*/{};
const PACK_OK={};const _packP={};const _packRes={};
// which packs each page needs (first part of the #hash)
const PACK_NEEDS={lesson:["lessons"],academy:["lessons"],progress:["lessons"],
  catechism:["ccc"],theology:["dq"],mass:["mass","intro"],reader:["intro","xref"],read:["intro","xref"],timeline:["intro"],groups:["studies"],group:["studies"],join:["studies"],dq:["dq"],saints:["deep"]};
function packsFor(hash){const h=(hash||"#home").slice(1);const k=h.split("-")[0];return PACK_NEEDS[k]||[];}
function PACK_DONE(n){PACK_OK[n]=1;try{packAfter(n);}catch(e){console.warn(e);}if(_packRes[n])_packRes[n]();}
function packAfter(n){
  if(n==="lessons"){if(typeof _LGRAPH!=="undefined")_LGRAPH=null;}
  if(n==="mass"&&document.body.dataset.view==="home"&&typeof fillHomeToday==="function")fillHomeToday();
}
function packLoad(names){
  return Promise.all([].concat(names).filter(n=>PACK_FILES[n]).map(n=>PACK_OK[n]?Promise.resolve():(_packP[n]||(_packP[n]=new Promise((res,rej)=>{
    _packRes[n]=res;const s=document.createElement("script");s.src=PACK_FILES[n];s.async=true;
    s.onerror=()=>{delete _packP[n];s.remove();rej(new Error("Could not load "+n));};document.head.appendChild(s);})))));}
function packLoading(on){let el=document.getElementById("pack-load");
  if(on){if(!el){el=document.createElement("div");el.id="pack-load";el.innerHTML='<span></span><b>Loading…</b>';document.body.appendChild(el);}el.hidden=false;}
  else if(el)el.hidden=true;}
// warm the packs for the main tabs quietly once the page is idle, unless the phone is saving data
function packWarm(){try{const c=navigator.connection;if(c&&(c.saveData||/2g/.test(c.effectiveType||"")))return;}catch(e){}
  const order=["intro","xref","mass"];let i=0;const next=()=>{if(i>=order.length)return;packLoad(order[i++]).catch(()=>{}).then(()=>setTimeout(next,1500));};
  (window.requestIdleCallback||setTimeout)(next,6000);}
