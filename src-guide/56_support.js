// ---------- Support Golden Chain (donations through PayFast) ----------
// The browser never sees the PayFast passphrase: the "payfast" Edge Function signs each checkout and records payments.
VIEWS.push("support","support-thanks");
const SUP_GOAL=2000; // rand per month that covers hosting, the Groups database and writing time
const SUP_ONCE=[50,100,250,500],SUP_MONTH=[30,50,100,250];
let SUP={kind:"once",amt:100,cfg:null};
function supFn(){const c=gcConfig();return c?c.url.replace(/\/$/,"")+"/functions/v1/payfast":null;}
async function supHeaders(json){const c=gcConfig();const h={apikey:c.key};if(json)h["Content-Type"]="application/json";
  try{if(localStorage.getItem("gc-auth")){await gc();const {data}=await GC.auth.getSession();if(data&&data.session)h.Authorization="Bearer "+data.session.access_token;}}catch(e){}
  if(!h.Authorization)h.Authorization="Bearer "+c.key;return h;}
function supTest(){try{return /[?&]test=1/.test(location.search)||localStorage.getItem("gc-pftest")==="1";}catch(e){return false;}}
async function supConfig(){if(SUP.cfg)return SUP.cfg;const u=supFn();if(!u)return {ready:false};
  try{SUP.cfg=await fetch(u+"?a=config",{headers:await supHeaders()}).then(r=>r.json());}catch(e){SUP.cfg={ready:false,offline:true};}return SUP.cfg;}
// Set to true once PayFast has activated the merchant account (until then ?test=1 still shows the form).
const SUP_ACCEPTING=false;
function supOpen(cfg){return !!(cfg&&cfg.ready&&((cfg.mode==="live"&&SUP_ACCEPTING)||supTest()));}
const randFmt=n=>"R"+Math.round(n).toLocaleString("en-ZA").replace(/,/g," ");

async function renderSupport(){
  const v=$("#v-support");
  v.innerHTML=`<div class="sup"><div class="sup-hero"><div class="sup-heart" aria-hidden="true">💛</div><h1>Keep Golden Chain free</h1>
   <p>Golden Chain is free for everyone, with no adverts and no paywall on Scripture, the Mass readings or prayer. If it helps you pray and learn, you can help keep it that way.</p></div>
   <div id="sup-main"><p class="muted">Loading…</p></div></div>`;
  const cfg=await supConfig();const open=supOpen(cfg);const s=(open&&cfg.summary)||{monthly:0,supporters:0,names:[]};
  const pct=Math.min(100,Math.round((s.monthly||0)/SUP_GOAL*100));
  const user=await supUser();
  $("#sup-main").innerHTML=`
   ${cfg.mode==="sandbox"&&open?`<div class="co warn sup-test"><div class="co-h">Test mode</div><p>Payments go to the PayFast sandbox: no real money moves. Use PayFast's test card details on their page.</p></div>`:""}
   ${open?"":"<!--"}<section class="card sup-goal"><div class="sup-gl"><b>${randFmt(s.monthly||0)}</b> of ${randFmt(SUP_GOAL)} a month</div><div class="bar"><i style="width:${pct}%"></i></div>
    <p class="muted ui">${s.supporters?`${s.supporters} ${s.supporters===1?"person has":"people have"} given so far. Thank you!`:"Be one of the first supporters."} Monthly gifts cover hosting, the database behind Groups, the domain and the hours spent writing and checking lessons.</p></section>${open?"":"-->"}
   ${open?supFormHTML(user):`<section class="card sup-soon"><h2>Giving opens soon</h2><p>Online giving is being set up with PayFast. Please check back in a few days. In the meantime, the best way to help is to share Golden Chain with a friend.</p><button class="btn" data-supshare>Share Golden Chain</button></section>`}
   ${user?`<section class="card" id="sup-mine" hidden></section>`:""}
   <section class="card sup-other"><h2>Other ways to help</h2><ul class="sup-ul"><li>🙏 <b>Pray</b> for the people who use it, and for the work.</li><li>📣 <b>Share it</b> with a friend, your parish or your Bible study.</li><li>👥 <b>Start a group</b> and read Scripture together each week.</li><li>✍️ <b>Spot a mistake?</b> Let us know so it can be fixed.</li></ul><button class="btn" data-supshare>Share Golden Chain</button></section>
   ${(s.names||[]).length?`<section class="card sup-wall"><h2>Thank you 💛</h2><p class="sup-names">${s.names.map(n=>`<span>${esc(n)}</span>`).join("")}</p></section>`:""}
   <details class="card sup-faq"><summary><h2 style="display:inline">Questions</h2></summary>
    <h3>Is it safe?</h3><p>Yes. Payments are handled by PayFast, one of South Africa's largest payment providers. Golden Chain never sees or stores your card or bank details.</p>
    <h3>How do I pay?</h3><p>PayFast accepts cards, instant EFT and other methods such as SnapScan, Apple Pay and Capitec Pay (the options you see depend on your bank and device). Monthly gifts are taken from a card.</p>
    <h3>Can I stop a monthly gift?</h3><p>Any time. If you gave while signed in, cancel it below under "Your giving". You can also use the link in PayFast's confirmation email.</p>
    <h3>Is my gift tax-deductible?</h3><p>Not at the moment: Golden Chain is not a registered public benefit organisation, so it can't issue section 18A certificates. PayFast emails you a receipt.</p>
    <h3>What is the money used for?</h3><p>Running costs first (hosting, the Groups database, the domain), then time spent writing, checking and improving lessons and studies. The core of the site will stay free.</p>
    <h3>Will I get anything?</h3><p>Our thanks and prayers. If you're signed in to Groups, a 💛 appears next to your name, and you can choose to have your first name on the thank-you wall.</p></details>
   <p class="muted ui" style="font-size:.75rem;text-align:center;margin:18px 0 6px">Payments are processed securely by PayFast. By giving, you agree that donations are voluntary gifts (you may stop a monthly gift at any time; mistaken payments are refunded). See the <a href="refunds.html">donations and refunds policy</a>, <a href="terms.html">terms</a> and <a href="privacy.html">privacy policy</a>.</p>`;
  v.querySelectorAll("[data-supshare]").forEach(b=>b.onclick=supShare);
  if(open)supWire(v,user);
  if(user)supMine(user);
}
async function supUser(){try{if(!localStorage.getItem("gc-auth"))return null;await gc();const {data}=await GC.auth.getUser();if(!data||!data.user)return null;
  const {data:p}=await GC.from("profiles").select("display_name").eq("id",data.user.id).maybeSingle();return {id:data.user.id,email:data.user.email,name:p&&p.display_name||""};}catch(e){return null;}}
function supFormHTML(u){
  const mOK=!SUP.cfg||SUP.cfg.monthlyOk!==false;if(!mOK)SUP.kind="once";
  const amts=SUP.kind==="monthly"?SUP_MONTH:SUP_ONCE;
  return `<section class="card sup-form" id="sup-form">${mOK?`<div class="seg sup-kind" role="tablist" aria-label="How often"><button data-supk="once" aria-pressed="${SUP.kind==="once"}">Once</button><button data-supk="monthly" aria-pressed="${SUP.kind==="monthly"}">Monthly</button></div>`:""}
   <div class="sup-amts" role="group" aria-label="Amount">${amts.map(a=>`<button data-supa="${a}" aria-pressed="${SUP.amt===a}">${randFmt(a)}</button>`).join("")}<label class="sup-other-amt${amts.includes(SUP.amt)?"":" on"}"><span>R</span><input id="sup-amt" inputmode="numeric" pattern="[0-9]*" placeholder="Other" aria-label="Other amount" value="${amts.includes(SUP.amt)?"":SUP.amt}"></label></div>
   <p class="muted ui sup-note">${SUP.kind==="monthly"?"Taken from your card once a month. Cancel any time.":"A once-off gift by card, instant EFT and more."}</p>
   <label class="label" for="sup-n">Your name <span class="muted">(optional)</span></label><input id="sup-n" maxlength="80" autocomplete="name" value="${esc(u&&u.name||"")}">
   <label class="label" for="sup-e">Email for your receipt <span class="muted">(optional)</span></label><input id="sup-e" type="email" maxlength="100" autocomplete="email" value="${esc(u&&u.email||"")}">
   <label class="label" for="sup-m">A message or prayer intention <span class="muted">(optional)</span></label><textarea id="sup-m" rows="2" maxlength="280"></textarea>
   <label class="sup-chk"><input type="checkbox" id="sup-show"> Show my first name on the thank-you wall</label>
   ${u?"":`<p class="muted ui" style="font-size:.78rem;margin:6px 0 0">Have a Groups account? <a href="#groups">Sign in</a> first and a 💛 will show next to your name.</p>`}
   <button class="btn primary sup-go" data-supgo>${supGoLabel()}</button>
   <p class="muted ui sup-safe">🔒 You'll finish on PayFast's secure page.</p></section>`;
}
function supGoLabel(){return SUP.kind==="monthly"?`Give ${randFmt(SUP.amt||0)} a month`:`Give ${randFmt(SUP.amt||0)}`;}
function supWire(v,u){
  const redraw=()=>{const f=$("#sup-form");if(!f)return;const keep={n:$("#sup-n").value,e:$("#sup-e").value,m:$("#sup-m").value,s:$("#sup-show").checked};f.outerHTML=supFormHTML(u);$("#sup-n").value=keep.n;$("#sup-e").value=keep.e;$("#sup-m").value=keep.m;$("#sup-show").checked=keep.s;supWire(v,u);};
  v.querySelectorAll("[data-supk]").forEach(b=>b.onclick=()=>{if(SUP.kind===b.dataset.supk)return;SUP.kind=b.dataset.supk;SUP.amt=SUP.kind==="monthly"?50:100;redraw();});
  v.querySelectorAll("[data-supa]").forEach(b=>b.onclick=()=>{SUP.amt=+b.dataset.supa;redraw();});
  const oi=$("#sup-amt");oi.oninput=()=>{oi.value=oi.value.replace(/\D/g,"").slice(0,5);SUP.amt=+oi.value||0;v.querySelectorAll("[data-supa]").forEach(b=>b.setAttribute("aria-pressed","false"));oi.closest("label").classList.add("on");$("[data-supgo]").textContent=supGoLabel();};
  oi.onfocus=()=>{if(!oi.value){v.querySelectorAll("[data-supa]").forEach(b=>b.setAttribute("aria-pressed","false"));oi.closest("label").classList.add("on");SUP.amt=0;$("[data-supgo]").textContent=supGoLabel();}};
  $("[data-supgo]").onclick=supCheckout;
}
async function supCheckout(){
  const b=$("[data-supgo]");const min=SUP.kind==="monthly"?20:10;
  if(!(SUP.amt>=min)){toast(`The smallest ${SUP.kind==="monthly"?"monthly gift":"gift"} is R${min}`);$("#sup-amt").focus();return;}
  if(SUP.amt>50000){toast("For gifts over R50 000, please get in touch");return;}
  const e=$("#sup-e").value.trim();if(e&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){toast("Please check your email address");$("#sup-e").focus();return;}
  b.disabled=true;const old=b.textContent;b.textContent="Opening PayFast…";
  try{const r=await fetch(supFn()+"?a=checkout",{method:"POST",headers:await supHeaders(true),body:JSON.stringify({kind:SUP.kind,amount:SUP.amt,name:$("#sup-n").value.trim(),email:e,message:$("#sup-m").value.trim(),show_name:$("#sup-show").checked})});
    const j=await r.json();if(!r.ok||!j.action)throw new Error(j.error||"Could not reach PayFast");
    try{localStorage.setItem("gc-lastgift",j.id);}catch(_){}
    const f=document.createElement("form");f.method="post";f.action=j.action;f.hidden=true;
    j.fields.forEach(([k,val])=>{const i=document.createElement("input");i.type="hidden";i.name=k;i.value=val;f.append(i);});
    document.body.append(f);f.submit();
  }catch(err){toast(err.message||"Something went wrong");b.disabled=false;b.textContent=old;}
}
async function supMine(u){
  const box=$("#sup-mine");if(!box)return;
  const {data}=await GC.from("donations").select("id,kind,amount,status,created_at,payments,paid_total,mode").eq("user_id",u.id).in("status",["paid","active","cancelled"]).order("created_at",{ascending:false}).limit(20);
  if(!data||!data.length)return;
  box.hidden=false;box.innerHTML=`<h2>Your giving</h2><div class="sup-list">${data.map(d=>`<div class="sup-row"><div><b>${d.kind==="monthly"?randFmt(d.amount)+" a month":randFmt(d.amount)+" once"}</b>${d.mode==="sandbox"?` <span class="chip">test</span>`:""}<div class="muted ui">${new Date(d.created_at).toLocaleDateString("en-ZA",{day:"numeric",month:"long",year:"numeric"})} · ${d.status==="active"?`active · ${randFmt(d.paid_total)} given`:d.status==="cancelled"?"stopped":"thank you"}</div></div>${d.status==="active"?`<button class="btn" data-supcancel="${d.id}">Stop</button>`:""}</div>`).join("")}</div>`;
  box.querySelectorAll("[data-supcancel]").forEach(b=>b.onclick=async()=>{if(!confirmInline(b,"Tap again to stop"))return;b.disabled=true;
    try{const r=await fetch(supFn()+"?a=cancel",{method:"POST",headers:await supHeaders(true),body:JSON.stringify({id:b.dataset.supcancel})});const j=await r.json();if(!r.ok)throw new Error(j.error);toast("Your monthly gift has been stopped. Thank you for all you gave 💛");supMine(u);}catch(e){toast(e.message||"Could not stop it right now");b.disabled=false;}});
}
async function supShare(){const url="https://joshua-new-and-improved.github.io/golden-chain/";const text="Golden Chain: the Bible with the Church Fathers, the Mass readings, prayer, and a free Thomist Academy.";
  try{if(navigator.share){await navigator.share({title:"Golden Chain",text,url});return;}}catch(e){if(e&&e.name==="AbortError")return;}
  try{await navigator.clipboard.writeText(text+" "+url);toast("Link copied");}catch(e){toast(url);}}

async function renderSupportThanks(){
  const v=$("#v-support-thanks");const id=(new URLSearchParams(location.search).get("d"))||(()=>{try{return localStorage.getItem("gc-lastgift");}catch(e){return null;}})();
  v.innerHTML=`<div class="sup sup-thanks"><div class="sup-heart big" aria-hidden="true">💛</div><h1>Thank you!</h1><p id="sup-ts" class="muted">Confirming your gift with PayFast…</p>
   <p>Your generosity keeps Golden Chain free for students, parishes and anyone who wants to read Scripture with the Church. Please know you're remembered in prayer.</p>
   <p class="sup-verse">“God loveth a cheerful giver.” <span>(2 Cor 9:7)</span></p>
   <div class="row" style="justify-content:center;gap:8px;margin-top:14px"><a class="btn primary" href="#home">Back to Golden Chain</a><button class="btn" data-supshare>Tell a friend</button></div></div>`;
  v.querySelector("[data-supshare]").onclick=supShare;
  const out=$("#sup-ts");if(!id||!supFn()){out.textContent="";return;}
  for(let i=0;i<15;i++){
    const r=await fetch(supFn()+"?a=status&id="+encodeURIComponent(id),{headers:await supHeaders()}).then(r=>r.ok?r.json():null).catch(()=>null);
    if(!$("#sup-ts"))return;
    if(r&&(r.status==="paid"||r.status==="active")){out.textContent=r.kind==="monthly"?`Your monthly gift of ${randFmt(r.amount)} is set up.${r.mode==="sandbox"?" (test)":""}`:`We've received your gift of ${randFmt(r.amount)}.${r.mode==="sandbox"?" (test)":""}`;out.classList.remove("muted");
      SUP.cfg=null;try{localStorage.removeItem("gc-lastgift");}catch(e){}const cv=document.createElement("canvas");cv.className="confetti-cv";document.body.append(cv);try{confetti(cv);}catch(e){}setTimeout(()=>cv.remove(),3500);return;}
    if(r&&(r.status==="failed"||r.status==="cancelled")){out.textContent="It looks like the payment didn't go through. You haven't been charged.";return;}
    await new Promise(res=>setTimeout(res,2000));
  }
  out.textContent="PayFast is still confirming your payment. You'll get an email receipt from them shortly.";
}

// home card, "More" menu, and the supporter heart in Groups
MORE_LINKS.push(["#support","Support 💛","Keep it free"]);
renderHome=(orig=>function(){const r=orig.apply(this,arguments);try{const v=$("#v-home");if(v&&!v.querySelector(".sup-home"))v.insertAdjacentHTML("beforeend",`<a class="card sup-home" href="#support"><span class="sup-heart" aria-hidden="true">💛</span><span><b>Keep Golden Chain free</b><span class="muted">No ads, no paywall. Help cover the running costs.</span></span><span class="sup-arrow" aria-hidden="true">›</span></a>`);}catch(e){}return r;})(renderHome);
async function gcLoadSupporters(){if(!G)return;try{const {data}=await GC.from("supporters").select("user_id").in("user_id",[...G.members.keys()]);G.sup=new Set((data||[]).map(x=>x.user_id));}catch(e){G.sup=new Set();}}
