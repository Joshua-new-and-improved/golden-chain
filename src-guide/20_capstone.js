// ---------- T17: Capstone and comprehensive examination ----------
// Theological notes follow the standard manual classification (e.g. Ott, 1952); notes are a teaching guide, not themselves magisterial.
addTerms([
 {id:"theological-note",t:"Theological note",la:"nota theologica",d:"Method",b:"A label giving the degree of certainty and authority of a theological proposition.",p:"Classification such as de fide divina et catholica definita (defined dogma), de fide (taught as revealed), fidei proxima, sententia theologice certa, sententia communis, sententia probabilis; and the corresponding censures (heretical, erroneous, rash).",ex:"\"Christ is one person in two natures\": de fide definita (Chalcedon).",where:"Ott (1952), Introduction §8",ccc:"88–90",conf:"A note in the margin.",rel:["magisterium","article-faith"],lesson:"t17",alias:["theological note","de fide","sententia communis"]},
 {id:"tesario",t:"Tesario (thesis list)",la:"theses",d:"Method",b:"The published list of theses on which a comprehensive examination is set.",p:"In pontifical faculties, the list of propositions covering the whole curriculum; the candidate must explain, prove and defend any of them orally or in writing.",ex:"\"The sacraments of the New Law confer grace ex opere operato.\"",where:"—",ccc:"",conf:"A dissertation.",rel:["theological-note"],lesson:"t17",alias:["tesario","thesis list"]}
]);

const THESES=[
 {id:"th1",t:"Sacred doctrine is a science, proceeding from principles known by the light of a higher science, the knowledge of God and the blessed.",note:"Common Thomist teaching",src:"ST I q.1 a.2",lesson:"f1",obj:"A science proceeds from self-evident principles; theology proceeds from articles of faith, which are not self-evident."},
 {id:"th2",t:"The one true God can be known with certainty by the natural light of reason from created things.",note:"De fide definita",src:"Vatican I, Dei Filius ch. 2 and canon 2.1 (1870)",lesson:"t3",obj:"If God could be known by reason, faith would be unnecessary."},
 {id:"th3",t:"God is pure act, wholly simple, without composition of any kind.",note:"De fide (simplicity: Lateran IV, 1215; Vatican I)",src:"ST I q.3; Lateran IV ch. 1",lesson:"t3",obj:"Scripture attributes many distinct attributes and even bodily parts to God."},
 {id:"th4",t:"The Trinity of persons cannot be known by natural reason, though reason can show that it is not impossible.",note:"Sententia certa (mysteries strictly so called: de fide, Vatican I)",src:"ST I q.32 a.1; Dei Filius ch. 4",lesson:"t4",obj:"Richard of St Victor argues that infinite love requires a plurality of persons."},
 {id:"th5",t:"The divine persons are subsisting relations, distinguished only by relative opposition.",note:"Sententia communis (the Florentine principle is de fide)",src:"ST I q.29 a.4; q.30 a.2; Florence (1442)",lesson:"t4",obj:"A relation is an accident; God has no accidents; so there are no real relations in God."},
 {id:"th6",t:"God created the world from nothing, freely, for his own glory, which consists in communicating his goodness.",note:"De fide definita",src:"Lateran IV (1215); Vatican I, Dei Filius canon 1.5",lesson:"t5",obj:"Nothing comes from nothing."},
 {id:"th7",t:"That the world began in time is held by faith; it cannot be demonstrated by reason.",note:"The beginning: de fide (Lateran IV); its indemonstrability: Thomist opinion",src:"ST I q.46 a.2",lesson:"t5",obj:"An infinite past would require traversing an infinite series, which is impossible."},
 {id:"th8",t:"Angels exist as purely spiritual creatures, and some sinned irrevocably.",note:"De fide definita",src:"Lateran IV (1215); ST I qq.50, 63–64",lesson:"t5",obj:"Belief in angels is pre-scientific mythology."},
 {id:"th9",t:"The intellectual soul is, by itself and essentially, the form of the human body, and it is immortal.",note:"De fide definita",src:"Council of Vienne (1312); Lateran V (1513); ST I q.76 a.1",lesson:"f5",obj:"If the soul is the form of the body, it perishes with the body."},
 {id:"th10",t:"Man's final happiness consists in the vision of the divine essence.",note:"De fide definita",src:"Benedict XII, Benedictus Deus (1336); ST I-II q.3 a.8",lesson:"f7",obj:"A finite intellect cannot see an infinite God."},
 {id:"th11",t:"The natural law is a participation of the eternal law in the rational creature, and its first principles cannot be blotted out.",note:"Sententia certa",src:"ST I-II q.91 a.2; q.94 a.6; CCC 1954–1960",lesson:"f7",obj:"Moral codes vary widely across cultures."},
 {id:"th12",t:"There are acts which are intrinsically evil by reason of their object, which no intention or circumstance can make good.",note:"Definitive magisterial teaching",src:"Veritatis Splendor 79–81 (1993); ST I-II q.18",lesson:"t6",obj:"Only consequences determine whether an act is right."},
 {id:"th13",t:"Grace is necessary for every salutary act, and the beginning of faith is itself a gift of grace.",note:"De fide definita",src:"Council of Orange II (529); Trent, Session 6; ST I-II q.109",lesson:"t6",obj:"If grace is necessary for every good act, free will is destroyed."},
 {id:"th14",t:"Justification is not only the remission of sins but the sanctification and renewal of the inner man by grace and the gifts.",note:"De fide definita",src:"Trent, Session 6, ch. 7 and canon 11",lesson:"t6",obj:"Romans 4:5: God justifies the ungodly by reckoning faith as righteousness."},
 {id:"th15",t:"Faith is an assent of the intellect to revealed truth because of the authority of God revealing, commanded by the will moved by grace.",note:"De fide definita",src:"Vatican I, Dei Filius ch. 3; ST II-II q.2 a.9",lesson:"t7",obj:"Assent should be proportioned to evidence; faith goes beyond evidence."},
 {id:"th16",t:"Charity is the friendship of man with God and the form of all the virtues.",note:"Sententia communis",src:"ST II-II q.23 aa.1, 8",lesson:"t7",obj:"Friendship requires equality, and there is no equality between God and man."},
 {id:"th17",t:"Divine revelation is transmitted by Scripture and Tradition, authentically interpreted by the living Magisterium.",note:"De fide definita",src:"Trent, Session 4; Dei Verbum 9–10",lesson:"t1",obj:"Scripture alone is sufficient (2 Tim 3:16–17)."},
 {id:"th18",t:"The Catholic canon of Scripture comprises 73 books, all inspired and having God as their author.",note:"De fide definita",src:"Trent, Session 4 (1546); Vatican I",lesson:"t2b",obj:"The deuterocanonical books are absent from the Hebrew canon."},
 {id:"th19",t:"Sacred Scripture teaches without error what the inspired authors assert.",note:"De fide (interpretation of the scope debated)",src:"Providentissimus Deus (1893); Dei Verbum 11",lesson:"t2b",obj:"Scripture contains discrepancies in numbers and chronology."},
 {id:"th20",t:"Jesus Christ is one divine person subsisting in two natures, divine and human, without confusion or division.",note:"De fide definita",src:"Ephesus (431); Chalcedon (451); ST III q.2 a.2",lesson:"t11",obj:"A complete human nature must be a human person."},
 {id:"th21",t:"Christ, by his Passion offered out of love and obedience, merited our salvation and made superabundant satisfaction for our sins.",note:"De fide (merit and satisfaction: Trent, Session 6, ch. 7)",src:"ST III q.48 aa.1–2",lesson:"t11",obj:"It is unjust to punish the innocent for the guilty."},
 {id:"th22",t:"Mary is truly Mother of God, ever virgin, immaculately conceived, and assumed body and soul into heavenly glory.",note:"De fide definita",src:"Ephesus (431); Lateran Synod (649); Ineffabilis Deus (1854); Munificentissimus Deus (1950)",lesson:"t12",obj:"Mary called God her Saviour (Luke 1:47), so she was a sinner."},
 {id:"th23",t:"There are seven sacraments of the New Law, instituted by Christ, which contain and confer grace ex opere operato.",note:"De fide definita",src:"Trent, Session 7, canons 1, 6, 8; ST III q.62 a.1",lesson:"t13",obj:"Grace comes by faith alone, not by external rites."},
 {id:"th24",t:"In the Eucharist, by transubstantiation, the whole substance of bread and wine is converted into Christ's body and blood, the appearances remaining.",note:"De fide definita",src:"Lateran IV (1215); Trent, Session 13; ST III q.75 a.4",lesson:"t13",obj:"\"The flesh profiteth nothing\" (John 6:64)."},
 {id:"th25",t:"The Mass is a true and proper sacrifice, the same sacrifice as the Cross offered in an unbloody manner.",note:"De fide definita",src:"Trent, Session 22; ST III q.83 a.1",lesson:"t16a",obj:"Christ was offered once for all (Heb 9:28)."},
 {id:"th26",t:"The sacramental marriage of baptised persons, ratified and consummated, is indissoluble by any human power.",note:"De fide (Trent, Session 24, canon 7, as commonly understood)",src:"Trent, Session 24; CIC c. 1141; SCG III.123",lesson:"t16",obj:"Matthew 19:9 allows divorce for adultery."},
 {id:"th27",t:"The one Church of Christ subsists in the Catholic Church, though elements of sanctification and truth exist outside its visible structure.",note:"Doctrinal teaching of Vatican II",src:"Lumen Gentium 8; Unitatis Redintegratio 3; CDF Responses (2007)",lesson:"t14",obj:"The Church of Christ is the invisible sum of all believers."},
 {id:"th28",t:"The Roman Pontiff, when he defines ex cathedra a doctrine of faith or morals to be held by the whole Church, is infallible.",note:"De fide definita",src:"Vatican I, Pastor Aeternus ch. 4 (1870)",lesson:"t14",obj:"Popes have erred (e.g. Honorius)."},
 {id:"th29",t:"Immediately after death the soul is judged; the purified enter the vision of God; those in need of purification are purified; those dying in mortal sin are punished eternally.",note:"De fide definita",src:"Benedictus Deus (1336); Florence (1439); Lateran IV",lesson:"t15",obj:"An infinite punishment for a finite sin is unjust."},
 {id:"th30",t:"The dead will rise with their own bodies at the end of time.",note:"De fide definita",src:"Apostles' Creed; Lateran IV; CCC 988–1004",lesson:"t15",obj:"The matter of our bodies is dispersed and becomes part of other bodies."},
 {id:"th31",t:"Prayer is fitting because God has disposed that certain effects be obtained through it.",note:"Sententia communis",src:"ST II-II q.83 a.2",lesson:"t9a",obj:"God's will is unchangeable, so prayer is useless."},
 {id:"th32",t:"The perfection of the Christian life consists essentially in charity, and all are called to it.",note:"Sententia certa; universal call taught by Vatican II",src:"ST II-II q.184 a.3; Lumen Gentium 40",lesson:"t9",obj:"Perfection belongs only to those under vows."},
 {id:"th33",t:"The cardinal virtues are four, connected through prudence, and perfected by charity.",note:"Sententia communis",src:"ST I-II q.61 a.2; q.65 aa.1–2",lesson:"t8",obj:"There are many more virtues than four."}
];

const EXAM_AREAS={f:"Philosophy (Year 0)",t1:"Fundamental & dogmatic I",t2:"Moral & spiritual",t3:"Christ, Church, sacraments, last things",p:"Integration"};
function examArea(k){k=(LESSONS[k]&&LESSONS[k].mod)||k;if(k[0]==="f")return "f";if(k[0]==="p")return "p";if(["t1","t2","t2b","t3","t4","t5","t9a"].includes(k))return "t1";if(["t6","t7","t8","t9","t10","t16a"].includes(k))return "t2";return "t3";}

Object.assign(LESSONS,{
t17:{id:"t17",code:"T17 · Capstone",title:"Synthesis and the comprehensive examination",
 outcomes:["Explain the architecture of the Summa as a whole (exitus–reditus) and place each module within it.","Assign and justify theological notes to propositions.","Structure a thesis defence: status of the question, adversaries, note, proofs, objections.","Sit a comprehensive written examination across all modules.","Defend a thesis orally under questioning."],
 prereq:["theological-note","tesario","quaestio","article-faith"],
 reading:{primary:[["ST I q.2, prologue (the plan of the Summa)",NA("1002.htm")],["ST I-II prologue; ST III prologue",NA("2001.htm")],["Vatican I, Dei Filius (1870), chs. 2–4","https://www.papalencyclicals.net/councils/ecum20.htm"],["CCC 88–95 (dogma and hierarchy of truths)",'https://www.vatican.va/archive/ENG0015/__P10.HTM']],
  secondary:["Ott, L. (1952) Fundamentals of Catholic Dogma. Cork: Mercier Press (Introduction §8 on theological notes).","Chenu, M.-D. (1964) Toward Understanding Saint Thomas. Chicago: Regnery (on the plan of the Summa).","Torrell, J.-P. (2005) Aquinas's Summa: Background, Structure, and Reception. Washington, DC: CUA Press.","Garrigou-Lagrange, R. (1950) Reality: A Synthesis of Thomistic Thought. St Louis: Herder."]},
 scripture:[["John 1:1–18, the Word goes out and returns to the Father","j1-1"]],
 sections:[
 {id:"s1",h:"1. The architecture of the Summa: going out and returning",html:`<p>Thomas states his plan at the start of I q.2: \"the chief aim of sacred doctrine is to teach the knowledge of God, not only as He is in Himself, but also as He is the beginning of things and their last end, and especially of rational creatures\". So he treats (1) God, (2) the rational creature's advance towards God, (3) Christ, who \"as man, is our way to God\".</p>
<p>M.-D. Chenu read this as a circle of <em>exitus</em> (going out from God: Part I) and <em>reditus</em> (return to God: Part II), with Christ as the way of return (Part III). Torrell and others accept the pattern with nuances.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Part of the Summa</th><th>Theme</th><th>Modules</th></tr></thead><tbody>
<tr><td>I qq.1–43</td><td>Sacred doctrine; God one and three</td><td>F1, T1, T3, T4</td></tr>
<tr><td>I qq.44–119</td><td>Creation, angels, man, providence</td><td>F5, T5</td></tr>
<tr><td>I-II</td><td>Happiness, human acts, passions, virtue, law, grace</td><td>F7, T6, P3</td></tr>
<tr><td>II-II</td><td>Theological and cardinal virtues; states of life</td><td>T7, T8, T9, T9a</td></tr>
<tr><td>III</td><td>Christ, sacraments; (Suppl.) last things</td><td>T11–T13, T15</td></tr></tbody></table></div>`,
  check:Q("In Chenu's reading, Part II of the Summa corresponds to…",[["exitus: going out from God","Part I."],["reditus: the return of the rational creature to God","Correct."],["the sacraments","Part III."]],1)},
 {id:"s2",h:"2. Theological notes: how certain is it?",html:`<p>A competent theologian states not only what the Church teaches but with what authority. The traditional notes (Ott, 1952, §8):</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Note</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td>De fide divina et catholica definita</td><td>Revealed and solemnly defined</td><td>Two natures in Christ (Chalcedon)</td></tr>
<tr><td>De fide (divina et catholica)</td><td>Revealed and taught by the ordinary universal Magisterium</td><td>Existence of angels</td></tr>
<tr><td>Fidei proxima</td><td>Very close to faith, not yet definitively proposed</td><td>Historically, several later-defined doctrines</td></tr>
<tr><td>Sententia theologice certa</td><td>Necessarily connected with revealed truth</td><td>The Trinity cannot be proved by reason</td></tr>
<tr><td>Sententia communis</td><td>Commonly held by theologians, freely debatable</td><td>Charity as form of the virtues</td></tr>
<tr><td>Sententia probabilis</td><td>Well-grounded opinion</td><td>The Incarnation's motive (Thomist vs Scotist)</td></tr></tbody></table></div>
<p>CCC 90 speaks of a \"hierarchy of truths\", since doctrines differ in their relation to the foundation of the faith, which is not the same as their degree of certainty.</p>`,
  check:Q("\"Christ is one person in two natures\" carries which note?",[["Sententia probabilis","No."],["De fide divina et catholica definita","Correct: Chalcedon."],["Sententia communis","No."]],1)},
 {id:"s3",h:"3. How to defend a thesis",html:`<p>The classical structure of a thesis in a pontifical examination:</p>
<ol><li><strong>Status quaestionis:</strong> what exactly is asserted; define each term.</li>
<li><strong>Adversaries:</strong> who denied it and why (historical and contemporary).</li>
<li><strong>Theological note:</strong> its degree of certainty, with the document.</li>
<li><strong>Proof from Scripture:</strong> key texts, read in their literal sense (T2).</li>
<li><strong>Proof from Tradition and Magisterium:</strong> Fathers, councils, popes.</li>
<li><strong>Theological reasoning:</strong> above all Thomas's argument, and fittingness.</li>
<li><strong>Objections and replies:</strong> at least two, in their strongest form.</li></ol>
<div class="co hook"><div class="co-h">Memory hook</div><p>\"S-A-N-S-T-R-O\": Status, Adversaries, Note, Scripture, Tradition, Reason, Objections.</p></div>`,
  check:Q("The \"status quaestionis\" of a thesis is…",[["the conclusion","No."],["a precise statement of what is asserted, with terms defined","Correct."],["the list of sources","No."]],1)},
 {id:"s4",h:"4. Synthesis: how the modules connect",html:`<p>Five threads run through the whole course:</p>
<ol><li><strong>Act and potency</strong> (F3–F4) → God as pure act (T3) → grace as perfecting nature (T6) → sacraments as instruments (T13).</li>
<li><strong>Person and relation</strong> (T4) → hypostatic union (T11) → Mary as Theotokos (T12) → the Church as body of a person (T14).</li>
<li><strong>The last end</strong> (F7) → human acts and virtue (T6–T8) → states of life (T9) → beatific vision (T15).</li>
<li><strong>Faith and reason</strong> (F1, T1) → proofs and their limits (T3, T4, T5) → apologetics (A1) → integration with psychology (P1–P4).</li>
<li><strong>Word and sign</strong> (T2, T2b) → liturgy (T16a) → sacraments (T13) → law serving salvation (T16).</li></ol>`,
  check:Q("Which thread links God as pure act to the sacraments as instruments?",[["Person and relation","No."],["Act and potency (and causality)","Correct."],["Word and sign","Related, but not this link."]],1)},
 {id:"s5",h:"5. Preparing for the comprehensive examination",html:`<ol><li><strong>Review the tesario</strong> below: for each thesis, sketch S-A-N-S-T-R-O in 10 lines.</li>
<li><strong>Sit the written exam</strong>: 50 questions drawn across all modules, scored by area. Pass mark 70%.</li>
<li><strong>Write one full thesis defence</strong> (about 1,500 words, Harvard references) and mark it with the rubric.</li>
<li><strong>Practise the oral exam</strong>: draw a thesis at random and answer the examiner's three questions aloud, timing yourself at 15 minutes.</li></ol>
<div class="co extra"><div class="co-h">Honesty about this course</div><p>This is a structured study course modelled on a pontifical first cycle. It is not an ecclesiastical degree and carries no academic credit. Its value lies in the reading you do and the arguments you master.</p></div>`,
  check:Q("What is the pass mark for the written comprehensive exam here?",[["50%","No."],["70%","Correct."],["90%","No."]],1)}
 ],
 quiz:[
  Q("Thomas says sacred doctrine teaches God as he is in himself and as…",[["a philosopher's idea","No."],["the beginning of things and their last end","Correct: I q.2 prol."],["a moral example","No."],["a symbol","No."]],1,"ST I q.2 prol.",{bloom:"Remember",terms:["theological-note"],diff:1}),
  Q("Part III of the Summa treats Christ as…",[["Creator only","No."],["our way to God","Correct."],["a philosopher","No."],["an angel","No."]],1,"ST I q.2 prol.",{bloom:"Remember",terms:[],diff:1}),
  Q("A \"sententia communis\" is…",[["a defined dogma","No."],["an opinion commonly held by theologians, still debatable","Correct."],["heresy","No."],["a canon law","No."]],1,"Ott §8",{bloom:"Understand",terms:["theological-note"],diff:1}),
  Q("The existence of angels is…",[["sententia probabilis","No."],["de fide (Lateran IV)","Correct."],["a pious opinion","No."],["condemned","No."]],1,"Lateran IV",{bloom:"Remember",terms:["theological-note"],diff:2}),
  Q("The immortality of the soul was defined at…",[["Lateran V (1513)","Correct."],["Nicaea","No."],["Vatican II","No."],["Trent","No."]],0,"Lateran V",{bloom:"Remember",terms:[],diff:2}),
  Q("The soul as form of the body was defined at…",[["Vienne (1312)","Correct."],["Florence","No."],["Ephesus","No."],["Vatican I","No."]],0,"Vienne",{bloom:"Remember",terms:[],diff:2}),
  Q("CCC 90's \"hierarchy of truths\" concerns…",[["degrees of certainty","Different from that."],["the relation of doctrines to the foundation of the faith","Correct."],["Church offices","No."],["canon law","No."]],1,"CCC 90",{bloom:"Analyse",terms:["theological-note"],diff:3}),
  Q("In S-A-N-S-T-R-O, \"A\" stands for…",[["Arguments","No."],["Adversaries","Correct."],["Authorities","No."],["Analogies","No."]],1,"Thesis method",{bloom:"Remember",terms:["tesario"],diff:1}),
  Q("Which thesis carries only the note \"sententia probabilis\" in this course?",[["The motive of the Incarnation (Thomist vs Scotist)","Correct."],["Transubstantiation","De fide."],["Papal infallibility","De fide."],["The Trinity","De fide."]],0,"Ott §8; ST III q.1 a.3",{bloom:"Apply",terms:["theological-note"],diff:3}),
  Q("Chenu's exitus–reditus reading places Christ as…",[["the end of exitus","No."],["the way of return to God","Correct."],["outside the plan","No."],["only in Part I","No."]],1,"Chenu (1964)",{bloom:"Understand",terms:[],diff:2})
 ],
 construct:{q:"Whether sacred doctrine is one science? (capstone version)",ref:"ST I q.1 a.3",
  model:{obj:"It seems not: it treats both God and creatures, which are of different kinds; and it treats both doctrine and morals, which belong to different sciences.",sc:"Scripture speaks of it as one: \"She gave him the knowledge of holy things\" (Wis 10:10).",resp:"The unity of a power or habit comes from its formal object. Sacred doctrine considers all things under one formal aspect: as divinely revealed. So whatever is revealable falls under it, and it is one science, though it treats God, creatures, doctrine and morals.",rep:"Sacred doctrine treats creatures not in themselves but as referred to God, their beginning and end; so its unity is preserved."},
  rubric:["Objection: diversity of subject matter.","Sed contra: Wis 10:10.","Respondeo: unity from the formal object.","Respondeo: everything under the aspect of the revealable.","Reply: creatures as referred to God."]},
 drill:{title:"Order the parts of a thesis defence",parts:["Status quaestionis and definitions","Adversaries","Theological note","Proofs from Scripture, Tradition and reason","Objections and replies"]},
 connections:`<p><strong>The whole course.</strong> Use the five threads in section 4 to review. Your transcript (Progress page) records each module's best quiz score and your comprehensive exam.</p><p><strong>Your vocation.</strong> As a future clinical psychologist and Thomist, the integration track (P1–P4) and the apologetics track show how the Academy's theology works outside the classroom.</p>`,
 extraHTML:()=>`<section id="exam"><h2>The comprehensive examination</h2>
   <div class="seg" role="group" aria-label="Examination part" style="margin-bottom:12px"><button data-xtab="tesario" aria-pressed="true">Tesario</button><button data-xtab="written" aria-pressed="false">Written exam</button><button data-xtab="essay" aria-pressed="false">Thesis defence</button><button data-xtab="oral" aria-pressed="false">Oral simulator</button></div>
   <div id="xbox"></div></section>`,
 afterRender:(v)=>renderExamTab("tesario")}
});
shuffleLesson(LESSONS.t17);
setKey("T17","t17");
Object.assign(LESSON_IMG,{t17:"four-doctors"});Object.assign(LESSON_IMG2,{t17:"thomas-trent"});
Object.assign(EXTRAS,{t17:{plain:{version:"The capstone ties the course together. Learn how certain each teaching is, how to structure a defence of a thesis, and test yourself across every module in writing and orally.",question:"Can I explain and defend the whole faith, in order, with the right degree of certainty?",one:"Know what, how certain, why, and against whom."},
 hook:"\"S-A-N-S-T-R-O\".",
 analogy:{title:"The cathedral tour",text:"A good guide knows every chapel and also the plan of the whole building. The capstone is learning the plan."},
 sort:{title:"Which theological note?",cats:["De fide definita","Sententia communis","Sententia probabilis"],items:[["Two natures in Christ",0],["Charity as form of the virtues",1],["The Incarnation would not have occurred without sin",2],["Transubstantiation",0]]}}});
Object.assign(DEPTH,{t17:{cases:[["The examiner's trap","An examiner asks: \"Is it de fide that the world cannot be eternal?\" Answer: it is de fide that the world began (Lateran IV); it is Thomas's opinion that this cannot be demonstrated; it is not de fide that an eternal world is impossible."],["Over-claiming","A student calls charity as form of the virtues \"dogma\". Correct the note: sententia communis."],["Under-claiming","Another calls transubstantiation \"a theory\". Correct: de fide definita (Lateran IV, Trent)."]],
 allegory:["The jeweller's scale","A jeweller weighs each stone exactly; overvaluing and undervaluing are both dishonest. Theological notes weigh doctrines honestly."],
 slow:{title:"ST I q.2, prologue: the plan of the Summa",steps:[["The chief aim of sacred doctrine is to teach the knowledge of God.","Theology is about God first."],["Not only as he is in himself, but as the beginning of things and their last end, especially of rational creatures.","Hence the circle: from God, back to God."],["So we treat: (1) God; (2) the rational creature's advance towards God; (3) Christ, who as man is our way to God.","The three parts."],["Within (1): the divine essence, the distinction of persons, and the procession of creatures.","The structure of Part I."]]},
 confusions:[["Is every sentence in the Summa dogma?","No: Thomas's arguments carry the weight of their reasons; only what the Church defines is dogma."]],
 further:[["Torrell, J.-P. (2005) Aquinas's Summa: Background, Structure, and Reception.","Short guide to how the Summa is built."],["Ott, L. (1952) Fundamentals of Catholic Dogma.","The classic manual giving theological notes for every thesis; use alongside the tesario."]]}});

// ---------- Examination engine ----------
let xCur=null;
function renderExamTab(tab){
  S.exam=S.exam||{best:null,attempts:[],essays:{},oral:{}};
  $$("[data-xtab]").forEach(b=>{b.setAttribute("aria-pressed",b.dataset.xtab===tab);b.onclick=()=>renderExamTab(b.dataset.xtab);});
  const box=$("#xbox"); if(!box) return;
  if(tab==="tesario"){
    box.innerHTML=`<p>${THESES.length} theses covering the whole course. Click a module code to revise it.</p><div class="tablewrap"><table class="t stackm"><thead><tr><th>#</th><th>Thesis</th><th>Note</th><th>Module</th></tr></thead><tbody>${THESES.map((t,i)=>`<tr><td>${i+1}</td><td>${esc(t.t)}<div class="muted ui" style="font-size:.75rem">${esc(t.src)}</div></td><td class="ui" style="font-size:.8rem">${esc(t.note)}</td><td>${LESSONS[t.lesson]?`<a href="#lesson-${t.lesson}">${esc(LESSONS[t.lesson].code.split(" ")[0])}</a>`:esc(t.lesson)}</td></tr>`).join("")}</tbody></table></div>`;
  } else if(tab==="written"){
    const best=S.exam.best;
    box.innerHTML=`<div class="co core"><div class="co-h">Written comprehensive examination</div><p>50 questions drawn at random from every module's quiz, balanced across areas. No notes. Suggested time: 75 minutes. Pass mark: 70%.</p>${best!=null?`<p><strong>Your best: ${Math.round(best*100)}%</strong> (${S.exam.attempts.length} attempt${S.exam.attempts.length===1?"":"s"})</p>`:""}<div class="row"><button class="primary" id="xstart">Start a new examination</button></div></div><div id="xpaper"></div>`;
    $("#xstart").onclick=startExam;
  } else if(tab==="essay"){
    const sel=S.exam.essaySel||THESES[0].id, T=THESES.find(t=>t.id===sel), saved=S.exam.essays[sel]||{text:"",rub:[]};
    const rub=["States the thesis precisely and defines its terms","Names the adversaries and their reasons","Gives the correct theological note with its source","Proves from Scripture in its literal sense","Proves from Tradition and the Magisterium","Gives Thomas's theological argument","States and answers at least two objections in their strongest form","Uses Harvard references accurately"];
    box.innerHTML=`<label class="label" for="xsel">Choose a thesis</label><select id="xsel">${THESES.map((t,i)=>`<option value="${t.id}" ${t.id===sel?"selected":""}>${i+1}. ${esc(t.t.slice(0,90))}${t.t.length>90?"…":""}</option>`).join("")}</select>
     <div class="co def" style="margin-top:12px"><div class="co-h">Thesis</div><p>${esc(T.t)}</p><p class="ui muted" style="font-size:.8rem">Note: ${esc(T.note)} · ${esc(T.src)}</p></div>
     <label class="label" for="xtext">Your defence (aim for about 1,500 words)</label><textarea id="xtext" style="min-height:320px">${esc(saved.text)}</textarea><p class="ui muted" style="font-size:.78rem" id="xwc"></p>
     <div class="co check"><div class="co-h">Marking rubric (tick honestly)</div>${rub.map((r,i)=>`<label style="display:block;font-weight:400"><input type="checkbox" data-rub="${i}" ${saved.rub&&saved.rub[i]?"checked":""}> ${esc(r)}</label>`).join("")}<p id="xrubscore" class="ui" style="font-size:.85rem"></p></div>`;
    const wc=()=>{const n=($("#xtext").value.trim().match(/\S+/g)||[]).length;$("#xwc").textContent=n+" words";};
    const rs=()=>{const n=$$("[data-rub]").filter(c=>c.checked).length;$("#xrubscore").textContent=`${n} of ${rub.length} criteria met${n>=6?": a pass standard.":"."}`;};
    $("#xsel").onchange=e=>{S.exam.essaySel=e.target.value;save();renderExamTab("essay");};
    $("#xtext").oninput=()=>{S.exam.essays[sel]=Object.assign(S.exam.essays[sel]||{},{text:$("#xtext").value});save();wc();};
    $$("[data-rub]").forEach(c=>c.onchange=()=>{const r=$$("[data-rub]").map(x=>x.checked);S.exam.essays[sel]=Object.assign(S.exam.essays[sel]||{},{rub:r});save();rs();});
    wc();rs();
  } else {
    const T=THESES[Math.floor(Math.random()*THESES.length)];
    box.innerHTML=`<div class="co stance"><div class="co-h">Oral examination · 15 minutes</div><p><strong>Your thesis:</strong> ${esc(T.t)}</p><ol><li>Define the key terms and state the thesis precisely.</li><li>What is its theological note, and on what document does it rest?</li><li>The examiner objects: <em>\"${esc(T.obj)}\"</em> Answer.</li></ol><div class="row"><button id="xtimer">Start 15-minute timer</button><span id="xtime" class="tabular ui"></span><button class="ghost" id="xredraw">Draw another thesis</button></div></div>
     <details class="explain"><summary>Reveal what a good answer contains</summary><p><strong>Note:</strong> ${esc(T.note)}. <strong>Sources:</strong> ${esc(T.src)}. <strong>Revise:</strong> ${LESSONS[T.lesson]?`<a href="#lesson-${T.lesson}">${esc(LESSONS[T.lesson].title)}</a>`:""}, especially the \"Construct the article\" and \"Go deeper\" sections.</p></details>`;
    $("#xredraw").onclick=()=>renderExamTab("oral");
    $("#xtimer").onclick=()=>{let s=900;clearInterval(window._xt);const t=$("#xtime");const tick=()=>{t.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;if(s--<=0){clearInterval(window._xt);t.textContent="Time.";}};tick();window._xt=setInterval(tick,1000);};
  }
}
function startExam(){
  const pool={};Object.entries(LESSONS).forEach(([k,L])=>{if(k==="t17")return;L.quiz.forEach((q,i)=>{(pool[k]=pool[k]||[]).push({k,i,q});});});
  const keys=Object.keys(pool);const per=Math.max(1,Math.floor(50/keys.length));let picked=[];
  keys.forEach(k=>{const arr=pool[k].slice().sort(()=>Math.random()-.5);picked.push(...arr.slice(0,per));});
  const rest=keys.flatMap(k=>pool[k]).filter(x=>!picked.includes(x)).sort(()=>Math.random()-.5);
  picked=picked.concat(rest).slice(0,50).sort(()=>Math.random()-.5);
  xCur={items:picked,ans:{}};
  const paper=$("#xpaper");
  paper.innerHTML=`<p class="ui muted" style="font-size:.85rem" id="xprog">0 of ${picked.length} answered</p>${picked.map((x,n)=>`<div class="quiz-q"><p style="margin:0"><strong>${n+1}.</strong> ${esc(x.q.prompt)} <span class="chip">${esc(LESSONS[x.k].code.split(" ")[0])}</span></p><div class="opts" data-xq="${n}">${x.q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o[0])}</button>`).join("")}</div></div>`).join("")}<div class="row" style="margin-top:14px"><button class="primary" id="xsubmit">Submit examination</button></div><div id="xresult"></div>`;
  $$("[data-xq]",paper).forEach(box=>$$(".opt",box).forEach(b=>b.onclick=()=>{const n=+box.dataset.xq;xCur.ans[n]=+b.dataset.i;$$(".opt",box).forEach(o=>o.setAttribute("aria-pressed",o===b));$$(".opt",box).forEach(o=>o.style.borderColor=o===b?"var(--accent)":"");$("#xprog").textContent=`${Object.keys(xCur.ans).length} of ${picked.length} answered`;}));
  $("#xsubmit").onclick=()=>{
    const by={};let right=0;
    xCur.items.forEach((x,n)=>{const a=examArea(x.k);by[a]=by[a]||[0,0];by[a][1]++;const ok=xCur.ans[n]===x.q.ans;if(ok){right++;by[a][0]++;}
      const box=$(`[data-xq="${n}"]`);$$(".opt",box).forEach((o,i)=>{o.disabled=true;if(i===x.q.ans)o.classList.add("right");else if(i===xCur.ans[n])o.classList.add("wrong");});});
    const p=right/xCur.items.length;S.exam.attempts.push({d:Date.now(),p,by});S.exam.best=Math.max(S.exam.best||0,p);S.quiz.t17=Math.max(S.quiz.t17||0,p);save();
    $("#xresult").innerHTML=`<div class="panel" style="margin-top:14px"><div class="row"><div class="score tabular">${right}/${xCur.items.length}</div><div><strong>${p>=.7?"Pass.":"Not yet at 70%."}</strong> <span class="muted">${Math.round(p*100)}%</span></div></div><div class="tablewrap" style="margin-top:10px"><table class="t"><thead><tr><th>Area</th><th>Score</th></tr></thead><tbody>${Object.entries(by).map(([a,[r,t]])=>`<tr><td>${esc(EXAM_AREAS[a])}</td><td class="tabular">${r}/${t} (${Math.round(r/t*100)}%)</td></tr>`).join("")}</tbody></table></div><p class="muted" style="font-size:.88rem">Correct answers are marked in green above. Revise your weakest area, then sit the exam again: questions are drawn afresh each time.</p></div>`;
    $("#xresult").scrollIntoView({behavior:"smooth"});};
}
