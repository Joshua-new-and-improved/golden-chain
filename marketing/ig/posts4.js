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


const PAPER='background:#ece3d0;background-image:radial-gradient(120% 90% at 30% 10%,#f6efdf 0%,#ebe1cc 60%,#dfd2b8 100%)';
const BR=(h,col)=>`<div class="z" style="display:flex;align-items:center;gap:14px;font:600 22px/1 Inter;letter-spacing:.08em;color:${col}"><style>.brm svg{width:44px;height:44px;display:block}</style><span class="brm">${h.MARK}</span>${h.HANDLE}</div>`;
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
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
