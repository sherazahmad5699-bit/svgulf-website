import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Smart Vision Gulf (svGulf) | Ghala Heights Muscat Laptop Store',
  description: 'Get in touch with Smart Vision Gulf in Muscat, Oman. Call +968 94009501 or visit Shop 10, Ghala Heights, Wilayat Bausher. Fast WhatsApp responses, directions, and B2B quotation requests.',
  alternates: {
    canonical: 'https://svgulf.com/contact',
  },
  openGraph: {
    title: 'Contact Smart Vision Gulf (svGulf) | Muscat, Oman',
    description: 'Call +968 94009501 or visit our showroom in Ghala Heights, Muscat. Open Saturday to Thursday 9am-10pm, Friday 4:30pm-10pm.',
    url: 'https://svgulf.com/contact',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Vision Gulf Contact Muscat',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Smart Vision Gulf | Muscat, Oman',
    description: 'Shop 10, Ghala Heights, Muscat. Phone & WhatsApp: +968 94009501.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
