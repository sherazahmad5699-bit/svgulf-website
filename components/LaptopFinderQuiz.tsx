'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { useSiteData } from './SiteDataContext';
import { Product } from '@/data/products';
import { 
  Sparkles, 
  HelpCircle, 
  Laptop, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  MessageCircle, 
  Cpu, 
  Layers, 
  ShieldCheck,
  Building,
  GraduationCap,
  Code2,
  Briefcase,
  Monitor,
  Coins,
  Compass
} from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function LaptopFinderQuiz() {
  const { lang, dir } = useLanguage();
  const { products, theme } = useSiteData();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState({
    usage: '',
    screenSize: '',
    budget: '',
    brand: '',
  });

  const usageOptions = [
    {
      id: 'office',
      icon: Briefcase,
      titleEn: 'Office, Business & Accounting',
      titleAr: 'الأعمال المكتبية والمحاسبة',
      descEn: 'Excel, accounting software, CRM, multi-window office work',
      descAr: 'إكسل، برامج المحاسبة، فواتير وإدارة الأعمال اليومية',
    },
    {
      id: 'student',
      icon: GraduationCap,
      titleEn: 'University & College Studies',
      titleAr: 'الدراسة والجامعة',
      descEn: 'Research, engineering reports, portable design for daily campus commute',
      descAr: 'الأبحاث والتقارير وتصميم المحتوى بحجم خفيف ومناسب للتنقل',
    },
    {
      id: 'developer',
      icon: Code2,
      titleEn: 'Coding & Software Engineering',
      titleAr: 'البرمجة وهندسة البرمجيات',
      descEn: 'VS Code, virtualization, Docker, compiling, 16GB to 32GB RAM performance',
      descAr: 'كتابة الأكواد والبيئات الافتراضية مع رامات 16 أو 32 جيجابايت',
    },
    {
      id: 'executive',
      icon: Building,
      titleEn: 'Executive & Sleek Travel',
      titleAr: 'المدراء والتنقل السريع',
      descEn: 'Slim premium finish, long battery runtime, high-end meeting presence',
      descAr: 'تصميم فائق النحافة، بطارية تدوم طويلاً، ومظهر احترافي فاخر',
    },
  ];

  const screenSizeOptions = [
    {
      id: '13',
      titleEn: '13.3" Ultra-Portable',
      titleAr: '13.3 بوصة (خفيف وفائق التنقل)',
      descEn: 'Fits in any backpack, ideal for travel and cafe study',
      descAr: 'وزن خفيف جداً، مثالي للسفر ومقاهي العمل والدراسة',
    },
    {
      id: '14',
      titleEn: '14.0" Enterprise Standard',
      titleAr: '14.0 بوصة (المعيار الذهبي للأعمال)',
      descEn: 'The perfect balance of screen real estate and desk mobility',
      descAr: 'التوازن المثالي بين حجم الشاشة والراحة أثناء العمل',
    },
    {
      id: '15',
      titleEn: '15.6" Desktop Replacement',
      titleAr: '15.6 بوصة (شاشة كبيرة ومريحة)',
      descEn: 'Spacious display with full keypad for data and multi-tasking',
      descAr: 'مساحة عرض واسعة ومريحة للأرقام وتعدد النوافذ',
    },
  ];

  const budgetOptions = [
    {
      id: 'budget_low',
      titleEn: 'Under OMR 130',
      titleAr: 'أقل من 130 ر.ع.',
      descEn: 'Maximum value, enterprise Core i5 with 6-month shop warranty',
      descAr: 'قيمة اقتصادية ممتازة، أجهزة أعمال مفحوصة ومضمونة',
    },
    {
      id: 'budget_mid',
      titleEn: 'OMR 130 - OMR 175',
      titleAr: '130 إلى 175 ر.ع.',
      descEn: 'Sweet spot: 16GB RAM, modern 12th/13th Gen CPU, pristine Grade A++',
      descAr: 'الفئة الأكثر طلباً: رامات 16 جيجا ومعالجات الجيل 12/13 الحديثة',
    },
    {
      id: 'budget_high',
      titleEn: 'OMR 175 and above',
      titleAr: '175 ر.ع. فأكثر',
      descEn: 'Flagship AI Core Ultra, 32GB RAM or Apple MacBook Retina',
      descAr: 'أجهزة القمة: معالجات الذكاء الاصطناعي الحديثة وماك بوك',
    },
  ];

  const brandOptions = [
    {
      id: 'all',
      titleEn: 'Any Brand (Recommend Best Value)',
      titleAr: 'أي ماركة (اختر لي أفضل قيمة)',
      descEn: 'Show the highest matched enterprise laptop regardless of manufacturer',
      descAr: 'عرض أفضل جهاز يطابق احتياجاتك وميزانيتك من كافة الماركات',
    },
    {
      id: 'dell',
      titleEn: 'Dell Latitude',
      titleAr: 'ديل (Dell Latitude)',
      descEn: 'Legendary business workhorse, tested durability, easy spare parts',
      descAr: 'الاعتمادية العالية، هيكل قوي، وتوفر قطع الغيار بسهولة في مسقط',
    },
    {
      id: 'hp',
      titleEn: 'HP EliteBook',
      titleAr: 'إتش بي (HP EliteBook)',
      descEn: 'Sleek all-metal CNC aluminum, crisp Bang & Olufsen audio',
      descAr: 'هيكل ألمنيوم فخم، شاشة نقية، وصوت فائق الجودة',
    },
    {
      id: 'lenovo',
      titleEn: 'Lenovo ThinkPad',
      titleAr: 'لينوفو ثينك باد (ThinkPad)',
      descEn: 'Ergonomic keyboard world standard, military-grade MIL-SPEC body',
      descAr: 'أفضل كيبورد في العالم وتحمل معايير الخدمة الشاقة',
    },
    {
      id: 'apple',
      titleEn: 'Apple MacBook',
      titleAr: 'آبل ماك بوك (MacBook)',
      descEn: 'Retina display, all-day battery efficiency, macOS ecosystem',
      descAr: 'شاشة ريتينا دقيقة، بطارية تدوم يوماً كاملاً، ونظام ماك السلس',
    },
  ];

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setCurrentStep((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setAnswers({ usage: '', screenSize: '', budget: '', brand: '' });
    setCurrentStep(0);
  };

  // Algorithm to score and rank recommendations
  const getRecommendations = (): { product: Product; matchScore: number }[] => {
    const laptopsOnly = products.filter((p) => p.category === 'laptop' || p.category === 'ultrabook' || p.category === 'workstation');
    
    const scored = laptopsOnly.map((laptop) => {
      let score = 70; // baseline

      // Brand preference
      if (answers.brand !== 'all') {
        if (laptop.brand === answers.brand) score += 20;
        else score -= 15;
      } else {
        score += 10;
      }

      // Budget preference
      if (answers.budget === 'budget_low') {
        if (laptop.priceNumeric < 130) score += 25;
        else if (laptop.priceNumeric <= 150) score += 5;
        else score -= 20;
      } else if (answers.budget === 'budget_mid') {
        if (laptop.priceNumeric >= 125 && laptop.priceNumeric <= 175) score += 25;
        else score += 5;
      } else if (answers.budget === 'budget_high') {
        if (laptop.priceNumeric >= 170) score += 25;
        else if (laptop.priceNumeric >= 150) score += 10;
        else score -= 10;
      }

      // Screen size preference
      if (answers.screenSize === '13') {
        if (laptop.display.includes('13.') || laptop.name.includes('13')) score += 20;
        else if (laptop.display.includes('14.')) score += 5;
      } else if (answers.screenSize === '14') {
        if (laptop.display.includes('14.') || laptop.name.includes('14')) score += 20;
      } else if (answers.screenSize === '15') {
        if (laptop.display.includes('15.') || laptop.display.includes('16.')) score += 25;
        else score -= 10;
      }

      // Usage match
      if (answers.usage === 'developer') {
        if (laptop.ram.includes('32GB') || laptop.cpu.includes('i7') || laptop.cpu.includes('Ultra')) score += 20;
        if (laptop.ram.includes('16GB')) score += 10;
      } else if (answers.usage === 'executive') {
        if (laptop.brand === 'apple' || laptop.name.includes('EliteBook') || laptop.name.includes('5450')) score += 20;
      } else if (answers.usage === 'student') {
        if (laptop.priceNumeric <= 150) score += 15;
        if (laptop.display.includes('13.') || laptop.display.includes('14.')) score += 10;
      } else if (answers.usage === 'office') {
        if (laptop.brand === 'dell' || laptop.brand === 'hp') score += 15;
      }

      // Cap match percentage nicely between 88% and 99%
      const matchScore = Math.min(99, Math.max(86, score));
      return { product: laptop, matchScore };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    return scored.slice(0, 3);
  };

  const recommendations = currentStep === 4 ? getRecommendations() : [];
  const primaryPhone = (theme?.contactNumbers?.primaryWhatsApp || '96894009501').replace(/[^0-9]/g, '');

  return (
    <div className="bg-white rounded-3xl border border-ink-border p-6 sm:p-10 shadow-lg relative overflow-hidden" dir={dir}>
      {/* Decorative background accent */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan/10 to-orange/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
      />

      {/* Header */}
      <div className="relative z-10 max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-light text-orange-dark text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>{lang === 'ar' ? 'مستشار اختيار اللابتوب الذكي' : 'Interactive Laptop Finder Wizard'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
          {lang === 'ar' ? 'اعثر على اللابتوب المثالي لعملك في 30 ثانية' : 'Find Your Perfect Enterprise Laptop in 30 Seconds'}
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-2">
          {lang === 'ar'
            ? 'أجب عن 4 أسئلة سريعة لنرشح لك أفضل 3 أجهزة مفحوصة ومضمونة تناسب ميزانيتك وطبيعة عملك في مسقط.'
            : 'Answer 4 quick questions to get matched with the top 3 certified Grade A++ laptops for your specific Muscat workflow.'}
        </p>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="mt-5 flex items-center gap-2">
            {[0, 1, 2, 3].map((stepIdx) => (
              <div
                key={stepIdx}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  currentStep >= stepIdx ? 'bg-orange' : 'bg-slate-200'
                }`}
              />
            ))}
            <span className="text-xs font-bold font-mono text-ink-faint ml-2">
              {currentStep + 1} / 4
            </span>
          </div>
        )}
      </div>

      {/* Question 1: Usage */}
      {currentStep === 0 && (
        <div className="relative z-10 space-y-4 animate-fade-in">
          <h4 className="text-base sm:text-lg font-black text-navy">
            {lang === 'ar' ? '1. ما هو الغرض الأساسي من استخدامك للابتوب؟' : '1. What is the primary purpose for this laptop?'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usageOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect('usage', opt.id)}
                  className="p-5 rounded-2xl border-2 border-slate-200 hover:border-cyan hover:bg-cyan/5 transition-all text-start flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-cyan group-hover:text-white text-navy flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-extrabold text-navy text-sm group-hover:text-cyan transition-colors">
                      {lang === 'ar' ? opt.titleAr : opt.titleEn}
                    </div>
                    <div className="text-xs text-ink-muted mt-1 leading-relaxed">
                      {lang === 'ar' ? opt.descAr : opt.descEn}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Question 2: Screen Size */}
      {currentStep === 1 && (
        <div className="relative z-10 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-lg font-black text-navy">
              {lang === 'ar' ? '2. ما هو حجم الشاشة المفضل لديك؟' : '2. What screen size do you prefer?'}
            </h4>
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="text-xs font-bold text-ink-muted hover:text-navy flex items-center gap-1"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              <span>{lang === 'ar' ? 'السابق' : 'Back'}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {screenSizeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('screenSize', opt.id)}
                className="p-5 rounded-2xl border-2 border-slate-200 hover:border-cyan hover:bg-cyan/5 transition-all text-start flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-cyan group-hover:text-white text-navy flex items-center justify-center mb-3 transition-colors">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-navy text-sm group-hover:text-cyan transition-colors">
                    {lang === 'ar' ? opt.titleAr : opt.titleEn}
                  </div>
                  <div className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {lang === 'ar' ? opt.descAr : opt.descEn}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 3: Budget */}
      {currentStep === 2 && (
        <div className="relative z-10 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-lg font-black text-navy">
              {lang === 'ar' ? '3. ما هي ميزانيتك التقديرية بالريال العُماني؟' : '3. What is your target budget in OMR?'}
            </h4>
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="text-xs font-bold text-ink-muted hover:text-navy flex items-center gap-1"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              <span>{lang === 'ar' ? 'السابق' : 'Back'}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {budgetOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('budget', opt.id)}
                className="p-5 rounded-2xl border-2 border-slate-200 hover:border-orange hover:bg-orange/5 transition-all text-start flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-light text-orange flex items-center justify-center mb-3">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-navy text-sm group-hover:text-orange transition-colors">
                    {lang === 'ar' ? opt.titleAr : opt.titleEn}
                  </div>
                  <div className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {lang === 'ar' ? opt.descAr : opt.descEn}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 4: Brand Preference */}
      {currentStep === 3 && (
        <div className="relative z-10 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-lg font-black text-navy">
              {lang === 'ar' ? '4. هل تفضل علامة تجارية معينة؟' : '4. Do you have a preferred brand?'}
            </h4>
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="text-xs font-bold text-ink-muted hover:text-navy flex items-center gap-1"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              <span>{lang === 'ar' ? 'السابق' : 'Back'}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {brandOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('brand', opt.id)}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-cyan hover:bg-cyan/5 transition-all text-start flex flex-col justify-between group"
              >
                <div>
                  <div className="font-extrabold text-navy text-xs sm:text-sm group-hover:text-cyan transition-colors">
                    {lang === 'ar' ? opt.titleAr : opt.titleEn}
                  </div>
                  <div className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    {lang === 'ar' ? opt.descAr : opt.descEn}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Final Step: Recommendations Showcase */}
      {currentStep === 4 && (
        <div className="relative z-10 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold text-lime-dark bg-lime-light px-3 py-1 rounded-md">
                {lang === 'ar' ? 'الترشيحات المتوافقة 100%' : 'Best Matched Recommendations'}
              </span>
              <h4 className="text-xl font-black text-navy mt-1">
                {lang === 'ar' ? 'أفضل 3 أجهزة تم اختيارها لك بعناية' : 'Top 3 Recommended Laptops for You'}
              </h4>
            </div>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-ink-muted hover:text-navy transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إعادة الاختبار' : 'Retake Quiz'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(({ product, matchScore }, idx) => {
              const waText = lang === 'ar'
                ? encodeURIComponent(
                    `مرحباً سمارت فيجن جلف، قمت بإجراء اختبار مستشار اللابتوب وظهر لي الجهاز المرشح:\n` +
                    `• الموديل: ${product.nameAr}\n` +
                    `• الكود: ${product.sku}\n` +
                    `• نسبة التطابق: ${matchScore}%\n` +
                    `• السعر: ${product.priceFormatted}\n\n` +
                    `أود الاستفسار عن التوفر والحجز لتجربته في غلا هايتس أو التوصيل.`
                  )
                : encodeURIComponent(
                    `Hello Smart Vision Gulf, I completed your Laptop Finder Quiz and was recommended:\n` +
                    `• Product: ${product.name}\n` +
                    `• SKU: ${product.sku}\n` +
                    `• Match: ${matchScore}%\n` +
                    `• Price: ${product.priceFormatted}\n\n` +
                    `Please confirm availability for delivery or showroom inspection.`
                  );
              const waLink = `https://wa.me/${primaryPhone}?text=${waText}`;

              return (
                <div
                  key={product.sku}
                  className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-cyan hover:shadow-card-hover transition-all"
                >
                  <div>
                    {/* Top match badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-orange text-white px-2.5 py-1 rounded-md">
                        #{idx + 1} {matchScore}% {lang === 'ar' ? 'توافق' : 'Match'}
                      </span>
                      <span className="text-xs font-mono font-bold text-ink-faint">
                        {product.brandLabel}
                      </span>
                    </div>

                    <h5 className="font-extrabold text-navy text-sm sm:text-base leading-tight mb-2">
                      {lang === 'ar' ? product.nameAr : product.name}
                    </h5>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 mb-3">
                      <div className="text-2xl font-black text-navy font-mono">
                        {product.priceFormatted}
                      </div>
                      <div className="text-[10px] text-lime-dark font-bold">
                        {lang === 'ar' ? 'شامل ضريبة القيمة المضافة 5%' : '5% Oman VAT Included'}
                      </div>
                    </div>

                    {/* Specs list */}
                    <div className="space-y-1.5 text-xs text-ink-muted">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Cpu className="w-3.5 h-3.5 text-cyan shrink-0" />
                        <span className="line-clamp-1">{product.cpu}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Layers className="w-3.5 h-3.5 text-cyan shrink-0" />
                        <span>{product.ram} · {product.ssd}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-lime shrink-0" />
                        <span>{lang === 'ar' ? product.warrantyAr : product.warranty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick('quiz_recommendation_order', product.sku, product.name)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-white text-xs font-black shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{lang === 'ar' ? 'طلب فوري عبر واتساب' : 'Order via WhatsApp'}</span>
                    </a>

                    <Link
                      href={`/inventory/${product.sku}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-navy border border-slate-200 text-xs font-bold transition-colors"
                    >
                      <span>{lang === 'ar' ? 'تفاصيل الجهاز' : 'View Laptop Specs'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-cyan-light text-navy text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-semibold">
              {lang === 'ar'
                ? 'هل ترغب في فحص هذه الأجهزة شخصياً؟ تفضل بزيارة معرضنا في غلا هايتس، مسقط.'
                : 'Want to inspect and test these exact laptops in person? Visit our showroom at Shop 10 Ghala Heights.'}
            </span>
            <Link
              href="/showroom"
              className="inline-flex items-center gap-1 font-bold text-cyan hover:underline shrink-0"
            >
              <span>{lang === 'ar' ? 'موقع ومواعيد المعرض' : 'Showroom Directions'}</span>
              <Compass className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
