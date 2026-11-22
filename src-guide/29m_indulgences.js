// ---------- Plenary indulgences on the daily readings page ----------
// Sources: Enchiridion Indulgentiarum, 4th ed. (Apostolic Penitentiary, 1999), norms and grants; Paul VI, Indulgentiarum doctrina (1967);
// CCC 1471–1479; Apostolic Penitentiary decrees on Divine Mercy Sunday (29 June 2002) and the Year of St Francis (10 Jan 2026). Checked 30 Oct 2026.
const IND_LINKS={
 doctrina:"https://www.vatican.va/content/paul-vi/en/apost_constitutions/documents/hf_p-vi_apc_01011967_indulgentiarum-doctrina.html",
 ccc:"https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
 mercy:"https://www.vatican.va/roman_curia/tribunals/apost_penit/documents/rc_trib_appen_doc_20020629_decree-ii_en.html",
 francis:"https://www.vatican.va/content/romancuria/en/organismi-di-giustizia/penitenzieria-apostolica/documenti/20260110-indulgenze-sanfrancesco.html",
 penit:"https://www.vatican.va/content/romancuria/en/organismi-di-giustizia/penitenzieria-apostolica/documenti.index.html"
};
const IND_OFC="Our Father and the Creed";
// Each grant: s/e = first and last day (Date), t = title, w = the work, souls = applicable only to the dead, n = note
function indGrants(y){
 const E=easterDate(y),D=(m,d)=>new Date(y,m-1,d),ck=addDays(adventStart(y),-7);
 return [
  {s:D(1,1),t:"New Year's Day · Veni Creator",w:"Take part devoutly in the solemn (public) recitation or singing of the hymn <em>Veni Creator Spiritus</em>, for example at Mass or a parish service."},
  {s:addDays(E,-3),t:"Holy Thursday · Tantum ergo",w:"Take part devoutly in the solemn singing or recitation of the <em>Tantum ergo</em> during the reposition of the Blessed Sacrament after the Mass of the Lord's Supper."},
  {s:addDays(E,-2),t:"Good Friday · Adoration of the Cross",w:"Take part devoutly in the adoration of the Cross in the solemn liturgy of the Lord's Passion."},
  {s:addDays(E,-1),t:"Easter Vigil · Baptismal promises",w:"Renew your baptismal promises in the Easter Vigil (also granted on the anniversary of your own baptism, in any approved formula)."},
  {s:E,t:"Easter Sunday · Urbi et Orbi",w:"Receive devoutly the Pope's blessing <em>Urbi et Orbi</em> at noon Rome time (12:00 SAST at Easter), in person or following it live by radio, television or livestream."},
  {s:addDays(E,7),t:"Divine Mercy Sunday",w:"In any church or chapel, with a spirit detached from all sin, take part in prayers and devotions in honour of Divine Mercy; <em>or</em>, before the Blessed Sacrament (exposed or in the tabernacle), pray the "+IND_OFC+" and add a devout prayer to the merciful Lord Jesus (e.g. \"Merciful Jesus, I trust in You\").",n:`Apostolic Penitentiary, decree of 29 June 2002 (<a href="${IND_LINKS.mercy}" target="_blank" rel="noopener">text</a>). The sick and those unable to go out may gain it at home, praying the same before an image of the merciful Jesus, with the intention of fulfilling the conditions when possible.`},
  {s:addDays(E,49),t:"Pentecost · Veni Creator",w:"Take part devoutly in the solemn recitation or singing of the <em>Veni Creator Spiritus</em>."},
  {s:addDays(E,63),t:"Corpus Christi · Tantum ergo and procession",w:"Take part devoutly in the solemn <em>Tantum ergo</em> at Benediction, or in the Eucharistic procession.",n:"In South Africa the solemnity is kept on the Sunday after Trinity Sunday."},
  {s:addDays(E,68),t:"Sacred Heart · Act of Reparation",w:"Take part in the public recitation of the Act of Reparation to the Sacred Heart (<em>Iesu dulcissime</em>)."},
  {s:D(6,22),t:"St John Fisher · parish titular feast",w:"If your parish church is dedicated to St John Fisher (e.g. Lynnwood, Pretoria): visit it on the titular feast and pray the "+IND_OFC+".",n:"Every parish church gives this grant on its own titular feast (and the cathedral on its feast); the bishop may designate a different day. Check your own parish's patron."},
  {s:D(6,29),t:"Sts Peter and Paul · blessed religious article",w:"Use devoutly a religious article (crucifix, rosary, medal) blessed by the Pope or a bishop, and make a profession of faith in any approved formula (e.g. the Creed)."},
  {s:D(8,2),t:"Portiuncula · visit your parish church",w:"Visit a parish church (or a Franciscan church granted this privilege) and pray the "+IND_OFC+".",n:"Recalls the Portiuncula indulgence St Francis obtained for the little chapel of St Mary of the Angels near Assisi."},
  {s:D(11,1),e:D(11,8),souls:1,t:"1–8 November · Visit a cemetery",w:"Devoutly visit a cemetery and pray, even only mentally, for the faithful departed. Each day from 1 to 8 November, once per day.",n:"On other days of the year the same work gains a partial indulgence for the dead."},
  {s:D(11,2),souls:1,t:"All Souls' Day · Visit a church",w:"Devoutly visit a church or oratory and pray the "+IND_OFC+".",n:"With the bishop's consent this may be done on the Sunday before or after, or on All Saints' Day."},
  {s:ck,t:"Christ the King · Act of Dedication",w:"Take part in the public recitation of the Act of Dedication of the Human Race to Christ the King (<em>Iesu dulcissime, Redemptor</em>)."},
  {s:D(12,25),t:"Christmas Day · Urbi et Orbi",w:"Receive devoutly the Pope's blessing <em>Urbi et Orbi</em>, in person or following it live by radio, television or livestream."},
  {s:D(12,31),t:"New Year's Eve · Te Deum",w:"Take part in the public recitation or singing of the <em>Te Deum</em> in a church in thanksgiving for the year."}
 ].map(g=>({...g,e:g.e||g.s}));
}
// Special years and occasions currently in force
const IND_SPECIAL=[
 {s:new Date(2026,0,10),e:new Date(2027,0,10),t:"Year of St Francis (800th anniversary of his death)",w:"Make a pilgrimage to a Franciscan church or any place of worship dedicated to or connected with St Francis. There, take part in the jubilee rites, or spend a suitable time in prayer and meditation for Christian charity and peace among peoples. Conclude with the "+IND_OFC+" and invocations of Our Lady, St Francis, St Clare and the saints of the Franciscan family.",n:`Apostolic Penitentiary, decree of 10 January 2026 (<a href="${IND_LINKS.francis}" target="_blank" rel="noopener">text</a>); may also be applied to the souls in purgatory. The elderly, sick and housebound (and those caring for them) may gain it by uniting themselves spiritually to the celebrations and offering their prayers and sufferings, intending to fulfil the conditions as soon as possible. Ask your parish or the archdiocese which nearby churches qualify.`}
];
const IND_ALWAYS=[
 ["Eucharistic adoration","Adoring the Blessed Sacrament (exposed or in the tabernacle) for at least half an hour."],
 ["Sacred Scripture","Reading Scripture with the veneration due to the word of God, as spiritual reading, for at least half an hour (listening, e.g. to an audio Bible, also counts)."],
 ["The Rosary","Five decades prayed continuously, with meditation on the mysteries, in a church or oratory, or with a family, religious community or pious association."],
 ["Way of the Cross","Before legitimately erected stations, moving from station to station and meditating on the Passion (the sick may instead spend half an hour in reading and meditating on the Passion)."],
 ["Fridays of Lent","After Communion, praying the prayer before a crucifix (<em>En ego, o bone et dulcissime Iesu</em>)."],
 ["At the hour of death","Through the Apostolic Blessing given by a priest; or, if no priest is available, the Church grants it to anyone rightly disposed who habitually prayed during life (the use of a crucifix is commended). This one can be gained even if another plenary indulgence was gained that day."]
];
function indFmt(d){return d.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"long"});}
function indulgenceHTML(iso,ahead){
 ahead=ahead||21;
 const today=new Date(iso+"T00:00:00"),y=today.getFullYear(),until=addDays(today,ahead);
 const all=[...indGrants(y),...indGrants(y+1)];
 const live=g=>g.e>=today&&g.s<=until;
 const items=all.filter(live).sort((a,b)=>a.s-b.s);
 const spec=IND_SPECIAL.filter(g=>g.e>=today&&g.s<=today);
 const days=d=>Math.round((d-today)/864e5);
 const card=(g,special)=>{
  const now=g.s<=today&&today<=g.e,dd=days(g.s);
  const when=special?`Until ${indFmt(g.e)} ${g.e.getFullYear()}`:now?(g.e>g.s?`Today · until ${indFmt(g.e)}`:"Today"):(g.e>g.s?`${indFmt(g.s)} – ${indFmt(g.e)}`:indFmt(g.s))+` · in ${dd} day${dd===1?"":"s"}`;
  return `<div class="ind-item${now?" ind-now":""}">
   <div class="ind-when">${when}${g.souls?` <span class="ind-tag">for the souls in purgatory only</span>`:""}</div>
   <h3>${esc(g.t)}</h3><p><strong>The work:</strong> ${g.w}</p>${g.n?`<p class="muted">${g.n}</p>`:""}</div>`;};
 const list=items.length?items.map(g=>card(g)).join(""):`<p class="muted">No fixed-date plenary indulgence in the next ${ahead} days. The ones below are available every day.</p>`;
 return `<section class="reading day-prayers ind" id="mj-indulg">
  <div class="label">Indulgences · next ${ahead} days</div>
  <h2>Upcoming plenary indulgences</h2>
  <p class="muted" style="margin:.2em 0 .8em">\"An indulgence is a remission before God of the temporal punishment due to sins whose guilt has already been forgiven\" (CCC 1471). The Church grants it from the treasury of the merits of Christ and the saints, for yourself or, by way of suffrage, for the dead (CCC 1471, 1476–1479).</p>
  ${list}
  ${spec.map(g=>card(g,1)).join("")}
  <details class="rq" open><summary>How to gain a plenary indulgence (every time)</summary>
   <ol>
    <li><strong>Be able to gain it</strong>: baptised, not excommunicated, in the state of grace at least when the work is completed, and having the intention of gaining it (a general intention made, say, in your morning offering suffices).</li>
    <li><strong>Do the prescribed work</strong>, within the time stated.</li>
    <li><strong>Sacramental confession.</strong> It may be made some days before or after the work; the Apostolic Penitentiary has explained this as about 20 days. One confession suffices for several plenary indulgences.</li>
    <li><strong>Holy Communion</strong>, one for each plenary indulgence, fittingly on the day of the work.</li>
    <li><strong>Prayer for the Pope's intentions</strong>, one for each: an Our Father and a Hail Mary suffice, though any other prayer may be chosen. (This means the intentions of the Holy See for the Church, not the Pope personally.)</li>
    <li><strong>Exclude all attachment to sin, even venial sin.</strong> If this full disposition is lacking, or a condition is not met, the indulgence is partial.</li>
   </ol>
   <p class="muted">Only <strong>one plenary indulgence per day</strong> (the indulgence at the hour of death excepted); partial indulgences may be gained many times a day. Indulgences may be applied to yourself or to the dead, never to another living person. Source: <em>Enchiridion Indulgentiarum</em>, 4th ed. (1999), norms; Paul VI, <a href="${IND_LINKS.doctrina}" target="_blank" rel="noopener"><em>Indulgentiarum doctrina</em></a> (1967).</p>
  </details>
  <details class="rq"><summary>Available any day of the year</summary>
   <ul>${IND_ALWAYS.map(([h,t])=>`<li><strong>${h}</strong>: ${t}</li>`).join("")}</ul>
  </details>
  <details class="rq"><summary>Why indulgences? A short Thomistic note</summary>
   <p>Every sin wounds twice: it incurs guilt (culpa), which separates from God, and an unhealthy attachment to creatures, which leaves a debt of temporal punishment to be purified here or in purgatory (CCC 1472). Absolution forgives the guilt; satisfaction and charity heal the remaining disorder. Thomas explains that the saints and above all Christ made satisfaction beyond what their own sins required; this superabundance is a common treasure of the Church, and those who have the keys may apply it to members of the Body who are in charity (<em>Supplementum</em> q.25 a.1, from his Sentences commentary). The indulgence does not dispense from conversion: the condition of detachment from all sin is the conversion. It is grace given through the communion of saints (CCC 1474–1477).</p>
   <p>For the dead, an indulgence is offered <em>per modum suffragii</em>, as a prayer the Church presents to God's mercy; we entrust it to Him rather than measure its effect. See the course on <a href="#lesson-t15">the Last Things</a>.</p>
   <p class="muted"><strong>If you struggle with scrupulosity:</strong> you need not be certain you gained a plenary indulgence fully. Do the work in good faith, and trust that whatever is lacking is at least a partial indulgence; checking and re-doing it is the compulsion, not the devotion (see <a href="#lesson-p15">OCD and scrupulosity</a>).</p>
  </details>
 </section>`;
}
