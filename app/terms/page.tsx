import type { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Smart Vision Gulf (svGulf) Muscat, Oman',
  description: 'Terms and Conditions for purchasing certified business laptops at Smart Vision Gulf. Compliant with Oman Consumer Protection Law (Royal Decree 66/2014). Read our 6-month shop warranty, 7-day replacement, and COD inspection terms.',
  alternates: {
    canonical: 'https://svgulf.com/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | Smart Vision Gulf (svGulf)',
    description: 'Transparent sales, 6-month warranty, 7-day replacement, and Oman Consumer Protection compliance for laptops in Muscat.',
    url: 'https://svgulf.com/terms',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
