// ---------- Holy days of obligation (South Africa) ----------
// Sources: CIC (1983) cc. 1246–1248; CCC 2042, 2180–2183; John Paul II, Dies Domini (1998) §§ 46–49;
// The Southern Cross: "Why does the Church transfer feasts?" (Oct 2023) and "What you must know about the Assumption" (Aug 2021);
// SACNS, "Days of holy obligation in South Africa" (2009).
const OBLIG_NOT_ZA={"01-01":"Mary, Mother of God","12-08":"the Immaculate Conception","03-19":"St Joseph","06-29":"Sts Peter and Paul"};
function isoDow(iso){return new Date(iso+"T12:00:00").getDay();}
function nearestSunday(iso){const d=isoDow(iso);if(d===0)return iso;return addIsoDays(iso,d<=3?-d:7-d);}
// Returns null or {lvl:"must"|"vigil"|"info", h, p}
function obligationFor(iso,L){
  const e=L&&L[iso];const md=iso.slice(5);const dow=isoDow(iso);
  if(md==="12-25") return {lvl:"must",h:"Holy Day of Obligation",p:"Christmas is a holy day of obligation in South Africa on whatever day it falls. Catholics must take part in Mass today (or at a Christmas Mass on the evening of the 24th)."};
  if(dow===0){
    let extra="";
    const y=iso.slice(0,4);const asm=y+"-08-15";
    if(isoDow(asm)!==0&&nearestSunday(asm)===iso) extra=" In South Africa the Assumption of Our Lady, the country's patronal feast, is moved to the nearest Sunday when 15 August falls on a weekday, so check whether your parish keeps it at today's Mass.";
    if(e&&/Epiphany|Ascension|Corpus Christi/.test(e.n)) extra=` In South Africa ${e.n.replace(/^The /,"the ")} is kept on this Sunday, so the Sunday obligation covers it.`;
    return {lvl:"must",h:"Sunday: Mass is of obligation",p:"Every Sunday is a day of obligation. Catholics must take part in Mass today or at a Saturday-evening (vigil) Mass."+extra};
  }
  if(dow===6||md==="12-24"){
    const t=addIsoDays(iso,1);const tm=t.slice(5);
    if(e&&/Easter Vigil/.test(e.n)) return {lvl:"vigil",h:"The Easter Vigil fulfils the Easter Sunday obligation",p:"The Vigil, celebrated after nightfall, is the first Mass of Easter and 'the mother of all holy vigils'. Taking part in it fulfils the obligation for Easter Sunday (CIC c. 1248 §1)."};
    if(isoDow(t)===0||tm==="12-25") return {lvl:"vigil",h:tm==="12-25"?"Tomorrow is Christmas, a holy day of obligation":"Tomorrow is Sunday",p:"A Mass celebrated this evening, the evening before, fulfils tomorrow's obligation (CIC c. 1248 §1). Many parishes have a Saturday evening Mass."};
  }
  if(md==="08-15") return {lvl:"info",h:"The Assumption: South Africa's patronal feast",p:"In South Africa, when 15 August falls on a weekday, the solemnity and its obligation move to the nearest Sunday. Mass today is warmly encouraged but is not of obligation. Check your parish."};
  if(md==="11-01") return {lvl:"info",h:"All Saints: solemnity",p:"In South Africa All Saints is not a weekday day of obligation; the bishops transfer the observance to a Sunday when it falls on a weekday. Mass is encouraged; check your parish's arrangements."};
  if(OBLIG_NOT_ZA[md]) return {lvl:"info",h:"Solemnity, not of obligation in South Africa",p:`Universal law lists ${OBLIG_NOT_ZA[md]} among the holy days (CIC c. 1246 §1), but the Southern African bishops, using the faculty in c. 1246 §2, do not keep it as a day of obligation. Going to Mass today is still a great good.`};
  return null;
}
const OBLIG_WHY=`<details class="ob-why"><summary>Why Mass is obligatory, and who is excused</summary>
<p><strong>The precept.</strong> "On Sundays and other holy days of obligation the faithful are obliged to participate in the Mass" (CIC c. 1247). It is the first precept of the Church (CCC 2042). The obligation is satisfied by Mass "celebrated anywhere in a Catholic rite either on the feast day itself or in the evening of the preceding day" (c. 1248 §1).</p>
<p><strong>Why.</strong> The third commandment ("Remember to keep holy the Sabbath day") is fulfilled for Christians on Sunday, the day of the Resurrection (CCC 2174–2176). St Thomas teaches that the commandment is partly moral and natural, since reason requires us to give some time to God, and partly ceremonial, since the particular day is fixed by positive law (ST II-II q.122 a.4 ad 1). The Church fixes Sunday and certain feasts so that worship is common, public and certain. John Paul II writes: "Sharing in the Eucharist is the heart of Sunday" (Dies Domini 52; §§ 46–49 treat the obligation).</p>
<p><strong>Gravity.</strong> "Those who deliberately fail in this obligation commit a grave sin" (CCC 2181).</p>
<p><strong>Excusing causes.</strong> The obligation binds unless one is "excused for a serious reason (for example, illness, the care of infants) or dispensed by their own pastor" (CCC 2181). A real impossibility, such as no Mass within reach, serious illness, or caring for someone who cannot be left, excuses; then one should spend time in prayer, ideally with the day's readings (c. 1248 §2).</p>
<p><strong>Rest.</strong> On these days we also abstain from work that hinders worship, joy and rest (c. 1247; CCC 2185).</p>
<p class="muted">South Africa: Sundays and Christmas are of obligation. Epiphany, Ascension and Corpus Christi are celebrated on Sundays; the Assumption moves to the nearest Sunday when it falls on a weekday. Sources: The Southern Cross (2021; 2023); SACNS (2009). Diocesan arrangements can differ, so your parish bulletin is the final word.</p></details>`;
function obligHTML(o,full){
  if(!o)return "";
  const cls=o.lvl==="must"?"ob-must":o.lvl==="vigil"?"ob-vigil":"ob-info";
  const icon=o.lvl==="must"?"✠":o.lvl==="vigil"?"☾":"ℹ";
  return `<div class="oblig ${cls}" role="note"><div class="ob-h"><span class="ob-i" aria-hidden="true">${icon}</span>${esc(o.h)}</div><p>${esc(o.p)}</p>${full?OBLIG_WHY:""}</div>`;
}
// next upcoming weekday obligation (for the home card), within 14 days
