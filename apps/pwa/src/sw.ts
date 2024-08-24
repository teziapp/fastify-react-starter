/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope & typeof globalThis & { __WB_MANIFEST: any };

// Use self.skipWaiting() only if it exists
clientsClaim();

function sendMessageToClients(message:any) {
  self.clients?.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(message));
  }).catch(() => {
    // Fallback if matchAll is not available
    self.registration.active?.postMessage(message);
  });
}

precacheAndRoute(self.__WB_MANIFEST);

let storedNotification:any = null;

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'New Notification';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/favicon/android-chrome-192x192.png',
    badge: '/favicon/android-chrome-192x192.png',
    data: data.url || '/',
  };

  storedNotification = { title, ...options };
  // Send message to all clients (main thread)
  sendMessageToClients({
    type: 'PUSH_RECEIVED',
    notification: { title, ...options }
  });

  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => console.log('Notification shown')) // Add this log
      .catch(error => console.error('Error showing notification:', error)) // Add error logging
  );
});

self.addEventListener('message', (event) => {
  try {
    console.log('Message event received:', event.data); // Add this log
    if (event.data && event.data.type === 'GET_STORED_NOTIFICATION') {
      if (storedNotification) {
        console.log('Sending stored notification:', storedNotification); // Add this log
        event.source?.postMessage({
          type: 'PUSH_RECEIVED',
          payload: storedNotification
        });
        storedNotification = null; // Clear the stored notification after sending
      } else {
        console.log('No stored notification available'); // Add this log
      }
    }
  } catch (error) {
    console.error('Error in message event handler:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data)
  );
});

export async function subscribeToPushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BLA70jg5Wgi6XD6BAElOfW7YXcQ3l3iFRzyPj5AV5ZuSr_uTugv-9hbgXwfPhuw_JfbDAqn-Fl5nKSvnQpjFV8g'
    });
    
    // Update the endpoint to match your server
    await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
    
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
  }
}

// subscribeToPushNotifications();