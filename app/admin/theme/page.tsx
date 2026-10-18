'use client';

import React, { useState } from 'react';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import { ThemeSettings } from '@/lib/adminTypes';
import {
  Palette,
  Check,
  CheckCircle2,
  Zap,
  Phone,
  MessageCircle,
  AlertTriangle,
  Store,
  Sparkles,
  Eye,
  Type
} from 'lucide-react';

export default function AdminThemePage() {
  const { theme, saveTheme } = useSiteData();
  const { lang, dir } = useLanguage();

  const [formState, setFormState] = useState<ThemeSettings>(JSON.parse(JSON.stringify(theme)));
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveTheme(formState);
    showNotification('Theme and banner settings updated successfully!');
  };

  return (
    <div className="space-y-8" dir={dir}>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-lime text-navy-deep font-bold text-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-navy-deep" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {lang === 'ar' ? 'المظهر والبنرات وأرقام الدعم' : 'Theme & Appearance Customizer'}
          </h1>
          <p className="text-xs text-cyan-light mt-1">
            {lang === 'ar'
              ? 'التحكم في بنرات العروض، نصوص واجهة الموقع، وأرقام واتساب مسقط مباشرة.'
              : 'Control announcement bars, hero copy, emergency alerts, and WhatsApp routing.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-lg shadow-orange/20 transition-all shrink-0"
        >
          <Check className="w-4 h-4" />
          <span>{lang === 'ar' ? 'حفظ التعديلات الحية' : 'Save Live Changes'}</span>
        </button>
      </div>

      {/* Live Preview Box */}
      <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white/70">
          <Eye className="w-4 h-4 text-cyan-light" />
          <span>Live Storefront Header Preview:</span>
        </div>

        {/* Top Strip Preview */}
        {formState.announcementBanner.enabled && (
          <div className="p-2.5 rounded-xl bg-navy-deep text-white text-xs flex items-center justify-between gap-3 border border-cyan/20">
            <div className="flex items-center gap-2 font-medium">
              <Zap className="w-3.5 h-3.5 text-orange" />
              <span>{lang === 'ar' ? formState.announcementBanner.textAr : formState.announcementBanner.textEn}</span>
            </div>
            <span className="font-mono text-cyan-light text-[11px] hidden sm:inline">
              WhatsApp: {formState.contactNumbers.primaryWhatsApp}
            </span>
          </div>
        )}

        {/* Promo Bar Preview */}
        {formState.promoBar.enabled && (
          <div className="p-2 rounded-xl bg-gradient-to-r from-orange to-orange-hover text-white text-xs flex items-center justify-between gap-2 font-bold px-4">
            <span>{lang === 'ar' ? formState.promoBar.textAr : formState.promoBar.textEn}</span>
            {formState.promoBar.code && (
              <span className="font-mono bg-white text-navy-deep px-2 py-0.5 rounded text-[10px]">
                CODE: {formState.promoBar.code}
              </span>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Section 1: Announcement Banner */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange" />
              <span>Top Announcement Banner (Top Strip)</span>
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.announcementBanner.enabled}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    announcementBanner: {
                      ...formState.announcementBanner,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-orange focus:ring-orange"
              />
              <span className="text-white font-medium">Active on Storefront</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 mb-1">Banner Text (English)</label>
              <input
                type="text"
                value={formState.announcementBanner.textEn}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    announcementBanner: {
                      ...formState.announcementBanner,
                      textEn: e.target.value,
                    },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Banner Text (Arabic)</label>
              <input
                type="text"
                value={formState.announcementBanner.textAr}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    announcementBanner: {
                      ...formState.announcementBanner,
                      textAr: e.target.value,
                    },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Promo Bar */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange" />
              <span>Promotional Ribbon / Voucher Bar</span>
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.promoBar.enabled}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    promoBar: {
                      ...formState.promoBar,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-orange focus:ring-orange"
              />
              <span className="text-white font-medium">Show Promo Ribbon</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 mb-1">Promo Text (English)</label>
              <input
                type="text"
                value={formState.promoBar.textEn}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    promoBar: { ...formState.promoBar, textEn: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Promo Text (Arabic)</label>
              <input
                type="text"
                value={formState.promoBar.textAr}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    promoBar: { ...formState.promoBar, textAr: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 mb-1">Promo Coupon Code</label>
              <input
                type="text"
                value={formState.promoBar.code || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    promoBar: { ...formState.promoBar, code: e.target.value },
                  })
                }
                placeholder="e.g. OMAN2026"
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Discount Label</label>
              <input
                type="text"
                value={formState.promoBar.discountText || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    promoBar: { ...formState.promoBar, discountText: e.target.value },
                  })
                }
                placeholder="Free Courier Delivery"
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: WhatsApp & Phone Routing */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-lime" />
              <span>WhatsApp Support & Contact Routing</span>
            </h2>
            <p className="text-white/50 text-[11px] mt-0.5">
              These phone numbers receive instant 1-click customer inquiries across the website.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/70 mb-1">Primary WhatsApp *</label>
              <input
                type="text"
                required
                value={formState.contactNumbers.primaryWhatsApp}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    contactNumbers: {
                      ...formState.contactNumbers,
                      primaryWhatsApp: e.target.value,
                    },
                  })
                }
                placeholder="+96894009501"
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Secondary WhatsApp (Sales)</label>
              <input
                type="text"
                value={formState.contactNumbers.secondaryWhatsApp}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    contactNumbers: {
                      ...formState.contactNumbers,
                      secondaryWhatsApp: e.target.value,
                    },
                  })
                }
                placeholder="+96896009404"
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Voice Phone Call</label>
              <input
                type="text"
                value={formState.contactNumbers.phoneCall}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    contactNumbers: {
                      ...formState.contactNumbers,
                      phoneCall: e.target.value,
                    },
                  })
                }
                placeholder="+96894009501"
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 mb-1">Default WhatsApp Message Template</label>
            <input
              type="text"
              value={formState.contactNumbers.defaultWhatsAppMessage}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  contactNumbers: {
                    ...formState.contactNumbers,
                    defaultWhatsAppMessage: e.target.value,
                  },
                })
              }
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            />
          </div>
        </div>

        {/* Section 4: Hero Section Headline Copy */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-light" />
              <span>Hero Headline & Subtitle Copy</span>
            </h2>
            <p className="text-white/50 text-[11px] mt-0.5">
              Customizes the high-converting headline on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 mb-1">Hero Title Part 1 (English)</label>
              <input
                type="text"
                value={formState.heroHeadline.titlePart1En}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    heroHeadline: { ...formState.heroHeadline, titlePart1En: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Hero Title Part 1 (Arabic)</label>
              <input
                type="text"
                value={formState.heroHeadline.titlePart1Ar}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    heroHeadline: { ...formState.heroHeadline, titlePart1Ar: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 mb-1">Highlighted Words (English)</label>
              <input
                type="text"
                value={formState.heroHeadline.titleHighlightEn}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    heroHeadline: { ...formState.heroHeadline, titleHighlightEn: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-orange"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1">Highlighted Words (Arabic)</label>
              <input
                type="text"
                value={formState.heroHeadline.titleHighlightAr}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    heroHeadline: { ...formState.heroHeadline, titleHighlightAr: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-orange text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-orange hover:bg-orange-hover text-white text-sm font-bold shadow-lg shadow-orange/30 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تحديث ونشر الإعدادات' : 'Save & Publish Live Theme'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
