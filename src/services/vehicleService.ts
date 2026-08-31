import { VehicleMaintenanceCostEngine, VehicleMaintenanceDetail } from '../math/calculators/vehicleMaintenanceCostEngine';

export class VehicleService {
  public static getVehicleMaintenanceCost(
    modelName = 'Maruti Swift VXi',
    annualOdometerKm = 10000,
    fuelEfficiencyKmpl = 18,
    fuelPricePerLitre = 102
  ): VehicleMaintenanceDetail {
    return VehicleMaintenanceCostEngine.calculateCost(
      modelName,
      annualOdometerKm,
      fuelEfficiencyKmpl,
      fuelPricePerLitre
    );
  }
}
