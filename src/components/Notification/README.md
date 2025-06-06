# Composant de Notification

Un système de notification personnalisable pour l'application Yamify, supportant différents types de notifications et le mode clair/sombre.

## Fonctionnalités

- Affichage de notifications temporaires
- Support de différents types : succès, erreur, avertissement, info
- Intégration avec le thème clair/sombre de l'application
- Fermeture manuelle ou automatique
- Barre de progression visuelle

## Installation

Le composant est déjà inclus dans le layout principal de l'application. Aucune installation supplémentaire n'est nécessaire.

## Utilisation

### 1. Utilisation de base avec le hook useNotification

```tsx
import { useNotification } from '@/hooks/useNotification';

function MonComposant() {
  const { success, error, warning, info } = useNotification();

  const handleAction = () => {
    // Exemple de notification de succès
    success('Opération réussie !', 'Succès', 5000);
    
    // Exemple de notification d'erreur
    // error('Une erreur est survenue', 'Erreur', 5000);
    
    // Exemple d'avertissement
    // warning('Attention, action irréversible', 'Avertissement', 5000);
    
    // Exemple d'information
    // info('Nouvelle mise à jour disponible', 'Information', 5000);
  };

  return (
    <button onClick={handleAction}>
      Effectuer une action
    </button>
  );
}
```

### API

#### Hook `useNotification`

```tsx
const { 
  showNotification, 
  success, 
  error, 
  warning, 
  info 
} = useNotification();
```

- `showNotification(message, type, title?, duration?)`: Méthode générique pour afficher une notification
- `success(message, title?, duration?)`: Affiche une notification de succès
- `error(message, title?, duration?)`: Affiche une notification d'erreur
- `warning(message, title?, duration?)`: Affiche une notification d'avertissement
- `info(message, title?, duration?)`: Affiche une notification d'information

#### Paramètres

- `message` (string): Le contenu principal de la notification
- `title` (string, optionnel): Le titre de la notification
- `duration` (number, optionnel): Durée d'affichage en millisecondes (par défaut: 5000ms)

## Structure des fichiers

- `Notification.tsx`: Composant individuel de notification
- `NotificationContainer.tsx`: Conteneur qui gère l'affichage de toutes les notifications
- `useNotificationStore.ts`: Store Zustand pour gérer l'état des notifications
- `useNotification.ts`: Hook pour faciliter l'utilisation des notifications
- `Notification.module.css`: Styles CSS pour les notifications
- `NotificationContainer.module.css`: Styles CSS pour le conteneur de notifications

## Personnalisation

Vous pouvez personnaliser l'apparence des notifications en modifiant les fichiers CSS modulaires.
