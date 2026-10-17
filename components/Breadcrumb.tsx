'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export interface BreadcrumbItem {
  label: string;
  labelAr?: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const homeLabel = isAr ? 'الرئيسية' : 'Home';
  const allItems = [{ label: homeLabel, labelAr: homeLabel, href: '/' }, ...items];

  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: isAr && item.labelAr ? item.labelAr : item.label,
      item: item.href ? `https://svgulf.com${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const displayLabel = isAr && item.labelAr ? item.labelAr : item.label;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-slate-400 select-none">
                  {dir === 'rtl' ? (
                    <ChevronLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </span>
              )}
              {index === 0 && <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              {isLast || !item.href ? (
                <span className="font-bold text-navy select-none" aria-current="page">
                  {displayLabel}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-cyan transition-colors font-medium hover:underline"
                >
                  {displayLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
