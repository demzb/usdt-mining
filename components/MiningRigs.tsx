import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cpu, Zap, Server, CheckCircle2, Loader2, Play, Fan, Terminal, Copy, AlertTriangle, Upload, Clock, FileCheck } from 'lucide-react';
import { MiningPlan } from '../types';

const PLANS: MiningPlan[] = [
  { id: 'starter', name: 'Starter Rig', price: 20, hashrate: '200 GH/s', dailyReturn: 3.00, hardware: '1x GPU Cluster' },
  { id: 'advanced', name: 'Advanced Rig', price: 50, hashrate: '500 GH/s', dailyReturn: 7.50, hardware: '2x ASIC Lite' },
  { id: 'pro', name: 'Pro Miner', price: 100, hashrate: '1.0 TH/s', dailyReturn: 15.00, hardware: '4x ASIC Pro' },
  { id: 'enterprise', name: 'Mining Farm', price: 500, hashrate: '5.0 TH/s', dailyReturn: 75.00, hardware: 'Rack Server Unit' },
];

type MiningState = 'selection' | 'payment' | 'verifying' | 'active' | 'review';

export const MiningRigs: React.FC = () => {
  const [currentState, setCurrentState] = useState<MiningState>('selection');
  const [selectedPlan, setSelectedPlan] = useState<MiningPlan | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [earnings, setEarnings] = useState(0.000000);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Payment State
  const depositAddress = 'TScXjRPwCkexRNrSwYRoqduMTdHQ1gynLQ'; // USDT TRC20
  const [copied, setCopied] = useState(false);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev.slice(-6), `[${time}] ${msg}`]);
  }, []);

  const handleSelectPlan = (plan: MiningPlan) => {
    setSelectedPlan(plan);
    setCurrentState('payment');
    setReceiptFile(null); // Reset receipt
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setReceiptFile(e.target.files[0]);
    }
  };

  const confirmPayment = useCallback(() => {
    if (!receiptFile) return;
    
    setCurrentState('verifying');
    // Simulate verification delay then show review message
    setTimeout(() => {
      setCurrentState('review');
    }, 2000);
  }, [receiptFile]);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Mining Simulation Effect
  useEffect(() => {
    if (currentState !== 'active' || !selectedPlan) return;

    const miningInterval = setInterval(() => {
      // Increment earnings (visual only)
      const perSecond = selectedPlan.dailyReturn / 86400;
      setEarnings(prev => prev + perSecond);

      // Random logs
      if (Math.random() > 0.7) {
        const ms = Math.floor(Math.random() * 100) + 20;
        addLog(`Share accepted (${ms}ms)`);
      }
    }, 1000);

    return () => clearInterval(miningInterval);
  }, [currentState, selectedPlan, addLog]);

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetSelection = () => {
    setCurrentState('selection');
    setSelectedPlan(null);
    setReceiptFile(null);
  };

  // --- RENDER: PLAN SELECTION ---
  if (currentState === 'selection') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-500/10 rounded-lg border border-primary-500/20">
            <Server className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Available Mining Rigs</h2>
            <p className="text-sm text-slate-400">Select a hardware plan to begin mining.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANS.map((plan) => (
            <div key={plan.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <Cpu className="w-16 h-16 text-primary-500 -rotate-12 translate-x-4 -translate-y-4" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-emerald-400">{plan.hashrate}</span>
                <span className="text-xs text-slate-500">Power</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Price</span>
                  <span className="text-white font-medium">{plan.price} USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Daily Return</span>
                  <span className="text-emerald-400 font-medium">+{plan.dailyReturn.toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Contract</span>
                  <span className="text-white font-medium">365 Days</span>
                </div>
              </div>

              <button 
                onClick={() => handleSelectPlan(plan)}
                className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> Start Mining
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- RENDER: REVIEW STATUS ---
  if (currentState === 'review') {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <Clock className="w-12 h-12 text-amber-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">Payment Under Review</h2>
            
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md mx-auto text-sm">
                Thank you for your payment. We have received your transaction receipt for the <span className="text-white font-medium">{selectedPlan?.name}</span>.
                <br /><br />
                Our blockchain nodes are currently verifying the transaction. Your mining rig will automatically start producing hashrate once the deposit is confirmed.
            </p>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-8 max-w-sm mx-auto">
                <div className="flex justify-between text-sm mb-3 border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium text-amber-400 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Processing
                    </span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Expected Time</span>
                    <span className="text-slate-300 font-medium">~10-30 Minutes</span>
                </div>
            </div>
            
            <button
                onClick={resetSelection}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-slate-600"
            >
                Return to Plans
            </button>
        </div>
    );
  }

  // --- RENDER: PAYMENT & VERIFICATION ---
  if (currentState === 'payment' || currentState === 'verifying') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={() => setCurrentState('selection')} 
          disabled={currentState === 'verifying'}
          className="text-xs text-slate-500 hover:text-white mb-4 flex items-center gap-1"
        >
           ← Back to plans
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Activate {selectedPlan?.name}</h2>
          <p className="text-slate-400 text-sm">Send the exact amount to the address below to auto-start your rig.</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6 relative overflow-hidden">
          <div className="flex flex-col items-center gap-4">
             <div className="text-center">
                <span className="text-slate-500 text-xs uppercase tracking-wider">Total Amount</span>
                <div className="text-3xl font-bold text-white mt-1">{selectedPlan?.price}.00 USDT</div>
                <div className="text-xs text-amber-500 mt-1 font-medium">Network: TRC20 (Tron)</div>
             </div>

             <div className="w-full h-px bg-slate-800"></div>

             <div className="w-full">
                <label className="text-xs text-slate-500 mb-1 block">Deposit Address</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-3">
                  <code className="flex-1 text-sm text-slate-300 font-mono break-all">{depositAddress}</code>
                  <button onClick={copyAddress} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
             </div>
          </div>
        </div>

        {currentState === 'verifying' ? (
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-white font-medium mb-1">Submitting Proof...</h3>
            <p className="text-slate-500 text-xs">Securely uploading your receipt to the verification server.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
               <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
               <p className="text-xs text-amber-200/80 leading-relaxed">
                 Please ensure you send <strong>TRC20 USDT</strong>. Sending other assets may result in permanent loss.
               </p>
            </div>
            
            {/* Upload Receipt Section */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <label className="block text-sm font-medium text-slate-300 mb-3">Upload Transaction Receipt</label>
                
                <div className="relative">
                    <input 
                        type="file" 
                        id="receipt-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <label 
                        htmlFor="receipt-upload" 
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                            receiptFile 
                            ? 'border-emerald-500/50 bg-emerald-500/5' 
                            : 'border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-600'
                        }`}
                    >
                        {receiptFile ? (
                            <div className="flex flex-col items-center text-emerald-400 animate-in fade-in slide-in-from-bottom-2">
                                <FileCheck className="w-8 h-8 mb-2" />
                                <span className="text-xs font-medium">{receiptFile.name}</span>
                                <span className="text-[10px] opacity-70 mt-1">Click to change</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-slate-500 hover:text-slate-400 transition-colors">
                                <Upload className="w-8 h-8 mb-2" />
                                <span className="text-xs font-medium">Click to upload screenshot</span>
                                <span className="text-[10px] opacity-70 mt-1">JPG, PNG supported</span>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            <button
                onClick={confirmPayment}
                disabled={!receiptFile}
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
            >
                Submit Payment Proof
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- RENDER: ACTIVE RIG (Fallback for demo if manually set, though flow now stops at review) ---
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
      {/* Header Status */}
      <div className="bg-slate-950 border-b border-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Rig Online</h3>
            <p className="text-xs text-emerald-400">Mining {selectedPlan?.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Uptime</p>
          <p className="text-sm font-mono text-slate-300">00:00:12</p>
        </div>
      </div>

      <div className="p-6">
        {/* Visual Representation */}
        <div className="flex justify-center gap-8 mb-8 py-4 relative">
           {/* Connecting wires visual */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10"></div>
           
           {[1, 2, 3].map((i) => (
             <div key={i} className="w-20 h-20 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-50"></div>
                <Fan className="w-12 h-12 text-slate-500 animate-[spin_2s_linear_infinite]" style={{ animationDuration: `${1.5 + (i * 0.2)}s` }} />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
             </div>
           ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
             <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Live Hashrate</p>
             <div className="flex items-center gap-2">
               <Zap className="w-4 h-4 text-amber-500" />
               <span className="text-xl font-bold text-white">{selectedPlan?.hashrate}</span>
             </div>
          </div>
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
             <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Unpaid Balance</p>
             <div className="flex items-center gap-2">
               <span className="text-xl font-mono font-bold text-emerald-400">{earnings.toFixed(8)}</span>
               <span className="text-xs text-emerald-600 font-bold">USDT</span>
             </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="bg-black rounded-xl p-4 font-mono text-xs h-32 overflow-hidden flex flex-col border border-slate-800 shadow-inner">
          <div className="flex items-center gap-2 text-slate-500 border-b border-slate-800 pb-2 mb-2">
            <Terminal className="w-3 h-3" />
            <span>miner_log.txt</span>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
             {logs.map((log, idx) => (
               <div key={idx} className="text-emerald-500/80 whitespace-nowrap animate-in slide-in-from-left-2 fade-in duration-300">
                 <span className="text-slate-600 mr-2">➜</span> {log}
               </div>
             ))}
             <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};