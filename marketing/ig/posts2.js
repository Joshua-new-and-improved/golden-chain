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

const only=process.argv[2];
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
