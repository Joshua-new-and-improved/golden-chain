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
