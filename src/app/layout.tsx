import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from 'next/script';
import "./globals.css";

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
}>)
{  
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/146340379.js" />
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HFCV4YMZ3D"></Script>
          <Script>
            window.dataLayer = window.dataLayer || [];

            function gtag(){  
              dataLayer.push(arguments);
            }
            
            gtag('js', new Date());

            gtag('config', 'G-HFCV4YMZ3D');
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
