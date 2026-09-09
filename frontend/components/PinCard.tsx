"use client";
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ProductType {
  _id: string;
  slug: string;
  title: string;
  price: number;
  originalPrice?: number;
  category?: string;
  affiliateUrl: string;
  images: string[];
  videoUrl?: string;
  description?: string;
  isFeatured?: boolean;
}

export default function PinCard({ product, index }: { product: ProductType; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Stagger entry animation on scroll
  useGSAP(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  // Video hover animation crossfade
  useGSAP(() => {
    if (!videoRef.current || !product.videoUrl) return;
    
    if (isHovered) {
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
      gsap.to(videoRef.current, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(videoRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }});
    }
  }, [isHovered, product.videoUrl]);

  const placeholderImage = 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800'; // Aesthetic placeholder

  return (
    <div 
      ref={cardRef} 
      className="flex flex-col group cursor-pointer opacity-0 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block relative">
        {/* Strict Image Container Wrapper */}
        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden bg-[#f6f6f3] mb-3">
          
          <Image 
            src={(!imageError && product?.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) ? product.images[0] : placeholderImage} 
            alt={product?.title || 'Product'} 
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
          
          {/* Video Crossfade */}
          {product.videoUrl && (
            <video 
              ref={videoRef}
              src={product.videoUrl}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
            />
          )}

          {/* Hover Overlay Darken (Optional subtle effect) */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Featured Tag (Pill) inside relative wrapper */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
              TRENDING
            </div>
          )}
        </div>
      </Link>


      {/* Product Info / Text Container */}
      <div className="px-1">
        {product.category && (
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            {product.category}
          </span>
        )}
        <h3 className="text-sm font-semibold text-black leading-tight line-clamp-2 mb-1">
          {product.title}
        </h3>
        <div className="flex items-center">
          <span className="text-sm font-bold text-black">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-500 line-through ml-2 font-normal">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
