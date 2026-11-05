const {render}=require('./render.js');
const ch=`<span class="chain"><i></i><i></i><i></i></span>`;
const K=(t,c='')=>`<div class="kick ${c}">${ch}<span>${t}</span></div>`;
const posts=[];const P=(id,slides,o={})=>posts.push({id,slides,...o});

// 01 · Brand intro: the Catena Aurea story
P('01-golden-chain-story',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('thomas-print')});background-position:center 20%;opacity:.55"></div><div class="shade"></div>
   <div class="z">${K('Catholic lore')}</div><div class="spacer"></div>
   <h1 class="z xl">In 1263, Thomas Aquinas built a <em>chain.</em></h1>
   <p class="z body" style="margin-top:28px">Not out of iron. Out of saints.</p>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('The commission')}</div><div class="spacer"></div>
   <p class="z body" style="font-size:40px;line-height:1.45"><span class="drop">P</span>ope Urban IV asked him for a commentary on the four Gospels. Thomas didn't just write his own thoughts.</p>
   <p class="z body" style="font-size:40px;line-height:1.45;margin-top:30px">He went through <span class="mark"><b>every verse</b></span> and gathered what the Church Fathers had said about it, over 1,000 years of them.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain center"><div class="z">${K('By the numbers')}</div><div class="spacer"></div>
   <h1 class="z" style="font-size:300px;line-height:.9;color:var(--gold2)">80+</h1>
   <h2 class="z" style="margin-top:20px">Greek and Latin Fathers, quoted verse by verse.</h2>
   <p class="z body sm" style="margin-top:26px">Augustine, Chrysostom, Jerome, Ambrose, Gregory, Origen, Hilary…</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('The name')}</div><div class="spacer"></div>
   <h1 class="z l">They called it the <em>Catena Aurea</em>.</h1><p class="z q" style="margin-top:30px">“The Golden Chain”</p>
   <p class="z body" style="margin-top:34px">Each saint a link. Each link holding on to the one before it, all the way back to the apostles.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('So we built an app for that')}</div>
   <div class="z row" style="margin-top:50px"><div class="phone" style="flex:none;width:400px;height:840px;transform:rotate(-3deg)"><img src="${h.shotURL('reader2')}"></div>
   <div><h2>Read the Bible with the saints <em>beside you.</em></h2><p class="body sm" style="margin-top:26px">Tap any verse. See what Augustine, Chrysostom and Aquinas said about it.</p></div></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Golden Chain')}</div><div class="spacer"></div><h1 class="z m">Everything in one place.</h1>
   <div class="z list" style="margin-top:44px">${[['📖','The Bible, traditional or modern English, with the Fathers on every verse'],['✝️','Today’s Mass readings, explained'],['📜','The whole Catechism in 96 short sections'],['🙏','Prayers for every part of your day'],['👥','Groups to read and pray with friends']].map(([n,t])=>`<div class="it"><span class="n" style="font-size:40px">${n}</span><span>${t}</span></div>`).join('')}</div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><div class="z" style="width:150px;height:150px;margin:0 auto 30px">${h.MARK.replace('<svg','<svg width="150" height="150"')}</div>
   <h1 class="z l">Join the chain.</h1><p class="z body" style="margin-top:26px;font-weight:600">Free. No ads. Made in South Africa.</p>
   <p class="z" style="margin-top:44px"><span class="pill" style="background:#16120a;color:#e6c97a">Link in bio</span></p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 02 · Exam season: Prayer before Study
const ps=["Ineffable Creator, from the treasures of your wisdom you appointed the choirs of angels and set them in wonderful order above the heavens, and arranged the parts of the universe with great beauty.","You are the true source of light and wisdom, and the first principle of all things. Pour a ray of your brightness into the darkness of my understanding, and take from me the double darkness in which I was born: sin and ignorance.","You make eloquent the tongues of infants: guide my speech and pour the grace of your blessing on my lips. Give me keenness to understand, capacity to remember, method and ease in learning, precision in interpreting, and abundant grace in expression.","Order the beginning, direct the progress, and perfect the completion. Through Christ our Lord. <b>Amen.</b>"];
P('02-prayer-before-study',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('doctors-temple')});background-position:center 18%;opacity:.7"></div><div class="shade"></div>
   <div class="z"><span class="tag">Exam season</span></div><div class="spacer"></div>
   <h1 class="z l">The prayer St Thomas Aquinas prayed <em>before he studied.</em></h1>
   <p class="z body" style="margin-top:26px">Save it before your next exam.</p>${h.foot(i,n,{swipe:1})}</div>`,
 ...ps.map((t,k)=>(i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Ante studium · '+['I','II','III','IV'][k])}</div><div class="spacer"></div>
   <p class="z q ${k===2?'m':''}">${k===0?`<span class="drop" style="font-family:'Instrument Serif';font-style:normal">I</span>`+t.slice(1):t}</p><div class="spacer"></div>${h.foot(i,n)}</div>`),
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('Before you go')}</div><div class="spacer"></div>
   <h2 class="z">Notice what he asks for:</h2>
   <div class="z list" style="margin-top:38px">${['Understanding','Memory','Method','Interpretation','Expression'].map((t,k)=>`<div class="it"><span class="n">${k+1}</span><span><b>${t}</b></span></div>`).join('')}</div>
   <p class="z body sm" style="margin-top:38px">Every stage of learning, handed over to God. Studying can be prayer too.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('Send this to your study group')}</div><div class="spacer"></div>
   <h1 class="z m">Add it to your day in the app, and pray it together before every session.</h1>
   <p class="z body" style="margin-top:30px;font-weight:600">Golden Chain → Prayers → Prayer before Study</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 03 · Ask Aquinas: Is it a sin to be angry? (Summa format)
P('03-ask-aquinas-anger',[
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('Ask Aquinas')}</div><div class="spacer"></div>
   <p class="z mono">Summa Theologiae II-II, q.158, a.1</p><h1 class="z xl" style="margin-top:24px">Is it a sin to be <em>angry?</em></h1><div class="spacer"></div>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('How Thomas argues')}</div><div class="spacer"></div>
   <h2 class="z">Every article in the Summa has the same four moves.</h2><div class="z list" style="margin-top:40px">${[['Objection','The strongest case against his answer'],['On the contrary','An authority that points the other way'],['I answer that','His actual reasoning'],['Replies','Back to every objection, one by one']].map(([a,b],k)=>`<div class="it"><span class="n">${k+1}</span><span><b>${a}.</b> ${b}</span></div>`).join('')}</div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">Objection</div><div class="spacer"></div>
   <p class="z q l">“It seems that anger is always a sin.”</p><p class="z body" style="margin-top:34px">Jesus says whoever is angry with his brother is liable to judgement (Matthew 5:22). And anger clouds reason, which is what makes us human.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">I answer that</div><div class="spacer"></div>
   <p class="z body" style="font-size:40px">Anger is a passion, a movement of the heart. It isn't evil in itself.</p>
   <p class="z q" style="margin-top:34px">It goes wrong in two ways: when it wants the <span class="mark">wrong thing</span>, or when it's <span class="mark">too much or too little</span> for what right reason calls for.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z lbl">So…</div><div class="spacer"></div>
   <h1 class="z m">Anger at <em>injustice,</em> kept in line by reason, can be good.</h1>
   <p class="z body" style="margin-top:34px">Thomas even quotes St Gregory: good anger <i>“troubles”</i> the eye of reason, but sinful anger <i>“blinds”</i> it.</p>
   <p class="z body sm" style="margin-top:26px;opacity:.75">Too little anger at evil is a fault too.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('Ask Aquinas')}</div><div class="spacer"></div>
   <h1 class="z m">What should Aquinas answer next?</h1><p class="z body" style="margin-top:30px;font-weight:600">Drop your question in the comments. More in the app: Theology → Disputed questions.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 04 · The Fathers said what? Eucharist
P('04-fathers-eucharist',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('last-supper')});opacity:.6"></div><div class="shade"></div>
   <div class="z">${K('The Fathers said what?')}</div><div class="spacer"></div>
   <h1 class="z l">What did the first Christians believe about the <em>Eucharist?</em></h1>
   <p class="z body" style="margin-top:24px">Not what you might expect. In their own words ↓</p>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z"><span class="tag">c. AD 107</span></div><div class="spacer"></div>
   <p class="z q">“They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be <span class="mark">the flesh of our Saviour Jesus Christ.</span>”</p>
   <p class="z cite" style="margin-top:36px">St Ignatius of Antioch, Letter to the Smyrnaeans 7</p><p class="z small" style="margin-top:14px">Written on his way to martyrdom, a generation after the apostles.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z"><span class="tag">c. AD 107</span></div><div class="spacer"></div>
   <p class="z q l">“…breaking one bread, which is <span class="mark">the medicine of immortality,</span> the antidote against death.”</p>
   <p class="z cite" style="margin-top:36px">St Ignatius of Antioch, Letter to the Ephesians 20</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z"><span class="tag">c. AD 155</span></div><div class="spacer"></div>
   <p class="z q m">“For not as common bread and common drink do we receive these… the food which is blessed by the prayer of His word… is <span class="mark">the flesh and blood of that Jesus</span> who was made flesh.”</p>
   <p class="z cite" style="margin-top:36px">St Justin Martyr, First Apology 66</p><p class="z small" style="margin-top:14px">He also describes Sunday Mass: readings, a homily, prayers, bread and wine, and the people’s “Amen”.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('Why it matters')}</div><div class="spacer"></div>
   <h2 class="z">The Real Presence isn't a medieval idea.</h2><p class="z body" style="margin-top:30px">It's what Christians believed while people who had known the apostles were still alive. Read John 6 with the Fathers beside you, and you'll see why.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><h1 class="z m">Read John 6 with Augustine, Chrysostom & Aquinas.</h1><p class="z" style="margin-top:40px"><span class="pill" style="background:#16120a;color:#e6c97a">Free · link in bio</span></p><p class="z body sm" style="margin-top:30px;font-weight:600">Send this to someone who thinks Communion is “just a symbol”.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 05 · November: Purgatory in 6 slides
P('05-purgatory-explained',[
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('church-interior')});opacity:.55"></div><div class="shade"></div>
   <div class="z"><span class="tag">November · month of the Holy Souls</span></div><div class="spacer"></div><h1 class="z xl">Purgatory, <em>explained.</em></h1><p class="z body" style="margin-top:20px">In six slides. No fire-and-brimstone required.</p>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">What it is</div><div class="spacer"></div>
   <p class="z q">Those who die in God’s grace and friendship, but are still imperfectly purified, are certain of heaven. First they are made <span class="mark">completely clean.</span></p><p class="z cite" style="margin-top:34px">Catechism of the Catholic Church §1030</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">What it isn't</div><div class="spacer"></div><div class="z list">${[['✕','A second chance for people who rejected God'],['✕','A halfway point between heaven and hell'],['✓','The last stage of being made ready for heaven, by God’s mercy']].map(([a,b])=>`<div class="it"><span class="n">${a}</span><span>${b}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">Where it comes from</div><div class="spacer"></div>
   <p class="z q m">“Therefore he made atonement for the dead, that they might be delivered from their sin.”</p><p class="z cite" style="margin-top:28px">2 Maccabees 12:46</p>
   <div class="z rule"></div><p class="z body sm">Christians prayed for the dead from the earliest centuries. Paul speaks of being saved “as through fire” (1 Corinthians 3:15).</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="art" style="background-image:url(${h.artURL('augustine')});opacity:.45;background-position:center 25%"></div><div class="shade"></div><div class="z lbl">A mother's last request</div><div class="spacer"></div>
   <p class="z q">“Lay this body anywhere… This only I ask of you, that you remember me at the altar of the Lord.”</p><p class="z cite" style="margin-top:30px">St Monica to St Augustine, Confessions IX.11</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('This November')}</div><div class="spacer"></div><h1 class="z m">Pray for someone you've lost.</h1>
   <p class="z body" style="margin-top:28px;font-weight:600">Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May they rest in peace. Amen.</p>
   <p class="z body sm" style="margin-top:30px">Read the whole section, free: Golden Chain → Catechism → §1020–1037.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 06 · Psych × Faith: virtue and habit
P('06-virtue-is-a-habit',[
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Faith × psychology')}</div><div class="spacer"></div>
   <h1 class="z l">Aquinas called it <em>virtue.</em><br>Psychologists call it <em>habit.</em></h1><p class="z body" style="margin-top:30px">Same idea, 750 years apart.</p><div class="spacer"></div>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z lbl">The 13th century</div><div class="spacer"></div>
   <p class="z q">A virtue is a <span class="mark">habitus</span>: a stable disposition you build by repeating good acts, until doing good becomes easier, quicker and even joyful.</p><p class="z cite" style="margin-top:30px">After Summa Theologiae I-II, q.55 · Catechism §1803–1804</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">The 21st century</div><div class="spacer"></div>
   <h1 class="z" style="font-size:260px;line-height:.9;color:var(--rubric)">66</h1><h2 class="z">days, on average, for a new behaviour to become automatic.</h2>
   <p class="z body sm" style="margin-top:26px">A UCL study followed 96 people; it took anywhere from 18 to 254 days.</p><p class="z small" style="margin-top:12px">Lally et al. (2010), European Journal of Social Psychology</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s vellum grain"><div class="z lbl">What both agree on</div><div class="spacer"></div><div class="z list">${['Small and repeated beats big and rare','Same time, same place: tie it to something you already do','Missing a day doesn’t ruin it. Start again tomorrow','It gets easier. That’s the point'].map((t,k)=>`<div class="it"><span class="n">${k+1}</span><span>${t}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z lbl">The difference</div><div class="spacer"></div><h2 class="z">Habits make you efficient. Virtue makes you <em>free.</em></h2>
   <p class="z body" style="margin-top:30px">For Aquinas, the goal isn't productivity. It's becoming the kind of person who loves the good, with God's grace doing what willpower can't.</p>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain"><div class="z">${K('Start one today')}</div><div class="spacer"></div><h1 class="z m">Pick one prayer. Same time every day. 66 days.</h1><p class="z body" style="margin-top:28px;font-weight:600">Set it up in Golden Chain → Prayers → My day, and tick it off.</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 07 · App walkthrough with phone mockups
const mock=(img,kick,title,sub,rot=0)=>(i,n,h)=>`<div class="s ink grain"><div class="z">${K(kick)}</div><h2 class="z" style="margin-top:30px">${title}</h2><p class="z body sm" style="margin-top:16px">${sub}</p>
  <div class="z" style="display:flex;justify-content:center;margin-top:40px"><div class="phone" style="height:780px;width:380px;transform:rotate(${rot}deg)"><img src="${h.shotURL(img)}"></div></div>${h.foot(i,n)}</div>`;
P('07-app-tour',[
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('New here?')}</div><div class="spacer"></div><h1 class="z l">Your Bible app is missing <em>2,000 years</em> of commentary.</h1><p class="z body" style="margin-top:28px">Here's what Golden Chain does. (It's free.)</p><div class="spacer"></div>${h.foot(i,n,{swipe:1})}</div>`,
 mock('reader2','The Bible','Every verse, <em>with the saints.</em>','Traditional Douay-Rheims or modern English. Tap for Aquinas and the Fathers.',-2),
 mock('mass','Daily Mass','Today\'s readings, <em>explained.</em>','The Gospel with the Fathers on every verse, every day.',2),
 mock('ccc','The Catechism','96 sections. <em>Plain English.</em>','What the Church teaches, why, and where it comes from.',-2),
 mock('group2','Groups','Pray and read <em>together.</em>','Share prayers, plan a Rosary, see who prayed.',2),
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><h1 class="z l">Free. No ads. <br>No catch.</h1><p class="z body" style="margin-top:28px;font-weight:600">Works on any phone. Add it to your home screen like an app.</p><p class="z" style="margin-top:40px"><span class="pill" style="background:#16120a;color:#e6c97a">Link in bio</span></p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 08 · Single quote card
P('08-augustine-restless',[
 (i,n,h)=>`<div class="s ink grain center"><div class="art" style="background-image:url(${h.artURL('augustine')});opacity:.28;background-position:center 30%"></div><div class="shade top" style="opacity:.6"></div><div class="z">${K('St Augustine · AD 397')}</div><div class="spacer"></div>
   <p class="z q l" style="font-size:76px">“You have made us for yourself, O Lord, and our heart is <span class="mark">restless</span> until it rests in you.”</p><p class="z cite" style="margin-top:40px">Confessions I.1</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// 09 · Groups feature
P('09-study-group-holy',[
 (i,n,h)=>`<div class="s vellum grain"><div class="z">${K('Golden Chain groups')}</div><h1 class="z m" style="margin-top:30px">Your group chat, but make it <em>holy.</em></h1>
   <div class="z" style="display:flex;gap:30px;margin-top:46px;justify-content:center"><div class="phone" style="width:360px;height:740px;transform:rotate(-3deg)"><img src="${h.shotURL('group2')}"></div><div class="phone" style="width:360px;height:740px;transform:rotate(3deg) translateY(30px)"><img src="${h.shotURL('group')}"></div></div>${h.foot(i,n,{swipe:1})}</div>`,
 (i,n,h)=>`<div class="s ink grain"><div class="z">${K('What you can do')}</div><div class="spacer"></div><div class="z list">${[['📿','Share a prayer. Everyone can add it to their day'],['🙏','Ask for prayer, and see who prayed'],['📅','Plan a Rosary or Bible study, with RSVPs'],['📌','Pin the weekly challenge'],['🔥','Keep each other’s streaks alive']].map(([a,b])=>`<div class="it"><span class="n" style="font-size:40px">${a}</span><span>${b}</span></div>`).join('')}</div><div class="spacer"></div>${h.foot(i,n)}</div>`,
 (i,n,h)=>`<div class="s gold grain center"><div class="spacer"></div><h1 class="z m">Start one for your youth group, your res, or your Confirmation class.</h1><p class="z body" style="margin-top:30px;font-weight:600">Golden Chain → Groups → New group</p><p class="z body sm" style="margin-top:24px">Tag the friend who'd lead it 👇</p><div class="spacer"></div>${h.foot(i,n)}</div>`,
]);

// Stories (1080x1920)
const st=(id,f)=>P(id,[f],{story:true});
st('S1-story-poll',(i,n,h)=>`<div class="s story ink grain" style="padding:180px 92px 220px"><div class="z">${K('Quick question')}</div><div class="spacer"></div><h1 class="z l">Have you ever read a Church Father?</h1><div class="z" style="margin-top:60px;height:330px;border:3px dashed rgba(230,201,122,.5);border-radius:34px;display:grid;place-items:center" class="mono"><span class="mono">[ add the poll sticker here ]<br><br>“Yes 📜” · “Who?? 👀”</span></div><div class="spacer"></div>${h.foot(1,1)}</div>`);
st('S2-story-quiz',(i,n,h)=>`<div class="s story vellum grain" style="padding:180px 92px 220px"><div class="z">${K('Catholic lore quiz')}</div><div class="spacer"></div><h1 class="z m">Who called the Eucharist “the medicine of immortality”?</h1><div class="z" style="margin-top:60px;height:420px;border:3px dashed rgba(163,48,42,.45);border-radius:34px;display:grid;place-items:center"><span class="mono" style="text-align:center">[ quiz sticker ]<br><br>A. St Augustine<br>B. St Ignatius of Antioch ✓<br>C. St Thomas Aquinas</span></div><div class="spacer"></div>${h.foot(1,1)}</div>`);
st('S3-story-gospel',(i,n,h)=>`<div class="s story ink grain" style="padding:180px 92px 220px"><div class="art" style="background-image:url(${h.artURL('santa-maria-febbre')});opacity:.35"></div><div class="shade"></div><div class="z">${K('Today’s Gospel')}</div><div class="z mono" style="margin-top:20px">[ date ] · [ reference ]</div><div class="spacer"></div><p class="z q l">“[ one line from today's Gospel ]”</p><div class="z rule"></div><p class="z body">[ one sentence from a Father on this verse ]</p><p class="z cite" style="margin-top:18px">[ St … , source ]</p><div class="spacer"></div><p class="z"><span class="pill g">Read it with the saints →</span></p>${h.foot(1,1)}</div>`);
st('S4-story-pray-tonight',(i,n,h)=>`<div class="s story gold grain center" style="padding:180px 92px 220px"><div class="spacer"></div><div class="z frak" style="font-size:64px">Compline</div><h1 class="z l" style="margin-top:24px">Pray with us tonight.</h1><p class="z body" style="margin-top:30px;font-weight:600">Night Prayer, 5 minutes, before bed.<br>Golden Chain → Hours</p><div class="spacer"></div>${h.foot(1,1)}</div>`);
// Reel covers (1080x1920, safe zone for 4:5 grid crop)
const rc=(id,kick,title,art)=>P(id,[(i,n,h)=>`<div class="s story ink grain" style="padding:330px 92px 330px"><div class="art" style="background-image:url(${h.artURL(art)});opacity:.55"></div><div class="shade"></div><div class="z">${K(kick)}</div><div class="spacer"></div><h1 class="z l">${title}</h1><div class="spacer"></div>${h.foot(1,1)}</div>`],{story:true});
rc('R1-reel-cover-gospel-60','Gospel in 60 seconds','Today\'s Gospel, <em>with the saints.</em>','santa-maria-febbre');
rc('R2-reel-cover-ask-aquinas','Ask Aquinas','Can you be friends with <em>God?</em>','thomas-crucifix');
rc('R3-reel-cover-lore','Catholic lore','Why do Catholics use <em>incense?</em>','church-interior');
// Highlight covers (rendered square inside a story frame)
const hl=[['Start','✦'],['Mass','✝'],['Pray','✠'],['Ask','?'],['Groups','∞']];
hl.forEach(([t,ic])=>P('H-'+t.toLowerCase(),[(i,n,h)=>`<div class="s story ink grain center" style="justify-content:center"><div class="z" style="width:620px;height:620px;border-radius:50%;border:4px solid var(--gold);display:grid;place-items:center;margin:0 auto"><div><div style="font:400 210px/1 'Instrument Serif';color:var(--gold2)">${ic}</div><div style="font:600 46px/1 Inter;letter-spacing:.2em;text-transform:uppercase;margin-top:20px;color:var(--gold)">${t}</div></div></div></div>`],{story:true}));

const only=process.argv[2];
render(only?posts.filter(p=>p.id.startsWith(only)):posts,'/tmp/claude-0/ig/out').catch(e=>{console.error(e);process.exit(1)});
