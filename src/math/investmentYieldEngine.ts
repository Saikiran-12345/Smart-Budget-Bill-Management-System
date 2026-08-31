export interface SIPReturnSchedule {
  month: number;
  year: number;
  totalInvested: number;
  estimatedReturns: number;
  totalWealth: number;
}

export interface InvestmentYieldAnalysis {
  principalInvested: number;
  estimatedWealthCreated: number;
  cagrPercentage: number;
  schedule: SIPReturnSchedule[];
}

export class InvestmentYieldEngine {
  public static calculateSIPReturn(
    monthlyInvestment: number,
    expectedAnnualReturnRatePercentage: number,
    timePeriodYears: number
  ): InvestmentYieldAnalysis {
    const monthlyRate = expectedAnnualReturnRatePercentage / 100 / 12;
    const totalMonths = timePeriodYears * 12;
    const schedule: SIPReturnSchedule[] = [];

    let totalWealth = 0;
    let totalInvested = 0;

    for (let m = 1; m <= totalMonths; m++) {
      totalInvested += monthlyInvestment;
      totalWealth = (totalWealth + monthlyInvestment) * (1 + monthlyRate);

      if (m % 12 === 0) {
        schedule.push({
          month: m,
          year: m / 12,
          totalInvested: Math.round(totalInvested),
          estimatedReturns: Math.round(totalWealth - totalInvested),
          totalWealth: Math.round(totalWealth),
        });
      }
    }

    return {
      principalInvested: Math.round(totalInvested),
      estimatedWealthCreated: Math.round(totalWealth),
      cagrPercentage: expectedAnnualReturnRatePercentage,
      schedule,
    };
  }

  public static calculateLumpsumReturn(
    lumpsumAmount: number,
    annualReturnRatePercentage: number,
    years: number
  ): { finalAmount: number; totalGain: number } {
    const rate = annualReturnRatePercentage / 100;
    const finalAmount = Math.round(lumpsumAmount * Math.pow(1 + rate, years));
    const totalGain = finalAmount - lumpsumAmount;
    return { finalAmount, totalGain };
  }
}
