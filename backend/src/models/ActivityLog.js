import mongoose from "mongoose";

const activityLogSchema = mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "POST_CREATED",
        "POST_UPDATED",
        "POST_SCHEDULED",
        "POST_PUBLISHED",
        "POST_FAILED",
        "POST_DELETED",
        "BACKLINK_CREATED",
        "BACKLINK_UPDATED",
        "BACKLINK_DELETED",
        "CALENDAR_EVENT_CREATED",
        "BRAND_UPDATED",
      ],
      index: true,
    },

    entityType: {
      type: String,
      enum: ["Post", "Backlink", "Calendar", "Brand"],
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    summary: {
      type: String,
      required: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

// Indexes for fast activity feeds
activityLogSchema.index({ brandId: 1, createdAt: -1 });

export default mongoose.model("ActivityLog", activityLogSchema);
