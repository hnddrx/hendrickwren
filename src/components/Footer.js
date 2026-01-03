import React from 'react';
import { Code2, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import servicesData from '../data/services.json';

const Footer = ({ theme }) => {
  const navLinks = ['Services','Expertise','Experiences', 'Projects', 'Contact'];
  

  return (
    <footer className={`${theme.footerBg} text-gray-300 border-t ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Code2 className="w-7 h-7 text-cyan-400" />
              <h3 className="text-xl font-light text-white">Wren Hendrick</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Software developer, web enthusiast, and ERP automation expert delivering modern, high-quality digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-light text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-light text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {servicesData.map((service, i) => (
                <li key={service.title} className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">{service.title}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div id='contact'>
            <h4 className="text-white font-light text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:wren@example.com" className="hover:text-cyan-400 transition-colors duration-300">
                  macayanwren@example.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+639691843191" className="hover:text-cyan-400 transition-colors duration-300">
                  +63 969 184 3191
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Dagupan, Pangasinan, Philippines</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="p-2 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all duration-300 hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all duration-300 hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${theme.border} flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0`}>
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © 2025 Wren Hendrick. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#privacy" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
            <a href="#cookies" className="hover:text-cyan-400 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
