/**
 * 404 Not Found Handler for undefined routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Standardized API Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Handle Mongoose Invalid ObjectId CastError
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid format for resource identifier: '${err.value}'`;
  }

  // Handle Mongoose Duplicate Key Error (e.g. duplicate brand name or user email)
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value entered for ${duplicateField}. Please use another value.`;
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors || {}).map((e) => e.message);
    message = "Database Validation Failed";
  }

  // Handle JWT Error
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
};
