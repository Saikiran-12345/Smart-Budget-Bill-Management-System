export interface SIPStepUpYearPoint {
  year: number;
  monthlyDepositForYear: number;
  totalInvestedTillYear: number;
  wealthCorpusEndYear: number;
  estimatedReturnGain: number;
}

export interface SIPStepUpResult {
  initialMonthlySIP: number;
  annualStepUpPercent: number;
  totalInvested: number;
  finalCorpus: number;
  totalGain: number;
  yearlySchedule: SIPStepUpYearPoint[];
}

export class SIPTopupCalculator {
  public static calculateStepUpSIP(
    initialMonthlySIP: number,
    annualStepUpPercent: number, // e.g. 10% step-up each year
    expectedAnnualReturnPercent: number, // e.g. 12% p.a.
    investmentYears: number
  ): SIPStepUpResult {
    const monthlyRate = expectedAnnualReturnPercent / 100 / 12;
    let currentMonthlyDeposit = initialMonthlySIP;
    let corpus = 0;
    let totalInvested = 0;

    const yearlySchedule: SIPStepUpYearPoint[] = [];

    for (let y = 1; y <= investmentYears; y++) {
      for (let m = 1; m <= 12; m++) {
        totalInvested += currentMonthlyDeposit;
        corpus = (corpus + currentMonthlyDeposit) * (1 + monthlyRate);
      }

      yearlySchedule.push({
        year: y,
        monthlyDepositForYear: Math.round(currentMonthlyDeposit),
        totalInvestedTillYear: Math.round(totalInvested),
        wealthCorpusEndYear: Math.round(corpus),
        estimatedReturnGain: Math.round(corpus - totalInvested),
      });

      // Increase monthly deposit for next year
      currentMonthlyDeposit *= 1 + annualStepUpPercent / 100;
    }

    return {
      initialMonthlySIP,
      annualStepUpPercent,
      totalInvested: Math.round(totalInvested),
      finalCorpus: Math.round(corpus),
      totalGain: Math.round(corpus - totalInvested),
      yearlySchedule,
    };
  }
}
