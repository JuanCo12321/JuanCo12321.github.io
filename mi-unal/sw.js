// Mi UNAL se mudó a mi-unal.web.app. Este service worker reemplaza al de la dirección anterior:
// borra su copia sin conexión, se retira y lleva las ventanas abiertas a la nueva dirección (con la misma página y
// los datos con los que abre Android). Va directo a la nueva para no depender de la página vieja que guarde el navegador.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) {
    const u = new URL(c.url);
    c.navigate('https://mi-unal.web.app/' + (u.search ? u.search + '&' : '?') + 'mudanza=1' + u.hash);
  }
})()));
