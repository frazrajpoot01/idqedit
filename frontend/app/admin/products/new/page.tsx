"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

export default function NewProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    price: '',
    originalPrice: '',
    affiliateUrl: '',
    category: 'Home Decor',
    images: [''],
    videoUrl: '',
    description: '',
    isFeatured: false
  });
  const [error, setError] = useState('');

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        images: formData.images.map(s => s.trim()).filter(Boolean)
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        router.push('/admin/products');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create product');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-8">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="bg-[var(--color-canvas)] p-5 md:p-8 rounded-[var(--radius-lg)] shadow-sm space-y-6">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-[var(--radius-md)]">{error}</div>}
        
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-semibold mb-1">Product URL Path</label>
            <input 
              required
              type="text" 
              value={formData.slug}
              onChange={e => setFormData({...formData, slug: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Price ($)</label>
            <input 
              required
              type="number" step="0.01"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Original Price ($)</label>
            <input 
              type="number" step="0.01"
              value={formData.originalPrice}
              onChange={e => setFormData({...formData, originalPrice: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Affiliate URL (Temu Link)</label>
            <input 
              required
              type="url" 
              value={formData.affiliateUrl}
              onChange={e => setFormData({...formData, affiliateUrl: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            >
              <option value="Clothing">Clothing</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Beauty">Beauty</option>
              <option value="Educational">Educational</option>
              <option value="Food">Food</option>
              <option value="Fitness">Fitness</option>
              <option value="Self Care">Self Care</option>
              <option value="Tech">Tech</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-3">Product Images</label>
            <div className="space-y-3">
              {formData.images.map((imgUrl, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    required={index === 0}
                    type="url" 
                    placeholder="https://..."
                    value={imgUrl}
                    onChange={e => handleImageChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
                  />
                  {formData.images.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeImageField(index)} 
                      className="px-4 flex items-center justify-center bg-red-50 text-red-600 rounded-[var(--radius-md)] hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={addImageField} 
              className="mt-3 text-sm font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Another Image
            </button>

            {/* Image Previews */}
            {formData.images.some(img => img.trim() !== '') && (
              <div className="flex flex-wrap gap-3 mt-4 p-4 bg-[var(--color-surface-soft)] rounded-[var(--radius-md)] border border-[var(--color-hairline)]">
                {formData.images.filter(img => img.trim() !== '').map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200 bg-white">
                    <img 
                      src={img} 
                      alt={`Preview ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.currentTarget.parentElement as HTMLDivElement).style.display = 'none';
                      }} 
                    />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 rounded-sm font-bold backdrop-blur-sm">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Video URL (optional hover preview)</label>
            <input 
              type="url" 
              placeholder="https://..."
              value={formData.videoUrl}
              onChange={e => setFormData({...formData, videoUrl: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Specs & Details</label>
            <textarea 
              rows={4}
              placeholder="Detailed specs & details..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[#7fb5ff] resize-y"
            />
          </div>

          <div className="col-span-2 flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="isFeatured" className="font-semibold text-sm">Feature this product (Trending Deal tag)</label>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-hairline)] flex justify-end gap-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 font-bold text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)] rounded-[var(--radius-full)] transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-pressed)] text-white font-bold rounded-[var(--radius-full)] transition-colors">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
