import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User as UserIcon, ArrowRight, ShoppingBag, Zap, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

interface GuguAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

export const GuguAIAssistant: React.FC<GuguAIAssistantProps> = ({ isOpen, onClose }) => {
  const { products, openProductDetail, addToCart, formatPrice } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I am Gugu AI, your smart shopping assistant. How can I help you today? Ask me for product recommendations by budget, feature comparisons, or current flash sales across Nigeria & Africa!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    '🔥 What are the best Flash Deals right now?',
    '💻 Recommend a coding laptop under ₦1,000,000',
    '🎧 Best ANC wireless earbuds with long battery',
    '⚡ Affordable solar power station for home backup'
  ];

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Build catalog summary for Gemini server endpoint
      const catalogSummary = products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category_name,
        price: p.price,
        compare_price: p.compare_price,
        is_flash_deal: p.is_flash_deal,
        is_free_shipping: p.is_free_shipping,
        rating: p.rating,
        specs: p.specifications,
        description: p.description
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          catalogContext: catalogSummary
        })
      });

      const data = await res.json();

      let matchedProducts: Product[] = [];
      if (data.recommendedProductIds && Array.isArray(data.recommendedProductIds)) {
        matchedProducts = products.filter((p) =>
          data.recommendedProductIds.includes(p.id)
        );
      }

      // If no explicit IDs parsed, try matching by keyword names from the reply
      if (matchedProducts.length === 0) {
        matchedProducts = products.filter((p) =>
          data.reply && data.reply.toLowerCase().includes(p.name.toLowerCase().slice(0, 15))
        );
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Here are some top picks matching your request from Gugu Xpress:",
        recommendedProducts: matchedProducts.slice(0, 3),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Error in Gugu AI chat:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: "I couldn't reach the AI server right now, but you can explore all products in our catalog!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full h-[90vh] max-h-[680px] flex flex-col shadow-2xl border border-[#EAEAEA] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#111111] text-white p-3.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-nevera font-bold text-base tracking-wide text-white">
                  GUGU <span className="text-[#FF6A00]">AI</span>
                </h3>
                <span className="bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 text-[9px] font-orbitron px-1.5 py-0.2 rounded font-bold">
                  GEMINI FLASH 3.7
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-orbitron">
                Intelligent Shopping Concierge
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-[#F7F7F7] border-b border-[#EAEAEA] px-3 py-2 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] bg-white border border-[#EAEAEA] hover:border-[#FF6A00] text-[#111111] hover:text-[#FF6A00] px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors shadow-2xs shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-1.5 max-w-[88%]">
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#FF6A00] text-white flex items-center justify-center shrink-0 mb-1 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6A00] text-white rounded-br-xs font-medium'
                      : 'bg-[#F7F7F7] text-[#111111] rounded-bl-xs border border-[#EAEAEA]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0 mb-1 text-xs">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Recommended Product Cards directly in chat */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-2.5 pl-7 w-full space-y-2">
                  <div className="text-[10px] font-orbitron font-bold text-[#666666] tracking-wider uppercase">
                    Suggested Products:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          openProductDetail(p.id);
                          onClose();
                        }}
                        className="bg-white border border-[#EAEAEA] hover:border-[#FF6A00] rounded-xl p-2 flex items-center justify-between gap-2.5 shadow-xs hover:shadow-md cursor-pointer transition-all"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-[#F7F7F7] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#111111] truncate">{p.name}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-orbitron font-bold text-xs text-[#FF6A00]">
                              {formatPrice(p.price)}
                            </span>
                            {p.compare_price && (
                              <span className="text-[10px] text-[#666666] line-through">
                                {formatPrice(p.compare_price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                          }}
                          className="p-1.5 bg-[#FFF2E8] hover:bg-[#FF6A00] text-[#FF6A00] hover:text-white rounded-lg transition-colors shrink-0"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <span className="text-[9px] text-[#666666] mt-1 px-1 font-orbitron">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 pl-7 text-xs text-[#666666]">
              <div className="w-5 h-5 rounded-full bg-[#FF6A00]/20 flex items-center justify-center animate-spin text-[#FF6A00]">
                <RefreshCw className="w-3 h-3" />
              </div>
              <span className="font-orbitron">Gugu AI is analyzing catalog & deals...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-[#EAEAEA] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gugu AI for recommendations, budgets, specs..."
            className="flex-1 bg-[#F7F7F7] focus:bg-white text-xs sm:text-sm text-[#111111] placeholder:text-[#666666] px-3.5 py-2.5 rounded-full border border-[#EAEAEA] focus:border-[#FF6A00] focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-[#FF6A00] hover:bg-[#E65F00] text-white flex items-center justify-center disabled:opacity-50 transition-colors shrink-0 shadow-xs active-press"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
