import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  affiliateUrl: string;
  couponCode?: string;
  category?: 'Home Decor' | 'Electronics' | 'Fashion' | 'Kitchen' | 'Lifestyle';
  images: string[];
  videoUrl?: string;
  description?: string;
  isFeatured: boolean;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the product.'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug.'],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price.'],
    },
    originalPrice: {
      type: Number,
    },
    affiliateUrl: {
      type: String,
      required: [true, 'Please provide an affiliate URL.'],
    },
    couponCode: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Home Decor', 'Electronics', 'Fashion', 'Kitchen', 'Lifestyle'],
    },
    images: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in development
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
