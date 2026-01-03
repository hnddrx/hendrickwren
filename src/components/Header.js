import React from 'react';
import { Code2, Sun, Moon, Menu } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen, theme }) => {
  const navLinks = ['Services', 'Expertise', 'Experiences', 'Projects', 'Contact'];

  return (
    <header className={`${theme.headerBg} backdrop-blur-xl ${theme.border} border-b sticky top-0 z-40 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Code2 className={`w-8 h-8 ${theme.accent}`} />
              <div className={`absolute -inset-1 ${darkMode ? 'bg-cyan-500' : 'bg-blue-500'} rounded-full blur opacity-20`}></div>
            </div>
            <div>
              <h1 className={`text-2xl font-light tracking-tight ${theme.text}`}>Wren Hendrick</h1>
              <p className={`text-xs ${theme.subtext} tracking-wide hidden sm:block`}>
                Web Developer · Full-Stack
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`${theme.text} ${theme.linkHover} text-sm font-light tracking-wide transition-colors duration-300`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full ${theme.filterInactive} transition-all duration-300 hover:scale-110`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full ${theme.filterInactive} transition-all duration-300`}
              aria-label="Toggle menu"
            >
              <Menu className={`w-5 h-5 ${theme.text}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden py-4 ${theme.border} border-t`}>
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${theme.text} ${theme.linkHover} text-sm font-light tracking-wide transition-colors duration-300 py-2`}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;