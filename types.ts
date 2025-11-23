export enum CryptoSymbol {
  BTC = 'BTC',
  USDT = 'USDT'
}

export enum Network {
  BITCOIN = 'Bitcoin',
  TRON = 'Tron (TRC20)',
  BSC = 'BNB Smart Chain (BEP20)'
}

export interface CoinOption {
  symbol: CryptoSymbol;
  name: string;
  icon: string; // URL or Lucide icon name mapping
  networks: Network[];
  color: string;
  minDeposit: number;
}

export interface WalletAddress {
  address: string;
  network: Network;
}

export interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  symbol: CryptoSymbol;
  status: 'Pending' | 'Completed' | 'Failed';
  date: string;
  hash: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface MiningPlan {
  id: string;
  name: string;
  price: number;
  hashrate: string;
  dailyReturn: number;
  hardware: string;
}