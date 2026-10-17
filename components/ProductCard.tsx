'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useLanguage } from './LanguageContext';
import { 
  BatteryCharging, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink, 
  Check, 
  Sparkles,
  Cpu,
  Layers,
  HardDrive,
  Monitor
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { lang, t, dir } = useLanguage();

  // Pre-filled WhatsApp message for 1-click ordering
  const waMessage = lang === 'ar'
    ? encodeURIComponent(
        `مرحباً سمارت فيجن جلف،\n` +
        `أود الاستفسار وحجز الجهاز التالي:\n` +
        `• الموديل: ${product.nameAr}\n` +
        `• كود الجهاز: ${product.sku}\n` +
        `• المواصفات: ${product.cpu} | ${product.ram} | ${product.ssd}\n` +
        `• الحالة: ${product.conditionAr} (صحة البطارية: ${product.batteryHealth})\n` +
        `• السعر: ${product.priceFormatted} (شامل ضريبة القيمة المضافة 5%)\n` +
        `• الاستلام: توصيل فوري في مسقط (الدفع عند الاستلام) أو استلام من المعرض\n\n` +
        `يرجى تأكيد التوفر الحالي. شكراً لكم!`
      )
    : encodeURIComponent(
        `Hello Smart Vision Gulf,\n` +
        `I would like to order / inquire about:\n` +
        `• Product: ${product.name}\n` +
        `• SKU: ${product.sku}\n` +
        `• Specs: ${product.cpu} | ${product.ram} | ${product.ssd}\n` +
        `• Condition: ${product.condition} (${product.batteryHealth})\n` +
        `• Price: ${product.priceFormatted} (5% Oman VAT Included)\n` +
        `• Fulfilment: Same-Day Delivery in Muscat (Cash on Delivery) / Showroom Pickup\n\n` +
        `Please confirm current availability. Thank you!`
      );

  const waLink = `https://wa.me/96894009501?text=${waMessage}`;

  // Condition Badge styling
  const getConditionStyle = () => {
    switch (product.condition) {
      case 'Brand New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Grade A++':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-ink-border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-cyan/50">
      
      {/* Top Banner Row */}
      <div className="p-4 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md border tracking-wider uppercase ${getConditionStyle()}`}>
            {lang === 'ar' ? product.conditionAr : product.condition}
          </span>
          {product.bestSeller && (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-light text-orange border border-orange/20">
              <Sparkles className="w-3 h-3 text-orange" />
              HOT
            </span>
          )}
        </div>

        {/* Battery Health Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-lime-light text-lime-dark text-xs font-bold font-mono">
          <BatteryCharging className="w-3.5 h-3.5 text-lime" />
          <span>{product.batteryHealth}</span>
        </div>
      </div>

      {/* Body: Title & Model */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-ink-faint font-semibold uppercase tracking-wider mb-1">
          <span className="text-cyan font-bold font-mono">{product.brandLabel}</span>
          <span>{lang === 'ar' ? product.categoryLabelAr : product.categoryLabel}</span>
        </div>

        {/* Title */}
        <Link 
          href={`/inventory/${product.sku}`}
          className="text-lg font-black text-navy group-hover:text-cyan transition-colors mb-1 line-clamp-2"
        >
          {lang === 'ar' ? product.nameAr : product.name}
        </Link>

        {/* SKU */}
        <div className="text-[11px] font-mono text-slate-400 mb-4">
          SKU: {product.sku}
        </div>

        {/* Quick Tech Specs */}
        <div className="space-y-2 mb-5 text-xs text-ink-muted">
          <div className="flex items-start gap-2">
            <Cpu className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
            <span className="font-medium line-clamp-1">{product.cpu}</span>
          </div>
          <div className="flex items-start gap-2">
            <Layers className="w-4 h-4 text-orange shrink-0 mt-0.5" />
            <span className="font-semibold text-ink">{product.ram}</span>
            <span className="text-slate-300">·</span>
            <HardDrive className="w-4 h-4 text-lime shrink-0 mt-0.5" />
            <span className="font-semibold text-ink">{product.ssd}</span>
          </div>
          <div className="flex items-start gap-2">
            <Monitor className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
            <span className="line-clamp-1">{product.display}</span>
          </div>
        </div>

        {/* Included Bundle Highlights */}
        <div className="mt-auto pt-3 border-t border-slate-100 text-[11px] text-emerald-800 bg-emerald-50/60 -mx-5 px-5 py-2 flex items-center gap-1.5 font-medium">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="line-clamp-1">{lang === 'ar' ? product.bundleAr : product.bundle}</span>
        </div>

        {/* Price Section */}
        <div className="pt-4 flex items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-bold text-ink-faint">
              {t.cardStartingFrom}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-navy font-mono tracking-tight">
                {product.priceFormatted}
              </span>
              {product.wasPriceFormatted && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {product.wasPriceFormatted}
                </span>
              )}
            </div>
            <div className="text-[10px] font-semibold text-lime-dark">
              {t.cardVatIncluded}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-orange" />
              <span>{lang === 'ar' ? 'ضمان 6 أشهر' : '6-Mo Warranty'}</span>
            </span>
          </div>
        </div>

        {/* Actions Button Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
          <Link
            href={`/inventory/${product.sku}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-ink-border bg-slate-50 hover:bg-slate-100 text-navy font-bold text-xs transition-colors"
          >
            <span>{t.viewDetails}</span>
            <ExternalLink className="w-3 h-3 text-cyan" />
          </Link>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('product_card', product.sku, product.name)}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-xs shadow-sm hover:shadow-glow-lime transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>{t.orderWhatsApp}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
