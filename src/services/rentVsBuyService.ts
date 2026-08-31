import { RentVsBuyPropertyEngine, RentVsBuyComparisonResult } from '../math/calculators/rentVsBuyPropertyEngine';

export class RentVsBuyService {
  public static getRentVsBuyComparison(
    propertyPurchasePriceINR = 8000000,
    monthlyRentPaidINR = 25000,
    annualHomeLoanRatePercent = 8.5
  ): RentVsBuyComparisonResult {
    return RentVsBuyPropertyEngine.compareRentVsBuy(
      propertyPurchasePriceINR,
      monthlyRentPaidINR,
      annualHomeLoanRatePercent
    );
  }
}
