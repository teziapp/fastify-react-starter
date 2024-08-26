/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope & typeof globalThis & { __WB_MANIFEST: any };

clientsClaim();

interface Notification {
  title: string;
  body: string;
  icon: string;
  badge: string;
  data: string;
}

function sendMessageToClients(message: { type: string; notification?: Notification }): void {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(message));
  }).catch(error => {
    console.error('Error sending message to clients:', error);
    self.registration.active?.postMessage(message);
  });
}

precacheAndRoute(self.__WB_MANIFEST);

let storedNotification: Notification | null = null;

self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() ?? {};
  const notification: Notification = {
    title: data.title || 'New Notification',
    body: data.body || 'You have a new notification',
    icon: '/favicon/android-chrome-192x192.png',
    badge: '/favicon/android-chrome-192x192.png',
    data: data.url || '/',
  };

  storedNotification = notification;
  sendMessageToClients({ type: 'PUSH_RECEIVED', notification });

  event.waitUntil(
    self.registration.showNotification(notification.title, notification)
      .then(() => console.log('Notification shown'))
      .catch(error => console.error('Error showing notification:', error))
  );
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data?.type === 'GET_STORED_NOTIFICATION') {
    console.log('GET_STORED_NOTIFICATION message received');
    if (storedNotification) {
      console.log('Sending stored notification:', storedNotification);
      event.source?.postMessage({
        type: 'PUSH_RECEIVED',
        payload: storedNotification
      });
      storedNotification = null;
    } else {
      console.log('No stored notification available');
    }
  }
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data)
  );
});

export async function subscribeToPushNotifications(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BLA70jg5Wgi6XD6BAElOfW7YXcQ3l3iFRzyPj5AV5ZuSr_uTugv-9hbgXwfPhuw_JfbDAqn-Fl5nKSvnQpjFV8g'
    });
    
    const response = await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
    
    console.log('Successfully subscribed to push notifications');
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
  }
}

// subscribeToPushNotifications();