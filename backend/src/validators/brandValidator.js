import { isNonEmptyString, isValidMongoId } from "../middleware/validateMiddleware.js";

/**
 * Validate brand creation request
 */
export const validateCreateBrand = (req) => {
  const errors = [];
  const { name, field } = req.body;

  if (!isNonEmptyString(name)) {
    errors.push("Brand name is required");
  } else if (name.trim().length < 2) {
    errors.push("Brand name must be at least 2 characters");
  } else if (name.trim().length > 100) {
    errors.push("Brand name cannot exceed 100 characters");
  }

  if (!isNonEmptyString(field)) {
    errors.push("Brand field/industry is required");
  } else if (field.trim().length > 100) {
    errors.push("Brand field cannot exceed 100 characters");
  }

  return errors.length > 0 ? errors : null;
};

/**
 * Validate brand update request
 */
export const validateUpdateBrand = (req) => {
  const errors = [];
  const { brandId } = req.params;
  const { name, field } = req.body;

  if (brandId && !isValidMongoId(brandId)) {
    errors.push("Invalid brand ID format");
  }

  if (name !== undefined) {
    if (!isNonEmptyString(name)) {
      errors.push("Brand name cannot be empty");
    } else if (name.trim().length < 2) {
      errors.push("Brand name must be at least 2 characters");
    }
  }

  if (field !== undefined && !isNonEmptyString(field)) {
    errors.push("Brand field cannot be empty");
  }

  return errors.length > 0 ? errors : null;
};
