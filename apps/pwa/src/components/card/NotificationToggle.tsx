import React, { useState } from 'react';
import { Switch } from 'antd';
import { handleNotificationToggle } from '../ServiceWorkerUpdate';

interface NotificationToggleProps {
  colorTextSecondary: string;
  colorTextTertiary: string;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({
  colorTextSecondary,
  colorTextTertiary,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div>
      <div
        className="mb-3 text-base font-semibold"
        style={{ color: colorTextSecondary }}
      >
        Notifications
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center justify-between"
          style={{ color: colorTextTertiary }}
        >
          <div>Enable Notifications</div>
          <Switch
            size="small"
            checked={notificationsEnabled}
            onChange={(checked) => handleNotificationToggle(checked, setNotificationsEnabled)}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationToggle;