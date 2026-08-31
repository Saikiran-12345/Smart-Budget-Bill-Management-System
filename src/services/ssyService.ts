import { SukanyaSamriddhiYojanaEngine, SSYMaturityDetail } from '../math/calculators/sukanyaSamriddhiYojanaEngine';

export class SSYService {
  public static getSSYMaturity(
    annualDepositAmount = 150000,
    interestRatePercent = 8.2
  ): SSYMaturityDetail {
    return SukanyaSamriddhiYojanaEngine.calculateSSY(annualDepositAmount, interestRatePercent);
  }
}
