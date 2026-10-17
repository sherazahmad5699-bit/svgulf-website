import type { Metadata } from 'next';
import ShowroomClient from './ShowroomClient';

export const metadata: Metadata = {
  title: 'Muscat Laptop Showroom Ghala Heights | Smart Vision Gulf (svGulf)',
  description: 'Visit the Smart Vision Gulf physical laptop showroom in Shop 10, Ghala Heights, Wilayat Bausher, Muscat, Oman. Inspect Grade A++ Dell, HP, Lenovo & Apple laptops with in-person BIOS battery testing.',
  alternates: {
    canonical: 'https://svgulf.com/showroom',
  },
  openGraph: {
    title: 'Muscat Laptop Showroom Ghala Heights | Smart Vision Gulf',
    description: 'Visit Shop 10, Ghala Heights, Muscat. Walk-in laptop inspections, live BIOS battery health tests & instant RAM/SSD upgrades.',
    url: 'https://svgulf.com/showroom',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Vision Gulf Showroom Muscat Oman',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muscat Showroom | Smart Vision Gulf (svGulf)',
    description: 'Physical laptop store in Ghala Heights, Muscat, Oman. 6-Month warranty.',
    images: ['/og-image.jpg'],
  },
};

export default function ShowroomPage() {
  return <ShowroomClient />;
}
