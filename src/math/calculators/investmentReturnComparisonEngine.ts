export interface AssetClassReturnOption {
  assetClassName: string; // e.g. Equity Mutual Funds, Fixed Deposit, Real Estate, Gold
  expectedAnnualReturnPercent: number;
  volatilityRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  initialInvestment: number;
  finalCorpus: number;
  totalGain: number;
  cagrPercent: number;
}

export class InvestmentReturnComparisonEngine {
  public static compareAssetClasses(
    initialInvestment = 500000,
    holdingPeriodYears = 10
  ): AssetClassReturnOption[] {
    const assetModels = [
      { name: 'Equity Index Mutual Funds', returnRate: 12.0, risk: 'HIGH' as const },
      { name: 'Corporate Fixed Deposit', returnRate: 7.5, risk: 'LOW' as const },
      { name: 'Real Estate Residential', returnRate: 8.5, risk: 'MEDIUM' as const },
      { name: 'Sovereign Gold Bonds', returnRate: 9.5, risk: 'LOW' as const },
    ];

    return assetModels.map((m) => {
      const finalCorpus = Math.round(initialInvestment * Math.pow(1 + m.returnRate / 100, holdingPeriodYears));
      const totalGain = finalCorpus - initialInvestment;

      return {
        assetClassName: m.name,
        expectedAnnualReturnPercent: m.returnRate,
        volatilityRisk: m.risk,
        initialInvestment,
        finalCorpus,
        totalGain,
        cagrPercent: m.returnRate,
      };
    });
  }
}
