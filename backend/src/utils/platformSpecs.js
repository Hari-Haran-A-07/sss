/**
 * Platform Specifications and Content Constraints
 * Used for client & server content validation and formatting guidelines
 */

export const PLATFORM_SPECS = {
  Instagram: {
    name: "Instagram",
    maxCaptionLength: 2200,
    maxHashtags: 30,
    aspectRatios: ["1:1 (Square)", "4:5 (Portrait)", "9:16 (Reel)"],
    videoMaxDurationSeconds: 90, // Reels
    maxCarouselItems: 10,
    allowedMediaTypes: ["image/jpeg", "image/png", "video/mp4", "video/quicktime"],
  },
  Facebook: {
    name: "Facebook",
    maxCaptionLength: 63206,
    maxHashtags: 10, // Recommended
    aspectRatios: ["1:1 (Square)", "16:9 (Landscape)", "9:16 (Reel)"],
    videoMaxDurationSeconds: 240,
    maxCarouselItems: 10,
    allowedMediaTypes: ["image/jpeg", "image/png", "image/gif", "video/mp4"],
  },
  X: {
    name: "X (Twitter)",
    maxCaptionLength: 280,
    maxHashtags: 4,
    aspectRatios: ["16:9 (Landscape)", "1:1 (Square)"],
    videoMaxDurationSeconds: 140,
    maxCarouselItems: 4,
    allowedMediaTypes: ["image/jpeg", "image/png", "image/gif", "video/mp4"],
  },
  YouTube: {
    name: "YouTube",
    maxTitleLength: 100,
    maxCaptionLength: 5000, // Description
    maxHashtags: 15,
    aspectRatios: ["16:9 (Standard)", "9:16 (Shorts)"],
    videoMaxDurationSeconds: 43200, // 12 hours
    maxCarouselItems: 1,
    allowedMediaTypes: ["video/mp4", "video/quicktime", "video/webm"],
  },
};

/**
 * Validates text and media against target social platform constraints
 *
 * @param {string} platform
 * @param {string} caption
 * @returns {{ valid: boolean, warnings: Array<string> }}
 */
export const checkPlatformLimits = (platform, caption = "") => {
  const spec = PLATFORM_SPECS[platform];
  if (!spec) return { valid: true, warnings: [] };

  const warnings = [];
  const charCount = caption.length;

  if (charCount > spec.maxCaptionLength) {
    warnings.push(
      `Caption length (${charCount}) exceeds ${platform} limit of ${spec.maxCaptionLength} characters.`
    );
  }

  // Count hashtags (#word)
  const hashtagMatches = caption.match(/#[a-zA-Z0-9_]+/g) || [];
  if (hashtagMatches.length > spec.maxHashtags) {
    warnings.push(
      `Hashtags count (${hashtagMatches.length}) exceeds recommended ${platform} limit of ${spec.maxHashtags}.`
    );
  }

  return {
    valid: warnings.length === 0,
    warnings,
    stats: {
      charCount,
      remainingChars: Math.max(0, spec.maxCaptionLength - charCount),
      hashtagCount: hashtagMatches.length,
    },
  };
};
