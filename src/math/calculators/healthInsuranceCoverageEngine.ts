export interface HealthInsuranceClaimBreakdown {
  totalHospitalBill: number;
  policyDeductibleAmount: number;
  copayPercentage: number;
  outOfPocketMaximumLimit: number;
  insuranceCoveredAmount: number;
  patientOutOfPocketPayable: number;
}

export class HealthInsuranceCoverageEngine {
  public static calculateClaim(
    totalHospitalBill = 250000,
    policyDeductibleAmount = 15000,
    copayPercentage = 10,
    outOfPocketMaximumLimit = 60000
  ): HealthInsuranceClaimBreakdown {
    const billAfterDeductible = Math.max(0, totalHospitalBill - policyDeductibleAmount);
    const copayAmount = (billAfterDeductible * copayPercentage) / 100;

    let patientOutOfPocketPayable = policyDeductibleAmount + copayAmount;
    if (patientOutOfPocketPayable > outOfPocketMaximumLimit) {
      patientOutOfPocketPayable = outOfPocketMaximumLimit;
    }

    const insuranceCoveredAmount = Math.max(0, totalHospitalBill - patientOutOfPocketPayable);

    return {
      totalHospitalBill,
      policyDeductibleAmount,
      copayPercentage,
      outOfPocketMaximumLimit,
      insuranceCoveredAmount: Math.round(insuranceCoveredAmount),
      patientOutOfPocketPayable: Math.round(patientOutOfPocketPayable),
    };
  }
}
