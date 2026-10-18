'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';
import HeroScrollAnimation from '@/components/HeroScrollAnimation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, BRANDS } from '@/data/products';
import { 
  ShieldCheck, 
  MapPin, 
  Truck, 
  BatteryCharging, 
  Laptop, 
  Monitor, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  MessageCircle, 
  Zap, 
  Compass,
  BookOpen,
  Clock 
} from 'lucide-react';
import { trackWhatsAppClick, trackFilterChange } from '@/lib/analytics';
import { useSiteData } from '@/components/SiteDataContext';

export default function HomeClient() {
  const { t, lang, dir } = useLanguage();
  const { products: dynamicProducts, blogs, theme } = useSiteData();
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeCatalog = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : PRODUCTS;

  // Filter products for the home live showcase
  const filteredProducts = activeCatalog.filter((p) => {

    if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = 
        p.name.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.cpu.toLowerCase().includes(q) ||
        p.ram.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    trackFilterChange('home_brand', brandId);
  };

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section with Scroll Animation */}
      <HeroScrollAnimation />

      {/* 2. Trust Proof Strip */}
      <section className="bg-white border-b border-ink-border py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-lime-light text-lime-dark flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-lime" />
            </div>
            <div>
              <h4 className="font-extrabold text-navy text-sm">{t.trust1Title}</h4>
              <p className="text-xs text-ink-muted leading-tight mt-0.5">{t.trust1Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-light text-cyan-hover flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-cyan" />
            </div>
            <div>
              <h4 className="font-extrabold text-navy text-sm">{t.trust2Title}</h4>
              <p className="text-xs text-ink-muted leading-tight mt-0.5">{t.trust2Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-orange-light text-orange-dark flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-orange" />
            </div>
            <div>
              <h4 className="font-extrabold text-navy text-sm">{t.trust3Title}</h4>
              <p className="text-xs text-ink-muted leading-tight mt-0.5">{t.trust3Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy-light flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h4 className="font-extrabold text-navy text-sm">{t.trust4Title}</h4>
              <p className="text-xs text-ink-muted leading-tight mt-0.5">{t.trust4Sub}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan font-bold bg-cyan-light px-3.5 py-1.5 rounded-xl border border-cyan/20">
            {lang === 'ar' ? 'فئات الأجهزة' : 'Hardware Categories'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy mt-3 mb-3">
            {t.catTitle}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted">
            {t.catSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category 1: Corporate Laptops */}
          <Link
            href="/inventory?brand=dell"
            className="group p-6 rounded-2xl bg-white border border-ink-border hover:border-cyan/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-subtle/10 text-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-extrabold text-lg text-navy mb-2 group-hover:text-cyan transition-colors">
                {t.catBusinessTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t.catBusinessDesc}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-cyan group-hover:translate-x-1 transition-transform">
              <span>{lang === 'ar' ? 'استعراض الأجهزة' : 'Explore Models'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </div>
          </Link>

          {/* Category 2: 2-in-1 Foldable Touch */}
          <Link
            href="/inventory?brand=hp"
            className="group p-6 rounded-2xl bg-white border border-ink-border hover:border-orange/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-light text-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-orange" />
              </div>
              <h3 className="font-extrabold text-lg text-navy mb-2 group-hover:text-orange transition-colors">
                {t.catTouchTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t.catTouchDesc}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-orange group-hover:translate-x-1 transition-transform">
              <span>{lang === 'ar' ? 'استعراض أجهزة اللمس' : 'Explore Touch'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </div>
          </Link>

          {/* Category 3: Apple MacBooks */}
          <Link
            href="/inventory?brand=apple"
            className="group p-6 rounded-2xl bg-white border border-ink-border hover:border-cyan/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-extrabold text-lg text-navy mb-2 group-hover:text-blue-700 transition-colors">
                {t.catAppleTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t.catAppleDesc}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>{lang === 'ar' ? 'استعراض الأجهزة' : 'Explore Models'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </div>
          </Link>

          {/* Category 4: Displays & Docks */}
          <Link
            href="/inventory?brand=accessories"
            className="group p-6 rounded-2xl bg-white border border-ink-border hover:border-navy/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Monitor className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-extrabold text-lg text-navy mb-2 group-hover:text-navy-light transition-colors">
                {t.catMonitorsTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t.catMonitorsDesc}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-navy group-hover:translate-x-1 transition-transform">
              <span>{lang === 'ar' ? 'استعراض الشاشات والملحقات' : 'Explore Accessories'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </div>
          </Link>

        </div>
      </section>

      {/* 4. Live Stock Showcase (Catalog Preview with Live Filter & Search) */}
      <section id="inventorySection" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-ink-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange-light px-3.5 py-1.5 rounded-xl border border-orange/20">
                {lang === 'ar' ? 'المخزون الحي في مسقط' : 'Live Muscat Stock'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy mt-3 mb-2">
                {t.stockTitle}
              </h2>
              <p className="text-sm text-ink-muted">
                {t.stockSubtitle}
              </p>
            </div>

            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white font-extrabold text-sm hover:bg-navy-light transition-colors self-start md:self-end"
            >
              <span>{t.viewAllInventory}</span>
              <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-ink-border mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Brand Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleBrandChange(b.id)}
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedBrand === b.id
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ar' ? b.labelAr : b.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full py-2 rounded-xl border border-ink-border text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan transition-colors ${
                  dir === 'rtl' ? 'pr-9 pl-4 text-right' : 'pl-9 pr-4 text-left'
                }`}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-ink-border">
              <Laptop className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy mb-1">
                {lang === 'ar' ? 'لم يتم العثور على أجهزة مطابقة' : 'No matching models found'}
              </h3>
              <p className="text-xs text-ink-muted mb-4">
                {lang === 'ar' 
                  ? 'جرب البحث باسم آخر أو تواصل معنا عبر واتساب للاستفسار عن الأجهزة القادمة' 
                  : 'Try searching with another keyword or ask us on WhatsApp for daily unlisted arrivals.'}
              </p>
              <a
                href={`https://wa.me/${(theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '')}?text=Hello%20Smart%20Vision%20Gulf,%20I%20am%20looking%20for%20a%20laptop`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('home_empty_state')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime text-white font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.orderWhatsApp}</span>
              </a>
            </div>
          )}

          {/* Bottom Catalog Link */}
          <div className="mt-12 text-center">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-orange hover:bg-orange-hover text-white font-extrabold text-base shadow-glow-orange transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.heroCtaBrowse}</span>
              <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Why Choose Us (Value & Peace of Mind) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-dark font-bold bg-lime-light px-3.5 py-1.5 rounded-xl border border-lime/20">
            {lang === 'ar' ? 'معايير الجودة والضمان' : 'Quality Assurance'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy mt-3 mb-3">
            {t.whyTitle}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted">
            {t.whySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 rounded-2xl bg-white border border-ink-border hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-lime-light text-lime flex items-center justify-center mb-5">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-navy mb-2">{t.why1Title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">{t.why1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink-border hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-light text-orange flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-navy mb-2">{t.why2Title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">{t.why2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink-border hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-light text-cyan flex items-center justify-center mb-5">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-navy mb-2">{t.why3Title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">{t.why3Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink-border hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-navy mb-2">{t.why4Title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">{t.why4Desc}</p>
          </div>

        </div>
      </section>

      {/* 6. Physical Showroom Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy-deep via-navy to-navy-dark text-white">
        <div className="max-w-7xl mx-auto rounded-3xl border border-white/10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange/20 border border-orange/40 text-orange-light text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5 text-orange" />
              <span>{t.showroomBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mb-4">
              {t.showroomHeading}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {t.showroomAddress}
            </p>
            <p className="text-xs text-cyan-light font-medium mb-6">
              {t.showroomDirections}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://maps.google.com/?q=Smart+Vision+Gulf+Ghala+Heights+Muscat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-extrabold text-sm shadow-glow-orange transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>{t.btnGoogleMaps}</span>
              </a>

              <a
                href={`https://wa.me/${(theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '')}?text=Hello%20Smart%20Vision%20Gulf,%20please%20send%20me%20your%20Ghala%20Heights%20location`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('home_showroom_banner')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-sm shadow-glow-lime transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.btnWhatsAppLocation}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white p-2 mx-auto mb-4 shadow-md flex items-center justify-center">
              <Image src="/logo.jpeg" alt="Smart Vision Gulf" width={72} height={72} className="w-auto h-auto max-w-full max-h-full object-contain" loading="lazy" />
            </div>
            <h3 className="text-lg font-black text-white">Smart Vision Gulf</h3>
            <p className="text-xs text-cyan-light font-mono mt-1 mb-4">Shop No. 10 · Ghala Heights</p>
            <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-slate-300 font-mono space-y-1 mb-4">
              <div>{t.showroomHoursWeek}</div>
              <div className="text-lime">{t.showroomHoursFri}</div>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'ar' 
                ? 'مواقف سيارات واسعة ومجانية أمام المحل مباشرة' 
                : 'Free spacious customer parking directly in front of the store.'}
            </p>
          </div>

        </div>
      </section>

      {/* 6.5 Latest Guides & Tech Articles */}
      {blogs && blogs.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange font-bold bg-orange/10 px-3.5 py-1.5 rounded-xl border border-orange/20">
                {lang === 'ar' ? 'المدونة ودليل الشراء' : 'Hardware Intelligence'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy mt-3">
                {lang === 'ar' ? 'أحدث التقارير وأدلة الشراء في مسقط' : 'Latest Buying Guides & Hardware Reviews'}
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange hover:underline shrink-0"
            >
              <span>{lang === 'ar' ? 'تصفح كافة المقالات' : 'Browse All Articles'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.filter((b) => b.published).slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <Link href={`/blog/${b.slug}`} className="relative h-44 bg-slate-100 p-4 flex items-center justify-center">
                  <Image
                    src={b.thumbnail || '/products/dell-latitude-5440.png'}
                    alt={b.title}
                    width={200}
                    height={130}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/90 text-navy font-bold shadow-sm">
                    <Clock className="w-3 h-3 text-orange" />
                    <span>{lang === 'ar' ? b.readingTimeAr : b.readingTime}</span>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-navy group-hover:text-orange transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${b.slug}`}>
                        {lang === 'ar' ? b.titleAr : b.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-ink-muted mt-2 line-clamp-2">
                      {lang === 'ar' ? b.excerptAr : b.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(b.publishedAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/blog/${b.slug}`}
                      className="text-xs font-bold text-orange hover:underline inline-flex items-center gap-1"
                    >
                      <span>{lang === 'ar' ? 'اقرأ المزيد' : 'Read Guide'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FAQ Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan font-bold bg-cyan-light px-3.5 py-1.5 rounded-xl border border-cyan/20">
            {lang === 'ar' ? 'الأسئلة الأكثر تكراراً' : 'Customer Inquiries'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy mt-3 mb-3">
            {t.faqTitle}
          </h2>
          <p className="text-sm text-ink-muted">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-ink-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  type="button"
                  className="w-full p-5 text-start font-black text-navy text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-orange' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-muted leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
