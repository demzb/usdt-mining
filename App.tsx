import React, { useState, useEffect } from 'react';
import { SUPPORTED_COINS } from './constants';
import { DepositCard } from './components/DepositCard';
import { WithdrawalCard } from './components/WithdrawalCard';
import { MiningActivityLocked } from './components/MiningActivityLocked';
import { MiningRigs } from './components/MiningRigs';
import { ReferralCard } from './components/ReferralCard';
import { AuthScreen } from './components/AuthScreen';
import { SupportCenter } from './components/SupportCenter';
import { Wallet, LayoutDashboard, ArrowLeftRight, ArrowUpRight, LogOut, User } from 'lucide-react';

type View = 'dashboard' | 'deposit' | 'withdrawal';

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [activeCoin, setActiveCoin] = useState(SUPPORTED_COINS[0]);
  const [activeView, setActiveView] = useState<View>('deposit');

  // Check for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('mining_app_current_user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('mining_app_current_user', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('mining_app_current_user');
    setUser(null);
    setActiveView('deposit'); // Reset view
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

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
              
              <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block"></div>
              
              {/* User Profile & Logout */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end mr-1">
                  <span className="text-xs font-semibold text-white">{user}</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-8">
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
                    : 'Click a plan below to start mining for 3 months.'}
                </p>
              </div>
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
            </div>

            {/* View Switcher Content */}
            {activeView === 'withdrawal' ? (
              <WithdrawalCard />
            ) : (
              <>
                {/* We still keep generic deposit card for manual deposits, but MiningRigs handles rig-specific deposits */}
                <MiningRigs />
                <div className="opacity-75 scale-95 origin-top">
                    <DepositCard 
                    coins={SUPPORTED_COINS}
                    selectedCoin={activeCoin}
                    onSelectCoin={setActiveCoin}
                    />
                </div>
                <ReferralCard />
                <SupportCenter />
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex justify-around items-center z-30 pb-6">
        <button 
            onClick={() => setActiveView('dashboard')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeView === 'dashboard' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}
        >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button 
            onClick={() => setActiveView('deposit')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeView === 'deposit' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}
        >
            <ArrowLeftRight className="w-5 h-5" />
            <span className="text-[10px] font-medium">Deposit</span>
        </button>
        <button 
            onClick={() => setActiveView('withdrawal')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeView === 'withdrawal' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}
        >
            <ArrowUpRight className="w-5 h-5" />
            <span className="text-[10px] font-medium">Withdraw</span>
        </button>
      </div>

    </div>
  );
};

export default App;