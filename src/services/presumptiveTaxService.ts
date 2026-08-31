import { PresumptiveTax44ADAEngine, PresumptiveTax44ADADetail } from '../math/calculators/presumptiveTax44ADAEngine';

export class PresumptiveTaxService {
  public static getSection44ADAEstimate(
    grossProfessionalReceiptsINR = 4500000,
    actualDeclaredExpensesINR = 1200000,
    taxSlabPercent = 30
  ): PresumptiveTax44ADADetail {
    return PresumptiveTax44ADAEngine.calculate44ADA(
      grossProfessionalReceiptsINR,
      actualDeclaredExpensesINR,
      taxSlabPercent
    );
  }
}
