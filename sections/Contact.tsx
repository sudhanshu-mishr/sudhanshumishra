
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Check, Loader2, Instagram } from 'lucide-react';
import { useGame } from '../components/GameContext';

const Contact: React.FC = () => {
  const { markSectionVisited, addXP, theme } = useGame();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (inView) markSectionVisited('contact');
  }, [inView, markSectionVisited]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    addXP(100);
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-40 px-8 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-5">
            <span className="text-[10px] font-syncopate text-blue-500 tracking-[0.5em] mb-6 block font-bold">04 — UPLINK</span>
            <h2 className={`text-5xl md:text-6xl font-bold font-syncopate mb-16 leading-tight text-[var(--text)] tracking-tighter`}>
              INITIATE <br />
              <span className="opacity-20">CONNECTION</span>
            </h2>
            <div className="space-y-12">
               <div>
                  <div className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-40 uppercase tracking-[0.4em] mb-4">Inquiry_Channel</div>
                  <a href="mailto:msudhanshu416@gmail.com" className={`text-3xl font-light hover:text-blue-500 transition-colors block border-b border-[var(--border)] pb-4 max-w-sm text-[var(--text)]`}>
                    msudhanshu416@gmail.com
                  </a>
               </div>
               <div>
                  <div className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-40 uppercase tracking-[0.4em] mb-4">Social_Matrices</div>
                  <div className="flex flex-col gap-4">
                    <a 
                      href="https://www.instagram.com/sudhanshu_mishra107/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 text-xl font-light text-[var(--sub-text)] hover:text-blue-500 transition-colors`}
                    >
                      <div className="w-10 h-10 border border-[var(--border)] flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                        <Instagram size={18} className="group-hover:text-blue-500" />
                      </div>
                      <span className="font-syncopate text-[10px] tracking-widest uppercase">Instagram // @sudhanshu_mishra107</span>
                    </a>
                  </div>
               </div>
               <div>
                 <div className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-40 uppercase tracking-[0.4em] mb-4">Availability</div>
                 <div className="text-[var(--sub-text)] font-light text-lg uppercase tracking-widest">Q3 / Q4 — Project Intake Open</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`h-full flex flex-col justify-center border border-[var(--border)] p-16 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-white'}`}
                >
                  <div className="w-20 h-20 bg-blue-600 flex items-center justify-center mb-10">
                    <Check size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-syncopate font-bold text-[var(--text)] mb-6 tracking-tighter">SYNCHRONIZED</h3>
                  <p className="text-[var(--sub-text)] font-light text-xl max-w-md leading-relaxed">
                    Message received and parsed. A member of the studio will reach out within 1 business cycle.
                  </p>
                  <button onClick={() => setStatus('idle')} className="mt-12 text-[10px] font-syncopate text-blue-500 hover:text-blue-600 transition-colors tracking-widest uppercase font-bold">Send_Additional_Data</button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="relative border-b border-[var(--border)] focus-within:border-blue-600 transition-colors py-4">
                      <label className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-60 uppercase tracking-[0.3em] absolute -top-4 left-0">01 / Full_Name</label>
                      <input 
                        required
                        type="text" 
                        className={`w-full bg-transparent text-2xl font-light focus:outline-none text-[var(--text)] placeholder:opacity-10`}
                        placeholder="IDENTIFY OPERATIVE"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>
                    <div className="relative border-b border-[var(--border)] focus-within:border-blue-600 transition-colors py-4">
                      <label className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-60 uppercase tracking-[0.3em] absolute -top-4 left-0">02 / Secure_Mail</label>
                      <input 
                        required
                        type="email" 
                        className={`w-full bg-transparent text-2xl font-light focus:outline-none text-[var(--text)] placeholder:opacity-10`}
                        placeholder="UPLINK ADDRESS"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="relative border-b border-[var(--border)] focus-within:border-blue-600 transition-colors py-4">
                    <label className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-60 uppercase tracking-[0.3em] absolute -top-4 left-0">03 / Objective_Brief</label>
                    <textarea 
                      required
                      rows={2}
                      className={`w-full bg-transparent text-2xl font-light focus:outline-none resize-none text-[var(--text)] placeholder:opacity-10`}
                      placeholder="DESCRIBE THE VENTURE"
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    type="submit"
                    className={`flex items-center gap-6 px-12 py-6 text-[11px] font-syncopate font-bold tracking-[0.4em] uppercase transition-all disabled:opacity-50 ${theme === 'dark' ? 'bg-white text-black hover:bg-blue-600 hover:text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="animate-spin" size={18} /> PROCESSING_DATA</>
                    ) : (
                      <><Send size={18} /> TRANSMIT_SIGNAL</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
