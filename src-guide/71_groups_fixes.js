// ---------- Groups: reliability fixes ----------
// 1. Joining by invite link could run twice (once from the saved invite after sign-in, once when the page re-routed),
//    and the server posts "joined the group" on every call. Now a join runs once, and is skipped if you're already a member.
let GC_JOINING=null;
gcJoin=(orig=>async function(code){
  code=String(code||"").trim().toUpperCase();if(!code)return;
  try{sessionStorage.removeItem("gc-join");}catch(e){}
  if(GC_JOINING===code)return;GC_JOINING=code;setTimeout(()=>{if(GC_JOINING===code)GC_JOINING=null;},20000);
  try{if(GC&&GC_USER){const {data:g}=await GC.from("groups").select("id").eq("invite_code",code).maybeSingle();
    if(g&&g.id){const {data:me}=await GC.from("group_members").select("user_id").eq("group_id",g.id).eq("user_id",GC_USER.id).maybeSingle();
      if(me){toast("You're already in this group");location.hash="#group-"+g.id;return;}}}}catch(e){}
  return orig.call(this,code);
})(gcJoin);
// 2. Duplicate "joined" notices already in a chat are shown once.
gcMsgHTML=(orig=>function(m,prev){
  if(m&&m.kind==="system"&&typeof G!=="undefined"&&G&&G.msgs){const i=G.msgs.indexOf(m);if(i>0){for(let j=0;j<i;j++){const x=G.msgs[j];if(x.kind==="system"&&x.user_id===m.user_id&&x.body===m.body)return "";}}}
  return orig.apply(this,arguments);
})(gcMsgHTML);

// 3. Simpler sign-in: one form (email + password + Continue). Existing users are signed in;
//    new emails get one extra step asking for a name. Wrong passwords offer a reset link,
//    and the reset link opens a "Set a new password" box.
const GC_RECOVERY=(()=>{try{return /[?&]reset=1\b/.test(location.search)||/type=recovery/.test(location.hash);}catch(e){return false;}})();
function gcAuthMsg(e){const m=String((e&&(e.message||e.error_description))||"");
  if(/rate limit|too many/i.test(m))return "Too many tries. Please wait a minute and try again.";
  if(/network|fetch/i.test(m))return "No connection. Check your internet and try again.";
  if(/password.*(6|short|least)/i.test(m))return "Your password needs at least 6 characters.";
  if(/valid email|invalid.*email/i.test(m))return "That email address doesn't look right.";
  return m||"Something went wrong. Please try again.";}
function gcResetUrl(){return PUBLIC_BASE+"?reset=1#groups";}
renderGcAuth=function(v,streakBox,joinCode){
  let last="";try{last=localStorage.getItem("gc-last-email")||"";}catch(e){}
  v.innerHTML=`<div class="label">Groups</div><h1>${joinCode?"Join your group":"Read, pray and learn together"}</h1>
   ${joinCode?`<div class="ga-inv">🎉 You've been invited. Sign in or create a free account and you'll join group <strong>${esc(joinCode)}</strong> straight away.</div>`
     :`<p class="muted" style="max-width:40em">Chat with your group, take on a challenge each week, do studies together and keep each other's Scripture streaks alive.</p>`}
   <div class="gauth ga2" id="ga2"></div>${streakBox}`;
  const box=v.querySelector("#ga2");let em=last,pw="";
  const busy=(b,on,txt)=>{b.disabled=on;if(txt)b.textContent=txt;};
  const done=()=>{try{localStorage.setItem("gc-last-email",em);}catch(e){}toast("Welcome! 🙌");};
  const pwField=(id,ac)=>`<div class="ga-pw"><input id="${id}" type="password" autocomplete="${ac}" minlength="6" required placeholder="At least 6 characters"><button type="button" class="ga-eye" data-eye aria-label="Show password">Show</button></div>`;
  const eye=()=>box.querySelectorAll("[data-eye]").forEach(b=>b.onclick=()=>{const i=b.previousElementSibling;const s=i.type==="password";i.type=s?"text":"password";b.textContent=s?"Hide":"Show";b.setAttribute("aria-label",s?"Hide password":"Show password");});
  const step1=(note)=>{
    box.innerHTML=`<h3 class="ga-h">Sign in or create an account</h3><p class="muted ga-sub">Same box for both. New here? We'll set you up in one more step.</p>
     ${note?`<div class="ga-note">${note}</div>`:""}
     <form id="ga-f" novalidate><label class="label" for="ga-e">Email</label><input id="ga-e" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" required value="${esc(em)}" placeholder="you@example.com">
      <label class="label" for="ga-p">Password</label>${pwField("ga-p","current-password")}
      <div class="ga-err" role="alert" hidden></div>
      <button class="btn primary ga-go" type="submit">Continue</button></form>
     <p class="muted ui ga-foot"><button type="button" class="linklike" data-gforgot>Forgot your password?</button></p>`;
    eye();const f=box.querySelector("#ga-f"),err=box.querySelector(".ga-err"),go=f.querySelector(".ga-go");
    const showErr=t=>{err.textContent=t;err.hidden=!t;};
    (em?box.querySelector("#ga-p"):box.querySelector("#ga-e")).focus({preventScroll:true});
    f.onsubmit=async e=>{e.preventDefault();showErr("");em=box.querySelector("#ga-e").value.trim().toLowerCase();pw=box.querySelector("#ga-p").value;
      if(!/^\S+@\S+\.\S+$/.test(em))return showErr("Please type your email address.");
      if(pw.length<6)return showErr("Your password needs at least 6 characters.");
      busy(go,true,"Checking…");
      try{const {error}=await GC.auth.signInWithPassword({email:em,password:pw});
        if(!error){done();return;}
        if(/invalid login|invalid credentials/i.test(error.message||""))return step2();
        if(/not confirmed/i.test(error.message||""))return showErr("Please open the confirmation email we sent you first.");
        showErr(gcAuthMsg(error));}catch(x){showErr(gcAuthMsg(x));}finally{if(go.isConnected)busy(go,false,"Continue");}};
    box.querySelector("[data-gforgot]").onclick=()=>{em=box.querySelector("#ga-e").value.trim().toLowerCase();forgot();};
  };
  const step2=()=>{
    const guess=(em.split("@")[0]||"").replace(/[._\d]+/g," ").trim().split(" ")[0]||"";
    box.innerHTML=`<h3 class="ga-h">Welcome! Let's create your account</h3>
     <p class="muted ga-sub">We couldn't find an account for <strong>${esc(em)}</strong> with that password.</p>
     <form id="ga-f2"><label class="label" for="ga-n">Your first name (shown to your group)</label><input id="ga-n" autocomplete="given-name" maxlength="40" required value="${esc(guess?guess[0].toUpperCase()+guess.slice(1):"")}">
      <div class="ga-err" role="alert" hidden></div>
      <button class="btn primary ga-go" type="submit">Create my account</button></form>
     <div class="ga-alt"><p class="muted">Already have an account?</p>
      <button type="button" class="btn" data-ga-back>Try my password again</button>
      <button type="button" class="btn" data-gforgot>Email me a reset link</button></div>`;
    const f=box.querySelector("#ga-f2"),err=box.querySelector(".ga-err"),go=f.querySelector(".ga-go");const n=box.querySelector("#ga-n");n.focus({preventScroll:true});n.select();
    box.querySelector("[data-ga-back]").onclick=()=>step1();box.querySelector("[data-gforgot]").onclick=forgot;
    f.onsubmit=async e=>{e.preventDefault();const nm=n.value.trim();if(!nm){err.textContent="Please type your name.";err.hidden=false;return;}
      busy(go,true,"Creating…");
      try{const {data,error}=await GC.auth.signUp({email:em,password:pw,options:{data:{display_name:nm},emailRedirectTo:publicUrl("#groups")}});
        if(error){if(/already|registered|exists/i.test(error.message||""))return step1("That email already has an account, so the password must be wrong. Try again, or tap <b>Forgot your password?</b>");throw error;}
        if(data&&data.user&&Array.isArray(data.user.identities)&&!data.user.identities.length)return step1("That email already has an account, so the password must be wrong. Try again, or tap <b>Forgot your password?</b>");
        if(!data.session){box.innerHTML=`<h3 class="ga-h">Check your email 📬</h3><p>We sent a link to <strong>${esc(em)}</strong>. Tap it, and you'll be signed in.</p>`;return;}
        done();}catch(x){err.textContent=gcAuthMsg(x);err.hidden=false;}finally{if(go.isConnected)busy(go,false,"Create my account");}};
  };
  const forgot=async()=>{
    if(!/^\S+@\S+\.\S+$/.test(em)){step1("Type your email above, then tap <b>Forgot your password?</b> again.");return;}
    try{const {error}=await GC.auth.resetPasswordForEmail(em,{redirectTo:gcResetUrl()});if(error)throw error;
      box.innerHTML=`<h3 class="ga-h">Check your email 📬</h3><p>We sent a reset link to <strong>${esc(em)}</strong>. Tap it on this phone and you can choose a new password.</p><p class="muted ui" style="font-size:.82rem">Not there? Look in Spam or Promotions.</p><button class="btn" data-ga-back>Back to sign in</button>`;
      box.querySelector("[data-ga-back]").onclick=()=>step1();}catch(x){step1(esc(gcAuthMsg(x)));}
  };
  step1();
};
// New password after tapping the reset link.
function gcNewPwSheet(){
  if(document.getElementById("ga-np"))return;
  const d=document.createElement("div");d.id="ga-np";d.className="ga-np";
  d.innerHTML=`<div class="gauth ga2" role="dialog" aria-modal="true" aria-labelledby="ga-np-h"><h3 class="ga-h" id="ga-np-h">Choose a new password</h3>
   <form><label class="label" for="ga-np-p">New password</label><div class="ga-pw"><input id="ga-np-p" type="password" autocomplete="new-password" minlength="6" required placeholder="At least 6 characters"><button type="button" class="ga-eye">Show</button></div>
   <div class="ga-err" role="alert" hidden></div><button class="btn primary ga-go" type="submit">Save password</button>
   <button type="button" class="linklike ga-foot" data-x>Not now</button></form></div>`;
  document.body.appendChild(d);const i=d.querySelector("input"),err=d.querySelector(".ga-err"),go=d.querySelector(".ga-go");i.focus();
  d.querySelector(".ga-eye").onclick=e=>{const s=i.type==="password";i.type=s?"text":"password";e.target.textContent=s?"Hide":"Show";};
  d.querySelector("[data-x]").onclick=()=>d.remove();
  d.querySelector("form").onsubmit=async e=>{e.preventDefault();if(i.value.length<6){err.textContent="At least 6 characters, please.";err.hidden=false;return;}
    go.disabled=true;go.textContent="Saving…";
    try{const {error}=await GC.auth.updateUser({password:i.value});if(error)throw error;d.remove();toast("Password changed. You're signed in ✓");
      try{history.replaceState(null,"",location.pathname+(location.hash||"#groups"));}catch(x){}}
    catch(x){err.textContent=gcAuthMsg(x);err.hidden=false;go.disabled=false;go.textContent="Save password";}};
}
gc=(orig=>async function(){const first=!GC;const r=await orig.apply(this,arguments);
  if(first&&r){r.auth.onAuthStateChange(ev=>{if(ev==="PASSWORD_RECOVERY")setTimeout(gcNewPwSheet,300);});
    if(GC_RECOVERY&&GC_USER)setTimeout(gcNewPwSheet,300);}
  return r;})(gc);
if(GC_RECOVERY)setTimeout(()=>{try{gc();}catch(e){}},50);
