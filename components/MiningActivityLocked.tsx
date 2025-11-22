import React from 'react';
import { Lock, Activity } from 'lucide-react';

export const MiningActivityLocked: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative group">
      {/* Header - Visible but dimmed to show what the section is */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center opacity-60">
        <h3 className="font-semibold text-slate-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary-400" />
            Mining Activity & Profits
        </h3>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* Blurred Content Area */}
      <div className="relative h-[340px] bg-slate-950/50">
        {/* Fake Chart Background to simulate data underneath */}
        <div className="absolute inset-0 p-6 opacity-10 filter blur-[3px] flex flex-col justify-end gap-4 pointer-events-none overflow-hidden">
             <div className="flex items-end gap-2 h-full">
                {[35, 55, 40, 70, 55, 80, 65, 90, 75, 95, 60, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary-900 to-primary-500/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
             </div>
             <div className="w-full h-px bg-slate-700"></div>
             <div className="flex justify-between text-[10px] text-slate-500 uppercase font-mono">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span>
             </div>
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-b from-slate-950/80 to-slate-900/90 backdrop-blur-sm p-6 text-center">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-[0_0_20px_rgba(6,182,212,0.1)] mb-5 group-hover:scale-105 transition-transform duration-500">
                <Lock className="w-7 h-7 text-primary-400" />
            </div>
            
            <h4 className="text-lg font-bold text-white mb-2">
                Analytics Restricted
            </h4>
            
            <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-[260px]">
                Real-time hashrate monitoring, daily yield charts, and profit accumulation data are available exclusively to active miners.
            </p>
            
            <div className="px-5 py-3 bg-slate-800/50 border border-primary-500/30 rounded-xl flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                    <span className="text-primary-400 font-bold text-xs">!</span>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Requirement</p>
                    <p className="text-xs text-slate-200 font-medium">Make a minimum deposit to unlock</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};