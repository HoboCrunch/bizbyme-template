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

  // Filter states
  const [costFilter, setCostFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [trainingFilter, setTrainingFilter] = useState<'all' | 'required' | 'not-required'>('all');
  const [locationTypeFilter, setLocationTypeFilter] = useState<'all' | 'physical' | 'online'>('all');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  // Helper function to detect if training is required
  const requiresTraining = (provider: Provider): boolean => {
    const desc = provider.description.toLowerCase();
    const tags = provider.tags?.map(t => t.toLowerCase()) || [];

    // Check if 'training' is a standalone tag
    if (tags.includes('training')) {
      return true;
    }

    // Check for training-related keywords in description or tags
    const allTags = tags.join(' ');
    const trainingKeywords = ['training required', 'training needed', 'certification required', 'must complete training'];
    return trainingKeywords.some(keyword => desc.includes(keyword) || allTags.includes(keyword));
  };

  // Helper function to detect location type
  const getLocationType = (provider: Provider): 'physical' | 'online' => {
    const desc = provider.description.toLowerCase();
    const location = provider.location?.toLowerCase() || '';
    const allTags = provider.tags?.map(t => t.toLowerCase()).join(' ') || '';

    // Combine mail order and online into single 'online' category
    const onlineKeywords = ['mail order', 'mailed', 'ship', 'delivery', 'shipped', 'online', 'virtual', 'telehealth', 'internet', 'web-based', 'digital', 'remote'];

    if (onlineKeywords.some(keyword => desc.includes(keyword) || location.includes(keyword) || allTags.includes(keyword))) {
      return 'online';
    }
    return 'physical';
  };

  // Apply filters
  const filteredProviders = providers.filter(provider => {
    // Cost filter
    if (costFilter !== 'all') {
      const isFree = isProviderFree(provider);
      if (costFilter === 'free' && !isFree) return false;
      if (costFilter === 'paid' && isFree) return false;
    }

    // Training filter
    if (trainingFilter !== 'all') {
      const needsTraining = requiresTraining(provider);
      if (trainingFilter === 'required' && !needsTraining) return false;
      if (trainingFilter === 'not-required' && needsTraining) return false;
    }

    // Location type filter
    if (locationTypeFilter !== 'all') {
      const locationType = getLocationType(provider);
      if (locationTypeFilter !== locationType) return false;
    }

    return true;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    // Tier 1: Free > Paid
    const aIsFree = isProviderFree(a);
    const bIsFree = isProviderFree(b);

    if (aIsFree && !bIsFree) return -1;
    if (!aIsFree && bIsFree) return 1;

    // Tier 2: Distance (online = farthest)
    // Check if providers are online
    const aIsOnline = getLocationType(a) === 'online';
    const bIsOnline = getLocationType(b) === 'online';

    // If one is online and one is physical, physical comes first
    if (!aIsOnline && bIsOnline) return -1;
    if (aIsOnline && !bIsOnline) return 1;

    // If both are physical or both are online, sort by distance
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
              src="/findmynaloxone-logo.png"
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
            className="flex items-center justify-center w-[44px] h-[44px] sm:w-auto sm:h-auto sm:gap-1.5 sm:px-3 sm:py-2.5 bg-light-grey hover:bg-gray-200 border border-gray-300 hover:border-gray-400 rounded-full transition-all text-xs shrink-0 text-black font-heebo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">New Search</span>
          </Link>
        </div>
      </header>

      {/* Providers List */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="relative">
          <div className="grid gap-4 md:gap-6">
            {sortedProviders.map((provider, index) => (
              <ProviderCard key={index} provider={provider} />
            ))}
          </div>

          {/* Desktop Filter Button - Sticky within results container */}
          <div className="hidden md:block absolute top-0 left-full ml-4 md:ml-6 h-full">
            <div className="sticky top-32 h-0">
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-1.5 md:gap-2 bg-light-grey hover:bg-gray-200 border border-gray-300 hover:border-gray-400 px-3 md:px-4 py-2.5 md:py-2 rounded-full shadow-lg transition-all min-h-[44px] text-xs md:text-sm text-black font-heebo"
                aria-label="Open filters"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
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

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-[44px] h-[44px] sm:w-auto sm:h-auto sm:gap-1.5 sm:px-3 sm:py-2.5 bg-light-grey hover:bg-gray-200 border border-gray-300 hover:border-gray-400 rounded-full shadow-lg transition-all text-xs text-black font-heebo"
        aria-label="Open filters"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="hidden sm:inline">Filters</span>
      </button>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsFilterModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-black font-heebo">Filter Results</h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Options */}
              <div className="flex flex-col gap-4">
                {/* Cost Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block font-heebo">Cost</label>
                  <select
                    value={costFilter}
                    onChange={(e) => setCostFilter(e.target.value as 'all' | 'free' | 'paid')}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:bg-gray-200 transition-colors font-heebo"
                  >
                    <option value="all">All</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {/* Training Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block font-heebo">Training Required</label>
                  <select
                    value={trainingFilter}
                    onChange={(e) => setTrainingFilter(e.target.value as 'all' | 'required' | 'not-required')}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:bg-gray-200 transition-colors font-heebo"
                  >
                    <option value="all">All</option>
                    <option value="required">Yes</option>
                    <option value="not-required">No</option>
                  </select>
                </div>

                {/* Location Type Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block font-heebo">Location Type</label>
                  <select
                    value={locationTypeFilter}
                    onChange={(e) => setLocationTypeFilter(e.target.value as 'all' | 'physical' | 'online')}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:bg-gray-200 transition-colors font-heebo"
                  >
                    <option value="all">All</option>
                    <option value="physical">Physical Location</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setCostFilter('all');
                    setTrainingFilter('all');
                    setLocationTypeFilter('all');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-3 rounded-full transition-all text-sm font-medium text-black font-heebo"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="flex-1 text-white hover:opacity-90 px-4 py-3 rounded-full transition-all text-sm font-medium font-heebo"
                  style={{ backgroundColor: '#F9542E' }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="p-6 border-t border-gray-300">
        <div className="flex flex-col gap-4">
          <p className="text-center text-gray-600 text-sm font-heebo">
            Found {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

  // Helper function to detect if provider is non-physical (online, mail order, etc.)
  const isNonPhysicalLocation = (): boolean => {
    const description = provider.description.toLowerCase();
    const location = provider.location?.toLowerCase() || '';
    const allTags = provider.tags?.map(t => t.toLowerCase()).join(' ') || '';

    const nonPhysicalKeywords = [
      'mail order', 'online', 'virtual', 'telehealth',
      'ship', 'delivery', 'mailed', 'internet', 'web-based',
      'digital', 'remote'
    ];

    return nonPhysicalKeywords.some(keyword =>
      description.includes(keyword) ||
      location.includes(keyword) ||
      allTags.includes(keyword)
    );
  };

  const isNonPhysical = isNonPhysicalLocation();

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
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-gray-600 hover:text-gray-900 underline transition-colors font-heebo"
              >
                visit site
              </a>
            )}
          </div>

          {/* Distance badge */}
          {provider.distance && (
            <span className="text-xs text-gray-700 bg-light-grey px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 font-heebo">
              {isNonPhysical ? 'online' : getDistance(provider.distance)}
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
                // Filter out free, paid, and irrelevant tags
                const irrelevantTags = ['free', 'paid', 'harm reduction', 'community', 'no prescription'];
                const filteredTags = provider.tags.filter(tag => {
                  const lowerTag = tag.toLowerCase();
                  return !irrelevantTags.includes(lowerTag);
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

          {/* Action button - Get Directions or Visit Website */}
          {(provider.location || link) && (
            <a
              href={
                isNonPhysical && link
                  ? link
                  : provider.location
                    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(provider.location)}`
                    : link || '#'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white hover:opacity-90 px-4 py-2.5 md:py-2 rounded-full transition-all text-sm font-medium sm:ml-auto min-h-[44px] font-heebo"
              style={{ backgroundColor: '#F9542E' }}
            >
              {isNonPhysical && link ? 'Visit Website' : 'Get Directions'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNonPhysical && link ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" : "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"} />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
