import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

const Chatbot = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "Hi! 👋 I'm Wren's AI assistant. I can help you learn about his experience, skills, and services. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Enhanced quick replies
  const quickReplies = [
    { text: 'About Wren', icon: '👤' },
    { text: 'Services', icon: '💼' },
    { text: 'Skills & Tech Stack', icon: '⚡' },
    { text: 'Experience', icon: '🎯' },
    { text: 'Get in Touch', icon: '📧' }
  ];

  // Enhanced bot responses
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('who') || msg.includes('about wren')) {
      return "Wren Hendrick is a passionate **Full-Stack Developer** and **Odoo Specialist** with expertise in building scalable web applications and ERP solutions.\n\n✨ Specializes in:\n• Modern Web Development\n• Business Process Automation\n• Custom Odoo Modules\n• UI/UX Design";
    } 
    else if (msg.includes('service')) {
      return "**Professional Services Offered:**\n\n🎨 **Web Development**\n• Custom Web Applications\n• Responsive Design\n• Frontend & Backend Development\n\n⚙️ **Odoo Development**\n• Module Customization\n• Business Automation\n• ERP Integration\n\n🎯 **Consulting**\n• Technical Architecture\n• Code Review & Optimization\n• Project Planning";
    } 
    else if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack')) {
      return "**Technical Expertise:**\n\n**Frontend:**\n• React, Next.js, Vue.js\n• TailwindCSS, Material-UI\n• Responsive Design\n\n**Backend:**\n• Python, Node.js, Express\n• Odoo Framework\n• RESTful APIs\n\n**Database:**\n• PostgreSQL, MongoDB\n• Database Design & Optimization\n\n**DevOps:**\n• Docker, CI/CD\n• Git, GitHub Actions\n• Cloud Deployment";
    } 
    else if (msg.includes('experience') || msg.includes('years')) {
      return "Wren has **extensive experience** in:\n\n📊 **Odoo Development**\n• Custom module development\n• Business process automation\n• ERP system integration\n\n💻 **Full-Stack Development**\n• Building scalable applications\n• Modern web technologies\n• Agile development practices\n\n🎓 **Continuous Learning**\n• Always exploring new technologies\n• Contributing to open-source\n• Staying current with industry trends";
    } 
    else if (msg.includes('contact') || msg.includes('touch') || msg.includes('hire')) {
      return "**Let's Connect!**\n\n📧 Ready to discuss your project?\n\n✅ Click the **'Let's Work Together'** button on the homepage\n✅ Or check the **Contact** section\n\nI typically respond within 24 hours and offer:\n• Free initial consultation\n• Project estimates\n• Technical guidance";
    }
    else if (msg.includes('portfolio') || msg.includes('project')) {
      return "**Check out my work!**\n\n🎨 Browse the **Projects** section above to see:\n• Live applications\n• Code samples\n• Case studies\n\nEach project showcases different skills and technologies. Click on any project card to learn more!";
    }
    else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! 👋 Great to meet you!\n\nI'm here to help you learn about Wren's work and expertise. Feel free to ask me anything or try one of the quick questions below!";
    } 
    else {
      return "I'd be happy to help! You can ask me about:\n\n• Wren's background and expertise\n• Services and offerings\n• Technical skills and technologies\n• Past projects and experience\n• How to get in touch\n\nWhat interests you most?";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const savedMessage = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        text: getBotResponse(savedMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleQuickReply = (reply) => {
    const userMsg = {
      id: Date.now(),
      text: reply,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        text: getBotResponse(reply),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleFeedback = (messageId, type) => {
    setFeedback(prev => ({ ...prev, [messageId]: type }));
  };

  const theme = darkMode
    ? {
        bg: 'bg-slate-900/95',
        text: 'text-slate-100',
        subtext: 'text-slate-400',
        inputBg: 'bg-slate-800',
        messageBg: 'bg-slate-800/80',
        userBg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
        border: 'border-slate-700',
        hover: 'hover:bg-slate-700'
      }
    : {
        bg: 'bg-white/95',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        inputBg: 'bg-gray-100',
        messageBg: 'bg-gray-100',
        userBg: 'bg-gradient-to-r from-cyan-500 to-blue-500',
        border: 'border-gray-200',
        hover: 'hover:bg-gray-200'
      };

  return (
    <section>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with me!
            <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 w-[calc(100vw-2rem)] max-w-md h-[calc(100vh-2rem)] max-h-[600px] ${theme.bg} backdrop-blur-xl ${theme.border} border rounded-3xl shadow-2xl flex flex-col z-50 animate-slide-up`}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    Wren Assistant
                    <Sparkles className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[85%] ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                      msg.sender === 'user' ? theme.userBg : theme.messageBg
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className={`w-4 h-4 ${theme.text}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`px-4 py-2.5 rounded-2xl shadow-md ${
                        msg.sender === 'user'
                          ? `${theme.userBg} text-white`
                          : `${theme.messageBg} ${theme.text}`
                      } ${msg.sender === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                    </div>
                    
                    {/* Message Actions */}
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <p className={`text-xs ${theme.subtext}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {msg.sender === 'bot' && (
                        <>
                          <button
                            onClick={() => copyMessage(msg.text)}
                            className={`p-1 rounded ${theme.hover} transition-colors`}
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'up')}
                            className={`p-1 rounded transition-colors ${
                              feedback[msg.id] === 'up' ? 'text-green-500' : theme.hover
                            }`}
                            title="Helpful"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'down')}
                            className={`p-1 rounded transition-colors ${
                              feedback[msg.id] === 'down' ? 'text-red-500' : theme.hover
                            }`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.messageBg}`}>
                    <Bot className={`w-4 h-4 ${theme.text}`} />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${theme.messageBg}`}>
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 ${darkMode ? 'bg-slate-400' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                      <div className={`w-2 h-2 ${darkMode ? 'bg-slate-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-2 h-2 ${darkMode ? 'bg-slate-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className={`px-4 py-3 ${theme.border} border-t`}>
            <p className={`text-xs ${theme.subtext} mb-2 font-medium`}>Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply.text)}
                  className={`text-xs px-3 py-1.5 ${theme.inputBg} ${theme.text} rounded-full ${theme.hover} transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-1`}
                >
                  <span>{reply.icon}</span>
                  <span>{reply.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className={`p-4 ${theme.border} border-t`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2.5 ${theme.inputBg} ${theme.text} rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm transition-all duration-300`}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </section>
  );
};

export default Chatbot;