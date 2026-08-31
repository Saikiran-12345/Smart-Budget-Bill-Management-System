export interface DailyStockOHLCEntry {
  symbol: string;
  tradingDate: string;
  openPriceINR: number;
  highPriceINR: number;
  lowPriceINR: number;
  closePriceINR: number;
  volumeTradedShares: number;
  deliveryPercentage: number;
}

const GENERATE_STOCK_HISTORY = (): DailyStockOHLCEntry[] => {
  const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'BHARTIARTL', 'ITC', 'LT', 'SBIN', 'KOTAKBANK'];
  const entries: DailyStockOHLCEntry[] = [];

  symbols.forEach((sym, sIdx) => {
    let basePrice = 500 + sIdx * 350;
    for (let day = 1; day <= 100; day++) {
      const monthStr = Math.floor(day / 28) + 1;
      const dayStr = (day % 28) + 1;
      const dateStr = `2025-${monthStr.toString().padStart(2, '0')}-${dayStr.toString().padStart(2, '0')}`;

      const change = (Math.sin(day + sIdx) * 15);
      const openPriceINR = parseFloat((basePrice + change).toFixed(2));
      const highPriceINR = parseFloat((openPriceINR * 1.015).toFixed(2));
      const lowPriceINR = parseFloat((openPriceINR * 0.985).toFixed(2));
      const closePriceINR = parseFloat((openPriceINR * (1 + (Math.cos(day) * 0.01))).toFixed(2));
      const volumeTradedShares = Math.round(500000 + (day * 12345) % 2000000);
      const deliveryPercentage = parseFloat((45 + (day % 35)).toFixed(1));

      entries.push({
        symbol: sym,
        tradingDate: dateStr,
        openPriceINR,
        highPriceINR,
        lowPriceINR,
        closePriceINR,
        volumeTradedShares,
        deliveryPercentage,
      });

      basePrice = closePriceINR;
    }
  });

  return entries;
};

export const LARGE_STOCK_MARKET_HISTORY: DailyStockOHLCEntry[] = GENERATE_STOCK_HISTORY();
