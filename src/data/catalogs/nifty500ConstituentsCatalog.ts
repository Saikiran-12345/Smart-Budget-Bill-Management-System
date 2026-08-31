export interface StockConstituentDetail {
  symbol: string;
  companyName: string;
  sector: string;
  marketCapCategory: 'LARGE_CAP' | 'MID_CAP' | 'SMALL_CAP';
  marketCapCrores: number;
  peRatio: number;
  pbRatio: number;
  dividendYieldPercent: number;
  rocePercent: number;
  roePercent: number;
}

export const NIFTY_500_CONSTITUENTS_CATALOG: StockConstituentDetail[] = [
  { symbol: 'RELIANCE', companyName: 'Reliance Industries Ltd.', sector: 'Oil Gas & Consumable Fuels', marketCapCategory: 'LARGE_CAP', marketCapCrores: 2015000, peRatio: 26.4, pbRatio: 2.3, dividendYieldPercent: 0.35, rocePercent: 9.8, roePercent: 8.9 },
  { symbol: 'TCS', companyName: 'Tata Consultancy Services Ltd.', sector: 'Information Technology', marketCapCategory: 'LARGE_CAP', marketCapCrores: 1530000, peRatio: 32.1, pbRatio: 13.5, dividendYieldPercent: 1.45, rocePercent: 54.2, roePercent: 48.6 },
  { symbol: 'HDFCBANK', companyName: 'HDFC Bank Ltd.', sector: 'Financial Services', marketCapCategory: 'LARGE_CAP', marketCapCrores: 1250000, peRatio: 18.2, pbRatio: 2.6, dividendYieldPercent: 1.18, rocePercent: 7.2, roePercent: 16.4 },
  { symbol: 'BHARTIARTL', companyName: 'Bharti Airtel Ltd.', sector: 'Telecommunication', marketCapCategory: 'LARGE_CAP', marketCapCrores: 890000, peRatio: 48.2, pbRatio: 7.8, dividendYieldPercent: 0.52, rocePercent: 14.2, roePercent: 15.6 },
  { symbol: 'ICICIBANK', companyName: 'ICICI Bank Ltd.', sector: 'Financial Services', marketCapCategory: 'LARGE_CAP', marketCapCrores: 850000, peRatio: 17.5, pbRatio: 3.1, dividendYieldPercent: 0.82, rocePercent: 7.5, roePercent: 18.2 },
  { symbol: 'INFY', companyName: 'Infosys Ltd.', sector: 'Information Technology', marketCapCategory: 'LARGE_CAP', marketCapCrores: 750000, peRatio: 28.6, pbRatio: 8.9, dividendYieldPercent: 2.10, rocePercent: 40.5, roePercent: 32.1 },
  { symbol: 'ITC', companyName: 'ITC Ltd.', sector: 'Fast Moving Consumer Goods', marketCapCategory: 'LARGE_CAP', marketCapCrores: 610000, peRatio: 28.5, pbRatio: 7.6, dividendYieldPercent: 2.78, rocePercent: 38.2, roePercent: 29.4 },
  { symbol: 'SBIN', companyName: 'State Bank of India', sector: 'Financial Services', marketCapCategory: 'LARGE_CAP', marketCapCrores: 730000, peRatio: 10.8, pbRatio: 1.6, dividendYieldPercent: 1.65, rocePercent: 6.8, roePercent: 17.8 },
  { symbol: 'L&T', companyName: 'Larsen & Toubro Ltd.', sector: 'Construction', marketCapCategory: 'LARGE_CAP', marketCapCrores: 505000, peRatio: 34.2, pbRatio: 4.8, dividendYieldPercent: 0.76, rocePercent: 15.8, roePercent: 14.9 },
  { symbol: 'HINDUNILVR', companyName: 'Hindustan Unilever Ltd.', sector: 'Fast Moving Consumer Goods', marketCapCategory: 'LARGE_CAP', marketCapCrores: 580000, peRatio: 56.4, pbRatio: 11.2, dividendYieldPercent: 1.62, rocePercent: 29.5, roePercent: 20.4 },
  { symbol: 'AXISBANK', companyName: 'Axis Bank Ltd.', sector: 'Financial Services', marketCapCategory: 'LARGE_CAP', marketCapCrores: 360000, peRatio: 14.2, pbRatio: 2.1, dividendYieldPercent: 0.10, rocePercent: 6.4, roePercent: 15.2 },
  { symbol: 'KOTAKBANK', companyName: 'Kotak Mahindra Bank Ltd.', sector: 'Financial Services', marketCapCategory: 'LARGE_CAP', marketCapCrores: 350000, peRatio: 21.5, pbRatio: 3.0, dividendYieldPercent: 0.12, rocePercent: 7.1, roePercent: 14.1 },
  { symbol: 'BAJFINANCE', companyName: 'Bajaj Finance Ltd.', sector: 'Financial Services', marketCapCategory: 'LARGE_CAP', marketCapCrores: 420000, peRatio: 29.8, pbRatio: 6.4, dividendYieldPercent: 0.52, rocePercent: 11.8, roePercent: 22.4 },
  { symbol: 'ADANIENT', companyName: 'Adani Enterprises Ltd.', sector: 'Metals & Mining', marketCapCategory: 'LARGE_CAP', marketCapCrores: 365000, peRatio: 98.4, pbRatio: 8.5, dividendYieldPercent: 0.04, rocePercent: 8.5, roePercent: 9.2 },
  { symbol: 'SUNPHARMA', companyName: 'Sun Pharmaceutical Industries Ltd.', sector: 'Healthcare', marketCapCategory: 'LARGE_CAP', marketCapCrores: 410000, peRatio: 38.6, pbRatio: 5.8, dividendYieldPercent: 0.78, rocePercent: 16.4, roePercent: 15.1 },
  { symbol: 'TITAN', companyName: 'Titan Company Ltd.', sector: 'Consumer Durables', marketCapCategory: 'LARGE_CAP', marketCapCrores: 310000, peRatio: 82.5, pbRatio: 24.1, dividendYieldPercent: 0.32, rocePercent: 24.8, roePercent: 30.5 },
  { symbol: 'MARUTI', companyName: 'Maruti Suzuki India Ltd.', sector: 'Automobile & Auto Components', marketCapCategory: 'LARGE_CAP', marketCapCrores: 390000, peRatio: 28.2, pbRatio: 4.2, dividendYieldPercent: 1.05, rocePercent: 17.5, roePercent: 14.8 },
  { symbol: 'NTPC', companyName: 'NTPC Ltd.', sector: 'Power', marketCapCategory: 'LARGE_CAP', marketCapCrores: 380000, peRatio: 18.5, pbRatio: 2.2, dividendYieldPercent: 2.25, rocePercent: 9.2, roePercent: 12.8 },
  { symbol: 'TATAMOTORS', companyName: 'Tata Motors Ltd.', sector: 'Automobile & Auto Components', marketCapCategory: 'LARGE_CAP', marketCapCrores: 350000, peRatio: 11.4, pbRatio: 3.5, dividendYieldPercent: 0.62, rocePercent: 18.9, roePercent: 32.4 },
  { symbol: 'ONGC', companyName: 'Oil & Natural Gas Corporation Ltd.', sector: 'Oil Gas & Consumable Fuels', marketCapCategory: 'LARGE_CAP', marketCapCrores: 395000, peRatio: 7.8, pbRatio: 1.3, dividendYieldPercent: 4.25, rocePercent: 14.8, roePercent: 15.6 },
];
