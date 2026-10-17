'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { Product, PRODUCTS } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { trackWhatsAppClick } from '@/lib/analytics';
import { 
  ChevronRight, 
  BatteryCharging, 
  ShieldCheck, 
  MessageCircle, 
  Check, 
  Sparkles, 
  Laptop, 
  Cpu, 
  Settings,
  Monitor,
  HardDrive,
  Layers,
  Truck,
  ArrowLeft
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { lang, t, dir } = useLanguage();

  const isAccessory = product.category === 'monitor' || product.category === 'accessory';

  // Related products for internal cross-linking
  const relatedProducts = PRODUCTS.filter(p => p.sku !== product.sku).slice(0, 4);

  // Configurator Upgrade State
  const initialRamLabel = product.upgradeOptions?.ramOptions?.[0]?.label || 'Standard Included';
  const initialRamLabelAr = product.upgradeOptions?.ramOptions?.[0]?.labelAr || 'الأساسي المعتمد';
  const initialSsdLabel = product.upgradeOptions?.ssdOptions?.[0]?.label || 'Standard Included';
  const initialSsdLabelAr = product.upgradeOptions?.ssdOptions?.[0]?.labelAr || 'الأساسي المعتمد';

  const [selectedRamUpgrade, setSelectedRamUpgrade] = useState<number>(0);
  const [selectedRamLabel, setSelectedRamLabel] = useState<string>(initialRamLabel);
  const [selectedRamLabelAr, setSelectedRamLabelAr] = useState<string>(initialRamLabelAr);

  const [selectedSsdUpgrade, setSelectedSsdUpgrade] = useState<number>(0);
  const [selectedSsdLabel, setSelectedSsdLabel] = useState<string>(initialSsdLabel);
  const [selectedSsdLabelAr, setSelectedSsdLabelAr] = useState<string>(initialSsdLabelAr);

  const [deliveryMethod, setDeliveryMethod] = useState<string>('Muscat Same-Day Delivery (Cash on Delivery)');
  const [deliveryMethodAr, setDeliveryMethodAr] = useState<string>('توصيل في نفس اليوم داخل مسقط (كاش عند الاستلام)');

  const deliveryOptions = [
    {
      id: 'muscat-cod',
      value: 'Muscat Same-Day Delivery (Cash on Delivery)',
      valueAr: 'توصيل في نفس اليوم داخل مسقط (كاش عند الاستلام)',
      label: 'Same-Day Delivery across Muscat (Cash on Delivery)',
      labelAr: 'توصيل في نفس اليوم داخل مسقط (الدفع عند الاستلام)'
    },
    {
      id: 'governorates-cod',
      value: 'Other Governorates (Salalah, Sohar, Nizwa - COD)',
      valueAr: 'شحن لباقي المحافظات (صلالة، صحار، نزوى - دفع عند الاستلام)',
      label: 'Delivery to Other Governorates (COD via Express Courier)',
      labelAr: 'شحن للمحافظات: صلالة، صحار، نزوى (دفع عند الاستلام)'
    },
    {
      id: 'showroom-pickup',
      value: 'Showroom Pickup at Shop 10 Ghala Heights',
      valueAr: 'استلام شخصي وتجربة من المعرض (محل رقم 10، غلا هايتس)',
      label: 'In-Person Pickup at Shop 10, Ghala Heights Showroom',
      labelAr: 'استلام شخصي وتجربة من المعرض (محل 10، غلا هايتس)'
    }
  ];

  // Calculation of Total Price
  const basePrice = product.priceNumeric;
  const totalPrice = basePrice + selectedRamUpgrade + selectedSsdUpgrade;
  const formattedTotalPrice = `OMR ${totalPrice.toFixed(3)}`;

  // Generated WhatsApp message with selected configuration
  const waOrderText = lang === 'ar'
    ? encodeURIComponent(
        `مرحباً سمارت فيجن جلف،\n` +
        `أود تأكيد حجز وشراء:\n` +
        `• الموديل: ${product.nameAr}\n` +
        `• كود الجهاز: ${product.sku}\n` +
        `• المواصفات: ${product.cpu} | ${product.ram} | ${product.ssd}\n` +
        (!isAccessory && product.upgradeOptions ? `• ترقية الرام: ${selectedRamLabelAr}\n` : '') +
        (!isAccessory && product.upgradeOptions ? `• ترقية التخزين: ${selectedSsdLabelAr}\n` : '') +
        `• الحالة: ${product.conditionAr} (${product.batteryHealth})\n` +
        `• طريقة الاستلام: ${deliveryMethodAr}\n` +
        `• السعر الإجمالي: ${formattedTotalPrice} (شامل ضريبة القيمة المضافة 5%)\n\n` +
        `يرجى تأكيد التوفر وموعد التوصيل. شكراً!`
      )
    : encodeURIComponent(
        `Hello Smart Vision Gulf,\n` +
        `I would like to place an order for:\n` +
        `• Product: ${product.name}\n` +
        `• SKU: ${product.sku}\n` +
        `• Base Specs: ${product.cpu} | ${product.ram} | ${product.ssd}\n` +
        (!isAccessory && product.upgradeOptions ? `• RAM Upgrade: ${selectedRamLabel}\n` : '') +
        (!isAccessory && product.upgradeOptions ? `• Storage Upgrade: ${selectedSsdLabel}\n` : '') +
        `• Condition: ${product.condition} (${product.batteryHealth})\n` +
        `• Delivery / Pickup: ${deliveryMethod}\n` +
        `• Total Payable: ${formattedTotalPrice} (VAT Included)\n\n` +
        `Please confirm order and dispatch timing. Thank you!`
      );

  const waOrderLink = `https://wa.me/96894009501?text=${waOrderText}`;

  // Stylized device badge color accent
  const getBrandAccent = () => {
    switch (product.brand) {
      case 'dell': return 'from-blue-900 via-navy-deep to-navy-dark text-cyan';
      case 'hp': return 'from-slate-800 via-navy-deep to-[#0c1a38] text-white';
      case 'apple': return 'from-slate-900 via-neutral-900 to-[#121927] text-slate-200';
      case 'lenovo': return 'from-red-950 via-navy-deep to-[#18090d] text-red-400';
      default: return 'from-cyan-950 via-navy-deep to-[#051a2d] text-cyan';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <Breadcrumb
          items={[
            { label: 'Inventory', labelAr: 'كتالوج الأجهزة', href: '/inventory' },
            { label: product.name, labelAr: product.nameAr },
          ]}
        />

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
          
          {/* Left Column: Visual Card, Badges & Verification (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Box with stylized hardware card */}
            <div className={`relative bg-gradient-to-b ${getBrandAccent()} rounded-3xl p-8 text-white border border-cyan/30 shadow-card-hover overflow-hidden`}>
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,138,216,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Status Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-bold text-cyan bg-cyan/15 px-3 py-1.5 rounded-xl border border-cyan/30 uppercase">
                  {product.brandLabel} · {lang === 'ar' ? product.categoryLabelAr : product.categoryLabel}
                </span>
                <span className="text-xs font-bold text-lime flex items-center gap-1.5 bg-lime/10 px-3 py-1.5 rounded-xl border border-lime/30">
                  <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
                  {lang === 'ar' ? 'متوفر بمخزن مسقط' : 'In Stock Muscat'}
                </span>
              </div>

              {/* Hardware Device Graphic Mockup */}
              <div className="relative z-10 py-8 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center mb-4 shadow-glow-cyan p-4">
                  {isAccessory ? (
                    <Monitor className="w-16 h-16 text-cyan-light" />
                  ) : (
                    <Laptop className="w-16 h-16 text-cyan-light" />
                  )}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold mt-1">
                    {product.brandLabel}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{lang === 'ar' ? product.nameAr : product.name}</h3>
                <span className="text-xs font-mono text-cyan-light mt-1">SKU: {product.sku}</span>
              </div>

              {/* Quick Trust Ribbons */}
              <div className="relative z-10 grid grid-cols-2 gap-2 pt-6 border-t border-white/10 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-lime shrink-0" />
                  <span>{lang === 'ar' ? 'كيبورد عربي إنجليزي' : 'Arabic / English Backlit'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-lime shrink-0" />
                  <span>{lang === 'ar' ? 'شاحن أصلي ثلاثي' : 'Original UK Charger'}</span>
                </div>
              </div>
            </div>

            {/* Quality & Inspection Assurance Certificate Box */}
            <div className="bg-white rounded-2xl border border-ink-border p-5 space-y-3.5 shadow-sm">
              <h4 className="font-extrabold text-navy text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange" />
                <span>{lang === 'ar' ? 'شهادة الفحص وضمان المحل' : 'Diagnostic Certification'}</span>
              </h4>

              <div className="p-3 rounded-xl bg-lime-light text-lime-dark flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-lime" />
                  {lang === 'ar' ? 'نسبة صحة البطارية المفحوصة:' : 'Verified Battery Health:'}
                </span>
                <span className="font-mono text-sm font-black">{product.batteryHealth}</span>
              </div>

              <div className="p-3 rounded-xl bg-orange-light text-orange-dark flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange" />
                  {lang === 'ar' ? 'فترة الضمان المعتمد:' : 'Shop Warranty Coverage:'}
                </span>
                <span className="font-black">{lang === 'ar' ? product.warrantyAr : product.warranty}</span>
              </div>

              <div className="text-[11px] text-ink-muted leading-relaxed">
                {t.detailsShowroomNotice}
              </div>
            </div>

          </div>

          {/* Right Column: Specs Breakdown & Upgrade Configurator (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-navy text-white">
                  {lang === 'ar' ? product.conditionAr : product.condition}
                </span>
                <span className="text-xs font-semibold text-ink-muted">
                  {lang === 'ar' ? product.categoryLabelAr : product.categoryLabel}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-navy tracking-tight mb-2">
                {lang === 'ar' ? product.nameAr : product.name}
              </h1>

              <p className="text-sm text-ink-muted leading-relaxed mb-4">
                {lang === 'ar' ? product.descriptionAr : product.description}
              </p>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-white border border-ink-border flex items-baseline justify-between shadow-sm">
                <div>
                  <div className="text-xs uppercase font-bold text-ink-faint">
                    {lang === 'ar' ? 'السعر الأساسي المعتمد' : 'Base Selling Price'}
                  </div>
                  <div className="text-3xl font-black text-navy font-mono">
                    {product.priceFormatted}
                  </div>
                  <div className="text-xs font-semibold text-lime-dark">
                    {t.cardVatIncluded}
                  </div>
                </div>

                {product.wasPriceFormatted && (
                  <div className="text-end">
                    <span className="text-xs text-slate-400 uppercase font-bold">{lang === 'ar' ? 'السابق' : 'Was'}</span>
                    <div className="text-sm text-slate-400 line-through font-mono">
                      {product.wasPriceFormatted}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hardware Diagnostic Breakdown Table */}
            <div className="bg-white rounded-2xl border border-ink-border p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan" />
                <span>{t.detailsHardwareSpecs}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {product.fullSpecs.map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <span className="font-bold text-ink-faint uppercase text-[11px] mb-1">
                      {lang === 'ar' ? spec.labelAr : spec.label}
                    </span>
                    <span className="font-semibold text-navy text-xs leading-normal">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Complimentary Bundle */}
              <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
                <div className="font-extrabold text-emerald-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{t.detailsIncludedBundle}:</span>
                </div>
                <div className="font-medium">
                  {lang === 'ar' ? product.bundleAr : product.bundle}
                </div>
              </div>
            </div>

            {/* RAM / Storage Upgrade Configurator Box (For customizable models) */}
            {product.upgradeOptions && (
              <div className="bg-white rounded-2xl border-2 border-navy/20 p-6 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-navy flex items-center gap-2">
                    <Settings className="w-5 h-5 text-orange" />
                    <span>{t.detailsConfigUpgrade}</span>
                  </h3>
                  <span className="text-[11px] font-bold text-orange uppercase bg-orange-light px-2.5 py-1 rounded-md">
                    Custom Build
                  </span>
                </div>

                {/* RAM Selection */}
                {product.upgradeOptions.ramOptions && (
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {lang === 'ar' ? 'ترقية الذاكرة العشوائية (RAM):' : 'Select RAM Configuration:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.upgradeOptions.ramOptions.map((opt, i) => {
                        const isChecked = selectedRamUpgrade === opt.price;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedRamUpgrade(opt.price);
                              setSelectedRamLabel(opt.label);
                              setSelectedRamLabelAr(opt.labelAr || opt.label);
                            }}
                            className={`p-3.5 rounded-xl border text-start font-bold text-xs transition-all flex items-center justify-between ${
                              isChecked
                                ? 'border-navy bg-navy/5 text-navy shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 text-ink-muted'
                            }`}
                          >
                            <span>{lang === 'ar' ? (opt.labelAr || opt.label) : opt.label}</span>
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isChecked ? 'border-navy bg-navy' : 'border-slate-300'}`}>
                              {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Storage Selection */}
                {product.upgradeOptions.ssdOptions && (
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {lang === 'ar' ? 'ترقية سعة التخزين (NVMe SSD):' : 'Select Storage Capacity:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.upgradeOptions.ssdOptions.map((opt, i) => {
                        const isChecked = selectedSsdUpgrade === opt.price;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedSsdUpgrade(opt.price);
                              setSelectedSsdLabel(opt.label);
                              setSelectedSsdLabelAr(opt.labelAr || opt.label);
                            }}
                            className={`p-3.5 rounded-xl border text-start font-bold text-xs transition-all flex items-center justify-between ${
                              isChecked
                                ? 'border-navy bg-navy/5 text-navy shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 text-ink-muted'
                            }`}
                          >
                            <span>{lang === 'ar' ? (opt.labelAr || opt.label) : opt.label}</span>
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isChecked ? 'border-navy bg-navy' : 'border-slate-300'}`}>
                              {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fulfilment Method Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    {lang === 'ar' ? 'طريقة الاستلام والتوصيل:' : 'Delivery or Collection Method:'}
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => {
                      const selected = deliveryOptions.find(d => d.value === e.target.value);
                      if (selected) {
                        setDeliveryMethod(selected.value);
                        setDeliveryMethodAr(selected.valueAr);
                      }
                    }}
                    className="w-full p-3 rounded-xl border border-ink-border bg-slate-50 font-bold text-xs sm:text-sm text-navy focus:outline-none focus:border-cyan"
                  >
                    {deliveryOptions.map(opt => (
                      <option key={opt.id} value={opt.value}>
                        {lang === 'ar' ? opt.labelAr : opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Price Bar & WhatsApp Order Action */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase font-extrabold text-ink-faint">
                      {lang === 'ar' ? 'المبلغ الإجمالي المستحق' : 'Configured Total (VAT Incl.)'}
                    </div>
                    <div className="text-3xl font-black text-orange font-mono">
                      {formattedTotalPrice}
                    </div>
                  </div>

                  <a
                    href={waOrderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('product_detail_configurator', product.sku, product.name)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-base shadow-glow-lime transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>{t.detailsOrderDirect}</span>
                  </a>
                </div>
              </div>
            )}

            {/* If no upgrade options (monitors / sealed accessories), standard direct purchase bar */}
            {!product.upgradeOptions && (
              <div className="bg-white rounded-2xl border-2 border-navy/20 p-6 shadow-md space-y-5">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    {lang === 'ar' ? 'طريقة الاستلام والتوصيل:' : 'Delivery or Collection Method:'}
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => {
                      const selected = deliveryOptions.find(d => d.value === e.target.value);
                      if (selected) {
                        setDeliveryMethod(selected.value);
                        setDeliveryMethodAr(selected.valueAr);
                      }
                    }}
                    className="w-full p-3 rounded-xl border border-ink-border bg-slate-50 font-bold text-xs sm:text-sm text-navy focus:outline-none focus:border-cyan"
                  >
                    {deliveryOptions.map(opt => (
                      <option key={opt.id} value={opt.value}>
                        {lang === 'ar' ? opt.labelAr : opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase font-extrabold text-ink-faint">
                      {lang === 'ar' ? 'المبلغ الإجمالي المستحق' : 'Total Payable (VAT Incl.)'}
                    </div>
                    <div className="text-3xl font-black text-orange font-mono">
                      {product.priceFormatted}
                    </div>
                  </div>

                  <a
                    href={waOrderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('product_detail_direct', product.sku, product.name)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-lime hover:bg-lime-hover text-white font-extrabold text-base shadow-glow-lime transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>{t.detailsOrderDirect}</span>
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Related Hardware in Muscat Showroom */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-navy">
                {lang === 'ar' ? 'أجهزة أعمال مشابهة متوفرة في المعرض' : 'Alternative Business Laptops in Stock'}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {lang === 'ar'
                  ? 'أجهزة مفحوصة ومضمونة لمدة 6 أشهر متاحة للتسليم الفوري في مسقط وسلطنة عُمان'
                  : 'Grade A++ verified laptops with 6-month shop warranty ready for same-day dispatch.'}
              </p>
            </div>
            <Link
              href="/inventory"
              className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض الكتالوج كاملاً' : 'View Full Catalog'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
