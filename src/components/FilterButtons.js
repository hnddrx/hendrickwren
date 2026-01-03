import React, { useState, useEffect, useRef } from 'react';

const FilterButtons = ({ filter, setFilter, darkMode, theme }) => {
  const categories = ['all', 'frontend', 'fullstack', 'ui', 'experimental', 'react', 'backend', 'enterprise', 'demonstration', 'mobile', ];
  const maxVisible = 5;
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef(null);

  const visibleCategories = categories.slice(0, maxVisible);
  const moreCategories = categories.slice(maxVisible);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {/* Visible categories */}
        {visibleCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
              filter === cat
                ? darkMode 
                  ? 'text-cyan-400' 
                  : 'text-cyan-600'
                : darkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
            {/* Active underline */}
            {filter === cat && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                darkMode ? 'bg-cyan-400' : 'bg-cyan-600'
              } animate-expand-line`}></span>
            )}
          </button>
        ))}

        {/* More Filters Dropdown */}
        {moreCategories.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMore(prev => !prev)}
              className={`px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-200' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-1">
                More
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {/* Dropdown menu */}
            {showMore && (
              <div
                className={`absolute mt-2 right-0 min-w-[140px] ${
                  darkMode 
                    ? 'bg-slate-900/95 border border-slate-800' 
                    : 'bg-white/95 border border-gray-200'
                } backdrop-blur-sm rounded-lg shadow-lg z-50 py-1 animate-fade-in`}
              >
                {moreCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setShowMore(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      filter === cat
                        ? darkMode
                          ? 'text-cyan-400 bg-cyan-400/10'
                          : 'text-cyan-600 bg-cyan-600/10'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes expandLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-expand-line {
          animation: expandLine 0.3s ease-out;
          transform-origin: left;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FilterButtons;