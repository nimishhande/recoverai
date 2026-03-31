import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import gsap from 'gsap';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Initializing Support Protocol. How may I assist your query logs today?' }
  ]);
  const [input, setInput] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
  }, [isOpen]);

  const getChatbotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pain') || message.includes('hurt')) {
      return 'I\'m sorry you\'re experiencing pain. Please try: resting, elevating the affected area, applying ice for 15-20 minutes. If pain persists above 8/10, contact your healthcare provider.';
    }
    if (message.includes('fever') || message.includes('temperature')) {
      return 'Monitor your temperature every 4 hours. If it exceeds 39°C, contact your healthcare provider. Stay hydrated and rest adequately.';
    }
    if (message.includes('medicine') || message.includes('medication')) {
      return 'Taking your medication as prescribed is crucial for recovery. Set reminders if you tend to forget. Do not skip doses.';
    }
    if (message.includes('eat') || message.includes('food') || message.includes('diet')) {
      return 'Focus on nutritious foods: proteins, vegetables, fruits, and whole grains. Avoid processed foods, sugary drinks, and excess salt. Check your diet recommendations on the main dashboard.';
    }
    if (message.includes('exercise') || message.includes('activity')) {
      return 'Follow your prescribed physical therapy exercises. Start slowly and gradually increase intensity as approved by your healthcare provider.';
    }
    if (message.includes('tired') || message.includes('fatigue')) {
      return 'Fatigue is normal during recovery. Ensure 8-10 hours of quality sleep, rest between activities, and don\'t overexert yourself.';
    }
    if (message.includes('when') && message.includes('doctor')) {
      return 'Contact your doctor immediately if: fever > 39.5°C, severe pain (>8/10), increasing redness/swelling, or any concerning symptoms.';
    }
    if (message.includes('hello') || message.includes('hi')) {
      return 'Awaiting query parameters. Input symptoms, compliance questions, or request human intervention thresholds.';
    }
    
    return 'Query classification failed. Please rephrase regarding symptoms, pharmacology, nutritional protocol, or exertion guidelines.';
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setInput('');
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getChatbotResponse(input);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <div ref={chatRef} className="absolute bottom-20 right-0 glass-card w-[380px] h-[550px] !p-0 overflow-hidden flex flex-col border border-primary/20 bg-darkCard/90 shadow-2xl backdrop-blur-xl group">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-5 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-bold text-white tracking-tight">Support Agent V2.4</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors relative z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
             {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-end gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                        msg.type === 'user' 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_10px_rgba(0,102,255,0.2)]'
                    }`}>
                        {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`px-4 py-3 max-w-[75%] shadow-lg ${
                        msg.type === 'user'
                            ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                            : 'bg-white/5 border border-white/10 text-white/80 rounded-2xl rounded-bl-sm text-sm'
                    }`}>
                        {msg.text}
                    </div>
                </div>
             ))}
             <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-dark border-b-lg">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Input natural language prompt..."
                    className="w-full pl-5 pr-14 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-white transition-all placeholder:text-white/20"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-primary hover:bg-primary/90 disabled:bg-primary/30 text-white rounded-lg transition-colors shadow-blue-glow group"
                >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
            <p className="text-center text-[10px] text-white/30 font-medium uppercase tracking-[0.2em] mt-3">Trained on Medical Protocol Models</p>
          </div>
        </div>
      )}
      
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-blue-glow
           ${isOpen 
             ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 rotate-180' 
             : 'bg-primary text-dark hover:scale-110 active:scale-95'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-7 h-7" />}
      </button>
    </div>
  );
}
