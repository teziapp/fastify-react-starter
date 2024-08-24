import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Space } from "antd";
import { useLocation } from "react-router-dom";
// @ts-ignore
import { registerSW } from "virtual:pwa-register";
import { subscribeToPushNotifications } from "@/sw";

const { Text, Title } = Typography;

const ServiceWorkerUpdateDialog: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const location = useLocation();

  const isUpdateAllowed = (): boolean => {
    const locationParts = location.pathname.split("/");
    return !(
      locationParts.includes("add-new") || locationParts.includes("edit")
    );
  };

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setUpdateAvailable(true);
      },
      onOfflineReady() {
        console.log('App is ready for offline use');
      },
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration:ServiceWorkerRegistration) => {
        // Subscribe to push notifications
        subscribeToPushNotifications();

        // Request any stored notifications
        registration.active?.postMessage({ type: 'GET_STORED_NOTIFICATION' });
      });

      // Listen for messages from the service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log(event)
        if (event.data && event.data.type === 'PUSH_RECEIVED') {
          console.log('Push notification received in the frontend:', event.data.notification);
          // Handle the push notification in the UI
          const { badge, body, title } = event.data.notification;
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
              body: body,
              icon: badge
            });
          }
        }
      });
    }

    return () => {
      updateSW && updateSW();
    };
  }, []);

  const handleUpdate = () => {
    if (updateAvailable) {
      window.location.reload();
    }
  };

  const handleClose = () => {
    setUpdateAvailable(false);
  };

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
          <li>Report Customization</li>
          <li>Financial Year Separation</li>
          <li>Fast PDF Load</li>
        </ul>
      </Space>
    </Modal>
  );
};

export default ServiceWorkerUpdateDialog;