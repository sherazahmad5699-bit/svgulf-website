import { Metadata } from 'next';
import GhalaLandingClient from './GhalaLandingClient';

export const metadata: Metadata = {
  title: 'Laptop Store in Ghala Heights, Muscat | Smart Vision Gulf (Shop 10)',
  description: 'Visit Smart Vision Gulf in Shop No. 10, Ghala Heights, Muscat. Test Grade A++ business laptops, upgrade RAM/SSD on the spot, and get 6-month shop warranty. Ample free parking and easy access from Muscat Expressway.',
  keywords: [
    'laptop shop ghala heights',
    'computer store ghala muscat',
    'laptops ghala heights',
    'محل لابتوبات غلا هايتس',
    'محلات كمبيوتر غلا مسقط',
    'شراء لابتوب غلا',
    'سمارت فيجن جلف غلا',
  ],
  alternates: {
    canonical: 'https://svgulf.com/laptops-ghala-heights',
  },
  openGraph: {
    title: 'Ghala Heights Laptop Showroom & Testing Lab | Shop 10',
    description: 'Visit Shop No. 10, Ghala Heights, Muscat. Try, test, and purchase Grade A++ Dell, HP & Lenovo laptops in person with verified diagnostics.',
    url: 'https://svgulf.com/laptops-ghala-heights',
    images: ['/og-image.jpg'],
  },
};

export default function LaptopsGhalaHeightsPage() {
  return <GhalaLandingClient />;
}
