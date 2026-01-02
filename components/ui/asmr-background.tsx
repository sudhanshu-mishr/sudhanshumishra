
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Plus, Minus, Activity } from "lucide-react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-6 p-8 rounded-sm border border-[var(--border)] bg-[var(--card-bg)] shadow-2xl relative overflow-hidden group")}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex items-center gap-2 mb-2">
        <Activity size={14} className="text-blue-500 animate-pulse" />
        <h1 className="text-[10px] font-syncopate font-bold tracking-[0.3em] text-[var(--text)]">PULSE_GENERATOR_V1</h1>
      </div>

      <div className="relative">
        <h2 className="text-6xl font-bold font-syncopate text-blue-600 tracking-tighter">
          {count.toString().padStart(2, '0')}
        </h2>
        <div className="absolute -right-4 -top-2 text-[8px] font-syncopate opacity-30">UNIT_HZ</div>
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={() => setCount((prev) => prev - 1)}
          className="flex-1 py-3 border border-[var(--border)] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center group/btn"
        >
          <Minus size={16} className="group-hover/btn:scale-125 transition-transform" />
        </button>
        <button 
          onClick={() => setCount((prev) => prev + 1)}
          className="flex-1 py-3 bg-[var(--text)] text-[var(--bg)] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center group/btn"
        >
          <Plus size={16} className="group-hover/btn:scale-125 transition-transform" />
        </button>
      </div>

      <p className="text-[8px] font-syncopate text-[var(--sub-text)] opacity-40 uppercase tracking-widest">
        Manual Logic Gate Trigger
      </p>
    </div>
  );
};
