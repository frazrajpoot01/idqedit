import NavBar from '@/components/NavBar';

export default function AffiliateDisclosurePage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[var(--color-canvas)] py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-4xl font-extrabold text-[var(--color-ink)] tracking-tight mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
            Transparency is our priority
          </p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700 space-y-6 leading-relaxed">
          <p className="text-xl font-medium text-[var(--color-ink)]">
            IDQ Edit is supported by our readers. When you buy through links on our site, we may earn an affiliate commission.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">How It Works</h2>
          <p>
            Our team of curators spends countless hours researching, testing, and reviewing the best products available online. In order to support our operations and keep the site free for all users, we participate in various affiliate marketing programs.
          </p>
          <p>
            This means that if you click on a product link on our website and make a purchase, we may receive a small commission directly from the retailer at no additional cost to you.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">Our Commitment to You</h2>
          <p>
            Our relationship with you, our reader, is the most important thing to us. Therefore:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>We only recommend products that we genuinely believe are of high quality and provide excellent value.</li>
            <li>Our editorial opinions and recommendations are entirely our own and are never influenced by affiliate partnerships.</li>
            <li>We do not accept payments from brands to artificially inflate product rankings on our site.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">Specific Programs</h2>
          <p>
            IDQ Edit is a participant in affiliate programs for marketplaces such as Temu, Amazon, and others. As an affiliate, we earn from qualifying purchases. 
          </p>

          <div className="mt-12 p-6 bg-[#f6f6f3] rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-600 italic">
              "We appreciate your support. Clicking our links helps us continue to discover and curate the best aesthetic and trending products for you." — The IDQ Edit Team
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
