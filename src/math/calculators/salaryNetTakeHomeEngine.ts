export interface SalaryNetTakeHomeBreakdown {
  grossCTCAnnual: number;
  grossMonthlySalary: number;
  pfDeductionMonthly: number;
  professionalTaxMonthly: number;
  tdsTaxMonthly: number;
  totalMonthlyDeductions: number;
  netMonthlyTakeHome: number;
  takeHomePercentage: number;
}

export class SalaryNetTakeHomeEngine {
  public static calculateTakeHome(
    grossCTCAnnual: number,
    basicSalaryPercent = 50,
    annualDeductionsSection80C = 150000
  ): SalaryNetTakeHomeBreakdown {
    const grossMonthly = grossCTCAnnual / 12;
    const basicMonthly = (grossMonthly * basicSalaryPercent) / 100;

    const pfDeductionMonthly = Math.min(1800, basicMonthly * 0.12);
    const professionalTaxMonthly = 200;

    const taxableAnnual = Math.max(0, grossCTCAnnual - (annualDeductionsSection80C + 75000));
    let annualTax = 0;
    if (taxableAnnual > 1200000) annualTax = (taxableAnnual - 1200000) * 0.20 + 90000;
    else if (taxableAnnual > 700000) annualTax = (taxableAnnual - 700000) * 0.10 + 30000;

    const tdsTaxMonthly = Math.round(annualTax / 12);
    const totalMonthlyDeductions = Math.round(pfDeductionMonthly + professionalTaxMonthly + tdsTaxMonthly);
    const netMonthlyTakeHome = Math.max(0, Math.round(grossMonthly - totalMonthlyDeductions));

    const takeHomePercentage = grossMonthly > 0 ? (netMonthlyTakeHome / grossMonthly) * 100 : 0;

    return {
      grossCTCAnnual,
      grossMonthlySalary: Math.round(grossMonthly),
      pfDeductionMonthly: Math.round(pfDeductionMonthly),
      professionalTaxMonthly,
      tdsTaxMonthly,
      totalMonthlyDeductions,
      netMonthlyTakeHome,
      takeHomePercentage: parseFloat(takeHomePercentage.toFixed(1)),
    };
  }
}
