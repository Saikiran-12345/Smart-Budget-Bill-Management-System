export interface InflationRetirementSchedulePoint {
  age: number;
  year: number;
  nominalCorpus: number;
  realPurchasingPowerCorpus: number;
  annualWithdrawalAmount: number;
}

export class InflationAdjustedRetirementEngine {
  public static calculateRetirementTimeline(
    initialCorpusAtRetirement: number,
    annualWithdrawalFirstYear: number,
    investmentReturnPercent = 8,
    inflationRatePercent = 6,
    durationYears = 30,
    startAge = 60
  ): InflationRetirementSchedulePoint[] {
    let corpus = initialCorpusAtRetirement;
    let withdrawal = annualWithdrawalFirstYear;

    const returnRate = investmentReturnPercent / 100;
    const inflationRate = inflationRatePercent / 100;

    const timeline: InflationRetirementSchedulePoint[] = [];

    for (let y = 1; y <= durationYears && corpus > 0; y++) {
      const currentAge = startAge + y - 1;
      const currentYear = new Date().getFullYear() + y - 1;

      // Earn returns, subtract withdrawal
      corpus = corpus * (1 + returnRate) - withdrawal;

      // Real purchasing power in today's money = corpus / (1 + inflation)^y
      const realPurchasingPower = corpus / Math.pow(1 + inflationRate, y);

      timeline.push({
        age: currentAge,
        year: currentYear,
        nominalCorpus: Math.round(Math.max(0, corpus)),
        realPurchasingPowerCorpus: Math.round(Math.max(0, realPurchasingPower)),
        annualWithdrawalAmount: Math.round(withdrawal),
      });

      // Inflate withdrawal for next year
      withdrawal *= 1 + inflationRate;
    }

    return timeline;
  }
}
