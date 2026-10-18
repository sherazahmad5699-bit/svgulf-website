'use client';

import React, { useState, useMemo } from 'react';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import { InquiryLead } from '@/lib/adminTypes';
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
  AlertCircle
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { inquiries, updateInquiryStatus, deleteInquiryLead } = useSiteData();
  const { lang, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeInquiry, setActiveInquiry] = useState<InquiryLead | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

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

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `svgulf_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {lang === 'ar' ? 'سجل طلبات وواتساب العملاء' : 'Customer Inquiries & WhatsApp Leads'}
          </h1>
          <p className="text-xs text-cyan-light mt-1">
            {lang === 'ar'
              ? 'متابعة طلبات الشراء، عروض الترقية، والتواصل السريع عبر واتساب في مسقط.'
              : 'Direct customer leads from contact forms, upgrade configurators, and WhatsApp requests.'}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-all shrink-0"
        >
          <Download className="w-4 h-4 text-cyan-light" />
          <span>{lang === 'ar' ? 'تصدير ملف CSV' : 'Export Leads (CSV)'}</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
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
            placeholder={lang === 'ar' ? 'البحث بالاسم، الهاتف أو الموضوع...' : 'Search by name, phone, or subject...'}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-orange transition-all"
          />
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'new', 'contacted', 'resolved', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedStatus === status
                  ? 'bg-orange text-white shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-[#000F3D] text-white/60 uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Date & Source</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Subject & Message</th>
                <th className="py-3.5 px-4">Laptop Inquired</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40 text-sm">
                    {lang === 'ar' ? 'لا توجد طلبات تطابق معايير الفلترة' : 'No customer inquiries found.'}
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${inq.name}, thank you for contacting Smart Vision Gulf regarding ${inq.subject}. How may we assist you today?`
                  )}`;

                  return (
                    <tr key={inq.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-white/80">
                          {new Date(inq.createdAt).toLocaleDateString()}
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
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-lime hover:bg-lime-hover text-white font-bold text-xs shadow-sm transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </a>

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

      {/* Internal Notes Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#08153e] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Lead Details & Internal Notes</h3>
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
                Internal Sales & Delivery Notes (Muscat Staff)
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
    </div>
  );
}
