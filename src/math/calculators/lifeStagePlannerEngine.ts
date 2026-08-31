export interface LifeStageMilestone {
  stageName: 'EARLY_CAREER' | 'FAMILY_BUILDING' | 'WEALTH_ACCUMULATION' | 'PRE_RETIREMENT' | 'RETIREMENT';
  recommendedEmergencyMonths: number;
  recommendedEquityPercent: number;
  recommendedDebtPercent: number;
  recommendedInsuranceMultiplier: number;
}

export class LifeStagePlannerEngine {
  public static calculateLifeStageRecommendations(userAge: number): LifeStageMilestone {
    if (userAge < 30) {
      return {
        stageName: 'EARLY_CAREER',
        recommendedEmergencyMonths: 3,
        recommendedEquityPercent: 80,
        recommendedDebtPercent: 20,
        recommendedInsuranceMultiplier: 10,
      };
    } else if (userAge < 45) {
      return {
        stageName: 'FAMILY_BUILDING',
        recommendedEmergencyMonths: 6,
        recommendedEquityPercent: 70,
        recommendedDebtPercent: 30,
        recommendedInsuranceMultiplier: 12,
      };
    } else if (userAge < 55) {
      return {
        stageName: 'WEALTH_ACCUMULATION',
        recommendedEmergencyMonths: 6,
        recommendedEquityPercent: 60,
        recommendedDebtPercent: 40,
        recommendedInsuranceMultiplier: 10,
      };
    } else if (userAge < 65) {
      return {
        stageName: 'PRE_RETIREMENT',
        recommendedEmergencyMonths: 9,
        recommendedEquityPercent: 40,
        recommendedDebtPercent: 60,
        recommendedInsuranceMultiplier: 5,
      };
    } else {
      return {
        stageName: 'RETIREMENT',
        recommendedEmergencyMonths: 12,
        recommendedEquityPercent: 30,
        recommendedDebtPercent: 70,
        recommendedInsuranceMultiplier: 0,
      };
    }
  }
}
