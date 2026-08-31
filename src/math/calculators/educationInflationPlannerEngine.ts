export interface CollegeFundPlanResult {
  childCurrentAge: number;
  collegeStartAge: number;
  yearsToCollege: number;
  currentCourseCostToday: number;
  annualEducationInflationPercent: number;
  futureInflationAdjustedCost: number;
  requiredMonthlySIP: number;
}

export class EducationInflationPlannerEngine {
  public static calculateCollegeFund(
    childCurrentAge = 5,
    collegeStartAge = 18,
    currentCourseCostToday = 1500000,
    annualEducationInflationPercent = 10,
    expectedInvestmentReturnPercent = 12
  ): CollegeFundPlanResult {
    const yearsToCollege = Math.max(1, collegeStartAge - childCurrentAge);
    const monthsToCollege = yearsToCollege * 12;

    const futureInflationAdjustedCost = Math.round(
      currentCourseCostToday * Math.pow(1 + annualEducationInflationPercent / 100, yearsToCollege)
    );

    const monthlyReturnRate = expectedInvestmentReturnPercent / 100 / 12;
    const requiredMonthlySIP = Math.round(
      (futureInflationAdjustedCost * monthlyReturnRate) /
        ((Math.pow(1 + monthlyReturnRate, monthsToCollege) - 1) * (1 + monthlyReturnRate))
    );

    return {
      childCurrentAge,
      collegeStartAge,
      yearsToCollege,
      currentCourseCostToday,
      annualEducationInflationPercent,
      futureInflationAdjustedCost,
      requiredMonthlySIP: Math.max(0, requiredMonthlySIP),
    };
  }
}
