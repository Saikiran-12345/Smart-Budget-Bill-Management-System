export interface StepUpYearPoint {
  year: number;
  monthlyDeposit: number;
  annualInvested: number;
  totalCumulativeInvested: number;
  totalCorpusValue: number;
  wealthGainAmount: number;
}

export class SIPStepUpCalculatorEngine {
  public static calculateStepUpSIP(
    initialMonthlySIP = 10000,
    annualStepUpPercent = 10,
    expectedReturnRatePercent = 12,
    investmentYears = 15
  ): StepUpYearPoint[] {
    let currentMonthlySIP = initialMonthlySIP;
    let totalInvested = 0;
    let totalCorpus = 0;

    const monthlyReturnRate = expectedReturnRatePercent / 100 / 12;
    const timeline: StepUpYearPoint[] = [];

    for (let y = 1; y <= investmentYears; y++) {
      const annualInvested = currentMonthlySIP * 12;
      totalInvested += annualInvested;

      // Calculate compounding for 12 months in this year
      for (let m = 1; m <= 12; m++) {
        totalCorpus = (totalCorpus + currentMonthlySIP) * (1 + monthlyReturnRate);
      }

      timeline.push({
        year: y,
        monthlyDeposit: Math.round(currentMonthlySIP),
        annualInvested: Math.round(annualInvested),
        totalCumulativeInvested: Math.round(totalInvested),
        totalCorpusValue: Math.round(totalCorpus),
        wealthGainAmount: Math.round(totalCorpus - totalInvested),
      });

      // Step up SIP for next year
      currentMonthlySIP *= 1 + annualStepUpPercent / 100;
    }

    return timeline;
  }
}
