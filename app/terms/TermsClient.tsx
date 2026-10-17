'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, RefreshCw, Truck, Store, Check, FileCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function TermsClient() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          {
            label: 'Terms & Conditions',
            labelAr: 'الشروط والأحكام',
            href: '/terms',
          },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-deep via-navy to-navy-dark text-white p-8 sm:p-12 mb-10 border border-cyan/30 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange/20 border border-orange/40 text-orange-light text-xs font-bold uppercase tracking-wider mb-4">
          <FileCheck className="w-3.5 h-3.5" />
          <span>{isAr ? 'حماية المستهلك بسلطنة عُمان' : 'Oman Consumer Protection Compliant'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          {isAr ? 'الشروط والأحكام وسياسة البيع والضمان' : 'Terms & Conditions of Sale and Warranty'}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {isAr
            ? 'تنظم هذه الشروط عمليات البيع والضمان والاستبدال في سمارت فيجن جلف بما يتوافق مع قانون حماية المستهلك العُماني الصادر بالمرسوم السلطاني رقم 66/2014 ولائحته التنفيذية رقم 77/2017.'
            : 'These terms govern all transactions, warranty claims, and return policies at Smart Vision Gulf, formulated in strict alignment with Oman Consumer Protection Law (Royal Decree 66/2014).'}
        </p>
        <div className="mt-4 text-xs font-mono text-cyan-light">
          {isAr ? 'المتجر المرخص: محل رقم 10، غلا هايتس، ولاية بوشر، مسقط' : 'Licensed Retailer: Shop 10, Ghala Heights, Wilayat Bausher, Muscat'}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-ink">
        {/* 1. Condition & Grading */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-light text-cyan">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '1. معايير جودة الأجهزة ومطابقة المواصفات' : '1. Product Condition & Transparency Standards'}
            </h2>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              {isAr
                ? 'تلتزم سمارت فيجن جلف بالشفافية التامة في تصنيف ووصف كل جهاز معروض:'
                : 'Smart Vision Gulf guarantees absolute transparency in device grading, hardware integrity, and diagnostic reports:'}
            </p>
            <ul className="space-y-2 text-ink">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-lime-dark shrink-0 mt-0.5" />
                <span>
                  <strong>Grade A++:</strong>{' '}
                  {isAr
                    ? 'أجهزة بحالة شبه جديدة، تم فحصها عبر 90 نقطة فحص تقني، مع خلوها من أي عيوب تشغيلية أو شروخ.'
                    : 'Pristine, near-mint condition devices thoroughly inspected across 90 diagnostic checkpoints without functional defects.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-lime-dark shrink-0 mt-0.5" />
                <span>
                  <strong>{isAr ? 'ضمان كفاءة البطارية:' : 'Guaranteed Battery Health:'}</strong>{' '}
                  {isAr
                    ? 'نضمن أن كفاءة البطارية لا تقل عن 85% وفق قراءة BIOS المباشرة وتقرير فحص نظام التشغيل.'
                    : 'All laptops come with verified battery health of 85% or higher, validated via BIOS diagnostics and diagnostic tooling.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-lime-dark shrink-0 mt-0.5" />
                <span>
                  <strong>{isAr ? 'المرفقات والشاحن الأصلي:' : 'Original Charger Included:'}</strong>{' '}
                  {isAr
                    ? 'يأتي كل جهاز مع شاحن أصلي معتمد أو كابل Type-C PD الأصلي المطابق لمواصفات الشركة المصنعة.'
                    : 'Every device includes an original certified manufacturer charger or OEM Type-C PD power adapter.'}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. 6-Month Shop Warranty */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-lime-light text-lime-dark">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '2. الضمان المعتمد لمدة 6 أشهر' : '2. Comprehensive 6-Month Shop Warranty'}
            </h2>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              {isAr
                ? 'يحصل المشتري على ضمان خطي معتمد من معرضنا في مسقط لمدة 6 أشهر كاملة يغطي العيوب المصنعية والأجهزة:'
                : 'Every purchase includes a verified 6-month in-store hardware warranty issued from our Muscat showroom:'}
            </p>
            <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-1.5 text-ink">
              <li>{isAr ? 'تغطية مجانية لإصلاح اللوحة الأم (Motherboard)، المعالج (CPU)، الذاكرة العشوائية (RAM)، ووحدات التخزين (SSD).' : 'Full parts and labor coverage for motherboard, processor, RAM, and internal SSD failures.'}</li>
              <li>{isAr ? 'في حال تعذر الإصلاح خلال مدة مناسبة، يتم استبدال الجهاز بجهاز مماثل أو أعلى مواصفات.' : 'If hardware cannot be repaired within reasonable time, a direct replacement device of equal or higher tier is provided.'}</li>
              <li>{isAr ? 'الاستثناءات: لا يشمل الضمان الأضرار الناتجة عن سوء الاستخدام، كسر الشاشة، انسكاب السوائل، أو محاولات الصيانة غير المصرح بها خارج ورشتنا.' : 'Warranty Exclusions: Accidental liquid spills, physical drops, screen fractures, and unauthorized third-party repairs void hardware warranty.'}</li>
            </ul>
          </div>
        </section>

        {/* 3. 7-Day Replacement Guarantee */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-orange-light text-orange">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '3. سياسة الاستبدال الفوري خلال 7 أيام' : '3. 7-Day Instant Replacement Policy'}
            </h2>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed">
            {isAr
              ? 'وفقاً للائحة حماية المستهلك بسلطنة عُمان، في حال ظهور أي عيب فني خفي بالجهاز خلال 7 أيام من تاريخ الاستلام، يحق للعميل استبدال الجهاز فوراً أو استرداد كامل المبلغ، بشرط إعادة الجهاز بحالته المستلمة وبكافة ملحقاته وفاتورة الشراء الأصلية.'
              : 'In adherence to Oman CPA regulations, if any undisclosed technical or hardware fault is detected within 7 days of delivery, customers are entitled to an immediate device exchange or full refund, provided the device is returned in original condition with all accessories and invoice.'}
          </p>
        </section>

        {/* 4. Pricing, VAT & Delivery Inspection */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-light text-cyan">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '4. الأسعار وضريبة القيمة المضافة والمعاينة عند الاستلام' : '4. Pricing, 5% Oman VAT & COD Inspection'}
            </h2>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              {isAr
                ? 'جميع الأسعار المعروضة بالريال العُماني (OMR) شاملة لضريبة القيمة المضافة بنسبة 5% المطبقة في سلطنة عُمان.'
                : 'All listed prices are denominated in Omani Rial (OMR) with 3 decimals and are inclusive of the 5% Oman Value Added Tax (VAT).'}
            </p>
            <p>
              {isAr
                ? 'ميزة الدفع عند الاستلام (COD): يحق للمشتري فحص المظهر الخارجي وتشغيل الجهاز والتأكد من مطابقته للمواصفات المطلوبة قبل دفع المبلغ للمندوب.'
                : 'Cash on Delivery (COD) Inspection: Customers have the right to inspect external condition and verify specs before settling payment with our delivery courier.'}
            </p>
          </div>
        </section>

        {/* 5. Showroom Testing & Contact */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-navy-light text-navy">
              <Store className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '5. التجربة الحية في المعرض والاستفسارات' : '5. Showroom Testing & Legal Contact'}
            </h2>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            {isAr
              ? 'ندعو كافة العملاء لزيارة معرضنا في غلا هايتس لتجربة الأجهزة وفحصها يدوياً واستشارة فريقنا الهندسي قبل إتمام أي طلب.'
              : 'We invite all customers to visit our physical showroom in Ghala Heights to personally test keyboards, displays, and thermal performance.'}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-bold text-navy text-sm">Smart Vision Gulf Showroom</div>
              <div className="text-slate-500 mt-0.5">Shop 10, Ghala Heights, Wilayat Bausher, Muscat, Oman</div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/96894009501"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime text-white font-bold hover:bg-lime-hover transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+968 94009501</span>
              </a>
              <Link
                href="/warranty"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-ink-border bg-white text-navy font-bold hover:border-cyan transition-colors"
              >
                <span>{isAr ? 'تفاصيل الضمان 6 أشهر' : 'Full Warranty Policy'}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
