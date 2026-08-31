export interface SolarSuryaGharResult {
  systemCapacityKW: number;
  grossCost: number;
  subsidyAmount: number;
  netCost: number;
  annualUnitsKWh: number;
  annualSavingsINR: number;
  paybackYears: number;
}

export class SolarSuryaGharEngine {
  public static calculateSubsidy(systemCapacityKW = 3, tariffRate = 8.5): SolarSuryaGharResult {
    const grossCost = systemCapacityKW * 70000;
    let subsidyAmount = 30000;
    if (systemCapacityKW >= 3) subsidyAmount = 78000;
    else if (systemCapacityKW === 2) subsidyAmount = 60000;

    const netCost = Math.max(0, grossCost - subsidyAmount);
    const annualUnitsKWh = systemCapacityKW * 1400;
    const annualSavingsINR = annualUnitsKWh * tariffRate;
    const paybackYears = annualSavingsINR > 0 ? netCost / annualSavingsINR : 0;

    return {
      systemCapacityKW,
      grossCost: Math.round(grossCost),
      subsidyAmount,
      netCost: Math.round(netCost),
      annualUnitsKWh: Math.round(annualUnitsKWh),
      annualSavingsINR: Math.round(annualSavingsINR),
      paybackYears: parseFloat(paybackYears.toFixed(1)),
    };
  }
}
