import fs from 'fs';
import path from 'path';
import { StoreData, Product, BlogPost, ThemeSettings, InquiryLead } from './adminTypes';
import { getInitialStoreData } from '@/data/seedData';

// File paths for persistence
const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'store.json');
const TMP_STORE_PATH = path.join('/tmp', 'svgulf_store.json');

// Global in-memory cache to guarantee persistence across requests in serverless lifespan
let memoryCache: StoreData | null = null;

function getActiveFilePath(): string {
  // Check if we can write to cwd (local development or container)
  try {
    const testDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    return LOCAL_STORE_PATH;
  } catch (e) {
    return TMP_STORE_PATH;
  }
}

export async function getStoreData(): Promise<StoreData> {
  if (memoryCache) {
    return memoryCache;
  }

  const filePath = getActiveFilePath();

  // Try reading primary file
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.blogs)) {
        memoryCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[serverStore] Failed to read store file at:', filePath, err);
  }

  // Try reading fallback /tmp if filePath was LOCAL_STORE_PATH
  if (filePath !== TMP_STORE_PATH) {
    try {
      if (fs.existsSync(TMP_STORE_PATH)) {
        const raw = fs.readFileSync(TMP_STORE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.blogs)) {
          memoryCache = parsed;
          return parsed;
        }
      }
    } catch (err) {
      // Ignore
    }
  }

  // Fallback to initial seed data
  const initial = getInitialStoreData();
  memoryCache = initial;

  // Attempt to write seed data to disk
  try {
    fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), 'utf-8');
  } catch (err) {
    // If local write fails, try tmp
    try {
      fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[serverStore] Storage is in-memory only (read-only environment)');
    }
  }

  return initial;
}

export async function saveStoreData(data: StoreData): Promise<StoreData> {
  memoryCache = data;
  data.adminConfig = {
    ...data.adminConfig,
    updatedAt: new Date().toISOString(),
  };

  const filePath = getActiveFilePath();

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    try {
      fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[serverStore] Could not persist to disk, updated in-memory store.');
    }
  }

  return data;
}

// Product helpers
export async function getProducts(): Promise<Product[]> {
  const store = await getStoreData();
  return store.products;
}

export async function saveProduct(product: Product): Promise<Product> {
  const store = await getStoreData();
  const index = store.products.findIndex((p) => p.sku === product.sku);

  if (index >= 0) {
    store.products[index] = product;
  } else {
    store.products.unshift(product);
  }

  await saveStoreData(store);
  return product;
}

export async function deleteProduct(sku: string): Promise<boolean> {
  const store = await getStoreData();
  const initialLen = store.products.length;
  store.products = store.products.filter((p) => p.sku !== sku);
  if (store.products.length !== initialLen) {
    await saveStoreData(store);
    return true;
  }
  return false;
}

// Blog helpers
export async function getBlogs(): Promise<BlogPost[]> {
  const store = await getStoreData();
  return store.blogs;
}

export async function saveBlog(blog: BlogPost): Promise<BlogPost> {
  const store = await getStoreData();
  const index = store.blogs.findIndex((b) => b.id === blog.id || b.slug === blog.slug);

  if (index >= 0) {
    store.blogs[index] = blog;
  } else {
    store.blogs.unshift(blog);
  }

  await saveStoreData(store);
  return blog;
}

export async function deleteBlog(idOrSlug: string): Promise<boolean> {
  const store = await getStoreData();
  const initialLen = store.blogs.length;
  store.blogs = store.blogs.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
  if (store.blogs.length !== initialLen) {
    await saveStoreData(store);
    return true;
  }
  return false;
}

// Theme helpers
export async function getTheme(): Promise<ThemeSettings> {
  const store = await getStoreData();
  return store.theme;
}

export async function saveTheme(theme: ThemeSettings): Promise<ThemeSettings> {
  const store = await getStoreData();
  store.theme = theme;
  await saveStoreData(store);
  return theme;
}

// Inquiries / Leads helpers
export async function getInquiries(): Promise<InquiryLead[]> {
  const store = await getStoreData();
  return store.inquiries;
}

export async function addInquiry(
  inquiry: Omit<InquiryLead, 'id' | 'createdAt'>
): Promise<InquiryLead> {
  const store = await getStoreData();
  const newLead: InquiryLead = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  store.inquiries.unshift(newLead);
  await saveStoreData(store);
  return newLead;
}

export async function updateInquiry(
  id: string,
  updates: Partial<InquiryLead>
): Promise<InquiryLead | null> {
  const store = await getStoreData();
  const index = store.inquiries.findIndex((i) => i.id === id);
  if (index >= 0) {
    store.inquiries[index] = { ...store.inquiries[index], ...updates };
    await saveStoreData(store);
    return store.inquiries[index];
  }
  return null;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const store = await getStoreData();
  const initialLen = store.inquiries.length;
  store.inquiries = store.inquiries.filter((i) => i.id !== id);
  if (store.inquiries.length !== initialLen) {
    await saveStoreData(store);
    return true;
  }
  return false;
}

// Authentication check
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'svgulf2026!';
const DEFAULT_ADMIN_USERNAME = 'admin';

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return user.trim().toLowerCase() === DEFAULT_ADMIN_USERNAME && pass === DEFAULT_ADMIN_PASSWORD;
}

export function generateAdminSessionToken(user: string): string {
  const payload = {
    user,
    role: 'superadmin',
    issuedAt: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user === 'admin') {
      // Token valid for 30 days
      const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.issuedAt < maxAgeMs) {
        return true;
      }
    }
  } catch (e) {
    return false;
  }
  return false;
}
