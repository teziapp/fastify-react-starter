/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope & typeof globalThis & { __WB_MANIFEST: any };
console.log("New service worker file");
precacheAndRoute(self.__WB_MANIFEST);

interface NotificationData {
  title: string;
  body: string;
  icon: string;
  badge: string;
  data: string;
}

// Activate event to take control of all clients as soon as the service worker is activated
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for manual update trigger
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Function to check if notifications are already subscribed
const checkNotificationSubscription = async (): Promise<boolean | undefined> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription ? true : false;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return undefined;
  }
};

// Handle push notifications
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
    self.registration.showNotification(data.title, notification)
      .then(() => console.log('Notification shown'))
      .catch(error => console.error('Error showing notification:', error))
  );
});

// Handle notification click event
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data)
  );
});

export async function subscribeToPushNotifications(): Promise<void> {
  try {
    // Check if there is already a subscription
    const isSubscribed = await checkNotificationSubscription();
    if (isSubscribed) {
      console.log('Already subscribed to push notifications');
      return;
    }

    // Proceed with subscription if not already subscribed
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BLA70jg5Wgi6XD6BAElOfW7YXcQ3l3iFRzyPj5AV5ZuSr_uTugv-9hbgXwfPhuw_JfbDAqn-Fl5nKSvnQpjFV8g',
    });
    
    const response = await fetch(import.meta.env.VITE_BE_URL + '/subscribe', {
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