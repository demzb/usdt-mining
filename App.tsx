import React, { useState, useEffect } from 'react';
import { SUPPORTED_COINS, INITIAL_TRANSACTIONS } from './constants';
import { DepositCard } from './components/DepositCard';
import { TransactionHistory } from './components/TransactionHistory';
import { AIAssistant } from './components/AIAssistant';
import { Wallet, LayoutDashboard, ArrowLeftRight, MessageSquareText } from 'lucide-react';
import { supabase } from './lib/supabaseClient';
import { Transaction } from './types';

const App = () => {
  const [activeCoin, setActiveCoin] = useState(SUPPORTED_COINS[0]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedTransactions: Transaction[] = data.map((tx: any) => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount,
            symbol: tx.symbol,
            status: tx.status,
            date: new Date(tx.created_at).toLocaleString(),
            hash: tx.hash
          }));
          setTransactions(formattedTransactions);
        }
      } catch (error: any) {
        // Check for specific Supabase table missing errors
        const isTableMissing = error.message?.includes('Could not find the table') || 
                               error.message?.includes('relation "public.transactions" does not exist');

        if (isTableMissing) {
          console.warn('Supabase Update Required: The "transactions" table was not found. Falling back to mock data. Please run the provided "supabase_schema.sql" in your Supabase SQL Editor.');
        } else {
          console.error('Error fetching transactions:', error.message || error);
        }
        
        // Fallback to initial mock data if connection fails or table doesn't exist yet
        setTransactions(INITIAL_TRANSACTIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    // Set up realtime subscription
    const subscription = supabase
      .channel('transactions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        fetchTransactions();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary-500/30">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Crypto Mining
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-8">
              <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>
              <button className="text-sm font-medium text-white flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-primary-400" /> Deposit
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
          
          {/* Left Column: Deposit Interface (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-primary-900/20 to-slate-900 border border-primary-900/30 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-white mb-2">Secure Deposits</h1>
                <p className="text-slate-400 max-w-md text-sm">
                  Click USDT deposit and start mining for 365 days.
                </p>
              </div>
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
            </div>

            <DepositCard 
              coins={SUPPORTED_COINS}
              selectedCoin={activeCoin}
              onSelectCoin={setActiveCoin}
            />
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

            <TransactionHistory transactions={transactions} />
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="font-semibold text-slate-200 mb-4">Need Help?</h3>
                <p className="text-sm text-slate-400 mb-4">
                    Transactions can sometimes get stuck due to network congestion. Ask our AI assistant for details on current gas fees or status.
                </p>
                <button 
                    onClick={() => setIsAIOpen(true)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700"
                >
                    Open AI Support
                </button>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Modal/Chat */}
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

    </div>
  );
};

export default App;