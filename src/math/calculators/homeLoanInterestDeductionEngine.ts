export interface JointHomeLoanDeductionResult {
  annualInterestPaidTotal: number;
  annualPrincipalPaidTotal: number;
  borrower1Deduction: {
    section24bInterest: number;
    section80cPrincipal: number;
    totalTaxSaved: number;
  };
  borrower2Deduction: {
    section24bInterest: number;
    section80cPrincipal: number;
    totalTaxSaved: number;
  };
  combinedTaxSavings: number;
}

export class HomeLoanInterestDeductionEngine {
  public static calculateJointDeduction(
    annualInterestPaidTotal: number,
    annualPrincipalPaidTotal: number,
    borrower1SharePercent = 50,
    taxSlabPercent = 30
  ): JointHomeLoanDeductionResult {
    const b1Share = borrower1SharePercent / 100;
    const b2Share = (100 - borrower1SharePercent) / 100;

    // Individual max limits under Sec 24(b) = ₹2,00,000, Sec 80C = ₹1,50,000
    const b1InterestRaw = annualInterestPaidTotal * b1Share;
    const b1Interest = Math.min(200000, Math.round(b1InterestRaw));
    const b1PrincipalRaw = annualPrincipalPaidTotal * b1Share;
    const b1Principal = Math.min(150000, Math.round(b1PrincipalRaw));
    const b1Saved = Math.round((b1Interest + b1Principal) * (taxSlabPercent / 100));

    const b2InterestRaw = annualInterestPaidTotal * b2Share;
    const b2Interest = Math.min(200000, Math.round(b2InterestRaw));
    const b2PrincipalRaw = annualPrincipalPaidTotal * b2Share;
    const b2Principal = Math.min(150000, Math.round(b2PrincipalRaw));
    const b2Saved = Math.round((b2Interest + b2Principal) * (taxSlabPercent / 100));

    return {
      annualInterestPaidTotal: Math.round(annualInterestPaidTotal),
      annualPrincipalPaidTotal: Math.round(annualPrincipalPaidTotal),
      borrower1Deduction: {
        section24bInterest: b1Interest,
        section80cPrincipal: b1Principal,
        totalTaxSaved: b1Saved,
      },
      borrower2Deduction: {
        section24bInterest: b2Interest,
        section80cPrincipal: b2Principal,
        totalTaxSaved: b2Saved,
      },
      combinedTaxSavings: b1Saved + b2Saved,
    };
  }
}
