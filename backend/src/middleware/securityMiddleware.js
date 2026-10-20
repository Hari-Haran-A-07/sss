/**
 * HTTP Security Headers Middleware
 * Protects against XSS, clickjacking, MIME sniffing, and information disclosure
 */
export const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent framing to mitigate clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Basic XSS protection for older browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Disable DNS prefetching
  res.setHeader("X-DNS-Prefetch-Control", "off");

  // Remove Express footprint
  res.removeHeader("X-Powered-By");

  next();
};
