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

export default function LaptopsSalalahPage() {
  return <SalalahLandingClient />;
}
