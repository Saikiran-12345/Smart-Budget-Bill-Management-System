export interface TaxDeductionBreakdown {
  section80C: { claimed: number; max: number; headroom: number };
  section80D: { claimed: number; max: number; headroom: number };
  section80CCD1B: { claimed: number; max: number; headroom: number };
  section24B: { claimed: number; max: number; headroom: number };
  totalDeductions: number;
}

export class TaxBracketOptimizer {
  public static calculateDeductionMatrix(
    pfAmount: number,
    elssAmount: number,
    lifeInsurance: number,
    healthInsuranceSelf: number,
    healthInsuranceParents: number,
    npsContribution: number,
    homeLoanInterest: number
  ): TaxDeductionBreakdown {
    const raw80C = pfAmount + elssAmount + lifeInsurance;
    const max80C = 150000;
    const claimed80C = Math.min(max80C, raw80C);
    const headroom80C = Math.max(0, max80C - claimed80C);

    const raw80D = healthInsuranceSelf + healthInsuranceParents;
    const max80D = 50000; // 25k self + 25k parents
    const claimed80D = Math.min(max80D, raw80D);
    const headroom80D = Math.max(0, max80D - claimed80D);

    const maxNPS = 50000;
    const claimedNPS = Math.min(maxNPS, npsContribution);
    const headroomNPS = Math.max(0, maxNPS - claimedNPS);

    const maxHomeLoanInterest = 200000;
    const claimed24B = Math.min(maxHomeLoanInterest, homeLoanInterest);
    const headroom24B = Math.max(0, maxHomeLoanInterest - claimed24B);

    return {
      section80C: { claimed: claimed80C, max: max80C, headroom: headroom80C },
      section80D: { claimed: claimed80D, max: max80D, headroom: headroom80D },
      section80CCD1B: { claimed: claimedNPS, max: maxNPS, headroom: headroomNPS },
      section24B: { claimed: claimed24B, max: maxHomeLoanInterest, headroom: headroom24B },
      totalDeductions: claimed80C + claimed80D + claimedNPS + claimed24B + 50000,
    };
  }
}
