export interface SalaryBreakdown {
  grossAnnualCTC: number;
  grossMonthlySalary: number;
  monthlyDeductions: {
    employeePF: number; // 12% of basic
    professionalTax: number; // ₹200/mo
    tdsTaxWithholding: number;
    totalDeductions: number;
  };
  netTakeHomeMonthly: number;
  takeHomePercentage: number;
}

export class SalaryBreakdownEngine {
  public static calculateBreakdown(
    grossAnnualCTC: number,
    basicSalaryPercent = 50,
    annualTaxDeductions = 150000
  ): SalaryBreakdown {
    const grossMonthly = grossAnnualCTC / 12;
    const basicMonthly = (grossMonthly * basicSalaryPercent) / 100;

    const employeePF = Math.min(1800, basicMonthly * 0.12);
    const professionalTax = 200;

    // Tax calculation estimate
    const taxableAnnual = Math.max(0, grossAnnualCTC - (annualTaxDeductions + 75000));
    let annualTax = 0;
    if (taxableAnnual > 1200000) annualTax = (taxableAnnual - 1200000) * 0.20 + 90000;
    else if (taxableAnnual > 700000) annualTax = (taxableAnnual - 700000) * 0.10 + 30000;

    const tdsMonthly = annualTax / 12;
    const totalDeductionsMonthly = employeePF + professionalTax + tdsMonthly;
    const netTakeHomeMonthly = Math.max(0, grossMonthly - totalDeductionsMonthly);

    const takeHomePercentage = grossMonthly > 0 ? (netTakeHomeMonthly / grossMonthly) * 100 : 0;

    return {
      grossAnnualCTC,
      grossMonthlySalary: Math.round(grossMonthly),
      monthlyDeductions: {
        employeePF: Math.round(employeePF),
        professionalTax,
        tdsTaxWithholding: Math.round(tdsMonthly),
        totalDeductions: Math.round(totalDeductionsMonthly),
      },
      netTakeHomeMonthly: Math.round(netTakeHomeMonthly),
      takeHomePercentage: parseFloat(takeHomePercentage.toFixed(1)),
    };
  }
}
