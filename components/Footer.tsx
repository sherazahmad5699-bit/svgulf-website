'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Instagram, 
  MessageCircle, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-navy-subtle/40 pt-16 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-navy-subtle/30">
          
          {/* Col 1: Brand Info & Address (Col 5) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 border border-white/20">
                <Image 
                  src="/logo.jpeg" 
                  alt="Smart Vision Gulf" 
                  width={48} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-white text-lg font-black tracking-tight">Smart Vision Gulf</h3>
                <span className="text-xs font-mono text-cyan-light font-bold">svGulf · Muscat, Oman</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {t.footerBrandDesc}
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <span>Shop No. 10, Ghala Heights, Wilayat Bausher, Muscat</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan shrink-0" />
                <span>{t.showroomHoursWeek}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lime shrink-0" />
                <span dir="ltr">+968 9400 9501 / +968 9600 9404</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/svgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-subtle text-white text-xs font-bold hover:bg-orange transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@svgulf</span>
              </a>

              <a
                href="https://wa.me/96894009501"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-lime/20 text-lime text-xs font-bold hover:bg-lime hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Col 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              {t.footerNavTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan transition-colors">
                  {t.navHome}
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="hover:text-cyan transition-colors">
                  {t.navInventory}
                </Link>
              </li>
              <li>
                <Link href="/showroom" className="hover:text-cyan transition-colors">
                  {t.navShowroom}
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-cyan transition-colors">
                  {t.navWarranty}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan transition-colors">
                  {t.navContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              {lang === 'ar' ? 'أشهر الأجهزة' : 'Popular Categories'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <Link href="/inventory?brand=dell" className="hover:text-white transition-colors">
                  Dell Latitude 5440 / 5450 AI
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <Link href="/inventory?brand=hp" className="hover:text-white transition-colors">
                  HP EliteBook 830 G8 x360 Touch
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <Link href="/inventory?brand=apple" className="hover:text-white transition-colors">
                  Apple MacBook Air M1 / M2 / Pro M3
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <Link href="/inventory?brand=accessories" className="hover:text-white transition-colors">
                  Dell P2422H 24&quot; IPS Business Monitors
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <Link href="/inventory?brand=accessories" className="hover:text-white transition-colors">
                  HP USB-C Universal 100W Docking Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Assurance & Badges (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              {t.footerLegalTitle}
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-navy-subtle/40 border border-white/10 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">6-Month Shop Warranty</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">7-Day instant swap guarantee on factory defect</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-subtle/40 border border-white/10 flex items-start gap-2.5">
                <Zap className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">Cash on Delivery (COD)</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Muscat same-day & courier to all governorates</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-start">
          <p>{t.footerVatNote}</p>
          <p>{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
