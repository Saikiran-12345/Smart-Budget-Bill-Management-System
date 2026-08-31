import { EmergencyFundRunwayEngine, StressTestScenario } from '../math/calculators/emergencyFundRunwayEngine';

export class EmergencyBufferService {
  public static getEmergencyStressTest(
    liquidReserveAmount = 300000,
    normalMonthlyExpenses = 50000
  ): {
    normalRunwayMonths: number;
    scenarios: StressTestScenario[];
  } {
    return EmergencyFundRunwayEngine.runStressTests(liquidReserveAmount, normalMonthlyExpenses);
  }
}
