export interface PresumptiveTax44ADADetail {
  grossProfessionalReceiptsINR: number;
  presumptiveIncome50PercentINR: number;
  actualDeclaredExpensesINR: number;
  isEligibleSection44ADA: boolean; // Receipts <= ₹75 Lakhs (or ₹50 Lakhs)
  taxableIncomeINR: number;
  standardDeductionINR: number;
  estimatedTaxPayableNewRegimeINR: number;
  taxSavedVsNormalAccountingINR: number;
}

export class PresumptiveTax44ADAEngine {
  public static calculate44ADA(
    grossProfessionalReceiptsINR = 4500000,
    actualDeclaredExpensesINR = 1200000,
    taxSlabPercent = 30
  ): PresumptiveTax44ADADetail {
    const isEligibleSection44ADA = grossProfessionalReceiptsINR <= 7500000;
    const presumptiveIncome50PercentINR = Math.round(grossProfessionalReceiptsINR * 0.50);

    // Normal accounting profit
    const actualProfitNormalINR = Math.max(0, grossProfessionalReceiptsINR - actualDeclaredExpensesINR);

    const taxableIncomeINR = isEligibleSection44ADA ? presumptiveIncome50PercentINR : actualProfitNormalINR;

    // Simple tax estimate under New Regime
    let estimatedTaxPayableNewRegimeINR = 0;
    if (taxableIncomeINR > 1200000) {
      estimatedTaxPayableNewRegimeINR = (taxableIncomeINR - 1200000) * 0.20 + 90000;
    } else if (taxableIncomeINR > 700000) {
      estimatedTaxPayableNewRegimeINR = (taxableIncomeINR - 700000) * 0.10 + 30000;
    }

    estimatedTaxPayableNewRegimeINR = Math.round(estimatedTaxPayableNewRegimeINR * 1.04);

    const normalTax = Math.round(((actualProfitNormalINR - 1200000) * 0.20 + 90000) * 1.04);
    const taxSavedVsNormalAccountingINR = Math.max(0, normalTax - estimatedTaxPayableNewRegimeINR);

    return {
      grossProfessionalReceiptsINR,
      presumptiveIncome50PercentINR,
      actualDeclaredExpensesINR,
      isEligibleSection44ADA,
      taxableIncomeINR,
      standardDeductionINR: 75000,
      estimatedTaxPayableNewRegimeINR,
      taxSavedVsNormalAccountingINR,
    };
  }
}
