const {render}=require('./render.js');
const posts=[];const P=(id,slides)=>posts.push({id,slides});
const DOTS=`<div style="position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.34) 1.3px,transparent 1.7px);background-size:9px 9px;mix-blend-mode:multiply;opacity:.55"></div>`;
const SUB=(txt,zoom,org)=>(i,n,h)=>`<div class="s" style="background:#0b0907;padding:0">
 <div class="art" style="background-image:url(${h.artURL('h-ns-murillo')});background-position:center;transform:scale(${zoom});transform-origin:${org};filter:saturate(1.08) contrast(1.04)"></div>${DOTS}
 <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 62%,rgba(0,0,0,.55) 100%)"></div>
 <div style="position:absolute;left:0;right:0;bottom:118px;text-align:center;font:700 italic 56px/1.15 'Times New Roman',Tinos,'Liberation Serif',serif;color:#f6d94f;text-shadow:0 2px 3px rgba(0,0,0,.85),0 0 22px rgba(0,0,0,.6)">${txt}</div></div>`;
P('51-restless-heart',[SUB('You have made us for yourself,',1,'42% 22%'),SUB('and our heart is restless',1.07,'42% 22%'),SUB('until it rests in you.',1.15,'42% 22%')]);
const STAR=(x,y,s)=>`<svg style="position:absolute;left:${x}px;top:${y}px" width="${s}" height="${s*1.35}" viewBox="0 0 100 135"><path d="M50 2 C54 48 60 60 98 67.5 C60 75 54 87 50 133 C46 87 40 75 2 67.5 C40 60 46 48 50 2Z" fill="none" stroke="rgba(255,255,255,.82)" stroke-width="1.6"/></svg>`;
P('52-set-fire',[(i,n,h)=>`<div class="s grain" style="background:#0c0b0a;color:#fff;padding:0">
 <div style="position:absolute;inset:0;background:repeating-linear-gradient(118deg,rgba(255,255,255,.022) 0 2px,transparent 2px 140px),repeating-linear-gradient(28deg,rgba(255,255,255,.018) 0 2px,transparent 2px 190px),radial-gradient(80% 60% at 30% 20%,#191715 0%,#0c0b0a 70%)"></div>
 <div style="position:absolute;right:-90px;bottom:-235px;width:980px;height:1225px;background:url(${h.artURL('h-ns-latour')}) center/cover;filter:brightness(1.35) contrast(1.05);-webkit-mask-image:radial-gradient(62% 56% at 52% 46%,#000 38%,transparent 78%);mask-image:radial-gradient(62% 56% at 52% 46%,#000 38%,transparent 78%)"></div>
 ${STAR(96,96,120)}${STAR(176,262,84)}
 <div style="position:absolute;left:96px;top:400px;width:600px"><p style="font:600 58px/1.08 Inter;letter-spacing:-.01em;text-align:justify;text-align-last:left">If you are what you ought to be, you will set fire to all Italy.</p>
 <p style="font:600 italic 30px/1 Inter;margin-top:30px">Saint Catherine of Siena</p></div>
 <div style="position:absolute;left:96px;bottom:70px;font:600 22px/1 Inter;letter-spacing:.06em;opacity:.7">@golden_chain_cath</div></div>`]);
const TORN='polygon(0 3%,6% 1.2%,13% 3.4%,21% .8%,29% 2.6%,38% .4%,47% 2.2%,55% .9%,63% 3.1%,72% 1%,81% 2.8%,90% .6%,100% 2.4%,100% 100%,0 100%)';
P('53-examined-in-love',[(i,n,h)=>`<div class="s grain" style="background:#eeecd3;padding:0">
 <div style="position:absolute;left:0;right:0;bottom:0;height:690px;background:url(${h.artURL('h-ns-remb')}) center 45%/cover;filter:grayscale(1) contrast(1.55) brightness(.98);mix-blend-mode:multiply;clip-path:${TORN}"></div>
 <div style="position:absolute;left:40px;right:40px;top:44px;font:800 141px/1.02 Inter;letter-spacing:-.055em;color:#c3262d;text-align:justify;text-align-last:justify">at the evening<br>of life you will<br>be examined<br>in love</div>
 <div style="position:absolute;left:44px;bottom:44px;font:800 26px/1 Inter;letter-spacing:-.01em;color:#c3262d;background:#eeecd3;padding:10px 14px">st john of the cross · @golden_chain_cath</div></div>`]);
P('54-be-not-afraid',[(i,n,h)=>`<div class="s grain" style="background:#dcd9d3;padding:0;color:#a02f3c">
 <div class="art" style="background-image:url(${h.artURL('h-ns-george')});background-position:center;filter:grayscale(1) contrast(1.15) brightness(1.12);opacity:.62;mix-blend-mode:multiply"></div>
 <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(220,217,211,.75) 0%,rgba(220,217,211,.1) 60%)"></div>
 <div style="position:absolute;top:62px;left:0;right:0;text-align:center;font:700 23px/1 Inter;letter-spacing:.22em;text-transform:uppercase">St John Paul II · 22 October 1978</div>
 <div style="position:absolute;left:0;right:0;top:300px;text-align:center;font:700 258px/.86 Fraktur,serif;mix-blend-mode:multiply">Be not<br>afraid</div>
 <div style="position:absolute;left:0;right:0;top:880px;text-align:center;font:700 30px/1.5 Inter;letter-spacing:.2em;text-transform:uppercase;mix-blend-mode:multiply">✠ &nbsp;Open wide the doors&nbsp; ✠<br>for Christ</div>
 <div style="position:absolute;left:0;right:0;bottom:56px;text-align:center;font:600 21px/1 Inter;letter-spacing:.1em;opacity:.85">@golden_chain_cath</div></div>`]);
const PURE=a=>(i,n,h)=>`<div class="s" style="padding:0;background:#000"><div class="art" style="background-image:url(${h.artURL(a)});background-position:center"></div></div>`;
P('55-advent',[(i,n,h)=>`<div class="s" style="padding:0;background:#000"><div class="art" style="background-image:url(${h.artURL('h-ns-eyck')});background-position:center"></div>
 <div style="position:absolute;inset:0;background:radial-gradient(46% 20% at 50% 15%,rgba(10,8,6,.62) 0%,rgba(10,8,6,0) 100%)"></div>
 <div style="position:absolute;left:0;right:0;top:92px;text-align:center;color:#f4e9cf"><div style="font:600 23px/1 Inter;letter-spacing:.42em;text-transform:uppercase;opacity:.92">The season of</div>
 <div style="font:500 italic 150px/1 Cormorant,serif;margin-top:8px;background:linear-gradient(90deg,#f7ecd2,#e6c97a 55%,#f1d9a0);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 3px 14px rgba(0,0,0,.55))">Advent</div></div></div>`,
 PURE('h-ns-eyck-angel'),PURE('h-ns-eyck-mary'),PURE('h-ns-eyck-lily')]);
render(posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
