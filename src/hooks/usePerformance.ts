/// <reference lib="dom" />
"use client";

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function usePerformance() {
  const metricsRef = useRef<PerformanceMetrics>({});

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Web Vitals tracking
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metricsRef.current.fcp = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metricsRef.current.lcp = entry.startTime;
            break;
          case 'first-input':
            metricsRef.current.fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as LayoutShiftEntry).hadRecentInput) {
              metricsRef.current.cls = (metricsRef.current.cls || 0) + (entry as LayoutShiftEntry).value;
            }
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance observer not supported');
    }

    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      metricsRef.current.ttfb = navigation.responseStart - navigation.requestStart;
    }

    return () => observer.disconnect();
  }, []);

  const getMetrics = () => metricsRef.current;

  const logMetrics = () => {
    const metrics = getMetrics();
    console.log('Performance Metrics:', metrics);

    // Could send to analytics service here
    if (typeof window !== 'undefined' && window.gtag) {
      Object.entries(metrics).forEach(([key, value]) => {
        if (value !== undefined) {
          window.gtag('event', `web_vitals_${key}`, {
            value: Math.round(value),
            custom_map: { metric_value: value }
          });
        }
      });
    }
  };

  return { getMetrics, logMetrics };
}

// Hook for measuring component render time
export function useRenderTime(componentName: string) {
  const startTimeRef = useRef<number>();

  useEffect(() => {
    startTimeRef.current = performance.now();
  });

  useEffect(() => {
    if (startTimeRef.current) {
      const renderTime = performance.now() - startTimeRef.current;
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);

      // Log slow renders (>16ms for 60fps)
      if (renderTime > 16) {
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }
  });
}
