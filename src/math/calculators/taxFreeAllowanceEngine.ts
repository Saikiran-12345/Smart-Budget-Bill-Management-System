export interface TaxFreeAllowanceResult {
  standardDeduction: number; // ₹75,000
  section80CAllowance: number; // ₹1,50,000
  section80DAllowance: number; // ₹50,000 (Self + Parents)
  section80CCD1BAllowance: number; // ₹50,000 NPS
  hraAllowanceEstimate: number; // HRA exemption
  section24BHomeLoanAllowance: number; // ₹2,00,000
  totalTaxFreeExemptions: number;
}

export class TaxFreeAllowanceEngine {
  public static calculateTaxFreeAllowance(
    annualBasicSalary: number,
    annualRentPaid: number,
    actualHRAReceived: number,
    pfContribution: number,
    elssInvestment: number,
    healthInsuranceSelf: number,
    healthInsuranceParents: number,
    npsContribution: number,
    homeLoanInterestPaid: number
  ): TaxFreeAllowanceResult {
    const standardDeduction = 75000;

    const raw80C = pfContribution + elssInvestment;
    const section80CAllowance = Math.min(150000, raw80C);

    const raw80D = healthInsuranceSelf + healthInsuranceParents;
    const section80DAllowance = Math.min(50000, raw80D);

    const section80CCD1BAllowance = Math.min(50000, npsContribution);
    const section24BHomeLoanAllowance = Math.min(200000, homeLoanInterestPaid);

    // HRA Exemption = Min(Actual HRA, Rent paid - 10% basic, 50% basic)
    const tenPctBasic = annualBasicSalary * 0.10;
    const rentMinus10Basic = Math.max(0, annualRentPaid - tenPctBasic);
    const fiftyPctBasic = annualBasicSalary * 0.50;

    const hraAllowanceEstimate = Math.min(actualHRAReceived, rentMinus10Basic, fiftyPctBasic);

    const totalTaxFreeExemptions =
      standardDeduction +
      section80CAllowance +
      section80DAllowance +
      section80CCD1BAllowance +
      section24BHomeLoanAllowance +
      Math.round(hraAllowanceEstimate);

    return {
      standardDeduction,
      section80CAllowance,
      section80DAllowance,
      section80CCD1BAllowance,
      hraAllowanceEstimate: Math.round(hraAllowanceEstimate),
      section24BHomeLoanAllowance,
      totalTaxFreeExemptions,
    };
  }
}
