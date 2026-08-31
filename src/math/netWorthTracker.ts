export interface AssetItem {
  id: string;
  assetName: string;
  category: 'LIQUID_CASH' | 'MUTUAL_FUNDS' | 'STOCKS' | 'REAL_ESTATE' | 'GOLD' | 'RETIREMENT';
  currentValue: number;
  isLiquid: boolean;
}

export interface LiabilityItem {
  id: string;
  liabilityName: string;
  category: 'HOME_LOAN' | 'CAR_LOAN' | 'PERSONAL_LOAN' | 'CREDIT_CARD_DEBT' | 'OTHER';
  outstandingAmount: number;
  interestRatePercentage: number;
  monthlyEMI: number;
}

export interface NetWorthSummary {
  totalAssets: number;
  totalLiquidAssets: number;
  totalLiabilities: number;
  netWorth: number;
  solvencyRatioPercentage: number;
  debtToAssetRatioPercentage: number;
}

export class NetWorthTracker {
  public static calculateNetWorth(
    assets: AssetItem[],
    liabilities: LiabilityItem[]
  ): NetWorthSummary {
    const totalAssets = assets.reduce((s, a) => s + a.currentValue, 0);
    const totalLiquidAssets = assets
      .filter((a) => a.isLiquid)
      .reduce((s, a) => s + a.currentValue, 0);
    const totalLiabilities = liabilities.reduce((s, l) => s + l.outstandingAmount, 0);

    const netWorth = totalAssets - totalLiabilities;
    const solvencyRatioPercentage = totalLiabilities > 0 ? (totalAssets / totalLiabilities) * 100 : 100;
    const debtToAssetRatioPercentage = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    return {
      totalAssets,
      totalLiquidAssets,
      totalLiabilities,
      netWorth,
      solvencyRatioPercentage: parseFloat(solvencyRatioPercentage.toFixed(1)),
      debtToAssetRatioPercentage: parseFloat(debtToAssetRatioPercentage.toFixed(1)),
    };
  }
}
