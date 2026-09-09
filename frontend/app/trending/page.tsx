"use client";
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductGrid from '@/components/ProductGrid';
import { ProductType } from '@/components/PinCard';

export default function TrendingPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          // Mock data fallback if DB empty
          setProducts([
            {
              _id: '1',
              slug: 'cozy-cloud-sofa',
              title: 'Cozy Cloud Modular Sofa - Premium Minimalist Design',
              price: 29999,
              originalPrice: 45000,
              category: 'Home Decor',
              affiliateUrl: 'https://temu.com/mock',
              images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'],
              isFeatured: true
            },
            {
              _id: '3',
              slug: 'ceramic-matcha-set',
              title: 'Traditional Ceramic Matcha Tea Set with Bamboo Whisk',
              price: 4500,
              category: 'Food',
              affiliateUrl: 'https://temu.com/mock',
              images: ['https://images.unsplash.com/photo-1582787019777-62a26c483252?auto=format&fit=crop&q=80&w=800'],
              isFeatured: true
            },
            {
              _id: '8',
              slug: 'skincare-fridge',
              title: 'Mini Skincare Fridge with LED Mirror',
              price: 4999,
              category: 'Beauty',
              affiliateUrl: 'https://temu.com/mock',
              images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800'],
              isFeatured: true
            }
          ]);
        }
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#fef5f5]"> 
      <NavBar />
      
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 font-extrabold mb-4 tracking-tight">Trending Curations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our most popular and highly sought-after lifestyle upgrades, handpicked by our editors for exceptional quality and aesthetics.
          </p>
        </div>
        
        <ProductGrid products={products} loading={loading} />
      </div>
    </main>
  );
}
