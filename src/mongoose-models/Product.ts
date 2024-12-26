import mongoose, { Schema, Document } from "mongoose";
import { ProductType } from "@/types";

interface IProduct extends Document, Omit<ProductType, "_id"> {}

const ProductVariationSchema = new Schema({
	title: { type: String, required: true },
	variations: { type: [String], required: true },
});

const ProductSchema = new Schema<IProduct>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String, required: true },
	howToUse: { type: String, required: true },
	maxAllowedInCart: { type: Number, required: true },
	rating: { type: Number, required: true },
	price: { type: Number, required: true },
	discountPercent: { type: Number },
	salonRefId: { type: String, required: true },
	variations: { type: [ProductVariationSchema], required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
