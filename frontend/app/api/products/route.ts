import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    let query: any = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (featured === 'true') query.isFeatured = true;

    await dbConnect();
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Protected route
    verifyAuth(request);

    await dbConnect();
    const body = await request.json();
    
    const product = await Product.create(body);
    
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.message === 'No authorization header' || error.message === 'Token missing' || error.message === 'Invalid token') {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation Error', details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}
