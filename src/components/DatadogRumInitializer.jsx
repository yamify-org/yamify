    // Fichier : app/components/DatadogRumInitializer.jsx
    'use client'; // Indique que ce composant est un Client Component

    import { useEffect } from 'react';
    import { datadogRum } from '@datadog/browser-rum';

    function DatadogRumInitializer() {
      useEffect(() => {
        // Initialiser RUM une seule fois lors du montage du composant côté client
        if (!window.datadogRumInitialized) {
          datadogRum.init({
            applicationId: '31d5e1f9-5e85-472a-b55f-a10d36b2fa76',
            clientToken: 'puba7ea0c9da9aee5a4fe9abbf4d7926cbf',
            site: 'datadoghq.com',
            service: 'yamify',
            env: 'prod',
            version: '1.0.0', // Assurez-vous que cette version correspond à votre déploiement
            sessionSampleRate: 100,
            sessionReplaySampleRate: 20,
            defaultPrivacyLevel: 'mask-user-input',
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
          });
          // Marquer comme initialisé pour éviter les réinitialisations
          window.datadogRumInitialized = true;
        }
      }, []); // Le tableau de dépendances vide assure que useEffect ne s'exécute qu'une seule fois

      return null; // Ce composant ne rend rien visuellement
    }

    export default DatadogRumInitializer;
    
