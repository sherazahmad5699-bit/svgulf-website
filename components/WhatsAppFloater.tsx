'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { MessageCircle, Phone } from 'lucide-react';

export default function WhatsAppFloater() {
  const { t, dir } = useLanguage();

  const waUrl = 'https://wa.me/96894009501?text=Hello%20Smart%20Vision%20Gulf,%20I%20am%20interested%20in%20your%20laptops';
  const callUrl = 'tel:+96894009501';

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div 
        className={`hidden md:block fixed bottom-6 z-40 ${
          dir === 'rtl' ? 'left-6' : 'right-6'
        }`}
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-3 rounded-full bg-lime text-white font-extrabold text-sm shadow-xl shadow-lime/30 hover:bg-lime-hover hover:scale-105 transition-all duration-200"
          aria-label="Direct WhatsApp Chat"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange border-2 border-white animate-pulse" />
          </div>
          <span className="pr-1">{t.navOrderWhatsApp}</span>
        </a>
      </div>

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-ink-border p-2.5 shadow-2xl safe-area-bottom">
        <div className="grid grid-cols-12 gap-2 max-w-md mx-auto">
          
          {/* Main WhatsApp Button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-8 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-lime active:bg-lime-hover text-white font-extrabold text-sm shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t.navOrderWhatsApp}</span>
          </a>

          {/* Quick Call Button */}
          <a
            href={callUrl}
            className="col-span-4 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-navy active:bg-navy-light text-white font-bold text-xs shadow-md"
          >
            <Phone className="w-4 h-4 fill-current text-cyan-light" />
            <span>{t.contactQuickCall}</span>
          </a>

        </div>
      </div>
    </>
  );
}
