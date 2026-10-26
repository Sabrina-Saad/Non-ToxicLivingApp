/* Offline support: cache the app shell, network-first for everything else. */
const CACHE = "ntl-v5";
const SHELL = [
  "./", "./index.html", "./css/styles.css", "./js/app.js",
  "./js/data/products.js", "./js/data/recipes.js", "./js/data/clothing.js", "./js/data/additives.js", "./js/data/diets.js",
  "./js/vendor/zxing.min.js",
  "./fonts/figtree-latin-400-normal.woff2", "./fonts/figtree-latin-500-normal.woff2", "./fonts/figtree-latin-600-normal.woff2", "./fonts/figtree-latin-700-normal.woff2",
  "./fonts/instrument-sans-latin-500-normal.woff2", "./fonts/instrument-sans-latin-600-normal.woff2", "./fonts/instrument-sans-latin-700-normal.woff2",
  "./manifest.webmanifest", "./icons/icon.svg", "./icons/apple-touch-icon.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    // no-cache: always ask the server first, so a new version shows up on the next open.
    fetch(e.request, { cache: "no-cache" })
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./index.html")))
  );
});
