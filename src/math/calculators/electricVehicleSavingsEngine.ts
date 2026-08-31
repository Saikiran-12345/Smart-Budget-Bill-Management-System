export interface EVSavingsAnalysis {
  evPurchasePrice: number;
  icePurchasePrice: number;
  priceDelta: number;
  monthlyDistanceKm: number;
  evCostPerKm: number;
  iceCostPerKm: number;
  monthlyEVSavings: number;
  annualEVSavings: number;
  monthsToBreakEven: number;
}

export class ElectricVehicleSavingsEngine {
  public static calculateEVSavings(
    evPurchasePrice = 1400000,
    icePurchasePrice = 1000000,
    monthlyDistanceKm = 1500,
    electricityRatePerKwh = 8,
    evEfficiencyKwhPer100Km = 14, // 14 kWh / 100 km
    petrolPricePerLiter = 100,
    iceMileageKmpl = 14
  ): EVSavingsAnalysis {
    const priceDelta = evPurchasePrice - icePurchasePrice;

    const evCostPerKm = (electricityRatePerKwh * evEfficiencyKwhPer100Km) / 100;
    const iceCostPerKm = petrolPricePerLiter / iceMileageKmpl;

    const evMonthlyFuelCost = monthlyDistanceKm * evCostPerKm;
    const iceMonthlyFuelCost = monthlyDistanceKm * iceCostPerKm;

    const monthlyEVSavings = Math.max(0, iceMonthlyFuelCost - evMonthlyFuelCost);
    const annualEVSavings = monthlyEVSavings * 12;

    const monthsToBreakEven = monthlyEVSavings > 0 ? Math.ceil(priceDelta / monthlyEVSavings) : 999;

    return {
      evPurchasePrice,
      icePurchasePrice,
      priceDelta,
      monthlyDistanceKm,
      evCostPerKm: parseFloat(evCostPerKm.toFixed(2)),
      iceCostPerKm: parseFloat(iceCostPerKm.toFixed(2)),
      monthlyEVSavings: Math.round(monthlyEVSavings),
      annualEVSavings: Math.round(annualEVSavings),
      monthsToBreakEven,
    };
  }
}
