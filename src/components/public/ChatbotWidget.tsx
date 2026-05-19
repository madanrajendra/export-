"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  Globe, 
  User, 
  Bot,
  ArrowDownCircle,
  HelpCircle
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      text: "Welcome to Global Export Solutions. I am your specialized trade assistant. How can I facilitate your international enquiry today?", 
      sender: "bot", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Mock API call (simulate Cloud Function delay)
    try {
      // In production, we'd call: 
      // const res = await fetch('https://YOUR_CLOUD_FUNCTION_URL', { ... })
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Understood. Our systems are currently analyzing your query based on our recent catalog compliance. In the meantime, you might find our Product Suite or Contact Page helpful for specific pricing.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[600px] max-h-[85vh] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden animate-slide-up-fade relative">
          
          {/* Header */}
          <div className="bg-primary p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md">
                <Globe className="text-secondary w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-white font-black tracking-widest text-xs uppercase">GE Assistant</h3>
                <p className="text-secondary/80 text-[10px] font-black uppercase tracking-tighter">AI Trade Intelligence Active</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl text-white transition-colors relative z-10"
            >
              <X className="w-5 h-5 font-black" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar bg-slate-50/30">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={cn(
                  "max-w-[85%] flex flex-col gap-1.5",
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === "bot" ? (
                    <div className="bg-secondary p-1 rounded-lg text-white">
                      <Bot className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="bg-slate-200 p-1 rounded-lg text-slate-400">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {msg.sender === "bot" ? "GE AI" : "Manager"} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div 
                  className={cn(
                    "px-5 py-4 rounded-[1.5rem] font-medium text-sm leading-relaxed shadow-sm",
                    msg.sender === "user" 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white text-primary border border-slate-100 rounded-tl-none"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="self-start max-w-[85%] flex flex-col gap-1.5 items-start">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-secondary p-1 rounded-lg text-white">
                    <Bot className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Analyzing Data...</span>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Support Chips */}
          <div className="px-6 py-2 flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar">
            {["Pricing", "Logistics", "Compliance", "New Account"].map((chip) => (
              <button 
                key={chip}
                onClick={() => setInput(chip)}
                className="bg-white border border-slate-100 text-[10px] font-black text-slate-400 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:text-secondary hover:border-secondary transition-all whitespace-nowrap uppercase tracking-widest"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form 
            onSubmit={handleSend}
            className="p-6 bg-white border-t border-slate-100 flex items-center gap-3"
          >
            <div className="flex-grow relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Secure Trade Query..."
                className="w-full bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all text-sm font-bold text-primary pr-12"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-secondary hover:scale-110 active:scale-95 transition-transform"
              >
                <Send className="w-5 h-5 fill-current" />
              </button>
            </div>
          </form>

          {/* Encryption Notice */}
          <div className="bg-slate-50 py-1.5 text-[9px] font-black text-slate-300 text-center uppercase tracking-[0.2em] border-t border-slate-100 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            256-Bit SSL Intelligence
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-[0_10px_40px_-5px_rgba(15,23,42,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 relative group",
          isOpen ? "bg-white text-primary border-2 border-slate-100" : "bg-primary text-white"
        )}
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg animate-bounce z-10 border-2 border-primary">
            1
          </span>
        )}
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />}
        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform -z-10" />
      </button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .animate-slide-up-fade {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52.02C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
