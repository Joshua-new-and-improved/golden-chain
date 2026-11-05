// Golden Chain Instagram design system: slides described as data, rendered to PNG with Chromium.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const D='/tmp/claude-0/ig/';const FS=D+'node_modules/@fontsource/';
const HANDLE=process.env.HANDLE||'@goldenchain.app';
const font=(fam,file,w,st='normal')=>`@font-face{font-family:'${fam}';src:url('file://${FS}${file}') format('woff2');font-weight:${w};font-style:${st}}`;
const FONTS=[font('Instrument Serif','instrument-serif/files/instrument-serif-latin-400-normal.woff2',400),font('Instrument Serif','instrument-serif/files/instrument-serif-latin-400-italic.woff2',400,'italic'),
 font('Cormorant','cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2',500),font('Cormorant','cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2',500,'italic'),font('Cormorant','cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2',600,'italic'),
 ...[400,500,600,700,800].map(w=>font('Inter',`inter/files/inter-latin-${w}-normal.woff2`,w)),font('Fraktur','unifrakturcook/files/unifrakturcook-latin-700-normal.woff2',700),font('Mono','jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2',500)].join('');
const ROMAN=['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
const MARK=fs.readFileSync('/home/claude/golden-chain/brand/mark.svg','utf8').replace(/<\?xml[^>]*>/,'');const SEAL=fs.readFileSync('/home/claude/golden-chain/brand/seal.svg','utf8');
const CSS=`${FONTS}
:root{--ink:#0e1520;--ink2:#17202e;--vellum:#f3ecdf;--vellum2:#e9dfcc;--gold:#c9a24b;--gold2:#e6c97a;--rubric:#a3302a;--mut:#8e8a80}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;display:flex;flex-direction:column;padding:96px 92px 84px}
.s.story{height:1920px}html.story,html.story body{height:1920px}
.ink{background:radial-gradient(120% 80% at 70% 0%,#1d2a3d 0%,var(--ink) 60%);color:#efe8da}
.vellum{background:radial-gradient(120% 90% at 30% 10%,#f8f2e7 0%,var(--vellum) 55%,var(--vellum2) 100%);color:#1b1a17}
.gold{background:linear-gradient(160deg,#d8b866,#b8903c);color:#16120a}
.rub{background:#7d1f1b;color:#f6ead8}
.grain:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.22;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 1 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")}
.vellum.grain:after{opacity:.35;mix-blend-mode:multiply}
.art{position:absolute;inset:0;background-size:cover;background-position:center}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,20,.15) 0%,rgba(10,14,20,.25) 40%,rgba(10,14,20,.92) 100%)}
.shade.top{background:linear-gradient(0deg,rgba(10,14,20,.1) 0%,rgba(10,14,20,.85) 100%)}
.z{position:relative;z-index:2}
.kick{display:flex;align-items:center;gap:16px;font:600 25px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.vellum .kick{color:var(--rubric)}.gold .kick{color:#3b2a08}
.kick .ln{height:2px;width:56px;background:currentColor;opacity:.8}
.chain{display:inline-flex;gap:0}.chain i{width:22px;height:14px;border:3px solid currentColor;border-radius:10px;display:block}.chain i+i{margin-left:-7px}
h1{font:400 118px/1.0 'Instrument Serif',serif;letter-spacing:-.015em}
h1.xl{font-size:150px}h1.l{font-size:104px}h1.m{font-size:86px}h1.s{font-size:70px}
h1 em,h2 em{font-style:italic;color:var(--gold2)}.vellum h1 em,.vellum h2 em{color:var(--rubric)}
h2{font:400 64px/1.08 'Instrument Serif',serif}
.q{font:500 italic 58px/1.22 Cormorant,serif}.q.m{font-size:50px}.q.sm{font-size:44px}.q.l{font-size:66px}
.body{font:400 34px/1.45 Inter;opacity:.92}.body.sm{font-size:30px}.body b{font-weight:700}
.small{font:500 24px/1.4 Inter;opacity:.75}
.mono{font:500 22px/1 Mono,monospace;letter-spacing:.06em;text-transform:uppercase;opacity:.7}
.cite{font:600 25px/1.3 Inter;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}.vellum .cite{color:var(--rubric)}
.mark{display:inline-block;background:linear-gradient(transparent 62%,rgba(201,162,75,.55) 62%)}
.vellum .mark{background:linear-gradient(transparent 62%,rgba(163,48,42,.22) 62%)}
.foot{margin-top:auto;padding-top:52px;align-self:stretch;text-align:left;display:flex;align-items:center;justify-content:space-between;font:600 23px/1 Inter;letter-spacing:.06em}
.foot .brand{display:flex;align-items:center;gap:14px}.foot .brand svg{width:44px;height:44px}
.foot .pg{font:500 24px/1 'Instrument Serif';letter-spacing:.12em;opacity:.8}
.swipe{font:600 23px/1 Inter;letter-spacing:.14em;text-transform:uppercase;opacity:.85}
.drop{float:left;font:400 210px/.78 'Instrument Serif';color:var(--rubric);margin:10px 18px 0 0}
.ink .drop,.art-s .drop{color:var(--gold)}
.lbl{font:700 22px/1 Inter;letter-spacing:.18em;text-transform:uppercase;color:var(--rubric);margin:0 0 12px}.ink .lbl{color:var(--gold)}
.box{border:2px solid currentColor;border-radius:4px;padding:34px 38px;position:relative}
.box:before{content:"";position:absolute;inset:8px;border:1px solid currentColor;opacity:.35;border-radius:2px;pointer-events:none}
.phone{width:430px;height:auto;border-radius:64px;background:#0b0b0d;padding:14px;box-shadow:0 40px 80px rgba(0,0,0,.45),0 0 0 2px #2a2a2e inset;position:relative}
.phone img{width:100%;height:auto;aspect-ratio:1170/1992;object-fit:cover;object-position:top;border-radius:52px;display:block}
.phone:after{content:"";position:absolute;top:28px;left:50%;transform:translateX(-50%);width:96px;height:28px;border-radius:16px;background:#0b0b0d}
.pill{display:inline-block;padding:14px 26px;border-radius:999px;font:700 26px/1 Inter;letter-spacing:.04em}
.pill.g{background:var(--gold);color:#16120a}.pill.o{border:2px solid currentColor}
.list{display:flex;flex-direction:column;gap:26px}.list .it{display:flex;gap:22px;align-items:flex-start;font:400 34px/1.35 Inter}
.list .n{flex:none;font:400 48px/1 'Instrument Serif';color:var(--gold);width:56px}.vellum .list .n{color:var(--rubric)}
.label-museum{font:500 20px/1.35 Inter;opacity:.8;border-left:2px solid currentColor;padding-left:14px}
.frak{font:700 40px/1 Fraktur}
.center{align-items:center;text-align:center}.center .kick{justify-content:center}
.spacer{flex:1}.row{display:flex;gap:46px;align-items:center}.row>div:last-child{flex:1;min-width:0}
.rule{height:2px;background:currentColor;opacity:.25;margin:34px 0}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.tag{display:inline-block;padding:8px 16px;border-radius:6px;font:700 20px/1 Inter;letter-spacing:.12em;text-transform:uppercase;background:var(--rubric);color:#fff}
.ink .tag{background:var(--gold);color:#16120a}
`;
const foot=(i,n,opt={})=>`<div class="foot z"><span class="brand">${MARK}<span>${HANDLE}</span></span>${opt.swipe?`<span class="swipe">Swipe →</span>`:n>1?`<span class="pg">${ROMAN[i]} / ${ROMAN[n]}</span>`:`<span class="pg">Scripture with the saints</span>`}</div>`;
const artURL=k=>`file://${D}art/${k}.webp`;const shotURL=k=>`file://${D}shots/${k}.png`;
async function render(posts,out){const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
  for(const post of posts){const dir=path.join(out,post.id);fs.mkdirSync(dir,{recursive:true});
    for(let i=0;i<post.slides.length;i++){const sl=post.slides[i];const story=post.story;
      await pg.setViewportSize({width:1080,height:story?1920:1350});
      const html=`<!doctype html><html class="${story?'story':''}"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${sl(i+1,post.slides.length,{foot,artURL,shotURL,MARK,SEAL,HANDLE})}</body></html>`;
      const tf=D+'_tmp.html';fs.writeFileSync(tf,html);await pg.goto('file://'+tf,{waitUntil:'load'});await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(120);
      await pg.screenshot({path:path.join(dir,`${String(i+1).padStart(2,'0')}.png`)});}
    console.log('rendered',post.id,post.slides.length);}
  await b.close();}
module.exports={render,ROMAN,HANDLE};
