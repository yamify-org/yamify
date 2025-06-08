"use client";

import React from 'react';
import { useNotificationStore } from '@/stores/useNotificationStore';
import Notification from './Notification';
import "@/styles/Notification.css";

interface NotificationContainerProps {
  lightMode?: boolean;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ lightMode = false }) => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-wrapper">
          <Notification
            notification={notification}
            onClose={removeNotification}
            lightMode={lightMode}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
