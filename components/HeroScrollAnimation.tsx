'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { 
  ShieldCheck, 
  BatteryCharging, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Wifi, 
  Layers, 
  ChevronDown,
  HardDrive,
  Laptop
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function HeroScrollAnimation() {
  const { t, lang, dir } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  // Framer Motion scroll progress tracking with sticky scroll container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Dynamic transforms driven by scroll position
  const laptopRotateX = useTransform(smoothProgress, [0, 0.4, 1], [22, 0, -8]);
  const laptopScale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1.04, 0.98]);
  const laptopY = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, 50]);
  
  // Parallax badge transforms
  const badgeY1 = useTransform(smoothProgress, [0, 1], [30, -90]);
  const badgeY2 = useTransform(smoothProgress, [0, 1], [40, -120]);
  const badgeY3 = useTransform(smoothProgress, [0, 1], [-20, 60]);
  const screenGlowOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0.3, 0.85, 0.5]);

  // Featured models for interactive laptop screen preview
  const showcaseModels = [
    {
      name: 'Dell Latitude 5440',
      nameAr: 'ديل لاتيتيود 5440 للأعمال',
      price: 'OMR 149.000',
      cpu: 'Intel Core i5-1335U (13th Gen, 10-Core)',
      ram: '16GB DDR5 · 512GB PCIe Gen4 NVMe',
      battery: '92% Verified OEM Capacity',
      batteryAr: '92% سعة بطارية أصلية مفحوصة',
      tag: 'Bestseller',
      tagAr: 'الأكثر طلباً',
      sku: 'SVG-DL5440-R'
    },
    {
      name: 'HP EliteBook 830 G8 x360',
      nameAr: 'اتش بي اليتبوك 830 G8 قابل للطي',
      price: 'OMR 145.000',
      cpu: 'Intel Core i5-1145G7 vPro (Touch 360°)',
      ram: '16GB Dual-Channel · 512GB NVMe',
      battery: '88% Verified OEM Capacity',
      batteryAr: '88% سعة بطارية أصلية مفحوصة',
      tag: '2-in-1 Touch',
      tagAr: 'شاشة لمس 360°',
      sku: 'SVG-HP830G8-R'
    },
    {
      name: 'Dell Latitude 5450 AI Boost',
      nameAr: 'ديل لاتيتيود 5450 بمعالج الذكاء الاصطناعي',
      price: 'OMR 179.000',
      cpu: 'Intel Core Ultra 5 135U (Dedicated NPU)',
      ram: '16GB DDR5 5600MHz · 512GB Gen4',
      battery: '96% Verified OEM Capacity',
      batteryAr: '96% سعة بطارية أصلية مفحوصة',
      tag: '2024 AI Series',
      tagAr: 'سلسلة 2024 الذكية',
      sku: 'SVG-DL5450-R'
    }
  ];

  const currentModel = showcaseModels[activeModelIndex];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen lg:min-h-[155vh] bg-gradient-to-b from-navy-deep via-[#020A24] to-navy-dark text-white"
    >
      {/* Pinned Sticky Stage on Desktop / Smooth Flow on Mobile */}
      <div className="relative lg:sticky lg:top-0 min-h-screen lg:min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* High-Tech Circuit Background Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(0, 138, 216, 0.25) 0%, transparent 65%),
              linear-gradient(rgba(0, 138, 216, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 138, 216, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          }}
        />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Main Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
          
          {/* Left Column: Value Proposition & High-Converting CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan-light text-xs sm:text-sm font-bold tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
              <span className="w-2 h-2 rounded-full bg-lime -ml-4" />
              <span>{t.heroBadge}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12] mb-6"
            >
              {t.heroTitlePart1}
              <span className="text-orange bg-clip-text text-transparent bg-gradient-to-r from-orange via-amber-400 to-orange drop-shadow-sm">
                {t.heroTitleHighlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8"
            >
              <Link
                href="/inventory"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-orange hover:bg-orange-hover text-white font-extrabold text-base shadow-glow-orange transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.heroCtaBrowse}</span>
                <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Link>

              <a
                href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20want%20to%20visit%20your%20Ghala%20Heights%20showroom"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero_showroom_cta')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-base shadow-glow-lime transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.heroCtaShowroom}</span>
              </a>
            </motion.div>

            {/* Trust Guarantee Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 w-full pt-6 border-t border-white/10"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                <span className="font-semibold">{t.heroTagGrade}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <BatteryCharging className="w-4 h-4 text-cyan shrink-0" />
                <span className="font-semibold">{t.heroTagBattery}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <ShieldCheck className="w-4 h-4 text-orange shrink-0" />
                <span className="font-semibold">{t.heroTagWarranty}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-semibold">{t.heroTagDelivery}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Scroll-Driven Interactive Laptop Reveal & Floating Parallax Specs */}
          <div 
            className="lg:col-span-6 relative flex items-center justify-center py-6 lg:py-0 select-none"
            style={{ perspective: 1200 }}
          >
            
            {/* Main 3D Transforming Laptop Display */}
            <motion.div
              style={{
                rotateX: laptopRotateX,
                scale: laptopScale,
                y: laptopY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[530px] transition-transform duration-100 ease-out scale-[0.88] sm:scale-95 lg:scale-100 origin-top lg:origin-center"
            >
              {/* Dynamic Ambient Base Glow */}
              <motion.div 
                style={{ opacity: screenGlowOpacity }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-cyan/35 rounded-full blur-2xl -z-10" 
              />

              {/* Laptop Screen & Outer Bezel */}
              <div className="relative bg-gradient-to-b from-[#18233C] via-[#0E1729] to-[#0A101D] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-cyan/40 shadow-2xl backdrop-blur-xl">
                
                {/* Webcam & Dual Microphone Bar */}
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-dark/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#02050B] border border-cyan/50 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-cyan animate-pulse" />
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-lime/60" />
                </div>

                {/* High-Resolution Screen Matrix */}
                <div className="relative bg-[#020817] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-cyan/20 overflow-hidden text-start font-sans">
                  
                  {/* Tech Grid Backdrop on Screen */}
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(0,138,216,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,138,216,.2) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Top OS Status Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-lime/80" />
                      <span className="font-mono text-cyan-light ml-1 font-semibold">
                        {t.heroScreenDiagnosticEngine}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-lime flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
                        {t.heroScreenStatusReady}
                      </span>
                      <Wifi className="w-3 h-3 text-cyan" />
                    </div>
                  </div>

                  {/* Interactive Model Switcher Tabs on Laptop Screen */}
                  <div className="flex items-center gap-1.5 mb-3.5 pb-2 border-b border-white/5 overflow-x-auto no-scrollbar">
                    {showcaseModels.map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveModelIndex(idx)}
                        type="button"
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap transition-all ${
                          activeModelIndex === idx
                            ? 'bg-cyan text-white shadow-sm'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {lang === 'ar' ? m.tagAr : m.tag}
                      </button>
                    ))}
                  </div>

                  {/* Featured Laptop Model in Showcase */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan font-bold">
                        {t.heroScreenInventory}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight line-clamp-1">
                        {lang === 'ar' ? currentModel.nameAr : currentModel.name}
                      </h3>
                    </div>
                    <div className="text-end shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {t.heroScreenVat}
                      </span>
                      <div className="text-base sm:text-lg font-black text-orange font-mono">
                        {currentModel.price}
                      </div>
                    </div>
                  </div>

                  {/* Live Diagnostic Spec Checklist */}
                  <div className="space-y-2 mb-4 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan shrink-0" />
                        <span>{t.heroScreenCpuLabel}</span>
                      </span>
                      <span className="text-white font-bold text-[11px] truncate max-w-[200px] text-end">
                        {currentModel.cpu}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-orange shrink-0" />
                        <span>{t.heroScreenRamLabel}</span>
                      </span>
                      <span className="text-white font-bold text-[11px] truncate max-w-[200px] text-end">
                        {currentModel.ram}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-lime/10 border border-lime/30 text-lime">
                      <span className="flex items-center gap-1.5 font-bold">
                        <BatteryCharging className="w-3.5 h-3.5 shrink-0" />
                        <span>{t.heroScreenBatteryLabel}</span>
                      </span>
                      <span className="font-extrabold text-[11px]">
                        {lang === 'ar' ? currentModel.batteryAr : currentModel.battery}
                      </span>
                    </div>
                  </div>

                  {/* Screen Footer Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                    <span className="text-slate-400">{t.heroScreenLocation}</span>
                    <span className="text-cyan font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime shrink-0" />
                      <span>{t.heroScreenInspection}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Deck & Hinge Base */}
              <div className="relative -mt-2 mx-auto w-[104%] -left-[2%] h-7 sm:h-9 bg-gradient-to-b from-[#2B3958] via-[#1A2642] to-[#0A1122] rounded-b-2xl border-t border-cyan/40 border-b-2 border-black/80 shadow-2xl flex items-center justify-center">
                <div className="w-24 sm:w-32 h-1 bg-cyan/50 rounded-full shadow-glow-cyan" />
                <div className="absolute bottom-1 w-16 h-2 bg-black/40 rounded-sm" />
              </div>
            </motion.div>

            {/* Floating Parallax Node 1: High Performance CPU */}
            <motion.div
              style={{ y: badgeY1 }}
              className={`hidden sm:flex absolute z-20 items-center gap-3 p-3.5 rounded-2xl bg-navy-surface/95 backdrop-blur-md border border-cyan/40 shadow-card-hover ${
                dir === 'rtl' ? '-top-4 -right-4' : '-top-4 -left-4'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/20 text-cyan flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-[11px] text-cyan-light font-bold uppercase tracking-wider font-mono">
                  {t.heroFloatCpuTitle}
                </div>
                <div className="text-xs font-black text-white">
                  {t.heroFloatCpuSub}
                </div>
              </div>
            </motion.div>

            {/* Floating Parallax Node 2: Honest Battery Guarantee */}
            <motion.div
              style={{ y: badgeY2 }}
              className={`hidden sm:flex absolute z-20 items-center gap-3 p-3.5 rounded-2xl bg-navy-surface/95 backdrop-blur-md border border-lime/40 shadow-card-hover ${
                dir === 'rtl' ? '-bottom-6 -left-4' : '-bottom-6 -right-4'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-lime/20 text-lime flex items-center justify-center shrink-0">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-[11px] text-lime font-bold uppercase tracking-wider font-mono">
                  {t.heroFloatBatteryTitle}
                </div>
                <div className="text-xs font-black text-white">
                  {t.heroFloatBatterySub}
                </div>
              </div>
            </motion.div>

            {/* Floating Parallax Node 3: 6-Month Shop Warranty */}
            <motion.div
              style={{ y: badgeY3 }}
              className={`hidden sm:flex absolute top-1/2 z-20 items-center gap-3 p-3 rounded-2xl bg-navy-surface/95 backdrop-blur-md border border-orange/40 shadow-card-hover ${
                dir === 'rtl' ? '-left-6' : '-right-6'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-orange/20 text-orange flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-start">
                <div className="text-[10px] text-orange font-bold uppercase tracking-wider font-mono">
                  {t.heroFloatWarrantyTitle}
                </div>
                <div className="text-xs font-black text-white">
                  {t.heroFloatWarrantySub}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 mx-auto mt-4 sm:mt-6 flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-medium"
          onClick={() => {
            const el = document.getElementById('inventorySection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="tracking-wide uppercase text-[11px] font-mono text-cyan-light">
            {t.heroScrollPrompt}
          </span>
          <ChevronDown className="w-4 h-4 text-orange" />
        </motion.div>
      </div>
    </section>
  );
}
