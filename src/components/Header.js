import React, { useState, useEffect } from 'react';
import { Code2, Sun, Moon, Menu, X } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen, theme }) => {
  const navLinks = ['Services', 'Expertise', 'Experiences', 'Projects', 'Contact'];
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Detect scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.toLowerCase()));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].toLowerCase());
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${theme.headerBg} backdrop-blur-xl ${theme.border} fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'border-b shadow-lg' : 'border-b-0'
    } ${scrolled ? (darkMode ? 'shadow-black/20' : 'shadow-gray-200/50') : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Elegant with animation */}
          <a href="#home" className="flex items-center gap-2.5 group animate-fade-in">
            <div className="relative">
              <div className={`absolute inset-0 ${darkMode ? 'bg-cyan-400/20' : 'bg-cyan-600/20'} rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <Code2 className={`w-5 h-5 ${theme.accent} transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10`} />
            </div>
            <span className={`text-lg font-medium tracking-tight ${theme.text} group-hover:${theme.accent} transition-colors duration-300`}>
              Wren Hendrick
            </span>
          </a>

          {/* Desktop Navigation - Elegant with indicators */}
          <nav className="hidden lg:flex items-center gap-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {navLinks.map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative px-4 py-2 text-sm transition-all duration-300 group animate-fade-in`}
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  activeSection === link.toLowerCase() 
                    ? theme.accent 
                    : `${theme.text} group-hover:${theme.accent}`
                }`}>
                  {link}
                </span>
                
                {/* Hover background */}
                <span className={`absolute inset-0 ${
                  darkMode ? 'bg-cyan-400/0 group-hover:bg-cyan-400/10' : 'bg-cyan-600/0 group-hover:bg-cyan-600/10'
                } rounded-lg transition-all duration-300 scale-95 group-hover:scale-100`}></span>
                
                {/* Active indicator dot */}
                {activeSection === link.toLowerCase() && (
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 ${
                    darkMode ? 'bg-cyan-400' : 'bg-cyan-600'
                  } rounded-full animate-scale-in`}></span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Side Actions - Refined */}
          <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative p-2 rounded-lg transition-all duration-300 group overflow-hidden ${
                darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-100/50'
              }`}
              aria-label="Toggle theme"
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 ${
                darkMode ? 'bg-yellow-400/0 group-hover:bg-yellow-400/10' : 'bg-slate-700/0 group-hover:bg-slate-700/10'
              } transition-colors duration-500`}></div>
              
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-400 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 transition-transform duration-500 relative z-10" />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-100/50'
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-4 h-4">
                <Menu className={`w-4 h-4 ${theme.text} absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`w-4 h-4 ${theme.text} absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`${theme.border} border-t`}>
            <nav className="flex flex-col py-4">
              {navLinks.map((link, index) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`relative py-3 px-4 text-sm transition-all duration-300 rounded-lg group ${
                    activeSection === link.toLowerCase()
                      ? theme.accent
                      : `${theme.text} ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-100/50'}`
                  } ${mobileMenuOpen ? 'animate-slide-in' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {link}
                    {activeSection === link.toLowerCase() && (
                      <span className={`w-1.5 h-1.5 ${darkMode ? 'bg-cyan-400' : 'bg-cyan-600'} rounded-full animate-pulse`}></span>
                    )}
                  </span>
                  
                  {/* Slide in indicator */}
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 ${
                    darkMode ? 'bg-cyan-400' : 'bg-cyan-600'
                  } rounded-r transition-all duration-300 group-hover:h-8`}></span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: translate(-50%, 0) scale(0);
          }
          to {
            transform: translate(-50%, 0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out backwards;
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out backwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;