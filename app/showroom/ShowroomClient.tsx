'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Check, 
  CheckCircle2, 
  Compass, 
  MessageCircle, 
  ShieldCheck, 
  Briefcase,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCall } from '@/lib/analytics';
import { getMuscatShowroomStatus, MuscatShowroomStatus } from '@/lib/muscatTime';
import ShowroomBookingModal from '@/components/ShowroomBookingModal';

export default function ShowroomClient() {
  const { t, lang, dir } = useLanguage();
  const [showroomStatus, setShowroomStatus] = useState<MuscatShowroomStatus | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    setShowroomStatus(getMuscatShowroomStatus());
    const interval = setInterval(() => {
      setShowroomStatus(getMuscatShowroomStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <Breadcrumb
          items={[
            {
              label: 'Muscat Showroom',
              labelAr: 'معرض مسقط',
              href: '/showroom',
            },
          ]}
        />

        {/* Hero Banner for Showroom */}
        <div className="relative rounded-3xl bg-gradient-to-r from-navy-deep via-navy to-navy-dark text-white p-8 sm:p-14 overflow-hidden mb-12 border border-white/10 shadow-lg">
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,138,216,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan/20 border border-cyan/40 text-cyan-light text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-cyan" />
                <span>{t.showroomBadge}</span>
              </span>

              {/* Real-Time Live Status Pill */}
              {showroomStatus && (
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border ${
                  showroomStatus.isOpen 
                    ? 'bg-lime/20 border-lime/40 text-lime' 
                    : 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${showroomStatus.isOpen ? 'bg-lime animate-pulse' : 'bg-amber-400'}`} />
                  <span>{lang === 'ar' ? showroomStatus.statusTextAr : showroomStatus.statusTextEn}</span>
                  <span className="opacity-80">· {lang === 'ar' ? showroomStatus.subTextAr : showroomStatus.subTextEn}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              {t.showroomPageTitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {t.showroomPageSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-extrabold text-sm shadow-glow-orange transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حجز موعد معاينة VIP مجاني (24 ساعة)' : 'Book VIP 24-Hr Inspection Hold'}</span>
              </button>

              <a
                href="https://maps.google.com/?q=Smart+Vision+Gulf+Ghala+Heights+Muscat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4 text-cyan" />
                <span>{t.btnGoogleMaps}</span>
              </a>

              <a
                href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20am%20coming%20to%20visit%20your%20Ghala%20Heights%20store"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('showroom_hero_cta')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.btnWhatsAppLocation}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Showroom Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Store Location & Timings Card (Col 6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-ink-border p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-navy">
                {t.showroomHeading}
              </h2>
              {showroomStatus && (
                <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                  showroomStatus.isOpen 
                    ? 'bg-lime-light border-lime/30 text-lime-dark' 
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}>
                  {lang === 'ar' ? showroomStatus.statusTextAr : showroomStatus.statusTextEn}
                </span>
              )}
            </div>

            <div className="space-y-4 text-sm text-ink">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-bold text-base mb-1">
                    {t.showroomAddressTitle}
                  </strong>
                  <p className="text-ink-muted leading-relaxed">{t.showroomAddress}</p>
                  <p className="text-xs text-cyan font-semibold mt-1">{t.showroomDirections}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-bold text-base mb-1">
                    {t.showroomHoursTitle}
                  </strong>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs font-mono font-medium">
                    <p className="text-navy">{t.showroomHoursWeek}</p>
                    <p className="text-lime-dark font-bold">{t.showroomHoursFri}</p>
                  </div>
                  {showroomStatus && (
                    <div className="mt-2 text-xs text-ink-faint">
                      {lang === 'ar' ? 'توقيت مسقط الحالي: ' : 'Current Muscat Time: '}
                      <span className="font-mono font-bold text-navy">{showroomStatus.currentMuscatTime}</span>
                      <span className="mx-1.5">·</span>
                      <span>{lang === 'ar' ? showroomStatus.subTextAr : showroomStatus.subTextEn}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-bold text-base mb-1">
                    {t.showroomPhoneTitle}
                  </strong>
                  <p className="text-ink-muted font-mono">{t.showroomPhone}</p>
                  <p className="text-xs text-ink-faint">
                    {lang === 'ar' ? 'متاح للاتصال المباشر والمحادثة عبر واتساب' : 'Available for direct phone calls and WhatsApp support'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حجز جهاز للمعاينة' : 'Reserve Laptop for Test'}</span>
              </button>

              <a
                href="tel:+96894009501"
                onClick={() => trackPhoneCall('showroom_call_button')}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-ink-border bg-slate-50 hover:bg-slate-100 text-navy text-xs font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan" />
                <span>{lang === 'ar' ? 'اتصال هاتفي' : 'Call Direct'}</span>
              </a>
            </div>
          </div>

          {/* Showroom Perks & Guarantees (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-ink-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-lime-light text-lime flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-navy mb-2">
                {t.showroomWalkInTitle}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                {t.showroomWalkInDesc}
              </p>

              <div className="space-y-2.5 text-xs font-semibold text-ink">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-lime" />
                  <span>{lang === 'ar' ? 'تشغيل الجهاز واختباره بالكامل تحت إشرافك' : 'Power on and full performance stress test on the bench'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-lime" />
                  <span>{lang === 'ar' ? 'فحص نسبة صحة البطارية مباشرة في إعدادات البيوس' : 'Live battery health % verification directly in BIOS'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-lime" />
                  <span>{lang === 'ar' ? 'فحص جميع منافذ USB و Type-C وكاميرا الويب والشاحن الأصلي' : 'Test all USB/Thunderbolt ports, webcam, screen angles, and genuine charger'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-lime" />
                  <span>{lang === 'ar' ? 'ترقية الرام والهارديسك فوراً أمامك خلال دقائق' : 'Instant RAM & SSD upgrade installation on the spot'}</span>
                </div>
              </div>
            </div>

            {/* B2B & Corporate Bulk Supply Card */}
            <div className="bg-navy-deep text-white rounded-3xl border border-cyan/30 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-6 h-6 text-orange" />
                <h3 className="text-xl font-black text-white">
                  {t.showroomB2bTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {t.showroomB2bDesc}
              </p>
              <a
                href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20have%20a%20B2B%20Corporate%20Inquiry%20for%20laptops"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('showroom_b2b_cta')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange hover:bg-orange-hover text-white font-extrabold text-xs shadow-glow-orange transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ar' ? 'طلب عرض أسعار للشركات عبر واتساب' : 'Request Corporate Quote via WhatsApp'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Showroom Booking Modal */}
      <ShowroomBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
