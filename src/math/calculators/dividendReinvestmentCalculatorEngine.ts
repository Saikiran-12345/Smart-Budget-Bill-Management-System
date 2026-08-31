export interface DRIPYearPoint {
  year: number;
  portfolioValueWithoutDRIP: number;
  portfolioValueWithDRIP: number;
  additionalWealthFromDRIP: number;
}

export class DividendReinvestmentCalculatorEngine {
  public static calculateDRIPCompounding(
    initialPrincipal = 200000,
    annualDividendYieldPercent = 3.5,
    annualCapitalGrowthPercent = 7.0,
    years = 15
  ): DRIPYearPoint[] {
    let valWithoutDRIP = initialPrincipal;
    let valWithDRIP = initialPrincipal;

    const timeline: DRIPYearPoint[] = [];

    for (let y = 1; y <= years; y++) {
      // Without DRIP: dividend paid out, portfolio grows by capital appreciation
      valWithoutDRIP *= 1 + annualCapitalGrowthPercent / 100;

      // With DRIP: dividend reinvested back into portfolio
      const divPayout = valWithDRIP * (annualDividendYieldPercent / 100);
      valWithDRIP = (valWithDRIP + divPayout) * (1 + annualCapitalGrowthPercent / 100);

      timeline.push({
        year: y,
        portfolioValueWithoutDRIP: Math.round(valWithoutDRIP),
        portfolioValueWithDRIP: Math.round(valWithDRIP),
        additionalWealthFromDRIP: Math.round(valWithDRIP - valWithoutDRIP),
      });
    }

    return timeline;
  }
}
