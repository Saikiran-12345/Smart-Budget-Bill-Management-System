import { SIPStepUpCalculatorEngine, StepUpYearPoint } from '../math/calculators/sipStepUpCalculatorEngine';

export class SIPStepUpService {
  public static getStepUpTimeline(
    initialMonthlySIP = 10000,
    annualStepUpPercent = 10,
    expectedReturnRatePercent = 12,
    investmentYears = 15
  ): StepUpYearPoint[] {
    return SIPStepUpCalculatorEngine.calculateStepUpSIP(
      initialMonthlySIP,
      annualStepUpPercent,
      expectedReturnRatePercent,
      investmentYears
    );
  }
}
