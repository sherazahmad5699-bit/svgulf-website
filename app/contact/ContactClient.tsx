'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useToast } from '@/components/ToastContext';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Compass, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { trackContactSubmit, trackWhatsAppClick, trackPhoneCall } from '@/lib/analytics';

export default function ContactClient() {
  const { t, lang, dir } = useLanguage();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Laptop Stock & Availability');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const subjectOptions = [
    { value: 'Laptop Stock & Availability', label: 'Laptop Stock & Availability Inquiry', labelAr: 'استفسار عن توفر موديل لابتوب معين' },
    { value: 'RAM / SSD Custom Upgrade Quote', label: 'RAM / SSD Custom Upgrade Quote', labelAr: 'طلب تسعيرة ترقية الرام والتخزين' },
    { value: 'B2B Corporate / Bulk Order', label: 'B2B Corporate & School Bulk Order', labelAr: 'طلبات الشركات والمدارس (جملة)' },
    { value: 'Showroom Visit & Directions', label: 'Showroom Visit & Directions', labelAr: 'زيارة المعرض والاستفسار عن الموقع' },
    { value: 'Warranty / Technical Support', label: 'Warranty / Technical Support', labelAr: 'خدمة الضمان والدعم الفني المباشر' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit to API Route
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        trackContactSubmit('form', 'success');
        showToast(
          lang === 'ar' ? 'تم استلام استفسارك بنجاح! سنتواصل معك قريباً.' : 'Inquiry received successfully! Our team will contact you shortly.',
          'success'
        );
        setSubmitted(true);

        // Optional WhatsApp direct forward
        if (data.whatsappFallback) {
          setTimeout(() => {
            window.open(data.whatsappFallback, '_blank');
          }, 600);
        }
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (err: any) {
      console.warn('API submission failed, falling back to direct WhatsApp:', err);
      trackContactSubmit('whatsapp', 'success');

      // WhatsApp direct fallback
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
      showToast(
        lang === 'ar' ? 'جاري تحويلك إلى واتساب...' : 'Redirecting to WhatsApp...',
        'info'
      );
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <Breadcrumb
          items={[
            {
              label: 'Contact & Location',
              labelAr: 'الموقع والتواصل',
              href: '/contact',
            },
          ]}
        />

        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange-light px-3.5 py-1.5 rounded-xl border border-orange/20">
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
                  <p className="text-[11px] text-cyan font-semibold mt-1">{t.showroomDirections}</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Smart+Vision+Gulf+Ghala+Heights+Muscat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange hover:underline"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.btnGoogleMaps}</span>
              </a>
            </div>

            {/* Direct Phone / WhatsApp Card */}
            <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-lime-light text-lime flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-sm">{t.showroomPhoneTitle}</h3>
                  <div className="text-xs font-mono font-bold text-navy mt-1 space-y-1" dir="ltr">
                    <div>
                      <a
                        href="tel:+96894009501"
                        onClick={() => trackPhoneCall('contact_page')}
                        className="hover:text-cyan transition-colors"
                      >
                        +968 9400 9501 (Primary & WhatsApp)
                      </a>
                    </div>
                    <div>
                      <a
                        href="tel:+96896009404"
                        onClick={() => trackPhoneCall('contact_page')}
                        className="hover:text-cyan transition-colors"
                      >
                        +968 9600 9404 (Secondary Support)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <a
                  href="https://wa.me/96894009501"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('contact_page_card')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime text-white font-extrabold text-xs shadow-sm hover:bg-lime-hover transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="https://www.instagram.com/svgulf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-ink-border text-navy font-bold text-xs hover:border-cyan transition-colors"
                >
                  <Instagram className="w-4 h-4 text-orange" />
                  <span>@svgulf</span>
                </a>
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-light text-cyan flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-sm">{t.showroomHoursTitle}</h3>
                  <div className="text-xs font-mono font-medium text-ink-muted mt-2 space-y-1">
                    <p className="text-navy font-semibold">{t.showroomHoursWeek}</p>
                    <p className="text-lime-dark font-bold">{t.showroomHoursFri}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-ink-border p-8 shadow-sm">
            <h2 className="text-2xl font-black text-navy mb-2">
              {lang === 'ar' ? 'أرسل استفسارك إلى المعرض' : 'Direct Message to Showroom'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mb-6">
              {lang === 'ar'
                ? 'املأ النموذج أدناه وسيتم الرد عليك فوراً عبر فريق المبيعات في مسقط.'
                : 'Fill out this quick form to dispatch your inquiry to our Muscat sales and engineering team.'}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    {lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-3 rounded-xl border border-ink-border text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan"
                    dir="ltr"
                  />
                </div>
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
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-lime transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t.contactFormSubmit}</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-lime-light text-lime-dark text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime" />
                  <span>
                    {lang === 'ar' 
                      ? 'تم استلام استفسارك بنجاح! سنتواصل معك بأقرب وقت.' 
                      : 'Inquiry submitted successfully! We will get in touch promptly.'}
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
