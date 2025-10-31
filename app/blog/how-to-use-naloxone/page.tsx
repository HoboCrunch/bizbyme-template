import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ArticleSchema from '@/components/structured-data/ArticleSchema';

export const metadata: Metadata = {
  title: 'How to Use Naloxone | Naloxone Finder',
  description: 'Learn how to recognize an opioid overdose and correctly use naloxone (Narcan®) to reverse it — step-by-step instructions, important safety tips, and key next steps.',
  alternates: {
    canonical: '/blog/how-to-use-naloxone',
  },
  keywords: ['how to use naloxone', 'naloxone instructions', 'narcan nasal spray', 'opioid overdose response', 'naloxone administration', 'overdose first aid'],
  authors: [{ name: 'Naloxone Finder Team' }],
  openGraph: {
    title: 'How to Use Naloxone | Naloxone Finder',
    description: 'Step-by-step instructions for recognizing an opioid overdose and correctly administering naloxone to save a life.',
    type: 'article',
    url: '/blog/how-to-use-naloxone',
    publishedTime: '2025-01-15T00:00:00.000Z',
    modifiedTime: '2025-10-31T00:00:00.000Z',
    authors: ['Naloxone Finder Team'],
    section: 'Instructions',
    tags: ['naloxone administration', 'narcan instructions', 'overdose response', 'emergency medicine', 'harm reduction'],
  },
};

export default function HowToUseNaloxonePage() {
  return (
    <div className="min-h-screen bg-white font-heebo">
      <ArticleSchema
        headline="How to Use Naloxone"
        description="Learn how to recognize an opioid overdose and correctly use naloxone (Narcan®) to reverse it — step-by-step instructions, important safety tips, and key next steps."
        datePublished="2025-01-15T00:00:00.000Z"
        dateModified="2025-10-31T00:00:00.000Z"
        authorName="Naloxone Finder Team"
        imageUrl="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/how-to-use-naloxone.jpg"
        url="/blog/how-to-use-naloxone"
        section="Instructions"
        keywords={['how to use naloxone', 'naloxone instructions', 'narcan nasal spray', 'opioid overdose response', 'naloxone administration', 'overdose first aid']}
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
            <li className="font-medium text-gray-900">How to Use Naloxone</li>
          </ol>
        </nav>

        {/* Article */}
        <article>
          {/* Hero Image */}
          <div className="mb-8 rounded-xl overflow-hidden border border-gray-300">
            <Image
              src="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/how-to-use-naloxone.jpg"
              alt="Narcan naloxone nasal spray - emergency medication for opioid overdose reversal"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light mb-4">How to Use Naloxone</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <time>Last updated: 2025</time>
            <span>•</span>
            <span>7 min read</span>
          </div>

          {/* Table of Contents */}
          <div className="bg-light-grey border border-gray-300 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-medium mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-2 text-sm">
                <li><a href="#what-is-naloxone" className="hover:underline" style={{ color: '#F9542E' }}>What is Naloxone?</a></li>
                <li><a href="#when-to-use" className="hover:underline" style={{ color: '#F9542E' }}>When Should You Use Naloxone?</a></li>
                <li><a href="#step-by-step" className="hover:underline" style={{ color: '#F9542E' }}>Step-by-Step: Using the Nasal Spray</a></li>
                <li><a href="#other-forms" className="hover:underline" style={{ color: '#F9542E' }}>Other Forms of Naloxone</a></li>
                <li><a href="#safety-tips" className="hover:underline" style={{ color: '#F9542E' }}>Important Safety Tips</a></li>
                <li><a href="#why-carry" className="hover:underline" style={{ color: '#F9542E' }}>Why Carrying Naloxone Matters</a></li>
                <li><a href="#call-to-action" className="hover:underline" style={{ color: '#F9542E' }}>Get Naloxone Now</a></li>
              </ul>
            </nav>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-800">
              Opioid overdoses are a growing public health crisis — but having the right tool and knowing how to use it can make the difference between life and death. Naloxone (often known by the brand name Narcan®) is a safe, effective antidote that can quickly reverse an opioid overdose when administered correctly. In this guide we&apos;ll walk you through how to use naloxone, when to use it, and what to do afterwards.
            </p>
          </div>

          {/* What is Naloxone */}
          <section id="what-is-naloxone" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">What is Naloxone?</h2>
            <p className="text-gray-800 leading-relaxed">
              Naloxone is a medication that blocks the effects of opioids and can restore normal breathing in someone whose breathing has slowed or stopped because of an opioid overdose. It is available in various formulations — nasal sprays, injectable kits, and auto-injectors — and many jurisdictions allow it to be carried by non-medical individuals for emergency use.
            </p>
          </section>

          {/* When Should You Use Naloxone */}
          <section id="when-to-use" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">When Should You Use Naloxone?</h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              You should use naloxone when you suspect somebody is experiencing an opioid overdose. Key signs include:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-800 mb-4">
              <li>Altered or no responsiveness</li>
              <li>Very slow or absent breathing (gasping or snoring sounds)</li>
              <li>Lips or nails turning blue or gray</li>
              <li>Very small &ldquo;pin-point&rdquo; pupils</li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              Because naloxone only works on opioids, if you are unsure what drug has been used but see these signs, you should still consider using it — it will not harm someone who hasn&apos;t taken opioids.
            </p>
          </section>

          {/* Step-by-Step Guide */}
          <section id="step-by-step" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Step-by-Step: Using the Nasal Spray Formulation</h2>
            <p className="text-gray-800 leading-relaxed mb-6">
              Most community naloxone kits contain a nasal spray device because it is simple to administer. Here&apos;s how to use it correctly:
            </p>

            {/* Image: Naloxone at Pharmacy */}
            <div className="rounded-xl overflow-hidden border border-gray-300 mb-6">
              <Image
                src="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/how-to-use-2.jpg"
                alt="Narcan available over-the-counter at pharmacy - accessible life-saving medication"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>1</span>
                <div>
                  <strong className="block mb-1">Carry Naloxone at all times:</strong>
                  <p className="text-gray-800">Carrying Naloxone can make the difference between life and death in an emergency. A <a href="https://www.novedevice.com/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: '#F9542E' }}>Nove</a> carrying case makes being prepared easier than ever, ensuring your naloxone is protected and accessible when seconds count.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>2</span>
                <div>
                  <strong className="block mb-1">Check responsiveness:</strong>
                  <p className="text-gray-800">Shake the person gently, shout their name, rub your knuckles firmly on the breastbone (sternum). If they don&apos;t respond and are breathing slowly or not at all — treat it as an emergency.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>3</span>
                <div>
                  <strong className="block mb-1">Call 911 immediately:</strong>
                  <p className="text-gray-800">Provide the exact location. Do not wait for medical help before administering naloxone.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>4</span>
                <div>
                  <strong className="block mb-1">Position the person:</strong>
                  <p className="text-gray-800">Lay them on their back, tilt their head slightly back, and support their neck. This opens the airway.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>5</span>
                <div>
                  <strong className="block mb-1">Prepare the device:</strong>
                  <p className="text-gray-800">Remove the nasal spray device from its package. Do <strong>not</strong> test or prime the device.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>6</span>
                <div>
                  <strong className="block mb-1">Insert nozzle:</strong>
                  <p className="text-gray-800">Place your thumb on the bottom of the plunger and your first and middle fingers on either side of the nozzle. Insert the nozzle tip into one nostril, until your fingers are against the bottom of the person&apos;s nose.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>7</span>
                <div>
                  <strong className="block mb-1">Administer the dose:</strong>
                  <p className="text-gray-800">Press the plunger fully and give the dose. Remove the device after administration.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>8</span>
                <div>
                  <strong className="block mb-1">Recovery position:</strong>
                  <p className="text-gray-800">After administering, place the person in the &apos;recovery position&apos; (on their side), and stay with them. Monitor their breathing and responsiveness.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#F9542E' }}>9</span>
                <div>
                  <strong className="block mb-1">Second dose if needed:</strong>
                  <p className="text-gray-800">If the person does not respond within 2-3 minutes, give a second dose (using a new device), and continue to wait for emergency services.</p>
                </div>
              </li>
            </ol>
          </section>

          {/* Other Forms */}
          <section id="other-forms" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Other Forms of Naloxone: Injection & Auto-injector</h2>
            <p className="text-gray-800 leading-relaxed">
              In some settings (especially medical or harm reduction) naloxone may be available in injectable form or as an auto-injector. These require extra steps but follow the same principle: check responsiveness, call for help, administer naloxone, and monitor the person. For injection: draw up the fluid and inject into a muscle (shoulder or thigh) through clothing if needed.
            </p>
          </section>

          {/* Safety Tips */}
          <section id="safety-tips" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Important Safety Tips & Things to Know</h2>
            <div className="space-y-4 bg-light-grey border border-gray-300 rounded-xl p-6">
              <div className="flex gap-3">
                <span style={{ color: '#F9542E' }}>•</span>
                <p className="text-gray-800">Naloxone&apos;s effects are temporary — the opioids may last longer in the body, so it&apos;s essential that the person still receives emergency medical care.</p>
              </div>
              <div className="flex gap-3">
                <span style={{ color: '#F9542E' }}>•</span>
                <p className="text-gray-800">Even if you&apos;re unsure the person used opioids, administering naloxone can still be worth it: it won&apos;t harm someone not on opioids.</p>
              </div>
              <div className="flex gap-3">
                <span style={{ color: '#F9542E' }}>•</span>
                <p className="text-gray-800">After naloxone, the person may go into withdrawal (sweating, nausea, shaking, irritability) — this is uncomfortable but not life-threatening.</p>
              </div>
              <div className="flex gap-3">
                <span style={{ color: '#F9542E' }}>•</span>
                <p className="text-gray-800">Store naloxone at room temperature, away from light and extreme temperatures. Don&apos;t let it freeze.</p>
              </div>
              <div className="flex gap-3">
                <span style={{ color: '#F9542E' }}>•</span>
                <p className="text-gray-800">Replace expired or used doses as soon as you can. Keep multiple doses available if you&apos;re in a high-risk environment.</p>
              </div>
            </div>
          </section>

          {/* Why Carrying Naloxone Matters */}
          <section id="why-carry" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Why Carrying Naloxone Matters</h2>
            <p className="text-gray-800 leading-relaxed">
              Every year thousands of lives are lost to preventable opioid overdoses. Community access to naloxone has been shown to save lives. According to the American Medical Association nearly 80% of opioid-death victims are outside a medical setting, meaning a bystander or loved one with naloxone can often be the first responder. By being prepared, you may be able to help someone when seconds count.
            </p>
          </section>

          {/* Call to Action */}
          <section id="call-to-action">
            <div className="bg-light-grey border border-gray-300 rounded-xl p-6 md:p-8 my-10">
              <h2 className="text-2xl font-light mb-4">Call to Action</h2>
              <p className="text-lg leading-relaxed mb-4">
                If you or someone you know may be around an overdose risk, get naloxone <strong>now</strong>. Visit your local pharmacy or community distribution program, ask for training, and keep it within reach. You can&apos;t predict when an opioid emergency will happen — but you <em>can</em> be ready for it.
              </p>
              <p className="leading-relaxed">
                Looking for free or low-cost naloxone in your area? Check our{' '}
                <Link href="/" className="font-medium hover:underline" style={{ color: '#F9542E' }}>
                  Naloxone Provider Directory
                </Link>{' '}
                to find access points near you.
              </p>
            </div>
          </section>

          {/* Related Articles */}
          <div className="border-t border-gray-200 pt-10 mt-10">
            <h3 className="text-2xl font-light mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/what-is-naloxone"
                className="block p-6 bg-light-grey border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-medium mb-2">What is Naloxone?</h4>
                <p className="text-sm text-gray-600">Learn what naloxone is, how it works, and why it&apos;s essential for reversing opioid overdoses.</p>
              </Link>
              <Link
                href="/blog/when-to-use-naloxone"
                className="block p-6 bg-light-grey border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-medium mb-2">When to Use Naloxone</h4>
                <p className="text-sm text-gray-600">Recognize overdose symptoms and understand exactly when to administer naloxone.</p>
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
