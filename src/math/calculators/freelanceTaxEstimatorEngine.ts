export interface PresumptiveTaxResult {
  grossFreelanceRevenue: number;
  presumptiveIncome50Percent: number; // Section 44ADA (50% presumptive income)
  businessExpensesClaimed: number;
  taxableNetIncome: number;
  estimatedAdvanceTaxPayable: number;
  advanceTaxSchedule: {
    quarter: string;
    dueDate: string;
    cumulativePercent: number;
    amountDue: number;
  }[];
}

export class FreelanceTaxEstimatorEngine {
  public static calculatePresumptiveTax(
    grossFreelanceRevenue: number,
    actualExpenses = grossFreelanceRevenue * 0.30
  ): PresumptiveTaxResult {
    // Under Section 44ADA, 50% of gross receipts is deemed as taxable income for professionals
    const presumptiveIncome50Percent = Math.round(grossFreelanceRevenue * 0.50);
    const taxableNetIncome = Math.max(0, presumptiveIncome50Percent - 75000); // minus standard deduction

    let annualTax = 0;
    if (taxableNetIncome > 1200000) annualTax = (taxableNetIncome - 1200000) * 0.20 + 90000;
    else if (taxableNetIncome > 700000) annualTax = (taxableNetIncome - 700000) * 0.10 + 30000;

    const totalTaxWithCess = Math.round(annualTax * 1.04);

    const advanceTaxSchedule = [
      { quarter: 'Q1 (15% by Jun 15)', dueDate: 'Jun 15', cumulativePercent: 15, amountDue: Math.round(totalTaxWithCess * 0.15) },
      { quarter: 'Q2 (45% by Sep 15)', dueDate: 'Sep 15', cumulativePercent: 45, amountDue: Math.round(totalTaxWithCess * 0.30) },
      { quarter: 'Q3 (75% by Dec 15)', dueDate: 'Dec 15', cumulativePercent: 75, amountDue: Math.round(totalTaxWithCess * 0.30) },
      { quarter: 'Q4 (100% by Mar 15)', dueDate: 'Mar 15', cumulativePercent: 100, amountDue: Math.round(totalTaxWithCess * 0.25) },
    ];

    return {
      grossFreelanceRevenue,
      presumptiveIncome50Percent,
      businessExpensesClaimed: Math.round(actualExpenses),
      taxableNetIncome,
      estimatedAdvanceTaxPayable: totalTaxWithCess,
      advanceTaxSchedule,
    };
  }
}
