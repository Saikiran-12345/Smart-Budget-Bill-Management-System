export interface NPSCorpusSummary {
  accumulatedCorpusAt60: number;
  taxFreeLumpSum60Percent: number;
  annuityCorpus40Percent: number;
  estimatedMonthlyPension: number;
  annuityYieldRatePercent: number;
}

export class NPSPensionCorpusEngine {
  public static calculateNPSCorpus(
    monthlyDeposit = 5000,
    currentAge = 30,
    expectedReturnRatePercent = 10.0,
    annuityYieldRatePercent = 6.5
  ): NPSCorpusSummary {
    const years = Math.max(1, 60 - currentAge);
    const months = years * 12;
    const monthlyRate = expectedReturnRatePercent / 100 / 12;

    const accumulatedCorpusAt60 = Math.round(
      (monthlyDeposit * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate
    );

    const taxFreeLumpSum60Percent = Math.round(accumulatedCorpusAt60 * 0.60);
    const annuityCorpus40Percent = Math.round(accumulatedCorpusAt60 * 0.40);

    const estimatedMonthlyPension = Math.round((annuityCorpus40Percent * (annuityYieldRatePercent / 100)) / 12);

    return {
      accumulatedCorpusAt60,
      taxFreeLumpSum60Percent,
      annuityCorpus40Percent,
      estimatedMonthlyPension,
      annuityYieldRatePercent,
    };
  }
}
