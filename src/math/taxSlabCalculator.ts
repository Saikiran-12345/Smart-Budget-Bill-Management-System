export interface DetailedTaxComparison {
  grossIncome: number;
  oldRegime: {
    deductionsTotal: number;
    taxableIncome: number;
    taxLiability: number;
    effectiveRate: number;
  };
  newRegime: {
    standardDeduction: number;
    taxableIncome: number;
    taxLiability: number;
    effectiveRate: number;
  };
  recommendedRegime: 'OLD_REGIME' | 'NEW_REGIME';
  taxSavingsAmount: number;
}

export class TaxSlabCalculator {
  public static compareTaxRegimes(
    grossIncome: number,
    section80CDeduction = 150000,
    section80DDeduction = 25000,
    hraExemption = 120000,
    npsDeduction = 50000
  ): DetailedTaxComparison {
    // 1. Old Regime Calculation
    const totalOldDeductions = Math.min(150000, section80CDeduction) + Math.min(25000, section80DDeduction) + hraExemption + Math.min(50000, npsDeduction) + 50000;
    const oldTaxableIncome = Math.max(0, grossIncome - totalOldDeductions);

    let oldTax = 0;
    if (oldTaxableIncome > 1000000) {
      oldTax += (oldTaxableIncome - 1000000) * 0.30 + 112500;
    } else if (oldTaxableIncome > 500000) {
      oldTax += (oldTaxableIncome - 500000) * 0.20 + 12500;
    } else if (oldTaxableIncome > 250000) {
      oldTax += (oldTaxableIncome - 250000) * 0.05;
    }
    const oldTaxWithCess = Math.round(oldTax * 1.04);
    const oldEffectiveRate = grossIncome > 0 ? (oldTaxWithCess / grossIncome) * 100 : 0;

    // 2. New Regime Calculation (2025/2026 Slabs)
    const newStandardDeduction = 75000;
    const newTaxableIncome = Math.max(0, grossIncome - newStandardDeduction);

    let newTax = 0;
    if (newTaxableIncome > 1500000) {
      newTax += (newTaxableIncome - 1500000) * 0.30 + 150000;
    } else if (newTaxableIncome > 1200000) {
      newTax += (newTaxableIncome - 1200000) * 0.20 + 90000;
    } else if (newTaxableIncome > 1000000) {
      newTax += (newTaxableIncome - 1000000) * 0.15 + 60000;
    } else if (newTaxableIncome > 700000) {
      newTax += (newTaxableIncome - 700000) * 0.10 + 30000;
    } else if (newTaxableIncome > 300000) {
      newTax += (newTaxableIncome - 300000) * 0.05;
    }
    const newTaxWithCess = Math.round(newTax * 1.04);
    const newEffectiveRate = grossIncome > 0 ? (newTaxWithCess / grossIncome) * 100 : 0;

    const recommendedRegime = newTaxWithCess <= oldTaxWithCess ? 'NEW_REGIME' : 'OLD_REGIME';
    const taxSavingsAmount = Math.abs(oldTaxWithCess - newTaxWithCess);

    return {
      grossIncome,
      oldRegime: {
        deductionsTotal: totalOldDeductions,
        taxableIncome: oldTaxableIncome,
        taxLiability: oldTaxWithCess,
        effectiveRate: parseFloat(oldEffectiveRate.toFixed(1)),
      },
      newRegime: {
        standardDeduction: newStandardDeduction,
        taxableIncome: newTaxableIncome,
        taxLiability: newTaxWithCess,
        effectiveRate: parseFloat(newEffectiveRate.toFixed(1)),
      },
      recommendedRegime,
      taxSavingsAmount,
    };
  }
}
