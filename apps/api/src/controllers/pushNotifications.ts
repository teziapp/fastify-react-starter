import webpush, { PushSubscription } from 'web-push';
import { env } from "../configs/env.config";
import { scheduleJob } from 'node-schedule';

// Configure web-push
webpush.setVapidDetails(
  'mailto:mohit@teziapp.com',
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
);

// In-memory storage for subscriptions (replace with database in production)
const pushSubscriptions = new Set<PushSubscription>();

export function addSubscription(subscription: PushSubscription) {
  pushSubscriptions.add(subscription);
}

export async function sendNotificationToAll(title: string, body: string) {
  for (const subscription of pushSubscriptions) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
    } catch (error) {
      console.error('Error sending notification:', error);
      pushSubscriptions.delete(subscription);
    }
  }
}

// Schedule a notification every 5 seconds
export function scheduleFrequentNotification() {
  scheduleJob('*/5 * * * * *', async () => {
    await sendNotificationToAll('Frequent Update', 'Here is your notification every 5 seconds!');
  });
}