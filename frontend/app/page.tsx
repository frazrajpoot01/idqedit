"use client";
import { useEffect, useState, useRef } from 'react';
import NavBar from '@/components/NavBar';
import ProductGrid from '@/components/ProductGrid';
import { ProductType } from '@/components/PinCard';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowToast(true);
      setEmail('');
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Image animation
    gsap.fromTo(imageRef.current,
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Staggered text elements animation
    if (textRef.current) {
      const textElements = textRef.current.children;
      gsap.fromTo(textElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.2 }
      );
    }
  }, { scope: heroRef });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.filter(p => p.isFeatured).slice(0, 8));
        } else {
          setProducts(mockProducts);
        }
      })
      .catch(() => {
        setProducts(mockProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-surface-soft)] flex flex-col">
      <NavBar />

      {/* 1. Hero Section (Text) */}
      <section className="flex flex-col items-center text-center pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <h1 className="text-[44px] md:text-[70px] font-bold leading-[1.1] tracking-[-1.2px] text-black max-w-4xl mx-auto font-[family-name:var(--font-playfair)]">
          Curated deals for your <span className="text-[#e60023]">aesthetic life.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto font-normal">
          Discover the best finds from Temu, handpicked and reviewed.
        </p>
      </section>

      {/* 2. Visual "Top Categories" Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 mb-24 mt-16 md:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Tech & Gadgets", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", link: "/products?category=Tech" },
            { name: "Home Decor", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", link: "/products?category=Home Decor" },
            { name: "Kitchen", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800", link: "/products?category=Food" },
            { name: "Lifestyle", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800", link: "/products?category=Lifestyle" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.link} className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden group cursor-pointer shadow-sm block">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {/* Tile Text */}
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg z-10 pointer-events-none">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Feature Block 1 Wrapper (Pure White) */}
      <section className="w-full bg-[#ffffff] py-16 border-t border-[var(--color-hairline)]">
        {/* GSAP Animated Hero Feature Block */}
        <div ref={heroRef} className="px-4 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* Left Column (Media) */}
            <div ref={imageRef} className="relative w-full aspect-[4/3] md:aspect-square rounded-[16px] overflow-hidden bg-gray-100 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200"
                alt="Workspace Desk Setup"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Right Column (Editorial Text) */}
            <div ref={textRef} className="flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4 block">
                DAILY DISCOVERIES
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6 leading-tight font-[family-name:var(--font-playfair)]">
                Effortless Style for Every Corner of Your Life
              </h1>
              <p className="text-base text-gray-700 leading-relaxed mb-8">
                Explore our handpicked selection of trending, highly-rated products curated specifically for the modern aesthetic. From clever smart home gadgets to minimalist room decor and essential lifestyle upgrades, we find the best budget-friendly deals so you don't have to. Transform your living spaces and streamline your workflow with hidden gems that look stunning but cost a fraction of traditional retail prices.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Product Showcase (Soft Off-White) */}
      <section className="w-full bg-[#fbfbf9] py-16 border-t border-[var(--color-hairline)]">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 px-2">
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-black">Trending This Week</h2>
            <Link href="/products" className="text-sm font-bold text-[#e60023] hover:underline flex items-center gap-1">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={products} loading={loading} />
        </div>
      </section>

      {/* 5. Feature Block 2 Wrapper (Warm Cream) */}
      <section className="w-full bg-[#f6f6f3] py-16 border-t border-b border-[var(--color-hairline)]">
        {/* Editorial Blog Block 2 (Asymmetric Right) */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 w-full flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 block">HOME & LIFESTYLE</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6 leading-tight font-[family-name:var(--font-playfair)]">
              Quality Finds for Every Room
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-8">
              Whether you are organizing your workspace, refreshing your living area, or looking for practical daily tools, we highlight highly-rated essentials designed to make everyday life easier and more aesthetic. We sift through thousands of products to bring you the hidden gems that offer premium quality without the luxury price tag. Discover smart solutions that elevate your home’s functionality while perfectly matching your style.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[16px] overflow-hidden shadow-sm bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
                alt="Kitchen Gadgets"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* 7. High-Contrast Dark CTA Strip */}
      <section className="w-full bg-[#262622] text-white py-24 px-4 flex flex-col items-center text-center mt-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white font-[family-name:var(--font-playfair)]">
          Never miss a trending deal.
        </h2>
        <p className="text-base text-gray-300 mb-8 max-w-xl mx-auto">
          Join our newsletter for the latest budget finds and aesthetic upgrades.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-4 py-3 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e60023]"
            required
          />
          <button
            type="submit"
            className="bg-[#e60023] hover:bg-[#cc001f] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors shadow-sm"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 right-8 bg-white border border-[#dadad3] text-black px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 transition-all duration-500 z-50 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#fef5f5] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#e60023]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <span className="font-serif tracking-tight text-lg">Successfully subscribed!</span>
      </div>

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
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true,
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
  },
  {
    _id: '4',
    slug: 'noise-cancelling-headphones',
    title: 'Over-Ear Active Noise Cancelling Headphones - Cream',
    price: 89.99,
    originalPrice: 120.00,
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true,
  },
  {
    _id: '2',
    slug: 'minimalist-desk-lamp',
    title: 'Minimalist Desk Lamp with Wireless Charging',
    price: 34.50,
    originalPrice: 60.00,
    affiliateUrl: 'https://temu.com/mock',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true,
  }
];
