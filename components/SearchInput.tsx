"""Enhanced search input component with suggestions and validation."""

'use client';

import { useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
}: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const commonPlatforms = [
    'GitHub',
    'Twitter',
    'Instagram',
    'Reddit',
    'LinkedIn',
    'TikTok',
    'YouTube',
    'Discord',
    'Twitch',
    'Medium',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Generate suggestions
    if (newValue.length > 0) {
      const filtered = commonPlatforms.filter((platform) =>
        platform.toLowerCase().includes(newValue.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const isEmail = value.includes('@');

  return (
    <div className="relative">
      <div
        className={`
          relative flex items-center gap-3 px-4 py-3
          backdrop-blur-md bg-white/10 border-2 rounded-xl
          transition-all duration-300 group
          ${focused
            ? 'border-cyan-400 bg-white/15 shadow-lg shadow-cyan-400/30'
            : 'border-white/20 hover:border-white/40'}
        `}
      >
        {/* Search Icon */}
        <svg
          className="w-5 h-5 text-cyan-400 transition-transform group-focus-within:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setSuggestions([]);
          }}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-white/40 outline-none font-semibold text-lg disabled:opacity-50"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        )}

        {/* Email Badge */}
        {isEmail && (
          <div className="px-2 py-1 rounded-full bg-purple-500/30 border border-purple-400/50">
            <span className="text-purple-300 text-xs font-semibold">@</span>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {focused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-2xl z-50">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => {
                onChange(suggestion.toLowerCase());
                setSuggestions([]);
              }}
              className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 hover:text-cyan-400 transition-all border-b border-white/10 last:border-b-0"
            >
              <span className="text-white/40 mr-2">@</span>
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
