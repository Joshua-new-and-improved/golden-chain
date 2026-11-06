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
const only=process.argv[2];
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
