export interface RealEstateROICalculation {
  propertyPurchasePrice: number;
  monthlyRentalIncome: number;
  annualPropertyTax: number;
  annualMaintenanceCost: number;
  annualInsuranceCost: number;
  grossAnnualRentalIncome: number;
  totalAnnualOperatingExpenses: number;
  netOperatingIncome: number;
  capRatePercentage: number;
  cashOnCashReturnPercentage: number;
  grossRentalYieldPercentage: number;
}

export class RealEstateROIEngine {
  public static calculateROI(
    propertyPurchasePrice: number,
    monthlyRentalIncome: number,
    annualPropertyTax = 15000,
    annualMaintenanceCost = 25000,
    annualInsuranceCost = 8000,
    downPaymentAmount = propertyPurchasePrice * 0.20
  ): RealEstateROICalculation {
    const grossAnnualRentalIncome = monthlyRentalIncome * 12;
    const totalAnnualOperatingExpenses = annualPropertyTax + annualMaintenanceCost + annualInsuranceCost;
    const netOperatingIncome = grossAnnualRentalIncome - totalAnnualOperatingExpenses;

    const capRatePercentage = propertyPurchasePrice > 0 ? (netOperatingIncome / propertyPurchasePrice) * 100 : 0;
    const grossRentalYieldPercentage = propertyPurchasePrice > 0 ? (grossAnnualRentalIncome / propertyPurchasePrice) * 100 : 0;
    const cashOnCashReturnPercentage = downPaymentAmount > 0 ? (netOperatingIncome / downPaymentAmount) * 100 : 0;

    return {
      propertyPurchasePrice,
      monthlyRentalIncome,
      annualPropertyTax,
      annualMaintenanceCost,
      annualInsuranceCost,
      grossAnnualRentalIncome: Math.round(grossAnnualRentalIncome),
      totalAnnualOperatingExpenses: Math.round(totalAnnualOperatingExpenses),
      netOperatingIncome: Math.round(netOperatingIncome),
      capRatePercentage: parseFloat(capRatePercentage.toFixed(2)),
      cashOnCashReturnPercentage: parseFloat(cashOnCashReturnPercentage.toFixed(2)),
      grossRentalYieldPercentage: parseFloat(grossRentalYieldPercentage.toFixed(2)),
    };
  }
}
