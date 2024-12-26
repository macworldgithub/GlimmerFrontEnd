import mongoose, { Schema, Document, Types } from "mongoose";

interface Salon extends Document {
  name: string;
  city: string;
  area: string;
  rating: number;
  reviewsCount: number;
  about: string;
  images: string[];
  openingHours: {
    open: string;
    close: string;
    days: string;
  };
  location: {
    address: string;
    city: string;
    area: string;
  };
  services: Types.ObjectId[];
  contactLink: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the salon schema
const salonSchema = new Schema<Salon>(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    about: { type: String },
    images: [{ type: String }],
    openingHours: {
      open: { type: String, required: true },
      close: { type: String, required: true },
      days: { type: String, required: true },
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
    },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    contactLink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.salon ||
  mongoose.model<Salon>("Salon", salonSchema);
