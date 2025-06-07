import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';


interface OnboardingLayoutProps {
  children: ReactNode;
}

export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const { sessionClaims } = await auth();
  
  if (sessionClaims?.metadata?.onboardingComplete === true) {
    redirect('/');

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  if ((await auth()).sessionClaims?.metadata?.onboardingComplete === true) {
    redirect('/')
 main
  }

  return <>{children}</>;
}