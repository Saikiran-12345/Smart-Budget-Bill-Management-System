import { MortgageAmortizationScheduleEngine, AmortizationScheduleMonthPoint } from '../math/calculators/mortgageAmortizationScheduleEngine';

export class AmortizationService {
  public static getAmortizationSchedule(
    loanPrincipal = 4000000,
    annualInterestRatePercent = 8.5,
    tenureYears = 20
  ): {
    monthlyEMI: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    schedule: AmortizationScheduleMonthPoint[];
  } {
    return MortgageAmortizationScheduleEngine.generateSchedule(loanPrincipal, annualInterestRatePercent, tenureYears);
  }
}
