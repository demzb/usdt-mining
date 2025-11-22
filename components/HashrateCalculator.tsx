import React from 'react';
import { Gauge, Zap, TrendingUp } from 'lucide-react';

// Calculated rates based on specified tiers
const TIERS = [
  { usdt: 20, rate: '200 GH/s', daily: '0.60' },
  { usdt: 25, rate: '250 GH/s', daily: '0.75' },
  { usdt: 30, rate: '300 GH/s', daily: '0.90' },
  { usdt: 50, rate: '500 GH/s', daily: '1.50' },
  { usdt: 500, rate: '5.0 TH/s', daily: '15.00' },
  { usdt: 1000, rate: '10.0 TH/s', daily: '30.00' },
];

export const HashrateCalculator: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg border border-primary-500/20">
                <Gauge className="w-5 h-5 text-primary-400" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-100">Hashrate Tiers</h2>
                <p className="text-xs text-slate-400">Projected mining power by deposit amount</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {TIERS.map((tier) => (
          <div key={tier.usdt} className="relative overflow-hidden bg-slate-950 border border-slate-800 p-4 rounded-xl hover:border-primary-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all group">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Zap className="w-12 h-12 text-primary-500/5 -rotate-12" />
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Deposit</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {tier.usdt} USDT
                    </span>
                </div>
                
                <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{tier.rate}</span>
                </div>
                
                <div className="pt-3 border-t border-slate-800 group-hover:border-slate-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-slate-400">Est. Daily</span>
                    </div>
                    <span className="text-sm font-mono font-medium text-slate-200">${tier.daily}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};