'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Provider {
  title: string;
  date: string;
  time?: string;
  location?: string;
  distance?: string;
  description: string;
  relevance_score?: string;
  registration_url?: string;
  link?: string; // Backward compatibility
  organizer?: string;
  tags?: string[];
}

export default function ResultsPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchParams, setSearchParams] = useState<{ zipCode: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const resultsData = sessionStorage.getItem('searchResults');
    const paramsData = sessionStorage.getItem('searchParams');

    if (resultsData && paramsData) {
      setProviders(JSON.parse(resultsData));
      setSearchParams(JSON.parse(paramsData));
    }
    setLoading(false);
  }, []);

  // Helper function to determine if provider is free
  const isProviderFree = (provider: Provider): boolean => {
    // Check tags first
    if (provider.tags?.some(tag => tag.toLowerCase().includes('free'))) {
      return true;
    }
    // Check description for free indicators
    const desc = provider.description.toLowerCase();
    if (desc.includes('free') || desc.includes('no cost') || desc.includes('$0')) {
      return true;
    }
    // Check for paid indicators
    if (desc.includes('$') || desc.includes('cost') || desc.includes('price')) {
      return false;
    }
    // Default to paid if uncertain
    return false;
  };

  const sortedProviders = [...providers].sort((a, b) => {
    // Tier 1: Free > Paid
    const aIsFree = isProviderFree(a);
    const bIsFree = isProviderFree(b);

    if (aIsFree && !bIsFree) return -1;
    if (!aIsFree && bIsFree) return 1;

    // Tier 2: 24/7 > non-24/7
    const aHas24_7 = a.tags?.some(tag => tag === '24/7') || false;
    const bHas24_7 = b.tags?.some(tag => tag === '24/7') || false;

    if (aHas24_7 && !bHas24_7) return -1;
    if (!aHas24_7 && bHas24_7) return 1;

    // Tier 3: OTC > non-OTC
    const aHasOTC = a.tags?.some(tag => tag.toUpperCase() === 'OTC') || false;
    const bHasOTC = b.tags?.some(tag => tag.toUpperCase() === 'OTC') || false;

    if (aHasOTC && !bHasOTC) return -1;
    if (!aHasOTC && bHasOTC) return 1;

    // Finally, sort by distance (closest first)
    const distanceA = parseFloat(a.distance?.replace(/[^\d.]/g, '') || '9999');
    const distanceB = parseFloat(b.distance?.replace(/[^\d.]/g, '') || '9999');
    return distanceA - distanceB;
  });

  const loadMoreProviders = async () => {
    if (!searchParams || loadingMore) return;

    setLoadingMore(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipCode: searchParams.zipCode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.results) {
        // Append new results to existing providers
        const newProviders = [...providers, ...data.results];
        setProviders(newProviders);
        sessionStorage.setItem('searchResults', JSON.stringify(newProviders));
      }
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-black font-heebo">Loading...</div>
      </div>
    );
  }

  if (!providers.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-white">
        <p className="text-lg md:text-xl text-gray-600 text-center font-heebo">No providers found</p>
        <Link
          href="/"
          className="text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all min-h-[44px] flex items-center text-sm md:text-base font-heebo"
          style={{ backgroundColor: '#F9542E' }}
        >
          Try Another Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 backdrop-blur-sm bg-opacity-95">
        <div className="p-3 md:p-4 lg:p-6 flex items-center justify-between gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <Image
              src="/bizbyme-logo.png"
              alt="Naloxone Finder Logo"
              width={28}
              height={28}
              className="md:w-8 md:h-8"
            />
            <h1 className="text-base md:text-lg font-normal hidden sm:block text-black font-heebo">Naloxone Finder</h1>
          </Link>

          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-light text-center flex-1 px-2 md:px-4 leading-tight text-black font-heebo">
            Naloxone providers near <span className="font-medium" style={{ color: '#F9542E' }}>you</span>
          </h2>

          <Link
            href="/"
            className="flex items-center gap-1.5 md:gap-2 bg-light-grey hover:bg-gray-200 border border-gray-300 hover:border-gray-400 px-3 md:px-4 py-2.5 md:py-2 rounded-full transition-all text-xs md:text-sm shrink-0 min-h-[44px] text-black font-heebo"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">New Search</span>
          </Link>
        </div>
      </header>

      {/* Providers List */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="grid gap-4 md:gap-6">
          {sortedProviders.map((provider, index) => (
            <ProviderCard key={index} provider={provider} />
          ))}
        </div>

        {/* Load More Button */}
        {sortedProviders.length > 0 && (
          <div className="mt-8 md:mt-12 flex justify-center">
            <button
              onClick={loadMoreProviders}
              disabled={loadingMore}
              className="flex items-center justify-center gap-2 bg-light-grey hover:bg-gray-200 border border-gray-300 hover:border-gray-400 px-5 py-3 md:px-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-sm md:text-base text-black font-heebo"
            >
              {loadingMore ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Loading more providers...</span>
                  <span className="sm:hidden">Loading...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="hidden sm:inline">Search for more providers near me</span>
                  <span className="sm:hidden">Load More</span>
                </>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-300 text-center text-gray-600 text-sm font-heebo">
        <p>Found {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''}</p>
      </footer>
    </div>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const link = provider.registration_url || provider.link;

  // Determine if provider is free or paid based on tags and description
  const isFree = () => {
    // Check tags first
    if (provider.tags?.some(tag => tag.toLowerCase().includes('free'))) {
      return true;
    }
    // Check description for free indicators
    const desc = provider.description.toLowerCase();
    if (desc.includes('free') || desc.includes('no cost') || desc.includes('$0')) {
      return true;
    }
    // Check for paid indicators
    if (desc.includes('$') || desc.includes('cost') || desc.includes('price')) {
      return false;
    }
    // Default to paid if uncertain
    return false;
  };

  const providerIsFree = isFree();

  // Extract just city from location (e.g., "Venue Name, City, State" -> "City")
  const getShortLocation = (location: string) => {
    const parts = location.split(',').map(s => s.trim());
    return parts.length > 1 ? parts[parts.length - 2] : parts[0];
  };

  // Format distance to be simpler
  const getDistance = (distance: string) => {
    if (!distance) return null;
    // If it already says "miles from zipcode", convert to "miles away"
    return distance.replace(/miles from.*/, 'miles away').replace(/(\d+)\s*miles.*/, '$1 mi');
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 md:p-5 hover:border-gray-400 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col gap-3 md:gap-3.5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-start sm:items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base md:text-lg font-semibold text-black leading-snug font-heebo">
                {provider.title}
              </h3>
              <span className={`
                px-2 py-0.5 rounded-full text-xs whitespace-nowrap font-heebo
                ${providerIsFree ? 'text-white font-medium' : 'font-bold'}
              `}
              style={providerIsFree ? { backgroundColor: '#F9542E' } : { color: '#F9542E' }}>
                {providerIsFree ? 'Free' : '$$$'}
              </span>
            </div>
            {provider.organizer && (
              link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors font-heebo"
                >
                  {provider.organizer}
                </a>
              ) : (
                <p className="text-xs md:text-sm text-gray-600 font-heebo">
                  {provider.organizer}
                </p>
              )
            )}
          </div>

          {/* Distance badge */}
          {provider.distance && (
            <span className="text-xs text-gray-700 bg-light-grey px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 font-heebo">
              {getDistance(provider.distance)}
            </span>
          )}
        </div>

        {/* Provider Details */}
        <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600">
          {provider.time && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="break-words font-heebo">{provider.time}</span>
            </div>
          )}
          {provider.location && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="break-words font-heebo">{provider.location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {provider.description && (
          <p className="text-sm md:text-base text-gray-700 leading-relaxed font-heebo">
            {provider.description}
          </p>
        )}

        {/* Tags and Visit button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tags */}
          {provider.tags && provider.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {(() => {
                // Filter out free and paid tags (shown in header)
                const filteredTags = provider.tags.filter(tag => {
                  const lowerTag = tag.toLowerCase();
                  return lowerTag !== 'free' && lowerTag !== 'paid';
                });

                // Sort tags to prioritize OTC and 24/7 first
                const sortedTags = [...filteredTags].sort((a, b) => {
                  const aPriority = a.toUpperCase() === 'OTC' || a === '24/7';
                  const bPriority = b.toUpperCase() === 'OTC' || b === '24/7';
                  if (aPriority && !bPriority) return -1;
                  if (!aPriority && bPriority) return 1;
                  return 0;
                });

                return sortedTags.slice(0, 3).map((tag, index) => {
                  const isPriorityTag = tag.toUpperCase() === 'OTC' || tag === '24/7';
                  return (
                    <span
                      key={index}
                      className={`px-2.5 py-1 rounded-full text-xs font-heebo ${
                        isPriorityTag
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}
                    >
                      {tag}
                    </span>
                  );
                });
              })()}
            </div>
          )}

          {/* Get Directions button */}
          {provider.location && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(provider.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white hover:opacity-90 px-4 py-2.5 md:py-2 rounded-full transition-all text-sm font-medium sm:ml-auto min-h-[44px] font-heebo"
              style={{ backgroundColor: '#F9542E' }}
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
