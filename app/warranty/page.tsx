import type { Metadata } from 'next';
import WarrantyClient from './WarrantyClient';

export const metadata: Metadata = {
  title: '6-Month Shop Warranty & 90-Point Inspection | Smart Vision Gulf Muscat',
  description: 'Learn about Smart Vision Gulf 6-month comprehensive shop warranty, 7-day instant replacement guarantee, and 90-point diagnostic inspection checklist for business laptops in Muscat, Oman.',
  alternates: {
    canonical: 'https://svgulf.com/warranty',
  },
  openGraph: {
    title: '6-Month Shop Warranty & Standards | Smart Vision Gulf',
    description: 'Hardware protection, 7-day exchange, and 90-point OEM diagnostics on all business laptops in Muscat, Oman.',
    url: 'https://svgulf.com/warranty',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Vision Gulf Warranty Standards Muscat',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '6-Month Warranty & Quality Standards | Smart Vision Gulf',
    description: '6-Month warranty and 90-point inspection protocol for laptops in Muscat.',
    images: ['/og-image.jpg'],
  },
};

export default function WarrantyPage() {
  return <WarrantyClient />;
}
