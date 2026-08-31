import { RealEstateCapRateEngine, RealEstateCapRateSummary } from '../math/calculators/realEstateCapRateEngine';

export class RealEstateCapRateService {
  public static getCapRateAnalysis(
    propertyPurchasePrice = 8000000,
    monthlyRentReceived = 35000,
    propertyTaxAnnual = 15000,
    maintenanceInsuranceAnnual = 25000
  ): RealEstateCapRateSummary {
    return RealEstateCapRateEngine.calculateCapRate(
      propertyPurchasePrice,
      monthlyRentReceived,
      propertyTaxAnnual,
      maintenanceInsuranceAnnual
    );
  }
}
