import React, { useState } from 'react';
import { Users, Copy, Check, Share2, Zap } from 'lucide-react';

export const ReferralCard: React.FC = () => {
  const referralLink = "https://usdt-mining-six.vercel.app/";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group animate-in slide-in-from-bottom-6 duration-700 fade-in">
      {/* Background decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-500/10 rounded-lg border border-primary-500/20">
            <Users className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              Refer & Earn Hashrate
              <span className="text-[10px] font-bold bg-primary-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Bonus</span>
            </h2>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Boost your mining power! Share your unique link with friends. You'll receive <span className="text-emerald-400 font-bold">extra hashrate</span> automatically when they deposit and start mining.
        </p>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-1.5 flex items-center gap-2 pl-4">
            <div className="flex-1 truncate font-mono text-sm text-slate-300 select-all">
                {referralLink}
            </div>
            <button
                onClick={handleCopy}
                className={`p-2.5 rounded-lg flex items-center gap-2 transition-all font-medium text-sm shrink-0 ${
                    copied 
                    ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
                    : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                }`}
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied</span>
                    </>
                ) : (
                    <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy Link</span>
                        <span className="sm:hidden">Copy</span>
                    </>
                )}
            </button>
        </div>
        
        <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Bonus</span>
            </div>
            <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
             <div className="flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-primary-400" />
                <span>Unlimited Referrals</span>
            </div>
        </div>
      </div>
    </div>
  );
};