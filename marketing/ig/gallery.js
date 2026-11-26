// Golden Chain "Gallery" style (26 Nov 2026, after Joshua's Thomistic Institute references):
// full-bleed old masters, one painting panned across slides, gilt frames on parchment,
// short serif lines with a bold italic sans "answer" line, and almost nothing else.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const FS='/tmp/claude-0/ig/node_modules/@fontsource/';const ART='/tmp/art/c/';
const font=(fam,file,w,st='normal')=>`@font-face{font-family:'${fam}';src:url('file://${FS}${file}') format('woff2');font-weight:${w};font-style:${st}}`;
const FONTS=[font('Garamond','eb-garamond/files/eb-garamond-latin-400-normal.woff2',400),font('Garamond','eb-garamond/files/eb-garamond-latin-400-italic.woff2',400,'italic'),
 font('Garamond','eb-garamond/files/eb-garamond-latin-500-normal.woff2',500),font('Garamond','eb-garamond/files/eb-garamond-latin-600-italic.woff2',600,'italic'),
 font('Sans','source-sans-3/files/source-sans-3-latin-700-italic.woff2',700,'italic'),font('Sans','source-sans-3/files/source-sans-3-latin-600-normal.woff2',600),
 font('Sans','source-sans-3/files/source-sans-3-latin-400-italic.woff2',400,'italic'),font('Sans','source-sans-3/files/source-sans-3-latin-600-italic.woff2',600,'italic')].join('');
const MARK=fs.readFileSync('/home/claude/golden-chain/brand/mark.svg','utf8').replace(/<\?xml[^>]*>/,'');
const img=n=>'file://'+ART+n+'.jpg';
const NOISE=`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35 0 0 0 0 .3 0 0 0 0 .22 0 0 0 .55 0'/></filter><rect width='400' height='400' filter='url(%23n)'/></svg>")`;
const CSS=`${FONTS}*{box-sizing:border-box;margin:0;padding:0}html,body{width:1080px;height:1350px;overflow:hidden;background:#000}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;color:#fff;font-family:Garamond,serif}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.foot{position:absolute;left:0;right:0;bottom:46px;text-align:center;font:600 19px/1 Sans;letter-spacing:.16em;text-transform:uppercase;opacity:.92;z-index:3}
.t{position:absolute;z-index:3;text-shadow:0 2px 18px rgba(0,0,0,.55),0 1px 3px rgba(0,0,0,.6)}
.t .a{font:400 50px/1.18 Garamond;letter-spacing:.005em}
.t .b{font:700 italic 44px/1.2 Sans;margin-top:18px;letter-spacing:.005em}
.t.sm .a{font-size:44px}.t.sm .b{font-size:39px}
.cov{position:absolute;left:84px;right:84px;bottom:128px;z-index:3;text-shadow:0 2px 20px rgba(0,0,0,.6)}
.cov .k{font:600 italic 34px/1 Garamond;color:#ecd38e;margin-bottom:22px;letter-spacing:.01em}
.cov h1{font:500 78px/1.02 Garamond;text-transform:uppercase;letter-spacing:.01em}
.cov .row{display:flex;align-items:center;gap:30px}.cov .arrow{flex:1;height:2px;background:#fff;position:relative;min-width:120px;box-shadow:0 1px 6px rgba(0,0,0,.5)}
.cov .arrow:after{content:"";position:absolute;right:-2px;top:-8px;border-left:16px solid #fff;border-top:9px solid transparent;border-bottom:9px solid transparent}
.cov .url{font:600 19px/1 Sans;letter-spacing:.14em;margin-top:26px;opacity:.9}
.paper{background:#e9e3d4;color:#22201b;display:flex;flex-direction:column;align-items:center;padding-bottom:100px}.paper:before{content:"";position:absolute;inset:0;background:${NOISE};opacity:.9}
.paper:after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 45%,transparent 55%,rgba(120,95,55,.22) 100%)}
.paper .lead{position:relative;z-index:2;margin:96px auto 0;max-width:780px;text-align:center;font:400 italic 29px/1.42 Sans;letter-spacing:.07em;text-transform:uppercase;color:#2b2822}
.paper .lead b{font-weight:600}
.gilt{position:relative;z-index:2;margin:auto;padding:30px;width:max-content;background:
 repeating-linear-gradient(45deg,rgba(255,240,190,.35) 0 2px,transparent 2px 7px),linear-gradient(135deg,#6b4a12,#e8cd78 18%,#9a7425 34%,#f3dc8c 52%,#8a6418 70%,#e2c46c 86%,#5e420f);
 box-shadow:0 30px 50px rgba(50,35,10,.45),inset 0 0 0 3px #f6e3a0,inset 0 0 0 9px #7a5818,inset 0 0 0 12px #e9cf7a}
.gilt:before{content:"";position:absolute;inset:12px;border:4px dotted rgba(90,60,10,.65);pointer-events:none}
.gilt img{display:block;box-shadow:0 0 0 4px #3a2a0c,0 0 0 8px #c8a450,inset 0 0 20px #000}
.paper .foot{color:#2b2822;opacity:.85}
.dark{background:#100d0a}.dark .bg{opacity:.22;filter:blur(1px)}
.q{position:absolute;left:96px;right:96px;top:50%;transform:translateY(-50%);z-index:3}
.q .h{font:600 22px/1 Sans;letter-spacing:.22em;text-transform:uppercase;color:#d8bd72;margin-bottom:34px}
.q .p{font:400 italic 46px/1.32 Garamond}.q .p.sm{font-size:38px}.q .c{font:600 22px/1 Sans;letter-spacing:.16em;text-transform:uppercase;margin-top:30px;color:#d8bd72}
.q .b{font:700 italic 40px/1.25 Sans;margin-top:30px}
.strip{position:absolute;left:0;top:0;bottom:0;width:430px;background-size:cover;background-position:center}
.strip:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 70%,#100d0a)}
.list{position:absolute;left:480px;right:80px;top:50%;transform:translateY(-52%);z-index:3}
.list .h{font:600 22px/1 Sans;letter-spacing:.22em;text-transform:uppercase;color:#d8bd72;margin-bottom:46px}
.list .it{margin-bottom:56px}.list .n{font:500 60px/1.05 Garamond}.list .n span{font:400 italic 30px/1 Garamond;color:#d8bd72;margin-left:12px;display:inline-block;white-space:nowrap}
.list .d{font:400 italic 33px/1.35 Sans;opacity:.88;margin-top:10px}
.end{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 110px}
.end .disc{width:120px;height:120px;border-radius:50%;background:#f3ecdf;display:flex;align-items:center;justify-content:center;margin-bottom:46px;box-shadow:0 10px 30px rgba(0,0,0,.4);position:relative;z-index:3}
.end .disc svg{width:78px;height:78px}
.end h2{font:500 76px/1.04 Garamond;position:relative;z-index:3;text-shadow:0 2px 20px rgba(0,0,0,.6)}.end h2 em{font-style:italic;color:#ecd38e}
.end p{font:400 italic 34px/1.4 Sans;margin-top:30px;position:relative;z-index:3;opacity:.95;text-shadow:0 2px 12px rgba(0,0,0,.6)}
`;
const POS={tl:'left:84px;top:96px;right:220px',tr:'right:84px;top:96px;left:240px;text-align:right',bl:'left:84px;bottom:130px;right:200px',br:'right:84px;bottom:130px;left:220px;text-align:right',
 tc:'left:110px;right:110px;top:96px;text-align:center',bc:'left:100px;right:100px;bottom:130px;text-align:center'};
const SHADE={tl:'linear-gradient(170deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.2) 38%,transparent 60%)',tr:'linear-gradient(190deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.2) 38%,transparent 60%)',tc:'linear-gradient(180deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.15) 40%,transparent 60%)',
 bl:'linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.25) 38%,transparent 60%)',br:'linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.25) 38%,transparent 60%)',bc:'linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.25) 38%,transparent 60%)'};
const FOOT=(dark=true)=>`<div class="foot">Golden Chain · Link in bio</div>`;
const txt=(o)=>o.a||o.b?`<div style="position:absolute;inset:0;background:${o.shade===false?'none':SHADE[o.pos||'tl']};z-index:2"></div><div class="t ${o.sm?'sm':''}" style="${POS[o.pos||'tl']}">${o.a?`<div class="a">${o.a}</div>`:''}${o.b?`<div class="b">${o.b}</div>`:''}</div>`:'';
const L={
 cover:o=>`<div class="s"><div class="bg" style="background-image:url(${img(o.img)});background-position:${o.bp||'center'}"></div><div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.35) 34%,transparent 55%)"></div>
  <div class="cov">${o.k?`<div class="k">${o.k}</div>`:''}<h1>${o.lines.slice(0,-1).map(l=>`<div>${l}</div>`).join('')}<div class="row"><span>${o.lines[o.lines.length-1]}</span><span class="arrow"></span></div></h1><div class="url">@GOLDEN_CHAIN_CATH</div></div></div>`,
 pano:o=>`<div class="s"><div class="bg" style="background-image:url(${img(o.img)});background-size:${o.of*1080}px 1350px;background-position:${-o.i*1080}px 0"></div>${txt(o)}${FOOT()}</div>`,
 detail:o=>`<div class="s"><div class="bg" style="background-image:url(${img(o.img)});background-position:${o.bp||'center'}"></div>${txt(o)}${FOOT()}</div>`,
 frame:o=>`<div class="s paper"><div class="lead">${o.lead}</div><div class="gilt"><img src="${img(o.img)}" style="height:${o.h||760}px;max-width:820px;object-fit:cover"></div><div class="foot">Golden Chain · Link in bio</div></div>`,
 quote:o=>`<div class="s dark">${o.img?`<div class="bg" style="background-image:url(${img(o.img)})"></div>`:''}<div class="q">${o.h?`<div class="h">${o.h}</div>`:''}<div class="p ${o.sm?'sm':''}">${o.p}</div>${o.c?`<div class="c">${o.c}</div>`:''}${o.b?`<div class="b">${o.b}</div>`:''}</div>${FOOT()}</div>`,
 list:o=>`<div class="s dark"><div class="strip" style="background-image:url(${img(o.img)})"></div><div class="list"><div class="h">${o.h}</div>${o.items.map(([n,y,d])=>`<div class="it"><div class="n">${n}<span>${y}</span></div><div class="d">${d}</div></div>`).join('')}</div>${FOOT()}</div>`,
 end:o=>`<div class="s end"><div class="bg" style="background-image:url(${img(o.img)});background-position:${o.bp||'center'};filter:brightness(.42) saturate(.9)"></div><div class="disc">${MARK}</div><h2>${o.h}</h2><p>${o.p}</p>${FOOT()}</div>`};
async function render(posts,outRoot,only,X={}){const LL={...L,...(X.L||{})};const XC=X.css||'';const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
 for(const p of posts){if(only&&only.length&&!only.includes(p.id))continue;const dir=path.join(outRoot,p.id);fs.mkdirSync(dir,{recursive:true});for(const f of fs.readdirSync(dir))if(/\.(jpg|png)$/.test(f))fs.unlinkSync(path.join(dir,f));
  for(let k=0;k<p.slides.length;k++){const s=p.slides[k];fs.writeFileSync('/tmp/gal_slide.html',`<html><head><style>${CSS}${XC}</style></head><body>${LL[s.t](s)}</body></html>`);await pg.goto('file:///tmp/gal_slide.html',{waitUntil:'load'});await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(150);
   await pg.screenshot({path:path.join(dir,String(k+1).padStart(2,'0')+'.png'),type:'png'});}
  process.stdout.write(require('child_process').execFileSync('python3',['/home/claude/golden-chain/marketing/ig/tools/down.py',dir]).toString());console.log(p.id,p.slides.length);}
 await b.close();}
module.exports={render,L,img,MARK,FOOT,txt,POS,SHADE,NOISE};
