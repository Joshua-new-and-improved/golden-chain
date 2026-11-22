// ---------- Apologetics: traditions primer + disputations on contested readings ----------
// AI-written summaries for study. Scripture is quoted from the Douay-Rheims (public domain), loaded live from bible/*.json.
// The Qur'an is PARAPHRASED (modern English translations are copyrighted); check any Qur'an reference in a translation such as Abdel Haleem (2004) before using it.
// Each objection is given in the form its best defenders would give it, with the reasons they find it convincing, before the Catholic and Thomist reply.

const APOL_FAM = {orthodox:"Eastern & Oriental Orthodox",protestant:"Protestant",sect:"Non-Trinitarian movements",islam:"Islam"};

const TRADS = [
 {id:"catholic",fam:"base",name:"Catholic Church (baseline)",when:"1st century",img:"st-peters",
  origin:"Holds that it is the one Church founded by Christ on the apostles, with Peter and his successors, the bishops of Rome, as visible head (Matt 16:18–19; Lumen Gentium 8, 18–23).",
  beliefs:["Scripture and Tradition together form one deposit of the word of God, interpreted authentically by the Magisterium (Dei Verbum 9–10).","Seven sacraments; the Eucharist is Christ's body and blood by transubstantiation (Lateran IV 1215; Trent 1551).","Justification by grace, received in faith and baptism, making the person inwardly just and able to merit by grace (Trent, Session 6, 1547).","Twenty-four particular Churches in communion with Rome (Latin plus 23 Eastern Catholic Churches)."],
  sa:"Southern African Catholic Bishops' Conference (SACBC) covers South Africa, Botswana and Eswatini; Pretoria is an archdiocese."},
 {id:"orthodox",fam:"orthodox",name:"Eastern Orthodox Church",when:"Gradual separation; symbolic date 1054",img:"",
  origin:"A communion of self-governing (autocephalous) Churches (Constantinople, Alexandria, Antioch, Jerusalem, Russia, Greece and others). The 1054 mutual excommunications between Cardinal Humbert and Patriarch Michael Cerularius are a symbolic date; the sack of Constantinople in 1204 deepened the break. The excommunications were lifted in 1965 by Paul VI and Athenagoras I.",
  beliefs:["Accepts the first seven ecumenical councils (to Nicaea II, 787).","Rejects the Filioque in the Creed: the Spirit proceeds from the Father (John 15:26).","The bishop of Rome had a primacy of honour in the first millennium, but not universal jurisdiction or infallibility.","Seven mysteries (sacraments), real presence in the Eucharist, veneration of icons and of the Theotokos.","Distinguishes God's unknowable essence from his uncreated energies (Gregory Palamas, 14th century); salvation as theosis.","Prays for the dead but generally rejects the Latin doctrine of purgatory as a place of temporal punishment."],
  vs:"Closest to Catholic faith: valid sacraments and apostolic succession (Unitatis Redintegratio 15). The disputes are chiefly the papacy, the Filioque, purgatory and the Immaculate Conception.",
  sa:"Under the Greek Orthodox Patriarchate of Alexandria and All Africa; parishes in Pretoria, Johannesburg and elsewhere, many among Greek and other immigrant communities and growing African membership."},
 {id:"oriental",fam:"orthodox",name:"Oriental Orthodox Churches",when:"After the Council of Chalcedon (451)",img:"",
  origin:"Coptic, Ethiopian, Eritrean, Armenian, Syriac and Malankara (Indian) Churches, which did not accept Chalcedon's formula \"in two natures\".",
  beliefs:["Miaphysite Christology: \"one incarnate nature of God the Word\" (Cyril of Alexandria's phrase), meaning one united divine-human nature, not a mixture.","Accept the first three ecumenical councils (Nicaea, Constantinople I, Ephesus).","Sacraments, apostolic succession and strong monastic traditions."],
  vs:"Much of the dispute is now regarded as verbal: Paul VI and Coptic Pope Shenouda III signed a common Christological declaration in 1973, and John Paul II made similar declarations with others.",
  sa:"Coptic and Ethiopian Orthodox parishes in Gauteng and the Western Cape."},
 {id:"lutheran",fam:"protestant",name:"Lutheran",when:"1517",img:"",
  origin:"Martin Luther, an Augustinian friar, posted the Ninety-five Theses against indulgence preaching on 31 October 1517, was excommunicated in 1521, and refused to recant at the Diet of Worms (1521). The Augsburg Confession (1530) is the main Lutheran statement.",
  beliefs:["Justification by grace through faith alone (sola fide), and Scripture as the sole infallible rule (sola scriptura).","Real presence of Christ's body and blood \"in, with and under\" the bread and wine (not transubstantiation).","Two sacraments in the strict sense: baptism (including infants) and the Lord's Supper."],
  vs:"The Joint Declaration on the Doctrine of Justification (1999), signed by the Lutheran World Federation and the Catholic Church, states a consensus on basic truths of justification while noting remaining differences.",
  sa:"German and Scandinavian mission churches since the 19th century; the Evangelical Lutheran Church in Southern Africa is largely Black African in membership."},
 {id:"reformed",fam:"protestant",name:"Reformed / Presbyterian",when:"1520s (Zwingli); 1536 (Calvin)",img:"oude-kerk",
  origin:"Ulrich Zwingli in Zürich from 1519 and John Calvin in Geneva (Institutes of the Christian Religion, 1536) led a reform more radical than Luther's. John Knox brought it to Scotland (Presbyterian).",
  beliefs:["God's sovereignty; predestination; total depravity (as later summarised at the Synod of Dort, 1618–19).","Zwingli: the Lord's Supper is a memorial; Calvin: Christ is spiritually present to the believer.","Simplified worship; churches governed by elders (presbyters)."],
  vs:"Differs from Catholics on justification, the sacraments and grace and free will (compare Trent on free will, Session 6, canon 4).",
  sa:"The Dutch Reformed Church (NG Kerk) arrived with the VOC at the Cape in 1652, and its history is bound up with apartheid; the Belhar Confession (1986) rejected the theology of separation. The Uniting Reformed Church followed in 1994."},
 {id:"anglican",fam:"protestant",name:"Anglican",when:"1534",img:"salisbury",
  origin:"Henry VIII's Act of Supremacy (1534) made the king Supreme Head of the Church of England after the pope refused to annul his marriage. Doctrine moved in a Protestant direction under Edward VI and Elizabeth I (Thirty-nine Articles, 1563/1571).",
  beliefs:["Scripture, the creeds, the two dominical sacraments and the historic episcopate (Lambeth Quadrilateral, 1888).","Wide internal range from Anglo-Catholic to Evangelical."],
  vs:"Leo XIII declared Anglican orders invalid (Apostolicae Curae, 1896). Benedict XVI created Ordinariates for Anglicans entering full communion (Anglicanorum Coetibus, 2009).",
  sa:"Anglican Church of Southern Africa; Archbishop Desmond Tutu of Cape Town was a leading opponent of apartheid."},
 {id:"anabaptist",fam:"protestant",name:"Anabaptist and Baptist",when:"1525; 1609",img:"",
  origin:"Anabaptists (\"rebaptisers\") began in Zürich on 21 January 1525 when Conrad Grebel baptised adults; Mennonites and Amish descend from them. Baptists began separately with John Smyth's congregation of English exiles in Amsterdam in 1609.",
  beliefs:["Believer's baptism only, usually by immersion; infant baptism rejected.","Baptism and the Lord's Supper as \"ordinances\" (acts of obedience), not means of grace.","Congregational government; strong emphasis on personal conversion."],
  vs:"Most directly opposed to baptismal regeneration and infant baptism (see the John 3:5 disputation).",
  sa:"Baptist Union of Southern Africa and the Baptist Convention; many independent evangelical churches follow Baptist practice."},
 {id:"methodist",fam:"protestant",name:"Methodist and Pentecostal",when:"1730s–1780s; 1901–1906",img:"",
  origin:"John Wesley, an Anglican priest, began the Methodist revival (Aldersgate experience 1738); American Methodists separated in 1784. Pentecostalism emerged from the Holiness movement: Charles Parham in Topeka (1901) and the Azusa Street Revival under William Seymour in Los Angeles (1906).",
  beliefs:["Methodists: Arminian view of grace (universal offer, human response), and pursuit of holiness (\"Christian perfection\").","Pentecostals: baptism in the Holy Spirit as a distinct experience, usually with speaking in tongues; healing and prophecy."],
  vs:"Catholic charismatic renewal (from 1967) shares the emphasis on charisms, within sacramental faith.",
  sa:"The Methodist Church of Southern Africa is one of the largest mainline churches; the Apostolic Faith Mission (1908) and the Assemblies of God are major Pentecostal bodies."},
 {id:"aic",fam:"protestant",name:"African Initiated Churches",when:"1890s onward",img:"",
  origin:"Churches founded by Africans independent of missionary control: the Ethiopian movement (Mangena Mokone, 1892); the Nazareth Baptist Church (iBandla lamaNazaretha) founded by Isaiah Shembe in 1910; and the Zion Christian Church founded by Engenas Lekganyane in 1924, with headquarters at Moria in Limpopo.",
  beliefs:["Zionist and Apostolic churches emphasise healing, prophecy, the Holy Spirit, purification rites and uniforms or badges.","Varied relation to ancestors, from rejection to integration into Christian practice.","Shembe's church holds him as a prophet with a special role, which many Christians regard as going beyond orthodox Christology."],
  vs:"Not a Protestant denomination in the narrow sense; grouped here because they arose from mission Protestantism. Doctrine varies widely, so judge each body on its own teaching.",
  sa:"The ZCC is the largest African Initiated Church in South Africa, with large Easter pilgrimages to Moria."},
 {id:"jw",fam:"sect",name:"Jehovah's Witnesses",when:"1870s; name adopted 1931",img:"",
  origin:"Charles Taze Russell's Bible Student movement in Pennsylvania (1870s); the Watch Tower Society was incorporated in 1884. Under Joseph Rutherford the name \"Jehovah's Witnesses\" was adopted in 1931. They use the New World Translation (complete 1961).",
  beliefs:["Jehovah alone is God; Jesus is God's first creation, identified with the archangel Michael; the Holy Spirit is God's active force, not a person.","Jesus died on a stake, not a cross; no immortal soul; hell is annihilation.","144,000 rule in heaven; others live forever on a restored earth.","No blood transfusions; no celebration of birthdays or Christmas."],
  vs:"Their Christology is a modern form of Arianism, which the Council of Nicaea (325) rejected. The Catholic Church does not accept their baptism as valid (CDF, 2001).",
  sa:"Active door-to-door ministry in all provinces."},
 {id:"lds",fam:"sect",name:"Latter-day Saints (Mormons)",when:"1830",img:"",
  origin:"Joseph Smith published the Book of Mormon and organised the Church of Christ on 6 April 1830 in New York; after his death in 1844, Brigham Young led most members to Utah.",
  beliefs:["The Godhead is three distinct beings; the Father has a glorified body of flesh and bones.","Humans pre-exist as spirit children of heavenly parents and may be exalted to godhood.","Additional scripture: Book of Mormon, Doctrine and Covenants, Pearl of Great Price.","A restored priesthood and temple ordinances, including baptism for the dead."],
  vs:"Their doctrine of God is not the Trinity of Nicaea, so the Catholic Church does not accept LDS baptism as valid (CDF, 2001).",
  sa:"A temple in Johannesburg (dedicated 1985) and wards across the country."},
 {id:"oneness",fam:"sect",name:"Oneness Pentecostals",when:"1913–1916; UPCI 1945",img:"",
  origin:"At a camp meeting at Arroyo Seco, California (1913), a sermon on baptism \"in the name of Jesus\" led some Pentecostals to reject the Trinity; they separated from the Assemblies of God in 1916. The United Pentecostal Church International formed in 1945.",
  beliefs:["One God who manifests as Father, Son and Spirit (modes, not persons).","Baptism must be \"in the name of Jesus\" only (Acts 2:38).","Speaking in tongues as evidence of salvation."],
  vs:"A form of modalism, condemned when taught by Sabellius in Rome (excommunicated c. 220).",
  sa:"Small number of Oneness congregations, often alongside Trinitarian Pentecostals."},
 {id:"islam",fam:"islam",name:"Islam",when:"c. 610 (first revelation); 622 (Hijra)",img:"",
  origin:"Muslims hold that the angel Gabriel revealed the Qur'an to Muhammad in Mecca from about 610; the migration to Medina in 622 begins the Islamic calendar. Sunni and Shi'a divided over succession after his death (632).",
  beliefs:["Strict monotheism (tawhid): God has no partner or son (Qur'an 112, paraphrased: he begets not, nor is he begotten).","Jesus (Isa) is a great prophet, born of the Virgin Mary, called the Messiah and \"a word from God\" (Qur'an 3:45; 4:171), but not divine.","Jesus was not crucified; it was made to appear so, and God raised him (Qur'an 4:157–158, paraphrased).","Earlier scriptures (Torah, Psalms, Gospel) were revealed but have been altered (tahrif).","Five pillars: confession, prayer, alms, fasting in Ramadan, pilgrimage."],
  vs:"The Church \"regards with esteem the Muslims\", who adore the one God and honour Jesus as a prophet and Mary (Nostra Aetate 3; CCC 841). The disputes are the Trinity, the Incarnation, the Cross and the reliability of the Gospels.",
  sa:"Arrived at the Cape in the 1650s with enslaved and exiled people from South-East Asia (Shaykh Yusuf, 1694); the Auwal Mosque in Bo-Kaap dates from 1794. Indian Muslims came to Natal from 1860."}
];

const DISPS = [
 // ---- Non-Trinitarian ----
 {id:"d-john1-1",trad:"jw",title:"\"The Word was a god\"",ref:"John 1:1",src:[["john",1,1,1]],unit:"j1-1",
  obj:"The Greek of the last clause is theos ēn ho logos, with no article before theos. Earlier in the verse \"with God\" has the article (ton theon). So John means the Word was \"a god\" or \"godlike\", a mighty spirit, but not the God he was with.",
  why:"Witnesses start from the conviction that Jehovah alone is God and that the Son is his first creation (Col 1:15 read as \"firstborn\" = first made; Prov 8:22). The grammar seems to confirm this, and they note that some translators have rendered \"divine\" or \"a god\".",
  reply:`<ol><li><strong>Grammar.</strong> In Greek a predicate noun placed before the verb commonly lacks the article; this shows that theos describes the Word's nature (qualitative), not that there are two gods. If John had written ho theos ēn ho logos, he would have said that the Word is the whole Godhead, Father included, which is Sabellianism.</li>
<li><strong>Context.</strong> John 1:3: \"All things were made by him: and without him was made nothing that was made.\" If the Word were made, he would have made himself. Isaiah 44:24: God alone stretched out the heavens.</li>
<li><strong>The Gospel's conclusion.</strong> Thomas the Apostle: \"My Lord and my God\" (John 20:28), with the article, and Christ accepts it.</li>
<li><strong>Monotheism.</strong> \"A god\" beside the one God implies two gods, which the Witnesses' own monotheism rejects (Isa 43:10).</li>
<li><strong>Thomas Aquinas</strong> had already answered Origen's use of the missing article to make the Son inferior: "the theory of Origen is clearly false" (Super Ioannem 1, lect. 1, nn. 58–59).</li></ol>`,
  sources:["Thomas Aquinas, Super Ioannem c.1 lect.1 nn. 58–59.","Council of Nicaea (325), Creed: \"true God from true God, begotten not made\".","Wallace, D.B. (1996) Greek Grammar Beyond the Basics. Grand Rapids: Zondervan, pp. 266–269 (qualitative anarthrous predicate nominatives)."],
  rejoinder:"\"But Jesus is called 'firstborn of all creation' (Col 1:15).\"",
  answer:"\"Firstborn\" means pre-eminence and heirship (Ps 88:28 DR: David made \"firstborn, high above the kings\"); the next verse says \"in him were all things created\" (Col 1:16), which excludes him from creation.",
  q:Q("The strongest single reply to \"a god\" from John's own text is…",[["John 1:3: all things were made through him, so he is not made","Correct."],["The Vulgate says Deus","True, but a translation is not the source text."],["Jehovah's Witnesses are not scholars","Ad hominem."]],0),
  model:"The missing article marks theos as a qualitative predicate: the Word has the nature of God, while remaining distinct from the Father (\"with God\"). John 1:3 puts the Word on the Creator's side of the line, and John 20:28 confirms the reading.",
  keys:["qualitative predicate","John 1:3","John 20:28","monotheism: no second god","Thomas against Origen"]},
 {id:"d-john14-28",trad:"jw",title:"\"The Father is greater than I\"",ref:"John 14:28",src:[["john",14,28,28]],
  obj:"Jesus himself says the Father is greater than he is. One who is equal cannot be lesser, so the Son is not God in the same sense as the Father.",
  why:"It is a plain statement in Jesus' own words, and Arius used it the same way in the fourth century.",
  reply:`<ol><li><strong>Two natures.</strong> The Son speaks \"according to the form of a servant\" (Phil 2:6–7). As man he is less than the Father; as God he is equal (Athanasian Creed: \"equal to the Father as touching his Godhead; less than the Father as touching his manhood\").</li>
<li><strong>Order of origin.</strong> Some Greek Fathers (e.g. Hilary, Gregory Nazianzen) read \"greater\" as the Father being the source from whom the Son is eternally born, without inequality of nature.</li>
<li><strong>Same Gospel.</strong> \"I and the Father are one\" (10:30); \"He that seeth me seeth the Father also\" (14:9).</li>
<li><strong>Thomas</strong> asks whether Christ is subject to the Father and answers that he is, in his human nature (ST III q.20 a.1).</li></ol>`,
  sources:["Thomas Aquinas, ST III q.20 a.1.","Augustine, De Trinitate I.7.14.","Athanasian Creed (Quicumque)."],
  rejoinder:"\"Jesus also says he does not know the day or hour (Mark 13:32). God knows everything.\"",
  answer:"The same rule applies: he does not know it as something to reveal, or in his human knowledge taken by itself (Thomas, ST III q.10 a.2 ad 1; Augustine). Texts of lowliness belong to the assumed nature.",
  q:Q("The classical Catholic key to John 14:28 is…",[["The text is a later addition","No manuscript basis."],["Christ speaks according to his human nature","Correct."],["\"Greater\" means older","Not the classical reading."]],1),
  model:"Christ speaks as man: in the form of a servant he is less than the Father, while as God he is equal (Phil 2:6–7; John 10:30). Some Fathers also read \"greater\" as source of origin, which implies no inequality of nature.",
  keys:["two natures","Phil 2:6–7","order of origin","John 10:30 / 14:9","ST III q.20 a.1"]},
 {id:"d-john5-19",trad:"jw",title:"\"The Son cannot do anything of himself\"",ref:"John 5:19",src:[["john",5,19,19]],unit:"j5-19",
  obj:"A being who can do nothing by himself depends wholly on another, so the Son is a subordinate agent of Jehovah.",
  why:"Dependence sounds like creaturehood, and the verse seems to say so directly.",
  reply:`<ol><li><strong>Read the whole verse.</strong> \"For what things soever he doth, these the Son also doth in like manner.\" No creature does whatever God does.</li>
<li><strong>From, not less.</strong> \"Of himself\" means the Son has his being and power from the Father; he is \"God from God\". Receiving the whole nature is not receiving a lesser one.</li>
<li><strong>Thomas</strong> reads the verse against both Arius and Sabellius: \"cannot of himself\" shows the Son is from another; \"in like manner\" shows the same power (Super Ioannem 5, lect. 3).</li></ol>`,
  sources:["Thomas Aquinas, Super Ioannem c.5 lect.3.","Augustine, Tractates on John 20."],
  rejoinder:"\"Receiving anything shows imperfection.\"",
  answer:"Among creatures, yes. In God the Son receives the very same numerical nature, so nothing is lacking (ST I q.42 a.4: the Son is equal to the Father in greatness).",
  q:Q("Which phrase in John 5:19 shows equality of power?",[["\"of himself\"","That shows origin."],["\"what things soever he doth, these the Son also doth in like manner\"","Correct."],["\"Amen, amen\"","An oath formula."]],1),
  model:"\"Of himself\" teaches origin: the Son is from the Father. \"Whatever he does, the Son does likewise\" teaches identity of power, so the verse proves eternal generation, not creation.",
  keys:["finish the verse","origin not inferiority","same power","Super Ioannem 5 lect.3"]},
 {id:"d-john10-30",trad:"oneness",title:"\"I and the Father are one\" (one person?)",ref:"John 10:30",src:[["john",10,30,30]],
  obj:"Jesus says he and the Father are one. So Father and Son are one person, the one God revealed as Father in creation and as Son in the Incarnation.",
  why:"Oneness Pentecostals start from the Shema (Deut 6:4) and Colossians 2:9, and read texts like this as proof that \"Father\" and \"Son\" are titles of one person.",
  reply:`<ol><li><strong>Grammar.</strong> The Greek \"one\" is neuter (hen: one thing), not masculine (heis: one person); and the verb is plural, \"we are\" (esmen).</li>
<li><strong>Augustine's rule.</strong> \"One\" refutes Arius (one substance); \"we are\" refutes Sabellius (two persons). Thomas uses the same distinction in his commentary.</li>
<li><strong>Two witnesses.</strong> \"The testimony of two men is true. I am one that give testimony of myself: and the Father that sent me giveth testimony\" (John 8:17–18). One person cannot be two witnesses.</li>
<li><strong>Distinct relations.</strong> The Son prays to the Father (John 17), is sent by him, and the voice from heaven speaks of the Son at the baptism (Matt 3:16–17).</li></ol>`,
  sources:["Augustine, Tractates on John (on 10:30). [verify tractate number]","Thomas Aquinas, Super Ioannem c.10 lect.5.","Thomas Aquinas, ST I q.31 a.2 (against Sabellius)."],
  rejoinder:"\"Acts 2:38 baptises in the name of Jesus, so the name of Father, Son and Spirit is 'Jesus'.\"",
  answer:"\"In the name of Jesus\" marks Christian baptism by Christ's authority, as opposed to John's baptism; Matthew 28:19 gives the form. The Didache (c. 100) already uses the Trinitarian formula.",
  q:Q("Which grammatical feature of John 10:30 tells against modalism?",[["The plural verb \"we are\"","Correct."],["The word \"Father\"","Not by itself."],["The article before \"I\"","There is none."]],0),
  model:"\"One\" is neuter (one thing, one nature) and \"are\" is plural (two who are). So the verse affirms one substance and two persons, as Augustine put it: one against Arius, are against Sabellius.",
  keys:["neuter hen","plural esmen","Arius / Sabellius rule","John 8:17–18","Matt 3:16–17"]},
 {id:"d-john10-34",trad:"lds",title:"\"You are gods\": human exaltation?",ref:"John 10:34–36",src:[["john",10,34,36],["psalms",81,6,6]],
  obj:"Jesus endorses the psalm: humans are gods. This supports the restored teaching that God's children can progress to godhood.",
  why:"Latter-day Saints see eternal progression as the full meaning of being God's children, and find support in Romans 8:17 (\"joint heirs with Christ\") and the early Christian language of deification.",
  reply:`<ol><li><strong>The psalm.</strong> Psalm 81 (82) addresses unjust judges who \"shall die like men\" (v.7). They are called gods because they judge in God's place, not because they share his nature.</li>
<li><strong>Jesus' argument</strong> is from lesser to greater: if Scripture calls mere judges \"gods\", how can it be blasphemy for the one the Father sanctified to call himself Son of God? It sets Jesus apart from them.</li>
<li><strong>Theosis is participation.</strong> The Fathers say we are \"made partakers of the divine nature\" (2 Pet 1:4) by grace, never that we become another God. Thomas: the name \"God\" is communicable not in its whole meaning but by participation (ST I q.13 a.9).</li>
<li><strong>One God.</strong> \"Before me there was no God formed, and after me there shall be none\" (Isa 43:10).</li></ol>`,
  sources:["Thomas Aquinas, ST I q.13 a.9.","Athanasius, De Incarnatione 54 (\"he was made man that we might be made God\": by grace).","CCC 460."],
  rejoinder:"\"Then why do the Fathers say 'God became man so that man might become God'?\"",
  answer:"They mean by grace and participation, as creatures: the divine nature remains infinitely above us. The Eastern Orthodox, who stress theosis most, agree completely with the Catholic reading here.",
  q:Q("In Psalm 81 (82) the \"gods\" addressed are…",[["angels who rule nations","One modern view, but not the Fathers' main reading."],["judges who exercise God's authority and will die like men","Correct."],["future exalted humans","Not in the text."]],1),
  model:"The psalm calls judges \"gods\" for their office; Jesus argues from the lesser to the greater about himself. Christian deification is participation in God's life by grace (2 Pet 1:4), never becoming a separate God.",
  keys:["judges, die like men","lesser to greater argument","participation 2 Pet 1:4","ST I q.13 a.9","one God Isa 43:10"]},

 // ---- Islam ----
 {id:"d-word",trad:"islam",title:"\"The Word\": a creature brought into being by \"Be\"?",ref:"John 1:1, 14 · Qur'an 3:45, 3:59, 4:171",src:[["john",1,14,14]],unit:"j1-14",
  qur:"Paraphrase: the angels announce to Mary \"a word from God\" whose name is the Messiah, Jesus son of Mary (3:45); Jesus is like Adam, whom God created from dust and said to him \"Be\", and he was (3:59); the Messiah is a messenger of God and his word cast into Mary, and a spirit from him, so do not say \"three\" (4:171).",
  obj:"The Qur'an also calls Jesus a \"word\" of God. But this means he was created by God's word of command, \"Be!\", as Adam was. Calling him the eternal divine Word goes beyond the evidence and associates a partner with God (shirk).",
  why:"Muslims rightly honour God's absolute oneness and transcendence; a son seems to imply a consort and physical generation, which they find unworthy of God (Qur'an 6:101).",
  reply:`<ol><li><strong>The Gospel's \"Word\".</strong> John says the Word \"was with God, and was God\" and that all things were made through him (1:1–3). A creature made by \"Be\" cannot be the one through whom \"Be\" itself is spoken.</li>
<li><strong>Generation is not physical.</strong> Thomas answers exactly this objection in a work written for Christians living among Muslims: God's generation is intellectual, as a mind conceives a word, not carnal; so no consort is implied (De rationibus fidei, ch. 3).</li>
<li><strong>A shared intuition.</strong> Classical Sunni theology held that the Qur'an, God's speech, is uncreated and eternal. So the idea of an eternal Word of God that is not a second god is not foreign to Islamic thought.</li>
<li><strong>Oneness kept.</strong> Christians do not add a partner to God: the Word is the same one God, distinct as Son, not a second being (Nicaea).</li></ol>`,
  sources:["Thomas Aquinas, De rationibus fidei ad Cantorem Antiochenum (c. 1264), chs. 1–3.","Thomas Aquinas, Summa contra Gentiles IV, chs. 11–13 (the Word in God).","Nostra Aetate 3 (1965)."],
  rejoinder:"\"God is one and indivisible; distinctions in God make him composite.\"",
  answer:"Thomas agrees that God is utterly simple (ST I q.3). The persons are not parts but relations within the one essence: Father and Son differ only by relation of origin (ST I q.28 a.3; q.40 a.2).",
  q:Q("Thomas's answer to \"God cannot have a son, for he has no wife\" is that divine generation is…",[["spiritual and intellectual, like a mind conceiving its word","Correct: De rationibus fidei c.3."],["a metaphor with no reality","No: the Son is truly begotten."],["the same as creation","No: begotten, not made."]],0),
  model:"John's Word is the one through whom all things were made, so not a creature of \"Be\". Divine generation is intellectual, as a mind conceives its word, with no consort; and the persons are relations within one simple God, not partners.",
  keys:["John 1:3 the Word as Creator","intellectual generation","De rationibus fidei","uncreated speech parallel","simplicity and relations"]},
 {id:"d-cross",trad:"islam",title:"Was Jesus crucified?",ref:"John 19:17–18 · Qur'an 4:157",src:[["john",19,17,18],["1-corinthians",15,3,4]],
  qur:"Paraphrase of Qur'an 4:157–158: they say they killed the Messiah, but they did not kill him nor crucify him; it was made to appear so to them. God raised him up to himself.",
  obj:"God would not allow his great prophet to suffer a shameful death. The crucifixion only appeared to happen; someone else may have been made to look like Jesus.",
  why:"In the Qur'an God vindicates his prophets against their enemies; a crucified Messiah looks like defeat. Also, Islam rejects the need for a sacrifice for sin: each person bears his own burden (Qur'an 6:164).",
  reply:`<ol><li><strong>History.</strong> The crucifixion is among the best-attested facts of antiquity: all four Gospels, Paul (1 Cor 15:3–4, a creed received within a few years of the event), and non-Christian writers (Tacitus, Annals 15.44, c. 116; Josephus, Antiquities 18.63, whose core is widely accepted even though Christians later added to it).</li>
<li><strong>Late source.</strong> The Qur'anic denial comes about 600 years later with no historical source behind it.</li>
<li><strong>The cross is not defeat.</strong> The prophets foretold the suffering servant (Isa 53); Christ predicted his death and rising (John 2:19; Mark 8:31). Vindication comes by resurrection.</li>
<li><strong>Fittingness.</strong> Thomas answers Muslims who mock the cross: it was fitting because it shows God's love, gives an example of every virtue and pays the debt of sin (De rationibus fidei, ch. 7; compare ST III q.46 a.3).</li></ol>`,
  sources:["Tacitus, Annals 15.44.","Josephus, Antiquities 18.63–64.","Thomas Aquinas, De rationibus fidei c.7; ST III q.46 aa.1–4."],
  rejoinder:"\"The Gospels were corrupted (tahrif), so their account cannot be trusted.\"",
  answer:"We have thousands of Greek manuscripts, some (e.g. P52, P66) from the 2nd century, long before Muhammad, and they agree on the crucifixion. The Qur'an itself tells Christians to judge by the Gospel (5:47, paraphrased), which presupposes the Gospel was available.",
  q:Q("Which is the earliest written Christian testimony to Christ's death?",[["The Gospel of John","Written later, c. 90–100."],["1 Corinthians 15:3–4, a creed Paul received","Correct: written c. 54, the creed is earlier."],["The Didache","Later and not a narrative."]],1),
  model:"The crucifixion is attested by the earliest Christian creed (1 Cor 15:3–4) and by Roman and Jewish historians; the denial comes six centuries later. The cross is not God's defeat but the fulfilment of the suffering servant, vindicated by the resurrection, and fitting as the greatest sign of love.",
  keys:["1 Cor 15 creed","Tacitus / Josephus","600-year gap","Isa 53 and predictions","fittingness: ST III q.46"]},
 {id:"d-prophet",trad:"islam",title:"\"A prophet like Moses\" = Muhammad?",ref:"Deuteronomy 18:15–18; Acts 3:22",src:[["deuteronomy",18,15,18],["acts",3,22,22]],
  obj:"Moses foretells a prophet \"from among their brethren\". The brethren of Israel are the Ishmaelites (Arabs). Muhammad, like Moses, was a lawgiver, a leader and a married man, and God put his words in his mouth (the Qur'an as dictated).",
  why:"Muslims believe Muhammad was foretold in earlier scriptures (Qur'an 7:157, paraphrased) and look for him there.",
  reply:`<ol><li><strong>\"Thy brethren\" means Israelites.</strong> Deuteronomy 17:15 uses the same expression for the king: \"out of the number of thy brethren. Thou mayst not make a man of another nation king\". And 18:15 says \"of thy nation\".</li>
<li><strong>Apostolic reading.</strong> Peter applies the text to Jesus (Acts 3:22), as does Stephen (Acts 7:37); the crowd at the feeding asks whether Jesus is \"the prophet\" (John 6:14).</li>
<li><strong>Like Moses</strong> chiefly in speaking with God \"face to face\" (Deut 34:10): Jesus is the one who has seen the Father (John 1:18; 6:46), and mediator of a new covenant.</li></ol>`,
  sources:["Thomas Aquinas, Super Ioannem c.6 lect.2 (on 6:14).","Pontifical Biblical Commission (2001) The Jewish People and their Sacred Scriptures in the Christian Bible."],
  rejoinder:"\"Jesus cannot be like Moses because Moses was only a man.\"",
  answer:"Likeness need not be in every respect; and Jesus is truly man as well as God. The text names the decisive likeness: God's words in his mouth and intimate knowledge of God.",
  q:Q("Which verse shows that \"thy brethren\" in Deuteronomy means fellow Israelites?",[["Deuteronomy 17:15, on choosing a king","Correct."],["Genesis 16:12","About Ishmael, but not this idiom."],["Psalm 2:7","A messianic psalm on sonship."]],0),
  model:"In Deuteronomy \"thy brethren\" means fellow Israelites (17:15 forbids a king \"of another nation\"; 18:15 says \"of thy nation\"). The apostles apply the text to Jesus, who alone fulfils the decisive likeness of speaking with God face to face.",
  keys:["Deut 17:15 idiom","\"of thy nation\"","Acts 3:22 / 7:37","Deut 34:10 face to face"]},
 {id:"d-paraclete",trad:"islam",title:"The Paraclete = Ahmad?",ref:"John 14:16–17, 26 · Qur'an 61:6",src:[["john",14,16,17],["john",14,26,26]],
  qur:"Paraphrase of Qur'an 61:6: Jesus says he brings good news of a messenger who will come after him, whose name is Ahmad (\"the praised one\").",
  obj:"The Greek parakletos was originally periklytos, \"praised one\" (Ahmad, a form of Muhammad). Jesus foretold another messenger who would come after him.",
  why:"It reconciles the Qur'an's statement that Jesus announced Ahmad with the Gospel's promise of a coming figure.",
  reply:`<ol><li><strong>No manuscript</strong> of John, in any language, reads periklytos. The conjecture has no textual support.</li>
<li><strong>The text identifies him.</strong> \"The Paraclete, the Holy Ghost\" (14:26); \"the spirit of truth, whom the world cannot receive, because it seeth him not\", who \"shall abide with you and shall be in you\" (14:17). Muhammad was seen, was not sent to the apostles and did not abide in them.</li>
<li><strong>Timing.</strong> He would come soon to the disciples themselves (16:7; Acts 1:5), fulfilled at Pentecost (Acts 2), not six centuries later.</li></ol>`,
  sources:["Metzger, B.M. and Ehrman, B.D. (2005) The Text of the New Testament. 4th edn. New York: OUP.","Thomas Aquinas, Super Ioannem c.14 lect.4."],
  rejoinder:"\"'He will guide you into all truth' fits a final prophet.\"",
  answer:"He guides the same disciples Jesus speaks to (\"you\"), \"brings to your mind\" what Jesus said (14:26) and glorifies Christ (16:14). The Spirit's work in the apostles' preaching fits all of this.",
  q:Q("John 14:26 names the Paraclete as…",[["the Holy Ghost","Correct."],["a future prophet","Not in the text."],["the Apostle John","No."]],0),
  model:"No manuscript supports periklytos, and John identifies the Paraclete as the Holy Spirit, invisible to the world, dwelling in the disciples and sent soon, as fulfilled at Pentecost.",
  keys:["no manuscript evidence","14:26 Holy Ghost","invisible, indwelling","fulfilled at Pentecost"]},

 // ---- Protestant ----
 {id:"d-john6",trad:"reformed",title:"John 6: symbolic eating?",ref:"John 6:54–57, 61–67",src:[["john",6,54,57],["john",6,61,64],["john",6,67,67]],unit:"j6-53",
  obj:"Jesus explains himself in 6:64: \"It is the spirit that quickeneth: the flesh profiteth nothing.\" Eating his flesh means believing in him (6:35, 47). A literal reading is cannibalistic.",
  why:"Zwingli held that Christ's body is in heaven and that \"is\" in \"this is my body\" means \"signifies\". For many evangelicals, a symbolic reading guards against magic and keeps faith central.",
  reply:`<ol><li><strong>Jesus intensifies.</strong> When the hearers object (6:53), he repeats more strongly, and uses the verb trōgō (chew, gnaw) in 6:55–59.</li>
<li><strong>Disciples leave</strong> (6:67) and he lets them go. Had he meant a metaphor, a teacher would have corrected the misunderstanding, as he does elsewhere (Matt 16:6–12).</li>
<li><strong>\"The flesh\" is not \"my flesh\".</strong> In 6:64 \"flesh\" means carnal understanding, as opposed to the spirit (Augustine, Tractates on John 27). If Christ's flesh profited nothing, the Incarnation would be pointless.</li>
<li><strong>Paul and the Fathers.</strong> Eating unworthily makes one \"guilty of the body and of the blood of the Lord\" (1 Cor 11:27–29). Ignatius of Antioch (c. 110) says heretics abstain from the Eucharist because they do not confess it to be the flesh of Christ (Smyrnaeans 7).</li>
<li><strong>Thomas:</strong> the presence is known \"by faith alone\", resting on divine authority (ST III q.75 a.1). It is not cannibalism because Christ is present sacramentally, whole and entire, not in his natural dimensions (III q.76 a.1, a.3).</li></ol>`,
  sources:["Thomas Aquinas, ST III q.75 a.1; q.76 aa.1–3; Super Ioannem c.6 lect.6–8.","Ignatius of Antioch, Letter to the Smyrnaeans 7.","Council of Trent, Session 13 (1551).","Note: Luther held a real presence, against Zwingli (Marburg Colloquy, 1529)."],
  rejoinder:"\"Jesus also says 'I am the door' and 'I am the vine', and no one takes those literally.\"",
  answer:"Those sayings do not provoke mass desertion, and are not tied to an action he institutes (\"Take and eat\", Matt 26:26) and Paul applies literally (1 Cor 10:16; 11:27).",
  q:Q("In John 6:64, \"the flesh profiteth nothing\" is best read, with Augustine, as…",[["Christ's flesh is useless","That would empty the Incarnation."],["carnal understanding, as opposed to the spirit","Correct."],["a reference to the manna","No."]],1),
  model:"Jesus intensifies rather than softens his words and lets disciples leave over them; \"the flesh\" in 6:64 is carnal understanding, not his own flesh. Paul and Ignatius read the Eucharist realistically, and Thomas explains a sacramental, not cannibalistic, presence known by faith.",
  keys:["intensification / trōgō","disciples leave","flesh = carnal understanding","1 Cor 11:27","ST III q.75 a.1; q.76"]},
 {id:"d-john3-5",trad:"anabaptist",title:"\"Born of water\": physical birth, not baptism?",ref:"John 3:5",src:[["john",3,5,5]],unit:"j3-1",
  obj:"\"Water\" refers to natural birth (amniotic fluid) or to the word of God (Eph 5:26). Salvation is by faith (3:16), so baptism cannot be necessary; it is an act of obedience after conversion, for believers only.",
  why:"Baptists want to protect salvation by grace through faith from any idea that a ritual saves automatically, and they read the New Testament examples as adult believers' baptisms.",
  reply:`<ol><li><strong>Context.</strong> Immediately afterwards Jesus and his disciples baptise (3:22; 4:1–2). Water and Spirit are joined at Jesus' own baptism (1:33).</li>
<li><strong>Apostolic teaching.</strong> \"Be baptised… for the remission of your sins\" (Acts 2:38); \"the laver of regeneration and renovation of the Holy Ghost\" (Titus 3:5); \"baptism… now saveth you also\" (1 Pet 3:21).</li>
<li><strong>Early reading.</strong> Justin Martyr (c. 155) cites John 3:5 to explain baptism (First Apology 61); no Father reads \"water\" as natural birth.</li>
<li><strong>Infants.</strong> Whole households were baptised (Acts 16:15, 33; 1 Cor 1:16), and Origen calls infant baptism an apostolic tradition. Thomas: since children contract original sin through Adam, they can receive grace through Christ (ST III q.68 a.9).</li>
<li><strong>Faith not excluded.</strong> Baptism is the sacrament of faith; for infants the Church's faith supplies (ST III q.68 a.9 ad 2).</li></ol>`,
  sources:["Thomas Aquinas, ST III q.66 a.1; q.68 aa.1, 9; Super Ioannem c.3 lect.1.","Justin Martyr, First Apology 61.","Council of Trent, Session 7, canons on baptism (1547)."],
  rejoinder:"\"The thief on the cross was saved without baptism.\"",
  answer:"The Church agrees that God is not bound by the sacraments: baptism of desire and of blood (ST III q.66 a.11; q.68 a.2). The necessity is for those who can receive it; the thief was a special case before the command of Matthew 28:19 took effect.",
  q:Q("Which early writer cites John 3:5 to explain baptism?",[["Justin Martyr, First Apology 61","Correct."],["Arius","No."],["Zwingli","Sixteenth century."]],0),
  model:"Jesus' words are followed at once by baptising (3:22), and the apostles link water and Spirit in baptism (Titus 3:5; Acts 2:38). The Fathers, from Justin on, read John 3:5 this way, and household baptisms and Thomas's reasoning on original sin support infant baptism.",
  keys:["3:22 baptising follows","Titus 3:5 / Acts 2:38","Justin First Apology 61","households","desire / blood"]},
 {id:"d-rom3",trad:"lutheran",title:"Justified by faith alone?",ref:"Romans 3:28; James 2:24",src:[["romans",3,28,28],["james",2,24,24]],
  obj:"Paul says we are justified by faith without works of the law. Luther rendered it \"by faith alone\" in his German translation (1522), because the sense requires it. Good works follow justification but contribute nothing to it.",
  why:"Luther's anguish over whether he could ever do enough for God found relief in Romans 1:17: God's righteousness is given, not earned. Sola fide protects the gratuity of grace.",
  reply:`<ol><li><strong>\"Works of the law\"</strong> in Romans and Galatians refers chiefly to the Mosaic law (circumcision, food laws), the issue dividing Jewish and Gentile Christians; Paul does not deny that grace produces good works (Eph 2:10; Gal 5:6: \"faith that worketh by charity\").</li>
<li><strong>The only place</strong> the Bible says \"faith only\" is James 2:24, which denies it.</li>
<li><strong>Catholic doctrine also rejects merit before grace.</strong> \"None of those things that precede justification, whether faith or works, merit the grace itself of justification\" (Trent, Session 6, ch. 8). Justification is by grace; faith is its beginning; charity is its form.</li>
<li><strong>Thomas:</strong> faith is formed by charity (ST II-II q.4 a.3), and the justification of the ungodly is God's work, infusing grace (I-II q.113 a.1–2). Commenting on Romans 3:28, Thomas himself says justification is \"without the works of the law\", meaning works do not cause it but flow from it (Super Rom. 3, lect. 4). [verify paragraph]</li>
<li><strong>Ecumenical progress.</strong> The Joint Declaration (1999) affirms: \"By grace alone, in faith in Christ's saving work and not because of any merit on our part, we are accepted by God\" (§15).</li></ol>`,
  sources:["Council of Trent, Session 6, Decree on Justification (1547), chs. 7–8; canon 9.","Lutheran World Federation and Catholic Church (1999) Joint Declaration on the Doctrine of Justification, §15.","Thomas Aquinas, ST I-II q.113; II-II q.4 a.3; Super Romanos c.3 lect.4."],
  rejoinder:"\"James means 'shown to be justified' before men, not before God.\"",
  answer:"James's example is Abraham offering Isaac (Gen 22), long after Gen 15:6, and he concludes that faith without works is dead (2:26): a faith that does not work by charity does not justify before God.",
  q:Q("Where does the Bible use the phrase \"faith only\"?",[["Romans 3:28","Luther added \"alone\" there in German."],["James 2:24, which denies justification by faith only","Correct."],["Galatians 2:16","Not that phrase."]],1),
  model:"Paul excludes \"works of the law\" as the ground of justification, not the works grace produces; justification is by grace, begun in faith and formed by charity (Gal 5:6; ST II-II q.4 a.3). Trent itself denies that anything before justification merits it, and the Joint Declaration records large agreement.",
  keys:["works of the law = Mosaic","Gal 5:6 faith working by charity","James 2:24","Trent Session 6 ch.8","JDDJ 1999"]},
 {id:"d-matt16",trad:"protestant",title:"\"Upon this rock\": Peter or his faith?",ref:"Matthew 16:18–19",src:[["matthew",16,18,19]],
  obj:"The rock is Peter's confession of faith, or Christ himself (1 Cor 10:4). In Greek, Peter is petros (a stone) and the rock is petra (a large rock), so they differ. Even if Peter is meant, nothing is said about successors in Rome.",
  why:"The Reformers saw the medieval papacy's abuses and wanted Christ as the only head of the Church. Some Fathers did read the rock as Peter's faith.",
  reply:`<ol><li><strong>Aramaic.</strong> Jesus spoke Aramaic, in which both words are Kepha (John 1:42: \"Cephas, which is interpreted Peter\"). The Greek gender change is because petra is feminine, unsuitable for a man's name.</li>
<li><strong>The keys.</strong> Isaiah 22:22 gives the keys to the steward of David's house, an office with successors. Binding and loosing are given to Peter singly here (cf. 18:18 to all).</li>
<li><strong>Peter's role</strong> in the New Testament: named first in every list, strengthens his brothers (Luke 22:32), feeds the sheep (John 21:15–17), speaks first at Jerusalem (Acts 15:7).</li>
<li><strong>Honest note.</strong> Augustine sometimes read the rock as Christ and left the choice to the reader (Retractationes I.21). Both readings coexist in the Fathers; the Catholic claim rests on the whole Petrine witness and on succession, not on one verse alone.</li>
<li><strong>Thomas</strong> argues that the unity of the Church requires one head, and that the pope's authority comes from Peter (Contra errores Graecorum II, chs. 32–38; ST II-II q.1 a.10).</li></ol>`,
  sources:["First Vatican Council (1870) Pastor Aeternus, ch. 1–2.","Augustine, Retractationes I.21.","Thomas Aquinas, ST II-II q.1 a.10; Contra errores Graecorum II.32–38."],
  rejoinder:"\"There is no list of popes in Scripture.\"",
  answer:"Irenaeus (c. 180) lists the bishops of Rome from Peter and Paul to Eleutherius (Against Heresies III.3.3), within about a century of the apostles.",
  q:Q("Why does the Greek use petros for Peter but petra for the rock?",[["They mean opposite things","No."],["Petra is feminine, unsuitable as a man's name; in Aramaic both are Kepha","Correct."],["It is a copying error","No."]],1),
  model:"In Aramaic Jesus said Kepha twice; the Greek change reflects grammatical gender. The keys of Isaiah 22:22 denote an office with successors, and the New Testament shows Peter's unique role, while Irenaeus lists the Roman succession. Some Fathers read the rock as Peter's faith, but the whole Petrine witness supports the Catholic reading.",
  keys:["Aramaic Kepha","keys / Isa 22:22","Petrine texts","honest: Augustine Retr. I.21","Irenaeus list"]},
 {id:"d-matt1-25",trad:"protestant",title:"\"He knew her not till…\": other children?",ref:"Matthew 1:25; Mark 6:3",src:[["matthew",1,25,25],["mark",6,3,3]],
  obj:"\"Till\" implies that afterwards Joseph and Mary had normal marital relations, and Mark names Jesus' brothers and sisters.",
  why:"The plain English sense of \"until\" suggests a change; and many evangelicals see perpetual virginity as a later ascetic idea.",
  reply:`<ol><li><strong>\"Till\" (heōs) says nothing about afterwards.</strong> \"Michol… had no child to the day of her death\" (2 Kings 6:23 DR); \"Sit on my right hand until I make thy enemies thy footstool\" (Ps 109:1 DR). Thomas: \"until\" here signifies indefinite time (ST III q.28 a.3 ad 3).</li>
<li><strong>\"Brethren\"</strong> in Hebrew and Aramaic covers cousins and kin (Gen 13:8: Abraham and Lot, uncle and nephew, are \"brethren\"). James and Joseph (Mark 6:3) are sons of another Mary (Mark 15:40). Jerome argued this against Helvidius (383); the Orthodox, following Epiphanius, say they were Joseph's children from an earlier marriage. Thomas follows Jerome (III q.28 a.3 ad 5).</li>
<li><strong>From the cross</strong> Jesus entrusts his mother to John (John 19:26–27), which makes little sense if she had other sons.</li>
<li><strong>Reformers agreed.</strong> Luther, Calvin and Zwingli all held or allowed Mary's perpetual virginity.</li></ol>`,
  sources:["Thomas Aquinas, ST III q.28 a.3, ad 3 and ad 5.","Jerome, Against Helvidius (383).","Lateran Synod (649), canon 3; CCC 499–501."],
  rejoinder:"\"Jesus is called her 'firstborn', implying later children.\"",
  answer:"\"Firstborn\" was a legal title for the child who opens the womb, owed to God (Exod 13:2), whether or not others follow. Thomas notes this (III q.28 a.3 ad 4).",
  q:Q("Which Reformer(s) held Mary's perpetual virginity?",[["None","They did."],["Luther, Calvin and Zwingli","Correct."],["Only Zwingli","Not only him."]],1),
  model:"\"Until\" denotes the period up to the birth without implying what followed (2 Kings 6:23; ST III q.28 a.3 ad 3). \"Brethren\" includes cousins and kin, as Jerome showed; Jesus entrusts Mary to John at the cross; and the major Reformers themselves held her perpetual virginity.",
  keys:["heōs / until examples","brethren = kin (Gen 13:8)","Mark 15:40 other Mary","John 19:26–27","Reformers agreed"]},
 {id:"d-luke1-28",trad:"protestant",title:"\"Full of grace\" or just \"favoured one\"?",ref:"Luke 1:28",src:[["luke",1,28,28]],
  obj:"Kecharitōmenē means \"highly favoured\", not \"full of grace\". It says God was gracious to Mary, as to all believers (Eph 1:6 uses the same verb), not that she was conceived without sin. Romans 3:23: all have sinned.",
  why:"Protestants fear that Marian doctrines draw honour from Christ and lack explicit scriptural basis.",
  reply:`<ol><li><strong>The form.</strong> A perfect passive participle used as a name in place of \"Mary\": \"you who have been, and remain, graced\". It names a completed and lasting state.</li>
<li><strong>Why Mary?</strong> The angel gives no other reason than God's choice; the Church saw in the New Eve (Justin, Irenaeus) one prepared by grace from the beginning.</li>
<li><strong>The doctrine</strong> (Pius IX, Ineffabilis Deus, 1854): Mary was preserved from original sin \"by a singular grace and privilege… in view of the merits of Jesus Christ\". So she is redeemed, by a more perfect redemption, and Romans 3:23 is respected.</li>
<li><strong>Honest note on Thomas.</strong> Thomas held that Mary was sanctified in the womb after animation, not at conception, because he thought otherwise she would not need Christ's redemption (ST III q.27 a.2). Duns Scotus resolved this with \"preservative redemption\", and the Church defined the doctrine in 1854. Thomas's principle (Christ is universal Redeemer) is kept; his conclusion was corrected.</li>
<li><strong>Orthodox</strong> call Mary Panagia (All-Holy) but mostly reject the definition, because they understand original sin as inherited mortality rather than inherited guilt.</li></ol>`,
  sources:["Pius IX (1854) Ineffabilis Deus.","Thomas Aquinas, ST III q.27 a.2.","CCC 490–493."],
  rejoinder:"\"Mary calls God 'my Saviour' (Luke 1:47), so she was a sinner.\"",
  answer:"She was saved by being preserved from sin, a greater salvation than being rescued from it (Ineffabilis Deus). Preservation is still salvation.",
  q:Q("What did Thomas Aquinas himself hold about Mary's sanctification?",[["Immaculate at conception","That was later defined, against his view."],["Sanctified in the womb after animation","Correct: ST III q.27 a.2."],["Never sinless","No: he held she never committed sin."]],1),
  model:"Kecharitōmenē is a perfect passive participle used as a name, denoting a completed, lasting state of grace. The 1854 definition says she was preserved from original sin by Christ's merits, so she too is redeemed. Thomas held a different view, which Scotus's \"preservative redemption\" corrected.",
  keys:["perfect passive participle as name","New Eve","preservative redemption","Thomas III q.27 a.2 honest note","Luke 1:47 answer"]},
 {id:"d-purgatory",trad:"protestant",title:"Purgatory: \"saved, yet so as by fire\"",ref:"1 Corinthians 3:13–15; 2 Maccabees 12:43–46",src:[["1-corinthians",3,13,15],["2-maccabees",12,43,46]],
  obj:"1 Corinthians 3 is about ministers' work being tested at the judgment, not a place of purification. 2 Maccabees is not canonical Scripture (it is in the Apocrypha). Christ's sacrifice is fully sufficient, so no further purification is needed.",
  why:"The Reformers' protest began with indulgences tied to purgatory, and they accepted the shorter Hebrew canon (following Jerome's preference).",
  reply:`<ol><li><strong>1 Corinthians 3:15</strong> describes a person who is saved but \"suffers loss\" through fire, after death, at \"the day\". The Fathers (Augustine, Gregory) read it as purification.</li>
<li><strong>Canon.</strong> 2 Maccabees was in the Greek Scriptures used by the apostles, and was listed by the Councils of Hippo (393) and Carthage (397), Florence (1442) and Trent (1546). Even as history it shows that Jews prayed for the dead before Christ.</li>
<li><strong>Not against Christ's sufficiency.</strong> Purgatory applies Christ's merits; it is the completion of sanctification, not a second redemption (CCC 1030–1031). \"There shall not enter into it any thing defiled\" (Rev 21:27).</li>
<li><strong>Early prayer for the dead.</strong> Inscriptions in the catacombs; Augustine prays for his mother Monica (Confessions IX.13).</li>
<li><strong>Orthodox</strong> pray for the dead and accept purification, but avoid the Latin language of fire and satisfaction; Florence (1439) worded the doctrine without these to meet them. Thomas defends purgatory against the Greeks in Contra errores Graecorum, and gives the argument from God's justice in De rationibus fidei, ch. 9.</li></ol>`,
  sources:["CCC 1030–1032.","Council of Florence, Laetentur Caeli (1439).","Augustine, Confessions IX.13; Enchiridion 69.","Thomas Aquinas, Contra errores Graecorum II (on purgatory); De rationibus fidei c.9."],
  rejoinder:"\"'Today thou shalt be with me in paradise' (Luke 23:43): no purgatory for the thief.\"",
  answer:"Agreed: one who dies perfectly purified, as by a perfect conversion, needs no purgation. Purgatory is for those who die in grace but not yet wholly purified.",
  q:Q("Which council first listed 2 Maccabees in a canon list?",[["Hippo (393)","Correct, followed by Carthage (397)."],["Trent (1546)","Trent defined it, but earlier councils listed it."],["Nicaea (325)","No canon list there."]],0),
  model:"1 Cor 3:15 describes being saved through fire after death, read by Augustine and Gregory as purification; 2 Maccabees, canonical since Hippo and Carthage, shows prayer for the dead. Purgatory applies Christ's merits to complete sanctification (Rev 21:27), and the early Church prayed for the dead.",
  keys:["1 Cor 3:15 saved through fire","canon: Hippo / Carthage","Rev 21:27","Augustine for Monica","Christ's sufficiency applied"]},
 {id:"d-1tim2-5",trad:"protestant",title:"\"One mediator\": no prayer to saints?",ref:"1 Timothy 2:5",src:[["1-timothy",2,5,5],["james",5,16,16]],
  obj:"There is one mediator, Christ. Asking saints to intercede adds other mediators and detracts from him.",
  why:"Evangelicals want direct access to God through Christ and see the cult of saints as having obscured it.",
  reply:`<ol><li><strong>Context.</strong> Paul has just asked for prayers \"for all men\" (2:1). Christians mediate for one another by prayer; this does not compete with Christ.</li>
<li><strong>Thomas's distinction.</strong> Christ alone is mediator perfectly, by uniting God and man and reconciling by his death; others may be called mediators \"dispositively or ministerially\", by cooperating (ST III q.26 a.1).</li>
<li><strong>The saints pray.</strong> \"The prayer of a just man availeth much\" (Jas 5:16); the elders offer \"the prayers of saints\" (Apoc 5:8; 8:4). Death does not end membership of Christ's body (Rom 8:38–39).</li>
<li><strong>Thomas:</strong> we pray to the saints \"that our prayers may be effective through their prayers and merits\" (ST II-II q.83 a.4), citing Apocalypse 8:4.</li></ol>`,
  sources:["Thomas Aquinas, ST III q.26 a.1; II-II q.83 a.4, a.11.","Lumen Gentium 49–50, 62.","CCC 956, 2683."],
  rejoinder:"\"The dead cannot hear us (Eccl 9:5).\"",
  answer:"Ecclesiastes speaks of earthly knowledge \"under the sun\". The saints are alive in God (Luke 20:38) and aware of earthly events (Luke 15:7; Apoc 6:9–10).",
  q:Q("Thomas says others besides Christ may be called mediators in what way?",[["Perfectly","Only Christ."],["Dispositively or ministerially","Correct: ST III q.26 a.1."],["Never","He allows a secondary sense."]],1),
  model:"Paul, in the same passage, asks Christians to pray for all; such intercession shares in Christ's mediation rather than competing with it. Christ alone is perfect mediator, others mediate ministerially (ST III q.26 a.1), and Scripture shows the saints in heaven offering prayers (Apoc 5:8; 8:4).",
  keys:["context 2:1 prayers","perfect vs ministerial","Jas 5:16","Apoc 5:8 / 8:4","ST II-II q.83 a.4"]},
 {id:"d-matt23-9",trad:"protestant",title:"\"Call no man father\"",ref:"Matthew 23:9",src:[["matthew",23,9,9],["1-corinthians",4,15,15]],
  obj:"Jesus explicitly forbids calling anyone \"father\" in a religious sense, yet Catholics call priests \"Father\" and the pope \"Holy Father\".",
  why:"It reads as a plain command, and evangelicals use it to criticise clerical titles.",
  reply:`<ol><li><strong>Context.</strong> Jesus is condemning the pride of scribes who love titles (23:5–7). He also says \"neither be ye called masters\" (23:10); Protestants still have \"teachers\" and \"doctors\".</li>
<li><strong>Apostolic usage.</strong> Paul: \"in Christ Jesus, by the gospel, I have begotten you\" (1 Cor 4:15); Stephen: \"Men, brethren, and fathers\" (Acts 7:2); John writes to \"fathers\" (1 John 2:13).</li>
<li><strong>Meaning.</strong> No human fatherhood rivals God's; spiritual fatherhood is a share in it (Eph 3:15).</li></ol>`,
  sources:["Thomas Aquinas, Super Matthaeum c.23 (lectura on 23:9).","CCC 2214, 1548."],
  rejoinder:"\"Paul was speaking metaphorically.\"",
  answer:"So is the Catholic usage: spiritual fatherhood. The objection would equally forbid Paul's own words.",
  q:Q("Which text shows Paul calling himself a spiritual father?",[["1 Corinthians 4:15","Correct."],["Romans 3:28","No."],["Galatians 1:1","No."]],0),
  model:"Jesus condemns proud love of titles, not every use of \"father\" (he also forbids \"master\"). Paul calls himself a father who begot the Corinthians in Christ (1 Cor 4:15), so spiritual fatherhood shares in God's fatherhood.",
  keys:["context: pride","23:10 masters / teachers","1 Cor 4:15","Acts 7:2 / 1 John 2:13","Eph 3:15"]},
 {id:"d-2tim3",trad:"protestant",title:"Is Scripture alone sufficient?",ref:"2 Timothy 3:16–17; 2 Thessalonians 2:14",src:[["2-timothy",3,16,17],["2-thessalonians",2,14,14]],
  obj:"Scripture is inspired and makes the man of God \"perfect, furnished to every good work\". So Scripture alone is the sufficient rule of faith; traditions are human additions (Mark 7:8).",
  why:"Sola scriptura gave the Reformers a standard by which to judge Church abuses, and it seems to follow from Scripture's divine origin.",
  reply:`<ol><li><strong>\"Profitable\", not \"alone\".</strong> The text says Scripture is useful for teaching; it does not say nothing else is needed. And \"scripture\" for Timothy meant the Old Testament.</li>
<li><strong>Paul commands tradition:</strong> \"hold the traditions, which you have learned, whether by word or by our epistle\" (2 Thess 2:14). Mark 7:8 condemns human traditions that oppose God's command, not apostolic tradition.</li>
<li><strong>The canon itself</strong> is known through Tradition: no verse lists the books of the New Testament.</li>
<li><strong>Catholic teaching:</strong> Scripture and Tradition flow from \"the same divine wellspring\", and the Magisterium is not above the word of God but serves it (Dei Verbum 9–10).</li>
<li><strong>Thomas</strong> stresses Scripture's primacy: sacred doctrine argues from canonical Scripture as its proper and necessary authority, from the Fathers as probable authorities (ST I q.1 a.8 ad 2). This is common ground worth acknowledging.</li></ol>`,
  sources:["Dei Verbum 9–10 (1965).","Thomas Aquinas, ST I q.1 a.8 ad 2.","Council of Trent, Session 4 (1546)."],
  rejoinder:"\"Tradition has changed over time, while Scripture stays the same.\"",
  answer:"Doctrine develops in understanding without changing in substance (Vincent of Lérins; Newman; Dei Verbum 8). Protestant interpretations of the same Scripture also diverge widely, which shows the need for an authoritative interpreter.",
  q:Q("Which verse explicitly commands holding oral as well as written traditions?",[["2 Thessalonians 2:14","Correct (2:15 in some numberings)."],["2 Timothy 3:16","About Scripture's usefulness."],["Mark 7:8","Condemns merely human traditions."]],0),
  model:"2 Timothy calls Scripture profitable, not the only rule; Paul himself commands holding traditions by word or letter (2 Thess 2:14), and the canon is known only through Tradition. Scripture and Tradition form one deposit served by the Magisterium (Dei Verbum 10), while Thomas rightly gives canonical Scripture primacy.",
  keys:["profitable ≠ sufficient","2 Thess 2:14","canon from Tradition","Dei Verbum 9–10","Thomas: Scripture primary"]},

 // ---- Orthodox ----
 {id:"d-filioque",trad:"orthodox",title:"The Filioque: from the Father alone?",ref:"John 15:26",src:[["john",15,26,26]],
  obj:"Christ says the Spirit \"proceedeth from the Father\". The original Creed of 381 said only this. Adding \"and the Son\" (Filioque) is a unilateral change to an ecumenical creed and implies two sources in God, compromising the Father's monarchy.",
  why:"For the Orthodox the Father is the sole source (aitia) of Son and Spirit; the Latin addition seemed to them a violation of the Council of Ephesus' ban on altering the Creed, made without an ecumenical council.",
  reply:`<ol><li><strong>Same verse.</strong> The Son sends the Spirit (\"whom I will send you\"), and the Spirit \"shall receive of mine\" (16:14); \"all things whatsoever the Father hath are mine\" (16:15). He is also called \"the Spirit of his Son\" (Gal 4:6).</li>
<li><strong>Thomas's argument:</strong> divine persons are distinguished only by opposed relations of origin; if the Spirit were not from the Son, nothing would distinguish Son and Spirit (ST I q.36 a.2).</li>
<li><strong>One principle.</strong> The Church does not teach two sources: the Father and Son are \"one principle\" of the Spirit, and the Father is the source without source (Council of Florence, 1439; CCC 246–248).</li>
<li><strong>Greek Fathers.</strong> \"From the Father through the Son\" (e.g. Maximus the Confessor; Cyril of Alexandria), which Florence accepted as equivalent in meaning.</li>
<li><strong>Honest note.</strong> The addition entered the Creed in Spain (Toledo, 589) and in the Roman liturgy only in 1014. The Pontifical Council for Promoting Christian Unity (1995) explained that the Latin procedit translates a broader term than the Greek ekporeuesthai, and the Catholic Church recites the Creed in Greek without the Filioque on some occasions.</li></ol>`,
  sources:["Thomas Aquinas, ST I q.36 a.2; Contra errores Graecorum II.1–31.","Council of Florence (1439) Laetentur Caeli.","PCPCU (1995) The Greek and Latin Traditions regarding the Procession of the Holy Spirit.","CCC 246–248."],
  rejoinder:"\"Being distinguished by relations does not require procession from the Son; the Spirit could be distinguished by proceeding as opposed to being begotten.\"",
  answer:"This is the strongest Orthodox reply. Thomas's answer is that two modes of origin from the same person are distinguished only by an order between them, which itself requires a relation of the Spirit to the Son (ST I q.36 a.2). The question remains under discussion between the Churches.",
  q:Q("Thomas's main argument for the Filioque is that…",[["Rome added it, so it must be true","Not an argument."],["persons are distinguished only by opposed relations of origin","Correct: ST I q.36 a.2."],["the Spirit is less than the Son","No."]],1),
  model:"The Son sends the Spirit and the Spirit receives from what is his (John 15:26; 16:14–15). Since divine persons differ only by opposed relations of origin, Son and Spirit must be related by origin (ST I q.36 a.2). Father and Son are one principle, the Father the source without source, which the Greek \"through the Son\" expresses.",
  keys:["John 16:14–15","opposed relations","one principle, Father unoriginate","through the Son","honest history: 589, 1014, PCPCU 1995"]},
 {id:"d-acts15",trad:"orthodox",title:"Acts 15: councils, not popes?",ref:"Acts 15:7, 13–22",src:[["acts",15,7,7]],
  obj:"At the Council of Jerusalem, James presides and gives the decision (15:19). The Church is governed by councils of bishops, equal in power; Rome had a primacy of honour, not of jurisdiction.",
  why:"The Orthodox see the first millennium as conciliar, with the pope as first among equals, and the later papacy (Vatican I) as a novelty.",
  reply:`<ol><li><strong>Peter speaks first and decisively</strong> after \"much disputing\" (15:7–11), and then the assembly falls silent (15:12). James, the local bishop, confirms Peter's teaching (\"Simon hath declared\", 15:14).</li>
<li><strong>Councils received Rome's teaching.</strong> At Chalcedon (451) the bishops acclaimed Leo's Tome: \"Peter has spoken through Leo.\"</li>
<li><strong>Thomas:</strong> a new edition of the Creed belongs to the pope's authority, because the Church must have one faith, and questions of faith are referred to him (ST II-II q.1 a.10).</li>
<li><strong>Honest note.</strong> The first-millennium exercise of papal primacy differed from the second. John Paul II invited the Orthodox to help find a form of primacy acceptable to both (Ut Unum Sint 95, 1995); the Catholic–Orthodox Ravenna Document (2007) agreed that primacy and conciliarity belong together.</li></ol>`,
  sources:["Thomas Aquinas, ST II-II q.1 a.10.","Acts of the Council of Chalcedon, Session 2 (451).","John Paul II (1995) Ut Unum Sint 95.","Joint International Commission (2007) Ravenna Document."],
  rejoinder:"\"Vatican I's infallibility was unknown to the early Church.\"",
  answer:"The doctrine was defined in 1870, but the practice of appealing to Rome as final in faith is early: Irenaeus (Against Heresies III.3.2) says every Church must agree with Rome because of its pre-eminent authority.",
  q:Q("At the Council of Jerusalem, who speaks first to settle the dispute?",[["James","He speaks after Peter."],["Peter","Correct: Acts 15:7."],["Paul","He reports afterwards."]],1),
  model:"Peter settles the dispute (Acts 15:7–11), James confirms it, and later councils received Roman teaching (\"Peter has spoken through Leo\"). Thomas grounds papal authority in the unity of faith (ST II-II q.1 a.10), while Catholics acknowledge that the form of primacy can be renewed (Ut Unum Sint 95).",
  keys:["Peter first, assembly silent","James confirms","Chalcedon: Peter through Leo","ST II-II q.1 a.10","Ut Unum Sint 95 / Ravenna"]}
];

// MCQ option shuffle (same deterministic method as lessons)
(function(){function h(str){let x=2166136261;for(const c of str){x^=c.charCodeAt(0);x=Math.imul(x,16777619);}return x>>>0;}
 DISPS.forEach(d=>{const q=d.q;const idx=q.opts.map((_,i)=>i);let seed=h(q.prompt);for(let i=idx.length-1;i>0;i--){seed=Math.imul(seed^(seed>>>15),2246822507)>>>0;const j=seed%(i+1);[idx[i],idx[j]]=[idx[j],idx[i]];}
  q.opts=idx.map(i=>q.opts[i]);q.ans=idx.indexOf(q.ans);});})();

TERMS.push(
 {id:"filioque",t:"Filioque",la:"Filioque",d:"Trinity",b:"\"And the Son\": the Latin phrase saying the Holy Spirit proceeds from the Father and the Son.",p:"The doctrine that the Spirit proceeds from Father and Son as from one principle, the Father being the source without source; added to the Creed in Spain (589) and in Rome (1014); a main point of dispute with the Orthodox.",ex:"\"Who proceeds from the Father and the Son\" in the Latin Creed.",where:"ST I q.36 a.2",ccc:"246–248",conf:"A claim of two sources in God.",rel:["procession","person"],lesson:"a1",alias:["Filioque"]},
 {id:"sola-fide",t:"Sola fide",la:"sola fide",d:"Controversy",b:"\"Faith alone\": the Protestant teaching that justification is received by faith alone, without works.",p:"Lutheran and Reformed principle that the sinner is justified (declared righteous) by faith alone, apart from works; Trent rejected the version that excludes charity (Session 6, canon 9); the Joint Declaration (1999) records partial consensus.",ex:"Luther's \"allein\" in Romans 3:28 (1522).",where:"Trent Session 6",ccc:"1987–1995",conf:"The Catholic teaching that justification is by grace, which Catholics also hold.",rel:["grace","faith"],lesson:"a1",alias:["sola fide","faith alone"]},
 {id:"sola-scriptura",t:"Sola scriptura",la:"sola scriptura",d:"Controversy",b:"\"Scripture alone\": the Protestant teaching that Scripture is the only infallible rule of faith.",p:"The principle that Scripture alone is the final authority, Tradition and Church teaching being subordinate and fallible; Catholic teaching holds Scripture and Tradition as one deposit served by the Magisterium (Dei Verbum 9–10).",ex:"Luther at Worms (1521).",where:"Dei Verbum 9–10",ccc:"80–82",conf:"Scripture's primacy, which Thomas and Catholics also affirm.",rel:["tradition","magisterium"],lesson:"a1",alias:["sola scriptura","Scripture alone"]},
 {id:"modalism",t:"Modalism",la:"modalismus",d:"Trinity",b:"The error that Father, Son and Spirit are only three ways one person appears.",p:"Teaching (associated with Sabellius, early 3rd century) that God is one person manifesting in three modes; condemned because it denies real distinction of persons; revived in Oneness Pentecostalism.",ex:"\"God was Father in creation, Son in the Incarnation, Spirit at Pentecost.\"",where:"ST I q.31 a.2",ccc:"253–254",conf:"Orthodox Trinitarian doctrine of three persons in one nature.",rel:["sabellianism","person"],lesson:"a1",alias:["modalism","Oneness"]},
 {id:"tahrif",t:"Tahrif",la:"—",d:"Islam",b:"The Islamic teaching that earlier scriptures were altered.",p:"Arabic for alteration or distortion: either of meaning (tahrif al-ma'na, misinterpretation) or of text (tahrif al-nass); used to explain differences between the Bible and the Qur'an.",ex:"\"The Gospels were corrupted, so the crucifixion story is unreliable.\"",where:"Qur'an 2:75; 4:46 (paraphrased)",ccc:"",conf:"Textual criticism, which studies actual manuscript variants.",rel:["inspiration","canon"],lesson:"a1",alias:["tahrif"]},
 {id:"theosis",t:"Theosis (deification)",la:"deificatio",d:"Grace",b:"Being made a sharer in God's own life by grace.",p:"Participation in the divine nature (2 Pet 1:4) by grace, the creature remaining a creature; central in Eastern theology and present in Thomas (grace as participation in the divine nature, ST I-II q.110 a.3).",ex:"\"God became man that man might become God\" (Athanasius), by grace.",where:"ST I-II q.110 a.3",ccc:"460",conf:"Becoming a separate god (LDS exaltation).",rel:["grace","participation"],lesson:"a1",alias:["theosis","deification"]},
 {id:"miaphysite",t:"Miaphysite",la:"—",d:"Christology",b:"The Oriental Orthodox way of speaking of Christ's one united divine-human nature.",p:"From Cyril's formula \"one incarnate nature of God the Word\": one nature united from two, without confusion; distinguished from Eutychian monophysitism; joint declarations (1973 onward) recognise a shared faith expressed differently.",ex:"Coptic and Armenian Christology.",where:"Common declaration of Paul VI and Shenouda III (1973)",ccc:"467",conf:"Monophysitism (Eutyches), which merges the natures.",rel:["hypostatic-union","nature"],lesson:"a1",alias:["miaphysite","miaphysitism"]}
);
TERMS.forEach(t=>{TERM_BY_ID[t.id]=t;});
