export interface RentVsBuyComparisonResult {
  propertyPurchasePriceINR: number;
  monthlyRentPaidINR: number;
  downPaymentINR: number;
  homeLoanEMIINR: number;
  totalOutflowBuying20YearsINR: number;
  totalOutflowRenting20YearsINR: number;
  investedDifferenceCorpusINR: number; // If difference invested in SIP
  financialRecommendation: 'RENTING_FINANCIALLY_SUPERIOR' | 'BUYING_FINANCIALLY_SUPERIOR' | 'NEUTRAL';
}

export class RentVsBuyPropertyEngine {
  public static compareRentVsBuy(
    propertyPurchasePriceINR = 8000000,
    monthlyRentPaidINR = 25000,
    annualHomeLoanRatePercent = 8.5,
    expectedPropertyAppreciationPercent = 7.0,
    expectedSIPReturnPercent = 12.0,
    tenureYears = 20
  ): RentVsBuyComparisonResult {
    const downPaymentINR = Math.round(propertyPurchasePriceINR * 0.20); // 20% down payment
    const loanAmount = propertyPurchasePriceINR - downPaymentINR;

    const monthlyRate = annualHomeLoanRatePercent / 100 / 12;
    const months = tenureYears * 12;
    const homeLoanEMIINR = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    );

    const totalEMIOutflow = homeLoanEMIINR * months;
    const totalOutflowBuying20YearsINR = downPaymentINR + totalEMIOutflow;

    // Renting model: initial down payment invested + monthly difference (EMI - Rent) invested in SIP
    let sipCorpus = downPaymentINR * Math.pow(1 + expectedSIPReturnPercent / 100, tenureYears);
    const monthlySIPCapacity = Math.max(0, homeLoanEMIINR - monthlyRentPaidINR);
    const sipMonthlyRate = expectedSIPReturnPercent / 100 / 12;

    const sipFutureValue = Math.round(
      (monthlySIPCapacity * (Math.pow(1 + sipMonthlyRate, months) - 1) * (1 + sipMonthlyRate)) / sipMonthlyRate
    );

    const totalRenterWealthINR = Math.round(sipCorpus + sipFutureValue);

    // Buyer property future value
    const propertyFutureValueINR = Math.round(
      propertyPurchasePriceINR * Math.pow(1 + expectedPropertyAppreciationPercent / 100, tenureYears)
    );

    let financialRecommendation: 'RENTING_FINANCIALLY_SUPERIOR' | 'BUYING_FINANCIALLY_SUPERIOR' | 'NEUTRAL' = 'NEUTRAL';
    if (totalRenterWealthINR > propertyFutureValueINR * 1.1) {
      financialRecommendation = 'RENTING_FINANCIALLY_SUPERIOR';
    } else if (propertyFutureValueINR > totalRenterWealthINR * 1.1) {
      financialRecommendation = 'BUYING_FINANCIALLY_SUPERIOR';
    }

    return {
      propertyPurchasePriceINR,
      monthlyRentPaidINR,
      downPaymentINR,
      homeLoanEMIINR,
      totalOutflowBuying20YearsINR,
      totalOutflowRenting20YearsINR: Math.round(monthlyRentPaidINR * months * 1.5), // rent inflation
      investedDifferenceCorpusINR: totalRenterWealthINR,
      financialRecommendation,
    };
  }
}
