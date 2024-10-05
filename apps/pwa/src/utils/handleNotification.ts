import { subscribeToPushNotifications } from "@/sw";

export const handleNotificationSubscription = async (subscribe: boolean): Promise<boolean> => {
  if (subscribe) {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribeToPushNotifications();
        const subscription = await navigator.serviceWorker.ready.then(async registration => {
          return await registration.pushManager.getSubscription();
        });
        if (subscription) {
          // Add event listener for push notifications
          navigator.serviceWorker.addEventListener('push', handlePushEvent as EventListener);
          return true;
        }
      }
      console.log('Notification permission denied');
      return false;
    }
    console.log('Notifications not supported in this browser');
    return false;
  } else {
    // Unsubscribe from notifications
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        
        // Send unsubscribe request to backend
        await fetch(import.meta.env.VITE_BE_URL + '/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
        
        // Remove the event listener for push notifications
        navigator.serviceWorker.removeEventListener('push', handlePushEvent as EventListener);
        
        registration.active?.postMessage({ type: 'UNSUBSCRIBE_NOTIFICATIONS' });
        console.log('Notification turned off');
        return false;
      }
    }
    return false;
  }
};

// Define the handlePushEvent function
function handlePushEvent(event: PushEvent) {
  // Handle the push event here
  console.log('Received a push event', event);
}