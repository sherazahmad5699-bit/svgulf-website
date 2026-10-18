'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, BlogPost, ThemeSettings, InquiryLead, StoreData } from '@/lib/adminTypes';
import { PRODUCTS } from '@/data/products';
import { SEED_BLOGS, SEED_THEME, SEED_INQUIRIES, getInitialStoreData } from '@/data/seedData';

interface SiteDataContextType {
  products: Product[];
  blogs: BlogPost[];
  theme: ThemeSettings;
  inquiries: InquiryLead[];
  isLoading: boolean;
  saveProduct: (product: Product) => Promise<boolean>;
  deleteProduct: (sku: string) => Promise<boolean>;
  saveBlog: (blog: BlogPost) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  saveTheme: (theme: ThemeSettings) => Promise<boolean>;
  addInquiryLead: (lead: Omit<InquiryLead, 'id' | 'createdAt'>) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: InquiryLead['status'], notes?: string) => Promise<boolean>;
  deleteInquiryLead: (id: string) => Promise<boolean>;
  resetToFactory: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEY = 'svgulf_site_store_v1';

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(SEED_BLOGS);
  const [theme, setTheme] = useState<ThemeSettings>(SEED_THEME);
  const [inquiries, setInquiries] = useState<InquiryLead[]>(SEED_INQUIRIES);
  const [isLoading, setIsLoading] = useState(true);

  // Sync to local storage
  const persistLocally = useCallback((data: StoreData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('svgulf_data_change', { detail: data }));
    } catch (e) {
      // Storage might be blocked
    }
  }, []);

  // Fetch from server API
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.ok) {
        const data: StoreData = await res.json();
        if (data.products && Array.isArray(data.products)) setProducts(data.products);
        if (data.blogs && Array.isArray(data.blogs)) setBlogs(data.blogs);
        if (data.theme) setTheme(data.theme);
        if (data.inquiries && Array.isArray(data.inquiries)) setInquiries(data.inquiries);
        persistLocally(data);
      }
    } catch (err) {
      // Server fetch failed, reliance on localStorage or fallback
    } finally {
      setIsLoading(false);
    }
  }, [persistLocally]);

  // Initial load: first from localStorage for instant paint, then refresh from server
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed: StoreData = JSON.parse(cached);
        if (parsed.products && Array.isArray(parsed.products)) setProducts(parsed.products);
        if (parsed.blogs && Array.isArray(parsed.blogs)) setBlogs(parsed.blogs);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.inquiries && Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
      }
    } catch (e) {
      // Ignore
    }

    refreshData();

    // Listen to storage events from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.products) setProducts(parsed.products);
          if (parsed.blogs) setBlogs(parsed.blogs);
          if (parsed.theme) setTheme(parsed.theme);
          if (parsed.inquiries) setInquiries(parsed.inquiries);
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshData]);

  // 1. Save Product
  const saveProduct = async (product: Product): Promise<boolean> => {
    let updatedProducts: Product[] = [];
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.sku === product.sku);
      if (idx >= 0) {
        updatedProducts = [...prev];
        updatedProducts[idx] = product;
      } else {
        updatedProducts = [product, ...prev];
      }
      return updatedProducts;
    });

    const snapshot: StoreData = {
      products: updatedProducts,
      blogs,
      theme,
      inquiries,
    };
    persistLocally(snapshot);

    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return true;
    } catch (e) {
      return true; // Still saved in local state
    }
  };

  // 2. Delete Product
  const deleteProduct = async (sku: string): Promise<boolean> => {
    let updatedProducts: Product[] = [];
    setProducts((prev) => {
      updatedProducts = prev.filter((p) => p.sku !== sku);
      return updatedProducts;
    });

    const snapshot: StoreData = {
      products: updatedProducts,
      blogs,
      theme,
      inquiries,
    };
    persistLocally(snapshot);

    try {
      await fetch(`/api/admin/products?sku=${encodeURIComponent(sku)}`, {
        method: 'DELETE',
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 3. Save Blog
  const saveBlog = async (blog: BlogPost): Promise<boolean> => {
    let updatedBlogs: BlogPost[] = [];
    setBlogs((prev) => {
      const idx = prev.findIndex((b) => b.id === blog.id || b.slug === blog.slug);
      if (idx >= 0) {
        updatedBlogs = [...prev];
        updatedBlogs[idx] = blog;
      } else {
        updatedBlogs = [blog, ...prev];
      }
      return updatedBlogs;
    });

    const snapshot: StoreData = {
      products,
      blogs: updatedBlogs,
      theme,
      inquiries,
    };
    persistLocally(snapshot);

    try {
      await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 4. Delete Blog
  const deleteBlog = async (id: string): Promise<boolean> => {
    let updatedBlogs: BlogPost[] = [];
    setBlogs((prev) => {
      updatedBlogs = prev.filter((b) => b.id !== id && b.slug !== id);
      return updatedBlogs;
    });

    const snapshot: StoreData = {
      products,
      blogs: updatedBlogs,
      theme,
      inquiries,
    };
    persistLocally(snapshot);

    try {
      await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 5. Save Theme
  const saveTheme = async (newTheme: ThemeSettings): Promise<boolean> => {
    setTheme(newTheme);
    const snapshot: StoreData = {
      products,
      blogs,
      theme: newTheme,
      inquiries,
    };
    persistLocally(snapshot);

    try {
      await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTheme),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 6. Inquiries
  const addInquiryLead = async (lead: Omit<InquiryLead, 'id' | 'createdAt'>): Promise<boolean> => {
    const newEntry: InquiryLead = {
      ...lead,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    let updatedInquiries: InquiryLead[] = [];
    setInquiries((prev) => {
      updatedInquiries = [newEntry, ...prev];
      return updatedInquiries;
    });

    persistLocally({
      products,
      blogs,
      theme,
      inquiries: updatedInquiries,
    });

    try {
      await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  const updateInquiryStatus = async (
    id: string,
    status: InquiryLead['status'],
    notes?: string
  ): Promise<boolean> => {
    let updatedInquiries: InquiryLead[] = [];
    setInquiries((prev) => {
      updatedInquiries = prev.map((item) =>
        item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item
      );
      return updatedInquiries;
    });

    persistLocally({
      products,
      blogs,
      theme,
      inquiries: updatedInquiries,
    });

    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  const deleteInquiryLead = async (id: string): Promise<boolean> => {
    let updatedInquiries: InquiryLead[] = [];
    setInquiries((prev) => {
      updatedInquiries = prev.filter((i) => i.id !== id);
      return updatedInquiries;
    });

    persistLocally({
      products,
      blogs,
      theme,
      inquiries: updatedInquiries,
    });

    try {
      await fetch(`/api/admin/orders?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 7. Reset to Factory
  const resetToFactory = async (): Promise<boolean> => {
    const factory = getInitialStoreData();
    setProducts(factory.products);
    setBlogs(factory.blogs);
    setTheme(factory.theme);
    setInquiries(factory.inquiries);
    persistLocally(factory);

    try {
      await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        products,
        blogs,
        theme,
        inquiries,
        isLoading,
        saveProduct,
        deleteProduct,
        saveBlog,
        deleteBlog,
        saveTheme,
        addInquiryLead,
        updateInquiryStatus,
        deleteInquiryLead,
        resetToFactory,
        refreshData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    // Graceful fallback for non-wrapped or server contexts
    return {
      products: PRODUCTS,
      blogs: SEED_BLOGS,
      theme: SEED_THEME,
      inquiries: SEED_INQUIRIES,
      isLoading: false,
      saveProduct: async () => false,
      deleteProduct: async () => false,
      saveBlog: async () => false,
      deleteBlog: async () => false,
      saveTheme: async () => false,
      addInquiryLead: async () => false,
      updateInquiryStatus: async () => false,
      deleteInquiryLead: async () => false,
      resetToFactory: async () => false,
      refreshData: async () => {},
    };
  }
  return context;
}
