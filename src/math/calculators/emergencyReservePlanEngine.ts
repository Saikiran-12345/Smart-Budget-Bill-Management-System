export interface ReserveAccumulationStep {
  monthIndex: number;
  monthlyDepositAmount: number;
  accumulatedReserve: number;
  runwayMonthsCovered: number;
  isTargetAchieved: boolean;
}

export class EmergencyReservePlanEngine {
  public static generateAccumulationPlan(
    essentialMonthlyExpenses = 50000,
    currentLiquidSavings = 100000,
    monthlyDepositCapacity = 20000,
    targetMonthsBuffer = 6
  ) {
    const targetReserveAmount = essentialMonthlyExpenses * targetMonthsBuffer;
    const shortfallAmount = Math.max(0, targetReserveAmount - currentLiquidSavings);
    const monthsToTarget = monthlyDepositCapacity > 0 ? Math.ceil(shortfallAmount / monthlyDepositCapacity) : 99;

    let balance = currentLiquidSavings;
    const planSteps: ReserveAccumulationStep[] = [];

    for (let m = 1; m <= Math.min(60, monthsToTarget); m++) {
      balance += monthlyDepositCapacity;
      const runwayMonths = essentialMonthlyExpenses > 0 ? balance / essentialMonthlyExpenses : 0;
      const isTargetAchieved = balance >= targetReserveAmount;

      planSteps.push({
        monthIndex: m,
        monthlyDepositAmount: monthlyDepositCapacity,
        accumulatedReserve: Math.round(balance),
        runwayMonthsCovered: parseFloat(runwayMonths.toFixed(1)),
        isTargetAchieved,
      });

      if (isTargetAchieved) break;
    }

    return {
      targetReserveAmount: Math.round(targetReserveAmount),
      shortfallAmount: Math.round(shortfallAmount),
      shortfall: Math.round(shortfallAmount),
      monthsToTarget,
      planSteps,
      plan: planSteps,
    };
  }

  public static generateSavingsPlan(
    essentialMonthlyExpenses = 50000,
    currentLiquidSavings = 100000,
    monthlyDepositCapacity = 20000,
    targetMonthsBuffer = 6
  ) {
    return EmergencyReservePlanEngine.generateAccumulationPlan(
      essentialMonthlyExpenses,
      currentLiquidSavings,
      monthlyDepositCapacity,
      targetMonthsBuffer
    );
  }
}
