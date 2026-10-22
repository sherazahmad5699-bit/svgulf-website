import { Metadata } from 'next';
import SalalahLandingClient from './SalalahLandingClient';

export const metadata: Metadata = {
  title: 'Certified Enterprise Laptops in Salalah & Dhofar | Smart Vision Gulf',
  description: 'Looking for verified Grade A++ laptops in Salalah & Dhofar Governorate? 24-48h express courier with Cash on Delivery (inspect before you pay) and 6-month warranty. Special discounts for Dhofar University students.',
  keywords: [
    'laptops salalah',
    'used laptops salalah',
    'refurbished laptops dhofar',
    'dell latitude salalah',
    'لابتوبات صلالة',
    'لابتوبات مستعملة صلالة',
    'شراء لابتوب صلالة ظفار',
    'لابتوبات جامعة ظفار',
  ],
  alternates: {
    canonical: 'https://svgulf.com/laptops-salalah',
  },
  openGraph: {
    title: 'Certified Laptops in Salalah | Express Delivery & 6-Mo Warranty',
    description: 'Order Grade A++ business laptops with cash on delivery across Salalah and Dhofar. Inspect before payment guaranteed.',
    url: 'https://svgulf.com/laptops-salalah',
    images: ['/og-image.jpg'],
  },
};

const salalahBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ComputerStore',
  '@id': 'https://svgulf.com/laptops-salalah#store',
  name: 'Smart Vision Gulf - Salalah & Dhofar Express Laptop Delivery',
  alternateName: ['svGulf Salalah', 'سمارت فيجن جلف صلالة'],
  url: 'https://svgulf.com/laptops-salalah',
  logo: 'https://svgulf.com/logo.jpeg',
  image: 'https://svgulf.com/og-image.jpg',
  telephone: '+96894009501',
  priceRange: 'OMR 75.000 - OMR 899.000',
  currenciesAccepted: 'OMR',
  paymentAccepted: 'Cash on Delivery, Bank Muscat Transfer',
  areaServed: [
    { '@type': 'City', name: 'Salalah' },
    { '@type': 'AdministrativeArea', name: 'Dhofar Governorate' },
    { '@type': 'CollegeOrUniversity', name: 'Dhofar University' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 10, Ghala Heights (Dispatch Center to Salalah)',
    addressLocality: 'Muscat',
    addressRegion: 'Sultanate of Oman',
    addressCountry: 'OM',
  },
};

export default function LaptopsSalalahPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salalahBusinessSchema) }}
      />
      <SalalahLandingClient />
    </>
  );
}
