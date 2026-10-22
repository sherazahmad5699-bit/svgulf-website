'use client';

import React, { useState, useMemo } from 'react';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import { InquiryLead } from '@/lib/adminTypes';
import ThermalReceiptModal from '@/components/ThermalReceiptModal';
import {
  ClipboardList,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Trash2,
  Edit,
  X,
  Check,
  AlertCircle,
  Truck,
  Send,
  Receipt,
  Printer,
  Sparkles,
  Building2,
  ShieldCheck
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { inquiries, updateInquiryStatus, deleteInquiryLead, products } = useSiteData();
  const { lang, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeInquiry, setActiveInquiry] = useState<InquiryLead | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Dispatch Messages Modal State
  const [dispatchInquiry, setDispatchInquiry] = useState<InquiryLead | null>(null);

  // Thermal Receipt Modal State
  const [receiptInquiry, setReceiptInquiry] = useState<InquiryLead | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchStatus = selectedStatus === 'all' || inq.status === selectedStatus;
      const q = searchQuery.toLowerCase();
      const matchQ =
        !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.phone.includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        (inq.productName && inq.productName.toLowerCase().includes(q));
      return matchStatus && matchQ;
    });
  }, [inquiries, selectedStatus, searchQuery]);

  const handleOpenDetail = (inq: InquiryLead) => {
    setActiveInquiry(inq);
    setNotesDraft(inq.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    await updateInquiryStatus(activeInquiry.id, activeInquiry.status, notesDraft);
    setActiveInquiry(null);
    showNotification('Inquiry notes saved successfully.');
  };

  const handleStatusChange = async (id: string, newStatus: InquiryLead['status']) => {
    await updateInquiryStatus(id, newStatus);
    showNotification(`Status updated to ${newStatus}.`);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Subject', 'Message', 'Product', 'Source', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.email || ''}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${(i.productName || '').replace(/"/g, '""')}"`,
      i.source,
      i.status,
      `"${(i.notes || '').replace(/"/g, '""')}"`,
    ]);

    const utf8Bom = '\uFEFF';
    const csvContent = utf8Bom + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `svgulf_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenReceipt = (inq: InquiryLead) => {
    setReceiptInquiry(inq);
    setIsReceiptModalOpen(true);
  };

  // Resolved product for receipt
  const receiptProduct = receiptInquiry?.productSku
    ? products.find((p) => p.sku === receiptInquiry.productSku)
    : undefined;

  return (
    <div className="space-y-6" dir={dir}>
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
            {lang === 'ar' ? 'سجل طلبات وواتساب العملاء' : 'Customer Inquiries & WhatsApp Leads'}
          </h1>
          <p className="text-xs text-cyan-light mt-1">
            {lang === 'ar'
              ? 'متابعة طلبات الشراء، رسائل التوصيل، وإصدار إيصالات نقاط البيع الحرارية 80mm.'
              : 'Direct customer leads, 1-click WhatsApp dispatch messages, and 80mm POS thermal receipts.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setReceiptInquiry(inquiries[0] || null);
              setIsReceiptModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
          >
            <Printer className="w-4 h-4 text-cyan" />
            <span>{lang === 'ar' ? 'إيصال حراري (80mm)' : '80mm POS Receipt'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold text-xs shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['all', 'new', 'contacted', 'resolved', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl font-bold font-mono uppercase transition-colors ${
                selectedStatus === status
                  ? 'bg-orange text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, phone..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#000F3D] text-white/60 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Date / Source</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Subject / Message</th>
                <th className="py-3 px-4">Product / SKU</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40">
                    <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No inquiries or leads match this filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                    inq.name || 'Valued Customer'
                  )},%20this%20is%20Smart%20Vision%20Gulf%20Muscat.%20Regarding%20your%20inquiry:`;

                  return (
                    <tr key={inq.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-white/70">
                        <div className="flex items-center gap-1.5 text-white/90">
                          <Calendar className="w-3.5 h-3.5 text-cyan" />
                          <span>{inq.createdAt.slice(0, 10)}</span>
                        </div>
                        <span className="inline-block mt-1 font-mono text-[10px] text-cyan-light bg-cyan-light/10 px-1.5 py-0.5 rounded">
                          {inq.source}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{inq.name}</div>
                        <div className="text-[11px] font-mono text-cyan-light mt-0.5">{inq.phone}</div>
                        {inq.email && inq.email !== 'Not provided' && (
                          <div className="text-[10px] text-white/40 truncate max-w-[160px]">
                            {inq.email}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 max-w-[280px]">
                        <div className="font-semibold text-white truncate">{inq.subject}</div>
                        <div className="text-white/60 text-[11px] line-clamp-2 mt-0.5">
                          {inq.message}
                        </div>
                        {inq.notes && (
                          <div className="mt-1 text-[10px] text-orange font-mono bg-orange/10 px-1.5 py-0.5 rounded inline-block">
                            Note: {inq.notes}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-white/70">
                        {inq.productName || inq.productSku || 'General Inquiry'}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleStatusChange(inq.id, e.target.value as InquiryLead['status'])
                          }
                          className={`p-1.5 rounded-lg text-xs font-bold font-mono border focus:outline-none ${
                            inq.status === 'new'
                              ? 'bg-orange/20 text-orange border-orange/40'
                              : inq.status === 'contacted'
                              ? 'bg-cyan/20 text-cyan-light border-cyan/40'
                              : inq.status === 'resolved'
                              ? 'bg-lime/20 text-lime border-lime/40'
                              : 'bg-white/10 text-white/60 border-white/20'
                          }`}
                        >
                          <option value="new" className="bg-[#000F3D] text-orange">NEW</option>
                          <option value="contacted" className="bg-[#000F3D] text-cyan-light">CONTACTED</option>
                          <option value="resolved" className="bg-[#000F3D] text-lime">RESOLVED</option>
                          <option value="archived" className="bg-[#000F3D] text-white/50">ARCHIVED</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Dispatch Messages Button */}
                          <button
                            onClick={() => setDispatchInquiry(inq)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan hover:bg-cyan-hover text-white font-bold text-xs shadow-sm transition-colors"
                            title="Quick WhatsApp Dispatch Messages"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Dispatch</span>
                          </button>

                          {/* Print 80mm POS Receipt */}
                          <button
                            onClick={() => handleOpenReceipt(inq)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Print 80mm POS Thermal Receipt"
                          >
                            <Receipt className="w-3.5 h-3.5 text-lime" />
                          </button>

                          <button
                            onClick={() => handleOpenDetail(inq)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                            title="Edit Notes"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => deleteInquiryLead(inq.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* WhatsApp Dispatch Generator Modal */}
      {dispatchInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#08153e] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5 text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-orange" />
                <h3 className="text-base font-black">
                  {lang === 'ar' ? 'إرسال تحديثات حالة الطلب عبر واتساب' : '1-Click WhatsApp Order Status Generator'}
                </h3>
              </div>
              <button
                onClick={() => setDispatchInquiry(null)}
                className="p-1.5 rounded-lg bg-white/5 text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center font-mono">
              <div>
                <div className="font-bold text-white text-sm">{dispatchInquiry.name}</div>
                <div className="text-cyan-light text-[11px]">{dispatchInquiry.phone}</div>
              </div>
              <div className="text-right text-white/70">
                {dispatchInquiry.productName || 'General Order'}
              </div>
            </div>

            <p className="text-white/70 text-xs">
              Select an operational template to launch pre-formatted WhatsApp message directly to the customer:
            </p>

            <div className="space-y-3">
              {/* Template 1: Confirmed & Packing */}
              <a
                href={`https://wa.me/${dispatchInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `مرحباً ${dispatchInquiry.name}،\n` +
                  `تم تأكيد طلبك بنجاح لدى سمارت فيجن جلف (مسقط).\n` +
                  `• الجهاز: ${dispatchInquiry.productName || 'اللابتوب المطلوب'}\n` +
                  `• الحالة: جاري إجراء فحص الـ 90 نقطة للبطارية والشاشة وتجهيز الشاحن الأصلي.\n` +
                  `سنوافيك بموعد انطلاق المندوب للتوصيل. شكراً لثقتكم!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDispatchInquiry(null)}
                className="block p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan transition-all text-left group"
              >
                <div className="font-bold text-white flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-cyan">
                    <Clock className="w-4 h-4" />
                    1. Order Confirmed &amp; In Diagnostic Packing
                  </span>
                  <span className="text-[10px] text-white/50 group-hover:text-cyan font-mono">Send ➔</span>
                </div>
                <div className="text-[11px] text-white/60">
                  Notification confirming device reservation, 90-point inspection run, and initial packaging.
                </div>
              </a>

              {/* Template 2: Out for Delivery */}
              <a
                href={`https://wa.me/${dispatchInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `مرحباً ${dispatchInquiry.name}،\n` +
                  `طلبك الآن في الطريق إليك مع مندوب التوصيل داخل مسقط!\n` +
                  `• الجهاز: ${dispatchInquiry.productName || 'اللابتوب المطلوب'}\n` +
                  `• طريقة الدفع: عند الاستلام (كاش أو تحويل بنك مسقط)\n` +
                  `• ضمان المعاينة: يرجى فحص وتشغيل الجهاز وتجربة الشاحن في وجود المندوب قبل دفع أي مبلغ.\n` +
                  `شكراً لاختياركم سمارت فيجن جلف!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDispatchInquiry(null)}
                className="block p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-lime transition-all text-left group"
              >
                <div className="font-bold text-white flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-lime">
                    <Truck className="w-4 h-4" />
                    2. Out for Delivery with Driver (Inspect Before Pay)
                  </span>
                  <span className="text-[10px] text-white/50 group-hover:text-lime font-mono">Send ➔</span>
                </div>
                <div className="text-[11px] text-white/60">
                  Courier dispatch message with COD &quot;Inspect Before You Pay&quot; instructions.
                </div>
              </a>

              {/* Template 3: Ready for In-Store Pickup */}
              <a
                href={`https://wa.me/${dispatchInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `مرحباً ${dispatchInquiry.name}،\n` +
                  `جهازك (${dispatchInquiry.productName || 'اللابتوب المطلوب'}) جاهز للاستلام والتجربة في معرضنا بغلا هايتس، مسقط!\n` +
                  `• الموقع: محل رقم 10، غلا هايتس (قرب مخرج طريق مسقط السريع).\n` +
                  `• مواعيد العمل: 9:00 ص - 1:00 ظ | 4:30 ع - 10:00 م (الجمعة مساءً فقط).\n` +
                  `تتوفر مواقف سيارات مجانية أمام المحل. بانتظار تشريفكم!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDispatchInquiry(null)}
                className="block p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange transition-all text-left group"
              >
                <div className="font-bold text-white flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-orange">
                    <Building2 className="w-4 h-4" />
                    3. Ready for In-Store Inspection &amp; Pickup
                  </span>
                  <span className="text-[10px] text-white/50 group-hover:text-orange font-mono">Send ➔</span>
                </div>
                <div className="text-[11px] text-white/60">
                  Invites customer to test device at Shop 10 Ghala Heights showroom bench.
                </div>
              </a>

              {/* Template 4: Warranty Activation */}
              <a
                href={`https://wa.me/${dispatchInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `مرحباً ${dispatchInquiry.name}،\n` +
                  `تهانينا على استلام جهازك الجديد من سمارت فيجن جلف!\n` +
                  `• تم تفعيل ضمان المحل الشامل لمدة 6 أشهر.\n` +
                  `• استبدال فوري خلال 7 أيام في حال وجود أي ملاحظة فنية.\n` +
                  `احتفظ بهذه الرسالة كإثبات رسمي للضمان. يسعدنا دائماً خدمتكم عبر هذا الرقم.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDispatchInquiry(null)}
                className="block p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-light transition-all text-left group"
              >
                <div className="font-bold text-white flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-cyan-light">
                    <ShieldCheck className="w-4 h-4" />
                    4. 6-Month Shop Warranty Activation
                  </span>
                  <span className="text-[10px] text-white/50 group-hover:text-cyan-light font-mono">Send ➔</span>
                </div>
                <div className="text-[11px] text-white/60">
                  Confirms warranty commencement and 7-day instant replacement terms.
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Internal Notes Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#08153e] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Lead Details &amp; Internal Notes</h3>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1.5 rounded-lg bg-white/5 text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-white font-bold text-sm">{activeInquiry.name}</div>
              <div className="text-cyan-light font-mono">{activeInquiry.phone}</div>
              <div className="text-white/80">{activeInquiry.message}</div>
            </div>

            <div>
              <label className="block text-white/70 mb-1.5 font-semibold">
                Internal Sales &amp; Delivery Notes (Muscat Staff)
              </label>
              <textarea
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="e.g. Customer agreed on OMR 149. Delivery scheduled for Seeb at 5:00 PM today."
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveInquiry(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-xl bg-orange hover:bg-orange-hover text-white font-bold transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 80mm POS Thermal Receipt Modal */}
      <ThermalReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        product={receiptProduct}
        customerName={receiptInquiry?.name}
        customerPhone={receiptInquiry?.phone}
      />
    </div>
  );
}
