import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { StoreData, Product, BlogPost, ThemeSettings, InquiryLead } from './adminTypes';
import { getInitialStoreData } from '@/data/seedData';

// File paths for persistence
const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'store.json');
const TMP_STORE_PATH = path.join(os.tmpdir(), 'svgulf_store.json');

// Global in-memory cache to guarantee persistence across requests in serverless lifespan
let memoryCache: StoreData | null = null;

// Check if directory is genuinely writable
function isLocalWritable(): boolean {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const testFile = path.join(dataDir, `.write_probe_${Date.now()}.tmp`);
    fs.writeFileSync(testFile, '1');
    fs.unlinkSync(testFile);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getStoreData(): Promise<StoreData> {
  if (memoryCache) {
    return memoryCache;
  }

  const localWritable = isLocalWritable();

  // In read-only / serverless environments (e.g. Vercel), runtime mutations are written to TMP_STORE_PATH.
  // Check TMP_STORE_PATH first if local is not writable.
  if (!localWritable) {
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
      // Ignore and fallback to local bundled file
    }
  }

  // Try reading bundled / local store.json
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.blogs)) {
        memoryCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[serverStore] Failed reading LOCAL_STORE_PATH:', err);
  }

  // If local is writable, also try TMP_STORE_PATH as fallback
  if (localWritable) {
    try {
      if (fs.existsSync(TMP_STORE_PATH)) {
        const raw = fs.readFileSync(TMP_STORE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.blogs)) {
          memoryCache = parsed;
          return parsed;
        }
      }
    } catch (e) {}
  }

  // Fallback to initial seed data
  const initial = getInitialStoreData();
  memoryCache = initial;

  // Persist initial data to whichever path is available
  try {
    if (localWritable) {
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    }
    fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
  } catch (err) {
    // Memory cache remains active
  }

  return initial;
}

export async function saveStoreData(data: StoreData): Promise<StoreData> {
  memoryCache = data;
  data.adminConfig = {
    ...data.adminConfig,
    updatedAt: new Date().toISOString(),
  };

  const payload = JSON.stringify(data, null, 2);

  // Always attempt writing to TMP_STORE_PATH
  try {
    fs.writeFileSync(TMP_STORE_PATH, payload, 'utf-8');
  } catch (e) {
    console.warn('[serverStore] Could not write to TMP_STORE_PATH:', e);
  }

  // If local directory is writable, write to LOCAL_STORE_PATH as well
  if (isLocalWritable()) {
    try {
      fs.writeFileSync(LOCAL_STORE_PATH, payload, 'utf-8');
    } catch (err) {
      console.warn('[serverStore] Failed to write LOCAL_STORE_PATH:', err);
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

// Authentication & Cryptographic Session Security
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'svgulf2026!';
const DEFAULT_ADMIN_USERNAME = 'admin';
const AUTH_SECRET = process.env.ADMIN_JWT_SECRET || DEFAULT_ADMIN_PASSWORD + '_svgulf_salt_2026';

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return (
    user.trim().toLowerCase() === DEFAULT_ADMIN_USERNAME &&
    pass === DEFAULT_ADMIN_PASSWORD
  );
}

export function generateAdminSessionToken(user: string): string {
  const payload = {
    user,
    role: 'superadmin',
    issuedAt: Date.now(),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length === 2) {
      const [encodedPayload, signature] = parts;
      const expectedSig = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(encodedPayload)
        .digest('base64url');

      const sigBuf = Buffer.from(signature);
      const expBuf = Buffer.from(expectedSig);
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return false;
      }

      const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
      if (payload && payload.user === 'admin') {
        const maxAgeMs = 30 * 24 * 60 * 60 * 1000; // 30 days
        if (Date.now() - payload.issuedAt < maxAgeMs) {
          return true;
        }
      }
      return false;
    }

    // Fallback backwards-compatibility for plain base64 tokens during migration
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user === 'admin') {
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

export function isRequestAuthorized(request: Request): boolean {
  // 1. Check Authorization Bearer header
  const authHeader = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (authHeader && verifyAdminSessionToken(authHeader)) {
    return true;
  }

  // 2. Check Cookie header
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/svgulf_admin_session=([^;]+)/);
  if (match && match[1]) {
    const cookieToken = decodeURIComponent(match[1]);
    if (verifyAdminSessionToken(cookieToken)) {
      return true;
    }
  }

  return false;
}
