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
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  Building2, 
  Compass, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function MuscatLandingClient() {
  const { lang, dir } = useLanguage();
  const { products, theme } = useSiteData();

  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

  const muscatAreas = [
    { en: 'Ghala & Ghala Heights', ar: 'غلا وغلا هايتس (موقع المعرض)' },
    { en: 'Al Khuwair & Ministries Area', ar: 'الخوير وحي الوزارات' },
    { en: 'Wilayat Bausher & Al Ansab', ar: 'ولاية بوشر والأنصب' },
    { en: 'Seeb, Al Mouj & Mawaleh', ar: 'السيب والموج والموالح' },
    { en: 'Ruwi, CBD & Muttrah', ar: 'روي ومطرح والحي التجاري' },
    { en: 'Qurum & Madinat Al Sultan Qaboos', ar: 'القرم ومدينة السلطان قابوس' },
  ];

  const muscatFaqs = [
    {
      qEn: 'Do you offer Cash on Delivery (COD) across Muscat?',
      qAr: 'هل يتوفر الدفع عند الاستلام كاش في مسقط؟',
      aEn: 'Yes! We deliver across all Muscat wilayats with our strict "Inspect Before You Pay" guarantee. The driver will hand you the laptop, you power it on, check the pristine condition and charger, and only then pay cash or card.',
      aAr: 'نعم بالتأكيد! نوفر التوصيل لكافة ولايات مسقط مع ضمان "افحص وعاين قبل الدفع". المندوب يسلمك الجهاز لتشغيله وفحصه بالكامل والتأكد من حالته والشاحن ثم تدفع نقداً أو بالبطاقة.',
    },
    {
      qEn: 'How fast is laptop delivery in Muscat?',
      qAr: 'ما هي مدة التوصيل داخل مسقط؟',
      aEn: 'Orders confirmed before 5:00 PM are delivered same-day directly to your office or home in Muscat within 2 to 4 hours.',
      aAr: 'الطلبات المؤكدة قبل الساعة 5:00 مساءً يتم توصيلها في نفس اليوم خلال 2 إلى 4 ساعات إلى باب منزلك أو مكتبك.',
    },
    {
      qEn: 'Can I visit the Muscat showroom to test before buying?',
      qAr: 'هل يمكنني زيارة المعرض في مسقط لتجربة اللابتوب؟',
      aEn: 'Yes, our main Muscat showroom is located at Shop No. 10, Ghala Heights. We have a dedicated testing lab where you can try any laptop, test keyboard, battery, and screen before purchase.',
      aAr: 'نعم نرحب بزيارتكم في معرضنا بمحل رقم 10 في غلا هايتس بمسقط، حيث تتوفر منضدة فحص وتجربة لكافة الأجهزة قبل الشراء.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8" dir={dir}>
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Muscat Laptops', labelAr: 'لابتوبات مسقط', href: '/laptops-muscat' },
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
                <span>{lang === 'ar' ? 'سلطنة عُمان · مسقط' : 'Muscat, Sultanate of Oman'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-lime/20 text-lime border border-lime/40 text-xs font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'توصيل في نفس اليوم' : 'Same-Day Free Delivery'}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
              {lang === 'ar' 
                ? 'لابتوبات أعمال مفحوصة ومضمونة في مسقط' 
                : 'Certified Business & Student Laptops in Muscat'}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {lang === 'ar'
                ? 'وجهتك الأولى في مسقط لشراء أجهزة ديل وإتش بي ولينوفو مجددة درجة أولى (Grade A++) مع ضمان محل 6 أشهر معتمد والدفع عند الاستلام بعد المعاينة.'
                : 'Muscat’s #1 destination for Grade A++ enterprise Dell, HP & Lenovo laptops with verified 90-point inspection, 6-month shop warranty, and inspect-before-pay COD.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${primaryPhone}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'مرحباً سمارت فيجن جلف، أبحث عن لابتوب مع التوصيل داخل مسقط.'
                    : 'Hello Smart Vision Gulf, I am looking for a certified laptop in Muscat.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('muscat_landing_hero')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{lang === 'ar' ? 'طلب فوري في مسقط عبر واتساب' : 'WhatsApp Order Muscat'}</span>
              </a>

              <Link
                href="/showroom"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <Building2 className="w-4 h-4 text-cyan" />
                <span>{lang === 'ar' ? 'زيارة معرض غلا هايتس' : 'Visit Ghala Heights Store'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Muscat Service Coverage Bar */}
        <div className="bg-white rounded-3xl border border-ink-border p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-navy">
                {lang === 'ar' ? 'مناطق التوصيل السريع اليومي داخل مسقط' : 'Same-Day Express Delivery Across Muscat'}
              </h2>
              <p className="text-xs text-ink-muted mt-0.5">
                {lang === 'ar' ? 'توصيل مباشر مع معاينة وفحص الجهاز قبل دفع أي مبالغ' : 'Direct courier dispatch with full inspect-before-pay verification.'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-lime-dark bg-lime-light px-3 py-1 rounded-lg self-start sm:self-auto">
              {lang === 'ar' ? 'رسوم التوصيل: مجاني للابتوبات' : 'Delivery: Free for Laptops'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {muscatAreas.map((area, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime shrink-0" />
                <span className="line-clamp-2">{lang === 'ar' ? area.ar : area.en}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Catalog for Muscat */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange-light px-3.5 py-1.5 rounded-xl border border-orange/20">
                {lang === 'ar' ? 'متوفر حالياً للتسليم الفوري' : 'Ready for Immediate Dispatch'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy mt-2">
                {lang === 'ar' ? 'أجهزة معتمدة متوفرة بمخزن مسقط' : 'In-Stock Laptops in Muscat'}
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

        {/* Local FAQs for Muscat */}
        <div className="bg-white rounded-3xl border border-ink-border p-6 sm:p-10 mb-14 shadow-sm">
          <h3 className="text-2xl font-black text-navy mb-6">
            {lang === 'ar' ? 'الأسئلة الشائعة لزبائن مسقط' : 'Frequently Asked Questions (Muscat Buyers)'}
          </h3>
          <div className="space-y-4">
            {muscatFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-extrabold text-navy text-sm sm:text-base mb-2">
                  {lang === 'ar' ? faq.qAr : faq.qEn}
                </h4>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {lang === 'ar' ? faq.aAr : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
