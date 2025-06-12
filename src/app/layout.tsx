// Fichier : app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
// 1. Importez le composant DatadogRumInitializer
import DatadogRumInitializer from '@/components/DatadogRumInitializer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          // 2. Correction ici : utilisez .className au lieu de .variable
          // pour appliquer les classes CSS générées par Next.js Font.
          className={`${geistSans.className} ${geistMono.className} antialiased`}
        >
          {/* 3. Placez le composant DatadogRumInitializer ici, à l'intérieur du <body> */}
          <DatadogRumInitializer />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
