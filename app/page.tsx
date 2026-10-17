import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Smart Vision Gulf (svGulf) | Certified Business Laptops & IT Solutions Muscat, Oman',
  description: 'Shop tested Grade A++ business laptops (Dell Latitude, HP EliteBook, Lenovo ThinkPad, Apple MacBook) in Muscat, Oman. Disclosed battery health, same-day delivery, Cash on Delivery (COD) Oman-wide, and 6-month warranty. Showroom in Ghala Heights.',
  alternates: {
    canonical: 'https://svgulf.com',
  },
  openGraph: {
    title: 'Smart Vision Gulf (svGulf) | Genuine Business Laptops in Muscat, Oman',
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
};

export default function HomePage() {
  return <HomeClient />;
}
