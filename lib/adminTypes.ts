import { Product } from '@/data/products';

export type { Product };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr?: string;
  publishedAt: string;
  readingTime: string;
  readingTimeAr: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ThemeSettings {
  announcementBanner: {
    enabled: boolean;
    textEn: string;
    textAr: string;
    linkUrl?: string;
    bgColor?: string;
  };
  promoBar: {
    enabled: boolean;
    textEn: string;
    textAr: string;
    code?: string;
    discountText?: string;
  };
  heroHeadline: {
    badgeEn: string;
    badgeAr: string;
    titlePart1En: string;
    titlePart1Ar: string;
    titleHighlightEn: string;
    titleHighlightAr: string;
    subtitleEn: string;
    subtitleAr: string;
  };
  contactNumbers: {
    primaryWhatsApp: string;
    secondaryWhatsApp: string;
    phoneCall: string;
    defaultWhatsAppMessage: string;
  };
  emergencyAlert: {
    enabled: boolean;
    badgeTextEn: string;
    badgeTextAr: string;
    detailsEn: string;
    detailsAr: string;
    type: 'info' | 'warning' | 'holiday';
  };
  branding: {
    accentColor: string;
    shopAddress: string;
    shopAddressAr: string;
    openingHoursEn: string;
    openingHoursAr: string;
  };
}

export interface InquiryLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  productSku?: string;
  productName?: string;
  createdAt: string;
  source: 'contact_form' | 'whatsapp_click' | 'upgrade_configurator' | 'bulk_b2b';
  status: 'new' | 'contacted' | 'resolved' | 'archived';
  notes?: string;
}

export interface AdminUser {
  username: string;
  role: 'superadmin' | 'manager';
  name: string;
}

export interface StoreData {
  products: Product[];
  blogs: BlogPost[];
  theme: ThemeSettings;
  inquiries: InquiryLead[];
  adminConfig?: {
    passwordHash?: string;
    updatedAt?: string;
  };
}
