// Lightweight in-memory rate limiter used as a drop-in replacement for
// third-party packages during build/deploy. This keeps the runtime
// dependency surface small and avoids compatibility issues with
// different package exports.

type RateLimitOptions = {
  interval?: number; // interval length in ms
  uniqueTokenPerInterval?: number; // max unique tokens tracked per interval
};

type RateLimitResult = {
  success: boolean;
  resetAfter: number; // ms until the window resets
};

// Keep a global store so state survives module reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __edu_rate_limit_store: Map<string, { count: number; resetAt: number }> | undefined;
}

const globalStore = globalThis.__edu_rate_limit_store ||= new Map<string, { count: number; resetAt: number }>();

export const rateLimit = (options: RateLimitOptions = {}) => {
  const interval = options.interval ?? 60 * 1000; // 1 minute
  const uniqueTokenPerInterval = options.uniqueTokenPerInterval ?? 500;

  return {
    async check(request: Request, limit = 10): Promise<RateLimitResult> {
      // Use IP-like headers or fallback to user-agent so callers without
      // a real client IP still get scoped limits. This is intentionally
      // simple — for production consider a distributed store (Redis).
      const token =
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('user-agent') ||
        'anon';

      const windowKey = `${token}:${Math.floor(Date.now() / interval)}`;

      // Clean up old entries when map grows too large
      if (globalStore.size > uniqueTokenPerInterval * 10) {
        // naive cleanup: remove entries with resetAt < now
        const now = Date.now();
        for (const [k, v] of globalStore.entries()) {
          if (v.resetAt <= now) globalStore.delete(k);
        }
      }

      const now = Date.now();
      let entry = globalStore.get(windowKey);
      if (!entry) {
        entry = { count: 0, resetAt: Math.floor(now / interval) * interval + interval };
        globalStore.set(windowKey, entry);
      }

      entry.count += 1;
      const success = entry.count <= limit;
      const resetAfter = Math.max(0, entry.resetAt - now);

      return { success, resetAfter };
    },
  };
};

export default rateLimit;