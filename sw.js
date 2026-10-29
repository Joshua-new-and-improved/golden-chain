// Golden Chain offline support: the app shell is refreshed from the network when online;
// Bible text, commentary, images and the lectionary are kept once fetched so they work offline.
const VER="gc-v1";
const SHELL=["./","index.html","manifest.json","lect.json","bible/index.json","comm/index.json","brand/logo.svg","brand/icon-192.png","brand/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER&&k.startsWith("gc-")).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);if(url.origin!==location.origin)return;
  const p=url.pathname;
  const isShell=req.mode==="navigate"||/\/(index\.html|manifest\.json|lect\.json|sw\.js)$/.test(p)||/\/(bible|comm)\/index\.json$/.test(p);
  if(isShell){
    e.respondWith(fetch(req).then(r=>{if(r.ok){const cp=r.clone();caches.open(VER).then(c=>c.put(req.mode==="navigate"?"index.html":req,cp));}return r;}).catch(()=>caches.match(req.mode==="navigate"?"index.html":req).then(r=>r||caches.match("index.html"))));
    return;
  }
  if(/\/(bible|comm|catena|img|brand)\//.test(p)){
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const cp=r.clone();caches.open(VER).then(c=>c.put(req,cp));}return r;})));
  }
});
