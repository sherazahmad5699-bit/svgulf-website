'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import {
  Laptop,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Plus,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Palette,
  Store,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { products, blogs, inquiries, theme } = useSiteData();
  const { lang, dir } = useLanguage();

  const totalProducts = products.length;
  const publishedBlogs = blogs.filter((b) => b.published).length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  const totalValuation = products.reduce((acc, p) => acc + (p.priceNumeric || 0), 0);

  const brandCounts = {
    dell: products.filter((p) => p.brand === 'dell').length,
    hp: products.filter((p) => p.brand === 'hp').length,
    lenovo: products.filter((p) => p.brand === 'lenovo').length,
    apple: products.filter((p) => p.brand === 'apple').length,
    accessories: products.filter((p) => p.brand === 'accessories').length,
  };

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8" dir={dir}>
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy via-navy-deep to-[#031548] border border-white/10 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange/20 text-orange font-mono text-xs font-bold mb-3 border border-orange/30">
              <Store className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'معرض مرتفعات غلا · مسقط' : 'Ghala Heights Showroom · Muscat'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'ar' ? 'لوحة تحكم سمارت فيجن الخليج' : 'svGulf Executive Dashboard'}
            </h1>
            <p className="text-sm text-cyan-light mt-1.5 max-w-2xl">
              {lang === 'ar'
                ? 'إدارة منتجات اللابتوبات، مقالات المدونة، بنرات الموقع وعروض الواتساب في مسقط بمرونة تامة.'
                : 'Manage certified laptop inventory, technical buying guides, promotional banners, and customer WhatsApp leads.'}
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-lg shadow-orange/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة لابتوب جديد' : 'Add New Laptop'}</span>
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-all"
            >
              <BookOpen className="w-4 h-4 text-cyan-light" />
              <span>{lang === 'ar' ? 'كتابة مقال' : 'Write Article'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Laptops */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60 mb-3">
            <span>{lang === 'ar' ? 'إجمالي الأجهزة المعروضة' : 'Catalog Products'}</span>
            <div className="w-8 h-8 rounded-xl bg-cyan/15 text-cyan-light flex items-center justify-center">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{totalProducts}</div>
          <div className="mt-2 text-xs text-cyan-light flex items-center gap-2">
            <span>Dell: {brandCounts.dell}</span>
            <span>·</span>
            <span>HP: {brandCounts.hp}</span>
            <span>·</span>
            <span>Lenovo: {brandCounts.lenovo}</span>
          </div>
        </div>

        {/* Catalog Value */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60 mb-3">
            <span>{lang === 'ar' ? 'قيمة المعروضات المقدرة' : 'Catalog Valuation'}</span>
            <div className="w-8 h-8 rounded-xl bg-lime/15 text-lime flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-lime font-mono">
            OMR {totalValuation.toFixed(3)}
          </div>
          <div className="mt-2 text-xs text-white/60">
            {lang === 'ar' ? 'شامل ضريبة القيمة المضافة 5%' : '5% Oman VAT inclusive'}
          </div>
        </div>

        {/* Customer Inquiries */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60 mb-3">
            <span>{lang === 'ar' ? 'طلبات واستفسارات العملاء' : 'Inquiries & Leads'}</span>
            <div className="w-8 h-8 rounded-xl bg-orange/15 text-orange flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-white font-mono">{inquiries.length}</span>
            {newInquiries > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-orange text-white text-xs font-bold font-mono">
                {newInquiries} {lang === 'ar' ? 'جديد' : 'New'}
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-white/60">
            {lang === 'ar' ? 'واتساب، المتجر ونماذج التواصل' : 'WhatsApp & contact form submissions'}
          </div>
        </div>

        {/* Published Articles */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60 mb-3">
            <span>{lang === 'ar' ? 'مقالات الدليل والمدونة' : 'Published Articles'}</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-light/15 text-cyan-light flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{publishedBlogs}</div>
          <div className="mt-2 text-xs text-cyan-light">
            {lang === 'ar' ? 'دليل الشراء وفحص العتاد مسقط' : 'Buying guides & Oman SEO ranking'}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Recent Inquiries & WhatsApp Leads */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'ar' ? 'أحدث استفسارات وطلبات العملاء' : 'Recent Customer Leads & Inquiries'}
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  {lang === 'ar' ? 'تواصل فوري عبر واتساب مسقط' : 'Real-time inquiries via WhatsApp & Contact Form'}
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs text-orange hover:underline font-bold flex items-center gap-1"
              >
                <span>{lang === 'ar' ? 'عرض الكل' : 'View All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentInquiries.length === 0 ? (
                <div className="py-8 text-center text-xs text-white/50">
                  {lang === 'ar' ? 'لا توجد طلبات جديدة حالياً' : 'No inquiries recorded yet.'}
                </div>
              ) : (
                recentInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${inq.name}, thank you for contacting Smart Vision Gulf regarding ${inq.subject}. How can we assist you today?`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-white">{inq.name}</span>
                          <span
                            className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold ${
                              inq.status === 'new'
                                ? 'bg-orange/20 text-orange'
                                : inq.status === 'contacted'
                                ? 'bg-cyan/20 text-cyan-light'
                                : 'bg-lime/20 text-lime'
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-[11px] text-white/40 font-mono">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-xs text-white/80 font-medium">{inq.subject}</div>
                        <div className="text-xs text-white/60 line-clamp-1">{inq.message}</div>
                        {inq.productName && (
                          <div className="text-[11px] text-cyan-light font-mono">
                            Laptop: {inq.productName}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime hover:bg-lime-hover text-white text-xs font-bold shadow-sm transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Theme Preview */}
          <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'ar' ? 'بنر الإعلانات والعروض النشط' : 'Active Announcement & Promo'}
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  {lang === 'ar' ? 'يظهر في أعلى صفحات المتجر' : 'Visible at the top of the live storefront'}
                </p>
              </div>
              <Link
                href="/admin/theme"
                className="text-xs text-orange hover:underline font-bold flex items-center gap-1"
              >
                <span>{lang === 'ar' ? 'تعديل البنر' : 'Customize'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-navy-deep border border-cyan/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-light">
                <Zap className="w-3.5 h-3.5 text-orange" />
                <span>{lang === 'ar' ? 'معاينة البنر الحي:' : 'Live Banner Text:'}</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {lang === 'ar' ? theme.announcementBanner.textAr : theme.announcementBanner.textEn}
              </div>
              <div className="text-xs text-white/60 font-mono">
                {lang === 'ar' ? 'رقم الواتساب النشط:' : 'Active WhatsApp:'} {theme.contactNumbers.primaryWhatsApp}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Inventory Highlights & Shortcuts */}
        <div className="space-y-6">
          {/* Inventory Snapshot */}
          <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h2 className="text-base font-bold text-white">
                {lang === 'ar' ? 'الأجهزة الأكثر طلباً' : 'Top Stock Highlight'}
              </h2>
              <Link
                href="/admin/products"
                className="text-xs text-orange hover:underline font-bold"
              >
                {lang === 'ar' ? 'الكتالوج' : 'Catalog'}
              </Link>
            </div>

            <div className="space-y-3">
              {products.slice(0, 4).map((p) => (
                <div
                  key={p.sku}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">
                      {lang === 'ar' ? p.nameAr : p.name}
                    </div>
                    <div className="text-white/50 font-mono text-[11px] mt-0.5">
                      {p.sku} · {p.condition}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-lime font-mono">{p.priceFormatted}</div>
                    <div className="text-[10px] text-cyan-light font-mono">
                      {p.batteryPercentage ? `${p.batteryPercentage}% OEM` : 'Verified'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Muscat Shop Details Card */}
          <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-xs space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Store className="w-4 h-4 text-orange" />
              <span>{lang === 'ar' ? 'بيانات فرع مسقط' : 'Muscat Store Details'}</span>
            </h3>
            <div className="text-white/80">
              <p className="font-semibold text-white">Smart Vision Gulf</p>
              <p className="text-white/60 mt-0.5">{theme.branding.shopAddress}</p>
            </div>
            <div className="pt-2 border-t border-white/10 text-white/60 space-y-1">
              <div>Phone: <span className="font-mono text-cyan-light">{theme.contactNumbers.phoneCall}</span></div>
              <div>WhatsApp: <span className="font-mono text-lime">{theme.contactNumbers.primaryWhatsApp}</span></div>
              <div>VAT: <span className="font-mono text-white">5% Sultanate of Oman</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
