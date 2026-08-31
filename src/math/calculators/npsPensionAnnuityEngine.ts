export interface NPSCorpusAnnuityResult {
  totalNPSCorpusAt60: number;
  taxFreeLumpSum60Percent: number;
  annuityCorpus40Percent: number;
  estimatedMonthlyPension: number;
  annuityReturnRatePercent: number;
}

export class NPSPensionAnnuityEngine {
  public static calculateNPSAnnuity(
    monthlyContribution = 5000,
    currentAge = 30,
    expectedReturnRatePercent = 10,
    annuityYieldRatePercent = 6.5
  ): NPSCorpusAnnuityResult {
    const years = Math.max(1, 60 - currentAge);
    const months = years * 12;
    const monthlyRate = expectedReturnRatePercent / 100 / 12;

    const totalNPSCorpusAt60 = Math.round(
      (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate
    );

    const taxFreeLumpSum60Percent = Math.round(totalNPSCorpusAt60 * 0.60);
    const annuityCorpus40Percent = Math.round(totalNPSCorpusAt60 * 0.40);

    const estimatedMonthlyPension = Math.round((annuityCorpus40Percent * (annuityYieldRatePercent / 100)) / 12);

    return {
      totalNPSCorpusAt60,
      taxFreeLumpSum60Percent,
      annuityCorpus40Percent,
      estimatedMonthlyPension,
      annuityReturnRatePercent: annuityYieldRatePercent,
    };
  }
}
