import { ActiveDebtItem } from './debtConsolidationEngine';

export interface DebtPayoffStep {
  rankOrder: number;
  debtName: string;
  balanceAmount: number;
  aprPercent: number;
  monthlyEMI: number;
  estimatedMonthsToClear: number;
}

export class DebtPayoffSequenceEngine {
  public static calculateSequence(
    debts: ActiveDebtItem[],
    extraMonthlyCash = 5000,
    method: 'AVALANCHE' | 'SNOWBALL' = 'AVALANCHE'
  ): DebtPayoffStep[] {
    const list = debts.map((d) => ({ ...d }));

    if (method === 'AVALANCHE') {
      list.sort((a, b) => b.aprPercent - a.aprPercent);
    } else {
      list.sort((a, b) => a.balance - b.balance);
    }

    return list.map((d, idx) => {
      const totalMonthlyPay = d.monthlyEMI + (idx === 0 ? extraMonthlyCash : 0);
      const months = totalMonthlyPay > 0 ? Math.ceil(d.balance / totalMonthlyPay) : 99;

      return {
        rankOrder: idx + 1,
        debtName: d.debtName,
        balanceAmount: Math.round(d.balance),
        aprPercent: d.aprPercent,
        monthlyEMI: Math.round(d.monthlyEMI),
        estimatedMonthsToClear: months,
      };
    });
  }
}
