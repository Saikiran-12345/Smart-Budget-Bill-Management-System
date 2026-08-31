export interface CryptoTokenMarketDetail {
  tokenSymbol: string;
  tokenName: string;
  category: 'LAYER_1' | 'DEFI' | 'PAYMENTS' | 'STABLECOIN';
  currentPriceUSD: number;
  currentPriceINR: number;
  marketCapUSD: number;
  twentyFourHourChangePercent: number;
  sevenDayChangePercent: number;
  stakingAPYPercent: number;
  allTimeHighUSD: number;
  circulatingSupply: number;
}

export const CRYPTOCURRENCY_MARKET_CATALOG: CryptoTokenMarketDetail[] = [
  {
    tokenSymbol: 'BTC',
    tokenName: 'Bitcoin',
    category: 'PAYMENTS',
    currentPriceUSD: 64500,
    currentPriceINR: 5418000,
    marketCapUSD: 1270000000000,
    twentyFourHourChangePercent: 2.4,
    sevenDayChangePercent: 5.8,
    stakingAPYPercent: 0, // POW
    allTimeHighUSD: 73750,
    circulatingSupply: 19700000,
  },
  {
    tokenSymbol: 'ETH',
    tokenName: 'Ethereum',
    category: 'LAYER_1',
    currentPriceUSD: 3150,
    currentPriceINR: 264600,
    marketCapUSD: 378000000000,
    twentyFourHourChangePercent: 1.8,
    sevenDayChangePercent: 4.2,
    stakingAPYPercent: 4.2,
    allTimeHighUSD: 4890,
    circulatingSupply: 120000000,
  },
  {
    tokenSymbol: 'SOL',
    tokenName: 'Solana',
    category: 'LAYER_1',
    currentPriceUSD: 155,
    currentPriceINR: 13020,
    marketCapUSD: 72000000000,
    twentyFourHourChangePercent: 4.5,
    sevenDayChangePercent: 12.4,
    stakingAPYPercent: 6.8,
    allTimeHighUSD: 260,
    circulatingSupply: 465000000,
  },
  {
    tokenSymbol: 'USDT',
    tokenName: 'Tether USD',
    category: 'STABLECOIN',
    currentPriceUSD: 1.00,
    currentPriceINR: 84.00,
    marketCapUSD: 118000000000,
    twentyFourHourChangePercent: 0.01,
    sevenDayChangePercent: 0.05,
    stakingAPYPercent: 8.5,
    allTimeHighUSD: 1.02,
    circulatingSupply: 118000000000,
  },
  {
    tokenSymbol: 'MATIC',
    tokenName: 'Polygon',
    category: 'LAYER_1',
    currentPriceUSD: 0.52,
    currentPriceINR: 43.68,
    marketCapUSD: 5100000000,
    twentyFourHourChangePercent: 3.1,
    sevenDayChangePercent: 8.9,
    stakingAPYPercent: 5.5,
    allTimeHighUSD: 2.92,
    circulatingSupply: 9800000000,
  },
];
