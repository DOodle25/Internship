const mongoose = require("mongoose");

const rfmSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    recency: {
      type: Number,
      required: true,
    },
    frequency: {
      type: Number,
      required: true,
    },
    monetary: {
      type: Number,
      required: true,
    },
    recencyScore: {
      type: Number,
      required: true,
    },
    frequencyScore: {
      type: Number,
      required: true,
    },
    monetaryScore: {
      type: Number,
      required: true,
    },
    rfmSegment: {
      type: String,
      required: true,
      enum: [
        "VIP Customer",
        "Loyal Customer",
        "At-Risk Customer",
        "New Customer",
        "Other",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RFM", rfmSchema);
