import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: {
    sku: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    sku: product.sku,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = PRODUCTS.find((p) => p.sku === params.sku);
  if (!product) {
    return {
      title: 'Model Not Found | Smart Vision Gulf',
    };
  }

  return {
    title: `${product.name} (${product.condition}) | Smart Vision Gulf Muscat`,
    description: `Buy ${product.name} in Muscat, Oman. ${product.cpu}, ${product.ram}, ${product.ssd}. 6-month shop warranty, ${product.batteryHealth}. Price: ${product.priceFormatted}. Same-day delivery & COD.`,
    openGraph: {
      title: `${product.name} | Smart Vision Gulf`,
      description: `Certified ${product.condition} laptop in Muscat. ${product.priceFormatted} (VAT Included). WhatsApp order available.`,
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.sku === params.sku);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
