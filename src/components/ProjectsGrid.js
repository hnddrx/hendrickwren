import React, { useState, useEffect } from 'react';

const ProjectsGrid = ({
  filteredprojects = [],
  openLightbox,
  theme,
  darkMode,
  selectedFilter = 'all',
}) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [particles, setParticles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Generate particles on mount
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Normalize category to always be an array
  const displayedProjects = filteredprojects.filter(project => {
    const categories = Array.isArray(project.category)
      ? project.category
      : [project.category];

    if (selectedFilter === 'all') return true;

    return categories.includes(selectedFilter);
  });

  const hasProjects = displayedProjects.length > 0;
  const projectsToShow = showAll ? displayedProjects : displayedProjects.slice(0, 3);
  const hasMoreProjects = displayedProjects.length > 3;

  return (
    <section
      id="projects"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
    >
      {/* Custom cursor glow */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-8 h-8 rounded-full blur-xl transition-opacity duration-300 ${
          darkMode ? 'bg-cyan-400/30' : 'bg-cyan-500/20'
        }`}></div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${
              darkMode ? 'bg-cyan-400/20' : 'bg-cyan-500/15'
            } animate-particle`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {hasProjects ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectsToShow.map((project, index) => (
            <article
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ 
                animationDelay: `${index * 100}ms`,
                '--index': index 
              }}
              className={`group relative overflow-hidden rounded-3xl transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 ${theme.cardBg} shadow-xl hover:shadow-2xl ${
                darkMode ? 'shadow-black/40 hover:shadow-cyan-500/20' : 'shadow-gray-300/50 hover:shadow-cyan-500/30'
              } animate-slide-up`}
            >
              {/* Clickable overlay for opening lightbox */}
              <div 
                onClick={() => openLightbox(project)}
                className="absolute inset-0 cursor-pointer z-30"
              ></div>
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/5 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none z-10`}></div>

              {/* Image container with parallax effect */}
              <div className="relative overflow-hidden h-56 sm:h-64 lg:h-72">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Animated overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  darkMode 
                    ? 'from-black/90 via-black/40 to-transparent' 
                    : 'from-gray-900/90 via-gray-900/40 to-transparent'
                } transition-opacity duration-500 ${hoveredId === project.id ? 'opacity-100' : 'opacity-80'}`}></div>

                {/* View details badge */}
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white' : 'bg-white/90 text-gray-900'
                } ${hoveredId === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </span>
                </div>
              </div>

              {/* Info Panel */}
              <div className="p-5 sm:p-6 space-y-3 relative z-40">
                {/* Title with animated underline */}
                <div className="relative inline-block w-full">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight ${theme.text} group-hover:text-cyan-500 transition-colors duration-300 truncate pr-8 pointer-events-none`}>
                    {project.title}
                  </h3>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    hoveredId === project.id ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Description with line clamp */}
                {project.description && (
                  <p className={`text-sm ${theme.subtext} line-clamp-2 leading-relaxed pointer-events-none`}>
                    {project.description}
                  </p>
                )}

                {/* Categories with animated tags - clickable */}
                {project.category && (
                  <div className="flex flex-wrap gap-2 max-h-16 overflow-hidden">
                    {(Array.isArray(project.category) ? project.category : [project.category]).slice(0, 3).map((cat, i) => (
                      <span
                        key={cat}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium uppercase tracking-wide transition-all duration-300 ${
                          darkMode 
                            ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20' 
                            : 'bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20'
                        } backdrop-blur-sm border border-cyan-500/20 ${
                          hoveredId === project.id ? 'animate-bounce-subtle' : ''
                        } truncate max-w-[120px] pointer-events-none`}
                      >
                        {cat}
                      </span>
                    ))}
                    {Array.isArray(project.category) && project.category.length > 3 && (
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                      } pointer-events-none`}>
                        +{project.category.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Tech Stack with icons - clickable */}
                {Array.isArray(project.stack) && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 max-h-20 overflow-hidden">
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span
                        key={tech}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                          darkMode 
                            ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        } ${hoveredId === project.id ? 'animate-bounce-subtle' : ''} truncate max-w-[100px] pointer-events-none`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        darkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-gray-100 text-gray-600 border border-gray-200'
                      } pointer-events-none`}>
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Hover indicator arrow */}
                <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                  hoveredId === project.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}>
                  <svg 
                    className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Animated border glow */}
              <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${
                hoveredId === project.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-20 blur-xl animate-pulse-slow"></div>
              </div>
            </article>
          ))}
        </div>

        {/* See More / Show Less Button */}
        {hasMoreProjects && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`group relative px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 overflow-hidden ${
                darkMode 
                  ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
              } hover:scale-105 hover:shadow-xl ${
                darkMode ? 'hover:shadow-cyan-500/20' : 'hover:shadow-cyan-500/30'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? (
                  <>
                    Show Less Projects
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    See More Projects ({displayedProjects.length - 3} more)
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </>
      ) : (
        /* Enhanced Empty State */
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="text-7xl animate-bounce-slow">🛠️</div>
            <div className="absolute inset-0 blur-2xl bg-cyan-500/20 rounded-full animate-pulse"></div>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
            No projects found
          </h3>
          <p className={`${theme.subtext} max-w-md text-base sm:text-lg leading-relaxed`}>
            This category is currently empty. New projects are being crafted — check back soon.
          </p>
          <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes particle {
          0%, 100% {
            transform: translate(0, 0);
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
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
            opacity: 0;
          }
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out backwards;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 20s ease-in-out infinite;
          animation-delay: -10s;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsGrid;