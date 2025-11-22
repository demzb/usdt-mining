import React from 'react';
import { LifeBuoy, Mail, MessageSquareText, ArrowRight } from 'lucide-react';

interface SupportCenterProps {
  onOpenChat: () => void;
}

export const SupportCenter: React.FC<SupportCenterProps> = ({ onOpenChat }) => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Mail className="w-5 h-5 text-primary-400" />
          </div>
          <h3 className="font-semibold text-slate-200 mb-1">Email Support</h3>
          <p className="text-xs text-slate-500 mb-3">Get help with your account or payments.</p>
          <a href="mailto:supportcryptomining@gmail.com" className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
            supportcryptomining@gmail.com <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <MessageSquareText className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-slate-200 mb-1">Live AI Chat</h3>
          <p className="text-xs text-slate-500 mb-3">Instant answers to common questions.</p>
          <button onClick={onOpenChat} className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
            Start Conversation <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};