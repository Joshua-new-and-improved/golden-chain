// ---------- Book introductions and the timeline of salvation history ----------
// Dates: "traditional" follows the internal chronology of Scripture; "scholarly" gives the range most historians use.
// Both are given where they differ, because the Church does not bind the faithful to a chronology (DV 12; PBC 1993).
const BOOK_INTRO={};
const ERAS=[
 {id:"primeval",n:"Creation and the first ages",d:"Before recorded history",col:"#14707a",books:[["genesis","Genesis 1–11"]],
  s:"God creates a good and ordered world and makes man and woman in his image. Human disobedience breaks communion with God, with one another and with creation; violence spreads from Cain to the Flood; God renews creation through Noah and scatters proud humanity at Babel.",
  more:"These chapters answer the deepest questions (why there is anything, why we are as we are, why evil exists) in the form of a sacred, figurative history. The Church teaches that they recount real events, the creation of all things by God and a fall at the beginning of human history, using symbolic language (CCC 337, 390). Look for: the six days as a liturgical week ending in the Sabbath; the first promise of a Redeemer (Gen 3:15, the 'Protoevangelium'); covenant with Noah and all living things.",
  figures:"Adam, Eve, Cain, Abel, Seth, Enoch, Noah"},
 {id:"patriarchs",n:"The patriarchs",d:"c. 2000–1700 BC (traditional); the stories are set in the Middle Bronze Age",col:"#8e1f55",books:[["genesis","Genesis 12–50"],["job","Job (set in patriarchal times)"]],
  s:"God calls Abram out of Ur and Haran and promises land, descendants and blessing for all nations. The promise passes, often against the odds, to Isaac, then Jacob (renamed Israel), whose twelve sons become the twelve tribes. Joseph, sold by his brothers, rises in Egypt and saves the family from famine.",
  more:"Salvation history narrows to one family so that it can widen to all peoples (Gen 12:3; Gal 3:8). Key moments: the covenant 'between the pieces' (Gen 15), circumcision (Gen 17), the binding of Isaac on Moriah (Gen 22), Jacob's wrestling (Gen 32), Joseph's forgiveness (Gen 50:20).",
  figures:"Abraham, Sarah, Hagar, Ishmael, Isaac, Rebekah, Esau, Jacob, Rachel, Leah, Judah, Joseph"},
 {id:"exodus",n:"Egypt and the Exodus",d:"Traditional c. 1446 BC (1 Kgs 6:1); many scholars c. 1250 BC",col:"#b8322a",books:[["exodus","Exodus"],["leviticus","Leviticus"]],
  s:"Jacob's descendants multiply in Egypt and are enslaved. God reveals his name to Moses at the burning bush, strikes Egypt with plagues, saves Israel through the Passover and the Red Sea, and at Sinai makes Israel his covenant people, gives the Law, and comes to dwell among them in the Tabernacle.",
  more:"The Exodus is the central saving event of the Old Testament and the pattern for Christ's Passover from death to life (CCC 1150, 1334, 1363). The Law of Sinai shapes the rest of the Bible: the Ten Commandments (CCC 2056–2063), the priesthood, sacrifice and holiness codes of Leviticus.",
  figures:"Moses, Aaron, Miriam, Pharaoh, Jethro, Joshua, Bezalel"},
 {id:"wilderness",n:"The wilderness years",d:"Forty years after Sinai",col:"#a6814c",books:[["numbers","Numbers"],["deuteronomy","Deuteronomy"]],
  s:"Israel travels from Sinai toward Canaan but refuses to enter the land when the spies report giants. A faithless generation dies in the desert; its children are counted, tested and taught. On the plains of Moab Moses renews the covenant in three great sermons and dies within sight of the land.",
  more:"The desert is the Bible's school of trust: manna, water from the rock, murmuring, rebellion and mercy (1 Cor 10:1–11 reads it as a warning and a type of the sacraments). Deuteronomy's 'Hear, O Israel' (6:4–5) becomes the first commandment Jesus names (Mk 12:29–30).",
  figures:"Moses, Aaron, Miriam, Caleb, Joshua, Korah, Balaam, Phinehas"},
 {id:"judges",n:"Conquest and the Judges",d:"c. 1400–1050 BC traditional; c. 1200–1050 BC scholarly",col:"#1f7a43",books:[["joshua","Joshua"],["judges","Judges"],["ruth","Ruth"]],
  s:"Under Joshua Israel crosses the Jordan, takes Jericho and divides the land among the tribes. After Joshua's death Israel falls into a repeating cycle: sin, oppression, crying out, a judge raised up to deliver, then relapse. Ruth, a Moabite widow, shows quiet covenant faithfulness and becomes David's great-grandmother.",
  more:"These books ask what happens when a people has God's law but no faithful leadership: 'every one did that which seemed right to himself' (Judg 21:24). Joshua's name is the Hebrew form of Jesus, 'the Lord saves'.",
  figures:"Joshua, Rahab, Deborah, Gideon, Jephthah, Samson, Ruth, Naomi, Boaz"},
 {id:"kingdom",n:"The united kingdom",d:"c. 1050–930 BC",col:"#5b3a9a",books:[["1-samuel","1 Samuel"],["2-samuel","2 Samuel"],["1-kings","1 Kings 1–11"],["1-chronicles","1 Chronicles"],["2-chronicles","2 Chronicles 1–9"],["psalms","Psalms (many of David)"],["proverbs","Proverbs (Solomonic core)"],["ecclesiastes","Ecclesiastes"],["song-of-songs","Song of Songs"]],
  s:"Samuel, the last judge, anoints Saul as Israel's first king. Saul fails; David, the shepherd from Bethlehem, defeats Goliath, unites the tribes, makes Jerusalem his capital and brings the Ark there. God promises David an everlasting dynasty (2 Sam 7). Solomon builds the Temple and is famed for wisdom, but his idolatry sows division.",
  more:"The Davidic covenant is the hinge of messianic hope: the Messiah will be 'son of David' and his kingdom will have no end (Lk 1:32–33; CCC 709). Israel's worship (Psalms) and wisdom (Proverbs, Ecclesiastes, Song) are associated with this golden age.",
  figures:"Samuel, Hannah, Saul, Jonathan, David, Bathsheba, Nathan, Absalom, Solomon"},
 {id:"divided",n:"The divided kingdom and the prophets",d:"930–587 BC (Samaria falls 722; Jerusalem 587/586)",col:"#2e2e33",books:[["1-kings","1 Kings 12–22"],["2-kings","2 Kings"],["2-chronicles","2 Chronicles 10–36"],["amos","Amos"],["hosea","Hosea"],["isaiah","Isaiah 1–39"],["micah","Micah"],["jonah","Jonah"],["joel","Joel"],["nahum","Nahum"],["zephaniah","Zephaniah"],["habakkuk","Habakkuk"],["jeremiah","Jeremiah"],["tobit","Tobit (set in the Assyrian exile)"]],
  s:"After Solomon the kingdom splits: Israel in the north (capital Samaria), Judah in the south (Jerusalem). Northern kings promote idolatry; Elijah and Elisha confront them. Prophets warn of judgment and promise a remnant and a new David. Assyria destroys Samaria in 722 BC; Judah survives longer under reforming kings like Hezekiah and Josiah, but falls to Babylon in 587 BC.",
  more:"The prophets are covenant prosecutors: they call Israel back to the Law and to justice for the poor, and they look beyond judgment to a new covenant written on the heart (Jer 31:31–34), a virgin-born Emmanuel (Isa 7:14), and a suffering Servant (Isa 53).",
  figures:"Jeroboam, Ahab, Jezebel, Elijah, Elisha, Hezekiah, Josiah, Isaiah, Jeremiah, Amos, Hosea"},
 {id:"exile",n:"Exile in Babylon",d:"587–538 BC",col:"#24407a",books:[["lamentations","Lamentations"],["ezekiel","Ezekiel"],["daniel","Daniel"],["baruch","Baruch"],["isaiah","Isaiah 40–55"],["psalms","Psalms of exile (e.g. 136 [137])"]],
  s:"Jerusalem and the Temple are destroyed and the leading families deported to Babylon. Far from the land, Israel mourns, repents and learns that God is not confined to one place. Ezekiel sees God's glory leave the Temple and promises a new heart and a new temple; Daniel keeps faith in a pagan court; Isaiah's later chapters announce comfort and return.",
  more:"Exile becomes a lasting biblical image of sin's effect and of the human condition before redemption. Much of the Old Testament reached its final shape during or after it.",
  figures:"Nebuchadnezzar, Ezekiel, Daniel, Shadrach, Meshach and Abednego, Baruch, Cyrus"},
 {id:"return",n:"Return and restoration",d:"538–c. 400 BC (Persian period)",col:"#3d8fb6",books:[["ezra","Ezra"],["nehemiah","Nehemiah"],["esther","Esther"],["haggai","Haggai"],["zechariah","Zechariah"],["malachi","Malachi"],["isaiah","Isaiah 56–66"],["1-chronicles","Chronicles (written now)"]],
  s:"Cyrus of Persia lets the exiles return. Under Zerubbabel and the high priest Joshua they rebuild the Temple (completed 515 BC), urged on by Haggai and Zechariah. Ezra brings the Law and reforms the community; Nehemiah rebuilds Jerusalem's walls. In Persia, Esther saves her people from destruction.",
  more:"The restoration is real but modest: no Davidic king reigns, and the prophets look ahead to a messenger who will prepare the Lord's way (Mal 3:1), fulfilled in John the Baptist (Mk 1:2).",
  figures:"Cyrus, Zerubbabel, Haggai, Zechariah, Ezra, Nehemiah, Esther, Mordecai"},
 {id:"maccabees",n:"Greeks, Maccabees and the eve of the Messiah",d:"333–4 BC",col:"#d0782a",books:[["1-maccabees","1 Maccabees"],["2-maccabees","2 Maccabees"],["judith","Judith"],["sirach","Sirach"],["wisdom","Wisdom"],["daniel","Daniel 7–12 (visions)"]],
  s:"Alexander the Great conquers the East; his successors rule Judea. Antiochus IV Epiphanes tries to force Greek religion on the Jews and desecrates the Temple (167 BC). Mattathias and his sons, led by Judas Maccabeus, revolt, purify the Temple (the origin of Hanukkah) and win independence. Rome takes control in 63 BC and Herod is made king.",
  more:"These centuries give the Church the deuterocanonical books that teach the resurrection of the body (2 Macc 7), prayer for the dead (2 Macc 12:46; CCC 1032), and creation from nothing (2 Macc 7:28; CCC 297), and the wisdom literature that prepares for the Word made flesh.",
  figures:"Alexander, Antiochus IV, Mattathias, Judas Maccabeus, Jonathan, Simon, Eleazar, the mother and her seven sons, Ben Sira"},
 {id:"messiah",n:"The Messiah",d:"c. 6 BC–AD 30/33",col:"#c09a2c",books:[["matthew","Matthew"],["mark","Mark"],["luke","Luke"],["john","John"]],
  s:"The Word becomes flesh. Jesus is born of the Virgin Mary in Bethlehem, baptised by John, proclaims the Kingdom of God, calls the Twelve, heals and forgives, gives Peter the keys, institutes the Eucharist at the Last Supper, dies on the Cross, rises on the third day and ascends to the Father.",
  more:"Everything before points here, and everything after flows from here. The Gospels are 'the heart of all the Scriptures' (CCC 125), the principal witness to the life and teaching of the incarnate Word.",
  figures:"Jesus, Mary, Joseph, John the Baptist, Peter, the Twelve, Mary Magdalene, Pilate, Caiaphas"},
 {id:"church",n:"The Church",d:"AD 30–c. 100",col:"#6c7a89",books:[["acts","Acts"],["romans","Romans"],["1-corinthians","1–2 Corinthians"],["galatians","Galatians"],["ephesians","Ephesians"],["philippians","Philippians"],["colossians","Colossians"],["1-thessalonians","1–2 Thessalonians"],["1-timothy","1–2 Timothy, Titus"],["philemon","Philemon"],["hebrews","Hebrews"],["james","James"],["1-peter","1–2 Peter"],["1-john","1–3 John"],["jude","Jude"],["revelation","Revelation"]],
  s:"At Pentecost the Spirit is poured out and the Church is born. The Gospel spreads from Jerusalem to Samaria, Antioch and Rome. Paul is converted and becomes the apostle of the Gentiles; the Council of Jerusalem decides that Gentiles need not be circumcised. Letters guide the young churches in doctrine and life; Revelation unveils Christ's victory and the heavenly liturgy.",
  more:"The age of the Church continues until Christ returns. The New Testament closes with the Bride's prayer: 'Come, Lord Jesus' (Rev 22:20).",
  figures:"Peter, Paul, James, John, Stephen, Philip, Barnabas, Timothy, Lydia, Priscilla and Aquila"}
];
const ERA_BY=Object.fromEntries(ERAS.map(e=>[e.id,e]));

function bookIntroHTML(slug,bname,ch){
  const I=BOOK_INTRO[slug]; if(!I) return "";
  const E=ERA_BY[I.era]||{col:"#555",n:""};
  const sec=(I.outline||[]).find(o=>ch>=o[0]&&ch<=o[1]);
  const head=`<div class="bi-band" style="--era:${E.col}"><div class="bi-era"><a href="#timeline" data-era="${I.era}">${esc(E.n)}</a></div><div class="bi-title">${esc(bname)}</div><div class="bi-sub">${esc(I.when)}${I.genre?` · ${esc(I.genre)}`:""}</div></div>`;
  const body=`<div class="bi-card">
   <p class="bi-lede">${I.lede}</p>
   <h3>What happens</h3>${I.story}
   ${I.outline?`<h3>How the book is built</h3><ol class="bi-out">${I.outline.map(o=>`<li class="${sec===o?"here":""}"><button data-ch="${o[0]}" class="linklike">${o[0]===o[1]?`Ch. ${o[0]}`:`Ch. ${o[0]}–${o[1]}`}</button> ${o[2]}</li>`).join("")}</ol>`:""}
   ${I.people?`<h3>Who's who</h3><div class="bi-people">${I.people.map(p=>`<div class="bi-p"><div class="bi-pn">${esc(p[0])}</div><div class="bi-pd">${p[1]}</div>${p[2]?`<div class="bi-pr"><span>Why it matters:</span> ${p[2]}</div>`:""}</div>`).join("")}</div>`:""}
   ${I.themes?`<h3>Great themes</h3><div class="bi-themes">${I.themes.map(t=>`<div><strong>${esc(t[0])}.</strong> ${t[1]}</div>`).join("")}</div>`:""}
   ${I.christ?`<div class="co bridge"><div class="co-h">Christ in ${esc(bname)}</div><p>${I.christ}</p></div>`:""}
   ${I.church?`<div class="co core"><div class="co-h">For theology and the Church</div><p>${I.church}</p></div>`:""}
   ${I.thomas?`<div class="co extra"><div class="co-h">St Thomas and the Fathers</div><p>${I.thomas}</p></div>`:""}
   ${I.hard?`<h3>Hard questions</h3>${I.hard.map(h=>`<details class="bi-hard"><summary>${esc(h[0])}</summary><p>${h[1]}</p></details>`).join("")}`:""}
   ${I.keys?`<h3>Passages to know</h3><ul class="bi-keys">${I.keys.map(k=>`<li><strong>${esc(k[0])}</strong>: ${k[1]}</li>`).join("")}</ul>`:""}
   ${I.author?`<p class="ui muted bi-auth"><strong>Author and date.</strong> ${I.author}</p>`:""}
  </div>`;
  if(ch===1) return `<details class="bookintro" ${innerWidth>900?"open":""}><summary>${head}</summary>${body}</details>`;
  const here=sec?`<div class="bi-here">You are in: ${sec[2]} (ch. ${sec[0]}–${sec[1]})</div>`:"";
  const mh=head.replace('<div class="bi-title">','<div class="bi-title"><span class="ui" style="font-size:.8rem;font-weight:600;opacity:.85">About the book · </span>').replace(/<\/div>$/,here+"</div>");
  return `<details class="bookintro mini"><summary>${mh}</summary>${body}</details>`;
}

function renderTimeline(){
  const v=$("#v-timeline");
  v.innerHTML=`<div class="label">Salvation history</div><h1>The story of the Bible, in order</h1>
  <p style="max-width:44em;color:var(--muted);font-size:1.05rem">Twelve periods from creation to the Church. Each lists the books that belong to it (by setting or by when they were written), the people to know, and what the period means for the whole story. Tap a book to open its introduction.</p>
  <div class="row" style="margin:10px 0 18px"><a class="btn" href="#reader">← Back to the Reader</a></div>
  <div class="tl">${ERAS.map((e,i)=>`<section class="tl-era" id="era-${e.id}" style="--era:${e.col}"><div class="tl-num">${i+1}</div><h2>${esc(e.n)}</h2><div class="tl-d">${esc(e.d)}</div>
   <div class="tl-books">${e.books.map(([s,l])=>`<a class="chip" href="#reader" data-tbook="${s}">${esc(l)}</a>`).join("")}</div>
   <div class="tl-card"><p>${e.s}</p><details><summary>Show more</summary><p>${e.more}</p><p><strong>People:</strong> ${esc(e.figures)}</p></details></div></section>`).join("")}</div>`;
  $$("[data-tbook]",v).forEach(a=>a.onclick=()=>{const m=a.textContent.match(/ (\d+)[–-]/);S.book=a.dataset.tbook;S.ch=m?+m[1]:1;save();});
  const want=renderTimeline._era; renderTimeline._era=null;
  if(want) setTimeout(()=>{const el=$("#era-"+want);if(el)el.scrollIntoView({behavior:"smooth"});},50);
}
document.addEventListener("click",e=>{const a=e.target.closest("[data-era]");if(a)renderTimeline._era=a.dataset.era;});
