import mongoose, { Schema, Document } from "mongoose";

interface Product extends Document {
  name: string;
  price: number; // Original price in PKR
  rating: number; // Average rating out of 5
  imageUrl: string; // URL of the product image
  sale?: {
    discountedPrice: number; // Sale price
    discountPercentage: number; // Discount percentage
  };
  description: string; // Product description
  howToUse: string; // Instructions on how to use the product
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    imageUrl: { type: String, required: true },
    sale: {
      discountedPrice: { type: Number, required: false },
      discountPercentage: { type: Number, required: false },
    },
    description: { type: String, required: true },
    howToUse: { type: String, required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<Product>("Product", ProductSchema);

export default Product;
