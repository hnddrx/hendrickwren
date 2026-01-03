import React, { useState, useEffect, useRef } from 'react';

const FilterButtons = ({ filter, setFilter, darkMode, theme }) => {
  const categories = ['all', 'frontend', 'fullstack', 'ui', 'experimental', 'react', 'backend', 'enterprise'];
  const maxVisible = 4;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {/* Visible categories */}
        {visibleCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ${
              filter === cat
                ? `${theme.filterActive} text-white shadow-lg scale-105`
                : `${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}

        {/* More Filters Dropdown */}
        {moreCategories.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMore(prev => !prev)}
              className={`px-5 py-2 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ${
                darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              More ▾
            </button>

            {showMore && (
              <div
                className={`absolute mt-2 right-0 w-44 ${darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg shadow-lg z-50 py-2`}
              >
                {moreCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setShowMore(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      filter === cat
                        ? `${theme.filterActive} text-white`
                        : darkMode
                          ? 'text-gray-200 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterButtons;
