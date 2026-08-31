import { FreelanceHourlyRateEngine, FreelanceTargetRate } from '../math/calculators/freelanceHourlyRateEngine';
import { FreelanceTaxEstimatorEngine, PresumptiveTaxResult } from '../math/calculators/freelanceTaxEstimatorEngine';

export class FreelanceService {
  public static getTargetRate(
    targetAnnualNetSalary = 1800000,
    annualBusinessOverheadExpenses = 300000,
    desiredVacationWeeks = 4,
    billableHoursPerWeek = 25
  ): FreelanceTargetRate {
    return FreelanceHourlyRateEngine.calculateTargetRate(
      targetAnnualNetSalary,
      annualBusinessOverheadExpenses,
      desiredVacationWeeks,
      billableHoursPerWeek
    );
  }

  public static getPresumptiveTax(grossFreelanceRevenue = 2400000): PresumptiveTaxResult {
    return FreelanceTaxEstimatorEngine.calculatePresumptiveTax(grossFreelanceRevenue);
  }
}
