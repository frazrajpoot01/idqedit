import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse('Invalid product ID', { status: 400 });
    }

    await dbConnect();
    
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } },
      { new: true }
    );
    
    if (!product || !product.affiliateUrl) {
      return new NextResponse('Affiliate link not found', { status: 404 });
    }
    
    return NextResponse.redirect(product.affiliateUrl, 302);
  } catch (error) {
    console.error(`Error redirecting product:`, error);
    return new NextResponse('Server error', { status: 500 });
  }
}
