// Redesign of every unposted carousel: eye-catching covers in five rotating styles, a continuous art "spine" on inner slides,
// and full-resolution museum scans (4096 px) for every picture.
const {render}=require('./render.js');const fs=require('fs');
const ch=`<span class="chain"><i></i><i></i><i></i></span>`;
const K=(t,c='')=>`<div class="kick ${c}">${ch}<span>${t}</span></div>`;
const META=Object.assign(JSON.parse(fs.readFileSync('/tmp/claude-0/hi/oldmeta.json','utf8')),{
 'h-david-mary':{a:'Gerard David',t:'The Rest on the Flight into Egypt',d:'c. 1510'},'h-tondo-magi':{a:'Fra Angelico and Fra Filippo Lippi',t:'The Adoration of the Magi',d:'c. 1440/60'},
 creation:{a:'Giovanni di Paolo',t:'The Creation of the World',d:'1445'},nicholas:{a:'Gentile da Fabriano',t:'The Sick Cured at the Tomb of Saint Nicholas',d:'1425'}});
const CFG={
 '07-app-tour':{st:'split',col:'#12233b'},'09-study-group-holy':{st:'arch',col:'#22382f'},'10-thomist-jokes':{st:'round'},'11-lectio-divina':{st:'hook'},
 '12-dumb-ox':{st:'frame',col:'#5a1f1c'},'13-is-anxiety-a-sin':{st:'arch',col:'#27405a',art:'h-david-mary',pos:'center 20%'},'14-not-yet':{st:'split',col:'#6a1d1a'},'15-why-confession':{st:'hook'},
 '16-turn-me-over':{st:'round'},'17-christ-the-king':{st:'arch',col:'#8a6a1f',art:'h-tondo-magi',pos:'center 40%'},'18-how-to-study':{st:'frame',col:'#24382f'},'19-fathers-group-chat':{st:'split',col:'#0e1520'},
 '20-not-worthy':{st:'hook'},'21-advent-explained':{st:'arch',col:'#3a2a55'},'22-advent-challenge':{st:'split',col:'#3a2a55'},'23-st-andrew-novena':{st:'hook'},'24-fathers-cheat-sheet':{st:'round'},
 '26-lewis-trilemma':{st:'split',col:'#6a1d1a'},'27-screwtape-phone':{st:'hook'},'28-st-nicholas':{st:'frame',col:'#6a1d1a',art:'nicholas'},'29-made-for-another-world':{st:'hook'},'30-immaculate-conception':{st:'arch',col:'#1c3766'},
 '32-stumbled-into-existence':{st:'hook',art:'creation',pos:'left center'},'34-big-bang-priest':{st:'split',col:'#12233b'},'36-universe-speaks-maths':{st:'arch',col:'#14403f'},'38-something-rather-than-nothing':{st:'hook'}};
const X=`<style>
.bleed{position:absolute;inset:0;background-size:cover;background-position:center}
.chip{display:inline-flex;align-items:center;gap:12px;padding:12px 20px;border-radius:999px;background:#c9a24b;color:#16120a;font:700 20px/1 Inter;letter-spacing:.18em;text-transform:uppercase}
.mlabel{font:500 21px/1.4 Inter;border-left:2px solid currentColor;padding-left:16px;opacity:.9}.mlabel b{font-weight:700;display:block}
.cv h1{letter-spacing:-.015em}.cv h1 em{font-style:italic;color:#e6c97a}.cv.paper h1 em{color:#a3302a}
.cv .sub{font:400 34px/1.35 Inter;opacity:.95}
.brm svg{width:44px;height:44px;display:block}
.spine{position:absolute;right:0;top:0;bottom:0;width:96px;background-size:auto 1350px;z-index:1;box-shadow:-1px 0 0 rgba(0,0,0,.25)}
.sp{padding-right:150px!important}
</style>`;
const plain=t=>t.replace(/<[^>]+>/g,'');
const fit=(t,steps)=>{const n=plain(t).length;for(const [max,sz] of steps)if(n<=max)return sz;return steps[steps.length-1][1];};
const BR=(h,col)=>`<div style="display:flex;align-items:center;gap:14px;font:600 22px/1 Inter;letter-spacing:.08em;color:${col}"><span class="brm">${h.MARK}</span>${h.HANDLE}</div>`;
const LBL=a=>{const m=META[a];return m?`<div class="mlabel"><b>${m.a}</b>${m.t}${m.d?', '+m.d:''}</div>`:'';};
const FT=(h,col,a)=>`<div style="display:flex;justify-content:space-between;align-items:flex-end;color:${col}">${BR(h,col)}<span class="swipe">Swipe →</span></div>`;
const COVERS={
 hook:(c,k,title,sub,h)=>`<div class="s ink cv" style="padding:0"><div class="bleed" style="background-image:url(${h.artURL(c.art)});background-position:${c.pos}"></div><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,20,.82) 0%,rgba(10,14,20,.58) 36%,rgba(10,14,20,.1) 60%,rgba(10,14,20,.88) 100%)"></div>
  <div style="position:absolute;left:84px;right:84px;top:110px;z-index:2;color:#f6efe0"><span class="chip">${k}</span><h1 style="margin-top:32px;font-size:${fit(title,[[20,160],[34,128],[50,106],[66,92],[999,80]])}px;line-height:.97">${title}</h1><p class="sub" style="margin-top:26px;max-width:820px">${sub}</p></div>
  <div style="position:absolute;left:84px;right:84px;bottom:76px;z-index:2;color:#f6efe0;display:flex;justify-content:space-between;align-items:flex-end">${LBL(c.art)||BR(h,'#f6efe0')}<span class="swipe">Swipe →</span></div></div>`,
 arch:(c,k,title,sub,h)=>`<div class="s grain cv" style="padding:0;background:radial-gradient(120% 70% at 50% 20%,color-mix(in srgb,${c.col} 78%,#fff) 0%,${c.col} 60%,color-mix(in srgb,${c.col} 70%,#000) 100%);color:#fbf4e6">
  <div style="position:absolute;left:150px;right:150px;top:${plain(title).length>44?640:580}px;bottom:0;border-radius:390px 390px 0 0;background:url(${h.artURL(c.art)}) ${c.pos}/cover;box-shadow:0 0 0 12px rgba(255,255,255,.14),0 0 0 13px rgba(0,0,0,.2)"></div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:260px;background:linear-gradient(180deg,transparent,color-mix(in srgb,${c.col} 65%,#000));z-index:1"></div>
  <div class="z" style="padding:84px 84px 0;text-align:center"><span class="chip">${k}</span><h1 style="margin-top:28px;font-size:${fit(title,[[24,132],[36,108],[50,92],[999,78]])}px;line-height:.98">${title}</h1><p class="sub" style="margin-top:20px;font-size:31px">${sub}</p></div>
  <div style="position:absolute;left:84px;right:84px;bottom:76px;z-index:2">${FT(h,'#fbf4e6')}</div></div>`,
 split:(c,k,title,sub,h)=>`<div class="s cv" style="padding:0;background:${c.col};color:#fbf4e6"><div style="height:700px;background:url(${h.artURL(c.art)}) ${c.pos}/cover;position:relative"><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 70%,${c.col} 100%)"></div></div>
  <div class="z grain" style="position:relative;flex:1;padding:0 84px 76px;display:flex;flex-direction:column"><div style="margin-top:-24px"><span class="chip">${k}</span></div><h1 style="margin-top:26px;font-size:${fit(title,[[24,146],[38,122],[54,102],[999,86]])}px;line-height:.98">${title}</h1><p class="sub" style="margin-top:20px;font-size:31px">${sub}</p><div style="margin-top:auto">${FT(h,'#fbf4e6')}</div></div></div>`,
 frame:(c,k,title,sub,h)=>`<div class="s grain cv" style="padding:84px 84px 76px;background:radial-gradient(90% 60% at 40% 50%,color-mix(in srgb,${c.col} 80%,#fff) 0%,${c.col} 55%,color-mix(in srgb,${c.col} 60%,#000) 100%);color:#fbf4e6">
  <div class="z"><span class="chip">${k}</span><h1 style="margin-top:26px;font-size:${fit(title,[[26,128],[40,106],[56,90],[999,78]])}px;line-height:.98">${title}</h1></div>
  <div class="z" style="display:flex;gap:40px;align-items:flex-end;margin-top:40px;flex:1;min-height:0"><div style="flex:none;padding:16px;background:linear-gradient(135deg,#d9b866,#8a6a2a 45%,#e6c97a 60%,#7a5c22);box-shadow:0 40px 60px rgba(0,0,0,.55)"><img src="${h.artURL(c.art)}" style="display:block;height:${plain(title).length>40?660:740}px;max-width:580px;object-fit:cover;object-position:${c.pos};box-shadow:0 0 0 3px #3a2c10"></div>
   <div style="padding-bottom:6px"><p class="sub" style="font-size:36px;line-height:1.3">${sub}</p>${META[c.art]?`<div style="background:#f3ecdf;color:#1b1a17;padding:18px 20px;font:500 19px/1.4 Inter;margin-top:26px;box-shadow:0 10px 20px rgba(0,0,0,.35)"><b style="display:block;font-weight:700">${META[c.art].a}</b><i>${META[c.art].t}</i>${META[c.art].d?', '+META[c.art].d:''}</div>`:''}</div></div>
  <div class="z" style="margin-top:34px">${FT(h,'#fbf4e6')}</div></div>`,
 round:(c,k,title,sub,h)=>`<div class="s vellum grain cv paper" style="padding:84px 84px 76px;background:#ece3d0;background-image:radial-gradient(120% 90% at 30% 10%,#f6efdf 0%,#ebe1cc 60%,#dfd2b8 100%)">
  <div style="position:absolute;right:-190px;bottom:-150px;width:940px;height:940px;border-radius:50%;background:url(${h.artURL(c.art)}) ${c.pos}/cover;box-shadow:0 0 0 2px #b08a3c,0 0 0 22px #ece3d0,0 0 0 24px #b08a3c,0 30px 60px rgba(60,40,10,.3)"></div>
  <div class="z"><span class="chip" style="background:#a3302a;color:#fff">${k}</span><h1 style="margin-top:28px;font-size:${fit(title,[[24,140],[38,116],[54,98],[999,84]])}px;line-height:.96;color:#1a1713;max-width:900px">${title}</h1><p class="sub" style="margin-top:22px;max-width:560px;color:#3a332a;font-size:32px">${sub}</p></div>
  <div class="spacer"></div><div class="z" style="display:flex;flex-direction:column;gap:22px;align-items:flex-start"><span class="swipe" style="background:#1a1713;color:#f3ecdf;padding:12px 18px;border-radius:999px">Swipe →</span><div style="background:#ece3d0;padding:8px 14px 8px 8px;border-radius:999px">${BR(h,'#3a332a')}</div></div></div>`};
const COVER=(art,pos,kick,title,sub,tag,op)=>{const f=(i,n,h)=>{const c=h.ctx;return X+COVERS[c.st]({...c,art:c.art||art,pos:c.pos||pos},tag||kick,title,sub,h);};f.art=art;return f;};
const SPINE=(i,n,h)=>h.ctx&&h.ctx.art?`${X}<div class="spine" style="background-image:url(${h.artURL(h.ctx.art)});background-position:${n>2?Math.round((i-2)/(n-2)*80+10):50}% center"></div>`:'';
const V=(lbl,inner)=>(i,n,h)=>`<div class="s vellum grain sp">${SPINE(i,n,h)}<div class="z lbl">${lbl}</div><div class="spacer"></div>${inner}<div class="spacer"></div>${h.foot(i,n)}</div>`;
const I=(lbl,inner)=>(i,n,h)=>`<div class="s ink grain sp">${SPINE(i,n,h)}<div class="z lbl">${lbl}</div><div class="spacer"></div>${inner}<div class="spacer"></div>${h.foot(i,n)}</div>`;
const GOLD=(kick,title,body)=>(i,n,h)=>`<div class="s gold grain"><div class="z">${K(kick)}</div><div class="spacer"></div><h1 class="z m">${title}</h1><p class="z body" style="margin-top:28px;font-weight:600">${body}</p><div class="spacer"></div>${h.foot(i,n)}</div>`;
const LIST=(items,num=true)=>`<div class="z list">${items.map((t,k)=>`<div class="it"><span class="n">${num?k+1:t[0]}</span><span>${num?t:t[1]}</span></div>`).join('')}</div>`;
const JOKE=(setup,punch,dark)=>(i,n,h)=>`<div class="s ${dark?'ink':'vellum'} grain sp">${SPINE(i,n,h)}<div class="z lbl">Joke ${['','I','II','III','IV','V','VI'][i-1]||''}</div><div class="spacer"></div><p class="z body" style="font-size:40px;line-height:1.4">${setup}</p><p class="z q l" style="margin-top:40px">${punch}</p><div class="spacer"></div>${h.foot(i,n)}</div>`;
const msg=(who,txt,me)=>`<div style="display:flex;flex-direction:column;align-items:${me?'flex-end':'flex-start'};margin-top:20px"><div style="font:700 20px/1 Inter;letter-spacing:.06em;text-transform:uppercase;opacity:.6;margin:0 10px 8px">${who}</div><div style="max-width:760px;padding:22px 28px;border-radius:28px;${me?'background:#c9a24b;color:#16120a;border-bottom-right-radius:8px':'background:#1f2a3a;color:#efe8da;border-bottom-left-radius:8px'};font:400 32px/1.35 Inter">${txt}</div></div>`;
const posts=[];
const P=(id,slides,o={})=>{const c=CFG[id];if(!c)return;const ctx={...c,art:c.art||slides[0].art,id};posts.push({id,slides:slides.map(s=>(i,n,h)=>s(i,n,{...h,ctx})),...o});};

// 01 · Brand intro: the Catena Aurea story
P('01-golden-chain-story',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('thomas-print')});background-position:center 20%;opacity:.55"></div><div class="shade"></div>
   <div class="z">${K('Catholic lore')}</div><div class="spacer"></div>
   <h1 class="z xl">In 1263, Thomas Aquinas built a <em>chain.</em></h1>
   <p class="z body" style="margin-top:28px">Not out of iron. Out of saints.</p>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('The commission')}</div><div class="spacer"></div>
   <p class="z body" style="font-size:40px;line-height:1.45"><span class="drop">P</span>ope Urban IV asked him for a commentary on the four Gospels. Thomas didn't just write his own thoughts.</p>
   <p class="z body" style="font-size:40px;line-height:1.45;margin-top:30px">He went through <span class="mark"><b>every verse</b></span> and gathered what the Church Fathers had said about it, over 1,000 years of them.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain center"><div class="z">${K('By the numbers')}</div><div class="spacer"></div>
   <h1 class="z" style="font-size:300px;line-height:.9;color:var(--gold2)">80+</h1>
   <h2 class="z" style="margin-top:20px">Greek and Latin Fathers, quoted verse by verse.</h2>
   <p class="z body sm" style="margin-top:26px">Augustine, Chrysostom, Jerome, Ambrose, Gregory, Origen, Hilary…</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('The name')}</div><div class="spacer"></div>
   <h1 class="z l">They called it the <em>Catena Aurea</em>.</h1><p class="z q" style="margin-top:30px">“The Golden Chain”</p>
   <p class="z body" style="margin-top:34px">Each saint a link. Each link holding on to the one before it, all the way back to the apostles.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('So we built an app for that')}</div>
   <div class="z row" style="margin-top:50px"><div class="phone" style="flex:none;width:420px;transform:rotate(-3deg)"><img src="${h.shotURL('reader2')}"></div>
   <div><h2>Read the Bible with the saints <em>beside you.</em></h2><p class="body sm" style="margin-top:26px">Tap any verse. See what Augustine, Chrysostom and Aquinas said about it.</p></div></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Golden Chain')}</div><div class="spacer"></div><h1 class="z m">Everything in one place.</h1>
   <div class="z list" style="margin-top:44px">${[['📖','The Bible, traditional or modern English, with the Fathers on every verse'],['✝️','Today’s Mass readings, explained'],['📜','The whole Catechism in 96 short sections'],['🙏','Prayers for every part of your day'],['👥','Groups to read and pray with friends']].map(([n,t])=>`<div class="it"><span class="n" style="font-size:40px">${n}</span><span>${t}</span></div>`).join('')}</div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><div class="z seal" style="width:220px;height:220px;margin:0 auto 34px">${h.SEAL.replace('<svg','<svg width="220" height="220"')}</div>
   <h1 class="z l">Join the chain.</h1><p class="z body" style="margin-top:26px;font-weight:600">Free. No ads. Made in South Africa.</p>
   <p class="z" style="margin-top:44px"><span class="pill" style="background:#16120a;color:#e6c97a">Link in bio</span></p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 02 · Exam season: Prayer before Study
const ps=["Ineffable Creator, from the treasures of your wisdom you appointed the choirs of angels and set them in wonderful order above the heavens, and arranged the parts of the universe with great beauty.","You are the true source of light and wisdom, and the first principle of all things. Pour a ray of your brightness into the darkness of my understanding, and take from me the double darkness in which I was born: sin and ignorance.","You make eloquent the tongues of infants: guide my speech and pour the grace of your blessing on my lips. Give me keenness to understand, capacity to remember, method and ease in learning, precision in interpreting, and abundant grace in expression.","Order the beginning, direct the progress, and perfect the completion. Through Christ our Lord. <b>Amen.</b>"];
P('02-prayer-before-study',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('doctors-temple')});background-position:center 18%;opacity:.7"></div><div class="shade"></div>
   <div class="z"><span class="tag">Exam season</span></div><div class="spacer"></div>
   <h1 class="z l">The prayer St Thomas Aquinas prayed <em>before he studied.</em></h1>
   <p class="z body" style="margin-top:26px">Save it before your next exam.</p>${h.foot(i,n,{swipe:1})}</div>`,
 ...ps.map((t,k)=>(i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Ante studium · '+['I','II','III','IV'][k])}</div><div class="spacer"></div>
   <p class="z q ${k===2?'m':''}">${k===0?`<span class="drop" style="font-family:'Instrument Serif';font-style:normal">I</span>`+t.slice(1):t}</p><div class="spacer"></div>${h.foot(i,n)}</div>`),
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('Before you go')}</div><div class="spacer"></div>
   <h2 class="z">Notice what he asks for:</h2>
   <div class="z list" style="margin-top:38px">${['Understanding','Memory','Method','Interpretation','Expression'].map((t,k)=>`<div class="it"><span class="n">${k+1}</span><span><b>${t}</b></span></div>`).join('')}</div>
   <p class="z body sm" style="margin-top:38px">Every stage of learning, handed over to God. Studying can be prayer too.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('Send this to your study group')}</div><div class="spacer"></div>
   <h1 class="z m">Add it to your day in the app, and pray it together before every session.</h1>
   <p class="z body" style="margin-top:30px;font-weight:600">Golden Chain → Prayers → Prayer before Study</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 03 · Ask Aquinas: Is it a sin to be angry? (Summa format)
P('03-ask-aquinas-anger',[
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('Ask Aquinas')}</div><div class="spacer"></div>
   <p class="z mono">Summa Theologiae II-II, q.158, a.1</p><h1 class="z xl" style="margin-top:24px">Is it a sin to be <em>angry?</em></h1><div class="spacer"></div>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('How Thomas argues')}</div><div class="spacer"></div>
   <h2 class="z">Every article in the Summa has the same four moves.</h2><div class="z list" style="margin-top:40px">${[['Objection','The strongest case against his answer'],['On the contrary','An authority that points the other way'],['I answer that','His actual reasoning'],['Replies','Back to every objection, one by one']].map(([a,b],k)=>`<div class="it"><span class="n">${k+1}</span><span><b>${a}.</b> ${b}</span></div>`).join('')}</div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">Objection</div><div class="spacer"></div>
   <p class="z q l">“It seems that anger is always a sin.”</p><p class="z body" style="margin-top:34px">Jesus says whoever is angry with his brother is liable to judgement (Matthew 5:22). And anger clouds reason, which is what makes us human.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">I answer that</div><div class="spacer"></div>
   <p class="z body" style="font-size:40px">Anger is a passion, a movement of the heart. It isn't evil in itself.</p>
   <p class="z q" style="margin-top:34px">It goes wrong in two ways: when it wants the <span class="mark">wrong thing</span>, or when it's <span class="mark">too much or too little</span> for what right reason calls for.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z lbl">So…</div><div class="spacer"></div>
   <h1 class="z m">Anger at <em>injustice,</em> kept in line by reason, can be good.</h1>
   <p class="z body" style="margin-top:34px">Thomas even quotes St Gregory: good anger <i>“troubles”</i> the eye of reason, but sinful anger <i>“blinds”</i> it.</p>
   <p class="z body sm" style="margin-top:26px;opacity:.75">Too little anger at evil is a fault too.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('Ask Aquinas')}</div><div class="spacer"></div>
   <h1 class="z m">What should Aquinas answer next?</h1><p class="z body" style="margin-top:30px;font-weight:600">Drop your question in the comments. More in the app: Theology → Disputed questions.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 04 · The Fathers said what? Eucharist
P('04-fathers-eucharist',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('last-supper')});opacity:.6"></div><div class="shade"></div>
   <div class="z">${K('The Fathers said what?')}</div><div class="spacer"></div>
   <h1 class="z l">What did the first Christians believe about the <em>Eucharist?</em></h1>
   <p class="z body" style="margin-top:24px">Not what you might expect. In their own words ↓</p>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z"><span class="tag">c. AD 107</span></div><div class="spacer"></div>
   <p class="z q">“They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be <span class="mark">the flesh of our Saviour Jesus Christ.</span>”</p>
   <p class="z cite" style="margin-top:36px">St Ignatius of Antioch, Letter to the Smyrnaeans 7</p><p class="z small" style="margin-top:14px">Written on his way to martyrdom, a generation after the apostles.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z"><span class="tag">c. AD 107</span></div><div class="spacer"></div>
   <p class="z q l">“…breaking one bread, which is <span class="mark">the medicine of immortality,</span> the antidote against death.”</p>
   <p class="z cite" style="margin-top:36px">St Ignatius of Antioch, Letter to the Ephesians 20</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z"><span class="tag">c. AD 155</span></div><div class="spacer"></div>
   <p class="z q m">“For not as common bread and common drink do we receive these… the food which is blessed by the prayer of His word… is <span class="mark">the flesh and blood of that Jesus</span> who was made flesh.”</p>
   <p class="z cite" style="margin-top:36px">St Justin Martyr, First Apology 66</p><p class="z small" style="margin-top:14px">He also describes Sunday Mass: readings, a homily, prayers, bread and wine, and the people’s “Amen”.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('Why it matters')}</div><div class="spacer"></div>
   <h2 class="z">The Real Presence isn't a medieval idea.</h2><p class="z body" style="margin-top:30px">It's what Christians believed while people who had known the apostles were still alive. Read John 6 with the Fathers beside you, and you'll see why.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><h1 class="z m">Read John 6 with Augustine, Chrysostom & Aquinas.</h1><p class="z" style="margin-top:40px"><span class="pill" style="background:#16120a;color:#e6c97a">Free · link in bio</span></p><p class="z body sm" style="margin-top:30px;font-weight:600">Send this to someone who thinks Communion is “just a symbol”.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 05 · November: Purgatory in 6 slides
P('05-purgatory-explained',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('church-interior')});opacity:.55"></div><div class="shade"></div>
   <div class="z"><span class="tag">November · month of the Holy Souls</span></div><div class="spacer"></div><h1 class="z xl">Purgatory, <em>explained.</em></h1><p class="z body" style="margin-top:20px">In six slides. No fire-and-brimstone required.</p>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">What it is</div><div class="spacer"></div>
   <p class="z q">Those who die in God’s grace and friendship, but are still imperfectly purified, are certain of heaven. First they are made <span class="mark">completely clean.</span></p><p class="z cite" style="margin-top:34px">Catechism of the Catholic Church §1030</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">What it isn't</div><div class="spacer"></div><div class="z list">${[['✕','A second chance for people who rejected God'],['✕','A halfway point between heaven and hell'],['✓','The last stage of being made ready for heaven, by God’s mercy']].map(([a,b])=>`<div class="it"><span class="n">${a}</span><span>${b}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">Where it comes from</div><div class="spacer"></div>
   <p class="z q m">“Therefore he made atonement for the dead, that they might be delivered from their sin.”</p><p class="z cite" style="margin-top:28px">2 Maccabees 12:46</p>
   <div class="z rule"></div><p class="z body sm">Christians prayed for the dead from the earliest centuries. Paul speaks of being saved “as through fire” (1 Corinthians 3:15).</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('augustine')});opacity:.45;background-position:center 25%"></div><div class="shade"></div><div class="z lbl">A mother's last request</div><div class="spacer"></div>
   <p class="z q">“Lay this body anywhere… This only I ask of you, that you remember me at the altar of the Lord.”</p><p class="z cite" style="margin-top:30px">St Monica to St Augustine, Confessions IX.11</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('This November')}</div><div class="spacer"></div><h1 class="z m">Pray for someone you've lost.</h1>
   <p class="z body" style="margin-top:28px;font-weight:600">Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May they rest in peace. Amen.</p>
   <p class="z body sm" style="margin-top:30px">Read the whole section, free: Golden Chain → Catechism → §1020–1037.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 06 · Psych × Faith: virtue and habit
P('06-virtue-is-a-habit',[
 COVER('paul','center 35%','Faith × psychology','Aquinas called it <em>virtue.</em> Psychologists call it <em>habit.</em>','Same idea, 750 years apart.'),
 (i,n,h)=>`<div class="s ink grain"><div class="z lbl">The 13th century</div><div class="spacer"></div>
   <p class="z q">A virtue is a <span class="mark">habitus</span>: a stable disposition you build by repeating good acts, until doing good becomes easier, quicker and even joyful.</p><p class="z cite" style="margin-top:30px">After Summa Theologiae I-II, q.55 · Catechism §1803–1804</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">The 21st century</div><div class="spacer"></div>
   <h1 class="z" style="font-size:260px;line-height:.9;color:var(--rubric)">66</h1><h2 class="z">days, on average, for a new behaviour to become automatic.</h2>
   <p class="z body sm" style="margin-top:26px">A UCL study followed 96 people; it took anywhere from 18 to 254 days.</p><p class="z small" style="margin-top:12px">Lally et al. (2010), European Journal of Social Psychology</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">What both agree on</div><div class="spacer"></div><div class="z list">${['Small and repeated beats big and rare','Same time, same place: tie it to something you already do','Missing a day doesn’t ruin it. Start again tomorrow','It gets easier. That’s the point'].map((t,k)=>`<div class="it"><span class="n">${k+1}</span><span>${t}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z lbl">The difference</div><div class="spacer"></div><h2 class="z">Habits make you efficient. Virtue makes you <em>free.</em></h2>
   <p class="z body" style="margin-top:30px">For Aquinas, the goal isn't productivity. It's becoming the kind of person who loves the good, with God's grace doing what willpower can't.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('Start one today')}</div><div class="spacer"></div><h1 class="z m">Pick one prayer. Same time every day. 66 days.</h1><p class="z body" style="margin-top:28px;font-weight:600">Set it up in Golden Chain → Prayers → My day, and tick it off.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 07 · App walkthrough with phone mockups
const mock=(img,kick,title,sub,rot=0)=>(i,n,h)=>`<div class="s ink grain"><div class="z">${K(kick)}</div><h2 class="z" style="margin-top:30px">${title}</h2><p class="z body sm" style="margin-top:16px">${sub}</p>
  <div class="z" style="display:flex;justify-content:center;margin-top:40px"><div class="phone" style="width:500px;transform:rotate(${rot}deg)"><img src="${h.shotURL(img)}"></div></div>${h.foot(i,n)}</div>`;
P('07-app-tour',[
 COVER('jerome','center 40%','New here?','Your Bible app is missing <em>2,000 years</em> of commentary.','Here\'s what Golden Chain does. (It\'s free.)'),
 mock('reader2','The Bible','Every verse, <em>with the saints.</em>','Traditional Douay-Rheims or modern English. Tap for Aquinas and the Fathers.',-2),
 mock('mass','Daily Mass','Today\'s readings, <em>explained.</em>','The Gospel with the Fathers on every verse, every day.',2),
 mock('ccc','The Catechism','96 sections. <em>Plain English.</em>','What the Church teaches, why, and where it comes from.',-2),
 mock('group2','Groups','Pray and read <em>together.</em>','Share prayers, plan a Rosary, see who prayed.',2),
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><h1 class="z l">Free. No ads. <br>No catch.</h1><p class="z body" style="margin-top:28px;font-weight:600">Works on any phone. Add it to your home screen like an app.</p><p class="z" style="margin-top:40px"><span class="pill" style="background:#16120a;color:#e6c97a">Link in bio</span></p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 08 · Single quote card
P('08-augustine-restless',[
 (i,n,h)=>`<div class="s ink grain center"><div class="art" style="background-image:url(${h.artURL('augustine')});opacity:.42;background-position:center 30%"></div><div class="shade top" style="opacity:.75"></div><div class="z">${K('St Augustine · AD 397')}</div><div class="spacer"></div>
   <p class="z q l" style="font-size:76px">“You have made us for yourself, O Lord, and our heart is <span class="mark">restless</span> until it rests in you.”</p><p class="z cite" style="margin-top:40px">Confessions I.1</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 09 · Groups feature
P('09-study-group-holy',[
 COVER('calling','center 40%','Golden Chain groups','Your group chat, but make it <em>holy.</em>','Read and pray with your friends.'),
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Inside a group')}</div><h1 class="z m" style="margin-top:30px">Prayers, plans and <em>who prayed.</em></h1>
   <div class="z" style="display:flex;gap:30px;margin-top:46px;justify-content:center"><div class="phone" style="width:400px;transform:rotate(-3deg)"><img src="${h.shotURL('group2')}"></div><div class="phone" style="width:400px;transform:rotate(3deg) translateY(30px)"><img src="${h.shotURL('group')}"></div></div>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('What you can do')}</div><div class="spacer"></div><div class="z list">${[['📿','Share a prayer. Everyone can add it to their day'],['🙏','Ask for prayer, and see who prayed'],['📅','Plan a Rosary or Bible study, with RSVPs'],['📌','Pin the weekly challenge'],['🔥','Keep each other’s streaks alive']].map(([a,b])=>`<div class="it"><span class="n" style="font-size:40px">${a}</span><span>${b}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><h1 class="z m">Start one for your youth group, your res, or your Confirmation class.</h1><p class="z body" style="margin-top:30px;font-weight:600">Golden Chain → Groups → New group</p><p class="z body sm" style="margin-top:24px">Tag the friend who'd lead it 👇</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// Stories (1080x1920)
const st=(id,f)=>P(id,[f],{story:true});
st('S1-story-poll',(i,n,h)=>`<div class="s story ink grain" style="padding:180px 92px 220px"><div class="z">${K('Quick question')}</div><div class="spacer"></div><h1 class="z l">Have you ever read a Church Father?</h1><div class="z" style="margin-top:60px;height:330px;border:3px dashed rgba(230,201,122,.5);border-radius:34px;display:grid;place-items:center" class="mono"><span class="mono">[ add the poll sticker here ]<br><br>“Yes 📜” · “Who?? 👀”</span></div><div class="spacer"></div>${h.foot(1,1)}</div>`);
st('S2-story-quiz',(i,n,h)=>`<div class="s story vellum grain" style="padding:180px 92px 220px"><div class="z">${K('Catholic lore quiz')}</div><div class="spacer"></div><h1 class="z m">Who called the Eucharist “the medicine of immortality”?</h1><div class="z" style="margin-top:60px;height:420px;border:3px dashed rgba(163,48,42,.45);border-radius:34px;display:grid;place-items:center"><span class="mono" style="text-align:center">[ quiz sticker ]<br><br>A. St Augustine<br>B. St Ignatius of Antioch ✓<br>C. St Thomas Aquinas</span></div><div class="spacer"></div>${h.foot(1,1)}</div>`);
st('S3-story-gospel',(i,n,h)=>`<div class="s story ink grain" style="padding:180px 92px 220px"><div class="art" style="background-image:url(${h.artURL('santa-maria-febbre')});opacity:.35"></div><div class="shade"></div><div class="z">${K('Today’s Gospel')}</div><div class="z mono" style="margin-top:20px">[ date ] · [ reference ]</div><div class="spacer"></div><p class="z q l">“[ one line from today's Gospel ]”</p><div class="z rule"></div><p class="z body">[ one sentence from a Father on this verse ]</p><p class="z cite" style="margin-top:18px">[ St … , source ]</p><div class="spacer"></div><p class="z"><span class="pill g">Read it with the saints →</span></p>${h.foot(1,1)}</div>`);
st('S4-story-pray-tonight',(i,n,h)=>`<div class="s story gold grain center" style="padding:180px 92px 220px"><div class="spacer"></div><div class="z frak" style="font-size:64px">Compline</div><h1 class="z l" style="margin-top:24px">Pray with us tonight.</h1><p class="z body" style="margin-top:30px;font-weight:600">Night Prayer, 5 minutes, before bed.<br>Golden Chain → Hours</p><div class="spacer"></div>${h.foot(1,1)}</div>`);
// Reel covers (1080x1920, safe zone for 4:5 grid crop)
const rc=(id,kick,title,art)=>P(id,[(i,n,h)=>`<div class="s story ink grain" style="padding:330px 92px 330px"><div class="art" style="background-image:url(${h.artURL(art)});opacity:.55"></div><div class="shade"></div><div class="z">${K(kick)}</div><div class="spacer"></div><h1 class="z l">${title}</h1><div class="spacer"></div>${h.foot(1,1)}</div>`],{story:true});
rc('R1-reel-cover-gospel-60','Gospel in 60 seconds','Today\'s Gospel, <em>with the saints.</em>','santa-maria-febbre');
rc('R2-reel-cover-ask-aquinas','Ask Aquinas','Can you be friends with <em>God?</em>','thomas-crucifix');
rc('R3-reel-cover-lore','Catholic lore','Why do Catholics use <em>incense?</em>','church-interior');
// Highlight covers (rendered square inside a story frame)
const hl=[['Start','✦'],['Mass','✝'],['Pray','✠'],['Ask','?'],['Groups','∞']];
hl.forEach(([t,ic])=>P('H-'+t.toLowerCase(),[(i,n,h)=>`<div class="s story ink grain center" style="justify-content:center"><div class="z" style="width:620px;height:620px;border-radius:50%;border:4px solid var(--gold);display:grid;place-items:center;margin:0 auto"><div><div style="font:400 210px/1 'Instrument Serif';color:var(--gold2)">${ic}</div><div style="font:600 46px/1 Inter;letter-spacing:.2em;text-transform:uppercase;margin-top:20px;color:var(--gold)">${t}</div></div></div></div>`],{story:true}));


// generic slides
// joke card: setup / punchline
// chat bubble

// 10 · Thu 12 Nov · Jokes only Thomists get (sharp humour)
P('10-thomist-jokes',[
 COVER('thomas-crucifix','center 40%','Humour','Jokes only <em>Thomists</em> will get.','If you laugh at all five, go outside. Swipe →','',.6),
 JOKE('Me: “Can I ask you a quick question?”','Aquinas: “Objection 1.”'),
 JOKE('“You’re so lazy.”','“I’m not lazy. I’m in <em style=\'font-style:italic\'>potency.</em>”',1),
 JOKE('Spilled the wine at dinner.','Don’t worry. It was only an accident.'),
 JOKE('A Thomist’s break-up text:','“I concede the major. I distinguish the minor. I deny the consequent.”',1),
 JOKE('“My love for you isn’t accidental.”','“It’s <span class=\'mark\'>substantial.</span>”'),
 I('Didn’t get it? (Good, now you’ll learn something)',`<div class="z list">${[['Objection','Every article of the Summa opens with arguments against Thomas’s own answer.'],['Potency / act','Potency is what something could be; act is what it actually is. You on Sunday afternoon: pure potency.'],['Accident / substance','An accident is a property (colour, spill-ability). Substance is what a thing is. The Eucharist joke runs the other way: there, the substance changes and the accidents stay.'],['Major, minor','The two premises of a syllogism. “I distinguish” means: true in one sense, false in another.']].map(([a,b])=>`<div class="it"><span class="n" style="width:auto;min-width:0;font-size:30px;font-family:Inter;font-weight:700;color:var(--gold);">${a}</span></div><div style="margin:-14px 0 6px;font:400 28px/1.4 Inter;opacity:.9">${b}</div>`).join('')}</div>`),
]);

// 11 · Fri 13 Nov · Lectio Divina
P('11-lectio-divina',[
 COVER('nicodemus','center 50%','How to pray','How to pray when your mind <em>won’t shut up.</em>','A 900-year-old method in four steps.'),
 V('Where it comes from',`<p class="z body" style="font-size:38px">Around 1150 a Carthusian monk, <b>Guigo II</b>, wrote <i>The Ladder of Monks</i>. He described prayer as a ladder with four rungs.</p><p class="z q m" style="margin-top:30px">“Seek in reading and you will find in meditation; knock in prayer and it will be opened in contemplation.”</p>`),
 V('The four rungs',LIST(['<b>Lectio · Read.</b> A short passage, slowly, twice. Today’s Gospel works.','<b>Meditatio · Chew.</b> Which word or phrase snags you? Stay with it. Ask why.','<b>Oratio · Talk.</b> Say something back to God about it. Honestly. Out loud is fine.','<b>Contemplatio · Rest.</b> Stop talking. Just be there with Him for a minute.'])),
 I('When your mind wanders',`<p class="z body" style="font-size:38px">It will. That isn’t failure, it’s the workout.</p><p class="z body" style="margin-top:26px">Each time you notice, go back to your one phrase. Coming back <i>is</i> the prayer. (Psychologists would call it training attention; the monks called it <i>custodia cordis</i>, guarding the heart.)</p>`),
 I('Try it tonight',LIST(['Pick today’s Gospel','Set a timer for 10 minutes','Phone face down, notifications off','Read · chew · talk · rest'])),
 GOLD('Ten minutes. Starting tonight.','Today’s Gospel is already waiting, with the Fathers on every verse.','Golden Chain → Mass → Today'),
]);

// 12 · Sun 15 Nov · St Albert the Great & the Dumb Ox
P('12-dumb-ox',[
 COVER('plato-academy','center 40%','St Albert the Great · 15 Nov','His classmates called Thomas Aquinas <em>“the Dumb Ox.”</em>','Big, quiet, never spoke up in class. Then his teacher said this ↓'),
 V('The story',`<p class="z body" style="font-size:38px">Thomas studied under <b>St Albert the Great</b> in Cologne. He was large, shy and silent. The other students assumed he was slow.</p><p class="z body" style="margin-top:26px">One classmate even offered to help him with his notes. (He was very kind about it. Thomas let him.)</p>`),
 I('Then Albert heard him argue',`<p class="z q l">“We call him the Dumb Ox, but one day his bellowing will be heard throughout the world.”</p><p class="z cite" style="margin-top:32px">St Albert the Great, as told by William of Tocco</p>`),
 V('Who was Albert?',LIST(['Dominican friar, bishop, teacher of Aquinas','Wrote on <i>everything</i>: botany, minerals, astronomy, animals','Canonised and named a Doctor of the Church in 1931','Patron saint of scientists'])),
 GOLD('The lesson','Quiet ≠ slow.','Know someone who never talks in tutorials? Send them this.'),
]);

// 13 · Mon 16 Nov · Is anxiety a sin?
P('13-is-anxiety-a-sin',[
 COVER('jacobs-ladder','center 40%','Real questions','“Is it a sin that I <em>feel anxious?</em>”','Short answer: no. Here’s why, and what actually helps.'),
 V('Feelings aren’t sins',`<p class="z body" style="font-size:38px">Aquinas calls fear, sadness and the rest <b>passions</b>: movements of the heart that happen <i>to</i> us.</p><p class="z body" style="margin-top:26px">A passion isn’t good or evil in itself (ST I-II q.24 a.1). Morality is about what we choose to do with it.</p>`),
 V('So what about “do not be anxious”?',`<p class="z q m">“Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.”</p><p class="z cite" style="margin-top:22px">Philippians 4:6</p><p class="z body sm" style="margin-top:26px">Paul isn’t scolding a feeling. He’s telling you where to bring it.</p>`),
 I('What actually helps',LIST(['Name it to God, specifically. Vague worry is heavier than a named one','Do the next small thing (Christ: “let the day’s own trouble be sufficient for the day”)','Sleep, food, sunlight, movement. You’re a body-soul unity, not a brain in a jar','Talk to someone. Grace builds on nature, and therapy is nature'])),
 I('If it’s bigger than a bad week',`<p class="z body" style="font-size:36px">If anxiety is stopping you from sleeping, eating, studying or leaving the house, please talk to a doctor, your campus counselling centre or a psychologist.</p><p class="z body" style="margin-top:26px">Getting help isn’t a lack of faith. Luke was a physician.</p>`),
 GOLD('Save this for a bad night','You are not failing at faith by feeling.','Golden Chain → Prayers: something to pray before bed.'),
]);

// 14 · Tue 17 Nov · Augustine's most relatable prayer (humour)
P('14-not-yet',[
 COVER('augustine-heresy','center 30%','Saint said what?','St Augustine’s most <em>relatable</em> prayer.','Confessions VIII.7 ↓'),
 V('The prayer',`<p class="z q l">“Give me chastity and self-control, <span class="mark">but not yet.</span>”</p><p class="z cite" style="margin-top:30px">St Augustine, Confessions VIII.7</p><p class="z body sm" style="margin-top:24px">He prayed this as a young man, and admitted he was afraid God would answer it too quickly.</p>`),
 I('Modern translations',`<div class="z">${msg('Me, before exams','Lord, make me disciplined. But not yet.',1)}${msg('Me, in January','Lord, make me go to the gym. But not yet.',1)}${msg('Me, at 1am','Lord, make me put my phone down. But not yet.',1)}</div>`),
 V('How it ends',`<p class="z body" style="font-size:38px">Augustine hears a child singing <i>“tolle lege, tolle lege”</i>: take up and read. He opens Romans 13:13–14 at random and reads, “put on the Lord Jesus Christ.”</p><p class="z body" style="margin-top:26px">“Not yet” became “now.” He was baptised the next Easter by St Ambrose.</p>`),
 GOLD('Your “not yet”','What’s the thing you keep saying “not yet” to?','Comment it (or don’t). Then do the first five minutes of it today.'),
]);

// 15 · Thu 19 Nov · Why confess to a priest?
P('15-why-confession',[
 COVER('oude-kerk','center 50%','Real questions','“Why can’t I just confess <em>straight to God?</em>”','You can. Here’s why Catholics also go to a priest.'),
 V('Jesus’ own words',`<p class="z q m">“Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained.”</p><p class="z cite" style="margin-top:22px">John 20:22–23</p><p class="z body sm" style="margin-top:24px">You can’t forgive or retain what you’ve never heard. Christ gave the apostles a ministry that requires hearing sins.</p>`),
 V('Why it’s actually a gift',LIST(['<b>You hear the words.</b> “I absolve you” out loud. Not a feeling you have to talk yourself into','<b>It’s concrete.</b> Naming a sin to another person breaks its secrecy, and secrecy is where shame grows','<b>It’s grace, not therapy.</b> The sacrament really forgives, not just relieves'])),
 I('The fears, answered',LIST([['?','“He’ll think less of me.” He’s heard worse this week. Probably today.'],['?','“He’ll tell someone.” The seal of confession is absolute (CCC 1467). Priests have died rather than break it.'],['?','“I don’t know what to say.” Say that. He’ll walk you through it.']],false)),
 GOLD('Haven’t been in years?','The door is the same. So is the welcome.','Read what the Church teaches on Confession: Golden Chain → Catechism.'),
]);

// 16 · Fri 20 Nov · St Lawrence (dark humour)
P('16-turn-me-over',[
 COVER('loaves','center 45%','Catholic lore','The saint who made a <em>joke</em> while being executed.','St Lawrence, Rome, AD 258 ↓'),
 V('The story',`<p class="z body" style="font-size:38px">Lawrence was a deacon in charge of the Roman church’s money. The prefect demanded he hand over “the treasures of the Church.”</p><p class="z body" style="margin-top:26px">Lawrence asked for three days, gave everything away, and came back with the city’s poor and sick: <b>“These are the treasures of the Church.”</b></p>`),
 I('The prefect was not amused',`<p class="z body" style="font-size:36px">Lawrence was sentenced to be roasted on a gridiron. Halfway through, according to St Ambrose:</p><p class="z q l" style="margin-top:30px">“This side is done. Turn me over and eat.”</p><p class="z cite" style="margin-top:24px">St Ambrose, On the Duties of the Clergy I.41</p>`),
 V('The punchline',`<p class="z body" style="font-size:40px">He is now the patron saint of <b>cooks</b>, <b>comedians</b> and <b>barbecues</b>.</p><p class="z body sm" style="margin-top:26px">The Church has a sense of humour. Joy like that only comes from someone who is very sure where he’s going.</p>`),
 GOLD('For the braai','Tag the friend who always burns the boerewors.','St Lawrence, pray for us.'),
]);

// 17 · Sun 22 Nov · Christ the King
P('17-christ-the-king',[
 COVER('adoration-magi','center 40%','Christ the King · 22 Nov','Why does the Church celebrate <em>Christ the King?</em>','It’s younger than your great-grandparents.'),
 V('1925',`<p class="z body" style="font-size:38px">Pope Pius XI created the feast in his letter <i>Quas Primas</i> (1925), after a world war and with new totalitarian movements on the rise.</p><p class="z body" style="margin-top:26px">His point: when nations push Christ out of public life, they don’t become neutral. Something else takes the throne.</p>`),
 I('A strange kind of king',`<p class="z q l">“My kingship is not of this world.”</p><p class="z cite" style="margin-top:24px">John 18:36</p><p class="z body" style="margin-top:28px">His crown is thorns. His throne is a cross. He rules by serving.</p>`),
 V('What it means for you',LIST(['If Christ is King, your phone, grades and ambitions are not','He reigns first in hearts, not by force','It’s the last Sunday of the Church year. Next week: Advent'])),
 GOLD('Next Sunday','A new Church year starts. Start it with us.','Our 4-week Advent challenge begins Sunday 29 November.'),
]);

// 18 · Mon 23 Nov · How Aquinas told a student to study
P('18-how-to-study',[
 COVER('dominic','center 30%','Exam season','How Thomas Aquinas told a student <em>to study.</em>','From a short letter traditionally attributed to him ↓'),
 V('Start small',`<p class="z q l">“Do not plunge straight into the sea, but go by way of the little streams.”</p><p class="z body sm" style="margin-top:28px">Begin with what is easier. Build up. (Every lecturer who said “do the readings first” agrees.)</p>`),
 V('His advice to “Brother John”',LIST(['Be slow to speak','Keep a clean conscience','Never stop praying','Love your cell. (Your room. Your desk.)','Don’t pry into other people’s business','Avoid pointless chatter'])),
 V('And the study technique',LIST(['Understand what you read, don’t just finish it','Clear up every doubt as you go','Store whatever you can “in the cupboard of your mind”','Don’t ask who said it; remember what was well said'])),
 I('Translated for 2026',LIST(['Phone in another room','Pray the Prayer before Study first','Hard topic? Start with the easy chapter','Write your questions down and actually ask them'])),
 GOLD('Save for exam week','Little streams, then the sea.','Golden Chain → Prayers → Prayer before Study. Send it to your study group.'),
]);

// 19 · Tue 24 Nov · The Church Fathers as a group chat (sharp humour)
P('19-fathers-group-chat',[
 COVER('thomas-trent','center 40%','Humour','If the Church Fathers had a <em>group chat.</em>','Sharp-eyed readers only. Explanations at the end.','',.6),
 I('Patristics 💬',`<div class="z">${msg('Tertullian','Honestly this group has become far too lax.')}<div style="text-align:center;margin:26px 0 6px;font:500 24px/1 Inter;opacity:.55">Tertullian left the group</div>${msg('Athanasius','Fine. Me against the world, then.')}${msg('Augustine','Before I reply, I need to tell you about a pear tree.',0)}</div>`),
 I('Patristics 💬',`<div class="z">${msg('John Chrysostom','🎤 Voice note · 47:12')}${msg('Jerome','Translated your message into Latin. Also, you’re wrong.')}${msg('Ambrose','Seen ✓✓')}${msg('Augustine','How does he read without moving his lips??')}</div>`),
 V('The explanations',`<div class="z list">${[['Tertullian','Brilliant early writer who later left for the stricter Montanist sect.'],['Athanasius','Defended Christ’s divinity against Arianism almost alone: “Athanasius against the world.”'],['Augustine & the pear','He spends a whole chapter of the Confessions on stealing pears as a teenager.'],['Chrysostom','“Golden mouth”: famous for long, brilliant sermons.'],['Jerome','Translated the Bible into Latin. Legendary temper.'],['Ambrose','Augustine was amazed to see him read silently (Confessions VI.3).']].map(([a,b])=>`<div class="it" style="flex-direction:column;gap:4px"><b style="color:var(--rubric);font-size:28px">${a}</b><span style="font-size:27px">${b}</span></div>`).join('')}</div>`),
 GOLD('Which one are you?','Tag your friend who is 100% a Jerome.','Meet them all, verse by verse, in Golden Chain.'),
]);

// 20 · Thu 26 Nov · "Lord, I am not worthy"
P('20-not-worthy',[
 COVER('gregory','center 40%','At Mass','Why do we say “<em>under my roof</em>” before Communion?','It’s a quote. From a Roman soldier.'),
 V('The original',`<p class="z q l">“Lord, I am not worthy to have you come under my roof; but only say the word, and my servant will be healed.”</p><p class="z cite" style="margin-top:28px">The centurion, Matthew 8:8</p>`),
 I('Who said it',`<p class="z body" style="font-size:38px">A Roman officer. A pagan. Part of the occupying army. And Jesus said:</p><p class="z q l" style="margin-top:28px">“Not even in Israel have I found such faith.”</p><p class="z cite" style="margin-top:20px">Matthew 8:10</p>`),
 V('So at every Mass',`<p class="z body" style="font-size:38px">You borrow a soldier’s words. Jesus is about to come under the “roof” of your body.</p><p class="z body" style="margin-top:26px">Honest about your unworthiness, confident in His word. That combination is exactly what faith is.</p>`),
 GOLD('This Sunday','Say it like you mean it.','Read Matthew 8 with Augustine and Chrysostom in Golden Chain.'),
]);

// 21 · Fri 27 Nov · Advent isn't early Christmas
P('21-advent-explained',[
 COVER('madonna-giotto','center 30%','Advent starts Sunday','Advent is not <em>early Christmas.</em>','Here’s what it actually is (and why it’s better).'),
 V('Two comings',`<p class="z body" style="font-size:38px">Advent means “coming.” It looks two ways:</p>${LIST(['<b>Back</b> to Bethlehem, when God came as a baby','<b>Forward</b> to the end, when Christ comes again in glory'])}<p class="z body sm" style="margin-top:26px">The first weeks focus on the second coming. From 17 December, on the first.</p>`),
 V('Decoding it',LIST([['🟣','<b>Violet:</b> waiting and repentance, not mourning'],['🌸','<b>Rose on Gaudete Sunday</b> (13 Dec): “Rejoice!” Halfway there'],['🕯️','<b>The wreath:</b> one more candle each week, the light growing'],['🎶','<b>O Antiphons</b> (17–23 Dec): the ancient “O come, O come, Emmanuel” titles']],false)),
 I('Why wait?',`<p class="z body" style="font-size:38px">Everything around you says Christmas started in October. Advent says: not yet.</p><p class="z body" style="margin-top:26px">Waiting makes the feast a feast. You don’t enjoy a meal you’ve been snacking on for a month.</p>`),
 GOLD('Starts Sunday','4 weeks. 10 minutes a day.','Join our Advent challenge: Golden Chain → Mass → daily readings with the Fathers.'),
]);

// 22 · Sun 29 Nov · Advent challenge
P('22-advent-challenge',[
 COVER('hertogenbosch','center 50%','1st Sunday of Advent','The <em>10-minute</em> Advent challenge.','Four weeks. One habit. Let’s go.'),
 V('Every day until Christmas',LIST(['Read the day’s Gospel (2 min)','Read what one Father said about it (3 min)','Pray about one line (5 min)','Tick it off in the app'])),
 V('Each week, add one thing',LIST([['I','Go to Confession before Christmas'],['II','Give something away you don’t need'],['III','Gaudete: do something joyful for someone else'],['IV','Fast from your phone for one evening']],false)),
 I('Do it with friends',`<p class="z body" style="font-size:38px">Start a group, pin the challenge, and you’ll see who’s kept it up.</p><p class="z body" style="margin-top:26px">Habits stick better together. (So do saints.)</p>`),
 GOLD('Day one is today','Comment “in” and we’ll pray for you this Advent.','Golden Chain → Groups → New group → pin “Advent challenge”.'),
]);

// 23 · Mon 30 Nov · St Andrew + Christmas Novena
P('23-st-andrew-novena',[
 COVER('calling','center 40%','St Andrew · 30 Nov','The apostle whose main achievement was <em>bringing his brother.</em>','And the novena that starts today ↓'),
 V('The first-called',`<p class="z body" style="font-size:38px">Andrew met Jesus first. His very next move:</p><p class="z q l" style="margin-top:26px">“He first found his brother Simon… He brought him to Jesus.”</p><p class="z cite" style="margin-top:20px">John 1:41–42</p><p class="z body sm" style="margin-top:24px">That brother became St Peter. Never underestimate an invitation.</p>`),
 V('The St Andrew Christmas Novena',`<p class="z q sm" style="font-size:42px">Hail and blessed be the hour and moment in which the Son of God was born of the most pure Virgin Mary, at midnight, in Bethlehem, in piercing cold. In that hour vouchsafe, O my God, to hear my prayer and grant my desires, through the merits of our Saviour Jesus Christ and of his blessed Mother. Amen.</p>`),
 I('How to pray it',LIST(['Pray it 15 times a day','From today (30 Nov) until Christmas','Bring one intention you really care about','Spread the 15 out through the day if you like'])),
 GOLD('Be an Andrew','Send this to the person you’d bring to Jesus.','Add it to your day: Golden Chain → Prayers → Write your own.'),
]);

// 24 · Tue 1 Dec · Church Fathers cheat sheet
P('24-fathers-cheat-sheet',[
 COVER('four-doctors','center 35%','Cheat sheet','Who were the <em>Church Fathers?</em>','The 8 names you keep hearing, in one swipe.'),
 V('First, what is a “Father”?',`<p class="z body" style="font-size:38px">Early Christian writers, roughly AD 100–750, recognised for <b>holiness</b>, <b>sound teaching</b>, <b>antiquity</b> and the <b>Church’s approval</b>.</p><p class="z body sm" style="margin-top:24px">They are the links in the golden chain between the apostles and us.</p>`),
 V('The early ones',LIST([['107','<b>Ignatius of Antioch</b>: wrote 7 letters on his way to martyrdom. First to say “Catholic Church”'],['180','<b>Irenaeus</b>: took on the Gnostics. “The glory of God is man fully alive”'],['350','<b>Athanasius</b>: defended Christ’s divinity, almost alone']],false)),
 V('The East',LIST([['370','<b>Basil the Great</b>: monk, bishop, built a hospital city'],['380','<b>Gregory Nazianzen</b>: “the Theologian,” on the Trinity'],['400','<b>John Chrysostom</b>: “golden mouth,” the great preacher']],false)),
 V('The West',LIST([['390','<b>Ambrose</b>: bishop of Milan, baptised Augustine'],['400','<b>Jerome</b>: translated the Bible into Latin (the Vulgate)'],['400','<b>Augustine</b>: Confessions, City of God, and much of Western theology']],false)),
 GOLD('Read them','Every one of them is in Golden Chain, on the verses they wrote about.','Tap any verse. Link in bio.'),
]);


// generic slides
// joke card: setup / punchline
// chat bubble


// 25 · NOW (Fri 6 Nov) · Dostoevsky: love in action
P('25-dostoevsky-love-in-action',[
 COVER('baptist-preaching','center 40%','Dostoevsky said what?','“The more I love humanity in general, <em>the less I love people</em> in particular.”','A confession from The Brothers Karamazov. Too relatable? ↓'),
 V('The confession',`<p class="z body" style="font-size:36px">In <i>The Brothers Karamazov</i> (1880), the wise elder Father Zosima tells a woman about a doctor who admitted:</p><p class="z q m" style="margin-top:26px">“I love humanity, but I wonder at myself. The more I love humanity in general, the less I love man in particular.”</p><p class="z body sm" style="margin-top:22px">He could imagine dying for mankind, but couldn’t share a room with one person for two days.</p>`),
 I('Sound familiar?',`<div class="z">${msg('Me','I would literally die for world peace.',1)}${msg('Also me','My roommate chewed loudly once. I am never speaking to him again.',1)}</div>`),
 V('Zosima’s answer',`<p class="z q l">“Love in action is a harsh and dreadful thing compared with love in dreams.”</p><p class="z cite" style="margin-top:28px">Fyodor Dostoevsky, The Brothers Karamazov, Book II</p><p class="z body sm" style="margin-top:24px">Love in dreams wants a quick, admired, heroic moment. Love in action means patience, work and showing up again tomorrow.</p>`),
 I('The Thomist footnote',`<p class="z body" style="font-size:36px">Aquinas defines love as <b>willing the good of another</b> (ST I-II q.26 a.4). Not a feeling about “humanity,” but a choice about a person.</p><p class="z body" style="margin-top:26px">You can’t love humanity. You can only love the human in front of you.</p>`),
 GOLD('Love in action','Name the one person who is hard for you to love. Do one good thing for them today.','Send this to someone who needs it (or who loves humanity in general).'),
]);

// 26 · Thu 3 Dec · C.S. Lewis trilemma
P('26-lewis-trilemma',[
 COVER('moneychangers','center 40%','C.S. Lewis said what?','“Jesus was just a <em>good moral teacher.</em>” Lewis wasn’t having it.','The most famous argument in Mere Christianity ↓'),
 V('The claim',`<p class="z body" style="font-size:38px">Lots of people say: I don’t believe Jesus was God, but he was a great moral teacher.</p><p class="z body" style="margin-top:26px">C.S. Lewis, a former atheist and Oxford don, said that is “the one thing we must not say.”</p>`),
 V('Why not?',`<p class="z body" style="font-size:38px">Because Jesus forgave other people’s sins, accepted worship, and said “before Abraham was, I am” (John 8:58).</p><p class="z body" style="margin-top:26px">A mere man who says those things is not a great moral teacher. Something has gone very wrong, or very right.</p>`),
 I('The three options',LIST([['I','<b>Liar:</b> he knew it was false. A fraud, not a teacher'],['II','<b>Lunatic:</b> he believed it, but wasn’t. Lewis: “on a level with the man who says he is a poached egg”'],['III','<b>Lord:</b> he was telling the truth']],false)),
 V('Fair objections',`<p class="z body" style="font-size:36px">Critics add a fourth option: <b>legend</b>, i.e. the Gospels made it up.</p><p class="z body" style="margin-top:24px">That’s why the early sources matter: Paul’s letters (20–30 years after Jesus) already worship him as Lord, and the Fathers you meet in Golden Chain show the same faith from the start.</p>`),
 GOLD('Your move','Liar, lunatic or Lord? “Nice teacher” isn’t on the list.','Read John 8 with the Fathers in Golden Chain. Link in bio.'),
]);

// 27 · Fri 4 Dec · Screwtape on your phone (sharp humour, original parody)
P('27-screwtape-phone',[
 COVER('serpent','center 40%','Humour · parody','If Screwtape wrote a memo about <em>your phone.</em>','For fans of C.S. Lewis’s The Screwtape Letters ↓','',.6),
 V('What is Screwtape?',`<p class="z body" style="font-size:38px">In <i>The Screwtape Letters</i> (1942), C.S. Lewis writes letters from a senior demon, Screwtape, advising his nephew Wormwood how to lead one ordinary man away from God.</p><p class="z body" style="margin-top:26px">The joke: everything is backwards. “The Enemy” is God.</p>`),
 I('A memo (our parody, not Lewis)',`<p class="z q m">My dear Wormwood, do not tempt him to anything wicked. Give him the little rectangle. Let him check it “for a second” during his prayers, and let the second become forty minutes. He will not notice he has missed the Enemy. He will merely feel tired.</p>`),
 I('The memo continues',`<p class="z q m">Fill every silence. Silence is where the Enemy speaks. Keep him scrolling at night so he is too exhausted to pray in the morning. And above all, let him believe he is simply relaxing.</p><p class="z cite" style="margin-top:24px">Your affectionate uncle, Screwtape</p>`),
 V('The real Lewis line',`<p class="z q l">“The safest road to Hell is the gradual one.”</p><p class="z cite" style="margin-top:26px">C.S. Lewis, The Screwtape Letters XII</p><p class="z body sm" style="margin-top:24px">Not dramatic sin. Small, comfortable drifts.</p>`),
 GOLD('Counter-attack','Phone out of the bedroom tonight.','Pray before you scroll. Golden Chain has today’s Gospel waiting.'),
]);

// 28 · Sun 6 Dec · St Nicholas, the real Santa
P('28-st-nicholas',[
 COVER('st-peters','center 50%','St Nicholas · 6 Dec','The real Santa Claus was a <em>bishop.</em>','And no, he probably didn’t punch anyone ↓'),
 V('Who he was',`<p class="z body" style="font-size:38px">Nicholas was bishop of Myra (in today’s Turkey) in the 4th century. “Santa Claus” comes from the Dutch <i>Sinterklaas</i>: Saint Nicholas.</p>`),
 V('The gold through the window',`<p class="z body" style="font-size:38px">The best-known story: a poor man couldn’t afford dowries for his three daughters. Nicholas secretly threw bags of gold through their window at night.</p><p class="z body" style="margin-top:26px">Hence the secret gifts, and why he’s often painted with three golden balls.</p>`),
 I('The punch',`<p class="z body" style="font-size:38px">The internet loves the story that Nicholas slapped the heretic Arius at the Council of Nicaea (325).</p><p class="z body" style="margin-top:26px">It shows up centuries later and historians treat it as legend. Fun. Not history. (Don’t slap heretics.)</p>`),
 GOLD('The real point','Give something in secret this week.','2nd Sunday of Advent: are you still doing the 10-minute challenge?'),
]);

// 29 · Mon 7 Dec · Lewis + Aquinas: argument from desire
P('29-made-for-another-world',[
 COVER('john-patmos','center 35%','C.S. Lewis × Aquinas','Why does nothing <em>quite</em> satisfy?','Two great minds, 700 years apart, same answer ↓'),
 V('The feeling',`<p class="z body" style="font-size:38px">You get the thing you wanted. The grade, the relationship, the trip. And a week later there’s that ache again: <i>is this it?</i></p>`),
 V('C.S. Lewis',`<p class="z q m">“If I find in myself a desire which no experience in this world can satisfy, the most probable explanation is that I was made for another world.”</p><p class="z cite" style="margin-top:24px">C.S. Lewis, Mere Christianity III.10</p>`),
 I('Thomas Aquinas, first',`<p class="z body" style="font-size:38px">Aquinas asks what could make us perfectly happy: wealth, honour, fame, power, pleasure? He tests each one and rejects them all.</p><p class="z body" style="margin-top:26px">Only an infinite good can fill a desire for the infinite good. Only God (ST I-II q.2 a.8).</p>`),
 V('So the ache is good news',LIST(['It isn’t proof you’re doing life wrong','It’s a signpost, not a destination','Enjoy good things; just don’t ask them to be God','Advent is the season of exactly this longing'])),
 GOLD('Augustine said it first','“Our heart is restless until it rests in you.”','Confessions I.1. Read it with the saints in Golden Chain.'),
]);

// 30 · Tue 8 Dec · Immaculate Conception
P('30-immaculate-conception',[
 COVER('madonna-giotto','center 15%','Immaculate Conception · 8 Dec','Most Catholics get this one <em>wrong.</em>','It isn’t about Jesus’ conception. ↓'),
 V('What it is NOT',`<p class="z body" style="font-size:38px">The Immaculate Conception is <b>not</b> the virgin birth, and not about Jesus being conceived.</p><p class="z body" style="margin-top:26px">It’s about <b>Mary’s</b> conception in her mother’s womb (traditionally St Anne).</p>`),
 V('What it IS',`<p class="z q m">From the first moment of her conception, Mary was preserved free from all stain of original sin, by a singular grace of God, in view of the merits of Jesus Christ.</p><p class="z cite" style="margin-top:24px">After Pius IX, Ineffabilis Deus (1854) · CCC 491</p>`),
 I('“But didn’t she need a Saviour?”',`<p class="z body" style="font-size:38px">Yes. Bl. John Duns Scotus’ answer: she was saved <b>in advance</b>.</p><p class="z body" style="margin-top:26px">Rescue someone who fell into a pit, or stop them falling in the first place. Both are saving. Mary was saved by prevention.</p>`),
 V('A twist for Thomists',`<p class="z body" style="font-size:38px">Aquinas himself hesitated: he thought Mary was sanctified in the womb, but <i>after</i> conception (ST III q.27 a.2), because he worried the doctrine would exempt her from Christ’s redemption.</p><p class="z body" style="margin-top:26px">Scotus answered that worry. The Church later defined it. Even saints work things out over centuries.</p>`),
 GOLD('Pray today','O Mary, conceived without sin, pray for us who have recourse to thee.','Add it to your day: Golden Chain → Prayers → Write your own.'),
]);

// generic slides
// joke card: setup / punchline
// chat bubble


const PAPER='background:#ece3d0;background-image:radial-gradient(120% 90% at 30% 10%,#f6efdf 0%,#ebe1cc 60%,#dfd2b8 100%)';
const STACK=(art,pos,a,b,verse,ref)=>(i,n,h)=>`<div class="s grain" style="${PAPER};padding:0;color:#1a1713"><div class="art" style="background-image:url(${h.artURL(art)});background-position:${pos};mix-blend-mode:multiply;opacity:.95"></div><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(236,227,208,0) 56%,rgba(236,227,208,.94) 80%,#ece3d0 100%)"></div>
<div style="position:absolute;z-index:2;left:64px;top:70px;font:400 340px/.8 'Instrument Serif',serif;letter-spacing:-.03em;color:#f6efdf;text-shadow:0 4px 40px rgba(20,16,10,.55)">${a}<br>${b}</div>
<div style="position:absolute;z-index:2;left:76px;right:76px;bottom:70px"><p style="font:500 italic 46px/1.25 Cormorant,serif;max-width:840px">${verse}</p><div style="display:flex;justify-content:space-between;align-items:center;margin-top:30px"><span style="font:700 22px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:#a3302a">${ref}</span>${BR(h,'#3a332a')}</div></div></div>`;

// 31 · Sat 14 Nov · icon roundel
P('31-same-yesterday-today',[(i,n,h)=>`<div class="s vellum grain" style="${PAPER};align-items:center;padding:80px">
 <div class="z" style="font:700 22px/1 Inter;letter-spacing:.3em;text-transform:uppercase;color:#a3302a;margin-top:10px">Hebrews 13:8</div>
 <div class="z" style="position:relative;width:860px;height:860px;margin-top:70px">
  <svg viewBox="0 0 860 860" style="position:absolute;inset:0"><defs><path id="c" d="M430,430 m-360,0 a360,360 0 1,1 720,0 a360,360 0 1,1 -720,0"/></defs><circle cx="430" cy="430" r="418" fill="none" stroke="#b08a3c" stroke-width="2"/><circle cx="430" cy="430" r="330" fill="none" stroke="#b08a3c" stroke-width="2"/>
  <text font-family="Instrument Serif" font-size="56" fill="#241f18"><textPath href="#c" startOffset="0" textLength="2240" lengthAdjust="spacing">JESUS CHRIST ✦ THE SAME YESTERDAY ✦ TODAY ✦ AND FOR EVER ✦</textPath></text></svg>
  <div style="position:absolute;left:112px;top:112px;width:636px;height:636px;border-radius:50%;background:url(${h.artURL('x-icon')}) center/cover;box-shadow:inset 0 0 60px rgba(60,40,10,.35),0 20px 50px rgba(60,40,10,.25)"></div></div>
 <div class="spacer"></div><p class="z" style="font:500 italic 40px/1.3 Cormorant,serif;text-align:center;color:#3a332a">Everything else changes. He doesn’t.</p>
 <div class="z" style="margin-top:34px">${BR(h,'#3a332a')}</div></div>`]);

// 32 · Wed 18 Nov · Penrose
P('32-stumbled-into-existence',[
 COVER('x-zurbaran','center 20%','','You think the perfect laws of reality just <em>stumbled</em> into existence?','What an absurd position. Let’s look at one number. ↓','Faith & science',.6),
 V('The number',`<p class="z body">How precisely did the universe’s starting conditions have to be set for stars, chemistry and life to be possible?</p><h1 class="z" style="margin:40px 0;font-size:130px">1 in 10<sup style="font-size:.55em">10<sup style="font-size:.7em">123</sup></sup></h1><p class="z body">That is Sir Roger Penrose’s calculation for the low-entropy state of the Big Bang. He won the Nobel Prize in Physics in 2020.</p><p class="z cite" style="margin-top:26px">The Emperor’s New Mind (1989), ch. 7</p>`),
 I('How big is that?',`<p class="z body" style="font-size:40px">There are about 10<sup>80</sup> atoms in the observable universe.</p><p class="z q l" style="margin-top:36px">Write one zero on every atom and you run out of atoms long before you finish writing the number.</p>`),
 V('Now, honesty',`<p class="z body" style="font-size:38px">Penrose is <b>not</b> a believer, and he doesn’t say this proves God. He proposes a cyclic universe. Others propose a multiverse.</p><p class="z body" style="margin-top:28px;font-size:38px">But notice what every serious answer has in common: <span class="mark">they all agree it needs an explanation.</span></p>`),
 I('Aquinas, 750 years earlier',`<p class="z q">“Whatever lacks intelligence cannot move towards an end unless it be directed by some being endowed with knowledge and intelligence; as the arrow is shot to its mark by the archer.”</p><p class="z cite" style="margin-top:28px">The Fifth Way · Summa Theologiae I, q.2, a.3</p>`),
 GOLD('The takeaway','Order is not the default.','This is evidence, not a maths proof. But “it just happened” is the weakest answer in the room.'),
]);

// 33 · Sat 21 Nov · Found
P('33-found',[STACK('x-treasure','center 30%','FOU','ND.','The kingdom of heaven is like treasure hidden in a field, which a man found and covered up; then in his joy he goes and sells all that he has and buys that field.','Matthew 13:44')]);

// 34 · Wed 25 Nov · Lemaître
P('34-big-bang-priest',[
 COVER('dominican-preaching','center 30%','','The Big Bang was first proposed by a <em>Catholic priest.</em>','And physicists thought it sounded suspiciously like creation. ↓','Faith & science'),
 V('Meet Fr Georges Lemaître',`<p class="z body" style="font-size:37px">Belgian priest. Physicist. Trained at Cambridge and MIT.</p><p class="z body" style="margin-top:24px;font-size:37px">In <b>1927</b> he showed from Einstein’s own equations that the universe is expanding, two years before Hubble’s famous observations. In <b>1931</b> he proposed it all began from a “primeval atom”.</p>`),
 I('Einstein was not impressed',`<p class="z q l">“Your calculations are correct, but your physics is abominable.”</p><p class="z cite" style="margin-top:26px">Einstein to Lemaître, 1927, as Lemaître recalled it</p><p class="z body" style="margin-top:34px">Within a few years Einstein accepted the expanding universe.</p>`),
 V('The name was a jab',`<p class="z body" style="font-size:37px">“Big Bang” was coined in 1949 by astronomer Fred Hoyle, who preferred an eternal universe with no beginning.</p><p class="z body" style="margin-top:24px;font-size:37px">In 1965 the afterglow of the beginning, the cosmic microwave background, was detected. Lemaître heard the news shortly before he died in 1966.</p>`),
 I('Plot twist',`<p class="z body" style="font-size:37px">The priest was the careful one. When Pope Pius XII spoke in 1951 as if the theory confirmed Genesis, Lemaître urged caution: don’t tie the faith to one scientific model.</p><p class="z body" style="margin-top:24px;font-size:37px">Aquinas agrees: creation means the universe depends on God <i>at every moment</i>, not only at the first one.</p><p class="z cite" style="margin-top:22px">ST I, q.46, a.2</p>`),
 GOLD('The takeaway','Faith and science were never enemies.','The Church didn’t fear the beginning of the universe. One of her priests did the maths.'),
]);

// 35 · Sat 28 Nov · Watch (eve of Advent)
P('35-watch',[STACK('x-virgins','center 20%','WAT','CH.','Watch therefore, for you know neither the day nor the hour.','Matthew 25:13')]);

// 36 · Wed 2 Dec · maths
P('36-universe-speaks-maths',[
 COVER('doctors-temple','center 30%','','Why does the universe <em>obey maths?</em>','Nobody ordered it to. ↓','Faith & science'),
 V('The strange fact',`<p class="z body" style="margin-bottom:34px">Scribbles on paper keep predicting reality before anyone sees it:</p>${LIST(['<b>Neptune</b>: found in 1846 exactly where the equations said to look','<b>Antimatter</b>: predicted by Dirac in 1928, found in 1932','<b>Gravitational waves</b>: predicted in 1916, detected in 2015','<b>The Higgs boson</b>: predicted in 1964, found in 2012'])}`),
 I('A Nobel physicist called it a miracle',`<p class="z q">“The miracle of the appropriateness of the language of mathematics for the formulation of the laws of physics is a wonderful gift which we neither understand nor deserve.”</p><p class="z cite" style="margin-top:26px">Eugene Wigner, 1960</p>`),
 V('Einstein saw it too',`<p class="z q l">“The eternal mystery of the world is its comprehensibility.”</p><p class="z cite" style="margin-top:26px">Albert Einstein, Physics and Reality (1936)</p><p class="z body sm" style="margin-top:30px">Einstein did not believe in a personal God. He still saw the puzzle.</p>`),
 I('The Christian answer',`<p class="z q l">“In the beginning was the <em style="color:#e6c97a">Logos</em>.”</p><p class="z cite" style="margin-top:22px">John 1:1</p><p class="z body" style="margin-top:32px">Logos means word, and also <b>reason</b>. If the universe comes from Mind, of course it is readable by minds.</p><p class="z body sm" style="margin-top:22px">“You have arranged all things by measure and number and weight.” Wisdom 11:20</p>`),
 GOLD('The takeaway','A universe from chaos owes you no equations.','This doesn’t prove the faith. It shows which worldview isn’t surprised.'),
]);

// 37 · Sat 5 Dec · Teresa
P('37-let-nothing-disturb-you',[(i,n,h)=>`<div class="s grain" style="background:radial-gradient(110% 80% at 50% 30%,#8a6a48 0%,#6b4f35 55%,#4d3724 100%);color:#f4ead6;align-items:center;padding:80px">
 <div class="z" style="position:relative;width:640px;height:760px;margin-top:20px"><div style="position:absolute;left:50%;top:-30px;width:600px;height:600px;margin-left:-300px;border-radius:50%;background:radial-gradient(circle,#e9c66f 0%,#c9a24b 62%,#a8822f 100%);box-shadow:0 0 0 3px #f1dca0 inset,0 0 80px rgba(233,198,111,.35)"></div>
  <div style="position:absolute;inset:60px 60px 0 60px;border-radius:260px 260px 18px 18px;background:url(${h.artURL('x-teresa')}) center 10%/cover;box-shadow:0 30px 60px rgba(0,0,0,.4)"></div></div>
 <p class="z" style="font:500 italic 58px/1.2 Cormorant,serif;text-align:center;margin-top:50px;max-width:820px">“Let nothing disturb you. All things pass; God does not change. God alone suffices.”</p>
 <div class="z" style="font:700 22px/1 Inter;letter-spacing:.24em;text-transform:uppercase;color:#e9c66f;margin-top:28px">St Teresa of Ávila</div>
 <div class="spacer"></div><div class="z">${BR(h,'#f4ead6')}</div></div>`]);

// 38 · Wed 9 Dec · contingency
P('38-something-rather-than-nothing',[
 COVER('salisbury','center 40%','','Why is there <em>something</em> rather than nothing?','The one question that never goes away. ↓','Faith & reason'),
 V('Look around',`<p class="z body" style="font-size:38px">You. Your phone. The sun. Everything you have ever met <b>could have not existed</b>.</p><p class="z body" style="margin-top:26px;font-size:38px">Philosophers call such things <span class="mark">contingent</span>: they don’t explain their own existence. They borrow it from something else.</p>`),
 I('The chain of borrowers',`<p class="z body" style="font-size:38px">A borrows existence from B. B from C. C from D…</p><p class="z q l" style="margin-top:34px">A chain of borrowers, however long, still needs a lender.</p><p class="z body sm" style="margin-top:28px">A train with infinite carriages still goes nowhere without an engine.</p>`),
 V('Aquinas: the Third Way',`<p class="z q">“Therefore we cannot but postulate the existence of some being having of itself its own necessity… This all men speak of as God.”</p><p class="z cite" style="margin-top:26px">Summa Theologiae I, q.2, a.3</p>`),
 I('“But who made God?”',`<p class="z body" style="font-size:37px">The argument never said <i>everything</i> has a cause. It says everything that <b>doesn’t have to exist</b> has one.</p><p class="z body" style="margin-top:24px;font-size:37px">God isn’t one more borrower in the chain. He is existence itself.</p><p class="z q m" style="margin-top:28px">“I AM WHO AM.”</p><p class="z cite" style="margin-top:14px">Exodus 3:14</p>`),
 V('“Physics says a universe can come from nothing”',`<p class="z body" style="font-size:38px">The “nothing” of physics is a quantum vacuum with energy and laws. That is very much something.</p><p class="z body" style="margin-top:26px;font-size:38px">The real question remains: why is there a vacuum, or laws, or anything at all?</p>`),
 GOLD('The takeaway','You didn’t have to exist. You do.','Someone wanted you to. Read the Five Ways in Golden Chain → Theology.'),
]);

const only=process.argv[2];
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out2').catch(e=>{console.error(e);process.exit(1)});
