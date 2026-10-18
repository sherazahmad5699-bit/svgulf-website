'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import { BlogPost } from '@/lib/adminTypes';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import {
  Clock,
  Calendar,
  User,
  Share2,
  Check,
  MessageCircle,
  Store,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Laptop,
  BookOpen
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

interface BlogPostClientProps {
  initialSlug: string;
  initialBlog?: BlogPost;
}

export default function BlogPostClient({ initialSlug, initialBlog }: BlogPostClientProps) {
  const { blogs, products, theme } = useSiteData();
  const { lang, dir } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Find blog post from dynamic context or server initialBlog
  const blog = blogs.find((b) => b.slug === initialSlug) || initialBlog;

  if (!blog) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8 text-center" dir={dir}>
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-navy mb-2">
            {lang === 'ar' ? 'المقال غير متوفر' : 'Article Not Found'}
          </h2>
          <p className="text-xs text-ink-muted mb-6">
            {lang === 'ar'
              ? 'المقال الذي تبحث عنه قد تم نقله أو حذفه. يمكنك تصفح باقي مقالات المدونة أو التواصل معنا.'
              : 'The requested guide could not be located. Browse our tech journal or speak with our Muscat hardware team.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/blog"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold text-xs shadow-md transition-all"
            >
              {lang === 'ar' ? 'تصفح جميع المقالات' : 'Browse All Guides'}
            </Link>
            <Link
              href="/inventory"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs transition-all"
            >
              {lang === 'ar' ? 'كتالوج الأجهزة' : 'Laptop Inventory'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = lang === 'ar' ? blog.titleAr : blog.title;
  const excerpt = lang === 'ar' ? blog.excerptAr : blog.excerpt;
  const content = lang === 'ar' ? blog.contentAr : blog.content;
  const readingTime = lang === 'ar' ? blog.readingTimeAr : blog.readingTime;
  const author = lang === 'ar' ? blog.authorAr || blog.author : blog.author;

  // Related products
  const relatedProducts = products.slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://svgulf.com/blog/${blog.slug}`;
  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${title}\n${currentUrl}`)}`;

  // Parse markdown-like content into clean HTML sections
  const renderFormattedContent = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-black text-navy mt-8 mb-4 border-b border-slate-200 pb-2"
          >
            {trimmed.replace('### ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('#### ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-navy mt-6 mb-2 text-orange">
            {trimmed.replace('#### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemText = trimmed.replace(/^[\*\-]\s+/, '');
        return (
          <li key={idx} className="ml-5 list-disc text-sm sm:text-base text-slate-700 leading-relaxed mb-2">
            {renderBoldSpan(itemText)}
          </li>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const itemText = trimmed.replace(/^\d+\.\s+/, '');
        return (
          <li key={idx} className="ml-5 list-decimal text-sm sm:text-base text-slate-700 leading-relaxed mb-2 font-medium">
            {renderBoldSpan(itemText)}
          </li>
        );
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          {renderBoldSpan(trimmed)}
        </p>
      );
    });
  };

  // Helper for **bold** text inside paragraphs
  const renderBoldSpan = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-navy">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <article className="bg-slate-50 min-h-screen pb-20" dir={dir}>
      {/* Header Stage */}
      <section className="bg-gradient-to-b from-navy-deep via-[#020A24] to-navy-dark text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <Breadcrumb
            items={[
              { label: 'Blog & Guides', labelAr: 'المدونة ودليل الشراء', href: '/blog' },
              { label: title, labelAr: title, href: `/blog/${blog.slug}` },
            ]}
          />

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {blog.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/10 text-cyan-light font-bold"
              >
                #{t}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-cyan-light/90 leading-relaxed">
            {excerpt}
          </p>

          {/* Meta Info */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70 font-mono">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-white">
                <User className="w-3.5 h-3.5 text-orange" />
                <span>{author}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-lime" />
                <span>{readingTime}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-light" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={shareWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-lime/20 hover:bg-lime/30 text-lime transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-lime" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'مشاركة' : 'Share')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
          {/* Main Article Image */}
          {blog.thumbnail && (
            <div className="relative w-full h-72 sm:h-96 rounded-2xl bg-slate-100 p-8 flex items-center justify-center border border-slate-200 mb-8">
              <Image
                src={blog.thumbnail}
                alt={title}
                width={500}
                height={320}
                className="object-contain max-h-full drop-shadow-xl"
                priority
              />
            </div>
          )}

          {/* Formatted Text Content */}
          <div className="prose prose-slate max-w-none text-ink">
            {renderFormattedContent(content)}
          </div>

          {/* Showroom & WhatsApp Consultation Box */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-navy via-navy-deep to-[#00175a] text-white border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-light font-bold">
              <Store className="w-4 h-4 text-orange" />
              <span>{lang === 'ar' ? 'معرض سمارت فيجن الخليج · مرتفعات غلا' : 'svGulf Showroom · Ghala Heights'}</span>
            </div>

            <h3 className="text-lg font-black text-white">
              {lang === 'ar'
                ? 'هل ترغب في فحص هذا اللابتوب شخصياً في مسقط؟'
                : 'Want to inspect these laptops in person in Muscat?'}
            </h3>

            <p className="text-xs text-slate-200 leading-relaxed">
              {lang === 'ar'
                ? 'تفضل بزيارة معرضنا في محل رقم 10 بمرتفعات غلا لمعاينة نسبة البطارية، دقة الشاشة، وفحص الهيكل العسكري قبل الشراء مع ضمان شامل 6 أشهر.'
                : 'Visit Shop No. 10 in Ghala Heights to verify OEM battery percentage, display uniformity, and keyboard response on our diagnostic station.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${(theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello svGulf, I read your article "${title}" and want to inquire about availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('article_bottom_cta')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-white text-xs font-bold shadow-md shadow-lime/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ar' ? 'استفسر الآن على واتساب' : `Inquire on WhatsApp (${theme?.contactNumbers?.primaryWhatsApp || '+968 94009501'})`}</span>
              </a>

              <Link
                href="/inventory"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
              >
                <Laptop className="w-3.5 h-3.5 text-cyan-light" />
                <span>{lang === 'ar' ? 'تصفح كافة الأجهزة المتاحة' : 'Browse Live Catalog'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Laptops Section */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-navy tracking-tight">
              {lang === 'ar' ? 'أجهزة موصى بها في المعرض' : 'Featured Laptops in Muscat Showroom'}
            </h2>
            <Link
              href="/inventory"
              className="text-xs font-bold text-orange hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض الكتالوج كاملاً' : 'View Full Catalog'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
