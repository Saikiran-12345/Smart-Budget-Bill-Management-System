import { LeaveEncashmentTaxExemptionEngine, LeaveEncashmentResult } from '../math/calculators/leaveEncashmentTaxExemptionEngine';

export class LeaveEncashmentService {
  public static getLeaveEncashmentExemption(
    totalLeaveEncashmentReceived = 600000,
    unavailedLeaveDays = 120,
    averageMonthlySalary10Months = 75000,
    isGovernmentEmployee = false
  ): LeaveEncashmentResult {
    return LeaveEncashmentTaxExemptionEngine.calculateLeaveEncashment(
      totalLeaveEncashmentReceived,
      unavailedLeaveDays,
      averageMonthlySalary10Months,
      isGovernmentEmployee
    );
  }
}
