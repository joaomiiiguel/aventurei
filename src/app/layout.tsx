import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/Providers/ToastProvider";
import Script from "next/script";
import StoreProvider from "@/providers/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aventurei - Descubre tu próxima aventura",
    template: "%s | Aventurei"
  },
  description: "Descubre aventuras únicas en España con guías locales expertos. Senderismo, rápel, rafting, escalada y más. Reserva tu próxima experiencia en la naturaleza con seguridad.",
  metadataBase: new URL('https://aventurei.es'),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-id",
  },
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'pt-br': '/pt-br',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://aventurei.es',
    siteName: 'Aventurei',
    title: 'Aventurei - Descubre tu próxima aventura',
    description: 'Descubre aventuras únicas en España con guías locales expertos. Senderismo, rápel, rafting, escalada y más. Reserva tu próxima experiencia en la naturaleza con seguridad.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aventurei - Turismo de Aventura en España',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aventurei - Descubre tu próxima aventura',
    description: 'Descubre aventuras únicas en España con guías locales expertos. Senderismo, rápel, rafting, escalada y más. Reserva tu próxima experiencia en la naturaleza con seguridad.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['turismo activo', 'aventura españa', 'guías locales', 'senderismo', 'escalada', 'ecoturismo'],
};

import GoogleConsent from "@/components/Analytics/GoogleConsent";
import CookieBanner from "@/components/Analytics/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <GoogleConsent />
        <StoreProvider>
          {children}
          <ToastProvider />
        </StoreProvider>
        
        {/* Mocking Chat Script (Tawk.to / Crisp) loaded lazily */}
        <Script id="chat-widget" strategy="lazyOnload">
          {`
            // Em breve: Inserir ID real do Tawk.to ou Crisp aqui 
            console.log('Chat plugin load initialized by lazyOnload');
          `}
        </Script>
      </body>
    </html>
  );
}
