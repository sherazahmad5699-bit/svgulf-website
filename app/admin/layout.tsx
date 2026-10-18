'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/useAdminAuth';
import { useLanguage } from '@/components/LanguageContext';
import {
  LayoutDashboard,
  Laptop,
  BookOpen,
  Palette,
  ClipboardList,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Globe,
  ShieldCheck,
  Store,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, logout, user } = useAdminAuth();
  const { lang, toggleLang, dir } = useLanguage();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  // Handle route protection
  useEffect(() => {
    if (!isLoading && mounted) {
      const isLoginPage = pathname === '/admin/login';
      if (!isAuthenticated && !isLoginPage) {
        router.push('/admin/login');
      } else if (isAuthenticated && isLoginPage) {
        router.push('/admin');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, mounted]);

  // If on login page, render children directly without admin chrome
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#020A24] text-white">{children}</div>;
  }

  // Loading state during auth resolution
  if (isLoading || !mounted || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#020A24] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange flex items-center justify-center animate-pulse">
            <Laptop className="w-6 h-6 text-white" />
          </div>
          <div className="text-sm font-mono text-cyan-light">
            {lang === 'ar' ? 'جارٍ التحقق من صلاحيات المدير...' : 'Verifying svGulf Admin Access...'}
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      labelAr: 'لوحة التحكم',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      href: '/admin/products',
      label: 'Products Catalog',
      labelAr: 'كتالوج الأجهزة',
      icon: Laptop,
    },
    {
      href: '/admin/blogs',
      label: 'Blog & Articles',
      labelAr: 'المقالات والأخبار',
      icon: BookOpen,
    },
    {
      href: '/admin/theme',
      label: 'Theme & Banners',
      labelAr: 'المظهر والبنرات',
      icon: Palette,
    },
    {
      href: '/admin/orders',
      label: 'Inquiries & Leads',
      labelAr: 'طلبات وواتساب العملاء',
      icon: ClipboardList,
    },
    {
      href: '/admin/settings',
      label: 'Store Settings',
      labelAr: 'إعدادات المتجر',
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#020A24] text-slate-100 flex flex-col font-sans" dir={dir}>
      {/* Top Bar for Admin */}
      <header className="sticky top-0 z-40 bg-[#000F3D]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shadow">
                <Image src="/logo.jpeg" alt="svGulf Logo" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  svGulf <span className="text-orange text-xs uppercase px-1.5 py-0.5 rounded bg-orange/20 font-mono">Admin</span>
                </span>
                <span className="hidden sm:block text-[11px] text-cyan-light font-mono leading-none">
                  Shop 10 · Ghala Heights, Muscat
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Link to Storefront */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors border border-white/10"
            >
              <span>{lang === 'ar' ? 'عرض المتجر الرئيسي' : 'View Storefront'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-light" />
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 transition-colors border border-white/10"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-light" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* User Profile Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-light/40 border border-white/10 text-xs">
              <div className="w-2 h-2 rounded-full bg-lime animate-ping" />
              <span className="text-white/80 font-mono font-medium">{user?.username || 'admin'}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold transition-colors border border-red-500/20"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'خروج' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#000F3D]/40 border-r border-white/10 p-4">
          <div className="mb-4 px-3 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
            <span className="text-ink-muted text-white/60">Muscat VAT</span>
            <span className="font-mono text-lime font-bold">5% Inclusive</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-orange text-white shadow-md shadow-orange/20 font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-cyan-light'}`} />
                    <span>{lang === 'ar' ? item.labelAr : item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-lime/20 text-lime font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Support Badge */}
          <div className="mt-auto pt-4 border-t border-white/10 text-xs text-white/50 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-light font-mono text-[11px]">
              <Store className="w-3.5 h-3.5 text-orange shrink-0" />
              <span>Ghala Heights Shop 10</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-lime shrink-0" />
              <span>Sat-Thu: 9AM - 10PM</span>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-[#000F3D] border-r border-white/10 p-5 flex flex-col h-full z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="font-bold text-white text-base">svGulf Navigation</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 text-white/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-orange text-white font-bold'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-cyan-light" />
                        <span>{lang === 'ar' ? item.labelAr : item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime/20 text-lime font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'عرض المتجر' : 'View Store'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Log Out'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
