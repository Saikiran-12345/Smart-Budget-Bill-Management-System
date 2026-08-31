import { CryptoYieldCalculatorEngine, CryptoStakingYieldDetail } from '../math/calculators/cryptoYieldCalculatorEngine';

export class CryptoYieldService {
  public static getYieldAnalysis(): CryptoStakingYieldDetail {
    return CryptoYieldCalculatorEngine.calculateYield();
  }
}
