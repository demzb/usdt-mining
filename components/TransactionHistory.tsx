import React from 'react';
import { Transaction, CryptoSymbol } from '../types';
import { ArrowDownLeft, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const StatusIcon = ({ status }: { status: Transaction['status'] }) => {
  switch (status) {
    case 'Completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'Pending': return <Clock className="w-4 h-4 text-amber-500" />;
    case 'Failed': return <XCircle className="w-4 h-4 text-red-500" />;
  }
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="font-semibold text-slate-200">Recent Activity</h3>
        <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">View All</button>
      </div>
      <div className="divide-y divide-slate-800">
        {transactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No recent transactions found.</div>
        ) : (
            transactions.map((tx) => (
            <div key={tx.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${tx.type === 'Deposit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-slate-200 text-sm font-medium">{tx.type} {tx.symbol}</p>
                    <p className="text-slate-500 text-xs">{tx.date}</p>
                </div>
                </div>
                <div className="text-right">
                <p className="text-slate-200 text-sm font-mono font-medium">
                    {tx.type === 'Deposit' ? '+' : '-'}{tx.amount} {tx.symbol}
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                    <StatusIcon status={tx.status} />
                    <span className={`text-xs ${
                    tx.status === 'Completed' ? 'text-emerald-500' : 
                    tx.status === 'Pending' ? 'text-amber-500' : 'text-red-500'
                    }`}>{tx.status}</span>
                </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};
