// ---------- Polish: restore scroll position when going Back ----------
(function(){const pos={};let cur=location.hash||"#home",pop=false;
 addEventListener("scroll",()=>{pos[cur]=scrollY;},{passive:true});
 addEventListener("popstate",()=>{pop=true;});
 addEventListener("hashchange",()=>{const h=location.hash||"#home",back=pop,saved=pos[h]||0;pop=false;cur=h;
  if(!back||saved<40)return;let tries=0;
  const go=()=>{if((location.hash||"#home")!==h)return;if(document.documentElement.scrollHeight>=saved+innerHeight*.6||tries>=8){scrollTo(0,saved);pos[h]=saved;return;}tries++;setTimeout(go,90);};
  setTimeout(go,0);});})();
