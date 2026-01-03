import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ selectedImage, closeLightbox, goToPrev, goToNext, darkMode, theme }) => {
  if (!selectedImage) return null;
  
  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/97' : 'bg-white/97'} backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300`}>
      <button
        onClick={closeLightbox}
        className={`absolute top-4 sm:top-8 right-4 sm:right-8 p-3 sm:p-4 ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90`}
      >
        <X className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
      </button>
      
      <button
        onClick={goToPrev}
        className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} rounded-full transition-all duration-300 hover:scale-110`}
      >
        <ChevronLeft className={`w-6 h-6 sm:w-7 sm:h-7 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
      </button>
      
      <button
        onClick={goToNext}
        className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} rounded-full transition-all duration-300 hover:scale-110`}
      >
        <ChevronRight className={`w-6 h-6 sm:w-7 sm:h-7 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
      </button>

      <div className="max-w-6xl max-h-[90vh] flex flex-col items-center">
        <img
          src={selectedImage.src}
          alt={selectedImage.title}
          className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
        />
        <div className="mt-6 sm:mt-8 text-center space-y-3">
          <h2 className={`text-2xl sm:text-3xl font-light tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedImage.title}
          </h2>
          <div className="flex items-center justify-center space-x-3">
            <span className={`h-px w-8 sm:w-12 ${darkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
           <p className={`${theme.subtext} text-sm mt-2`}>
              {selectedImage.description}
          </p>
            <span className={`h-px w-8 sm:w-12 ${darkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;