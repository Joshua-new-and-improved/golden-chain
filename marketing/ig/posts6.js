const {render}=require('./render.js');
const ch=`<span class="chain"><i></i><i></i><i></i></span>`;
const K=(t)=>`<div class="kick">${ch}<span>${t}</span></div>`;
const COVER=(art,pos,kick,title,sub,tag,op=.75)=>(i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL(art)});background-position:${pos};opacity:${op}"></div><div class="shade"></div><div class="z">${tag?`<span class="tag">${tag}</span>`:K(kick)}</div><div class="spacer"></div><h1 class="z l">${title}</h1><p class="z body" style="margin-top:26px">${sub}</p>${h.foot(i,n,{swipe:1})}</div>`;
// generic slides
const V=(lbl,inner)=>(i,n,h)=>`<div class="s vellum grain"><div class="z lbl">${lbl}</div><div class="spacer"></div>${inner}<div class="spacer"></div>${h.foot(i,n)}</div>`;
const I=(lbl,inner)=>(i,n,h)=>`<div class="s ink grain"><div class="z lbl">${lbl}</div><div class="spacer"></div>${inner}<div class="spacer"></div>${h.foot(i,n)}</div>`;
const GOLD=(kick,title,body)=>(i,n,h)=>`<div class="s gold grain"><div class="z">${K(kick)}</div><div class="spacer"></div><h1 class="z m">${title}</h1><p class="z body" style="margin-top:28px;font-weight:600">${body}</p><div class="spacer"></div>${h.foot(i,n)}</div>`;
const LIST=(items,num=true)=>`<div class="z list">${items.map((t,k)=>`<div class="it"><span class="n">${num?k+1:t[0]}</span><span>${num?t:t[1]}</span></div>`).join('')}</div>`;
// joke card: setup / punchline
const JOKE=(setup,punch,dark)=>(i,n,h)=>`<div class="s ${dark?'ink':'vellum'} grain"><div class="z lbl">Joke ${['','I','II','III','IV','V','VI'][i-1]||''}</div><div class="spacer"></div><p class="z body" style="font-size:40px;line-height:1.4">${setup}</p><p class="z q l" style="margin-top:40px">${punch}</p><div class="spacer"></div>${h.foot(i,n)}</div>`;
// chat bubble
const msg=(who,txt,me)=>`<div style="display:flex;flex-direction:column;align-items:${me?'flex-end':'flex-start'};margin-top:20px"><div style="font:700 20px/1 Inter;letter-spacing:.06em;text-transform:uppercase;opacity:.6;margin:0 10px 8px">${who}</div><div style="max-width:780px;padding:22px 28px;border-radius:28px;${me?'background:#c9a24b;color:#16120a;border-bottom-right-radius:8px':'background:#1f2a3a;color:#efe8da;border-bottom-left-radius:8px'};font:400 32px/1.35 Inter">${txt}</div></div>`;
const posts=[];const P=(id,slides,o={})=>posts.push({id,slides,...o});


// ===== Batch 5: creative formats. All art is cropped from 15,000px+ museum scans at 2x slide resolution. =====
const X=`<style>
.bleed{position:absolute;inset:0;background-size:cover;background-position:center}
.chip{display:inline-flex;align-items:center;gap:12px;padding:12px 20px;border-radius:999px;background:rgba(14,21,32,.72);color:#f3ecdf;font:700 20px/1 Inter;letter-spacing:.18em;text-transform:uppercase;backdrop-filter:blur(8px)}
.chip b{color:#e6c97a;font-weight:700}
.capcard{position:absolute;left:0;right:0;bottom:0;padding:150px 92px 76px;background:linear-gradient(180deg,rgba(10,14,20,0) 0%,rgba(10,14,20,.88) 30%,rgba(10,14,20,.97) 100%);color:#f3ecdf;z-index:2}
.capcard h2{font:400 76px/1.02 'Instrument Serif',serif;letter-spacing:-.01em}.capcard p{font:400 32px/1.42 Inter;opacity:.93;margin-top:20px}
.capcard .foot{padding-top:38px}
.mlabel{font:500 21px/1.4 Inter;border-left:2px solid currentColor;padding-left:16px;opacity:.9}.mlabel b{font-weight:700;display:block}
.brm svg{width:44px;height:44px;display:block}
.stamp{display:inline-block;border:5px solid #a3302a;color:#a3302a;padding:10px 18px 8px;font:800 26px/1 Inter;letter-spacing:.16em;text-transform:uppercase;transform:rotate(-5deg);border-radius:6px;opacity:.88}
.spec{border:2px solid #1b1a17;padding:44px 46px;position:relative;background:rgba(255,255,255,.35)}.spec:before{content:"";position:absolute;inset:8px;border:1px solid #1b1a17;opacity:.35}
.spec .no{font:700 21px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:#a3302a}.spec{padding:60px 56px}.spec h2{font:400 104px/.98 'Instrument Serif',serif;margin-top:20px}.spec .lat{font:500 italic 48px/1.2 Cormorant,serif;opacity:.7;margin-top:12px}
.spec dl{margin-top:44px;font:400 40px/1.36 Inter}.spec dt{font:700 21px/1 Inter;letter-spacing:.16em;text-transform:uppercase;color:#a3302a;margin:34px 0 12px}.spec dd{margin:0}
</style>`;
const BR=(h,col)=>`<div style="display:flex;align-items:center;gap:14px;font:600 22px/1 Inter;letter-spacing:.08em;color:${col}"><span class="brm">${h.MARK}</span>${h.HANDLE}</div>`;
// full-bleed detail with numbered chip and caption card
const DETAIL=(art,no,of,title,body,pos='center')=>(i,n,h)=>`${X}<div class="s ink" style="padding:0"><div class="bleed" style="background-image:url(${h.artURL(art)});background-position:${pos}"></div>${no?`<div style="position:absolute;left:70px;top:70px;z-index:2"><span class="chip">Look closer <b>${no} / ${of}</b></span></div>`:''}<div class="capcard"><h2>${title}</h2><p>${body}</p>${h.foot(i,n)}</div></div>`;
// hook cover: headline upper-middle, under 40 characters
const HOOK=(art,pos,tag,title,sub,label,big)=>(i,n,h)=>`${X}<div class="s ink" style="padding:0"><div class="bleed" style="background-image:url(${h.artURL(art)});background-position:${pos}"></div><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,20,.78) 0%,rgba(10,14,20,.5) 34%,rgba(10,14,20,.08) 56%,rgba(10,14,20,.85) 100%)"></div>
<div style="position:absolute;left:84px;right:84px;top:120px;z-index:2;color:#f6efe0"><span class="chip" style="background:#c9a24b;color:#16120a">${tag}</span><h1 style="margin-top:34px;font-size:${big||132}px;line-height:.96">${title}</h1><p style="font:400 36px/1.35 Inter;margin-top:26px;max-width:800px;opacity:.95">${sub}</p></div>
<div style="position:absolute;left:84px;right:84px;bottom:76px;z-index:2;color:#f6efe0;display:flex;justify-content:space-between;align-items:flex-end">${label?`<div class="mlabel">${label}</div>`:BR(h,'#f6efe0')}<span class="swipe">Swipe →</span></div></div>`;

const G='#1f4a2c';
const CUT=(art,h,w,ht,dx)=>`<div style="position:relative;width:${w}px;height:${ht}px;filter:drop-shadow(0 30px 40px rgba(0,0,0,.5))">
 <div style="position:absolute;inset:0;background:url(${h.artURL(art)}) center/cover;clip-path:polygon(0 0,100% 0,100% 55.5%,0 45.5%);transform:translate(${-dx}px,-18px) rotate(-1.6deg)"></div>
 <div style="position:absolute;inset:0;background:url(${h.artURL(art)}) center/cover;clip-path:polygon(0 46.5%,100% 56.5%,100% 100%,0 100%);transform:translate(${dx}px,18px) rotate(1.6deg)"></div></div>`;
P('49-st-martin-cloak',[
 (i,n,h)=>`${X}<div class="s grain" style="padding:0;background:radial-gradient(110% 70% at 50% 30%,#2f6a3f 0%,${G} 55%,#0f2a18 100%);color:#fbf4e6;align-items:center">
  <div class="z" style="margin-top:78px"><span class="chip" style="background:#c9a24b;color:#16120a">St Martin of Tours · 11 Nov</span></div>
  <h1 class="z" style="font-size:170px;line-height:.9;margin-top:22px;letter-spacing:-.02em">He cut it <em style="color:#e6c97a">in half.</em></h1>
  <div class="z" style="margin-top:52px">${CUT('h-martin-cover',h,800,1000,30)}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:300px;background:linear-gradient(180deg,rgba(15,42,24,0),rgba(15,42,24,.95));z-index:3"></div>
  <div style="position:absolute;left:84px;right:84px;bottom:76px;z-index:4;display:flex;justify-content:space-between;align-items:flex-end"><div class="mlabel"><b>El Greco</b>Saint Martin and the Beggar, 1597/99</div><span class="swipe">Swipe →</span></div></div>`,
 DETAIL('h-martin-knight','','','Amiens. Winter, around AD 335.','Martin is a young Roman cavalry officer, about eighteen, and not yet baptised. He has already given away everything he carries except his weapons and his cloak.','center 10%'),
 DETAIL('h-martin-beggar','','','A man at the gate with no coat.','He is freezing and begging the passers-by for help. Everyone walks on. Martin stops his horse.','center 20%'),
 DETAIL('h-martin-sword','','','So he draws his sword.','He cuts the cloak in two and gives half away. Some bystanders laugh at how ridiculous he now looks. El Greco paints the exact second the blade meets the cloth.'),
 (i,n,h)=>`${X}<div class="s grain" style="background:linear-gradient(170deg,#0f2a18,#0b1a12);color:#fbf4e6"><div class="z lbl" style="color:#e6c97a">That night he dreamed</div><div class="spacer"></div><p class="z body" style="font-size:38px">He saw Christ, wearing the half-cloak, saying to the angels:</p><p class="z q l" style="margin-top:34px;font-size:80px">“Martin, still only a catechumen, has clothed <em style="color:#e6c97a">me</em> with this robe.”</p><p class="z cite" style="margin-top:30px;color:#e6c97a">Sulpicius Severus, Life of St Martin, 3 · cf. Matthew 25:40</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`${X}<div class="s vellum grain"><div class="z lbl">You say his cloak every week</div><div class="spacer"></div><div class="z" style="font:400 150px/.98 'Instrument Serif',serif;letter-spacing:-.01em"><div style="opacity:.35">cappa</div><div style="opacity:.6">capella</div><div style="color:#a3302a">chapel.</div></div><p class="z body" style="font-size:36px;margin-top:40px">The Frankish kings kept Martin’s cloak (<i>cappa</i>) as their most precious relic. The shrine that housed it was the <i>capella</i>; the priests who guarded it, the <i>cappellani</i>.</p><p class="z body" style="font-size:36px;margin-top:20px;font-weight:700">Every chapel and every chaplain is named after half a coat.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`${X}<div class="s grain" style="padding:80px 84px 76px;background:radial-gradient(110% 70% at 30% 40%,#2f6a3f 0%,${G} 55%,#0f2a18 100%);color:#fbf4e6"><div class="row z" style="gap:56px;align-items:center;flex:1"><img src="${h.artURL('h-martin-full')}" style="height:1010px;border-radius:4px;box-shadow:0 30px 70px rgba(0,0,0,.55)"><div><div class="lbl" style="color:#e6c97a">Feast · 11 November</div><h2 style="font-size:80px;line-height:1">You don’t need much to give.</h2><h2 style="font-size:80px;line-height:1;color:#e6c97a;font-style:italic;margin-top:10px">Half will do.</h2><div class="mlabel" style="margin-top:40px"><b>El Greco</b>Saint Martin and the Beggar<br>National Gallery of Art, Washington</div></div></div>${h.foot(i,n)}</div>`,
]);
const only=process.argv[2];
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
