'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface ComparisonContextType {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (sku: string) => void;
  clearCompare: () => void;
  isInCompare: (sku: string) => boolean;
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = 'svgulf_compare_items_v1';

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareList(parsed.slice(0, 3));
        }
      }
    } catch {
      // Ignore local storage parse errors
    }
    setIsHydrated(true);
  }, []);

  const saveToStorage = (items: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable
    }
  };

  const addToCompare = (product: Product): boolean => {
    if (compareList.some((item) => item.sku === product.sku)) {
      return false;
    }
    if (compareList.length >= 3) {
      return false;
    }
    const updated = [...compareList, product];
    setCompareList(updated);
    saveToStorage(updated);
    setIsOpen(true);
    return true;
  };

  const removeFromCompare = (sku: string) => {
    const updated = compareList.filter((item) => item.sku !== sku);
    setCompareList(updated);
    saveToStorage(updated);
  };

  const clearCompare = () => {
    setCompareList([]);
    saveToStorage([]);
    setIsOpen(false);
  };

  const isInCompare = (sku: string) => {
    return compareList.some((item) => item.sku === sku);
  };

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
