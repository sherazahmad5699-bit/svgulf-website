'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, CheckCircle2, PhoneCall, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function PrivacyClient() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          {
            label: 'Privacy Policy',
            labelAr: 'سياسة الخصوصية',
            href: '/privacy',
          },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-deep via-navy to-navy-dark text-white p-8 sm:p-12 mb-10 border border-cyan/30 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan/20 border border-cyan/40 text-cyan-light text-xs font-bold uppercase tracking-wider mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>{isAr ? 'حماية البيانات في سلطنة عُمان' : 'Oman PDPL Compliant'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          {isAr ? 'سياسة الخصوصية وسرية المعلومات' : 'Privacy Policy & Data Protection'}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {isAr
            ? 'تلتزم مؤسسة سمارت فيجن جلف (svGulf) بحماية خصوصيتك وبياناتك الشخصية وفقاً لأحكام قانون حماية البيانات الشخصية الصادر بالمرسوم السلطاني رقم 6/2022 في سلطنة عُمان.'
            : 'Smart Vision Gulf (svGulf) is committed to safeguarding your privacy and personal data in strict compliance with the Oman Personal Data Protection Law (PDPL, Royal Decree No. 6/2022).'}
        </p>
        <div className="mt-4 text-xs font-mono text-cyan-light">
          {isAr ? 'آخر تحديث: أكتوبر 2026 · مسقط، سلطنة عُمان' : 'Last Updated: October 2026 · Muscat, Sultanate of Oman'}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-ink">
        {/* Section 1: Data We Collect */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-light text-cyan">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '1. البيانات التي نجمعها' : '1. Information We Collect'}
            </h2>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              {isAr
                ? 'عند التواصل معنا أو حجز جهاز أو طلب التوصيل داخل سلطنة عُمان، قد نجمع البيانات الأساسية التالية اللازمة لإتمام المعاملة:'
                : 'When you inquire about laptops, place orders, or request delivery across Oman, we collect the necessary details to fulfill your order:'}
            </p>
            <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-1.5 text-ink">
              <li>
                <strong>{isAr ? 'بيانات الاتصال:' : 'Contact Information:'}</strong>{' '}
                {isAr
                  ? 'الاسم الكامل، رقم الهاتف / الواتساب، وعنوان البريد الإلكتروني.'
                  : 'Full name, phone/WhatsApp number, and email address.'}
              </li>
              <li>
                <strong>{isAr ? 'بيانات التوصيل:' : 'Delivery Details:'}</strong>{' '}
                {isAr
                  ? 'المحافظة، المدينة، والرمز البريدي أو وصف العنوان داخل سلطنة عُمان.'
                  : 'Governorate, wilayat, delivery address or nearby landmark for COD delivery.'}
              </li>
              <li>
                <strong>{isAr ? 'بيانات الجهاز المختار:' : 'Device Selection:'}</strong>{' '}
                {isAr
                  ? 'رقم القطعة (SKU)، المواصفات المطلوبة، والترقيات (RAM/SSD) لإنشاء فاتورة الضمان.'
                  : 'SKU, specifications, and upgrade requests required to issue your 6-month warranty certificate.'}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: How We Use Data */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-orange-light text-orange">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '2. كيفية استخدام وتأمين البيانات' : '2. How We Use and Protect Your Data'}
            </h2>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed space-y-3">
            <p>
              {isAr
                ? 'نحن لا نبيع أو نؤجر أو نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية. نستخدم بياناتك حصرياً للأغراض التالية:'
                : 'We do not sell, rent, or lease your personal information to third parties. Your data is used exclusively to:'}
            </p>
            <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-1.5 text-ink">
              <li>{isAr ? 'تأكيد طلب الشراء وتجهيز الجهاز مع تقرير الفحص والضمان.' : 'Confirm orders and prepare laptops with diagnostic reports and warranty registration.'}</li>
              <li>{isAr ? 'تنسيق توصيل الطلب عبر مندوبينا في مسقط أو شركات الشحن المعتمدة في المحافظات.' : 'Coordinate courier delivery in Muscat or express courier to interior governorates.'}</li>
              <li>{isAr ? 'تقديم الدعم الفني وخدمات الضمان المعتمد لمدة 6 أشهر في معرضنا بغلا هايتس.' : 'Provide post-purchase technical support and manage 6-month shop warranty services.'}</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Cookies & Storage */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-lime-light text-lime-dark">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '3. ملفات تعريف الارتباط وتفضيلات التصفح' : '3. Cookies and Local Storage'}
            </h2>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed">
            {isAr
              ? 'يستخدم موقع svGulf.com تقنيات التخزين المحلي فقط لتذكر خياراتك المفضلة (مثل لغة العرض وتفضيلات التصفية)، ولضمان سرعة استجابة الموقع. يمكنك إفراغ التخزين المحلي أو رفض ملفات تعريف الارتباط غير الأساسية في أي وقت من متصفحك.'
              : 'Our website uses essential local storage to remember your preferred language (Arabic/English), search preferences, and ensure optimal performance. We do not use third-party tracking cookies across external websites.'}
          </p>
        </section>

        {/* Section 4: Your Rights & Contact */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-ink-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-light text-cyan">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy">
              {isAr ? '4. حقوقك والتواصل بشأن الخصوصية' : '4. Your Rights Under Oman Law'}
            </h2>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            {isAr
              ? 'يحق لك في أي وقت مراجعة بياناتك المسجلة لدينا، أو طلب تعديلها أو حذفها من سجلات التواصل، وذلك بالتواصل مع مسؤول الخصوصية لدينا:'
              : 'Under Oman PDPL (Royal Decree 6/2022), you have the right to access, rectify, or request deletion of your personal contact data from our active records. Contact us at:'}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-bold text-navy text-sm">Smart Vision Gulf (svGulf)</div>
              <div className="text-slate-500 mt-0.5">Shop No. 10, Ghala Heights, Wilayat Bausher, Muscat, Oman</div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/96894009501"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime text-white font-bold hover:bg-lime-hover transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+968 94009501</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-ink-border bg-white text-navy font-bold hover:border-cyan transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isAr ? 'صفحة التواصل' : 'Contact Us'}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
