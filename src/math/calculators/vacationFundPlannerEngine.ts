export interface VacationTripPlan {
  destinationName: string;
  flightTicketsCost: number;
  hotelAccommodationCost: number;
  diningActivitiesCost: number;
  totalTripEstimate: number;
  targetTripDate: string;
  monthsRemaining: number;
  requiredMonthlySavings: number;
}

export class VacationFundPlannerEngine {
  public static planVacation(
    destinationName: string,
    flightTicketsCost = 45000,
    hotelAccommodationCost = 35000,
    diningActivitiesCost = 20000,
    targetTripDateStr = '2026-12-01'
  ): VacationTripPlan {
    const totalTripEstimate = flightTicketsCost + hotelAccommodationCost + diningActivitiesCost;

    const today = new Date();
    const target = new Date(targetTripDateStr);

    const diffMonths = Math.max(
      1,
      (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth())
    );

    const requiredMonthlySavings = totalTripEstimate / diffMonths;

    return {
      destinationName,
      flightTicketsCost,
      hotelAccommodationCost,
      diningActivitiesCost,
      totalTripEstimate: Math.round(totalTripEstimate),
      targetTripDate: targetTripDateStr,
      monthsRemaining: diffMonths,
      requiredMonthlySavings: Math.round(requiredMonthlySavings),
    };
  }
}
