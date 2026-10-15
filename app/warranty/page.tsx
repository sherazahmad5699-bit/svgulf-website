'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { 
  ShieldCheck, 
  RotateCcw, 
  BatteryCharging, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  MessageCircle, 
  Laptop, 
  Cpu, 
  HardDrive, 
  Layers 
} from 'lucide-react';

export default function WarrantyPage() {
  const { t, lang, dir } = useLanguage();

  const inspectionPoints = [
    { 
      cat: 'Display & Screen', 
      catAr: 'الشاشة ولوحة العرض',
      desc: 'Zero dead pixels, no pressure marks, uniform backlight, flawless color reproduction.',
      descAr: 'خالية تماماً من النقاط المعطوبة (Dead Pixels)، بدون أي بقع ضغط، وسطوع متجانس وألوان دقيقة 100%.'
    },
    { 
      cat: 'Battery Health', 
      catAr: 'كفاءة وصحة البطارية',
      desc: 'Verified ≥80% up to 100% capacity via OEM BIOS & diagnostics. No swelling or overheating.',
      descAr: 'فحص سعة البطارية الأصلية عبر البيوس لتتراوح بين 80% و 100%. بدون أي انتفاخ أو حرارة زائدة.'
    },
    { 
      cat: 'Motherboard & CPU', 
      catAr: 'اللوحة الأم والمعالج',
      desc: '100% stress tested with thermal repasting. Stress tested under sustained heavy loads.',
      descAr: 'اختبار استقرار المعالج تحت أقصى ضغط عمل مع تجديد المعجون الحراري الأصلي لضمان برودة ممتازة.'
    },
    { 
      cat: 'Memory (RAM)', 
      catAr: 'الذاكرة العشوائية (RAM)',
      desc: 'Full MemTest86 diagnostic pass with zero address errors or stability bottlenecks.',
      descAr: 'اجتياز اختبار الذاكرة الشامل بدون أي أخطاء في العناوين لضمان سلاسة تعدد المهام.'
    },
    { 
      cat: 'Storage Drive (SSD)', 
      catAr: 'قرص التخزين السريع SSD',
      desc: 'SMART health 100% verified, full read/write speed benchmarked with clean sector maps.',
      descAr: 'صحة القطاعات 100% عبر فحص SMART مع اختبار كامل لسرعات القراءة والكتابة الفائقة.'
    },
    { 
      cat: 'Keyboard & Trackpad', 
      catAr: 'لوحة المفاتيح واللمس',
      desc: 'Every individual key tested for tactile rebound, backlight brightness, and multi-gesture touch.',
      descAr: 'فحص استجابة كل مفتاح على حدة، إضاءة الكيبورد الخلفية، ودقة الإيماءات على لوحة اللمس.'
    },
    { 
      cat: 'Ports & Connectivity', 
      catAr: 'المنافذ والاتصال اللاسلكي',
      desc: 'Thunderbolt 4, USB-A/C, HDMI, Wi-Fi 6, Bluetooth 5.2, and 3.5mm audio jack tested.',
      descAr: 'اختبار جميع منافذ ثندربولت، تايب سي، HDMI، والاتصال فائق السرعة عبر واي فاي 6 وبلوتوث.'
    },
    { 
      cat: 'Audio & Web Camera', 
      catAr: 'الصوتيات وكاميرا الويب',
      desc: 'Dual array microphone, integrated stereo speakers, and webcam with physical privacy shutter.',
      descAr: 'فحص ميكروفون تنقية الضوضاء، نقاء مكبرات الصوت، ودقة كاميرا الويب مع غالق الخصوصية.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-ink-faint">
          <Link href="/" className="hover:text-navy transition-colors">{t.navHome}</Link>
          <ChevronRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          <span className="text-navy font-bold">{t.navWarranty}</span>
        </div>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-dark font-bold bg-lime-light px-3.5 py-1.5 rounded-full">
            {lang === 'ar' ? 'معايير الثقة والضمان' : 'Trust & Warranty Standards'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy mt-4 mb-3">
            {t.warrantyPageTitle}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted">
            {t.warrantyPageSubtitle}
          </p>
        </div>

        {/* 4 Core Warranty Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-light text-orange flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-navy mb-2">{t.warrantyCard1Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{t.warrantyCard1Desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-orange">
              {lang === 'ar' ? 'استبدال فوري بدون تأخير' : 'Instant Hardware Exchange'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-navy mb-2">{t.warrantyCard2Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{t.warrantyCard2Desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-navy">
              {lang === 'ar' ? 'تغطية للمكونات الرئيسية' : 'Motherboard, CPU, RAM & SSD'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-lime-light text-lime flex items-center justify-center mb-4">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-navy mb-2">{t.warrantyCard3Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{t.warrantyCard3Desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-lime-dark">
              {lang === 'ar' ? 'فحص حقيقي للبطارية بالبيوس' : 'Minimum 80% to 100% Health'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-light text-cyan flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-navy mb-2">{t.warrantyCard4Title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">{t.warrantyCard4Desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-cyan-hover">
              {lang === 'ar' ? 'فيش بريطاني ثلاثي مطابق للمواصفات' : 'Oman BS 1363 3-Pin Original'}
            </div>
          </div>

        </div>

        {/* 90-Point Inspection Criteria */}
        <div className="bg-white rounded-3xl border border-ink-border p-8 sm:p-10 mb-16 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan font-bold bg-cyan-light px-3 py-1 rounded-full">
              {lang === 'ar' ? 'معايير الفحص المعتمدة' : '90-Point Protocol'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-3 mb-2">
              {lang === 'ar' ? 'بروتوكول الفحص الفني قبل البيع' : 'Diagnostic Inspection Checklist'}
            </h2>
            <p className="text-sm text-ink-muted">
              {lang === 'ar'
                ? 'لا يتم عرض أي لابتوب في معرض مسقط إلا بعد اجتياز هذه الاختبارات بنسبة نجاح 100%.'
                : 'No device reaches our showroom shelves without completing and passing 100% of these stress benchmarks.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inspectionPoints.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-navy mb-1">
                    {lang === 'ar' ? item.catAr : item.cat}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {lang === 'ar' ? item.descAr : item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Claim Warranty */}
        <div className="bg-gradient-to-r from-navy-deep to-navy-dark text-white rounded-3xl p-8 sm:p-12 border border-cyan/30 shadow-lg text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-black mb-3">
            {lang === 'ar' ? 'كيفية تقديم طلب الضمان أو الاستبدال؟' : 'How to Claim Warranty Support'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {lang === 'ar'
              ? 'تواصل معنا مباشرة عبر واتساب مع صورة فاتورة الشراء ورقم السيريال نمر SKU. سنقوم بالرد الفوري وحل المشكلة أو استبدال الجهاز خلال 24 ساعة.'
              : 'Message our support team on WhatsApp with your invoice details and SKU. We will diagnose or replace your device within 24 hours at our Ghala Heights store or via courier.'}
          </p>
          <a
            href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20have%20a%20warranty%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{lang === 'ar' ? 'تواصل مع فريق الدعم الفني' : 'Chat with Warranty Support'}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
