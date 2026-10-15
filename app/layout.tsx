import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloater from '@/components/WhatsAppFloater';

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

export const metadata: Metadata = {
  title: 'Smart Vision Gulf (svGulf) | Certified Business Laptops & IT Solutions Muscat, Oman',
  description: 'Shop tested Grade A++ business laptops (Dell Latitude, HP EliteBook, Lenovo ThinkPad, Apple MacBook) in Muscat, Oman. Disclosed battery health, same-day delivery, Cash on Delivery (COD) Oman-wide, and 6-month warranty. Showroom in Ghala Heights.',
  keywords: [
    'laptops muscat',
    'used laptops oman',
    'dell latitude muscat',
    'hp elitebook oman',
    'macbook price oman',
    'laptop shop ghala heights',
    'cash on delivery laptops oman',
    'smart vision gulf',
    'svgulf'
  ],
  authors: [{ name: 'Smart Vision Gulf' }],
  metadataBase: new URL('https://svgulf.com'),
  openGraph: {
    title: 'Smart Vision Gulf | Genuine Business Laptops in Muscat, Oman',
    description: 'Certified Grade A++ business laptops with 6-month shop warranty & 7-day replacement. Shop No. 10, Ghala Heights, Muscat.',
    url: 'https://svgulf.com',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Smart Vision Gulf Logo',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  "@id": "https://svgulf.com/#store",
  "name": "Smart Vision Gulf",
  "alternateName": "svGulf",
  "url": "https://svgulf.com/",
  "logo": "https://svgulf.com/logo.jpeg",
  "image": "https://svgulf.com/logo.jpeg",
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
};

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
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <WhatsAppFloater />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
