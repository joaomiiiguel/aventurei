import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/Providers/ToastProvider";

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
  description: "Conéctate con los mejores guías locales y explora destinos increíbles en España con seguridad y exclusividad.",
  metadataBase: new URL('https://aventurei.es'),
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
    description: 'Conéctate con los mejores guías locales y explora destinos increíbles en España con seguridad y exclusividad.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aventurei - Turismo de Aventura en España',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aventurei - Descubre tu próxima aventura',
    description: 'Conéctate con los mejores guías locales y explora destinos increíbles en España con seguridad y exclusividad.',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
