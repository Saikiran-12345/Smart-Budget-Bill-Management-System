export interface EVSavingsAnalysis {
  petrolPricePerLitre: number;
  petrolMileageKmpl: number;
  electricityRatePerUnit: number;
  evEfficiencyKmPerUnit: number;
  monthlyDistanceKm: number;
  monthlyPetrolCost: number;
  monthlyEVElectricityCost: number;
  monthlyFuelSavings: number;
  annualFuelSavings: number;
  evUpfrontPricePremium: number;
  breakEvenMonths: number;
}

export class ElectricVehicleROIEngine {
  public static calculateEVSavings(
    monthlyDistanceKm = 1200,
    petrolPricePerLitre = 102,
    petrolMileageKmpl = 14,
    electricityRatePerUnit = 8,
    evEfficiencyKmPerUnit = 8,
    evUpfrontPricePremium = 250000
  ): EVSavingsAnalysis {
    const monthlyPetrolLitres = monthlyDistanceKm / petrolMileageKmpl;
    const monthlyPetrolCost = monthlyPetrolLitres * petrolPricePerLitre;

    const monthlyUnitsRequired = monthlyDistanceKm / evEfficiencyKmPerUnit;
    const monthlyEVElectricityCost = monthlyUnitsRequired * electricityRatePerUnit;

    const monthlyFuelSavings = Math.max(0, monthlyPetrolCost - monthlyEVElectricityCost);
    const annualFuelSavings = monthlyFuelSavings * 12;

    const breakEvenMonths = monthlyFuelSavings > 0 ? Math.ceil(evUpfrontPricePremium / monthlyFuelSavings) : 999;

    return {
      petrolPricePerLitre,
      petrolMileageKmpl,
      electricityRatePerUnit,
      evEfficiencyKmPerUnit,
      monthlyDistanceKm,
      monthlyPetrolCost: Math.round(monthlyPetrolCost),
      monthlyEVElectricityCost: Math.round(monthlyEVElectricityCost),
      monthlyFuelSavings: Math.round(monthlyFuelSavings),
      annualFuelSavings: Math.round(annualFuelSavings),
      evUpfrontPricePremium,
      breakEvenMonths,
    };
  }
}
