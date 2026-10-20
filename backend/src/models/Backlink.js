import mongoose from "mongoose";

const backlinkSchema = mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      index: true,
    },

    userName: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    contentTitle: {
      type: String,
      required: true,
    },

    contentBody: {
      type: String,
      required: true,
    },

    backlinkUrl: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      default: "Live",
      index: true,
    },
  },
  { timestamps: true },
);

// Compound indexes for fast brand workspace lookups
backlinkSchema.index({ brandId: 1, date: -1 });
backlinkSchema.index({ brandId: 1, status: 1 });
backlinkSchema.index({ brandId: 1, platform: 1 });

export default mongoose.model("Backlink", backlinkSchema);
