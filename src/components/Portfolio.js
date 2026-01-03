import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import FilterButtons from './FilterButtons';
import ProjectsGrid from './ProjectsGrid';
import Footer from './Footer';
import Lightbox from './Lightbox';
import Chatbot from './Chatbot';
import EmailForm from './EmailForm';
import About from '../pages/About';
import projectsData from '../data/projects.json';

const getSystemTheme = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const DroneGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(getSystemTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projectsData.projects || []);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);

  // Track cursor position with trail effect
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        
        // Add to trail with smoother updates
        setCursorTrail(prev => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
          return newTrail.slice(-12); // Keep last 12 positions for smoother trail
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Sync with system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Theme configuration
  const theme = {
    dark: {
      bg: 'bg-slate-950',
      headerBg: 'bg-slate-900/95',
      text: 'text-slate-100',
      subtext: 'text-slate-400',
      cardBg: 'bg-slate-900',
      filterActive: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      filterInactive: 'bg-slate-800 hover:bg-slate-700',
      accent: 'text-cyan-400',
      border: 'border-slate-800',
      footerBg: 'bg-slate-900',
      linkHover: 'hover:text-cyan-400',
    },
    light: {
      bg: 'bg-gray-50',
      headerBg: 'bg-white/95',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      cardBg: 'bg-white',
      filterActive: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      filterInactive: 'bg-gray-200 hover:bg-gray-300',
      accent: 'text-blue-600',
      border: 'border-gray-200',
      footerBg: 'bg-gray-900',
      linkHover: 'hover:text-blue-400',
    },
  };

  const t = darkMode ? theme.dark : theme.light;

  // Update filtered projects whenever filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData.projects);
    } else {
      setFilteredProjects(
        projectsData.projects.filter(project =>
          Array.isArray(project.category)
            ? project.category.includes(filter)
            : project.category === filter
        )
      );
    }
  }, [filter]);

  // Lightbox handlers
  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  const goToNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredProjects.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedImage(filteredProjects[nextIndex]);
  };

  const goToPrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredProjects.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedImage(filteredProjects[prevIndex]);
  };

  return (
    <div className={`min-h-screen ${t.bg} transition-colors duration-500 relative overflow-hidden`}>
      {/* Custom cursor with trail effect - 3D Enhanced */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{ perspective: '1000px' }}>
        {/* Main cursor glow with 3D effect */}
        <div 
          className="absolute transition-all duration-100 ease-out"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%) translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer glow layers for depth */}
          <div className={`absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
            darkMode ? 'bg-cyan-400/40' : 'bg-cyan-500/30'
          } animate-pulse-slow`}></div>
          <div className={`absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${
            darkMode ? 'bg-cyan-300/50' : 'bg-cyan-400/40'
          } animate-pulse-slower`}></div>
          
          {/* Middle ring */}
          <div className={`absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            darkMode ? 'bg-cyan-400/30' : 'bg-cyan-500/30'
          } blur-sm animate-rotate`}></div>
          
          {/* Inner core with 3D effect */}
          <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${
              darkMode ? 'bg-cyan-200' : 'bg-cyan-600'
            } shadow-lg animate-float-tiny`}
            style={{
              boxShadow: darkMode 
                ? '0 0 10px rgba(103, 232, 249, 0.8), 0 0 20px rgba(103, 232, 249, 0.4)' 
                : '0 0 10px rgba(8, 145, 178, 0.8), 0 0 20px rgba(8, 145, 178, 0.4)'
            }}></div>
          </div>
        </div>

        {/* 3D Cursor trail with depth */}
        {cursorTrail.map((pos, index) => {
          const progress = (index + 1) / cursorTrail.length;
          const scale = 0.3 + progress * 0.7;
          const depth = -index * 5;
          
          return (
            <div
              key={pos.id}
              className="absolute mix-blend-screen"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: `translate(-50%, -50%) translateZ(${depth}px) scale(${scale})`,
                opacity: progress * 0.5,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className={`rounded-full blur-xl ${
                darkMode ? 'bg-cyan-400' : 'bg-cyan-500'
              }`} style={{
                width: `${16 - index * 1}px`,
                height: `${16 - index * 1}px`,
                boxShadow: darkMode
                  ? `0 0 ${20 - index * 1.5}px rgba(103, 232, 249, ${0.6 - index * 0.04})`
                  : `0 0 ${20 - index * 1.5}px rgba(8, 145, 178, ${0.6 - index * 0.04})`
              }}></div>
            </div>
          );
        })}
      </div>

      {/* Enhanced 3D background particles */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ perspective: '1500px' }}>
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 5 + 2;
          const depth = Math.random() * 200 - 100;
          
          return (
            <div
              key={i}
              className={`absolute rounded-full ${
                darkMode ? 'bg-cyan-400/15' : 'bg-cyan-500/12'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `floatParticle3D ${Math.random() * 50 + 40}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                animationDelay: `${Math.random() * 15}s`,
                transformStyle: 'preserve-3d',
                filter: `blur(${Math.random() * 2}px)`,
                boxShadow: darkMode
                  ? `0 0 ${size * 3}px rgba(103, 232, 249, 0.3)`
                  : `0 0 ${size * 3}px rgba(8, 145, 178, 0.3)`,
              }}
            />
          );
        })}
      </div>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        theme={t}
      />

      <Hero theme={t} setShowRegistration={setShowRegistration} />

      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        darkMode={darkMode}
        theme={t}
      />

      <ProjectsGrid
        filteredprojects={filteredProjects}
        selectedFilter={filter}
        openLightbox={openLightbox}
        darkMode={darkMode}
        theme={t}
      />

      <About darkMode={darkMode} theme={t} setShowRegistration={setShowRegistration} />

      <Footer theme={t} />

      {selectedImage && (
        <Lightbox
          selectedImage={selectedImage}
          closeLightbox={closeLightbox}
          goToPrev={goToPrev}
          goToNext={goToNext}
          darkMode={darkMode}
          theme={t}
        />
      )}

      <Chatbot darkMode={darkMode} />

      {showRegistration && (
        <EmailForm
          darkMode={darkMode}
          onClose={() => setShowRegistration(false)}
        />
      )}

      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(
              ${Math.random() * 150 - 75}vw,
              ${Math.random() * 150 - 75}vh
            ) rotate(360deg) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DroneGallery;