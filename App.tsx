import React, { useState } from 'react';
import { SUPPORTED_COINS } from './constants';
import { DepositCard } from './components/DepositCard';
import { WithdrawalCard } from './components/WithdrawalCard';
import { MiningActivityLocked } from './components/MiningActivityLocked';
import { HashrateCalculator } from './components/HashrateCalculator';
import { AIAssistant } from './components/AIAssistant';
import { Wallet, LayoutDashboard, ArrowLeftRight, MessageSquareText, ArrowUpRight } from 'lucide-react';

type View = 'dashboard' | 'deposit' | 'withdrawal';

const App = () => {
  const [activeCoin, setActiveCoin] = useState(SUPPORTED_COINS[0]);
  const [activeView, setActiveView] = useState<View>('deposit');
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary-500/30">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('deposit')}>
              <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Crypto Mining
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveView('dashboard')}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${activeView === 'dashboard' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <LayoutDashboard className={`w-4 h-4 ${activeView === 'dashboard' ? 'text-primary-400' : 'text-slate-500'}`} /> Dashboard
              </button>
              <button 
                onClick={() => setActiveView('deposit')}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${activeView === 'deposit' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <ArrowLeftRight className={`w-4 h-4 ${activeView === 'deposit' ? 'text-primary-400' : 'text-slate-500'}`} /> Deposit
              </button>
              <button 
                onClick={() => setActiveView('withdrawal')}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${activeView === 'withdrawal' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <ArrowUpRight className={`w-4 h-4 ${activeView === 'withdrawal' ? 'text-primary-400' : 'text-slate-500'}`} /> Withdrawal
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAIOpen(!isAIOpen)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors relative"
                title="AI Assistant"
              >
                <MessageSquareText className="w-5 h-5" />
                {!isAIOpen && <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>}
              </button>
              
              <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block"></div>
              
              {/* Mock User Profile */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Dynamic Content (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-primary-900/20 to-slate-900 border border-primary-900/30 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {activeView === 'withdrawal' ? 'Withdraw Funds' : 'Secure Deposits'}
                </h1>
                <p className="text-slate-400 max-w-md text-sm">
                  {activeView === 'withdrawal' 
                    ? 'Access your mining profits instantly.' 
                    : 'Click USDT deposit and start mining for 365 days.'}
                </p>
              </div>
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
            </div>

            {/* View Switcher Content */}
            {activeView === 'withdrawal' ? (
              <WithdrawalCard />
            ) : (
              <>
                <DepositCard 
                  coins={SUPPORTED_COINS}
                  selectedCoin={activeCoin}
                  onSelectCoin={setActiveCoin}
                />
                <HashrateCalculator />
              </>
            )}
          </div>

          {/* Right Column: History & Info (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-slate-500 text-xs uppercase font-medium mb-1">24h Deposits</p>
                    <p className="text-xl font-bold text-white">2.45 BTC</p>
                    <span className="text-xs text-emerald-500 flex items-center mt-1">
                         +12.5%
                    </span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-slate-500 text-xs uppercase font-medium mb-1">Security Level</p>
                    <p className="text-xl font-bold text-emerald-400">High</p>
                    <span className="text-xs text-slate-500 flex items-center mt-1">
                         Audited
                    </span>
                </div>
            </div>

            {/* Mining Activity Locked Section */}
            <MiningActivityLocked />
            
          </div>
        </div>
      </main>

      {/* AI Assistant Modal/Chat */}
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

    </div>
  );
};

export default App;