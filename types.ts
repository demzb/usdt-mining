export enum CryptoSymbol {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
  SOL = 'SOL',
  USDC = 'USDC'
}

export enum Network {
  BITCOIN = 'Bitcoin',
  ETHEREUM = 'Ethereum (ERC20)',
  TRON = 'Tron (TRC20)',
  SOLANA = 'Solana',
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