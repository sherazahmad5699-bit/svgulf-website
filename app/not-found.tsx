'use client';

import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, Laptop, MapPin, PhoneCall, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function NotFound() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center">
        {/* 404 Visual Icon Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-light border-2 border-cyan/30 text-cyan mb-6 shadow-lg shadow-cyan/10">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-orange font-bold mb-2">
          {isAr ? 'خطأ 404 · الصفحة غير موجودة' : 'Error 404 · Page Not Found'}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-4">
          {isAr
            ? 'عذراً، لم نتمكن من العثور على هذه الصفحة'
            : 'Looking for a Laptop or IT Service?'}
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
          {isAr
            ? 'قد يكون الرابط الذي اتبعته قديماً أو تم نقله. يمكنك تصفح مخزون الأجهزة المتاحة حالياً في مسقط أو التواصل المباشر مع فريقنا.'
            : 'The page you are looking for might have been moved or is temporarily unavailable. Browse our verified business laptop inventory or visit our showroom in Ghala Heights.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/inventory"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold text-sm shadow-md hover:shadow-glow-orange transition-all"
          >
            <Laptop className="w-4 h-4" />
            <span>{isAr ? 'استعراض الأجهزة المتاحة' : 'Browse Inventory'}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-ink-border bg-white text-navy font-bold text-sm hover:border-cyan hover:bg-slate-50 transition-all"
          >
            <Home className="w-4 h-4 text-cyan" />
            <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
        </div>

        {/* Helpful Quick Links Grid */}
        <div className="p-5 rounded-2xl bg-white border border-ink-border shadow-sm text-left">
          <div className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
            {isAr ? 'روابط مفيدة سريعة' : 'Popular Destination Links'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href="/showroom"
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-ink-muted hover:text-navy"
            >
              <MapPin className="w-4 h-4 text-cyan shrink-0" />
              <div>
                <div className="font-semibold text-ink">
                  {isAr ? 'معرض غلا هايتس' : 'Ghala Heights Showroom'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAr ? 'محل رقم 10 · مسقط' : 'Shop No. 10 · Muscat'}
                </div>
              </div>
            </Link>

            <Link
              href="/warranty"
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-ink-muted hover:text-navy"
            >
              <PhoneCall className="w-4 h-4 text-lime-dark shrink-0" />
              <div>
                <div className="font-semibold text-ink">
                  {isAr ? 'الضمان المعتمد 6 أشهر' : '6-Month Shop Warranty'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAr ? 'استبدال فوري 7 أيام' : '7-Day Replacement'}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
