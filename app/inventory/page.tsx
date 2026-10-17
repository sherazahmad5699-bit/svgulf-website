import type { Metadata } from 'next';
import InventoryClient from './InventoryClient';

export const metadata: Metadata = {
  title: 'Business Laptops Inventory Muscat | Dell, HP, Lenovo, Apple | Smart Vision Gulf',
  description: 'Explore certified Grade A++ business laptops available in Muscat, Oman. Dell Latitude, HP EliteBook, Lenovo ThinkPad, Apple MacBook. Real-time CPU, RAM, and price filters with 6-month shop warranty & Cash on Delivery.',
  alternates: {
    canonical: 'https://svgulf.com/inventory',
  },
  openGraph: {
    title: 'Business Laptops Inventory Muscat | Smart Vision Gulf',
    description: 'Certified Grade A++ business laptops in Muscat, Oman with 6-month shop warranty. Same-day delivery & COD Oman-wide.',
    url: 'https://svgulf.com/inventory',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Vision Gulf Inventory Muscat',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Laptops Inventory Muscat | Smart Vision Gulf',
    description: '15+ certified business laptops in Muscat, Oman. Dell, HP, Lenovo & Apple with 6-month shop warranty.',
    images: ['/og-image.jpg'],
  },
};

export default function InventoryPage() {
  return <InventoryClient />;
}
