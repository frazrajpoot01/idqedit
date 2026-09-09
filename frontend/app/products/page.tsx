"use client";
import { useEffect, useState, useMemo, Suspense } from 'react';
import NavBar from '@/components/NavBar';
import ProductGrid from '@/components/ProductGrid';
import { ProductType } from '@/components/PinCard';
import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  'Clothing', 'Lifestyle', 'Home Decor', 'Beauty', 
  'Educational', 'Food', 'Fitness', 'Self Care', 'Tech'
];

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $25', value: 'under_25' },
  { label: '$25 to $50', value: '25_to_50' },
  { label: 'Over $50', value: 'over_50' },
];

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State from URL or Defaults
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const sortParam = searchParams.get('sort') || 'newest';
  const priceParam = searchParams.get('price') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
        }
      })
      .catch(() => {
        setProducts(mockProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  // Generic function to update URL params
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All' && value !== 'all' && value !== 'newest' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    updateParams('q', e.target.value);
  };

  // Client-side filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (categoryParam !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === categoryParam.toLowerCase());
    }

    // Search Query Filter
    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Price Filter
    if (priceParam === 'under_25') result = result.filter(p => p.price < 25);
    if (priceParam === '25_to_50') result = result.filter(p => p.price >= 25 && p.price <= 50);
    if (priceParam === 'over_50') result = result.filter(p => p.price > 50);

    // Sort
    result.sort((a, b) => {
      if (sortParam === 'price_asc') return a.price - b.price;
      if (sortParam === 'price_desc') return b.price - a.price;
      return 0; // newest (fallback to array order)
    });

    return result;
  }, [products, categoryParam, sortParam, queryParam, priceParam]);

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Top Header Card */}
        <div className="w-full bg-white rounded-[16px] shadow-sm border border-[#dadad3] p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl md:text-3xl text-black leading-tight font-bold">All Products</h1>
            <p className="font-sans text-sm text-[#62625b] mt-1">Showing {filteredAndSortedProducts.length} products</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-[#f6f6f3] border-none text-sm text-black rounded-full px-4 py-2.5 focus:ring-2 focus:ring-black outline-none w-full sm:w-auto min-w-[150px] font-sans"
            />

            {/* Sort Dropdown */}
            <select 
              value={sortParam}
              onChange={(e) => updateParams('sort', e.target.value)}
              className="bg-[#f6f6f3] border-none text-sm text-black rounded-full px-4 py-2.5 focus:ring-2 focus:ring-black outline-none w-full sm:w-auto min-w-[150px] font-sans cursor-pointer"
            >
              <option value="newest" disabled className="hidden">All Categories</option>
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Price Range Dropdown */}
            <select 
              value={priceParam}
              onChange={(e) => updateParams('price', e.target.value)}
              className="bg-[#f6f6f3] border-none text-sm text-black rounded-full px-4 py-2.5 focus:ring-2 focus:ring-black outline-none w-full sm:w-auto min-w-[150px] font-sans cursor-pointer"
            >
              <option value="all" disabled className="hidden">Price Range</option>
              {PRICE_RANGES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Browse Categories */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-[var(--color-canvas)] rounded-[var(--radius-lg)] p-6 shadow-sm border border-[var(--color-hairline)] sticky top-[88px]">
              <h2 className="text-[20px] font-bold text-[var(--color-ink)] mb-4">Browse Categories</h2>
              <p className="text-xs font-bold text-[var(--color-mute)] tracking-wider uppercase mb-4">Popular Categories</p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateParams('category', 'All')}
                  className={`col-span-2 px-4 py-3 rounded-[var(--radius-full)] text-sm font-semibold text-left transition-colors border ${
                    categoryParam === 'All' 
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' 
                      : 'bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-hairline)] hover:border-gray-400'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateParams('category', cat)}
                    className={`px-3 py-2.5 rounded-[var(--radius-md)] text-[13px] font-semibold text-left transition-colors border ${
                      categoryParam === cat 
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-hairline)] hover:border-gray-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Area: Product Grid */}
          <div className="lg:w-3/4">
            <ProductGrid products={filteredAndSortedProducts} loading={loading} />
          </div>

        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#fef5f5]"> 
      {/* Background tint inspired by the screenshot's soft pink/cream backdrop */}
      <NavBar />
      <Suspense fallback={
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-[var(--color-hairline)] border-t-[var(--color-primary)] animate-spin" />
        </div>
      }>
        <ProductsContent />
      </Suspense>
    </main>
  );
}

const mockProducts: ProductType[] = [
  {
    _id: '1',
    slug: 'cozy-cloud-sofa',
    title: 'Cozy Cloud Modular Sofa - Premium Minimalist Design',
    price: 299.99,
    originalPrice: 450.00,
    category: 'Home Decor',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true
  },
  {
    _id: '2',
    slug: 'minimalist-desk-lamp',
    title: 'Minimalist Desk Lamp with Wireless Charging',
    price: 34.50,
    category: 'Tech',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'],
  },
  {
    _id: '3',
    slug: 'ceramic-matcha-set',
    title: 'Traditional Ceramic Matcha Tea Set with Bamboo Whisk',
    price: 45.00,
    category: 'Food',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1582787019777-62a26c483252?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true
  },
  {
    _id: '4',
    slug: 'noise-cancelling-headphones',
    title: 'Over-Ear Active Noise Cancelling Headphones - Cream',
    price: 89.99,
    category: 'Tech',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800'],
  },
  {
    _id: '5',
    slug: 'linen-bedding-set',
    title: '100% French Linen Bedding Set - Earth Tones',
    price: 110.00,
    category: 'Home Decor',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'],
  },
  {
    _id: '6',
    slug: 'smart-diffuser',
    title: 'Smart Essential Oil Diffuser with Ambient Light',
    price: 28.99,
    category: 'Lifestyle',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1608528577891-eb055848fa73?auto=format&fit=crop&q=80&w=800'],
  },
  {
    _id: '7',
    slug: 'workout-bands',
    title: 'Premium Resistance Bands Set',
    price: 19.99,
    category: 'Fitness',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'],
  },
  {
    _id: '8',
    slug: 'skincare-fridge',
    title: 'Mini Skincare Fridge with LED Mirror',
    price: 49.99,
    category: 'Beauty',
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true
  }
];
