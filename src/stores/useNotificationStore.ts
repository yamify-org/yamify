import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number; // en millisecondes
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = uuidv4();
    const defaultDuration = 5000; // 5 secondes par défaut
    
    set((state) => ({
      notifications: [
        ...state.notifications,
        { 
          ...notification, 
          id,
          duration: notification.duration || defaultDuration
        }
      ]
    }));
    
    // Suppression automatique après la durée spécifiée
    if (notification.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id)
        }));
      }, notification.duration || defaultDuration);
    }
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id)
    }));
  },
  
  clearAllNotifications: () => {
    set({ notifications: [] });
  }
}));
