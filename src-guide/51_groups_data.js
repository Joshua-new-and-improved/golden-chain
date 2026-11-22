// ---------- Groups: built-in content (weekly challenges, mini-studies, stickers) ----------
const GC_EMOJI=["✝️","🕊️","📖","🙏","🔥","⛪","🌿","⭐","🕯️","🍞","🍇","🐑","⚓","🌊","🏔️","❤️","☀️","🌹"];
const GC_AVATARS=["🙂","😊","😇","🤓","🧑‍🎓","👩‍🎓","🧔","👩","👨","🦁","🐑","🕊️","🌻","🌿","📚","🎵","⚽","🏃","🎨","☕"];
const GC_REACTS=["🙏","❤️","🔥","👍","😂","✝️"];
const GC_STICKERS=["🙏","✝️","🕊️","📖","🔥","⛪","😇","🕯️","🍞","🍷","🌹","⭐","❤️","🙌","👏","💪","🎉","😂","🥲","🤔","😮","👍","☀️","🌙","🐑","🦁","⚓","🌿"];

// tasks: [text, optional link]
const GC_CHALLENGES=[
 {t:"The Word every day",v:["Thy word is a lamp to my feet, and a light to my paths.","Psalm 118:105"],tasks:[["Read Scripture on at least 5 days this week (keep your 🔥 streak)","#mass"],["Read Mark 1 in one sitting","#read-mark-1-1"],["Share a verse that struck you in the chat",null],["Pray Night Prayer once","#hours-compline"]]},
 {t:"Sermon on the Mount week",v:["Blessed are the clean of heart: for they shall see God.","Matthew 5:8"],tasks:[["Read Matthew 5","#read-matthew-5-1"],["Read Matthew 6","#read-matthew-6-1"],["Read Matthew 7","#read-matthew-7-1"],["Choose one Beatitude and live it on purpose for a day",null],["Post which Beatitude you chose, and how it went",null]]},
 {t:"Prayer of the Church",v:["Seven times a day I have given praise to thee.","Psalm 118:164"],tasks:[["Pray Morning Prayer twice","#hours-lauds"],["Pray Evening Prayer twice","#hours-vespers"],["Pray Night Prayer three times","#hours-compline"],["Learn the Gloria Patri by heart (in Latin if you dare)",null]]},
 {t:"Thomas Aquinas week",v:["Wisdom hath built herself a house.","Proverbs 9:1"],tasks:[["Complete one Academy lesson and tick it","#academy"],["Read one disputed question","#theology"],["Pray St Thomas's prayer before study before each study session","#prayers"],["Explain one thing you learned to the group in two sentences",null]]},
 {t:"Works of mercy",v:["As long as you did it to one of these my least brethren, you did it to me.","Matthew 25:40"],tasks:[["Do one corporal work of mercy (feed, give drink, clothe, visit…)",null],["Do one spiritual work of mercy (counsel, comfort, forgive, pray…)",null],["Give something away you don't need",null],["Pray for someone who has hurt you, by name",null]]},
 {t:"Psalms week",v:["Sing ye to the Lord a new canticle.","Psalm 95:1"],tasks:[["Read Psalms 1, 22 (23) and 50 (51)","#read-psalms-22-1"],["Pray one psalm slowly, out loud",null],["Memorise Psalm 22 (23):1",null],["Post your favourite psalm verse in the chat",null]]},
 {t:"Fasting and freedom",v:["When thou fastest anoint thy head, and wash thy face.","Matthew 6:17"],tasks:[["Keep Friday penance",null],["One day without social media",null],["Give the time saved to prayer or reading",null],["Share one thing you noticed without the distraction",null]]},
 {t:"Mary, Mother of God",v:["Behold the handmaid of the Lord: be it done to me according to thy word.","Luke 1:38"],tasks:[["Pray the Rosary once (five decades)","#prayers"],["Read Luke 1","#read-luke-1-1"],["Read John 2:1–11 (Cana)","#read-john-2-1"],["Pray the Angelus at noon three times","#prayers"]]},
 {t:"Gospel of John week",v:["In the beginning was the Word.","John 1:1"],tasks:[["Read John 1 with St Thomas's commentary","#read-john-1-1"],["Read John 3","#read-john-3-1"],["Read John 6","#read-john-6-1"],["Post one line from the Fathers that you liked",null]]},
 {t:"Confession and conversion",v:["If we confess our sins, he is faithful and just, to forgive us our sins.","1 John 1:9"],tasks:[["Make a daily examen on 4 evenings","#mass"],["Go to Confession (or book a time)",null],["Make amends to one person",null],["Read Luke 15","#read-luke-15-1"]]},
 {t:"Virtue sprint: temperance",v:["Every one that striveth for the mastery refraineth himself from all things.","1 Corinthians 9:25"],tasks:[["Do the Temperance lesson","#lesson-t8te"],["Phone out of the bedroom for 5 nights",null],["One small fast of your choice",null],["Plan genuine recreation with friends (eutrapelia!)",null]]},
 {t:"Courage week",v:["Take courage, and be strong. Fear not.","Joshua 1:9"],tasks:[["Do the Fortitude lesson","#lesson-t8fo"],["Do one good thing you have been avoiding out of fear",null],["Read about a martyr (Bl. Benedict Daswa?)",null],["Encourage someone in the group",null]]},
 {t:"Truth week",v:["The truth shall make you free.","John 8:32"],tasks:[["Do Truthfulness 1","#lesson-t8tr1"],["A whole day without exaggerating or white lies",null],["Speak well of someone absent",null],["Share one truthful-and-kind alternative you used",null]]},
 {t:"Gratitude week",v:["Were not ten made clean? And where are the nine?","Luke 17:17"],tasks:[["Write down three thanks every evening for 5 days",null],["Thank one person in writing",null],["Visit the Blessed Sacrament to say thank you",null],["Post one thing you are grateful for",null]]},
 {t:"Acts of the Apostles",v:["You shall receive the power of the Holy Ghost coming upon you.","Acts 1:8"],tasks:[["Read Acts 1–2","#read-acts-1-1"],["Pray the Veni Creator or Come Holy Spirit daily",null],["Invite someone to Mass or to this group",null],["Share a sentence about your faith with someone",null]]},
 {t:"Last things",v:["In all thy works remember thy last end, and thou shalt never sin.","Sirach 7:40"],tasks:[["Pray the prayer before death and judgment 4 days","#mass"],["Visit a cemetery and pray for the dead",null],["Read Matthew 25","#read-matthew-25-1"],["Write what you want said of you at your funeral",null]]}
];

// Mini-studies: steps are {k:"read",ref,from,to,ch,book} | {k:"reflect",q} | {k:"quiz",q,o:[...],a,why} | {k:"poll",q,o:[...]}
const GC_STUDIES=[
 {id:"beatitudes",t:"The Beatitudes",e:"⛰️",d:"Jesus's portrait of the happy life, in 5 steps.",steps:[
  {k:"read",book:"matthew",ch:5,from:1,to:12},
  {k:"quiz",q:"To whom is the kingdom of heaven promised in the first Beatitude?",o:["The meek","The poor in spirit","The peacemakers","The merciful"],a:1,why:"\"Blessed are the poor in spirit: for theirs is the kingdom of heaven\" (Matt 5:3). Thomas: poverty of spirit is detachment from riches and honours, the first step to beatitude (I-II q.69 a.3)."},
  {k:"poll",q:"Which Beatitude do you find hardest?",o:["Poor in spirit","Meek","Mourning","Hunger for justice","Merciful","Clean of heart","Peacemakers","Persecuted"]},
  {k:"reflect",q:"Where this week could you be a peacemaker?"},
  {k:"quiz",q:"For Thomas, the Beatitudes are…",o:["Rules for monks only","Acts of the gifts and virtues that lead to beatitude","A list of feelings","Old Testament laws"],a:1,why:"The Beatitudes are acts flowing from the virtues and gifts, which merit and begin beatitude even now (I-II q.69 aa.1–2)."}]},
 {id:"prodigal",t:"The Prodigal Son",e:"🐷",d:"Mercy, conversion and the elder brother.",steps:[
  {k:"read",book:"luke",ch:15,from:11,to:32},
  {k:"quiz",q:"What does the younger son say when he 'returns to himself'?",o:["I will demand my inheritance","I will arise and will go to my father","I will become a servant elsewhere","I will stay among the swine"],a:1,why:"\"I will arise and will go to my father\" (Luke 15:18): the movement of conversion."},
  {k:"poll",q:"Who do you identify with most right now?",o:["The younger son","The elder son","The father","The servants"]},
  {k:"reflect",q:"What would 'running to meet' someone look like for you this week?"},
  {k:"quiz",q:"What is the elder son's main problem?",o:["He was lazy","He resents mercy shown to his brother","He left home too","He lost money"],a:1,why:"He refuses to share the father's joy (Luke 15:28–30); envy is sorrow at another's good (II-II q.36)."}]},
 {id:"ps23",t:"The Lord is my shepherd",e:"🐑",d:"Psalm 22 (23) in 4 steps.",steps:[
  {k:"read",book:"psalms",ch:22,from:1,to:6},
  {k:"quiz",q:"In most modern Bibles this psalm is numbered…",o:["21","22","23","24"],a:2,why:"The Douay-Rheims follows the Vulgate numbering (22); Hebrew-based Bibles number it 23."},
  {k:"reflect",q:"Where is your 'valley of the shadow' right now, and what would it mean to say 'I will fear no evils'?"},
  {k:"poll",q:"Which image speaks to you most?",o:["Green pastures","Still waters","The rod and staff","The table prepared","The overflowing cup"]}]},
 {id:"bread",t:"The Bread of Life",e:"🍞",d:"John 6 and the Eucharist.",steps:[
  {k:"read",book:"john",ch:6,from:48,to:58},
  {k:"quiz",q:"How do many disciples react to this teaching?",o:["They rejoice","They walk no more with him","They make him king","They ask for a sign of fire"],a:1,why:"\"After this, many of his disciples went back and walked no more with him\" (John 6:67). Jesus does not soften the teaching."},
  {k:"quiz",q:"Peter's answer is…",o:["This saying is hard","Lord, to whom shall we go? Thou hast the words of eternal life","Give us this bread","We will build three tabernacles"],a:1,why:"John 6:69."},
  {k:"poll",q:"How often do you go to Mass at the moment?",o:["Daily","More than weekly","Sundays","Sometimes","Rarely, but I want to"]},
  {k:"reflect",q:"What helps you to believe Christ is truly present in the Eucharist?"}]},
 {id:"cana",t:"The wedding at Cana",e:"🍷",d:"Mary's intercession and the first sign.",steps:[
  {k:"read",book:"john",ch:2,from:1,to:11},
  {k:"quiz",q:"What does Mary tell the waiters?",o:["Fill the jars","Whatsoever he shall say to you, do ye","Bring more wine","Call the chief steward"],a:1,why:"John 2:5: her last recorded words in the Gospels point to her Son."},
  {k:"reflect",q:"What is one thing Jesus is 'saying to you' that you have not yet done?"},
  {k:"poll",q:"Do you ask Mary to intercede for you?",o:["Daily","Sometimes","Rarely","I'd like to start"]}]},
 {id:"vine",t:"The vine and the branches",e:"🍇",d:"Abiding in Christ (John 15).",steps:[
  {k:"read",book:"john",ch:15,from:1,to:11},
  {k:"quiz",q:"'Without me you can do…'",o:["little","nothing","much","everything"],a:1,why:"John 15:5. Thomas: no meritorious act without grace (I-II q.109)."},
  {k:"reflect",q:"What 'pruning' might God be doing in your life?"},
  {k:"poll",q:"Which helps you most to 'abide'?",o:["Mass","Scripture","Rosary","Silence/adoration","Friends in faith"]}]},
 {id:"lying",t:"What counts as a lie?",e:"🤥",d:"A quick quiz from the Truthfulness lessons.",steps:[
  {k:"quiz",q:"You sincerely give a wrong date. Is it a lie?",o:["Yes","No: an honest mistake"],a:1,why:"Only material falsehood; no will to assert what you believe false (II-II q.110 a.1)."},
  {k:"quiz",q:"A novel full of invented events is…",o:["a lie","not a lie: nothing is asserted in one's own person"],a:1,why:"Fiction asserts nothing as true in the author's own person."},
  {k:"quiz",q:"'I love the gift!' when you don't is…",o:["not a lie","a small (officious) lie"],a:1,why:"Asserted against one's mind; a venial officious lie. Better: thank them for the thought."},
  {k:"poll",q:"The murderer at the door: what would you do?",o:["Refuse and conceal, no lie","Lie to protect","Not sure"]},
  {k:"reflect",q:"Which 'white lie' situation trips you up most often? What truthful and kind alternative could you use?"}]},
 {id:"virtues",t:"Which virtue do I need?",e:"⚖️",d:"Prudence, justice, fortitude, temperance.",steps:[
  {k:"quiz",q:"The chief act of prudence is…",o:["counsel","judgment","command"],a:2,why:"II-II q.47 a.8: applying to action what was counselled and judged."},
  {k:"quiz",q:"The chief act of fortitude is…",o:["attack","endurance"],a:1,why:"II-II q.123 a.6: to stand immovable in the midst of dangers."},
  {k:"quiz",q:"The rule of temperance is…",o:["as little pleasure as possible","the need of this life"],a:1,why:"II-II q.141 a.6."},
  {k:"poll",q:"Which cardinal virtue do you most need this month?",o:["Prudence","Justice","Fortitude","Temperance"]},
  {k:"reflect",q:"Name one concrete act of that virtue you will do tomorrow."}]}
];
