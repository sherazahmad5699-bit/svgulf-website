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

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ComputerStore',
  '@id': 'https://svgulf.com/laptops-muscat#store',
  name: 'Smart Vision Gulf - Muscat Laptop Store',
  alternateName: ['svGulf Muscat', 'شركة الرؤية الذكية للخليج مسقط'],
  url: 'https://svgulf.com/laptops-muscat',
  logo: 'https://svgulf.com/logo.jpeg',
  image: 'https://svgulf.com/og-image.jpg',
  telephone: '+96894009501',
  priceRange: 'OMR 75.000 - OMR 899.000',
  currenciesAccepted: 'OMR',
  paymentAccepted: 'Cash, Cash on Delivery, POS Card Terminal, Bank Muscat Mobile Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 10, Ghala Heights',
    addressLocality: 'Muscat',
    addressRegion: 'Wilayat Bausher',
    addressCountry: 'OM',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.5715,
    longitude: 58.3842,
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Muscat Governorate' },
    { '@type': 'City', name: 'Ghala' },
    { '@type': 'City', name: 'Bausher' },
    { '@type': 'City', name: 'Al Khuwair' },
    { '@type': 'City', name: 'Seeb' },
    { '@type': 'City', name: 'Al Mouj' },
    { '@type': 'City', name: 'Qurum' },
    { '@type': 'City', name: 'Mawaleh' },
  ],
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

export default function LaptopsMuscatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <MuscatLandingClient />
    </>
  );
}
