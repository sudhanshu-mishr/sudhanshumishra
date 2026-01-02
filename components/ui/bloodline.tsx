
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Plus, Minus, Cpu } from "lucide-react";

export const Bloodline = ({ className }: { className?: string }) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-6 p-8 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden group", className)}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex items-center gap-3">
        <Cpu size={16} className="text-blue-500 animate-pulse" />
        <h1 className="text-[10px] font-syncopate font-bold tracking-[0.4em] text-white uppercase">LOGIC_GATE_SYNTHESIS</h1>
      </div>

      <div className="relative">
        <h2 className="text-7xl font-bold font-syncopate text-white tracking-tighter group-hover:text-blue-500 transition-colors duration-500">
          {count.toString().padStart(2, '0')}
        </h2>
        <div className="absolute -right-6 -top-2 text-[8px] font-syncopate text-blue-500/40">NODE_HZ</div>
      </div>

      <div className="flex gap-4 w-full max-w-[200px]">
        <button 
          onClick={() => setCount((prev) => prev - 1)}
          className="flex-1 py-4 border border-white/10 rounded-sm hover:bg-blue-600/20 hover:border-blue-500 transition-all flex items-center justify-center group/btn"
        >
          <Minus size={18} className="text-white group-hover/btn:scale-125 transition-transform" />
        </button>
        <button 
          onClick={() => setCount((prev) => prev + 1)}
          className="flex-1 py-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-sm transition-all flex items-center justify-center group/btn"
        >
          <Plus size={18} className="group-hover/btn:scale-125 transition-transform" />
        </button>
      </div>

      <p className="text-[8px] font-syncopate text-white/20 uppercase tracking-[0.3em] text-center">
        MANUAL_MODULATION_SEQUENCE
      </p>
    </div>
  );
};
