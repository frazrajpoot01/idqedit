import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[var(--color-canvas)] py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-4xl font-extrabold text-[var(--color-ink)] tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
            Last Updated: September 2026
          </p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700 space-y-6 leading-relaxed">
          <p>
            Welcome to IDQ Edit. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using our site.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily view the materials (information or software) on IDQ Edit for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title. Under this license, you may not modify or copy the materials, use them for commercial purposes, or attempt to decompile any software contained on the site.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">3. Disclaimer</h2>
          <p>
            The materials on IDQ Edit are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">4. Limitations</h2>
          <p>
            In no event shall IDQ Edit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
          </p>
          
          <h2 className="text-2xl font-bold text-[var(--color-ink)] pt-4">5. Revisions</h2>
          <p>
            We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
