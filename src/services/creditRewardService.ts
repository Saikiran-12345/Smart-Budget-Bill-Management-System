import { CreditCardRewardOptimizerEngine, CreditCardRewardSummary } from '../math/calculators/creditCardRewardOptimizerEngine';

export class CreditRewardService {
  public static getRewardOptimization(): CreditCardRewardSummary {
    const defaultSpends = [
      { categoryName: 'Dining & Food Delivery', monthlySpend: 15000, rewardRatePercent: 5 },
      { categoryName: 'Supermarket Groceries', monthlySpend: 20000, rewardRatePercent: 3 },
      { categoryName: 'Fuel & Transportation', monthlySpend: 8000, rewardRatePercent: 4 },
      { categoryName: 'Shopping & Electronics', monthlySpend: 12000, rewardRatePercent: 5 },
    ];

    return CreditCardRewardOptimizerEngine.calculateRewards(defaultSpends);
  }
}
