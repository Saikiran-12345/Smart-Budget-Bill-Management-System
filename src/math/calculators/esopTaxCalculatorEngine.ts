export interface ESOPTaxDetail {
  numberOfShares: number;
  exercisePrice: number;
  fairMarketValueAtExercise: number;
  salePriceAtExit: number;
  perquisiteTaxableValue: number;
  estimatedPerquisiteTaxAt30Percent: number;
  capitalGainAtExit: number;
  estimatedCapitalGainsTax: number;
  totalTaxLiability: number;
  netProfitAfterTax: number;
}

export class ESOPTaxCalculatorEngine {
  public static calculateESOPTax(
    numberOfShares = 1000,
    exercisePrice = 50,
    fairMarketValueAtExercise = 250,
    salePriceAtExit = 400
  ): ESOPTaxDetail {
    const totalExerciseCost = numberOfShares * exercisePrice;
    const totalFMVAtExercise = numberOfShares * fairMarketValueAtExercise;
    const totalSaleProceeds = numberOfShares * salePriceAtExit;

    // 1. Perquisite Tax at Exercise (FMV - Exercise Price)
    const perquisiteTaxableValue = Math.max(0, totalFMVAtExercise - totalExerciseCost);
    const estimatedPerquisiteTaxAt30Percent = Math.round(perquisiteTaxableValue * 0.30);

    // 2. Capital Gains Tax at Exit (Sale Price - FMV)
    const capitalGainAtExit = Math.max(0, totalSaleProceeds - totalFMVAtExercise);
    const estimatedCapitalGainsTax = Math.round(capitalGainAtExit * 0.125); // LTCG 12.5%

    const totalTaxLiability = estimatedPerquisiteTaxAt30Percent + estimatedCapitalGainsTax;
    const netProfitAfterTax = Math.round(totalSaleProceeds - totalExerciseCost - totalTaxLiability);

    return {
      numberOfShares,
      exercisePrice,
      fairMarketValueAtExercise,
      salePriceAtExit,
      perquisiteTaxableValue: Math.round(perquisiteTaxableValue),
      estimatedPerquisiteTaxAt30Percent,
      capitalGainAtExit: Math.round(capitalGainAtExit),
      estimatedCapitalGainsTax,
      totalTaxLiability,
      netProfitAfterTax,
    };
  }
}
