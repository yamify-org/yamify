"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { NotificationType, Notification as NotificationData } from '@/stores/useNotificationStore';
import "@/styles/Notification.css";

interface NotificationProps {
  notification: NotificationData;
  onClose: (id: string) => void;
  lightMode?: boolean;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return (
        <svg className="h-5 w-5 text-green-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'error':
      return (
        <svg className="h-5 w-5 text-red-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case 'warning':
      return (
        <svg className="h-5 w-5 text-yellow-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const Notification: React.FC<NotificationProps> = ({ notification, onClose, lightMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(notification.id), 300); // Attendre la fin de l'animation
  }, [onClose, notification.id]);
  
  useEffect(() => {
    // Montre la notification avec une petite animation 
    setTimeout(() => setIsVisible(true), 10);
    
    // Programme la fermeture de la notification si une durée est définie
    if (notification.duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);
      
      return () => clearTimeout(timer);
    }
  }, [handleClose, notification]);
  
  // Applique la classe light-mode si lightMode est true
  const notificationClass = `notification ${notification.type} ${isVisible ? '' : 'exit'} ${lightMode ? 'light-mode' : ''}`;

  return (
    <div 
      className={notificationClass}
      role="alert"
    >
      <div className="notification-content">
        <div className="notification-header gap-10">
          <div className="notification-icon-text flex items-center">
            {getIcon(notification.type)}
            
              {notification.title && (
                <div className="notification-title  ">
                  {notification.title}
                </div>
              )}
              <div className="notification-message ml-8 flex items-center text-left">
                {notification.message}
             
            </div>


           
          </div>
          <button 
            type="button" 
            className="notification-close " 
            onClick={handleClose}
            aria-label="Fermer la notification"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
         
        </div>
       



      </div>
      
      {notification.duration && (
        <div className={`notification-progress ${notification.type}`} />
      )}
    </div>
  );
};

export default Notification;
