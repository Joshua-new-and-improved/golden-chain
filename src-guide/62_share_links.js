// ---------- Share links that preview properly in WhatsApp: Catechism sections and Mass days have real pages ----------
publicUrl=(orig=>function(hash){hash=hash||"";let m;
  if((m=hash.match(/^#catechism-(c\d+)$/))&&typeof CCC_SLUGS!=="undefined"&&CCC_SLUGS[m[1]])return PUBLIC_BASE+"catechism/"+CCC_SLUGS[m[1]]+"/";
  if(hash==="#catechism")return PUBLIC_BASE+"catechism/";
  if((m=hash.match(/^#mass-(\d{4}-\d{2}-\d{2})$/))&&m[1]>="2026-10-01"&&m[1]<="2028-12-31")return PUBLIC_BASE+"m/"+m[1]+".html";
  return orig(hash);})(publicUrl);
// a Share button on each Catechism section, and a link to the web pages from the start page
renderCatechism=(orig=>function(arg){const r=orig.apply(this,arguments);try{const v=$("#v-catechism");
  const tools=v.querySelector(".ccc-tools");if(tools&&arg&&!tools.querySelector("[data-cccshare]")){tools.insertAdjacentHTML("beforeend",`<button class="btn" data-cccshare="${arg}">↗ Share</button>`);}
  const cp=v.querySelector(".ccc-copy");if(cp&&!arg&&!v.querySelector(".ccc-web")){cp.insertAdjacentHTML("beforebegin",`<p class="muted ui ccc-web" style="font-size:.85rem">Every section is also a <a href="${PUBLIC_BASE}catechism/" target="_blank" rel="noopener">web page</a> you can send to anyone, even if they don't use the app.</p>`);}
 }catch(e){}return r;})(renderCatechism);
document.addEventListener("click",e=>{const b=e.target.closest("[data-cccshare]");if(!b)return;const n=CCC_NOTES.find(x=>x.id===b.dataset.cccshare);if(!n)return;
  shareThing(n.t,`${n.t} (Catechism §§ ${n.p}): ${CCC_GIST[n.id]||""}`,"#catechism-"+n.id);});
