// ---------- Plain-English guide to each chapter (guide/<slug>.json, built by tools/guide.py) ----------
const GUIDE={idx:null,books:{}};
async function guideFor(slug,ch){
  try{
    if(!GUIDE.idx)GUIDE.idx=await fetchJSON("guide/index.json");
    if(!GUIDE.idx[slug])return null;
    if(!GUIDE.books[slug])GUIDE.books[slug]=await fetchJSON("guide/"+slug+".json");
    return GUIDE.books[slug][ch]||null;
  }catch(e){return null;}
}
function guideHTML(slug,ch,g){
  return `<div class="before guide-box"><div class="bh">In plain words · ${esc(slug==="psalms"?"Psalm":nameOf(slug))} ${ch}</div><div class="bb"><p class="g-t">${esc(g[0])}</p><p>${esc(g[1])}</p><p class="g-w"><strong>Why it matters:</strong> ${esc(g[2])}</p><p class="ui muted g-n">A short guide in today's English, to read before the chapter. The Fathers, St Thomas and Haydock follow on each verse.</p></div></div>`;
}
{const _cch=commChapterHead;
 commChapterHead=async function(slug,ch,d){const [base,g]=await Promise.all([_cch(slug,ch,d),guideFor(slug,ch)]);return (g?guideHTML(slug,ch,g):"")+base;};}
