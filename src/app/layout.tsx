// Fichier : app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from 'next/script';
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
          <Script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/146340379.js" />
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HFCV4YMZ3D"></Script>
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HFCV4YMZ3D');
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
