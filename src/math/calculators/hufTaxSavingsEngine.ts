export interface HUFTaxSavingsDetail {
  hufIncomeAmountINR: number;
  individualTaxSlabPercent: number; // e.g. 30%
  hufBasicExemptionINR: number; // ₹2,50,000 / ₹3,00,000
  hufSection80CDeductionINR: number; // ₹1,50,000 separate limit
  hufTaxableIncomeINR: number;
  hufTaxPayableINR: number;
  taxSavedViaHUFFormationINR: number;
}

export class HUFTaxSavingsEngine {
  public static calculateHUFTaxSavings(
    rentalOrInvestmentIncomeDivertedToHUF = 500000,
    individualTaxSlabPercent = 30
  ): HUFTaxSavingsDetail {
    const taxIfTaxedInIndividualHands = Math.round((rentalOrInvestmentIncomeDivertedToHUF * individualTaxSlabPercent) / 100);

    const hufBasicExemptionINR = 250000;
    const hufSection80CDeductionINR = Math.min(150000, rentalOrInvestmentIncomeDivertedToHUF);
    const hufTaxableIncomeINR = Math.max(0, rentalOrInvestmentIncomeDivertedToHUF - hufSection80CDeductionINR - hufBasicExemptionINR);

    let hufTaxPayableINR = 0;
    if (hufTaxableIncomeINR > 250000) {
      hufTaxPayableINR = (hufTaxableIncomeINR - 250000) * 0.20 + 1250;
    } else if (hufTaxableIncomeINR > 0) {
      hufTaxPayableINR = hufTaxableIncomeINR * 0.05;
    }

    hufTaxPayableINR = Math.round(hufTaxPayableINR * 1.04); // 4% cess

    const taxSavedViaHUFFormationINR = Math.max(0, taxIfTaxedInIndividualHands - hufTaxPayableINR);

    return {
      hufIncomeAmountINR: rentalOrInvestmentIncomeDivertedToHUF,
      individualTaxSlabPercent,
      hufBasicExemptionINR,
      hufSection80CDeductionINR,
      hufTaxableIncomeINR,
      hufTaxPayableINR,
      taxSavedViaHUFFormationINR,
    };
  }
}
