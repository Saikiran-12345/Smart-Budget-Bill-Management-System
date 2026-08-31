import { VacationFundDepositEngine, VacationFundDetail } from '../math/calculators/vacationFundDepositEngine';

export class VacationService {
  public static getVacationPlan(
    destinationTitle = 'Bali, Indonesia',
    flightsCost = 50000,
    hotelCost = 40000,
    activitiesCost = 30000,
    targetDateStr = '2026-11-15'
  ): VacationFundDetail {
    return VacationFundDepositEngine.calculateVacation(
      destinationTitle,
      flightsCost,
      hotelCost,
      activitiesCost,
      targetDateStr
    ) as any;
  }
}
