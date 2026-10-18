import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Laptop Buying Guides & Tech Journal Muscat | Smart Vision Gulf (svGulf)',
  description: 'Expert buying guides, thermal benchmarks, and refurbished business laptop insights in Muscat, Oman. Dell Latitude, HP EliteBook, and ThinkPad recommendations.',
  keywords: [
    'laptop buying guide muscat',
    'dell latitude vs hp elitebook oman',
    'used laptop guide muscat',
    'business laptops oman',
    'battery health laptop check muscat',
    'smart vision gulf blog'
  ],
  alternates: {
    canonical: 'https://svgulf.com/blog',
  },
  openGraph: {
    title: 'svGulf Tech Journal & Laptop Buying Guides | Muscat, Oman',
    description: 'Expert reviews, thermal benchmarks, and buying advice for business laptops in Oman.',
    url: 'https://svgulf.com/blog',
    siteName: 'Smart Vision Gulf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'svGulf Tech Journal Muscat',
      },
    ],
    locale: 'en_OM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'svGulf Tech Journal & Laptop Guides Muscat',
    description: 'Expert reviews and buying advice for business laptops in Muscat, Oman.',
    images: ['/og-image.jpg'],
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Smart Vision Gulf Tech Journal',
  description: 'Hardware guides and corporate laptop comparisons in Muscat, Oman.',
  url: 'https://svgulf.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Smart Vision Gulf',
    logo: {
      '@type': 'ImageObject',
      url: 'https://svgulf.com/logo.jpeg',
    },
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogClient />
    </>
  );
}
