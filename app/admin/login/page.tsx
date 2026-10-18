'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/useAdminAuth';
import { useLanguage } from '@/components/LanguageContext';
import { 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  Globe,
  Sparkles
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const { lang, toggleLang, dir } = useLanguage();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(username, password);
    if (res.success) {
      router.push('/admin');
    } else {
      setError(
        lang === 'ar'
          ? 'اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.'
          : res.error || 'Invalid credentials. Please verify your admin password.'
      );
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('svgulf2026!');
    setError(null);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#000F3D] via-[#020A24] to-[#00081C] flex items-center justify-center p-4 relative overflow-hidden"
      dir={dir}
    >
      {/* Background High-Tech Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-navy-light/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Language Toggle in Top Corner */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-semibold backdrop-blur-md border border-white/10 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-light" />
          <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-[#08153e]/80 border border-white/15 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 mx-auto mb-4 shadow-lg shadow-black/40 flex items-center justify-center border border-white/20">
              <Image 
                src="/logo.jpeg" 
                alt="Smart Vision Gulf" 
                width={56} 
                height={56} 
                className="object-contain" 
                priority
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {lang === 'ar' ? 'بوابة إدارة سمارت فيجن الخليج' : 'svGulf Admin Portal'}
            </h1>
            <p className="text-xs text-cyan-light font-mono mt-1.5">
              {lang === 'ar' ? 'مسقط · مرتفعات غلا · محل رقم 10' : 'Muscat · Ghala Heights · Shop No. 10'}
            </p>
          </div>

          {/* Quick Demo Helper Notice */}
          <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-4 h-4 text-orange shrink-0" />
              <span>
                {lang === 'ar' ? 'بيانات الدخول الافتراضية متوفرة' : 'Default Credentials available'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 rounded-lg bg-orange/20 hover:bg-orange/30 text-orange text-xs font-bold transition-colors shrink-0"
            >
              {lang === 'ar' ? 'تعبئة تلقائية' : 'Auto Fill'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                {lang === 'ar' ? 'اسم المستخدم' : 'Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-orange hover:bg-orange-hover active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-orange/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{lang === 'ar' ? 'دخول لوحة التحكم' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/50">
            <ShieldCheck className="w-4 h-4 text-lime" />
            <span>
              {lang === 'ar' ? 'جلسة مشفرة وآمنة · سلطنة عُمان' : 'Encrypted Session · Muscat Production'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
