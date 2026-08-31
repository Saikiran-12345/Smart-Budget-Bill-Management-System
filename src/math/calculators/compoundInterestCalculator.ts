export type CompoundingFrequency = 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY';

export interface CompoundInterestSchedulePoint {
  periodNumber: number;
  year: number;
  startingBalance: number;
  depositAmount: number;
  interestEarned: number;
  endingBalance: number;
}

export interface CompoundInterestResult {
  initialPrincipal: number;
  totalDeposits: number;
  totalInterestEarned: number;
  finalBalance: number;
  effectiveAnnualYield: number;
  schedule: CompoundInterestSchedulePoint[];
}

export class CompoundInterestCalculator {
  public static calculate(
    principal: number,
    periodicDeposit: number,
    annualInterestRatePercent: number,
    years: number,
    compoundingFrequency: CompoundingFrequency = 'MONTHLY'
  ): CompoundInterestResult {
    let periodsPerYear = 12;
    if (compoundingFrequency === 'QUARTERLY') periodsPerYear = 4;
    else if (compoundingFrequency === 'SEMI_ANNUALLY') periodsPerYear = 2;
    else if (compoundingFrequency === 'ANNUALLY') periodsPerYear = 1;

    const ratePerPeriod = annualInterestRatePercent / 100 / periodsPerYear;
    const totalPeriods = years * periodsPerYear;

    let balance = principal;
    let totalDeposits = 0;
    let totalInterestEarned = 0;

    const schedule: CompoundInterestSchedulePoint[] = [];

    for (let p = 1; p <= totalPeriods; p++) {
      const startingBalance = balance;
      const interestForPeriod = startingBalance * ratePerPeriod;
      totalInterestEarned += interestForPeriod;
      balance += interestForPeriod + periodicDeposit;
      totalDeposits += periodicDeposit;

      if (p % periodsPerYear === 0 || p === totalPeriods) {
        schedule.push({
          periodNumber: p,
          year: Math.ceil(p / periodsPerYear),
          startingBalance: Math.round(startingBalance),
          depositAmount: Math.round(totalDeposits),
          interestEarned: Math.round(totalInterestEarned),
          endingBalance: Math.round(balance),
        });
      }
    }

    const effectiveAnnualYield = ((Math.pow(1 + ratePerPeriod, periodsPerYear) - 1) * 100);

    return {
      initialPrincipal: principal,
      totalDeposits: Math.round(totalDeposits),
      totalInterestEarned: Math.round(totalInterestEarned),
      finalBalance: Math.round(balance),
      effectiveAnnualYield: parseFloat(effectiveAnnualYield.toFixed(2)),
      schedule,
    };
  }
}
