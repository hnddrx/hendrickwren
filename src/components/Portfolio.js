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
    <div className={`min-h-screen ${t.bg} transition-colors duration-500`}>
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
    </div>
  );
};

export default DroneGallery;
