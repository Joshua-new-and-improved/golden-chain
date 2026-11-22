// ---------- Pack hooks: places outside a pack's own page that need its content ----------
// A Catechism card in a group chat: load the notes, then redraw the cards
cccGroupCardHTML=(orig=>function(m){if(PACK_OK.ccc)return orig(m);
  packLoad("ccc").then(()=>{try{(G&&G.msgs||[]).filter(x=>x.data&&x.data.ccc).forEach(x=>gcRerender(x.id));}catch(e){}}).catch(()=>{});
  const d=m.data.ccc;return `<div class="gcard gccc"><div class="gc-k">📖 Catechism</div><h4>${esc(d.t||"")}</h4><p class="muted ui" style="font-size:.8rem">Loading…</p></div>`;})(cccGroupCardHTML);
// The Catechism "Set for group" sheet lists every section
cccAssignSheet=(orig=>function(){const a=arguments;packLoad("ccc").then(()=>orig.apply(this,a)).catch(()=>toast("Couldn't load the Catechism notes."));})(cccAssignSheet);
// Sharing a lesson needs the full lesson list only for titles, which the core index has
// Warm the reader's packs once the first page is up
window.addEventListener("load",()=>{try{packWarm();}catch(e){}});
