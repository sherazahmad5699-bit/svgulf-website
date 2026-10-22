'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import { Product } from '@/lib/adminTypes';
import {
  Laptop,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  X,
  AlertTriangle,
  Zap,
  Battery,
  ShieldCheck,
  Star,
  CheckCircle2
} from 'lucide-react';

const BRAND_OPTIONS = [
  { id: 'all', label: 'All Brands' },
  { id: 'dell', label: 'Dell' },
  { id: 'hp', label: 'HP' },
  { id: 'lenovo', label: 'Lenovo' },
  { id: 'apple', label: 'Apple' },
  { id: 'accessories', label: 'Accessories & Docks' },
];

const PRESET_IMAGES = [
  '/products/dell-latitude-5440.png',
  '/products/hp-elitebook-830g8.png',
  '/products/dell-latitude-5450.png',
  '/products/hp-g5-dock.png',
];

export default function AdminProductsPage() {
  const { products, saveProduct, deleteProduct } = useSiteData();
  const { lang, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmSku, setDeleteConfirmSku] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchBrand = selectedBrand === 'all' || p.brand === selectedBrand;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.cpu.toLowerCase().includes(q);
      return matchBrand && matchQuery;
    });
  }, [products, selectedBrand, searchQuery]);

  const handleOpenAdd = () => {
    const newSku = `SVG-MOD-${Math.floor(1000 + Math.random() * 9000)}`;
    setEditingProduct({
      sku: newSku,
      brand: 'dell',
      brandLabel: 'Dell',
      name: '',
      nameAr: '',
      category: 'laptop',
      categoryLabel: 'Business Laptop',
      categoryLabelAr: 'لابتوب أعمال',
      cpu: 'Intel Core i5 (12th/13th Gen)',
      ram: '16GB DDR4/DDR5 High-Speed',
      ssd: '512GB PCIe NVMe SSD',
      display: '14.0" Full HD (1920x1080) Anti-Glare IPS',
      graphics: 'Intel Iris Xe Graphics',
      condition: 'Grade A++',
      conditionAr: 'درجة أولى ممتازة (A++)',
      batteryHealth: '90% Health Verified',
      batteryPercentage: 90,
      priceNumeric: 140.000,
      costPriceNumeric: 105.000,
      priceFormatted: 'OMR 140.000',
      wasPriceFormatted: 'OMR 165.000',
      warranty: '6 Months Shop Warranty + 7 Days Replacement',
      warrantyAr: 'ضمان المحل 6 أشهر + استبدال 7 أيام',
      keyboard: 'Factory Backlit Keyboard (Arabic / English)',
      bundle: 'Free Heavy-Duty Bag + Wireless Mouse + Original Charger',
      bundleAr: 'حقيبة فاخرة + ماوس لاسلكي + شاحن أصلي مجاناً',
      featured: false,
      bestSeller: false,
      image: '/products/dell-latitude-5440.png',
      description: 'Corporate grade business laptop tested for thermal performance, battery stamina, and MIL-SPEC reliability in Muscat.',
      descriptionAr: 'لابتوب أعمال من الفئة المؤسسية مفحوص بدقة للأداء والاستقرار في سلطنة عُمان.',
      fullSpecs: [
        { label: 'Processor', labelAr: 'المعالج', value: 'Intel Core i5 (High Speed)' },
        { label: 'Installed Memory', labelAr: 'الذاكرة العشوائية', value: '16 GB RAM' },
        { label: 'Storage', labelAr: 'سعة التخزين', value: '512 GB PCIe NVMe SSD' },
        { label: 'Display', labelAr: 'الشاشة', value: '14" FHD IPS Anti-Glare' },
      ],
      upgradeOptions: {
        ramOptions: [
          { label: 'Standard 16GB', labelAr: 'الأساسي: 16 جيجابايت', price: 0 },
          { label: 'Upgrade to 32GB (+OMR 25.000)', labelAr: 'ترقية إلى 32 جيجابايت (+25.000 ر.ع.)', price: 25.000 },
        ],
        ssdOptions: [
          { label: 'Standard 512GB', labelAr: 'الأساسي: 512 جيجابايت', price: 0 },
          { label: 'Upgrade to 1TB (+OMR 20.000)', labelAr: 'ترقية إلى 1 تيرابايت (+20.000 ر.ع.)', price: 20.000 },
        ],
      },
    });
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(JSON.parse(JSON.stringify(product)));
    setIsModalOpen(true);
  };

  const handleDuplicate = (product: Product) => {
    const copy: Product = JSON.parse(JSON.stringify(product));
    copy.sku = `${copy.sku}-COPY-${Math.floor(100 + Math.random() * 900)}`;
    copy.name = `${copy.name} (Copy)`;
    copy.nameAr = `${copy.nameAr} (نسخة)`;
    saveProduct(copy);
    showNotification(`Duplicated ${copy.sku} successfully!`);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Ensure priceFormatted matches priceNumeric
    editingProduct.priceFormatted = `OMR ${Number(editingProduct.priceNumeric).toFixed(3)}`;
    if (editingProduct.batteryPercentage) {
      editingProduct.batteryHealth = `${editingProduct.batteryPercentage}% Health Verified`;
    }

    await saveProduct(editingProduct);
    setIsModalOpen(false);
    setEditingProduct(null);
    showNotification(`Saved product ${editingProduct.sku} successfully!`);
  };

  const handleDelete = async (sku: string) => {
    await deleteProduct(sku);
    setDeleteConfirmSku(null);
    showNotification(`Deleted product ${sku}.`);
  };

  return (
    <div className="space-y-6" dir={dir}>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-lime text-navy-deep font-bold text-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-navy-deep" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {lang === 'ar' ? 'إدارة كتالوج الأجهزة' : 'Products & Laptop Inventory'}
          </h1>
          <p className="text-xs text-cyan-light mt-1">
            {lang === 'ar'
              ? 'تحديث المواصفات، الأسعار بالريال العُماني، ونسب صحة البطارية مباشرة.'
              : 'Add, update pricing in OMR, toggle stock, and calibrate specs in real time.'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-lg shadow-orange/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة جهاز جديد' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'البحث بالاسم، SKU أو المعالج...' : 'Search by name, SKU, or CPU...'}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-orange transition-all"
          />
        </div>

        {/* Brand Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {BRAND_OPTIONS.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBrand(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedBrand === b.id
                  ? 'bg-orange text-white shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table / Cards */}
      <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-[#000F3D] text-white/60 uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Laptop & SKU</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Specs (CPU / RAM / SSD)</th>
                <th className="py-3.5 px-4">Battery Health</th>
                <th className="py-3.5 px-4">Price (OMR)</th>
                <th className="py-3.5 px-4 text-center">Badges</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-white/40 text-sm">
                    {lang === 'ar' ? 'لم يتم العثور على أجهزة مطابقة للبحث' : 'No products found matching filters.'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.sku} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center">
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <div className="min-w-0 max-w-[240px]">
                          <div className="font-bold text-white truncate">{p.name}</div>
                          <div className="text-[11px] text-white/50 truncate">{p.nameAr}</div>
                          <span className="inline-block mt-0.5 font-mono text-[10px] text-cyan-light bg-cyan-light/10 px-1.5 py-0.5 rounded">
                            {p.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 uppercase font-mono text-cyan-light font-bold">
                      {p.brand}
                    </td>

                    <td className="py-3.5 px-4 max-w-[260px]">
                      <div className="text-white truncate font-medium">{p.cpu}</div>
                      <div className="text-white/60 text-[11px]">
                        {p.ram} · {p.ssd}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-lime/10 text-lime font-mono font-bold text-xs">
                        <Battery className="w-3.5 h-3.5" />
                        <span>{p.batteryPercentage ? `${p.batteryPercentage}%` : 'Verified'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-white text-sm">{p.priceFormatted}</div>
                      <div className="text-[10px] text-white/50 flex items-center gap-1 mt-0.5">
                        <span>Cost:</span>
                        <span>OMR {(p.costPriceNumeric || p.priceNumeric * 0.76).toFixed(3)}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-lime bg-lime/10 px-1.5 py-0.5 rounded mt-1">
                        <span>+OMR {(p.priceNumeric - (p.costPriceNumeric || p.priceNumeric * 0.76)).toFixed(3)}</span>
                        <span>({(((p.priceNumeric - (p.costPriceNumeric || p.priceNumeric * 0.76)) / (p.priceNumeric || 1)) * 100).toFixed(0)}%)</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {p.featured && (
                          <span className="p-1 rounded bg-orange/20 text-orange" title="Featured">
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </span>
                        )}
                        {p.bestSeller && (
                          <span className="p-1 rounded bg-cyan/20 text-cyan-light" title="Best Seller">
                            <Zap className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/inventory/${p.sku}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                          title="View on Live Store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-light transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 rounded-lg bg-orange/20 hover:bg-orange/30 text-orange transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmSku(p.sku)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#08153e] border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">
                  {editingProduct.name ? `Edit: ${editingProduct.sku}` : 'Add New Laptop Model'}
                </h2>
                <p className="text-xs text-cyan-light font-mono mt-0.5">svGulf Muscat Catalog</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-6 text-xs">
              {/* Section 1: Basic Identifiers */}
              <div>
                <h3 className="text-sm font-bold text-orange mb-3">1. Basic Identifiers & Brand</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1">SKU Code *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.sku}
                      onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Brand *</label>
                    <select
                      value={editingProduct.brand}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          brand: e.target.value as any,
                          brandLabel: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#000F3D] border border-white/10 text-white"
                    >
                      <option value="dell">Dell</option>
                      <option value="hp">HP</option>
                      <option value="lenovo">Lenovo</option>
                      <option value="apple">Apple</option>
                      <option value="accessories">Accessories / Docks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Condition *</label>
                    <select
                      value={editingProduct.condition}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          condition: e.target.value as any,
                          conditionAr:
                            e.target.value === 'Grade A++'
                              ? 'درجة أولى ممتازة (A++)'
                              : e.target.value === 'Certified Pre-Owned'
                              ? 'معتمد شبه جديد'
                              : 'جديد بالكرتون',
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#000F3D] border border-white/10 text-white"
                    >
                      <option value="Grade A++">Grade A++ (Like New)</option>
                      <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                      <option value="Brand New">Brand New (Sealed)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-white/70 mb-1">Product Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="e.g. Dell Latitude 5440 Business Laptop"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Product Title (Arabic) *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.nameAr}
                      onChange={(e) => setEditingProduct({ ...editingProduct, nameAr: e.target.value })}
                      placeholder="مثال: لابتوب ديل لاتيتيود 5440 للأعمال"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Battery */}
              <div>
                <h3 className="text-sm font-bold text-orange mb-3">2. Pricing, Cost & Battery Health</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1">Selling Price (OMR) *</label>
                    <input
                      type="number"
                      step="0.001"
                      required
                      value={editingProduct.priceNumeric}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setEditingProduct({
                          ...editingProduct,
                          priceNumeric: val,
                          priceFormatted: `OMR ${val.toFixed(3)}`,
                        });
                      }}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Cost / Purchase (OMR)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={editingProduct.costPriceNumeric ?? ''}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setEditingProduct({
                          ...editingProduct,
                          costPriceNumeric: val,
                        });
                      }}
                      placeholder="e.g. 105.000"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Was Price (e.g. OMR 175)</label>
                    <input
                      type="text"
                      value={editingProduct.wasPriceFormatted || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, wasPriceFormatted: e.target.value })
                      }
                      placeholder="OMR 175.000"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Battery Health % (70-100)</label>
                    <input
                      type="number"
                      min={70}
                      max={100}
                      value={editingProduct.batteryPercentage || 90}
                      onChange={(e) => {
                        const pct = parseInt(e.target.value) || 90;
                        setEditingProduct({
                          ...editingProduct,
                          batteryPercentage: pct,
                          batteryHealth: `${pct}% Health Verified`,
                        });
                      }}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Live Profit Margin Calculator Widget */}
                <div className="mt-3 p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-white/60">Selling Price: </span>
                    <span className="text-white font-bold">OMR {(editingProduct.priceNumeric || 0).toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Estimated Cost: </span>
                    <span className="text-cyan font-bold">OMR {(editingProduct.costPriceNumeric || (editingProduct.priceNumeric || 0) * 0.76).toFixed(3)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/60">Gross Margin: </span>
                    <span className="text-lime font-black bg-lime/10 px-2 py-0.5 rounded border border-lime/30">
                      +OMR {((editingProduct.priceNumeric || 0) - (editingProduct.costPriceNumeric || (editingProduct.priceNumeric || 0) * 0.76)).toFixed(3)} (
                      {((((editingProduct.priceNumeric || 0) - (editingProduct.costPriceNumeric || (editingProduct.priceNumeric || 0) * 0.76)) / (editingProduct.priceNumeric || 1)) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: Hardware Specifications */}
              <div>
                <h3 className="text-sm font-bold text-orange mb-3">3. Hardware Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1">CPU Processor *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.cpu}
                      onChange={(e) => setEditingProduct({ ...editingProduct, cpu: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Installed RAM *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.ram}
                      onChange={(e) => setEditingProduct({ ...editingProduct, ram: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">SSD Storage *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.ssd}
                      onChange={(e) => setEditingProduct({ ...editingProduct, ssd: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Display Panel *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.display}
                      onChange={(e) => setEditingProduct({ ...editingProduct, display: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Graphics</label>
                    <input
                      type="text"
                      value={editingProduct.graphics}
                      onChange={(e) => setEditingProduct({ ...editingProduct, graphics: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Keyboard Layout</label>
                    <input
                      type="text"
                      value={editingProduct.keyboard}
                      onChange={(e) => setEditingProduct({ ...editingProduct, keyboard: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Image & Badges */}
              <div>
                <h3 className="text-sm font-bold text-orange mb-3">4. Product Image & Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1">Image Path / URL</label>
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                    {/* Preset Picker */}
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-white/50">Presets:</span>
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, image: img })}
                          className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-cyan-light font-mono"
                        >
                          {img.split('/').pop()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured || false}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, featured: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-orange focus:ring-orange"
                      />
                      <span className="text-white font-medium">Featured Item</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProduct.bestSeller || false}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, bestSeller: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-orange focus:ring-orange"
                      />
                      <span className="text-white font-medium">Best Seller</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold shadow-lg shadow-orange/30 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save to Muscat Catalog</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmSku && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#08153e] border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Confirm Laptop Deletion</h3>
            </div>
            <p className="text-xs text-white/70">
              Are you sure you want to delete <span className="font-mono font-bold text-white">{deleteConfirmSku}</span>? This item will be removed from the catalog.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmSku(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white text-xs font-semibold hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmSku)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
