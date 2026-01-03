import React from 'react';

const Hero = ({ theme, setShowRegistration }) => {
  return (
    <section
      id="home"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center space-y-8">
        {/* Eyebrow */}
        <span
          className={`inline-block text-sm sm:text-base uppercase tracking-[0.3em] ${theme.subtext} animate-fade-in`}
          style={{ animation: 'fadeSlideDown 0.8s ease-out' }}
        >
          Hi there!
        </span>

        {/* Name / Title */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight ${theme.text} animate-fade-in`}
          style={{ 
            animation: 'fadeSlideDown 0.8s ease-out 0.2s backwards',
            background: 'linear-gradient(135deg, currentColor 0%, currentColor 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Wren Hendrick
        </h1>

        {/* Professional Description */}
        <p 
          className={`${theme.subtext} text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in`}
          style={{ animation: 'fadeSlideDown 0.8s ease-out 0.4s backwards' }}
        >
          I am a full-time <strong className="text-cyan-500">Odoo Developer</strong> driven by a passion for <strong className="text-cyan-500">software engineering</strong>, delivering robust, business-centric solutions that streamline operations and improve user experiences through <strong>Odoo</strong>, <strong>Python</strong>, <strong>XML</strong>, <strong>QWeb</strong>, and the <strong>Odoo framework</strong>.
        </p>

        {/* CTA */}
        <div 
          className="pt-6 flex justify-center gap-6 flex-wrap animate-fade-in"
          style={{ animation: 'fadeSlideDown 0.8s ease-out 0.6s backwards' }}
        >
          <button
            onClick={() => setShowRegistration(true)}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 shadow-lg shadow-cyan-500/40 overflow-hidden"
          >
            <span className="relative z-10">Let's Work Together</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <a
            href="#projects"
            className={`px-10 py-5 rounded-full border-2 ${theme.border} ${theme.text} font-semibold text-lg transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-lg`}
          >
            View Projects
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
export default Hero;
