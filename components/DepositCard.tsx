import React, { useState, useEffect } from 'react';
import { CoinOption, CryptoSymbol, Network } from '../types';
import { WALLET_ADDRESSES } from '../constants';
import { Copy, Check, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DepositCardProps {
  coins: CoinOption[];
  selectedCoin: CoinOption;
  onSelectCoin: (coin: CoinOption) => void;
}

export const DepositCard: React.FC<DepositCardProps> = ({ coins, selectedCoin, onSelectCoin }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(selectedCoin.networks[0]);
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // Reset network when coin changes if current network isn't supported
    if (!selectedCoin.networks.includes(selectedNetwork)) {
      setSelectedNetwork(selectedCoin.networks[0]);
    }
  }, [selectedCoin]);

  useEffect(() => {
    const addr = WALLET_ADDRESSES[selectedCoin.symbol]?.[selectedNetwork];
    setAddress(addr || 'Address not available');
    // Generate QR code using a public API for reliability without extra deps
    // Use ECC level 'M' and a decent size
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${addr}&bgcolor=1e293b&color=e2e8f0&margin=10`);
  }, [selectedCoin, selectedNetwork]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-slate-100 mb-6">Deposit Assets</h2>

      {/* Coin Selector */}
      <div className="mb-6">
        <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Select Asset</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {coins.map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => onSelectCoin(coin)}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                selectedCoin.symbol === coin.symbol
                  ? 'bg-primary-900/20 border-primary-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-600'
              }`}
            >
              <img src={coin.icon} alt={coin.name} className="w-6 h-6 rounded-full" />
              <span className={`text-sm font-medium ${selectedCoin.symbol === coin.symbol ? 'text-primary-400' : 'text-slate-300'}`}>
                {coin.symbol}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Network Selector */}
      <div className="mb-8">
        <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Select Network</label>
        <div className="relative">
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value as Network)}
            className="w-full appearance-none bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            {selectedCoin.networks.map((net) => (
              <option key={net} value={net}>{net}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
        <div className="flex gap-2 mt-2 items-start">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
                Ensure you are sending <span className="text-slate-200 font-medium">{selectedCoin.symbol}</span> only on the <span className="text-slate-200 font-medium">{selectedNetwork}</span> network. Sending to the wrong network will result in permanent loss.
            </p>
        </div>
      </div>

      {/* Address Display */}
      <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col items-center text-center">
        <div className="bg-white p-2 rounded-xl mb-6 shadow-lg">
            <div className="w-[180px] h-[180px] bg-slate-200 rounded-lg overflow-hidden">
                 <img src={qrUrl} alt="Deposit QR" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
        </div>
        
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Deposit Address</p>
        <div className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-3 mb-4 group hover:border-primary-500/30 transition-colors">
            <code className="text-sm text-slate-300 font-mono break-all text-left flex-1">{address}</code>
            <button 
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-primary-400 transition-colors"
                title="Copy Address"
            >
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </button>
        </div>

        <div className="flex gap-4 w-full">
             <div className="flex-1 flex flex-col gap-1 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                <span className="text-xs text-slate-500">Minimum Deposit</span>
                <span className="text-sm text-slate-300 font-medium">{selectedCoin.minDeposit} {selectedCoin.symbol}</span>
             </div>
             <div className="flex-1 flex flex-col gap-1 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                <span className="text-xs text-slate-500">Estimated Time</span>
                <span className="text-sm text-slate-300 font-medium">~3 mins</span>
             </div>
        </div>
      </div>
    </div>
  );
};