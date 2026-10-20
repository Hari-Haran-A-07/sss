/**
 * Validation Middleware Factory
 * Accepts a validator function or schema and validates req.body, req.query, or req.params
 *
 * @param {Function} validatorFn - Function receiving req that returns an array of error messages or null
 * @returns {Function} Express middleware
 */
export const validate = (validatorFn) => {
  return (req, res, next) => {
    try {
      const errors = validatorFn(req);

      if (errors && errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: errors,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Common validation rules
 */
export const isNonEmptyString = (val) => typeof val === "string" && val.trim().length > 0;
export const isValidMongoId = (val) => typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
export const isValidUrl = (val) => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};
export const isValidEmail = (val) => {
  return typeof val === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
};
