"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/products');
      } else {
        setError(data.error || 'Login failed');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Server error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-[#fbfbf9] px-4 py-12 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e60023] to-transparent opacity-30"></div>

      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative z-10 border border-gray-100">
        
        <div className="flex justify-center mb-8">
           <img src="/idq_logo_red.png" alt="IDQ Edit Logo" className="h-10 w-auto object-contain" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black font-[family-name:var(--font-playfair)] mb-3 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Enter your credentials to access the dashboard.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 mb-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e60023]/20 focus:border-[#e60023] transition-all text-black font-medium"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e60023]/20 focus:border-[#e60023] transition-all text-black font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-[#e60023] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-sm flex items-center justify-center mt-6 text-sm tracking-wide"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
