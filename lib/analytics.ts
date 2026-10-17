/**
 * Client-Side Analytics & Event Tracking Utility
 * Supports Google Analytics 4 (gtag), Plausible, and custom dispatch events.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    plausible?: (eventName: string, options?: { props: Record<string, any> }) => void;
  }
}

export type AnalyticsEventName =
  | 'whatsapp_click'
  | 'phone_call_click'
  | 'product_view'
  | 'filter_change'
  | 'contact_form_submit'
  | 'copy_link'
  | 'cta_click'
  | 'upgrade_option_selected';

export function trackEvent(
  eventName: AnalyticsEventName | string,
  properties: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    ...properties,
  };

  // 1. Google Analytics 4 (gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  // 2. DataLayer push (GTM compatible)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  // 3. Plausible Analytics compatible
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: properties });
  }

  // 4. Custom DOM Event for internal components
  try {
    const customEvt = new CustomEvent('svgulf_analytics', { detail: payload });
    window.dispatchEvent(customEvt);
  } catch (e) {
    // Ignore in non-supporting contexts
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[svGulf Analytics] ${eventName}:`, payload);
  }
}

export function trackWhatsAppClick(source: string, productSku?: string, productName?: string) {
  trackEvent('whatsapp_click', {
    source,
    sku: productSku || 'general',
    product_name: productName || 'general_inquiry',
  });
}

export function trackPhoneCall(source: string, phoneNumber: string = '+96894009501') {
  trackEvent('phone_call_click', {
    source,
    phone_number: phoneNumber,
  });
}

export function trackProductView(sku: string, name: string, price: number) {
  trackEvent('product_view', {
    sku,
    name,
    price_omr: price,
  });
}

export function trackFilterChange(filterType: string, value: string) {
  trackEvent('filter_change', {
    filter_type: filterType,
    value,
  });
}

export function trackContactSubmit(method: 'form' | 'whatsapp', status: 'success' | 'failed') {
  trackEvent('contact_form_submit', {
    method,
    status,
  });
}
