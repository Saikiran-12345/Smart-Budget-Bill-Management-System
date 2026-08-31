export interface SolarPaybackResult {
  systemCost: number;
  subsidyAmount: number;
  netInvestment: number;
  monthlyBillBeforeSolar: number;
  monthlyBillAfterSolar: number;
  monthlySavings: number;
  annualSavings: number;
  paybackPeriodYears: number;
  lifetime25YrSavings: number;
}

export class SolarPanelPaybackEngine {
  public static calculatePayback(
    systemCost = 250000,
    subsidyAmount = 78000,
    monthlyBillBeforeSolar = 5000,
    generationOffsetPercent = 85
  ): SolarPaybackResult {
    const netInvestment = Math.max(0, systemCost - subsidyAmount);
    const monthlySavings = (monthlyBillBeforeSolar * generationOffsetPercent) / 100;
    const monthlyBillAfterSolar = Math.max(0, monthlyBillBeforeSolar - monthlySavings);

    const annualSavings = monthlySavings * 12;
    const paybackPeriodYears = annualSavings > 0 ? netInvestment / annualSavings : 0;
    const lifetime25YrSavings = Math.round(annualSavings * 25 - netInvestment);

    return {
      systemCost,
      subsidyAmount,
      netInvestment: Math.round(netInvestment),
      monthlyBillBeforeSolar,
      monthlyBillAfterSolar: Math.round(monthlyBillAfterSolar),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackPeriodYears: parseFloat(paybackPeriodYears.toFixed(1)),
      lifetime25YrSavings,
    };
  }
}
