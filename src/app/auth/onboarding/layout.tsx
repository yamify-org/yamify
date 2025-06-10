import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// Définir l'interface pour les métadonnées publiques
interface PublicMetadata {
  onboardingComplete?: boolean
  // Ajoutez d'autres champs de métadonnées si nécessaire
}

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { sessionClaims } = await auth()
  
  // Vérifier si l'utilisateur a déjà terminé l'onboarding
  const publicMetadata = sessionClaims?.publicMetadata as PublicMetadata | undefined
  if (publicMetadata?.onboardingComplete === true) {
    redirect('/dashboard') // Rediriger vers le tableau de bord
  }

  return <>{children}</>
}