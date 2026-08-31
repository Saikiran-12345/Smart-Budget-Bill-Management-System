export interface EVTaxDeduction80EEBDetail {
  annualLoanInterestPaid: number;
  maxExemptionLimit: number; // ₹1,50,000 Section 80EEB
  claimedExemptionAmount: number;
  taxBracketPercent: number; // e.g. 30%
  directTaxSavedAmount: number;
}

export class ElectricVehicleTaxDeduction80EEBEngine {
  public static calculateEVTaxDeduction(
    annualLoanInterestPaid = 120000,
    taxBracketPercent = 30
  ): EVTaxDeduction80EEBDetail {
    const maxExemptionLimit = 150000;
    const claimedExemptionAmount = Math.min(maxExemptionLimit, annualLoanInterestPaid);
    const directTaxSavedAmount = Math.round((claimedExemptionAmount * taxBracketPercent) / 100);

    return {
      annualLoanInterestPaid,
      maxExemptionLimit,
      claimedExemptionAmount,
      taxBracketPercent,
      directTaxSavedAmount,
    };
  }
}
