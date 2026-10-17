'use client';

import React from 'react';
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
  Briefcase 
} from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCall } from '@/lib/analytics';

export default function ShowroomClient() {
  const { t, lang, dir } = useLanguage();

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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan/20 border border-cyan/40 text-cyan-light text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4 text-cyan" />
              <span>{t.showroomBadge}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              {t.showroomPageTitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {t.showroomPageSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://maps.google.com/?q=Smart+Vision+Gulf+Ghala+Heights+Muscat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-extrabold text-sm shadow-glow-orange transition-all transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
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
            <h2 className="text-2xl font-black text-navy">
              {t.showroomHeading}
            </h2>

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
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-bold text-base mb-1">
                    {t.showroomPhoneTitle}
                  </strong>
                  <div className="flex flex-wrap items-center gap-3 font-mono font-bold text-navy" dir="ltr">
                    <a
                      href="tel:+96894009501"
                      onClick={() => trackPhoneCall('showroom_card')}
                      className="hover:text-cyan transition-colors"
                    >
                      +968 9400 9501
                    </a>
                    <span>/</span>
                    <a
                      href="tel:+96896009404"
                      onClick={() => trackPhoneCall('showroom_card')}
                      className="hover:text-cyan transition-colors"
                    >
                      +968 9600 9404
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking Badge */}
            <div className="p-4 rounded-2xl bg-cyan-light text-cyan-hover text-xs font-bold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan shrink-0" />
              <span>
                {lang === 'ar' 
                  ? 'مواقف سيارات واسعة ومجانية متاحة مباشرة أمام واجهة المعرض.' 
                  : 'Free and spacious customer parking available directly in front of the showroom.'}
              </span>
            </div>
          </div>

          {/* Inspection Guarantee Card (Col 6) */}
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
    </div>
  );
}
