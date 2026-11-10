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
