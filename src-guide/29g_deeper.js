// ---------- "Go deeper": context, meaning, and the four senses ----------
const SENSES=[
 ["l","Literal","sensus litteralis","Littera gesta docet: the letter teaches what happened","What the words signify as the inspired author intended, figures of speech included. Every other sense is founded on it, and only it can ground a theological argument (ST I q.1 a.10 ad 1; CCC 116)."],
 ["a","Allegorical","sensus allegoricus","Quid credas allegoria: allegory, what you are to believe","How persons, things and events point to Christ, his Church and the sacraments: 'the things of the Old Law signify the things of the New' (ST I q.1 a.10; CCC 117)."],
 ["m","Moral (tropological)","sensus moralis","Moralis quid agas: the moral sense, what you are to do","How 'the things done in Christ, or the things which signify Christ, are types of what we ought to do' (ST I q.1 a.10). From Greek tropos, 'way of life'."],
 ["n","Anagogical","sensus anagogicus","Quo tendas anagogia: anagogy, where you are heading","How the text signifies 'what relates to eternal glory': heaven, judgment, the resurrection (ST I q.1 a.10; CCC 117). From Greek anagōgē, 'a leading upward'."]];
const SENSES_INTRO=`<div class="sn-intro"><p><strong>What are the four senses?</strong> God is the author of Scripture, and he can signify not only by words, as human writers do, but by the very things the words describe (ST I q.1 a.10). So a text has a <em>literal</em> sense (what the words mean) and a <em>spiritual</em> sense (what the realities themselves signify), which tradition divides into three: allegorical, moral and anagogical (CCC 115–117). A medieval verse sums them up, quoted in CCC 118: <em lang="la">"Littera gesta docet, quid credas allegoria, moralis quid agas, quo tendas anagogia."</em></p>
<p class="muted">Two rules keep this sober. First, the spiritual senses rest on the literal and never contradict it; "nothing necessary to faith is contained under the spiritual sense which is not elsewhere put forward by the Scripture in its literal sense" (ST I q.1 a.10 ad 1). Second, the literal sense is found by attending to genre, history and the author's intention (Pius XII, Divino Afflante Spiritu, 1943, §§ 23, 26; Dei Verbum 12), and the whole is read within the living Tradition and the analogy of faith (CCC 112–114).</p></div>`;
function outlineFor(I,ch){if(!I||!I.outline)return null;return I.outline.find(([a,b])=>ch>=a&&ch<=b)||null;}
function asPairs(x){if(!x)return [];if(typeof x==="string")return [["",x]];return x;}
function deeperHTML(e,note){
  const X=(note&&note.x)||{};
  const rs=e.r.filter(r=>!/Psalm|Canticle|Alleluia|Acclamation/.test(r.k)&&r.p&&r.p.length);
  const seen=new Set();const cx=asPairs(X.c).slice();const used=new Set();
  const norm=t=>(t||"").replace(/\s+/g,"").replace(/[–—]/g,"-").toLowerCase();
  const books=rs.map(r=>{const [s,c]=r.p[0];const I=BOOK_INTRO[s];const B=BOOKS[s];const nm=(B&&(B.name||B.drName))||s;
    const o=outlineFor(I,c);const first=!seen.has(s);seen.add(s);
    const mine=cx.filter((p,j)=>{if(used.has(j)||!p[0])return false;const a=norm(p[0]),b=norm(r.ref);const ok=a===b||b.startsWith(a)||a.startsWith(b)||(a.split(":")[0]===b.split(":")[0]);if(ok)used.add(j);return ok;});
    return `<div class="dp-book"><div class="dp-rk">${esc(READ_LABEL[r.k]||r.k)} · ${esc(r.ref)}</div>
     ${I&&first?`<h4>The book: ${esc(nm)}</h4><p class="muted dp-meta">${esc(I.genre||"")}${I.when?" · "+esc(I.when):""}</p><p>${esc(I.lede||"")}</p>`:""}
     ${o?`<p><strong>Where the passage sits.</strong> ${esc(nm)} ${o[0]===o[1]?"chapter "+o[0]:"chapters "+o[0]+"–"+o[1]}: <em>${esc(o[2])}</em>${I&&I.outline?` (section ${I.outline.indexOf(o)+1} of ${I.outline.length})`:""}.</p>`:""}
     ${mine.map(p=>`<div class="dp-sub">This passage</div><p class="dp-ctx">${esc(p[1])}</p>`).join("")}
     ${I?`<a class="dp-more" href="#read-${s}-${c}">Read the full introduction and chapter in the Bible</a>`:""}</div>`;}).join("");
  const ctx=cx.filter((p,j)=>!used.has(j)).map(([h,t])=>`<div class="dp-p">${h?`<div class="vr">${esc(h)}</div>`:""}<p>${esc(t)}</p></div>`).join("");
  const mean=asPairs(X.m).map(([h,t])=>`<div class="dp-p">${h?`<div class="vr">${esc(h)}</div>`:""}<p>${esc(t)}</p></div>`).join("");
  const S4=X.s;
  const senses=S4?`${S4.f?`<p class="dp-focus">Focus text: <strong>${esc(S4.f)}</strong></p>`:""}<div class="sn-grid">${SENSES.map(([k,name,lat,dist,def])=>S4[k]?`<div class="sn sn-${k}"><div class="sn-h"><span class="sn-name">${name}</span> <span class="sn-lat" lang="la">${lat}</span></div><p class="sn-txt">${esc(S4[k])}</p><details class="sn-def"><summary>What is the ${name.split(" ")[0].toLowerCase()} sense?</summary><p><em lang="la">${dist}</em></p><p>${def}</p></details></div>`:"").join("")}</div>`:"";
  return `<section class="deep" id="mj-deep"><div class="label">Go deeper</div><h2>Context, meaning and the four senses</h2>
   <details class="dp" ${note?"":"open"}><summary><span class="dp-n">1</span> Context: the book, the passage, the verse</summary><div class="dp-b">${books}${ctx?`<div class="dp-sub">The passage today</div>${ctx}`:""}</div></details>
   ${mean?`<details class="dp"><summary><span class="dp-n">2</span> What is meant</summary><div class="dp-b">${mean}</div></details>`:""}
   ${senses?`<details class="dp"><summary><span class="dp-n">3</span> The four senses of Scripture</summary><div class="dp-b">${senses}<details class="sn-about"><summary>About the four senses</summary>${SENSES_INTRO}</details></div></details>`:`<details class="dp"><summary><span class="dp-n">${mean?3:2}</span> The four senses of Scripture: what they are</summary><div class="dp-b">${SENSES_INTRO}<div class="sn-grid">${SENSES.map(([k,name,lat,dist,def])=>`<div class="sn sn-${k}"><div class="sn-h"><span class="sn-name">${name}</span> <span class="sn-lat" lang="la">${lat}</span></div><p class="sn-txt"><em lang="la">${dist}</em></p><p class="muted">${def}</p></div>`).join("")}</div></div></details>`}
  </section>`;
}
