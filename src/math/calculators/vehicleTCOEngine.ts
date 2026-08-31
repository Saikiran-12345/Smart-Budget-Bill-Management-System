export interface VehicleTCODetail {
  vehicleModel: string;
  purchasePrice: number;
  fuelCost5Years: number;
  insuranceCost5Years: number;
  maintenanceCost5Years: number;
  total5YearTCO: number;
  costPerKm: number;
}

export class VehicleTCOEngine {
  public static calculateTCO(
    vehicleModel = 'Tata Nexon XZ+',
    purchasePrice = 1200000,
    annualKm = 15000,
    mileageKmpl = 16,
    fuelPrice = 102
  ): VehicleTCODetail {
    const annualFuelLitres = annualKm / mileageKmpl;
    const annualFuelCost = annualFuelLitres * fuelPrice;
    const fuelCost5Years = annualFuelCost * 5;

    const insuranceCost5Years = 22000 * 5;
    const maintenanceCost5Years = 12000 * 5;

    const total5YearTCO = purchasePrice + fuelCost5Years + insuranceCost5Years + maintenanceCost5Years;
    const totalKm5Years = annualKm * 5;
    const costPerKm = totalKm5Years > 0 ? total5YearTCO / totalKm5Years : 0;

    return {
      vehicleModel,
      purchasePrice,
      fuelCost5Years: Math.round(fuelCost5Years),
      insuranceCost5Years,
      maintenanceCost5Years,
      total5YearTCO: Math.round(total5YearTCO),
      costPerKm: parseFloat(costPerKm.toFixed(2)),
    };
  }
}
