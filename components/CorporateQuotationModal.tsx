'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Product } from '@/data/products';
import { 
  FileText, 
  X, 
  Printer, 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Calendar,
  Sparkles,
  Download
} from 'lucide-react';

interface CorporateQuotationModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  configuredRamLabel?: string;
  configuredSsdLabel?: string;
  configuredTotalPrice?: number;
}

export default function CorporateQuotationModal({
  product,
  isOpen,
  onClose,
  configuredRamLabel,
  configuredSsdLabel,
  configuredTotalPrice,
}: CorporateQuotationModalProps) {
  const { lang, dir } = useLanguage();

  const [companyName, setCompanyName] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const quoteNumber = `SVG-QT-${new Date().getFullYear()}-${product.sku.replace(/[^A-Z0-9]/g, '').slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;
  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const validUntilStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const unitGrossPrice = configuredTotalPrice || product.priceNumeric;
  // Oman VAT is 5% inclusive in retail, for corporate quotation we display net + 5% VAT breakdown
  const unitNetPrice = unitGrossPrice / 1.05;
  const subtotalNet = unitNetPrice * quantity;
  const vatAmount = subtotalNet * 0.05;
  const grandTotal = subtotalNet + vatAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto" dir={dir}>
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header - Not shown when printing */}
        <div className="bg-navy text-white p-5 sm:p-6 flex items-center justify-between border-b border-navy-subtle print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">
                {lang === 'ar' ? 'إصدار عرض سعر رسمي للشركات والمؤسسات' : 'B2B Corporate Quotation Generator'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'ar' ? 'عرض سعر معتمد بالريال العُماني شامل الضريبة وسجل تجاري' : 'Official Omani corporate proforma quotation in OMR with 5% VAT & CR'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs (If not generated) */}
        {!generated ? (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center font-bold text-xs uppercase font-mono">
                {product.brandLabel}
              </div>
              <div className="flex-1">
                <div className="font-extrabold text-navy text-sm">
                  {lang === 'ar' ? product.nameAr : product.name}
                </div>
                <div className="text-xs text-ink-muted">
                  {product.cpu} · {configuredRamLabel || product.ram} · {configuredSsdLabel || product.ssd}
                </div>
              </div>
              <div className="text-end">
                <div className="text-xs uppercase font-bold text-ink-faint">{lang === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</div>
                <div className="text-base font-black text-navy font-mono">OMR {unitGrossPrice.toFixed(3)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'اسم الشركة / المؤسسة:' : 'Company / Entity Name:'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'شركة الخليج للتقنية ش.م.م' : 'Gulf Tech Solutions LLC'}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رقم السجل التجاري (CR):' : 'Commercial Registration (CR):'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1389201"
                  value={crNumber}
                  onChange={(e) => setCrNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الرقم الضريبي (VAT TIN):' : 'VAT Identification (TIN):'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. OM102938472"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'المسؤول / مقدم الطلب:' : 'Attention / Contact Person:'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'سالم الحارثي' : 'Salim Al Harthi'}
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رقم الهاتف:' : 'Phone Number:'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+968 9XXXXXXX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الكمية المطلوبة (أجهزة):' : 'Required Quantity (Units):'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-ink-muted hover:bg-slate-50 transition-colors"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => setGenerated(true)}
                disabled={!companyName}
                className="px-6 py-2.5 rounded-xl bg-orange hover:bg-orange-hover disabled:opacity-50 text-white text-xs font-black shadow-md transition-all"
              >
                {lang === 'ar' ? 'معاينة وإصدار عرض السعر' : 'Generate Official Quotation'}
              </button>
            </div>
          </div>
        ) : (
          /* Official Printable Quotation Document View */
          <div className="p-6 sm:p-10 space-y-6 text-slate-800 bg-white" id="printable-quotation">
            
            {/* Action Bar (Screen Only) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <button
                onClick={() => setGenerated(false)}
                className="text-xs font-bold text-cyan hover:underline"
              >
                ← {lang === 'ar' ? 'تعديل بيانات الشركة والكمية' : 'Edit Company & Quantity'}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-black shadow-md transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'طباعة / حفظ PDF' : 'Print / Save as PDF'}</span>
                </button>
              </div>
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-navy">
              <div>
                <div className="text-2xl font-black text-navy tracking-tight">
                  SMART VISION GULF LLC
                </div>
                <div className="text-xs font-bold text-orange">
                  شركة الرؤية الذكية للخليج ش.م.م
                </div>
                <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                  <div>Shop No. 10, Ghala Heights, Wilayat Bausher, Muscat, Sultanate of Oman</div>
                  <div>Commercial Reg (CR): 1489201 | Oman VAT TIN: OM1100293849</div>
                  <div>Tel/WhatsApp: +968 94009501 / +968 96009404 | Web: svgulf.com</div>
                </div>
              </div>

              <div className="text-start sm:text-end">
                <span className="inline-block px-3 py-1 rounded-md bg-navy text-white font-mono font-black text-xs uppercase tracking-wider mb-2">
                  OFFICIAL QUOTATION
                </span>
                <div className="text-xs font-mono font-bold text-navy">Quote Ref: {quoteNumber}</div>
                <div className="text-[11px] text-slate-500">Date: {todayStr}</div>
                <div className="text-[11px] text-slate-500">Valid Until: {validUntilStr} (30 Days)</div>
              </div>
            </div>

            {/* Bill To & Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  CUSTOMER / ENTITY
                </div>
                <div className="font-extrabold text-navy text-sm">{companyName}</div>
                {crNumber && <div>CR Number: <span className="font-mono font-bold">{crNumber}</span></div>}
                {vatNumber && <div>VAT TIN: <span className="font-mono font-bold">{vatNumber}</span></div>}
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  ATTENTION & CONTACT
                </div>
                <div className="font-bold text-navy">{contactPerson || 'Procurement Officer'}</div>
                {contactPhone && <div>Phone: <span className="font-mono">{contactPhone}</span></div>}
                {contactEmail && <div>Email: {contactEmail}</div>}
                <div>Delivery Location: Muscat, Sultanate of Oman</div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-navy text-white text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Item & Specifications</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Net (OMR)</th>
                    <th className="p-3 text-right">Total Net (OMR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  <tr>
                    <td className="p-3 text-slate-400 font-mono">01</td>
                    <td className="p-3 space-y-1">
                      <div className="font-extrabold text-navy text-sm">{product.name}</div>
                      <div className="text-[11px] text-slate-600">
                        • SKU: <span className="font-mono font-bold">{product.sku}</span> | Condition: <span className="font-bold">{product.condition}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        • CPU: {product.cpu}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        • RAM: {configuredRamLabel || product.ram} | SSD: {configuredSsdLabel || product.ssd}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        • Display: {product.display} | Battery: {product.batteryHealth}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        • Warranty: {product.warranty} + 7-Day Replacement
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        • Includes: Original UK 3-Pin Charger + Backlit Arabic/English Laser Keyboard
                      </div>
                    </td>
                    <td className="p-3 text-center font-bold font-mono">{quantity}</td>
                    <td className="p-3 text-right font-mono">{unitNetPrice.toFixed(3)}</td>
                    <td className="p-3 text-right font-mono font-bold">{subtotalNet.toFixed(3)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals & VAT Breakdown */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
              <div className="text-xs text-slate-500 max-w-sm space-y-1">
                <div className="font-bold text-navy">Payment & Delivery Terms:</div>
                <div>• Cash on Delivery (COD) / Bank Muscat Corporate Transfer</div>
                <div>• Free express delivery across Muscat / Inspection prior to payment</div>
                <div>• 6 Months Comprehensive Hardware Warranty from Smart Vision Gulf</div>
              </div>

              <div className="w-full sm:w-64 space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Subtotal Net:</span>
                  <span className="font-mono font-bold">OMR {subtotalNet.toFixed(3)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Oman VAT (5.0%):</span>
                  <span className="font-mono font-bold">OMR {vatAmount.toFixed(3)}</span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-navy text-navy text-sm">
                  <span className="font-black">Grand Total (OMR):</span>
                  <span className="font-mono font-black text-base text-navy">
                    OMR {grandTotal.toFixed(3)}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 text-right font-mono">
                  All prices in Omani Rial (3 decimals)
                </div>
              </div>
            </div>

            {/* Signatory & Stamp Box */}
            <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
              <div>
                <div className="w-28 h-12 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono">
                  [svGulf Stamp]
                </div>
                <div className="text-[11px] font-bold text-navy mt-1">Smart Vision Gulf LLC</div>
                <div className="text-[10px] text-slate-500">Authorized Commercial Signature</div>
              </div>

              <div className="text-end text-[11px] text-slate-400">
                Generated via svGulf.com Corporate Portal
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
