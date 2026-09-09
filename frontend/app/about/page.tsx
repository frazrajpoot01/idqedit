import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[var(--color-canvas)] py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] tracking-tight">
            Our Story
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Discover the passion and purpose behind IDQ Edit.
          </p>
        </div>

        <div className="prose prose-lg prose-gray max-w-none text-gray-700 space-y-6 leading-relaxed">
          <p>
            Welcome to IDQ Edit! We are a passionate team of curators dedicated to scouring the internet for the most unique, high-quality, and trending products.
          </p>
          
          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-6">Our Mission</h2>
          <p>
            The digital marketplace is overflowing with options, making it incredibly overwhelming to find products that actually live up to their hype. Our mission is to cut through the noise. We do the heavy lifting—researching, comparing, and analyzing—so you don't have to.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-6">Why Trust Us?</h2>
          <p>
            Every product featured on IDQ Edit has been carefully selected based on a strict criteria of quality, aesthetic appeal, and undeniable value. We believe that great design and high functionality shouldn't always come with a luxury price tag. 
          </p>

          <p>
            Whether you are looking for the latest viral tech gadget, minimalist home decor, or premium self-care essentials, our curated lists are designed to elevate your everyday life.
          </p>
        </div>

        <div className="pt-12 text-center">
          <Link href="/contact-us" className="inline-block bg-[var(--color-primary)] text-white px-8 py-4 rounded-[var(--radius-full)] font-bold hover:bg-[var(--color-primary-pressed)] transition-colors shadow-sm">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
