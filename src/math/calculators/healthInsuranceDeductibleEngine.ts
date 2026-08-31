export interface HealthClaimScenario {
  claimAmount: number;
  deductibleAmount: number;
  copayPercentage: number; // e.g. 10%
  outOfPocketMaximum: number;
  insuranceCovers: number;
  patientPays: number;
  isOutOfPocketMaxReached: boolean;
}

export class HealthInsuranceDeductibleEngine {
  public static calculateClaimShare(
    claimAmount: number,
    deductibleAmount = 25000,
    copayPercentage = 10,
    outOfPocketMaximum = 100000
  ): HealthClaimScenario {
    // Patient pays deductible first
    const payableAfterDeductible = Math.max(0, claimAmount - deductibleAmount);
    const deductiblePaid = Math.min(claimAmount, deductibleAmount);

    // Patient pays co-pay percentage on remaining amount
    const copayAmount = (payableAfterDeductible * copayPercentage) / 100;

    let patientTotal = deductiblePaid + copayAmount;
    let isMaxReached = false;

    if (patientTotal > outOfPocketMaximum) {
      patientTotal = outOfPocketMaximum;
      isMaxReached = true;
    }

    const insuranceCovers = Math.max(0, claimAmount - patientTotal);

    return {
      claimAmount,
      deductibleAmount,
      copayPercentage,
      outOfPocketMaximum,
      insuranceCovers: Math.round(insuranceCovers),
      patientPays: Math.round(patientTotal),
      isOutOfPocketMaxReached: isMaxReached,
    };
  }
}
