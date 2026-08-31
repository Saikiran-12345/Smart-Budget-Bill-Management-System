export interface HealthClaimCoverage {
  totalHospitalBill: number;
  deductibleAmount: number;
  copayPercentage: number;
  outOfPocketMaxLimit: number;
  insurancePayableAmount: number;
  patientOutOfPocketAmount: number;
}

export class HealthDeductibleEngine {
  public static calculateClaimCoverage(
    totalHospitalBill: number,
    deductibleAmount = 10000,
    copayPercentage = 10,
    outOfPocketMaxLimit = 50000
  ): HealthClaimCoverage {
    const billAfterDeductible = Math.max(0, totalHospitalBill - deductibleAmount);
    const copayAmount = (billAfterDeductible * copayPercentage) / 100;

    let patientOutOfPocketAmount = deductibleAmount + copayAmount;
    if (patientOutOfPocketAmount > outOfPocketMaxLimit) {
      patientOutOfPocketAmount = outOfPocketMaxLimit;
    }

    const insurancePayableAmount = Math.max(0, totalHospitalBill - patientOutOfPocketAmount);

    return {
      totalHospitalBill,
      deductibleAmount,
      copayPercentage,
      outOfPocketMaxLimit,
      insurancePayableAmount: Math.round(insurancePayableAmount),
      patientOutOfPocketAmount: Math.round(patientOutOfPocketAmount),
    };
  }
}
