export interface TaxOptimizationSuggestions {
  max80CDeduction: number; // ₹1,50,000 max
  current80CDeductions: number;
  remaining80CHeadroom: number;
  max80DDeduction: number; // ₹25,000 max
  current80DDeductions: number;
  remaining80DHeadroom: number;
  hraExemptionEstimate: number;
  potentialTaxSaved: number;
}

export class TaxOptimizationEngine {
  public static calculateTaxOptimizationHeadroom(
    elssInvestments: number,
    ppfContributions: number,
    lifeInsurancePremiums: number,
    healthInsurancePremiums: number,
    annualRentPaid: number,
    basicSalaryAnnual: number
  ): TaxOptimizationSuggestions {
    const max80C = 150000;
    const current80C = Math.min(max80C, elssInvestments + ppfContributions + lifeInsurancePremiums);
    const remaining80C = Math.max(0, max80C - current80C);

    const max80D = 25000;
    const current80D = Math.min(max80D, healthInsurancePremiums);
    const remaining80D = Math.max(0, max80D - current80D);

    // HRA Exemption = Min(Actual HRA received, Rent paid - 10% of basic, 50% of basic)
    const tenPctBasic = basicSalaryAnnual * 0.10;
    const hraExemptionEstimate = Math.max(0, annualRentPaid - tenPctBasic);

    const totalUnusedDeductions = remaining80C + remaining80D;
    const potentialTaxSaved = Math.round(totalUnusedDeductions * 0.30); // 30% top bracket

    return {
      max80CDeduction: max80C,
      current80CDeductions: current80C,
      remaining80CHeadroom: remaining80C,
      max80DDeduction: max80D,
      current80DDeductions: current80D,
      remaining80DHeadroom: remaining80D,
      hraExemptionEstimate: Math.round(hraExemptionEstimate),
      potentialTaxSaved,
    };
  }
}
