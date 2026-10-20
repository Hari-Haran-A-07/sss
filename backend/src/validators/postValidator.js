import { isNonEmptyString, isValidMongoId } from "../middleware/validateMiddleware.js";

const VALID_POST_TYPES = ["Static", "Carousel", "Reel", "Video"];
const VALID_PLATFORMS = ["Instagram", "Facebook", "X", "YouTube"];

/**
 * Validate post creation / scheduling request
 */
export const validateCreatePost = (req) => {
  const errors = [];
  const { brandId, title, postType, platform, caption, scheduledAt } = req.body;

  if (!isValidMongoId(brandId)) {
    errors.push("A valid brandId is required");
  }

  if (!isNonEmptyString(title)) {
    errors.push("Post title is required");
  } else if (title.trim().length > 200) {
    errors.push("Post title cannot exceed 200 characters");
  }

  if (!VALID_POST_TYPES.includes(postType)) {
    errors.push(`Invalid postType. Allowed: ${VALID_POST_TYPES.join(", ")}`);
  }

  if (!VALID_PLATFORMS.includes(platform)) {
    errors.push(`Invalid platform. Allowed: ${VALID_PLATFORMS.join(", ")}`);
  }

  if (!isNonEmptyString(caption)) {
    errors.push("Post caption is required");
  }

  if (!scheduledAt) {
    errors.push("scheduledAt timestamp is required");
  } else {
    const date = new Date(scheduledAt);
    if (isNaN(date.getTime())) {
      errors.push("scheduledAt must be a valid ISO date");
    }
  }

  return errors.length > 0 ? errors : null;
};

/**
 * Validate post update request
 */
export const validateUpdatePost = (req) => {
  const errors = [];
  const { title, postType, platform, scheduledAt } = req.body;

  if (title !== undefined && !isNonEmptyString(title)) {
    errors.push("Post title cannot be empty");
  }

  if (postType !== undefined && !VALID_POST_TYPES.includes(postType)) {
    errors.push(`Invalid postType. Allowed: ${VALID_POST_TYPES.join(", ")}`);
  }

  if (platform !== undefined && !VALID_PLATFORMS.includes(platform)) {
    errors.push(`Invalid platform. Allowed: ${VALID_PLATFORMS.join(", ")}`);
  }

  if (scheduledAt !== undefined) {
    const date = new Date(scheduledAt);
    if (isNaN(date.getTime())) {
      errors.push("scheduledAt must be a valid date");
    }
  }

  return errors.length > 0 ? errors : null;
};
