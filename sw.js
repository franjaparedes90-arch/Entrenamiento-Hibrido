/**
 * sw.js — Service worker de "Mi Entrenamiento" (versión instalable / PWA).
 *
 * Regla que no se toca: Firestore sigue siendo la única fuente de verdad de los datos.
 * Este service worker SOLO cachea el "cascarón" estático (HTML/CSS/JS/iconos/manifest) para que
 * la app abra rápido e incluso sin conexión — nunca cachea ni intercepta llamadas a Firebase/Firestore.
 * Esas siempre van directas a la red; si no hay conexión, fallan de forma visible en la app (como ya
 * pasa hoy), en vez de servir datos viejos como si fueran reales.
 *
 * 2026-08-28: cambiado a estrategia "network-first" para el cascarón (antes era cache-first con
 * actualización en segundo plano, lo que hacía que una actualización recién se viera en el SEGUNDO
 * refresco). Ahora, con conexión, siempre se pide la versión más nueva primero; solo si falla la red
 * (sin conexión) se usa la última copia guardada. Para forzar que los usuarios reciban una versión
 * nueva del cascarón tras una actualización, además sube el número de CACHE_VERSION al publicar
 * cambios (borra cachés viejas automáticamente).
 */

var CACHE_VERSION = 'mientrenamiento-shell-v3';
var SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) { return cache.addAll(SHELL_FILES); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_VERSION; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  // Nunca interceptar llamadas a Firebase/Firestore ni nada que no sea same-origin:
  // esas siempre van a la red, tal cual, para que los datos vengan siempre de Firestore.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).then(function (resp) {
      if (resp && resp.ok) {
        caches.open(CACHE_VERSION).then(function (cache) { cache.put(event.request, resp.clone()); });
      }
      return resp;
    }).catch(function () {
      // Sin red: usar el cascarón cacheado si existe.
      return caches.match(event.request);
    })
  );
});
