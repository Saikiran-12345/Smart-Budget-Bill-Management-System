export interface CashBurnAnalysis {
  liquidCashReserve: number;
  monthlyFixedOutflow: number;
  monthlyVariableOutflow: number;
  totalMonthlyBurn: number;
  financialRunwayMonths: number;
  burnCategory: 'CRITICAL' | 'WARNING' | 'HEALTHY';
}

export class CashBurnRateEngine {
  public static calculateBurnRate(
    liquidCashReserve: number,
    monthlyFixedOutflow: number,
    monthlyVariableOutflow: number
  ): CashBurnAnalysis {
    const totalMonthlyBurn = monthlyFixedOutflow + monthlyVariableOutflow;
    const financialRunwayMonths = totalMonthlyBurn > 0 ? liquidCashReserve / totalMonthlyBurn : 99;

    let burnCategory: 'CRITICAL' | 'WARNING' | 'HEALTHY' = 'HEALTHY';
    if (financialRunwayMonths < 3) burnCategory = 'CRITICAL';
    else if (financialRunwayMonths < 6) burnCategory = 'WARNING';

    return {
      liquidCashReserve,
      monthlyFixedOutflow,
      monthlyVariableOutflow,
      totalMonthlyBurn,
      financialRunwayMonths: parseFloat(financialRunwayMonths.toFixed(1)),
      burnCategory,
    };
  }
}
