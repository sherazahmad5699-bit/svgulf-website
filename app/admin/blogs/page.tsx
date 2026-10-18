'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSiteData } from '@/components/SiteDataContext';
import { useLanguage } from '@/components/LanguageContext';
import { BlogPost } from '@/lib/adminTypes';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Clock,
  Tag,
  Star,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function AdminBlogsPage() {
  const { blogs, saveBlog, deleteBlog } = useSiteData();
  const { lang, dir } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const q = searchQuery.toLowerCase();
      return (
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.titleAr.includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [blogs, searchQuery]);

  const handleOpenAdd = () => {
    setEditingBlog({
      id: `blog-${Date.now()}`,
      slug: '',
      title: '',
      titleAr: '',
      excerpt: '',
      excerptAr: '',
      content: '',
      contentAr: '',
      author: 'Eng. Sheraz Ahmad',
      authorAr: 'م. شيراز أحمد',
      publishedAt: new Date().toISOString(),
      readingTime: '5 min read',
      readingTimeAr: 'قراءة في 5 دقائق',
      thumbnail: '/products/dell-latitude-5440.png',
      tags: ['Guide', 'Muscat', 'Hardware'],
      published: true,
      featured: false,
      metaTitle: '',
      metaDescription: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(JSON.parse(JSON.stringify(blog)));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    // Auto-generate slug if empty
    if (!editingBlog.slug) {
      editingBlog.slug = editingBlog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Auto-calculate reading time if needed
    const words = (editingBlog.content || '').split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    editingBlog.readingTime = `${mins} min read`;
    editingBlog.readingTimeAr = `قراءة في ${mins} دقائق`;

    await saveBlog(editingBlog);
    setIsModalOpen(false);
    setEditingBlog(null);
    showNotification(`Article saved successfully!`);
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    setDeleteConfirmId(null);
    showNotification(`Article removed.`);
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
            {lang === 'ar' ? 'إدارة مقالات المدونة والتقارير' : 'Blog Articles & Buying Guides'}
          </h1>
          <p className="text-xs text-cyan-light mt-1">
            {lang === 'ar'
              ? 'نشر وتعديل أدلة الشراء التقنية المتوافقة مع محركات البحث في عُمان.'
              : 'Author and publish SEO-optimized hardware guides and market insights for Muscat.'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-bold shadow-lg shadow-orange/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'كتابة مقال جديد' : 'Write New Article'}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#08153e]/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'البحث في عنوان المقال أو الوسوم...' : 'Search articles by title or tag...'}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-orange transition-all"
          />
        </div>

        <div className="text-xs text-white/60 font-mono">
          Total: <span className="font-bold text-white">{filteredBlogs.length}</span> articles
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
          <div className="col-span-full py-16 text-center text-white/40 text-sm">
            {lang === 'ar' ? 'لم يتم العثور على مقالات' : 'No articles found matching search query.'}
          </div>
        ) : (
          filteredBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-[#08153e]/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col group hover:border-white/20 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative h-44 bg-navy-deep flex items-center justify-center p-4 border-b border-white/10">
                <div className="relative w-32 h-32">
                  <Image
                    src={b.thumbnail || '/products/dell-latitude-5440.png'}
                    alt={b.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      b.published
                        ? 'bg-lime/20 text-lime border border-lime/30'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {b.published ? 'Published' : 'Draft'}
                  </span>
                  {b.featured && (
                    <span className="p-1 rounded-full bg-orange/20 text-orange" title="Featured">
                      <Star className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-cyan-light font-mono mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{b.readingTime}</span>
                    <span>·</span>
                    <span>{new Date(b.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-light transition-colors line-clamp-2">
                    {lang === 'ar' ? b.titleAr : b.title}
                  </h3>

                  <p className="text-xs text-white/60 mt-2 line-clamp-2">
                    {lang === 'ar' ? b.excerptAr : b.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    {b.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/70"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-cyan-light hover:underline font-semibold"
                  >
                    <span>{lang === 'ar' ? 'معاينة المقال' : 'Live Article'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 rounded-lg bg-orange/20 hover:bg-orange/30 text-orange transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(b.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / Write Article Modal */}
      {isModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#08153e] border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">
                  {editingBlog.title ? 'Edit Article' : 'Write New Tech Article'}
                </h2>
                <p className="text-xs text-cyan-light font-mono mt-0.5">svGulf Knowledge Base</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'content'
                    ? 'bg-orange text-white'
                    : 'bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                Article Content (Bilingual)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'seo'
                    ? 'bg-orange text-white'
                    : 'bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                SEO & Publishing Settings
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              {activeTab === 'content' ? (
                <>
                  {/* Titles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1">Article Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        placeholder="e.g. Dell Latitude vs HP EliteBook in Muscat"
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Article Title (Arabic) *</label>
                      <input
                        type="text"
                        required
                        value={editingBlog.titleAr}
                        onChange={(e) => setEditingBlog({ ...editingBlog, titleAr: e.target.value })}
                        placeholder="مثال: مقارنة ديل لاتيتيود ضد اتش بي في مسقط"
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-white/70 mb-1">
                      URL Slug (e.g. /blog/buying-laptops-muscat-guide)
                    </label>
                    <input
                      type="text"
                      value={editingBlog.slug}
                      onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                      placeholder="buying-refurbished-business-laptops-muscat-oman-guide"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  {/* Excerpts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1">Short Excerpt (English) *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingBlog.excerpt}
                        onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Short Excerpt (Arabic) *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingBlog.excerptAr}
                        onChange={(e) => setEditingBlog({ ...editingBlog, excerptAr: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Full Body */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1">Article Body (English Markdown) *</label>
                      <textarea
                        rows={10}
                        required
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Article Body (Arabic Markdown) *</label>
                      <textarea
                        rows={10}
                        required
                        value={editingBlog.contentAr}
                        onChange={(e) => setEditingBlog({ ...editingBlog, contentAr: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-[11px] text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Publishing & SEO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1">Author Name</label>
                      <input
                        type="text"
                        value={editingBlog.author}
                        onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Thumbnail Image URL</label>
                      <input
                        type="text"
                        value={editingBlog.thumbnail}
                        onChange={(e) => setEditingBlog({ ...editingBlog, thumbnail: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={editingBlog.tags.join(', ')}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Dell, HP, Buying Guide, Muscat"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1">Custom SEO Title</label>
                      <input
                        type="text"
                        value={editingBlog.metaTitle || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, metaTitle: e.target.value })}
                        placeholder="Page title for Google search results"
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Custom SEO Meta Description</label>
                      <textarea
                        rows={2}
                        value={editingBlog.metaDescription || ''}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, metaDescription: e.target.value })
                        }
                        placeholder="Meta description for search snippets"
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingBlog.published}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, published: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-orange focus:ring-orange"
                      />
                      <span className="text-white font-medium">Published on Live Site</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingBlog.featured || false}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, featured: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-orange focus:ring-orange"
                      />
                      <span className="text-white font-medium">Featured Hero Article</span>
                    </label>
                  </div>
                </>
              )}

              {/* Actions */}
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
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#08153e] border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Confirm Article Deletion</h3>
            </div>
            <p className="text-xs text-white/70">
              Are you sure you want to delete this article? This will remove it from the public blog.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white text-xs font-semibold hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
