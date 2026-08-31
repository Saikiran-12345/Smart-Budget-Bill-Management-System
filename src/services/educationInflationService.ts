import { EducationInflationPlannerEngine, CollegeFundPlanResult } from '../math/calculators/educationInflationPlannerEngine';

export class EducationInflationService {
  public static getCollegeFundPlan(
    childCurrentAge = 5,
    collegeStartAge = 18,
    currentCourseCostToday = 1500000,
    annualEducationInflationPercent = 10,
    expectedInvestmentReturnPercent = 12
  ): CollegeFundPlanResult {
    return EducationInflationPlannerEngine.calculateCollegeFund(
      childCurrentAge,
      collegeStartAge,
      currentCourseCostToday,
      annualEducationInflationPercent,
      expectedInvestmentReturnPercent
    );
  }
}
