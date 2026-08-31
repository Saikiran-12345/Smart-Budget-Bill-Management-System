export interface CardUtilizationDetail {
  cardName: string;
  creditLimit: number;
  currentBalance: number;
  utilizationPercent: number;
  status: 'EXCELLENT' | 'GOOD' | 'HIGH_UTILIZATION';
}

export class CreditUtilizationBreakdownEngine {
  public static analyzeCardUtilization(
    cards: { cardName: string; limit: number; balance: number }[]
  ): {
    totalLimit: number;
    totalBalance: number;
    overallUtilizationPercent: number;
    breakdown: CardUtilizationDetail[];
  } {
    let totalLimit = 0;
    let totalBalance = 0;

    const breakdown: CardUtilizationDetail[] = cards.map((c) => {
      totalLimit += c.limit;
      totalBalance += c.balance;
      const util = c.limit > 0 ? (c.balance / c.limit) * 100 : 0;

      let status: 'EXCELLENT' | 'GOOD' | 'HIGH_UTILIZATION' = 'GOOD';
      if (util > 50) status = 'HIGH_UTILIZATION';
      else if (util <= 15) status = 'EXCELLENT';

      return {
        cardName: c.cardName,
        creditLimit: c.limit,
        currentBalance: c.balance,
        utilizationPercent: parseFloat(util.toFixed(1)),
        status,
      };
    });

    const overallUtilizationPercent = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;

    return {
      totalLimit,
      totalBalance,
      overallUtilizationPercent: parseFloat(overallUtilizationPercent.toFixed(1)),
      breakdown,
    };
  }
}
