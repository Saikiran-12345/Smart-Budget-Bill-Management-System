export interface DeductionSectionHeadroom {
  sectionCode: string;
  descriptionLabel: string;
  maxExemptionLimit: number;
  currentClaimedAmount: number;
  remainingHeadroom: number;
  claimedPercentage: number;
}

export class TaxDeductionCategoryHeadroomEngine {
  public static calculateHeadroom(
    sec80CClaimed = 120000,
    sec80DClaimed = 25000,
    sec80CCD1BClaimed = 50000,
    sec24BClaimed = 180000
  ): DeductionSectionHeadroom[] {
    const sections = [
      { code: 'Section 80C', label: 'EPF, PPF, ELSS & Tuition Fees', limit: 150000, current: sec80CClaimed },
      { code: 'Section 80D', label: 'Health Insurance Premiums (Self + Family)', limit: 50000, current: sec80DClaimed },
      { code: 'Section 80CCD(1B)', label: 'NPS Voluntary Contribution', limit: 50000, current: sec80CCD1BClaimed },
      { code: 'Section 24(b)', label: 'Home Loan Interest Paid', limit: 200000, current: sec24BClaimed },
    ];

    return sections.map((s) => {
      const claimed = Math.min(s.limit, s.current);
      const remaining = Math.max(0, s.limit - claimed);
      const pct = s.limit > 0 ? (claimed / s.limit) * 100 : 0;

      return {
        sectionCode: s.code,
        descriptionLabel: s.label,
        maxExemptionLimit: s.limit,
        currentClaimedAmount: claimed,
        remainingHeadroom: remaining,
        claimedPercentage: parseFloat(pct.toFixed(1)),
      };
    });
  }
}
