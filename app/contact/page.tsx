'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Compass, 
  Instagram, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export default function ContactPage() {
  const { t, lang, dir } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Stock Availability / Price Quote');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const subjectOptions = [
    { value: 'Laptop Stock & Availability', label: 'Laptop Stock & Availability Inquiry', labelAr: 'استفسار عن توفر موديل لابتوب معين' },
    { value: 'RAM / SSD Custom Upgrade Quote', label: 'RAM / SSD Custom Upgrade Quote', labelAr: 'طلب تسعيرة ترقية الرام والتخزين' },
    { value: 'B2B Corporate / Bulk Order', label: 'B2B Corporate & School Bulk Order', labelAr: 'طلبات الشركات والمدارس (جملة)' },
    { value: 'Showroom Visit & Directions', label: 'Showroom Visit & Directions', labelAr: 'زيارة المعرض والاستفسار عن الموقع' },
    { value: 'Warranty / Technical Support', label: 'Warranty / Technical Support', labelAr: 'خدمة الضمان والدعم الفني المباشر' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = lang === 'ar'
      ? encodeURIComponent(
          `مرحباً سمارت فيجن جلف،\n` +
          `استفسار جديد من نموذج الموقع الإلكتروني:\n` +
          `• الاسم: ${name}\n` +
          `• الهاتف / واتساب: ${phone}\n` +
          `• الموضوع: ${subject}\n` +
          `• الرسالة: ${message}\n\n` +
          `يرجى الرد والتواصل معنا. شكراً لكم!`
        )
      : encodeURIComponent(
          `Hello Smart Vision Gulf,\n` +
          `New Website Contact Form Inquiry:\n` +
          `• Name: ${name}\n` +
          `• Phone/WhatsApp: ${phone}\n` +
          `• Subject: ${subject}\n` +
          `• Message: ${message}\n\n` +
          `Please reply at your earliest convenience.`
        );

    window.open(`https://wa.me/96894009501?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-ink-faint">
          <Link href="/" className="hover:text-navy transition-colors">{t.navHome}</Link>
          <ChevronRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          <span className="text-navy font-bold">{t.navContact}</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange-light px-3.5 py-1.5 rounded-full">
            {lang === 'ar' ? 'الموقع والتواصل المباشر' : 'Get in Touch'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy mt-4 mb-3">
            {t.contactPageTitle}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {t.contactPageSubtitle}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Showroom Address Card */}
            <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-light text-orange flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-sm">{t.showroomAddressTitle}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed mt-1">{t.showroomAddress}</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Smart+Vision+Gulf+Ghala+Heights+Muscat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs transition-colors"
              >
                <Compass className="w-4 h-4 text-cyan" />
                <span>{t.btnGoogleMaps}</span>
              </a>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lime-light text-lime-dark flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-lime" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-sm">{t.showroomPhoneTitle}</h3>
                  <p className="text-xs text-ink-muted mt-1" dir="ltr">+968 9400 9501 / +968 9600 9404</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/96894009501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-lime hover:bg-lime-hover text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+96894009501"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy hover:bg-navy-light text-white font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-cyan-light" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-light text-cyan flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-navy text-sm">{t.showroomHoursTitle}</h3>
                  <div className="mt-2 space-y-1.5 text-xs text-ink-muted font-mono">
                    <p className="text-navy font-semibold">{t.showroomHoursWeek}</p>
                    <p className="text-lime-dark font-bold">{t.showroomHoursFri}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div className="bg-white rounded-2xl border border-ink-border p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Instagram className="w-5 h-5 text-orange" />
                <span className="text-xs font-bold text-navy">Follow us on Instagram</span>
              </div>
              <a
                href="https://www.instagram.com/svgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-orange hover:underline font-mono"
              >
                @svgulf
              </a>
            </div>

          </div>

          {/* Right Column: Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-ink-border p-8 shadow-sm">
            <h2 className="text-2xl font-black text-navy mb-2">
              {lang === 'ar' ? 'أرسل استفسارك إلى المعرض' : 'Direct Message to Showroom'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mb-6">
              {lang === 'ar'
                ? 'املأ النموذج أدناه وسيتم فتح محادثة واتساب فورية مباشرة مع مسؤول المبيعات في مسقط.'
                : 'Fill out this quick form to initiate an instant WhatsApp inquiry directly with our Muscat sales team.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  {t.contactFormName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'ar' ? 'أحمد البلوشي' : 'e.g. Mohammed Al-Harthy'}
                  className="w-full p-3 rounded-xl border border-ink-border text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  {t.contactFormPhone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+968 9XXXXXXX"
                  className="w-full p-3 rounded-xl border border-ink-border text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  {t.contactFormSubject}
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl border border-ink-border bg-slate-50 text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan text-navy"
                >
                  {subjectOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {lang === 'ar' ? opt.labelAr : opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  {t.contactFormMessage} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'ar' ? 'أود الاستفسار عن توفر لابتوب ديل 5440 وسعر التوصيل لمسقط...' : 'I would like to inquire about Dell Latitude 5440 availability and same-day delivery...'}
                  className="w-full p-3 rounded-xl border border-ink-border text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-lime transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{t.contactFormSubmit}</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-lime-light text-lime-dark text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime" />
                  <span>
                    {lang === 'ar' 
                      ? 'تم تحويل استفسارك إلى واتساب بنجاح!' 
                      : 'Inquiry forwarded to WhatsApp chat!'}
                  </span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
