export interface VehicleCostAnalysis {
  vehiclePurchasePrice: number;
  annualDistanceKm: number;
  fuelPricePerLiter: number;
  fuelMileageKmpl: number;
  annualFuelCost: number;
  annualInsuranceCost: number;
  annualServicingCost: number;
  annualDepreciationCost: number;
  totalAnnualOwnershipCost: number;
  totalCostPerKm: number;
}

export class VehicleMaintenanceEngine {
  public static calculateVehicleCost(
    vehiclePurchasePrice: number,
    annualDistanceKm = 12000,
    fuelPricePerLiter = 100,
    fuelMileageKmpl = 15,
    annualInsuranceCost = 18000,
    annualServicingCost = 12000,
    annualDepreciationPercent = 15
  ): VehicleCostAnalysis {
    const annualFuelLiters = annualDistanceKm / (fuelMileageKmpl || 1);
    const annualFuelCost = annualFuelLiters * fuelPricePerLiter;
    const annualDepreciationCost = (vehiclePurchasePrice * annualDepreciationPercent) / 100;

    const totalAnnualOwnershipCost = annualFuelCost + annualInsuranceCost + annualServicingCost + annualDepreciationCost;
    const totalCostPerKm = annualDistanceKm > 0 ? totalAnnualOwnershipCost / annualDistanceKm : 0;

    return {
      vehiclePurchasePrice,
      annualDistanceKm,
      fuelPricePerLiter,
      fuelMileageKmpl,
      annualFuelCost: Math.round(annualFuelCost),
      annualInsuranceCost,
      annualServicingCost,
      annualDepreciationCost: Math.round(annualDepreciationCost),
      totalAnnualOwnershipCost: Math.round(totalAnnualOwnershipCost),
      totalCostPerKm: parseFloat(totalCostPerKm.toFixed(2)),
    };
  }
}
