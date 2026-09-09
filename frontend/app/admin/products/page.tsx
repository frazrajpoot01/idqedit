"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { ProductType } from '@/components/PinCard';

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(console.error);
  }, [router]);

  const executeDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)]">Products</h1>
          <p className="text-[var(--color-mute)] mt-1">Manage your curated affiliate links</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-pressed)] text-white font-bold px-4 py-2 rounded-[var(--radius-full)] flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[var(--color-canvas)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
              <th className="p-4 font-semibold text-[var(--color-ink)]">Product</th>
              <th className="p-4 font-semibold text-[var(--color-ink)]">Price</th>
              <th className="p-4 font-semibold text-[var(--color-ink)]">Status</th>
              <th className="p-4 font-semibold text-[var(--color-ink)] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[var(--color-mute)]">
                  No products found. Start by adding one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.images[0] && (
                        <img src={product.images[0]} alt={product.title} className="w-12 h-12 rounded-[var(--radius-md)] object-cover" />
                      )}
                      <div>
                        <p className="font-semibold text-[var(--color-ink)] line-clamp-1">{product.title}</p>
                        <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-mute)] hover:text-blue-500 flex items-center gap-1 mt-1">
                          Temu Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    {product.isFeatured ? (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Featured</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">Standard</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product._id}/edit`} className="p-2 text-[var(--color-mute)] hover:bg-[var(--color-hairline)] rounded-full transition-colors block">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => setDeletingId(product._id!)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.length === 0 ? (
          <div className="bg-[var(--color-canvas)] p-8 text-center text-[var(--color-mute)] rounded-[var(--radius-lg)] shadow-sm">
            No products found. Start by adding one.
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-[var(--color-canvas)] rounded-[var(--radius-lg)] shadow-sm p-4 flex flex-col gap-4 border border-[var(--color-hairline)]">
              
              <div className="flex items-start gap-3">
                {product.images[0] && (
                  <img src={product.images[0]} alt={product.title} className="w-16 h-16 rounded-[var(--radius-md)] object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--color-ink)] line-clamp-2">{product.title}</p>
                  <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-mute)] hover:text-blue-500 flex items-center gap-1 mt-1">
                    Temu Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-[var(--color-hairline)] pt-3">
                <div className="font-medium text-lg">${product.price.toFixed(2)}</div>
                <div>
                  {product.isFeatured ? (
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Featured</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">Standard</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-[var(--color-hairline)] pt-3">
                <Link href={`/admin/products/${product._id}/edit`} className="px-4 py-2 text-sm font-semibold text-[var(--color-ink)] bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex items-center gap-2">
                  <Edit2 className="w-4 h-4" /> Edit
                </Link>
                <button 
                  onClick={() => setDeletingId(product._id!)}
                  className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Custom Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-canvas)] rounded-[var(--radius-lg)] shadow-2xl p-6 md:p-8 max-w-sm w-full border border-[var(--color-hairline)] transform transition-all">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2">Delete Product</h2>
            <p className="text-[var(--color-mute)] mb-8 text-sm">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 font-bold text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)] rounded-[var(--radius-full)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => executeDelete(deletingId)}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-[var(--radius-full)] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
