/**
 * Request Logging Middleware with High-Resolution Timing
 */
export const requestLogger = (req, res, next) => {
  const start = process.hrtime();
  const timestamp = new Date().toISOString();

  // Hook into response finish event
  res.on("finish", () => {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    const status = res.statusCode;

    // Format console output based on status code
    const statusColor =
      status >= 500
        ? "\x1b[31m" // Red
        : status >= 400
        ? "\x1b[33m" // Yellow
        : status >= 300
        ? "\x1b[36m" // Cyan
        : "\x1b[32m"; // Green

    const resetColor = "\x1b[0m";

    console.log(
      `[${timestamp}] ${req.method.padEnd(6)} ${req.originalUrl} ` +
        `${statusColor}${status}${resetColor} - ${durationMs}ms`
    );
  });

  next();
};
