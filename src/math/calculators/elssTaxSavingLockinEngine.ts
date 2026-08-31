export interface ELSSLockinDetail {
  annualInvestment: number;
  section80CClaimed: number;
  directTaxSaved: number; // 30% tax bracket
  lockinMaturityYear: number;
  projectedCorpusAfter3Years: number;
}

export class ELSSTaxSavingLockinEngine {
  public static calculateELSS(
    annualInvestment = 150000,
    expectedCAGRPercent = 12.0,
    taxSlabPercent = 30
  ): ELSSLockinDetail {
    const section80CClaimed = Math.min(150000, annualInvestment);
    const directTaxSaved = Math.round((section80CClaimed * taxSlabPercent) / 100);

    const currentYear = new Date().getFullYear();
    const lockinMaturityYear = currentYear + 3;

    const projectedCorpusAfter3Years = Math.round(
      annualInvestment * Math.pow(1 + expectedCAGRPercent / 100, 3)
    );

    return {
      annualInvestment,
      section80CClaimed,
      directTaxSaved,
      lockinMaturityYear,
      projectedCorpusAfter3Years,
    };
  }
}
