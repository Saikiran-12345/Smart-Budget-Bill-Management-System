export interface CarDepreciationYearPoint {
  year: number;
  beginningValuation: number;
  depreciationAmount: number;
  endingValuation: number;
  retainedValuePercentage: number;
}

export class CarDepreciationCalculatorEngine {
  public static calculateDepreciationTimeline(
    initialVehiclePrice: number,
    year1DepreciationPercent = 20,
    subsequentAnnualDepreciationPercent = 15,
    ownershipYears = 5
  ): CarDepreciationYearPoint[] {
    let currentVal = initialVehiclePrice;
    const timeline: CarDepreciationYearPoint[] = [];

    for (let y = 1; y <= ownershipYears; y++) {
      const depRate = y === 1 ? year1DepreciationPercent : subsequentAnnualDepreciationPercent;
      const depAmount = (currentVal * depRate) / 100;
      const endingVal = Math.max(0, currentVal - depAmount);
      const retainedPct = initialVehiclePrice > 0 ? (endingVal / initialVehiclePrice) * 100 : 0;

      timeline.push({
        year: y,
        beginningValuation: Math.round(currentVal),
        depreciationAmount: Math.round(depAmount),
        endingValuation: Math.round(endingVal),
        retainedValuePercentage: parseFloat(retainedPct.toFixed(1)),
      });

      currentVal = endingVal;
    }

    return timeline;
  }
}
