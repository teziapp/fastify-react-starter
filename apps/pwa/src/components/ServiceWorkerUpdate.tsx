import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Space } from "antd";
import { useLocation } from "react-router-dom";
// @ts-ignore
import { registerSW } from "virtual:pwa-register";

const { Text, Title } = Typography;

interface UpdateInfo {
  type: "serviceWorker" | "pwaInstall";
}

const ServiceWorkerUpdateDialog: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();

  const isUpdateAllowed = (): boolean => {
    const locationParts = location.pathname.split("/");
    return !(
      locationParts.includes("add-new") || locationParts.includes("edit")
    );
  };

  useEffect(() => {
    const intervalMS = 60 * 60 * 1000; // 1 hour

    registerSW({
      onNeedRefresh() {
        if (!updateInfo) {
          setUpdateInfo({ type: "serviceWorker" });
        }
      },
      onOfflineReady() {},
      onRegisteredSW(swUrl: string, registration: ServiceWorkerRegistration) {
        if (registration) {
          setInterval(async () => {
            if (!registration.installing && navigator.onLine) {
              try {
                const resp = await fetch(swUrl, { cache: "no-store" });
                if (resp.status === 200) {
                  await registration.update();
                }
              } catch (error) {
                console.error("Error checking for SW update:", error);
              }
            }
          }, intervalMS);
        }
      },
    });

    // PWA install prompt listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setUpdateInfo({ type: "pwaInstall" });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleUpdate = () => {
    if (updateInfo?.type === "serviceWorker") {
      window.location.reload();
    } else if (updateInfo?.type === "pwaInstall" && deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
        setUpdateInfo(null);
      });
    }
  };

  const handleClose = () => {
    setUpdateInfo(null);
  };

  if (!updateInfo || !isUpdateAllowed()) {
    return null;
  }

  return (
    <Modal
      title={
        updateInfo.type === "serviceWorker"
          ? "An update is available!"
          : "Install App"
      }
      open={true}
      onOk={handleUpdate}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          {updateInfo.type === "serviceWorker" ? "Update" : "Install"}
        </Button>,
      ]}
    >
      <Space direction="vertical">
        {updateInfo.type === "serviceWorker" ? (
          <>
            <Text>Performance Improvement Update</Text>
            <Title level={5}>New Features:</Title>
            <ul>
              <li>Report Customization</li>
              <li>Financial Year Separation</li>
              <li>Fast PDF Load</li>
            </ul>
          </>
        ) : (
          <Text>
            Would you like to install our app for a better experience?
          </Text>
        )}
      </Space>
    </Modal>
  );
};

export default ServiceWorkerUpdateDialog;
