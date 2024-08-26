import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Typography, Space, message } from "antd";
import { useLocation } from "react-router-dom";
//@ts-ignore
import { registerSW } from "virtual:pwa-register";
import { subscribeToPushNotifications } from "@/sw";

const { Text, Title } = Typography;

const ServiceWorkerUpdateDialog: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateSW, setUpdateSW] = useState<(() => Promise<void>) | null>(null);
  const location = useLocation();

  const isUpdateAllowed = useCallback((): boolean => {
    const locationParts = location.pathname.split("/");
    return !["add-new", "edit"].some(part => locationParts.includes(part));
  }, [location]);

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
          await navigator.serviceWorker.ready;
          await subscribeToPushNotifications();
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
      </Space>
    </Modal>
  );
};

export default ServiceWorkerUpdateDialog;
