export interface CreditCardRewardOffering {
  cardId: string;
  cardName: string;
  issuingBank: string;
  cardNetwork: 'VISA' | 'MASTERCARD' | 'AMEX' | 'RUPAY';
  annualFeeINR: number;
  annualFeeFeeWaiverSpendThresholdINR: number;
  rewardRateBasePercent: number;
  rewardRateAcceleratedPercent: number;
  loungeAccessDomesticPerQuarter: number;
  loungeAccessInternationalPerYear: number;
  forexMarkupFeePercent: number;
  fuelSurchargeWaiverCapINR: number;
  bestSuitedForCategory: 'SHOPPING' | 'TRAVEL_FLIGHTS' | 'CASHBACK_GROCERIES' | 'DINING_LIFESTYLE' | 'PREMIUM_LUXURY';
}

export const CREDIT_CARD_REWARDS_MATRIX: CreditCardRewardOffering[] = [
  {
    cardId: 'HDFC_MILLENNIA',
    cardName: 'HDFC Millennia Credit Card',
    issuingBank: 'HDFC Bank',
    cardNetwork: 'VISA',
    annualFeeINR: 1000,
    annualFeeFeeWaiverSpendThresholdINR: 100000,
    rewardRateBasePercent: 1.0,
    rewardRateAcceleratedPercent: 5.0, // Amazon, Flipkart, Swiggy, Zomato, Uber
    loungeAccessDomesticPerQuarter: 1,
    loungeAccessInternationalPerYear: 0,
    forexMarkupFeePercent: 3.5,
    fuelSurchargeWaiverCapINR: 250,
    bestSuitedForCategory: 'CASHBACK_GROCERIES',
  },
  {
    cardId: 'HDFC_INFINTIA',
    cardName: 'HDFC Infinia Metal Edition Credit Card',
    issuingBank: 'HDFC Bank',
    cardNetwork: 'VISA',
    annualFeeINR: 12500,
    annualFeeFeeWaiverSpendThresholdINR: 1000000,
    rewardRateBasePercent: 3.3,
    rewardRateAcceleratedPercent: 16.5, // SmartBuy travel & shopping
    loungeAccessDomesticPerQuarter: 99,
    loungeAccessInternationalPerYear: 99,
    forexMarkupFeePercent: 2.0,
    fuelSurchargeWaiverCapINR: 1000,
    bestSuitedForCategory: 'PREMIUM_LUXURY',
  },
  {
    cardId: 'ICICI_AMAZON_PAY',
    cardName: 'Amazon Pay ICICI Credit Card',
    issuingBank: 'ICICI Bank',
    cardNetwork: 'VISA',
    annualFeeINR: 0, // Lifetime Free
    annualFeeFeeWaiverSpendThresholdINR: 0,
    rewardRateBasePercent: 1.0,
    rewardRateAcceleratedPercent: 5.0, // Amazon Prime shopping
    loungeAccessDomesticPerQuarter: 0,
    loungeAccessInternationalPerYear: 0,
    forexMarkupFeePercent: 3.5,
    fuelSurchargeWaiverCapINR: 250,
    bestSuitedForCategory: 'SHOPPING',
  },
  {
    cardId: 'AXIS_ACE',
    cardName: 'Axis Bank ACE Credit Card',
    issuingBank: 'Axis Bank',
    cardNetwork: 'VISA',
    annualFeeINR: 499,
    annualFeeFeeWaiverSpendThresholdINR: 200000,
    rewardRateBasePercent: 1.5,
    rewardRateAcceleratedPercent: 5.0, // Google Pay bill payments
    loungeAccessDomesticPerQuarter: 1,
    loungeAccessInternationalPerYear: 0,
    forexMarkupFeePercent: 3.5,
    fuelSurchargeWaiverCapINR: 500,
    bestSuitedForCategory: 'CASHBACK_GROCERIES',
  },
  {
    cardId: 'AXIS_MAGNUS',
    cardName: 'Axis Bank Magnus Credit Card',
    issuingBank: 'Axis Bank',
    cardNetwork: 'VISA',
    annualFeeINR: 12500,
    annualFeeFeeWaiverSpendThresholdINR: 2500000,
    rewardRateBasePercent: 2.4,
    rewardRateAcceleratedPercent: 12.0,
    loungeAccessDomesticPerQuarter: 99,
    loungeAccessInternationalPerYear: 8,
    forexMarkupFeePercent: 2.0,
    fuelSurchargeWaiverCapINR: 400,
    bestSuitedForCategory: 'TRAVEL_FLIGHTS',
  },
  {
    cardId: 'SBI_CASHBACK',
    cardName: 'Cashback SBI Credit Card',
    issuingBank: 'SBI Card',
    cardNetwork: 'VISA',
    annualFeeINR: 999,
    annualFeeFeeWaiverSpendThresholdINR: 200000,
    rewardRateBasePercent: 1.0,
    rewardRateAcceleratedPercent: 5.0, // Direct online shopping cashback
    loungeAccessDomesticPerQuarter: 0,
    loungeAccessInternationalPerYear: 0,
    forexMarkupFeePercent: 3.5,
    fuelSurchargeWaiverCapINR: 250,
    bestSuitedForCategory: 'SHOPPING',
  },
  {
    cardId: 'AMEX_PLATINUM_TRAVEL',
    cardName: 'American Express Platinum Travel Credit Card',
    issuingBank: 'American Express',
    cardNetwork: 'AMEX',
    annualFeeINR: 5000,
    annualFeeFeeWaiverSpendThresholdINR: 0,
    rewardRateBasePercent: 1.5,
    rewardRateAcceleratedPercent: 6.0, // Milestone Taj stay vouchers & Taj vouchers
    loungeAccessDomesticPerQuarter: 2,
    loungeAccessInternationalPerYear: 0,
    forexMarkupFeePercent: 3.5,
    fuelSurchargeWaiverCapINR: 0,
    bestSuitedForCategory: 'TRAVEL_FLIGHTS',
  },
  {
    cardId: 'TATA_NEU_INFINITY',
    cardName: 'Tata Neu Infinity HDFC Credit Card',
    issuingBank: 'HDFC Bank',
    cardNetwork: 'RUPAY',
    annualFeeINR: 1499,
    annualFeeFeeWaiverSpendThresholdINR: 300000,
    rewardRateBasePercent: 1.5,
    rewardRateAcceleratedPercent: 5.0, // NeuCoins on Tata brand ecosystem & UPI
    loungeAccessDomesticPerQuarter: 2,
    loungeAccessInternationalPerYear: 1,
    forexMarkupFeePercent: 2.0,
    fuelSurchargeWaiverCapINR: 250,
    bestSuitedForCategory: 'SHOPPING',
  },
];
