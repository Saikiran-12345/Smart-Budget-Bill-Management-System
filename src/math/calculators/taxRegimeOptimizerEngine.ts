export interface TaxRegimeComparison {
  grossAnnualIncome: number;
  oldTaxRegime: {
    totalDeductions: number;
    taxableIncome: number;
    baseTax: number;
    cess: number;
    totalTaxLiability: number;
    effectiveTaxRatePercent: number;
  };
  newTaxRegime: {
    standardDeduction: number;
    taxableIncome: number;
    baseTax: number;
    cess: number;
    totalTaxLiability: number;
    effectiveTaxRatePercent: number;
  };
  recommendedRegime: 'OLD_TAX_REGIME' | 'NEW_TAX_REGIME';
  taxSavedAmount: number;
}

export class TaxRegimeOptimizerEngine {
  public static compareRegimes(
    grossAnnualIncome: number,
    section80CClaimed = 150000,
    section80DClaimed = 25000,
    hraExemptionClaimed = 100000,
    section80CCD1BClaimed = 50000,
    section24BHomeLoanClaimed = 150000
  ): TaxRegimeComparison {
    // 1. Old Regime
    const totalOldDeductions =
      Math.min(150000, section80CClaimed) +
      Math.min(50000, section80DClaimed) +
      hraExemptionClaimed +
      Math.min(50000, section80CCD1BClaimed) +
      Math.min(200000, section24BHomeLoanClaimed) +
      50000; // Standard deduction under Old regime

    const oldTaxable = Math.max(0, grossAnnualIncome - totalOldDeductions);

    let oldBaseTax = 0;
    if (oldTaxable > 1000000) {
      oldBaseTax += (oldTaxable - 1000000) * 0.30 + 112500;
    } else if (oldTaxable > 500000) {
      oldBaseTax += (oldTaxable - 500000) * 0.20 + 12500;
    } else if (oldTaxable > 250000) {
      oldBaseTax += (oldTaxable - 250000) * 0.05;
    }
    const oldCess = oldBaseTax * 0.04;
    const oldTotalTax = Math.round(oldBaseTax + oldCess);
    const oldEffectiveRate = grossAnnualIncome > 0 ? (oldTotalTax / grossAnnualIncome) * 100 : 0;

    // 2. New Regime (2025/2026 tax slabs)
    const newStandardDeduction = 75000;
    const newTaxable = Math.max(0, grossAnnualIncome - newStandardDeduction);

    let newBaseTax = 0;
    if (newTaxable > 1500000) {
      newBaseTax += (newTaxable - 1500000) * 0.30 + 150000;
    } else if (newTaxable > 1200000) {
      newBaseTax += (newTaxable - 1200000) * 0.20 + 90000;
    } else if (newTaxable > 1000000) {
      newBaseTax += (newTaxable - 1000000) * 0.15 + 60000;
    } else if (newTaxable > 700000) {
      newBaseTax += (newTaxable - 700000) * 0.10 + 30000;
    } else if (newTaxable > 300000) {
      newBaseTax += (newTaxable - 300000) * 0.05;
    }
    const newCess = newBaseTax * 0.04;
    const newTotalTax = Math.round(newBaseTax + newCess);
    const newEffectiveRate = grossAnnualIncome > 0 ? (newTotalTax / grossAnnualIncome) * 100 : 0;

    const recommendedRegime = newTotalTax <= oldTotalTax ? 'NEW_TAX_REGIME' : 'OLD_TAX_REGIME';
    const taxSavedAmount = Math.abs(oldTotalTax - newTotalTax);

    return {
      grossAnnualIncome,
      oldTaxRegime: {
        totalDeductions: totalOldDeductions,
        taxableIncome: oldTaxable,
        baseTax: Math.round(oldBaseTax),
        cess: Math.round(oldCess),
        totalTaxLiability: oldTotalTax,
        effectiveTaxRatePercent: parseFloat(oldEffectiveRate.toFixed(1)),
      },
      newTaxRegime: {
        standardDeduction: newStandardDeduction,
        taxableIncome: newTaxable,
        baseTax: Math.round(newBaseTax),
        cess: Math.round(newCess),
        totalTaxLiability: newTotalTax,
        effectiveTaxRatePercent: parseFloat(newEffectiveRate.toFixed(1)),
      },
      recommendedRegime,
      taxSavedAmount,
    };
  }
}
