// Fichier : src/types/global.d.ts

// Déclarez l'interface globale Window
declare global {
  interface Window {
    datadogRumInitialized?: boolean; // Ajoutez la propriété optionnelle datadogRumInitialized
    // Vous pouvez également ajouter d'autres propriétés globales si nécessaire
  }
}

// Assurez-vous que le fichier est un module pour que TypeScript le reconnaisse
export {};
