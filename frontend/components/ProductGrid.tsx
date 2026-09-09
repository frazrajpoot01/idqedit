"use client";
import PinCard, { ProductType } from './PinCard';

export default function ProductGrid({ 
  products, 
  loading 
}: { 
  products: ProductType[];
  loading?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <PinCard key={product._id || product.slug} product={product} />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
        </div>
      )}
      
      {!loading && products.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-medium">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
}
