export interface CreditCardAccountDetail {
  id: string;
  cardName: string;
  creditLimit: number;
  currentBalance: number;
  utilizationPercent: number;
  riskRating: 'SAFE' | 'WARNING' | 'HIGH';
}

export class CreditUtilizationAnalyzerEngine {
  public static analyzeUtilization(cards: { id: string; cardName: string; limit: number; balance: number }[]): {
    totalLimit: number;
    totalBalance: number;
    overallUtilizationPercent: number;
    cards: CreditCardAccountDetail[];
  } {
    let totalLimit = 0;
    let totalBalance = 0;

    const cardsDetail: CreditCardAccountDetail[] = cards.map((c) => {
      totalLimit += c.limit;
      totalBalance += c.balance;
      const util = c.limit > 0 ? (c.balance / c.limit) * 100 : 0;

      let riskRating: 'SAFE' | 'WARNING' | 'HIGH' = 'SAFE';
      if (util > 50) riskRating = 'HIGH';
      else if (util > 30) riskRating = 'WARNING';

      return {
        id: c.id,
        cardName: c.cardName,
        creditLimit: c.limit,
        currentBalance: c.balance,
        utilizationPercent: parseFloat(util.toFixed(1)),
        riskRating,
      };
    });

    const overallUtilizationPercent = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;

    return {
      totalLimit: Math.round(totalLimit),
      totalBalance: Math.round(totalBalance),
      overallUtilizationPercent: parseFloat(overallUtilizationPercent.toFixed(1)),
      cards: cardsDetail,
    };
  }
}
