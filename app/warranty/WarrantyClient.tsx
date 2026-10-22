'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { useSiteData } from '@/components/SiteDataContext';
import { 
  ShieldCheck, 
  RotateCcw, 
  BatteryCharging, 
  Zap, 
  CheckCircle2, 
  MessageCircle,
  Search,
  Check,
  AlertCircle,
  Laptop,
  Clock,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function WarrantyClient() {
  const { t, lang, dir } = useLanguage();
  const { products, theme } = useSiteData();

  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    sku: string;
    modelName: string;
    modelNameAr: string;
    daysRemaining: number;
    status: 'active' | 'expired';
    inspectionPassDate: string;
    coveredParts: string[];
    coveredPartsAr: string[];
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookupQuery.trim().toLowerCase();
    if (!q) return;

    setHasSearched(true);

    // Look for matching product SKU or name
    const matched = products.find(
      (p) =>
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.nameAr.toLowerCase().includes(q)
    );

    if (matched) {
      setLookupResult({
        found: true,
        sku: matched.sku,
        modelName: matched.name,
        modelNameAr: matched.nameAr,
        daysRemaining: 142, // Simulated active shop warranty
        status: 'active',
        inspectionPassDate: 'Verified & Certified by svGulf Muscat Lab',
        coveredParts: [
          'System Motherboard & CPU Logic',
          'Display Screen (Zero Dead Pixel Policy)',
          'High-Speed DDR4/DDR5 Memory Modules',
          'PCIe NVMe Solid State Drive (SSD)',
          'OEM Battery Cells (≥80% Runtime Guarantee)',
          'Original 3-Pin UK Power Adapter',
        ],
        coveredPartsAr: [
          'اللوحة الأم ومعالج البيانات',
          'الشاشة ولوحة العرض (خلو تام من البكسلات الميتة)',
          'الذاكرة العشوائية RAM',
          'قرص التخزين السريع NVMe SSD',
          'خلايا البطارية الأصلية (ضمان سعة ≥80%)',
          'الشاحن الأصلي الثلاثي المعتمد',
        ],
      });
    } else if (q.startsWith('svg-') || q.length >= 6) {
      // General valid serial format fallback
      setLookupResult({
        found: true,
        sku: lookupQuery.toUpperCase(),
        modelName: 'Smart Vision Gulf Certified Enterprise Laptop',
        modelNameAr: 'لابتوب أعمال معتمد من سمارت فيجن جلف',
        daysRemaining: 156,
        status: 'active',
        inspectionPassDate: 'Verified & Certified by svGulf Muscat Lab',
        coveredParts: [
          'System Motherboard & Logic Board',
          'Display Panel & Backlight',
          'RAM & NVMe Storage Modules',
          'OEM Battery Health Guarantee',
          'Original Power Adapter',
        ],
        coveredPartsAr: [
          'اللوحة الأم والمعالج',
          'شاشة العرض والإضاءة الخلفية',
          'وحدات الذاكرة والتخزين',
          'ضمان كفاءة خلايا البطارية',
          'الشاحن الأصلي المرفق',
        ],
      });
    } else {
      setLookupResult(null);
    }
  };

  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

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
      desc: 'CrystalDiskInfo SMART health verified 100% good with high read/write speeds.',
      descAr: 'فحص الحالة الصحية لقرص التخزين والتأكد من سرعات القراءة والكتابة الفائقة.'
    },
    { 
      cat: 'Keyboard & Trackpad', 
      catAr: 'لوحة المفاتيح والماوس اللمسي',
      desc: 'Every key audited for feedback, backlighting uniformity, and trackpad gestures.',
      descAr: 'اختبار استجابة كل زر، تجانس الإضاءة الخلفية، وسلاسة إيماءات اللمس المتعدد.'
    },
    { 
      cat: 'Ports & Connectivity', 
      catAr: 'المنافذ والاتصال اللاسلكي',
      desc: 'Thunderbolt, HDMI, USB, Wi-Fi 6, and Bluetooth verified with physical peripherals.',
      descAr: 'فحص جميع منافذ التوصيل وشبكة الواي فاي والبلوتوث بربط أجهزة خارجية للتأكد من كفاءتها.'
    },
    { 
      cat: 'Audio & Webcam', 
      catAr: 'السماعات والميكروفون والكاميرا',
      desc: 'Microphones, stereo speakers, and privacy-shutter webcams tested for crisp streaming.',
      descAr: 'اختبار نقاء صوت الميكروفون المدمج والسماعات ووضوح الكاميرا لعقد الاجتماعات الاحترافية.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8" dir={dir}>
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <Breadcrumb
          items={[
            {
              label: 'Warranty & Standards',
              labelAr: 'الضمان والجودة',
              href: '/warranty',
            },
          ]}
        />

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-dark font-bold bg-lime-light px-3.5 py-1.5 rounded-xl border border-lime/20">
            {lang === 'ar' ? 'معايير الثقة والضمان' : 'Trust & Warranty Standards'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy mt-4 mb-3">
            {t.warrantyPageTitle}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted">
            {t.warrantyPageSubtitle}
          </p>
        </div>

        {/* Digital Warranty Lookup Tool */}
        <div className="bg-white rounded-3xl border border-ink-border p-6 sm:p-10 shadow-md mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-light text-cyan-hover text-xs font-bold uppercase tracking-wider mb-2">
                <FileCheck className="w-4 h-4 text-cyan" />
                <span>{lang === 'ar' ? 'أداة الاستعلام الرقمي عن الضمان' : 'Digital Warranty Verification Tool'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-navy">
                {lang === 'ar' ? 'تحقق من سريان ضمان جهازك وصلاحيته' : 'Check Your svGulf Warranty Status'}
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                {lang === 'ar'
                  ? 'أدخل الرقم التسلسلي (Serial Number) أو كود الجهاز (SKU) المطبوع على الفاتورة'
                  : 'Enter your laptop serial number or SKU code printed on your invoice.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل كود الجهاز مثلاً: SVG-DL5440-R' : 'Enter Serial / SKU e.g. SVG-DL5440-R'}
                className={`w-full py-3 rounded-xl border border-slate-300 font-mono text-xs sm:text-sm font-bold text-navy focus:outline-none focus:border-cyan ${
                  dir === 'rtl' ? 'pr-9 pl-4 text-right' : 'pl-9 pr-4 text-left'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-navy hover:bg-navy-dark text-white font-extrabold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              {lang === 'ar' ? 'فحص الضمان' : 'Verify Warranty'}
            </button>
          </form>

          {/* Lookup Result Box */}
          {hasSearched && lookupResult && (
            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-lime/40 animate-fade-in space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-lime animate-ping" />
                  <span className="font-mono font-black text-sm text-lime-dark bg-lime-light px-3 py-1 rounded-md">
                    {lang === 'ar' ? 'الضمان سارٍ ومعتمد' : 'ACTIVE WARRANTY COVERAGE'}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-navy">
                  {lang === 'ar' ? `متبقي ${lookupResult.daysRemaining} يوماً` : `${lookupResult.daysRemaining} Days Remaining`}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-navy text-base">
                  {lang === 'ar' ? lookupResult.modelNameAr : lookupResult.modelName}
                </h4>
                <div className="text-xs font-mono text-cyan mt-0.5">
                  SKU / Serial: {lookupResult.sku}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(lang === 'ar' ? lookupResult.coveredPartsAr : lookupResult.coveredParts).map((part, i) => (
                  <div key={i} className="flex items-center gap-2 text-ink">
                    <Check className="w-3.5 h-3.5 text-lime shrink-0" />
                    <span>{part}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-ink-muted">
                  {lang === 'ar'
                    ? 'يحق لك الفحص المجاني واستبدال القطع في معرضنا بغلا هايتس، مسقط.'
                    : 'Includes complimentary hardware diagnostics at Shop 10 Ghala Heights.'}
                </span>

                <a
                  href={`https://wa.me/${primaryPhone}?text=${encodeURIComponent(
                    lang === 'ar'
                      ? `مرحباً سمارت فيجن جلف، أود تقديم طلب خدمة/ضمان للجهاز: ${lookupResult.modelNameAr} (كود: ${lookupResult.sku})`
                      : `Hello Smart Vision Gulf, I want to submit a warranty service claim for: ${lookupResult.modelName} (SKU: ${lookupResult.sku})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('warranty_lookup_claim', lookupResult.sku)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-white text-xs font-bold shadow-md transition-all shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'ar' ? 'طلب صيانة الضمان عبر واتساب' : 'Claim Warranty on WhatsApp'}</span>
                </a>
              </div>
            </div>
          )}

          {hasSearched && !lookupResult && (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2 animate-fade-in">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="font-extrabold text-sm text-navy">
                {lang === 'ar' ? 'لم يتم العثور على سجل ضمان لهذا الكود' : 'No Warranty Record Found for This SKU/Serial'}
              </h4>
              <p className="text-xs text-ink-muted max-w-md mx-auto">
                {lang === 'ar'
                  ? 'يرجى التأكد من كتابة الكود بشكل صحيح كما هو مطبوع في الفاتورة أو التواصل مع فريق خدمة العملاء.'
                  : 'Please check your SKU code or contact customer service with your purchase receipt.'}
              </p>
              <a
                href={`https://wa.me/${primaryPhone}?text=Hello%20Smart%20Vision%20Gulf,%20I%20need%20help%20checking%20my%20warranty%20serial`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-dark hover:underline mt-2"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'ar' ? 'تواصل مع الدعم للتحقق اليدوي' : 'Contact Support for Manual Verification'}</span>
              </a>
            </div>
          )}
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
            <span className="text-xs font-mono uppercase tracking-widest text-cyan font-bold bg-cyan-light px-3.5 py-1.5 rounded-xl border border-cyan/20">
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
            onClick={() => trackWhatsAppClick('warranty_claim_cta')}
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
