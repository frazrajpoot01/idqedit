import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[var(--color-canvas)] py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-4xl font-extrabold text-[var(--color-ink)] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
            Last Updated: September 2026
          </p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700 space-y-6 leading-relaxed">
          <p>
            At IDQ Edit, your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">1. Information We Collect</h2>
          <p>
            We may collect non-personally identifiable information such as your browser type, device type, and referring website when you interact with our platform. If you contact us via our contact form, we will collect the name and email address you provide to us to respond to your inquiry.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">2. Cookies and Tracking</h2>
          <p>
            We use cookies to analyze site traffic and improve your browsing experience. These cookies do not store any personally identifiable information. You can configure your browser to decline cookies, though this may limit your ability to use certain features of the site.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">3. Third-Party Links</h2>
          <p>
            Our website contains affiliate links to third-party marketplaces (such as Temu). Once you click on these links and leave our website, we are no longer responsible for the protection and privacy of any information you provide. You should exercise caution and look at the privacy statement applicable to the website in question.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">4. Data Security</h2>
          <p>
            We take reasonable precautions to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our <Link href="/contact-us" className="text-[var(--color-primary)] hover:underline">Contact Page</Link>.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
