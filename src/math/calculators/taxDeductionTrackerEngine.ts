export interface TaxDeductionCategoryStatus {
  sectionName: string;
  categoryLabel: string;
  maxLimitAmount: number;
  currentClaimedAmount: number;
  remainingHeadroomAmount: number;
  utilizationPercentage: number;
}

export class TaxDeductionTrackerEngine {
  public static calculateDeductionStatus(
    section80CClaimed: number,
    section80DClaimed: number,
    section80CCD1BClaimed: number,
    section24BClaimed: number
  ): TaxDeductionCategoryStatus[] {
    const limits = [
      { sectionName: 'Section 80C', categoryLabel: 'ELSS, PPF, Life Insurance, EPF', max: 150000, current: section80CClaimed },
      { sectionName: 'Section 80D', categoryLabel: 'Health Insurance Premiums', max: 50000, current: section80DClaimed },
      { sectionName: 'Section 80CCD(1B)', categoryLabel: 'NPS Pension Voluntary Contribution', max: 50000, current: section80CCD1BClaimed },
      { sectionName: 'Section 24(b)', categoryLabel: 'Home Loan Interest Deduction', max: 200000, current: section24BClaimed },
    ];

    return limits.map((l) => {
      const currentClaimedAmount = Math.min(l.max, l.current);
      const remainingHeadroomAmount = Math.max(0, l.max - currentClaimedAmount);
      const utilizationPercentage = l.max > 0 ? (currentClaimedAmount / l.max) * 100 : 0;

      return {
        sectionName: l.sectionName,
        categoryLabel: l.categoryLabel,
        maxLimitAmount: l.max,
        currentClaimedAmount,
        remainingHeadroomAmount,
        utilizationPercentage: parseFloat(utilizationPercentage.toFixed(1)),
      };
    });
  }
}
