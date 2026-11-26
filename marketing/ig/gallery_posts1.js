// Posts 20-24 rebuilt in the Gallery style (26 Nov 2026). Art: National Gallery of Art open access (crops via /tmp/art/c1.json).
const {render}=require('./gallery.js');
const posts=[
{id:'20-not-worthy',slides:[
 {t:'cover',img:'ric-cover',k:'Before Communion',lines:['Why do we say','“under my roof”?']},
 {t:'pano',img:'ric-pano',of:3,i:0,pos:'tl',a:'Just before Communion, the whole church says:',b:'“Lord, I am not worthy that you should enter under my roof…”'},
 {t:'pano',img:'ric-pano',of:3,i:1,pos:'tc',a:'They aren’t our words.',b:'They belong to a Roman soldier.'},
 {t:'pano',img:'ric-pano',of:3,i:2,pos:'tr',sm:1,a:'A pagan centurion asked Jesus to heal his servant, then stopped Him at the door:',b:'“Only say the word.”<br>Matthew 8:8'},
 {t:'detail',img:'ric-arch',pos:'bc',a:'Jesus was amazed:',b:'“Not even in Israel have I found such faith.”'},
 {t:'quote',img:'ric-cover',h:'So at every Mass',p:'You borrow his words. And the “roof” is you: Christ is about to come under it.',b:'Honest about our unworthiness. Confident in His word.'},
 {t:'end',img:'ric-cover',h:'Say it like you <em>mean it</em> this Sunday.',p:'Read Matthew 8 with Augustine and Chrysostom in Golden Chain.'}]},
{id:'21-advent-explained',slides:[
 {t:'cover',img:'duc-cover',k:'Advent begins Sunday',lines:['Advent is not','early Christmas.']},
 {t:'detail',img:'duc-isaiah',pos:'tr',a:'Advent means “coming.” It looks two ways:',b:'back to Bethlehem, and forward to the end of time.'},
 {t:'pano',img:'duc-pano',of:2,i:0,pos:'bl',a:'Until 16 December the readings look forward:',b:'Christ will come again in glory.'},
 {t:'pano',img:'duc-pano',of:2,i:1,pos:'br',a:'From 17 December they turn to the manger:',b:'God came as a baby.'},
 {t:'frame',img:'duc-full',h:470,lead:'<b>Violet</b> means waiting, not mourning. <b>Rose</b> on 13 December means rejoice: halfway there. <b>One more candle</b> each week: the light grows. Then the <b>O Antiphons</b>, 17 to 23 December.'},
 {t:'detail',img:'duc-ezekiel',pos:'bl',sm:1,a:'The world starts Christmas in October. Advent says: not yet.',b:'Waiting is what makes the feast a feast.'},
 {t:'end',img:'duc-cover',h:'Four weeks. <em>Ten minutes</em> a day.',p:'Our Advent challenge starts Sunday in Golden Chain.'}]},
{id:'22-advent-challenge',slides:[
 {t:'cover',img:'jdf-cover',k:'First Sunday of Advent',lines:['The ten-minute','Advent challenge.']},
 {t:'detail',img:'jdf-hands',pos:'tl',a:'Every day until Christmas:',b:'read the Gospel, read one Father on it, pray one line, tick it off.'},
 {t:'frame',img:'pc-full',h:760,lead:'Each week, add one thing. <b>I</b> · go to Confession. <b>II</b> · give something away. <b>III</b> · do something joyful for someone. <b>IV</b> · one evening without your phone.'},
 {t:'detail',img:'jdf-baby',pos:'tl',a:'Do it with your friends.',b:'Start a group, pin the Advent study and keep each other going.'},
 {t:'end',img:'jdf-cover',h:'Day one is <em>today.</em>',p:'Comment “in” and we’ll pray for you this Advent.'}]},
{id:'23-st-andrew-novena',slides:[
 {t:'cover',img:'cal-cover',k:'Saint Andrew · 30 November',lines:['The apostle who','brought his','brother.']},
 {t:'pano',img:'cal-pano',of:2,i:0,pos:'tr',sm:1,a:'Andrew met Jesus first. His very next move:',b:'“He first found his brother Simon… and brought him to Jesus.”<br>John 1:41–42'},
 {t:'pano',img:'cal-pano',of:2,i:1,pos:'tc',a:'That brother became Saint Peter.',b:'Never underestimate an invitation.'},
 {t:'quote',img:'cal-cover',h:'The Saint Andrew Christmas Novena',sm:1,p:'Hail and blessed be the hour and moment in which the Son of God was born of the most pure Virgin Mary, at midnight, in Bethlehem, in piercing cold. In that hour vouchsafe, O my God, to hear my prayer and grant my desires, through the merits of our Saviour Jesus Christ and of his blessed Mother. Amen.'},
 {t:'detail',img:'cal-hand',pos:'bc',a:'Pray it fifteen times a day,',b:'from today until Christmas, for one intention you really care about.'},
 {t:'end',img:'cal-cover',h:'Be an <em>Andrew.</em>',p:'Send this to the person you’d bring to Jesus.'}]},
{id:'24-fathers-cheat-sheet',slides:[
 {t:'cover',img:'vou-cover',k:'Cheat sheet',lines:['Who were the','Church Fathers?']},
 {t:'frame',img:'zur-rect',h:760,lead:'Early Christian writers, roughly <b>AD 100 to 750</b>, known for holiness, sound teaching and the Church’s approval. The links in the golden chain between the apostles and us.'},
 {t:'list',img:'bel-jerome',h:'The early ones',items:[['Ignatius','c. 107','Seven letters on the road to martyrdom. First to write “Catholic Church”.'],['Irenaeus','c. 180','Took on the Gnostics. “The glory of God is man fully alive.”'],['Athanasius','c. 350','Defended Christ’s divinity, almost alone.']]},
 {t:'list',img:'vou-angel',h:'The East',items:[['Basil','c. 370','Monk, bishop, built a whole city for the sick.'],['Gregory Nazianzen','c. 380','“The Theologian”, on the Trinity.'],['John Chrysostom','c. 400','“Golden mouth”, the great preacher.']]},
 {t:'list',img:'zur-face',h:'The West',items:[['Ambrose','c. 390','Bishop of Milan. Baptised Augustine.'],['Jerome','c. 400','Translated the Bible into Latin.'],['Augustine','c. 400','Confessions, City of God, and much of Western theology.']]},
 {t:'end',img:'vou-cover',h:'Read them on <em>every verse.</em>',p:'Each of them is in Golden Chain, on the passages they wrote about.'}]},
];
module.exports={posts};
if(require.main===module)render(posts,process.argv[2]||'/tmp/gal',process.argv.slice(3));
