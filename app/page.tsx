"""Main search page with glassmorphism + neon UI."""

'use client';

import { useState, useRef } from 'react';
import { GlassmorphicCard, NeonButton, ProfileCard, StatsPanel } from './GlassUI';
import SearchInput from './SearchInput';

interface SearchResult {
  query: string;
  total_checked: number;
  total_found: number;
  found_profiles: any[];
  all_results: any[];
  scan_duration_seconds: number;
  average_confidence: number;
  timestamp: string;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [activeTab, setActiveTab] = useState<'found' | 'all'>('found');
  const [sortBy, setSortBy] = useState<'confidence' | 'platform' | 'risk'>(
    'confidence'
  );
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/search/username?username=${encodeURIComponent(searchQuery.trim())}`
      );
      const data = await response.json();
      setSearchResults(data);

      // Scroll to results
      setTimeout(
        () =>
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        500
      );
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const sortResults = (results: any[]) => {
    const sorted = [...results];
    switch (sortBy) {
      case 'confidence':
        return sorted.sort((a, b) => b.confidence - a.confidence);
      case 'platform':
        return sorted.sort((a, b) => a.site.localeCompare(b.site));
      case 'risk':
        return sorted.sort((a, b) => b.risk_score - a.risk_score);
      default:
        return sorted;
    }
  };

  const resultsToDisplay =
    activeTab === 'found'
      ? sortResults(searchResults?.found_profiles || [])
      : sortResults(searchResults?.all_results || []);

  // Neon colors rotation
  const neonColors = ['cyan', 'purple', 'pink', 'green', 'blue'] as const;
  const getNeonColor = (index: number) => neonColors[index % neonColors.length];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              deepkrak3n
            </h1>
            <p className="text-lg text-white/70">
              Advanced OSINT Platform with Glassmorphic Interface
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Search Section */}
        <div>
          <GlassmorphicCard neonColor="cyan" className="mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Search Username or Email
                </label>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Enter username, email, or handle..."
                  disabled={isSearching}
                />
              </div>
              <NeonButton
                variant="primary"
                isLoading={isSearching}
                disabled={!searchQuery.trim()}
                onClick={() => {}}
              >
                {isSearching ? 'Scanning Platforms...' : 'Start Scan'}
              </NeonButton>
            </form>
          </GlassmorphicCard>
        </div>

        {/* Results Section */}
        {searchResults && (
          <div ref={resultsRef} className="space-y-6">
            {/* Statistics Panel */}
            <StatsPanel stats={searchResults} />

            {/* Results Tabs & Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('found')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'found'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                  }`}
                >
                  Found ({searchResults.total_found})
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                  }`}
                >
                  All Results ({searchResults.total_checked})
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all cursor-pointer"
                >
                  <option value="confidence">Sort by Confidence</option>
                  <option value="platform">Sort by Platform</option>
                  <option value="risk">Sort by Risk Score</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {resultsToDisplay.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resultsToDisplay.map((profile, index) => (
                  <ProfileCard
                    key={`${profile.site}-${index}`}
                    profile={profile}
                    neonColor={getNeonColor(index)}
                  />
                ))}
              </div>
            ) : (
              <GlassmorphicCard neonColor="blue" className="text-center py-12">
                <p className="text-white/60 text-lg">
                  {activeTab === 'found'
                    ? 'No profiles found. Try a different search.'
                    : 'No results available.'}
                </p>
              </GlassmorphicCard>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchResults && !isSearching && (
          <GlassmorphicCard neonColor="purple" className="text-center py-16">
            <div className="space-y-4">
              <div className="text-6xl">🔍</div>
              <h2 className="text-2xl font-bold text-white">
                Ready to investigate?
              </h2>
              <p className="text-white/60 max-w-md mx-auto">
                Enter a username or email address to scan across 50+ platforms
                with advanced detection accuracy.
              </p>
            </div>
          </GlassmorphicCard>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
