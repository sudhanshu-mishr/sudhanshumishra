
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Command, Terminal, ShieldAlert, ExternalLink } from 'lucide-react';
import { chatWithNexus } from '../services/geminiService';
import { useGame } from './GameContext';
import '../types'; // Ensure global augmentations are loaded

const AIGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Synthesis Node online. I am Sudhanshu\'s technical liaison. How can I assist your inquiry today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { addXP, unlockAchievement, theme } = useGame();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (typeof window !== 'undefined' && window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAuthorize = async () => {
    if (typeof window !== 'undefined' && window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || !hasKey) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    addXP(15);
    unlockAchievement('talkative');

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMsg }] });

    const aiResponse = await chatWithNexus(history);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-[200]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full flex items-center justify-center border border-[var(--border)] shadow-2xl group overflow-hidden ${theme === 'dark' ? 'bg-white/5 backdrop-blur-md' : 'bg-white'}`}
        >
          <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
          <Command size={24} className="group-hover:text-blue-500 transition-colors relative z-10 text-[var(--text)]" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 right-0 w-full sm:w-[450px] border-l border-[var(--border)] z-[250] flex flex-col shadow-[-40px_0_80px_rgba(0,0,0,0.3)] ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'}`}
          >
            {/* Header */}
            <div className="p-8 border-b border-[var(--border)] flex justify-between items-center">
              <div>
                <h3 className="text-xs font-syncopate font-bold text-[var(--text)] tracking-widest uppercase">AI_SYTHESIS_NODE</h3>
                <div className="flex items-center gap-2 mt-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${hasKey ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`}></div>
                   <span className="text-[9px] font-syncopate text-[var(--sub-text)] uppercase">
                     {hasKey ? 'System Status: Optimal' : 'System Status: Unauthorized'}
                   </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--sub-text)] hover:text-blue-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {!hasKey ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <ShieldAlert size={48} className="text-amber-500 mb-2" />
                  <div className="space-y-2">
                    <h4 className="font-syncopate text-xs font-bold text-[var(--text)]">AUTH_REQUIRED</h4>
                    <p className="text-xs text-[var(--sub-text)] leading-relaxed max-w-[280px]">
                      The Neural Synthesis Node requires a valid Gemini API key to bridge the logic gap. 
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleAuthorize}
                    className="px-6 py-3 bg-blue-600 text-white text-[10px] font-syncopate font-bold tracking-widest uppercase rounded-sm hover:bg-blue-700 transition-colors"
                  >
                    Connect Neural Link
                  </button>

                  <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[8px] font-syncopate text-blue-500/60 hover:text-blue-500 transition-colors"
                  >
                    <ExternalLink size={10} /> View Billing Requirements
                  </a>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`text-[10px] font-syncopate uppercase tracking-widest mb-2 ${m.role === 'user' ? 'opacity-40' : 'text-blue-500 font-bold'}`}>
                        {m.role === 'user' ? 'Operative' : 'Archive_Node'}
                      </div>
                      <div className={`text-sm font-light leading-relaxed ${m.role === 'user' ? 'text-[var(--text)] text-right' : 'text-[var(--sub-text)]'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2">
                       <Terminal size={14} className="text-blue-500 animate-pulse" />
                       <span className="text-[10px] font-syncopate text-[var(--sub-text)] uppercase animate-pulse">Processing...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className={`p-8 border-t border-[var(--border)] ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50'}`}>
              <div className="relative">
                <input
                  type="text"
                  disabled={!hasKey}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={hasKey ? "Ask about Sudhanshu's tech stack..." : "Neural link required..."}
                  className={`w-full border border-[var(--border)] rounded-xl px-4 py-4 pr-12 text-sm transition-all font-light focus:outline-none focus:border-blue-500 disabled:opacity-50 ${theme === 'dark' ? 'bg-white/5 text-white placeholder:text-white/10' : 'bg-white text-slate-900 placeholder:text-slate-300'}`}
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim() || !hasKey}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-500 disabled:opacity-0 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIGuide;
