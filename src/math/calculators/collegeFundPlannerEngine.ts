export interface CollegeFundPlan {
  childCurrentAge: number;
  collegeStartAge: number;
  currentCollegeCostAnnual: number;
  collegeDurationYears: number;
  expectedEducationInflationPercent: number;
  expectedInvestmentReturnPercent: number;
  yearsToCollege: number;
  inflatedTotalCollegeCost: number;
  currentSavingsCorpus: number;
  monthlyDepositRequired: number;
}

export class CollegeFundPlannerEngine {
  public static calculateCollegeFund(
    childCurrentAge: number,
    collegeStartAge = 18,
    currentCollegeCostAnnual = 500000,
    collegeDurationYears = 4,
    currentSavingsCorpus = 100000,
    expectedEducationInflationPercent = 8,
    expectedInvestmentReturnPercent = 11
  ): CollegeFundPlan {
    const yearsToCollege = Math.max(1, collegeStartAge - childCurrentAge);

    // Inflated annual cost when child reaches college age
    const inflatedAnnualCostAtCollegeAge = currentCollegeCostAnnual * Math.pow(1 + expectedEducationInflationPercent / 100, yearsToCollege);
    const inflatedTotalCollegeCost = Math.round(inflatedAnnualCostAtCollegeAge * collegeDurationYears);

    // Real return adjusted for education inflation
    const realRate = (expectedInvestmentReturnPercent - expectedEducationInflationPercent) / 100;
    const monthlyRate = realRate / 12;
    const totalMonths = yearsToCollege * 12;

    const fvExistingSavings = currentSavingsCorpus * Math.pow(1 + realRate, yearsToCollege);
    const shortfall = Math.max(0, inflatedTotalCollegeCost - fvExistingSavings);

    let monthlyDepositRequired = 0;
    if (shortfall > 0 && monthlyRate > 0) {
      monthlyDepositRequired = Math.round(
        (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    }

    return {
      childCurrentAge,
      collegeStartAge,
      currentCollegeCostAnnual,
      collegeDurationYears,
      expectedEducationInflationPercent,
      expectedInvestmentReturnPercent,
      yearsToCollege,
      inflatedTotalCollegeCost,
      currentSavingsCorpus,
      monthlyDepositRequired,
    };
  }
}
