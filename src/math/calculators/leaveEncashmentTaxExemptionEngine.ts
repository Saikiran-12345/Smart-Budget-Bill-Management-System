export interface LeaveEncashmentResult {
  totalLeaveEncashmentReceived: number;
  unavailedLeaveDays: number;
  averageMonthlySalary10Months: number;
  isGovernmentEmployee: boolean;
  maxStatutoryExemptionLimitINR: number; // ₹25,00,000 for non-gov (Budget 2023 amendment)
  taxFreeExemptAmount: number;
  taxableLeaveEncashmentAmount: number;
}

export class LeaveEncashmentTaxExemptionEngine {
  public static calculateLeaveEncashment(
    totalLeaveEncashmentReceived = 600000,
    unavailedLeaveDays = 120,
    averageMonthlySalary10Months = 75000,
    isGovernmentEmployee = false
  ): LeaveEncashmentResult {
    if (isGovernmentEmployee) {
      return {
        totalLeaveEncashmentReceived,
        unavailedLeaveDays,
        averageMonthlySalary10Months,
        isGovernmentEmployee: true,
        maxStatutoryExemptionLimitINR: Infinity,
        taxFreeExemptAmount: totalLeaveEncashmentReceived,
        taxableLeaveEncashmentAmount: 0,
      };
    }

    // For Non-Government Employees, exemption is minimum of:
    // 1. Actual amount received
    // 2. Statutory limit ₹25,00,000
    // 3. 10 months average salary
    // 4. Cash equivalent of unavailed leave (max 30 days per year of service)
    const statutoryLimit = 2500000;
    const tenMonthsAvgSalary = averageMonthlySalary10Months * 10;
    const unavailedLeaveSalary = Math.round((averageMonthlySalary10Months / 30) * unavailedLeaveDays);

    const taxFreeExemptAmount = Math.min(
      totalLeaveEncashmentReceived,
      statutoryLimit,
      tenMonthsAvgSalary,
      unavailedLeaveSalary
    );

    const taxableLeaveEncashmentAmount = Math.max(0, totalLeaveEncashmentReceived - taxFreeExemptAmount);

    return {
      totalLeaveEncashmentReceived,
      unavailedLeaveDays,
      averageMonthlySalary10Months,
      isGovernmentEmployee: false,
      maxStatutoryExemptionLimitINR: statutoryLimit,
      taxFreeExemptAmount,
      taxableLeaveEncashmentAmount,
    };
  }
}
