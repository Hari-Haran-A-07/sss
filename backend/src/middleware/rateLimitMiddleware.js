/**
 * In-memory sliding window rate limiter
 * Protects endpoints against brute force and DDoS floods
 */

class MemoryRateLimiter {
  constructor(windowMs = 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = new Map();

    // Periodically prune stale entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000).unref();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now - record.resetTime > this.windowMs) {
        this.requests.delete(key);
      }
    }
  }

  middleware(customMax, customWindowMs) {
    const max = customMax || this.maxRequests;
    const window = customWindowMs || this.windowMs;

    return (req, res, next) => {
      // IP address fallback
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        "127.0.0.1";

      const key = `${ip}:${req.baseUrl || req.path}`;
      const now = Date.now();

      let record = this.requests.get(key);

      if (!record || now - record.resetTime > window) {
        record = { count: 1, resetTime: now };
        this.requests.set(key, record);
      } else {
        record.count += 1;
      }

      res.setHeader("X-RateLimit-Limit", max);
      res.setHeader(
        "X-RateLimit-Remaining",
        Math.max(0, max - record.count)
      );
      res.setHeader(
        "X-RateLimit-Reset",
        new Date(record.resetTime + window).toISOString()
      );

      if (record.count > max) {
        return res.status(429).json({
          success: false,
          message: "Too many requests, please slow down and try again shortly.",
          retryAfterSeconds: Math.ceil((record.resetTime + window - now) / 1000),
        });
      }

      next();
    };
  }
}

// Global API limiter: 120 requests per minute
export const apiLimiter = new MemoryRateLimiter(60 * 1000, 120);

// Sensitive Auth limiter: 20 attempts per 15 minutes
export const authLimiter = new MemoryRateLimiter(15 * 60 * 1000, 20);
