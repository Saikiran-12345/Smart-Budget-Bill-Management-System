export interface VehicleMaintenanceDetail {
  modelName: string;
  annualOdometerKm: number;
  fuelEfficiencyKmpl: number;
  fuelPricePerLitre: number;
  annualServiceCost: number;
  annualInsuranceCost: number;
  totalAnnualOutflow: number;
  runningCostPerKm: number;
}

export class VehicleMaintenanceCostEngine {
  public static calculateCost(
    modelName = 'Maruti Swift VXi',
    annualOdometerKm = 10000,
    fuelEfficiencyKmpl = 18,
    fuelPricePerLitre = 102,
    annualServiceCost = 8000,
    annualInsuranceCost = 14000
  ): VehicleMaintenanceDetail {
    const annualFuelLitres = annualOdometerKm / fuelEfficiencyKmpl;
    const annualFuelCost = annualFuelLitres * fuelPricePerLitre;

    const totalAnnualOutflow = annualFuelCost + annualServiceCost + annualInsuranceCost;
    const runningCostPerKm = annualOdometerKm > 0 ? totalAnnualOutflow / annualOdometerKm : 0;

    return {
      modelName,
      annualOdometerKm,
      fuelEfficiencyKmpl,
      fuelPricePerLitre,
      annualServiceCost,
      annualInsuranceCost,
      totalAnnualOutflow: Math.round(totalAnnualOutflow),
      runningCostPerKm: parseFloat(runningCostPerKm.toFixed(2)),
    };
  }
}
