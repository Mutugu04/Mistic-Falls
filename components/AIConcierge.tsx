import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, PieChart } from 'lucide-react';
import { chatWithConcierge } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#D4AF37', '#800020', '#1A1A1A', '#E63946', '#F3E5AB'];

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Sannu! Welcome to Mistic Falls. I am your AI Event Planner. How can I help you plan your perfect event today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await chatWithConcierge(input, messages);
    setMessages(prev => [...prev, response]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-mistic-red hover:bg-red-800 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 border-2 border-mistic-gold"
        >
          <Sparkles className="w-6 h-6 animate-pulse text-mistic-gold" />
          <span className="font-semibold hidden md:block">Plan with AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-mistic-gold animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-mistic-red p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded-full">
                 <Sparkles className="w-5 h-5 text-mistic-gold" />
              </div>
              <div>
                <h3 className="font-bold font-serif">Mistic AI Planner</h3>
                <p className="text-xs text-mistic-goldlight">Always online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-mistic-goldlight">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-mistic-cream space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-mistic-gold text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Budget Visualization if AI returns structured data */}
                  {msg.isBudget && msg.budgetData && (
                    <div className="mt-3 h-48 w-full bg-gray-50 rounded-lg p-2">
                      <p className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><PieChart size={12}/> Estimated Breakdown</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={msg.budgetData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {msg.budgetData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-mistic-gold rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-mistic-red rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-mistic-gold rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about prices, decor, or ideas..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-mistic-gold focus:ring-1 focus:ring-mistic-gold"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-mistic-dark text-mistic-gold p-2 rounded-full hover:bg-black disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConcierge;
