import mongoose, { Schema, Document, Types } from "mongoose";

interface TrueProductReview extends Document {
  clientName: string;
  rating: number;
  userId: Types.ObjectId; // Reference to the user giving the review
  productId: Types.ObjectId; // Reference to the product being reviewed
  createdAt: Date;
  updatedAt: Date;
}

const TrueProductReviewSchema = new Schema<TrueProductReview>(
  {
    clientName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const TrueProductReview =
  mongoose.models.TrueProductReview ||
  mongoose.model<TrueProductReview>(
    "TrueProductReview",
    TrueProductReviewSchema
  );

export default TrueProductReview;
