export class InflationAdjustmentEngine {
  public static calculateInflationAdjustedValue(
    initialAmount: number,
    annualInflationRatePercentage: number,
    years: number
  ): {
    futureValueNeeded: number;
    purchasingPowerErosion: number;
    purchasingPowerRemainingPercentage: number;
  } {
    const rate = annualInflationRatePercentage / 100;
    const futureValueNeeded = Math.round(initialAmount * Math.pow(1 + rate, years));
    const purchasingPowerRemainingPercentage = parseFloat(
      ((initialAmount / futureValueNeeded) * 100).toFixed(1)
    );
    const purchasingPowerErosion = Math.round(futureValueNeeded - initialAmount);

    return {
      futureValueNeeded,
      purchasingPowerErosion,
      purchasingPowerRemainingPercentage,
    };
  }
}
