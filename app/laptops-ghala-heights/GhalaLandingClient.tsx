'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useSiteData } from '@/components/SiteDataContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import ShowroomBookingModal from '@/components/ShowroomBookingModal';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Check, 
  Compass, 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Car,
  Wrench,
  Sparkles
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { getMuscatShowroomStatus } from '@/lib/muscatTime';

export default function GhalaLandingClient() {
  const { lang, dir } = useLanguage();
  const { products, theme } = useSiteData();
  const showroomStatus = getMuscatShowroomStatus();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

  const ghalaFeatures = [
    {
      icon: Car,
      titleEn: 'Ample Free Parking',
      titleAr: 'مواقف سيارات واسعة ومجانية',
      descEn: 'Spacious parking bays directly outside Shop 10 for hassle-free customer visits.',
      descAr: 'مواقف فسيحة ومجانية أمام المحل مباشرة دون أي صعوبة في صف السيارة.',
    },
    {
      icon: Compass,
      titleEn: 'Muscat Expressway Accessibility',
      titleAr: 'موقع استراتيجي قرب طريق مسقط السريع',
      descEn: 'Only 3 minutes from the Ghala/Bausher Expressway exit, convenient from all Muscat areas.',
      descAr: 'على بعد 3 دقائق فقط من مخرج طريق مسقط السريع بغلا وبوشر.',
    },
    {
      icon: Wrench,
      titleEn: 'In-Store Hardware Upgrades',
      titleAr: 'ترقية الرام والـ SSD الفورية في المحل',
      descEn: 'Our technicians upgrade and transfer data while you wait in the showroom in 15 minutes.',
      descAr: 'فنيونا يقومون بتركيب الرامات وزيادة التخزين ونقل بياناتك خلال 15 دقيقة.',
    },
    {
      icon: ShieldCheck,
      titleEn: 'Interactive Diagnostic Testing Desk',
      titleAr: 'منضدة فحص وتجربة حرة للأجهزة',
      descEn: 'Test battery runtime, display colors, audio clarity, and laser keyboard before buying.',
      descAr: 'جرب الجهاز بنفسك، وافحص الشاشة، الصوت، الكيبورد وسرعة المعالج بكل حرية.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8" dir={dir}>
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Muscat Laptops', labelAr: 'لابتوبات مسقط', href: '/laptops-muscat' },
            { label: 'Ghala Heights Showroom', labelAr: 'معرض غلا هايتس', href: '/laptops-ghala-heights' },
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
                <Building2 className="w-3.5 h-3.5" />
                <span>Shop No. 10 · Ghala Heights</span>
              </span>
              {showroomStatus && (
                <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-xl text-xs font-bold border ${
                  showroomStatus.isOpen 
                    ? 'bg-lime/20 border-lime/40 text-lime' 
                    : 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${showroomStatus.isOpen ? 'bg-lime animate-pulse' : 'bg-amber-400'}`} />
                  <span>{lang === 'ar' ? showroomStatus.statusTextAr : showroomStatus.statusTextEn}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
              {lang === 'ar' 
                ? 'معرض لابتوبات غلا هايتس - سمارت فيجن جلف' 
                : 'Ghala Heights Laptop Showroom & Testing Center'}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {lang === 'ar'
                ? 'تفضل بزيارتنا في محل رقم 10 بغلا هايتس، ولاية بوشر. عاين أفضل لابتوبات الأعمال المجددة والمفحوصة، مع فحص مجاني وترقية فورية للرام والهارديسك وضمان محل 6 أشهر.'
                : 'Visit our flagship computer showroom at Shop No. 10, Ghala Heights, Wilayat Bausher, Muscat. Try enterprise Grade A++ laptops on our dedicated test bench, with on-the-spot upgrades and verified 6-month shop warranty.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-extrabold text-sm shadow-glow-orange transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حجز موعد تجربة وفحص VIP' : 'Book 24-Hr Test Slot'}</span>
              </button>

              <a
                href="https://maps.google.com/?q=Smart+Vision+Gulf+Ghala+Heights+Muscat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <Compass className="w-4 h-4 text-cyan" />
                <span>{lang === 'ar' ? 'الموقع على خرائط جوجل' : 'Google Maps Directions'}</span>
              </a>

              <a
                href={`https://wa.me/${primaryPhone}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'مرحباً، أنا قادم لزيارة معرضكم في غلا هايتس (محل 10). يرجى تأكيد الموقع والمواعيد.'
                    : 'Hello, I am coming to visit your Ghala Heights showroom (Shop 10). Please confirm directions.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ar' ? 'تواصل مع المعرض' : 'Chat with Ghala Store'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ghala Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {ghalaFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-light text-cyan flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-navy mb-2">
                    {lang === 'ar' ? f.titleAr : f.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {lang === 'ar' ? f.descAr : f.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ready in Ghala Showroom Stock */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange-light px-3.5 py-1.5 rounded-xl border border-orange/20">
                {lang === 'ar' ? 'أجهزة معروضة على الأرفف' : 'On Showroom Shelves'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy mt-2">
                {lang === 'ar' ? 'أجهزة جاهزة للتجربة الفورية في غلا هايتس' : 'Ready for Immediate In-Store Testing'}
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

        {/* Showroom Booking Modal */}
        <ShowroomBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />

      </div>
    </div>
  );
}
