'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Product } from '@/data/products';
import { Printer, X, Receipt, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface ThermalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  customerName?: string;
  customerPhone?: string;
  totalAmount?: number;
}

export default function ThermalReceiptModal({
  isOpen,
  onClose,
  product,
  customerName = 'Walk-In Customer',
  customerPhone = '+968 9400 9501',
  totalAmount,
}: ThermalReceiptModalProps) {
  const { lang, dir } = useLanguage();
  const [custName, setCustName] = useState(customerName);
  const [custPhone, setCustPhone] = useState(customerPhone);
  const [paymentMethod, setPaymentMethod] = useState('Cash (COD / Counter)');

  if (!isOpen) return null;

  const receiptNo = `SVG-POS-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
  const dateTimeStr = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const grossTotal = totalAmount || product?.priceNumeric || 140.000;
  const netTotal = grossTotal / 1.05;
  const vatTotal = grossTotal - netTotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" dir={dir}>
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Controls Header (Screen Only) */}
        <div className="bg-navy text-white p-4 flex items-center justify-between border-b border-navy-subtle print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan" />
            <h3 className="text-sm font-bold">
              {lang === 'ar' ? 'إيصال حراري لنقاط البيع (80mm POS)' : '80mm Showroom Thermal Receipt'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Bar (Screen Only) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2 text-xs print:hidden">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Customer Name:</label>
              <input
                type="text"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                className="w-full p-1.5 rounded-lg border border-slate-300 font-semibold text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Customer Phone:</label>
              <input
                type="text"
                value={custPhone}
                onChange={(e) => setCustPhone(e.target.value)}
                className="w-full p-1.5 rounded-lg border border-slate-300 font-semibold text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-slate-300 font-semibold text-xs"
            >
              <option value="Cash on Delivery / Walk-In">Cash on Delivery / Walk-In (COD)</option>
              <option value="POS Card Terminal (OmanNet/Visa)">POS Card Terminal (OmanNet / Visa)</option>
              <option value="Bank Muscat Mobile Transfer">Bank Muscat Mobile Transfer</option>
            </select>
          </div>
        </div>

        {/* Printable 80mm Thermal Receipt Content */}
        <div className="p-6 bg-white text-black font-mono text-[11px] leading-tight select-all" id="thermal-80mm-receipt">
          <div className="text-center space-y-1 mb-3">
            <div className="text-sm font-black tracking-wider uppercase">SMART VISION GULF LLC</div>
            <div className="text-[10px]">شركة الرؤية الذكية للخليج ش.م.م</div>
            <div className="text-[10px]">Shop No. 10, Ghala Heights, Muscat, Oman</div>
            <div className="text-[10px]">CR: 1489201 | VAT TIN: OM1100293849</div>
            <div className="text-[10px]">Phone: +968 94009501 / +968 96009404</div>
          </div>

          <div className="border-t border-dashed border-black my-2" />

          <div className="space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span>Receipt No:</span>
              <span className="font-bold">{receiptNo}</span>
            </div>
            <div className="flex justify-between">
              <span>Date &amp; Time:</span>
              <span>{dateTimeStr}</span>
            </div>
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="font-bold">{custName}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <span>{custPhone}</span>
            </div>
            <div className="flex justify-between">
              <span>Cashier / Station:</span>
              <span>Ghala Heights Counter 01</span>
            </div>
          </div>

          <div className="border-t border-dashed border-black my-2" />

          {/* Item details */}
          <div className="space-y-1">
            <div className="font-bold text-[12px]">{product?.name || 'Enterprise Certified Laptop'}</div>
            <div className="text-[10px] text-slate-700">SKU: {product?.sku || 'SVG-PRO-MOD'}</div>
            <div className="text-[10px]">• Specs: {product?.cpu || 'Core i5/i7'} · {product?.ram || '16GB'} · {product?.ssd || '512GB SSD'}</div>
            <div className="text-[10px]">• Condition: {product?.condition || 'Grade A++'} ({product?.batteryHealth || '90% Verified'})</div>
            <div className="text-[10px]">• Includes: OEM Charger &amp; Backlit Ar/En Keyboard</div>
            
            <div className="flex justify-between pt-1 font-bold text-[11px]">
              <span>1x Item Subtotal</span>
              <span>OMR {grossTotal.toFixed(3)}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-black my-2" />

          {/* Price Breakdown */}
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span>Net Taxable Amount:</span>
              <span>OMR {netTotal.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>Oman VAT (5.00%):</span>
              <span>OMR {vatTotal.toFixed(3)}</span>
            </div>
            <div className="border-t border-black pt-1 flex justify-between font-black text-[13px]">
              <span>TOTAL (OMR):</span>
              <span>OMR {grossTotal.toFixed(3)}</span>
            </div>
            <div className="flex justify-between pt-0.5 text-[10px]">
              <span>Payment Type:</span>
              <span>{paymentMethod}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-black my-2" />

          {/* Warranty Terms & QR */}
          <div className="text-center space-y-1 text-[9px]">
            <div className="font-bold text-[10px] uppercase">*** 6 MONTHS SHOP WARRANTY ***</div>
            <div>7-Day Instant Replacement Policy</div>
            <div>Inspect Before You Pay Cash-On-Delivery Guaranteed</div>
            <div>Scan or visit svgulf.com/warranty to verify coverage</div>
            <div className="py-1 flex justify-center">
              <div className="border border-black p-1 text-[8px] uppercase tracking-widest font-black">
                [ QR: SVGULF-CERT-{product?.sku || 'VERIFIED'} ]
              </div>
            </div>
            <div className="font-bold">Thank You For Choosing Smart Vision Gulf!</div>
          </div>
        </div>

        {/* Footer Actions (Screen Only) */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-black transition-colors"
          >
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-black shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طباعة الإيصال الحراري (80mm)' : 'Print 80mm Receipt'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
