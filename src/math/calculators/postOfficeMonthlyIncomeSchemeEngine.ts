export interface POMISSummary {
  accountType: 'SINGLE_ACCOUNT' | 'JOINT_ACCOUNT';
  depositAmount: number; // Single max ₹9 Lakhs, Joint max ₹15 Lakhs
  annualInterestRatePercent: number; // 7.4% p.a.
  monthlyInterestPayoutINR: number;
  total5YearInterestEarnedINR: number;
}

export class PostOfficeMonthlyIncomeSchemeEngine {
  public static calculatePOMIS(
    depositAmount = 900000,
    isJointAccount = false,
    annualInterestRatePercent = 7.4
  ): POMISSummary {
    const maxLimit = isJointAccount ? 1500000 : 900000;
    const cappedDeposit = Math.min(maxLimit, depositAmount);

    const annualInterestINR = (cappedDeposit * annualInterestRatePercent) / 100;
    const monthlyInterestPayoutINR = Math.round(annualInterestINR / 12);
    const total5YearInterestEarnedINR = monthlyInterestPayoutINR * 60;

    return {
      accountType: isJointAccount ? 'JOINT_ACCOUNT' : 'SINGLE_ACCOUNT',
      depositAmount: cappedDeposit,
      annualInterestRatePercent,
      monthlyInterestPayoutINR,
      total5YearInterestEarnedINR,
    };
  }
}
