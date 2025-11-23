import { CoinOption, CryptoSymbol, Network, Transaction } from './types';

export const SUPPORTED_COINS: CoinOption[] = [
  {
    symbol: CryptoSymbol.BTC,
    name: 'Bitcoin',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026',
    networks: [Network.BITCOIN],
    color: 'text-orange-500',
    minDeposit: 0.0001
  },
  {
    symbol: CryptoSymbol.USDT,
    name: 'Tether',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026',
    networks: [Network.TRON, Network.BSC],
    color: 'text-emerald-500',
    minDeposit: 20
  }
];

// In a real app, these would come from a secure backend or wallet generation service
export const WALLET_ADDRESSES: Partial<Record<CryptoSymbol, Record<string, string>>> = {
  [CryptoSymbol.BTC]: {
    [Network.BITCOIN]: '12nbmgzH3RCvkvkRvYVScUibrn9b4Y1Mt6',
  },
  [CryptoSymbol.USDT]: {
    [Network.TRON]: 'TScXjRPwCkexRNrSwYRoqduMTdHQ1gynLQ',
    [Network.BSC]: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'Deposit',
    amount: 1200,
    symbol: CryptoSymbol.USDT,
    status: 'Completed',
    date: '2023-10-26 14:30',
    hash: '0x123...abc'
  },
  {
    id: 'tx-2',
    type: 'Deposit',
    amount: 500,
    symbol: CryptoSymbol.USDT,
    status: 'Completed',
    date: '2023-10-25 09:15',
    hash: '0x456...def'
  },
  {
    id: 'tx-3',
    type: 'Deposit',
    amount: 0.02,
    symbol: CryptoSymbol.BTC,
    status: 'Pending',
    date: '2023-10-27 11:00',
    hash: 'abc...789'
  }
];

export const GEMINI_SYSTEM_INSTRUCTION = `
You are Crypto Mining AI, a specialized and helpful cryptocurrency support assistant integrated into a deposit portal.
Your goal is to assist users with depositing funds, explaining networks (TRC20 vs BEP20), troubleshooting stuck transactions, and explaining security concepts related to mining deposits.
- Keep answers concise and easy to understand for beginners.
- If a user asks for an address, explain you cannot generate new ones but guide them to use the UI selector.
- Be polite and professional.
- Do not give financial advice (NFA).
`;