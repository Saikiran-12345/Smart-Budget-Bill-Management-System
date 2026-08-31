import { HealthInsuranceCoverageEngine, HealthInsuranceClaimBreakdown } from '../math/calculators/healthInsuranceCoverageEngine';

export class HealthInsuranceService {
  public static getClaimCoverage(
    totalHospitalBill = 250000,
    policyDeductibleAmount = 15000,
    copayPercentage = 10,
    outOfPocketMaximumLimit = 60000
  ): HealthInsuranceClaimBreakdown {
    return HealthInsuranceCoverageEngine.calculateClaim(
      totalHospitalBill,
      policyDeductibleAmount,
      copayPercentage,
      outOfPocketMaximumLimit
    );
  }
}
