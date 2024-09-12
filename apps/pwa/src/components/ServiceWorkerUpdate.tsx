/// <reference types="vite-plugin-pwa/client" />
import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Typography, Space, message, Switch } from "antd";
import { subscribeToPushNotifications } from "@/sw";
import { registerSW } from "virtual:pwa-register";

const { Text, Title } = Typography;


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

const ServiceWorkerUpdateDialog: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Static update function
  const updateSWFunction = registerSW({
    onNeedRefresh() {
      console.log("onNeedRefresh called");
      setUpdateAvailable(true);
    },
    onOfflineReady() {
      message.success('App is ready for offline use');
    },
  });

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(async registration => {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          setNotificationsEnabled(true);
        }

        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'PUSH_RECEIVED') {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(event.data.notification.title, {
                body: event.data.notification.body,
                icon: event.data.notification.badge,
              });
            }
          }
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    console.log("force update");
  
    // Force the new service worker to activate
    updateSWFunction(true);  // This triggers the installation of the new SW
  
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration?.waiting) {
        // Tell the service worker to skip the waiting phase and activate
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  
        // Reload the page when the new service worker takes control
        registration.waiting.addEventListener('statechange', (event) => {
          if ((event.target as ServiceWorker).state === 'activated') {
            window.location.reload();
          }
        });
      }
    });
  
    setUpdateAvailable(false);  // Close the modal
  };
  
  

  const handleClose = useCallback(() => {
    setUpdateAvailable(false);
  }, []);

  return (
    updateAvailable ?
    <Modal
      title="An update is available!"
      open={true}
      onOk={handleUpdate}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Space direction="vertical">
        <Text>Performance Improvement Update</Text>
        <Title level={5}>New Features:</Title>
        <ul>
          <li>Customizations Added</li>
          <li>Bug Fixes</li>
          <li>Feature Improvements</li>
        </ul>
        <Space direction="horizontal">
          <Text>Enable Notifications</Text>
          <Switch 
            checked={notificationsEnabled} 
            onChange={(checked) => handleNotificationToggle(checked,setNotificationsEnabled)}
          />
        </Space>
      </Space>
    </Modal> : null
  );
};

export default ServiceWorkerUpdateDialog;
