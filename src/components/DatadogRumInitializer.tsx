    // Fichier : app/components/DatadogRumInitializer.tsx
    'use client'; // Indique que ce composant est un Client Component et s'exécute côté client

    import { useEffect } from 'react';
    import { datadogRum } from '@datadog/browser-rum';

    function DatadogRumInitializer() {
      useEffect(() => {
        // Initialiser RUM une seule fois lors du montage du composant côté client.
        // La vérification `typeof window !== 'undefined'` est déjà implicite avec 'use client',
        // mais le flag `datadogRumInitialized` est utile pour éviter les réinitialisations.
        if (!(window as any).datadogRumInitialized) {
          datadogRum.init({
            applicationId: '31d5e1f9-5e85-472a-b55f-a10d36b2fa76',
            clientToken: 'puba7ea0c9da9aee5a4fe9abbf4d7926cbf',
            site: 'datadoghq.com',
            service: 'yamify',
            env: 'prod',
            // Il est FORTEMENT recommandé d'utiliser une variable d'environnement
            // publique de Next.js pour la version, par exemple :
            // version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
            version: '1.0.0', // Remplacez par votre version réelle ou une variable d'environnement
            sessionSampleRate: 100,
            sessionReplaySampleRate: 20,
            defaultPrivacyLevel: 'mask-user-input',
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
          });
          // Marquer comme initialisé pour éviter les réinitialisations futures (utile pour HMR en dev)
          (window as any).datadogRumInitialized = true;
        }
      }, []); // Le tableau de dépendances vide assure que useEffect ne s'exécute qu'une seule fois au montage

      return null; // Ce composant ne rend rien visuellement
    }

    export default DatadogRumInitializer;
    
