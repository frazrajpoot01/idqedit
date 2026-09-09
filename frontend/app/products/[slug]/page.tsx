"use client";
import { useEffect, useState, use } from 'react';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import { ProductType } from '@/components/PinCard';
import ProductGrid from '@/components/ProductGrid';
import { Play, ChevronLeft, ChevronRight, Sparkles, Truck, ShieldCheck } from 'lucide-react';

type MediaItem = {
  type: 'image' | 'video';
  url: string;
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  const handlePrev = () => {
    if (mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex(m => m.url === activeMedia?.url);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
    setActiveMedia(mediaItems[prevIndex]);
  };

  const handleNext = () => {
    if (mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex(m => m.url === activeMedia?.url);
    const nextIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
    setActiveMedia(mediaItems[nextIndex]);
  };

  useEffect(() => {
    fetch(`/api/products/slug/${resolvedParams.slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        const items: MediaItem[] = [];
        if (data.images) data.images.forEach((img: string) => items.push({ type: 'image', url: img }));
        if (data.videoUrl) items.push({ type: 'video', url: data.videoUrl });
        setMediaItems(items);
        if (items.length > 0) setActiveMedia(items[0]);

        // Fetch related products
        if (data.category) {
          fetch(`/api/products?category=${encodeURIComponent(data.category)}`)
            .then(res => res.json())
            .then(relatedData => {
              if (Array.isArray(relatedData)) {
                setRelatedProducts(relatedData.filter((p: any) => p._id !== data._id).slice(0, 4));
              }
            })
            .catch(console.error);
        }
      })
      .catch(() => {
        // Fallback mock
        const mockProduct = {
          _id: 'mock-id',
          slug: resolvedParams.slug,
          title: 'Premium Handcrafted Coffee Maker',
          price: 149.99,
          originalPrice: 199.99,
          category: 'Home Decor',
          affiliateUrl: 'https://temu.com/mock',
          images: [
            'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200'
          ],
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        };
        setProduct(mockProduct);
        const items: MediaItem[] = [];
        mockProduct.images.forEach(img => items.push({ type: 'image', url: img }));
        items.push({ type: 'video', url: mockProduct.videoUrl });
        setMediaItems(items);
        setActiveMedia(items[0]);
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface-soft)]">
        <NavBar />
        <div className="flex justify-center py-40">
          <div className="w-8 h-8 rounded-full border-4 border-[var(--color-hairline)] border-t-[var(--color-primary)] animate-spin" />
        </div>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-[var(--color-surface-soft)] pb-24">
      <NavBar />
      
      <div className="max-w-[1200px] mx-auto pt-[var(--spacing-section)] px-4">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Column (Interactive Media Gallery) - Sticky */}
          <div className="md:w-1/2">
            <div className="sticky top-[96px]">
              
              {/* Main Viewer */}
              <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[16px] overflow-hidden bg-[#f6f6f3] shadow-sm group">
                {activeMedia?.type === 'video' ? (
                  <video 
                    key={activeMedia.url} // Force remount on URL change to ensure autoplay works
                    src={activeMedia.url} 
                    autoPlay 
                    muted 
                    loop 
                    controls 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : activeMedia?.type === 'image' ? (
                  <Image 
                    src={activeMedia.url}
                    alt={product.title}
                    fill
                    className="object-cover absolute inset-0"
                    priority
                  />
                ) : null}

                {/* Slider Buttons */}
                {mediaItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 text-black"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 text-black"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {mediaItems.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                  {mediaItems.map((media, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveMedia(media)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-[8px] cursor-pointer overflow-hidden border-2 transition-all ${
                        activeMedia?.url === media.url 
                          ? 'border-black opacity-100' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {media.type === 'video' ? (
                        <>
                          <video src={media.url} className="w-full h-full object-cover" muted />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </>
                      ) : (
                        <Image src={media.url} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Premium Information Architecture) */}
          <div className="md:w-1/2 flex flex-col pt-2 md:pt-0">
            <div className="bg-[var(--color-canvas)] p-8 rounded-[var(--radius-lg)] shadow-sm flex flex-col gap-8">
              
              {/* Category Tag */}
              <div>
                <div className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full w-max uppercase tracking-wider">
                  {product.category || 'Curated Find'}
                </div>
              </div>
              
              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight font-serif">
                {product.title}
              </h1>
              
              {/* Pricing Block */}
              <div className="flex items-end">
                <span className="text-3xl font-extrabold text-gray-900">
                  ${(product.price).toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-gray-400 line-through text-lg ml-2 mb-0.5">
                    ${(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Primary CTA */}
              <a 
                href={`/api/redirect/${product._id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white py-4 font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Buy on Temu
              </a>

              {/* Trust Badges */}
              <div className="flex flex-row justify-between items-center w-full border-t border-gray-100 pt-6">
                <div className="flex items-center text-xs text-gray-500 gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Brand New</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span className="font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-medium">90-Day Returns</span>
                </div>
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="text-sm text-gray-700 leading-relaxed mt-2 whitespace-pre-wrap">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 font-serif">Specs & Details</h3>
                  <p>{product.description}</p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1200px] mx-auto mt-24 px-4 border-t border-[var(--color-hairline)] pt-16">
          <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-8 font-serif">More in {product.category || 'Curated Finds'}</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}

    </main>
  );
}
