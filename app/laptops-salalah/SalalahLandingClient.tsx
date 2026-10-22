'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useSiteData } from '@/components/SiteDataContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  MapPin, 
  Truck, 
  ShieldCheck, 
  PackageCheck, 
  GraduationCap, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function SalalahLandingClient() {
  const { lang, dir } = useLanguage();
  const { products, theme } = useSiteData();

  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

  const salalahPillars = [
    {
      icon: Truck,
      titleEn: '24-48h Express Dhofar Courier',
      titleAr: 'شحن سريع لمحافظة ظفار (24-48 ساعة)',
      descEn: 'Reliable express courier directly to your doorstep in Salalah, Taqah, Mirbat and surrounding wilayats.',
      descAr: 'شحن سريع ومضمون إلى باب منزلك أو مقر عملك في صلالة وطاقة ومرباط وكافة ولايات ظفار.',
    },
    {
      icon: PackageCheck,
      titleEn: 'Inspect Before You Pay (Strict COD)',
      titleAr: 'افحص وعاين جهازك قبل الدفع للمندوب',
      descEn: 'Zero risk: Open the delivery box, power on the laptop, check the charger, and only pay after full approval.',
      descAr: 'بدون أي مخاطرة: افتح الطرد، وشغل اللابتوب، وتأكد من جودته والشاحن الأصلي، ثم ادفع للمندوب.',
    },
    {
      icon: GraduationCap,
      titleEn: 'Dhofar University Student Discount',
      titleAr: 'خصم خاص لطلبة جامعة ظفار وكلياتها',
      descEn: 'Present your student card on WhatsApp for an extra OMR 5 discount or free wireless mouse and bag.',
      descAr: 'أبرز بطاقتك الجامعية عبر واتساب للحصول على حقيبة وماوس لاسلكي مجاناً أو خصم إضافي.',
    },
    {
      icon: ShieldCheck,
      titleEn: '6 Months Comprehensive Warranty',
      titleAr: 'ضمان شامل لمدة 6 أشهر معتمد',
      descEn: 'Full hardware coverage on motherboard, display, and battery with round-trip pickup warranty support.',
      descAr: 'تغطية كاملة للمكونات الرئيسية والبطارية والشاشة مع خدمة استلام واستبدال سريعة عند اللزوم.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8" dir={dir}>
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Salalah & Dhofar Delivery', labelAr: 'توصيل صلالة وظفار', href: '/laptops-salalah' },
          ]}
        />

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-navy-deep via-navy to-navy-dark text-white p-8 sm:p-14 overflow-hidden mb-12 border border-white/10 shadow-xl">
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,138,216,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange text-white text-xs font-black uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'صلالة ومحافظة ظفار' : 'Salalah & Dhofar Governorate'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-lime/20 text-lime border border-lime/40 text-xs font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'شحن إكسبريس مع الدفع عند الاستلام' : 'Express Courier COD'}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
              {lang === 'ar' 
                ? 'لابتوبات أعمال ممتازة مع التوصيل لصلالة وظفار' 
                : 'Enterprise Certified Laptops Delivered to Salalah'}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {lang === 'ar'
                ? 'احصل على أرقى أجهزة ديل وإتش بي ولينوفو المجددة (درجة أولى A++) وأنت في صلالة. شحن سريع خلال 24 إلى 48 ساعة والدفع عند الاستلام بعد فحص وتشغيل الجهاز بالكامل.'
                : 'Order top-tier Grade A++ enterprise laptops in Salalah and Dhofar with 24-48h express delivery, verified 6-month shop warranty, and inspect-before-pay cash on delivery.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${primaryPhone}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'مرحباً سمارت فيجن جلف، أود طلب لابتوب مع التوصيل لصلالة (محافظة ظفار).'
                    : 'Hello Smart Vision Gulf, I would like to order a laptop with delivery to Salalah.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('salalah_landing_hero')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ar' ? 'طلب فوري لصلالة عبر واتساب' : 'WhatsApp Order Salalah'}</span>
              </a>

              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <span>{lang === 'ar' ? 'تصفح كافة الأجهزة والأسعار' : 'Browse All Models & Prices'}</span>
                <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars for Dhofar Customers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {salalahPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-light text-cyan flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-navy mb-2">
                    {lang === 'ar' ? p.titleAr : p.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {lang === 'ar' ? p.descAr : p.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Stock for Salalah Buyers */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange-light px-3.5 py-1.5 rounded-xl border border-orange/20">
                {lang === 'ar' ? 'شحن فوري اليوم' : 'Ready for Dispatch'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy mt-2">
                {lang === 'ar' ? 'أجهزة موصى بها للدراسة والأعمال في صلالة' : 'Top Enterprise Picks for Salalah Buyers'}
              </h2>
            </div>
            <Link
              href="/inventory"
              className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض الكتالوج كاملاً' : 'View Full Catalog'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
