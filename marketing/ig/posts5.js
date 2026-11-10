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

// 39 · Thu 10 Dec · Look closer: van Eyck's Annunciation
P('39-look-closer-annunciation',[
 HOOK('h-eyck-cover','center','Advent in one painting','Look closer.','Five secrets hidden in van Eyck’s Annunciation.','<b>Jan van Eyck</b>The Annunciation, c. 1434/36',170),
 DETAIL('h-eyck-words','01','05','Her answer is upside down.','Gabriel’s greeting reads normally: AVE GRATIA PLENA. Mary’s reply, ECCE ANCILLA DOMINI, is painted upside down and backwards. It is written for God to read from above.'),
 DETAIL('h-eyck-dove','02','05','Seven rays of light.','The Holy Spirit descends as a dove on seven golden rays: the seven gifts of the Spirit (Isaiah 11:2–3). Light passes through glass without breaking it, a medieval image of the virgin birth.'),
 DETAIL('h-eyck-window','03','05','One window above. Three below.','High on the wall, a single stained-glass window shows the Lord of the Old Testament, with Moses painted beside it. Behind Mary there are three windows: the Trinity, now revealed.'),
 DETAIL('h-eyck-floor','04','05','The floor tells the future.','The tiles show David beheading Goliath and Samson pulling down the temple: Old Testament victories that point forward to Christ’s victory over death.','center 70%'),
 DETAIL('h-eyck-lily','05','05','Lilies and an open book.','White lilies for her purity. An open book because medieval tradition pictured her reading the prophets when the angel came: “A virgin shall conceive” (Isaiah 7:14).'),
 (i,n,h)=>`${X}<div class="s ink grain" style="padding:80px 84px 76px"><div class="row z" style="gap:56px;align-items:center;flex:1"><img src="${h.artURL('h-eyck-full')}" style="height:1020px;border-radius:4px;box-shadow:0 30px 70px rgba(0,0,0,.55)"><div><div class="lbl">The whole panel</div><h2 style="font-size:70px">Every detail is doing theology.</h2><p class="body sm" style="margin-top:24px">Luke 1:26–38. Read it with the Fathers in Golden Chain → Bible.</p><div class="mlabel" style="margin-top:34px;color:#e6c97a"><b>Jan van Eyck</b>The Annunciation, c. 1434/36<br>National Gallery of Art, Washington</div><p class="body sm" style="margin-top:34px;font-weight:700">Save this for the last week of Advent.</p></div></div>${h.foot(i,n)}</div>`,
]);

// 40 · Fri 11 Dec · St Lucy on the gallery wall
P('40-st-lucy-eyes',[
 (i,n,h)=>`${X}<div class="s grain" style="background:radial-gradient(90% 60% at 42% 42%,#4a5a52 0%,#2c3833 55%,#1c2421 100%);color:#f3ecdf;padding:84px 84px 76px">
  <h1 class="z" style="font-size:92px;line-height:.98;max-width:912px">Why is she holding <em>eyes</em> on a plate?</h1>
  <div class="z" style="display:flex;gap:36px;align-items:flex-end;margin-top:40px;flex:1"><div style="padding:16px;background:linear-gradient(135deg,#d9b866,#8a6a2a 45%,#e6c97a 60%,#7a5c22);box-shadow:0 40px 60px rgba(0,0,0,.55),0 0 0 2px #5c4518 inset"><img src="${h.artURL('h-lucy-full')}" style="display:block;height:850px;box-shadow:0 0 0 3px #3a2c10"></div>
  <div style="padding-bottom:10px"><div style="background:#f3ecdf;color:#1b1a17;padding:20px 22px;font:500 20px/1.4 Inter;width:250px;box-shadow:0 10px 20px rgba(0,0,0,.35)"><b style="display:block;font-weight:700">Francisco de Zurbarán</b>Spanish, 1598–1664<br><i>Saint Lucy</i>, c. 1625/1630<br>oil on canvas</div></div></div>
  <div class="foot z"><span class="brand">${h.MARK}<span>${h.HANDLE}</span></span><span class="swipe">Swipe →</span></div></div>`,
 DETAIL('h-lucy-eyes','01','02','Look at the dish.','A late legend says her eyes were torn out and restored. Painters used it as her badge: she is the patron of the blind, and of everyone who needs light.','center 40%'),
 V('What history tells us',`<p class="z body" style="font-size:38px">Lucy was martyred at Syracuse in Sicily in <b>304</b>, in the last great Roman persecution.</p><p class="z body" style="margin-top:26px;font-size:38px">An early inscription in the catacombs there already honours her feast, and she is one of seven women martyrs named in the Roman Canon of the Mass.</p>`),
 DETAIL('h-lucy-face','02','02','Lucia. From lux: light.','Her feast, 13 December, once fell on the longest night of the northern year. In Sweden, girls still wear crowns of candles and sing in the dark for her.','center 20%'),
 GOLD('13 December','A light shines in the darkness.','Read her whole story, and zoom into this painting, in Golden Chain → Saints.'),
]);

// 41 · Sun 13 Dec · Gaudete
P('41-gaudete',[
 (i,n,h)=>`${X}<div class="s grain" style="background:linear-gradient(170deg,#e3b3b8 0%,#cf8d98 60%,#b96d7c 100%);color:#3a141c;padding:0;align-items:center">
  <div style="position:absolute;left:190px;right:190px;top:300px;bottom:0;border-radius:350px 350px 0 0;background:url(${h.artURL('h-david-mary')}) center 20%/cover;box-shadow:0 0 0 14px rgba(255,240,236,.35)"></div>
  <div class="z" style="margin-top:84px;font:700 22px/1 Inter;letter-spacing:.3em;text-transform:uppercase">Gaudete Sunday · Third Sunday of Advent</div>
  <h1 class="z" style="font-size:236px;line-height:.9;margin-top:22px;color:#fff5f0;letter-spacing:-.02em;text-shadow:0 6px 40px rgba(90,20,35,.35)">Rejoice.</h1>
  <div style="position:absolute;left:0;right:0;bottom:0;height:300px;background:linear-gradient(180deg,rgba(150,70,88,0),rgba(120,50,68,.92));z-index:1"></div>
  <div style="position:absolute;left:84px;right:84px;bottom:76px;z-index:2;display:flex;justify-content:space-between;align-items:center;color:#fff5f0">${BR(h,'#fff5f0')}<span class="swipe">Swipe →</span></div></div>`,
 (i,n,h)=>`${X}<div class="s grain" style="background:linear-gradient(170deg,#f1dadb 0%,#e6bfc4 100%);color:#3a141c"><div class="z lbl" style="color:#8f2f45">Why the pink candle?</div><div class="spacer"></div><p class="z body" style="font-size:40px"><i>Gaudete</i> is Latin for “rejoice”, the first word of today’s entrance antiphon at Mass.</p><p class="z body" style="font-size:40px;margin-top:28px">Advent is more than half over. The Church can no longer hide her joy.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`${X}<div class="s grain" style="background:#8f3f55;color:#fff1ee"><div class="z lbl" style="color:#f3c9cf">Rose, not pink</div><div class="spacer"></div><h2 class="z" style="font-size:84px">Purple, lightened by joy.</h2><p class="z body" style="font-size:38px;margin-top:30px">Rose vestments are worn on only two days a year: Gaudete Sunday in Advent and Laetare Sunday in Lent. Both are a breath of joy in the middle of a season of waiting.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`${X}<div class="s grain" style="background:linear-gradient(170deg,#e3b3b8 0%,#cf8d98 100%);color:#3a141c"><div class="spacer"></div><p class="z q l" style="font-size:78px">“Rejoice in the Lord always; again I will say, Rejoice. The Lord is at hand.”</p><p class="z cite" style="margin-top:30px;color:#7a2238">Philippians 4:4–5</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 42 · Mon 14 Dec · St John of the Cross
P('42-john-of-the-cross',[
 HOOK('h-toledo-all','center','St John of the Cross · 14 Dec','He wrote it in a prison cell.','One of the greatest poems in Spanish, composed in the dark.','<b>El Greco</b>View of Toledo, c. 1599–1600',118),
 DETAIL('h-toledo-city','','','Toledo, December 1577.','Friars who opposed the Carmelite reform seized John and locked him in a tiny cell in their monastery here, lit by a single slit high in the wall. He was held for about nine months.'),
 I('In the dark',`<p class="z body" style="font-size:40px">With no paper at first, he composed in his head the opening stanzas of the <b>Spiritual Canticle</b>: a love poem between the soul and God.</p><p class="z q l" style="margin-top:36px">The cell became a chapel.</p>`),
 V('The escape',`<p class="z body" style="font-size:40px">One night in August 1578 he worked the lock loose, knotted strips of blanket into a rope, and climbed down the monastery wall above the river.</p><p class="z body" style="font-size:40px;margin-top:26px">He carried the poems out with him.</p>`),
 I('What “the dark night” means',`<p class="z body" style="font-size:38px">Not simply sadness. It is when God removes the good feelings from prayer so that the soul learns to love <b>him</b>, and not only his gifts.</p><p class="z body" style="font-size:38px;margin-top:24px">Dryness in prayer can be progress.</p><p class="z body sm" style="margin-top:24px;opacity:.75">It is not a name for depression. That deserves real care and real help.</p>`),
 DETAIL('h-toledo-sky','','','“In the evening of life, we will be judged on love alone.”','St John of the Cross, quoted in the Catechism, §1022. Doctor of the Church. Feast: 14 December.'),
]);

// 43 · Tue 15 Dec · five Christmas "facts"
const MYTH=(art,pos,no,claim,body,ref)=>(i,n,h)=>`${X}<div class="s vellum grain" style="padding:0"><div style="height:560px;background:url(${h.artURL(art)}) ${pos}/cover;position:relative"><div style="position:absolute;left:70px;top:60px"><span class="chip"><b>${no}</b> of 5</span></div></div>
 <div class="z" style="padding:50px 84px 76px;display:flex;flex-direction:column;flex:1"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px"><h2 style="font-size:70px;line-height:1.02;max-width:640px">“${claim}”</h2><span class="stamp" style="margin-top:14px;flex:none">Not in the text</span></div><p class="body" style="margin-top:26px;font-size:33px">${body}</p><p class="cite" style="margin-top:18px">${ref}</p>${h.foot(i,n)}</div></div>`;
P('43-not-in-the-bible',[
 HOOK('h-tondo-magi','center','Christmas edition','5 Christmas “facts” that aren’t in the Bible','How many did you know?','<b>Fra Angelico and Fra Filippo Lippi</b>The Adoration of the Magi, c. 1440/60',104),
 MYTH('h-tondo-crowd','center 40%','1','There were three kings.','Matthew says “wise men from the East”. He gives no number, and never calls them kings. “Three” comes from the three gifts.','Matthew 2:1–11'),
 MYTH('h-bott-crowd','center 30%','2','The innkeeper turned them away.','There is no innkeeper in the Gospel. Luke says only that “there was no place for them in the inn”, and the Greek word can also mean a guest room.','Luke 2:7'),
 MYTH('h-duccio-ox','center 35%','3','An ox and a donkey stood by the manger.','Neither Gospel mentions them. Christians painted them in early, from Isaiah: “The ox knows its owner, and the ass its master’s crib.”','Isaiah 1:3'),
 MYTH('h-bott-l','center 45%','4','The Magi arrived that same night.','Matthew has them enter “the house”, and Herod targets boys up to two years old. They probably came later. That is why Epiphany is its own feast.','Matthew 2:11, 16'),
 MYTH('h-duccio-centre','center 30%','5','Jesus was born on 25 December.','Scripture gives no date. The feast on 25 December is recorded in Rome by AD 336. The Church celebrates the event, not a birth certificate.','Chronograph of 354'),
 GOLD('The takeaway','Tradition isn’t the enemy.','Much of this is ancient and beautiful. Just know which part is Scripture and which part is the crib set.'),
]);

// 44 · Thu 17 Dec · O Antiphons
const OA=[['17','Sapientia','Wisdom'],['18','Adonai','Lord'],['19','Radix Jesse','Root of Jesse'],['20','Clavis David','Key of David'],['21','Oriens','Rising Dawn'],['22','Rex Gentium','King of the Nations'],['23','Emmanuel','God with us']];
P('44-o-antiphons',[
 HOOK('h-duccio-isaiah','center 20%','Starts tonight · 17 Dec','Advent has a hidden message.','It takes seven evenings to spell.','<b>Duccio di Buoninsegna</b>The Prophet Isaiah, 1308–11',124),
 V('The O Antiphons',`<p class="z body" style="font-size:40px">On the last seven evenings before Christmas Eve, the Church sings seven ancient antiphons at Evening Prayer.</p><p class="z body" style="font-size:40px;margin-top:26px">Each one calls Christ by a title taken from the prophets. They are at least 1,200 years old.</p>`),
 (i,n,h)=>`${X}<div class="s ink grain"><div class="z lbl">Seven evenings, seven names</div><div class="spacer"></div><div class="z">${OA.map(([d,t,e])=>`<div style="display:flex;align-items:baseline;gap:24px;padding:15px 0;border-bottom:1px solid rgba(239,232,218,.16)"><span style="font:600 22px/1 Inter;letter-spacing:.1em;opacity:.55;width:56px">${d}</span><span style="font:400 62px/1 'Instrument Serif',serif;flex:1">O <span style="color:#e6c97a">${t[0]}</span>${t.slice(1)}</span><span style="font:500 italic 30px/1 Cormorant,serif;opacity:.75">${e}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`${X}<div class="s vellum grain"><div class="z lbl">Now read the gold letters backwards</div><div class="spacer"></div><div class="z" style="display:flex;justify-content:space-between">${'EROCRAS'.split('').map((c,k)=>`<div style="text-align:center;${k===3?'margin-left:34px':''}"><div style="font:400 150px/1 'Instrument Serif',serif;color:#a3302a">${c}</div><div style="font:600 17px/1.3 Inter;letter-spacing:.06em;opacity:.55;margin-top:10px">${OA[6-k][0]} Dec</div></div>`).join('')}</div><p class="z body" style="font-size:38px;margin-top:54px"><b>E</b>mmanuel, <b>R</b>ex, <b>O</b>riens, <b>C</b>lavis, <b>R</b>adix, <b>A</b>donai, <b>S</b>apientia.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 GOLD('Ero cras','“Tomorrow, I will be there.”','That is what the Latin means. The message is complete on 23 December. The next evening is Christmas Eve.'),
 V('Two honest notes',`<p class="z body" style="font-size:38px">Whether the monks planned the acrostic is debated. It may be a happy accident.</p><p class="z body" style="font-size:38px;margin-top:26px">What is certain: you already know these antiphons. <span class="mark">“O come, O come, Emmanuel”</span> is the seven of them set to verse.</p>`),
]);

// 45 · Sat 19 Dec · Chesterton
P('45-hands-that-made-the-stars',[(i,n,h)=>`${X}<div class="s vellum grain" style="padding:0"><div style="height:800px;background:url(${h.artURL('h-savoldo-child')}) center 88%/cover"></div>
 <div class="z" style="padding:52px 84px 70px;display:flex;flex-direction:column;flex:1"><p style="font:500 italic 55px/1.2 Cormorant,serif">“The hands that had made the sun and stars were too small to reach the huge heads of the cattle.”</p><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto"><div><div style="font:700 22px/1 Inter;letter-spacing:.2em;text-transform:uppercase;color:#a3302a">G. K. Chesterton</div><div style="font:500 21px/1.5 Inter;opacity:.65;margin-top:8px">The Everlasting Man (1925)</div></div>${BR(h,'#3a332a')}</div></div></div>`]);

// 46 · Mon 21 Dec · five reasons God became man
const WHY=(no,word,gloss,quote,dark)=>(i,n,h)=>`${X}<div class="s ${dark?'ink':'vellum'} grain" style="padding-right:372px"><div style="position:absolute;right:0;top:0;bottom:0;width:300px;background:url(${h.artURL('h-tondo-strip')}) ${-(no-1)*300}px 0/1500px 1350px;z-index:1"></div><div class="z lbl">Reason ${no} of 5</div><div class="spacer"></div><div class="z" style="font:400 300px/.8 'Instrument Serif',serif;color:${dark?'#e6c97a':'#a3302a'}">${no}</div><h2 class="z" style="font-size:88px;margin-top:26px">${word}</h2><p class="z body" style="margin-top:22px">${gloss}</p>${quote?`<p class="z q sm" style="margin-top:26px;font-size:40px">${quote}</p>`:''}<div class="spacer"></div><div class="foot z"><span class="brand">${h.MARK}<span>${h.HANDLE}</span></span><span class="pg">${['','I','II','III','IV','V','VI','VII'][i]} / VII</span></div></div>`;
P('46-why-god-became-man',[
 HOOK('h-tondo-mary','center 30%','Aquinas · four days to Christmas','5 reasons God became man','He could have saved us another way. Why this one?','<b>Fra Angelico and Fra Filippo Lippi</b>The Adoration of the Magi (detail)',128),
 WHY(1,'Faith','We can be certain, because God himself has come and spoken.','',0),
 WHY(2,'Hope','“Nothing was so necessary for raising our hope as to show us how deeply God loved us.”','',1),
 WHY(3,'Love','What kindles love more than discovering you were loved first, at this cost?','',0),
 WHY(4,'Example','We needed someone to follow whom we could actually see. So God became visible.','',1),
 WHY(5,'A share in God’s life','“God was made man, that man might be made God.”','',0),
 GOLD('Summa Theologiae III, q.1, a.2','Not the only way. The most fitting way.','Aquinas says God could have restored us otherwise. He chose the way that would win our hearts. The quotations are St Augustine’s.'),
]);

// 47 · Wed 23 Dec · field guide
const SPEC=(no,name,lat,marks,note)=>(i,n,h)=>`${X}<div class="s vellum grain"><div class="spacer"></div><div class="z spec"><div class="no">Specimen No. ${no}</div><h2>${name}</h2><div class="lat">${lat}</div><dl><dt>Field marks</dt><dd>${marks}</dd><dt>Handling</dt><dd>${note}</dd></dl></div><div class="spacer"></div>${h.foot(i,n)}</div>`;
P('47-field-guide-christmas-mass',[
 HOOK('h-bott-crowd','center 30%','A naturalist’s notes','A field guide to Christmas Mass','Five species you will meet on Thursday night.','<b>Sandro Botticelli</b>The Adoration of the Magi (detail), c. 1478/82',112),
 SPEC(1,'The Twice-a-Year Visitor','Catholicus biannualis','Stands and kneels half a second after everyone else. Knows every carol by heart.','Protected species. Approach with warmth. Offer a hymn book and no commentary.'),
 SPEC(2,'The Late Arrival','Familia tardissima','Enters during the Gloria with four children and seven shoes.','They made it. That is a minor miracle. Treat it as one.'),
 SPEC(3,'The Toddler Theologian','Parvulus vocalis','Asks “IS THAT JESUS?” at full volume during the consecration.','Correct, as it happens. Do not shush sound doctrine.'),
 SPEC(4,'The Soprano','Soprana altissima','Has waited eleven months for the descant in “O Come, All Ye Faithful”.','Cannot be stopped. Do not try. Stand well back.'),
 SPEC(5,'The Regular','Parochianus territorialis','Arrives to find a stranger sitting in “their” pew.','A test of sanctity begins. Smile and move. This is your Advent penance.'),
 GOLD('And if you are Specimen No. 1','Come. You are wanted there.','Then come back on Sunday. We will keep you a seat. (Arrive early.)'),
]);

// 48 · Thu 24 Dec · Christmas Eve panorama (two slides, one painting)
const PAN=(art,line,sub,last)=>(i,n,h)=>`${X}<div class="s ink" style="padding:0"><div class="bleed" style="background-image:url(${h.artURL(art)})"></div><div style="position:absolute;left:0;right:0;bottom:0;height:560px;background:linear-gradient(180deg,rgba(10,14,20,0),rgba(10,14,20,.9) 62%,rgba(10,14,20,.97));z-index:1"></div>
 <div style="position:absolute;left:84px;right:84px;bottom:76px;z-index:2;color:#f6efe0"><h1 style="font-size:112px;line-height:.98">${line}</h1><p style="font:400 30px/1.4 Inter;margin-top:20px;opacity:.9;min-height:84px">${sub}</p><div style="display:flex;justify-content:space-between;align-items:center;margin-top:34px">${BR(h,'#f6efe0')}<span class="swipe">${last?'John 1:14':'Swipe →'}</span></div></div></div>`;
P('48-the-word-became-flesh',[
 PAN('h-bott-l','The Word became flesh','Keep swiping. It is one painting.',0),
 PAN('h-bott-r','and dwelt <em>among us.</em>','A blessed Christmas from Golden Chain. Botticelli, The Adoration of the Magi, c. 1478/82.',1),
]);
const only=process.argv[2];
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
