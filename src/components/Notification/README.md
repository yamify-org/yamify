# Notification Component

A customizable notification system for the Yamify application, supporting different notification types and light/dark mode.

## Features

- Display of temporary notifications
- Support for different types: success, error, warning, info
- Integration with the application's light/dark theme
- Manual or automatic dismissal
- Visual progress bar

## Installation

The component is already included in the main application layout. No additional installation is required.

## Usage

### 1. Basic Usage with the useNotification Hook

```tsx
import { useNotification } from '@/hooks/useNotification';

function MyComponent() {
  const { success, error, warning, info } = useNotification();

  const handleAction = () => {
    // Example success notification
    success('Operation successful!', 'Success', 5000);
    
    // Example error notification
    // error('An error occurred', 'Error', 5000);
    
    // Example warning notification
    // warning('This action cannot be undone', 'Warning', 5000);
    
    // Example info notification
    // info('New update available', 'Information', 5000);
  };

  return (
    <button onClick={handleAction}>
      Perform Action
    </button>
  );
}
```

## API Reference

### `useNotification` Hook

```tsx
const { 
  showNotification, 
  success, 
  error, 
  warning, 
  info 
} = useNotification();
```

#### Methods

- `showNotification(message: string, type: NotificationType, title?: string, duration?: number)`: Generic method to display a notification
- `success(message: string, title?: string, duration?: number)`: Displays a success notification
- `error(message: string, title?: string, duration?: number)`: Displays an error notification
- `warning(message: string, title?: string, duration?: number)`: Displays a warning notification
- `info(message: string, title?: string, duration?: number)`: Displays an info notification

#### Parameters

- `message` (string, required): The main content of the notification
- `title` (string, optional): The title of the notification
- `duration` (number, optional): Display duration in milliseconds (default: 5000ms)
- `type` (NotificationType, required for `showNotification`): Type of notification ('success' | 'error' | 'warning' | 'info')

## File Structure

- `Notification.tsx`: Individual notification component
- `NotificationContainer.tsx`: Container that manages all notifications
- `useNotificationStore.ts`: Zustand store for managing notification state
- `useNotification.ts`: Hook for easier notification usage
- `Notification.css`: CSS styles for notifications
- `Notification.css.map`: Source map for CSS styles
- `Notification.scss`: SCSS source for notification styles

## Styling

Customize the appearance by modifying the SCSS variables in `Notification.scss`:

```scss
// Colors
$success-color: #187050;
$error-color: #ef4444;
$warning-color: #bb811b;
$info-color: #3b82f6;

// Light mode
$light-bg: #ffffff;
$light-text: #1b1b1b;
$light-border: #b8b8b8;

// Dark mode
$dark-bg: #1b1b1b;
$dark-text: #ffffff;
```

## Best Practices

1. Keep notification messages clear and concise
2. Use appropriate notification types for different scenarios
3. Set reasonable durations for automatic dismissal
4. Ensure important notifications require user action
5. Test notifications in both light and dark modes

## Examples

### Success Notification
```tsx
const { success } = useNotification();
success('Your changes have been saved successfully!', 'Success');
```

### Error with Custom Duration
```tsx
const { error } = useNotification();
error('Failed to save changes. Please try again.', 'Error', 10000);
```

### Warning with Title
```tsx
const { warning } = useNotification();
warning('This action cannot be undone.', 'Warning');
```

### Info Notification
```tsx
const { info } = useNotification();
info('New features available in the latest update!', 'Update Available');
```

