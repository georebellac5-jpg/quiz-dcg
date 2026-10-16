// Quiz DCG v6 — réseau d'abord : toute mise à jour en ligne est prise immédiatement ; cache = secours hors connexion.
const C="quiz-dcg-v7";
const SHELL=["./","index.html","fiscal.html","societes.html","app.webmanifest","app-180.png","app-192.png","app-512.png","dubai.webp","desk_dubai.webp","banlieue.webp","desk_banlieue.webp","paris.webp","desk_paris.webp","newyork.webp","desk_newyork.webp","intro_poster.jpg","gerard.webp","manon.webp","yanis.webp","julie.webp","laurent.webp","nicolas.webp","philippe.webp","helene.webp","marc.webp","catherine.webp","kevin.webp","lucas.webp","sofia.webp","henri.webp","thomas.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  // vidéos : laissées au navigateur (requêtes partielles « Range » indispensables sur iPhone)
  if(r.headers.has("range")||/\.(mp4|webm|mov)(\?|$)/.test(r.url))return;
  const same=new URL(r.url).origin===location.origin;
  e.respondWith(fetch(same?new Request(r,{cache:"no-cache"}):r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))));
});
