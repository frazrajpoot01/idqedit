"use client";
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid hydration mismatch and don't show on the login page itself
  if (!isMounted) return null;
  if (pathname === '/admin/login') return null;

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm font-semibold text-[var(--color-mute)] hover:text-[#e60023] transition-colors px-3 py-1.5 rounded-full hover:bg-rose-50"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
