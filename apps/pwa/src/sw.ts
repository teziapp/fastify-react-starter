/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope & typeof globalThis & { __WB_MANIFEST: any };

precacheAndRoute(self.__WB_MANIFEST);

interface NotificationData {
  title: string;
  body: string;
  icon: string;
  badge: string;
  data: string;
}

self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() || {};
  const notification: NotificationData = {
    title: data.title || 'New Notification',
    body: data.body || 'You have a new notification',
    icon: '/favicon/android-chrome-192x192.png',
    badge: '/favicon/android-chrome-192x192.png',
    data: data.url || '/',
  };

  event.waitUntil(
    self.registration.showNotification(notification.title, notification)
      .then(() => console.log('Notification shown'))
      .catch(error => console.error('Error showing notification:', error))
  );
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