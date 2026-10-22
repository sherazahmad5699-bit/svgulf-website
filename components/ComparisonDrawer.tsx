'use client';

import React from 'react';
import Link from 'next/link';
import { useComparison } from './ComparisonContext';
import { useLanguage } from './LanguageContext';
import { 
  Laptop, 
  X, 
  ArrowRight, 
  Check, 
  Cpu, 
  Layers, 
  HardDrive, 
  Monitor, 
  BatteryCharging, 
  ShieldCheck, 
  MessageCircle,
  Scale,
  Sparkles
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { useSiteData } from './SiteDataContext';

export default function ComparisonDrawer() {
  const { compareList, removeFromCompare, clearCompare, isOpen, openDrawer, closeDrawer } = useComparison();
  const { lang, dir } = useLanguage();
  const { theme } = useSiteData();

  if (compareList.length === 0) {
    return null;
  }

  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

  return (
    <>
      {/* Floating Bottom Dock Pill */}
      {!isOpen && (
        <div 
          dir={dir}
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-navy text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-cyan/50 flex items-center gap-3 animate-fade-in max-w-[95vw]"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">
                {lang === 'ar' ? 'مقارنة الأجهزة' : 'Compare Laptops'}
              </div>
              <div className="text-[10px] text-cyan-light font-mono">
                {compareList.length} / 3 {lang === 'ar' ? 'أجهزة محددة' : 'selected'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-hidden">
            {compareList.map((p) => (
              <span 
                key={p.sku} 
                className="text-[10px] bg-white/10 px-2 py-1 rounded-lg border border-white/20 font-bold truncate max-w-[80px] sm:max-w-[120px]"
                title={lang === 'ar' ? p.nameAr : p.name}
              >
                {p.brandLabel}
              </span>
            ))}
          </div>

          <button
            onClick={openDrawer}
            className="px-3.5 py-1.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-black shadow-md transition-all whitespace-nowrap"
          >
            {lang === 'ar' ? 'عرض المقارنة' : 'Compare Now'}
          </button>

          <button
            onClick={clearCompare}
            title={lang === 'ar' ? 'إلغاء الكل' : 'Clear all'}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Full Modal Comparison Matrix */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          dir={dir}
        >
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-navy text-white flex items-center justify-between border-b border-navy-subtle shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black">
                    {lang === 'ar' ? 'مقارنة المواصفات جنباً إلى جنب' : 'Side-by-Side Laptop Comparison Matrix'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {lang === 'ar' 
                      ? 'قارن بين مواصفات الأجهزة المفحوصة لاختيار الأنسب لعملك أو دراستك' 
                      : 'Compare verified hardware diagnostics, battery health, and prices.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCompare}
                  className="hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {lang === 'ar' ? 'مسح الكل' : 'Clear all'}
                </button>
                <button
                  onClick={closeDrawer}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="flex-1 overflow-x-auto p-4 sm:p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 min-w-[500px]">
                {compareList.map((product) => {
                  const waText = lang === 'ar'
                    ? encodeURIComponent(`مرحباً سمارت فيجن جلف، أود شراء أو تجربة هذا الجهاز بعد مقارنته على الموقع: ${product.nameAr} (${product.sku}) بسعر ${product.priceFormatted}.`)
                    : encodeURIComponent(`Hello Smart Vision Gulf, I am interested in: ${product.name} (${product.sku}) at ${product.priceFormatted} after comparing on svGulf.`);
                  const waUrl = `https://wa.me/${primaryPhone}?text=${waText}`;

                  return (
                    <div 
                      key={product.sku}
                      className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-cyan/50 transition-colors"
                    >
                      {/* Top: Remove & Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-cyan bg-cyan/10 px-2.5 py-1 rounded-md border border-cyan/20">
                          {product.brandLabel}
                        </span>
                        <button
                          onClick={() => removeFromCompare(product.sku)}
                          className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-bold"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'حذف' : 'Remove'}</span>
                        </button>
                      </div>

                      {/* Device Title & Price */}
                      <div>
                        <h4 className="font-extrabold text-navy text-sm sm:text-base line-clamp-2">
                          {lang === 'ar' ? product.nameAr : product.name}
                        </h4>
                        <div className="text-[11px] font-mono text-ink-faint mt-0.5">
                          SKU: {product.sku}
                        </div>

                        <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200">
                          <div className="text-xl sm:text-2xl font-black text-navy font-mono">
                            {product.priceFormatted}
                          </div>
                          <div className="text-[10px] text-lime-dark font-bold">
                            {lang === 'ar' ? 'شامل ضريبة القيمة المضافة 5%' : '5% Oman VAT Included'}
                          </div>
                        </div>
                      </div>

                      {/* Spec Comparison Checklist */}
                      <div className="space-y-2.5 text-xs text-ink">
                        
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-ink-faint uppercase">
                            {lang === 'ar' ? 'المعالج (CPU)' : 'Processor'}
                          </span>
                          <span className="font-semibold text-navy leading-tight">{product.cpu}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-ink-faint uppercase">
                            {lang === 'ar' ? 'الذاكرة (RAM)' : 'Memory (RAM)'}
                          </span>
                          <span className="font-semibold text-navy">{product.ram}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-ink-faint uppercase">
                            {lang === 'ar' ? 'التخزين (SSD)' : 'Storage (SSD)'}
                          </span>
                          <span className="font-semibold text-navy">{product.ssd}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-ink-faint uppercase">
                            {lang === 'ar' ? 'الشاشة' : 'Display'}
                          </span>
                          <span className="font-semibold text-navy leading-tight">{product.display}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-lime-light border border-lime/20 flex items-center justify-between text-lime-dark font-bold">
                          <span className="text-[10px] uppercase">{lang === 'ar' ? 'صحة البطارية' : 'Battery Health'}</span>
                          <span className="font-mono text-xs">{product.batteryHealth}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-cyan-light border border-cyan/20 flex items-center justify-between text-cyan-hover font-bold">
                          <span className="text-[10px] uppercase">{lang === 'ar' ? 'فترة الضمان' : 'Warranty'}</span>
                          <span className="text-[11px]">{lang === 'ar' ? product.warrantyAr : product.warranty}</span>
                        </div>

                        {/* RAM / SSD Upgrade Options Comparison */}
                        <div className="p-2.5 rounded-xl bg-orange-light/50 border border-orange/20 flex flex-col gap-1 text-[11px]">
                          <span className="text-[10px] font-bold text-orange-dark uppercase block">
                            {lang === 'ar' ? 'خيارات ترقية الرام والتخزين' : 'RAM & SSD Upgrade Options'}
                          </span>
                          {product.upgradeOptions && (product.upgradeOptions.ramOptions?.length > 1 || product.upgradeOptions.ssdOptions?.length > 1) ? (
                            <div className="space-y-0.5">
                              {product.upgradeOptions.ramOptions?.filter(o => o.price > 0).map((opt, i) => (
                                <div key={`ram-${i}`} className="text-navy font-medium flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                                  <span>{lang === 'ar' ? (opt.labelAr || opt.label) : opt.label}</span>
                                </div>
                              ))}
                              {product.upgradeOptions.ssdOptions?.filter(o => o.price > 0).map((opt, i) => (
                                <div key={`ssd-${i}`} className="text-navy font-medium flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                                  <span>{lang === 'ar' ? (opt.labelAr || opt.label) : opt.label}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-ink-muted">
                              {lang === 'ar' ? 'المواصفات الأصلية المعتمدة (غير قابلة للترقية)' : 'Standard certified factory config'}
                            </span>
                          )}
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px]">
                          <span className="text-[10px] font-bold text-ink-faint uppercase block">
                            {lang === 'ar' ? 'الكيبورد والشاحن' : 'Keyboard & Accessories'}
                          </span>
                          <span>{lang === 'ar' ? 'عربي/إنجليزي ليزر + شاحن أصلي ثلاثي' : 'Backlit Arabic/English + OEM Charger'}</span>
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="pt-2 space-y-2">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('compare_drawer_order', product.sku, product.name)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-white text-xs font-black shadow-md transition-all"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>{lang === 'ar' ? 'اطلب عبر واتساب' : 'Order on WhatsApp'}</span>
                        </a>

                        <Link
                          href={`/inventory/${product.sku}`}
                          onClick={closeDrawer}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-navy border border-slate-200 text-xs font-bold transition-colors"
                        >
                          <span>{lang === 'ar' ? 'التفاصيل الكاملة' : 'View Full Details'}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>

                    </div>
                  );
                })}

                {/* Placeholder card if fewer than 3 */}
                {compareList.length < 3 && (
                  <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center text-ink-muted min-h-[300px]">
                    <Laptop className="w-10 h-10 text-slate-300 mb-3" />
                    <p className="text-xs font-bold text-navy mb-1">
                      {lang === 'ar' ? 'أضف جهازاً آخر للمقارنة' : 'Add another model'}
                    </p>
                    <p className="text-[11px] text-ink-muted mb-4 max-w-[200px]">
                      {lang === 'ar'
                        ? 'تصفح الكتالوج واضغط على "مقارنة" لإضافة حتى 3 أجهزة'
                        : 'Browse inventory and click "Compare" to view side-by-side specs'}
                    </p>
                    <Link
                      href="/inventory"
                      onClick={closeDrawer}
                      className="px-4 py-2 rounded-xl bg-cyan text-white text-xs font-bold hover:bg-cyan-hover transition-colors"
                    >
                      {lang === 'ar' ? 'تصفح الكتالوج' : 'Browse Catalog'}
                    </Link>
                  </div>
                )}

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-ink-muted shrink-0">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange" />
                <span>{lang === 'ar' ? 'جميع الأجهزة تخضع لفحص 90 نقطة وضمان محل 6 أشهر' : 'All laptops certified with 90-point inspection & 6-month shop warranty'}</span>
              </span>
              <button
                onClick={closeDrawer}
                className="px-5 py-2 rounded-xl bg-navy text-white font-bold hover:bg-navy-dark transition-colors"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
