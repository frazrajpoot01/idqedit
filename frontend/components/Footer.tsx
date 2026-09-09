import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#ffffff] border-t border-[#dadad3] pt-12 pb-8 px-4 md:px-12">
      
      {/* Main Link Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">Categories</h4>
          <ul className="flex flex-col space-y-3 text-sm text-[#62625b] items-center md:items-start">
            <li><Link href="/products?category=Home Decor" className="hover:text-black transition-colors">Home Decor</Link></li>
            <li><Link href="/products?category=Tech" className="hover:text-black transition-colors">Tech & Office</Link></li>
            <li><Link href="/products?category=Food" className="hover:text-black transition-colors">Kitchen Gadgets</Link></li>
            <li><Link href="/products?category=Lifestyle" className="hover:text-black transition-colors">Lifestyle</Link></li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">About</h4>
          <ul className="flex flex-col space-y-3 text-sm text-[#62625b] items-center md:items-start">
            <li><Link href="/about" className="hover:text-black transition-colors">Our Story</Link></li>
            <li><Link href="/reviews" className="hover:text-black transition-colors">Curated Reviews</Link></li>
            <li><Link href="/contact-us" className="hover:text-black transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">Legal</h4>
          <ul className="flex flex-col space-y-3 text-sm text-[#62625b] items-center md:items-start">
            <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-black transition-colors">Affiliate Disclosure</Link></li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">Connect</h4>
          <ul className="flex flex-col space-y-3 text-sm text-[#62625b] items-center md:items-start">
            <li><Link href="https://www.facebook.com/profile.php?id=61593231346539" target="_blank" className="hover:text-black transition-colors">Facebook</Link></li>
            <li><Link href="https://www.instagram.com/ainee.hm" target="_blank" className="hover:text-black transition-colors">Instagram</Link></li>
            <li><Link href="#" target="_blank" className="hover:text-black transition-colors">TikTok</Link></li>
            <li><Link href="#" target="_blank" className="hover:text-black transition-colors">YouTube</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#dadad3] gap-4">
        <Link href="/" className="flex items-center">
          <img src="/idq_logo_red.png" alt="IDQ Edit Logo" className="h-20 w-auto object-contain mix-blend-multiply" />
        </Link>
        <p className="text-xs text-[#62625b]">
          © 2026 IDQ Edit. All rights reserved.
        </p>
      </div>
      
    </footer>
  );
}
