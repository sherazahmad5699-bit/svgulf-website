import type { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Smart Vision Gulf (svGulf) Muscat, Oman',
  description: 'Privacy Policy for Smart Vision Gulf (svGulf). Compliant with Oman Personal Data Protection Law (Royal Decree 6/2022). Learn how your data is handled when ordering laptops or visiting our Ghala Heights showroom.',
  alternates: {
    canonical: 'https://svgulf.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Smart Vision Gulf (svGulf)',
    description: 'Compliant with Oman Personal Data Protection Law (Royal Decree 6/2022). Transparent data practices for laptop purchases in Muscat.',
    url: 'https://svgulf.com/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
