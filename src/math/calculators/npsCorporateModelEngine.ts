export interface NPSCorporateBenefitDetail {
  annualBasicSalaryINR: number;
  employerNPSContributionPercent: number; // Max 10% of Basic under Sec 80CCD(2)
  employerNPSContributionINR: number;
  isExemptInNewRegime: boolean;
  isExemptInOldRegime: boolean;
  taxSlabPercent: number; // e.g. 30%
  directTaxSavedINR: number;
}

export class NPSCorporateModelEngine {
  public static calculateCorporateNPS(
    annualBasicSalaryINR = 1200000,
    employerNPSContributionPercent = 10.0,
    taxSlabPercent = 30
  ): NPSCorporateBenefitDetail {
    const cappedPercent = Math.min(10.0, employerNPSContributionPercent);
    const employerNPSContributionINR = Math.round((annualBasicSalaryINR * cappedPercent) / 100);
    const directTaxSavedINR = Math.round((employerNPSContributionINR * taxSlabPercent) / 100);

    return {
      annualBasicSalaryINR,
      employerNPSContributionPercent: cappedPercent,
      employerNPSContributionINR,
      isExemptInNewRegime: true,
      isExemptInOldRegime: true,
      taxSlabPercent,
      directTaxSavedINR,
    };
  }
}
