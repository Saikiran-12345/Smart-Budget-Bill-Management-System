import { CapitalGainsSTCG_LTCG_Engine, CapitalGainsTaxSummary } from '../math/calculators/capitalGainsSTCG_LTCG_Engine';

export class CapitalGainsService {
  public static getCapitalGainsTax(
    assetClass: 'EQUITY_OR_EQUITY_MF' | 'DEBT_MUTUAL_FUND' | 'REAL_ESTATE_PROPERTY' | 'PHYSICAL_GOLD_OR_SGB',
    purchaseCostINR = 200000,
    saleProceedsINR = 450000,
    holdingPeriodDays = 400
  ): CapitalGainsTaxSummary {
    return CapitalGainsSTCG_LTCG_Engine.calculateCapitalGains(
      assetClass,
      purchaseCostINR,
      saleProceedsINR,
      holdingPeriodDays
    );
  }
}
