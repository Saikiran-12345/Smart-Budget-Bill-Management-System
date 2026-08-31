export type InvestmentAssetType =
  | 'MUTUAL_FUND_SIP'
  | 'DIRECT_STOCKS'
  | 'PUBLIC_PROVIDENT_FUND'
  | 'FIXED_DEPOSIT'
  | 'NATIONAL_PENSION_SYSTEM'
  | 'GOLD'
  | 'REAL_ESTATE';

export interface InvestmentHolding {
  id: string;
  holdingName: string;
  assetType: InvestmentAssetType;
  unitsHeld: number;
  averagePurchasePrice: number;
  currentNavOrPrice: number;
  totalInvestedAmount: number;
  currentMarketValue: number;
  totalUnrealizedGain: number;
  percentageReturn: number;
  sipMonthlyAmount?: number;
  sipDateOfMonth?: number;
  isSIPActive: boolean;
  createdAt: string;
  updatedAt: string;
}
