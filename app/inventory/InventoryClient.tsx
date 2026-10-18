'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  PRODUCTS, 
  BRANDS, 
  CONDITIONS, 
  PRICE_RANGES, 
  CPU_FILTERS, 
  RAM_FILTERS, 
  Product 
} from '@/data/products';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Laptop, 
  ArrowUpDown,
  MessageCircle,
  Cpu,
  Layers
} from 'lucide-react';
import { trackFilterChange, trackWhatsAppClick } from '@/lib/analytics';
import { useSiteData } from '@/components/SiteDataContext';

function InventoryContent() {
  const { t, lang, dir } = useLanguage();
  const { products: dynamicProducts } = useSiteData();
  const searchParams = useSearchParams();

  const activeProducts = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : PRODUCTS;

  // Initialize filters from URL query parameters (e.g. /inventory?brand=dell)
  const initialBrand = searchParams.get('brand') || 'all';
  const initialCondition = searchParams.get('condition') || 'all';
  const initialPrice = searchParams.get('price') || 'all';
  const initialCpu = searchParams.get('cpu') || 'all';
  const initialRam = searchParams.get('ram') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCondition, setSelectedCondition] = useState(initialCondition);
  const [selectedPriceRange, setSelectedPriceRange] = useState(initialPrice);
  const [selectedCpu, setSelectedCpu] = useState(initialCpu);
  const [selectedRam, setSelectedRam] = useState(initialRam);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return activeProducts.filter((p) => {

      // Brand Filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      // Condition Filter
      if (selectedCondition !== 'all' && p.condition !== selectedCondition) {
        return false;
      }

      // Price Range Filter
      if (selectedPriceRange !== 'all') {
        const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
        if (range && (p.priceNumeric < range.min || p.priceNumeric > range.max)) {
          return false;
        }
      }

      // CPU Filter
      if (selectedCpu !== 'all') {
        const cpuLower = p.cpu.toLowerCase();
        if (selectedCpu === 'i5' && !cpuLower.includes('i5')) return false;
        if (selectedCpu === 'i7' && !cpuLower.includes('i7')) return false;
        if (selectedCpu === 'm-series' && !(cpuLower.includes('m1') || cpuLower.includes('m2') || cpuLower.includes('m3') || p.brand === 'apple')) return false;
        if (selectedCpu === 'ultra' && !cpuLower.includes('ultra')) return false;
      }

      // RAM Filter
      if (selectedRam !== 'all') {
        const ramLower = p.ram.toLowerCase();
        if (selectedRam === '8gb' && !ramLower.includes('8gb') && !ramLower.includes('8 gb')) return false;
        if (selectedRam === '16gb' && !ramLower.includes('16gb') && !ramLower.includes('16 gb') && !ramLower.includes('18gb')) return false;
        if (selectedRam === '32gb' && !ramLower.includes('32gb') && !ramLower.includes('32 gb')) return false;
      }

      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.cpu.toLowerCase().includes(q) ||
          p.ram.toLowerCase().includes(q) ||
          p.ssd.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeProducts, selectedBrand, selectedCondition, selectedPriceRange, selectedCpu, selectedRam, searchQuery, sortBy]);


  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    trackFilterChange('brand', brandId);
  };

  const handleCpuSelect = (cpuId: string) => {
    setSelectedCpu(cpuId);
    trackFilterChange('cpu', cpuId);
  };

  const handleRamSelect = (ramId: string) => {
    setSelectedRam(ramId);
    trackFilterChange('ram', ramId);
  };

  const handleConditionSelect = (condId: string) => {
    setSelectedCondition(condId);
    trackFilterChange('condition', condId);
  };

  const handlePriceSelect = (priceId: string) => {
    setSelectedPriceRange(priceId);
    trackFilterChange('price', priceId);
  };

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedCondition('all');
    setSelectedPriceRange('all');
    setSelectedCpu('all');
    setSelectedRam('all');
    setSearchQuery('');
    setSortBy('featured');
    trackFilterChange('reset', 'all');
  };

  const hasActiveFilters = 
    selectedBrand !== 'all' || 
    selectedCondition !== 'all' || 
    selectedPriceRange !== 'all' || 
    selectedCpu !== 'all' || 
    selectedRam !== 'all' || 
    searchQuery.trim() !== '';

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Header */}
        <Breadcrumb
          items={[
            {
              label: 'Inventory Catalog',
              labelAr: 'كتالوج الأجهزة',
              href: '/inventory',
            },
          ]}
        />

        {/* Page Title & Stock Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
              {lang === 'ar' ? 'كتالوج ومخزون الأجهزة المتاحة' : 'Muscat Hardware Inventory'}
            </h1>
            <p className="text-sm text-ink-muted mt-1 max-w-2xl">
              {lang === 'ar'
                ? 'جميع الأجهزة مفحوصة وجاهزة للتسليم الفوري مع فحص نسبة البطارية وضمان 6 أشهر شامل.'
                : 'All laptops are bench-tested and ready for same-day delivery or in-store inspection with 6-month shop warranty.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white border border-ink-border text-xs font-bold text-navy shadow-sm">
              <span className="text-ink-muted">{lang === 'ar' ? 'المعروض:' : 'Showing:'} </span>
              <span className="text-orange font-black text-sm">{filteredProducts.length}</span>
              <span className="text-ink-muted"> / {activeProducts.length} {lang === 'ar' ? 'موديل' : 'Models'}</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-orange/30 bg-orange-light text-orange font-bold text-xs transition-colors hover:bg-orange hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'مسح الفلاتر' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-Facet Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-ink-border p-5 mb-8 shadow-sm space-y-4">
          
          {/* Row 1: Search & Sorting */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full py-2.5 rounded-xl border border-ink-border text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan transition-colors ${
                  dir === 'rtl' ? 'pr-9 pl-4 text-right' : 'pl-9 pr-4 text-left'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-ink-muted shrink-0 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                {lang === 'ar' ? 'الترتيب:' : 'Sort by:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl border border-ink-border bg-slate-50 text-xs font-bold text-navy focus:outline-none focus:border-cyan"
              >
                <option value="featured">{lang === 'ar' ? 'الأكثر تميزاً والطلب' : 'Featured & Popular'}</option>
                <option value="price-asc">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              </select>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Row 2: Brand Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-faint uppercase tracking-wider min-w-[75px]">
              {lang === 'ar' ? 'الماركة:' : 'Brand:'}
            </span>
            {BRANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBrandSelect(b.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBrand === b.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? b.labelAr : b.label}
              </button>
            ))}
          </div>

          {/* Row 3: CPU Processors Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-faint uppercase tracking-wider min-w-[75px] flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan" />
              <span>{lang === 'ar' ? 'المعالج:' : 'CPU:'}</span>
            </span>
            {CPU_FILTERS.map((cpu) => (
              <button
                key={cpu.id}
                onClick={() => handleCpuSelect(cpu.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCpu === cpu.id
                    ? 'bg-cyan text-white shadow-sm'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? cpu.labelAr : cpu.label}
              </button>
            ))}
          </div>

          {/* Row 4: RAM Capacities Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-faint uppercase tracking-wider min-w-[75px] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-orange" />
              <span>{lang === 'ar' ? 'الرام:' : 'RAM:'}</span>
            </span>
            {RAM_FILTERS.map((ram) => (
              <button
                key={ram.id}
                onClick={() => handleRamSelect(ram.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRam === ram.id
                    ? 'bg-orange text-white shadow-sm'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? ram.labelAr : ram.label}
              </button>
            ))}
          </div>

          {/* Row 5: Condition Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-faint uppercase tracking-wider min-w-[75px]">
              {lang === 'ar' ? 'الحالة:' : 'Condition:'}
            </span>
            {CONDITIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => handleConditionSelect(c.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCondition === c.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? c.labelAr : c.label}
              </button>
            ))}
          </div>

          {/* Row 6: Price Bracket Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-faint uppercase tracking-wider min-w-[75px]">
              {lang === 'ar' ? 'السعر:' : 'Price:'}
            </span>
            {PRICE_RANGES.map((r) => (
              <button
                key={r.id}
                onClick={() => handlePriceSelect(r.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedPriceRange === r.id
                    ? 'bg-navy-light text-white shadow-sm'
                    : 'bg-slate-100 text-ink-muted hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? r.labelAr : r.label}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>

        {/* No Results Empty State */}
        {filteredProducts.length === 0 && (
          <div className="p-16 text-center bg-white rounded-3xl border border-dashed border-ink-border my-6">
            <Laptop className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-navy mb-2">
              {lang === 'ar' ? 'لا توجد أجهزة مطابقة للفلاتر المحددة' : 'No matching models found'}
            </h3>
            <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
              {lang === 'ar'
                ? 'يرجى تجربة تغيير نطاق السعر أو الماركة، أو تحدث معنا مباشرة على واتساب للتحقق من الأجهزة غير المدرجة.'
                : 'Try clearing your filters, or chat with our showroom team on WhatsApp to check unlisted daily arrivals.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                type="button"
                className="px-5 py-2.5 rounded-xl border border-ink-border bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs"
              >
                {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Clear Filters'}
              </button>
              <a
                href="https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20am%20looking%20for%20a%20laptop%20model"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('inventory_empty_state')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-xs shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.orderWhatsApp}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function InventoryClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-xl border-4 border-cyan border-t-transparent animate-spin" />
      </div>
    }>
      <InventoryContent />
    </Suspense>
  );
}
