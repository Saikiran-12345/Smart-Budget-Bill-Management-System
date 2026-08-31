export interface RealEstateCapRateSummary {
  propertyPurchasePrice: number;
  grossAnnualRentalIncome: number;
  propertyTaxAnnual: number;
  maintenanceInsuranceAnnual: number;
  netOperatingIncomeNOI: number;
  capRatePercent: number;
  grossRentalYieldPercent: number;
  isAttractiveInvestment: boolean;
}

export class RealEstateCapRateEngine {
  public static calculateCapRate(
    propertyPurchasePrice = 8000000,
    monthlyRentReceived = 35000,
    propertyTaxAnnual = 15000,
    maintenanceInsuranceAnnual = 25000
  ): RealEstateCapRateSummary {
    const grossAnnualRentalIncome = monthlyRentReceived * 12;
    const totalOperatingExpenses = propertyTaxAnnual + maintenanceInsuranceAnnual;
    const netOperatingIncomeNOI = Math.max(0, grossAnnualRentalIncome - totalOperatingExpenses);

    const capRatePercent = propertyPurchasePrice > 0 ? (netOperatingIncomeNOI / propertyPurchasePrice) * 100 : 0;
    const grossRentalYieldPercent = propertyPurchasePrice > 0 ? (grossAnnualRentalIncome / propertyPurchasePrice) * 100 : 0;

    const isAttractiveInvestment = capRatePercent >= 4.5;

    return {
      propertyPurchasePrice,
      grossAnnualRentalIncome: Math.round(grossAnnualRentalIncome),
      propertyTaxAnnual,
      maintenanceInsuranceAnnual,
      netOperatingIncomeNOI: Math.round(netOperatingIncomeNOI),
      capRatePercent: parseFloat(capRatePercent.toFixed(2)),
      grossRentalYieldPercent: parseFloat(grossRentalYieldPercent.toFixed(2)),
      isAttractiveInvestment,
    };
  }
}
