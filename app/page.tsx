'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [typedText, setTypedText] = useState('');

  const blogArticles = [
    {
      title: 'What is Naloxone?',
      href: '/blog/what-is-naloxone',
      description: 'Learn how naloxone reverses overdoses',
    },
    {
      title: 'How to Use Naloxone',
      href: '/blog/how-to-use-naloxone',
      description: 'Step-by-step instructions',
    },
    {
      title: 'When to Use Naloxone',
      href: '/blog/when-to-use-naloxone',
      description: 'Recognize overdose symptoms',
    },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!zipCode) {
      return;
    }

    setIsLoading(true);
    setTypedText('');

    const statusMessages = [
      'Finding life saving medication',
      'Searching for providers near you',
      'Locating pharmacies and resources',
      'Hang tight - results finalizing',
    ];

    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      setTypedText(statusMessages[statusIndex]);
      statusIndex = (statusIndex + 1) % statusMessages.length;
    }, 2000);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipCode }),
      });

      clearInterval(statusInterval);

      if (!response.ok) {
        throw new Error('Failed to search for providers');
      }

      const result = await response.json();

      if (result.results) {
        sessionStorage.setItem('searchResults', JSON.stringify(result.results));
        sessionStorage.setItem('searchParams', JSON.stringify({ zipCode }));
        router.push('/results');
      } else {
        setTypedText('No providers found. Try a different search.');
      }
    } catch (error) {
      console.error('Search error:', error);
      clearInterval(statusInterval);
      setTypedText('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fadeIn">
      {/* Header */}
      <header className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/findmynaloxone-logo.png"
              alt="Find My Naloxone"
              width={32}
              height={32}
              priority
            />
            <span className="text-base md:text-lg font-normal tracking-tight text-black font-heebo">Naloxone Finder</span>
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
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 md:py-12">
        <div className="w-full max-w-3xl space-y-8">
          {/* Headline */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-black font-heebo" style={{ letterSpacing: '0.025em' }}>
              Find Free{' '}
              <span className="block" style={{ color: '#F9542E' }}>Naloxone</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl my-6 md:my-8 font-light font-heebo">
              Locate pharmacies and resources in your area
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-md mx-auto"
          >
            <div className={`
              flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0
              bg-light-grey rounded-2xl md:rounded-full p-2 md:p-1.5
              border transition-all duration-200
              ${isFocused ? 'border-gray-400 shadow-[0_0_0_3px_rgba(249,84,46,0.1)]' : 'border-gray-300'}
              ${isLoading ? 'opacity-70' : ''}
            `}>
              <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 bg-transparent px-4 py-3.5 md:py-2.5 outline-none text-black placeholder-gray-500 text-base font-heebo"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !zipCode}
                className={`
                  text-white px-6 py-3.5 md:px-7 md:py-2.5 rounded-xl md:rounded-full
                  font-medium transition-all duration-200 text-base font-heebo
                  hover:opacity-90 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  min-h-[44px] w-full md:w-auto
                  touch-manipulation
                  ${isLoading ? 'animate-pulse' : ''}
                `}
                style={{ backgroundColor: '#F9542E', WebkitTapHighlightColor: 'transparent' }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    Searching
                    <span className="flex gap-1">
                      <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </span>
                ) : (
                  'Search'
                )}
              </button>
            </div>

            {/* Loading Carousel Message */}
            {isLoading && (
              <div className="mt-4 text-center min-h-[24px]">
                <span className="text-gray-600 text-sm font-heebo transition-opacity duration-300">
                  {typedText}
                </span>
              </div>
            )}
          </form>

          {/* Blog Articles */}
          {!isLoading && (
            <div className="mt-12 md:mt-16 animate-fadeIn">
              <h2 className="text-center text-sm md:text-base text-gray-600 mb-6 font-heebo">
                Learn about naloxone
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {blogArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.href}
                    className="
                      group p-5 md:p-6 rounded-xl
                      bg-light-grey border border-gray-300
                      hover:border-gray-400 hover:shadow-md
                      transition-all duration-200
                      min-h-[120px] flex flex-col justify-between
                    "
                  >
                    <div>
                      <h3 className="font-medium text-base md:text-lg mb-2 font-heebo group-hover:text-gray-900" style={{ color: '#F9542E' }}>
                        {article.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 font-heebo">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs md:text-sm font-medium group-hover:gap-2 transition-all font-heebo" style={{ color: '#F9542E' }}>
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 md:p-6 lg:p-8 border-t border-gray-200">
        <div className="flex justify-center">
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
      </footer>
    </div>
  );
}
