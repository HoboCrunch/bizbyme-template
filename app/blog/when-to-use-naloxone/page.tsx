import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'When to Use Naloxone | Naloxone Finder',
  description: 'Learn when to use naloxone (Narcan®) to reverse an opioid overdose. Recognize key overdose symptoms, understand timing, and know how to act safely and effectively.',
  openGraph: {
    title: 'When to Use Naloxone | Naloxone Finder',
    description: 'Recognize opioid overdose symptoms and know exactly when to administer naloxone to save a life.',
    type: 'article',
  },
};

export default function WhenToUseNaloxonePage() {
  return (
    <div className="min-h-screen bg-white font-heebo">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/bizbyme-logo.png"
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
            <li className="font-medium text-gray-900">When to Use Naloxone</li>
          </ol>
        </nav>

        {/* Article */}
        <article>
          {/* Hero Image */}
          <div className="mb-8 rounded-xl overflow-hidden border border-gray-300">
            <Image
              src="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/shutterstock_2350552555.jpg"
              alt="Naloxone awareness event - community education on recognizing and responding to opioid overdoses"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light mb-4">When to Use Naloxone</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <time>Last updated: 2025</time>
            <span>•</span>
            <span>6 min read</span>
          </div>

          {/* Table of Contents */}
          <div className="bg-light-grey border border-gray-300 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-medium mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-2 text-sm">
                <li><a href="#recognizing-signs" className="hover:underline" style={{ color: '#F9542E' }}>Recognizing the Signs of an Opioid Overdose</a></li>
                <li><a href="#when-to-give" className="hover:underline" style={{ color: '#F9542E' }}>When to Give Naloxone</a></li>
                <li><a href="#scenarios" className="hover:underline" style={{ color: '#F9542E' }}>Scenarios Where Naloxone Should Be Used</a></li>
                <li><a href="#before-after" className="hover:underline" style={{ color: '#F9542E' }}>What to Do Before and After Giving Naloxone</a></li>
                <li><a href="#how-long" className="hover:underline" style={{ color: '#F9542E' }}>How Long Does Naloxone Work?</a></li>
                <li><a href="#mistakes" className="hover:underline" style={{ color: '#F9542E' }}>Common Mistakes to Avoid</a></li>
                <li><a href="#final-thoughts" className="hover:underline" style={{ color: '#F9542E' }}>Final Thoughts: Trust Your Instincts</a></li>
              </ul>
            </nav>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-800">
              Opioid overdoses can happen unexpectedly — and knowing when to use naloxone can save a life. Naloxone (Narcan®) is a fast-acting medication that reverses the effects of opioids and restores normal breathing. If you suspect someone may be overdosing, every second matters. Here&apos;s how to recognize the warning signs and know exactly when to act.
            </p>
          </div>

          {/* Recognizing Signs */}
          <section id="recognizing-signs" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Recognizing the Signs of an Opioid Overdose</h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              Before using naloxone, it&apos;s important to recognize the symptoms of an opioid overdose. Overdoses typically slow or stop a person&apos;s breathing and heart rate. The most common signs include:
            </p>

            {/* Image: Naloxone at Pharmacy */}
            <div className="rounded-xl overflow-hidden border border-gray-300 mb-6">
              <Image
                src="https://nbpyunavtweourytwcrq.supabase.co/storage/v1/object/public/nove/shutterstock_2361312847.jpg"
                alt="Narcan displayed at pharmacy counter - easily accessible for emergency use"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>

            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3 p-3 bg-light-grey rounded-lg border border-gray-300">
                <span className="flex-shrink-0 text-xl">⚠️</span>
                <div>
                  <strong>Unresponsiveness</strong> — person won&apos;t wake up even if you shake or shout.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-light-grey rounded-lg border border-gray-300">
                <span className="flex-shrink-0 text-xl">💨</span>
                <div>
                  <strong>Slow, irregular, or stopped breathing</strong> (may sound like snoring or gasping).
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-light-grey rounded-lg border border-gray-300">
                <span className="flex-shrink-0 text-xl">💙</span>
                <div>
                  <strong>Blue or gray lips and fingernails</strong> due to lack of oxygen.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-light-grey rounded-lg border border-gray-300">
                <span className="flex-shrink-0 text-xl">👁️</span>
                <div>
                  <strong>Very small, pinpoint pupils.</strong>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-light-grey rounded-lg border border-gray-300">
                <span className="flex-shrink-0 text-xl">🤚</span>
                <div>
                  <strong>Limp body or pale, clammy skin.</strong>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-light-grey rounded-lg border border-gray-300">
                <span className="flex-shrink-0 text-xl">💓</span>
                <div>
                  <strong>Slow or absent pulse.</strong>
                </div>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed font-medium">
              If you notice one or more of these signs, it&apos;s time to act immediately — call 911 and prepare to use naloxone.
            </p>
          </section>

          {/* When to Give Naloxone */}
          <section id="when-to-give" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">When to Give Naloxone</h2>
            <div className="bg-light-grey border-2 rounded-xl p-6 mb-4" style={{ borderColor: '#F9542E' }}>
              <p className="text-lg leading-relaxed text-gray-800">
                Administer naloxone as soon as you suspect an opioid overdose. <strong>Do not wait for absolute confirmation</strong> — naloxone is safe even if the person has not taken opioids. The medication will not cause harm if administered in error, but delaying its use can cost critical time.
              </p>
            </div>
            <p className="text-gray-800 leading-relaxed">
              <strong>Key rule:</strong> <em>If they are unresponsive and have slowed or stopped breathing, give naloxone right away.</em> Continue to monitor their breathing and responsiveness until emergency help arrives.
            </p>
          </section>

          {/* Scenarios */}
          <section id="scenarios" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Scenarios Where Naloxone Should Be Used</h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              You should use naloxone in any of the following situations:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-800">
              <li>Someone is found unconscious after suspected opioid use.</li>
              <li>A person shows slowed or stopped breathing following painkiller, heroin, or fentanyl use.</li>
              <li>A child or pet accidentally ingests prescription opioids.</li>
              <li>A person mixes opioids with alcohol or sedatives and becomes unresponsive.</li>
              <li>You are uncertain whether the cause is opioid-related, but the symptoms match an overdose.</li>
            </ul>
          </section>

          {/* Before and After */}
          <section id="before-after" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">What to Do Before and After Giving Naloxone</h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold" style={{ color: '#F9542E' }}>1.</span>
                <div>
                  <strong>Check responsiveness:</strong> Try to wake the person by shouting their name and rubbing your knuckles firmly on their chest.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold" style={{ color: '#F9542E' }}>2.</span>
                <div>
                  <strong>Call 911 immediately:</strong> Emergency help should be on the way before or while administering naloxone.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold" style={{ color: '#F9542E' }}>3.</span>
                <div>
                  <strong>Give naloxone:</strong> Follow the directions on your nasal spray or injectable device.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold" style={{ color: '#F9542E' }}>4.</span>
                <div>
                  <strong>Wait 2–3 minutes:</strong> If there&apos;s no response, administer a second dose.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold" style={{ color: '#F9542E' }}>5.</span>
                <div>
                  <strong>Provide rescue breathing if trained:</strong> Support their breathing until emergency help arrives.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold" style={{ color: '#F9542E' }}>6.</span>
                <div>
                  <strong>Stay with them:</strong> After naloxone, the person may wake up confused or agitated. Keep them calm and monitor their breathing.
                </div>
              </li>
            </ol>
          </section>

          {/* How Long Does Naloxone Work */}
          <section id="how-long" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">How Long Does Naloxone Work?</h2>
            <p className="text-gray-800 leading-relaxed">
              Naloxone begins to work within 2–3 minutes and lasts for about 30–90 minutes. However, opioids like fentanyl and extended-release painkillers can remain in the body longer, which means overdose symptoms can return once naloxone wears off. Always ensure medical professionals take over care even if the person seems fully revived.
            </p>
          </section>

          {/* Common Mistakes */}
          <section id="mistakes" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Common Mistakes to Avoid</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <strong className="block mb-1">Waiting too long to give naloxone</strong>
                    <p className="text-sm text-gray-700">Always act fast — time is critical.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <strong className="block mb-1">Assuming a person will &apos;sleep it off&apos;</strong>
                    <p className="text-sm text-gray-700">Never wait and see — overdoses are emergencies.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <strong className="block mb-1">Leaving the person alone after revival</strong>
                    <p className="text-sm text-gray-700">Stay with them until help arrives.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <strong className="block mb-1">Forgetting to call 911</strong>
                    <p className="text-sm text-gray-700">Naloxone is temporary, not a substitute for emergency care.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Thoughts */}
          <section id="final-thoughts" className="mb-10">
            <h2 className="text-3xl font-light mb-4 scroll-mt-20">Final Thoughts: Trust Your Instincts</h2>
            <p className="text-lg leading-relaxed text-gray-800">
              If you suspect an overdose, it&apos;s better to act and be wrong than to hesitate and lose a life. Naloxone is safe, easy to use, and widely available. Keeping it nearby and knowing when to use it could make you the difference between tragedy and survival.
            </p>
          </section>

          {/* Call to Action */}
          <div className="bg-light-grey border border-gray-300 rounded-xl p-6 md:p-8 my-10">
            <p className="text-lg leading-relaxed">
              Visit our{' '}
              <Link href="/" className="font-medium hover:underline" style={{ color: '#F9542E' }}>
                Naloxone Provider Directory
              </Link>{' '}
              to locate dispenser boxes, pharmacies, and mail-order programs near you. Find free or low-cost naloxone in your area and help save lives.
            </p>
          </div>

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
                href="/blog/how-to-use-naloxone"
                className="block p-6 bg-light-grey border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-medium mb-2">How to Use Naloxone</h4>
                <p className="text-sm text-gray-600">Step-by-step instructions for correctly administering naloxone in an emergency.</p>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-gray-600">
          <p>© 2025 Naloxone Finder. Information provided for educational purposes.</p>
          <p className="mt-2">Always call 911 in case of a medical emergency.</p>
        </div>
      </footer>
    </div>
  );
}
