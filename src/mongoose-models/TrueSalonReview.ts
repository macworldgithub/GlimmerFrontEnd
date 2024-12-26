import mongoose, { Schema, Document, Types } from "mongoose";

interface TrueSalonReview extends Document {
  clientName: string;
  rating: number;
  userId: Types.ObjectId; // Reference to the user giving the review
  salonId: Types.ObjectId; // Reference to the salon being reviewed
  createdAt: Date;
  updatedAt: Date;
}

const TrueSalonReviewSchema = new Schema<TrueSalonReview>(
  {
    clientName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
  },
  { timestamps: true }
);

const TrueSalonReview =
  mongoose.models.TrueSalonReview ||
  mongoose.model<TrueSalonReview>("TrueSalonReview", TrueSalonReviewSchema);

export default TrueSalonReview;
