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

const ghalaBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ComputerStore',
  '@id': 'https://svgulf.com/laptops-ghala-heights#store',
  name: 'Smart Vision Gulf - Ghala Heights Laptop Showroom',
  alternateName: ['svGulf Ghala Heights', 'معرض سمارت فيجن جلف غلا هايتس'],
  url: 'https://svgulf.com/laptops-ghala-heights',
  logo: 'https://svgulf.com/logo.jpeg',
  image: 'https://svgulf.com/og-image.jpg',
  telephone: '+96894009501',
  priceRange: 'OMR 75.000 - OMR 899.000',
  currenciesAccepted: 'OMR',
  paymentAccepted: 'Cash, POS Card Terminal, Bank Muscat Mobile Transfer, Cash on Delivery',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 10, Ground Floor, Ghala Heights',
    addressLocality: 'Ghala Heights',
    addressRegion: 'Wilayat Bausher, Muscat',
    addressCountry: 'OM',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.5715,
    longitude: 58.3842,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Ghala Heights, Wilayat Bausher, Muscat',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '16:30',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '16:30',
      closes: '22:00',
    },
  ],
};

export default function LaptopsGhalaHeightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ghalaBusinessSchema) }}
      />
      <GhalaLandingClient />
    </>
  );
}
