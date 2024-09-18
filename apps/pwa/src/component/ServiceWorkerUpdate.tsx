/// <reference types="vite-plugin-pwa/client" />
import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Switch, FormControlLabel } from "@mui/material";
import { registerSW } from "virtual:pwa-register";
import { toast } from 'react-toastify';
import { handleNotificationToggle } from "@/utils/handleNotification";

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
      toast.success('App is ready for offline use');
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
    <Dialog
      open={updateAvailable}
      onClose={handleClose}
      aria-labelledby="update-dialog-title"
    >
      <DialogTitle id="update-dialog-title">An update is available!</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography>Performance Improvement Update</Typography>
          <Typography variant="h6">New Features:</Typography>
          <ul>
            <li>Customizations Added</li>
            <li>Bug Fixes</li>
            <li>Feature Improvements</li>
          </ul>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={(event) => handleNotificationToggle(event.target.checked, setNotificationsEnabled)}
            />
          }
          label="Enable Notifications"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceWorkerUpdateDialog;
