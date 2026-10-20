import mongoose from "mongoose";

const calendarSchema = mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    postType: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Compound indexes for date range queries within a brand calendar
calendarSchema.index({ brandId: 1, date: 1 });
calendarSchema.index({ brandId: 1, platform: 1 });

export default mongoose.model("Calendar", calendarSchema);
