import { isNonEmptyString, isValidMongoId, isValidUrl } from "../middleware/validateMiddleware.js";

/**
 * Validate backlink creation request
 */
export const validateCreateBacklink = (req) => {
  const errors = [];
  const { brandId, userName, platform, contentTitle, contentBody, backlinkUrl, date } = req.body;

  if (brandId && !isValidMongoId(brandId)) {
    errors.push("Invalid brandId format");
  }

  if (!isNonEmptyString(userName)) {
    errors.push("User / Author name is required");
  }

  if (!isNonEmptyString(platform)) {
    errors.push("Platform name is required (e.g. Medium, Reddit, Dev.to)");
  }

  if (!isNonEmptyString(contentTitle)) {
    errors.push("Content title is required");
  }

  if (!isNonEmptyString(contentBody)) {
    errors.push("Content body description is required");
  }

  if (!isNonEmptyString(backlinkUrl)) {
    errors.push("Backlink URL is required");
  } else if (!isValidUrl(backlinkUrl)) {
    errors.push("Backlink URL must be a valid URL (including http:// or https://)");
  }

  if (!date) {
    errors.push("Backlink publication date is required");
  } else {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      errors.push("Date must be a valid date format");
    }
  }

  return errors.length > 0 ? errors : null;
};

/**
 * Validate backlink update request
 */
export const validateUpdateBacklink = (req) => {
  const errors = [];
  const { backlinkUrl, date, status } = req.body;

  if (backlinkUrl !== undefined && !isValidUrl(backlinkUrl)) {
    errors.push("Backlink URL must be a valid URL");
  }

  if (date !== undefined) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      errors.push("Date must be a valid date format");
    }
  }

  if (status !== undefined && !isNonEmptyString(status)) {
    errors.push("Status cannot be empty");
  }

  return errors.length > 0 ? errors : null;
};
