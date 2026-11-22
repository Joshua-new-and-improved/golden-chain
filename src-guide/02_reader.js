if(typeof document!=="undefined")document.documentElement.lang="en";
// ---------- Canon & coverage (Section 2.2 of the Phase 1 report) ----------
const CANON = [
 ["Old Testament — Pentateuch",["Genesis","Exodus","Leviticus","Numbers","Deuteronomy"]],
 ["Old Testament — Historical",["Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Tobit","Judith","Esther","1 Maccabees","2 Maccabees"]],
 ["Old Testament — Wisdom",["Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Wisdom","Sirach"]],
 ["Old Testament — Prophets",["Isaiah","Jeremiah","Lamentations","Baruch","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi"]],
 ["New Testament — Gospels & Acts",["Matthew","Mark","Luke","John","Acts"]],
 ["New Testament — Pauline",["Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews"]],
 ["New Testament — Catholic Epistles & Revelation",["James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]]
];
const COVER = {
 "Matthew":["thomas","Lectura super Matthaeum (reportatio) + Catena"],
 "John":["thomas","Lectura super Ioannem (reportatio, Reginald) + Catena"],
 "Mark":["catena","Golden Chain (Catena aurea) + Haydock + Fathers"], "Luke":["catena","Golden Chain (Catena aurea) + Haydock + Fathers"],
 "Job":["thomas","Expositio super Iob ad litteram"],
 "Psalms":["thomas","Postilla super Psalmos: Pss 1–54 only (Vulgate numbering)"],
 "Isaiah":["thomas","Super Isaiam (cursory exposition)"],
 "Jeremiah":["thomas","Super Ieremiam: chs 1–42 only"],
 "Lamentations":["thomas","Super Threnos (cursory)"],
 "Song of Songs":["none","Thomas's reported deathbed commentary is lost; printed ones under his name are inauthentic"],
 "1 Corinthians":["thomas","1 Cor 7:10b–10:33 lost; editions supply Peter of Tarentaise"]
};
["Romans","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews"].forEach(b=>COVER[b]=["thomas","Super Epistolas S. Pauli"+(b==="Romans"?" (revised expositio)":" (reportatio)")]);
function cover(b){return COVER[b]||["none","Haydock and the Fathers on every verse; no commentary by Thomas"];}

const READING_PATHS = [
 {n:1,title:"John 1–6 with Thomas",pair:"Christology through Scripture; pairs with T4, T11",status:"Thomas's lectures summarised, with the Golden Chain",h:"#read-john-1-1"},
 {n:2,title:"Matthew 5–7: the Sermon on the Mount",pair:"Beatitudes and the New Law; ST I-II qq.106–108",status:"Golden Chain, Haydock and the Fathers on every verse",h:"#read-matthew-5-1"},
 {n:3,title:"Romans 1–8",pair:"Grace, justification, law; ST I-II qq.90–114",status:"Haydock and the Fathers; Thomas's lectures linked",h:"#read-romans-1-1"},
 {n:4,title:"Job",pair:"Providence and suffering; ST I q.22, q.103",status:"Haydock and Gregory the Great's Morals",h:"#read-job-1-1"},
 {n:5,title:"Psalms 1–54",pair:"Prayer; ST II-II q.83",status:"Augustine on every psalm, with Haydock",h:"#read-psalms-1-1"},
 {n:6,title:"Hebrews",pair:"The priesthood of Christ; ST III q.22",status:"Chrysostom's homilies and Haydock",h:"#read-hebrews-1-1"}
];


const FATHERS = {
 augustine:{name:"Augustine of Hippo",dates:"354–430",bio:"Bishop of Hippo in North Africa (modern Algeria). His Tractates on John are the Latin Fathers' chief commentary on this Gospel and Thomas's most-cited source in it."},
 chrysostom:{name:"John Chrysostom",dates:"c. 349–407",bio:"Preacher at Antioch, then Archbishop of Constantinople. His Homilies on John give the Antiochene stress on the literal sense."},
 hilary:{name:"Hilary of Poitiers",dates:"c. 310–367",bio:"Bishop in Gaul, defender of Nicaea against the Arians. His De Trinitate reads John 1 as proof of the Son's full divinity."},
 origen:{name:"Origen of Alexandria",dates:"c. 185–c. 254",bio:"Alexandrian scholar and the first great Christian exegete. Some of his views were later rejected, so Thomas uses him selectively."},
 bede:{name:"Bede the Venerable",dates:"673–735",bio:"English monk of Jarrow, historian and commentator; transmits the Latin patristic tradition."},
 alcuin:{name:"Alcuin of York",dates:"c. 735–804",bio:"Scholar at Charlemagne's court; his commentary on John draws heavily on Augustine."},
 theophylact:{name:"Theophylact of Ohrid",dates:"c. 1055–after 1107",bio:"Byzantine archbishop in Bulgaria; his commentaries condense Chrysostom."},
 basil:{name:"Basil the Great",dates:"c. 330–379",bio:"Bishop of Caesarea in Cappadocia; with the two Gregorys, shaped the doctrine of the Trinity."},
 gregory:{name:"Gregory the Great",dates:"c. 540–604",bio:"Pope from 590; his homilies and Moralia on Job were standard medieval reading."},
 cyril:{name:"Cyril of Alexandria",dates:"c. 376–444",bio:"Patriarch of Alexandria; led the Council of Ephesus (431) against Nestorius in defence of Christ's single person."},
 ephesus:{name:"Council of Ephesus",dates:"431",bio:"Third ecumenical council; affirmed that Mary is Theotokos, Mother of God, because her son is one divine person."},
 gloss:{name:"The Gloss",dates:"12th c.",bio:"The Glossa ordinaria: the standard medieval marginal and interlinear commentary on the Bible."}
};

const SENSE = {lit:"Literal",all:"Allegorical",mor:"Moral",ana:"Anagogical"};
const NA = q => "https://www.newadvent.org/summa/"+q; // Dominican translation (PD), New Advent
function st(part,q,a){const p={I:"1","I-II":"2","II-II":"3",III:"4"}[part];return {label:`ST ${part} q.${q}${a?` a.${a}`:""}`,url:NA(p+String(q).padStart(3,"0")+".htm"+(a?"#article"+a:""))};}
const CCC = n => ({label:"CCC "+n,url:"https://www.vatican.va/archive/ENG0015/_INDEX.HTM"});

// ---------- Commentary units for John 1:1–18 (AI-written summaries of Thomas, Super Ioan. cap. 1) ----------
// lect: lecture number in Super Ioannem; verified=true where checked against the paragraph map (lect.1 = 1:1–2, nn.23–59; lect.2 = 1:2–4a, from n.60).
const UNITS = [
 {id:"j1-1", v:[1,2], lect:"cap. 1, lect. 1 (nn. 23–59)", verified:true, senses:["lit"],
  beginner:"John opens by stating who Jesus is before telling us anything he did. The Son is God's Word: he always existed, he is distinct from the Father, and he is fully God.",
  divisio:"Thomas reads verses 1–2 as four short answers about the Word: when he was (\"in the beginning\"), where (\"with God\"), what he is (\"was God\"), and in what way (verse 2 joins the three together).",
  literal:[
   "\"Word\" (Verbum) names the Son by analogy with the human mind. When we understand something, the mind forms an inner word or concept before any spoken word. God, knowing himself, utters one perfect inner Word, equal to himself and of the same nature.",
   "\"Was\" (erat), not \"was made\", signals that the Word has no beginning in time. It excludes those who said Christ began to exist with Mary (Thomas names Ebion and Cerinthus).",
   "\"With God\" (apud Deum) signals a real distinction of persons. It excludes Sabellius, who made Father and Son one person under two names.",
   "\"The Word was God\" signals equality of nature. It excludes Arius, who made the Son a creature, however exalted."],
  spiritual:[],
  scholar:"Thomas weighs several senses of principium (\"beginning\"). On one reading it names the Father, in whom the Son is as from a principle without being later than him; on another it means simply \"before all things\". The doctrine is worked out systematically at ST I q.27 (procession), q.34 (the name Word) and q.42 a.2 (the Son coeternal).",
  latin:["Verbum","principium","erat","apud Deum"],
  summa:[st("I",34,1),st("I",27,1),st("I",42,2)], ccc:["241","291"], lessons:["T4 De Deo Trino","F1 How to study theology"]},
 {id:"j1-3", v:[3], lect:"cap. 1, lect. 2 (from n. 60)", verified:true, senses:["lit"],
  beginner:"Everything that exists came to be through the Word. So the Word himself is not one of the things made.",
  divisio:"Thomas takes the verse in two halves: \"all things were made by him\" states the Word's universal causality; \"without him was made nothing\" closes off every exception.",
  literal:[
   "If all things were made through the Word, the Word is not among the things made. This is a further argument against Arius.",
   "\"Through\" (per) does not make the Word a lesser instrument of the Father. It names him as the Father's art or wisdom by which the work is done, as a builder works through the plan in his mind.",
   "\"Without him nothing was made\" excludes any second creator. Thomas has in view the Manichees, who ascribed the visible world to an evil principle.",
   "Sin is not \"made\" in this sense. Following Augustine, Thomas treats evil as a lack of due good, not a thing with its own being."],
  spiritual:[],
  scholar:"Creation is common to the whole Trinity, but is appropriated to the Son as Wisdom (ST I q.45 a.6). The reading of \"nothing\" as sin rests on the doctrine of evil as privation (ST I q.48 a.1).",
  latin:["per ipsum","nihil","ars"],
  summa:[st("I",45,6),st("I",48,1),st("I",15,1)], ccc:["291","311"], lessons:["T5 Creation, Angels, Providence"]},
 {id:"j1-4", v:[4,5], lect:"cap. 1, lect. 2–3", verified:false, senses:["lit","mor"],
  beginner:"The Word is life itself, and that life is the light by which human minds understand. Darkness here means minds that refuse that light.",
  divisio:"Thomas first settles how to punctuate verses 3–4, then explains \"life\", then \"light\", then the darkness that does not grasp it.",
  literal:[
   "The Latin can be divided two ways. Augustine reads \"what was made, in him was life\": creatures, as they exist in God's mind as exemplars, are life. Chrysostom ends the sentence at \"that was made\" and starts again: \"In him was life.\" Thomas sets out both.",
   "The Word's life is the light of men because human reason is a created share (participation) in the divine light.",
   "\"Shines in darkness\": the light is present even to minds darkened by error and sin, as the sun shines on the blind."],
  spiritual:["Moral sense: the darkness that \"did not comprehend\" is the person who turns from the truth. The cure lies in the will as much as the intellect."],
  scholar:"The doctrine that our agent intellect is a participated light is stated at ST I q.79 a.4 and q.84 a.5. The exemplar reading draws on the divine ideas, ST I q.15.",
  latin:["vita","lux hominum","tenebrae","comprehenderunt"],
  summa:[st("I",79,4),st("I",84,5),st("I",15,1)], ccc:["1704"], lessons:["F5 Philosophical Anthropology"]},
 {id:"j1-6", v:[6,7,8], lect:"cap. 1, lect. 4", verified:false, senses:["lit","mor"],
  beginner:"John the Baptist is sent to point to Christ. He is a witness to the light, not the light himself.",
  divisio:"Thomas notes the shift from the eternal Word to a man in history, then considers John's mission, his task as witness, and its purpose (\"that all might believe\").",
  literal:[
   "\"There was a man\" contrasts with \"In the beginning was the Word\": a creature who began, sent by another.",
   "Light does not need a witness for its own sake. The witness is for us, whose eyes are weak.",
   "John \"was not the light\" in the way the Word is. He was lit by it, like a lamp (compare John 5:35)."],
  spiritual:["Moral sense: every preacher and teacher is a witness, not the source. The goal is that others believe in Christ, not in the witness."],
  scholar:"On John's baptism and mission see ST III q.38. The idea of participated light ties back to verse 9.",
  latin:["missus","testimonium","lumen"],
  summa:[st("III",38,1)], ccc:["523","719"], lessons:["T2 Scripture & Thomistic Exegesis"]},
 {id:"j1-9", v:[9,10], lect:"cap. 1, lect. 5", verified:false, senses:["lit"],
  beginner:"Christ is the true light; every human mind that understands anything does so by a share in his light. Yet the world he made did not recognise him.",
  divisio:"Thomas treats the Word's dignity as \"true light\", then his presence in the world, then the world's failure to know him.",
  literal:[
   "\"True\" light is light by essence; John and the saints are light by participation.",
   "\"Every man coming into this world\": Thomas, with Augustine, reads it as \"every man who is enlightened is enlightened by him\". The natural light of reason itself comes from the Word.",
   "\"The world knew him not\": \"world\" here means those who love the world more than its maker, not creation as such."],
  spiritual:[],
  scholar:"Compare ST I q.84 a.5: we know truths \"in the eternal types\" because our intellectual light is a participated likeness of the uncreated light. The theme returns in ST I q.12 a.11 on whether anyone sees God's essence in this life.",
  latin:["lux vera","illuminat","mundus"],
  summa:[st("I",84,5),st("I",12,11)], ccc:["1704"], lessons:["T3 De Deo Uno"]},
 {id:"j1-11", v:[11,12,13], lect:"cap. 1, lect. 6", verified:false, senses:["lit","all"],
  beginner:"Many of his own people did not accept him. Those who do accept him in faith are made children of God, born not by human descent but from God.",
  divisio:"Thomas sets the rejection (v. 11) against the gift to those who receive him (v. 12), then explains the new birth (v. 13).",
  literal:[
   "\"His own\" are first the Jewish people, to whom he came as promised Messiah; more broadly all creatures, which belong to him.",
   "\"Receive him\" means by faith. To those he gives \"power to become sons of God\", which is adoption by grace, not natural sonship.",
   "\"Born... of God\" excludes every natural, bodily cause. This birth is spiritual and is given in baptism."],
  spiritual:["Allegorical sense: the passage from rejection by \"his own\" to welcome by believers prefigures the Church gathered from all nations."],
  scholar:"Adoption is treated at ST III q.23; grace as a created participation in the divine nature at ST I-II q.110 a.3. Only the eternal Son is Son by nature; we are sons by adoption (ST III q.23 a.4).",
  latin:["sui","potestatem","filios Dei","nati sunt"],
  summa:[st("III",23,1),st("III",23,4),st("I-II",110,3)], ccc:["460","1996"], lessons:["T6 Fundamental Moral (grace)"]},
 {id:"j1-14", v:[14], lect:"cap. 1, lect. 7", verified:false, senses:["lit","ana"],
  beginner:"The eternal Word became a real human being and lived among us. The apostles saw his glory: he is full of grace and truth.",
  divisio:"Thomas takes the verse in three parts: the Incarnation itself (\"made flesh\"), its manner (\"dwelt among us\"), and its evidence (\"we saw his glory\").",
  literal:[
   "\"Flesh\" stands for the whole human nature, body and rational soul. It is used to stress how low the Word stooped.",
   "Each word rules out an error. True \"flesh\" rules out a phantom body (Manichees). \"Flesh\" as whole humanity rules out a Christ without a human mind (Apollinaris). \"Was made\" rules out a mere indwelling in a separate human person (Nestorius).",
   "\"Was made\" does not mean the Word was changed into flesh. He took a human nature to himself while remaining what he was, which rules out a mixture of natures (Eutyches).",
   "\"Glory as of the only begotten\": the glory seen in his miracles and at the Transfiguration belongs to him as the natural Son."],
  spiritual:["Anagogical sense: the glory glimpsed now is a foretaste of the vision of God promised in heaven."],
  scholar:"The union in the person (hypostatic union) is treated at ST III q.2; the reality of Christ's body at III q.5; his fullness of grace at III q.7. CCC 464–469 restates the conciliar teaching (Ephesus 431, Chalcedon 451).",
  latin:["caro","factum est","habitavit","plenum gratiae et veritatis"],
  summa:[st("III",2,6),st("III",5,1),st("III",7,1)], ccc:["461","464"], lessons:["T11 Christology"]},
 {id:"j1-15", v:[15,16,17], lect:"cap. 1, lect. 8–10", verified:false, senses:["lit","all"],
  beginner:"John says Jesus, though he came after him, ranks above him because he existed first. From Christ's fullness we all receive grace.",
  divisio:"Thomas treats John's testimony (v. 15), then the fullness of grace we receive (v. 16), then the contrast of Law and grace (v. 17).",
  literal:[
   "\"He was before me\" refers to the Word's eternity, not to age: Jesus was born after John.",
   "\"Of his fullness we all have received\": Christ has grace as head of the Church, and it overflows to his members.",
   "\"Grace for grace\" can be read several ways: the grace of the New Law in place of the Old; or the grace of glory given in return for the grace of faith. Thomas sets out the readings."],
  spiritual:["Allegorical sense: Moses and the Law stand for the figure, Christ for the reality the figure pointed to."],
  scholar:"Christ's capital grace (gratia capitis): ST III q.8 a.1, and his fullness of grace: III q.7 a.9. The New Law as the grace of the Holy Spirit: ST I-II q.106 a.1.",
  latin:["plenitudo","gratia pro gratia","lex","veritas"],
  summa:[st("III",8,1),st("III",7,9),st("I-II",106,1)], ccc:["1965","1966"], lessons:["T6 Fundamental Moral (law)","T11 Christology"]},
 {id:"j1-18", v:[18], lect:"cap. 1, lect. 11", verified:false, senses:["lit","ana"],
  beginner:"No human being has ever seen God as he is. The Son, who is one with the Father, is the one who has made God known.",
  divisio:"Thomas gives the difficulty (no one has seen God), then the Son's qualification to reveal him (\"in the bosom of the Father\"), then the revelation itself (\"has declared him\").",
  literal:[
   "Seeing God can mean three things: through images (as the prophets saw), through an intellectual vision of his essence, or through comprehension, which means knowing him as fully as he can be known.",
   "No one in this mortal life sees God's essence by ordinary means. The blessed see it in heaven, but no creature ever comprehends God.",
   "\"In the bosom of the Father\" signifies the Son's sharing of the Father's nature and his intimate knowledge, which qualifies him to reveal."],
  spiritual:["Anagogical sense: the verse points forward to the promise that the blessed will see God \"face to face\" (1 Cor 13:12)."],
  scholar:"Vision of the divine essence: ST I q.12 a.1; that no created intellect comprehends God: I q.12 a.7; that no one sees it in this life: I q.12 a.11. On rapture (Paul) see II-II q.175 a.3.",
  latin:["nemo vidit","unigenitus","in sinu Patris","enarravit"],
  summa:[st("I",12,1),st("I",12,7),st("I",12,11)], ccc:["1028","151"], lessons:["T15 Eschatology (beatific vision)"]}
];
UNITS.push(
 {id:"j1-19", v:[19,20,21,22,23], lect:"cap. 1, lect. 12", verified:false, senses:["lit","mor"],
  beginner:"Officials from Jerusalem ask John who he is. He denies being the Christ, Elijah or \"the prophet\", and calls himself only a voice preparing the Lord's way.",
  divisio:"Thomas notes this is John's testimony before the authorities. He takes the three denials in turn, then John's positive description of himself from Isaiah 40:3.",
  literal:[
   "\"He confessed and did not deny\": John refuses honour that was not his. The people thought he might be the Christ, and he corrects them plainly.",
   "\"Art thou Elias?\" John is not Elijah in person. Christ later says John is Elijah (Matthew 11:14) in the sense of Luke 1:17: he comes \"in the spirit and power of Elias\". The two statements answer different questions.",
   "\"The prophet\" refers to the prophet like Moses promised in Deuteronomy 18:15, whom the Jews expected; that prophet is Christ.",
   "\"I am the voice\": a voice comes before the word it carries and passes away once the word is understood. So John comes before the Word and gives way to him."],
  spiritual:["Moral sense: John's humility is the pattern for every minister. The higher the honour offered, the more plainly he points away from himself."],
  scholar:"The fittingness of John's mission and baptism: ST III q.38 a.1. The voice–word theme is Augustine's (Sermo 293) and is carried by Thomas into his account of preaching as service of the Word.",
  latin:["confessus est","vox clamantis","propheta"],
  summa:[st("III",38,1)], ccc:["523","719"], lessons:["T2 Scripture & Thomistic Exegesis"]},
 {id:"j1-24", v:[24,25,26,27,28], lect:"cap. 1, lect. 13", verified:false, senses:["lit","all"],
  beginner:"The Pharisees ask why John baptizes. He answers that his baptism is only with water, and that someone far greater already stands among them.",
  divisio:"Thomas takes the question (why baptize?), then John's answer about his own baptism, then his witness to Christ's dignity, then the place.",
  literal:[
   "John's baptism did not give grace. It was a baptism of repentance that prepared people for Christ's baptism.",
   "\"There hath stood one in the midst of you\": Christ was already present among the people, unrecognised.",
   "\"Not worthy to loose the latchet of his shoe\": untying sandals was a slave's task. John confesses that he is below even the lowest service to Christ."],
  spiritual:["Allegorical sense (from Gregory, in the Catena): the shoe stands for Christ's humanity, which clothes his divinity; John cannot \"untie\" the mystery of the Incarnation."],
  scholar:"Whether John's baptism conferred grace: ST III q.38 a.3 (it did not). Its relation to Christian baptism: III q.38 a.6.",
  latin:["baptizo in aqua","medius vestrum","corrigiam calceamenti"],
  summa:[st("III",38,3),st("III",38,6)], ccc:["535","720"], lessons:["T13 Sacraments"]},
 {id:"j1-29", v:[29,30,31], lect:"cap. 1, lect. 14", verified:false, senses:["lit","all"],
  beginner:"John sees Jesus and says: here is the Lamb of God, who takes away the sin of the world. He also says he did not know him except through God's sign.",
  divisio:"Thomas treats the title \"Lamb of God\", the work it names (\"who taketh away the sin of the world\"), and John's statement \"I knew him not\".",
  literal:[
   "\"Lamb\" names Christ's innocence and his sacrifice. It recalls the Passover lamb and the servant led \"as a sheep to the slaughter\" (Isaiah 53:7).",
   "\"Of God\": not a lamb offered by human choice but given by God, and itself divine.",
   "\"Taketh away the sin\": Christ removes sin by the satisfaction of his Passion, offered for all.",
   "\"I knew him not\": the Fathers explain it in several ways. John knew Jesus, but not until the sign at the baptism did he know that the power of baptizing in the Spirit would remain with Christ himself (Augustine's reading)."],
  spiritual:["Allegorical sense: every lamb of the Old Law, above all the Passover lamb, was a figure of this Lamb."],
  scholar:"Christ's Passion as satisfaction: ST III q.48 a.2; as sacrifice: III q.48 a.3. The Passover lamb as a figure of Christ among the ceremonial precepts: I-II q.102 a.5.",
  latin:["Agnus Dei","tollit peccatum mundi","nesciebam eum"],
  summa:[st("III",48,2),st("III",48,3),st("I-II",102,5)], ccc:["608","613"], lessons:["T11 Christology"]},
 {id:"j1-32", v:[32,33,34], lect:"cap. 1, lect. 14", verified:false, senses:["lit","all"],
  beginner:"John testifies that he saw the Spirit come down on Jesus like a dove and stay on him. This sign told him Jesus is the one who baptizes with the Holy Spirit, the Son of God.",
  divisio:"Thomas takes the vision (the Spirit descending), the sign given to John beforehand, and the testimony that follows.",
  literal:[
   "The Spirit appears as a dove because of the qualities of the dove: gentleness, simplicity and fruitfulness, which fit the gifts the Spirit gives.",
   "\"Remained upon him\": in others the Spirit's gifts come and go, but Christ has the fullness of the Spirit permanently.",
   "\"He it is that baptizeth with the Holy Ghost\": Christ keeps for himself the power by which baptism gives grace, even when others minister it."],
  spiritual:["Allegorical sense: the dove recalls the dove of Noah's flood, bringing the sign of peace after the waters, as baptism brings peace after sin is washed away."],
  scholar:"The fittingness of the Spirit appearing as a dove: ST III q.39 a.6. Christ's \"power of excellence\" over the sacraments: III q.64 a.3–4.",
  latin:["sicut columbam","mansit super eum","baptizat in Spiritu Sancto"],
  summa:[st("III",39,6),st("III",64,3),st("III",64,4)], ccc:["536","1286"], lessons:["T13 Sacraments","T11 Christology"]},
 {id:"j1-35", v:[35,36], lect:"cap. 1, lect. 15", verified:false, senses:["lit","mor"],
  beginner:"The next day John points two of his own disciples to Jesus with the same words: Behold the Lamb of God.",
  divisio:"Thomas notes the shift from John's testimony to the crowds to his testimony to his own disciples, which leads to the call of the first apostles.",
  literal:[
   "John repeats \"Behold the Lamb of God\" so that his disciples will leave him for Christ.",
   "\"Walking\": Jesus is seen passing by, which Thomas takes as a sign of his coming among us in the flesh."],
  spiritual:["Moral sense: a good teacher's aim is to hand his students on to Christ, not to keep them for himself."],
  scholar:"On the end of John's baptism once Christ's baptism began: ST III q.38 a.5 [verify article].",
  latin:["stabat","ambulantem","Ecce Agnus Dei"],
  summa:[st("III",38,1)], ccc:["608"], lessons:["T9 States of life & spiritual theology"]},
 {id:"j1-37", v:[37,38,39,40], lect:"cap. 1, lect. 15", verified:false, senses:["lit","mor","ana"],
  beginner:"Two of John's disciples follow Jesus. He asks what they seek; they ask where he lives; he says, \"Come and see,\" and they stay with him. One of them is Andrew.",
  divisio:"Thomas takes the disciples' following, Christ's question, their reply, his invitation, and the time of day.",
  literal:[
   "\"What seek you?\": Christ asks not because he does not know, but to draw out their intention and welcome them.",
   "\"Where dwellest thou?\": they want not a single answer but time with him; that is why they ask where he stays.",
   "\"Come and see\": the invitation is to experience, not only to be told.",
   "\"About the tenth hour\": with Augustine, Thomas notes that ten is the number of the Law (the ten commandments), fulfilled by Christ."],
  spiritual:["Moral sense: we follow Christ first by deeds; then we come to know where he dwells.","Anagogical sense: \"come\" by faith and good works, and you will \"see\" in glory."],
  scholar:"Faith as the beginning of the soul's movement to God: ST II-II q.4 a.1, a.7.",
  latin:["Quid quaeritis?","Rabbi","Venite et videte","hora decima"],
  summa:[st("II-II",4,1),st("II-II",4,7)], ccc:[], lessons:["T7 Theological virtues"]},
 {id:"j1-41", v:[41,42], lect:"cap. 1, lect. 15", verified:false, senses:["lit","all"],
  beginner:"Andrew finds his brother Simon, tells him they have found the Messiah, and brings him to Jesus, who gives him a new name: Cephas, Peter.",
  divisio:"Thomas takes Andrew's announcement, his bringing of Simon, and Christ's renaming of Simon.",
  literal:[
   "Andrew shares at once what he has found; the good received is passed on to others, beginning with his own family.",
   "\"Messias\" (Hebrew) and \"Christ\" (Greek) both mean the Anointed One.",
   "\"Thou shalt be called Cephas\": the new name, meaning rock, signifies the firmness Peter would receive and the office he would hold (compare Matthew 16:18)."],
  spiritual:["Allegorical sense: the rock-name foreshadows the Church's foundation on Peter's confession of faith."],
  scholar:"Thomas defends the unity of the Church under one head, Peter's successor, at Summa contra Gentiles IV, c.76.",
  latin:["Messias","Cephas","Petrus"],
  summa:[{label:"SCG IV c.76",url:"https://isidore.co/aquinas/ContraGentiles4.htm#76"}], ccc:["552","881"], lessons:["T14 Ecclesiology"]},
 {id:"j1-43", v:[43,44,45,46], lect:"cap. 1, lect. 16", verified:false, senses:["lit","mor"],
  beginner:"Jesus calls Philip, who brings Nathanael. Nathanael doubts that anything good can come from Nazareth; Philip answers, \"Come and see.\"",
  divisio:"Thomas takes Christ's call of Philip, Philip's witness to Nathanael, Nathanael's objection, and Philip's reply.",
  literal:[
   "\"Follow me\": Philip is called directly by Christ, not brought by another.",
   "Philip identifies Jesus as the one foretold \"in the law and the prophets\", though he calls him \"son of Joseph\", speaking as people then thought.",
   "\"Can any thing of good come from Nazareth?\" The Fathers read it two ways: as a doubtful question, or (with Augustine) as an affirmation, \"From Nazareth something good can come\". Thomas reports both."],
  spiritual:["Moral sense: Philip does not argue; he invites. The best answer to doubt is often to bring the doubter to Christ."],
  scholar:"On the manner of Christ's teaching and calling: ST III q.42.",
  latin:["Sequere me","a Nazareth","Veni et vide"],
  summa:[st("III",42,1)], ccc:[], lessons:["T11 Christology"]},
 {id:"j1-47", v:[47,48,49,50,51], lect:"cap. 1, lect. 16", verified:false, senses:["lit","all","ana"],
  beginner:"Jesus calls Nathanael a true Israelite without guile and shows that he saw him under the fig tree. Nathanael confesses him as Son of God and King of Israel, and Jesus promises greater things: heaven opened and angels ascending and descending on the Son of man.",
  divisio:"Thomas treats Christ's praise of Nathanael, the sign of knowledge, Nathanael's confession, and Christ's promise.",
  literal:[
   "\"In whom there is no guile\": Nathanael's objection came from honest knowledge of Scripture, not from malice.",
   "\"Under the fig tree, I saw thee\": Christ knows what was hidden and distant. This knowledge is a sign of his divinity, and Nathanael grasps it.",
   "\"Son of God… King of Israel\": a confession of Christ's divine sonship and his messianic kingship.",
   "The ascending and descending angels recall Jacob's ladder (Genesis 28:12). Christ himself is the ladder joining heaven and earth."],
  spiritual:["Allegorical sense: the angels can stand for preachers, who ascend in contemplation and descend to serve the members of Christ's body.","Anagogical sense: \"heaven opened\" promises the vision of God."],
  scholar:"The knowledge of Christ's soul: ST III q.10 a.2. The ministry of angels: ST I q.112 a.1.",
  latin:["dolus","sub ficu","Filius Dei","Rex Israel","Filium hominis"],
  summa:[st("III",10,2),st("I",112,1)], ccc:["441"], lessons:["T11 Christology","T5 Creation, Angels, Providence"]}
);
// Catena is loaded from catena/john-1.json (Newman's translation, public domain). Remove placeholder summaries.
UNITS.forEach(u=>{delete u.fathers;});

