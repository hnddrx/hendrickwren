import React, { useState } from 'react';
import { Mail, User, FileText, CheckCircle, X } from 'lucide-react';
import emailjs from 'emailjs-com';

const EmailForm = ({ darkMode, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        'service_pqyinyv', // Replace with your EmailJS service ID
        'template_3g1xdci', // Replace with your EmailJS template ID
        formData,
        'er57-VUb-cWBsMCcf' // Replace with your EmailJS public key
      );
      setSubmitted(true);
    } catch (error) {
      console.error('Email sending error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const theme = darkMode
    ? {
        bg: 'bg-slate-900',
        cardBg: 'bg-slate-800',
        text: 'text-slate-100',
        subtext: 'text-slate-400',
        inputBg: 'bg-slate-700',
        border: 'border-slate-600',
        accent: 'from-cyan-500 to-blue-500'
      }
    : {
        bg: 'bg-white',
        cardBg: 'bg-gray-50',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        inputBg: 'bg-white',
        border: 'border-gray-300',
        accent: 'from-blue-600 to-cyan-600'
      };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className={`${theme.bg} rounded-2xl p-6 max-w-md w-full text-center space-y-6`}>
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <h2 className={`text-2xl font-light ${theme.text}`}>Message Sent!</h2>
            <p className={`${theme.subtext} mt-2`}>
              Thank you for reaching out. I'll get back to you shortly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium mt-4"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className={`${theme.bg} rounded-2xl max-w-md w-full my-8`}>
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-full"
          >
            <X className={`w-5 h-5 ${theme.text}`} />
          </button>
          <h2 className={`text-2xl font-light ${theme.text} mb-1`}>Send Me a Message</h2>
          <p className={`${theme.subtext} text-sm`}>I'll respond as soon as possible</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm ${theme.subtext} mb-1`}>Name *</label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.subtext}`} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-4 py-2 ${theme.inputBg} ${theme.text} ${theme.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm ${theme.subtext} mb-1`}>Email *</label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.subtext}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-4 py-2 ${theme.inputBg} ${theme.text} ${theme.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm ${theme.subtext} mb-1`}>Message *</label>
            <div className="relative">
              <FileText className={`absolute left-3 top-3 w-5 h-5 ${theme.subtext}`} />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className={`w-full pl-10 pr-4 py-2 ${theme.inputBg} ${theme.text} ${theme.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                placeholder="Write your message here..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r ${theme.accent} text-white rounded-full font-medium`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
