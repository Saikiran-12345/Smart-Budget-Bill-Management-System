export interface CreditCardRewardCategory {
  categoryName: string;
  monthlySpend: number;
  rewardRatePercent: number; // e.g. 5% cashback on dining/shopping
  monthlyCashbackEarned: number;
  annualCashbackEarned: number;
}

export interface CreditCardRewardSummary {
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  totalMonthlyCashback: number;
  totalAnnualCashback: number;
  effectiveCashbackRatePercent: number;
  topRewardCategory: string;
  categories: CreditCardRewardCategory[];
}

export class CreditCardRewardOptimizerEngine {
  public static calculateRewards(
    categorySpends: { categoryName: string; monthlySpend: number; rewardRatePercent: number }[]
  ): CreditCardRewardSummary {
    let totalMonthlySpend = 0;
    let totalMonthlyCashback = 0;
    let topRewardCategory = 'None';
    let maxCashback = 0;

    const categories: CreditCardRewardCategory[] = categorySpends.map((item) => {
      totalMonthlySpend += item.monthlySpend;
      const monthlyCashbackEarned = (item.monthlySpend * item.rewardRatePercent) / 100;
      totalMonthlyCashback += monthlyCashbackEarned;

      if (monthlyCashbackEarned > maxCashback) {
        maxCashback = monthlyCashbackEarned;
        topRewardCategory = item.categoryName;
      }

      return {
        categoryName: item.categoryName,
        monthlySpend: Math.round(item.monthlySpend),
        rewardRatePercent: item.rewardRatePercent,
        monthlyCashbackEarned: Math.round(monthlyCashbackEarned),
        annualCashbackEarned: Math.round(monthlyCashbackEarned * 12),
      };
    });

    const totalAnnualSpend = totalMonthlySpend * 12;
    const totalAnnualCashback = totalMonthlyCashback * 12;
    const effectiveCashbackRatePercent = totalMonthlySpend > 0 ? (totalMonthlyCashback / totalMonthlySpend) * 100 : 0;

    return {
      totalMonthlySpend: Math.round(totalMonthlySpend),
      totalAnnualSpend: Math.round(totalAnnualSpend),
      totalMonthlyCashback: Math.round(totalMonthlyCashback),
      totalAnnualCashback: Math.round(totalAnnualCashback),
      effectiveCashbackRatePercent: parseFloat(effectiveCashbackRatePercent.toFixed(2)),
      topRewardCategory,
      categories,
    };
  }
}
