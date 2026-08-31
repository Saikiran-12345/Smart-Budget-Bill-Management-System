export interface AmortizationScheduleMonthPoint {
  monthIndex: number;
  yearNumber: number;
  beginningBalance: number;
  monthlyEMI: number;
  principalComponent: number;
  interestComponent: number;
  endingBalance: number;
  cumulativeInterestPaid: number;
}

export class MortgageAmortizationScheduleEngine {
  public static generateSchedule(
    loanPrincipal = 4000000,
    annualInterestRatePercent = 8.5,
    tenureYears = 20
  ): {
    monthlyEMI: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    schedule: AmortizationScheduleMonthPoint[];
  } {
    const tenureMonths = tenureYears * 12;
    const monthlyRate = annualInterestRatePercent / 100 / 12;

    const emiNum = loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
    const emiDen = Math.pow(1 + monthlyRate, tenureMonths) - 1;
    const monthlyEMI = Math.round(emiNum / emiDen);

    let balance = loanPrincipal;
    let cumulativeInterestPaid = 0;

    const schedule: AmortizationScheduleMonthPoint[] = [];

    for (let m = 1; m <= tenureMonths && balance > 0; m++) {
      const yearNumber = Math.ceil(m / 12);
      const interestComponent = balance * monthlyRate;
      const principalComponent = Math.min(balance, Math.max(0, monthlyEMI - interestComponent));

      cumulativeInterestPaid += interestComponent;
      const endingBalance = Math.max(0, balance - principalComponent);

      schedule.push({
        monthIndex: m,
        yearNumber,
        beginningBalance: Math.round(balance),
        monthlyEMI,
        principalComponent: Math.round(principalComponent),
        interestComponent: Math.round(interestComponent),
        endingBalance: Math.round(endingBalance),
        cumulativeInterestPaid: Math.round(cumulativeInterestPaid),
      });

      balance = endingBalance;
    }

    return {
      monthlyEMI,
      totalInterestPaid: Math.round(cumulativeInterestPaid),
      totalAmountPaid: Math.round(loanPrincipal + cumulativeInterestPaid),
      schedule,
    };
  }
}
