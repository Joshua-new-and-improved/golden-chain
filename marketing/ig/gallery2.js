// Posts 56-62 (26 Nov 2026): new creative formats on top of gallery.js
// lens (magnifier tour), medal (front + back drawn in SVG), wreath (candles light up slide by slide),
// metro (Aquinas's Five Ways as a transit map), rx (prescription pad + pill label + leaflet),
// greek (one word parsed in colour), passport (Xavier's stamps).
const {render,img,MARK,FOOT,txt}=require('./gallery.js');
const FS='/tmp/claude-0/ig/node_modules/@fontsource/';
const ff=(fam,file,w,st='normal')=>`@font-face{font-family:'${fam}';src:url('file://${FS}${file}') format('woff2');font-weight:${w};font-style:${st}}`;
const CSS=[ff('Gk','eb-garamond/files/eb-garamond-greek-400-normal.woff2',400),ff('Gk','eb-garamond/files/eb-garamond-greek-500-normal.woff2',500),ff('Gk','eb-garamond/files/eb-garamond-greek-400-italic.woff2',400,'italic'),
 ff('Sans','source-sans-3/files/source-sans-3-latin-400-normal.woff2',400),ff('Sans','source-sans-3/files/source-sans-3-latin-700-normal.woff2',700),ff('Sans','source-sans-3/files/source-sans-3-latin-900-normal.woff2',900),
 ff('Mono','jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2',500)].join('')+`
.hd{position:absolute;left:84px;right:84px;top:92px;z-index:3}
.hd .k{font:600 22px/1 Sans;letter-spacing:.22em;text-transform:uppercase;color:#d8bd72}
.hd .a{font:400 50px/1.15 Garamond;margin-top:20px}.hd .b{font:700 italic 40px/1.22 Sans;margin-top:16px}
.cap{position:absolute;left:84px;right:84px;bottom:120px;z-index:3;text-shadow:0 2px 14px rgba(0,0,0,.6)}
.cap .a{font:400 46px/1.18 Garamond}.cap .b{font:700 italic 38px/1.22 Sans;margin-top:14px}
`;
const W=1080,H=1350;
// ---------- lens
const lens=o=>{const ph=W/o.asp,top=(H-ph)/2;const px=o.pt[0]*W,py=top+o.pt[1]*ph;const [zx,zy]=o.zc;const zr=o.zr||250;
 const dx=zx-px,dy=zy-py,d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d;const x1=px+ux*o.r,y1=py+uy*o.r,x2=zx-ux*zr,y2=zy-uy*zr;
 return `<div class="s"><div class="bg" style="background-image:url(${img(o.img)});background-size:${W}px ${ph}px;filter:brightness(.42) saturate(.85)"></div>
 <svg style="position:absolute;inset:0;z-index:2" width="${W}" height="${H}"><defs><clipPath id="z"><circle cx="${zx}" cy="${zy}" r="${zr}"/></clipPath></defs>
  <circle cx="${px}" cy="${py}" r="${o.r}" fill="none" stroke="#ecd38e" stroke-width="4"/><circle cx="${px}" cy="${py}" r="${o.r+10}" fill="none" stroke="#ecd38e" stroke-width="1.5" opacity=".7"/>
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ecd38e" stroke-width="2.5"/>
  <image href="${img(o.zoom)}" x="${zx-zr}" y="${zy-zr}" width="${2*zr}" height="${2*zr}" clip-path="url(#z)" preserveAspectRatio="xMidYMid slice"/>
  <circle cx="${zx}" cy="${zy}" r="${zr}" fill="none" stroke="#ecd38e" stroke-width="10"/><circle cx="${zx}" cy="${zy}" r="${zr+16}" fill="none" stroke="#ecd38e" stroke-width="2"/>
  ${o.n?`<circle cx="${zx+zr*.72}" cy="${zy-zr*.72}" r="34" fill="#ecd38e"/><text x="${zx+zr*.72}" y="${zy-zr*.72+12}" text-anchor="middle" font-family="Garamond" font-size="36" font-weight="500" fill="#1a1408">${o.n}</text>`:''}</svg>
 <div class="${o.capTop?'hd':'cap'}" style="z-index:3">${o.a?`<div class="a">${o.a}</div>`:''}${o.b?`<div class="b">${o.b}</div>`:''}</div>${FOOT()}</div>`;};
// ---------- medal
const ell=(cx,cy,rx,ry)=>`M ${cx} ${cy+ry} A ${rx} ${ry} 0 1 1 ${cx} ${cy-ry} A ${rx} ${ry} 0 1 1 ${cx} ${cy+ry}`;
const GOLD=`<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e09a"/><stop offset=".35" stop-color="#b98a2c"/><stop offset=".55" stop-color="#f3d98a"/><stop offset=".8" stop-color="#8c6418"/><stop offset="1" stop-color="#e9c96c"/></linearGradient>
 <radialGradient id="gf" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#f3dc96"/><stop offset=".6" stop-color="#c99b3d"/><stop offset="1" stop-color="#8a6418"/></radialGradient>`;
const star=(x,y,r)=>{let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p+=`${x+rr*Math.cos(a)},${y+rr*Math.sin(a)} `;}return `<polygon points="${p}"/>`;};
const heart=(x,y,s)=>`<path d="M ${x} ${y+s*.9} C ${x-s*1.3} ${y+s*.1} ${x-s*.9} ${y-s*.8} ${x} ${y-s*.25} C ${x+s*.9} ${y-s*.8} ${x+s*1.3} ${y+s*.1} ${x} ${y+s*.9} Z"/>`;
const flame=(x,y,s)=>`<path d="M ${x} ${y} C ${x-s*.5} ${y-s*.6} ${x-s*.1} ${y-s} ${x} ${y-s*1.5} C ${x+s*.15} ${y-s} ${x+s*.55} ${y-s*.6} ${x} ${y} Z"/>`;
const medalF=o=>{const cx=540,cy=600,rx=330,ry=440;return `<div class="s" style="background:radial-gradient(90% 70% at 50% 40%,#1d3a70 0%,#0d1c3b 60%,#070f22 100%)">
 <svg width="${W}" height="${H}" style="position:absolute;inset:0"><defs>${GOLD}<clipPath id="in"><ellipse cx="${cx}" cy="${cy}" rx="${rx-62}" ry="${ry-62}"/></clipPath><path id="tp" d="${ell(cx,cy,rx-34,ry-34)}"/></defs>
  ${Array.from({length:36},(_,i)=>{const a=i*Math.PI/18;return `<line x1="${cx+Math.cos(a)*(rx+30)}" y1="${cy+Math.sin(a)*(ry+30)}" x2="${cx+Math.cos(a)*(rx+150)}" y2="${cy+Math.sin(a)*(ry+150)}" stroke="#ecd38e" stroke-width="2" opacity=".22"/>`;}).join('')}
  <ellipse cx="${cx}" cy="${cy+14}" rx="${rx}" ry="${ry}" fill="#000" opacity=".45" filter="blur(10px)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#g)"/><ellipse cx="${cx}" cy="${cy}" rx="${rx-62}" ry="${ry-62}" fill="#2a1d08"/>
  <image href="${img(o.img)}" x="${cx-rx+62}" y="${cy-ry+62}" width="${2*(rx-62)}" height="${2*(ry-62)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#in)" style="filter:sepia(.55) saturate(1.2) brightness(1.05) contrast(1.05)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx-62}" ry="${ry-62}" fill="none" stroke="#5c420f" stroke-width="5"/><ellipse cx="${cx}" cy="${cy}" rx="${rx-8}" ry="${ry-8}" fill="none" stroke="#fff3c4" stroke-width="2" opacity=".7"/>
  <text font-family="Garamond" font-size="29" font-weight="500" letter-spacing="2.4" fill="#4a3308"><textPath href="#tp" startOffset="50%" text-anchor="middle">O MARY, CONCEIVED WITHOUT SIN, PRAY FOR US WHO HAVE RECOURSE TO THEE</textPath></text>
  <text x="${cx}" y="${cy+ry-22}" text-anchor="middle" font-family="Garamond" font-size="30" font-weight="500" letter-spacing="4" fill="#4a3308">1830</text></svg>
 <div class="cap" style="bottom:110px;text-align:center"><div class="a">${o.a}</div>${o.b?`<div class="b">${o.b}</div>`:''}</div>${FOOT()}</div>`;};
const medalB=o=>{const cx=540,cy=470,rx=260,ry=350;const st=Array.from({length:12},(_,i)=>{const a=Math.PI/2+i*2*Math.PI/12+Math.PI/12;return star(cx+Math.cos(a)*(rx-34),cy+Math.sin(a)*(ry-34),15);}).join('');
 const lab=(n,x,y)=>`<circle cx="${x}" cy="${y}" r="24" fill="#ecd38e"/><text x="${x}" y="${y+9}" text-anchor="middle" font-family="Garamond" font-size="28" font-weight="500" fill="#1a1408">${n}</text>`;
 return `<div class="s" style="background:radial-gradient(90% 70% at 50% 35%,#1d3a70 0%,#0d1c3b 60%,#070f22 100%)">
 <svg width="${W}" height="${H}" style="position:absolute;inset:0"><defs>${GOLD}</defs>
  <ellipse cx="${cx}" cy="${cy+12}" rx="${rx}" ry="${ry}" fill="#000" opacity=".45" filter="blur(10px)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#g)"/><ellipse cx="${cx}" cy="${cy}" rx="${rx-14}" ry="${ry-14}" fill="url(#gf)" stroke="#6e4e12" stroke-width="3"/>
  <g fill="#6e4e12">${st}</g>
  <g fill="none" stroke="#5a3f0c" stroke-width="14" stroke-linejoin="round" stroke-linecap="round">
   <path d="M ${cx-95} ${cy+60} L ${cx-95} ${cy-110} L ${cx} ${cy+10} L ${cx+95} ${cy-110} L ${cx+95} ${cy+60}"/>
   <path d="M ${cx-130} ${cy-110} L ${cx+130} ${cy-110}"/><path d="M ${cx} ${cy-110} L ${cx} ${cy-250}"/><path d="M ${cx-42} ${cy-205} L ${cx+42} ${cy-205}"/></g>
  <g fill="#5a3f0c">${heart(cx-80,cy+165,62)}${heart(cx+80,cy+165,62)}${flame(cx-80,cy+122,34)}${flame(cx+80,cy+122,34)}</g>
  <g fill="none" stroke="#f3dc96" stroke-width="4">${Array.from({length:9},(_,i)=>`<path d="M ${cx-125+i*12} ${cy+150-((i%2)?14:-14)} l 6 ${(i%2)?28:-28}"/>`).join('')}</g>
  <path d="M ${cx+20} ${cy+215} L ${cx+140} ${cy+95}" stroke="#f3dc96" stroke-width="7" stroke-linecap="round"/><path d="M ${cx+118} ${cy+92} L ${cx+143} ${cy+117}" stroke="#f3dc96" stroke-width="7" stroke-linecap="round"/>
  ${lab(1,cx-175,cy-150)}${lab(2,cx-175,cy+175)}${lab(3,cx+150,cy-310)}</svg>
 <div style="position:absolute;left:96px;right:96px;top:880px;z-index:3">${o.items.map((t,i)=>`<div style="display:flex;gap:22px;align-items:flex-start;margin-bottom:22px"><span style="flex:none;width:44px;height:44px;border-radius:50%;background:#ecd38e;color:#1a1408;font:500 28px/44px Garamond;text-align:center">${i+1}</span><span style="font:400 36px/1.25 Garamond">${t}</span></div>`).join('')}</div>${FOOT()}</div>`;};
// ---------- wreath
const wreath=o=>{const lit=o.lit;const cx=540,cy=760,rx=360,ry=110;const leaves=Array.from({length:150},(_,i)=>{const a=i/150*2*Math.PI+(i%3)*.02;const jr=1+((i*37)%11-5)/60;const x=cx+Math.cos(a)*rx*jr,y=cy+Math.sin(a)*ry*jr;const rot=(a*180/Math.PI+90+((i*53)%40-20));const g=['#1f3d23','#2b5230','#173019','#35633a','#244a29'][i%5];return `<ellipse cx="${x}" cy="${y}" rx="58" ry="19" transform="rotate(${rot} ${x} ${y})" fill="${g}"/>`;});
 const back=leaves.filter((_,i)=>Math.sin(i/150*2*Math.PI)<0),front=leaves.filter((_,i)=>Math.sin(i/150*2*Math.PI)>=0);
 const C=[{x:cx-.94*rx,y:cy+.34*ry,c:'#4b2470',s:1},{x:cx-.5*rx,y:cy-.87*ry,c:'#4b2470',s:.85},{x:cx+.5*rx,y:cy-.87*ry,c:'#c46e98',s:.85},{x:cx+.94*rx,y:cy+.34*ry,c:'#4b2470',s:1}];
 const cand=(k)=>{const q=C[k],h=300*q.s,w=64*q.s,on=k<lit;return `<g><rect x="${q.x-w/2}" y="${q.y-h}" width="${w}" height="${h}" fill="${q.c}"/><rect x="${q.x-w/2}" y="${q.y-h}" width="${w*.35}" height="${h}" fill="#fff" opacity=".12"/><ellipse cx="${q.x}" cy="${q.y-h}" rx="${w/2}" ry="${w*.18}" fill="${q.c}" style="filter:brightness(1.25)"/>
  <line x1="${q.x}" y1="${q.y-h}" x2="${q.x}" y2="${q.y-h-16}" stroke="#222" stroke-width="3"/>
  ${on?`<circle cx="${q.x}" cy="${q.y-h-40}" r="${150*q.s}" fill="url(#glow)"/><path d="M ${q.x} ${q.y-h-12} C ${q.x-15} ${q.y-h-28} ${q.x-8} ${q.y-h-55} ${q.x} ${q.y-h-78} C ${q.x+8} ${q.y-h-55} ${q.x+15} ${q.y-h-28} ${q.x} ${q.y-h-12} Z" fill="url(#fl)"/>`:''}</g>`;};
 return `<div class="s" style="background:#0b0806"><div class="bg" style="background-image:url(${img(o.img)});opacity:${.12+lit*.06};filter:blur(2px)"></div>
 <div style="position:absolute;inset:0;background:radial-gradient(60% 45% at 50% 52%,rgba(255,170,60,${.04+lit*.07}) 0%,transparent 70%)"></div>
 <svg width="${W}" height="${H}" style="position:absolute;inset:0;z-index:2"><defs><radialGradient id="glow"><stop offset="0" stop-color="#ffcf6b" stop-opacity=".55"/><stop offset=".4" stop-color="#ff9e2c" stop-opacity=".18"/><stop offset="1" stop-color="#ff9e2c" stop-opacity="0"/></radialGradient>
  <radialGradient id="fl" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#fffbe8"/><stop offset=".45" stop-color="#ffd76a"/><stop offset="1" stop-color="#ff8a1c"/></radialGradient></defs>
  ${back.join('')}${cand(1)}${cand(2)}${front.join('')}${cand(0)}${cand(3)}</svg>
 <div class="hd" style="text-align:center"><div class="k">${o.k}</div><div class="a" style="font-size:66px">${o.a}</div>${o.c?`<div style="font:400 italic 36px/1.3 Garamond;margin-top:18px;opacity:.9">${o.c}</div>`:''}</div>
 ${o.b?`<div class="cap" style="text-align:center;bottom:120px"><div class="b" style="font-size:36px">${o.b}</div></div>`:''}${FOOT()}</div>`;};
// ---------- metro
const LINES=[
 {c:'#d6453d',n:'1',name:'Change',pts:[[60,800],[440,800]],term:'Unmoved Mover',stops:['A pen moves','a hand moves it','muscles move the hand','and so on…'],side:-1},
 {c:'#2f6fd6',n:'2',name:'Cause',pts:[[80,300],[250,300],[480,530],[480,745]],term:'First Cause',stops:['You exist right now','held by your cells','held by atoms','held by…'],side:-1},
 {c:'#2e9c5a',n:'3',name:'Contingency',pts:[[1000,300],[830,300],[600,530],[600,745]],term:'Necessary Being',stops:['This tree might not have been','nor its seed','nor the earth','nor anything here'],side:1},
 {c:'#e0a526',n:'4',name:'Degrees',pts:[[1020,800],[640,800]],term:'Goodness Itself',stops:['A good meal','A good friend','A saint','…'],side:-1},
 {c:'#8b4fc9',n:'5',name:'Order',pts:[[110,1110],[250,1110],[540,840]],term:'Mind that directs',stops:['Acorns aim at oaks','Eyes are for seeing','Planets keep course','Mindless things hit targets'],side:1}];
const along=(pts,t)=>{const seg=[];let L=0;for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(l);L+=l;}let d=t*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const f=d/seg[i];return [pts[i][0]+(pts[i+1][0]-pts[i][0])*f,pts[i][1]+(pts[i+1][1]-pts[i][1])*f];}d-=seg[i];}return pts[pts.length-1];};
const metro=o=>{const hi=o.line;const lines=LINES.map((l,k)=>{const on=hi==null||hi===k;const d='M '+l.pts.map(p=>p.join(' ')).join(' L ');
  const st=on?l.stops.map((s,j)=>{const [x,y]=along(l.pts,.07+j*.21);return `<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="#1d1d1d" stroke-width="5"/>`+(hi===k?`<text x="${x+(l.lab||0)}" y="${y}" font-family="Sans" font-size="27" font-weight="700" fill="#1d1d1d" ${lb(l,x,y,j)}>${s}</text>`:'');}).join(''):'';
  const s0=l.pts[0];return `<g opacity="${on?1:.13}"><path d="${d}" fill="none" stroke="${l.c}" stroke-width="${hi===k?26:20}" stroke-linecap="round" stroke-linejoin="round"/>${st}
   <circle cx="${s0[0]}" cy="${s0[1]}" r="30" fill="${l.c}"/><text x="${s0[0]}" y="${s0[1]+11}" text-anchor="middle" font-family="Sans" font-size="32" font-weight="900" fill="#fff">${l.n}</text>
   ${hi==null?`<text x="${s0[0]+(s0[0]>540?-40:40)}" y="${s0[1]+(l.n==='5'?74:-44)}" text-anchor="${s0[0]>540?'end':'start'}" font-family="Sans" font-size="28" font-weight="900" fill="${l.c}" letter-spacing="2">LINE ${l.n} · ${l.name.toUpperCase()}</text>`:''}</g>`;}).join('');
 const term=hi==null?'GOD':LINES[hi].term;
 return `<div class="s" style="background:#f4efe4;color:#1d1d1d"><div style="position:absolute;inset:0;background:${'repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(0,0,0,.025) 0 1px,transparent 1px 40px)'}"></div>
 <div style="position:absolute;left:0;right:0;top:0;height:200px;background:#1d1d1d;color:#f4efe4;padding:44px 70px;z-index:3"><div style="font:900 24px/1 Sans;letter-spacing:.2em;color:${hi==null?'#ecd38e':LINES[hi].c}">${hi==null?'AQUINAS TRANSIT · SUMMA I, Q.2, A.3':'LINE '+LINES[hi].n+' · '+LINES[hi].name.toUpperCase()}</div><div style="font:400 44px/1.15 Garamond;margin-top:16px">${o.a}</div></div>
 <svg width="${W}" height="${H}" style="position:absolute;inset:0;z-index:2">${lines}
  <rect x="${hi==null?400:330}" y="740" width="${hi==null?280:420}" height="120" rx="60" fill="#fff" stroke="#1d1d1d" stroke-width="8"/>
  <text x="540" y="${hi==null?818:813}" text-anchor="middle" font-family="${hi==null?'Garamond':'Sans'}" font-size="${hi==null?62:36}" font-weight="${hi==null?500:900}" fill="#1d1d1d">${term}</text></svg>
 ${o.b?`<div style="position:absolute;left:70px;right:70px;bottom:110px;z-index:3;font:700 italic 34px/1.25 Sans;color:#1d1d1d;text-align:${o.bAlign||'right'}">${o.b}</div>`:''}<div class="foot" style="color:#1d1d1d">Golden Chain · Link in bio</div></div>`;};
function lb(l,x,y,j){const p=l.lp&&l.lp[j];if(p)return `transform="translate(${p[0]} ${p[1]}) rotate(${p[3]||0} ${x} ${y})" text-anchor="${p[2]||'start'}"`;return '';}
// station label offsets per line (dx,dy,anchor)
LINES[0].lp=[[6,-24,'start',-60],[6,-24,'start',-60],[6,-24,'start',-60],[6,-24,'start',-60]];
LINES[1].lp=[[0,-30,'start'],[24,10,'start'],[26,8,'start'],[26,10,'start']];
LINES[2].lp=[[0,-30,'end'],[-26,10,'end'],[-26,8,'end'],[-26,10,'end']];
LINES[3].lp=[[-6,26,'end',-60],[-6,26,'end',-60],[-6,26,'end',-60],[-6,26,'end',-60]];
LINES[4].lp=[[-30,-30,'start'],[-20,46,'start'],[24,12,'start'],[24,12,'start']];
// ---------- rx
const PAPER=`background:#fbfaf5;box-shadow:0 30px 60px rgba(0,0,0,.45),0 2px 0 #e6e1d2`;
const rx=o=>`<div class="s" style="background:#2b2a27"><div class="bg" style="background-image:url(${img(o.img)});filter:brightness(.35) blur(3px)"></div>
 <div style="position:absolute;left:110px;right:110px;top:120px;bottom:150px;${PAPER};transform:rotate(-1.6deg);padding:56px 64px;color:#1f2430;z-index:3;background-image:repeating-linear-gradient(0deg,transparent 0 63px,rgba(60,90,160,.18) 63px 65px);background-position:0 290px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1f2430;padding-bottom:22px"><div><div style="font:900 26px/1 Sans;letter-spacing:.18em">CHRISTUS MEDICUS</div><div style="font:400 italic 26px/1.3 Garamond;margin-top:8px;opacity:.8">“There is one Physician.” Ignatius of Antioch, AD 107</div></div><div style="font:500 110px/0.8 Garamond;color:#a3302a">℞</div></div>
  ${o.rows.map(([k,v])=>`<div style="display:flex;gap:24px;align-items:baseline;height:65px;margin-top:0"><span style="flex:none;width:190px;font:700 22px/1 Sans;letter-spacing:.14em;text-transform:uppercase;opacity:.65">${k}</span><span style="font:400 italic 44px/1 Garamond;color:#1f3d8a">${v}</span></div>`).join('')}
  <div style="position:absolute;right:64px;bottom:44px;text-align:right"><div style="font:400 italic 52px/1 Garamond;color:#1f3d8a;transform:rotate(-4deg)">J.C.</div><div style="border-top:2px solid #1f2430;margin-top:10px;padding-top:8px;font:700 18px/1 Sans;letter-spacing:.14em">SIGNATURE</div></div></div>${FOOT()}</div>`;
const label=o=>`<div class="s" style="background:#2b2a27"><div class="bg" style="background-image:url(${img(o.img)});filter:brightness(.35) blur(3px)"></div>
 <div style="position:absolute;left:150px;right:150px;top:${o.top||170}px;${PAPER};padding:46px 56px;color:#1b1b1b;z-index:3;border-radius:6px">
  <div style="display:flex;justify-content:space-between;align-items:center;background:${o.band||'#a3302a'};color:#fff;margin:-46px -56px 30px;padding:24px 56px;border-radius:6px 6px 0 0"><span style="font:900 26px/1 Sans;letter-spacing:.16em">${o.h}</span><span style="font:500 20px/1 Mono">${o.code||'RX 15-20'}</span></div>
  ${o.lines.map((t,i)=>`<div style="display:flex;gap:20px;margin-bottom:22px;font:400 34px/1.28 Sans"><span style="flex:none;font:900 34px/1.28 Sans;color:${o.band||'#a3302a'};width:44px">${o.num===false?'•':i+1}</span><span>${t}</span></div>`).join('')}
  ${o.small?`<div style="border-top:2px dashed #999;padding-top:18px;margin-top:10px;font:400 italic 26px/1.35 Sans;opacity:.75">${o.small}</div>`:''}</div>${FOOT()}</div>`;
// ---------- greek
const greek=o=>`<div class="s" style="background:#0e0b08"><div class="bg" style="background-image:url(${img(o.img)});opacity:.22;filter:blur(1px)"></div>
 <div style="position:absolute;left:0;right:0;top:${o.top||330}px;text-align:center;z-index:3"><div style="font:400 italic ${o.gs||118}px/1 Gk,Garamond;letter-spacing:.01em">${o.parts.map(p=>`<span style="color:${p[1]}">${p[0]}</span>`).join('')}</div>
  ${o.tr?`<div style="font:600 22px/1 Sans;letter-spacing:.22em;text-transform:uppercase;color:#d8bd72;margin-top:30px">${o.tr}</div>`:''}</div>
 ${o.cols?`<div style="position:absolute;left:70px;right:70px;top:${(o.top||330)+250}px;display:flex;gap:34px;z-index:3">${o.cols.map(([c,h,t])=>`<div style="flex:1;border-top:5px solid ${c};padding-top:22px"><div style="font:400 italic 54px/1 Gk,Garamond;color:${c}">${h}</div><div style="font:400 30px/1.32 Garamond;margin-top:16px;opacity:.95">${t}</div></div>`).join('')}</div>`:''}
 ${o.a||o.b?`<div class="${o.capTop?'hd':'cap'}" style="text-align:center">${o.a?`<div class="a">${o.a}</div>`:''}${o.b?`<div class="b">${o.b}</div>`:''}</div>`:''}${FOOT()}</div>`;
// ---------- passport
const IHS=`<g fill="none" stroke="#e8c96b" stroke-width="3">${Array.from({length:32},(_,i)=>{const a=i*Math.PI/16;const r2=i%2?150:180;return `<line x1="${Math.cos(a)*95}" y1="${Math.sin(a)*95}" x2="${Math.cos(a)*r2}" y2="${Math.sin(a)*r2}"/>`;}).join('')}<circle r="92"/></g>
 <text y="26" text-anchor="middle" font-family="Garamond" font-size="78" font-weight="500" fill="#e8c96b" letter-spacing="2">IHS</text><path d="M -4 -62 L -4 -98 M -18 -86 L 10 -86" stroke="#e8c96b" stroke-width="5"/>`;
const passCover=o=>`<div class="s" style="background:#1a1d24"><div class="bg" style="background-image:url(${img(o.img)});filter:brightness(.4) blur(2px)"></div>
 <div style="position:absolute;left:170px;right:170px;top:150px;bottom:190px;border-radius:26px;background:radial-gradient(120% 90% at 30% 20%,#23345e,#13203d 60%,#0c1529);box-shadow:0 40px 70px rgba(0,0,0,.6),inset 0 0 0 2px rgba(255,255,255,.06);z-index:3;color:#e8c96b;text-align:center;padding-top:90px">
  <div style="position:absolute;inset:0;border-radius:26px;background:${'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence baseFrequency=\'.9\' numOctaves=\'3\'/><feColorMatrix values=\'0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .08 0\'/></filter><rect width=\'200\' height=\'200\' filter=\'url(%23n)\'/></svg>")'}"></div>
  <div style="font:600 26px/1 Sans;letter-spacing:.32em">SOCIETAS IESU</div><div style="font:500 50px/1.1 Garamond;letter-spacing:.12em;margin-top:22px">PASSAPORTE</div>
  <svg width="380" height="380" viewBox="-190 -190 380 380" style="margin-top:46px">${IHS}</svg>
  <div style="font:500 36px/1.2 Garamond;letter-spacing:.1em;margin-top:40px">FRANCISCUS XAVERIUS</div><div style="font:600 20px/1 Sans;letter-spacing:.3em;margin-top:18px;opacity:.8">MISSIONARY · 1541-1552</div></div>${FOOT()}</div>`;
const GUIL=`repeating-radial-gradient(circle at 20% 30%,rgba(80,110,150,.07) 0 2px,transparent 2px 14px),repeating-radial-gradient(circle at 80% 75%,rgba(150,90,110,.06) 0 2px,transparent 2px 16px)`;
const stamp=s=>{const sh=s.shape||'rect';const base=`position:absolute;left:${s.x}px;top:${s.y}px;transform:rotate(${s.r||0}deg);color:${s.c};mix-blend-mode:multiply;opacity:.88;text-align:center;font-family:Sans;`;
 if(sh==='circle')return `<div style="${base}width:300px;height:300px;border-radius:50%;border:6px solid ${s.c};box-shadow:inset 0 0 0 10px #f6f1e3,inset 0 0 0 13px ${s.c};display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font:900 19px/1 Sans;letter-spacing:.2em">${s.top}</div><div style="font:900 ${Math.min(50,Math.floor(400/s.city.length))}px/1 Sans;margin:12px 0;letter-spacing:.02em">${s.city}</div><div style="font:500 22px/1 Mono">${s.date}</div></div>`;
 return `<div style="${base}padding:20px 30px;border:6px double ${s.c};border-radius:${sh==='round'?'40px':'6px'}"><div style="font:900 19px/1 Sans;letter-spacing:.2em">${s.top}</div><div style="font:900 54px/1 Sans;margin:12px 0;letter-spacing:.02em">${s.city}</div><div style="font:500 22px/1 Mono">${s.date}</div>${s.note?`<div style="font:700 italic 20px/1.2 Sans;margin-top:10px">${s.note}</div>`:''}</div>`;};
const passPage=o=>`<div class="s" style="background:#1a1d24"><div class="bg" style="background-image:url(${img(o.img)});filter:brightness(.35) blur(3px)"></div>
 <div style="position:absolute;left:90px;right:90px;top:110px;bottom:170px;background:#f6f1e3;background-image:${GUIL};border-radius:10px;box-shadow:0 40px 70px rgba(0,0,0,.6);z-index:3;overflow:hidden">
  <div style="position:absolute;left:0;right:0;top:0;padding:30px 44px;display:flex;justify-content:space-between;font:700 18px/1 Sans;letter-spacing:.22em;color:#6d7a8c"><span>VISTOS · VISAS</span><span>${o.pg}</span></div>
  ${o.stamps.map(stamp).join('')}
  ${o.note?`<div style="position:absolute;left:44px;right:44px;bottom:38px;font:400 italic 32px/1.3 Garamond;color:#2b2a27">${o.note}</div>`:''}</div>${FOOT()}</div>`;
const passData=o=>`<div class="s" style="background:#1a1d24"><div class="bg" style="background-image:url(${img(o.img)});filter:brightness(.35) blur(3px)"></div>
 <div style="position:absolute;left:90px;right:90px;top:150px;background:#f6f1e3;background-image:${GUIL};border-radius:10px;box-shadow:0 40px 70px rgba(0,0,0,.6);z-index:3;padding:44px 48px;color:#22252b">
  <div style="font:700 18px/1 Sans;letter-spacing:.22em;color:#6d7a8c">SOCIETAS IESU · PASSAPORTE · P&lt;XAV&lt;&lt;&lt;</div>
  <div style="display:flex;gap:40px;margin-top:34px"><div style="flex:none;width:250px;height:320px;border:2px solid #b9b2a0;background:repeating-linear-gradient(45deg,#ece6d6 0 10px,#e4ddca 10px 20px);display:flex;align-items:center;justify-content:center;text-align:center;font:400 italic 26px/1.3 Garamond;color:#6d6656;padding:20px">no photo:<br>he never sat still long enough</div>
   <div style="flex:1">${o.rows.map(([k,v])=>`<div style="margin-bottom:20px"><div style="font:700 16px/1 Sans;letter-spacing:.18em;color:#6d7a8c">${k}</div><div style="font:500 32px/1.15 Garamond;margin-top:6px">${v}</div></div>`).join('')}</div></div>
  <div style="font:500 25px/1.5 Mono;letter-spacing:.05em;margin-top:26px;color:#3a3d44;word-break:break-all">P&lt;NAVJASO&lt;Y&lt;AZPILICUETA&lt;&lt;FRANCISCO&lt;&lt;&lt;&lt;&lt;<br>1506040715410407&lt;&lt;GOA&lt;JAPAN&lt;CHINA&lt;&lt;&lt;&lt;1552</div></div>${FOOT()}</div>`;
const L={lens,medalF,medalB,wreath,metro,rx,label,greek,passCover,passPage,passData};

const posts=[
{id:'56-look-closer-nativity',slides:[
 {t:'cover',img:'pc-arch',k:'Look closer',lines:['There’s a whole','Bible hidden in','this arch.']},
 {t:'lens',img:'pc-full',asp:15877/21403,pt:[0.057,0.41],r:70,zoom:'pc-lens-adam',zc:[620,520],zr:300,n:1,a:'On the left pillar, carved in stone:',b:'Adam.'},
 {t:'lens',img:'pc-full',asp:15877/21403,pt:[0.947,0.41],r:70,zoom:'pc-lens-eve',zc:[440,520],zr:300,n:2,a:'On the right, holding the fruit:',b:'Eve.'},
 {t:'lens',img:'pc-full',asp:15877/21403,pt:[0.088,0.235],r:62,zoom:'pc-lens-expel',zc:[600,600],zr:300,n:3,a:'Up in the arch, scenes from Genesis. Here: driven out of Eden.',b:'Paradise lost.'},
 {t:'lens',img:'pc-full',asp:15877/21403,pt:[0.896,0.23],r:62,zoom:'pc-lens-cain',zc:[460,600],zr:300,n:4,a:'And opposite: Cain raising his hand against Abel.',b:'The first murder.'},
 {t:'lens',img:'pc-full',asp:15877/21403,pt:[0.54,0.855],r:66,zoom:'pc-lens-baby',zc:[560,690],zr:300,n:5,capTop:1,a:'Everything in the frame is grey stone: the story of sin.',b:'Then, in full colour, on the bare ground: the answer.'},
 {t:'end',img:'pc-arch',h:'He is born <em>inside</em> our story.',p:'Petrus Christus painted the Fall around the manger. Read the whole Bible with the Fathers in Golden Chain.'}]},
{id:'57-miraculous-medal',slides:[
 {t:'cover',img:'vl-cover',k:'27 November',lines:['She designed this','medal herself.']},
 {t:'quote',img:'vl-mary',h:'Paris, 27 November 1830',p:'A young sister, Catherine Labouré, saw Mary standing on a globe, rays of light streaming from her hands. Some of the jewels on her fingers gave no light.',b:'“Those are the graces people forget to ask for.”'},
 {t:'medalF',img:'vl-mary',a:'Then an oval formed around her, with words in gold.',b:'She was told: have a medal struck like this.'},
 {t:'medalB',items:['An <b>M</b> beneath the cross: Mary at the foot of Calvary.','Two hearts: Jesus’ crowned with thorns, Mary’s pierced by a sword.','Twelve stars: the woman of Revelation 12.']},
 {t:'detail',img:'vl-cover',pos:'bl',a:'It was struck in 1832 as the medal of the Immaculate Conception.',b:'So many people were healed and converted that Paris renamed it: the Miraculous Medal.'},
 {t:'end',img:'vl-cover',h:'Wear it. <em>Pray</em> the words.',p:'O Mary, conceived without sin, pray for us who have recourse to thee.'}]},
{id:'58-four-flames',slides:[
 {t:'cover',img:'lt-flame',k:'First Sunday of Advent',lines:['Light one','candle.']},
 {t:'wreath',img:'lt-full',lit:1,k:'Week 1',a:'Watch.',c:'“Be watchful! Be alert! You do not know when the time will come.”<br>Mark 13:33',b:'This week: wake up to Him. Ten quiet minutes a day.'},
 {t:'wreath',img:'lt-full',lit:2,k:'Week 2',a:'Prepare.',c:'“Prepare the way of the Lord, make straight his paths.”<br>Mark 1:3',b:'Clear one crooked path: go to Confession.'},
 {t:'wreath',img:'lt-full',lit:3,k:'Week 3 · Gaudete',a:'Rejoice.',c:'“He came for testimony, to testify to the light.”<br>John 1:7',b:'The rose candle: halfway there. Let it show.'},
 {t:'wreath',img:'lt-full',lit:4,k:'Week 4',a:'Say yes.',c:'“May it be done to me according to your word.”<br>Luke 1:38',b:'Mary’s yes made room for God. Make yours.'},
 {t:'end',img:'lt-flame',h:'Light grows <em>slowly.</em> So do saints.',p:'Save this and come back each Sunday. The Gospels are with the Fathers in Golden Chain.'}]},
{id:'59-five-ways-metro',slides:[
 {t:'cover',img:'rem-phil',k:'Aquinas, made simple',lines:['Five roads.','One destination.']},
 {t:'metro',a:'Five ways to reach God by reason alone. Every line ends at the same station.'},
 {t:'metro',line:0,a:'Things change. Every change is caused by something already actual.',b:'A chain like this can’t run back forever.',bAlign:'right'},
 {t:'metro',line:1,a:'Causes depend on causes, all at once, right now.',b:'Something must cause without being caused.'},
 {t:'metro',line:2,a:'Everything around us could have not existed.',b:'So something must exist that cannot not exist.',bAlign:'left'},
 {t:'metro',line:3,a:'We rank things as more or less good, true, noble.',b:'“More” points to a “most”.'},
 {t:'metro',line:4,a:'Mindless things act for ends, like arrows to a target.',b:'Every arrow needs an archer.',bAlign:'right'},
 {t:'end',img:'rem-phil',h:'“And this everyone understands to be <em>God.</em>”',p:'Summa Theologiae I, q.2, a.3. Read Aquinas on Scripture in Golden Chain.'}]},
{id:'60-advent-prescription',slides:[
 {t:'cover',img:'mu-cover',k:'Advent, week one',lines:['Your doctor','wrote you','something.']},
 {t:'rx',img:'mu-cover',rows:[['Patient','You'],['Diagnosis','Sin. Common. Curable.'],['Rx','One good Confession'],['Take','Before 24 December'],['Repeats','Unlimited'],['Cost','Already paid']]},
 {t:'label',img:'mu-cover',h:'DIRECTIONS',lines:['Examine your conscience (10 min). An app or a booklet helps.','Be sorry, and decide to change.','Confess, including every mortal sin by kind and number.','Do the penance.','Pray an act of contrition. Leave lighter.'],small:'Catechism 1450-1460. Parish times are usually on the bulletin or website.'},
 {t:'label',img:'mu-cover',top:230,band:'#1f3d8a',code:'LEAFLET',h:'POSSIBLE SIDE EFFECTS',num:false,lines:['Peace (very common)','Tears, usually the good kind','A sudden urge to forgive someone','Rarely: running home to your Father'],small:'If symptoms persist, return as needed. The Physician does not run out.'},
 {t:'detail',img:'mu-embrace',pos:'tl',a:'“While he was still a long way off, his father saw him and was filled with compassion.”',b:'He ran. Luke 15:20'},
 {t:'detail',img:'mu-dog',pos:'tl',sm:1,a:'Even the dog is happy.',b:'Nobody is left out of this homecoming.'},
 {t:'end',img:'mu-cover',h:'Book the <em>appointment.</em>',p:'Send this to someone who has been “meaning to go” for a while.'}]},
{id:'61-full-of-grace',slides:[
 {t:'cover',img:'jf-ann',k:'One word',lines:['The angel didn’t','use her name.']},
 {t:'greek',img:'jf-ann',top:420,parts:[['Χαῖρε, ','#fff'],['κεχαριτωμένη','#ecd38e']],gs:96,tr:'Luke 1:28',capTop:1,a:'Gabriel greets Mary with a title instead:',b:''},
 {t:'greek',img:'jf-ann',top:240,gs:130,parts:[['κε','#e36a5b'],['χαριτ','#ecd38e'],['ωμένη','#7fb3e8']],cols:[['#e36a5b','κε-','The doubled start marks the perfect tense: something completed, whose effect remains.'],['#ecd38e','χαριτ-','From χάρις, grace: God’s free gift of His own life.'],['#7fb3e8','-ωμένη','Passive and feminine: it was done to her, by God.']]},
 {t:'detail',img:'jf-dove',pos:'bl',a:'So the word means something like:',b:'“you who have been, and remain, filled with grace.”'},
 {t:'detail',img:'jf-mary',pos:'tl',sm:1,a:'The Church hears in it what she celebrates on 8 December:',b:'grace in Mary from the very first moment of her life.'},
 {t:'end',img:'jf-ann',h:'Hail Mary, <em>full of grace.</em>',p:'Pray it slower today. Read Luke 1 with the Fathers in Golden Chain.'}]},
{id:'62-xavier-passport',slides:[
 {t:'cover',img:'vdv-cover',k:'Saint Francis Xavier · 3 December',lines:['The most stamped','passport in','Church history.']},
 {t:'passCover',img:'vdv-cover'},
 {t:'passData',img:'vdv-cover',rows:[['Name','Francisco de Jaso y Azpilicueta'],['Born','7 April 1506, Javier, Navarre'],['Occupation','Priest, co-founder of the Jesuits'],['Purpose of travel','To tell Asia about Jesus']]},
 {t:'passPage',img:'vdv-cover',pg:'PAGE 4',stamps:[{x:60,y:110,r:-8,c:'#a3302a',top:'DEPARTED',city:'LISBOA',date:'07 APR 1541'},{x:520,y:300,r:7,c:'#1f6b4a',shape:'circle',top:'WINTERED',city:'MOÇAMBIQUE',date:'1541-42'},{x:90,y:560,r:-3,c:'#3b3f9c',shape:'round',top:'ARRIVED',city:'GOA',date:'06 MAY 1542',note:'India'}],note:'He left on his 35th birthday and spent a year at sea.'},
 {t:'passPage',img:'vdv-cover',pg:'PAGE 5',stamps:[{x:70,y:120,r:6,c:'#7a2f86',shape:'circle',top:'ARRIVED',city:'MALACCA',date:'1545'},{x:450,y:340,r:-9,c:'#a3302a',top:'MOLUCCAS',city:'AMBON',date:'1546'},{x:120,y:600,r:4,c:'#1f3d8a',shape:'round',top:'LANDED',city:'KAGOSHIMA',date:'15 AUG 1549',note:'Japan'}],note:'Baptising, teaching children, learning languages as he went.'},
 {t:'passPage',img:'vdv-cover',pg:'PAGE 6',stamps:[{x:80,y:130,r:-5,c:'#6b5a2b',shape:'circle',top:'ISLAND',city:'SHANGCHUAN',date:'1552'},{x:330,y:470,r:-14,c:'#a3302a',top:'ENTRY',city:'CHINA',date:'PENDING',note:'Died in sight of the coast, 3 Dec 1552'}],note:'He died waiting for a boat, aged 46. Patron of the missions.'},
 {t:'end',img:'vdv-cover',h:'Your Goa might be <em>next door.</em>',p:'Send this to the friend you’d cross an ocean for.'}]},
];
module.exports={posts};
if(require.main===module)render(posts,process.argv[2]||'/tmp/gal2',process.argv.slice(3),{L,css:CSS});
