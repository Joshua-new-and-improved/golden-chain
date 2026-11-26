// Post 63 "The Golden Chain": one continuous 12-slide panorama. A real gold chain runs unbroken across
// every seam, from the Fall to "you", with medallions of salvation history hanging from it.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const FS='/tmp/claude-0/ig/node_modules/@fontsource/';const ART='/tmp/art/c/';
const ff=(fam,file,w,st='normal')=>`@font-face{font-family:'${fam}';src:url('file://${FS}${file}') format('woff2');font-weight:${w};font-style:${st}}`;
const FONTS=[ff('Garamond','eb-garamond/files/eb-garamond-latin-400-normal.woff2',400),ff('Garamond','eb-garamond/files/eb-garamond-latin-400-italic.woff2',400,'italic'),ff('Garamond','eb-garamond/files/eb-garamond-latin-500-normal.woff2',500),
 ff('Garamond','eb-garamond/files/eb-garamond-latin-600-italic.woff2',600,'italic'),ff('Sans','source-sans-3/files/source-sans-3-latin-700-italic.woff2',700,'italic'),ff('Sans','source-sans-3/files/source-sans-3-latin-700-normal.woff2',700),ff('Sans','source-sans-3/files/source-sans-3-latin-600-normal.woff2',600)].join('');
const MARK=fs.readFileSync('/home/claude/golden-chain/brand/mark.svg','utf8').replace(/<\?xml[^>]*>/,'');
const N=12,W=1080,H=1350,TW=N*W;
const cy=x=>690+70*Math.sin(x/620)+18*Math.sin(x/170);
const STEPS=[
 null,
 {img:'r-fall',up:1,k:'Genesis 3',t:'The first link breaks.',b:'Then God makes a promise: the woman’s offspring will crush the serpent.',ref:'Genesis 3:15'},
 {img:'r-abraham',up:0,k:'Genesis 14 · 22',t:'A priest brings bread and wine.',b:'Abraham is promised: all nations will be blessed through you.',ref:'Genesis 22:18'},
 {img:'r-moses2',up:1,k:'Exodus 2',t:'A baby is drawn out of the water.',b:'He will lead God’s people out of slavery.',ref:'Exodus 3:10'},
 {img:'r-david',up:0,k:'2 Samuel 7',t:'A shepherd becomes king.',b:'God promises him a son whose throne will last forever.',ref:'2 Samuel 7:16'},
 {img:'r-isaiah',up:1,k:'Isaiah 7',t:'“A virgin shall conceive.”',b:'And his name shall be Emmanuel: God with us.',ref:'Isaiah 7:14'},
 {img:'r-mary',up:0,k:'Luke 1',t:'A girl from Nazareth says yes.',b:'“Let it be done to me according to your word.”',ref:'Luke 1:38'},
 {img:'r-baby',up:1,k:'Luke 2',t:'The promise has a face.',b:'“The Word became flesh and dwelt among us.”',ref:'John 1:14'},
 {img:'r-cross',up:0,k:'John 19',t:'“It is finished.”',b:'The link broken in Eden, mended in His body.',ref:'John 19:30'},
 {img:'r-risen',up:1,k:'Matthew 28',t:'He is not here. He is risen.',b:'The chain death put on us snaps.',ref:'Matthew 28:6'},
 {img:'r-fathers',up:0,k:'AD 100 – today',t:'The links keep coming.',b:'Apostles, Fathers, Doctors, saints. Your grandmother.',ref:'2 Timothy 2:2'},
 {you:1,up:1,k:'Today',t:'The next link is you.',b:'Hand it on: send this to one person.',ref:''}];
// chain path samples
const pts=[];for(let x=-40;x<=TW-W/2+40;x+=1)pts.push([x,cy(x)]);
const link=(x,y,ang,k)=>k%2?`<ellipse cx="${x}" cy="${y}" rx="30" ry="7" transform="rotate(${ang} ${x} ${y})" fill="url(#gl)" stroke="#5a3d0a" stroke-width="2"/>`
 :`<ellipse cx="${x}" cy="${y}" rx="31" ry="17" transform="rotate(${ang} ${x} ${y})" fill="none" stroke="#5a3d0a" stroke-width="11"/><ellipse cx="${x}" cy="${y}" rx="31" ry="17" transform="rotate(${ang} ${x} ${y})" fill="none" stroke="url(#gl)" stroke-width="7"/><ellipse cx="${x-4}" cy="${y-4}" rx="22" ry="10" transform="rotate(${ang} ${x} ${y})" fill="none" stroke="#fff6cf" stroke-width="1.6" opacity=".7"/>`;
function chainSVG(x0,x1){let s='',k=0,acc=0;for(let i=1;i<pts.length;i++){const [xa,ya]=pts[i-1],[xb,yb]=pts[i];acc+=Math.hypot(xb-xa,yb-ya);if(acc>=44){acc=0;if(xb>=x0-60&&xb<=x1+60){const ang=Math.atan2(yb-ya,xb-xa)*180/Math.PI;s+=link(xb,yb,ang,k);}k++;}}return s;}
const R=205;
function slide(i){const cx=i*W+W/2,y=cy(cx);const st=STEPS[i];let body='';
 if(st){const up=st.up,ry=up?y-120-R:y+120+R;
  // drop chain from main chain to medallion
  let drop='';const y0=Math.min(y,ry),y1=Math.max(y,ry);for(let yy=y0+30,k=0;yy<y1-R+10&&yy>y0;yy+=36,k++)drop+=`<ellipse cx="${cx}" cy="${up?y-30-(yy-y0):yy}" rx="${k%2?6:13}" ry="${k%2?17:19}" fill="${k%2?'url(#gl)':'none'}" stroke="${k%2?'#5a3d0a':'url(#gl)'}" stroke-width="${k%2?2:6}"/>`;
  const med=st.you?`<circle cx="${cx}" cy="${ry}" r="${R-18}" fill="#efe6d2" stroke="#b08a3c" stroke-width="5" stroke-dasharray="18 14"/><text x="${cx}" y="${ry+26}" text-anchor="middle" font-family="Garamond" font-style="italic" font-size="84" fill="#8a6a2a">you</text>`
   :`<clipPath id="c${i}"><circle cx="${cx}" cy="${ry}" r="${R-18}"/></clipPath><image href="file://${ART}${st.img}.jpg" x="${cx-R+18}" y="${ry-R+18}" width="${2*R-36}" height="${2*R-36}" clip-path="url(#c${i})" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="${cx}" cy="${ry}" r="${R-9}" fill="none" stroke="url(#gr)" stroke-width="20"/><circle cx="${cx}" cy="${ry}" r="${R}" fill="none" stroke="#5a3d0a" stroke-width="2"/><circle cx="${cx}" cy="${ry}" r="${R-19}" fill="none" stroke="#5a3d0a" stroke-width="2"/>`;
  body+=`<svg class="ov" width="${TW}" height="${H}"><g filter="url(#sh)">${drop}${med}</g></svg>`;
  const ty=up?y+70:y-70;const tStyle=up?`top:${ty}px`:`bottom:${H-ty}px`;
  body+=`<div class="tx" style="left:${i*W+96}px;width:${W-192}px;${tStyle};text-align:center"><div class="k">${st.k}</div><div class="t">${st.t}</div><div class="b">${st.b}</div>${st.ref?`<div class="r">${st.ref}</div>`:''}</div>`;}
 return body;}
const years=[[1,'IN THE BEGINNING'],[4,'THE KINGS'],[5,'THE PROPHETS'],[7,'FULLNESS OF TIME'],[10,'THE CHURCH']];
const html=()=>`<html><head><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;overflow:hidden}
#wrap{position:absolute;left:0;top:0;width:${TW}px;height:${H}px;background:#ece3cf;overflow:hidden}
#wrap:before{content:"";position:absolute;inset:0;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35 0 0 0 0 .28 0 0 0 0 .18 0 0 0 .5 0'/></filter><rect width='500' height='500' filter='url(%23n)'/></svg>");opacity:.75}
#wrap:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(110,80,30,.18),transparent 14%,transparent 86%,rgba(110,80,30,.22))}
.ov{position:absolute;left:0;top:0;z-index:3;overflow:visible}
.era{position:absolute;top:74px;z-index:2;font:500 88px/1 Garamond;letter-spacing:.05em;color:rgba(120,90,40,.11);white-space:nowrap}
.tx{position:absolute;z-index:4;color:#231d14}
.tx .k{font:700 22px/1 Sans;letter-spacing:.24em;text-transform:uppercase;color:#9c2d24}
.tx .t{font:500 60px/1.06 Garamond;margin-top:16px}
.tx .b{font:400 italic 36px/1.3 Garamond;margin-top:14px;color:#3d3426}
.tx .r{font:600 21px/1 Sans;letter-spacing:.16em;text-transform:uppercase;margin-top:16px;color:#8a6a2a}
.foot{position:absolute;bottom:40px;z-index:5;width:${W}px;text-align:center;font:600 19px/1 Sans;letter-spacing:.16em;color:#5c4a2c;opacity:.8}
.num{position:absolute;bottom:40px;z-index:5;font:600 19px/1 Sans;letter-spacing:.12em;color:#9c2d24}
.cover{position:absolute;left:96px;top:120px;width:860px;z-index:4;color:#1d1810}
.cover .k{font:700 24px/1 Sans;letter-spacing:.24em;text-transform:uppercase;color:#9c2d24}
.cover h1{font:500 118px/0.98 Garamond;margin-top:28px;letter-spacing:-.01em}.cover h1 em{font-style:italic;color:#9a7424}
.cover p{font:400 italic 40px/1.3 Garamond;margin-top:28px;color:#3d3426;max-width:760px}
.swipe{position:absolute;left:820px;top:560px;z-index:5;font:700 26px/1 Sans;letter-spacing:.2em;color:#9c2d24}
.endp{position:absolute;z-index:4;text-align:center;color:#231d14}
</style></head><body><div id="wrap">
 ${years.map(([i,t])=>`<div class="era" style="left:${i*W+60}px">${t}</div>`).join('')}
 <svg class="ov" width="${TW}" height="${H}"><defs>
  <linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".35" stop-color="#e2b850"/><stop offset=".7" stop-color="#a77a22"/><stop offset="1" stop-color="#6b4a10"/></linearGradient>
  <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e09a"/><stop offset=".35" stop-color="#b98a2c"/><stop offset=".55" stop-color="#f3d98a"/><stop offset=".8" stop-color="#8c6418"/><stop offset="1" stop-color="#e9c96c"/></linearGradient>
  <filter id="sh" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#3b2806" flood-opacity=".35"/></filter></defs>
  <g filter="url(#sh)">${chainSVG(0,TW-W/2)}</g>
  <circle cx="${TW-W/2}" cy="${cy(TW-W/2)}" r="0"/></svg>
 ${Array.from({length:N},(_,i)=>slide(i)).join('')}
 <div class="cover"><div class="k">The story so far</div><h1>4,000 years.<br><em>One golden chain.</em></h1><p>Swipe along it, from the first broken link to the next one.</p></div>
 <div class="swipe">SWIPE →</div>
 ${Array.from({length:N},(_,i)=>i?`<div class="num" style="left:${i*W+60}px">${String(i).padStart(2,'0')} / ${N-1}</div><div class="foot" style="left:${i*W}px">Golden Chain · Link in bio</div>`:'').join('')}
 <div class="endp" style="left:${(N-1)*W+140}px;width:${W-280}px;top:1090px"><div style="display:flex;align-items:center;justify-content:center;gap:16px;font:600 22px/1 Sans;letter-spacing:.14em;color:#5c4a2c"><span style="width:56px;height:56px;border-radius:50%;background:#f8f2e4;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.2)"><span style="width:38px;height:38px;display:block">${MARK.replace('<svg','<svg width="38" height="38"')}</span></span>READ THE BIBLE WITH 2,000 YEARS OF SAINTS</div></div>
</div></body></html>`;
(async()=>{const out=process.argv[2]||'/tmp/gal3/63-golden-chain';fs.mkdirSync(out,{recursive:true});for(const f of fs.readdirSync(out))fs.unlinkSync(path.join(out,f));
 fs.writeFileSync('/tmp/pano.html',html());const b=await chromium.launch();const pg=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 await pg.goto('file:///tmp/pano.html',{waitUntil:'load'});await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(400);
 for(let i=0;i<N;i++){await pg.evaluate(x=>{document.getElementById('wrap').style.transform=`translateX(${-x}px)`;},i*W);await pg.waitForTimeout(120);
  await pg.screenshot({path:path.join(out,String(i+1).padStart(2,'0')+'.png'),type:'png'});}
 await b.close();process.stdout.write(require('child_process').execFileSync('python3',['/home/claude/golden-chain/marketing/ig/tools/down.py',out]).toString());})();
