export interface SSYMaturityDetail {
  annualDepositAmount: number; // Max ₹1,50,000/yr
  interestRatePercent: number; // 8.2% p.a.
  depositPeriodYears: number; // 15 years
  totalInvestedPrincipal: number;
  maturityCorpusAt21Years: number;
  totalTaxFreeInterestEarned: number;
}

export class SukanyaSamriddhiYojanaEngine {
  public static calculateSSY(
    annualDepositAmount = 150000,
    interestRatePercent = 8.2
  ): SSYMaturityDetail {
    const annualCap = Math.min(150000, annualDepositAmount);
    let balance = 0;

    // 15 years of annual deposits
    for (let y = 1; y <= 15; y++) {
      balance = (balance + annualCap) * (1 + interestRatePercent / 100);
    }

    // 6 years of compound interest without new deposits (15 to 21 years)
    for (let y = 16; y <= 21; y++) {
      balance = balance * (1 + interestRatePercent / 100);
    }

    const totalInvestedPrincipal = annualCap * 15;
    const maturityCorpusAt21Years = Math.round(balance);
    const totalTaxFreeInterestEarned = maturityCorpusAt21Years - totalInvestedPrincipal;

    return {
      annualDepositAmount: annualCap,
      interestRatePercent,
      depositPeriodYears: 15,
      totalInvestedPrincipal,
      maturityCorpusAt21Years,
      totalTaxFreeInterestEarned,
    };
  }
}
