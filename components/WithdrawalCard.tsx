import React from 'react';
import { Lock, ShieldCheck, CreditCard } from 'lucide-react';

export const WithdrawalCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[500px] text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
          <Lock className="w-10 h-10 text-amber-500" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-slate-900 p-2 rounded-full border border-slate-800">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      {/* Content */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
        Withdrawals Restricted
      </h2>
      
      <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed mb-8">
        To ensure the security of the mining pool and comply with regulation, withdrawal functionality remains locked for new accounts.
      </p>

      <div className="w-full max-w-md bg-slate-950/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
            <CreditCard className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-200 font-medium mb-1">Action Required</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Withdrawals will be automatically activated immediately after your first 
              <span className="text-amber-400 font-medium"> Mining Subscription </span> 
              is processed.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
        <Lock className="w-3 h-3" />
        <span>Bank-grade security protocols active</span>
      </div>
    </div>
  );
};