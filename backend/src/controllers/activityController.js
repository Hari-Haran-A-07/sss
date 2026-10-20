import ActivityLog from "../models/ActivityLog.js";
import asyncHandler from "express-async-handler";
import { paginate } from "../utils/paginate.js";

/**
 * Helper to record activity events
 */
export const recordActivity = async ({
  brandId,
  userId,
  action,
  entityType,
  entityId,
  summary,
  metadata = {},
}) => {
  try {
    return await ActivityLog.create({
      brandId,
      userId,
      action,
      entityType,
      entityId,
      summary,
      metadata,
    });
  } catch (err) {
    console.error("Failed to record activity log:", err.message);
  }
};

/**
 * @route   GET /api/activity/brand/:brandId
 * @desc    Get audit trail activities for a brand
 * @access  Private
 */
export const getBrandActivities = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const { action, limit = 25 } = req.query;

  const filter = { brandId };
  if (action) {
    filter.action = action;
  }

  const logs = await ActivityLog.find(filter)
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit, 10));

  res.json({
    count: logs.length,
    activities: logs,
  });
});
