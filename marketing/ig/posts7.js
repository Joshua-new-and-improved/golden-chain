const {render}=require('./render.js');
const posts=[];const P=(id,slides)=>posts.push({id,slides});
const BK='#0b0907',G='#e6c97a';
const HUD=(l,r)=>`<div class="z" style="display:flex;justify-content:space-between;align-items:center;font:500 22px/1 Mono,monospace;letter-spacing:.16em;text-transform:uppercase;color:${G}"><span>${l}</span><span style="border:1.5px solid ${G};border-radius:999px;padding:12px 20px;background:rgba(11,9,7,.45)">${r}</span></div>`;
const RING=(x,y,d,w=3)=>`<div style="position:absolute;left:${x-d/2}px;top:${y-d/2}px;width:${d}px;height:${d}px;border-radius:50%;border:${w}px solid ${G};box-shadow:0 0 34px rgba(230,201,122,.75),inset 0 0 30px rgba(230,201,122,.35);z-index:2"></div>`;
const FIG=(art,pos,name,head,body,cite,score,shade=62)=>(i,n,h)=>`<div class="s grain" style="background:${BK};color:#f6efe0;padding:72px 80px 70px">
 <div class="art" style="background-image:url(${h.artURL(art)});background-position:${pos}"></div>
 <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,9,7,.62) 0%,rgba(11,9,7,0) 16%,rgba(11,9,7,0) ${100-shade-14}%,rgba(11,9,7,.9) ${100-shade+12}%,${BK} 100%)"></div>
 ${HUD(`Aura check · ${String(i-1).padStart(2,'0')} / 04`,`Aura ${score}`)}
 <div class="spacer"></div>
 <div class="z" style="font:700 23px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:${G}">${name}</div>
 <h1 class="z" style="font-size:98px;line-height:.98;margin-top:18px">${head}</h1>
 <p class="z body" style="margin-top:24px;font-size:33px;line-height:1.42">${body}</p>
 <p class="z" style="margin-top:20px;font:600 21px/1.3 Inter;letter-spacing:.1em;text-transform:uppercase;color:${G};opacity:.9">${cite}</p>
 ${h.foot(i,n)}</div>`;
P('50-aura-check',[
 (i,n,h)=>`<div class="s grain" style="background:${BK};color:#f6efe0;padding:72px 80px 70px">
  <div class="art" style="background-image:url(${h.artURL('h-aura-daniel')});background-position:center top"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(60% 42% at 55% 24%,rgba(11,9,7,0) 0%,rgba(11,9,7,.28) 70%,rgba(11,9,7,.6) 100%)"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,9,7,.5) 0%,rgba(11,9,7,0) 14%,rgba(11,9,7,0) 46%,rgba(11,9,7,.88) 74%,${BK} 100%)"></div>
  ${RING(616,300,250)}
  ${HUD('Aura check','Saints edition')}
  <div class="spacer"></div>
  <div class="z" style="font:400 452px/.8 'Instrument Serif',serif;letter-spacing:-.02em;text-align:center;margin:0 -80px;background:linear-gradient(180deg,#fff6dc 10%,${G} 55%,#a8822f 100%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 10px 30px rgba(0,0,0,.6))">AURA</div>
  <p class="z" style="font:500 italic 50px/1.1 Cormorant,serif;text-align:center;margin-top:26px">The original was a halo.</p>
  ${h.foot(i,n,{swipe:1})}</div>`,
 FIG('h-aura-lions','center 30%','Daniel · Babylon, 6th century BC','Thrown to the lions. <em>The king lost sleep.</em>','His crime was praying at an open window after the king banned it. The king lay awake all night. At dawn he ran to the pit, and Daniel answered politely.','“My God sent his angel and shut the lions’ mouths.” Daniel 6:22','+∞'),
 FIG('h-aura-joan','center top','St Joan of Arc · Rouen, 1431','Nineteen. No lawyer. <em>One trick question.</em>','“Are you in God’s grace?” Yes is presumption; no is a confession. She said: “If I am not, may God put me there; and if I am, may God keep me there.” The notary recalled that her judges were stunned.','Trial record, 24 February 1431','+10,000',63),
 FIG('h-aura-paul','center 12%','St Paul · a prison cell, c. AD 60','Flogged. Stoned. Shipwrecked. <em>Still writing.</em>','Five floggings, three beatings with rods, one stoning, three shipwrecks. Then, in chains, he picks up the pen and writes this:','“Rejoice in the Lord always.” Philippians 4:4 · cf. 2 Corinthians 11:24–25','+5,000',60),
 (i,n,h)=>`<div class="s grain" style="background:radial-gradient(90% 60% at 50% 38%,#241a0c 0%,${BK} 70%);color:#f6efe0;padding:72px 80px 70px">
  <div style="position:absolute;left:0;right:0;top:70px;text-align:center;font:400 640px/1 'Instrument Serif',serif;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:2px rgba(230,201,122,.3)">86</div>
  ${HUD('Aura check · 04 / 04','Aura +86 yrs')}
  <div class="spacer"></div>
  <div class="z" style="font:700 23px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:${G}">St Polycarp · the stadium at Smyrna, c. AD 155</div>
  <p class="z body" style="margin-top:22px;font-size:34px">The proconsul offers the old bishop a deal: curse Christ and walk free.</p>
  <p class="z q" style="margin-top:30px;font-size:74px;line-height:1.1">“Eighty-six years I have served him, and he has done me <em style="color:${G}">no wrong.</em> How can I blaspheme my King who saved me?”</p>
  <p class="z" style="margin-top:26px;font:600 21px/1.3 Inter;letter-spacing:.1em;text-transform:uppercase;color:${G}">Martyrdom of Polycarp, 9</p>
  ${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s grain" style="background:radial-gradient(70% 50% at 50% 40%,#2a1f0e 0%,${BK} 72%);color:#f6efe0;padding:72px 80px 70px;align-items:center;text-align:center">
  ${RING(540,470,600,2.5)}
  <div class="z" style="align-self:stretch">${HUD('Aura · a definition','Final')}</div>
  <div class="z" style="height:600px;flex:none;margin-top:50px;display:flex;flex-direction:column;justify-content:center;width:480px">
   <h1 style="font-size:92px;line-height:.95">Aura isn’t <em>a vibe.</em></h1>
   <p style="font:400 27px/1.45 Inter;margin-top:22px;opacity:.92">Painters drew it as a ring of gold. Theologians called it the <i>aureola</i>, the little golden crown.</p></div>
  <p class="z body" style="margin-top:44px;font-size:33px;max-width:860px">It was never confidence in yourself. Aquinas calls it <b>fortitude</b>: a firm mind when doing good gets costly. It is what a person looks like once God matters more than the lions.</p>
  <p class="z q" style="margin-top:28px;font-size:46px;color:${G}">“Take courage; I have overcome the world.”</p>
  <p class="z" style="margin-top:12px;font:600 21px/1.3 Inter;letter-spacing:.1em;text-transform:uppercase;opacity:.8">John 16:33 · ST II-II, q. 123</p>
  ${h.foot(i,n)}</div>`,
].map(f=>f));
render(posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
