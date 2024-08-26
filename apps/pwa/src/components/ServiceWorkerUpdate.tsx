import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Typography, Space, message, Switch } from "antd";
import { useLocation } from "react-router-dom";
//@ts-ignore
import { registerSW } from "virtual:pwa-register";
import { subscribeToPushNotifications } from "@/sw";

const { Text, Title } = Typography;

export const handleNotificationToggle = async (checked: boolean, updateNotificationsEnabled: (enabled: boolean) => void) => {
  if (checked) {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribeToPushNotifications();
        updateNotificationsEnabled(true);
      } else {
        console.log('Notification permission denied');
        updateNotificationsEnabled(false);
      }
    } else {
      console.log('Notifications not supported in this browser');
      updateNotificationsEnabled(false);
    }
  } else {
    // Unsubscribe from notifications
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        registration.active?.postMessage({ type: 'UNSUBSCRIBE_NOTIFICATIONS' });
        console.log('Notification turned off');
        updateNotificationsEnabled(false);
      }
    }
  }
};

const ServiceWorkerUpdateDialog: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateSW, setUpdateSW] = useState<(() => Promise<void>) | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const location = useLocation();

  const isUpdateAllowed = useCallback((): boolean => {
    const locationParts = location.pathname.split("/");
    return !["add-new", "edit"].some(part => locationParts.includes(part));
  }, [location]);

  const updateNotificationsEnabled = useCallback((enabled: boolean) => {
    setNotificationsEnabled(enabled);
  }, []);

  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        const swUpdater = await registerSW({
          onNeedRefresh() {
            setUpdateAvailable(true);
          },
          onOfflineReady() {
            message.success('App is ready for offline use');
          },
        });

        setUpdateSW(() => swUpdater);

        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;

          // Check if notifications are enabled
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
        }
      } catch (error) {
        console.error('Failed to register service worker:', error);
        message.error('Failed to set up offline functionality');
      }
    };

    registerServiceWorker();
  }, []);

  const handleUpdate = useCallback(() => {
    if (updateAvailable && updateSW) {
      updateSW().then(() => {
        window.location.reload();
      }).catch(error => {
        console.error('Failed to update service worker:', error);
        message.error('Update failed. Please try again later.');
      });
    }
  }, [updateAvailable, updateSW]);

  const handleClose = useCallback(() => {
    setUpdateAvailable(false);
  }, []);

  if (!updateAvailable || !isUpdateAllowed()) {
    return null;
  }

  return (
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
          <li>Customization</li>
          <li>Bug Fixes</li>
          <li>Feature Improvements</li>
        </ul>
        <Space direction="horizontal">
          <Text>Enable Notifications</Text>
          <Switch 
            checked={notificationsEnabled} 
            onChange={(checked) => handleNotificationToggle(checked, updateNotificationsEnabled)} 
          />
        </Space>
      </Space>
    </Modal>
  );
};

export default ServiceWorkerUpdateDialog;