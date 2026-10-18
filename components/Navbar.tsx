'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Globe, 
  MessageCircle, 
  Laptop, 
  ShieldCheck, 
  Building2, 
  Zap,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCall } from '@/lib/analytics';
import { useSiteData } from './SiteDataContext';

export default function Navbar() {
  const { lang, toggleLang, t, dir } = useLanguage();
  const { theme } = useSiteData();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: t.navHome, icon: Laptop },
    { href: '/inventory', label: t.navInventory, icon: Zap },
    { href: '/showroom', label: t.navShowroom, icon: Building2 },
    { href: '/warranty', label: t.navWarranty, icon: ShieldCheck },
    { href: '/blog', label: lang === 'ar' ? 'المدونة' : 'Blog', icon: BookOpen },
    { href: '/contact', label: t.navContact, icon: MapPin },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const bannerText = theme?.announcementBanner?.enabled
    ? (lang === 'ar' ? theme.announcementBanner.textAr : theme.announcementBanner.textEn)
    : t.topDelivery;


  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white">
      {/* Top Notification Strip */}
      <div className="bg-navy-deep text-white text-xs border-b border-navy-subtle/50 py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-cyan-light font-medium">
              <Zap className="w-3.5 h-3.5 text-orange" />
              <span>{bannerText}</span>
            </span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-lime" />
              <span>{t.topShowroom}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden lg:flex items-center gap-1 text-white/70">
              <Clock className="w-3 h-3 text-cyan" />
              <span>{t.topHours}</span>
            </span>
            <a 
              href={`https://wa.me/${(theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '')}?text=Hello%20Smart%20Vision%20Gulf,%20I%20have%20an%20inquiry`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('navbar_top')}
              className="flex items-center gap-1.5 text-lime font-bold hover:underline"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span dir="ltr">{theme?.contactNumbers?.primaryWhatsApp || '+968 9400 9501'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-ink-border px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-navy/10 bg-white p-0.5 transition-transform group-hover:scale-105">
              <Image 
                src="/logo.jpeg" 
                alt="Smart Vision Gulf Logo" 
                width={48} 
                height={48} 
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-navy tracking-tight group-hover:text-navy-light transition-colors">
                  Smart Vision Gulf
                </span>
                <span className="bg-navy/10 text-navy font-bold text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                  svGulf
                </span>
              </div>
              <p className="text-[11px] font-semibold text-ink-muted -mt-0.5 tracking-wide">
                Muscat · Ghala Heights
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    active 
                      ? 'bg-navy text-white shadow-sm' 
                      : 'text-ink-muted hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-orange' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions: Language & WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleLang}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-ink-border bg-slate-50 text-navy font-bold text-xs hover:bg-slate-100 hover:border-cyan transition-all"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan" />
              <span>{t.navSwitchLang}</span>
            </button>

            <a
              href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20would%20like%20to%20inquire%20about%20your%20laptops"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('navbar_cta')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime text-white font-extrabold text-xs sm:text-sm hover:bg-lime-hover shadow-md hover:shadow-glow-lime transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.navOrderWhatsApp}</span>
            </a>
          </div>

          {/* Mobile Menu & Lang Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-ink-border bg-slate-50 text-navy font-bold text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-cyan" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-navy bg-slate-100 hover:bg-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-ink-border animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 pb-2">
              {navLinks.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm ${
                      active ? 'bg-navy text-white' : 'text-ink hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-orange' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 opacity-50 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </Link>
                );
              })}

              <div className="pt-2 mt-1 border-t border-slate-100">
                <a
                  href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('navbar_mobile_menu')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-lime text-white font-extrabold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.navOrderWhatsApp}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
