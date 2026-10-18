'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface AdminAuthUser {
  username: string;
  name: string;
  role: string;
}

const AUTH_KEY = 'svgulf_admin_auth_token';
const USER_KEY = 'svgulf_admin_user';

export function useAdminAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<AdminAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const localToken = localStorage.getItem(AUTH_KEY);
      const localUser = localStorage.getItem(USER_KEY);

      if (localToken && localUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(localUser));
        setIsLoading(false);
        return true;
      }

      // If no local token, verify server session
      const res = await fetch('/api/admin/auth', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
          localStorage.setItem(AUTH_KEY, 'session_active');
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          setIsLoading(false);
          return true;
        }
      }

      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    } catch (e) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (userStr: string, passStr: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userStr, password: passStr }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || 'Authentication failed' };
      }

      localStorage.setItem(AUTH_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch (e) {}

    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
    router.push('/admin/login');
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    checkAuth,
  };
}
