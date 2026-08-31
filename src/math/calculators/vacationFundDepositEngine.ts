export interface VacationFundDetail {
  destinationTitle: string;
  flightsCost: number;
  hotelCost: number;
  activitiesCost: number;
  totalTripEstimate: number;
  monthsRemaining: number;
  requiredMonthlySavings: number;
}

export class VacationFundDepositEngine {
  public static calculateVacation(
    destinationTitle = 'Bali, Indonesia',
    flightsCost = 50000,
    hotelCost = 40000,
    activitiesCost = 30000,
    targetDateStr = '2026-11-15'
  ): VacationFundDepositEngine {
    const totalTripEstimate = flightsCost + hotelCost + activitiesCost;
    const today = new Date();
    const target = new Date(targetDateStr);

    const diffMonths = Math.max(
      1,
      (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth())
    );

    const requiredMonthlySavings = totalTripEstimate / diffMonths;

    return {
      destinationTitle,
      flightsCost,
      hotelCost,
      activitiesCost,
      totalTripEstimate: Math.round(totalTripEstimate),
      monthsRemaining: diffMonths,
      requiredMonthlySavings: Math.round(requiredMonthlySavings),
    } as any;
  }
}
