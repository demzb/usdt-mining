import React from 'react';
import { LifeBuoy, Mail, ArrowRight } from 'lucide-react';

export const SupportCenter: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-500/10 rounded-lg border border-primary-500/20">
          <LifeBuoy className="w-6 h-6 text-primary-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Support Center</h2>
          <p className="text-sm text-slate-400">Need help? We're here 24/7.</p>
        </div>
      </div>

      <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
             <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-slate-800">
                <Mail className="w-6 h-6 text-primary-400" />
            </div>
            <div>
                <h3 className="font-semibold text-slate-200 text-lg mb-1">Email Support</h3>
                <p className="text-sm text-slate-400">
                    For billing issues, activation delays, or general inquiries, please contact our support team.
                </p>
            </div>
          </div>
          
          <a href="mailto:supportcryptomining@gmail.com" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-primary-500/20 whitespace-nowrap">
            Contact Us <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800/50 text-center sm:text-left">
             <p className="text-xs text-slate-500 font-mono">
                Official: <span className="text-slate-400 select-all">supportcryptomining@gmail.com</span>
             </p>
        </div>
      </div>
    </div>
  );
};