import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');

  wb.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      console.log('Service worker activated for the first time!');
    }
  });

  wb.addEventListener('waiting', (event) => {
    console.log(
      `A new service worker has installed, but it can't activate` +
        `until all tabs running the current version have fully unloaded.`,
    );
  });

  wb.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_UPDATED') {
      const { updatedURL } = event.data.payload;

      console.log(`A newer version of ${updatedURL} is available!`);
    }
  });

  wb.register();
}
