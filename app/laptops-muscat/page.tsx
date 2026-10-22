import { Metadata } from 'next';
import MuscatLandingClient from './MuscatLandingClient';

export const metadata: Metadata = {
  title: 'Certified Used & Refurbished Laptops in Muscat, Oman | Smart Vision Gulf',
  description: 'Looking for Grade A++ enterprise Dell, HP & Lenovo laptops in Muscat? Enjoy 6-month shop warranty, inspect-before-pay COD, and free same-day delivery across Muscat. Visit our Ghala Heights showroom or order on WhatsApp.',
  keywords: [
    'laptops muscat',
    'used laptops muscat',
    'refurbished laptops muscat oman',
    'dell latitude muscat',
    'hp elitebook muscat',
    'لابتوبات مسقط',
    'لابتوبات مستعملة مسقط',
    'لابتوبات ديل مجددة عمان',
    'لابتوبات غلا هايتس مسقط',
  ],
  alternates: {
    canonical: 'https://svgulf.com/laptops-muscat',
  },
  openGraph: {
    title: 'Certified Laptops in Muscat | Free Same-Day Delivery & 6-Mo Warranty',
    description: 'Enterprise Grade A++ laptops in Muscat with 90-point inspection and cash on delivery. Visit Shop 10 Ghala Heights or order in 30 seconds.',
    url: 'https://svgulf.com/laptops-muscat',
    images: ['/og-image.jpg'],
  },
};

export default function LaptopsMuscatPage() {
  return <MuscatLandingClient />;
}
