import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-28 rounded-2xl bg-slate-200/80 mb-8 border border-slate-200" />

      {/* Filter / Search Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="h-12 flex-1 rounded-xl bg-slate-200/80" />
        <div className="h-12 w-48 rounded-xl bg-slate-200/80" />
      </div>

      {/* Filter Chips Skeleton */}
      <div className="flex gap-2 mb-8 overflow-hidden">
        <div className="h-8 w-20 rounded-xl bg-slate-200/80" />
        <div className="h-8 w-24 rounded-xl bg-slate-200/80" />
        <div className="h-8 w-24 rounded-xl bg-slate-200/80" />
        <div className="h-8 w-28 rounded-xl bg-slate-200/80" />
        <div className="h-8 w-20 rounded-xl bg-slate-200/80" />
      </div>

      {/* Product Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-4 shadow-sm"
          >
            {/* Image Placeholder */}
            <div className="h-44 rounded-xl bg-slate-200/70" />

            {/* Badges Placeholder */}
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-lg bg-slate-200/80" />
              <div className="h-5 w-24 rounded-lg bg-slate-200/80" />
            </div>

            {/* Title Placeholder */}
            <div className="h-5 w-3/4 rounded bg-slate-200/80" />
            <div className="h-4 w-1/2 rounded bg-slate-200/70" />

            {/* Specs Placeholder */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="h-3.5 w-full rounded bg-slate-200/60" />
              <div className="h-3.5 w-4/5 rounded bg-slate-200/60" />
            </div>

            {/* Price and CTA */}
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
              <div className="h-7 w-24 rounded bg-slate-200/80" />
              <div className="h-9 w-28 rounded-xl bg-slate-200/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
