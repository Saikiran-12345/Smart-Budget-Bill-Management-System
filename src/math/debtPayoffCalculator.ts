import { LiabilityItem } from './netWorthTracker';

export interface PayoffScheduleMonth {
  month: number;
  liabilityName: string;
  remainingPrincipal: number;
  interestPaidThisMonth: number;
  principalPaidThisMonth: number;
}

export interface DebtPayoffPlanResult {
  strategy: 'AVALANCHE' | 'SNOWBALL';
  monthsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  monthlyExtraPayment: number;
  schedule: PayoffScheduleMonth[];
}

export class DebtPayoffCalculator {
  public static calculatePayoffPlan(
    liabilities: LiabilityItem[],
    extraMonthlyPayment = 5000,
    strategy: 'AVALANCHE' | 'SNOWBALL' = 'AVALANCHE'
  ): DebtPayoffPlanResult {
    const list = liabilities.map((l) => ({ ...l }));
    if (strategy === 'AVALANCHE') {
      // Highest interest rate first
      list.sort((a, b) => b.interestRatePercentage - a.interestRatePercentage);
    } else {
      // Lowest balance first
      list.sort((a, b) => a.outstandingAmount - b.outstandingAmount);
    }

    let months = 0;
    let totalInterest = 0;
    let totalPaid = 0;
    const schedule: PayoffScheduleMonth[] = [];

    const activeDebts = list.map((l) => ({
      name: l.liabilityName,
      principal: l.outstandingAmount,
      monthlyRate: l.interestRatePercentage / 100 / 12,
      minEMI: l.monthlyEMI,
    }));

    while (activeDebts.some((d) => d.principal > 0) && months < 360) {
      months++;
      let extraCash = extraMonthlyPayment;

      activeDebts.forEach((debt) => {
        if (debt.principal <= 0) return;

        const interest = debt.principal * debt.monthlyRate;
        totalInterest += interest;

        let payment = debt.minEMI;
        if (extraCash > 0) {
          payment += extraCash;
          extraCash = 0;
        }

        const principalPaid = Math.min(debt.principal, Math.max(0, payment - interest));
        debt.principal = Math.max(0, debt.principal - principalPaid);
        totalPaid += interest + principalPaid;

        if (months % 6 === 0 || debt.principal === 0) {
          schedule.push({
            month: months,
            liabilityName: debt.name,
            remainingPrincipal: Math.round(debt.principal),
            interestPaidThisMonth: Math.round(interest),
            principalPaidThisMonth: Math.round(principalPaid),
          });
        }
      });
    }

    return {
      strategy,
      monthsToPayoff: months,
      totalInterestPaid: Math.round(totalInterest),
      totalAmountPaid: Math.round(totalPaid),
      monthlyExtraPayment,
      schedule,
    };
  }
}
