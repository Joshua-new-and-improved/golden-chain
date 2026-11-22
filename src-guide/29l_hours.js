// ---------- Liturgy of the Hours: a prayable daily office in public-domain texts (Douay-Rheims psalms and canticles) ----------
// The official English texts (ICEL/Grail/Abbey Psalms) are copyrighted, so this offers a faithful simple form and links to the full official Office.
const HOURS=[
 {k:"readings",n:"Office of Readings",la:"Officium lectionis",when:"Any time of day; traditionally before dawn (Matins)"},
 {k:"lauds",n:"Morning Prayer",la:"Laudes matutinae",when:"On rising, about 6–9 a.m."},
 {k:"day",n:"Daytime Prayer",la:"Hora media (Terce, Sext, None)",when:"Mid-morning, midday or mid-afternoon"},
 {k:"vespers",n:"Evening Prayer",la:"Vesperae",when:"About 5–7 p.m., as the day ends"},
 {k:"compline",n:"Night Prayer",la:"Completorium",when:"Last thing before sleep"}
];
// Psalms are in Douay-Rheims (Vulgate) numbering. [psalm, firstVerse, lastVerse]
const H_PS={
 readings:[[[1],[2]],[[3]],[[6]],[[11]],[[14]],[[21,1,19]],[[103,1,15]]],
 lauds:[[[62],[148]],[[5]],[[23]],[[35]],[[56]],[[50]],[[91]]],
 vespers:[[[109],[110]],[[114],[115]],[[120],[121]],[[122],[123]],[[125],[126]],[[140],[141]],[[112],[116]]],
 compline:[[[90]],[[85]],[[142]],[[30,2,6],[129]],[[15]],[[87]],[[4],[133]]]
};
const H_READ={lauds:["romans",13,12,13],day:["romans",13,8,10],vespers:["2-corinthians",1,3,4],compline:["1-peter",5,8,9]};
const H_CANT={lauds:{n:"Benedictus (Canticle of Zechariah)",r:["luke",1,68,79],ant:"Blessed be the Lord God of Israel; because he hath visited and wrought the redemption of his people (Luke 1:68)."},
 vespers:{n:"Magnificat (Canticle of Mary)",r:["luke",1,46,55],ant:"My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour (Luke 1:46–47)."},
 compline:{n:"Nunc dimittis (Canticle of Simeon)",r:["luke",2,29,32],ant:"Preserve us, O Lord, while waking, and guard us while sleeping; that awake we may watch with Christ, and asleep we may rest in peace. (Salva nos, Domine, vigilantes; custodi nos dormientes; ut vigilemus cum Christo, et requiescamus in pace.)"}};
const H_COLLECT={
 readings:["Blessed Lord, who hast caused all holy Scriptures to be written for our learning: grant that we may in such wise hear them, read, mark, learn, and inwardly digest them, that by patience and comfort of thy holy Word, we may embrace and ever hold fast the blessed hope of everlasting life, which thou hast given us in our Saviour Jesus Christ. Amen.","Traditional collect (English of the Book of Common Prayer, 1549)"],
 lauds:["O Lord God almighty, who hast brought us safely to the beginning of this day: defend us in the same by thy mighty power; that this day we fall into no sin, neither run into any kind of danger, but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight. Through Christ our Lord. Amen.","Collect of Prime, Domine Deus omnipotens (Sarum use; traditional English)"],
 day:["Direct, we beseech thee, O Lord, our actions by thy holy inspirations, and carry them on by thy gracious assistance; that every prayer and work of ours may always begin from thee, and through thee be happily ended. Through Christ our Lord. Amen.","Actiones nostras (Roman Missal; traditional English)"],
 vespers:["Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Saviour, Jesus Christ. Amen.","Illumina, quaesumus (Gelasian Sacramentary; traditional English)"],
 compline:["Visit, we beseech thee, O Lord, this dwelling, and drive far from it all the snares of the enemy: let thy holy angels dwell herein to keep us in peace; and may thy blessing be always upon us. Through Christ our Lord. Amen.","Visita, quaesumus (Roman Breviary, Compline; traditional English)"]};
const H_TEDEUM="We praise thee, O God: we acknowledge thee to be the Lord. All the earth doth worship thee: the Father everlasting. To thee all Angels cry aloud: the Heavens, and all the Powers therein. To thee Cherubin and Seraphin continually do cry: Holy, Holy, Holy, Lord God of Sabaoth; Heaven and earth are full of the Majesty of thy glory. The glorious company of the Apostles praise thee. The goodly fellowship of the Prophets praise thee. The noble army of Martyrs praise thee. The holy Church throughout all the world doth acknowledge thee; the Father, of an infinite Majesty; thine honourable, true, and only Son; also the Holy Ghost, the Comforter. Thou art the King of Glory, O Christ. Thou art the everlasting Son of the Father. When thou tookest upon thee to deliver man, thou didst not abhor the Virgin's womb. When thou hadst overcome the sharpness of death, thou didst open the Kingdom of Heaven to all believers. Thou sittest at the right hand of God, in the glory of the Father. We believe that thou shalt come to be our Judge. We therefore pray thee, help thy servants, whom thou hast redeemed with thy precious blood. Make them to be numbered with thy Saints in glory everlasting. O Lord, save thy people, and bless thine heritage. Govern them, and lift them up for ever. Day by day we magnify thee; and we worship thy Name ever, world without end. Vouchsafe, O Lord, to keep us this day without sin. O Lord, have mercy upon us, have mercy upon us. O Lord, let thy mercy lighten upon us, as our trust is in thee. O Lord, in thee have I trusted; let me never be confounded.";
const H_TELUCIS=["Te lucis ante terminum, rerum Creator, poscimus, ut solita clementia sis praesul ad custodiam.","Procul recedant somnia et noctium phantasmata; hostemque nostrum comprime, ne polluantur corpora.","Praesta, Pater omnipotens, per Iesum Christum Dominum, qui tecum in perpetuum regnat cum Sancto Spiritu. Amen."];
let hourSel=null;
function hebNum(n){if(n<=8||n>=148)return ""+n;if(n===9)return "9–10";if(n<=112)return ""+(n+1);if(n===113)return "114–115";if(n<=115)return "116";if(n<=145)return ""+(n+1);return "147";}
function hourNow(){const h=new Date().getHours();return h<4?"compline":h<6?"readings":h<10?"lauds":h<16?"day":h<20?"vespers":"compline";}
function marianFor(d){const y=d.getFullYear();const t=new Date(y,d.getMonth(),d.getDate());const adv=adventStart(y);const E=easterDate(y);
 if(t>=E&&t<=addDays(E,49))return "regina-caeli";
 if(t>=adv||t<new Date(y,1,3))return "alma";
 if(t<addDays(E,-3))return "ave-regina";
 return "salve-regina";}
async function hPsalmHTML(ps,lent){
 const out=[];
 for(const [n,a,z] of ps){const segs=await readingText([["psalms",n,a||1,z||999]]);if(!segs.length)continue;
  out.push(`<div class="h-ps"><h4>Psalm ${n}${a?`:${a}–${z}`:""} <span class="muted" style="font-weight:400;font-size:.85rem">(Douay-Rheims numbering; Hebrew ${hebNum(n)})</span></h4>${segs[0].vv.map(([vn,t])=>`<p class="h-v"><sup>${vn}</sup>${esc(t)}</p>`).join("")}<p class="h-gloria">Glory be to the Father, and to the Son, and to the Holy Ghost. As it was in the beginning, is now, and ever shall be, world without end. Amen.</p></div>`);}
 return out.join("");}
async function hTextHTML(r){const segs=await readingText([[r[0],r[1],r[2],r[3]]]);return segs.length?segs[0].vv.map(([vn,t])=>`<p class="h-v"><sup>${vn}</sup>${esc(t)}</p>`).join(""):"";}
async function renderHours(key){
 const v=$("#v-hours");const d=new Date();const dow=d.getDay();
 const k=key&&HOURS.some(h=>h.k===key)?key:(hourSel||hourNow());hourSel=k;
 const H=HOURS.find(h=>h.k===k);const ls=litSeason(d).name;const lent=/Lent|Holy Week|Triduum/.test(ls);
 const tabs=`<div class="seg h-tabs" role="group" aria-label="Hour" style="margin-bottom:12px;flex-wrap:wrap">${HOURS.map(h=>`<button data-hour="${h.k}" aria-pressed="${h.k===k}">${esc(h.n)}</button>`).join("")}</div>`;
 v.innerHTML=`<div class="guide-band"><div><div class="k">Liturgy of the Hours</div><h1>Pray the Hours</h1><div class="sub">The Church's daily prayer, sanctifying the day with the Psalms</div></div></div>${tabs}<div id="h-body"><p class="muted">Loading the Hour…</p></div>`;
 $$("[data-hour]",v).forEach(b=>b.onclick=()=>{location.hash="#hours-"+b.dataset.hour;});
 const alle=lent?"":" Alleluia.";
 const first=k==="readings"||k==="lauds";
 let html=`<section class="reading h-office"><div class="label">${esc(d.toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"}))} · ${esc(ls)}</div><h2>${esc(H.n)} <span class="muted" style="font-size:.9rem;font-weight:400"><em>${esc(H.la)}</em></span></h2><p class="muted">${esc(H.when)}</p>`;
 // opening
 html+=`<div class="h-part"><div class="label">Opening</div>${first?`<p><strong>V.</strong> O Lord, thou wilt open my lips. <strong>R.</strong> And my mouth shall declare thy praise. <span class="muted">(Ps 50:17)</span></p>`:""}<p><strong>V.</strong> O God, come to my assistance. <strong>R.</strong> O Lord, make haste to help me. <span class="muted">(Ps 69:2)</span></p><p>Glory be to the Father, and to the Son, and to the Holy Ghost. As it was in the beginning, is now, and ever shall be, world without end. Amen.${alle}</p></div>`;
 if(k==="compline")html+=`<div class="h-part"><div class="label">Examination of conscience</div><p>Pause and review the day with God: give thanks, ask for light, look honestly at what you did and failed to do, ask forgiveness, and resolve to amend. Then say the <em>Confiteor</em> or an act of contrition. <a href="#mass" data-go-lt>The daily prayer before death and judgment</a> fits here.</p></div>`;
 if(first)html+=`<div class="h-part"><div class="label">Invitatory · Psalm 94</div><p class="h-ant"><strong>Ant.</strong> Come, let us adore the Lord, the King who is to come.</p>${await hPsalmHTML([[94]],lent)}</div>`;
 if(k==="compline")html+=`<div class="h-part"><div class="label">Hymn</div><p lang="la"><em>${H_TELUCIS.join("<br>")}</em></p><p class="muted">\"Before the ending of the day, Creator of the world, we pray that, with thy wonted mercy, thou wouldst be our guard and keeper. Far off let dreams and phantoms of the night depart; hold down our enemy, lest our bodies be defiled. Grant this, almighty Father, through Jesus Christ the Lord, who with thee and the Holy Spirit reigns for ever. Amen.\" (Te lucis ante terminum, 6th century; site translation)</p></div>`;
 // psalmody
 html+=`<div class="h-part"><div class="label">Psalmody</div>`;
 if(k==="day"){const doy=Math.floor((d-new Date(d.getFullYear(),0,1))/864e5);const st=doy%22;html+=`<p class="muted">Psalm 118, the great psalm of the Law, has been prayed at the little hours since the early Church. Here one of its 22 stanzas each day (stanza ${st+1}: the Hebrew letter ${["Aleph","Beth","Gimel","Daleth","He","Vau","Zain","Heth","Teth","Jod","Caph","Lamed","Mem","Nun","Samech","Ain","Phe","Sade","Coph","Res","Sin","Tau"][st]}).</p>`+await hPsalmHTML([[118,st*8+1,st*8+8]],lent);}
 else html+=await hPsalmHTML(H_PS[k][dow],lent);
 if(k==="compline")html+=`<p class="muted" style="font-size:.85rem">Night Prayer follows the one-week cycle of the Roman Liturgy of the Hours (Sunday Ps 90; Monday 85; Tuesday 142; Wednesday 30 and 129; Thursday 15; Friday 87; Saturday 4 and 133).</p>`;
 html+=`</div>`;
 // reading
 if(k==="readings"){html+=`<div class="h-part"><div class="label">Readings</div><p><strong>First reading:</strong> read today's Gospel slowly, or continue your lectio in the Bible. <a href="#mass">Today's Mass readings</a></p><p><strong>Second reading:</strong> a reading from the Fathers. <a href="#mass" data-go-deep>The Fathers on today's Gospel</a>, or the <em>Catena aurea</em> in the <a href="#reader">Reader</a>.</p></div>`;
  if(dow===0&&!lent)html+=`<div class="h-part"><div class="label">Te Deum (Sundays, solemnities and feasts, outside Lent)</div><p class="h-v">${esc(H_TEDEUM)}</p></div>`;}
 else{html+=`<div class="h-part"><div class="label">Short reading</div>${await hTextHTML(H_READ[k])}<p class="muted" style="font-size:.85rem">${esc(nameOf(H_READ[k][0]))} ${H_READ[k][1]}:${H_READ[k][2]}–${H_READ[k][3]}</p></div>`;
  if(k==="compline")html+=`<div class="h-part"><div class="label">Short responsory</div><p><strong>V.</strong> Into thy hands, O Lord, I commend my spirit. <strong>R.</strong> Into thy hands, O Lord, I commend my spirit.<br><strong>V.</strong> Thou hast redeemed us, O Lord, the God of truth. <strong>R.</strong> I commend my spirit.<br><strong>V.</strong> Glory be to the Father, and to the Son, and to the Holy Ghost. <strong>R.</strong> Into thy hands, O Lord, I commend my spirit. <span class="muted">(Ps 30:6)</span></p></div>`;
  if(k==="vespers")html+=`<div class="h-part"><p><strong>V.</strong> Let my prayer be directed as incense in thy sight. <strong>R.</strong> The lifting up of my hands, as evening sacrifice. <span class="muted">(Ps 140:2)</span></p></div>`;}
 // gospel canticle
 if(H_CANT[k]){const C=H_CANT[k];html+=`<div class="h-part"><div class="label">Gospel canticle · ${esc(C.n)}</div><p class="h-ant"><strong>Ant.</strong> ${esc(C.ant)}</p>${await hTextHTML(C.r)}<p class="h-gloria">Glory be to the Father, and to the Son, and to the Holy Ghost. As it was in the beginning, is now, and ever shall be, world without end. Amen.</p><p class="h-ant"><strong>Ant.</strong> ${esc(C.ant)}</p></div>`;}
 // intercessions and Our Father
 if(k==="lauds"||k==="vespers")html+=`<div class="h-part"><div class="label">Intercessions</div><p>${k==="lauds"?"Offer the day to God: for the Church and the Pope, for South Africa and its leaders, for your family and work, for those you will meet today.":"Pray for the Church, for the sick and the suffering, for those who died today, for the holy souls in purgatory, and for your own intentions."} To each, respond: <em>Lord, hear our prayer.</em></p><p><strong>Our Father</strong>, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.</p></div>`;
 // collect
 const col=H_COLLECT[k];html+=`<div class="h-part"><div class="label">Concluding prayer</div><p>Let us pray. ${esc(col[0])}</p><p class="muted" style="font-size:.85rem">${esc(col[1])}</p></div>`;
 // conclusion
 if(k==="compline"){const mp=PRAYER_BY[marianFor(d)];html+=`<div class="h-part"><div class="label">Blessing</div><p>May the Lord almighty grant us a quiet night and a perfect end. Amen. <span class="muted">(Noctem quietam et finem perfectum concedat nobis Dominus omnipotens.)</span></p></div>`;
  if(mp)html+=`<div class="h-part"><div class="label">Antiphon of the Blessed Virgin Mary · ${esc(mp.name)}</div>${mp.latin?`<p lang="la"><em>${mp.latin.map(esc).join("<br>")}</em></p>`:""}<p>${(mp.text||[]).map(esc).join("<br>")}</p></div>`;}
 else html+=`<div class="h-part"><div class="label">Dismissal</div><p>May the Lord bless us, defend us from all evil, and bring us to everlasting life. Amen. <span class="muted">(Dominus nos benedicat, et ab omni malo defendat, et ad vitam aeternam perducat.)</span></p></div>`;
 html+=`</section>
 <div class="co extra"><div class="co-h">About this Office</div><p>The Liturgy of the Hours is \"the public prayer of the Church\" by which the whole course of the day is made holy through praise of God (Sacrosanctum Concilium 83–84); priests and religious are bound to it, and the laity are encouraged to pray it, especially Morning and Evening Prayer (SC 100).</p><p>This page gives a faithful simple form using public-domain texts: Douay-Rheims psalms (Vulgate numbering) and canticles, traditional collects and antiphons. Night Prayer follows the official one-week psalm cycle; the other Hours use a simplified weekly selection of psalms traditionally associated with each Hour, not the official four-week psalter. For the full official Office of the day in the approved English translation, use <a href="https://universalis.com/" target="_blank" rel="noopener">Universalis</a>, <a href="https://divineoffice.org/" target="_blank" rel="noopener">Divine Office</a> or <a href="https://www.ibreviary.com/" target="_blank" rel="noopener">iBreviary</a>.</p></div>`;
 $("#h-body",v).innerHTML=html;
 $$("[data-go-deep]",v).forEach(a=>a.onclick=ev=>{ev.preventDefault();location.hash="#mass";setTimeout(()=>{const t=$("#mj-deep");t&&t.scrollIntoView();},1500);});
 $$("[data-go-lt]",v).forEach(a=>a.onclick=ev=>{ev.preventDefault();location.hash="#mass";setTimeout(()=>{const t=$("#mj-lastthings");t&&t.scrollIntoView();},1800);});
}
