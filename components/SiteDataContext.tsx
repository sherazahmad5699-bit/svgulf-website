'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
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
  addInquiryLead: (lead: Omit<InquiryLead, 'id' | 'createdAt' | 'status'> & { status?: InquiryLead['status'] }) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: InquiryLead['status'], notes?: string) => Promise<boolean>;
  deleteInquiryLead: (id: string) => Promise<boolean>;
  importStoreData: (data: StoreData) => Promise<boolean>;
  resetToFactory: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEY = 'svgulf_site_store_v1';
const AUTH_KEY = 'svgulf_admin_auth_token';

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem(AUTH_KEY);
  if (token && token !== 'session_active') {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  // Master synchronous store reference to eliminate React 18 state batching race conditions
  const storeDataRef = useRef<StoreData>({
    products: PRODUCTS,
    blogs: SEED_BLOGS,
    theme: SEED_THEME,
    inquiries: SEED_INQUIRIES,
  });

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(SEED_BLOGS);
  const [theme, setTheme] = useState<ThemeSettings>(SEED_THEME);
  const [inquiries, setInquiries] = useState<InquiryLead[]>(SEED_INQUIRIES);
  const [isLoading, setIsLoading] = useState(true);

  // Sync to local storage
  const persistLocally = useCallback((data: StoreData) => {
    storeDataRef.current = data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('svgulf_data_change', { detail: data }));
    } catch (e) {
      // Storage might be blocked or quota exceeded
    }
  }, []);

  // Fetch from server API
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data', {
        cache: 'no-store',
        headers: getAuthHeader(),
      });
      if (res.ok) {
        const data: StoreData = await res.json();
        const merged: StoreData = {
          products: Array.isArray(data.products) && data.products.length > 0 ? data.products : storeDataRef.current.products,
          blogs: Array.isArray(data.blogs) && data.blogs.length > 0 ? data.blogs : storeDataRef.current.blogs,
          theme: data.theme || storeDataRef.current.theme,
          inquiries: Array.isArray(data.inquiries) && data.inquiries.length > 0 ? data.inquiries : storeDataRef.current.inquiries,
        };

        storeDataRef.current = merged;
        setProducts(merged.products);
        setBlogs(merged.blogs);
        setTheme(merged.theme);
        setInquiries(merged.inquiries);
        persistLocally(merged);
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
        if (parsed.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
          storeDataRef.current = {
            products: parsed.products,
            blogs: Array.isArray(parsed.blogs) && parsed.blogs.length > 0 ? parsed.blogs : SEED_BLOGS,
            theme: parsed.theme || SEED_THEME,
            inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : SEED_INQUIRIES,
          };
          setProducts(storeDataRef.current.products);
          setBlogs(storeDataRef.current.blogs);
          setTheme(storeDataRef.current.theme);
          setInquiries(storeDataRef.current.inquiries);
        }
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
          if (parsed && Array.isArray(parsed.products)) {
            storeDataRef.current = parsed;
            setProducts(parsed.products);
            if (parsed.blogs) setBlogs(parsed.blogs);
            if (parsed.theme) setTheme(parsed.theme);
            if (parsed.inquiries) setInquiries(parsed.inquiries);
          }
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshData]);

  // 1. Save Product (Immediate synchronous calculation prevents React 18 batching wipeout)
  const saveProduct = async (product: Product): Promise<boolean> => {
    const prev = storeDataRef.current.products;
    const idx = prev.findIndex((p) => p.sku === product.sku);
    let nextProducts: Product[];
    if (idx >= 0) {
      nextProducts = [...prev];
      nextProducts[idx] = product;
    } else {
      nextProducts = [product, ...prev];
    }

    const updatedStore: StoreData = {
      ...storeDataRef.current,
      products: nextProducts,
    };
    persistLocally(updatedStore);
    setProducts(nextProducts);

    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(product),
      });
      return true;
    } catch (e) {
      return true; // Still saved in local state & localStorage
    }
  };

  // 2. Delete Product
  const deleteProduct = async (sku: string): Promise<boolean> => {
    const nextProducts = storeDataRef.current.products.filter((p) => p.sku !== sku);
    const updatedStore: StoreData = {
      ...storeDataRef.current,
      products: nextProducts,
    };
    persistLocally(updatedStore);
    setProducts(nextProducts);

    try {
      await fetch(`/api/admin/products?sku=${encodeURIComponent(sku)}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 3. Save Blog
  const saveBlog = async (blog: BlogPost): Promise<boolean> => {
    const prev = storeDataRef.current.blogs;
    const idx = prev.findIndex((b) => b.id === blog.id || b.slug === blog.slug);
    let nextBlogs: BlogPost[];
    if (idx >= 0) {
      nextBlogs = [...prev];
      nextBlogs[idx] = blog;
    } else {
      nextBlogs = [blog, ...prev];
    }

    const updatedStore: StoreData = {
      ...storeDataRef.current,
      blogs: nextBlogs,
    };
    persistLocally(updatedStore);
    setBlogs(nextBlogs);

    try {
      await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(blog),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 4. Delete Blog
  const deleteBlog = async (id: string): Promise<boolean> => {
    const nextBlogs = storeDataRef.current.blogs.filter((b) => b.id !== id && b.slug !== id);
    const updatedStore: StoreData = {
      ...storeDataRef.current,
      blogs: nextBlogs,
    };
    persistLocally(updatedStore);
    setBlogs(nextBlogs);

    try {
      await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 5. Save Theme
  const saveTheme = async (newTheme: ThemeSettings): Promise<boolean> => {
    const updatedStore: StoreData = {
      ...storeDataRef.current,
      theme: newTheme,
    };
    persistLocally(updatedStore);
    setTheme(newTheme);

    try {
      await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(newTheme),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 6. Inquiries
  const addInquiryLead = async (lead: Omit<InquiryLead, 'id' | 'createdAt' | 'status'> & { status?: InquiryLead['status'] }): Promise<boolean> => {
    const newEntry: InquiryLead = {
      ...lead,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: lead.status || 'new',
    };

    const nextInquiries = [newEntry, ...storeDataRef.current.inquiries];
    const updatedStore: StoreData = {
      ...storeDataRef.current,
      inquiries: nextInquiries,
    };
    persistLocally(updatedStore);
    setInquiries(nextInquiries);

    try {
      await fetch('/api/admin/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
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
    const nextInquiries = storeDataRef.current.inquiries.map((item) =>
      item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item
    );
    const updatedStore: StoreData = {
      ...storeDataRef.current,
      inquiries: nextInquiries,
    };
    persistLocally(updatedStore);
    setInquiries(nextInquiries);

    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ id, status, notes }),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  const deleteInquiryLead = async (id: string): Promise<boolean> => {
    const nextInquiries = storeDataRef.current.inquiries.filter((i) => i.id !== id);
    const updatedStore: StoreData = {
      ...storeDataRef.current,
      inquiries: nextInquiries,
    };
    persistLocally(updatedStore);
    setInquiries(nextInquiries);

    try {
      await fetch(`/api/admin/orders?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 7. Import Store Data
  const importStoreData = async (data: StoreData): Promise<boolean> => {
    const validated: StoreData = {
      products: Array.isArray(data.products) ? data.products : storeDataRef.current.products,
      blogs: Array.isArray(data.blogs) ? data.blogs : storeDataRef.current.blogs,
      theme: data.theme || storeDataRef.current.theme,
      inquiries: Array.isArray(data.inquiries) ? data.inquiries : storeDataRef.current.inquiries,
    };

    persistLocally(validated);
    setProducts(validated.products);
    setBlogs(validated.blogs);
    setTheme(validated.theme);
    setInquiries(validated.inquiries);

    try {
      await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ data: validated }),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  // 8. Reset to Factory
  const resetToFactory = async (): Promise<boolean> => {
    const factory = getInitialStoreData();
    persistLocally(factory);
    setProducts(factory.products);
    setBlogs(factory.blogs);
    setTheme(factory.theme);
    setInquiries(factory.inquiries);

    try {
      await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
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
        importStoreData,
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
      importStoreData: async () => false,
      resetToFactory: async () => false,
      refreshData: async () => {},
    };
  }
  return context;
}
