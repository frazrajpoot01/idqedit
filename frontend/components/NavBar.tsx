"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TikTok = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <header className="w-full flex flex-col bg-white relative z-50">
      {/* Topbar */}
      <div className="w-full bg-[#fafafa] flex items-center justify-center py-2.5 border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <a href="https://www.facebook.com/profile.php?id=61593231346539" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 text-gray-500 hover:text-rose-600 transition-colors duration-300 ease-in-out cursor-pointer" /></a>
          <a href="https://www.instagram.com/ainee.hm" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-gray-500 hover:text-rose-600 transition-colors duration-300 ease-in-out cursor-pointer" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><TikTok className="w-5 h-5 text-gray-500 hover:text-rose-600 transition-colors duration-300 ease-in-out cursor-pointer" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><Youtube className="w-5 h-5 text-gray-500 hover:text-rose-600 transition-colors duration-300 ease-in-out cursor-pointer" /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full px-4 md:px-12 py-3 bg-white">
        
        {/* Left: Logo */}
        <div className="flex justify-start items-center">
          <Link href="/" className="flex items-center">
            <img src="/idq_logo_red.png" alt="IDQ Edit Logo" className="h-24 md:h-28 w-auto object-contain mix-blend-multiply" />
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex justify-center items-center gap-2">
          {[
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/products' },
            { name: 'Trending', href: '/trending' },
            { name: 'Contact Us', href: '/contact-us' },
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`transition-colors ${
                  isActive 
                    ? 'bg-black text-white px-4 py-2 rounded-full font-semibold text-sm' 
                    : 'text-sm font-semibold text-black hover:text-[#e60023] px-4 py-2'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Hamburger Menu (Mobile) / Admin (Desktop) */}
        <div className="flex justify-end md:hidden items-center gap-3">
          {isAdminLoggedIn && (
            <Link href="/admin/products" className="text-xs font-bold text-[#e60023] bg-rose-50 px-3 py-1.5 rounded-full">
              Admin
            </Link>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-black hover:text-[#e60023] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        <div className="hidden md:flex justify-end items-center">
          {isAdminLoggedIn && (
            <Link 
              href="/admin/products" 
              className="bg-black hover:bg-[#e60023] text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
            >
              Admin Panel
            </Link>
          )}
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white border-b border-[#dadad3] py-4 space-y-2 px-4 shadow-xl absolute top-full left-0 w-full z-50">
          {[
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/products' },
            { name: 'Trending', href: '/trending' },
            { name: 'Contact Us', href: '/contact-us' },
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors w-full text-center py-3 rounded-xl ${
                  isActive 
                    ? 'bg-black text-white font-semibold text-base' 
                    : 'text-base font-semibold text-black bg-[#f6f6f3] hover:bg-gray-200'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

    </header>
  );
}
