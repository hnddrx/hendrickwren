import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const Chatbot = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "Hi! 👋 I'm your assistant. Ask me about Wren, services, skills, or experience.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick replies about Wren
  const quickReplies = [
    'Who is Wren?',
    'What do you offer?',
    'What are your expertise?',
    'How many years coding?',
    'About me'
  ];

  // Bot response tailored to Wren
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('who is wren')) {
      return "Wren Hendrick is a full-stack developer and creative technologist focused on building clean, scalable, and engaging web applications.";
    } 
    else if (msg.includes('offer')) {
      return "I offer professional services including:\n• Web Development\n• UI/UX Design\n• Content Integration\n• Odoo Development\n• Problem Solving and Algorithm Optimization";
    } 
    else if (msg.includes('expertise')) {
      return "My expertise includes:\n• Frontend: React, Next.js, TailwindCSS, Responsive Design\n• Backend: Node.js, Express, MongoDB, PostgreSQL, Python, Odoo Framework\n• Deployment & DevOps: Vercel, Docker, CI/CD Pipelines, GitHub Actions\n• ERP & Business Automation: Odoo Customization, Workflow Automation, Python Scripting";
    } 
    else if (msg.includes('years') || msg.includes('experience') || msg.includes('coding')) {
      return "I have been coding professionally for over X years, continuously improving my skills in web development, ERP solutions, and business automation.";
    } 
    else if (msg.includes('about me')) {
      return "Hi! I'm Wren, a passionate developer who loves turning ideas into high-quality web solutions. I focus on scalable front-end and back-end development while also integrating ERP and business automation systems.";
    } 
    else if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! 👋 Ask me anything about Wren, my services, or expertise.";
    } 
    else {
      return "You can ask me about Wren, services offered, expertise, years of experience, or about me.";
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

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: getBotResponse(savedMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 50);
  };

  const theme = darkMode
    ? {
        bg: 'bg-slate-900',
        text: 'text-slate-100',
        subtext: 'text-slate-400',
        inputBg: 'bg-slate-800',
        messageBg: 'bg-slate-800',
        userBg: 'bg-cyan-600',
        border: 'border-slate-700'
      }
    : {
        bg: 'bg-white',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        inputBg: 'bg-gray-100',
        messageBg: 'bg-gray-100',
        userBg: 'bg-blue-600',
        border: 'border-gray-300'
      };

  return (
   <section>
  {!isOpen && (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 sm:p-3 sm:bottom-3 sm:right-3"
    >
      <MessageCircle className="w-6 h-6 sm:w-5 sm:h-5" />
    </button>
  )}

  {isOpen && (
    <div
      className={`fixed bottom-4 right-4 w-full max-w-xs sm:max-w-sm md:max-w-md h-[80vh] sm:h-[75vh] md:h-[600px] ${theme.bg} ${theme.border} border rounded-2xl shadow-2xl flex flex-col z-50`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Wren Assistant</h3>
            <p className="text-xs sm:text-sm text-white/80">Online</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? theme.userBg : theme.messageBg
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4 text-white sm:w-4 sm:h-4" />
                ) : (
                  <Bot className={`w-4 h-4 ${theme.text}`} />
                )}
              </div>
              <div>
                <div
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? `${theme.userBg} text-white`
                      : `${theme.messageBg} ${theme.text}`
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-line">{msg.text}</p>
                </div>
                <p
                  className={`text-xs sm:text-xs ${theme.subtext} mt-1 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-2 sm:px-3 pb-2">
        <p className={`text-xs sm:text-sm ${theme.subtext} mb-1`}>Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className={`text-xs sm:text-sm px-2 sm:px-3 py-1 ${theme.inputBg} ${theme.text} rounded-full hover:bg-cyan-500 hover:text-white transition-colors`}
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className={`p-2 sm:p-3 ${theme.border} border-t`}>
        <div className="flex space-x-1 sm:space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 ${theme.inputBg} ${theme.text} rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs sm:text-sm`}
          />
          <button
            onClick={handleSend}
            className="p-2 sm:p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  )}
</section>

  );
};

export default Chatbot;
