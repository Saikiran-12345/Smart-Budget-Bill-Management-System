export interface EmergencyReserveRating {
  liquidCashAmount: number;
  essentialMonthlyExpenses: number;
  runwayMonths: number;
  targetMonths: number;
  score: number; // 0 to 100
  rating: 'CRITICAL' | 'MODERATE' | 'EXCELLENT';
  shortfallAmount: number;
}

export class EmergencyReserveScoreEngine {
  public static calculateReserveScore(
    liquidCashAmount: number,
    essentialMonthlyExpenses: number,
    targetMonths = 6
  ): EmergencyReserveRating {
    const runwayMonths = essentialMonthlyExpenses > 0 ? liquidCashAmount / essentialMonthlyExpenses : 0;
    const targetAmount = essentialMonthlyExpenses * targetMonths;
    const shortfallAmount = Math.max(0, targetAmount - liquidCashAmount);

    const score = Math.round(Math.min(100, (runwayMonths / targetMonths) * 100));

    let rating: 'CRITICAL' | 'MODERATE' | 'EXCELLENT' = 'EXCELLENT';
    if (score < 50) rating = 'CRITICAL';
    else if (score < 80) rating = 'MODERATE';

    return {
      liquidCashAmount: Math.round(liquidCashAmount),
      essentialMonthlyExpenses: Math.round(essentialMonthlyExpenses),
      runwayMonths: parseFloat(runwayMonths.toFixed(1)),
      targetMonths,
      score,
      rating,
      shortfallAmount: Math.round(shortfallAmount),
    };
  }
}
