'use client';

import React, { useState } from 'react';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import {
  Settings,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Store,
  KeyRound,
  FileJson,
  Lock
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { products, blogs, theme, inquiries, resetToFactory, refreshData, importStoreData } = useSiteData();
  const { lang, dir } = useLanguage();

  const [notification, setNotification] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleExportBackup = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      store: 'Smart Vision Gulf (svGulf)',
      location: 'Shop 10, Ghala Heights, Muscat, Oman',
      data: {
        products,
        blogs,
        theme,
        inquiries,
      },
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svgulf_store_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Backup JSON exported successfully!');
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const targetData = parsed.data || parsed;
      if (!targetData.products || !targetData.blogs) {
        setImportStatus('Invalid JSON format: missing products or blogs arrays.');
        return;
      }

      const success = await importStoreData(targetData);
      if (success) {
        setImportStatus(null);
        showNotification('Store data imported successfully!');
      } else {
        setImportStatus('Failed to import data to server.');
      }
    } catch (err: any) {
      setImportStatus(`Error parsing JSON file: ${err.message}`);
    }
  };

  const handleFactoryReset = async () => {
    await resetToFactory();
    setResetConfirmOpen(false);
    showNotification('Store reset to verified factory seed data!');
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
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          {lang === 'ar' ? 'إعدادات النظام والنسخ الاحتياطي' : 'Store Settings & Data Backup'}
        </h1>
        <p className="text-xs text-cyan-light mt-1">
          {lang === 'ar'
            ? 'تأمين الحساب، تصدير واستيراد بيانات الموقع بالكامل، وإعادة الضبط.'
            : 'Security credentials, complete JSON database backup, and factory restoration.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
        {/* Card 1: Admin Credentials */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-orange/20 text-orange flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Admin Authentication & Access</h2>
              <p className="text-white/50 text-[11px]">Default access credentials</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Default Username:</span>
              <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">admin</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Default Password:</span>
              <span className="font-mono font-bold text-lime bg-white/10 px-2 py-0.5 rounded">svgulf2026!</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Session Validity:</span>
              <span className="text-cyan-light font-mono">30 Days (Encrypted Token)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-light/10 border border-cyan/20 text-cyan-light text-[11px] leading-relaxed">
            <strong>Security Notice:</strong> To change the master admin password for production deployments on Vercel, set the <code className="bg-black/30 px-1 py-0.5 rounded">ADMIN_PASSWORD</code> environment variable in your Vercel project settings.
          </div>
        </div>

        {/* Card 2: Currency & Taxation */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-lime/20 text-lime flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Sultanate of Oman Commercial Compliance</h2>
              <p className="text-white/50 text-[11px]">Currency standards & consumer protection</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-bold text-white">Official Currency</div>
                <div className="text-[11px] text-white/50">Omani Rial (OMR / ر.ع.)</div>
              </div>
              <div className="font-mono text-cyan-light font-bold">3 Decimals (e.g. 149.000)</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-bold text-white">Value Added Tax (VAT)</div>
                <div className="text-[11px] text-white/50">Tax Authority Sultanate of Oman</div>
              </div>
              <div className="font-mono text-lime font-bold">5% Inclusive</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-bold text-white">Consumer Protection Warranty</div>
                <div className="text-[11px] text-white/50">Royal Decree 66/2014</div>
              </div>
              <div className="font-mono text-white font-bold">6-Month Shop Guarantee</div>
            </div>
          </div>
        </div>

        {/* Card 3: Complete Backup & Export */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-cyan-light/20 text-cyan-light flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Export Store Snapshot</h2>
              <p className="text-white/50 text-[11px]">Download all products, blogs, and inquiries</p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Generate an instant, portable JSON snapshot of your live inventory, published tech articles, custom theme configuration, and customer WhatsApp inquiry logs.
          </p>

          <div className="pt-2">
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-light hover:bg-cyan text-navy-deep font-bold transition-all shadow-md shadow-cyan/20"
            >
              <Download className="w-4 h-4" />
              <span>Export Full Store Backup (.json)</span>
            </button>
          </div>
        </div>

        {/* Card 4: Import & Factory Reset */}
        <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Import Data & Factory Reset</h2>
              <p className="text-white/50 text-[11px]">Restore or reset website state</p>
            </div>
          </div>

          {importStatus && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
              {importStatus}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-white/70 mb-2 font-semibold">
                Import JSON Backup File:
              </label>
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-orange text-white/80 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-orange" />
                <span>Select .json file to restore</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Reset to Factory Seed</div>
                <div className="text-[11px] text-white/50">Restores the 15 original seed laptops and guides</div>
              </div>
              <button
                onClick={() => setResetConfirmOpen(true)}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold transition-colors"
              >
                Reset Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#08153e] border border-red-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Confirm Factory Reset</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              This will reset the products catalog, blog articles, and theme settings back to the initial factory seed data. Any customized items will be overwritten.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleFactoryReset}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
