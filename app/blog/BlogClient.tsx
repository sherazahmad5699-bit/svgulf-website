'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Store,
  MessageCircle,
  Tag,
  Star,
  ChevronRight
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function BlogClient() {
  const { blogs, theme } = useSiteData();
  const { lang, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.tags?.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set)];
  }, [blogs]);

  // Filter published blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      if (!b.published) return false;
      const matchTag = selectedTag === 'all' || b.tags?.includes(selectedTag);
      const q = searchQuery.toLowerCase();
      const matchQ =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.titleAr.includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.excerptAr.includes(q);
      return matchTag && matchQ;
    });
  }, [blogs, selectedTag, searchQuery]);

  // Featured hero blog
  const featuredBlog = useMemo(() => {
    return filteredBlogs.find((b) => b.featured) || filteredBlogs[0];
  }, [filteredBlogs]);

  // Regular grid blogs (excluding featured hero if present)
  const regularBlogs = useMemo(() => {
    if (!featuredBlog) return filteredBlogs;
    return filteredBlogs.filter((b) => b.id !== featuredBlog.id);
  }, [filteredBlogs, featuredBlog]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16" dir={dir}>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-navy-deep via-[#020A24] to-navy-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumb
            items={[
              { label: 'Tech Journal & Guides', labelAr: 'المدونة ودليل الشراء', href: '/blog' },
            ]}
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange/20 text-orange font-mono text-xs font-bold mb-4 border border-orange/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'سلطنة عُمان · مسقط' : 'Muscat Hardware Intelligence'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {lang === 'ar' ? (
                <>
                  أدلة الشراء ومقارنات العتاد في <span className="text-orange">مسقط</span>
                </>
              ) : (
                <>
                  svGulf Laptop Journal & <span className="text-orange">Buying Guides</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-cyan-light mt-3 leading-relaxed">
              {lang === 'ar'
                ? 'تقارير فنية موثقة، مقارنات هندسية بين ديل واتش بي، وإرشادات اختيار لابتوب الأعمال المثالي في سلطنة عُمان مع ضمان معتمد.'
                : 'In-depth engineering reviews, thermal comparisons, and practical buying guides for certified business laptops in Muscat, Oman.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Search & Tag Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث في مقالات وأدلة اللابتوبات...' : 'Search articles and buying guides...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-ink placeholder-slate-400 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all"
            />
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  selectedTag === tag
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-ink'
                }`}
              >
                {tag === 'all' ? (lang === 'ar' ? 'كافة المواضيع' : 'All Topics') : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Hero Article */}
        {featuredBlog && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy via-[#00175a] to-navy-dark text-white border border-white/10 shadow-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-orange text-white font-mono text-[10px] font-bold uppercase">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{lang === 'ar' ? 'مقال مميز' : 'Featured Guide'}</span>
                  </span>
                  <span className="text-xs text-cyan-light font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? featuredBlog.readingTimeAr : featuredBlog.readingTime}</span>
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/60 font-mono">
                    {new Date(featuredBlog.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug group-hover:text-cyan-light transition-colors">
                  <Link href={`/blog/${featuredBlog.slug}`}>
                    {lang === 'ar' ? featuredBlog.titleAr : featuredBlog.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed">
                  {lang === 'ar' ? featuredBlog.excerptAr : featuredBlog.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-lg shadow-orange/30 transition-all"
                  >
                    <span>{lang === 'ar' ? 'قراءة الدليل كاملاً' : 'Read Full Guide'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] h-60 bg-white/5 rounded-2xl border border-white/10 p-6 flex items-center justify-center">
                  <Image
                    src={featuredBlog.thumbnail || '/products/dell-latitude-5440.png'}
                    alt={featuredBlog.title}
                    width={260}
                    height={180}
                    className="object-contain max-h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-navy tracking-tight">
              {lang === 'ar' ? 'أحدث التقارير والمراجعات' : 'Latest Articles & Reviews'}
            </h2>
            <span className="text-xs text-ink-muted font-mono">
              {filteredBlogs.length} {lang === 'ar' ? 'مقال متوفر' : 'guides available'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularBlogs.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Image */}
                <Link href={`/blog/${b.slug}`} className="relative h-48 bg-slate-100 p-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src={b.thumbnail || '/products/dell-latitude-5440.png'}
                    alt={b.title}
                    width={220}
                    height={140}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm text-navy font-bold shadow-sm">
                    <Clock className="w-3 h-3 text-orange" />
                    <span>{lang === 'ar' ? b.readingTimeAr : b.readingTime}</span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-ink-muted mb-2 font-mono">
                      <span>{new Date(b.publishedAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{b.author}</span>
                    </div>

                    <h3 className="text-base font-bold text-navy group-hover:text-orange transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${b.slug}`}>
                        {lang === 'ar' ? b.titleAr : b.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-ink-muted mt-2 line-clamp-3 leading-relaxed">
                      {lang === 'ar' ? b.excerptAr : b.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      {b.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${b.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange hover:underline"
                    >
                      <span>{lang === 'ar' ? 'التفاصيل' : 'Read More'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* WhatsApp & Showroom Help Callout */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-lime font-mono">
              <Store className="w-4 h-4" />
              <span>{lang === 'ar' ? 'معرض مرتفعات غلا · مسقط' : 'Ghala Heights Showroom Advice'}</span>
            </div>
            <h3 className="text-lg font-black text-navy">
              {lang === 'ar' ? 'هل تحتاج إلى استشارة لاختيار لابتوبك المناسب؟' : 'Need personalized laptop advice in Muscat?'}
            </h3>
            <p className="text-xs text-ink-muted">
              {lang === 'ar'
                ? 'مهندسونا متاحون يومياً لمساعدتك عبر واتساب أو بزيارة المتجر في غلا.'
                : 'Our hardware engineers are available via WhatsApp or in-person at Shop 10, Ghala Heights.'}
            </p>
          </div>

          <a
            href={`https://wa.me/${(theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '')}?text=Hello%20svGulf,%20I%20read%20your%20blog%20and%20need%20advice%20choosing%20a%20laptop`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('blog_cta_banner')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime hover:bg-lime-hover text-white text-xs font-bold shadow-md shadow-lime/20 transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{lang === 'ar' ? 'استشر مهندسنا على واتساب' : 'Chat with Laptop Specialist'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
