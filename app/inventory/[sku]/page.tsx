import React from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/serverStore';
import ProductDetailClient from './ProductDetailClient';

export const dynamicParams = true;

interface PageProps {
  params: {
    sku: string;
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    sku: product.sku,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const products = await getProducts();
  const product = products.find((p) => p.sku === params.sku);
  if (!product) {
    return {
      title: 'Model Not Found | Smart Vision Gulf',
      description: 'The requested laptop hardware model could not be found.',
    };
  }

  const canonicalUrl = `https://svgulf.com/inventory/${product.sku}`;

  return {
    title: `${product.name} (${product.condition}) | Smart Vision Gulf Muscat`,
    description: `Buy ${product.name} in Muscat, Oman. ${product.cpu}, ${product.ram}, ${product.ssd}. 6-month shop warranty, ${product.batteryHealth}. Price: ${product.priceFormatted}. Same-day delivery & COD.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Smart Vision Gulf`,
      description: `Certified ${product.condition} laptop in Muscat. ${product.priceFormatted} (5% Oman VAT Included). WhatsApp order available.`,
      url: canonicalUrl,
      siteName: 'Smart Vision Gulf',
      images: [
        {
          url: product.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${product.name} - Smart Vision Gulf`,
        },
      ],
      locale: 'en_OM',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | svGulf Muscat`,
      description: `Grade A++ ${product.brandLabel} laptop in Muscat. 6-Month shop warranty.`,
      images: [product.image || '/og-image.jpg'],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const products = await getProducts();
  const product = products.find((p) => p.sku === params.sku);

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        sku: product.sku,
        description: product.description,
        image: `https://svgulf.com${product.image || '/og-image.jpg'}`,
        brand: {
          '@type': 'Brand',
          name: product.brandLabel,
        },
        offers: {
          '@type': 'Offer',
          price: product.priceNumeric.toFixed(3),
          priceCurrency: 'OMR',
          itemCondition:
            product.condition === 'Brand New'
              ? 'https://schema.org/NewCondition'
              : 'https://schema.org/RefurbishedCondition',
          availability:
            product.inStock !== false
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'ElectronicsStore',
            name: 'Smart Vision Gulf',
            telephone: '+96894009501',
          },
          priceValidUntil: '2026-12-31',
        },
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailClient initialProduct={product} sku={params.sku} />
    </>
  );
}
