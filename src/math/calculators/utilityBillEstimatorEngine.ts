export interface UtilitySurgeMonthPoint {
  monthName: string;
  seasonName: 'WINTER' | 'SUMMER' | 'MONSOON';
  electricityBillEstimate: number;
  waterBillEstimate: number;
  gasBillEstimate: number;
  totalMonthlyUtilityBill: number;
}

export class UtilityBillEstimatorEngine {
  public static calculateSeasonalSurge(
    baseElectricityBill = 2500,
    baseWaterBill = 400,
    baseGasBill = 900
  ): UtilitySurgeMonthPoint[] {
    const months = [
      { name: 'Jan', season: 'WINTER' as const, elecMult: 1.0 },
      { name: 'Feb', season: 'WINTER' as const, elecMult: 1.1 },
      { name: 'Mar', season: 'SUMMER' as const, elecMult: 1.5 },
      { name: 'Apr', season: 'SUMMER' as const, elecMult: 1.9 },
      { name: 'May', season: 'SUMMER' as const, elecMult: 2.2 },
      { name: 'Jun', season: 'SUMMER' as const, elecMult: 2.0 },
      { name: 'Jul', season: 'MONSOON' as const, elecMult: 1.4 },
      { name: 'Aug', season: 'MONSOON' as const, elecMult: 1.3 },
      { name: 'Sep', season: 'MONSOON' as const, elecMult: 1.3 },
      { name: 'Oct', season: 'WINTER' as const, elecMult: 1.2 },
      { name: 'Nov', season: 'WINTER' as const, elecMult: 1.0 },
      { name: 'Dec', season: 'WINTER' as const, elecMult: 1.0 },
    ];

    return months.map((m) => {
      const elec = Math.round(baseElectricityBill * m.elecMult);
      const water = baseWaterBill;
      const gas = baseGasBill;
      const total = elec + water + gas;

      return {
        monthName: m.name,
        seasonName: m.season,
        electricityBillEstimate: elec,
        waterBillEstimate: water,
        gasBillEstimate: gas,
        totalMonthlyUtilityBill: total,
      };
    });
  }

  public static calculateUtilityForecast(
    baseElectricityBill = 2500,
    baseWaterBill = 400,
    baseGasBill = 900
  ) {
    const schedule = UtilityBillEstimatorEngine.calculateSeasonalSurge(
      baseElectricityBill,
      baseWaterBill,
      baseGasBill
    );
    const totalAnnualUtilitiesCost = schedule.reduce((s, m) => s + m.totalMonthlyUtilityBill, 0);

    return {
      totalAnnualUtilitiesCost: Math.round(totalAnnualUtilitiesCost),
      monthlyAverageCost: Math.round(totalAnnualUtilitiesCost / 12),
      monthlySchedule: schedule,
      breakdown: schedule,
    };
  }
}
