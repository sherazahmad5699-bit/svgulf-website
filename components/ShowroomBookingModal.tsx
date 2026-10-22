'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { useSiteData } from './SiteDataContext';
import { 
  Building2, 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Phone, 
  User, 
  Laptop,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

interface ShowroomBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSku?: string;
}

export default function ShowroomBookingModal({ isOpen, onClose, preselectedSku }: ShowroomBookingModalProps) {
  const { lang, dir } = useLanguage();
  const { products, theme, addInquiryLead } = useSiteData();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSku, setSelectedSku] = useState(preselectedSku || (products[0]?.sku || ''));
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('evening'); // 'morning' | 'evening'
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const selectedProduct = products.find((p) => p.sku === selectedSku);
  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) return;

    const code = `GHALA-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);

    const slotLabel = timeSlot === 'morning' ? 'Morning (9:00 AM - 1:00 PM)' : 'Evening (4:30 PM - 10:00 PM)';

    // Add lead to admin system
    addInquiryLead({
      name: fullName,
      phone: phoneNumber,
      subject: `Showroom VIP Inspection Booking: ${code}`,
      message: `Preferred Date: ${visitDate || 'Today/Tomorrow'} | Slot: ${slotLabel} | Notes: ${notes || 'None'}`,
      productSku: selectedProduct?.sku,
      productName: selectedProduct?.name,
      source: 'bulk_b2b', // admin lead category
      status: 'new',
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const slotLabel = timeSlot === 'morning' ? 'الفترة الصباحية (9:00 ص - 1:00 ظ)' : 'الفترة المسائية (4:30 ع - 10:00 م)';
  const slotLabelEn = timeSlot === 'morning' ? 'Morning Shift (9:00 AM - 1:00 PM)' : 'Evening Shift (4:30 PM - 10:00 PM)';

  const waConfirmText = lang === 'ar'
    ? encodeURIComponent(
        `مرحباً سمارت فيجن جلف (معرض غلا هايتس)،\n` +
        `أود تأكيد حجز موعد تجربة وفحص جهاز:\n` +
        `• كود الحجز: ${reservationCode}\n` +
        `• الاسم: ${fullName}\n` +
        `• الهاتف: ${phoneNumber}\n` +
        `• الجهاز المطلوب: ${selectedProduct ? selectedProduct.nameAr : selectedSku}\n` +
        `• تاريخ الزيارة: ${visitDate || 'اليوم / غداً'}\n` +
        `• التوقيت: ${slotLabel}\n\n` +
        `يرجى تجهيز الجهاز على منضدة الفحص. شكراً لكم!`
      )
    : encodeURIComponent(
        `Hello Smart Vision Gulf (Ghala Heights Showroom),\n` +
        `I would like to confirm my VIP Laptop Inspection Slot:\n` +
        `• Reservation Code: ${reservationCode}\n` +
        `• Name: ${fullName}\n` +
        `• Phone: ${phoneNumber}\n` +
        `• Device: ${selectedProduct ? selectedProduct.name : selectedSku}\n` +
        `• Preferred Date: ${visitDate || 'Today/Tomorrow'}\n` +
        `• Time Slot: ${slotLabelEn}\n\n` +
        `Please hold and prepare the device for testing. Thank you!`
      );

  const waConfirmLink = `https://wa.me/${primaryPhone}?text=${waConfirmText}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir={dir}>
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in my-8">
        
        {/* Modal Header */}
        <div className="bg-navy text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-light bg-cyan/15 px-3 py-1 rounded-md">
              {lang === 'ar' ? 'حجز معاينة 24 ساعة' : '24-Hour VIP Hold'}
            </span>
          </div>
          <h3 className="text-xl font-black">
            {lang === 'ar' ? 'حجز موعد فحص وتجربة في المعرض' : 'Book a Showroom VIP Inspection Slot'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {lang === 'ar'
              ? 'محل رقم 10، غلا هايتس، مسقط - احجز جهازك لمدة 24 ساعة لتجربته شخصياً بدون أي التزام بالشراء.'
              : 'Shop 10, Ghala Heights, Muscat. Reserve any laptop for 24 hours with zero purchase obligation.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  {lang === 'ar' ? 'الجهاز المراد فحصه وحجزه:' : 'Select Laptop to Reserve:'}
                </label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-semibold text-navy focus:outline-none focus:border-cyan"
                >
                  {products.map((p) => (
                    <option key={p.sku} value={p.sku}>
                      {lang === 'ar' ? p.nameAr : p.name} ({p.priceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'الاسم الكريم:' : 'Full Name:'} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'ar' ? 'محمد البلوشي' : 'Ahmed Al Balushi'}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'رقم الهاتف / واتساب:' : 'WhatsApp Phone:'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+968 9XXXXXXX"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'تاريخ الزيارة المقترح:' : 'Preferred Date:'}
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'الفترة الزمنية:' : 'Showroom Shift:'}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                  >
                    <option value="evening">{lang === 'ar' ? 'مساءً: 4:30 م - 10:00 م' : 'Evening: 4:30 PM - 10:00 PM'}</option>
                    <option value="morning">{lang === 'ar' ? 'صباحاً: 9:00 ص - 1:00 ظ' : 'Morning: 9:00 AM - 1:00 PM'}</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'ملاحظات إضافية أو برامج مطلوبة للتجربة:' : 'Special Testing Requests (Optional):'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'أود تجربة سرعة الرام وفحص الكيبورد...' : 'Need to test with external monitor...'}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>

              {/* Guarantee banner */}
              <div className="p-3 rounded-xl bg-lime-light border border-lime/30 text-lime-dark text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-lime" />
                <span>{lang === 'ar' ? 'حجز مجاني مؤكد لمدة 24 ساعة بدون دفع مسبق' : '100% Free 24-Hour Hold Guarantee - No deposit required'}</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-orange hover:bg-orange-hover text-white font-extrabold text-sm shadow-glow-orange transition-all transform hover:-translate-y-0.5"
              >
                {lang === 'ar' ? 'تأكيد حجز المعاينة الآن' : 'Confirm VIP Inspection Hold'}
              </button>

            </form>
          ) : (
            /* Confirmation State */
            <div className="text-center py-4 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-lime-light text-lime mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-navy">
                  {lang === 'ar' ? 'تم تأكيد حجزك بنجاح!' : 'Your VIP Inspection is Reserved!'}
                </h4>
                <div className="mt-2 inline-block px-4 py-1.5 rounded-xl bg-navy text-cyan font-mono font-black text-base border border-cyan/30">
                  {reservationCode}
                </div>
                <p className="text-xs text-ink-muted mt-3 max-w-sm mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? `تم حجز جهاز (${selectedProduct ? selectedProduct.nameAr : selectedSku}) لمدة 24 ساعة في معرضنا بغلا هايتس، محل 10.`
                    : `Device (${selectedProduct ? selectedProduct.name : selectedSku}) is now placed on hold for you for 24 hours at Shop 10 Ghala Heights.`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-start">
                <div className="flex items-center gap-2 text-navy font-bold">
                  <MapPin className="w-4 h-4 text-orange shrink-0" />
                  <span>Shop No. 10, Ghala Heights, Wilayat Bausher, Muscat</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Clock className="w-4 h-4 text-cyan shrink-0" />
                  <span>{timeSlot === 'morning' ? '9:00 AM - 1:00 PM' : '4:30 PM - 10:00 PM'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={waConfirmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('showroom_booking_confirm', selectedSku)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{lang === 'ar' ? 'إرسال تأكيد الموعد عبر واتساب' : 'Send Booking to Store on WhatsApp'}</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-ink-muted hover:text-navy transition-colors"
                >
                  {lang === 'ar' ? 'إغلاق النافذة' : 'Close Window'}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
