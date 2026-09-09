import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-soft)] flex flex-col">
      <nav className="h-[64px] bg-[var(--color-canvas)] border-b border-[var(--color-hairline)] px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="font-bold text-[var(--color-ink)] text-lg sm:text-xl">
            Admin Panel
          </Link>
          <Link href="/" className="text-[var(--color-mute)] hover:text-[var(--color-ink)] text-xs sm:text-sm">
            View Live Site
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LogoutButton />
        </div>
      </nav>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
