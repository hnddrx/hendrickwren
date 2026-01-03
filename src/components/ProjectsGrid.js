import React from 'react';

const ProjectsGrid = ({
  filteredprojects = [],
  openLightbox,
  theme,
  darkMode,
  selectedFilter = 'all', // current filter
}) => {
  // Normalize category to always be an array
  const displayedProjects = filteredprojects.filter(project => {
    const categories = Array.isArray(project.category)
      ? project.category
      : [project.category]; // convert string to array if needed

    if (selectedFilter === 'all') return true;

    return categories.includes(selectedFilter);
  });

  const hasProjects = displayedProjects.length > 0;

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
    >
      {hasProjects ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedProjects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => openLightbox(project)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] ${theme.cardBg} shadow-xl sm:shadow-2xl ${
                darkMode ? 'shadow-black/40' : 'shadow-gray-300/50'
              } animate-in fade-in slide-in-from-bottom-4`}
            >
              {/* Preview Image */}
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Persistent Info Panel */}
              <div
                className={`absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7 space-y-3 ${
                  darkMode
                    ? 'bg-gradient-to-t from-black/85 via-black/60'
                    : 'bg-gradient-to-t from-gray-900/85 via-gray-900/60'
                }`}
              >
                {/* Title */}
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-light tracking-wide">
                  {project.title}
                </h3>

                {/* Categories */}
                {project.category && (
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(project.category) ? project.category : [project.category]).map(cat => (
                      <span
                        key={cat}
                        className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-white/10 text-white' : 'bg-white/90 text-gray-900'
                        } backdrop-blur-sm uppercase`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                {Array.isArray(project.stack) && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-white/10 text-white' : 'bg-white/90 text-gray-900'
                        } backdrop-blur-sm`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Fallback */
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 animate-in fade-in">
          <span className="text-4xl">🛠️</span>
          <h3 className={`text-xl sm:text-2xl font-light ${theme.text}`}>
            No projects found
          </h3>
          <p className={`${theme.subtext} max-w-md text-sm sm:text-base`}>
            This category is currently empty. New projects are being crafted — check back soon.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;
