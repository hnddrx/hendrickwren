import React from 'react';

const Hero = ({ theme, setShowRegistration }) => {
  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      <div className="text-center space-y-8">
        {/* Eyebrow */}
        <span
          className={`block text-sm sm:text-base uppercase tracking-[0.3em] ${theme.subtext}`}
        >
          Hi there!
        </span>

        {/* Name / Title */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.text}`}
        >
          Wren Hendrick
        </h1>

        {/* Professional Description */}
        <p className={`${theme.subtext} text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed`}>
          I am a full-time <strong>Odoo Developer</strong> driven by a passion for <strong>software engineering</strong>, delivering robust, business-centric solutions that streamline operations and improve user experiences through <strong>Odoo</strong>, <strong>Python</strong>, <strong>XML</strong>, <strong>QWeb</strong>, and the <strong>Odoo framework</strong>.
        </p>



        {/* CTA */}
        <div className="pt-6 flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => setShowRegistration(true)}
            className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-lg transition-transform duration-300 hover:scale-105 shadow-lg shadow-cyan-500/40"
          >
            Let’s Work Together
          </button>

          <a
            href="#projects"
            className={`px-10 py-5 rounded-full border ${theme.border} ${theme.text} font-semibold text-lg transition hover:opacity-80`}
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
