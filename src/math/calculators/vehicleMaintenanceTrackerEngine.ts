export interface VehicleMaintenanceDetail {
  vehicleModel: string;
  annualOdometerKm: number;
  fuelEfficiencyKmpl: number;
  fuelPricePerLitre: number;
  annualRegularServiceCost: number;
  annualInsurancePremium: number;
  totalAnnualRunningCost: number;
  costPerKilometer: number;
}

export class VehicleMaintenanceTrackerEngine {
  public static calculateCostPerKm(
    vehicleModel: string,
    annualOdometerKm = 12000,
    fuelEfficiencyKmpl = 15,
    fuelPricePerLitre = 102,
    annualRegularServiceCost = 10000,
    annualInsurancePremium = 18000
  ): VehicleMaintenanceDetail {
    const annualFuelLitres = annualOdometerKm / fuelEfficiencyKmpl;
    const annualFuelCost = annualFuelLitres * fuelPricePerLitre;

    const totalAnnualRunningCost = annualFuelCost + annualRegularServiceCost + annualInsurancePremium;
    const costPerKilometer = annualOdometerKm > 0 ? totalAnnualRunningCost / annualOdometerKm : 0;

    return {
      vehicleModel,
      annualOdometerKm,
      fuelEfficiencyKmpl,
      fuelPricePerLitre,
      annualRegularServiceCost,
      annualInsurancePremium,
      totalAnnualRunningCost: Math.round(totalAnnualRunningCost),
      costPerKilometer: parseFloat(costPerKilometer.toFixed(2)),
    };
  }
}
