export interface CardUtilizationStatusItem {
  cardId: string;
  cardTitle: string;
  creditLimit: number;
  currentBalance: number;
  utilizationPercent: number;
  riskStatus: 'SAFE' | 'WARNING' | 'HIGH';
}

export class CreditCardUtilizationStatusEngine {
  public static calculateCardStatus(cards: { cardId: string; cardTitle: string; limit: number; balance: number }[]): {
    totalLimit: number;
    totalBalance: number;
    overallUtilizationPercent: number;
    cards: CardUtilizationStatusItem[];
  } {
    let totalLimit = 0;
    let totalBalance = 0;

    const cardsDetail: CardUtilizationStatusItem[] = cards.map((c) => {
      totalLimit += c.limit;
      totalBalance += c.balance;
      const util = c.limit > 0 ? (c.balance / c.limit) * 100 : 0;

      let riskStatus: 'SAFE' | 'WARNING' | 'HIGH' = 'SAFE';
      if (util > 50) riskStatus = 'HIGH';
      else if (util > 30) riskStatus = 'WARNING';

      return {
        cardId: c.cardId,
        cardTitle: c.cardTitle,
        creditLimit: c.limit,
        currentBalance: c.balance,
        utilizationPercent: parseFloat(util.toFixed(1)),
        riskStatus,
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
