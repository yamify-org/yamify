"use client";

import { useNotificationStore, NotificationType } from '@/stores/useNotificationStore';

export const useNotification = () => {
  const { addNotification } = useNotificationStore();

  const showNotification = (
    message: string, 
    type: NotificationType = 'info', 
    title?: string, 
    duration: number = 5000
  ) => {
    addNotification({
      type,
      message,
      title,
      duration,
    });
  };

  return {
    showNotification,
    success: (message: string, title?: string, duration?: number) => 
      showNotification(message, 'success', title, duration),
    error: (message: string, title?: string, duration?: number) => 
      showNotification(message, 'error', title, duration),
    warning: (message: string, title?: string, duration?: number) => 
      showNotification(message, 'warning', title, duration),
    info: (message: string, title?: string, duration?: number) => 
      showNotification(message, 'info', title, duration),
  };
};
