import { TaxDeductionCategoryHeadroomEngine, DeductionSectionHeadroom } from '../math/calculators/taxDeductionCategoryHeadroomEngine';
import { TaxBracketHeadroomEngine, TaxBracketSlabDetail } from '../math/calculators/taxBracketHeadroomEngine';

export class TaxHeadroomService {
  public static getSectionHeadroom(
    sec80C = 120000,
    sec80D = 25000,
    sec80CCD1B = 50000,
    sec24B = 180000
  ): DeductionSectionHeadroom[] {
    return TaxDeductionCategoryHeadroomEngine.calculateHeadroom(sec80C, sec80D, sec80CCD1B, sec24B);
  }

  public static getTaxSlabBreakdown(taxableIncomeAmount = 1400000): {
    taxableIncomeAmount: number;
    totalTaxBeforeCess: number;
    healthEducationCess4Percent: number;
    totalTaxPayable: number;
    slabs: TaxBracketSlabDetail[];
  } {
    return TaxBracketHeadroomEngine.calculateSlabBreakdown(taxableIncomeAmount);
  }
}
