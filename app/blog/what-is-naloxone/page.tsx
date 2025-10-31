import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ArticleSchema from '@/components/structured-data/ArticleSchema';

export const metadata: Metadata = {
  title: 'What is Naloxone? | Naloxone Finder',
  description: 'Learn what naloxone (Narcan®) is, how it works to reverse opioid overdoses, and why carrying it can save lives. Discover its forms, safety, and community importance.',
  alternates: {
    canonical: '/blog/what-is-naloxone',
  },
  keywords: ['naloxone', 'narcan', 'opioid overdose', 'overdose reversal', 'naloxone nasal spray', 'what is naloxone', 'harm reduction'],
  authors: [{ name: 'Naloxone Finder Team' }],
  openGraph: {
    title: 'What is Naloxone? | Naloxone Finder',
    description: 'Learn what naloxone (Narcan®) is, how it works to reverse opioid overdoses, and why carrying it can save lives.',
    type: 'article',
    url: '/blog/what-is-naloxone',
    publishedTime: '2025-01-15T00:00:00.000Z',
    modifiedTime: '2025-10-31T00:00:00.000Z',
    authors: ['Naloxone Finder Team'],
    section: 'Education',
    tags: ['naloxone', 'narcan', 'opioid overdose', 'harm reduction', 'overdose prevention'],
  },
};

export default function WhatIsNaloxonePage() {
  return (
    <div className="min-h-screen bg-white font-heebo">
      <ArticleSchema
        headline="What is Naloxone?"
        description="Learn what naloxone (Narcan®) is, how it works to reverse opioid overdoses, and why carrying it can save lives. Discover its forms, safety, and community importance."
        datePublished="2025-01-15T00:00:00.000Z"
        dateModified="2025-10-31T00:00:00.000Z"
        authorName="Naloxone Finder Team"
        imageUrl="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/what-is-naloxone.jpg"
        url="/blog/what-is-naloxone"
        section="Education"
        keywords={['naloxone', 'narcan', 'opioid overdose', 'overdose reversal', 'naloxone nasal spray', 'what is naloxone', 'harm reduction']}
      />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/findmynaloxone-logo.png"
              alt="Naloxone Finder"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-xl md:text-2xl font-light">Naloxone Finder</h1>
          </Link>
          <Link
            href="/"
            className="text-sm md:text-base px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li>/</li>
            <li><Link href="#" className="hover:text-gray-900">Blog</Link></li>
            <li>/</li>
            <li className="font-medium text-gray-900">What is Naloxone</li>
          </ol>
        </nav>

        {/* Article */}
        <article>
          {/* Hero Image */}
          <div className="mb-8 rounded-xl overflow-hidden border border-gray-300">
            <Image
              src="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/what-is-naloxone.jpg"
              alt="Community naloxone awareness event with free naloxone distribution"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light mb-4">What is Naloxone?</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <time>Last updated: 2025</time>
            <span>•</span>
            <span>5 min read</span>
          </div>

          {/* Table of Contents */}
          <div className="bg-light-grey border border-gray-300 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-medium mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:underline" style={{ color: '#F9542E' }}>How Naloxone Works</a></li>
                <li><a href="#forms" className="hover:underline" style={{ color: '#F9542E' }}>Forms of Naloxone</a></li>
                <li><a href="#who-can-use" className="hover:underline" style={{ color: '#F9542E' }}>Who Can Use Naloxone?</a></li>
                <li><a href="#safety" className="hover:underline" style={{ color: '#F9542E' }}>Is Naloxone Safe?</a></li>
                <li><a href="#why-carry" className="hover:underline" style={{ color: '#F9542E' }}>Why Carry Naloxone?</a></li>
                <li><a href="#where-to-get" className="hover:underline" style={{ color: '#F9542E' }}>Where to Get Naloxone</a></li>
                <li><a href="#how-long" className="hover:underline" style={{ color: '#F9542E' }}>How Long Does Naloxone Last?</a></li>
                <li><a href="#key-takeaways" className="hover:underline" style={{ color: '#F9542E' }}>Key Takeaways</a></li>
              </ul>
            </nav>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-800">
              Naloxone, commonly known by the brand name Narcan®, is a life-saving medication designed to rapidly reverse opioid overdoses. It works by blocking the effects of opioids in the brain, quickly restoring normal breathing in a person whose breathing has slowed or stopped due to opioid use.
            </p>
          </div>

          {/* How Naloxone Works */}
          <section id="how-it-works" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">How Naloxone Works</h2>
            <p className="text-gray-800 leading-relaxed mb-6">
              Opioids such as heroin, fentanyl, and prescription painkillers (like oxycodone and morphine) attach to specific receptors in the brain that control breathing. In an overdose, these receptors become overly activated, slowing breathing to dangerous levels. Naloxone acts as an opioid antagonist — it binds to those same receptors but blocks and displaces the opioids, reversing their life-threatening effects within minutes.
            </p>
            {/* Image: Narcan Product */}
            <div className="rounded-xl overflow-hidden border border-gray-300 mb-6">
              <Image
                src="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/what-is-naloxone-2.jpg"
                alt="Narcan naloxone nasal spray - life-saving medication for opioid overdose reversal"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>

          {/* Forms of Naloxone */}
          <section id="forms" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Forms of Naloxone</h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              Naloxone comes in several easy-to-use forms so that anyone — not just medical professionals — can administer it in an emergency. The most common forms include:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-2xl">💨</span>
                <div>
                  <strong>Nasal Spray (Narcan® or generic):</strong> The simplest form to use. Spray once into one nostril; no assembly required.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💉</span>
                <div>
                  <strong>Injectable Naloxone:</strong> Requires drawing the medication into a syringe and injecting it into a muscle (thigh, arm, or buttock).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🩺</span>
                <div>
                  <strong>Auto-Injector (EVZIO®):</strong> A pre-filled device that gives verbal instructions as you administer the dose.
                </div>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              Each option is equally effective at reversing an opioid overdose. Nasal sprays are most common in community settings because they&apos;re safe, portable, and require no medical training.
            </p>
          </section>

          {/* Who Can Use Naloxone */}
          <section id="who-can-use" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Who Can Use Naloxone?</h2>
            <p className="text-gray-800 leading-relaxed">
              Anyone can use naloxone — you don&apos;t need to be a doctor or first responder. Many states, including Washington, allow pharmacists to dispense naloxone without a prescription. Families, friends, and community members can carry it to help someone experiencing an overdose. Training is available at most community health centers and online through public health departments.
            </p>
          </section>

          {/* Is Naloxone Safe */}
          <section id="safety" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Is Naloxone Safe?</h2>
            <p className="text-gray-800 leading-relaxed">
              Yes. Naloxone is very safe and has no potential for abuse or addiction. It only works on people who have opioids in their system — it won&apos;t cause harm if administered to someone not using opioids. Possible side effects are mild and may include temporary withdrawal symptoms such as nausea, sweating, or agitation.
            </p>
          </section>

          {/* Why Carry Naloxone */}
          <section id="why-carry" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Why Carry Naloxone?</h2>
            <p className="text-gray-800 leading-relaxed">
              Opioid overdoses can happen anywhere — at home, work, public places, or among friends. Having naloxone nearby means being ready to save a life. Studies show that communities with widespread naloxone availability see significant reductions in overdose deaths. Every minute counts, and naloxone gives time for emergency responders to arrive.
            </p>
          </section>

          {/* Where to Get Naloxone */}
          <section id="where-to-get" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Where to Get Naloxone</h2>
            <p className="text-gray-800 leading-relaxed">
              Naloxone is available at many local pharmacies, harm reduction centers, and community distribution boxes across the country. Many states offer free naloxone programs through public health departments and mail-order services. In most places, no ID or prescription is needed.
            </p>
          </section>

          {/* How Long Does Naloxone Last */}
          <section id="how-long" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">How Long Does Naloxone Last?</h2>
            <p className="text-gray-800 leading-relaxed">
              Naloxone typically begins working within 2–3 minutes and lasts for 30–90 minutes, depending on the opioid involved. Because some opioids, like fentanyl, stay active longer, multiple doses may be required. Always call 911 after giving naloxone, even if the person seems to recover.
            </p>
          </section>

          {/* Key Takeaways */}
          <section id="key-takeaways" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Key Takeaways</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-800">
              <li>Naloxone is a safe, non-addictive medication that reverses opioid overdoses.</li>
              <li>It&apos;s available as a nasal spray, injection, or auto-injector.</li>
              <li>Anyone can carry and use it — no prescription is required.</li>
              <li>It saves lives by restoring breathing until medical help arrives.</li>
            </ul>
          </section>

          {/* Call to Action */}
          <div className="bg-light-grey border border-gray-300 rounded-xl p-6 md:p-8 my-10">
            <p className="text-lg leading-relaxed">
              Visit our{' '}
              <Link href="/" className="font-medium hover:underline" style={{ color: '#F9542E' }}>
                Naloxone Provider Directory
              </Link>{' '}
              to find free, 24/7 access points near you. Carry naloxone, learn how to use it, and help protect your community.
            </p>
          </div>

          {/* Related Articles */}
          <div className="border-t border-gray-200 pt-10 mt-10">
            <h3 className="text-2xl font-light mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/how-to-use-naloxone"
                className="block p-6 bg-light-grey border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-medium mb-2">How to Use Naloxone</h4>
                <p className="text-sm text-gray-600">Step-by-step instructions for correctly administering naloxone in an emergency.</p>
              </Link>
              <Link
                href="/blog/when-to-use-naloxone"
                className="block p-6 bg-light-grey border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-medium mb-2">When to Use Naloxone</h4>
                <p className="text-sm text-gray-600">Learn to recognize overdose symptoms and know exactly when to act.</p>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center text-sm text-gray-600 mb-6">
            <p>© 2025 Naloxone Finder. Information provided for educational purposes.</p>
            <p className="mt-2">Always call 911 in case of a medical emergency.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="flex-1 flex justify-center sm:justify-start">
              <a
                href="https://www.novedevice.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-heebo"
              >
                <span>powered by</span>
                <Image
                  src="/nove logo black.png"
                  alt="Nove"
                  width={60}
                  height={20}
                  className="object-contain"
                />
              </a>
            </div>
            <a
              href="https://www.novedevice.com/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-90 px-4 md:px-5 py-2 rounded-full transition-all text-sm md:text-base min-h-[44px] flex items-center font-heebo font-medium"
              style={{ backgroundColor: '#F9542E' }}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
