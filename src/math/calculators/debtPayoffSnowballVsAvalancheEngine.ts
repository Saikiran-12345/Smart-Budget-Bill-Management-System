import { ActiveDebtItem } from './debtConsolidationEngine';

export interface PayoffStrategySummary {
  strategyName: 'AVALANCHE' | 'SNOWBALL';
  totalBalanceToClear: number;
  totalInterestPaid: number;
  monthsToDebtFree: number;
  orderedDebtPayoffSequence: {
    debtName: string;
    balance: number;
    aprPercent: number;
    monthlyEMI: number;
    payoffMonthIndex: number;
  }[];
}

export class DebtPayoffSnowballVsAvalancheEngine {
  public static compareStrategies(
    debts: ActiveDebtItem[],
    extraMonthlyPayment = 5000
  ): {
    avalanche: PayoffStrategySummary;
    snowball: PayoffStrategySummary;
    recommendedStrategy: 'AVALANCHE' | 'SNOWBALL';
    interestSavingsWithAvalanche: number;
  } {
    // 1. Avalanche Strategy (Highest APR first)
    const avalancheDebts = [...debts].sort((a, b) => b.aprPercent - a.aprPercent);
    const avalancheSeq = avalancheDebts.map((d, idx) => ({
      debtName: d.debtName,
      balance: Math.round(d.balance),
      aprPercent: d.aprPercent,
      monthlyEMI: Math.round(d.monthlyEMI),
      payoffMonthIndex: Math.ceil(d.balance / (d.monthlyEMI + (idx === 0 ? extraMonthlyPayment : 0))),
    }));
    const avalancheMonths = Math.max(...avalancheSeq.map((s) => s.payoffMonthIndex));
    const avalancheInterest = debts.reduce((s, d) => s + (d.balance * (d.aprPercent / 100) * (avalancheMonths / 12)) * 0.5, 0);

    // 2. Snowball Strategy (Lowest Balance first)
    const snowballDebts = [...debts].sort((a, b) => a.balance - b.balance);
    const snowballSeq = snowballDebts.map((d, idx) => ({
      debtName: d.debtName,
      balance: Math.round(d.balance),
      aprPercent: d.aprPercent,
      monthlyEMI: Math.round(d.monthlyEMI),
      payoffMonthIndex: Math.ceil(d.balance / (d.monthlyEMI + (idx === 0 ? extraMonthlyPayment : 0))),
    }));
    const snowballMonths = Math.max(...snowballSeq.map((s) => s.payoffMonthIndex));
    const snowballInterest = debts.reduce((s, d) => s + (d.balance * (d.aprPercent / 100) * (snowballMonths / 12)) * 0.55, 0);

    const totalBal = debts.reduce((s, d) => s + d.balance, 0);

    return {
      avalanche: {
        strategyName: 'AVALANCHE',
        totalBalanceToClear: Math.round(totalBal),
        totalInterestPaid: Math.round(avalancheInterest),
        monthsToDebtFree: avalancheMonths,
        orderedDebtPayoffSequence: avalancheSeq,
      },
      snowball: {
        strategyName: 'SNOWBALL',
        totalBalanceToClear: Math.round(totalBal),
        totalInterestPaid: Math.round(snowballInterest),
        monthsToDebtFree: snowballMonths,
        orderedDebtPayoffSequence: snowballSeq,
      },
      recommendedStrategy: 'AVALANCHE',
      interestSavingsWithAvalanche: Math.max(0, Math.round(snowballInterest - avalancheInterest)),
    };
  }
}
