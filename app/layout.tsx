import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { ToastProvider } from '@/components/ToastContext';
import MotionProvider from '@/components/MotionProvider';
import CookieBanner from '@/components/CookieBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloater from '@/components/WhatsAppFloater';
import { SiteDataProvider } from '@/components/SiteDataContext';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-kufi',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#001C71',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Smart Vision Gulf (svGulf) | Certified Business Laptops & IT Solutions Muscat, Oman',
  description: 'Shop tested Grade A++ business laptops (Dell Latitude, HP EliteBook, Lenovo ThinkPad, Apple MacBook) in Muscat, Oman. Disclosed battery health, same-day delivery, Cash on Delivery (COD) Oman-wide, and 6-month warranty. Showroom in Ghala Heights.',
  keywords: [
    'laptops muscat',
    'used laptops oman',
    'business laptops muscat',
    'dell latitude muscat',
    'hp elitebook oman',
    'lenovo thinkpad oman',
    'macbook price oman',
    'laptop shop ghala heights',
    'cash on delivery laptops oman',
    'smart vision gulf',
    'svgulf'
  ],
  authors: [{ name: 'Smart Vision Gulf', url: 'https://svgulf.com' }],
  creator: 'Smart Vision Gulf',
  publisher: 'Smart Vision Gulf',
  metadataBase: new URL('https://svgulf.com'),
  alternates: {
    canonical: 'https://svgulf.com',
  },
  openGraph: {
    title: 'Smart Vision Gulf (svGulf) | Certified Business Laptops in Muscat, Oman',
    description: 'Certified Grade A++ business laptops with 6-month shop warranty & 7-day replacement. Shop No. 10, Ghala Heights, Muscat.',
    url: 'https://svgulf.com',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Vision Gulf (svGulf) Muscat Oman',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Vision Gulf (svGulf) | Certified Business Laptops Muscat',
    description: 'Grade A++ Dell, HP, Lenovo & Apple laptops with 6-month shop warranty in Muscat, Oman.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ElectronicsStore",
      "@id": "https://svgulf.com/#store",
      "name": "Smart Vision Gulf",
      "alternateName": "svGulf",
      "url": "https://svgulf.com/",
      "logo": "https://svgulf.com/logo.jpeg",
      "image": "https://svgulf.com/og-image.jpg",
      "telephone": "+96894009501",
      "priceRange": "OMR 25.000 - OMR 900.000",
      "currenciesAccepted": "OMR",
      "paymentAccepted": "Cash, Cash on Delivery, Credit Card, Thawani Pay",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 10, Ghala Heights",
        "addressLocality": "Muscat",
        "addressRegion": "Wilayat Bausher",
        "addressCountry": "OM"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.5715,
        "longitude": 58.3842
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "09:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday"],
          "opens": "16:30",
          "closes": "22:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/svgulf",
        "https://wa.me/96894009501"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://svgulf.com/#website",
      "url": "https://svgulf.com/",
      "name": "Smart Vision Gulf",
      "publisher": {
        "@id": "https://svgulf.com/#store"
      },
      "inLanguage": ["en", "ar"]
    }
  ]
};

import { ComparisonProvider } from '@/components/ComparisonContext';
import ComparisonDrawer from '@/components/ComparisonDrawer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${archivo.variable} ${ibmPlexMono.variable} ${notoKufiArabic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-ink bg-slate-50">
        <LanguageProvider>
          <ToastProvider>
            <SiteDataProvider>
              <ComparisonProvider>
                <MotionProvider>
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                  <ComparisonDrawer />
                  <WhatsAppFloater />
                  <CookieBanner />
                  <Footer />
                </MotionProvider>
              </ComparisonProvider>
            </SiteDataProvider>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
