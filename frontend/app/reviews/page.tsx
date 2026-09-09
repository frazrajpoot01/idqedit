import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 5,
      date: "August 12, 2026",
      title: "Finally, a site that actually curates well",
      content: "I was so tired of scrolling through thousands of cheap products on other sites. IDQ Edit only shows the actual good stuff. I've bought three home decor items they recommended and the quality is insane for the price."
    },
    {
      id: 2,
      name: "Michael T.",
      rating: 5,
      date: "September 2, 2026",
      title: "Saved me hours of searching",
      content: "The tech gadgets featured here are exactly what I've been looking for. The direct links to the best deals saved me both time and money. Their aesthetic is so clean and easy to navigate."
    },
    {
      id: 3,
      name: "Emily R.",
      rating: 4,
      date: "July 28, 2026",
      title: "Great aesthetic finds",
      content: "Love the lifestyle and beauty sections. Everything feels very premium but the actual price tags on the linked products are super affordable. Highly recommend bookmarking this site."
    },
    {
      id: 4,
      name: "David Chen",
      rating: 5,
      date: "September 5, 2026",
      title: "My go-to for gifts",
      content: "Whenever I need to find a unique gift that looks expensive but isn't, I come here. The curated lists are always spot on with current trends."
    }
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[var(--color-canvas)] py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] tracking-tight">
            Curated Reviews
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            See what our community has to say about our product curation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="font-bold text-[var(--color-ink)]">{review.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{review.content}"
              </p>
              <div className="flex items-center justify-between text-sm text-gray-400 font-medium">
                <span>{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-[#f6f6f3] p-12 rounded-3xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Have feedback for us?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We are always looking to improve our curation process. Let us know how we did.
          </p>
          <Link href="/contact-us" className="inline-block bg-[var(--color-ink)] text-white px-8 py-4 rounded-[var(--radius-full)] font-bold hover:bg-black transition-colors shadow-sm">
            Leave a Review
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
