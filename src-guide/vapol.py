# Verse apologetics: popular Protestant proof-texts, shown in the Bible reader at the verse and listed in Apologetics.
# Verse numbers follow the Douay-Rheims text in bible/. Output: vapol/index.json
import json,sys
E=[]
def add(slug,ch,v,label,t,claim,why,cath,src,disp=None,tags=()):
    E.append(dict(s=slug,c=ch,v=v,ref=label,t=t,claim=claim,why=why,cath=cath,src=src,disp=disp,tags=list(tags)))

# ---------------- Salvation, faith and works ----------------
add('luke',23,43,'Luke 23:43','The thief on the cross',
 'The repentant thief was saved without baptism, without good works and without the Church. So, it is argued, baptism and works are not needed: a moment of faith is enough, and anything more is human addition.',
 ['The thief died before the new covenant sacraments were given. Jesus commanded baptism after his resurrection (Matthew 28:19), and the Church received the Spirit at Pentecost. You cannot be bound by a command that has not yet been given.',
  'The Church has never taught that God is bound to the sacraments. She teaches that we are bound to them. Someone who desires baptism but dies before receiving it can be saved by that desire joined to repentance and charity (CCC 1258–1260). The thief is a model of exactly that.',
  'He was not saved by a bare mental assent. In his last hour he did everything he still could: he confessed his guilt ("we receive the due reward of our deeds"), defended Christ publicly, rebuked the other thief, and prayed. That is faith working through love (Galatians 5:6), which is what Catholics mean by saving faith.',
  'An exception does not cancel the normal rule. A man rescued from a shipwreck without a boat does not prove that boats are unnecessary. The normal way Christ appointed is faith and baptism (Mark 16:16; John 3:5; Acts 2:38).',
  'Some also use "this day you will be in paradise" against purgatory. But "paradise" here is the rest of the just who awaited Christ, the place he descended to after his death (1 Peter 3:19; CCC 633). The thief\'s suffering, accepted with contrition beside Christ, is itself a powerful purification.'],
 'The thief shows God\'s generosity to a sinner who repents at the very end. It is a reason never to despair, not a pattern for skipping what Christ commanded.',
 'CCC 1257–1261, 633; ST III q.66 a.11; q.68 a.2',
 tags=('salvation','baptism'))
add('ephesians',2,8,'Ephesians 2:8–9','"By grace you are saved through faith… not of works"',
 'This verse is taken to prove that Catholics teach salvation by works, while the Bible teaches salvation by faith alone.',
 ['Catholics agree with every word of it. The Council of Trent taught that "none of those things which precede justification, whether faith or works, merit the grace itself of justification" (Session 6, ch. 8). Salvation begins as pure gift.',
  'Read verse 10: "For we are his workmanship, created in Christ Jesus in good works, which God hath prepared that we should walk in them." Works are not the price of grace; they are what grace produces. Paul joins the two; the slogan separates them.',
  'The verse speaks of salvation coming "through faith" but never says "faith alone". The only place Scripture uses the phrase "faith alone" is James 2:24, which denies it.',
  'What the Church rejects is not grace but the idea that a person, once justified, need not cooperate with grace, keep the commandments or persevere in love.'],
 'Saved by grace, through faith, for good works. The first move is God\'s; our works are his work in us, and he rewards his own gifts.',
 'Trent, Session 6, chs. 7–8, 16; CCC 1996–2011; ST I-II q.114 a.1–2',
 tags=('salvation','grace'))
add('romans',3,28,'Romans 3:28','"Justified by faith, without the works of the law"',
 'This is often read as "justified by faith alone, apart from any good works", and Luther added the word "alone" to his German translation.',
 ['The "works of the law" in Romans are the works of the Mosaic Law, especially circumcision. Paul\'s very next sentence explains: "Is he the God of the Jews only? Is he not also of the Gentiles?" (3:29). The point is that a Gentile does not have to become a Jew to be saved.',
  'Paul never writes "faith alone". Luther added "allein" in 1522 and defended the addition as conveying the sense. The only verse with the words "faith alone" is James 2:24: "by works a man is justified, and not by faith only."',
  'Paul himself says God "will render to every man according to his works" (Romans 2:6) and that what counts is "faith that worketh by charity" (Galatians 5:6).',
  'So Paul and James do not contradict each other. Paul excludes the old Law as a way of earning God\'s favour; James excludes a dead faith that does nothing.'],
 'We are justified by faith that is alive with love, not by keeping the ritual law of Moses.',
 'Trent, Session 6, chs. 7–10; CCC 1987–1995; Luther, Sendbrief vom Dolmetschen (1530)',
 disp='d-rom3',tags=('salvation','justification'))
add('galatians',2,16,'Galatians 2:16','"Not justified by the works of the law"',
 'Taken as proof that any good work done by a Christian plays no part in salvation.',
 ['The context is Peter withdrawing from table fellowship with Gentile Christians to please those who insisted on circumcision (2:11–14). The "works of the law" are the Jewish ceremonial law, not love of neighbour.',
  'In the same letter Paul says that those who do the works of the flesh "shall not obtain the kingdom of God" (5:21), and that "what things a man shall sow, those also shall he reap" (6:7). Behaviour matters for salvation.',
  'Catholics fully accept that no one is justified by the Mosaic Law. Justification comes through faith in Christ, received in baptism, and lived out in charity.'],
 'Christ, not circumcision and the old ceremonies, makes us right with God.',
 'CCC 1992; Trent, Session 6, ch. 7; Thomas, Commentary on Galatians, ch. 2, lect. 4',
 tags=('salvation','justification'))
add('romans',4,5,'Romans 4:5','"His faith is counted for righteousness"',
 'The idea is that God only declares a sinner righteous, like a judge acquitting a guilty man, while the person stays inwardly unchanged ("imputed" righteousness).',
 ['When God declares something, it happens: "God said: Be light made. And light was made" (Genesis 1:3). God\'s verdict is not a legal fiction but a creative word.',
  'Paul says that by Christ\'s obedience "many shall be made just" (Romans 5:19), that God\'s love "is poured forth in our hearts by the Holy Ghost" (5:5), and that anyone in Christ is "a new creature" (2 Corinthians 5:17). Justification changes us.',
  'Trent puts it this way: we are not only reputed but truly called and are just, receiving justice within us (Session 6, ch. 7).'],
 'God does not merely cover sin; he removes it and makes the sinner holy by grace poured into the soul.',
 'Trent, Session 6, ch. 7 and canon 11; CCC 1989–1992; ST I-II q.113 a.1–2',
 tags=('justification','grace'))
add('romans',10,9,'Romans 10:9','Confess with your mouth and you will be saved',
 'Used for the "sinner\'s prayer": say the words once, sincerely, and you are saved for good.',
 ['Paul is describing the faith that saves, not offering a one-time formula. The same Paul says we are saved by baptism, "buried together with him by baptism into death" (Romans 6:3–4).',
  'Jesus warns: "Not every one that saith to me, Lord, Lord, shall enter into the kingdom of heaven: but he that doth the will of my Father" (Matthew 7:21).',
  'In the early Church this confession, "Jesus is Lord", was made at baptism. Confession of faith, baptism and a changed life belong together (Acts 2:38).'],
 'Confessing Christ is necessary, and it is the beginning of a life of faith lived in the Church, not the end of the matter.',
 'CCC 185–187, 1229–1233; Acts 8:36–38',
 tags=('salvation','baptism'))
add('1-john',5,13,'1 John 5:13','"That you may know that you have eternal life"',
 'Read as proof of "once saved, always saved": a believer can be absolutely certain of final salvation.',
 ['John writes so that believers may have confidence, and Catholics share that hope. But John himself attaches a condition: "He that keepeth his commandments, abideth in him" (1 John 3:24), and he distinguishes sin that leads to death from sin that does not (5:16–17).',
  'Scripture warns believers that they can fall away: "work out your salvation with fear and trembling" (Philippians 2:12); "he that thinketh himself to stand, let him take heed lest he fall" (1 Corinthians 10:12); Hebrews 6:4–6.',
  'Paul himself says he disciplines his body "lest perhaps, when I have preached to others, I myself should become a castaway" (1 Corinthians 9:27).',
  'The Church teaches firm hope, not presumption. Without a special revelation no one can know with the certainty of faith that he will persevere to the end (Trent, Session 6, chs. 9 and 13).'],
 'We can be confident in God\'s faithfulness, and we must stay faithful ourselves. Hope, not a guarantee that ignores how we live.',
 'Trent, Session 6, chs. 9, 12–13; CCC 1821, 2016, 1861',
 tags=('salvation','assurance'))
add('philippians',2,12,'Philippians 2:12','Work out your salvation with fear and trembling',
 'A Catholic proof-text, sometimes dismissed by Protestants as meaning only "show outwardly the salvation you already have for certain".',
 ['Paul addresses believers and asks them to work at their salvation, with fear. The next verse gives the balance: "For it is God who worketh in you, both to will and to accomplish" (2:13).',
  'Both are true at once: God acts first and throughout, and we really cooperate. This is the Catholic teaching on grace and freedom.'],
 'God works in us, and we work with him. Salvation is a gift we can still refuse.',
 'CCC 2001–2002, 2008; Trent, Session 6, ch. 5',
 tags=('salvation','grace'))
add('hebrews',6,4,'Hebrews 6:4–6','Those who fall away after being enlightened',
 'Some Protestant traditions hold that a truly saved person can never lose salvation, so they explain this text as describing people who were never really believers.',
 ['The description is of genuine Christians: "once illuminated", having "tasted the heavenly gift", "made partakers of the Holy Ghost". The Fathers often read "illuminated" as meaning baptised.',
  'The warning only makes sense if real believers can fall. Its point is that apostasy is extremely serious, not that repentance is impossible for God: the Church has always reconciled repentant sinners (2 Corinthians 2:7–8).'],
 'A Christian can fall from grace by grave sin, and can be restored by repentance and the sacrament of penance.',
 'CCC 1856, 1446; Trent, Session 6, ch. 14',
 tags=('salvation','assurance'))

# ---------------- Scripture and Tradition ----------------
add('2-timothy',3,16,'2 Timothy 3:16–17','"All scripture is inspired"',
 'Taken as proof of sola scriptura: the Bible alone is the sufficient rule of faith, so tradition and the teaching authority of the Church are unnecessary.',
 ['The verse says Scripture is inspired and "profitable". It does not say it is the only authority. A thing can be profitable without being the only thing needed.',
  'The "scripture" Timothy knew "from thy infancy" (3:15) was the Old Testament. If the verse proved sufficiency, it would prove the Old Testament was sufficient without the New.',
  'Paul tells the same Church to "hold the traditions, which you have learned, whether by word or by our epistle" (2 Thessalonians 2:14), and calls the Church, not the Bible, "the pillar and ground of the truth" (1 Timothy 3:15).',
  'No verse lists which books belong in the Bible. That was recognised by the Church in councils such as Rome (382), Hippo (393) and Carthage (397). Sola scriptura cannot be proved from Scripture alone.'],
 'Scripture is God\'s inspired word, handed on and interpreted within the living Tradition of the Church, which wrote, collected and guards it.',
 'Dei Verbum 9–10; CCC 80–83, 120; Trent, Session 4',
 disp='d-2tim3',tags=('scripture','tradition'))
add('mark',7,8,'Mark 7:8','"You hold the tradition of men"',
 'Jesus condemned tradition, so Catholic tradition must be condemned too.',
 ['Jesus condemns human traditions that cancel God\'s commandment. His example is "Corban", a custom that let people avoid supporting their parents (7:10–13). He is not condemning tradition as such.',
  'The New Testament praises apostolic tradition: "I praise you, brethren… that you keep my ordinances [traditions] as I delivered them to you" (1 Corinthians 11:2); "hold the traditions" (2 Thessalonians 2:14).',
  'Even the Gospels were tradition preached by word before they were written down (Luke 1:1–2).'],
 'Human customs that override God\'s law are rejected. The apostolic Tradition handed on from Christ is part of God\'s word.',
 'CCC 75–83; Dei Verbum 8',
 tags=('tradition',))
add('matthew',15,9,'Matthew 15:9','"Teaching doctrines and commandments of men"',
 'Used against Catholic practices such as fasting rules, feast days or priestly celibacy as "commandments of men".',
 ['Jesus applies Isaiah to those who use human rules to escape God\'s law. The Church\'s disciplines are not taught as divine law where they are not, and they help people keep God\'s law.',
  'Christ gave his apostles authority to bind and loose (Matthew 18:18), and they made disciplinary rules themselves (Acts 15:28–29).'],
 'The Church distinguishes unchangeable doctrine from disciplines she sets with Christ\'s authority for the good of souls.',
 'CCC 553, 2041–2043; Acts 15',
 tags=('tradition',))
add('revelation',22,18,'Revelation 22:18','"If any man shall add to these things"',
 'Used to say Catholics "added books" to the Bible (Tobit, Judith, Wisdom, Sirach, Baruch, the Maccabees).',
 ['The warning is about "the words of the prophecy of this book", that is, Revelation itself. Deuteronomy 4:2 has a similar warning, and later books were still added to Scripture after it.',
  'The deuterocanonical books were not added by Catholics. They were in the Septuagint, the Greek Old Testament that the apostles mostly quoted, and in the canon lists of the councils of Rome (382), Hippo (393) and Carthage (397). The Reformers removed them in the 1500s.',
  'The New Testament echoes them: Hebrews 11:35 refers to the martyrs of 2 Maccabees 7, and Wisdom 2:12–20 is closely paralleled in Matthew 27:41–43.'],
 'The Church received a canon of 73 books from the early centuries and has kept it.',
 'Trent, Session 4 (1546); CCC 120',
 tags=('scripture',))

# ---------------- Eucharist and the Mass ----------------
add('john',6,64,'John 6:64 (6:63 in most Bibles)','"The flesh profiteth nothing"',
 'Read as Jesus explaining that the "eat my flesh" discourse was only symbolic: he meant spiritual believing, not real eating.',
 ['Jesus does not say "my flesh profits nothing". His flesh is given "for the life of the world" (6:52). "The flesh" here means the merely natural, unaided way of understanding, as in "flesh and blood hath not revealed it to thee" (Matthew 16:17).',
  '"The words that I have spoken to you are spirit and life" means they are words of the Holy Spirit, to be received by faith, not that they are figures of speech.',
  'Watch what happens next: "many of his disciples went back and walked no more with him" (6:67). If he had meant a symbol, he would have called them back and explained, as he did elsewhere when people misunderstood (Matthew 16:6–12). He let them go and asked the Twelve if they would leave too.',
  'Peter answers, "Lord, to whom shall we go? Thou hast the words of eternal life" (6:69). He accepts without understanding.'],
 'Only faith, given by the Spirit, can accept that the bread Christ gives is his real flesh. That is why "the flesh", unaided human reason, profits nothing here.',
 'CCC 1336, 1374–1381; Trent, Session 13; Augustine, Tractates on John 27',
 disp='d-john6',tags=('eucharist',))
add('luke',22,19,'Luke 22:19','"Do this for a commemoration of me"',
 'Taken to mean the Lord\'s Supper is only a memorial: we remember a past event, and the bread stays bread.',
 ['The Greek word is anamnesis. In the Passover, which Jesus is celebrating, a "memorial" (Exodus 12:14) is not just thinking about the past; it makes the saving event present to those who celebrate it.',
  'Jesus does not say "this represents my body" but "this is my body, which is given for you". Paul says the cup is "the communion of the blood of Christ" (1 Corinthians 10:16) and that receiving unworthily makes a person "guilty of the body and of the blood of the Lord" (11:27). You cannot be guilty of the body of a symbol.',
  'Every Christian writer of the first thousand years who discusses it takes the presence as real, for example Ignatius of Antioch (c. 107): "the Eucharist is the flesh of our Saviour Jesus Christ".'],
 'The Eucharist is a memorial in the biblical sense: it makes Christ\'s one sacrifice and his very Body and Blood present.',
 'CCC 1362–1366, 1374; Trent, Session 13 and 22; Ignatius, Letter to the Smyrnaeans 7',
 tags=('eucharist','mass'))
add('hebrews',10,10,'Hebrews 10:10–14','"Once for all"',
 'Christ\'s sacrifice was offered once for all, so the Mass, which Catholics call a sacrifice, must either repeat the Cross or deny that it was sufficient.',
 ['The Church agrees completely that the Cross was once for all and is all-sufficient. The Mass does not repeat it or add to it.',
  'The Mass is the same sacrifice made present. The victim is the same, Christ; the one who offers is the same, Christ, now through the ministry of priests; only the manner is different: bloody on Calvary, unbloody on the altar (Trent, Session 22, ch. 2).',
  'Hebrews itself shows Christ\'s offering continuing in heaven: he "always liveth to make intercession for us" (7:25), and Revelation shows him as "a Lamb standing as it were slain" (5:6). The Mass joins the Church on earth to that heavenly offering.',
  'Malachi foretold that "in every place there is sacrifice, and there is offered to my name a clean oblation" among the nations (Malachi 1:11). The early Church applied this to the Eucharist (Didache 14).'],
 'One sacrifice, once for all, made present on every altar so that its fruits reach every generation.',
 'Trent, Session 22, chs. 1–2; CCC 1364–1367; ST III q.83 a.1',
 tags=('mass','priesthood'))
add('1-corinthians',11,27,'1 Corinthians 11:27','Guilty of the body and blood of the Lord',
 'A Catholic proof-text. Some answer that the guilt is only for disrespecting a memorial meal.',
 ['Paul says the unworthy communicant is "guilty of the body and of the blood of the Lord" and eats "judgment to himself, not discerning the body" (11:29). Some, he says, had become sick and died (11:30).',
  'That language belongs to an offence against a person, not against a picture. It fits the real presence.'],
 'Because Christ is truly present, we examine our conscience before receiving and go to confession first after grave sin.',
 'CCC 1385; Trent, Session 13, ch. 7',
 tags=('eucharist',))
add('1-peter',2,9,'1 Peter 2:9','"A kingly priesthood"',
 'All believers are priests, so there is no need for a separate ordained priesthood.',
 ['Peter is quoting Exodus 19:6, where God called all Israel "a priestly kingdom". Israel still had an ordained priesthood of Aaron. A priestly people and a ministerial priesthood existed together.',
  'Catholics teach the same: all the baptised share in Christ\'s priesthood by offering their lives, prayer and work to God. Some are ordained to act in the person of Christ the Head, especially at the Eucharist (Luke 22:19; Romans 15:16, where Paul calls his ministry a priestly service).'],
 'The common priesthood of all the faithful and the ministerial priesthood differ in kind, and each serves the other.',
 'Lumen Gentium 10; CCC 1546–1547, 1591–1592',
 tags=('priesthood',))

# ---------------- Peter, the Church, confession ----------------
add('matthew',16,18,'Matthew 16:18','"Upon this rock I will build my church"',
 'The "rock" is said to be Peter\'s confession of faith, or Christ himself, not Peter.',
 ['Jesus spoke Aramaic. Simon is renamed Kepha, "Rock" (John 1:42). "You are Kepha, and on this kepha I will build my church" is a direct play on his new name. The Greek difference between petros and petra is the masculine form needed for a man\'s name.',
  'The next verse gives Peter "the keys of the kingdom of heaven", echoing Isaiah 22:22, where the keys mark the office of the king\'s chief steward, an office with successors.',
  'Many Protestant scholars now agree the rock is Peter himself, for example Oscar Cullmann (Peter: Disciple, Apostle, Martyr, 1953). The debate is really about whether the office continues.'],
 'Christ is the foundation of the Church (1 Corinthians 3:11) and chose to make Peter the visible rock and steward, an office continued in his successors.',
 'CCC 552–553, 881–882; Vatican I, Pastor Aeternus (1870), ch. 1',
 disp='d-matt16',tags=('church','papacy'))
add('mark',2,7,'Mark 2:7','"Who can forgive sins, but God only?"',
 'Only God forgives sins, so a priest in confession cannot.',
 ['These are the words of the scribes objecting to Jesus. Jesus answers by healing the man "that you may know that the Son of man hath power on earth to forgive sins" (2:10).',
  'Matthew records the crowd glorifying God "that gave such power to men" (Matthew 9:8).',
  'After the resurrection Jesus gives that power to the apostles: "Whose sins you shall forgive, they are forgiven them; and whose sins you shall retain, they are retained" (John 20:23). Retaining requires hearing the sins, so this implies confession.'],
 'Only God forgives sins, and he chooses to do it through the ministry of men he sends.',
 'CCC 1441–1445, 1461; Trent, Session 14',
 tags=('confession',))
add('matthew',23,9,'Matthew 23:9','"Call none your father upon earth"',
 'Catholics disobey Jesus by calling priests "Father".',
 ['Taken literally, it would forbid calling your own dad "father", and verse 10 would forbid "teacher" (doctor). Jesus is using vivid language against religious leaders who loved titles and took God\'s place.',
  'The New Testament calls people father: Jesus says "father Abraham" (Luke 16:24); Stephen says "men, brethren and fathers" (Acts 7:2); Paul writes, "in Christ Jesus, by the gospel, I have begotten you" (1 Corinthians 4:15).'],
 'No one replaces God the Father. Spiritual fatherhood shares in his, as Paul\'s did.',
 'CCC 2214; 1 Corinthians 4:15; 1 Timothy 1:2',
 disp='d-matt23-9',tags=('church',))
add('1-timothy',4,3,'1 Timothy 4:3','"Forbidding to marry"',
 'Used against priestly celibacy, as if the Church were teaching "doctrines of devils".',
 ['Paul is describing heretics who taught that marriage and certain foods were evil in themselves, as some Gnostic groups did. The Church condemns that teaching and holds marriage to be a sacrament.',
  'Celibacy is freely chosen for the kingdom, as Jesus (Matthew 19:12) and Paul (1 Corinthians 7:32–35) recommend. No one is forbidden to marry; a man who wishes to marry does not seek ordination in the Latin Church, and Eastern Catholic priests may be married.'],
 'Marriage is good and holy; celibacy for the kingdom is a gift some freely accept.',
 'CCC 1579–1580, 1599, 1601; 1 Corinthians 7',
 tags=('church','celibacy'))

# ---------------- Baptism ----------------
add('1-peter',3,21,'1 Peter 3:21','"Baptism now saves you"',
 'Many evangelicals hold that baptism is an outward sign of a salvation already received, and point to "not the putting away of the filth of the flesh" to show water does nothing.',
 ['Peter says plainly that "baptism… now saveth you". The phrase about dirt means baptism is not a bath for the body; its power is the "examination of a good conscience towards God by the resurrection of Jesus Christ".',
  'The same teaching runs through the New Testament: "Be baptized… for the remission of your sins" (Acts 2:38); "Rise up, and be baptized, and wash away thy sins" (Acts 22:16); "unless a man be born again of water and the Holy Ghost" (John 3:5).'],
 'Baptism is not a symbol only. Through it Christ really washes away sin and gives new life.',
 'CCC 1213, 1257–1266; Trent, Session 7, canons on baptism',
 disp='d-john3-5',tags=('baptism',))
add('mark',16,16,'Mark 16:16','"He that believeth and is baptized"',
 'Belief must come before baptism, so infants, who cannot believe, should not be baptised.',
 ['The verse is about adults hearing the Gospel, who must believe to be baptised. It does not address infants, just as "if any man will not work, neither let him eat" (2 Thessalonians 3:10) does not mean infants should starve.',
  'The apostles baptised whole households (Acts 16:15, 16:33; 1 Corinthians 1:16). Peter says the promise is "to you and to your children" (Acts 2:39). Baptism replaced circumcision, which was given to infants (Colossians 2:11–12).',
  'Infant baptism is attested by Hippolytus (c. 215) and Origen (c. 248), who calls it a tradition from the apostles.'],
 'Infants are baptised in the faith of the Church and of their parents, as children were brought into the old covenant.',
 'CCC 1250–1252; Origen, Commentary on Romans 5.9',
 tags=('baptism',))

# ---------------- Mary and the saints ----------------
add('matthew',1,25,'Matthew 1:25','"He knew her not till she brought forth her first born son"',
 'The word "till" (until) is taken to mean Joseph and Mary had normal marital relations afterwards, and "first born" to mean there were later children.',
 ['"Until" states what happened up to a point and says nothing about afterwards. "Michol the daughter of Saul had no child to the day of her death" (2 Samuel 6:23) does not mean she had one after she died. Matthew\'s point is that Jesus was conceived without a human father.',
  '"First born" was a legal title for the child who opened the womb, given whether or not other children followed (Exodus 13:2). A Jewish grave inscription from Egypt (5 BC) speaks of a mother who died giving birth to her "first-born" child.'],
 'Mary remained a virgin before, during and after the birth of Christ.',
 'CCC 499–501; Lateran Synod (649); Jerome, Against Helvidius',
 disp='d-matt1-25',tags=('mary',))
add('matthew',13,55,'Matthew 13:55','"His brethren James, and Joseph, and Simon, and Jude"',
 'Jesus had brothers, so Mary had other children.',
 ['In Hebrew and Aramaic there was no separate word for cousin; "brother" covered relatives. Lot is called Abraham\'s "brother" though he was his nephew (Genesis 13:8, 14:14).',
  'James and Joseph, named here, are the sons of a different Mary, "Mary the mother of James and Joseph" (Matthew 27:56), who stood near the cross.',
  'Jesus on the cross entrusted his mother to John (John 19:26–27). That makes no sense if she had other living sons to care for her.'],
 'The "brethren of the Lord" were relatives, and Mary had no child but Jesus.',
 'CCC 500; Jerome, Against Helvidius 11–17',
 tags=('mary',))
add('romans',3,23,'Romans 3:23','"All have sinned"',
 'If all have sinned, Mary must have sinned too, so the Immaculate Conception is unbiblical.',
 ['Paul is showing that Jews and Gentiles alike need Christ. He is not listing exceptions. Infants who die before committing any sin, and Christ himself, who was truly human, are obvious exceptions to "all have sinned" as personal sin.',
  'The Church does not say Mary did not need a Saviour. She calls God "my Saviour" (Luke 1:47). She was saved in a more perfect way: preserved from sin from her conception by the merits of Christ, like someone pulled back before falling into a pit rather than lifted out after.',
  'The angel greets her as kecharitomene, "full of grace" (Luke 1:28): one who has been, and remains, filled with God\'s favour.'],
 'Mary was redeemed by Christ, by being kept from all sin from the first moment of her existence.',
 'Pius IX, Ineffabilis Deus (1854); CCC 490–493',
 disp='d-luke1-28',tags=('mary',))
add('1-timothy',2,5,'1 Timothy 2:5','"One mediator of God and men"',
 'Christ is the only mediator, so asking Mary and the saints to pray for us takes away from him.',
 ['Read verse 1: Paul begins by urging "that supplications, prayers, intercessions… be made for all men". Asking others to pray for us is the very thing he commends, and it is a sharing in Christ\'s mediation, not a rival to it.',
  'If asking a friend on earth to pray for you does not deny Christ\'s mediation, neither does asking a friend in heaven. The saints are more alive, not less: "he is not the God of the dead, but of the living" (Mark 12:27).',
  'Scripture shows the saints in heaven offering "the prayers of saints" to God (Revelation 5:8), and says "the continual prayer of a just man availeth much" (James 5:16).'],
 'Christ is the one Mediator; all intercession, ours and the saints\', is a share in his.',
 'Lumen Gentium 60–62; CCC 956, 2634–2636',
 disp='d-1tim2-5',tags=('saints',))
add('deuteronomy',18,11,'Deuteronomy 18:11','"Nor… that seeketh the truth from the dead"',
 'Praying to the saints is said to be the same as consulting the dead, which God forbids.',
 ['This verse forbids necromancy: summoning the dead to get secret information, as Saul did with the medium of Endor (1 Samuel 28). The Church forbids that too (CCC 2116–2117).',
  'Asking a saint to pray for us is not consulting the dead for knowledge; it is asking a member of Christ\'s body, alive in God, to pray with us. Jesus spoke with Moses and Elijah at the Transfiguration (Matthew 17:3).'],
 'Spiritism is forbidden; the communion of saints is part of the Creed.',
 'CCC 946–962, 2116–2117',
 tags=('saints',))
add('exodus',20,4,'Exodus 20:4','"Thou shalt not make to thyself a graven thing"',
 'Catholic statues, crucifixes and icons break the second commandment.',
 ['The next verse explains the purpose: "Thou shalt not adore them, nor serve them" (20:5). What is forbidden is making images to worship as gods.',
  'God himself commanded images for his worship: two golden cherubim on the ark (Exodus 25:18), carved cherubim in the Temple (1 Kings 6:23–29), and a bronze serpent that pointed to Christ (Numbers 21:8–9; John 3:14).',
  'When God became man, he made himself visible. The Second Council of Nicaea (787) taught that honour given to an image passes to the person it represents.'],
 'Catholics worship God alone. Images are honoured as reminders of Christ and the saints, as we honour a photograph of someone we love.',
 'CCC 2129–2132; Second Council of Nicaea (787)',
 tags=('images',))
add('matthew',6,7,'Matthew 6:7','"Speak not much, as the heathens"',
 'Repeated prayers like the Rosary are the "vain repetitions" Jesus forbade.',
 ['Jesus condemns pagan babbling that tries to wear the gods down with words, "for they think that in their much speaking they may be heard". The problem is the attitude, not repetition.',
  'Jesus himself in Gethsemane "prayed the third time, saying the selfsame word" (Matthew 26:44). Psalm 135 (136) repeats "for his mercy endureth for ever" 26 times, and the angels in heaven never stop saying "Holy, holy, holy" (Revelation 4:8).',
  'Right after this verse Jesus gives a prayer to be said: the Our Father, the heart of the Rosary.'],
 'Repetition prayed with love and attention is like a child repeating "I love you"; it is not vain.',
 'CCC 2616, 2668, 2678, 2708',
 tags=('prayer',))

# ---------------- After death ----------------
add('2-corinthians',5,8,'2 Corinthians 5:8','"Absent from the body… present with the Lord"',
 'Paul expects to be with the Lord immediately after death, so there can be no purgatory.',
 ['Paul expresses a desire and a confidence, not a timetable for every Christian. Purgatory is not a place away from the Lord; it is his purifying love making a soul ready to see him (1 Corinthians 3:13–15).',
  'Paul himself goes on: "we must all be manifested before the judgment seat of Christ, that every one may receive… according as he hath done, whether it be good or evil" (5:10).',
  'Nothing defiled will enter the heavenly city (Revelation 21:27). Most of us die not yet fully purified, and God finishes his work in us.'],
 'Those who die in God\'s grace but are not yet perfect are purified before entering the joy of heaven, and our prayers help them.',
 'CCC 1030–1032; Council of Florence (1439); Trent, Session 25; 2 Maccabees 12:46',
 disp='d-purgatory',tags=('purgatory',))

# more entries and the long-form studies (tools/vapol_*.py)
DEEP={}
def D(slug,ch,v,**k): DEEP[(slug,ch,v)]=k
import glob as _g
for _f in sorted(_g.glob('tools/vapol_*.py')): exec(open(_f,encoding='utf-8').read())
_miss=[e['ref'] for e in E if (e['s'],e['c'],e['v']) not in DEEP]
_orph=[k for k in DEEP if k not in {(e['s'],e['c'],e['v']) for e in E}]
if _orph: sys.exit('deep study without entry: '+str(_orph))
for e in E:
    d=DEEP.get((e['s'],e['c'],e['v']))
    if d:
        if '—' in json.dumps(d,ensure_ascii=False): sys.exit('em dash in deep '+e['ref'])
        e['deep']=d
# write
B={b['slug']:b for b in []}
import os
os.makedirs('vapol',exist_ok=True)
out={}
for e in E:
    b=json.load(open(f"bible/{e['s']}.json"));ch=[x for x in b['chapters'] if x['n']==e['c']]
    if not ch or e['v'] not in [n for n,*_ in ch[0]['verses']]: sys.exit('bad ref '+e['ref'])
    for k in ('t','claim','cath') :
        if '—' in e[k]: sys.exit('em dash in '+e['ref'])
    if any('—' in w for w in e['why']): sys.exit('em dash in '+e['ref'])
    out.setdefault(f"{e['s']}|{e['c']}",[]).append({k:e[k] for k in ('v','ref','t','claim','why','cath','src','disp','tags','deep') if k in e})
json.dump(out,open('vapol/index.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
print('verse apologetics:',len(E),'entries in',len(out),'chapters;',len(E)-len(_miss),'full studies',('missing: '+', '.join(_miss)) if _miss else '')
if len(set((e['s'],e['c'],e['v']) for e in E))!=len(E): sys.exit('duplicate verse entry')
