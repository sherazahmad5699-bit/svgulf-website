'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Cookie } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { lang } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem('svgulf_cookie_consent');
      if (!consent) {
        // Delay slightly for smooth entrance
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Storage blocked in strict private browsing
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem('svgulf_cookie_consent', choice);
    } catch (e) {
      // Storage blocked
    }
    setShowBanner(false);
  };

  if (!mounted || !showBanner || pathname?.startsWith('/admin')) return null;


  const isAr = lang === 'ar';

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-navy-deep/95 backdrop-blur-md border border-cyan/30 text-white p-5 rounded-2xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-white">
            {isAr ? 'خصوصية البيانات وملفات تعريف الارتباط' : 'Privacy & Cookie Preferences'}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {isAr
              ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وحفظ تفضيلات اللغة وقياس الأداء وفقاً للأنظمة العُمانية.'
              : 'We use cookies and local storage to enhance your browsing experience, remember language preferences, and ensure seamless showroom navigation.'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
        <Link
          href="/privacy"
          className="text-cyan-light hover:text-cyan hover:underline flex items-center gap-1 font-medium"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleConsent('declined')}
            className="px-3 py-1.5 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium text-xs"
          >
            {isAr ? 'الضرورية فقط' : 'Essential Only'}
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="px-4 py-1.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold transition-all shadow-md text-xs"
          >
            {isAr ? 'موافق' : 'Accept All'}
          </button>
        </div>
      </div>
    </div>
  );
}
