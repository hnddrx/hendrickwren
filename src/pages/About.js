import React from 'react';
import { Award, Code, Users, Zap, Video, Eye, Crosshair, Terminal } from 'lucide-react';
import experiencesData from '../data/experiences.json';
import servicesData from '../data/services.json';
import expertiseData from '../data/expertise.json';

const iconMap = { Code, Eye, Video, Crosshair, Award, Users, Zap, Terminal }; // map icon strings to actual components

const Services = ({ theme, darkMode, setShowRegistration }) => {
  return (
    <div className="space-y-24">

      {/* Experiences Section */}
      <section id='experiences' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold ${theme.text}`}>My Experiences</h2>
          <p className={`${theme.subtext} text-lg max-w-2xl mx-auto`}>
            A summary of my professional journey and the roles I have held in software development.
          </p>
        </div>
        <div className="space-y-8">
          {experiencesData.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <div className="flex-shrink-0 mb-2 md:mb-0">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${theme.text}`}>{exp.title}</h3>
                <span className={`${theme.subtext} text-sm`}>{exp.company} | {exp.period}</span>
                <span className={`${theme.subtext} text-sm block mb-1`}>{exp.location}</span>
                <p className={`${theme.subtext} mt-1`}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section
        className={`${darkMode ? theme.footerBg  : 'bg-gray-50'} transition-colors duration-300 w-full`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.text}`}>
              Services I Offer
            </h1>
            <p className={`${theme.subtext} mt-4 text-lg sm:text-xl max-w-xl`}>
              I provide a range of professional services to help businesses and individuals build,
              optimize, and scale their digital products. Whether you need a sleek front-end, a robust
              back-end, or ERP automation, I deliver solutions that are efficient and tailored to your
              needs.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setShowRegistration(true)}
                className="px-6 py-3 bg-cyan-500 text-white rounded-full font-medium hover:bg-cyan-600 transition-colors shadow-lg"
              >
                Contact Me
              </button>
              <a
                href="#projects"
                title="Go to Projects Section"
                className={`px-4 py-2 rounded-full font-medium inline-flex items-center justify-center 
                  ${darkMode ? 'text-white' : 'text-black'}`}
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-center">
            <img
              src="https://img.freepik.com/premium-vector/young-professional-stands-with-customizable-profile-elements-abstract-designs-around-him-customizable-semiflat-illustrations-profile-data_585735-43162.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Services Illustration"
              className={`w-full max-w-md rounded-2xl shadow-lg
                ${darkMode ? 'filter brightness-90 contrast-90' : 'filter brightness-100'}`}
            />
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section id="expertise" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-semibold ${theme.text}`}>My Skills</h2>
          <p className={`${theme.subtext} text-base max-w-2xl mx-auto`}>
            Technologies and tools I use to deliver high-quality services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={i}
                className={`${theme.cardBg} p-5 rounded-2xl border ${theme.border} shadow-sm hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-medium ${theme.text} mb-1`}>{service.title}</h3>
                <p className={`${theme.subtext} text-sm leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-16 max-w-3xl" >
          <h2 className={`text-3xl sm:text-4xl font-semibold ${theme.text}`}>
            Areas of Expertise
          </h2>
          <p className={`${theme.subtext} mt-4 text-lg leading-relaxed`}>
            Specialized skill sets focused on building scalable systems, ERP solutions,
            and maintainable software architectures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {expertiseData.map((area, i) => (
            <div key={i} className="space-y-6">
              <h3 className={`text-xl font-medium ${theme.text}`}>
                {area.title}
              </h3>

              <ul className="space-y-3">
                {area.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                    <span className={theme.subtext}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Services;
