import { subscribeToPushNotifications } from "@/sw";


export const handleNotificationToggle = async (
    checked: boolean,
    setNotificationsEnabled: (enabled: boolean) => void
  ) => {
    setNotificationsEnabled(checked);  
    handleNotificationSubscription(checked);
  };
  
  export const handleNotificationSubscription = async (subscribe: boolean): Promise<boolean> => {
    if (subscribe) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          await subscribeToPushNotifications();
          await navigator.serviceWorker.ready.then(async registration => {
            return await registration.pushManager.getSubscription();
          });
          return true;
        } else {
          console.log('Notification permission denied');
          return false;
        }
      } else {
        console.log('Notifications not supported in this browser');
        return false;
      }
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
          
          registration.active?.postMessage({ type: 'UNSUBSCRIBE_NOTIFICATIONS' });
          console.log('Notification turned off');
          return false;
        }
      }
      return false;
    }
  };