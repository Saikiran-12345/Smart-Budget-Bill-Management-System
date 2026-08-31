export interface ELSSInvestmentSummary {
  annualInvestment: number;
  section80CDeductionClaimed: number;
  directTaxSaved30Percent: number;
  threeYearLockinMaturityYear: number;
  projectedCorpusAt3Years: number;
}

export class ELSSTaxSavingEngine {
  public static calculateELSS(
    annualInvestment = 150000,
    expectedCAGRPercent = 12.0,
    taxSlabPercent = 30
  ): ELSSInvestmentSummary {
    const section80CDeductionClaimed = Math.min(150000, annualInvestment);
    const directTaxSaved30Percent = Math.round((section80CDeductionClaimed * taxSlabPercent) / 100);

    const maturityYear = new Date().getFullYear() + 3;
    const projectedCorpusAt3Years = Math.round(annualInvestment * Math.pow(1 + expectedCAGRPercent / 100, 3));

    return {
      annualInvestment,
      section80CDeductionClaimed,
      directTaxSaved30Percent,
      threeYearLockinMaturityYear: maturityYear,
      projectedCorpusAt3Years,
    };
  }
}
