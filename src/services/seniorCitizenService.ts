import { SeniorCitizenSavingsSchemeEngine, SCSSSummary } from '../math/calculators/seniorCitizenSavingsSchemeEngine';

export class SeniorCitizenService {
  public static getSCSSPayout(
    depositAmount = 1500000,
    annualInterestRatePercent = 8.2
  ): SCSSSummary {
    return SeniorCitizenSavingsSchemeEngine.calculateSCSS(depositAmount, annualInterestRatePercent);
  }
}
