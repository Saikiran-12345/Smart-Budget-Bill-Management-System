export interface TaxBracketSlabDetail {
  slabRangeLabel: string;
  minIncome: number;
  maxIncome: number;
  taxRatePercent: number;
  taxableAmountInSlab: number;
  taxPayableInSlab: number;
}

export class TaxBracketHeadroomEngine {
  public static calculateSlabBreakdown(
    taxableIncomeAmount: number
  ): {
    taxableIncomeAmount: number;
    totalTaxBeforeCess: number;
    healthEducationCess4Percent: number;
    totalTaxPayable: number;
    slabs: TaxBracketSlabDetail[];
  } {
    const slabDefs = [
      { label: '₹0 - ₹4,00,000', min: 0, max: 400000, rate: 0 },
      { label: '₹4,00,001 - ₹8,00,000', min: 400000, max: 800000, rate: 5 },
      { label: '₹8,00,001 - ₹12,00,000', min: 800000, max: 1200000, rate: 10 },
      { label: '₹12,00,001 - ₹16,00,000', min: 1200000, max: 1600000, rate: 15 },
      { label: '₹16,00,001 - ₹20,00,000', min: 1600000, max: 2000000, rate: 20 },
      { label: '₹20,00,001 - ₹24,00,000', min: 2000000, max: 2400000, rate: 25 },
      { label: 'Above ₹24,00,000', min: 2400000, max: Infinity, rate: 30 },
    ];

    let totalTaxBeforeCess = 0;

    const slabs: TaxBracketSlabDetail[] = slabDefs.map((def) => {
      let taxableInSlab = 0;
      if (taxableIncomeAmount > def.min) {
        taxableInSlab = Math.min(taxableIncomeAmount, def.max) - def.min;
      }
      const taxInSlab = (taxableInSlab * def.rate) / 100;
      totalTaxBeforeCess += taxInSlab;

      return {
        slabRangeLabel: def.label,
        minIncome: def.min,
        maxIncome: def.max,
        taxRatePercent: def.rate,
        taxableAmountInSlab: Math.round(taxableInSlab),
        taxPayableInSlab: Math.round(taxInSlab),
      };
    });

    const healthEducationCess4Percent = Math.round(totalTaxBeforeCess * 0.04);
    const totalTaxPayable = Math.round(totalTaxBeforeCess + healthEducationCess4Percent);

    return {
      taxableIncomeAmount,
      totalTaxBeforeCess: Math.round(totalTaxBeforeCess),
      healthEducationCess4Percent,
      totalTaxPayable,
      slabs,
    };
  }
}
